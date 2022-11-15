import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as data from "./../../../assets/pre-step-data.json";

@Component({
  selector: 'app-transaction-child',
  templateUrl: './transaction-child.component.html',
  styleUrls: ['./transaction-child.component.scss']
})
export class TransactionChildComponent implements OnInit {

  transactionName: string;
  searchText: any;
  transactionData = [];
  headers = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUrlData();
  }

  getUrlData() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.transactionName = params['transactionName'];
    });
    // should replace this with API when completed..!
    this.transactionData = data.data;
    this.headers = data.headers;
  }

}
