import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'about_me';

  page: string | undefined = 'About';

  onNavPageChange(newPage: string) {
    this.page = newPage;
  }
}
