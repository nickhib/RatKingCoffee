import { Component , ChangeDetectionStrategy,OnInit, OnDestroy,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { timer, Subscription } from 'rxjs';

interface Slides {
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-slideshow',
  imports: 
  [
    CommonModule,

  ],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css',
  changeDetection: ChangeDetectionStrategy.Default //helps optimize performance. only checks components in the chance of a event
})
export class SlideshowComponent implements OnInit, OnDestroy {
  constructor(private cdRef: ChangeDetectorRef) {}
slides: Slides[] = [
{
      title: "Ethiopian Sunrise Blend: 95%",
      description: "A vibrant, fruity coffee with floral notes, perfect for a refreshing morning boost...",
      imageUrl: "assets/image1.jpg"
},
{
      title: "Colombian Dark Roast: 88%",
      description: "Rich and bold, this full-bodied brew is ideal for espresso lovers and afternoon pick-me-ups...",
      imageUrl: "assets/image2.jpg"
},
];
currentIndex = 0;
autoPlay: any;
autoPlaySub!: Subscription;
nextSlide() {//this should change the slide.
  this.currentIndex= (this.currentIndex+1)% this.slides.length;
  console.log("current index", this.currentIndex);
  //this.cdRef.markForCheck();
}
prevSlide() {
  //if current slide = 1. total slides 4
  //1-1 = (0 + 4) % 4 = 0 so from 1 we will go to 0
  this.currentIndex =((this.currentIndex-1) + this.slides.length) % this.slides.length;
}
skipToSlide(indexnumber: number)
{
  this.currentIndex = indexnumber;
  console.log("current index", this.currentIndex);
 // this.cdRef.markForCheck();
}
ngOnInit(){
  this.autoPlay = setInterval(() => {
      this.nextSlide();
    }, 10000);
}
ngOnDestroy(){//memory clean ups
  clearInterval(this.autoPlay);
}
}
