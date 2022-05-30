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
  public topics: Observable<Topic[]>;

  constructor(
    private topicService: TopicsService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.topics = this.firestore
      .collection('availableTopics', ref => ref.orderBy('dateCreated', 'desc'))
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as Topic),
            };
          });
        })
      )
  }

  public trackById(index: number, topic: Topic) {
    return topic.id;
  }
}
