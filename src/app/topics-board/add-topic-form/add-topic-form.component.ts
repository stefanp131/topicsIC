import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'add-topic-form',
  templateUrl: './add-topic-form.component.html',
  styleUrls: ['./add-topic-form.component.scss']
})
export class AddTopicFormComponent implements OnInit {
  topicForm: FormGroup;

  constructor(private fb: FormBuilder, private topicService: TopicsService) { }

  ngOnInit(): void {
    this.topicForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required)
    })
  }

  submitForm() {
    this.topicService.addTopic({
      createdBy: 'Stefan',
      ...this.topicForm.value
    })
  }
}
