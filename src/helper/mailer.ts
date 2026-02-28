import bcryptjs from 'bcryptjs';
import User from '../models/user.model';
import nodemailer from 'nodemailer';

export const sendEmail = async ({
  email,
  emailType,
  userId
}: {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //  Save token based on type
    if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.TRANSPORT_USER,
        pass: process.env.TRANSPORT_PASS
      }
    });

    // Correct redirect URL
    const link =
      emailType === 'VERIFY'
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/reset-password?token=${hashedToken}`;

    const mailOptions = {
      from: 'no-reply@yourapp.com',
      to: email,
      subject:
        emailType === 'VERIFY'
          ? 'Verify Your Email'
          : 'Reset Your Password',
      html: `
        <p>
          Click 
          <a href="${link}">here</a>
          to ${
            emailType === 'VERIFY'
              ? 'verify your email'
              : 'reset your password'
          }.
          <br /><br />
          Or copy this link:
          <br />
          ${link}
        </p>
      `
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Something went wrong');
  }
};