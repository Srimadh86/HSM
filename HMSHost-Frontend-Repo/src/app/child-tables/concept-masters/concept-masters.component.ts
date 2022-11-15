import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptMasters, Countries } from 'src/app/models/user.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';


@Component({
  selector: 'app-concept-masters',
  templateUrl: './concept-masters.component.html',
  styleUrls: ['./concept-masters.component.scss']
})
export class  ConceptMastersComponent  implements OnInit {
  masterData : any ;
  users :any;
  id:any;
  conceptId:any
  conceptName:[]=[];
  shortName:any;
  isEdit:boolean;
  isDelete:boolean;
  isChecked:boolean =false ;
  isSelect:boolean = false;
  selectedID:any;
  displayedColumns: string[] = ['select','Sno','id', 'name','Description'];
  dataSource: MatTableDataSource<ConceptMasters>;
  selection = new SelectionModel<ConceptMasters>(true, []);
  conceptMasters: any = FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private masterDataService:MasterDataService,
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

  this.conceptMasters = this.fb.group({
      conceptDescription: new FormControl('', [Validators.required]),
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
        this.conceptId = row.Concept_ID
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
        this.selectedID = s.Concept_ID
        this.conceptMasters.get("conceptDescription").setValue(s.Concept_Description);
      });
       
    }
  }
  
  modifyconcept() {
    this.isEdit = false;
    this.selection.selected.forEach((s) => {
      this.conceptId = s
    });
    const payload: ConceptMasters = {
      Concept_ID: this.conceptId.Concept_ID,
      Concept_Name: this.conceptId.Concept_Name,
      Concept_Description: this.conceptMasters.controls.conceptDescription.value,
    };

    //for testing
  
    this.masterDataService.modifyConceptMaster(payload).subscribe((data)=>{
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
 deleteconcept() {
  this.selection.selected.forEach((s) => {
    this.conceptId = s.Concept_ID
  });
  let dialogDeleteData = {
      conceptId : this.conceptId,
      master : 'concept',
      from:'delete'
  }
  this.dialog.open(AddmodifycountryComponent, {
    data:dialogDeleteData,
    width: '520px'
  });
  }
  getMasters() {
    this.masterDataService.getConceptMatersData().subscribe((data) => {
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




