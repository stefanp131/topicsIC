import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic';
import { TopicsService } from '../services/topics.service';

@Component({
  selector: 'app-topics-board',
  templateUrl: './topics-board.component.html',
  styleUrls: ['./topics-board.component.scss']
})
export class TopicsBoardComponent implements OnInit {
  public topics: Observable<Topic[]>;

  constructor(private topicService: TopicsService) { }

  ngOnInit(): void {
    this.topics = this.topicService.getTopics();
  }

}
