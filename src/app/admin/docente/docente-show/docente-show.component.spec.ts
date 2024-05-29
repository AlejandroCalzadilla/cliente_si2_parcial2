import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteShowComponent } from './docente-show.component';

describe('DocenteShowComponent', () => {
  let component: DocenteShowComponent;
  let fixture: ComponentFixture<DocenteShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocenteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
