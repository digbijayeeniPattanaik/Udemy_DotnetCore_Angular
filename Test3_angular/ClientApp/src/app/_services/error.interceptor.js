//import { Injectable } from '@angular/core';
//import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
//import { catchError } from 'rxjs/operators';
//import { throwError } from 'rxjs';
//@Injectable()
//export class ErrorInterceptor implements HttpInterceptor {
//    intercept(req: import('@angular/common/http').HttpRequest<any>, next:
//        import('@angular/common/http').HttpHandler): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
//        return next.handle(req).pipe(
//            catchError(error => {
//                if (error.status == 401) {
//                    return throwError(error.statusText);
//                }
//                if (error instanceof HttpErrorResponse) {
//                    const applicationError = error.headers.get("Application-Error")
//                    if (applicationError != null) {
//                        return throwError(applicationError);
//                    }
//                    const serverError = error.error;
//                    let modatStatsError = '';
//                    if (serverError.errors && typeof serverError.errors === 'object') {
//                        for (const key in serverError.errors) {
//                            if (serverError.errors[key]) {
//                                modatStatsError += serverError.errors[key] + '\n';
//                            }
//                        }
//                    }
//                    return throwError(modatStatsError || serverError || 'Server Error');
//                }
//                return throwError('Server error 2');
//            })
//        );
//    }
//}
//# sourceMappingURL=error.interceptor.js.map