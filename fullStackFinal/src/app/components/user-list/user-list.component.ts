import { Player } from './../../shared/player';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isValid = true;
  PlayerData: any = [];
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, {static : true}) paginator: MatPaginator;
  displayedColumns: string[] = ['player_name', 'player_rank', 'player_score', 'player_time', 'player_favgame', 'player_status', 'player_game', 'action'];

  constructor(private playerApi: ApiService) {

    this.playerApi.Getplayers().subscribe(data => {
      this.PlayerData = data;

      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnInit() { }

  
}