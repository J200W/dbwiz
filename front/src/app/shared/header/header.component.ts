import {Component, OnInit, Input, booleanAttribute} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [
        NgClass,
        NgIf
    ],
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() show: boolean | undefined;
    @Input({transform: booleanAttribute}) isLogged: boolean | undefined;
    public hasScrolled = false;


    onScroll() {
        this.hasScrolled = window.scrollY > 30;
    }

    constructor(
    ) {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    ngOnInit() {
    }
}
