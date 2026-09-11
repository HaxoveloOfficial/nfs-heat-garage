import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-community-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="community" class="px-4 sm:px-8 py-14 max-w-7xl mx-auto border-t border-slate-800 scroll-mt-20">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
        <div>
          <div class="flex items-center gap-2 text-pink-500 text-xs font-bold uppercase tracking-widest mb-1">
            <span>💬</span> Two-Way Community Hub
          </div>
          <h3 class="text-2xl sm:text-4xl font-racing font-bold text-white tracking-wide">
            ASK <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">HAXOVELO</span>
          </h3>
          <p class="text-slate-400 text-sm mt-1 max-w-2xl">
            Have a question about an engine swap, drift handling, or want a build tested on the channel? Submit below and check back for Haxovelo's reply!
          </p>
        </div>

        <!-- Creator Status Pill -->
        <div class="flex items-center gap-2">
          @if (communityService.isAdmin()) {
            <div class="px-3.5 py-1.5 rounded-xl bg-purple-900/50 border border-purple-500 text-purple-200 text-xs font-racing font-bold flex items-center gap-2 shadow-lg shadow-purple-900/30">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              CREATOR REPLY MODE UNLOCKED
            </div>
          } @else {
            <div class="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
              {{ communityService.answeredQuestions() }} Answers Published
            </div>
          }
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Viewer Submission Box (Left Column) -->
        <div class="lg:col-span-5 bg-gradient-to-b from-[#111726] to-[#0d121c] border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative">
          <div class="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>⚡</span> Direct Ask Box
          </div>
          <h4 class="text-xl font-racing font-bold text-white mb-2">Submit A Build Request</h4>
          <p class="text-xs text-slate-400 mb-6 leading-relaxed">
            All messages are delivered to the channel dashboard. Top questions are featured on this public board with detailed replies.
          </p>

          <form (ngSubmit)="onSubmitMessage()" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Your Name or GamerTag <span class="text-pink-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="formSenderName"
                name="senderName"
                required
                placeholder="e.g. PalmCityDrifter"
                class="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                  YouTube / Handle <span class="text-slate-500 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  [(ngModel)]="formSenderTag"
                  name="senderTag"
                  placeholder="@yourhandle"
                  class="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
                />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                  Car of Interest <span class="text-slate-500 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  [(ngModel)]="formCarModel"
                  name="carModel"
                  placeholder="e.g. Mazda RX-7"
                  class="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Question or Tuning Request <span class="text-pink-500">*</span>
              </label>
              <textarea
                rows="4"
                [(ngModel)]="formMessageText"
                name="messageText"
                required
                placeholder="What is the best engine swap for night heat races? Or can you test the Ferrari 488 Pista?"
                class="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              [disabled]="!formSenderName.trim() || !formMessageText.trim()"
              class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-racing text-xs font-bold tracking-wider hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 transition active:scale-98"
            >
              Send Message To Haxovelo
            </button>
          </form>

          <!-- Toast Notification -->
          @if (showSuccessToast) {
            <div class="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
              <span>✅</span>
              <span>Your message has been posted! Haxovelo will review and post a reply.</span>
            </div>
          }
        </div>

        <!-- Community Q&A Feed (Right Column) -->
        <div class="lg:col-span-7 space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h4 class="font-racing font-bold text-lg text-white flex items-center gap-2">
                <span>Community Q&A Feed</span>
                <span class="text-xs font-tech px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {{ communityService.totalQuestions() }} Questions
                </span>
              </h4>
            </div>

            <!-- Tab Filter for Answered / All -->
            <div class="flex gap-2 text-xs">
              <button
                (click)="filterTab = 'all'"
                [class.text-pink-400]="filterTab === 'all'"
                [class.font-bold]="filterTab === 'all'"
                class="text-slate-400 hover:text-white transition"
              >
                All
              </button>
              <span class="text-slate-700">|</span>
              <button
                (click)="filterTab = 'answered'"
                [class.text-pink-400]="filterTab === 'answered'"
                [class.font-bold]="filterTab === 'answered'"
                class="text-slate-400 hover:text-white transition"
              >
                Answered ({{ communityService.answeredQuestions() }})
              </button>
            </div>
          </div>

          <!-- Messages List -->
          <div class="space-y-3.5">
            @for (msg of visibleMessages(); track msg.id) {
              <div
                class="bg-gradient-to-b from-[#111726] to-[#0c101a] border rounded-2xl p-5 space-y-3.5 transition shadow-lg"
                [class.border-pink-500]="msg.isPinned"
                [class.border-slate-800]="!msg.isPinned && msg.isAnswered"
                [class.border-amber-500/50]="!msg.isAnswered"
              >
                <!-- Message Top Bar -->
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="flex flex-wrap items-center gap-2">
                      <span class="font-racing font-bold text-white text-sm tracking-wide">{{ msg.senderName }}</span>
                      @if (msg.senderTag) {
                        <span class="text-xs text-slate-400">{{ msg.senderTag }}</span>
                      }
                      @if (msg.carModel) {
                        <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                          {{ msg.carModel }}
                        </span>
                      }
                      @if (msg.isPinned) {
                        <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-pink-950/80 text-pink-300 border border-pink-500/40">
                          📌 Pinned
                        </span>
                      }
                    </div>
                    <p class="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                      {{ msg.message }}
                    </p>
                  </div>
                  <span class="text-[11px] text-slate-500 shrink-0">{{ msg.createdAt }}</span>
                </div>

                <!-- Creator Reply Section (if answered) -->
                @if (msg.reply) {
                  <div class="bg-gradient-to-r from-pink-950/30 to-purple-950/20 border-l-4 border-pink-500 p-3.5 rounded-r-xl space-y-1.5">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-pink-400 text-xs">⚡</span>
                        <span class="font-racing font-bold text-xs text-pink-400 tracking-wider">
                          HAXOVELO CREATOR REPLY
                        </span>
                        <span class="text-[10px] bg-red-600/80 text-white font-bold px-1.5 py-0.2 rounded">
                          Official
                        </span>
                      </div>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-100 leading-relaxed font-sans">
                      {{ msg.reply }}
                    </p>
                  </div>
                } @else {
                  <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                    <span class="text-amber-400/90 flex items-center gap-1">
                      <span>⏳</span> Waiting for Haxovelo reply
                    </span>
                  </div>
                }

                <!-- Creator Controls (Visible when Admin Mode is active) -->
                @if (communityService.isAdmin()) {
                  <div class="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <!-- Reply trigger -->
                      <button
                        (click)="toggleReplyComposer(msg.id)"
                        class="px-3 py-1 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md shadow-pink-600/30"
                      >
                        <span>✏️</span>
                        <span>{{ msg.reply ? 'Edit Reply' : 'Reply to Viewer' }}</span>
                      </button>

                      <!-- Toggle Pin -->
                      <button
                        (click)="communityService.togglePin(msg.id)"
                        class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                      >
                        {{ msg.isPinned ? 'Unpin' : 'Pin 📌' }}
                      </button>
                    </div>

                    <!-- Delete Button -->
                    <button
                      (click)="communityService.deleteMessage(msg.id)"
                      class="px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/50 text-red-300 text-xs font-semibold transition"
                    >
                      Delete
                    </button>
                  </div>

                  <!-- Inline Reply Box for Creator -->
                  @if (activeComposerId === msg.id) {
                    <div class="mt-3 p-3 rounded-xl bg-slate-950 border border-purple-500/50 space-y-2 animate-fadeIn">
                      <label class="block text-[11px] font-bold uppercase text-purple-300">
                        Your Creator Reply to {{ msg.senderName }}:
                      </label>
                      <textarea
                        [(ngModel)]="activeReplyText"
                        rows="3"
                        placeholder="Write your answer..."
                        class="w-full bg-slate-900 border border-slate-700 focus:border-pink-500 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                      ></textarea>
                      <div class="flex justify-end gap-2">
                        <button
                          (click)="activeComposerId = null"
                          class="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                        >
                          Cancel
                        </button>
                        <button
                          (click)="submitReply(msg.id)"
                          [disabled]="!activeReplyText.trim()"
                          class="px-4 py-1 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold hover:opacity-95 disabled:opacity-50"
                        >
                          Publish Reply
                        </button>
                      </div>
                    </div>
                  }
                }
              </div>
            } @empty {
              <div class="py-12 text-center text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-800">
                <p class="font-racing text-slate-400">No questions found in this view.</p>
                <p class="text-xs mt-1">Be the first to ask Haxovelo a question using the form on the left!</p>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `
})
export class CommunityInboxComponent {
  public communityService = inject(CommunityService);

  public filterTab: 'all' | 'answered' = 'all';

  public formSenderName = '';
  public formSenderTag = '';
  public formCarModel = '';
  public formMessageText = '';
  public showSuccessToast = false;

  public activeComposerId: string | null = null;
  public activeReplyText = '';

  public visibleMessages() {
    const all = this.communityService.messages();
    const sorted = [...all].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

    if (this.filterTab === 'answered') {
      return sorted.filter(m => m.isAnswered);
    }
    return sorted;
  }

  onSubmitMessage(): void {
    if (!this.formSenderName.trim() || !this.formMessageText.trim()) return;

    this.communityService.addMessage(
      this.formSenderName,
      this.formMessageText,
      this.formCarModel,
      this.formSenderTag
    );

    this.formSenderName = '';
    this.formSenderTag = '';
    this.formCarModel = '';
    this.formMessageText = '';
    this.showSuccessToast = true;

    setTimeout(() => {
      this.showSuccessToast = false;
    }, 4000);
  }

  toggleReplyComposer(id: string): void {
    if (this.activeComposerId === id) {
      this.activeComposerId = null;
      this.activeReplyText = '';
    } else {
      this.activeComposerId = id;
      const msg = this.communityService.messages().find(m => m.id === id);
      this.activeReplyText = msg?.reply || '';
    }
  }

  submitReply(id: string): void {
    if (!this.activeReplyText.trim()) return;
    this.communityService.replyToMessage(id, this.activeReplyText);
    this.activeComposerId = null;
    this.activeReplyText = '';
  }
}
