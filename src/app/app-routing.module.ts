import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicDetailsComponent } from './topics-board/topic-details/topic-details.component';
import { TopicsBoardComponent } from './topics-board/topics-board.component';

const routes: Routes = [
  { path: '', component: TopicsBoardComponent },
  { path: ':id', component: TopicDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
