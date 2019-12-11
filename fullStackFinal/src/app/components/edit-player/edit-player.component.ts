import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})

export class EditPlayerComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static : true}) chipList;
  @ViewChild('resetPlayerForm', {static : true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;

  SectioinArray_rank: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  SectioinArray_favgame: any = ['Game_1', 'Game_2', 'Game_3', 'Game_4', 'Game_5'];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.playerApi.Getplayer(id).subscribe(data => {
      console.log(data.subjects)
      this.playerForm = this.fb.group({
        player_name: [data.player_name, [Validators.required]],
        player_rank: [data.player_rank, [Validators.required]],
        player_score: [data.player_score, [Validators.required]],
        player_time: [data.player_time, [Validators.required]],
        player_favgame: [data.player_favgame, [Validators.required]],
        player_status: [data.player_status, [Validators.required]],
        player_game: [data.player_game, [Validators.required]]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.playerForm = this.fb.group({
      player_name: ['', [Validators.required]],
      player_rank: ['', [Validators.required]],
      player_score: ['', [Validators.required]],
      player_time: ['', [Validators.required]],
      player_favgame: ['', [Validators.required]],
      player_status: ['', [Validators.required]],
      player_game: ['', [Validators.required]]
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
 
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updatePlayerForm() {
    console.log(this.playerForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.playerApi.Updateplayer(id, this.playerForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/players-list'))
      });
    }
  }
  
}