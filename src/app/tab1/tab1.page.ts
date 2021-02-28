import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoedaDetalhesComponent } from '../moeda-detalhes/moeda-detalhes.component';
import { MoedasServicesService } from '../service/moedas-services.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  moeda : {};
  constructor(private moedas : MoedasServicesService,
              private modalController : ModalController) {}

  async ngOnInit(){
     this.moedas.getAll()
      .subscribe(
        data =>{
          this.loadMoeda(data);
        },
        error =>{
          console.log(error);
        }
      )
  }

  loadMoeda(data){
    this.moeda = data || {};
    console.log(this.moeda);
    
    let slider = document.querySelector("#slides");
    let card = document.querySelector("#cards");3
    let icon ="<ion-icon name='cash-outline' slot='start'></ion-icon>" ;
    for(const m in this.moeda){
      let moeda = this.moeda[m];
      
      //Inicio - Gera slides
      let item = document.createElement("ion-slide");
      item.classList.add("container");
      let div = document.createElement("div");
      
      let titulo = document.createElement("h1");
      titulo.textContent = moeda.name;

      let img = document.createElement("img");
      img.src = "../../assets/money.png";
      img.style.height = "120px";
      img.style.width = "120px";

      let valor = document.createElement("h1");
      valor.textContent = moeda.code + " " + Number(moeda.high).toFixed(2);
      
      div.appendChild(titulo);
      div.appendChild(img);
      div.appendChild(valor);

      item.appendChild(div);
      slider.appendChild(item);
      //Fim - Gera Slides

      //Inicio - Gera cards
      let itemC = document.createElement("ion-item");
      itemC.onclick = () => this.openModal(moeda.code);
      itemC.innerHTML = icon + "<ion-label>"+moeda.name+"</ion-label>"+
                        "<ion-badge color='primary' slot='end'>"+moeda.code + " " + Number(moeda.high).toFixed(2)+"</ion-badge>";
      card.appendChild(itemC);

    } 
  }

  alterarVisualizacao(evento){
    document.querySelector("#slides").classList.toggle("hidden");
    document.querySelector("#cards").classList.toggle("hidden");
    
  }


  async openModal(moeda){
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
