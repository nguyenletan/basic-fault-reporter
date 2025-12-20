/**
 * AI Fault Detection Service
 *
 * This service provides integration with multiple AI providers (OpenAI, Gemini, Grok)
 * for analyzing equipment images and detecting potential faults.
 */

import { buildAnalysisPrompt } from './prompts/ai-fault-analysis-prompts';

export type AIProvider = 'openai' | 'gemini' | 'grok';

export interface FaultAnalysisRequest {
  imageUris: string[];
  provider: AIProvider;
  equipmentId: string;
  equipmentType?: string;
  videoUri?: string;
}

export interface FaultAnalysisResponse {
  success: boolean;
  data?: {
    provider: AIProvider;
    analysis: string;
    detectedIssues: string[];
    recommendations: string[];
    severity: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    timestamp: string;
  };
  error?: string;
}

/**
 * Analyzes equipment images using the specified AI provider
 */
export const analyzeFaults = async (
  request: FaultAnalysisRequest
): Promise<FaultAnalysisResponse> => {
  try {
    const { imageUris, provider, equipmentId, videoUri } = request;

    // Validate inputs
    if (!imageUris || imageUris.length === 0) {
      return {
        success: false,
        error: 'No images provided for analysis',
      };
    }

    if (imageUris.length > 10) {
      return {
        success: false,
        error: 'Maximum 10 images allowed per analysis',
      };
    }

    // Call the appropriate AI service based on provider
    switch (provider) {
      case 'openai':
        return await analyzeWithOpenAI(imageUris, equipmentId, videoUri);
      case 'gemini':
        return await analyzeWithGemini(imageUris, equipmentId, videoUri);
      case 'grok':
        return await analyzeWithGrok(imageUris, equipmentId, videoUri);
      default:
        return {
          success: false,
          error: 'Invalid AI provider specified',
        };
    }
  } catch (error) {
    console.error('Error in fault analysis:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * OpenAI GPT-4 Vision Analysis
 */
const analyzeWithOpenAI = async (
  imageUris: string[],
  equipmentId: string,
  videoUri?: string
): Promise<FaultAnalysisResponse> => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error:
          'OpenAI API key not configured. Please add EXPO_PUBLIC_OPENAI_API_KEY to your .env file.',
      };
    }

    // Convert local image URIs to base64
    const base64Images = await Promise.all(
      imageUris.map(async (uri) => {
        const base64 = await convertImageToBase64(uri);
        return `data:image/jpeg;base64,${base64}`;
      })
    );

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: buildAnalysisPrompt(!!videoUri),
              },
              ...base64Images.map((imageData) => ({
                type: 'image_url',
                image_url: { url: imageData },
              })),
            ],
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return {
        success: false,
        error: `OpenAI API error: ${errorData.error?.message || response.statusText}`,
      };
    }

    const data = await response.json();
    const analysisText = data.choices[0]?.message?.content || 'No analysis generated';

    // Parse the response to extract issues and recommendations
    const detectedIssues = extractIssues(analysisText);
    const recommendations = extractRecommendations(analysisText);
    const severity = determineSeverity(analysisText);

    return {
      success: true,
      data: {
        provider: 'openai',
        analysis: analysisText,
        detectedIssues,
        recommendations,
        severity,
        confidence: 0.85,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('OpenAI analysis error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze with OpenAI',
    };
  }
};

/**
 * Google Gemini Pro Vision Analysis
 */
const analyzeWithGemini = async (
  imageUris: string[],
  equipmentId: string,
  videoUri?: string
): Promise<FaultAnalysisResponse> => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error:
          'Gemini API key not configured. Please add EXPO_PUBLIC_GEMINI_API_KEY to your .env file.',
      };
    }

    // Convert local image URIs to base64 (without data URI prefix for Gemini)
    const base64Images = await Promise.all(imageUris.map((uri) => convertImageToBase64(uri)));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: buildAnalysisPrompt(!!videoUri),
                },
                ...base64Images.map((base64Data) => ({
                  inline_data: {
                    mime_type: 'image/jpeg',
                    data: base64Data,
                  },
                })),
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return {
        success: false,
        error: `Gemini API error: ${errorData.error?.message || response.statusText}`,
      };
    }

    const data = await response.json();
    const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis generated';

    // Parse the response to extract issues and recommendations
    const detectedIssues = extractIssues(analysisText);
    const recommendations = extractRecommendations(analysisText);
    const severity = determineSeverity(analysisText);

    return {
      success: true,
      data: {
        provider: 'gemini',
        analysis: analysisText,
        detectedIssues,
        recommendations,
        severity,
        confidence: 0.82,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Gemini analysis error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze with Gemini',
    };
  }
};

/**
 * Grok Vision Analysis
 */
const analyzeWithGrok = async (
  imageUris: string[],
  equipmentId: string,
  videoUri?: string
): Promise<FaultAnalysisResponse> => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_GROK_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error:
          'Grok API key not configured. Please add EXPO_PUBLIC_GROK_API_KEY to your .env file.',
      };
    }

    // Convert local image URIs to base64
    const base64Images = await Promise.all(
      imageUris.map(async (uri) => {
        const base64 = await convertImageToBase64(uri);
        return `data:image/jpeg;base64,${base64}`;
      })
    );

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-vision-beta',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: buildAnalysisPrompt(!!videoUri),
              },
              ...base64Images.map((imageData) => ({
                type: 'image_url',
                image_url: { url: imageData },
              })),
            ],
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Grok API error:', errorData);
      return {
        success: false,
        error: `Grok API error: ${errorData.error?.message || response.statusText}`,
      };
    }

    const data = await response.json();
    const analysisText = data.choices?.[0]?.message?.content || 'No analysis generated';

    // Parse the response to extract issues and recommendations
    const detectedIssues = extractIssues(analysisText);
    const recommendations = extractRecommendations(analysisText);
    const severity = determineSeverity(analysisText);

    return {
      success: true,
      data: {
        provider: 'grok',
        analysis: analysisText,
        detectedIssues,
        recommendations,
        severity,
        confidence: 0.8,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Grok analysis error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze with Grok',
    };
  }
};

/**
 * Helper function to convert local image URI to base64
 * (Useful for API calls that require base64 encoded images)
 */
export const convertImageToBase64 = async (uri: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]); // Remove data:image/jpeg;base64, prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

/**
 * Extract detected issues from AI analysis text
 */
const extractIssues = (text: string): string[] => {
  const issues: string[] = [];

  // Look for common patterns indicating issues
  const patterns = [
    /(?:issues?|problems?|defects?|faults?)[\s:]*\n([\s\S]*?)(?:\n\n|recommendations?|suggestions?)/i,
    /(?:detected|found|identified)[\s:]*\n([\s\S]*?)(?:\n\n|recommendations?)/i,
    /⚠️?\s*(?:potential\s+)?(?:issues?|problems?)[\s:]*\n([\s\S]*?)(?:\n\n|📋|💡|🔧)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const lines = match[1]
        .split('\n')
        .map((line) => line.trim().replace(/^[-•*]\s*/, ''))
        .filter((line) => line.length > 0 && !line.match(/^[0-9]+\./));

      if (lines.length > 0) {
        issues.push(...lines);
        break;
      }
    }
  }

  // If no structured issues found, return a generic entry
  if (issues.length === 0) {
    issues.push('Analysis completed - check full report for details');
  }

  return issues.slice(0, 10); // Limit to 10 issues
};

/**
 * Extract recommendations from AI analysis text
 */
const extractRecommendations = (text: string): string[] => {
  const recommendations: string[] = [];

  // Look for common patterns indicating recommendations
  const patterns = [
    /(?:recommendations?|suggestions?|actions?)[\s:]*\n([\s\S]*?)(?:\n\n|$)/i,
    /(?:suggested|recommended)\s+(?:actions?|steps?)[\s:]*\n([\s\S]*?)(?:\n\n|$)/i,
    /📋\s*(?:recommendations?|actions?)[\s:]*\n([\s\S]*?)(?:\n\n|$)/i,
    /💡\s*(?:suggested\s+)?actions?[\s:]*\n([\s\S]*?)(?:\n\n|$)/i,
    /🔧\s*(?:action\s+)?items?[\s:]*\n([\s\S]*?)(?:\n\n|$)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const lines = match[1]
        .split('\n')
        .map((line) =>
          line
            .trim()
            .replace(/^[0-9]+\.\s*/, '')
            .replace(/^[-•*]\s*/, '')
        )
        .filter((line) => line.length > 0);

      if (lines.length > 0) {
        recommendations.push(...lines);
        break;
      }
    }
  }

  // If no structured recommendations found, return a generic entry
  if (recommendations.length === 0) {
    recommendations.push('Review full analysis for maintenance guidance');
  }

  return recommendations.slice(0, 10); // Limit to 10 recommendations
};

/**
 * Determine severity level from AI analysis text
 */
const determineSeverity = (text: string): 'low' | 'medium' | 'high' | 'critical' => {
  const lowerText = text.toLowerCase();

  // Check for critical indicators
  if (
    lowerText.includes('critical') ||
    lowerText.includes('urgent') ||
    lowerText.includes('immediate attention') ||
    lowerText.includes('safety hazard') ||
    lowerText.includes('emergency')
  ) {
    return 'critical';
  }

  // Check for high severity indicators
  if (
    lowerText.includes('high severity') ||
    lowerText.includes('significant') ||
    lowerText.includes('major') ||
    lowerText.includes('serious') ||
    lowerText.includes('substantial')
  ) {
    return 'high';
  }

  // Check for low severity indicators
  if (
    lowerText.includes('low severity') ||
    lowerText.includes('minor') ||
    lowerText.includes('slight') ||
    lowerText.includes('cosmetic') ||
    lowerText.includes('minimal')
  ) {
    return 'low';
  }

  // Default to medium
  return 'medium';
};
