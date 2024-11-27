import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private apiUrl = 'https://dummyjson.com/quotes';
  private favoritesSubject = new BehaviorSubject<{ id: number; text: string; author: string }[]>([]);
  
  favoriteQuotes$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  async getFavoriteQuotes(storage: Storage) {
    const storedQuotes = await storage['get']('favoriteQuotes') || [];
    this.favoritesSubject.next(storedQuotes);
  }

  async addToFavorites(quote: { id: number; text: string; author: string }, storage: Storage) {
    const storedQuotes = await storage['get']('favoriteQuotes') || [];
    if (!storedQuotes.find((q: any) => q.id === quote.id)) {
      storedQuotes.push(quote);
      await storage['set']('favoriteQuotes', storedQuotes);
      this.favoritesSubject.next(storedQuotes);
    }
  }

  async removeFromFavorites(quoteId: number, storage: Storage) {
    const storedQuotes = (await storage['get']('favoriteQuotes')) || [];
    const updatedQuotes = storedQuotes.filter((q: any) => q.id !== quoteId);
    await storage['set']('favoriteQuotes', updatedQuotes);
    this.favoritesSubject.next(updatedQuotes);
  }
}
