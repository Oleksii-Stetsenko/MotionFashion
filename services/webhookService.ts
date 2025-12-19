
import { WebhookPayload, EventType } from '../types';

/**
 * Replace this URL with your actual n8n Webhook URL.
 * In a real environment, this would come from process.env.VITE_N8N_WEBHOOK_URL
 */
const N8N_WEBHOOK_URL = 'https://n8n.example.com/webhook/fashion-ai-leads';

export const sendWebhookEvent = async (event: EventType, data: Record<string, any> = {}): Promise<boolean> => {
  const payload: WebhookPayload = {
    source: 'motion-fashion-ai-landing',
    event,
    timestamp: new Date().toISOString(),
    data,
  };

  console.log(`[Webhook] Sending ${event}:`, payload);

  try {
    // In demo mode, we might just log this. If the URL is set, we attempt fetch.
    if (N8N_WEBHOOK_URL && !N8N_WEBHOOK_URL.includes('example.com')) {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return response.ok;
    }
    
    // Simulate network delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  } catch (error) {
    console.error('[Webhook] Failed to send event:', error);
    return false;
  }
};
