import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild("usuario") usuario : ElementRef;
  constructor() { }
  
  ngOnInit() {}

  entrar(){
    event.preventDefault();
    console.log(this.usuario.nativeElement.value);

    
    
  }

}
