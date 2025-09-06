import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAccessEmail(email: string, name: string, accessUrl: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[EMAIL] Would send access email to ${email} (${name}): ${accessUrl}`)
    return { success: true }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'workshop@example.com',
      to: [email],
      subject: 'Your Workshop Access Link',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to the Workshop!</h1>
          <p>Hi ${name},</p>
          <p>Thank you for signing up for our workshop. You can now access all the learning materials.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${accessUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Start Learning
            </a>
          </div>
          <p>This link will remain active for 90 days.</p>
          <p>Best regards,<br>The Workshop Team</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}


