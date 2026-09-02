export interface BookingPDFData {
  bookingId: string;
  devoteeName: string;
  phone: string;
  whatsappPhone?: string;
  email?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  address?: string;
  preferredDate?: string;
  purpose?: string;
  gotra?: string;
  ancestors?: any[]; // [{ name, relation, gotra }]
  devoteeCount?: string;
  packageName?: string;
  planTier?: string;
  needHotel?: boolean;
  selectedHotelName?: string;
  needPickup?: boolean;
  pickupFrom?: string;
  arrivalTime?: string;
  flightTrainNo?: string;
  specialNotes?: string;
  estimatedCost?: number;
  createdAt?: string;

  // ERP Settings Customizations
  companyName?: string;
  logoUrl?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  ifscCode?: string;
  upiId?: string;
  officialAddress?: string;
  officialPhone?: string;
  officialEmail?: string;
}

export function generateBookingPDF(data: BookingPDFData) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download your official PDF receipt.');
    return;
  }

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const isPlatinum = data.planTier === 'PLATINUM' || data.planTier === 'GOLD_VIP';

  let ancestorsRows = '';
  if (data.ancestors && Array.isArray(data.ancestors) && data.ancestors.length > 0) {
    ancestorsRows = data.ancestors.map((anc: any, idx: number) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 6px; font-weight: bold;">${idx + 1}. ${anc.name || 'N/A'}</td>
        <td style="padding: 6px;">${anc.relation || 'Ancestor'}</td>
        <td style="padding: 6px;">${anc.gotra || data.gotra || 'Self'}</td>
      </tr>
    `).join('');
  }

  const companyName = data.companyName || 'PindDaanWale';
  const logoUrl = data.logoUrl || '/Pind-Daan-Wale.svg';
  const bankName = data.bankName || 'State Bank of India';
  const accountNumber = data.accountNumber || '40982317822';
  const ifscCode = data.ifscCode || 'SBIN0000078';
  const upiId = data.upiId || '7463055338@sbi';
  const officialAddress = data.officialAddress || 'Vishnupad Temple Compound, Gaya Ji, Bihar - 823001';
  const officialPhone = data.officialPhone || '+91 7463055338';
  const officialEmail = data.officialEmail || 'support@pinddaanwale.com';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${companyName} Receipt - ${data.bookingId}</title>
        <style>
          @page { size: A4; margin: 12mm; }
          * {
            font-variant-numeric: lining-nums tabular-nums;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            color: #1a1410;
            margin: 0;
            padding: 0;
            background-color: #fff;
            font-size: 12px;
            line-height: 1.4;
          }
          .num, .value, .ref-id, .payment-notice, .contact-bar {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
            font-variant-numeric: lining-nums tabular-nums !important;
            font-feature-settings: "lnum", "tnum";
            letter-spacing: 0.2px;
          }
          .receipt-box {
            border: 2px solid #F48D08;
            padding: 24px;
            border-radius: 16px;
            position: relative;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #f3e9dc;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .brand-container {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-logo {
            height: 52px;
            width: auto;
            max-width: 140px;
            object-fit: contain;
          }
          .brand-title {
            font-family: 'Georgia', serif;
            font-size: 24px;
            font-weight: bold;
            color: #6f1d14;
            letter-spacing: -0.5px;
          }
          .brand-tagline {
            font-size: 10px;
            color: #F48D08;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .receipt-title {
            text-align: right;
          }
          .ref-id {
            font-family: 'Consolas', 'Courier New', monospace !important;
            background: #fff8eb;
            color: #6f1d14;
            font-weight: bold;
            font-size: 13px;
            padding: 4px 10px;
            border-radius: 6px;
            border: 1px solid #fce3b8;
            display: inline-block;
            margin-top: 4px;
          }
            border-radius: 6px;
            border: 1px solid #fce3b8;
            display: inline-block;
            margin-top: 4px;
          }
          .badge-tier {
            display: inline-block;
            padding: 5px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 16px;
          }
          .tier-gold { background: #fff3e0; color: #e65100; border: 1px solid #ffe0b2; }
          .tier-platinum { background: linear-gradient(135deg, #4A154B, #6f1d14, #C6922E); color: #fff; }
          
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 16px;
          }
          .section {
            background: #faf7f2;
            padding: 14px;
            border-radius: 12px;
            border: 1px solid #eee5d8;
          }
          .section-title {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #6f1d14;
            margin-bottom: 8px;
            border-bottom: 1px dashed #d8c2ab;
            padding-bottom: 4px;
          }
          .field {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 11px;
          }
          .label { color: #666; font-weight: 500; }
          .value { color: #1a1410; font-weight: bold; }
          
          table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 11px; }
          th { background: #eee5d8; color: #6f1d14; text-align: left; padding: 6px; font-size: 10px; text-transform: uppercase; }
          
          .payment-notice {
            background: #fff8eb;
            border: 1px solid #fce3b8;
            padding: 12px;
            border-radius: 10px;
            margin-top: 16px;
            font-size: 11px;
          }
          .footer {
            margin-top: 20px;
            border-top: 2px solid #f3e9dc;
            padding-top: 14px;
            text-align: center;
            font-size: 10px;
            color: #666;
          }
          .contact-bar {
            font-weight: bold;
            color: #6f1d14;
            margin-top: 4px;
          }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="receipt-box">
          <div class="header">
            <div class="brand-container">
              <img src="${logoUrl}" alt="Logo" class="brand-logo" />
              <div>
                <div class="brand-title">${companyName}</div>
                <div class="brand-tagline">The Official Gaya Ji Pilgrimage Destination</div>
                <div style="font-size: 10px; color: #666; margin-top: 3px;">${officialAddress}</div>
              </div>
            </div>
            <div class="receipt-title">
              <div style="font-size: 14px; font-weight: bold; color: #1a1410;">OFFICIAL PILGRIMAGE PRE-BOOKING</div>
              <div class="ref-id">Ref ID: ${data.bookingId}</div>
              <div style="font-size: 10px; color: #888; margin-top: 3px;">Issued: ${currentDate}</div>
            </div>
          </div>

          <div style="text-align: center;">
            <div class="badge-tier ${isPlatinum ? 'tier-platinum' : 'tier-gold'}">
              ${isPlatinum ? '💎 PLATINUM VIP PILGRIMAGE PLAN' : '🌟 GOLD PILGRIMAGE PLAN'}
            </div>
          </div>

          <div class="grid">
            <div class="section">
              <div class="section-title">Devotee Profile & Contact</div>
              <div class="field"><span class="label">Devotee Name:</span><span class="value">${data.devoteeName}</span></div>
              <div class="field"><span class="label">Mobile Phone:</span><span class="value">${data.phone}</span></div>
              ${data.whatsappPhone ? `<div class="field"><span class="label">WhatsApp Number:</span><span class="value">${data.whatsappPhone}</span></div>` : ''}
              ${data.email ? `<div class="field"><span class="label">Email Address:</span><span class="value">${data.email}</span></div>` : ''}
              <div class="field"><span class="label">Hometown City:</span><span class="value">${data.city || 'Gaya'} ${data.state ? `, ${data.state}` : ''}</span></div>
              ${data.pincode ? `<div class="field"><span class="label">PIN Code:</span><span class="value">${data.pincode}</span></div>` : ''}
              ${data.gotra ? `<div class="field"><span class="label">Main Gotra (गोत्र):</span><span class="value">${data.gotra}</span></div>` : ''}
            </div>

            <div class="section">
              <div class="section-title">Rites & Logistics Summary</div>
              <div class="field"><span class="label">Selected Package:</span><span class="value">${data.packageName || 'Essential Rites'}</span></div>
              <div class="field"><span class="label">Visit Date:</span><span class="value">${data.preferredDate || 'To be confirmed'}</span></div>
              ${data.devoteeCount ? `<div class="field"><span class="label">Devotees Count:</span><span class="value">${data.devoteeCount}</span></div>` : ''}
              ${data.needHotel && data.selectedHotelName ? `<div class="field"><span class="label">Hotel Stay Choice:</span><span class="value">${data.selectedHotelName}</span></div>` : ''}
              ${data.needPickup && data.pickupFrom ? `<div class="field"><span class="label">Station/Airport Pickup:</span><span class="value">${data.pickupFrom} (${data.arrivalTime || ''})</span></div>` : ''}
              ${data.estimatedCost ? `<div class="field"><span class="label">Estimated Total Cost:</span><span class="value" style="color: #6f1d14; font-size: 13px;">₹${data.estimatedCost.toLocaleString('en-IN')}</span></div>` : ''}
            </div>
          </div>

          ${ancestorsRows ? `
            <div class="section" style="margin-bottom: 16px;">
              <div class="section-title">Registered Ancestors Rites List</div>
              <table>
                <thead>
                  <tr><th>Ancestor Name</th><th>Relation</th><th>Gotra</th></tr>
                </thead>
                <tbody>${ancestorsRows}</tbody>
              </table>
            </div>
          ` : ''}

          <div class="payment-notice">
            <strong style="color: #6f1d14; font-size: 12px;">📌 Important Confirmation & Payment Verification Protocol:</strong>
            <div style="margin-top: 5px; color: #222; line-height: 1.5;">
              • <strong>Call Before Sending Money:</strong> Please call our official helpline (<strong>${officialPhone}</strong>) before transferring any advance payment to confirm ritual schedule & Panda assignment.<br/>
              • <strong>Send Payment Screenshot on WhatsApp:</strong> After completing the transfer, please <strong>send a screenshot of your payment receipt on WhatsApp (${officialPhone})</strong> along with your Ref ID (<strong>${data.bookingId}</strong>) for instant booking confirmation.<br/>
              <div style="margin-top: 6px; padding: 6px 10px; background: #ffffff; border: 1px solid #f3d4a0; border-radius: 6px; font-weight: bold; color: #1a1410;">
                <strong>Bank Account:</strong> ${bankName} | <strong>A/c No:</strong> ${accountNumber} | <strong>IFSC:</strong> ${ifscCode} | <strong>UPI ID:</strong> ${upiId}
              </div>
            </div>
          </div>

          <div class="footer">
            <div>This is a computer-generated official pilgrimage pre-booking summary receipt.</div>
            <div class="contact-bar">Official Pooja Helpline: ${officialPhone} | Email: ${officialEmail} | Website: www.pinddaanwale.com</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
