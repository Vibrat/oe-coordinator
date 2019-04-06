import { Directive, HostListener, ElementRef, Renderer2, Input } from "@angular/core";

/**
 * Directive for Zoom Effect
 * 
 * @example:
 *  `<div zoom-editor maxScale='4' minScale='0.5' accumulativeVal='0.1'></div>`
 */
@Directive({
  selector: "[zoom-editor]"
})
export class ZoomDirective {
  @Input() maxScale = 3;
  @Input() minScale = 0.5;
  @Input() accumulativeVal = 0.1;
  @Input() currentScale = 1;

  constructor(public _ref: ElementRef, public renderer: Renderer2) {}

  @HostListener("wheel", ["$event"])
  onwheel(event) {
    if (event.ctrlKey) {
      // Support older version of IE
      let handler = window.event || event;
      handler.preventDefault();
      handler.wheelDelta > 0 && this.currentScale <= this.maxScale
        ? (this.currentScale += this.accumulativeVal)
        : handler.wheelDelta < 0 && this.currentScale >= this.minScale
        ? (this.currentScale -= this.accumulativeVal)
        : "";

      this.renderer.setStyle(
        this._ref.nativeElement,
        "transform",
        `scale(${this.currentScale})`
      );
    }
  }
}
