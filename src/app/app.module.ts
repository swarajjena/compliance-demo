import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MasterPageModule } from '../pages/master/master.module';
import { MasterPageDataPageModule } from '../pages/master-page-data/master-page-data.module';
import { ServerProvider } from '../providers/server/server';
import { HttpClientModule }    from '@angular/common/http';
import { ImportExcelPageModule } from '../pages/import-excel/import-excel.module';
import { RetriveDataPageModule } from '../pages/retrive-data/retrive-data.module';
import { FileUploadModule } from 'ng2-file-upload';
import { ProcessExcelPage } from '../pages/process-excel/process-excel';
import { ProcessExcelPageModule } from '../pages/process-excel/process-excel.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    MasterPageModule,
    MasterPageDataPageModule,
    RetriveDataPageModule,
    ImportExcelPageModule,
    ProcessExcelPageModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FileUploadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServerProvider
  ]
})
export class AppModule {}
