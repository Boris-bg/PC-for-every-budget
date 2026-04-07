import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssembledPcsComponent } from './assembled-pcs.component';

describe('AssembledPcs', () => {
  let component: AssembledPcsComponent;
  let fixture: ComponentFixture<AssembledPcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssembledPcsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssembledPcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
