import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuotesService } from '../quotes.service';
import { DetailsComponent } from '../details/details.component';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-quotes-table',
  templateUrl: './quotes-table.component.html',
  styleUrls: ['./quotes-table.component.css']
})
export class QuotesTableComponent implements OnInit {
  quotes: { id: number; text: string; author: string }[] = [];
  favoriteQuotes: { id: number; text: string; author: string }[] = [];
  displayedColumns: string[] = ['text', 'author', 'actions'];

  constructor(
    private quotesService: QuotesService,
    public dialog: MatDialog,
    private storage: Storage
  ) {}

  async ngOnInit(): Promise<void> {
    await this.storage.create();
    this.loadQuotes();
    await this.loadFavoriteQuotes();
  }

  loadQuotes(): void {
    this.quotesService.getQuotes().subscribe(
      (data: any) => {
        this.quotes = data.quotes.slice(0, 10).map((quote: any) => ({
          id: quote.id,
          text: quote.quote,
          author: quote.author || 'Unknown',
        }));
      },
      (error) => {
        console.error('Помилка при завантаженні цитат', error);
      }
    );
  }

  async loadFavoriteQuotes(): Promise<void> {
    const storedQuotes = await this.storage.get('favoriteQuotes');
    if (storedQuotes) {
      this.favoriteQuotes = storedQuotes;
      console.log('Завантажено улюблені цитати з сховища:', this.favoriteQuotes);
    } else {
      console.log('Сховище порожнє');
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

  async addToFavorites(quote: { id: number; text: string; author: string }): Promise<void> {
    if (!this.favoriteQuotes.find(q => q.id === quote.id)) {
      this.favoriteQuotes.push(quote);
      await this.storage.set('favoriteQuotes', this.favoriteQuotes);
      console.log('Цитата додана до улюблених:', quote);
      console.log('Оновлений список улюблених цитат:', this.favoriteQuotes);
    } else {
      console.log('Цитата вже є в улюблених');
    }
  }

  async removeFromFavorites(quote: { id: number; text: string; author: string }): Promise<void> {
    this.favoriteQuotes = this.favoriteQuotes.filter(q => q.id !== quote.id);
    await this.storage.set('favoriteQuotes', this.favoriteQuotes);
    console.log('Цитата видалена з улюблених:', quote);
  }
}
