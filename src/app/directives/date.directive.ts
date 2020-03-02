import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  @Input()
  date: string;
  paragraph;

  constructor(private elementRef: ElementRef, private  renderer: Renderer2) {
    this.paragraph = this.renderer.createElement('p');
  }

  @HostListener('mouseenter')
  mouseenter(eventDate: Event){

  //
    this.paragraph.innerHTML = new Date (this.date).toLocaleString();
    this.renderer.appendChild(this.elementRef.nativeElement,this.paragraph);
  }
  @HostListener('mouseleave')
  mouseleave(eventDate: Event){
    this.renderer.removeChild(this.elementRef.nativeElement,this.paragraph);
  }
}
