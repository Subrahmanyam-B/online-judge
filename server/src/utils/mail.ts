import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  // upgrade later with STARTTLS
  service: "gmail",
  auth: {
    user: "subrahmanyam.b21@iiits.in",
    pass: "iamironman",
  },
});
