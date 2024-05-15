import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  @Input() popularTVSeries: any[] = []

  constructor(private dataService: DataService) {}


  clickOnCard(card: any, event: any) {
    this.dataService.detailInfo = card;
    this.dataService.setSelectedMovie(card);
    event.stopPropagation()
  }
}
