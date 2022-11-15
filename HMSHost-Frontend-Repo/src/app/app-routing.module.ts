import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './main-components/sign-in/sign-in.component';
import { HomeComponent } from './main-components/home/home.component';
import { AuthGuard } from './auth.guard';
import { MasterComponent } from './main-components/master/master.component';
import { UploadMasterDataComponent } from './main-components/upload-master-data/upload-master-data.component';
import { CountriesComponent } from './child-tables/countries/countries.component';
import { CountriesAddFormComponent } from './child-tables/add-components/countries-add-form/countries-add-form.component';
import { ConceptMastersComponent } from './child-tables/concept-masters/concept-masters.component';
import { ConceptMasterAddFormComponent } from './child-tables/add-components/concept-master-add-form/concept-master-add-form.component';
import { SequenceMasterComponent } from './child-tables/sequence-master/sequence-master.component';
import { SequenceAddFormComponent } from './child-tables/add-components/sequence-add-form/sequence-add-form.component';
import { RevenueTypeMasterComponent } from './child-tables/revenue-type-master/revenue-type-master.component';
import { RevenueAddFormComponent } from './child-tables/add-components/revenue-add-form/revenue-add-form.component';
import { MajorGroupMasterComponent } from './child-tables/major-group-master/major-group-master.component';
import { MajorGroupAddFormComponent } from './child-tables/add-components/major-group-add-form/major-group-add-form.component';
import { PriceLevelComponent } from './child-tables/price-level/price-level.component';
import { PriceLevelAddFormComponent } from './child-tables/add-components/price-level-add-form/price-level-add-form.component';
import { PriceNumberComponent } from './child-tables/price-number/price-number.component';
import { PriceNumberAddFormComponent } from './child-tables/add-components/price-number-add-form/price-number-add-form.component';

import { HmsChildComponent } from './main-components/hms-child/hms-child.component';
import { HmsMasterComponent } from './main-components/hms-master/hms-master.component';
import { HmsCreateComponent } from './main-components/hms-create/hms-create.component';
import { UploadTransactionMasterComponent } from './main-components/upload-transaction-master/upload-transaction-master.component';
import { TransactionDataMasterComponent } from './main-components/transaction-data-master/transaction-data-master.component';
import { TransactionChildComponent } from './main-components/transaction-child/transaction-child.component';
const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: "master",
        component: HmsMasterComponent,
      },
      {
        path: "master/:name",
        component: HmsChildComponent,
      },
      {
        path: "master/:name/add",
        component: HmsCreateComponent,
      },
      {
        path: 'upload-transaction-master',
        component: UploadTransactionMasterComponent,
      },
      {
        path: 'transaction-data-master',
        component: TransactionDataMasterComponent,
      },
      {
        path: 'transaction-child',
        component: TransactionChildComponent,
      },
      {
        path: 'master/countries',
        component: CountriesComponent,
      },
      {
        path: 'master/countries/add',
        component: CountriesAddFormComponent,
      },
      {
        path: 'master/conceptmasters',
        component: ConceptMastersComponent,
      },
      {
        path: 'master/conceptmasters/add',
        component: ConceptMasterAddFormComponent,
      },
      {
        path: 'uploadmaster',
        component: UploadMasterDataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
