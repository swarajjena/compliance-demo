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

  filter_results;

  header="ALL";

  active_result;
  active_result_array;

  constructor(public navCtrl: NavController, public navParams: NavParams,public server : ServerProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RetriveDataPage');
    this.getAllFilters()
  }


  getAllFilters(){
    this.server.getAllFilters().toPromise()
    .then(res=>{
        for(let attr in res){
           this.all_filters.push(res[attr])
        }

        this.all_filters =  this.all_filters.map(attr =>new Object({
                                                                  display:attr.Attribute_name.replace(/_/g," "),
                                                                  selected:"ALL",
                                                                  ...attr,
                                                                  options:[]}))

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
              options.push(res[f_val])
          }
          console.log(options)
          options=options.map((option,key)=>new Object({value:option[filter.Attribute_name],label:option[filter.Attribute_name]}))
          this.all_filters[fid]["options"]=[...this.all_filters[fid]["options"],...options]
      })
      .catch(err=>{console.log(err)})
    }
  }

  filterData(){
    this.server.filterData(this.all_filters).toPromise()
    .then(res=>{
        console.log(res)
        this.filter_results  = res;
        this.active_result =  this.filter_results[0];
        this.active_result_array = [];

        console.log(this.active_result);

        for(let key in this.active_result){
            this.active_result_array.push({attr:key,value:this.active_result[key]})
        }
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




}
