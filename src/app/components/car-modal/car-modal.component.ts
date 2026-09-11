import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (carService.selectedCar(); as car) {
      <div
        (click)="onBackdropClick($event)"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      >
        <div
          class="bg-gradient-to-b from-[#111726] to-[#0a0d14] border border-pink-500/50 rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
        >
          <!-- Close Button -->
          <button
            (click)="carService.closeModal()"
            class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center font-bold text-lg transition z-10"
            aria-label="Close modal"
          >
            &times;
          </button>

          <!-- Modal Header -->
          <div class="flex items-center justify-between gap-3 mb-2">
            <span class="text-xs font-racing font-bold px-3 py-1 rounded-md bg-gradient-to-r {{ car.badgeGradient }} text-white shadow-md">
              {{ car.rating }} RATING
            </span>
            <span class="text-xs font-semibold text-cyan-400 uppercase tracking-wider pr-10">
              {{ car.brand }} &bull; {{ car.drivetrain }} &bull; {{ car.year }}
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-racing font-bold text-white tracking-wide leading-tight">
            {{ car.name }}
          </h3>
          <p class="text-xs text-pink-400 font-bold uppercase tracking-wider mt-0.5">
            Role: {{ car.typeLabel }}
          </p>

          <!-- Banner Preview Image -->
          <div class="mt-4 rounded-xl overflow-hidden aspect-[21/9] border border-slate-800 bg-slate-950 relative">
            <img [src]="car.imageUrl" [alt]="car.name" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-3 left-4 flex gap-4 text-xs font-racing">
              <div><span class="text-slate-400 block text-[10px]">POWER:</span> <strong class="text-white">{{ car.power }}</strong></div>
              <div><span class="text-slate-400 block text-[10px]">TORQUE:</span> <strong class="text-white">{{ car.torque }}</strong></div>
              <div><span class="text-slate-400 block text-[10px]">0-60 MPH:</span> <strong class="text-cyan-400">{{ car.zeroToSixty }}</strong></div>
              <div><span class="text-slate-400 block text-[10px]">1/4 MILE:</span> <strong class="text-pink-400">{{ car.quarterMile }}</strong></div>
            </div>
          </div>

          <!-- Parts & Build Spec Breakdown -->
          <div class="mt-6 space-y-4">
            <h4 class="text-xs font-racing font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <span>🔧</span> Complete Installed Parts Blueprint
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span class="text-slate-500 uppercase font-semibold block text-[10px]">Engine Swap:</span>
                <strong class="text-white text-sm block mt-0.5">{{ car.recommendedEngine }}</strong>
              </div>
              <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span class="text-slate-500 uppercase font-semibold block text-[10px]">Forced Induction:</span>
                <strong class="text-cyan-300 text-sm block mt-0.5">{{ car.induction }}</strong>
              </div>
              <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span class="text-slate-500 uppercase font-semibold block text-[10px]">Nitrous Setup:</span>
                <span class="text-slate-200 font-semibold block">{{ car.nitrous }}</span>
              </div>
              <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span class="text-slate-500 uppercase font-semibold block text-[10px]">Suspension:</span>
                <span class="text-slate-200 font-semibold block">{{ car.suspension }}</span>
              </div>
              <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span class="text-slate-500 uppercase font-semibold block text-[10px]">Tires & Grip:</span>
                <span class="text-slate-200 font-semibold block">{{ car.tires }}</span>
              </div>
              <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span class="text-slate-500 uppercase font-semibold block text-[10px]">Transmission & Differential:</span>
                <span class="text-slate-200 font-semibold block">{{ car.gearbox }} / {{ car.differential }}</span>
              </div>
              <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800 col-span-1 sm:col-span-2">
                <span class="text-slate-500 uppercase font-semibold block text-[10px]">Auxiliary (Passive & Active):</span>
                <span class="text-slate-200 font-semibold block">{{ car.auxiliaryPassive }} &bull; {{ car.auxiliaryActive }}</span>
              </div>
            </div>

            <!-- Live Tuning Sliders -->
            <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h5 class="text-xs font-racing font-bold uppercase tracking-wider text-pink-400">
                Live Tuning Recommendations
              </h5>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <span class="text-slate-500 block text-[10px] uppercase">Steering Sensitivity</span>
                  <span class="text-cyan-400 font-bold font-racing text-sm">{{ car.liveTuning.steeringSensitivity > 0 ? '+' : '' }}{{ car.liveTuning.steeringSensitivity }}</span>
                </div>
                <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <span class="text-slate-500 block text-[10px] uppercase">Downforce</span>
                  <span class="text-pink-400 font-bold font-racing text-sm">{{ car.liveTuning.downforce > 0 ? '+' : '' }}{{ car.liveTuning.downforce }}</span>
                </div>
                <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <span class="text-slate-500 block text-[10px] uppercase">Traction Control</span>
                  <span class="text-slate-200 font-bold font-racing text-sm">{{ car.liveTuning.tractionControl ? 'ON' : 'OFF' }}</span>
                </div>
                <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <span class="text-slate-500 block text-[10px] uppercase">Drift Style</span>
                  <span class="text-yellow-400 font-bold font-racing text-sm">{{ car.liveTuning.driftStyle }}</span>
                </div>
              </div>
            </div>

            <!-- Creator Pro Tips -->
            <div class="bg-pink-950/20 border-l-4 border-pink-500 p-4 rounded-r-xl space-y-1">
              <h5 class="text-xs font-racing font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>⚡</span> Haxovelo Driving & Heat 5 Police Advice
              </h5>
              <p class="text-xs text-slate-300 leading-relaxed">
                {{ car.proTips }}
              </p>
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <a
              [href]="car.youtubeUrl"
              target="_blank"
              class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-racing text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30 transition hover:scale-105"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Watch Build Showcase on YouTube</span>
            </a>

            <button
              (click)="carService.closeModal()"
              class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class CarModalComponent {
  public carService = inject(CarService);

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('backdrop-blur-md')) {
      this.carService.closeModal();
    }
  }
}
