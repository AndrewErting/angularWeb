import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';

declare function openNav(): void;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  size = 56;

  openNav() {
    const elem1 = document.getElementById("pfSidenav");
    const elem2 = document.getElementById("bubble");
    if(!elem1 || !elem2) { 
      alert("Early return");
      return;
    }
    else{
      elem1.style.width = "250px";
      elem2.style.height = "0px";
      elem2.style.width = "0px";
    }
  }
  
  closeNav() {
    const elem1 = document.getElementById("pfSidenav");
    const elem2 = document.getElementById("bubble");
    if(!elem1 || !elem2) { 
      alert("Early return");
      return;
    }
    else{
      elem1.style.width = "0px";
      elem2.style.height = "56px";
      elem2.style.width = "56px";
    }
  }

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.closeNav();
  }
}
