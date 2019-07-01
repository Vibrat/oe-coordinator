import { PublicInterface } from "../model";
import { DEFAULT } from "../config";
import { ClickEvent } from "./utilities/click.component";
import { ClassEvent } from "./utilities/class.component";

export namespace PublicAPI {

  export var ClassBehavior = ClassEvent;
  export var ClickBehavior = ClickEvent;
  export class CoordinateComponent {
    private _element: HTMLElement;
    private _coordinates: PublicInterface.Coordinate;
    private _onBorder: PublicInterface.OnBorder;
    private _isDrag: PublicInterface.isDrag;
    private _variation: PublicInterface.Variation = DEFAULT.variation; // variation to detect on border

    constructor(public element: HTMLElement) {
      this._element = element;
      this.setCoordinates();
      this.addListener("mousemove");
      this.addListener("mousedown");
      this.addListener("mouseup");
      this.detectMouseUpOutSide();
    }

    /**
     * Return coordinates
     */
    public getCoordinates(): PublicInterface.Coordinate {
      return this._coordinates;
    }

    /**
     * Detect when module is on border of element
     */
    public onBorder(): PublicInterface.OnBorder {
      return this._onBorder;
    }

    /**
     * Detect hen drag starts
     */
    public onDragStart(): PublicInterface.isDrag {
      return this._isDrag;
    }

    /**
     * addEventListener to detect when on border
     *
     * @param name 'mousedown' | 'mouseup' | 'mouseover'
     */
    public addListener(name: string): void {
      this._element.addEventListener(name, (mouse: MouseEvent) => {
        this.detectOnborder(mouse);
        this.detectOnDragStart(name, mouse);
      });
    }

    /**
     * Set variation to detect mouse on border
     *
     * @param value
     */
    public setVariation(value: number): void {
      this._variation = value;
    }

    /**
     * calculate current coordinate of HTMlelement
     *
     * @param element
     */
    private setCoordinates(): PublicInterface.Coordinate {
      return (this._coordinates = Object.assign(
        this.element.getBoundingClientRect(),
        {
          clientWidth: this.element.clientWidth,
          clientHeight: this.element.clientHeight
        }
      ));
    }

    /**
     * Private method to assign drag start
     *
     * @param name
     * @param mouse
     */
    private detectOnDragStart(name: string, mouse: MouseEvent) {
      if (
        Object.values(this._onBorder).indexOf(true) != -1 &&
        ["mousedown"].includes(name)
      ) {
        this._isDrag = true;
      } else if (this._isDrag && ["mousedown", "mousemove"].includes(name)) {
        this._isDrag = true;
      } else {
        this._isDrag = false;
      }
    }

    /**
     * detect when mouse click is on border
     *
     * @param mouse
     */
    private detectOnborder(mouse: MouseEvent) {
      this._onBorder = Object.assign(this._onBorder ? this._onBorder : {}, {
        left: mouse.offsetX < 0 + this._variation,
        right:
          mouse.offsetX >
          (mouse.target as HTMLElement).clientWidth - this._variation,
        top: mouse.offsetY < 0 + this._variation,
        bottom:
          mouse.offsetY >
          (mouse.target as HTMLElement).clientHeight - this._variation
      });
    }

    private detectMouseUpOutSide() {
      document.addEventListener(
        "mouseup",
        function() {
          this._isDrag = false;
        }.bind(this)
      );
    }
  }
}
