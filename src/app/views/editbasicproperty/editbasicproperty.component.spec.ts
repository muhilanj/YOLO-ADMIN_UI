import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbasicpropertyComponent } from './editbasicproperty.component';

describe('EditbasicpropertyComponent', () => {
  let component: EditbasicpropertyComponent;
  let fixture: ComponentFixture<EditbasicpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditbasicpropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbasicpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
