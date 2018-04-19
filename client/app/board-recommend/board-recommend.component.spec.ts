import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardRecommendComponent } from './board-recommend.component';

describe('BoardRecommendComponent', () => {
  let component: BoardRecommendComponent;
  let fixture: ComponentFixture<BoardRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
