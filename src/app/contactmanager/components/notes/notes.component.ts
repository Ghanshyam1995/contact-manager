import { Note } from './../../models/note';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator,MatSort } from "@angular/material";
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit ,AfterViewInit{
 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  @Input() notes: Note[];
  displayedColumns = ['position', 'title', 'date'];
  dataSource : MatTableDataSource<Note>;
  constructor() { }

  ngOnInit() {
    this.dataSource =new MatTableDataSource<Note>(this.notes);
  }

  ngAfterViewInit() {
   this.dataSource.paginator=this.paginator;
   this.dataSource.sort=this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
