# Converting AAB to APK Guide

This guide explains how to convert an Android App Bundle (AAB) file to APK format for testing and distribution.

## Method 1: Using bundletool (Recommended)

Bundletool is Google's official command-line tool for working with AAB files.

### Steps:

1. **Download bundletool**

Download manually from: https://github.com/google/bundletool/releases

Or using PowerShell (Windows):

```powershell
Invoke-WebRequest -Uri "https://github.com/google/bundletool/releases/latest/download/bundletool-all.jar" -OutFile "bundletool-all.jar"
```

Or using bash (WSL/Git Bash):

```bash
wget https://github.com/google/bundletool/releases/latest/download/bundletool-all.jar
```

2. **Generate APKs from AAB**

**Windows (Command Prompt/PowerShell):**

```cmd
java -jar bundletool-all.jar build-apks --bundle=your-app.aab --output=your-app.apks --mode=universal
```

**Linux/Mac/WSL:**

```bash
java -jar bundletool-all.jar build-apks \
  --bundle=your-app.aab \
  --output=your-app.apks \
  --mode=universal
```

This creates a universal APK that works on all devices.

3. **Extract the APK**

The `.apks` file is actually a zip file. You can extract it using:

**Option A - Windows File Explorer:**

1. Rename `your-app.apks` to `your-app.zip`
2. Right-click and select "Extract All..."
3. The universal APK will be in the extracted folder at `universal.apk`

**Option B - PowerShell (Windows):**

```powershell
Expand-Archive -Path your-app.apks -DestinationPath output
# The universal APK will be in output\universal.apk
```

**Option C - 7-Zip or WinRAR (Windows):**

1. Right-click on `your-app.apks`
2. Select "Extract to..." with 7-Zip or WinRAR
3. The universal APK will be in the extracted folder

**Option D - Linux/Mac/WSL:**

```bash
unzip your-app.apks -d output
# The universal APK will be in output/universal.apk
```

4. **Install the APK**

```bash
# Option A: Install using ADB
adb install output/universal.apk

# Option B: Install directly from .apks file
java -jar bundletool-all.jar install-apks --apks=your-app.apks
```

## Method 2: Using EAS Build with APK Profile

Modify your EAS build configuration to build APK directly instead of AAB.

### Steps:

1. **Edit `eas.json`**

Add or modify the build profile:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

2. **Rebuild with APK format**

```bash
npx eas build --platform android --profile preview
```

This will generate an APK file directly instead of AAB.

## Method 3: Local Build

If you want to build APK locally without EAS:

```bash
# Build release APK locally
npx expo run:android --variant release

# The APK will be in:
# android/app/build/outputs/apk/release/app-release.apk
```

## Installing APK on Android Device

### Using ADB (Android Debug Bridge)

```bash
# Install APK
adb install path/to/your-app.apk

# If multiple devices connected
adb devices
adb -s DEVICE_ID install path/to/your-app.apk
```

### Manual Installation

1. Transfer the APK file to your Android device
2. Enable "Install from Unknown Sources" in device settings
3. Use a file manager to navigate to the APK file
4. Tap the APK file to install

## Notes

- **AAB vs APK**: AAB is required for Google Play Store, but APK is easier for testing and direct distribution
- **Universal APK**: Works on all device configurations but may be larger than device-specific APKs
- **Signing**: Make sure your AAB/APK is properly signed for production builds
