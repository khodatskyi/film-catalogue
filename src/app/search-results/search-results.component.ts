import { Component, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnDestroy {
  searchMovies: { title: string; release_date: string; poster_path: string }[] =
    [];
  private subscription: Subscription;

  constructor(
    private dataService: DataService,
  ) {

    this.subscription = this.dataService.searchTerm$.subscribe(
      (data) => {
        this.searchMovies = data.results
      }
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  clickOnCard(card: any) {
    console.log(card);
    this.dataService.detailInfo = card;
  }
}
