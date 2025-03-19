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

    public buildDatabase(buildRequest: BuildDatabase): Observable<any> {
        return this.httpClient.post<String>(
            `${this.pathService}/build-database`,
            buildRequest
        );
    }


}