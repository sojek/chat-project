import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageformComponent } from './messageform.component';

describe('MessageformComponent', () => {
  let component: MessageformComponent;
  let fixture: ComponentFixture<MessageformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
