import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithAiComponent } from './chat-with-ai.component';

describe('ChatWithAiComponent', () => {
  let component: ChatWithAiComponent;
  let fixture: ComponentFixture<ChatWithAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWithAiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWithAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
