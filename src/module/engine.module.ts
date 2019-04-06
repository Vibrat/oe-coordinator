import { NgModule } from "@angular/core";
import { AttributeDragDirective } from "./class/drag.directive";
import { ZoomDirective } from "./class/zoom.directive";

@NgModule({
    declarations: [ AttributeDragDirective, ZoomDirective ],
    exports: [ AttributeDragDirective, ZoomDirective ]
})
export class EngineModule {}