import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteQuotes: { id: number; text: string; author: string }[] = [];
  displayedColumns: string[] = ['text', 'author', 'actions'];

  constructor(private storage: Storage, public dialog: MatDialog) {}

  async ngOnInit() {
    await this.storage.create();
    const storedQuotes = await this.storage.get('favoriteQuotes');
    if (storedQuotes) {
      this.favoriteQuotes = storedQuotes;
      console.log('Завантажено улюблені цитати з сховища в FavoritesComponent:', this.favoriteQuotes);
    }
  }

  async loadFavorites() {
    const storedQuotes = await this.storage.get('favoriteQuotes');
    if (storedQuotes) {
      this.favoriteQuotes = storedQuotes;
    }
  }

  showDetails(quote: { id: number; text: string; author: string }): void {
    this.dialog.open(DetailsComponent, {
      data: {
        id: quote.id,
        text: quote.text,
        author: quote.author
      }
    });
  }

  async setFavorites(quote: { id: number; text: string; author: string }) {
    if (!this.favoriteQuotes.find(q => q.id === quote.id)) {
      this.favoriteQuotes.push(quote);
      await this.storage.set('favoriteQuotes', this.favoriteQuotes);
      await this.loadFavorites();
    }
  }

  async removeFromFavorites(quote: { id: number; text: string; author: string }) {
    this.favoriteQuotes = this.favoriteQuotes.filter(q => q.id !== quote.id);
    await this.storage.set('favoriteQuotes', this.favoriteQuotes);
    await this.loadFavorites();
  }
}
