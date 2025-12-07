# Mock API Demo Guide

This guide explains how to use the mock API for demo purposes when you don't have access to a real CMMS/IWMS/CAFM/BEE system.

## Configuration

The app is configured to use mock data by default. The mock mode is controlled by the `EXPO_PUBLIC_USE_MOCK_API` environment variable.

### Enable Mock Mode (Default)

Mock mode is enabled by default. No configuration needed!

### Disable Mock Mode (Use Real API)

To use a real API, create a `.env` file in the project root:

```env
EXPO_PUBLIC_USE_MOCK_API=false
EXPO_PUBLIC_API_BASE_URL=https://your-real-api.com
```

## Mock Equipment Codes

The following equipment codes are available in the mock data. You can scan QR codes containing these codes:

### Available Equipment

| Code       | Name                   | Status            | Category           | Assignment             |
| ---------- | ---------------------- | ----------------- | ------------------ | ---------------------- |
| **EQ-001** | HVAC Unit - North Wing | ✅ Operational    | HVAC               | ✅ **Assigned to You** |
| **EQ-002** | Chiller Unit - Main    | ⚠️ Maintenance    | Chiller            | ❌ Not Assigned        |
| **EQ-003** | Emergency Generator    | ✅ Operational    | Power Systems      | ✅ **Assigned to You** |
| **EQ-004** | Elevator - Main Lobby  | ✅ Operational    | Vertical Transport | ✅ **Assigned to You** |
| **EQ-005** | Fire Pump - Primary    | 🔴 Offline        | Fire Safety        | ❌ Not Assigned        |
| **EQ-006** | Boiler - Building Heat | ⚫ Decommissioned | HVAC               | ❌ Not Assigned        |

### Assignment Verification

When you scan a QR code, the app will:

1. Fetch the equipment details from the API
2. **Verify if the equipment is assigned to you**
3. Display a **success dialog** if assigned, or a **warning dialog** if not assigned
4. Show an assignment badge on the equipment details card

## How to Generate QR Codes for Testing

### Method 1: Online QR Code Generator

1. Visit [QR Code Generator](https://www.qr-code-generator.com/) or [QRCode Monkey](https://www.qrcode-monkey.com/)
2. Enter one of the equipment codes (e.g., `EQ-001`)
3. Generate and download the QR code
4. Display it on another device or print it out
5. Scan it with the app

### Method 2: Using Command Line (Node.js)

If you have Node.js installed, you can generate QR codes using the terminal:

```bash
# Install qrcode package globally
npm install -g qrcode

# Generate QR codes for all equipment
qrcode -o EQ-001.png "EQ-001"
qrcode -o EQ-002.png "EQ-002"
qrcode -o EQ-003.png "EQ-003"
qrcode -o EQ-004.png "EQ-004"
qrcode -o EQ-005.png "EQ-005"
qrcode -o EQ-006.png "EQ-006"
```

### Method 3: Quick Test with Browser

1. Open this URL in your browser: https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=EQ-001
2. This will display a QR code for `EQ-001`
3. Change `EQ-001` to any other code in the URL to generate different QR codes

### Method 4: Simple HTML File

Create an HTML file with this content and open it in your browser:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Equipment QR Codes</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      .qr-container {
        display: inline-block;
        margin: 20px;
        text-align: center;
      }
      img {
        border: 1px solid #ddd;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Equipment QR Codes for Testing</h1>

    <div class="qr-container">
      <h3>EQ-001 - HVAC Unit</h3>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EQ-001" />
      <p>Status: Operational</p>
    </div>

    <div class="qr-container">
      <h3>EQ-002 - Chiller Unit</h3>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EQ-002" />
      <p>Status: Maintenance</p>
    </div>

    <div class="qr-container">
      <h3>EQ-003 - Generator</h3>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EQ-003" />
      <p>Status: Operational</p>
    </div>

    <div class="qr-container">
      <h3>EQ-004 - Elevator</h3>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EQ-004" />
      <p>Status: Operational</p>
    </div>

    <div class="qr-container">
      <h3>EQ-005 - Fire Pump</h3>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EQ-005" />
      <p>Status: Offline</p>
    </div>

    <div class="qr-container">
      <h3>EQ-006 - Boiler</h3>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EQ-006" />
      <p>Status: Decommissioned</p>
    </div>
  </body>
</html>
```

## Testing Flow

1. **Start the app**: `npm start`
2. **Navigate to**: Scan Plant screen (`/scanning/scan-plant`)
3. **Tap**: "Start Scanning" button
4. **Grant camera permission** when prompted
5. **Point camera** at one of the QR codes you generated
6. **Wait** for the loading animation (simulates API call - 1.5 seconds)
7. **See the verification dialog**:
   - ✅ **Success Dialog** for assigned equipment (EQ-001, EQ-003, EQ-004)
   - ⚠️ **Warning Dialog** for non-assigned equipment (EQ-002, EQ-005, EQ-006)
8. **View** the equipment details with assignment badge

### What Happens During Scan

**For Assigned Equipment (EQ-001, EQ-003, EQ-004):**

- ✅ Green "Verification Successful!" dialog appears
- Shows "ASSIGNED TO YOU" badge in green
- Full access to create work orders and perform maintenance
- Quick action button to create work order directly from dialog

**For Non-Assigned Equipment (EQ-002, EQ-005, EQ-006):**

- ⚠️ Orange "Not Assigned" dialog appears
- Shows "NOT ASSIGNED" badge in orange
- Can view details but with limited permissions
- Option to request access from the dialog

## Mock Data Details

Each mock equipment includes:

- ✅ Equipment code and name
- ✅ Status (with color coding)
- ✅ Category
- ✅ Location
- ✅ Description
- ✅ Manufacturer and model
- ✅ Serial number
- ✅ Installation date
- ✅ Maintenance dates
- ✅ Assigned personnel
- ✅ Technical specifications

## Customizing Mock Data

### Adding/Modifying Equipment

To add or modify mock equipment, edit `/services/asset.ts` and update the `MOCK_ASSETS` object:

```typescript
const MOCK_ASSETS: Record<string, AssetDetails> = {
  'YOUR-CODE': {
    id: 'unique-id',
    code: 'YOUR-CODE',
    name: 'Your Equipment Name',
    // ... other fields
  },
  // Add more equipment here
};
```

### Changing Assignment Status

To modify which equipment is assigned to you, edit `/services/assigned-equipment.ts`:

```typescript
const ASSIGNED_EQUIPMENT_CODES = [
  'EQ-001', // HVAC Unit - Currently assigned
  'EQ-003', // Emergency Generator - Currently assigned
  'EQ-004', // Elevator - Currently assigned
  // Add more codes here to test assignment verification
];
```

**Testing Assignment Scenarios:**

- Add a code to the array → Equipment will show success dialog
- Remove a code from the array → Equipment will show warning dialog
- This simulates real-world assignment management from your CMMS/IWMS system

## Network Delay Simulation

The mock API simulates a realistic network delay of 1.5 seconds. To adjust this, modify the delay in `/services/asset.ts`:

```typescript
// Change 1500 to your desired delay in milliseconds
await simulateNetworkDelay(1500);
```

## Switching to Real API

When you're ready to connect to a real API:

1. Create a `.env` file:

```env
EXPO_PUBLIC_USE_MOCK_API=false
EXPO_PUBLIC_API_BASE_URL=https://your-api-server.com
```

2. Restart the development server:

```bash
npm start
```

The app will now make real API calls to `GET /asset/details?code=EQUIPMENT_CODE`

## Troubleshooting

### QR Code Not Scanning

- Ensure adequate lighting
- Hold device steady
- Make sure QR code is in focus
- Try increasing QR code size

### Camera Permission Denied

- Check device settings
- Restart the app
- On iOS: Settings > Your App > Camera
- On Android: Settings > Apps > Your App > Permissions

### "Asset not found" Error

- Verify you're using one of the valid codes: EQ-001 through EQ-006
- Check the QR code was generated correctly
- The error message will list valid codes
