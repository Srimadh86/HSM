
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {RevenueMasters } from 'src/app/models/user.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MndeletecountryComponent } from 'src/app/mndeletecountry/mndeletecountry.component';


@Component({
  selector: 'app-revenue-type-master',
  templateUrl: './revenue-type-master.component.html',
  styleUrls: ['./revenue-type-master.component.scss']
})
export class  RevenueTypeMasterComponent implements OnInit {
  masterData : any ;
  revenue :any;
  id:any;
  revenueId:any
  countryName:[]=[];
  shortName:any;
  isEdit:boolean;
  isDelete:boolean;
  isChecked:boolean =false ;
  isSelect:boolean = false;
  selectedID:any;
  displayedColumns: string[] = ['select','Sno','id', 'revenueValue','revenueTypeDescription'];
  dataSource: MatTableDataSource<RevenueMasters>;
  selection = new SelectionModel<RevenueMasters>(true, []);
  revenues: any = FormGroup;
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

  this.revenues = this.fb.group({
      revenueDescription: new FormControl('', [Validators.required]),
      revenueTypeValue: new FormControl('', [Validators.required]),
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
        this.revenueId = row.Revenue_Type_ID
        alert(this.revenueId)
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
        this.selectedID = s.Revenue_Type_ID
        this.revenues.get("revenueDescription").setValue(s.Revenue_Type_Description);
        this.revenues.get("revenueTypeValue").setValue(s.Revenue_Type_Value)
      });
       
    }
  }
  
  modifyRevenue() {
    this.isEdit = false;
    this.selection.selected.forEach((s) => {
      this.revenueId = s
    });
    const payload: RevenueMasters = {
      Revenue_Type_ID: this.revenueId.Revenue_Type_ID,
      Revenue_Type_Description: this.revenues.controls.revenueDescription.value,
      Revenue_Type_Value: this.revenues.controls.revenueTypeValue.value
    };

    //for testing
  
    this.masterDataService.modifyRevenueMaster(payload).subscribe((data)=>{
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
    this.revenueId = s.Revenue_Type_ID
  });
  let dialogDeleteData = {
      revenueId : this.revenueId,
      master : 'revenue',
      from:'delete'
  }
  this.dialog.open(AddmodifycountryComponent, {
    data:dialogDeleteData,
    width: '520px'
  });
  }
  getMasters() {
    this.masterDataService.getRevenueMatersData().subscribe((data) => {
      this.masterData = data.data;
      this.revenue = Array.from(this.masterData)
      const dataS = this.revenue.filter(row => row.status === 'Active')
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


