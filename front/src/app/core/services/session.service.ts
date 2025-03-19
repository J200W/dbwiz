import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {AuthService} from "../../modules/authentification/services/auth.service";


@Injectable({
    providedIn: 'root',
})
export class SessionService implements OnInit, OnDestroy{
    public isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    public subscriptions: Subscription = new Subscription()

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {

    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    /**
     * Observable de l'état de connexion (qui est un BehaviorSubject à l'initialisation)
     * @returns {Observable<boolean>}
     */
    public $isLogged(): Observable<boolean> {
        return this.isLoggedSubject.asObservable();
    }

    public pingCheckCookie(): void {
        this.subscriptions.add(this.authService.isLogged().subscribe({
            next: (response: boolean): void  => {
                this.isLoggedSubject.next(response)
            },
            error: (error: any): void =>  {
                console.error(error)
                this.isLoggedSubject.next(false)
            },
        }))
    }



}