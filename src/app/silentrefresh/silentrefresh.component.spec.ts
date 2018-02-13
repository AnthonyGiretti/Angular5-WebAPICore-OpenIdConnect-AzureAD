import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SilentrefreshComponent } from './silentrefresh.component';

describe('SilentrefreshComponent', () => {
  let component: SilentrefreshComponent;
  let fixture: ComponentFixture<SilentrefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilentrefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilentrefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
