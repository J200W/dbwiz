import { HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
/**
 * Intercepteur HTTP pour ajouter le token JWT aux requêtes
 * @class
 * @implements {HttpInterceptor}
 */
export class JwtInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true,
        });

        return next.handle(req);
    }
}

/**
 * Liste des intercepteurs HTTP
 */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];