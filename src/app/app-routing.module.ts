import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SignupGuard } from './guards/signup.guard';

import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonCatalogueComponent } from './components/pokemon-catalogue/pokemon-catalogue.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: 'catalogue',
    component: PokemonCatalogueComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'catalogue/:name',
    component: PokemonDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'trainer',
    component: TrainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [SignupGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signup',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
