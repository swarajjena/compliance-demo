import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { ThrowStmt } from '@angular/compiler';
import { keyframes } from '@angular/core/src/animation/dsl';

/**
 * Generated class for the RetriveDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-retrive-data',
  templateUrl: 'retrive-data.html',
})
export class RetriveDataPage {

  all_filters=[];

  jurisdiction_filters = [];
  law_filters = [];
  provision_filters = [];
  compliance_filters = [];

  filter_results;
  filter_results_array;

  header="ALL";

  active_result;
  active_result_array;

  showFilters = true;

  flat_table = false;

  output ={law:true, provision:false, compliance:false}

  constructor(public navCtrl: NavController, public navParams: NavParams,public server : ServerProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RetriveDataPage');
    this.getAllFilters()
  }


  getAllFilters(){
    this.server.getAllFilters().toPromise()
    .then(res=>{
        console.log(res)
        for(let attr in res){
           this.all_filters.push(res[attr])
        }

        this.all_filters =  this.all_filters.map(attr =>new Object({
                                                                  display:attr.Attribute_name.replace(/_/g," "),
                                                                  ...attr,
                                                                  options:[]}))

        this.jurisdiction_filters = this.all_filters.map((v,k)=>{ v.m_id = k; return v}).filter(filter =>  filter["Table_Name"]=="Jurisdiction_Master").map(v=>v.m_id);
        this.law_filters = this.all_filters.map((v,k)=>{ v.m_id = k; return v}).filter(filter =>  filter["Table_Name"]=="Law_Master").map(v=>v.m_id);
        this.provision_filters = this.all_filters.map((v,k)=>{ v.m_id = k; return v}).filter(filter =>  filter["Table_Name"]=="Provision_Master").map(v=>v.m_id);
        this.compliance_filters = this.all_filters.map((v,k)=>{ v.m_id = k; return v}).filter(filter =>  filter["Table_Name"]=="Compliance_Master").map(v=>v.m_id);

        console.log(this.jurisdiction_filters)
        console.log(this.law_filters)
        console.log(this.provision_filters)
        console.log(this.compliance_filters)
        this.retriveFilterValues()
    })
    .catch(err=>{console.log(err)})

  }


  retriveFilterValues(){
    for(let fid in this.all_filters){
      let filter=this.all_filters[fid];
      this.server.getFilterValues(filter.Table_Name,filter.Attribute_name).toPromise()
      .then(res=>{
          let options=[]
          for (let f_val in res){
              console.log(res[f_val])
              if(res[f_val][filter.Attribute_name]!=null && res[f_val][filter.Attribute_name].trim()!=="null")
              options.push(res[f_val])
          }
          options=options.map((option,key)=>new Object({value:option[filter.Attribute_name],label:option[filter.Attribute_name]}))
          this.all_filters[fid]["options"]=[...this.all_filters[fid]["options"],...options]
      })
      .catch(err=>{console.log(err)})
    }
  }

  processResult(res){
    this.filter_results  = res;
    this.active_result =  this.filter_results[0];
    this.active_result_array = [];

    console.log(this.active_result);

    for(let key in this.active_result){
        this.active_result_array.push({attr:key,value:this.active_result[key]})
    }

  }

  processResultFlatTable(res){
    this.filter_results  = res;
    this.active_result =  this.filter_results[0];
    this.active_result_array = [];
    for(let key in this.active_result){
      this.active_result_array.push({attr:key,value:this.active_result[key]})
    }

    console.log(this.active_result);
    this.filter_results_array = [];

    for (let row of this.filter_results){
      let result_array = [];
      for(let key in row){
        result_array.push({attr:key,value:row[key]})
      }
      this.filter_results_array.push(result_array)
    }


  }


  retriveData(){
    this.server.filterData(this.all_filters,this.output).toPromise()
    .then(res=>{
        this.processResult(res);
        this.toggleFilters();
        console.log(res);
    })
    .catch(err=>{console.log(err)})  
  }

  retriveAll(){
    this.flat_table = false;
    this.retriveData();    
  }


  retriveFlatTable(){
      this.flat_table = true;
      this.server.filterData(this.all_filters,this.output).toPromise()
      .then(res=>{
          this.processResultFlatTable(res);
          this.toggleFilters();
          console.log(res);
      })
      .catch(err=>{console.log(err)})  
    }


  makeResultActive(res){
      this.active_result=res;
      this.active_result_array = []
      for(let key in this.active_result){
        this.active_result_array.push({attr:key,value:this.active_result[key]})
      }

  }

  toggleFilters(){
    this.showFilters = ! this.showFilters;
  }




}
