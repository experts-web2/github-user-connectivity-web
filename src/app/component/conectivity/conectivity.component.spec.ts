import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConectivityComponent } from './conectivity.component';

describe('ConectivityComponent', () => {
  let component: ConectivityComponent;
  let fixture: ComponentFixture<ConectivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConectivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConectivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
