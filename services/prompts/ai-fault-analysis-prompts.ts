/**
 * AI Fault Analysis Prompts
 *
 * Centralized prompt templates for AI-powered equipment fault detection.
 * These prompts are used across all AI providers (OpenAI, Gemini, Grok).
 */

/**
 * Main equipment analysis prompt
 * Instructs the AI to analyze equipment images and provide structured fault analysis
 */
export const EQUIPMENT_ANALYSIS_PROMPT = `You are an expert equipment maintenance technician. Analyze the provided equipment images for potential faults, defects, or maintenance issues.

Please provide:
1. Overall equipment status and condition
2. Identified components visible in the images
3. Potential issues or defects detected
4. Maintenance recommendations
5. Severity assessment (low/medium/high/critical)

Format your response clearly with sections for detected issues and recommendations.`;

/**
 * Video recording note
 * Additional context added when a video recording is included with the analysis
 */
export const VIDEO_RECORDING_NOTE = `
You are an expert mechanical and electronic diagnostic engineer. Analyze the provided video and audio.
  1. Identify all rhythmic and non-rhythmic sounds (e.g., grinding, clicking).
  2. Locate visual anomalies at specific timestamps.
  3. Correlate the audio with the visuals.
  4. Provide a fault prediction with a 'Confidence Score' and suggest the most likely root cause.
NOTE: A video recording of abnormal sound has been captured and is available for reference. Please consider potential sound-related issues (vibration, loose components, bearing wear, etc.) in your analysis.`;

/**
 * Builds the complete analysis prompt with optional video note
 * @param hasVideo - Whether a video recording is included
 * @returns The complete prompt text
 */
export const buildAnalysisPrompt = (hasVideo: boolean = false): string => {
  return EQUIPMENT_ANALYSIS_PROMPT + (hasVideo ? '\n\n' + VIDEO_RECORDING_NOTE : '');
};
