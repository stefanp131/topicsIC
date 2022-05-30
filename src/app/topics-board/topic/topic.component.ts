import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Topic } from 'src/app/models/topic';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  dateCreated: Date;

  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.dateCreated = new Date(this.topic.dateCreated);
  }

  deleteTopic(id: string, event: any) {
    event.stopPropagation()
    this.firestore.collection('availableTopics').doc(id).delete();
  }
}
