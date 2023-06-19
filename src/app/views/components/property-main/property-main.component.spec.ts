import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyMainComponent } from './property-main.component';

describe('PropertyMainComponent', () => {
  let component: PropertyMainComponent;
  let fixture: ComponentFixture<PropertyMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
