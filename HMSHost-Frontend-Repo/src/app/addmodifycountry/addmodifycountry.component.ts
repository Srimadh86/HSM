import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDataService } from '../Services/master-data.service';

@Component({
  selector: 'app-addmodifycountry',
  templateUrl: './addmodifycountry.component.html',
  styleUrls: ['./addmodifycountry.component.scss']
})
export class AddmodifycountryComponent implements OnInit {
    message:string;
  constructor( _MatDialog : MatDialogRef<AddmodifycountryComponent>,
    private router: Router,
    private masterDataService:MasterDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    console.log(this.data ,'data')
  }

  submit(){
    window.location.reload()
  }
  submitadd(){
    if(this.data.master === 'country'){
      this.router.navigate(['/home/master/countries']);
    }else if(this.data.master === 'concept'){
      this.router.navigate(['/home/master/conceptmasters']);
    }else if(this.data.master === 'revenue'){
      this.router.navigate(['/home/master/revenuetypemasters']);
    }else if(this.data.master === 'sequence'){
      this.router.navigate(['/home/master/defseqmasters']);
    }else if(this.data.master === 'major'){
      this.router.navigate(['/home/master/majorgroupmasters']);
    }else if(this.data.master === 'pricelevel'){
      this.router.navigate(['/home/master/pricelevelmasters']);
    }
    
  }
  deleteData(){
    if(this.data.master === 'country'){
      this.masterDataService.deleteCountry(this.data.countryId).subscribe((data)=>{
        window.location.reload()
        console.log(data)
    },
    (error)=>{
      console.log(error)
    })
    }else if(this.data.master === 'concept'){
      this.masterDataService.deleteConceptMaster(this.data.conceptId).subscribe((data)=>{
        window.location.reload()
        console.log(data)
    },
    (error)=>{
      console.log(error)
    })
    }else if(this.data.master === 'revenue'){
      this.masterDataService.deleteRevenueMaster(this.data.revenueId).subscribe((data)=>{
        window.location.reload()
        console.log(data)
    },
    (error)=>{
      console.log(error)
    })
    }else if(this.data.master === 'sequence'){
      this.masterDataService.deleteSequenceMaster(this.data.sequenceId).subscribe((data)=>{
        window.location.reload()
        console.log(data)
    },
    (error)=>{
      console.log(error)
    })
    }else if(this.data.master === 'major'){
      this.masterDataService.deleteMajorGroupMaster(this.data.majorId).subscribe((data)=>{
        window.location.reload()
        console.log(data)
    },
    (error)=>{
      console.log(error)
    })
    }else if(this.data.master === 'pricelevel'){
      this.masterDataService.deletePriceLevel(this.data.majorId).subscribe((data)=>{
        window.location.reload()
        console.log(data)
    },
    (error)=>{
      console.log(error)
    })
    }
 
  }


}
