/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 12 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Environment Configuration
dotenv.config();

// Configuration
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate Content
async function main(prompt) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });

  return response.text;
}

// Export
export default main;
