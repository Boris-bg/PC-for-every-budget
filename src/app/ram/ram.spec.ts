import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ram } from './ram';

describe('Ram', () => {
  let component: Ram;
  let fixture: ComponentFixture<Ram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
