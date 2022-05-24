import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicFormComponent } from './add-topic-form.component';

describe('AddTopicFormComponent', () => {
  let component: AddTopicFormComponent;
  let fixture: ComponentFixture<AddTopicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTopicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
