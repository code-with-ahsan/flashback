import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSplashScreenComponent } from './round-splash-screen.component';

describe('RoundSplashScreenComponent', () => {
  let component: RoundSplashScreenComponent;
  let fixture: ComponentFixture<RoundSplashScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundSplashScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
