const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.sendEmail = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { receiver_email, subject, body_text } = body;

    if (!receiver_email || !subject || !body_text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: receiver_email,
      subject: subject,
      text: body_text,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
        detail: error.message,
      }),
    };
  }
};
