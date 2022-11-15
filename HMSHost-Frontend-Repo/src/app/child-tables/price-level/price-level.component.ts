
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pricelevelmasters } from 'src/app/models/user.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MndeletecountryComponent } from 'src/app/mndeletecountry/mndeletecountry.component';


@Component({
  selector: 'app-price-level',
  templateUrl: './price-level.component.html',
  styleUrls: ['./price-level.component.scss']
})
export class   PriceLevelComponent  implements OnInit {
  masterData : any ;
  pricelevel :any;
  id:any;
  pricelevelId:any
  countryName:[]=[];
  shortName:any;
  isEdit:boolean;
  isDelete:boolean;
  isChecked:boolean =false ;
  isSelect:boolean = false;
  selectedID:any;
  displayedColumns: string[] = ['select','Sno','id', 'pricelevelValue','pricelevelTypeDescription'];
  dataSource: MatTableDataSource<Pricelevelmasters>;
  selection = new SelectionModel<Pricelevelmasters>(true, []);
  pricelevels: any = FormGroup;
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

  this.pricelevels = this.fb.group({
      pricelevelDescription: new FormControl('', [Validators.required]),
      pricelevelTypeValue: new FormControl('', [Validators.required]),
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
        this.pricelevelId = row.Price_Level_ID
        alert(this.pricelevelId)
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
        this.selectedID = s.Price_Level_ID
        this.pricelevels.get("pricelevelDescription").setValue(s.Price_Level_Description);
        this.pricelevels.get("pricelevelTypeValue").setValue(s.Price_Level_Value)
      });
       
    }
  }
  
  modifypricelevel() {
    this.isEdit = false;
    this.selection.selected.forEach((s) => {
      this.pricelevelId = s
    });
    const payload: Pricelevelmasters = {
      Price_Level_ID: this.pricelevelId.Price_Level_ID,
      Price_Level_Description: this.pricelevels.controls.pricelevelDescription.value,
      Price_Level_Value: this.pricelevels.controls.pricelevelTypeValue.value
    };

    //for testing
  
    this.masterDataService.modifyPriceLevel(payload).subscribe((data)=>{
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
    this.pricelevelId = s.Price_Level_ID
  });
  let dialogDeleteData = {
      pricelevelId : this.pricelevelId,
      master : 'pricelevel',
      from:'delete'
  }
  this.dialog.open(AddmodifycountryComponent, {
    data:dialogDeleteData,
    width: '520px'
  });
  }
  getMasters() {
    this.masterDataService.getPriceLevelData().subscribe((data) => {
      this.masterData = data.data;
      this.pricelevel = Array.from(this.masterData)
      const dataS = this.pricelevel.filter(row => row.status === 'Active')
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



