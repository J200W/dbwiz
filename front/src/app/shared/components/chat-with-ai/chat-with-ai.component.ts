import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

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
    public chatForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.chatForm = this.fb.group({
            message: ['']
        });
    }

    public sendMessage() {

    }

    get message(): string {
        return this.chatForm.get("message")?.value
    }
}
