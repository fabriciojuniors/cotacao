import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss'],
})
export class NovoUsuarioComponent implements OnInit {
  sessaoInvalida = false;
  camposVazios = false;
  mensagem = '';
  vazio = '';
  exibirLoader = false;
  constructor(private login : LoginService,
              private router : Router,
              public alertController: AlertController) { }

  ngOnInit() {}
  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
  cadastrar(f : NgForm){
    if(f.value.senha === "" || f.value.login === "" || f.value.nome === "" || f.value.senha2 === ""){
      this.vazio = "Preencha todos os campos.";
      this.camposVazios = true;
      return;
    }else{this.camposVazios = false}
    if(f.value.senha != f.value.senha2){
      this.sessaoInvalida = true;
      this.mensagem = this.mensagem + "Senhas não conferem.";
      return;
    }else{this.sessaoInvalida = false}
    this.exibirLoader = true;
    
    this.camposVazios = false;
    this.sessaoInvalida = false;
    let dados = {
      nome : f.value.nome,
      login : f.value.login,
      senha : f.value.senha,
      email: f.value.email
    };
    
    this.login.insert(dados).toPromise()
      .then(res =>{
        if(res.mensagem){
            this.exibirLoader = false;
            this.presentAlert("Usuário cadastrado com sucesso.");
            this.router.navigate(["/login"]);
        }else{
          let msg = res.toString();
          msg = msg.split("CONTEXT");
          msg = msg[0];
          msg = msg.split("ERROR:");
          this.mensagem = msg[1];
          this.sessaoInvalida = true;
          this.exibirLoader = false;
        }
      })
      .catch(err =>{
        this.presentAlert(err)
      })
    
    
  }

}
