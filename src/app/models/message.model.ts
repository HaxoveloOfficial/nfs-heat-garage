export interface CommunityMessage {
  id: string;
  senderName: string;
  senderTag?: string;
  carModel?: string;
  message: string;
  reply?: string;
  isAnswered: boolean;
  createdAt: string;
  isPinned?: boolean;
}
