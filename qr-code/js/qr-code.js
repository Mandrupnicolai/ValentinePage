// QR Code Module
// This module handles QR code generation and management
// Generates QR codes that link to the flower voucher redemption page

// External library: QRCode.js (CDN based)
// Add to HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

export function initQRCode() {
  console.log('QR Code module initialized');
}

/**
 * Generate a QR code that encodes a URL to the redemption page
 * @param {string} elementId - The ID of the element to insert the QR code into
 * @param {string} phoneNumber - Phone number for SMS redemption (optional)
 */
export function generateFlowerVoucherQR(elementId, phoneNumber = null) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found`);
    return;
  }

  // Clear previous QR code if exists
  element.innerHTML = '';

  // Construct the redemption URL
  // In production, this would include a unique redemption token/ID
  const baseUrl = window.location.origin;
  const redemptionUrl = `${baseUrl}/redeem.html?gift=flowers&phone=${encodeURIComponent(phoneNumber || '')}`;

  // Create QR code using QRCode library
  // If QRCode is not loaded from CDN, show placeholder
  if (typeof QRCode !== 'undefined') {
    new QRCode(element, {
      text: redemptionUrl,
      width: 112,
      height: 112,
      colorDark: '#D4145A',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    console.warn('QRCode library not loaded. Using placeholder.');
  }
}

/**
 * Send SMS notification to user after redemption
 * @param {string} phoneNumber - The phone number to send SMS to
 * @param {string} message - The message to send
 */
export async function sendRedemptionSMS(phoneNumber, message = null) {
  if (!phoneNumber) {
    console.error('Phone number is required for SMS redemption');
    return false;
  }

  const smsMessage = message || 'Your flower voucher has been redeemed! Thank you for being my Valentine! 💐';

  try {
    // Call backend API to send SMS
    // This requires a backend endpoint that integrates with Twilio or similar service
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        message: smsMessage,
        type: 'flower-voucher-redemption'
      })
    });

    if (!response.ok) {
      throw new Error(`SMS sending failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('SMS sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    // Fallback: Show message that would normally be sent
    console.log('SMS Message (fallback):', smsMessage);
    return false;
  }
}

/**
 * Handle flower voucher redemption
 * @param {string} phoneNumber - The phone number to send confirmation to
 */
export async function redeemFlowerVoucher(phoneNumber) {
  try {
    // Send SMS notification
    const smsSent = await sendRedemptionSMS(phoneNumber);

    // Log redemption to backend
    const logResponse = await fetch('/api/redeem-voucher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        voucherType: 'flowers',
        phoneNumber: phoneNumber,
        timestamp: new Date().toISOString(),
        smsSent: smsSent
      })
    });

    if (!logResponse.ok) {
      console.warn('Failed to log redemption');
    }

    return true;
  } catch (error) {
    console.error('Error redeeming voucher:', error);
    return false;
  }
}
