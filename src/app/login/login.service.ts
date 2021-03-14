import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  urlBase = "https://appcotacao.herokuapp.com/controllers/users/";

  sessao = {
    nome: null,
    login: null,
    id: null,
    nascimento: null,
    email: null,
    hash: null,
    instante: null
  }

  authUser(dados):Observable<any>{
    return this.http.post(this.urlBase+"auth.php", dados, {headers: {'Content-type': 'application/json'}});
  }

  insert(dados):Observable<any>{
    return this.http.post(this.urlBase+"insert.php", dados);
  }

  setSessao(dados){
    this.sessao.nome = dados.nome;
    this.sessao.nascimento = dados.aniversario;
    this.sessao.login = dados.login;
    this.sessao.instante = dados.instante;
    this.sessao.id = dados.id;
    this.sessao.hash = dados.hash;
    this.sessao.email = dados.email;
  }
}
