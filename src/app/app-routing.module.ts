import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './account/auth.guard';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { TopicDetailsComponent } from './topics-board/topic-details/topic-details.component';
import { TopicsBoardComponent } from './topics-board/topics-board.component';
import { UpdateNoteComponent } from './topics-board/update-note/update-note.component';

const routes: Routes = [
  { path: '', component: TopicsBoardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: ':id',
    component: TopicDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/note/:nid',
    component: UpdateNoteComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
