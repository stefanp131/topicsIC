import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsBoardComponent } from './topics-board.component';

describe('TopicsBoardComponent', () => {
  let component: TopicsBoardComponent;
  let fixture: ComponentFixture<TopicsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
