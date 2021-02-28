import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoedaDetalhesComponent } from './moeda-detalhes.component';

describe('MoedaDetalhesComponent', () => {
  let component: MoedaDetalhesComponent;
  let fixture: ComponentFixture<MoedaDetalhesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoedaDetalhesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoedaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
