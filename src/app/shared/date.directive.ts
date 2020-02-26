import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  @Input()
  private date: Date;
  private paragraph;

  constructor(private elementRef: ElementRef, private  renderer: Renderer2) {
    this.paragraph = this.renderer.createElement('p');
  }

  @HostListener('mouseenter')
  mouseenter(eventDate: Event){
    this.paragraph.innerHTML = this.date.toLocaleDateString();
    this.renderer.appendChild(this.elementRef.nativeElement,this.paragraph);
  }
  @HostListener('mouseleave')
  mouseleave(eventDate: Event){
    this.renderer.removeChild(this.elementRef.nativeElement,this.paragraph);
  }
}
