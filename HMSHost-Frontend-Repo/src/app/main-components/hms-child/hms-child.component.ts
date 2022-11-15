import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDropDownEndPoint, replaceUnderScore, setBreadCrumbs, setDropDownInputValues } from 'src/app/helpers/helper';
import { MasterDataService } from 'src/app/Services/master-data.service';
declare let $: any;

@Component({
  selector: 'app-hms-child',
  templateUrl: './hms-child.component.html',
  styleUrls: ['./hms-child.component.scss']
})
export class HmsChildComponent implements OnInit {

  displayKeys = [];
  selectedKeys = [];
  editableFields = [];

  isLoading = true;
  breadCrumbs: any;

  commonData: any;
  searchText: any;

  // form

  editForm: FormGroup;
  submitted = false;
  dropdownList = [];
  crudAction: string;
  delItem: any;


  // pagination

  pageSize = 10;
  currentPage = 1;

  // checkbox

  showCheckBox = false;
  isChecked: boolean;
  urlValue: string;
  masterValue: string;
  apiResponse: string;
  isCheckedName: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private masterDataService: MasterDataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUrlData();
    this.breadCrumbs = setBreadCrumbs(location.pathname);
  }

  breadCrumbNavigation(navObj) {
    if (navObj.route === 'home') {
      this.router.navigate([`${navObj.route}`]);
    } else if (navObj.route === 'master') {
      this.router.navigate([`home/${navObj.route}`]);
    } if (navObj.route === this.urlValue) {
      this.router.navigate([`home/master/${navObj.route}`], { queryParams: { url: this.urlValue } });
    }
  }

  getUrlData() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.urlValue = params['url'];
      this.masterValue = params['name'];
      this.masterDataService
        .doGet(params['url'] + '/list')
        .subscribe(response => {
          this.isLoading = false;
          this.commonDataMapping(response.data);
        });
    });
  }

  commonDataMapping(data) {
    let allKeys;
    let selectedKeys = [];

    data.forEach((ele) => (allKeys = Object.keys(ele)));

    const excludedKeys = ['createdAt', 'updatedAt', 'ipAddress'];

    allKeys.forEach((key) => {
      if (!excludedKeys.includes(key)) {
        selectedKeys.push(key);
        this.displayKeys.push(replaceUnderScore(key));
      }
    });

    data.forEach(ele => {
      const keys = Object.keys(ele);
      keys.forEach((key) => {
        if (excludedKeys.includes(key)) {
          delete ele[key];
        }
      });
    });

    const filteredData = data.filter(ele => ele.status === 'Active');

    this.selectedKeys = selectedKeys;
    this.commonData = filteredData.reverse();

    this.setEditableFields();
  }

  setEditableFields() {
    const formFields = [];

    if (this.selectedKeys.length > 0) {

      const setBooleanValue = (ele, i) => {

        let booleanValue;

        if ((replaceUnderScore(ele).includes('ID') && i < 2 ? false : true)) {
          booleanValue = true;
        } else {
          booleanValue = false;
        }

        return booleanValue;
      };

      this.selectedKeys.forEach((ele, i) => {

        this.editableFields.push({
          key: ele,
          editable: setBooleanValue(ele, i),
        });
        if (this.editableFields[i].editable) {
          formFields.push(ele);
        }
      });
    }
  }

  get formControls() {
    return this.editForm.controls;
  }

  updateCheckBoxData(event, deleteObj?) {
    this.isChecked = !this.isChecked;
    this.isCheckedName = event.target.name;

    if (deleteObj) {
      this.delItem = deleteObj
    }
    this.editableFields = setDropDownInputValues(this.masterValue, this.editableFields, this.urlValue, 'update');
    console.log(this.editableFields);
    this.setDropDownValues(this.editableFields);
  }

  buildForm(obj) {

    this.selectedKeys.find(key => {
      if (key.includes('ID')) {
        this.editForm = this.formBuilder.group({});
        const formFields = this.editableFields;

        formFields.forEach((ele) => {
          this.editForm.addControl(
            ele.key,
            new FormControl(obj[ele.key], [Validators.required])
          );
        });
      }
    });

    this.isChecked ? this.crudAction = 'update' : this.crudAction = 'edit';
  }

  setDropDownValues(keys) {

    keys.forEach(key => {
      if (key.type === 'dropdown' && key.editable === true) {
        const endPoint = getDropDownEndPoint(key.key);
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

              if (key.key === Apikeys.filter(k => k === key.key).toString()) {
                if (ele[key.key]) {
                  dropdownList.push({
                    label: ele[key.key],
                    value: getEleId(Apikeys, ele)
                  });
                }
              }
            });
          }

        });

        this.dropdownList[key.key] = dropdownList;
      }
    });

    console.log(this.dropdownList);

  }

  // pagination

  selectPage(page: string) {
    this.pageSize = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    const FILTER_PAG_REGEX = /[^0-9]/g;
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  navigation() {
    window.location.reload();
  }

  updateData() {
    //  console.log(this.editForm.value)

    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    } else {

      const changePropertyNames = (data) => {

        const changes = {};
        const strNameReplace = /Name/gi;
        const strValueReplace = /Value/gi;
        let res;

        Object.keys(data).forEach((ele: any, i) => {

          const replaceIds = () => {
            this.dropdownList[ele].map(obj => {
              if (data[ele] === obj.label) {
                data[ele] = obj.value;
              }
            });
          }

          if (ele.includes('Name') && this.editableFields[i].type === 'dropdown' && this.editableFields[i].editable) {
            replaceIds();
            res = ele.replace(strNameReplace, "ID");
          } else if (ele.includes('Value') && this.editableFields[i].type === 'dropdown' && this.editableFields[i].editable) {
            replaceIds();
            res = ele.replace(strValueReplace, "ID");
          }
          changes[this.editableFields[i].type === 'dropdown' && this.editableFields[i].editable ? res : ele] = data[ele];
        });

        return changes;
      };

      const postData = changePropertyNames(this.editForm.value);
      let id = [];

      console.log(postData);

      this.selectedKeys.find((key, i) => {
        if (replaceUnderScore(key).includes('ID') && i < 2 ? true : false) {
          +id.push(this.editForm.value[key]).toString();
        }
      });

      this.masterDataService
        .doPost(`${this.urlValue}/edit/${id}`, postData)
        .subscribe((data: any) => {
          this.apiResponse = data.status === 'Success' ? 'Submission Successful' : 'Something went Wrong!';
          $('#myModal').modal('show');
        });
    }
  }

  showDelBoxDialog() {
    $('#deleteModal').modal('show');
  }

  deleteEntry(val) {
    let id;

    this.selectedKeys.find((key) => {
      if (key.includes('ID')) {
        id = this.delItem[key];
      }
    });

    console.log(id);

    if (val === 'Yes') {
      this.masterDataService
        .doDelete(`${this.urlValue}/delete/${id}`)
        .subscribe((data: any) => {
          this.apiResponse = data.status === 'Success' ? 'Deleted Successfully' : 'Something went Wrong!';
          $('#myModal').modal('show');
        });
    } else {
      $('#deleteModal').modal('hide');
    }
  }

  urlNavigation() {
    this.router.navigate([`home/master/${this.urlValue}/add`], { queryParams: { endPoint: this.urlValue, selectedKeys: JSON.stringify(this.selectedKeys), name: this.masterValue } });
  }

}
