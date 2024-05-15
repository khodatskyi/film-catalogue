import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDg5NzhkMmMxZjhmZDAyMDc4MTdmM2U3YmVlMjIyMiIsInN1YiI6IjY1OTU1ZmU0MzI2ZWMxNGQ3YTA2YzFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ptoyl4LL0hLDU2thDKmm-iejtjdUdIvXRMPjB-ICKME';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.apiKey}`,
  });

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    const url = `${this.apiUrl}/trending/movie/day?language=en-US`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchTopRatedTVShows() {
    const url =
      'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchPhoto(linkToPhoto: string): Observable<any> {
    const url = this.apiUrl + linkToPhoto;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchVideoTrailer(id: string, type: string) {
    const url = `${this.apiUrl}/${type}/${id}/videos?language=en-US`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchTopRatedMovies() {
    const url =
      'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=vote_count.desc';
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchUpcomingMovies(page: any) {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchCelebrities() {
    const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=1`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchTrendingMovies() {
    const url =
      'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
    return this.http.get<any>(url, { headers: this.headers });
  }  

  fetchTrendingTV() {
    const url = 'https://api.themoviedb.org/3/trending/tv/week?language=en-US';
    return this.http.get<any>(url, { headers: this.headers });
  }

  search(searchTerm: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchMovieDetail(id:string) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchTVDetail(id:string) {
    const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchRecommendations(type: string, id:string) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/recommendations`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchSimilar(type: string, id:string) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/similar`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchAllMovieForPerson(id:string) {
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`
    return this.http.get<any>(url, { headers: this.headers });
  }

  fetchDetailsAboutPerson(id: string) {
    const url = `https://api.themoviedb.org/3/person/${id}`
    return this.http.get<any>(url, { headers: this.headers });
  }
}
