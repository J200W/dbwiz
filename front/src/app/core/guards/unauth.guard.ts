import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
/**
 * Garde de route pour l'authentification
 * @class
 * @implements {CanActivate}
 */
export class UnauthGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }

    /**
     * Autorise l'accès à la route si l'utilisateur n'est pas connecté
     * @returns {Observable<boolean>}
     */
    public canActivate(): Observable<boolean> {
        return this.router.events.pipe(
            map(() => {
                localStorage.setItem('token', '');
                if (localStorage.getItem('token')) {
                    this.router.navigate(['/']);
                    return false;
                }
                return true;
            })
        );
    }
}