import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from "./projects/projects.component";
import { ResearchComponent } from "./research/research.component";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";

const routes: Routes = [{
  path: 'home', component: HomeComponent
}, {
  path: 'projects', component: ProjectsComponent
}, {
  path: 'research', component: ResearchComponent
}, {
  path: 'contact', redirectTo: '/home', pathMatch: 'full'
}, {
  path: '', redirectTo: '/home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
