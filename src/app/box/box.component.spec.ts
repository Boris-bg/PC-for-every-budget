import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxComponent } from './box.component';

describe('Box', () => {
  let component: BoxComponent;
  let fixture: ComponentFixture<BoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
