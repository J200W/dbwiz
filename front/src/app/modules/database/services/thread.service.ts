import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {User} from "../../../core/models/user.interface";
import {BuildDatabase} from "../interfaces/build-database.interface";
import {Message} from "../../../core/models/message.interface";
import {ResponseApi} from "../../authentification/interfaces/response-api.interface";
import {Thread} from "../../../core/models/thread.interface";

@Injectable({
    providedIn: 'root',
})
export class ThreadService {
    /**@
     * Chemin vers le service
     * @type {string}
     * @memberof AuthService
     * @default api/auth
     * @private
     */
    private pathService: string = `${environment.apiBackendBaseUrl}/api/thread`;

    constructor(private httpClient: HttpClient) {
    }

    /**
     * @description
     * Envoie une requête GET pour créer un thread/projet
     * @return {Observable<any>}
     */
    public buildProject(): Observable<any> {
        return this.httpClient.get<any>(
            `${this.pathService}/build-project`,
        );
    }

    /**
     * @description
     * Check si le thread existe
     * @param {String} threadId
     * @return {Observable<any>}
     */
    public checkProject(threadId: String): Observable<any> {
        return this.httpClient.post<any>(
            `${this.pathService}/check-project`,
            {threadId}
        )
    }

    /**
     * @description
     * Récupère tous les messages d'une conversation
     * @param {String} threadId
     * @return {Observable<Message[]>}
     */
    public getMessages(threadId: String): Observable<Message[]> {
        return this.httpClient.post<Message[]>(
            `${this.pathService}/get-messages`,
            {threadId}
        )
    }

    /**
     * @description
     * Envoie un message à l'IA
     * @param {Message} message
     * @return {Observable<any>}
     */
    public sendMessage(message: Message): Observable<any> {
        return this.httpClient.post<Message>(
            `${this.pathService}/send-message`,
            message
        );
    }

    /**
     * @description
     * Récupérer toutes les conversations
     * @return {Observable<any>}
     */
    public getThreads(): Observable<any> {
        return this.httpClient.get<any>(
            `${this.pathService}/get-threads`,
        );
    }

    /**
     * @description
     * Mettre à jour un projet
     * @param {Thread} thread
     * @return {Observable<ResponseApi>}
     */
    public updateThread(thread: Thread): Observable<ResponseApi> {
        console.log("thread :", thread)
        return this.httpClient.put<ResponseApi>(
            `${this.pathService}/update-thread`,
            thread
        )
    }

    /**
     * @description
     * Supprimer un projet
     * @param {String} threadId
     * @return {Observable<ResponseApi>}
     */
    public deleteThread(threadId: String): Observable<ResponseApi> {
        return this.httpClient.post<ResponseApi>(
            `${this.pathService}/delete-thread`,
            {threadId}
        )
    }
}