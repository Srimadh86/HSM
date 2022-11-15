import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SequenceMasters,
} from 'src/app/models/user.model';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sequence-add-form',
  templateUrl: './sequence-add-form.component.html',
  styleUrls: ['./sequence-add-form.component.scss']
})
export class SequenceAddFormComponent implements OnInit {
  revenues: any = FormGroup;
  constructor(private masterDataService : MasterDataService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    
    this.revenues = new FormGroup({
      revenueDescription: new FormControl('', [Validators.required]),
      revenueTypeValue: new FormControl('', [Validators.required]),
    });
  }

  addRevenue() {
    if(this.revenues.valid){
      const payload: SequenceMasters= {
        Def_Sequence_Description: this.revenues.value.revenueDescription,
        Def_Sequence_Value: this.revenues.value.revenueTypeValue,
      };
      this.masterDataService.addSequenceMaster(payload).subscribe((data)=>{
        console.log(data)
        let dialogData = {
          status:data.message,
          master:"sequence",
          from: "add"
        }
        this.dialog.open(AddmodifycountryComponent, {
          data:dialogData,
          width: '500px'
        });
       
    },
    (error)=>{
      console.log(error)
      alert(error)
    })
    }else{
      alert("Fill all fields")
    }
  }

}

