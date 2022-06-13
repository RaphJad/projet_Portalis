import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCvLineComponent } from './add-cv-line.component';

describe('AddCvLineComponent', () => {
  let component: AddCvLineComponent;
  let fixture: ComponentFixture<AddCvLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCvLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCvLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
