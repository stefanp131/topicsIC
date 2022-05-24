import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Topic } from '../models/topic';


const TOPICS: Topic[] = [{
  id: 1,
  name: 'My Topic 1',
  createdBy: 'Stefan',
  description: 'My Description 1',
  note: [{createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 1 - 1'},
  {createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 2 - 1'},
  {createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 3 - 1'},
  {createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 4 - 1'}]
},
{
  id: 2,
  name: 'My Topic 2',
  createdBy: 'Stefan',
  description: 'My Description 2',
  note: [{createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 1 - 2'},
  {createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 2 - 2'},
  {createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 3 - 2'},
  {createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 4 - 2'}]
},
{
  id: 3,
  name: 'My Topic 3',
  createdBy: 'Stefan',
  description: 'My Description 3',
  note: [{createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 1 - 3'},
  {createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 2 - 3'},
  {createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 3 - 3'},
  {createdBy: 'Stefan', text:'Lorem Ipsum', title: 'My note 4 - 3'}]
}
]

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  public topics: BehaviorSubject<Topic[]> = new BehaviorSubject<Topic[]>(TOPICS);
  constructor() {}

  getTopics() {
    return this.topics.asObservable();
  }

  addTopic(topic: Topic) {
    this.topics.value.push({ id: Math.floor(Math.random()*1000), ...topic});
  }

  removeTopic(id: number) {
    const topicToBeDeleted = this.topics.value.find(t => t.id === id);
    const indexOfDeleted = this.topics.value.indexOf(topicToBeDeleted);

    if(indexOfDeleted > -1) {
      this.topics.value.splice(indexOfDeleted, 1)
    }
  }

  setTopics(value: Topic[]) {
    this.topics.next(value);
  }
}
