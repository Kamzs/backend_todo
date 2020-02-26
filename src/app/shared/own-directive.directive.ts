import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appOwnDirective]'
})
export class OwnDirectiveDirective implements OnInit{

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    let ul = this.elementRef.nativeElement;
    //this.renderer.setStyle(ul, 'list-style-image','url(/assets/directive.png)');
    this.renderer.setStyle(ul, 'background','white');
  }

}
