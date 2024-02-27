import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivadedGuard, canMatchGuard } from './auth/guards/auth.guard';
const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
    canActivate:[canActivadedGuard],
    canMatch:[canMatchGuard],
  },
  {
    path:'heros',
    loadChildren:()=>import('./heroes/heroes.module').then(m=>m.HeroesModule),
    canActivate:[canActivadedGuard],
    canMatch:[canMatchGuard],
  },
  {
    path:'404',
    component:Error404PageComponent
  },
  {
    path:'',
    redirectTo:'heros',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
