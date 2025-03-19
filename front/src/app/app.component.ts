import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {filter, Observable, Subscription} from "rxjs";
import {SessionService} from "./core/services/session.service";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    public isAuthPage = false;
    public subscriptions: Subscription = new Subscription()
    public isLogged$: Observable<boolean> = new Observable<boolean>();

    constructor(
        private router: Router,
        private sessionService: SessionService
    ) {
    }

    ngOnInit() {
        this.subscriptions.add(this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.isAuthPage = this.router.url.includes('/auth');
                this.sessionService.pingCheckCookie();
                this.isLogged$ = this.sessionService.$isLogged();
            }));
    }

    ngOnDestroy() {
        this.isAuthPage = false;
    }


}
