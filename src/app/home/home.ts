import {Component} from '@angular/core';
import {Carousel, CarouselModule, CarouselResponsiveOptions} from 'primeng/carousel';

@Component({
  selector: 'app-home',
  imports: [
    Carousel,
    CarouselModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  images = [
    'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg'
  ];
  responsiveOptions: CarouselResponsiveOptions[] | undefined;
}
