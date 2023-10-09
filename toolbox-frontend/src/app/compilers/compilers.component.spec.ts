import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilersComponent } from './compilers.component';

describe('CompilersComponent', () => {
  let component: CompilersComponent;
  let fixture: ComponentFixture<CompilersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompilersComponent]
    });
    fixture = TestBed.createComponent(CompilersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
