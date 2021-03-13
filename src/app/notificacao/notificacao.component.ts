import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { MoedasServicesService } from '../service/moedas-services.service';
import { NotificacaoService } from '../service/notificacao.service';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss'],
})
export class NotificacaoComponent implements OnInit {
  moedas = [];
  exibirLoader = false;

  moedaSelecionada = '';
  @ViewChild("email") email: IonInput;
  constructor(public ModalController: ModalController, private login: LoginService, private moeda: MoedasServicesService,
    private notificacao: NotificacaoService, private alertController: AlertController) { }

  ngOnInit() {
    this.moeda.getAll().subscribe(
      data => {
        this.preencherMoedas(data);
      }
    )
  }
  preencherMoedas(data) {
    for (const m in data) {
      let moeda = data[m];
      this.moedas.push({ nome: moeda.name, valor: moeda.high, code: moeda.code });
    }
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.ModalController.dismiss({
      'dismissed': true
    });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  cadastrar(f: NgForm) {
    this.exibirLoader = true;
    let email = f.value.email;
    let moedas = this.moedaSelecionada;
    let cotacao = f.value.valor;
    let receberEmail = f.value.receberEmail;
    let usuario = this.login.sessao.id;
    let qtdMoedas = moedas.length;
    let cadastrou = false;
    let dados = [];
    for (let i = 0; i < qtdMoedas; i++) {
      dados.push({
        usuario: usuario,
        moeda: moedas[i],
        cotacao: cotacao
      })
    }
    this.notificacao.insert(dados).toPromise()
      .then(res => {
        this.exibirLoader = false;
        this.dismiss();
      }).catch(err => {
        this.presentAlert(JSON.stringify(err));
        this.dismiss();
    })

      

  }


}
