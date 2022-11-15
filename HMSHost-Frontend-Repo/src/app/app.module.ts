import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SignInComponent } from './main-components/sign-in/sign-in.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './main-components/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DatePipe } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { StepperMenuComponent } from './main-components/stepper-menu/stepper-menu.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { SubMenu2Component } from './sub-menu2/sub-menu2.component';
import { MasterComponent } from './main-components/master/master.component';
import { UploadMasterDataComponent } from './main-components/upload-master-data/upload-master-data.component';
import { CountriesComponent } from './child-tables/countries/countries.component';
import { ConceptMastersComponent } from './child-tables/concept-masters/concept-masters.component';
import { CountriesAddFormComponent } from './child-tables/add-components/countries-add-form/countries-add-form.component';
import { AddmodifycountryComponent } from './addmodifycountry/addmodifycountry.component';
import { MAT_DIALOG_DEFAULT_OPTIONS,MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MndeletecountryComponent } from './mndeletecountry/mndeletecountry.component';
import { ConceptMasterAddFormComponent } from './child-tables/add-components/concept-master-add-form/concept-master-add-form.component';
import { RevenueTypeMasterComponent } from './child-tables/revenue-type-master/revenue-type-master.component';
import { SequenceMasterComponent } from './child-tables/sequence-master/sequence-master.component';
import { RevenueAddFormComponent } from './child-tables/add-components/revenue-add-form/revenue-add-form.component';
import { SequenceAddFormComponent } from './child-tables/add-components/sequence-add-form/sequence-add-form.component';
import { MajorGroupMasterComponent } from './child-tables/major-group-master/major-group-master.component';
import { PriceLevelComponent } from './child-tables/price-level/price-level.component';
import { PriceNumberComponent } from './child-tables/price-number/price-number.component';
import { MajorGroupAddFormComponent } from './child-tables/add-components/major-group-add-form/major-group-add-form.component';
import { PriceLevelAddFormComponent } from './child-tables/add-components/price-level-add-form/price-level-add-form.component';
import { PriceNumberAddFormComponent } from './child-tables/add-components/price-number-add-form/price-number-add-form.component';

import { FilterPipe } from './pipes/filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HmsMasterComponent } from './main-components/hms-master/hms-master.component';
import { HmsChildComponent } from './main-components/hms-child/hms-child.component';
import { HmsCreateComponent } from './main-components/hms-create/hms-create.component';
import { UploadTransactionMasterComponent } from './main-components/upload-transaction-master/upload-transaction-master.component';
import { TransactionDataMasterComponent } from './main-components/transaction-data-master/transaction-data-master.component';
import { TransactionChildComponent } from './main-components/transaction-child/transaction-child.component';

 
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    StepperMenuComponent,
    SubMenuComponent,
    SubMenu2Component,
    MasterComponent,
    UploadMasterDataComponent,
    CountriesComponent,
    ConceptMastersComponent,
    CountriesAddFormComponent,
    AddmodifycountryComponent,
    MndeletecountryComponent,
    ConceptMasterAddFormComponent,
    RevenueTypeMasterComponent,
    SequenceMasterComponent,
    RevenueAddFormComponent,
    SequenceAddFormComponent,
    MajorGroupMasterComponent,
    PriceLevelComponent,
    PriceNumberComponent,
    MajorGroupAddFormComponent,
    PriceLevelAddFormComponent,
    PriceNumberAddFormComponent,
    FilterPipe,
    HmsMasterComponent,
    HmsChildComponent,
    HmsCreateComponent,
    UploadTransactionMasterComponent,
    TransactionDataMasterComponent,
    TransactionChildComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    FlexLayoutModule,
    PdfViewerModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [DatePipe, MatDialog,   {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AddmodifycountryComponent]
})
export class AppModule { }
