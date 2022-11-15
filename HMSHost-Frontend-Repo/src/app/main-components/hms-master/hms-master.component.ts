import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setBreadCrumbs } from 'src/app/helpers/helper';
import { MasterDataService } from 'src/app/Services/master-data.service';

@Component({
  selector: 'app-hms-master',
  templateUrl: './hms-master.component.html',
  styleUrls: ['./hms-master.component.scss']
})
export class HmsMasterComponent implements OnInit {

  mastersListData: any;
  searchText: any;

  isLoading = true;
  breadCrumbs: any;

  // pagination

  pageSize = 10;
  currentPage = 1;

  constructor(private router: Router, private masterDataService:MasterDataService) { }

  ngOnInit(): void {
    this.getMastersList();
    this.breadCrumbs = setBreadCrumbs(location.pathname);
  }

  breadCrumbNavigation(navObj) {
    if (navObj.route === 'home') {
      this.router.navigate([`${navObj.route}`]);
    } else if (navObj.route === 'master') {
      this.router.navigate([`home/${navObj.route}`]);
    }
  }
  
  getMastersList() {
    this.masterDataService.getMasterData().subscribe(data => {
      data.status == 'Success' ? this.mastersListData = data.data : alert('error');
      this.isLoading = false;
    });
  }

  dynamicUrlNavigation(url, name) {
    this.router.navigate([`home/master/${url}`], { queryParams: { url: url, name: name }, queryParamsHandling: 'merge'});
  }

  // pagination

  
  selectPage(page: string) {
		this.pageSize = parseInt(page, 10) || 1;
	}

  formatInput(input: HTMLInputElement) {
    const FILTER_PAG_REGEX = /[^0-9]/g;
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}

}
