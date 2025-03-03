import {Component, OnInit, Input} from '@angular/core';
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
