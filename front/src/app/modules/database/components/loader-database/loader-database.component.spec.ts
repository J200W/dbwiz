import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderDatabaseComponent } from './loader-database.component';

describe('LoaderDatabaseComponent', () => {
  let component: LoaderDatabaseComponent;
  let fixture: ComponentFixture<LoaderDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
