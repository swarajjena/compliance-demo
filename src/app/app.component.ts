import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MasterPage } from '../pages/master/master';
import { MasterPageDataPage } from '../pages/master-page-data/master-page-data';
import { ImportExcelPage } from '../pages/import-excel/import-excel';
import { RetriveDataPage } from '../pages/retrive-data/retrive-data';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, page: any}>;

  rootPage:any = MasterPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages=[
      {title:"Master DB Structure",page:MasterPage},
      {title:"Master Data",page:MasterPageDataPage},
      {title:"Upload Sheet",page:ImportExcelPage},
      {title:"Retrive Data / Checklist",page:RetriveDataPage}
    ]
  
  }


  openPage(p){
    this.nav.setRoot(p.page)
  }
}

