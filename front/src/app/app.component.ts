import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {filter, Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    public isAuthPage = false;
    public subscriptions: Subscription = new Subscription()
    public isLoggedIn: boolean | undefined = undefined;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.subscriptions.add(this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.isAuthPage = this.router.url.includes('/auth');
                this.isLoggedIn = sessionStorage.getItem('isLogged') === 'true'
            }));
    }

    ngOnDestroy() {
        this.isAuthPage = false;
        this.subscriptions.unsubscribe();
    }
}
