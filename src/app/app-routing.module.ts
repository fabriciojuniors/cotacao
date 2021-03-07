import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { Tab1Page } from './tab1/tab1.page';
import { TabsPageRoutingModule } from './tabs/tabs-routing.module';
import { TabsPageModule } from './tabs/tabs.module';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    component: HomeComponent
  },
   {
     path: 'login',
     component: LoginComponent
   }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
