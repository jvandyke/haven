import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[resize]' })
export class ResizeDirective implements OnInit {
  nativeElement;

  constructor(
    private renderer: Renderer2,
    private element: ElementRef
  ) {
    this.nativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.renderer.selectRootElement(this.nativeElement).focus();
    this.renderer.listen(this.nativeElement, 'input', (event) => {
      if (!this.nativeElement.value) {
        this.renderer.setStyle(this.nativeElement, 'height', '44px');
      }
      this.renderer.setStyle(event.target, 'height', event.target.scrollHeight + 'px')
    })
  }

}
