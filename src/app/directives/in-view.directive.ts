import { Directive, Output, EventEmitter, AfterViewInit, ElementRef } from "@angular/core";

@Directive({ selector: '[appInView]', standalone: true })
export class InViewDirective implements AfterViewInit {
  @Output() inView = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        this.inView.emit();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(this.el.nativeElement);
  }
}