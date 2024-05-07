import { Component, OnInit } from '@angular/core';
import { TextGeneratorService } from "../services/text-generator-service.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private textGeneratorService: TextGeneratorService) { }

  projectInfo: { project: string, description: string, events: {title: string, body: string, image: string | null}[] }[] = [];

  ngOnInit(): void {

    this.projectInfo.push({project: 'Bell Artificial Intelligence Technician', description:
        'Custom-built multi-modal language model used to troubleshoot various problems users of Bell Canada products may face.<br><br>' +
        'Supports sending text, photos, and PDFs, then analyzes customer concerns to provide relevant and helpful responses to users.<br><br>' +
        'This project was made in collaboration with Bell Canada to reduce the training time needed for their internet technicians and also to prototype a customer-facing support agent.<br><br>' +
        'Video demo <a href="https://youtu.be/xYl0aiNbgQg">here</a><br><br>', events: []});
    this.projectInfo.push({project: 'Screen Sight', description:
          'Augmented reality enhancement that allows the user to use their smartphone while wearing a virtual reality headset.<br><br>' +
          'Uses computer vision, edge detection, and image projection techniques in tandem.<br><br>' +
          'Video demo and installation tutorial <a href="https://www.youtube.com/watch?v=cNDiibXy4fQ">here</a><br><br>', events: [
        {title: "Before", body: "Before tool is used", image: "Before Processing.jpg"},
        {title: "After", body: "After tool is used", image: "After Processing.jpg"}
      ]});
    this.projectInfo.push({project: 'Bible AI',
      description:
        'Generate new text using a NLP trained only on the NIV Bible.<br><br>' +
        'Have the model finish prompts, or generate entirely new sentences.<br><br>' +
        'Based on the research paper \"Attention is All You Need\"<br><br>', events: []});
    this.projectInfo.push({project: 'Light Souls', description: 'A 3rd-person action-RPG souls-like game made in Unity', events: [
        {title: "Multiplayer", body: "Multiplayer using a C++ backend", image: "multiplayer-demo.png"},
        {title: "Character Select", body: "Multiple characters to choose from", image: "character-select.png"},
        {title: "Shooting", body: "3rd person ranged combat", image: "shooting-demo.png"},
        {title: "Ability", body: "Unique abilities for each character", image: "ability-demo.png"},
        {title: "Collectable", body: "Multiple collectables scattered around levels", image: "collectable-demo.png"},
        {title: "Inventory", body: "Inventory and power-up management", image: "inventory.png"},
        {title: "Boss", body: "Multiple bosses to fight", image: "boss-demo.png"},
        {title: "Dialogue", body: "Full dialogue system and narrative", image: "dialogue.png"}
      ]});
    this.projectInfo.push({project: 'UWOutlines', description: 'A course outline editor website for use by the University hosted using GCP<br><br>Demo link <a href="https://www.youtube.com/watch?v=WsDy3XwIQYc">here</a>', events: [
        {title: "Editor", body: "Outline editor system", image: "outline-editor.png"},
        {title: "Account Creation", body: "Authentication system with account creation", image: "accounts.png"},
        {title: "GPT Assistance", body: "ChatGPT integration for suggested improvement while editing", image: "gpt-assist.png"},
        {title: "Notifications", body: "Receive and manage notifications", image: "notifications.png"},
        {title: "Feedback", body: "Admins can provide feedback on outlines", image: "feedback.png"},
        {title: "Course management", body: "Manage multiple courses and their requisites", image: "course-manager.png"},
        {title: "Themes", body: "Choose from a variety of themes", image: "themes.png"},
        {title: "Mobile", body: "Fully responsive layout", image: "mobile.png"},
        {title: "Change detection", body: "Change detection and tracking system", image: "change-detection.png"},
      ]});
    this.projectInfo.push({project: 'Music Mania', description: 'An online music app for creating and rating playlists, hosted using AWS', events: [
        {title: "Search genres", body: "Browse various genres", image: "search-genres.png"},
        {title: "Playlist", body: "Curate playlists and view other's playlists", image: "playlist.png"},
        {title: "Reviews", body: "View and write reviews for playlists, tracks, and artists", image: "reviews.png"},
        {title: "Privacy", body: "View privacy, acceptable use, and DMCA policies", image: "privacy.png"},
        {title: "Tracks", body: "View and listen to tracks", image: "tracks.png"},
        {title: "DMCA", body: "View and dispute DMCA requests", image: "dmca.png"}
      ]});
    this.projectInfo.push({project: 'All You Can ESports', description: 'An ESports news and fantasy team site designed to handle big data and hosted using AWS', events: [
        {title: "Match Searching", body: "Search matches by keywords with soft matching", image: "match-search.png"},
        {title: "Fantasy", body: "Create fantasy teams which update as the season progresses", image: "fantasy.png"},
        {title: "Tickets", body: "Track ticket sales of various events", image: "tickets.png"},
        {title: "Tournaments", body: "View list of upcoming tournaments", image: "tournaments.png"},
        {title: "Tournament", body: "Get more details on individual tournaments", image: "tournament.png"},
        {title: "Teams", body: "Search and view team details", image: "teams.png"},
        {title: "Betting", body: "Place bets on matches", image: "betting.png"},
        {title: "Users", body: "View user details as an admin", image: "users.png"}
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

  generateText(event: any, startingText: any, responseObject: any, submitBtn: any) {
    event.preventDefault();

    responseObject.setAttribute('class', 'loading');

    startingText.disabled = true;

    this.textGeneratorService.generateText(startingText.value, 100).subscribe(
      data => {
        responseObject.setAttribute('class', 'loaded');
        responseObject.innerHTML = data.generated_text;
        event.target.removeChild(submitBtn);
      },
      error => {
        responseObject.setAttribute('class', 'loaded');
        responseObject.innerHTML = 'An error has occurred...';
        event.target.removeChild(submitBtn);
      }
    );
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
