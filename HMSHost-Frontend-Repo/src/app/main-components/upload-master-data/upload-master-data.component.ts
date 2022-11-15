import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { MasterDataService } from 'src/app/Services/master-data.service';

@Component({
  selector: 'app-upload-master-data',
  templateUrl: './upload-master-data.component.html',
  styleUrls: ['./upload-master-data.component.scss']
})
export class UploadMasterDataComponent implements OnInit {
  @ViewChild('inputFile',{static: false}) inputFile!:ElementRef;
  file : any;
  constructor( private masterDataService:MasterDataService) { }
  saveMasterExcelData: any = {}
  filemodel: any = {}
  ngOnInit(): void {
  }
getFile(event:any){
  this.file = event.target.files[0];
  console.log("file", this.file)
}
uploadFile(){
  let formData = new FormData();
  formData.set("excel",this.file);
 


  this.masterDataService.uploadMasterDoc(formData).subscribe(
    (data)=>{
      console.log(data)
  },
  (error)=>{
    console.log(error)
  })
}
}
