import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtEditorToolbarComponent } from './rt-editor-toolbar.component';

describe('RtEditorToolbarComponent', () => {
  let component: RtEditorToolbarComponent;
  let fixture: ComponentFixture<RtEditorToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtEditorToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
