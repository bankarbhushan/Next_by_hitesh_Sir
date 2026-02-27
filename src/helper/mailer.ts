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

    if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
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
        user: 'YOUR_USER',
        pass: 'YOUR_PASS'
      }
    });

    const mailOptions = {
      from: 'your@email.com',
      to: email,
      subject:
        emailType === 'VERIFY'
          ? 'Verify Your Email'
          : 'Reset Your Password',
      html: `<p>
        Click 
        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
        here
        </a> 
        to ${
          emailType === 'VERIFY'
            ? 'verify your email'
            : 'reset your password'
        }
      </p>`
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