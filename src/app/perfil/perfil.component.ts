import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InformacaoContaComponent } from '../informacao-conta/informacao-conta.component';
import { LoginService } from '../login/login.service';
import { NotificacaoComponent } from '../notificacao/notificacao.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  constructor(private login : LoginService,
              public modalController : ModalController) { }

  ngOnInit() {}

  async abrirModalConta() {
    const modal = await this.modalController.create({
      component: InformacaoContaComponent
    });
    return await modal.present();
  }

  async abrirModalNotificacao() {
    const modal = await this.modalController.create({
      component: NotificacaoComponent
    });
    return await modal.present();
  }

  toggleThme(evento){
    if(evento.detail.checked){
      document.body.setAttribute("color-theme", "dark");
    }else{
      document.body.removeAttribute("color-theme");
    }
  }


}



