import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  urlBase = "http://192.168.0.104/phpoo_teste/controllers/users/";

  sessao = {
    nome: null,
    login: null,
    id: null,
    nascimento: null,
    hash: null,
    instante: null
  }

  authUser(dados):Observable<any>{
    return this.http.post(this.urlBase+"auth.php", dados);
  }

  setSessao(dados){
    this.sessao.nome = dados.nome;
    this.sessao.nascimento = dados.aniversario;
    this.sessao.login = dados.login;
    this.sessao.instante = dados.instante;
    this.sessao.id = dados.id;
    this.sessao.hash = dados.hash;
  }
}
