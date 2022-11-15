
import { Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MasterDataService } from 'src/app/Services/master-data.service'; 
import { Router } from '@angular/router';


export interface UserData {
  id: string;
  name:string;
}

 @Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
  })
export class  MasterComponent implements OnInit {
  masterData : any ;
  users :any;
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private masterDataService:MasterDataService,  private router: Router) {
    // Create 100 users
  
    // Assign the data to the data source for the table to render

    this.users = 
    this.dataSource = new MatTableDataSource(this.users);
  }
  ngOnInit(): void {
    this.getMasters();
  }

  getMasters(){
    this.masterDataService.getMasterData().subscribe((data) => {
      this.masterData = data.data;
      console.log(this.masterData)
      this.users = Array.from(this.masterData)
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    return this.masterData;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}





