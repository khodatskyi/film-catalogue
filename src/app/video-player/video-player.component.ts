import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent implements OnDestroy, OnInit {

  // showModal: boolean = false;
  // trailerUrl: string = 'https://www.youtube.com/embed/wYmtRhKvmVE';

  isDestroyed: boolean = false;
  zIndex: boolean = false;

  @ViewChild('playerContainer') playerContainer!: ElementRef;

  constructor(
    private location: Location,
    private dataService: DataService
  ) {}

  url: any = null;

  ngOnInit(): void {
    // Получаем параметр из маршрута
    console.log(this.dataService.filmUrl);
    this.url = 'https://www.youtube.com/embed/' + this.dataService.filmUrl;
    console.log(this.url);
    this.renderIframeWithDelay();

  }

  renderIframeWithDelay(): void {
    // Это надо для того чтобы ДОМ элемент не формировался раньше того как мы получим информацию про фильм
    setTimeout(() => {
      this.renderIframe();
    }, 1000); 
  }

  renderIframe(): void {
    if (this.url) {
      const iframe = document.createElement('iframe');
      iframe.src = this.url;
      iframe.title = 'YouTube video player';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.width = 1500 + 'px'
      iframe.style.height = 850 + 'px'
      this.playerContainer.nativeElement.appendChild(iframe);
    }
  }

  goBack(): void {
    this.location.back();
    this.isDestroyed = true;
    this.zIndex = true;
  }

  ngOnDestroy(): void {}
}
