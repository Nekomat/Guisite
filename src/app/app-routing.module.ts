import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieproductComponent } from './categorieproduct/categorieproduct.component';
import { FourproductComponent } from './fourproduct/fourproduct.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"search",
    component:SearchComponent
  },
  {
    path:"categorie/:id",
    component:CategorieproductComponent
  },
  {
    path:"Fourproducts/:id",
    component:FourproductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
