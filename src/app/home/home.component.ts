import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule]
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {}

  goLogin(){
    this.router.navigate(['/login'])
  }
  goRegistrar(){
    this.router.navigate(['/registrar'])
  }

}
