import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { AutoFullHeightDirective } from './auto-full-height.directive';
import { CenterButtonVerticalDirective } from './center-button-vertical.directive';
import { OpenSidebarDirective } from './open-sidebar.directive';
import { PathfindingPaneComponent } from './pathfinding-pane/pathfinding-pane.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CenterHorizontalDirective } from './center-horizontal.directive';
import { CanvasComponent } from './canvas/canvas.component';
import { BufferMarginDirective } from './buffer-margin.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideBarComponent,
    AutoFullHeightDirective,
    CenterButtonVerticalDirective,
    OpenSidebarDirective,
    PathfindingPaneComponent,
    CenterHorizontalDirective,
    CanvasComponent,
    BufferMarginDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatRadioModule,
    MatButtonToggleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "rounded-square",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/square_black_24dp.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "ink-eraser",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ink_eraser_FILL0_wght0_GRAD0_opszNaN.svg")
    );
  }
}