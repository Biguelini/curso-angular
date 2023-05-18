import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[highlightDirective]'
})
export class HighlightDirectiveDirective implements OnInit {

  @HostListener('mouseenter') onMouseOver() {
    // this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'yellow')
    this.backgroundColor = this.highlightColor

  }
  @HostListener('mouseleave') onMouseLeave() {
    // this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'white')
    this.backgroundColor = this.defaultColor;
  }
  @HostBinding('style.backgroundColor') backgroundColor!: string
  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.backgroundColor = this.defaultColor
  }
  @Input() defaultColor: string = 'white'
  @Input() highlightColor: string = 'green'
}
