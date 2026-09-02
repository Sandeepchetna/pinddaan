import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';

const db = prisma as any;

export async function sendBookingConfirmationEmail(bookingData: {
  bookingRef: string;
  devoteeName: string;
  email?: string;
  phone: string;
  purpose: string;
  packageName?: string;
  planTier?: string;
  preferredDate?: string;
  gotra?: string;
  estimatedCost?: number;
}) {
  try {
    // 1. Fetch live SMTP settings from SiteSettings DB
    let settings: any = null;
    if (db.siteSettings) {
      settings = await db.siteSettings.findUnique({ where: { id: 'default' } });
    }

    const smtpHost = settings?.smtpHost || process.env.SMTP_HOST || 'smtp.hostinger.com';
    const smtpPort = Number(settings?.smtpPort || process.env.SMTP_PORT || 465);
    const smtpUser = settings?.smtpUser || process.env.SMTP_USER || 'support@pinddaanwale.com';
    const smtpPassword = settings?.smtpPassword || process.env.SMTP_PASS || '';
    const fromEmail = settings?.smtpFromEmail || settings?.email || 'support@pinddaanwale.com';
    const adminEmail = settings?.adminNotificationEmail || 'support@pinddaanwale.com';

    if (!smtpUser || !smtpPassword) {
      console.log('[SMTP Notification Skipped]: SMTP User or Password not configured in ERP Settings yet.');
      return { success: false, message: 'SMTP credentials not configured' };
    }

    // 2. Create Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword
      }
    });

    // HTML Email Template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 30px; color: #111827;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f3f4f6;">
            <h1 style="color: #6f1d14; margin: 0; font-size: 24px;">PindDaanWale Pilgrimage Services</h1>
            <p style="color: #F48D08; font-weight: bold; margin-top: 5px; font-size: 13px; text-transform: uppercase;">Official Gaya Ji Teerth Authority</p>
          </div>

          <div style="padding: 20px 0;">
            <h2 style="color: #111827; font-size: 20px; margin-bottom: 10px;">Pranam ${bookingData.devoteeName} Ji! 🙏</h2>
            <p style="color: #4b5563; font-size: 14px; line-relaxed;">Your sacred Gaya Ji Pind Daan pre-booking request has been successfully registered.</p>

            <div style="background-color: #fffbeb; border: 1px solid #fef3c7; padding: 20px; border-radius: 12px; margin: 20px 0;">
              <div style="font-size: 12px; font-weight: bold; color: #b45309; text-transform: uppercase; margin-bottom: 8px;">Pre-Booking Reference ID</div>
              <div style="font-size: 22px; font-weight: bold; color: #92400e; font-family: monospace;">${bookingData.bookingRef}</div>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280;">Devotee Name:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #111827;">${bookingData.devoteeName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280;">Phone Number:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #111827;">${bookingData.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280;">Purpose:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #111827;">${bookingData.purpose}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280;">Selected Package:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #F48D08;">${bookingData.packageName || 'Essential Package'} (${bookingData.planTier || 'GOLD'} Tier)</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280;">Preferred Visit Date:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #111827;">${bookingData.preferredDate || 'To be finalized'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280;">Gotra:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #111827;">${bookingData.gotra || 'Kashyap'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280;">Estimated Total Dakshina:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #059669; font-size: 16px;">₹${(bookingData.estimatedCost || 4500).toLocaleString('en-IN')}</td>
              </tr>
            </table>

            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 10px; font-size: 13px; color: #4b5563;">
              <strong>What Happens Next?</strong><br/>
              1. Our Senior Gaya Teerth Panda Acharya will review your Gotra Sankalp.<br/>
              2. Our helpdesk team will contact you on <strong>${bookingData.phone}</strong> to confirm Panda assignment and itinerary.<br/>
              3. For urgent assistance, call our official helpline: <strong>+91 7463055338</strong>.
            </div>
          </div>

          <div style="border-top: 1px solid #e5e7eb; pt-20px; text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px;">
            <p>PindDaanWale Pilgrimage Services • Vishnupad Temple Compound, Gaya Ji, Bihar - 823001</p>
            <p>Official Helpline: +91 7463055338 | Email: support@pinddaanwale.com</p>
          </div>
        </div>
      </div>
    `;

    // 3. Send Email to Devotee (if email provided)
    if (bookingData.email) {
      await transporter.sendMail({
        from: `"PindDaanWale Gaya Ji" <${fromEmail}>`,
        to: bookingData.email,
        subject: `🙏 Booking Receipt Confirmation #${bookingData.bookingRef} - PindDaanWale Gaya Ji`,
        html: htmlContent
      });
    }

    // 4. Send Copy Notification to Admin
    if (adminEmail) {
      await transporter.sendMail({
        from: `"PindDaanWale Web Engine" <${fromEmail}>`,
        to: adminEmail,
        subject: `🔔 NEW PRE-BOOKING RECEIVED #${bookingData.bookingRef} (${bookingData.devoteeName})`,
        html: htmlContent
      });
    }

    return { success: true };
  } catch (err: any) {
    console.error('SMTP Email Send Error:', err);
    return { success: false, error: err.message };
  }
}
