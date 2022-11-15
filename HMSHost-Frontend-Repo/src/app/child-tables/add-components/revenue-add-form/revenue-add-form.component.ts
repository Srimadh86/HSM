
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  RevenueMasters,
} from 'src/app/models/user.model';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-revenue-add-form',
  templateUrl: './revenue-add-form.component.html',
  styleUrls: ['./revenue-add-form.component.scss']
})
export class RevenueAddFormComponent implements OnInit {
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
      const payload: RevenueMasters= {
        Revenue_Type_Description: this.revenues.value.revenueDescription,
        Revenue_Type_Value: this.revenues.value.revenueTypeValue,
      };
      this.masterDataService.addRevenueMaster(payload).subscribe((data)=>{
        console.log(data)
        let dialogData = {
          status:data.message,
          master:"revenue",
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

