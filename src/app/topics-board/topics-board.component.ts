import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Topic } from '../models/topic';
import { TopicsService } from '../services/topics.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-topics-board',
  templateUrl: './topics-board.component.html',
  styleUrls: ['./topics-board.component.scss'],
})
export class TopicsBoardComponent implements OnInit {
  public topics: Topic[];

  constructor(
    private topicService: TopicsService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.topicService.getTopics().subscribe((topics) => (this.topics = topics));

    this.topicService.fetchTopics();
  }
}
