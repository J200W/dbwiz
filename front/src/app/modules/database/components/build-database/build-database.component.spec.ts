import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildDatabaseComponent } from './build-database.component';

describe('BuildDatabaseComponent', () => {
  let component: BuildDatabaseComponent;
  let fixture: ComponentFixture<BuildDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
