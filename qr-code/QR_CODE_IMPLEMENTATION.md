# QR Code Implementation Guide

## Overview

The QR code feature enables users to share flower vouchers via QR codes. When scanned, the QR code directs users to a redemption page where they can claim their gift by entering a phone number.

## Architecture

### Files Involved

1. **valentine.html** - Main application with QR code generation in flower modal
2. **redeem.html** - Redemption page with voucher display and redeem button
3. **qr-code/js/qr-code.js** - QR code generation and SMS logic
4. **qr-code/styles/qr-code.css** - QR code layout styling

### Workflow

```
User clicks "Yes" 
    ↓
Gifts page opens
    ↓
User clicks flower gift
    ↓
Flower modal opens with QR code
    ↓
User scans QR code with phone
    ↓
Redirects to redeem.html
    ↓
User enters phone number and clicks "Redeem"
    ↓
SMS notification sent + redemption logged
```

## Technical Implementation

### QR Code Generation (valentine.html)

When the flower modal opens:

```javascript
const baseUrl = window.location.origin;
const redemptionUrl = baseUrl + '/redeem.html?gift=flowers';
new QRCode(qrWrapper, {
  text: redemptionUrl,
  width: 112,
  height: 112,
  colorDark: '#D4145A',
  colorLight: '#ffffff',
  correctLevel: QRCode.CorrectLevel.H
});
```

**Library**: [QRCode.js](https://davidshimjs.github.io/qrcodejs/)
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js`
- Generates SVG-based QR codes (can be scanned by any smartphone camera)

### Redemption Page (redeem.html)

Features:
- Beautiful, consistent styling matching valentine.html
- Phone number input field
- Redeem button with loading state
- Success/error message feedback
- Floating background effects (hearts, sparkles)

### SMS Integration

#### Backend API Endpoint (to be implemented)

```javascript
POST /api/redeem-voucher
Content-Type: application/json

{
  "voucherType": "flowers",
  "phoneNumber": "+1 (555) 123-4567",
  "timestamp": "2026-01-15T12:30:00Z"
}
```

The backend should:
1. Validate the phone number
2. Send SMS via Twilio or similar service
3. Log the redemption in database
4. Return success/failure status

#### SMS Message Template

```
Your flower voucher has been redeemed! Thank you for being my Valentine! 💐
```

## Current Testing Mode

Since the backend API is not yet implemented, the redemption process simulates success:

1. **No /api/redeem-voucher endpoint** → Automatic 404 response
2. **Simulation kicks in** → Logs redemption locally
3. **User sees success message** → Ready for real SMS integration

## Future Enhancement: SMS Service Integration

To enable real SMS functionality:

### Option 1: Twilio

```javascript
// Backend (Node.js/Express example)
const twilio = require('twilio');

app.post('/api/redeem-voucher', async (req, res) => {
  const { phoneNumber, voucherType } = req.body;
  
  const client = twilio(accountSid, authToken);
  
  try {
    await client.messages.create({
      body: 'Your flower voucher has been redeemed! Thank you for being my Valentine! 💐',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    
    // Log to database
    await saveRedemption(phoneNumber, voucherType);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Option 2: AWS SNS

```javascript
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

await sns.publish({
  Message: 'Your flower voucher has been redeemed! Thank you for being my Valentine! 💐',
  PhoneNumber: phoneNumber
}).promise();
```

## QR Code Module Functions

Located in `qr-code/js/qr-code.js`:

### `generateFlowerVoucherQR(elementId, phoneNumber)`
Generates a QR code linking to the redemption page.

**Parameters:**
- `elementId` (string) - HTML element ID to render QR code
- `phoneNumber` (string, optional) - Pre-fill phone in redemption URL

### `sendRedemptionSMS(phoneNumber, message)`
Sends SMS confirmation after redemption.

**Parameters:**
- `phoneNumber` (string) - Recipient phone number
- `message` (string, optional) - Custom message text

**Returns:** Promise<boolean>

### `redeemFlowerVoucher(phoneNumber)`
Handles complete redemption flow (SMS + logging).

**Parameters:**
- `phoneNumber` (string) - User's phone number

**Returns:** Promise<boolean>

## Security Considerations

- Validate phone numbers on backend before sending SMS
- Rate limit SMS endpoints to prevent abuse
- Use environment variables for Twilio credentials
- Log all redemptions with timestamps
- Consider CAPTCHA for redemption form
- Implement token-based redemption to prevent duplicates

## Testing Checklist

- [ ] QR code displays in flower modal
- [ ] QR code is scannable with phone camera
- [ ] Scanning redirects to redeem.html
- [ ] Phone number input validates
- [ ] Redeem button shows loading state
- [ ] Success message appears on redemption
- [ ] Backend SMS API receives requests
- [ ] SMS messages are sent to phone number
- [ ] Redemptions are logged in database
- [ ] UI works on mobile devices

## Deployment Checklist

1. Add Twilio/SNS credentials to environment variables
2. Deploy backend API endpoints (/api/redeem-voucher)
3. Test SMS sending in production
4. Update redemption URL in valentine.html if needed
5. Monitor SMS delivery rates
6. Set up error logging and alerts
7. Enable CORS for cross-origin requests if needed

## Browser Compatibility

- QRCode.js supports all modern browsers
- Works on iOS (Safari, Camera app)
- Works on Android (Chrome, native apps)
- Requires JavaScript enabled

## File Sizes

- QR Code library (CDN): ~10 KB
- QR Code CSS: ~1.2 KB
- QR Code JS module: ~2.5 KB
- redeem.html: ~9 KB

Total additional load: ~22 KB (network request)
