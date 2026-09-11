import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="sticky top-0 z-40 bg-[#0e121b]/95 backdrop-blur-md border-b border-pink-500/25 px-4 sm:px-8 py-3.5 flex items-center justify-between transition">
      <!-- Channel Brand -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="h-10 w-10 rounded-xl bg-gradient-to-tr from-pink-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-pink-600/30 group-hover:scale-105 transition">
          <div class="h-full w-full bg-[#0e121b] rounded-[10px] flex items-center justify-center font-racing font-black text-pink-400 text-lg">
            HV
          </div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-racing font-bold text-base sm:text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-300 to-cyan-400">
              HAXOVELO
            </h1>
            <span class="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
              NFS HEAT
            </span>
          </div>
          <p class="text-xs text-slate-400 tracking-wide hidden sm:block">YouTube Creator Garage & Builds Hub</p>
        </div>
      </a>

      <!-- Navigation & Action Buttons -->
      <div class="flex items-center gap-3 sm:gap-5">
        <nav class="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide">
          <a href="#garage" class="text-slate-300 hover:text-cyan-400 transition flex items-center gap-1.5">
            <span>🏁</span> GARAGE
          </a>
          <a href="#community" class="text-slate-300 hover:text-pink-400 transition flex items-center gap-1.5">
            <span>💬</span> ASK & REPLIES
          </a>
          <a href="#about" class="text-slate-300 hover:text-purple-400 transition">
            CHANNEL
          </a>
        </nav>

        <!-- Admin Creator Toggle Button -->
        @if (communityService.isAdmin()) {
          <button
            (click)="communityService.logoutAdmin()"
            class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-950/80 border border-purple-500 text-purple-200 hover:bg-purple-900 transition flex items-center gap-1.5 shadow-md shadow-purple-900/40"
            title="Click to lock admin mode"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Creator Mode (Active)</span>
          </button>
        } @else {
          <button
            (click)="onOpenAdminLogin()"
            class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900/90 border border-slate-700 text-slate-300 hover:border-purple-500 hover:text-purple-300 transition flex items-center gap-1.5"
            title="Creator PIN login to reply to questions"
          >
            <span>🛡️</span>
            <span class="hidden sm:inline">Creator Login</span>
          </button>
        }

        <!-- Direct YouTube Subscribe Button -->
        <a
          href="https://www.youtube.com/@HaxoveloOfficial?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          class="px-3.5 sm:px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-racing text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition"
        >
          <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span class="hidden sm:inline">Subscribe</span>
          <span class="sm:hidden">YT</span>
        </a>
      </div>
    </header>
  `
})
export class NavbarComponent {
  public communityService = inject(CommunityService);

  onOpenAdminLogin(): void {
    window.dispatchEvent(new CustomEvent('open-admin-login'));
  }
}
