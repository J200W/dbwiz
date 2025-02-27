import {Component} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [
        NgClass
    ],
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    hasScrolled = false;

    onScroll() {
        this.hasScrolled = window.scrollY > 30;
    }

    constructor() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }
}
