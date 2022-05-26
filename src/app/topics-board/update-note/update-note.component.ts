import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
  public updateForm: FormGroup;
  public note: Note;
  public topicId;
  public noteId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore
  ) {
    this.topicId = this.route.snapshot.params['id'];
    this.noteId = this.route.snapshot.params['nid'];
  }

  ngOnInit(): void {
    this.firestore
      .collection('availableTopics')
      .doc(this.topicId)
      .collection('notes')
      .doc(this.noteId)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          return {
            id: doc.payload.id,
            ...(doc.payload.data() as Note),
          };
        })
      )
      .subscribe((note) => {
        this.note = note;
        this.updateForm = this.formBuilder.group({
          title: new FormControl(this.note.title, Validators.required),
          text: new FormControl(this.note.text, Validators.required),
        });
      });
  }

  onUpdateNoteFormSubmit() {
    this.firestore
      .collection('availableTopics')
      .doc(this.topicId)
      .collection('notes')
      .doc(this.noteId)
      .update(this.updateForm.value).then(() => {
        this.router.navigate(['/', this.topicId])
      });
  }
}
