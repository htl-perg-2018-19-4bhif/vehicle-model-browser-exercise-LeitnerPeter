import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from "./about/about.component";
import { ModelsComponent } from "./models/models.component";

const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'models' },
{ path: 'models', component: ModelsComponent },
{ path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
