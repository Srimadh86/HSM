
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MajorGroupMasters } from 'src/app/models/user.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MndeletecountryComponent } from 'src/app/mndeletecountry/mndeletecountry.component';


@Component({
  selector: 'app-major-group-master',
  templateUrl: './major-group-master.component.html',
  styleUrls: ['./major-group-master.component.scss']
})
export class  MajorGroupMasterComponent implements OnInit {
  masterData : any ;
  major :any;
  id:any;
  majorId:any
  countryName:[]=[];
  shortName:any;
  isEdit:boolean;
  isDelete:boolean;
  isChecked:boolean =false ;
  isSelect:boolean = false;
  selectedID:any;
  displayedColumns: string[] = ['select','Sno','id', 'majorValue'];
  dataSource: MatTableDataSource<MajorGroupMasters>;
  selection = new SelectionModel<MajorGroupMasters>(true, []);
  majors: any = FormGroup;
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

  this.majors = this.fb.group({
      majorGroupName: new FormControl('', [Validators.required]),
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
        this.majorId = row.Major_Group_ID
        alert(this.majorId)
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
        this.selectedID = s.Major_Group_ID
        this.majors.get("majorGroupName").setValue(s.Major_Group_Name);
      });
       
    }
  }
  
  modifymajor() {
    this.isEdit = false;
    this.selection.selected.forEach((s) => {
      this.majorId = s
    });
    const payload: MajorGroupMasters = {
      Major_Group_ID: this.majorId.Major_Group_ID,
      Major_Group_Name: this.majors.controls.majorGroupName.value,
    };

    //for testing
  
    this.masterDataService.modifyMajorGroupMaster(payload).subscribe((data)=>{
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
    this.majorId = s.Major_Group_ID
  });
  let dialogDeleteData = {
      majorId : this.majorId,
      master : 'major',
      from:'delete'
  }
  this.dialog.open(AddmodifycountryComponent, {
    data:dialogDeleteData,
    width: '520px'
  });
  }
  getMasters() {
    this.masterDataService.getMajorGroupMatersData().subscribe((data) => {
      this.masterData = data.data;
      this.major = Array.from(this.masterData)
      const dataS = this.major.filter(row => row.status === 'Active')
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




