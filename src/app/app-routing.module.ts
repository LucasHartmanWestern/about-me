// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from "./projects/projects.component";
import { ResearchComponent } from "./research/research.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [{
  path: 'about', component: HomeComponent
}, {
  path: 'projects', component: ProjectsComponent
}, {
  path: 'research', component: ResearchComponent
}, {
  path: 'contact', redirectTo: '/about', pathMatch: 'full'
}, {
  path: '', redirectTo: '/about', pathMatch: 'full'
}];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
