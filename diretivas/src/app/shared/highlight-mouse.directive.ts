import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {
  @HostListener('mouseenter') onMouseOver() {
    // this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'yellow')
    this.backgroundColor = 'red'
  }
  @HostListener('mouseleave') onMouseLeave() {
    // this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'white')
    this.backgroundColor = 'black';
  }
  @HostBinding('style.backgroundColor') backgroundColor!: string
  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
  }

}
