import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer id="about" class="mt-20 border-t border-slate-800/80 bg-[#080b10] py-12 px-4 sm:px-8 text-slate-400 text-xs">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-6 space-y-3">
          <div class="flex items-center gap-2">
            <span class="font-racing font-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
              HAXOVELO // NFS HEAT HUB
            </span>
            <span class="bg-red-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              YouTube Channel
            </span>
          </div>
          <p class="text-slate-400 text-xs max-w-md leading-relaxed">
            The ultimate companion database for Need for Speed Heat players. Discover optimal engine swaps, competitive race setups, drift angles, and get your tuning questions answered directly by <strong>&#64;HaxoveloOfficial</strong>.
          </p>
          <p class="text-slate-500 text-[11px]">
            Need for Speed and Palm City are trademarks of Electronic Arts Inc. This fan-made portal is created for the YouTube community.
          </p>
        </div>

        <div class="md:col-span-3 space-y-2">
          <h5 class="font-racing font-bold text-white text-xs uppercase tracking-wider">Quick Navigation</h5>
          <ul class="space-y-1.5">
            <li><a href="#garage" class="hover:text-cyan-400 transition">Car Garage (400+ Builds)</a></li>
            <li><a href="#community" class="hover:text-pink-400 transition">Ask Question & Viewer Requests</a></li>
            <li><a href="https://www.youtube.com/@HaxoveloOfficial" target="_blank" class="hover:text-red-400 transition">YouTube Channel Videos</a></li>
          </ul>
        </div>

        <div class="md:col-span-3 space-y-2">
          <h5 class="font-racing font-bold text-white text-xs uppercase tracking-wider">Database & Deployment</h5>
          <p class="text-slate-400 text-xs leading-relaxed">
            Car specs are stored directly in your GitHub repo in <code class="text-pink-400">public/data/cars.json</code>.
            Deploy anytime with 1 click to <strong>Vercel</strong>, <strong>Netlify</strong>, or <strong>GitHub Pages</strong>.
          </p>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-slate-900 text-center text-slate-600 text-[11px] flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <span>&copy; {{ currentYear }} Haxovelo Official. Built with Angular & Tailwind CSS.</span>
        <span class="text-slate-500">Palm City Underground Companion</span>
      </div>
    </footer>
  `
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();
}
