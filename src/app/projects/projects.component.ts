import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  projectInfo: { project: string, events: {title: string, body: string, image: string}[] }[] = [];

  ngOnInit(): void {

    this.projectInfo.push({project: 'cool-pool', events: [
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 4", body: "This was the fourth Event", image: "img4.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"}
      ]});
    this.projectInfo.push({project: 'bible-ai', events: [
      {title: "Event 1", body: "This was the first Event", image: "img1.png"},
      {title: "Event 2", body: "This was the second Event", image: "img2.png"},
      {title: "Event 3", body: "This was the third Event", image: "img3.png"},
      {title: "Event 4", body: "This was the fourth Event", image: "img4.png"},
      {title: "Event 1", body: "This was the first Event", image: "img1.png"},
      {title: "Event 2", body: "This was the second Event", image: "img2.png"},
      {title: "Event 3", body: "This was the third Event", image: "img3.png"},
      {title: "Event 1", body: "This was the first Event", image: "img1.png"},
      {title: "Event 2", body: "This was the second Event", image: "img2.png"},
      {title: "Event 3", body: "This was the third Event", image: "img3.png"},
      {title: "Event 1", body: "This was the first Event", image: "img1.png"},
      {title: "Event 2", body: "This was the second Event", image: "img2.png"},
      {title: "Event 3", body: "This was the third Event", image: "img3.png"}
    ]});
    this.projectInfo.push({project: 'light-souls', events: [
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 4", body: "This was the fourth Event", image: "img4.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"}
      ]});
    this.projectInfo.push({project: 'music-mania', events: [
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 4", body: "This was the fourth Event", image: "img4.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"}
      ]});
    this.projectInfo.push({project: 'all-you-can-esports', events: [
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 4", body: "This was the fourth Event", image: "img4.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"},
        {title: "Event 1", body: "This was the first Event", image: "img1.png"},
        {title: "Event 2", body: "This was the second Event", image: "img2.png"},
        {title: "Event 3", body: "This was the third Event", image: "img3.png"}
      ]});

    let body = document.querySelector('body');

    let mode = localStorage.getItem('displayMode');
    if (!mode) {
      let bodyClass = body?.getAttribute('class');
      mode = bodyClass || 'light';
      localStorage.setItem('displayMode', mode);
    } else {
      localStorage.setItem('displayMode', mode);
    }

    body?.setAttribute('class', mode);

    this.handlePopin();
  }

  getEvents(identifier: string): {title: string, body: string, image: string}[] {
    let events = this.projectInfo.filter((value: any) => value.project == identifier).map((value: any) => value.events);
    return events[0];
  }


  handlePopin(): void {
    // Get all the elements you want to show on scroll
    const events = document.querySelectorAll('.event');

    const options = {
      root: null, // relative to document viewport
      rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.1 // visible amount of item shown in relation to root
    };

    // Callback function to be run whenever a target is intersected
    const callback = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          // Add the visible class to the element
          entry.target.classList.add('visible');
        }
      });
    };

    // Create the observer instance
    const observer = new IntersectionObserver(callback, options);

    // Start observing each event
    events.forEach(event => {
      observer.observe(event);
    });
  }

  // Open up the body of the page
  openPanel(event: any) {
    const classes = event?.target?.getAttribute('class');
    if (classes.includes('active')) {
      event?.target?.setAttribute('class', 'accordion page-title');
      event?.target?.parentElement?.querySelector('.panel.page-body.visible').setAttribute('class', 'panel page-body');
    }
    else {
      event?.target?.setAttribute('class', 'accordion page-title active');
      event?.target?.parentElement?.querySelector('.panel.page-body').setAttribute('class', 'panel page-body visible');
    }
    let panel = event?.target?.parentElement.querySelector('.panel');
    console.log(panel);
    if (panel?.style?.maxHeight) {
      panel.style.maxHeight = null;
    }
    else {
      console.log('expand');
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

}
