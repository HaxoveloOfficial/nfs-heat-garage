import { Injectable, signal, computed } from '@angular/core';
import { CommunityMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private readonly STORAGE_KEY = 'haxovelo_nfs_messages_v1';
  private readonly ADMIN_PIN = 'heat400'; // Default creator access PIN

  private messagesSignal = signal<CommunityMessage[]>([]);
  public readonly messages = this.messagesSignal.asReadonly();

  public readonly isAdmin = signal<boolean>(false);

  // Statistics
  public readonly totalQuestions = computed(() => this.messagesSignal().length);
  public readonly answeredQuestions = computed(() => 
    this.messagesSignal().filter(m => m.isAnswered).length
  );
  public readonly pendingQuestions = computed(() => 
    this.messagesSignal().filter(m => !m.isAnswered).length
  );

  constructor() {
    this.loadMessages();
    this.checkSavedAdminState();
  }

  public async loadMessages(): Promise<void> {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const parsed: CommunityMessage[] = JSON.parse(saved);
        this.messagesSignal.set(parsed);
        return;
      } catch (err) {
        console.warn('Failed parsing saved messages, resetting to defaults.', err);
      }
    }

    // Load initial defaults
    try {
      const res = await fetch('data/messages.json');
      if (res.ok) {
        const initial: CommunityMessage[] = await res.json();
        this.messagesSignal.set(initial);
        this.persist();
      }
    } catch (e) {
      console.error('Error fetching initial messages:', e);
    }
  }

  public addMessage(senderName: string, messageText: string, carModel?: string, senderTag?: string): void {
    const newMessage: CommunityMessage = {
      id: 'msg-' + Date.now(),
      senderName: senderName.trim(),
      senderTag: senderTag ? (senderTag.startsWith('@') ? senderTag : `@${senderTag}`) : undefined,
      carModel: carModel?.trim() || undefined,
      message: messageText.trim(),
      reply: undefined,
      isAnswered: false,
      createdAt: 'Just now',
      isPinned: false
    };

    this.messagesSignal.update(current => [newMessage, ...current]);
    this.persist();
  }

  public replyToMessage(id: string, replyText: string): boolean {
    if (!this.isAdmin()) return false;

    this.messagesSignal.update(current =>
      current.map(m => {
        if (m.id === id) {
          return {
            ...m,
            reply: replyText.trim(),
            isAnswered: true
          };
        }
        return m;
      })
    );
    this.persist();
    return true;
  }

  public togglePin(id: string): void {
    if (!this.isAdmin()) return;

    this.messagesSignal.update(current =>
      current.map(m => (m.id === id ? { ...m, isPinned: !m.isPinned } : m))
    );
    this.persist();
  }

  public deleteMessage(id: string): void {
    if (!this.isAdmin()) return;

    this.messagesSignal.update(current => current.filter(m => m.id !== id));
    this.persist();
  }

  public verifyAdminPin(pin: string): boolean {
    if (pin.trim() === this.ADMIN_PIN) {
      this.isAdmin.set(true);
      sessionStorage.setItem('haxovelo_admin_session', 'true');
      return true;
    }
    return false;
  }

  public logoutAdmin(): void {
    this.isAdmin.set(false);
    sessionStorage.removeItem('haxovelo_admin_session');
  }

  private checkSavedAdminState(): void {
    if (sessionStorage.getItem('haxovelo_admin_session') === 'true') {
      this.isAdmin.set(true);
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.messagesSignal()));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }
}
