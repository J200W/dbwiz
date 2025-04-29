import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {AuthService} from "../../modules/authentification/services/auth.service";


@Injectable({
    providedIn: 'root',
})
export class SessionService {

    constructor(
    ) {}

    /**
     * Met à jour l'état de connexion
     * @param {boolean} isLogged
     */
    public setLogged(isLogged: boolean): void {
        sessionStorage.setItem('isLogged', isLogged.toString());
    }

    /**
     * Vérifie si l'utilisateur est connecté
     * @returns {boolean}
     */
    public isLoggedIn(): boolean {
        return sessionStorage.getItem('isLogged') === 'true';
    }
}