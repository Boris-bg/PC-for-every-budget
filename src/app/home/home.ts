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
    'img_slider/image1.png',
    'img_slider/image2.png',
    'img_slider/image3.png',
    'img_slider/image4.png',
    'img_slider/image5.png'
  ];
  responsiveOptions: CarouselResponsiveOptions[] | undefined;
}
