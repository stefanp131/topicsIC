import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'add-topic-form',
  templateUrl: './add-topic-form.component.html',
  styleUrls: ['./add-topic-form.component.scss'],
})
export class AddTopicFormComponent implements OnInit {
  topicForm: FormGroup;
  public category: 'All' | 'Sports' | 'Literature' | 'Music' = 'All';
  displayName: string = 'Someone';


  constructor(
    private fb: FormBuilder,
    private topicService: TopicsService,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {

    this.auth.user.subscribe((data) => {
      this.displayName = data?.displayName;
    });

    this.topicForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitForm() {
    this.firestore.collection('availableTopics').add({      
      createdBy: this.displayName,
      category: this.category,
      ...this.topicForm.value,
      dateCreated: Date.now()
    });
  }
}
