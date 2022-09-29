import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancepropertyComponent } from './advanceproperty.component';

describe('AdvancepropertyComponent', () => {
  let component: AdvancepropertyComponent;
  let fixture: ComponentFixture<AdvancepropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancepropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancepropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
