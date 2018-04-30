import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankRecommendComponent } from './rank-recommend.component';

describe('RankRecommendComponent', () => {
  let component: RankRecommendComponent;
  let fixture: ComponentFixture<RankRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
