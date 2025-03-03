import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {RegisterRequest} from "../interfaces/register-request.interface";
import {ResponseApi } from "../interfaces/response-api.interface";
import {LoginRequest} from "../interfaces/login-request.interface";
import {User} from "../../../core/models/user.interface";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    /**@
     * Chemin vers le service
     * @type {string}
     * @memberof AuthService
     * @default api/auth
     * @private
     */
    private pathService: string = `${environment.apiBackendBaseUrl}/api/auth`;

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Enregistre un utilisateur
     * @param {RegisterRequest} registerRequest
     * @return {Observable<ResponseApi>}
     * @memberof AuthService
     * @public
     */

    public register(registerRequest: RegisterRequest): Observable<ResponseApi> {
        return this.httpClient.post<ResponseApi>(
            `${this.pathService}/register`,
            registerRequest
        );
    }

    /**
     * Connecte un utilisateur
     * @param {LoginRequest} loginRequest
     * @returns {Observable<ResponseApi>}
     * @memberof AuthService
     * @public
     */

    public login(loginRequest: LoginRequest): Observable<ResponseApi> {
        return this.httpClient.post<ResponseApi>(
            `${this.pathService}/login`,
            loginRequest
        );
    }

    /**
     * Récupère l'utilisateur connecté
     * @returns {Observable<User>}
     * @memberof AuthService
     * @public
     */

    public me(): Observable<User> {
        return this.httpClient.get<User>(`${this.pathService}/me`);
    }

    /**
     * Met à jour l'utilisateur connecté
     * @param {User} user
     * @returns {Observable<void>}
     */
    public update(user: User): Observable<void> {
        return this.httpClient.put<void>(`${this.pathService}/me`, user);
    }

    /**
     * Déconnecte l'utilisateur
     * @returns {Observable<void>}
     * @memberof AuthService
     * @public
     */
    public logout(): Observable<void> {
        return this.httpClient.get<void>(`${this.pathService}/logout`);
    }

    /**
     * Vérifie si l'utilisateur est connecté
     * @returns {Observable<boolean>}
     * @memberof AuthService
     * @public
     */
    public isLogged(): Observable<boolean> {
        return this.httpClient.get<boolean>(`${this.pathService}/is-logged`);
    }
}