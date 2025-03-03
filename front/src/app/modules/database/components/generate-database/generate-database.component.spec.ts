import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDatabaseComponent } from './generate-database.component';

describe('GenerateDatabaseComponent', () => {
  let component: GenerateDatabaseComponent;
  let fixture: ComponentFixture<GenerateDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
