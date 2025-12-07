# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Building APK for Android

### Option 1: EAS Build (Recommended)

EAS Build handles everything in the cloud - no local Android setup required.

1. **Install EAS CLI** (if not already installed):

   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:

   ```bash
   eas login
   ```

3. **Configure EAS Build**:

   ```bash
   eas build:configure
   ```

4. **Build APK** (for testing/distribution outside Play Store):

   ```bash
   t
   ```

   Or for production AAB (for Google Play Store):

   ```bash
   eas build -p android --profile production
   ```

   Or for both platforms:

   ```bash
   eas build --platform all
   ```

   Or for both platforms using workflow:

   ```bash
   npx eas-cli@latest workflow:run create-production-builds.yml
   ```

The build happens in the cloud and you'll receive a download link when complete.

### Option 2: Local Build

For local development builds, you'll need to set up Android development environment on your machine.

#### Prerequisites

1. **Java Development Kit (JDK)**
   - Install JDK 17 or higher
   - Download from: https://adoptium.net/

2. **Android Studio**
   - Download from: https://developer.android.com/studio
   - During installation, make sure to install:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

3. **Environment Variables** (Add to your `.bashrc` or `.zshrc`):

   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

   For Windows, set these in System Environment Variables:
   - `ANDROID_HOME`: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   - Add to PATH: `%ANDROID_HOME%\platform-tools`, `%ANDROID_HOME%\emulator`, `%ANDROID_HOME%\tools`

#### Building Methods

**Method 1: Development Build (Recommended for testing)**

```bash
npx expo run:android
```

This will generate the `android/` folder, build, and install on your connected device/emulator.

**Method 2: Release APK**

```bash
# Generate the Android project
npx expo prebuild

# Build the release APK
cd android
./gradlew assembleRelease
```

The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

**Method 3: Using EAS Build Locally**

```bash
# Build locally with EAS
eas build --platform android --local
```

#### Connect a Device

**Physical Device:**

1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Run `adb devices` to verify connection

**Emulator:**

1. Open Android Studio
2. Go to Tools > Device Manager
3. Create/Start an Android Virtual Device (AVD)

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
