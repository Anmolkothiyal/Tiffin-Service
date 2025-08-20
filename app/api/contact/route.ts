import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import pool from "../../lib/db";

// Create email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "anmolkothiyal2021@gmail.com",
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Email templates
function createAdminEmailTemplate(data: any) {
  return {
    subject: `🍽️ New Contact Form Submission - ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${
                  data.name
                }</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${
                  data.email
                }" style="color: #ff6b35;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${
                  data.phone
                }" style="color: #ff6b35;">${data.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Subject:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${
                  data.subject
                }</td>
              </tr>
            </table>
          </div>
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #ff6b35;">
              <p style="margin: 0; line-height: 1.6; color: #555;">${data.message.replace(
                /\n/g,
                "<br>"
              )}</p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 14px;">
              Submitted on ${new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    `,
  };
}

function createCustomerEmailTemplate(data: any) {
  return {
    subject: `Thank you for contacting Rakshit Tiffin Service! 🍽️`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Thank You for Reaching Out!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333;">Hi ${data.name}! 👋</h2>
            <p style="color: #555; line-height: 1.6;">
              Thank you for contacting <strong>Rakshit Tiffin Service</strong>! We have received your message and our team will get back to you soon.
            </p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #ff6b35; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #333;">Your Message Summary:</h4>
              <p style="margin: 0; color: #666;"><strong>Subject:</strong> ${
                data.subject
              }</p>
              <p style="margin: 5px 0 0 0; color: #666;"><strong>Message:</strong> ${data.message.substring(
                0,
                100
              )}${data.message.length > 100 ? "..." : ""}</p>
            </div>
          </div>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Need Immediate Assistance?</h3>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px;">
                <p style="margin: 5px 0; color: #555;">📞 <strong>Phone:</strong> <a href="tel:+919627669554" style="color: #ff6b35;">+91 962 766 9554</a></p>
                <p style="margin: 5px 0; color: #555;">💬 <strong>WhatsApp:</strong> <a href="https://wa.me/+919627669554"  target="_blank" style="color: #ff6b35;">Chat with us</a></p>
              </div>
            </div>
          </div>
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Our Delivery Times:</h3>
            <ul style="color: #555; line-height: 1.8;">
              <li><strong>Lunch:</strong> 11:00 AM - 2:00 PM</li>
              <li><strong>Dinner:</strong> 6:00 PM - 9:00 PM</li>
              <li><strong>Support:</strong> Mon-Sun, 8:00 AM - 10:00 PM</li>
            </ul>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 14px;">
              Best regards,<br>
              <strong>Rakshit Tiffin Service Team</strong>
            </p>
          </div>
        </div>
      </div>
    `,
  };
}

// Send email function with better error handling
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const mailOptions = {
      from: `"Rakshit Tiffin Service" <${
        process.env.SMTP_USER || "anmolkothiyal2021@gmail.com"
      }>`,
      to,
      subject,
      html,
    };

    console.log("Attempting to send email to:", to);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}

// Validation function with proper types
interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function validateContactData(data: any): string[] {
  const errors: string[] = [];

  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length < 2
  ) {
    errors.push("Name must be at least 2 characters long");
  }

  if (
    !data.email ||
    typeof data.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.push("Valid email address is required");
  }

  if (
    !data.phone ||
    typeof data.phone !== "string" ||
    !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(data.phone)
  ) {
    errors.push("Valid phone number is required");
  }

  if (
    !data.subject ||
    typeof data.subject !== "string" ||
    data.subject.trim().length < 3
  ) {
    errors.push("Subject must be at least 3 characters long");
  }

  if (
    !data.message ||
    typeof data.message !== "string" ||
    data.message.trim().length < 5
  ) {
    errors.push("Message must be at least 5 characters long");
  }

  return errors;
}

export async function POST(request: NextRequest) {
  let client;

  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate the data
    const validationErrors = validateContactData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData: ContactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    // Insert into database
    client = await pool.connect();

    const query = `
      INSERT INTO contacts (name, email, phone, subject, message, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id, created_at
    `;

    const values = [
      sanitizedData.name,
      sanitizedData.email,
      sanitizedData.phone,
      sanitizedData.subject,
      sanitizedData.message,
    ];

    const result = await client.query(query, values);
    const insertedContact = result.rows[0];

    // Send email notifications
    const adminEmail = createAdminEmailTemplate(sanitizedData);
    const customerEmail = createCustomerEmailTemplate(sanitizedData);
    const adminEmailResult = await sendEmail(
      process.env.ADMIN_EMAIL || "anmolkothiyal2021@gmail.com",
      adminEmail.subject,
      adminEmail.html
    );
    console.log("Admin email result:", adminEmailResult);
    const customerEmailResult = await sendEmail(
      sanitizedData.email,
      customerEmail.subject,
      customerEmail.html
    );
    console.log("Customer email result:", customerEmailResult);

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      data: {
        id: insertedContact.id,
        createdAt: insertedContact.created_at,
        emailStatus: {
          adminEmail: adminEmailResult.success,
          customerEmail: customerEmailResult.success,
        },
      },
    });
  } catch (error) {
    console.error("Contact form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : undefined,
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function GET(request: NextRequest) {
  let client;

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "10"))
    );
    const offset = (page - 1) * limit;

    client = await pool.connect();

    const countQuery = "SELECT COUNT(*) FROM contacts";
    const countResult = await client.query(countQuery);
    const totalContacts = parseInt(countResult.rows[0].count);

    const query = `
      SELECT id, name, email, phone, subject, message, created_at
      FROM contacts
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const result = await client.query(query, [limit, offset]);

    return NextResponse.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total: totalContacts,
        totalPages: Math.ceil(totalContacts / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch contacts",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : undefined,
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}
