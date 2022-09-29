import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleoccupancyComponent } from './singleoccupancy.component';

describe('SingleoccupancyComponent', () => {
  let component: SingleoccupancyComponent;
  let fixture: ComponentFixture<SingleoccupancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleoccupancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleoccupancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
