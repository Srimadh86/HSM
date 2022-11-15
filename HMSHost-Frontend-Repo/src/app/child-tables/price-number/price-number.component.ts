
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceNumbermasters } from 'src/app/models/user.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MndeletecountryComponent } from 'src/app/mndeletecountry/mndeletecountry.component';


@Component({
  selector: 'app-price-number',
  templateUrl: './price-number.component.html',
  styleUrls: ['./price-number.component.scss']
})
export class PriceNumberComponent  implements OnInit {
  masterData : any ;
  priceNumber :any;
  id:any;
  priceNumberId:any
  countryName:[]=[];
  shortName:any;
  isEdit:boolean;
  isDelete:boolean;
  isChecked:boolean =false ;
  isSelect:boolean = false;
  selectedID:any;
  displayedColumns: string[] = ['select','Sno','id', 'priceNumberValue','priceNumberTypeDescription'];
  dataSource: MatTableDataSource<PriceNumbermasters>;
  selection = new SelectionModel<PriceNumbermasters>(true, []);
  priceNumbers: any = FormGroup;
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

  this.priceNumbers = this.fb.group({
      priceNumberDescription: new FormControl('', [Validators.required]),
      priceNumberTypeValue: new FormControl('', [Validators.required]),
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
        this.priceNumberId = row.Price_Number_ID
        alert(this.priceNumberId)
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
        this.selectedID = s.Price_Number_ID
        this.priceNumbers.get("priceNumberDescription").setValue(s.Price_Number_Description);
        this.priceNumbers.get("priceNumberTypeValue").setValue(s.Price_Number_Value)
      });
       
    }
  }
  
  modifypriceNumber() {
    this.isEdit = false;
    this.selection.selected.forEach((s) => {
      this.priceNumberId = s
    });
    const payload: PriceNumbermasters = {
      Price_Number_ID: this.priceNumberId.Price_Number_ID,
      Price_Number_Description: this.priceNumbers.controls.priceNumberDescription.value,
      Price_Number_Value: this.priceNumbers.controls.priceNumberTypeValue.value
    };

    //for testing
  
    this.masterDataService.modifyPriceNumber(payload).subscribe((data)=>{
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
    this.priceNumberId = s.Price_Number_ID
  });
  let dialogDeleteData = {
      priceNumberId : this.priceNumberId,
      master : 'priceNumber',
      from:'delete'
  }
  this.dialog.open(AddmodifycountryComponent, {
    data:dialogDeleteData,
    width: '520px'
  });
  }
  getMasters() {
    this.masterDataService.getPriceNumberData().subscribe((data) => {
      this.masterData = data.data;
      this.priceNumber = Array.from(this.masterData)
      const dataS = this.priceNumber.filter(row => row.status === 'Active')
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



