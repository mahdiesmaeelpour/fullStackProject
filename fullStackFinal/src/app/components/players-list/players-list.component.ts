import { Player } from './../../shared/player';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})

export class PlayersListComponent implements OnInit {
  PlayerData: any = [];
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, {static : true}) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'player_name', 'player_email', 'section', 'action'];

  constructor(private playerApi: ApiService) {
    this.playerApi.Getplayers().subscribe(data => {
      this.PlayerData = data;
      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deletePlayer(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.playerApi.Deleteplayer(e._id).subscribe()
    }
  }

}