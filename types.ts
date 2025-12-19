
export type Language = 'en' | 'ua';

export type EventType = 'page_view' | 'demo_clicked' | 'lead_submit' | 'chat_message' | 'demo_start' | 'demo_complete';

export interface WebhookPayload {
  source: string;
  event: EventType;
  timestamp: string;
  data: Record<string, any>;
}

export interface LeadFormData {
  name: string;
  email: string;
  company?: string;
  industry?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
