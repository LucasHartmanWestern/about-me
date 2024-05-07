// @ts-ignore
import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';

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
  private velocity = { x: 0, y: 0 };
  private friction = 0.95; // This can be tweaked for different "feeling"

  courseList: {courseName: string, grade: number}[] = [];
  selectedItem: any;
  atEnd: boolean = false;
  atStart: boolean = false;
  timeoutId: any; // Global variable to store the timeout ID

  workList: {company: string, logo: string, roles: {role: string, period: string,  description: string}[]}[] = [];

  mouseDragging = false;
  lastMousePos = {x: 0, y: 0};

  touchStartX = 0;
  mouseStartX = 0;
  dragging = false;
  itemWidth = 0;
  totalMovement = 0;
  dragOffset = 0;

  throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => ReturnType<T> | undefined {
    let inThrottle: boolean;
    let result: ReturnType<T> | undefined;

    return function(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> | undefined {
      const context = this;
      if (!inThrottle) {
        result = func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
      return result;
    };
  }

  constructor() {
    this.onMouseMove = this.throttle(this.onMouseMove.bind(this), 10);
    this.onTouchMove = this.throttle(this.onTouchMove.bind(this), 1);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  ngOnDestroy() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }

    document.removeEventListener('touchstart', this.onTouchStart, true);
    document.removeEventListener('touchmove', this.onTouchMove, true);
    const container = document.getElementById('globe');
    container?.removeEventListener('mousedown', this.onMouseDown);
    container?.removeEventListener('mouseup', this.onMouseUp);
    container?.removeEventListener('mousemove', this.onMouseMove);
    container?.removeEventListener('touchstart', this.onTouchStart);
    container?.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('touchmove', this.onTouchMove);
    container?.removeEventListener('touchcancel', this.onTouchEnd);
    container?.removeEventListener('mouseleave', this.onMouseUp);
  }

  ngOnInit(): void {

    this.renderWords('globe');
    this.performRotation();

    this.courseList.push({courseName: 'Data Structures and Algorithms', grade: 100});
    this.courseList.push({courseName: 'Artificial Intelligence 1', grade: 97});
    this.courseList.push({courseName: 'Intro to Machine Learning', grade: 96});
    this.courseList.push({courseName: 'Computer Graphics', grade: 100});
    this.courseList.push({courseName: 'Software Engineering Design 2', grade: 100});
    this.courseList.push({courseName: 'Intro to Programming', grade: 100});
    this.courseList.push({courseName: 'Discrete Math', grade: 96});
    this.courseList.push({courseName: 'HCI Design', grade: 99});
    this.courseList.push({courseName: 'Digital Logic Systems', grade: 97});
    this.courseList.push({courseName: 'Scripting', grade: 97});
    this.courseList.push({courseName: 'Software Design', grade: 95});
    this.courseList.push({courseName: 'Software Construction', grade: 95});
    this.courseList.push({courseName: 'Networking', grade: 97});
    this.courseList.push({courseName: 'Database Management Systems', grade: 95});
    this.courseList.push({courseName: 'Operating Systems', grade: 93});
    this.courseList.push({courseName: 'Intro to Electrical Engineering', grade: 100});
    this.courseList.push({courseName: 'Microprocessors and Microcomputers', grade: 94});
    this.courseList.push({courseName: 'Web Technologies', grade: 93});
    this.courseList.push({courseName: 'Software Requirements and Analysis', grade: 97});
    this.courseList.push({courseName: 'Software Project and Process Management', grade: 91});
    this.courseList.push({courseName: 'Information Security', grade: 91});
    this.courseList.push({courseName: 'Engineering Ethics', grade: 91});
    this.courseList.push({courseName: 'Theoretical Foundations of Software Engineering', grade: 91});
    this.selectedItem = this.courseList[0]; // Default selection

    this.workList.push({
      company: 'Optimy', logo: './assets/images/optimy.png', roles: [{
          role: 'Junior AI Engineer',
          period: 'April 2024 - Current',
          description: 'I work on developing AI-based systems to move data between internally networked systems. I also design user-facing AI-systems which are used by tens of thousands of users across Canada.'
      },{
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
      company: 'Western University', logo: './assets/images/western_logo_2.png', roles: [{
        role: 'Research Assistant',
        period: 'November 2023 - Present',
        description: 'In addition to being a full-time engineering student, I also work part time as a research assistance in the faculty of electrical and computer engineering. My research has covered many topics including digital twins, blockchain development, and traffic simulation. My goal is to use this knowledge to expand upon my previous award-winning research.'
      }, {
        role: 'Undergraduate Student Researcher',
        period: 'May 2023 - August 2023',
        description: 'In this summer position, I worked on researching and developing interesting new ideas for optimizing charging algorithms with electric vehicles. I received the Dean\'s Award from the University for this position and work directly with other graduate students and researchers across the globe. I integrate AI learning algorithms into my research and work with cutting-edge simulators to assist in my research project. In this position I published a paper at the 22nd International Conference on Machine Learning and Application, which won the Best Paper Award.'
      }]
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
      company: 'Western AI', logo: './assets/images/wai.jpg', roles: [{
        role: 'Senior Director of Projects',
        period: 'July 2023 - Present',
        description: 'In my role as the Senior Director of Projects at the Western AI Student Club, I have had the privilege to lead a diverse team of aspiring professionals towards achieving common goals within the field of artificial intelligence. My main responsibility is overseeing and managing the leaders of various project teams, ensuring their strategic alignment with the club\'s mission and vision, while fostering a culture of innovation and teamwork. I continually keep a pulse on all projects, safeguarding their timely execution and quality output.'}]
    });
    this.workList.push({
      company: 'Kognitive Sales Solutions', logo: './assets/images/kss.png', roles: [{
        role: 'Field Support Technician',
        period: 'October 2018 - September 2021',
        description: 'I reported directly to the Director of Operations for the company and helped to support the sales representatives at the company with any technical issues they had. I also helped to build and send reports to the company\'s various clients. I gained lots of experience in this role and learned much about the technology used in many modern businesses.'
      }, {
        role: 'Inventory Analyst Support',
        period: 'October 2019 - June 2021',
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
    this.wordDictionary['NumPy'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Cplex'] = this.randomSpherePoint(0.5);
    this.wordDictionary['MATLAB'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Swift'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Selenium'] = this.randomSpherePoint(0.5);
    this.wordDictionary['React'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Scikit Learn'] = this.randomSpherePoint(0.5);
    this.wordDictionary['OpenGL'] = this.randomSpherePoint(0.5);
    this.wordDictionary['GLSL'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Kubernetes'] = this.randomSpherePoint(0.5);
    this.wordDictionary['Docker'] = this.randomSpherePoint(0.5);

    this.intervalID = setInterval(() => {
      if (!this.mouseDragging) {
        this.rotateAllPoints({x: -0.2, y: 0.2, z: 0.1});
      }
    }, 10);

    const container = document.getElementById('globe');
    container?.addEventListener('mousedown', this.onMouseDown);
    container?.addEventListener('mousemove', this.onMouseMove);
    container?.addEventListener('mouseleave', this.onMouseUp);
    container?.addEventListener('touchstart', this.onTouchStart);
    container?.addEventListener('touchend', this.onTouchEnd);
    container?.addEventListener('touchmove', this.onTouchMove);
    container?.addEventListener('touchcancel', this.onTouchEnd);
    window.addEventListener('mouseup', () => this.onMouseUp());
    window.addEventListener('touchend', () => this.onTouchEnd());

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

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:mouseup', ['$event'])
  mouseEvent(event: MouseEvent) {
    if (event.type === 'mouseup') {
      this.endDrag(event);
    } else if (event.type === 'mousemove') {
      this.drag(event);
    }
  }

  startDrag(event: TouchEvent | MouseEvent) {
    event.preventDefault();
    this.dragging = true;
    const carouselItem = document.querySelector('.carousel-item');
    this.itemWidth = carouselItem ? carouselItem.getBoundingClientRect().width : 0;
    this.totalMovement = 0;
    if (event instanceof TouchEvent) {
      this.touchStartX = event.touches[0].clientX;
    } else {
      this.mouseStartX = (event as MouseEvent).clientX;
    }
  }

  drag(event: TouchEvent | MouseEvent) {
    if (!this.dragging || this.itemWidth === 0) {
      return;
    }

    window.requestAnimationFrame(() => {
      let dragDistance = 0;
      if (event instanceof TouchEvent) {
        dragDistance = event.touches[0].clientX - this.touchStartX;
        this.touchStartX = event.touches[0].clientX;
      } else {
        dragDistance = (event as MouseEvent).clientX - this.mouseStartX;
        this.mouseStartX = (event as MouseEvent).clientX;
      }
      this.dragOffset += dragDistance;

      const carouselContent = document.querySelector('.carousel-content') as HTMLElement;
      const transformValue = carouselContent.style.transform;

      // This will adjust the translateX value as per the dragOffset
      if (transformValue) {
        let newTransformValue = transformValue.replace(/translate3d\(.*?\)/, `translate3d(${this.dragOffset}px, 0, 0)`);
        carouselContent.style.transform = newTransformValue;
      }
    });
  }

  endDrag(event: TouchEvent | MouseEvent) {
    this.dragging = false;
    const index = this.courseList.indexOf(this.selectedItem);

    let movement = Math.round(this.dragOffset / this.itemWidth);
    if (Math.abs(movement) > 0) {
      let newIndex = index - movement;
      newIndex = Math.max(0, Math.min(this.courseList.length - 1, newIndex));
      this.selectedItem = this.courseList[newIndex];
    }

    this.dragOffset = 0;

    const carouselContent = document.querySelector('.carousel-content') as HTMLElement;
    if (carouselContent) {
      carouselContent.style.transform = this.getTransform();
    }
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
    let offset = this.dragging ? this.dragOffset : 0;

    if (index == this.courseList.length - 1) {
      document.querySelector('.arrow-right')?.setAttribute('disabled', 'true');
    } else if (index == 0) {
      document.querySelector('.arrow-left')?.setAttribute('disabled', 'true');
    } else {
      document.querySelector('.arrow-right')?.removeAttribute('disabled');
      document.querySelector('.arrow-left')?.removeAttribute('disabled');
    }

    if (index < this.courseList.length - (mobile ? 0 : 1)) {
      return `translate3d(calc(${offset}px - ${(index - (mobile ? 0 : 1)) * (!mobile ? 33 : 85)}% - ${(index) * 24}px ${mobile ? '+ 7.5%' : ''}), 0, 0)`;
    }
    else {
      return `translate3d(calc(${offset}px - ${(index - (mobile ? 0 : 1)) * (!mobile ? 33 : 85)}% - ${(index - 1) * 24}px ${mobile ? '+ 7.5%' : ''}), 0, 0)`;
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
    if (!this.mouseDragging || !this.isMouseOnSphere(event)) {
      return;
    }

    const dx = event.clientX - this.lastMousePos.x;
    const dy = event.clientY - this.lastMousePos.y;

    this.velocity.x = -dy * 0.5;
    this.velocity.y = dx * 0.5;

    this.lastMousePos = {x: event.clientX, y: event.clientY};
  }

  onTouchStart(event: TouchEvent): void {
    event.preventDefault(); // Disable default touch behavior, including scrolling

    if (this.mouseDragging === true) return;

    if (this.isTouchOnSphere(event.touches[0])) {
      this.mouseDragging = true;
      this.lastMousePos = {x: event.touches[0].clientX, y: event.touches[0].clientY};
    }
  }


  onTouchEnd(): void {

    if (this.mouseDragging == false) return;

    this.mouseDragging = false;
  }

  onTouchMove(event: TouchEvent): void {

    if (!this.mouseDragging || !this.isTouchOnSphere(event.touches[0])) {
      return;
    }

    if (this.mouseDragging) {
      event.preventDefault();
      const dx = event.touches[0].clientX - this.lastMousePos.x;
      const dy = event.touches[0].clientY - this.lastMousePos.y;

      this.velocity.x = -dy * 0.5;
      this.velocity.y = dx * 0.5;

      this.lastMousePos = {x: event.touches[0].clientX, y: event.touches[0].clientY};
    }
  }

  isTouchOnSphere(touch: Touch): boolean {
    const sphereElement = document.getElementById('globe');
    const rect = sphereElement?.getBoundingClientRect();

    if (!rect) {
      return false;
    }

    return touch.clientX >= rect.left && touch.clientX <= rect.right &&
      touch.clientY >= rect.top && touch.clientY <= rect.bottom;
  }

  isMouseOnSphere(event: MouseEvent): boolean {
    const sphereElement = document.getElementById('globe');
    const rect = sphereElement?.getBoundingClientRect();

    if (!rect) {
      return false;
    }

    return event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top && event.clientY <= rect.bottom;
  }

  performRotation(): void {
    if (Math.abs(this.velocity.x) > 0.01 || Math.abs(this.velocity.y) > 0.01) {
      this.rotateAllPoints({x: this.velocity.x, y: this.velocity.y, z: 0});

      // Apply friction
      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;
    }

    // Request next frame
    requestAnimationFrame(() => this.performRotation());
  }

  renderWords(containerId: string): void {
    // Get the container where words will be rendered
    const container = document.getElementById(containerId);

    const fragment = document.createDocumentFragment();

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
      fragment.appendChild(span);
    }
    container.appendChild(fragment);
  }

  rotateAllPoints(rotation: {x: number, y: number, z: number}) {
    for (const word in this.wordDictionary) {
      const point = this.wordDictionary[word] || {x: 0, y: 0, z: 0};
      const newPoint = this.rotatePoint(point, rotation);
      this.wordDictionary[word] = newPoint;
    }
    window.requestAnimationFrame(() => this.renderWords('globe'));
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
    const sinRx = sin(rotation.x * (Math.PI / 180));
    const cosRx = cos(rotation.x * (Math.PI / 180));
    const sinRy = sin(rotation.y * (Math.PI / 180));
    const cosRy = cos(rotation.y * (Math.PI / 180));
    const sinRz = sin(rotation.z * (Math.PI / 180));
    const cosRz = cos(rotation.z * (Math.PI / 180));

    // Rotation around x-axis
    const newX = point.x;
    const newY = point.y * cosRx - point.z * sinRx;
    const newZ = point.y * sinRx + point.z * cosRx;

    // Rotation around y-axis
    const newX2 = newZ * sinRy + newX * cosRy;
    const newY2 = newY;
    const newZ2 = newZ * cosRy - newX * sinRy;

    // Rotation around z-axis
    const newX3 = newX2 * cosRz - newY2 * sinRz;
    const newY3 = newX2 * sinRz + newY2 * cosRz;
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
