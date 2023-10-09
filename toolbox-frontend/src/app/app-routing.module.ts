import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ServiceComponent } from "./service/service.component";
import {FileShareComponent} from "./file-share/file-share.component";
import {CompilersComponent} from "./compilers/compilers.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'share', component: FileShareComponent },
  { path: 'compilers', component: CompilersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
