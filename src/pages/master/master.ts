import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the MasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-master',
  templateUrl: 'master.html',
})

export class MasterPage {

  master_dbs=["Jurisdiction_Master","Law_Master","Provision_Master","Compliance_Master","Forms_Templates_Master","Questionnaire_master"]

  master_db_attributes;

  selected_master_db;

  selected_attr;

  slected_limited_option;

  attribute_changed=false;

  all_rules;

  open_add_option;  

  new_option;

  attribute_selected_as_filter;

  show_attr_filter;

  attribute_rule_relation={
                          table_name:"",
                          attribute_name:"",
                          rules:[],
                          options:[]
                        }
  
  attribute_options;

  limited_option_rule_id=-1;

  constructor(public navCtrl: NavController, public navParams: NavParams,public server:ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MasterPage');
  }

  selectDB(db){
    this.selected_master_db = db;
    this.selected_attr=null;
    this.server.getDatabaseColumns(this.selected_master_db).toPromise()
    .then(res=>{
      console.log(res)
      this.master_db_attributes=res;
    }).catch(err=>{
      console.log(err)
    })
  }


  filterChange(){
    if(this.attribute_selected_as_filter){
        this.server.removeFilterAttribute(this.selected_master_db,this.selected_attr.COLUMN_NAME).toPromise()
        .then(res=>{

          this.attribute_selected_as_filter=false;
        })
        .catch(err=>{console.log(err)})
    }else{
      this.server.addFilterAttribute(this.selected_master_db,this.selected_attr.COLUMN_NAME).toPromise()
      .then(res=>{
        this.attribute_selected_as_filter=true;
      })
      .catch(err=>{console.log(err)})
    }
  }

  selectAttribute(attr){
    console.log(attr)
    this.attribute_changed=false;
    this.slected_limited_option=false;
    this.selected_attr=null;
    this.attribute_options=[];
    this.attribute_selected_as_filter = false;
    this.show_attr_filter=false;

    if(["Jurisdiction_ID","Law_ID","Provision_ID","Compliance_ID"].indexOf(attr.COLUMN_NAME)>=0)
      return;


    this.server.getAllValidationRules().toPromise()
    .then(res => {
      console.log(res);
      this.all_rules=res;
      for(let rule of this.all_rules){
        console.log(rule)
        if(rule.Validation_Function_Name=="checkAllowLimitedOptions")
            this.limited_option_rule_id=rule.Validation_ID
      }
    }).catch(err => {
      console.log(err);
    })


    this.server.getRulesForAttribute(this.selected_master_db,attr.COLUMN_NAME).toPromise()
    .then(res => {
      this.attribute_rule_relation={
        table_name:this.selected_master_db,
        attribute_name:attr.COLUMN_NAME,
        rules:[],
        options:[]
      }
      this.selected_attr=attr;
      if(Array.isArray(res) && res.length>0){

        var applied_rules=res.map(rule => rule.Validation_ID);
        if(res[0].Table_Name== this.selected_master_db && res[0].Attribute_name==attr.COLUMN_NAME){
            this.attribute_rule_relation.rules=applied_rules;  
        }

        if(applied_rules.indexOf(this.limited_option_rule_id)>=0){
            this.getLimitedOption();
        }
      }

      this.server.checkFilterAttribute(this.selected_master_db,this.selected_attr.COLUMN_NAME).toPromise()
      .then(res=>{
        res=new Object(res);

        this.attribute_selected_as_filter = res["active"];
        this.show_attr_filter=true;
      })
      .catch(err=>{
        console.log(err)
      })    
    }).catch(err => {
      console.log(err);
    })
  }

  ruleSelected(rule){
    this.attribute_changed=true;
    if(this.attribute_rule_relation.rules.indexOf(rule.Validation_ID) >=0){
        let index=this.attribute_rule_relation.rules.indexOf(rule.Validation_ID);
        this.attribute_rule_relation.rules.splice(index, 1);
        this.server.removeRuleForAttribute(this.selected_master_db,this.selected_attr.COLUMN_NAME, rule.Validation_ID).toPromise()
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }else{
        this.attribute_rule_relation.rules.push(rule.Validation_ID);
        this.server.addRuleForAttribute(this.selected_master_db,this.selected_attr.COLUMN_NAME, rule.Validation_ID).toPromise()
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
  }

  selectLimitedOption(rule){
    this.ruleSelected(rule);
    this.getLimitedOption();
  }

  getLimitedOption(){
    this.open_add_option=false;
    this.slected_limited_option = !this.slected_limited_option;
    this.attribute_options=[];

    this.server.getOptionsForAttribute(this.selected_master_db,this.selected_attr.COLUMN_NAME).toPromise()
    .then(res => {
      console.log(res)
      if(Array.isArray(res) && res.length>0){
        this.attribute_options = res;
      }
    }).catch(err => {
      console.log(err);
    })

  }

  addAttributeOption(){
    console.log(this.new_option)
    this.server.addOptionForAttribute(this.selected_master_db,this.selected_attr.COLUMN_NAME,this.new_option).toPromise()
    .then(res=>{
        this.open_add_option=false;
        this.attribute_options.push({'Option_Name':this.new_option})
    })
    .catch(err=>{console.log(err)})

  }

  saveAttributeRules(){
    
  }



}
