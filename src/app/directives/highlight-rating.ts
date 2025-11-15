import { Directive, ElementRef, Input, OnInit } from '@angular/core';

// REQUISITO 6: Diretiva PERSONALIZADA - Destaca avaliação com cores
@Directive({
  selector: '[appHighlightRating]',
  standalone: true
})
export class HighlightRatingDirective implements OnInit {
  @Input() appHighlightRating: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const rating = this.appHighlightRating;
    
    // Define cor baseada na nota
    let color = '';
    if (rating >= 8) {
      color = '#10b981'; // Verde para filmes excelentes
    } else if (rating >= 6) {
      color = '#fbbf24'; // Amarelo para filmes bons
    } else {
      color = '#ef4444'; // Vermelho para filmes ruins
    }

    // Aplica estilo no elemento
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = 'white';
    this.el.nativeElement.style.fontWeight = 'bold';
    this.el.nativeElement.style.padding = '0.25rem 0.5rem';
    this.el.nativeElement.style.borderRadius = '0.375rem';
  }
}