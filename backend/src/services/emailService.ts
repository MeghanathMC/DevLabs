import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || this.stripHtml(options.html)
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${options.to}`);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    const subject = 'Welcome to DevLabs!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to DevLabs, ${firstName}!</h1>
        <p>Thank you for joining DevLabs - the platform for showcasing your hackathon projects and achievements.</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Complete your profile with your skills and social links</li>
          <li>Add your first hackathon project</li>
          <li>Upload your achievements and certificates</li>
          <li>Customize your portfolio with our beautiful templates</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The DevLabs Team</p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const subject = 'Reset Your DevLabs Password';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Reset Your Password</h1>
        <p>You requested a password reset for your DevLabs account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Reset Password</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>The DevLabs Team</p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }

  async sendEmailVerification(email: string, verificationToken: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const subject = 'Verify Your DevLabs Email';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Verify Your Email</h1>
        <p>Please verify your email address to complete your DevLabs registration.</p>
        <p>Click the button below to verify your email:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Verify Email</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${verificationUrl}</p>
        <p>Best regards,<br>The DevLabs Team</p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }

  async sendPortfolioViewNotification(email: string, firstName: string, viewerInfo: any): Promise<void> {
    const subject = 'Someone Viewed Your Portfolio!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Portfolio View Alert</h1>
        <p>Hi ${firstName},</p>
        <p>Someone just viewed your portfolio!</p>
        <p><strong>View Details:</strong></p>
        <ul>
          <li>Time: ${new Date().toLocaleString()}</li>
          <li>Location: ${viewerInfo.location || 'Unknown'}</li>
          <li>Referrer: ${viewerInfo.referrer || 'Direct'}</li>
        </ul>
        <p>Keep up the great work on your portfolio!</p>
        <p>Best regards,<br>The DevLabs Team</p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }
}

export default new EmailService(); 