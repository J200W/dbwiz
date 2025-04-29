import {Component, Input, OnInit} from '@angular/core';
import {MatProgressSpinner, MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-loading-page',
    imports: [
        MatProgressSpinnerModule,
        MatProgressSpinner,
        NgIf
    ],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.scss'
})
export class LoadingPageComponent implements OnInit {
    @Input() loadingMessage: string | undefined;
    @Input() loading: boolean = true;

    constructor() {
    }

    ngOnInit() {
    }
}
