import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { JoinGameComponent } from './components/join-game/join-game.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-player' },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'edit-player/:id', component: EditPlayerComponent },
  { path: 'players-list', component: PlayersListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'join-game/:id', component: JoinGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }