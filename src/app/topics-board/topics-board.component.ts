import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Topic } from '../models/topic';
import { TopicsService } from '../services/topics.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-topics-board',
  templateUrl: './topics-board.component.html',
  styleUrls: ['./topics-board.component.scss'],
})
export class TopicsBoardComponent implements OnInit {
  @ViewChild('paginator', { static: true}) paginator: MatPaginator;

  public topics: Observable<Topic[]>;
  public category: 'All' | 'Sports' | 'Literature' | 'Music' = 'All';
  public sortBy: 'asc' | 'desc' = 'asc';
  searchBox: string = '';
  length = 100;
  pageIndex = 0;
  pageSize = 2;
  pageSizeOptions: number[] = [1, 2, 4, 8];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  public loadTopics() {
    this.topics = this.firestore
      .collection<Topic>('availableTopics', (ref) =>
        ref.orderBy('dateCreated', this.sortBy)
      )
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          const topicsArray = docArray
            .map((doc) => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data(),
              };
            })
            .filter((topic) => {
              if (this.category === 'All') return true;
              return topic.category === this.category;
            })
            .filter(
              (searchItem) =>
                searchItem.name.indexOf(this.searchBox) > -1 ||
                searchItem.description.indexOf(this.searchBox) > -1
            );

          this.length = topicsArray.length;
          const start = this.paginator.pageIndex * this.paginator.pageSize;
          const end = (this.paginator.pageIndex + 1) * this.paginator.pageSize;
          return topicsArray.slice(start, end);
        })
      );
  }

  public trackById(index: number, topic: Topic) {
    return topic.id;
  }
}
