import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {User} from "../../../core/models/user.interface";
import {BuildDatabase} from "../interfaces/build-database.interface";

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    /**@
     * Chemin vers le service
     * @type {string}
     * @memberof AuthService
     * @default api/auth
     * @private
     */
    private pathService: string = `${environment.apiBackendBaseUrl}/api/database`;

    constructor(private httpClient: HttpClient) {
    }

    /**
     * @description
     * Envoie une requête POST pour sauvegarder la base de données
     * @param {String} schema
     * @param {String} threadId
     * @return {Observable<any>}
     */
    public saveDatabase(schema: String, threadId: String): Observable<any> {
        return this.httpClient.post<String>(
            `${this.pathService}/build-database`+threadId,
            schema
        );
    }

    /**
     * @description
     * Envoie une requête POST pour générer la base de données
     * @param {BuildDatabase} buildRequest
     * @param {String} threadId
     * @return {Observable<any>}
     */
    public generateDatabase(buildRequest: BuildDatabase, threadId: String): Observable<any> {
        return this.httpClient.post<String>(
            `${this.pathService}/build-database`+threadId,
            buildRequest
        );
    }
}