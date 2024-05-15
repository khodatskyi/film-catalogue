import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  movie:string = ''
  movies: {title: string, name: string, backdrop_path:string, poster_path:string}[] = []
  condition: boolean = false

  constructor(
    private dataService: DataService,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentPage = this.router.url;
        if (currentPage === '/main-content' || currentPage === '/detailInfo' || currentPage === '/watchlist' || currentPage === '/video-player') {
          this.condition = true
        } else {
          this.condition = false
        }
      }
    });
  }

  length = this.dataService.watchListArray.length;

  ngOnInit(): void {
    this.length = this.dataService.getWatchlistArray().length;
    let array = this.dataService.getWatchlistArray();
    let randomFilm = Math.floor(Math.random() * array.length);


    if (array[randomFilm].media_type == 'movie') {
      console.log('movie');
      // делаем запрос на сервер и получаем похожие фильмы
      this.apiService
        .fetchRecommendations('movie', array[randomFilm].id)
        .subscribe(
          (res) => {
            if (res.results.length == 0) {
              console.log('Первый запрос неудачный, делаем повтор запроса');
              this.apiService
                .fetchSimilar('movie', array[randomFilm].id)
                .subscribe(
                  (res) => {
                    this.movies = res.results
                    console.log(this.movies);
                    this.movie = res.results[0].title
                  },
                  (error) => {
                    console.error(error);
                  }
                );
            }
            this.movies = res.results
            console.log(this.movies);
            this.movie = res.results[0].title
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      console.log('serial');
      // делаем запрос на сервер и получаем похожие сериалы
      this.apiService
        .fetchRecommendations('tv', array[randomFilm].id)
        .subscribe(
          (res) => {
            if (res.results.length == 0) {
              console.log('Первый запрос неудачный, делаем повтор запроса');
              this.apiService
                .fetchSimilar('tv', array[randomFilm].id)
                .subscribe(
                  (res) => {
                    this.movies = res.results
                    console.log(this.movies);
                    this.movie = res.results[0].name
                  },
                  (error) => {
                    console.error(error);
                  }
                );
            }
            this.movies = res.results
            console.log(this.movies);
            this.movie = res.results[1].name
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  isOnPage(pageUrl: string): boolean {
    return this.router.url === pageUrl;
  }

  clickOnCard(card: any) {
    this.dataService.detailInfo = card;
    this.dataService.setSelectedMovie(card);
    if(this.router.url === '/detailInfo') {
      window.location.reload();
    }
  }

}
