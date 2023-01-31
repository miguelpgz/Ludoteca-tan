import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Prestamo } from './model/Prestamo';
import { PrestamoPage } from './model/PrestamoPage';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PrestamoService {

    constructor(        
      private http: HttpClient


    ) { }

    getPrestamos(pageable:Pageable, gameId?: number, clientId?: number, fecha?:Date): Observable<PrestamoPage> {

        return this.http.post<PrestamoPage>(this.composeFindUrl(gameId, clientId,fecha),{pageable:pageable});
        
    }

    isPrested(prestamo: Prestamo) :Observable<Boolean>{
        return this.http.post<Boolean>('http://localhost:8080/prestamo/check-availability',prestamo);
        
    }

    exceedPrestamos(prestamo: Prestamo) :Observable<Boolean>{
        return this.http.post<Boolean>('http://localhost:8080/prestamo/check-exceed',prestamo);
        
    }

    getPrestamosIni(pageable: Pageable): Observable<PrestamoPage> {
        return this.http.post<PrestamoPage>('http://localhost:8080/prestamo', {pageable:pageable});

    }
    getAllPrestamos(): Observable<Prestamo[]> {
       
        return this.http.get<Prestamo[]>('http://localhost:8080/prestamo');
    }


    deletePrestamo(idPrestamo : number): Observable<void> {
        return this.http.delete<void>('http://localhost:8080/prestamo/'+idPrestamo);
    }

    savePrestamo(prestamo: Prestamo): Observable<void> {
        let url = 'http://localhost:8080/prestamo';

        if (prestamo.id != null) {
            url += '/'+prestamo.id;
        }
        return this.http.put<void>(url, prestamo);
    }

    private composeFindUrl(gameId?: number, clientId?: number, fecha?:Date) : string {
        let params = '';
        
        if (gameId != null) {
            params += "gameId="+gameId;
        }

        if (clientId != null) {
            if (params != '') params += "&";
            params += "clientId="+clientId;
        }

        if (fecha != null) {
            if (params != '') params += "&";
            params += "fechaPrestamo="+fecha;
        }

        let url = 'http://localhost:8080/prestamo'

        console.log( url + '?'+params);
        
        if (params == '') return url;
        
        else return url + '?'+params;
    }
}
