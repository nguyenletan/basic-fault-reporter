# AI Fault Detection Integration Guide

This document explains how to integrate and configure AI-powered fault detection in the Fault Reporter application.

## Overview

The scanning feature allows users to capture photos of equipment (1-3 photos) and analyze them using one of three AI providers:

- **OpenAI GPT-4 Vision**: Advanced image analysis with detailed fault detection
- **Google Gemini Pro Vision**: Multimodal AI for comprehensive equipment inspection
- **Grok Vision**: Real-time analysis with practical maintenance insights

## Setup

### 1. Install Dependencies

The required dependencies are already installed:

- `expo-camera` - For camera functionality
- `expo-image-picker` - For selecting images from gallery

### 2. Configure API Keys

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Add your API keys to the `.env` file:

   ```env
   EXPO_PUBLIC_OPENAI_API_KEY=your_actual_openai_key
   EXPO_PUBLIC_GEMINI_API_KEY=your_actual_gemini_key
   EXPO_PUBLIC_GROK_API_KEY=your_actual_grok_key
   ```

3. Get API keys from:
   - OpenAI: https://platform.openai.com/api-keys
   - Gemini: https://makersuite.google.com/app/apikey
   - Grok: https://x.ai/api

### 3. Important Security Notes

- **Never commit** `.env` file to version control
- The `.env.example` file should only contain placeholder values
- Add `.env` to your `.gitignore` file (it should already be there)

## Usage Flow

1. **Navigate to Equipment Location**
   - User views equipment location details at `/equipment/[id]/location`
   - Clicks "Start Scan" button

2. **Capture Photos**
   - Camera view opens automatically
   - User can take photos (using camera) or pick from gallery
   - Minimum 1 photo, maximum 3 photos
   - Photos can be removed individually

3. **Select AI Provider**
   - Once at least 1 photo is captured, AI provider selection appears
   - User selects from OpenAI, Gemini, or Grok
   - Each provider has a description of its capabilities

4. **Analyze**
   - User clicks "Analyze with AI" button
   - Selected AI provider analyzes the images
   - Results display with detected issues and recommendations

5. **Save or Retry**
   - User can save the analysis (navigates back)
   - Or start a new scan to try again

## Implementation Details

### File Structure

```
app/equipment/[id]/
  ├── location.tsx          # Equipment location screen with "Start Scan" button
  └── scanning.tsx          # Scanning screen with camera and AI analysis

services/
  └── ai-fault-detection.ts # AI integration service
```

### Key Components

#### Scanning Screen (`scanning.tsx`)

- Camera permissions handling
- Photo capture with `expo-camera`
- Image gallery picking with `expo-image-picker`
- Radio button AI provider selection
- Analysis results display

#### AI Service (`ai-fault-detection.ts`)

- `analyzeFaults()` - Main function to analyze photos
- Provider-specific functions:
  - `analyzeWithOpenAI()`
  - `analyzeWithGemini()`
  - `analyzeWithGrok()`
- `convertImageToBase64()` - Helper for image conversion

### Current Status

⚠️ **Development Mode**: The AI service currently returns mock data. To enable live AI analysis:

1. Uncomment the API call code in `/services/ai-fault-detection.ts`
2. Ensure API keys are configured in `.env`
3. Test with each provider to verify integration

### API Integration Examples

#### OpenAI GPT-4 Vision

```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'gpt-4-vision-preview',
    messages: [
      /* ... */
    ],
    max_tokens: 1000,
  }),
});
```

#### Google Gemini Pro Vision

```typescript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        /* ... */
      ],
    }),
  }
);
```

#### Grok Vision

```typescript
const response = await fetch('https://api.x.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'grok-vision-beta',
    messages: [
      /* ... */
    ],
  }),
});
```

## Features

### Camera Features

- ✅ Front/back camera toggle
- ✅ Photo capture with quality control (0.8)
- ✅ Gallery image selection
- ✅ Photo preview and removal
- ✅ Photo count validation (1-3 photos)

### AI Analysis Features

- ✅ Three AI provider options
- ✅ Provider-specific descriptions
- ✅ Loading states during analysis
- ✅ Error handling
- ✅ Results display with formatted output
- ✅ Save functionality

### User Experience

- ✅ Permission handling with clear messaging
- ✅ Progressive disclosure (camera → photos → AI selection → analysis)
- ✅ Disabled states for buttons when requirements not met
- ✅ Loading indicators during processing
- ✅ Success/error alerts

## Future Enhancements

- [ ] Persist analysis results to database
- [ ] Generate work orders from analysis
- [ ] Support for video recording
- [ ] Batch analysis of multiple equipment
- [ ] Historical analysis comparison
- [ ] Offline mode with queued analysis
- [ ] Custom AI prompts per equipment type
- [ ] Multi-language support for results

## Troubleshooting

### Camera Not Working

- Check device permissions in Settings
- Verify `expo-camera` is properly installed
- Test on physical device (some emulators have camera issues)

### API Errors

- Verify API keys are correct in `.env`
- Check API key has sufficient credits
- Ensure network connectivity
- Check API endpoint URLs are current

### Image Upload Issues

- Verify images are under API size limits
- Check image format compatibility
- Ensure base64 conversion is working

## Support

For issues or questions:

1. Check the Expo Camera docs: https://docs.expo.dev/versions/latest/sdk/camera/
2. Review AI provider documentation
3. Check application logs for detailed error messages
