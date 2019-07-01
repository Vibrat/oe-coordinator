import {
  Directive,
  Renderer2,
  HostListener,
  OnInit,
  ElementRef,
  Input
} from "@angular/core";
import { Subject } from "rxjs";
import { switchMap, takeUntil, repeat, tap } from "rxjs/operators";

@Directive({ selector: "[horizonDrag]" })
export class AttributeDragDirective implements OnInit {
  private _pointerDown = new Subject<MouseEvent>();
  private _pointerMove = new Subject<MouseEvent>();
  private _pointerUp = new Subject<MouseEvent>();

  private _margin: number = 0;
  private _pageX: number;
  @Input() min: number;
  @Input() max: number;

  constructor(private renderer: Renderer2, private _ref: ElementRef) {}

  @HostListener("mousedown", ["$event"])
  onPointerDown(event: MouseEvent) {
    event.preventDefault();
    this._pointerDown.next(event);
  }

  @HostListener("document:mousemove", ["$event"])
  onPointerMove(event: MouseEvent) {
    this._pointerMove.next(event);
  }

  @HostListener("document:mouseup", ["$event"])
  onPointerUp(event: MouseEvent) {
    this._pointerUp.next(event);
  }

  ngOnInit() {
    this._pointerDown
      .asObservable()
      .pipe(
        tap(function(event: MouseEvent) {
          this._pageX = event.pageX - this._margin;
        }),
        switchMap(function () { return this._pointerMove}),
        tap(function(event: MouseEvent) {
          this._margin = event.pageX - this._pageX;
          this.renderer.setStyle(
            this._ref.nativeElement,
            "margin-left",
            `${this._cutEdgeValue()}px`
          );
        }),
        takeUntil(this._pointerUp),
        repeat()
      )
      .subscribe();
  }

  private _cutEdgeValue(): number {
    let result = this._margin;
    
    if (this.min && this._margin < this.min) {
      result = this.min;
    }

    if (this.max && this._margin > this.max) {
      result = this.max;
    }

    return result;
  }
}
