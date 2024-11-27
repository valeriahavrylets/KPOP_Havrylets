import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favoriteQuotes';

  constructor(private storage: Storage) {
    this.storage.create();
  }

  async getFavorites(): Promise<{ id: number; text: string; author: string }[]> {
    return (await this.storage.get(this.storageKey)) || [];
  }

  async addFavorite(quote: { id: number; text: string; author: string }): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.some(q => q.id === quote.id)) {
      favorites.push(quote);
      await this.storage.set(this.storageKey, favorites);
    }
  }

  async removeFavorite(quoteId: number): Promise<void> {
    let favorites = await this.getFavorites();
    favorites = favorites.filter(q => q.id !== quoteId);
    await this.storage.set(this.storageKey, favorites);
  }
}
