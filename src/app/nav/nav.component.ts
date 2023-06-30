// @ts-ignore
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  _navPage: string = "About";
  @Output() navPage = new EventEmitter<string>();

  mobileNavShow: boolean = false;

  constructor() { }

  ngOnInit(): void {

    // Get the current page URL
    var currentPage = window.location.href;

    // Get all the anchor elements on the page
    var anchors = document.getElementsByTagName('a');

    // Loop through the anchor elements
    for (var i = 0; i < anchors.length; i++) {
      // Check if the anchor's href matches the current page URL
      if (anchors[i].href === currentPage) {
        // Add a CSS class to highlight the anchor
        anchors[i].classList.add('active');
        break;
      }
    }

    this.navigate(localStorage.getItem('page') || 'About');

    if (localStorage.getItem('displayMode') == 'dark')
      document.getElementById('darkmode-toggle')?.setAttribute('checked', 'true');
  }

  toggleNav(): void {
    this.mobileNavShow = !this.mobileNavShow;
  }

  get getNavPage(): string {
    return this._navPage;
  }

  navigate(value: string) {
    localStorage.setItem('page', value);
    this._navPage = value;
    this.navPage.emit(this._navPage);
  }


  toggleMode(): void {
    let body = document.querySelector('body');

    let mode = localStorage.getItem('displayMode');
    if (!mode) {
      let bodyClass = body?.getAttribute('class');
      mode = bodyClass || 'light';
      mode = mode == 'dark' ? 'light' : 'dark'
      localStorage.setItem('displayMode', mode);
    } else {
      mode = mode == 'dark' ? 'light' : 'dark'
      localStorage.setItem('displayMode', mode);
    }

    body?.setAttribute('class', mode);
  }

}
