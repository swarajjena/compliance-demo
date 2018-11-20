import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the MasterPageDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-master-page-data',
  templateUrl: 'master-page-data.html',
})
export class MasterPageDataPage {
  master_dbs=["Jurisdiction_Master","Law_Master","Provision_Master","Compliance_Master"]

  selected_master_db:string;

  master_table_data:Object;

  master_attributes;


  constructor(public navCtrl: NavController, public navParams: NavParams,public server:ServerProvider) {
    this.selectDB("Jurisdiction_Master")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MasterPageDataPage');
  }

  selectDB(db){
    this.selected_master_db = db;
    this.master_attributes=[];
    this.master_table_data=[];

    this.server.getDatabaseColumns(this.selected_master_db).toPromise()
    .then(res=>{
      console.log(res)
      this.master_attributes=res;
    }).catch(err=>{
      console.log(err)
    })
    

    this.server.getDatabaseData(this.selected_master_db).toPromise()
    .then(res=>{
      console.log(res);
      this.master_table_data=res;
    }).catch(err=>{
      console.log(err)
    })


  }


}
