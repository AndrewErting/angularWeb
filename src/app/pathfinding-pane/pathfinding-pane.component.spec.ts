import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfindingPaneComponent } from './pathfinding-pane.component';

describe('PathfindingPaneComponent', () => {
  let component: PathfindingPaneComponent;
  let fixture: ComponentFixture<PathfindingPaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PathfindingPaneComponent]
    });
    fixture = TestBed.createComponent(PathfindingPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
