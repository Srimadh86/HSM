import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Countries } from 'src/app/models/user.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MndeletecountryComponent } from 'src/app/mndeletecountry/mndeletecountry.component';


 @Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.scss']
  })
export class  CountriesComponent implements OnInit {
  masterData : any ;
  users :any;
  id:any;
  countryId:any
  countryName:[]=[];
  shortName:any;
  isEdit:boolean;
  isDelete:boolean;
  isChecked:boolean =false ;
  isSelect:boolean = false;
  selectedID:any;
  displayedColumns: string[] = ['select','Sno','id', 'name','shortName','currency','symbol'];
  dataSource: MatTableDataSource<Countries>;
  selection = new SelectionModel<Countries>(true, []);
  countries: any = FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private masterDataService : MasterDataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
    ) {
    this.id=this.route.snapshot.params['id']

  }
  ngOnInit(): void {
  this.getMasters();
  this.isEdit = false
  this.isDelete = false

  this.countries = this.fb.group({
      countryShortName: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      currencySymbol: new FormControl('', [Validators.required]),
  });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => {
        this.selection.select(row);
        this.countryId = row.Country_ID
        alert(this.countryId)
      });
  }
select(){
  if(this.isSelect == false){
    this.isSelect = true;
  }
}
  logSelection() {
    if(this.isChecked == false){
      this.isChecked = true;
      this.isSelect = false;
      this.selection.selected.forEach((s) => {
        this.selectedID = s.Country_ID
        this.countries.get("countryShortName").setValue(s.Country_Short_Name);
        this.countries.get("currency").setValue(s.Currency)
        this.countries.get("currencySymbol").setValue(s.Currency_Symbol)
      });
       
    }
  }
  
  modifyCountry() {
    this.isEdit = false;
    this.selection.selected.forEach((s) => {
      this.countryId = s
    });
    const payload: Countries = {
      Country_ID: this.countryId.Country_ID,
      Country_Name: this.countryId.Country_Name,
      Country_Short_Name: this.countries.controls.countryShortName.value,
      Currency: this.countries.controls.currency.value,
      Currency_Symbol: this.countries.controls.currencySymbol.value,
    };

    //for testing
  
    this.masterDataService.modifyCountry(payload).subscribe((data)=>{
      console.log(data.message)
      let dialogData = {
        status:data.message,
        from: "update"
      }
      this.dialog.open(AddmodifycountryComponent, {
        data: dialogData,
        width: '500px'
      })
  },
  (error)=>{
    console.log(error)
  })
  }
 deleteCountry() {
  this.selection.selected.forEach((s) => {
    this.countryId = s.Country_ID
  });
  let dialogDeleteData = {
      countryId : this.countryId,
      master : 'country',
      from:'delete'
  }
  this.dialog.open(AddmodifycountryComponent, {
    data:dialogDeleteData,
    width: '520px'
  });
  }
  getMasters() {
    this.masterDataService.getCountiesData().subscribe((data) => {
      this.masterData = data.data;
      this.users = Array.from(this.masterData)
      const dataS = this.users.filter(row => row.status === 'Active')
      this.dataSource = new MatTableDataSource(dataS);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    return this.masterData;
  }

edit(){
  console.log(this.masterData,"master")
  if(this.isEdit == false){
    console.log(this.masterData)
    this.isEdit = true
    this.isDelete = false
    console.log(this.isEdit,"this,edit")
  }
}
delete(){
  if(this.isDelete == false){
    this.isDelete = true
    this.isEdit = false
    console.log(this.isDelete,"this,edit")
  }
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

