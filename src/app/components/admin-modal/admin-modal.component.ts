import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-admin-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div
        (click)="onBackdropClick($event)"
        class="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      >
        <div class="bg-gradient-to-b from-[#131929] to-[#0b0e17] border border-purple-500/50 rounded-2xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
          <!-- Close button -->
          <button
            (click)="isOpen = false"
            class="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
          >
            &times;
          </button>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500 flex items-center justify-center text-xl">
              🛡️
            </div>
            <div>
              <h3 class="font-racing font-bold text-lg text-white">Creator Verification</h3>
              <p class="text-xs text-slate-400">Unlock Reply Mode on your website</p>
            </div>
          </div>

          <div class="bg-purple-950/30 border border-purple-800/60 rounded-xl p-3 text-xs text-purple-300 space-y-1">
            <p><strong>Note:</strong> Default Passkey is: <code class="bg-purple-900/80 px-2 py-0.5 rounded text-white font-mono font-bold">heat400</code></p>
            <p class="text-[11px] text-purple-400/80">You can customize this passcode in your code anytime.</p>
          </div>

          <form (ngSubmit)="onVerify()" class="space-y-3">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-300 mb-1">Enter Creator Passkey</label>
              <input
                type="password"
                [(ngModel)]="pinInput"
                name="pinInput"
                placeholder="Enter passkey..."
                class="w-full bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
                autofocus
              />
            </div>

            @if (errorMessage) {
              <p class="text-xs text-red-400 font-semibold">{{ errorMessage }}</p>
            }

            <div class="flex justify-end gap-2 pt-2">
              <button
                type="button"
                (click)="isOpen = false"
                class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-racing text-xs font-bold hover:opacity-95 shadow-lg shadow-purple-600/30 transition"
              >
                Unlock Reply Mode
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class AdminModalComponent implements OnInit, OnDestroy {
  public communityService = inject(CommunityService);
  public isOpen = false;
  public pinInput = '';
  public errorMessage = '';

  private listener = () => {
    this.isOpen = true;
    this.errorMessage = '';
    this.pinInput = '';
  };

  ngOnInit(): void {
    window.addEventListener('open-admin-login', this.listener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('open-admin-login', this.listener);
  }

  onVerify(): void {
    const ok = this.communityService.verifyAdminPin(this.pinInput);
    if (ok) {
      this.isOpen = false;
      this.pinInput = '';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Incorrect passkey. Please try again.';
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('backdrop-blur-sm')) {
      this.isOpen = false;
    }
  }
}
