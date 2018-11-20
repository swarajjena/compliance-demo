webpackJsonp([0],{

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/import-excel/import-excel.module": [
		156
	],
	"../pages/master-page-data/master-page-data.module": [
		160
	],
	"../pages/master/master.module": [
		162
	],
	"../pages/process-excel/process-excel.module": [
		166
	],
	"../pages/retrive-data/retrive-data.module": [
		164
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportExcelPageModule", function() { return ImportExcelPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__import_excel__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ImportExcelPageModule = /** @class */ (function () {
    function ImportExcelPageModule() {
    }
    ImportExcelPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__import_excel__["a" /* ImportExcelPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__import_excel__["a" /* ImportExcelPage */]),
            ],
        })
    ], ImportExcelPageModule);
    return ImportExcelPageModule;
}());

//# sourceMappingURL=import-excel.module.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportExcelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__process_excel_process_excel__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ImportExcelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var URL = 'path_to_api';
var ImportExcelPage = /** @class */ (function () {
    function ImportExcelPage(navCtrl, navParams, el, server) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.el = el;
        this.server = server;
        this._READER = new FileReader();
        this._REMOTE_URI = "http://YOUR-REMOTE-URI-HERE/parse-upload.php";
        this.local_master_link = [];
        this.error_msg = "";
    }
    ImportExcelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ImportExcelPage');
    };
    ImportExcelPage.prototype.chooseDb = function (id) {
        var _this = this;
        console.log(this.local_master_link[id].master_db);
        this.server.getDatabaseColumns(this.local_master_link[id].master_db).toPromise()
            .then(function (res) {
            console.log(res);
            var final_res = [{ COLUMN_NAME: "Not_Applicable", DATA_TYPE: "int", IS_NULLABLE: "NO" },
                { COLUMN_NAME: "Request_New_Column", DATA_TYPE: "int", IS_NULLABLE: "NO" }];
            for (var r in res) {
                if (["Jurisdiction_ID", "Law_ID", "Provision_ID", "Compliance_ID"].indexOf(res[r].COLUMN_NAME) >= 0) {
                }
                else {
                    final_res.push(res[r]);
                }
            }
            _this.local_master_link[id].master_attribute_options = final_res;
        }).catch(function (err) {
            console.log(err);
        });
    };
    ImportExcelPage.prototype.getExcelHeaders = function () {
        var _this = this;
        this.server.getLinkageData().toPromise()
            .then(function (res) {
            _this.local_master_link = res["data"];
        })
            .catch(function (err) {
            return _this.server.getExcelSheetHeaders(_this.server_file_path).toPromise();
        })
            .then(function (res) {
            res = new Object(res);
            for (var header in res) {
                _this.local_master_link.push({ id: header, header: res[header], master_db: null, master_attribute: null, master_attribute_options: [] });
            }
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    ImportExcelPage.prototype.uploadFile = function (ev) {
        var _this = this;
        var fd = new FormData();
        fd.append('upload', this.uploadRef.nativeElement.files[0]);
        console.log(this.uploadRef.nativeElement.files[0]);
        this.server.uploadSheetData(fd).toPromise()
            .then(function (res) {
            console.log(res);
            if (res["success"]) {
                _this.server_file_path = '' + res["file_name"] + '';
                setTimeout(_this.getExcelHeaders.bind(_this), 89);
            }
            else {
                throw Error("Upload unsuccessful");
            }
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    ImportExcelPage.prototype.attributeMapComplete = function () {
        var _this = this;
        this.server.SaveLinkageData(this.local_master_link).toPromise()
            .then(function (res) {
            console.log(res);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__process_excel_process_excel__["a" /* ProcessExcelPage */], { filepath: _this.server_file_path });
        })
            .catch(function (err) {
            console.log(err);
            _this.error_msg = "Error processing excel file";
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('upload'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ImportExcelPage.prototype, "uploadRef", void 0);
    ImportExcelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-import-excel',template:/*ion-inline-start:"/Users/swarajjena/pwc/demo/src/pages/import-excel/import-excel.html"*/'<!--\n  Generated template for the ImportExcelPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n          \n    <ion-navbar class="con_head">\n          <button ion-button menuToggle>\n                  <ion-icon name="menu"></ion-icon>\n          </button>\n      \n      <ion-title>Upload Excel</ion-title>\n    </ion-navbar>\n  \n</ion-header>\n  \n\n<ion-content padding>\n\n    <ion-grid>\n        <ion-row class="align_content_center" class="align_content_center">\n          <ion-col col-5>\n            <ion-card>        \n              <ion-card-content>\n                  <ion-label color="secondary"  *ngIf="server_file_path && !erroe_msg">File Upload successful !!</ion-label>\n                  <ion-label color="danger"  *ngIf="error_msg">{{error_msg}}</ion-label>\n\n                  <input type="file" id="file-input"  #upload  *ngIf=" !server_file_path">\n\n                  <button ion-button clear color="header" (click)="uploadFile($event)"  *ngIf=" !server_file_path">Upload</button>\n\n                  \n              </ion-card-content>\n            </ion-card>          \n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    \n      <ion-grid *ngIf=" server_file_path">\n          <ion-row class="align_content_center" class="align_content_center" >\n              <ion-col col-6 style="text-align:center;font-size:20px;margin:10px">\n                  Please match excel attributes to master DB attributes\n              </ion-col>\n              <ion-col col-1>\n                  <button ion-button (click)="attributeMapComplete()">\n                      Next\n                  </button>\n              </ion-col>\n          </ion-row>\n        \n          <ion-row class="align_content_center" class="align_content_center" *ngFor="let header of local_master_link">\n            <ion-col col-3>\n                <ion-label>\n                  {{header.header}}\n                </ion-label>\n            </ion-col>\n            <ion-col col-3>\n\n                <ion-select [(ngModel)]="header[\'master_db\']" interface="popover" class="select_menu" (ionChange)="chooseDb(header[\'id\'])">\n                    <ion-option value="Jurisdiction_Master">Jurisdiction Master</ion-option>\n                    <ion-option value="Law_Master">Law Master</ion-option>\n                  </ion-select>              \n\n            </ion-col>\n            <ion-col col-3>\n                <ion-select [(ngModel)]="header[\'master_attribute\']" interface="popover"  class="select_menu" >\n                    <ion-option value="{{option.COLUMN_NAME}}" *ngFor="let option of header[\'master_attribute_options\']">{{option.COLUMN_NAME}}</ion-option>\n                </ion-select>              \n\n            </ion-col>\n\n\n          </ion-row>\n      </ion-grid>\n      \n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/swarajjena/pwc/demo/src/pages/import-excel/import-excel.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */]])
    ], ImportExcelPage);
    return ImportExcelPage;
}());

//# sourceMappingURL=import-excel.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessExcelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ProcessExcelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProcessExcelPage = /** @class */ (function () {
    function ProcessExcelPage(navCtrl, navParams, server) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.server = server;
        this.current_processing_table = "Jurisdiction_Master";
        this.jurisdiction_table_processed = false;
        this.inactive = false;
        this.server_file_path = this.navParams.get("filepath");
    }
    ProcessExcelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProcessExcelPage');
        this.retrive_table_headers(this.current_processing_table);
    };
    ProcessExcelPage.prototype.retrive_table_headers = function (table) {
        var _this = this;
        this.server.getLinkageData().toPromise()
            .then(function (res) {
            console.log(table);
            _this.local_master_link = res["data"].filter(function (data) {
                return (data.master_db == table && data.master_attribute != "Not_Applicable" && data.master_attribute != "Request_New_Column");
            });
            _this.retrive_table_data();
        })
            .catch(function (err) {
        });
    };
    ProcessExcelPage.prototype.retrive_table_data = function () {
        var _this = this;
        var column_ids = this.local_master_link.map(function (data) { return data.id; });
        this.server.getSheetDataForIDs(this.server_file_path, column_ids).toPromise()
            .then(function (res) {
            console.log(res);
            var unique_check = [];
            var data_array = new Object(res);
            _this.table_data = [];
            console.log(data_array);
            for (var row in data_array) {
                var data_string = data_array[row].join('');
                if (unique_check.indexOf(data_string) < 0) {
                    var data_row = data_array[row].map(function (el, ind) { return new Object({ id: ind, value: el }); });
                    _this.table_data.push({ id: row, data: data_row });
                    unique_check.push(data_string);
                }
            }
            console.log(_this.table_data);
        }).catch(function (err) { return console.log(err); });
    };
    ProcessExcelPage.prototype.validateData = function () {
        var _this = this;
        if (this.validated_data)
            return;
        this.server.validateData(this.current_processing_table, this.local_master_link, this.table_data).toPromise()
            .then(function (res) {
            var result = new Object(res);
            _this.validated_data = result["result"];
            console.log(res);
        })
            .catch(function (err) { console.log(err); });
    };
    ProcessExcelPage.prototype.storeValidatedData = function () {
        var _this = this;
        if (!this.validated_data || this.inactive)
            return;
        this.table_data;
        this.local_master_link;
        this.current_processing_table;
        console.log(this.local_master_link);
        var input_data = [];
        this.stored_data_names = [];
        for (var row in this.table_data) {
            if (this.validated_data[row].reduce(function (a, b) { return a + b; }, 0) == this.validated_data[row].length) {
                var obj = {};
                for (var el in this.table_data[row]["data"]) {
                    if (this.local_master_link[el]["header"] == "Law Name")
                        this.stored_data_names.push(this.table_data[row]["data"][el].value);
                    obj[this.local_master_link[el]["master_attribute"]] = this.table_data[row]["data"][el].value;
                }
                input_data.push(obj);
            }
        }
        this.server.storeValidatedData(this.current_processing_table, this.local_master_link, input_data, this.server_file_path).toPromise()
            .then(function (res) {
            var result = new Object(res);
            if (result["success"]) {
                if (_this.current_processing_table != "Law_Master")
                    _this.goToNextTable();
                else {
                    //          this.validated_data = undefined;  
                    var remove_rows = [];
                    var name_indx = "";
                    for (var el in _this.local_master_link) {
                        if (_this.local_master_link[el]["header"] == "Law Name")
                            name_indx = el;
                    }
                    for (var row in _this.table_data) {
                        var idex = _this.stored_data_names.indexOf(_this.table_data[row]["data"][name_indx].value);
                        if (idex >= 0)
                            remove_rows.push(row);
                    }
                    console.log(_this.stored_data_names);
                    console.log(remove_rows);
                    _this.stored_data_names = [];
                    for (var i = remove_rows.length - 1; i >= 0; i--)
                        _this.table_data.splice(remove_rows[i], 1);
                    _this.inactive = true;
                }
            }
        })
            .catch(function (err) { console.log(err); });
    };
    ProcessExcelPage.prototype.goToNextTable = function () {
        this.current_processing_table = "Law_Master";
        this.local_master_link = undefined;
        this.table_data = undefined;
        this.jurisdiction_table_processed = false;
        this.validated_data = undefined;
        this.retrive_table_headers(this.current_processing_table);
    };
    ProcessExcelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-process-excel',template:/*ion-inline-start:"/Users/swarajjena/pwc/demo/src/pages/process-excel/process-excel.html"*/'<!--\n  Generated template for the ProcessExcelPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>process Excel</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n     <ion-grid>\n       <ion-row>\n         <ion-col col-8>\n            <h2>Table : {{current_processing_table}}</h2>\n         </ion-col>\n         <ion-col col-4 *ngIf="table_data">\n            <button ion-button color="{{validated_data?\'content\':\'header\'}}" (click)="validateData()">Validate Data</button>\n            <button ion-button color="{{validated_data && !inactive?\'header\':\'content\'}}" (click)="storeValidatedData()">Store Validated Data</button>\n         </ion-col>\n         <ion-col col-4 *ngIf="!table_data || table_data.length==0">\n         </ion-col>\n             \n       </ion-row>\n     </ion-grid>\n\n\n    <table class="data_table" border="1">\n      <tr>\n          <th  *ngFor="let attribute of local_master_link">\n              {{attribute.header}}\n          </th>\n      </tr>\n\n      <tr *ngFor="let row of table_data">\n          <td  *ngFor="let val of row.data" [class.error_cell]="!(validated_data==undefined || validated_data[row.id][val.id])">\n              {{val.value}}\n          </td>\n      </tr>\n\n    </table>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/swarajjena/pwc/demo/src/pages/process-excel/process-excel.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */]])
    ], ProcessExcelPage);
    return ProcessExcelPage;
}());

//# sourceMappingURL=process-excel.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasterPageDataPageModule", function() { return MasterPageDataPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__master_page_data__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MasterPageDataPageModule = /** @class */ (function () {
    function MasterPageDataPageModule() {
    }
    MasterPageDataPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__master_page_data__["a" /* MasterPageDataPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__master_page_data__["a" /* MasterPageDataPage */]),
            ],
        })
    ], MasterPageDataPageModule);
    return MasterPageDataPageModule;
}());

//# sourceMappingURL=master-page-data.module.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MasterPageDataPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MasterPageDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MasterPageDataPage = /** @class */ (function () {
    function MasterPageDataPage(navCtrl, navParams, server) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.server = server;
        this.master_dbs = ["Jurisdiction_Master", "Law_Master", "Provision_Master", "Compliance_Master"];
        this.selectDB("Jurisdiction_Master");
    }
    MasterPageDataPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MasterPageDataPage');
    };
    MasterPageDataPage.prototype.selectDB = function (db) {
        var _this = this;
        this.selected_master_db = db;
        this.master_attributes = [];
        this.master_table_data = [];
        this.server.getDatabaseColumns(this.selected_master_db).toPromise()
            .then(function (res) {
            console.log(res);
            _this.master_attributes = res;
        }).catch(function (err) {
            console.log(err);
        });
        this.server.getDatabaseData(this.selected_master_db).toPromise()
            .then(function (res) {
            console.log(res);
            _this.master_table_data = res;
        }).catch(function (err) {
            console.log(err);
        });
    };
    MasterPageDataPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-master-page-data',template:/*ion-inline-start:"/Users/swarajjena/pwc/demo/src/pages/master-page-data/master-page-data.html"*/'<!--\n  Generated template for the MasterPageDataPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n        <button ion-button menuToggle>\n                <ion-icon name="menu"></ion-icon>\n        </button>\n\n    <ion-title>Compliance Master Data</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col col-3 *ngFor="let db of master_dbs">\n            <button ion-button  class="master_db_btn"  outline="{{db!=selected_master_db}}" color="content" (click)="selectDB(db)" >\n                {{db}}\n            </button>  \n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n          <ion-col col-7 >\n              <button ion-button icon-start outline color="content">\n                  <ion-icon name="add"></ion-icon>\n                  Add New Row\n              </button>          \n              <button ion-button icon-start outline  color="content">\n                  EXPORT\n              </button>          \n          </ion-col>\n          <ion-col col-5>\n              <ion-searchbar></ion-searchbar>\n          </ion-col>\n\n\n          <ion-col >\n          </ion-col>\n\n        </ion-row>\n        \n    </ion-grid>\n\n\n\n    <table class="table table-bordered">\n        <thead>\n          <tr>\n              <th *ngFor="let attr of master_attributes">{{attr.COLUMN_NAME}}</th>\n          </tr>\n        </thead>\n        <tbody>\n              <tr *ngFor="let row of master_table_data">\n                <td *ngFor="let attr of master_attributes">{{row[attr.COLUMN_NAME]}}</td>\n              </tr>\n        </tbody>\n      </table>      \n\n</ion-content>\n'/*ion-inline-end:"/Users/swarajjena/pwc/demo/src/pages/master-page-data/master-page-data.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */]])
    ], MasterPageDataPage);
    return MasterPageDataPage;
}());

//# sourceMappingURL=master-page-data.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasterPageModule", function() { return MasterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__master__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MasterPageModule = /** @class */ (function () {
    function MasterPageModule() {
    }
    MasterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__master__["a" /* MasterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__master__["a" /* MasterPage */]),
            ],
        })
    ], MasterPageModule);
    return MasterPageModule;
}());

//# sourceMappingURL=master.module.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MasterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MasterPage = /** @class */ (function () {
    function MasterPage(navCtrl, navParams, server) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.server = server;
        this.master_dbs = ["Jurisdiction_Master", "Law_Master", "Provision_Master", "Compliance_Master", "Forms_Templates_Master", "Questionnaire_master"];
        this.attribute_changed = false;
        this.attribute_rule_relation = {
            table_name: "",
            attribute_name: "",
            rules: [],
            options: []
        };
        this.limited_option_rule_id = -1;
    }
    MasterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MasterPage');
    };
    MasterPage.prototype.selectDB = function (db) {
        var _this = this;
        this.selected_master_db = db;
        this.selected_attr = null;
        this.server.getDatabaseColumns(this.selected_master_db).toPromise()
            .then(function (res) {
            console.log(res);
            _this.master_db_attributes = res;
        }).catch(function (err) {
            console.log(err);
        });
    };
    MasterPage.prototype.filterChange = function () {
        var _this = this;
        if (this.attribute_selected_as_filter) {
            this.server.removeFilterAttribute(this.selected_master_db, this.selected_attr.COLUMN_NAME).toPromise()
                .then(function (res) {
                _this.attribute_selected_as_filter = false;
            })
                .catch(function (err) { console.log(err); });
        }
        else {
            this.server.addFilterAttribute(this.selected_master_db, this.selected_attr.COLUMN_NAME).toPromise()
                .then(function (res) {
                _this.attribute_selected_as_filter = true;
            })
                .catch(function (err) { console.log(err); });
        }
    };
    MasterPage.prototype.selectAttribute = function (attr) {
        var _this = this;
        console.log(attr);
        this.attribute_changed = false;
        this.slected_limited_option = false;
        this.selected_attr = null;
        this.attribute_options = [];
        this.attribute_selected_as_filter = false;
        this.show_attr_filter = false;
        if (["Jurisdiction_ID", "Law_ID", "Provision_ID", "Compliance_ID"].indexOf(attr.COLUMN_NAME) >= 0)
            return;
        this.server.getAllValidationRules().toPromise()
            .then(function (res) {
            console.log(res);
            _this.all_rules = res;
            for (var _i = 0, _a = _this.all_rules; _i < _a.length; _i++) {
                var rule = _a[_i];
                console.log(rule);
                if (rule.Validation_Function_Name == "checkAllowLimitedOptions")
                    _this.limited_option_rule_id = rule.Validation_ID;
            }
        }).catch(function (err) {
            console.log(err);
        });
        this.server.getRulesForAttribute(this.selected_master_db, attr.COLUMN_NAME).toPromise()
            .then(function (res) {
            _this.attribute_rule_relation = {
                table_name: _this.selected_master_db,
                attribute_name: attr.COLUMN_NAME,
                rules: [],
                options: []
            };
            _this.selected_attr = attr;
            if (Array.isArray(res) && res.length > 0) {
                var applied_rules = res.map(function (rule) { return rule.Validation_ID; });
                if (res[0].Table_Name == _this.selected_master_db && res[0].Attribute_name == attr.COLUMN_NAME) {
                    _this.attribute_rule_relation.rules = applied_rules;
                }
                if (applied_rules.indexOf(_this.limited_option_rule_id) >= 0) {
                    _this.getLimitedOption();
                }
            }
            _this.server.checkFilterAttribute(_this.selected_master_db, _this.selected_attr.COLUMN_NAME).toPromise()
                .then(function (res) {
                res = new Object(res);
                _this.attribute_selected_as_filter = res["active"];
                _this.show_attr_filter = true;
            })
                .catch(function (err) {
                console.log(err);
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    MasterPage.prototype.ruleSelected = function (rule) {
        this.attribute_changed = true;
        if (this.attribute_rule_relation.rules.indexOf(rule.Validation_ID) >= 0) {
            var index = this.attribute_rule_relation.rules.indexOf(rule.Validation_ID);
            this.attribute_rule_relation.rules.splice(index, 1);
            this.server.removeRuleForAttribute(this.selected_master_db, this.selected_attr.COLUMN_NAME, rule.Validation_ID).toPromise()
                .then(function (res) { return console.log(res); })
                .catch(function (err) { return console.log(err); });
        }
        else {
            this.attribute_rule_relation.rules.push(rule.Validation_ID);
            this.server.addRuleForAttribute(this.selected_master_db, this.selected_attr.COLUMN_NAME, rule.Validation_ID).toPromise()
                .then(function (res) { return console.log(res); })
                .catch(function (err) { return console.log(err); });
        }
    };
    MasterPage.prototype.selectLimitedOption = function (rule) {
        this.ruleSelected(rule);
        this.getLimitedOption();
    };
    MasterPage.prototype.getLimitedOption = function () {
        var _this = this;
        this.open_add_option = false;
        this.slected_limited_option = !this.slected_limited_option;
        this.attribute_options = [];
        this.server.getOptionsForAttribute(this.selected_master_db, this.selected_attr.COLUMN_NAME).toPromise()
            .then(function (res) {
            console.log(res);
            if (Array.isArray(res) && res.length > 0) {
                _this.attribute_options = res;
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    MasterPage.prototype.addAttributeOption = function () {
        var _this = this;
        console.log(this.new_option);
        this.server.addOptionForAttribute(this.selected_master_db, this.selected_attr.COLUMN_NAME, this.new_option).toPromise()
            .then(function (res) {
            _this.open_add_option = false;
            _this.attribute_options.push({ 'Option_Name': _this.new_option });
        })
            .catch(function (err) { console.log(err); });
    };
    MasterPage.prototype.saveAttributeRules = function () {
    };
    MasterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-master',template:/*ion-inline-start:"/Users/swarajjena/pwc/demo/src/pages/master/master.html"*/'<!--\n  Generated template for the MasterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n          \n  <ion-navbar class="con_head">\n        <button ion-button menuToggle>\n                <ion-icon name="menu"></ion-icon>\n        </button>\n    \n    <ion-title>Compliance Master Database Structure</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row class="align_content_center">\n      <ion-col col-3>\n        <ion-card>        \n          <ion-card-content>\n            <ion-list>\n                <button ion-button class="master_db_btn"  clear color="header">\n                    Master Databases\n                </button>  \n\n                <button ion-button *ngFor="let db of master_dbs" class="master_db_btn" color="content" outline="{{db!=selected_master_db}}" (click)="selectDB(db)">\n                    {{db}}\n                </button>  \n            </ion-list>\n          </ion-card-content>\n        </ion-card>          \n      </ion-col>\n      <ion-col col-3  *ngIf="selected_master_db">\n          <ion-card>        \n              <ion-card-content>\n                  <ion-list *ngIf="selected_master_db">\n                      <button ion-button class="master_db_btn"  clear color="header" text-wrap>\n                          Attributes of {{selected_master_db}}\n                      </button>  \n        \n                      <button ion-button *ngFor="let attr of master_db_attributes"  color="content" class="master_db_btn"  outline="{{attr!=selected_attr}}" (click)="selectAttribute(attr)">\n                          {{attr.COLUMN_NAME}}\n                      </button>  \n\n                      <button ion-button icon-start clear  color="content" >\n                          <ion-icon name="add"></ion-icon>\n                          Add Attribute\n                      </button>\n                  </ion-list>\n                </ion-card-content>\n            </ion-card>          \n      </ion-col>\n      <ion-col col-4 *ngIf="selected_attr">\n            <ion-card>        \n              <ion-card-content>\n                  <ion-list *ngIf="selected_attr">\n                      <button ion-button class="master_db_btn"  clear color="header" text-wrap>\n                          Applicable validations for {{selected_attr.COLUMN_NAME}}\n                      </button>  \n\n                      \n                      <ion-item *ngFor="let rule of all_rules">\n                          <ion-label color="content" >{{rule.Validation_Name}}</ion-label>\n                          <ion-checkbox color="content" (ionChange)="rule.Validation_Function_Name==\'checkAllowLimitedOptions\'?selectLimitedOption(rule):ruleSelected(rule)" checked="{{attribute_rule_relation.rules.indexOf(rule.Validation_ID)>=0}}"></ion-checkbox>\n                      </ion-item>\n                                      \n        \n                  </ion-list>\n               </ion-card-content>\n            </ion-card>          \n\n            <ion-card *ngIf="show_attr_filter">        \n                    <ion-card-content>\n                        <ion-list >\n                            <ion-item >\n                                <ion-label color="content" >Use this attribute as data filter</ion-label>\n                                <ion-checkbox color="content" (ionChange)="filterChange()" checked="{{attribute_selected_as_filter}}"></ion-checkbox>\n                            </ion-item>                                                      \n                        </ion-list>\n                     </ion-card-content>\n            </ion-card>          \n                  \n            \n            <ion-card *ngIf="slected_limited_option">        \n                    <ion-card-content>\n                        <ion-list>\n                            <ion-label class="master_db_btn"  clear color="header" text-wrap style="text-transform:uppercase">\n                                Options for {{selected_attr.COLUMN_NAME}}\n                            </ion-label>  \n      \n                            <button ion-button outline color="content" *ngFor="let option of attribute_options">{{option.Option_Name}}</button>\n      \n                            <br/>\n                            <div style="display:flex;flex-direction:row">\n\n                                <ion-item  *ngIf="open_add_option" style="border:1px solid #444">\n                                        <ion-input type="new_option" [(ngModel)]="new_option"></ion-input>\n                                </ion-item>\n                                <button   *ngIf="open_add_option" outline item-right (click)="addAttributeOption()">ADD</button>\n        \n                                <button ion-button icon-start clear color="content"  *ngIf="!open_add_option" (click)="open_add_option=true">\n                                    <ion-icon name="add"></ion-icon>\n                                    Add Option\n                                </button>\n                            </div>\n                              \n              \n                        </ion-list>\n                    </ion-card-content>\n            </ion-card>          \n\n\n      </ion-col>\n\n  \n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/swarajjena/pwc/demo/src/pages/master/master.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */]])
    ], MasterPage);
    return MasterPage;
}());

//# sourceMappingURL=master.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RetriveDataPageModule", function() { return RetriveDataPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__retrive_data__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RetriveDataPageModule = /** @class */ (function () {
    function RetriveDataPageModule() {
    }
    RetriveDataPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__retrive_data__["a" /* RetriveDataPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__retrive_data__["a" /* RetriveDataPage */]),
            ],
        })
    ], RetriveDataPageModule);
    return RetriveDataPageModule;
}());

//# sourceMappingURL=retrive-data.module.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RetriveDataPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_server_server__ = __webpack_require__(34);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RetriveDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RetriveDataPage = /** @class */ (function () {
    function RetriveDataPage(navCtrl, navParams, server) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.server = server;
        this.all_filters = [];
        this.header = "ALL";
    }
    RetriveDataPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RetriveDataPage');
        this.getAllFilters();
    };
    RetriveDataPage.prototype.getAllFilters = function () {
        var _this = this;
        this.server.getAllFilters().toPromise()
            .then(function (res) {
            for (var attr in res) {
                _this.all_filters.push(res[attr]);
            }
            _this.all_filters = _this.all_filters.map(function (attr) { return new Object(__assign({ display: attr.Attribute_name.replace(/_/g, " "), selected: "ALL" }, attr, { options: [{ value: "ALL", label: "ALL" }] })); });
            _this.retriveFilterValues();
        })
            .catch(function (err) { console.log(err); });
    };
    RetriveDataPage.prototype.retriveFilterValues = function () {
        var _this = this;
        var _loop_1 = function (fid) {
            var filter = this_1.all_filters[fid];
            this_1.server.getFilterValues(filter.Table_Name, filter.Attribute_name).toPromise()
                .then(function (res) {
                var options = [];
                for (var f_val in res) {
                    options.push(res[f_val]);
                }
                console.log(options);
                options = options.map(function (option, key) { return new Object({ value: option[filter.Attribute_name], label: option[filter.Attribute_name] }); });
                _this.all_filters[fid]["options"] = _this.all_filters[fid]["options"].concat(options);
            })
                .catch(function (err) { console.log(err); });
        };
        var this_1 = this;
        for (var fid in this.all_filters) {
            _loop_1(fid);
        }
    };
    RetriveDataPage.prototype.filterData = function () {
        var _this = this;
        this.server.filterData(this.all_filters).toPromise()
            .then(function (res) {
            console.log(res);
            _this.filter_results = res;
            _this.active_result = _this.filter_results[0];
            _this.active_result_array = [];
            console.log(_this.active_result);
            for (var key in _this.active_result) {
                _this.active_result_array.push({ attr: key, value: _this.active_result[key] });
            }
        })
            .catch(function (err) { console.log(err); });
    };
    RetriveDataPage.prototype.makeResultActive = function (res) {
        this.active_result = res;
        this.active_result_array = [];
        for (var key in this.active_result) {
            this.active_result_array.push({ attr: key, value: this.active_result[key] });
        }
    };
    RetriveDataPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-retrive-data',template:/*ion-inline-start:"/Users/swarajjena/pwc/demo/src/pages/retrive-data/retrive-data.html"*/'<!--\n  Generated template for the RetriveDataPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n          \n    <ion-navbar class="con_head">\n          <button ion-button menuToggle>\n                  <ion-icon name="menu"></ion-icon>\n          </button>\n      \n      <ion-title>Retrive Data / Checklist</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n\n<ion-content padding>\n\n      <ion-grid>\n        <ion-row class="align_content_center" *ngFor="let attr of all_filters">\n                    <ion-col col-3>\n                          <ion-label >{{attr.display}}</ion-label>\n                    </ion-col>\n\n                    <ion-col col-3>\n                      <ion-select  [(ngModel)]="attr[\'selected\']" interface="popover" class="select_menu" >\n                          <ion-option *ngFor="let option of attr.options" value="{{option.value}}">{{option.label}}</ion-option>\n                      </ion-select>              \n                    </ion-col>\n                    \n        </ion-row>\n        <ion-row class="align_content_center">\n            <ion-col col-6>\n              <button color="content" ion-button (click)="filterData()">Retrive Data</button>\n            </ion-col>\n        </ion-row>\n      </ion-grid>\n\n\n      <ion-grid *ngIf="active_result">\n          <ion-row class="align_content_center">\n                      <ion-col col-3>\n                          <h3>Results</h3>\n                          <button  *ngFor="let row of filter_results" full color="content" ion-button clear="{{!(active_result===row)}}" class="law_button" (click)="makeResultActive(row)">{{row.Law_Name}}</button>\n                      </ion-col>\n  \n                      <ion-col col-6>\n                          <h3>Details</h3>\n                          <table class="filter_table" border=1>\n                              <tr *ngFor="let attr of active_result_array">\n                                  <td>{{attr.attr}}</td>\n                                  <td>{{attr.value}}</td>\n                              </tr>\n                          </table>\n\n                      </ion-col>\n                      \n          </ion-row>\n      </ion-grid>\n  \n  \n\n \n \n  \n</ion-content>\n'/*ion-inline-end:"/Users/swarajjena/pwc/demo/src/pages/retrive-data/retrive-data.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_server_server__["a" /* ServerProvider */]])
    ], RetriveDataPage);
    return RetriveDataPage;
}());

//# sourceMappingURL=retrive-data.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessExcelPageModule", function() { return ProcessExcelPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__process_excel__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProcessExcelPageModule = /** @class */ (function () {
    function ProcessExcelPageModule() {
    }
    ProcessExcelPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__process_excel__["a" /* ProcessExcelPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__process_excel__["a" /* ProcessExcelPage */]),
            ],
        })
    ], ProcessExcelPageModule);
    return ProcessExcelPageModule;
}());

//# sourceMappingURL=process-excel.module.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(234);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_master_master_module__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_master_page_data_master_page_data_module__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_server_server__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_import_excel_import_excel_module__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_retrive_data_retrive_data_module__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_file_upload__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_process_excel_process_excel_module__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__pages_master_master_module__["MasterPageModule"],
                __WEBPACK_IMPORTED_MODULE_8__pages_master_page_data_master_page_data_module__["MasterPageDataPageModule"],
                __WEBPACK_IMPORTED_MODULE_12__pages_retrive_data_retrive_data_module__["RetriveDataPageModule"],
                __WEBPACK_IMPORTED_MODULE_11__pages_import_excel_import_excel_module__["ImportExcelPageModule"],
                __WEBPACK_IMPORTED_MODULE_14__pages_process_excel_process_excel_module__["ProcessExcelPageModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/import-excel/import-excel.module#ImportExcelPageModule', name: 'ImportExcelPage', segment: 'import-excel', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/master-page-data/master-page-data.module#MasterPageDataPageModule', name: 'MasterPageDataPage', segment: 'master-page-data', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/master/master.module#MasterPageModule', name: 'MasterPage', segment: 'master', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/retrive-data/retrive-data.module#RetriveDataPageModule', name: 'RetriveDataPage', segment: 'retrive-data', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/process-excel/process-excel.module#ProcessExcelPageModule', name: 'ProcessExcelPage', segment: 'process-excel', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_13_ng2_file_upload__["FileUploadModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_server_server__["a" /* ServerProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_master_master__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_master_page_data_master_page_data__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_import_excel_import_excel__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_retrive_data_retrive_data__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_import_excel_import_excel__["a" /* ImportExcelPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.pages = [
            { title: "Master DB Structure", page: __WEBPACK_IMPORTED_MODULE_4__pages_master_master__["a" /* MasterPage */] },
            { title: "Master Data", page: __WEBPACK_IMPORTED_MODULE_5__pages_master_page_data_master_page_data__["a" /* MasterPageDataPage */] },
            { title: "Upload Sheet", page: __WEBPACK_IMPORTED_MODULE_6__pages_import_excel_import_excel__["a" /* ImportExcelPage */] },
            { title: "Retrive Data / Checklist", page: __WEBPACK_IMPORTED_MODULE_7__pages_retrive_data_retrive_data__["a" /* RetriveDataPage */] }
        ];
    }
    MyApp.prototype.openPage = function (p) {
        this.nav.setRoot(p.page);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/swarajjena/pwc/demo/src/app/app.html"*/'<ion-menu [content]="content">\n        <ion-header>\n          <ion-toolbar>\n          </ion-toolbar>\n        </ion-header>\n      \n        <ion-content>\n          <ion-list>\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n              {{p.title}}\n            </button>\n          </ion-list>\n        </ion-content>\n      \n</ion-menu>\n      \n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/swarajjena/pwc/demo/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/swarajjena/pwc/demo/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ionic Blank\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  The world is your oyster.\n  <p>\n    If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will be your guide.\n  </p>\n</ion-content>\n'/*ion-inline-end:"/Users/swarajjena/pwc/demo/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServerProvider = /** @class */ (function () {
    function ServerProvider(http) {
        this.http = http;
        this.SERVER_URI = "http://localhost:3000";
        console.log('Hello ServerProvider Provider');
    }
    ServerProvider.prototype.getDatabaseColumns = function (db_name) {
        return this.http.get(this.SERVER_URI + "/structure/table/" + db_name);
    };
    ServerProvider.prototype.getAllValidationRules = function () {
        return this.http.get(this.SERVER_URI + "/structure/list_compliances");
    };
    ServerProvider.prototype.getRulesForAttribute = function (table_name, attr_name) {
        return this.http.get(this.SERVER_URI + "/structure/get_rules/table/" + table_name + "/attr/" + attr_name);
    };
    ServerProvider.prototype.getOptionsForAttribute = function (table_name, attr_name) {
        return this.http.get(this.SERVER_URI + "/structure/get_options/table/" + table_name + "/attr/" + attr_name);
    };
    ServerProvider.prototype.addOptionForAttribute = function (table_name, attr_name, option_name) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.SERVER_URI + "/structure/add_option", { table: table_name, attr: attr_name, option: option_name });
    };
    ServerProvider.prototype.addRuleForAttribute = function (table_name, attr_name, rule) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.SERVER_URI + "/structure/add_rule", { table: table_name, attr: attr_name, rule: rule });
    };
    ServerProvider.prototype.removeRuleForAttribute = function (table_name, attr_name, rule) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.SERVER_URI + "/structure/remove_rule", { table: table_name, attr: attr_name, rule: rule });
    };
    ServerProvider.prototype.getDatabaseData = function (db_name) {
        return this.http.get(this.SERVER_URI + "/data/table/" + db_name);
    };
    ServerProvider.prototype.getLinkageData = function () {
        return this.http.get(this.SERVER_URI + "/import/attribute_linkage");
    };
    ServerProvider.prototype.SaveLinkageData = function (linkage) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.SERVER_URI + "/import/store_attribute_linkage", { linkage: linkage });
    };
    ServerProvider.prototype.uploadSheetData = function (form_data) {
        console.log("ok");
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA',
            })
        };
        return this.http.post(this.SERVER_URI + "/import/upload_file", form_data, httpOptions);
    };
    ServerProvider.prototype.getExcelSheetHeaders = function (file_name) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': "text/html",
            })
        };
        return this.http.get(this.SERVER_URI + "/import/sheet_headers/" + file_name);
    };
    ServerProvider.prototype.getSheetDataForIDs = function (filename, requested_ids) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.SERVER_URI + "/import/sheet_data", { filename: filename, requested_ids: requested_ids }, httpOptions);
    };
    ServerProvider.prototype.validateData = function (table_name, attribute_linkage, input_data) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.SERVER_URI + "/import/validate_data", { table_name: table_name, attribute_linkage: attribute_linkage, input_data: input_data }, httpOptions);
    };
    ServerProvider.prototype.storeValidatedData = function (table_name, attribute_linkage, input_data, filepath) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.SERVER_URI + "/import/store_validated_data", { table_name: table_name, attribute_linkage: attribute_linkage, input_data: input_data, filename: filepath }, httpOptions);
    };
    ServerProvider.prototype.getFilterAttributes = function () {
        return this.http.get(this.SERVER_URI + "/structure/filter_attributes");
    };
    ServerProvider.prototype.checkFilterAttribute = function (table_name, attr_name) {
        return this.http.get(this.SERVER_URI + "/structure/filter_attribute/table/" + table_name + "/attr/" + attr_name);
    };
    ServerProvider.prototype.addFilterAttribute = function (table_name, attr_name) {
        return this.http.get(this.SERVER_URI + "/structure/add_filter_attribute/table/" + table_name + "/attr/" + attr_name);
    };
    ServerProvider.prototype.removeFilterAttribute = function (table_name, attr_name) {
        return this.http.get(this.SERVER_URI + "/structure/remove_filter_attribute/table/" + table_name + "/attr/" + attr_name);
    };
    ServerProvider.prototype.getAllFilters = function () {
        return this.http.get(this.SERVER_URI + "/retrive/all_filters");
    };
    ServerProvider.prototype.getFilterValues = function (table, attr) {
        return this.http.get(this.SERVER_URI + "/retrive/filter_values/table/" + table + "/attr/" + attr);
    };
    ServerProvider.prototype.filterData = function (filters) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.SERVER_URI + "/retrive/filter_data", { filters: filters }, httpOptions);
    };
    ServerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ServerProvider);
    return ServerProvider;
}());

//# sourceMappingURL=server.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.js.map