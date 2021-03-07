import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(private LoginService : LoginService,
              private router : Router) {}

  ngOnInit(){
    if(this.LoginService.sessao.hash == null){
      this.router.navigate(["/home"]);
    }
  }
}
