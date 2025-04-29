import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
export class HeaderComponent implements OnChanges {
    @Input() show: boolean | undefined;
    @Input() isLoggedIn: boolean | undefined;
    public hasScrolled = false;

    onScroll() {
        this.hasScrolled = window.scrollY > 30;
    }

    constructor(
    ) {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['show']) {
            this.show = changes['show'].currentValue;
        }
        if (changes['isLoggedIn']) {
            this.isLoggedIn = changes['isLoggedIn'].currentValue;
        }
    }
}
