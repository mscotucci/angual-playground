import { Injectable, signal } from '@angular/core';
import { MenuItem } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuItemsSignal = signal<MenuItem[]>([]);

  getMenuItems() {
    return this.menuItemsSignal.asReadonly();
  }

  setMenuItems(items: MenuItem[]) {
    this.menuItemsSignal.set(items);
  }

  addMenuItem(item: MenuItem) {
    this.menuItemsSignal.update((items) => [...items, item]);
  }

  removeMenuItem(id: string) {
    this.menuItemsSignal.update((items) =>
      items.filter((item) => item.id !== id)
    );
  }

  updateMenuItem(id: string, updatedItem: Partial<MenuItem>) {
    this.menuItemsSignal.update((items) =>
      items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  }
}
