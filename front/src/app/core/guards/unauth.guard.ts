import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {catchError, Observable, of} from "rxjs";
import {map} from 'rxjs/operators';
import {SessionService} from "../services/session.service";
import {AuthService} from "../../modules/authentification/services/auth.service";

@Injectable({providedIn: 'root'})
/**
 * Garde de route pour l'authentification
 * @class
 * @implements {CanActivate}
 */
export class UnauthGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private authService: AuthService
    ) {
    }

    /**
     * Autorise l'accès à la route si l'utilisateur n'est pas connecté
     * @returns {Observable<boolean>}
     */
    public canActivate(): Observable<boolean> {
        return this.authService.isLogged().pipe(
            map((isLoggedIn: boolean) => {
                this.sessionService.setLogged(isLoggedIn); // pour garder le state synchro
                if (isLoggedIn) {
                    this.router.navigate(['/']);
                    return false;
                }
                return true;
            }),
            catchError(() => {
                this.sessionService.setLogged(false);
                return of(true); // si erreur, on considère qu’il n’est pas connecté
            })
        );
    }
}