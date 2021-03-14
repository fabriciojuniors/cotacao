import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private http : HttpClient) { }

  insert(dados):Observable<any>{
    return this.http.post("https://appcotacao.herokuapp.com/controllers/notificacao/insert.php", dados);
  }
}
