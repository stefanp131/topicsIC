import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Topic } from 'src/app/models/topic';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
})
export class TopicDetailsComponent implements OnInit, OnDestroy {
  public topic: Topic;
  private topicServiceSubscription: Subscription;

  public noteForm: FormGroup;

  constructor(
    private topicsService: TopicsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.topicServiceSubscription = this.topicsService
      .getTopics()
      .subscribe((data: Topic[]) => {
        this.topic = data.find(
          (t) => t.id === +this.route.snapshot.params['id']
        );
      });

      this.noteForm = this.formBuilder.group({
        title: new FormControl('', Validators.required),
        text:  new FormControl('', Validators.required)
      })
  }

  ngOnDestroy(): void {
    this.topicServiceSubscription.unsubscribe();
  }

  onNoteFormSubmit() {
    this.topic.note.push({createdBy:'Stefan', ...this.noteForm.value})
  }
}
