import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-about-person',
  templateUrl: './details-about-person.component.html',
  styleUrl: './details-about-person.component.scss',
})
export class DetailsAboutPersonComponent implements OnInit {
  infoAboutPersonMovies: {
    title?: string;
    vote_average?: string;
    poster_path: string;
    id?: number;
    name?: string;
  }[] = [];

  infoAboutPerson: {
    profile_path?: string;
    biography?: string;
    birthday?: string;
    name?: string;
    place_of_birth?: string;
  } = {};

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private location: Location
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.apiService
      .fetchDetailsAboutPerson(this.dataService.detailInfoAboutPersonId)
      .subscribe(
        (response) => {
          this.infoAboutPerson = response;
          console.log(this.infoAboutPerson, 'компонент CelebritiesComponent');
        },
        (error) => {
          console.error(error);
        }
      );

    this.apiService
      .fetchAllMovieForPerson(this.dataService.detailInfoAboutPersonId)
      .subscribe(
        (response) => {
          response.cast.sort((a: any, b: any) => b.popularity - a.popularity);
          this.infoAboutPersonMovies = response.cast;
          console.log(
            this.infoAboutPersonMovies,
            'компонент CelebritiesComponent'
          );
        },
        (error) => {
          console.error(error);
        }
      );
  }

  clickOnCard(card: any) {
    this.dataService.detailInfo = card;
    this.dataService.setSelectedMovie(card);
  }

  goBack(): void {
    this.location.back();
  }
}
