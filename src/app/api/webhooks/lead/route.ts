import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { syncLeadToAIWCRM } from '@/lib/aiwcrm';

const db = prisma as any;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Support Meta Ads, Google Ads, Zapier, or AIWCRM payload shapes
    const name = body.name || body.full_name || body.devoteeName || body.first_name || 'Ad Lead Devotee';
    const phone = body.phone || body.phone_number || body.mobile || body.whatsappPhone;

    if (!phone) {
      return NextResponse.json({ success: false, error: 'Phone number is required' }, { status: 400 });
    }

    const email = body.email || body.email_address || null;
    const city = body.city || body.location || null;
    const source = body.source || body.ad_name || body.utm_source || 'Meta / Google Ads';
    const packageName = body.packageName || body.package || 'Ad Campaign Lead';
    const notes = body.notes || body.message || `Lead generated via ${source}`;

    // 1. Save to Lead database model
    let leadRecord: any = null;
    if (db.lead) {
      leadRecord = await db.lead.create({
        data: {
          devoteeName: name,
          leadNumber: `LEAD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          phone,
          email,
          city,
          source,
          purpose: packageName,
          notes,
          status: 'NEW_LEAD'
        }
      });
    }

    // 2. Upsert Customer model
    if (db.customer) {
      await db.customer.upsert({
        where: { phone },
        update: {
          name,
          email: email || undefined,
          city: city || undefined,
          updatedAt: new Date()
        },
        create: {
          name,
          phone,
          email,
          city,
          country: 'India',
          customerCode: `CUST-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          notes: `Lead via ${source}`
        }
      });
    }

    // 3. Auto-sync outbound to AIWCRM
    syncLeadToAIWCRM({
      name,
      phone,
      email: email || undefined,
      city: city || undefined,
      source,
      packageName,
      notes
    });

    return NextResponse.json({
      success: true,
      message: 'Lead saved successfully and forwarded to AIWCRM',
      leadId: leadRecord?.id || 'lead_saved'
    });
  } catch (err: any) {
    console.error('Inbound Lead Webhook Error:', err?.message || err);
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ACTIVE',
    endpoint: 'https://www.pinddaanwale.com/api/webhooks/lead',
    description: 'PindDaanWale Inbound Lead Webhook for Meta Ads, Google Ads & AIWCRM'
  });
}
