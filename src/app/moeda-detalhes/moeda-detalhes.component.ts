import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoedasServicesService } from '../service/moedas-services.service';

import { Chart } from 'chart.js';


@Component({
  selector: 'app-moeda-detalhes',
  templateUrl: './moeda-detalhes.component.html',
  styleUrls: ['./moeda-detalhes.component.scss'],
})
export class MoedaDetalhesComponent implements OnInit {
  @Input() moeda: string;
  moedaC = [];
  constructor(private moedaService : MoedasServicesService,
              private ModalController : ModalController) { }

  ngOnInit() {
    this.moedaService.getEspecifico(this.moeda).subscribe(
      data =>{
        this.moedaC.push(data[this.moeda]);
      },
      error =>{console.log(error);
      }
    )
  }

  fechar(){
    this.ModalController.dismiss({
      'dismissed': true
    });
  }

  //Chart
  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    let variacao = [];
    let grafico = [];
    this.moedaService.getVariacao(this.moeda).subscribe(
      data =>{
        Object.keys(data).forEach(m =>{
          variacao.push(Number(data[m].high));
        })
        this.bars = new Chart(this.barChart.nativeElement, {
          type: 'bar',
          data: {
            labels: ['Hoje', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-10', '-11', '-12', '-13', '-14'],
            datasets: [{
              label: 'Variação nos últimos 15 dias',
              data: variacao,
              backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
              borderWidth: 1
            }]
          }
        });
      },
      error => {console.log(error);
      }
    )
    

  }

}
