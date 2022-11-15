import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Countries,
} from 'src/app/models/user.model';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-countries-add-form',
  templateUrl: './countries-add-form.component.html',
  styleUrls: ['./countries-add-form.component.scss']
})
export class CountriesAddFormComponent implements OnInit {
  countries: any = FormGroup;
  constructor(private masterDataService : MasterDataService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    
    this.countries = new FormGroup({
      countryName: new FormControl('', [Validators.required]),
      countryShortName: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      currencySymbol: new FormControl('', [Validators.required]),
    });
  }

  addCountry() {
    if(this.countries.valid){
      const payload: Countries = {
        Country_Name: this.countries.value.countryName,
        Country_Short_Name: this.countries.value.countryShortName,
        Currency: this.countries.value.currency,
        Currency_Symbol: this.countries.value.currencySymbol,
      };
      this.masterDataService.addCountry(payload).subscribe((data)=>{
        console.log(data)
        let dialogData = {
          status:data.message,
          master:"country",
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

