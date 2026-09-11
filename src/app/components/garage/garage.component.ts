import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { CarBuild, CarCategory } from '../../models/car.model';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="garage" class="px-4 sm:px-8 py-12 max-w-7xl mx-auto scroll-mt-20">
      <!-- Section Header & Controls -->
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 border-b border-slate-800 pb-6">
        <div>
          <div class="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            <span>🏁</span> Tuned & Tested Garage
          </div>
          <h3 class="text-2xl sm:text-4xl font-racing font-bold text-white tracking-wide">
            PALM CITY <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">GARAGE</span>
          </h3>
          <p class="text-slate-400 text-sm mt-1">
            Click any car to reveal the exact engine swap, live tuning sliders, and YouTube showcase.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="w-full md:w-80 relative">
          <input
            type="text"
            [ngModel]="carService.searchQuery()"
            (ngModelChange)="carService.setSearchQuery($event)"
            placeholder="Search by car, brand, engine swap..."
            class="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition shadow-inner"
          />
          <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap gap-2.5 mb-8">
        @for (tab of categoryTabs; track tab.category) {
          <button
            (click)="carService.setCategory(tab.category)"
            [class.bg-pink-600]="carService.activeCategory() === tab.category"
            [class.text-white]="carService.activeCategory() === tab.category"
            [class.border-pink-500]="carService.activeCategory() === tab.category"
            [class.shadow-pink-600/30]="carService.activeCategory() === tab.category"
            [class.bg-slate-900]="carService.activeCategory() !== tab.category"
            [class.text-slate-300]="carService.activeCategory() !== tab.category"
            [class.border-slate-800]="carService.activeCategory() !== tab.category"
            class="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border shadow-md hover:border-pink-500/80 hover:text-white transition flex items-center gap-1.5"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        }
      </div>

      <!-- Cars Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        @for (car of carService.filteredCars(); track car.id) {
          <div class="bg-gradient-to-b from-[#111726] to-[#0c101a] border border-slate-800/90 hover:border-pink-500/60 rounded-2xl p-5 transition duration-300 flex flex-col justify-between group shadow-xl hover:shadow-pink-600/10 hover:-translate-y-1">
            <div>
              <!-- Top tags -->
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="text-xs font-racing font-bold px-2.5 py-0.5 rounded-md bg-gradient-to-r {{ car.badgeGradient }} text-white shadow-md">
                  {{ car.rating }} RATING
                </span>
                <div class="flex items-center gap-1.5">
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800/90 text-cyan-300 border border-slate-700">
                    {{ car.drivetrain }}
                  </span>
                  <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                    {{ car.brand }}
                  </span>
                </div>
              </div>

              <!-- Car Thumbnail Image -->
              <div class="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 border border-slate-800/80 bg-slate-950">
                <img
                  [src]="car.imageUrl"
                  [alt]="car.name"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <span class="absolute bottom-2 left-2 text-[11px] font-racing font-bold text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  {{ car.typeLabel }}
                </span>
              </div>

              <!-- Car Title -->
              <h4 class="font-racing font-bold text-lg text-white group-hover:text-pink-400 transition leading-snug">
                {{ car.name }}
              </h4>

              <!-- Telemetry Stat Grid -->
              <div class="grid grid-cols-2 gap-2 mt-4 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <span class="text-slate-500 uppercase font-semibold block text-[10px]">0 - 60 MPH</span>
                  <span class="text-cyan-400 font-racing font-bold text-sm">{{ car.zeroToSixty }}</span>
                </div>
                <div>
                  <span class="text-slate-500 uppercase font-semibold block text-[10px]">Top Speed</span>
                  <span class="text-pink-400 font-racing font-bold text-sm">{{ car.topSpeed }}</span>
                </div>
                <div class="col-span-2 pt-2 mt-1 border-t border-slate-800/80">
                  <span class="text-slate-500 uppercase font-semibold block text-[10px]">Recommended Engine Swap</span>
                  <span class="text-slate-200 font-bold truncate block">{{ car.recommendedEngine }}</span>
                </div>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="mt-5 pt-3 border-t border-slate-800/70 flex items-center justify-between gap-3">
              <button
                (click)="carService.openModal(car)"
                class="px-3 py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600 border border-pink-500/40 text-pink-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Full Tuning Guide</span>
                <span>&rarr;</span>
              </button>

              <a
                [href]="car.youtubeUrl"
                target="_blank"
                class="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                title="Watch build on YouTube"
              >
                <span>▶ Watch Video</span>
              </a>
            </div>
          </div>
        } @empty {
          <div class="col-span-full py-16 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p class="font-racing text-lg text-slate-300">No cars matched your search query.</p>
            <p class="text-xs mt-1">Try resetting the category filter or search for a brand like "Porsche" or "Nissan".</p>
            <button
              (click)="carService.setCategory('all'); carService.setSearchQuery('')"
              class="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        }
      </div>
    </section>
  `
})
export class GarageComponent {
  public carService = inject(CarService);

  public categoryTabs: { category: CarCategory; label: string; icon: string }[] = [
    { category: 'all', label: 'All Builds', icon: '⚡' },
    { category: 'meta', label: '400+ Meta', icon: '👑' },
    { category: 'race', label: 'Race & Grip', icon: '🏁' },
    { category: 'drift', label: 'Mountain Drift', icon: '💨' },
    { category: 'offroad', label: 'Off-Road Rally', icon: '🌲' },
  ];
}
