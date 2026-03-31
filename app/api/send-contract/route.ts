import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface EmailRequest {
  to: string;
  clientName: string;
  companyName: string;
  services: string[];
  totalAmount: number;
  pdfBase64: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EmailRequest = await req.json();
    const { to, clientName, companyName, services, totalAmount, pdfBase64 } = body;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured. Add RESEND_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    // Dynamic import to avoid build-time initialization
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Convert base64 to buffer for attachment
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    // Send email to client
    const clientEmail = await resend.emails.send({
      from: 'BLURRD STUDIO <contracts@blurrdstudio.com>',
      to: [to],
      subject: `Your BLURRD STUDIO Service Agreement - ${companyName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #262626;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #003399;
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background-color: #FBFAF6;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .service-list {
                background-color: white;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
                border-left: 4px solid #ff6601;
              }
              .service-item {
                margin: 8px 0;
                color: #7a7a7a;
              }
              .total {
                font-size: 24px;
                font-weight: bold;
                color: #003399;
                margin: 20px 0;
              }
              .cta {
                background-color: #ff6601;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 6px;
                display: inline-block;
                margin: 20px 0;
                font-weight: 600;
              }
              .footer {
                text-align: center;
                color: #7a7a7a;
                font-size: 12px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #7a7a7a;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">BLURRD STUDIO</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Service Agreement is Ready</p>
            </div>
            
            <div class="content">
              <p>Hi ${clientName},</p>
              
              <p>Thank you for choosing BLURRD STUDIO! Your custom service agreement is attached to this email.</p>
              
              <div class="service-list">
                <strong>Selected Services:</strong>
                ${services.map(service => `<div class="service-item">✓ ${service}</div>`).join('')}
              </div>
              
              <div class="total">
                Total Investment: $${totalAmount.toLocaleString()}
              </div>
              
              <p><strong>Next Steps:</strong></p>
              <ol>
                <li>Review the attached service agreement</li>
                <li>Complete payment to begin your project</li>
                <li>We'll reach out within 24 hours to schedule your kickoff</li>
              </ol>
              
              <p>Questions? Reply to this email or contact us at hello@blurrdstudio.com</p>
              
              <p>Looking forward to working with you!</p>
              
              <p style="margin-top: 30px;">
                <strong>The BLURRD STUDIO Team</strong>
              </p>
            </div>
            
            <div class="footer">
              <p>BLURRD STUDIO<br>
              hello@blurrdstudio.com<br>
              blurrdstudio.com</p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `BlurrdStudio_Contract_${Date.now()}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: 'BLURRD STUDIO <contracts@blurrdstudio.com>',
      to: ['hello@blurrdstudio.com'],
      subject: `New Contract Generated - ${companyName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>New Self-Service Contract</h2>
            <p><strong>Client:</strong> ${clientName}</p>
            <p><strong>Email:</strong> ${to}</p>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Total:</strong> $${totalAmount.toLocaleString()}</p>
            
            <h3>Services:</h3>
            <ul>
              ${services.map(service => `<li>${service}</li>`).join('')}
            </ul>
            
            <p>Contract PDF is attached.</p>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `BlurrdStudio_Contract_${Date.now()}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      clientEmailId: clientEmail.data?.id,
      adminEmailId: adminEmail.data?.id,
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
