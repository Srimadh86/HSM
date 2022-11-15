import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { setBreadCrumbs } from 'src/app/helpers/helper';
import { MasterDataService } from 'src/app/Services/master-data.service';

@Component({
  selector: 'app-transaction-data-master',
  templateUrl: './transaction-data-master.component.html',
  styleUrls: ['./transaction-data-master.component.scss']
})
export class TransactionDataMasterComponent implements OnInit {

  breadCrumbs: any;

  airportLocations = [];
  batchNumbers = [];
  transactionRadioOptions = [
    { label: 'HMSHost Pre Step Data', value: 'hms-pre-step' },
    { label: 'HMSHost Menu Data', value: 'hms-menu' },
    { label: 'Comp Store Restaurant Data', value: 'comp-restaurant' },
    { label: 'Comp Store Menu Data', value: 'comp-menu' },
  ];

  transactionDataForm: FormGroup;

  constructor(private router: Router, private masterDataService: MasterDataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.breadCrumbs = setBreadCrumbs(location.pathname);
    this.getAirportLocationAndBatchNames();
    this.buildForm();
  }

  breadCrumbNavigation(navObj) {
    if (navObj.route === 'home') {
      this.router.navigate([`${navObj.route}`]);
    } else if (navObj.route === 'transaction-data-master') {
      this.router.navigate([`home/${navObj.route}`]);
    }
  }

  getAirportLocationAndBatchNames() {

    const endPointNames = ['airlocations', 'hmshostbatchmaster'];

    endPointNames.map(endPoint => {
      this.masterDataService.doGet(endPoint + '/list').subscribe(response => {

        response.data.forEach(ele => {
          if (endPoint === 'airlocations') {
            this.airportLocations.push({
              label: ele.Airport_Name,
              value: ele.Airport_Location_ID
            });
          } else if (endPoint === 'hmshostbatchmaster') {
            this.batchNumbers.push({
              label: ele.Transaction_Start_Date,
              value: ele.HMSHost_Batch_ID
            });
          }
        });

      });
    });
  }

  buildForm() {
    this.transactionDataForm = new FormGroup({
      airportLocation: new FormControl('', [Validators.required]),
      batchNo: new FormControl('', [Validators.required]),
      transaction: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    // queryParams should be dynamic after API implementation
    this.router.navigate([`home/transaction-child`], { queryParams: { transactionName: 'HMSHost Pre Step Data' } });
  }

}
