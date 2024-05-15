import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit, OnDestroy {
  topRatedArray: {
    title: string;
    vote_average: string;
    poster_path: string;
  }[] = [];



  array: {
    title?: string;
    vote_average?: string;
    poster_path: string;
    id?: number;
    name?: string;
  }[] = [];
  
  currentPage: number = 1;

  selectedCategory: string = 'movies';
  private categorySubscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.selectedCategory = this.dataService.getDataFromLocalStorage('selectedCategory')

    this.categorySubscription = this.dataService.selectedCategory$.subscribe(
      (category) => {
        if(category != '') {          
          this.selectedCategory = category;
          this.dataService.saveDataToLocalStorage(this.selectedCategory, 'selectedCategory')
        }
        console.log({ component: 'catalog', category });
        switch (this.selectedCategory) {
          case 'upcoming':
            this.apiService.fetchUpcomingMovies(this.currentPage).subscribe(
              (response) => {
                this.array = response.results;
                console.log(this.array);

              },
              (error) => {
                console.error(error);
              }
            );
            break;
          case 'watchlist':
            this.array = this.dataService.watchListArray;
            break;
          case 'topRated':
            this.apiService.fetchTopRatedMovies().subscribe(
              (response) => {
                this.array = response.results;
                console.log(this.array);
              },
              (error) => {
                console.error(error);
              }
            );
            break;
          case 'movies':
            this.apiService.fetchTrendingMovies().subscribe(
              (response) => {
                this.array = response.results;
                console.log(this.array);
              },
              (error) => {
                console.error(error);
              }
            );
            break;
          case 'tvShows':
            this.apiService.fetchTrendingTV().subscribe(
              (response) => {
                this.array = response.results;
                console.log(this.array);
              },
              (error) => {
                console.error(error);
              }
            );
            break;
        }
      }
    );
  }

  clickOnCard(card: any) {
    this.dataService.detailInfo = card;
    this.dataService.setSelectedMovie(card);
  }

  loadMovies(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    this.categorySubscription = this.apiService
      .fetchUpcomingMovies(this.currentPage)
      .subscribe(
        (response) => {
          this.array = response.results;
        },
        (error) => {
          console.error('Error loading movies:', error);
        }
      );
  }
  clickOnNextCard() {
    this.currentPage++;
    console.log('Переходим на страницу' + this.currentPage);
    this.loadMovies();
  }

  clickOnPrevCard() {
    this.currentPage--;
    console.log('Переходим на страницу' + this.currentPage);
    this.loadMovies();
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.currentPage = 1;
  }
}
