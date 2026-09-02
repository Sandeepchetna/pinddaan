import prisma from '@/lib/prisma';

const db = prisma as any;

export async function syncLeadToAIWCRM(leadData: {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  source?: string;
  packageName?: string;
  gotra?: string;
  bookingRef?: string;
  notes?: string;
}) {
  try {
    const settings = await db.siteSettings.findUnique({ where: { id: 'default' } });
    const webhookUrl = settings?.aiwcrmWebhookUrl;
    const apiKey = settings?.aiwcrmApiKey;

    if (!webhookUrl || webhookUrl.trim() === '') {
      return { success: false, reason: 'AIWCRM Webhook URL not configured' };
    }

    const payload = {
      source: leadData.source || 'PindDaanWale Web Engine',
      lead: {
        full_name: leadData.name,
        phone_number: leadData.phone,
        email: leadData.email || '',
        city: leadData.city || '',
        gotra: leadData.gotra || '',
        package_name: leadData.packageName || '',
        booking_ref: leadData.bookingRef || '',
        notes: leadData.notes || '',
        created_at: new Date().toISOString()
      }
    };

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
      },
      body: JSON.stringify(payload)
    });

    return { success: res.ok, status: res.status };
  } catch (err: any) {
    console.error('AIWCRM Sync Error:', err?.message || err);
    return { success: false, error: err?.message };
  }
}
