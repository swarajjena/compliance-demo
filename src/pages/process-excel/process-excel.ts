import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { removeSummaryDuplicates } from '@angular/compiler';

/**
 * Generated class for the ProcessExcelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-process-excel',
  templateUrl: 'process-excel.html',
})
export class ProcessExcelPage {

  all_tables = ["Jurisdiction_Master","Law_Master","Provision_Master","Compliance_Master"]
  current_processing_table="Jurisdiction_Master";
  local_master_link;
  server_file_path;

  table_data;

  jurisdiction_table_processed=false;

  validated_data;

  stored_data_names;

  inactive=false;

  upload_complete = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: ServerProvider) {
      this.server_file_path= this.navParams.get("filepath")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessExcelPage');
    this.retrive_table_headers(this.current_processing_table)
  }

  retrive_table_headers(table){
    this.server.getLinkageData(this.server_file_path).toPromise()
    .then(res => {
      console.log(table);
      this.local_master_link = res["data"].filter(data=>{
        return (data.master_db==table && data.master_attribute != "Not_Applicable" &&  data.master_attribute != "Request_New_Column");
      })
      this.retrive_table_data()
    })
    .catch(err=>{
    })
  }

  retrive_table_data(){
     let column_ids=this.local_master_link.map(data=>data.id)
     this.server.getSheetDataForIDs(this.server_file_path,column_ids).toPromise()
     .then(res=>{
       console.log(res)
        let unique_check = [];
        let data_array = new Object(res);
        this.table_data=[];
        console.log(data_array)

        let cnt = 0;
        for(let row in data_array){
          let data_string = data_array[row][0]
          if(data_string!=null && data_string.trim()!=="" && unique_check.indexOf(data_string)<0){
            let data_row=data_array[row].map((el, ind)=> new Object({id:ind, value:el}))
            this.table_data.push({m_id:cnt,id:row,data:data_row})
            unique_check.push(data_string);
            cnt++;
          }
        }

        console.log(this.table_data)


     }).catch(err=>console.log(err))
  }

  validateData(){

    if(this.validated_data)return;


    this.server.validateData(this.current_processing_table,this.local_master_link,this.table_data).toPromise()
    .then(res=>{
      let result=new Object(res);
      this.validated_data=result["result"];
      console.log(res);
    })
    .catch(err=>{console.log(err)})


  }


  storeValidatedData(){
    if(!this.validated_data || this.inactive)return;

    this.table_data;
    this.local_master_link;
    this.current_processing_table;

    console.log(this.local_master_link)

    let input_data=[];

    this.stored_data_names=[]
    for(let row in this.table_data){
        if(this.validated_data[row].reduce((a, b) => a + b, 0)==this.validated_data[row].length){
            let obj={};
            for (let el in this.table_data[row]["data"]){
                if(this.local_master_link[el]["header"]=="Law Name")
                  this.stored_data_names.push(this.table_data[row]["data"][el].value);
                obj[this.local_master_link[el]["master_attribute"]]=this.table_data[row]["data"][el].value;
            }
            input_data.push(obj)
        }
    }

    this.server.storeValidatedData(this.current_processing_table,this.local_master_link,input_data,this.server_file_path).toPromise()
    .then(res=>{
      let result=new Object(res);
      if(result["success"]){
        if(this.current_processing_table!="Law_Master" || true)
          this.goToNextTable()
/*        else {
//          this.validated_data = undefined;  
          let remove_rows=[]

          var name_indx = ""

          for (let el in this.local_master_link){
            if(this.local_master_link[el]["header"]=="Law Name")
              name_indx = el;
          }
          for(let row in this.table_data){
            let idex = this.stored_data_names.indexOf(this.table_data[row]["data"][name_indx].value);
            if(idex>=0)
              remove_rows.push(row )                       
          }

          console.log(this.stored_data_names)
          console.log(remove_rows)
          this.stored_data_names=[]

          for (var i = remove_rows.length -1; i >= 0; i--)
              this.table_data.splice(remove_rows[i],1);

          this.inactive=true;

        } 
*/
      }
    })
    .catch(err=>{console.log(err)})

  }

  goToNextTable(){
    let cur_idx = this.all_tables.indexOf(this.current_processing_table);

    if(cur_idx == this.all_tables.length-1){
      this.upload_complete=true;
      return 
    }
      
    cur_idx++;
    this.current_processing_table=this.all_tables[cur_idx];

    this.local_master_link = undefined;
  
    this.table_data = undefined;
  
    this.jurisdiction_table_processed=false;
  
    this.validated_data = undefined;  

    this.retrive_table_headers(this.current_processing_table)

  }

}
