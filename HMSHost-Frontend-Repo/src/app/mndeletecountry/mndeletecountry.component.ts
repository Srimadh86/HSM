import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mndeletecountry',
  templateUrl: './mndeletecountry.component.html',
  styleUrls: ['./mndeletecountry.component.scss']
})
export class MndeletecountryComponent implements OnInit {

  constructor( _MatDialog : MatDialogRef<MndeletecountryComponent>) { }

  ngOnInit(): void {
  }

}
