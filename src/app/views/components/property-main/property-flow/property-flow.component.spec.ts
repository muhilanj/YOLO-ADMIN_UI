import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFlowComponent } from './property-flow.component';

describe('PropertyFlowComponent', () => {
  let component: PropertyFlowComponent;
  let fixture: ComponentFixture<PropertyFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
