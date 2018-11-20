import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasterPageDataPage } from './master-page-data';

@NgModule({
  declarations: [
    MasterPageDataPage,
  ],
  imports: [
    IonicPageModule.forChild(MasterPageDataPage),
  ],
})
export class MasterPageDataPageModule {}
