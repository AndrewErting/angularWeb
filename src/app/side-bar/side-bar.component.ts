import { Component, ElementRef, Renderer2 } from '@angular/core';

declare function openNav(): void;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  openNav() {
    const elem = document.getElementById("pfSidenav");
    if(!elem) { 
      alert("Early return");
      return;
    }
    else{
      elem.style.width = "250px";
    }
  }
  
  closeNav() {
    const elem = document.getElementById("pfSidenav");
    if(!elem) { 
      alert("Early return");
      return;
    }
    else{
      elem.style.width = "0px";
    }
  }
}
