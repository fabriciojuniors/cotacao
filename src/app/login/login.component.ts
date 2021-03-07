import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@NgModule({
  imports: [FormsModule]
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  exibirLoader = false;
  sessaoInvalida = false;
  constructor(private LoginService : LoginService,
              private router : Router) { }

  ngOnInit() {}
  async entrar(f: NgForm) {
    let usuario = f.value;
    this.exibirLoader = true;
    await this.LoginService.authUser(usuario).toPromise()
      .then( res => {
        this.exibirLoader = false;
        this.validaSessao(res);
      })
      .catch( err => {
        console.log(err);
      })
  }

  validaSessao(dados){
    console.log(dados);
    
    if(dados.mensagem){
      this.sessaoInvalida = true;
      return;
    }

    if(dados.hash){
      this.LoginService.setSessao(dados);
      this.router.navigate(["/tabs"]);
    }
  }

}
