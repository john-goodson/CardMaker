import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtModalComponent } from './rt-modal.component';

describe('RtModalComponent', () => {
  let component: RtModalComponent;
  let fixture: ComponentFixture<RtModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
