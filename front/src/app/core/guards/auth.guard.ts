import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import {SessionService} from "../services/session.service";

@Injectable({ providedIn: 'root' })
/**
 * Garde de route pour l'authentification
 * @class
 * @implements {CanActivate}
 */
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionService: SessionService
    ) { }

    /**
     * Autorise l'accès à la route si l'utilisateur n'est pas connecté
     * @returns {Observable<boolean>}
     */
    public canActivate(): Observable<boolean> {
        return this.sessionService.$isLogged().pipe(
            map((isLoggedIn: boolean) => {
                console.log("AuthGuard", isLoggedIn);
                if (!isLoggedIn) {
                    this.router.navigate(['/auth/login']);
                    return false;
                }
                return true;
            })
        );
    }
}