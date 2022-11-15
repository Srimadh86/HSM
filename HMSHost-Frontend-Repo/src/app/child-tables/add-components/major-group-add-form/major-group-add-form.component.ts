
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MajorGroupMasters,
} from 'src/app/models/user.model';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { AddmodifycountryComponent } from 'src/app/addmodifycountry/addmodifycountry.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-major-group-add-form',
  templateUrl: './major-group-add-form.component.html',
  styleUrls: ['./major-group-add-form.component.scss']
})
export class MajorGroupAddFormComponent  implements OnInit {
  majors: any = FormGroup;
  constructor(private masterDataService : MasterDataService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    
    this.majors = new FormGroup({
      majorGroupName: new FormControl('', [Validators.required]),
    });
  }

  addmajor() {
    if(this.majors.valid){
      const payload: MajorGroupMasters= {
        Major_Group_Name: this.majors.value.majorGroupName,
      };
      this.masterDataService.addMajorGroupMaster(payload).subscribe((data)=>{
        console.log(data)
        let dialogData = {
          status:data.message,
          master:"major",
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


