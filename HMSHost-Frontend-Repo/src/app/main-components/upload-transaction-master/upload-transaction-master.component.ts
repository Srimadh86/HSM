import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setBreadCrumbs } from 'src/app/helpers/helper';

@Component({
  selector: 'app-upload-transaction-master',
  templateUrl: './upload-transaction-master.component.html',
  styleUrls: ['./upload-transaction-master.component.scss']
})
export class UploadTransactionMasterComponent implements OnInit {

  breadCrumbs: any;

  constructor(private router: Router) { 
    this.breadCrumbs = setBreadCrumbs(location.pathname);
  }

  breadCrumbNavigation(navObj) {
    if (navObj.route === 'home') {
      this.router.navigate([`${navObj.route}`]);
    } else if (navObj.route === 'upload-transaction-master') {
      this.router.navigate([`home/${navObj.route}`]);
    }
  }

  ngOnInit(): void {
  }

}
