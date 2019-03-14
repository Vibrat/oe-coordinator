export declare namespace Public {
  export interface CoordinateComponentInterface {
    constructor(): void;
    Coordinate: Coordinate;
  }

  export interface Coordinate {
    clientWidth: number;
    clientHeight: number;
    width: number;
    height: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
  }

  export interface OnBorder {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  }
  export type isDrag = boolean;
  export type Variation = number;
}
