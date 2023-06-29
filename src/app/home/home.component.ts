// @ts-ignore
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Dictionary for storing the words with their 3D coordinates
  wordDictionary: {[key: string]: {x: number, y: number, z: number} | undefined} = {};
  intervalID: any;

  courseList: {courseName: string, grade: number}[] = [];
  selectedItem: any;
  atEnd: boolean = false;
  atStart: boolean = false;

  workList: {company: string, logo: string, roles: {role: string, period: string,  description: string}[]}[] = [];

  mouseDragging = false;
  lastMousePos = {x: 0, y: 0};

  constructor() { }

  ngOnDestroy() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  ngOnInit(): void {

    this.courseList.push({courseName: 'Intro to Programming', grade: 100});
    this.courseList.push({courseName: 'Discrete Math', grade: 96});
    this.courseList.push({courseName: 'Data Structures and Algorithms', grade: 100});
    this.courseList.push({courseName: 'Digital Logic Systems', grade: 97});
    this.courseList.push({courseName: 'Scripting', grade: 97});
    this.courseList.push({courseName: 'Software Design', grade: 95});
    this.courseList.push({courseName: 'Software Construction', grade: 95});
    this.courseList.push({courseName: 'Networking', grade: 97});
    this.courseList.push({courseName: 'Database Management Systems', grade: 95});
    this.courseList.push({courseName: 'Operating Systems', grade: 93});
    this.courseList.push({courseName: 'HCI Design', grade: 99});
    this.selectedItem = this.courseList[2]; // Default selection

    this.workList.push({
      company: 'Western University', logo: './assets/images/western_logo_2.png', roles: [{
      role: 'Undergraduate Researcher',
        period: 'May 2023 - Present',
        description: 'In this position, I work on researching and developing interesting new ideas for optimizing charging algorithms with electric vehicles. I received the Dean\'s Award from the University for this position and work directly with other graduate students and researchers across the globe. I integrate AI learning algorithms into my research and work with cutting-edge simulators to assist in my research project.'}]
    });
    this.workList.push({
      company: 'Western Developers Society', logo: './assets/images/wds.png', roles: [{
        role: 'Vice President of Technology',
        period: 'June 2023 - Present',
        description: 'This role involves managing the technological output of one of the largest computer science student clubs at Western University. On top of managing a small team of the top developers within the club, I also help to design and coordinate events that teach new and exciting technologies to interested students.'
      }, {
        role: 'Technical Lead',
        period: 'September 2022 - June 2023',
        description: 'As a technical lead at this student club, I developed and hosted workshops, advised the various project developer teams, and did web development work. I worked directly with the VP of Development to help build the club into one of the largest computer science clubs at Western University in its first year of being active.'
      }]
    });
    this.workList.push({
      company: 'Optimy', logo: './assets/images/optimy.png', roles: [{
        role: 'Front-end Dev',
        period: 'April 2022 - June 2023',
        description: 'I worked directly with senior front-end developers learning new development skills and working on numerous web development projects. I worked with the Angular framework and created numerous features for one of the company\'s web applications which is currently used by hundreds of users daily.'
      }, {
        role: 'Quality Assurance Specialist',
        period: 'June 2020 - June 2023',
        description: 'In this position, I did program testing, technical troubleshooting, and often worked with senior software developers giving them input on program development as well as relaying user feedback. I also handled the automation of regression testing using Selenium with BrowserStack. I gained a lot of knowledge on industry-leading technology and how it can be used effectively in the business world. I was trained on a lot of software development best practices and learned a lot about how to develop code that is less prone to issues.'
      }]
    });
    this.workList.push({
      company: 'Kognitive Sales Solutions', logo: './assets/images/kss.png', roles: [{
        role: 'Field Support Technician',
        period: 'October 2018 - September 2021',
        description: 'I reported directly to the Director of Operations for the company and helped to support the sales representatives at the company with any technical issues they had. I also helped to build and send reports to the company\'s various clients. I gained lots of experience in this role and learned much about the technology used in many modern businesses.'
      }, {
        role: 'Inventory Analyst Support',
        period: 'October 2019 - June 20203',
        description: 'In this role I did back-end technical support work for the company as well as made inventory ordering decisions based on trends in sales and current stock levels. I was also responsible for managing employee compliance with our internal systems.'
      }]
    });


    this.wordDictionary['Python'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Angular'] = this.randomSpherePoint(0.5);
    this.wordDictionary['SQL'] = this.randomSpherePoint(0.5);
    this.wordDictionary['JavaScript'] = this.randomSpherePoint(0.5);
    this.wordDictionary['HTML'] = this.randomSpherePoint(0.5);
    this.wordDictionary['CSS/SCSS'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Java'] = this.randomSpherePoint(0.5);
    this.wordDictionary['C#'] = this.randomSpherePoint(0.5);
    this.wordDictionary['C++'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Unity'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Git'] = this.randomSpherePoint(0.5);
    this.wordDictionary['ARM Assembly'] = this.randomSpherePoint(0.5);
    this.wordDictionary['TypeScript'] = this.randomSpherePoint(0.5);
    this.wordDictionary['NodeJS'] = this.randomSpherePoint(0.5);
    this.wordDictionary['PyTorch'] = this.randomSpherePoint(0.5);
    this.wordDictionary['TensorFlow'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Figma'] = this.randomSpherePoint(0.5);
    this.wordDictionary['AWS'] = this.randomSpherePoint(0.5);
    this.wordDictionary['GCP'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Numpy'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Cplex'] = this.randomSpherePoint(0.5);

    this.renderWords('globe')

    this.intervalID = setInterval(() => {
      if (!this.mouseDragging) {
        this.rotateAllPoints({x: -0.2, y: 0.2, z: 0.1});
      }
    }, 10);

    const container = document.getElementById('globe');
    container?.addEventListener('mousedown', (e) => this.onMouseDown(e));
    container?.addEventListener('mouseup', () => this.onMouseUp());
    container?.addEventListener('mousemove', (e) => this.onMouseMove(e));
    container?.addEventListener('touchstart', (e) => this.onTouchStart(e));
    container?.addEventListener('touchend', () => this.onTouchEnd());
    container?.addEventListener('touchmove', (e) => this.onTouchMove(e));

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

  }

  nextItem(): void {
    const index = this.courseList.indexOf(this.selectedItem);
    if (index < this.courseList.length - 1) {
      this.selectedItem = this.courseList[index + 1];
    }
  }

  previousItem(): void {
    const index = this.courseList.indexOf(this.selectedItem);
    if (index > 0) {
      this.selectedItem = this.courseList[index - 1];
    }
  }

  getTransform(): string {

    let mobile = window.innerWidth <= 768 ? true : false;

    const index = this.courseList.indexOf(this.selectedItem);

    if (index == this.courseList.length - 1) {
      document.querySelector('.arrow-right')?.setAttribute('disabled', 'true');
    } else if (index == 0) {
      document.querySelector('.arrow-left')?.setAttribute('disabled', 'true');
    } else {
      document.querySelector('.arrow-right')?.removeAttribute('disabled');
      document.querySelector('.arrow-left')?.removeAttribute('disabled');
    }

    if (index < this.courseList.length - (mobile ? 0 : 1)) {
      return `translateX(calc(-${(index - (mobile ? 0 : 1)) * (!mobile ? 33 : 85)}% - ${(index) * 24}px ${mobile ? '+ 7.5%' : ''}))`;
    }
    else {
      return `translateX(calc(-${(index - 1 - (mobile ? 0 : 1)) * (!mobile ? 33 : 85)}% - ${(index - 1) * 24}px ${mobile ? '+ 7.5%' : ''}))`;
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.mouseDragging = true;
    this.lastMousePos = {x: event.clientX, y: event.clientY};
  }

  onMouseUp(): void {
    this.mouseDragging = false;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.mouseDragging) {
      return;
    }

    // Compute rotation based on mouse movement delta
    const dx = event.clientX - this.lastMousePos.x;
    const dy = event.clientY - this.lastMousePos.y;

    // Rotate all points with the computed rotation
    this.rotateAllPoints({x: -dy * 0.5, y: dx * 0.5, z: 0});

    this.lastMousePos = {x: event.clientX, y: event.clientY};
  }

  onTouchStart(event: TouchEvent): void {
    this.mouseDragging = true;
    this.lastMousePos = {x: event.touches[0].clientX, y: event.touches[0].clientY};
  }

  onTouchEnd(): void {
    this.mouseDragging = false;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.mouseDragging) {
      return;
    }

    // Compute rotation based on touch movement delta
    const dx = event.touches[0].clientX - this.lastMousePos.x;
    const dy = event.touches[0].clientY - this.lastMousePos.y;

    // Rotate all points with the computed rotation
    this.rotateAllPoints({x: -dy * 0.5, y: dx * 0.5, z: 0});

    this.lastMousePos = {x: event.touches[0].clientX, y: event.touches[0].clientY};
  }

  renderWords(containerId: string): void {
    // Get the container where words will be rendered
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`No container found with id ${containerId}`);
      return;
    }

    // Clear previous content
    container.innerHTML = '';

    // Render each word
    for (const word in this.wordDictionary) {
      const style = this.getWordStyle(word);

      if (!style) {
        continue;
      }

      // Create a span for the word
      const span = document.createElement('span');
      span.textContent = word;

      // Set the CSS styles
      span.style.position = `absolute`;

      span.style.fontSize = `${style.size}px`;
      span.style.opacity = `${style.transparency}`;

      span.style.left = `${(container.offsetWidth / 2.5) + (this.wordDictionary[word]?.x  || 0) * (container.offsetWidth / 2.5)}px`;
      span.style.top = `${(container.offsetHeight / 2.5) + (this.wordDictionary[word]?.y || 0) * (container.offsetHeight / 2.5)}px`;

      // Add to container
      container.appendChild(span);
    }
  }

  rotateAllPoints(rotation: {x: number, y: number, z: number}) {
    // Iterate over each word in the dictionary
    for (const word in this.wordDictionary) {
      // Get the current point
      const point = this.wordDictionary[word] || {x: 0, y: 0, z: 0};

      // Calculate the new point after rotation
      const newPoint = this.rotatePoint(point, rotation);

      // Update the point in the dictionary
      this.wordDictionary[word] = newPoint;
    }

    // Re-render words after their position changed
    this.renderWords('globe');
  }


  randomSpherePoint(minDistance: number) {
    let point;
    let isValidPoint = false;

    while (!isValidPoint) {
      // Generate a random point on the sphere
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      point = { x, y, z };

      // Check distance against all existing points
      isValidPoint = true;
      for (const word in this.wordDictionary) {
        const existingPoint = this.wordDictionary[word];
        const distance = Math.sqrt(
          Math.pow((existingPoint?.x || 0) - point.x, 2) +
          Math.pow((existingPoint?.y || 0) - point.y, 2) +
          Math.pow((existingPoint?.z || 0) - point.z, 2)
        );

        // If distance is less than the minimum required, invalidate the point
        if (distance < minDistance) {
          isValidPoint = false;
          break;
        }
      }
    }

    return point;
  }

  rotatePoint(point: {x: number, y: number, z: number}, rotation: {x: number, y: number, z: number}): {x: number, y: number, z: number} {
    const cos = Math.cos;
    const sin = Math.sin;

    // Convert degrees to radians for rotation
    const rx = rotation.x * (Math.PI / 180);
    const ry = rotation.y * (Math.PI / 180);
    const rz = rotation.z * (Math.PI / 180);

    // Rotation around x-axis
    const newX = point.x;
    const newY = point.y * cos(rx) - point.z * sin(rx);
    const newZ = point.y * sin(rx) + point.z * cos(rx);

    // Rotation around y-axis
    const newX2 = newZ * sin(ry) + newX * cos(ry);
    const newY2 = newY;
    const newZ2 = newZ * cos(ry) - newX * sin(ry);

    // Rotation around z-axis
    const newX3 = newX2 * cos(rz) - newY2 * sin(rz);
    const newY3 = newX2 * sin(rz) + newY2 * cos(rz);
    const newZ3 = newZ2;

    return { x: newX3, y: newY3, z: newZ3 };
  }

  // Function for mapping word to a 3D point on the surface of the sphere
  mapWordToSpherePoint(word: string, screenPosition: { x: number, y: number }, screenWidth: number, screenHeight: number): void {
    // Normalize screen position to [-1, 1] range
    const u = (screenPosition.x / screenWidth) * 2 - 1;
    const v = (screenPosition.y / screenHeight) * 2 - 1;

    // Compute spherical coordinates
    const theta = Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    // Convert to Cartesian coordinates
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);

    this.wordDictionary[word] = { x, y, z };
  }

  // Function for getting the word size and transparency based on its z coordinate
  getWordStyle(word: string): { size: number, transparency: number } | null {
    const point = this.wordDictionary[word];

    if (point) {
      // We map the z coordinate from [-1, 1] to a size range, e.g., [10, 30] for font size
      const size = this.mapRange(point.z, -1, 1, 10, 30);

      // We map the z coordinate from [-1, 1] to a transparency range, e.g., [0.5, 1] for opacity
      const transparency = this.mapRange(point.z, -1, 1, 0.5, 1);

      return { size, transparency };
    }

    return null;
  }

  // Utility function for mapping a number from one range to another
  mapRange(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

}
