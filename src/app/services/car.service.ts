import { Injectable, signal, computed } from '@angular/core';
import { CarBuild, CarCategory } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carsSignal = signal<CarBuild[]>([]);
  public readonly cars = this.carsSignal.asReadonly();

  public readonly activeCategory = signal<CarCategory>('all');
  public readonly searchQuery = signal<string>('');
  public readonly selectedCar = signal<CarBuild | null>(null);

  public readonly filteredCars = computed(() => {
    const list = this.carsSignal();
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return list.filter(car => {
      const matchesCategory = cat === 'all' || car.category === cat;
      const matchesQuery = !query || 
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.recommendedEngine.toLowerCase().includes(query) ||
        car.typeLabel.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  });

  constructor() {
    this.loadCars();
  }

  public async loadCars(): Promise<void> {
    try {
      const res = await fetch('data/cars.json');
      if (res.ok) {
        const data: CarBuild[] = await res.json();
        this.carsSignal.set(data);
      } else {
        console.warn('Could not load data/cars.json, using built-in cars fallback.');
      }
    } catch (e) {
      console.error('Error fetching cars:', e);
    }
  }

  public setCategory(cat: CarCategory): void {
    this.activeCategory.set(cat);
  }

  public setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  public openModal(car: CarBuild): void {
    this.selectedCar.set(car);
  }

  public closeModal(): void {
    this.selectedCar.set(null);
  }
}
