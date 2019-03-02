# Open Editor - Coordinator

This module is used to detect mouse movement on the border of HTMLElement. Useful usecase is to enable resize event in `div` element when mouse is on the border of it. 

## How to use

```
Step 1: npm install @open-e/oe-coordinator
Step 2: import package
Step 3: Setting border css property to targeted HTMLElement
```

__Example__
```javascript
import { Component, ElementRef, OnInit } from "@angular/core";
import { Observable, of } from  "rxjs";
import { PublicAPI } from "@open-e/oe-coordinator";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "border-tester";
  private _coordinateService: PublicAPI.CoordinateComponent;

  constructor(private _ref: ElementRef) {}

  ngOnInit() {
    this._coordinateService = new PublicAPI.CoordinateComponent(
      document.querySelector('.container')
    );
  }

  onBorder($event) {
    console.log("on Border", $event.target, 'onBorder', this._coordinateService.onBorder());
    console.log ("onDragStartTest", this._coordinateService.onDragStart());
  }

  onMouseOver($event) {
    console.log("on Border", $event.target, 'onBorder', this._coordinateService.onBorder());
    console.log ("onDragStartTest", this._coordinateService.onDragStart());
  }
}
```