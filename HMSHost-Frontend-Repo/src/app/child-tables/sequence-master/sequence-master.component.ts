import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SequenceMasters } from 'src/app/models/user.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MndeletecountryComponent } from 'src/app/mndeletecountry/mndeletecountry.component';


@Component({
  selector: 'app-sequence-master',
  templateUrl: './sequence-master.component.html',
  styleUrls: ['./sequence-master.component.scss']
})
export class  SequenceMasterComponent implements OnInit {
  masterData : any ;
  sequence :any;
  id:any;
  sequenceId:any
  countryName:[]=[];
  shortName:any;
  isEdit:boolean;
  isDelete:boolean;
  isChecked:boolean =false ;
  isSelect:boolean = false;
  selectedID:any;
  displayedColumns: string[] = ['select','Sno','id', 'sequenceValue','sequenceTypeDescription'];
  dataSource: MatTableDataSource<SequenceMasters>;
  selection = new SelectionModel<SequenceMasters>(true, []);
  sequences: any = FormGroup;
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

  this.sequences = this.fb.group({
      sequenceDescription: new FormControl('', [Validators.required]),
      sequenceTypeValue: new FormControl('', [Validators.required]),
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
        this.sequenceId = row.Def_Sequence_ID
        alert(this.sequenceId)
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
        this.selectedID = s.Def_Sequence_ID
        this.sequences.get("sequenceDescription").setValue(s.Def_Sequence_Description);
        this.sequences.get("sequenceTypeValue").setValue(s.Def_Sequence_Value)
      });
       
    }
  }
  
  modifysequence() {
    this.isEdit = false;
    this.selection.selected.forEach((s) => {
      this.sequenceId = s
    });
    const payload: SequenceMasters = {
      Def_Sequence_ID: this.sequenceId.Def_Sequence_ID,
      Def_Sequence_Description: this.sequences.controls.sequenceDescription.value,
      Def_Sequence_Value: this.sequences.controls.sequenceTypeValue.value
    };

    //for testing
  
    this.masterDataService.modifySequenceMaster(payload).subscribe((data)=>{
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
    this.sequenceId = s.Def_Sequence_ID
  });
  let dialogDeleteData = {
      sequenceId : this.sequenceId,
      master : 'sequence',
      from:'delete'
  }
  this.dialog.open(AddmodifycountryComponent, {
    data:dialogDeleteData,
    width: '520px'
  });
  }
  getMasters() {
    this.masterDataService.getSequenceMatersData().subscribe((data) => {
      this.masterData = data.data;
      this.sequence = Array.from(this.masterData)
      const dataS = this.sequence.filter(row => row.status === 'Active')
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



