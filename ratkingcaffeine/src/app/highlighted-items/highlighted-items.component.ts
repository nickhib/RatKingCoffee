import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Cards {
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-highlighted-items',
  imports: [CommonModule,],
  templateUrl: './highlighted-items.component.html',
  styleUrl: './highlighted-items.component.css'
})
export class HighlightedItemsComponent {
  currentIndex = 0;
  cards: Cards[] = [
{
      title: "Ethiopian Sunrise",
      description: "A vibrant, fruity coffee with floral notes, perfect for a refreshing morning boost...",
      imageUrl: "assets/image3.jpg"
},
{
      title: "Colombian Dark Roast",
      description: "Rich and bold, this full-bodied brew is ideal for espresso lovers and afternoon pick-me-ups...",
      imageUrl: "assets/image3.jpg"
},
{
      title: "Colombian Dark Roast",
      description: "Rich and bold, this full-bodied brew is ideal for espresso lovers and afternoon pick-me-ups...",
      imageUrl: "assets/image3.jpg"
},
{
      title: "Colombian Dark Roast",
      description: "Rich and bold, this full-bodied brew is ideal for espresso lovers and afternoon pick-me-ups...",
      imageUrl: "assets/image3.jpg"
},
{
      title: "Colombian Dark Roast",
      description: "Rich and bold, this full-bodied brew is ideal for espresso lovers and afternoon pick-me-ups...",
      imageUrl: "assets/image3.jpg"
},
];

}
