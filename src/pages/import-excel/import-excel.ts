import { Component, Directive, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { ProcessExcelPage } from '../process-excel/process-excel';


/**
 * Generated class for the ImportExcelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const URL = 'path_to_api';

@IonicPage()
@Component({
  selector: 'page-import-excel',
  templateUrl: 'import-excel.html',
})
export class ImportExcelPage {
  @ViewChild('upload') uploadRef: ElementRef;
  private _READER : any  			=	new FileReader();

  private _REMOTE_URI : string 	=	"http://YOUR-REMOTE-URI-HERE/parse-upload.php";


  server_file_path;

  local_master_link=[];

  error_msg="";


  constructor(public navCtrl: NavController, public navParams: NavParams,private el:ElementRef,public server:ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportExcelPage');
  }


  chooseDb(id){
      console.log(this.local_master_link[id].master_db);

      this.server.getDatabaseColumns(this.local_master_link[id].master_db).toPromise()
      .then(res=>{
        console.log(res)
        let final_res=[{COLUMN_NAME: "Not_Applicable", DATA_TYPE: "int", IS_NULLABLE: "NO"},
                       {COLUMN_NAME: "Request_New_Column", DATA_TYPE: "int", IS_NULLABLE: "NO"}];
        for (let r in res){
          if(["Jurisdiction_ID","Law_ID","Provision_ID","Compliance_ID"].indexOf(res[r].COLUMN_NAME)>=0){
          }else{
            final_res.push(res[r])
          }
        }
        this.local_master_link[id].master_attribute_options = final_res;
      }).catch(err=>{
        console.log(err)
      })
  
  }

  getExcelHeaders(){
    this.server.getLinkageData(this.server_file_path).toPromise()
    .then(res => {
      this.local_master_link = res["data"]
    })
    .catch(err=>{
      return this.server.getExcelSheetHeaders(this.server_file_path).toPromise()
    })
    .then(res=>{
      res=new Object(res);
      for (let header in res){
        this.local_master_link.push({id:header,header:res[header], master_db:null,master_attribute:null,master_attribute_options:[]})
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  uploadFile(ev){
    let fd = new FormData();
    fd.append('upload', this.uploadRef.nativeElement.files[0]);      
    console.log(this.uploadRef.nativeElement.files[0])

    this.server.uploadSheetData(fd).toPromise()
    .then(res=>{
      console.log(res)
      if(res["success"]){
        this.server_file_path=''+res["file_name"]+'';
        setTimeout(this.getExcelHeaders.bind(this),89)  
      }else{
        throw Error("Upload unsuccessful")
      }
    })
    .catch(err=>{
      console.log(err)
    })
    
  }


  attributeMapComplete(){
    this.server.SaveLinkageData(this.local_master_link).toPromise()
    .then(res=>{
        console.log(res)
        this.navCtrl.push(ProcessExcelPage,{filepath:this.server_file_path})
     })
    .catch(err=>{
      console.log(err)
      this.error_msg="Error processing excel file"
    })
  }


}
