import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  selectedCatalog: string = '';
  selectedMovie: object = {};
  detailInfoArray = [];
  imgArray: any = []
  detailInfo = {};

  filmUrl:string = ''

  detailInfoAboutPersonId: any

  private movieSubject = new Subject<any>();
  movie$ = this.movieSubject.asObservable();

  updateMovie(movie: any): void {
    this.movieSubject.next(movie);
  }
  // end detailInfo

  watchListArray: {
    poster_path: string;
    title: string;
    id: number;
    name: string;
  }[] = [];
  
  // поток для каталога с фильмами
  private selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  updateSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
    this.saveDataToLocalStorage(category, 'selectedCategory');
  }

  constructor() {}

  // поток для поиска
  private searchTermSubject = new BehaviorSubject<any>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(data: string) {
    this.searchTermSubject.next(data);
  }

// работа с выбранным фильмом
  setSelectedMovie(movie: object) {
    this.selectedMovie = movie;
    this.saveDataToLocalStorage(this.selectedMovie, 'selectedMovie');
  }

  getSelectedMovie(): object {
    const data = this.getDataFromLocalStorage('selectedMovie');
    return data;
  }

  // работа с массивом watchlist 

  setWatchlistArray(array:any) {
    this.saveDataToLocalStorage(array, 'watchlist');
  }

  getWatchlistArray() {
    const data = this.getDataFromLocalStorage('watchlist');
    return data;
  }

  // работа с локал сторедж

  saveDataToLocalStorage(data: any, key: string = 'selectedMovie') {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  getDataFromLocalStorage(key: string  = 'selectedMovie') {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      console.log('Привет из локал сторедж');
      return JSON.parse(storedData);
    }
    return null;
  }

  deleteDataFromLocalStorage(key: string = 'selectedMovie') {
    localStorage.removeItem(key);
  }
  
}

export interface DetailInfoObject {
  backdrop_path: string;
  id: number;
  media_type: string;
  overview: string;
  release_date: string;
  title: string;
  vote_average: number;
  genre_ids: [];
}
