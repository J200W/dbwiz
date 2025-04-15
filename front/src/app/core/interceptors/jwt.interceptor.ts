import {
    HttpRequest,
    HttpEvent,
    HttpHandlerFn
} from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Intercepteur HTTP pour ajouter le token JWT aux requêtes
 * @function
 */
export function jwtInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    req = req.clone({
        withCredentials: true,
    });
    return next(req);
}