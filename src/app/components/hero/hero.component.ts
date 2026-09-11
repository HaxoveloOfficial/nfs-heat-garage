import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative px-4 sm:px-8 py-10 sm:py-16 max-w-7xl mx-auto overflow-hidden">
      <!-- Neon background glow orbs -->
      <div class="absolute -top-16 -left-16 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/2 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Left Banner Copy -->
        <div class="lg:col-span-7 space-y-5">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-widest">
            <span class="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
            Official YouTube Companion
          </div>

          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-black font-racing tracking-tight leading-tight text-white">
            DOMINATE PALM CITY WITH <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">400+ NFS HEAT</span> BUILDS
          </h2>

          <p class="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Welcome to the official build hub for <strong class="text-cyan-300">&#64;HaxoveloOfficial</strong>. 
            Discover dyno-tested engine swaps, competitive race setups, max-score drift angles, and submit your car build questions for personal tuning advice.
          </p>

          <!-- Action buttons -->
          <div class="flex flex-wrap gap-4 pt-3">
            <a
              href="#garage"
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white font-racing text-sm font-bold tracking-wider hover:brightness-110 shadow-xl shadow-pink-600/30 hover:scale-[1.02] active:scale-95 transition"
            >
              Browse Garage Database
            </a>
            <a
              href="#community"
              class="px-6 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-racing text-sm font-bold tracking-wider hover:bg-slate-800 hover:border-cyan-400 shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center gap-2"
            >
              <span>💬</span> Ask Tuning Question
            </a>
          </div>

          <!-- Highlight Metrics Strip -->
          <div class="grid grid-cols-3 gap-3 sm:gap-4 pt-6 max-w-lg border-t border-slate-800">
            <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <span class="block font-racing font-bold text-xl sm:text-2xl text-pink-400">400+</span>
              <span class="text-[11px] uppercase font-semibold text-slate-400">Max Performance</span>
            </div>
            <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <span class="block font-racing font-bold text-xl sm:text-2xl text-cyan-400">HEAT 5</span>
              <span class="text-[11px] uppercase font-semibold text-slate-400">Cop Evasion Tunes</span>
            </div>
            <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <span class="block font-racing font-bold text-xl sm:text-2xl text-yellow-400">LIVE</span>
              <span class="text-[11px] uppercase font-semibold text-slate-400">Community Q&A</span>
            </div>
          </div>
        </div>

        <!-- Right YouTube Feature Card -->
        <div class="lg:col-span-5">
          <div class="bg-gradient-to-b from-slate-900 via-[#101522] to-slate-950 border border-pink-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden group">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span class="text-xs font-racing font-bold text-white tracking-wider">FEATURED CHANNEL</span>
              </div>
              <a
                href="https://www.youtube.com/@HaxoveloOfficial"
                target="_blank"
                class="text-xs font-bold text-pink-400 hover:text-pink-300 transition"
              >
                &#64;HaxoveloOfficial &rarr;
              </a>
            </div>

            <!-- Video / Showcase Card Banner -->
            <div class="mt-4 rounded-xl overflow-hidden border border-slate-800 relative aspect-video bg-slate-950 flex flex-col items-center justify-center text-center p-4">
              <img
                src="images/cars/skyline-r34.jpg"
                alt="NFS Heat Car Showcase"
                class="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition duration-700"
              />
              <div class="relative z-10 space-y-3">
                <a
                  href="https://www.youtube.com/@HaxoveloOfficial"
                  target="_blank"
                  class="w-16 h-16 rounded-full bg-red-600/90 hover:bg-red-600 flex items-center justify-center mx-auto shadow-2xl shadow-red-600/50 hover:scale-110 active:scale-95 transition"
                >
                  <svg class="w-7 h-7 fill-white ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </a>
                <div>
                  <h3 class="font-racing font-bold text-base text-white neon-glow-cyan tracking-wide">
                    NFS HEAT CAR TUNING & SHOWCASES
                  </h3>
                  <p class="text-xs text-slate-300 mt-1">Watch new build tests, speed runs & police escapes</p>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Platform: PC / PS5 / Xbox</span>
              <a
                href="https://www.youtube.com/@HaxoveloOfficial"
                target="_blank"
                class="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
              >
                <span>▶</span> Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {}
