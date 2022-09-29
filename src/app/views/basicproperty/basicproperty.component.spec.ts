import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicpropertyComponent } from './basicproperty.component';

describe('BasicpropertyComponent', () => {
  let component: BasicpropertyComponent;
  let fixture: ComponentFixture<BasicpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicpropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
