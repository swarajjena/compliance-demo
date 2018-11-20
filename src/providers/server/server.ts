import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {
  SERVER_URI="http://localhost:3000"

  constructor(public http: HttpClient) {
    console.log('Hello ServerProvider Provider');
  }

  getDatabaseColumns(db_name){
      return this.http.get(this.SERVER_URI+"/structure/table/"+db_name);
  }

  getAllValidationRules(){
    return this.http.get(this.SERVER_URI+"/structure/list_compliances");
  }

  getRulesForAttribute(table_name,attr_name){
    return this.http.get(this.SERVER_URI+"/structure/get_rules/table/"+table_name+"/attr/"+attr_name);
  }

  getOptionsForAttribute(table_name,attr_name){
    return this.http.get(this.SERVER_URI+"/structure/get_options/table/"+table_name+"/attr/"+attr_name);
  }

  addOptionForAttribute(table_name,attr_name,option_name){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.SERVER_URI+"/structure/add_option",{table:table_name,attr:attr_name,option:option_name});
  }

  addRuleForAttribute(table_name,attr_name,rule){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.SERVER_URI+"/structure/add_rule",{table:table_name,attr:attr_name,rule:rule});
  }

  removeRuleForAttribute(table_name,attr_name,rule){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.SERVER_URI+"/structure/remove_rule",{table:table_name,attr:attr_name,rule:rule});
  }


  getDatabaseData(db_name){
    return this.http.get(this.SERVER_URI+"/data/table/"+db_name);
  }

  getLinkageData(){
    return this.http.get(this.SERVER_URI+"/import/attribute_linkage");
  }

  SaveLinkageData(linkage){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.SERVER_URI+"/import/store_attribute_linkage",{linkage:linkage});
  }



  uploadSheetData(form_data){
    console.log("ok")
    let httpOptions = {
      headers: new HttpHeaders({
          'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA',
      })
    };
      
    return this.http.post(this.SERVER_URI+"/import/upload_file",form_data,httpOptions);
  }

  getExcelSheetHeaders(file_name){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "text/html",
      })
    };
    return this.http.get(this.SERVER_URI+"/import/sheet_headers/"+file_name);
  }


  getSheetDataForIDs(filename,requested_ids){      
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(this.SERVER_URI+"/import/sheet_data",{filename:filename,requested_ids:requested_ids},httpOptions);
  }


  validateData(table_name,attribute_linkage,input_data){      
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(this.SERVER_URI+"/import/validate_data",{table_name:table_name,attribute_linkage:attribute_linkage,input_data:input_data},httpOptions);
  }

  storeValidatedData(table_name,attribute_linkage,input_data,filepath){      
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(this.SERVER_URI+"/import/store_validated_data",{table_name:table_name,attribute_linkage:attribute_linkage,input_data:input_data,filename:filepath},httpOptions);
  }

  getFilterAttributes(){
    return this.http.get(this.SERVER_URI+"/structure/filter_attributes");
  }

  checkFilterAttribute(table_name,attr_name){
    return this.http.get(this.SERVER_URI+"/structure/filter_attribute/table/"+table_name+"/attr/"+attr_name);
  }


  addFilterAttribute(table_name,attr_name){
    return this.http.get(this.SERVER_URI+"/structure/add_filter_attribute/table/"+table_name+"/attr/"+attr_name);
  }

  removeFilterAttribute(table_name,attr_name){
    return this.http.get(this.SERVER_URI+"/structure/remove_filter_attribute/table/"+table_name+"/attr/"+attr_name);
  }

  getAllFilters(){
    return this.http.get(this.SERVER_URI+"/retrive/all_filters");
  }

  getFilterValues(table,attr){
    return this.http.get(this.SERVER_URI+"/retrive/filter_values/table/"+table+"/attr/"+attr);
  }

  filterData(filters){      
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(this.SERVER_URI+"/retrive/filter_data",{filters:filters},httpOptions);
  }

  


}
