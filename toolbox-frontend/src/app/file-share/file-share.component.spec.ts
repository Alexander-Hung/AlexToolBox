import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileShareComponent } from './file-share.component';

describe('FileShareComponent', () => {
  let component: FileShareComponent;
  let fixture: ComponentFixture<FileShareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileShareComponent]
    });
    fixture = TestBed.createComponent(FileShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
