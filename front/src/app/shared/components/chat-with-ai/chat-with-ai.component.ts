import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {Message} from "../../../core/models/message.interface";
import {ThreadService} from "../../../modules/database/services/thread.service";

@Component({
    selector: 'app-chat-with-ai',
    templateUrl: './chat-with-ai.component.html',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatIcon,
    ],
    styleUrl: './chat-with-ai.component.scss'
})
export class ChatWithAiComponent {
    @Input() messages: Message[] = [];
    public chatForm: FormGroup;

    constructor(private fb: FormBuilder, private threadService: ThreadService) {
        this.chatForm = this.fb.group({
            message: ['']
        });
    }

    public sendMessage() {
        const message: Message = {
            content: this.message,
            role: "user"
        }
        this.threadService.sendMessage(message).subscribe({
            next: response => {

            },
            error: err => {

            }
        })
    }

    get message(): string {
        return this.chatForm.get("message")?.value
    }
}
