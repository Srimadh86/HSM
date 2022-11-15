import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConceptMasters
} from 'src/app/models/user.model';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-concept-master-add-form',
  templateUrl: './concept-master-add-form.component.html',
  styleUrls: ['./concept-master-add-form.component.scss']
})
export class ConceptMasterAddFormComponent  implements OnInit {
  conceptMasters: any = FormGroup;
  constructor(private masterDataService : MasterDataService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    
    this.conceptMasters = new FormGroup({
      conceptName: new FormControl('', [Validators.required]),
      conceptDescription: new FormControl('', [Validators.required]),
    });
  }

  addConceptMaster() {
    if(this.conceptMasters.valid){
      const payload: ConceptMasters = {
        Concept_Name: this.conceptMasters.value.conceptName,
        Concept_Description: this.conceptMasters.value.conceptDescription,
      };
      this.masterDataService.addConceptMaster(payload).subscribe((data)=>{
        console.log(data)
        let dialogData = {
          status:data.message,
          master:"concept",
          from: "add"
        }
        this.dialog.open(AddmodifycountryComponent, {
          data:dialogData,
          width: '500px'
        });
    },
    (error)=>{
      console.log(error)
    })
    }else{
      alert("Fill all fields")
    }
  }

}


