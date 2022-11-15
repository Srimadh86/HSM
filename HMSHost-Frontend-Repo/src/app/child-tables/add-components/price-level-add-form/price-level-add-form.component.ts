import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Pricelevelmasters,
} from 'src/app/models/user.model';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-price-level-add-form',
  templateUrl: './price-level-add-form.component.html',
  styleUrls: ['./price-level-add-form.component.scss']
})
export class  PriceLevelAddFormComponent implements OnInit {
  pricelevels: any = FormGroup;
  constructor(private masterDataService : MasterDataService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    
    this.pricelevels = new FormGroup({
      pricelevelDescription: new FormControl('', [Validators.required]),
      pricelevelTypeValue: new FormControl('', [Validators.required]),
    });
  }

  addpricelevel() {
    if(this.pricelevels.valid){
      const payload: Pricelevelmasters= {
       Price_Level_Description: this.pricelevels.value.pricelevelDescription,
       Price_Level_Value: this.pricelevels.value.pricelevelTypeValue,
      };
      this.masterDataService.addPriceLevel(payload).subscribe((data)=>{
        console.log(data,data)
        let dialogData = {
          status:data.message,
          master:"pricelevel",
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

