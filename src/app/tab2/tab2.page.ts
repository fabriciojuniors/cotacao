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
   unmask(valor){
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/[\-]/,"");
    return valor;
}
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
  mask_valor(e){
    let valor = e.target.value
    valor = this.unmask(valor);
    valor = valor.replace(/^[0]/,"");
    valor = valor.replace(/(\d)?(\d{2}$)/, "$1,$2");
    if(valor.length <= 3)
        valor = "0"+valor;
    if(valor.length > 6)
        valor = valor.replace(/(\d{3})(\,\d{2})/g, ".$1$2");

    if(valor.length >10)
        valor = valor.replace(/(\d{3})(\.\d{3})(\,\d{2})/g, ".$1$2$3");

    if(valor.length > 14)
        valor = valor.replace(/(\d{3})(\.\d{3})(\.\d{3})(\,\d{2})/g, ".$1$2$3$4");    
    
    e.target.value = valor;
    this.converter();
}
  preencherMoedas(data) {
    for (const m in data) {
      let moeda = data[m];
      //console.log(moeda.name);
      
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
