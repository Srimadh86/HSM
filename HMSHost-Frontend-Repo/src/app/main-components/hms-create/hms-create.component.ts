import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { getDropDownEndPoint, setBreadCrumbs, setDropDownInputValues } from 'src/app/helpers/helper';
import { MasterDataService } from 'src/app/Services/master-data.service';
declare let $: any;

@Component({
  selector: 'app-hms-create',
  templateUrl: './hms-create.component.html',
  styleUrls: ['./hms-create.component.scss']
})
export class HmsCreateComponent implements OnInit {

  urlValue: any;
  masterValue: string;
  selectedKeys = [];

  breadCrumbs: any;

  // form

  createForm: FormGroup;
  dropdownList = [];
  submitted = false;
  apiResponse: string;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private masterDataService: MasterDataService, private router: Router) { }

  ngOnInit(): void {
    this.getUrlData();
    this.breadCrumbs = setBreadCrumbs(location.pathname);
  }

  breadCrumbNavigation(navObj) {
    if (navObj.route === 'home') {
      this.router.navigate([`${navObj.route}`]);
    } else if (navObj.route === 'master') {
      this.router.navigate([`home/${navObj.route}`]);
    } else if (navObj.route === this.urlValue) {
      this.router.navigate([`home/master/${navObj.route}`], { queryParams: { url: this.urlValue, name: this.masterValue } });
    }
  }

  getUrlData() {
    this.activatedRoute.queryParams.subscribe(params => {

      this.urlValue = params['endPoint'];
      this.masterValue = params['name'];
      this.selectedKeys = JSON.parse(params['selectedKeys']);

      this.selectedKeys.forEach((field, i) => {
        if (field.includes('ID') || field.includes('status')) {
          this.selectedKeys.splice(i, 1);
        }
      });
      this.selectedKeys = setDropDownInputValues(this.masterValue, this.selectedKeys, this.urlValue, 'create');
      this.buildForm(this.selectedKeys);
      this.setDropDownValues(this.selectedKeys);
    });
  }

  buildForm(formFields) {
    this.createForm = this.formBuilder.group({});

    formFields.forEach((ele) => {
      if (ele.label !== 'status') {
        this.createForm.addControl(
          ele.label,
          new FormControl('', [Validators.required])
        );
      }
    });
  }

  setDropDownValues(keys) {
    keys.forEach(key => {
      if (key.type === 'dropdown') {
        const endPoint = getDropDownEndPoint(key.label);
        const dropdownList = [];

        const getEleId = (elekeys, ele) => {
          let res;

          elekeys.forEach(Ekey => {
            if (Ekey.includes('ID')) {
              res = ele[Ekey]
            }
          });
          return res;
        };

        this.masterDataService.doGet(endPoint + '/list').subscribe(response => {

          if (response.data && response.data.length > 0) {
            response.data.forEach(ele => {
              const Apikeys = Object.keys(ele);

              if (key.label === Apikeys.filter(k => k === key.label).toString()) {
                if (ele[key.label]) {
                  dropdownList.push({
                    label: ele[key.label],
                    value: getEleId(Apikeys, ele)
                  });
                }
              }
            });
          }

        });

        this.dropdownList[key.label] = dropdownList;
      }
    });
    console.log(this.dropdownList);
  }

  get formControls() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    } else {

      const changePropertyNames = (data) => {

        const changes = {};
        const dataKeys = Object.keys(data);
        const strNameReplace = /Name/gi;
        const strValueReplace = /Value/gi;
        let res;

        this.selectedKeys.map(key => {

          dataKeys.map(ele => {
            if (ele.includes('Name') && key.label === ele && key.type !== 'input') {
              res = ele.replace(strNameReplace, "ID");
            } else if (ele.includes('Value') && key.label === ele && key.type !== 'input') {
              res = ele.replace(strValueReplace, "ID");
            }
          });

          // changes[key.type === 'input' ? key.label : res] = key.type === 'input' ? data[key.label] : +data[key.label];

          changes[key.type === 'input' ? key.label : res] = data[key.label];
        });

        return changes;
      };

      const postData = changePropertyNames(this.createForm.value);
      console.log(postData);

      this.masterDataService
        .doPost(`${this.urlValue}/add`, postData)
        .subscribe((data: any) => {
          this.apiResponse = data.status === 'Success' ? 'Data Saved Successfully' : 'Something went Wrong!';
          $('#myModal').modal('show');
        });
    }
  }

  updateData() {
    this.submitted = false;
    if (this.apiResponse === 'Data Saved Successfully') {
      const url = this.urlValue;

      this.router.navigate([`home/master/${this.urlValue}`], { queryParams: { url: this.urlValue, name: this.masterValue } });
      setTimeout(() => {
        window.location.reload();
      }, 300);

    } else {
      this.createForm.reset();
    }
  }

}
