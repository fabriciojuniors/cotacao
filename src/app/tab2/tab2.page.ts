import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonSelect } from '@ionic/angular';
import { MoedasServicesService } from '../service/moedas-services.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  moedas = [];

  @ViewChild("moedaOriginal") moedaOriginal: IonSelect;
  @ViewChild("valorMoedaOriginal") valorMoedaOriginal: IonInput;
  @ViewChild("moedaDestino") moedaDestino: IonSelect;
  @ViewChild("valorMoedaDestino") valorMoedaDestino: IonInput;
  constructor(private moedaService: MoedasServicesService) { }

  ngOnInit() {
    this.moedaService.getAll().subscribe(
      data => {
        this.preencherMoedas(data);
      },
      error => {
        console.log(error);

      }
    )
  }

  preencherMoedas(data) {
    for (const m in data) {
      let moeda = data[m];
      this.moedas.push({ nome: moeda.name, valor: moeda.high });
    }
  }

  converter() {
    let moedaOriginal = this.moedaOriginal.value;
    let valorOriginal: number = Number(this.valorMoedaOriginal.value);
    let moedaDestino = this.moedaDestino.value;
    let valorDestino = valorOriginal / (moedaDestino / moedaOriginal);

    if (moedaOriginal) {
      this.valorMoedaDestino.value = valorDestino.toFixed(2);
    }
  }

}
