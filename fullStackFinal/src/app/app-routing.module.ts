import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddplayerComponent } from './components/add-player/add-player.component';
import { EditplayerComponent } from './components/edit-player/edit-player.component';
import { playersListComponent } from './components/players-list/players-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-student' },
  { path: 'add-student', component: AddplayerComponent },
  { path: 'edit-student/:id', component: EditplayerComponent },
  { path: 'students-list', component: playersListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }