import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoedaDetalhesComponent } from '../moeda-detalhes/moeda-detalhes.component';
import { MoedasServicesService } from '../service/moedas-services.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  moeda: {};
  cotacao = [];

  slideOpts = {
    initialSlide: 2,
    speed: 400
  };

  constructor(private moedas: MoedasServicesService,
    private modalController: ModalController) { }

  async ngOnInit() {
    this.moedas.getAll()
      .subscribe(
        data => {
          this.loadMoeda(data);
        },
        error => {
          console.log(error);
        }
      )
  }

  loadMoeda(data) {
    this.moeda = data || {};

    let slider = document.querySelector("#slides");
    let card = document.querySelector("#cards"); 3
    let icon = "<ion-icon name='cash-outline' slot='start'></ion-icon>";
    for (const m in this.moeda) {
      let moeda = this.moeda[m];
      this.cotacao.push({
        moeda: moeda.code,
        nome: moeda.name,
        valorMaximo: moeda.high,
        valorMinimo: moeda.low,
        variacao: moeda.varBid
      });

    }

  }

  alterarVisualizacao(evento) {
    document.querySelector("#slides").classList.toggle("hidden");
    document.querySelector("#cards").classList.toggle("hidden");

  }


  async openModal(moeda) {
    const modal = await this.modalController.create({
      component: MoedaDetalhesComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'moeda': moeda
      }
    });

    return await modal.present();
  }
}
