import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Note } from 'src/app/models/note';
import { Topic } from 'src/app/models/topic';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
})
export class TopicDetailsComponent implements OnInit, OnDestroy {
  public topic: Topic;
  public notes: Note[];

  public noteForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.firestore
      .collection('availableTopics')
      .doc(this.route.snapshot.params['id'])
      .snapshotChanges()
      .pipe(
        map((doc) => {
          return {
            id: doc.payload.id,
            ...(doc.payload.data() as Topic),
          };
        })
      )
      .subscribe((topic) => (this.topic = topic));

    this.firestore
      .collection('availableTopics')
      .doc(this.route.snapshot.params['id'])
      .collection('notes')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as Note),
            };
          });
        })
      )
      .subscribe((notes) => (this.notes = notes));

    // this.topicServiceSubscription = this.topicsService
    //   .getTopics()
    //   .subscribe((data: Topic[]) => {
    //     this.topic = data.find(
    //       (t) => t.id === +this.route.snapshot.params['id']
    //     );
    //   });

    this.noteForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
  }

  deleteNote(id: string) {
    console.log(id);

    this.firestore
      .collection('availableTopics')
      .doc(this.route.snapshot.params['id'])
      .collection('notes')
      .doc(id)
      .delete();
  }

  ngOnDestroy(): void {
    //this.topicServiceSubscription.unsubscribe();
  }

  onNoteFormSubmit() {
    this.firestore
      .collection('availableTopics')
      .doc(this.route.snapshot.params['id'])
      .collection('notes')
      .add({ createdBy: 'Stefan', ...this.noteForm.value });
  }
}
