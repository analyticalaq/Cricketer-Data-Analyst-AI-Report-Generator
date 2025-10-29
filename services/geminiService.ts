// FIX: Import required types and Gemini SDK modules.
import { GoogleGenAI, Type } from "@google/genai";
import type { PlayerData, ChatMessage, ComparisonData, Source } from '../types';

// FIX: Initialize GoogleGenAI with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Define a comprehensive schema for the player data report.
const playerReportSchema = {
    type: Type.OBJECT,
    properties: {
        playerName: { type: Type.STRING },
        playerImage: { type: Type.STRING, description: "A public URL to an image of the player." },
        profile: {
            type: Type.OBJECT,
            properties: {
                role: { type: Type.STRING },
                battingStyle: { type: Type.STRING },
                bowlingStyle: { type: Type.STRING },
            },
            required: ['role', 'battingStyle', 'bowlingStyle']
        },
        careerSummary: {
            type: Type.OBJECT,
            properties: {
                matches: { type: Type.INTEGER },
                runs: { type: Type.INTEGER },
                wickets: { type: Type.INTEGER },
                battingAverage: { type: Type.NUMBER },
                strikeRate: { type: Type.NUMBER },
                hundreds: { type: Type.INTEGER },
                fifties: { type: Type.INTEGER },
                bestBowling: { type: Type.STRING },
            },
            required: ['matches', 'runs', 'wickets', 'battingAverage', 'strikeRate', 'hundreds', 'fifties', 'bestBowling']
        },
        performanceOverTime: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    year: { type: Type.INTEGER },
                    runs: { type: Type.INTEGER },
                    average: { type: Type.NUMBER },
                },
                required: ['year', 'runs', 'average']
            }
        },
        dismissalAnalysis: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    method: { type: Type.STRING },
                    count: { type: Type.INTEGER },
                },
                required: ['method', 'count']
            }
        },
        runsDistribution: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "e.g., 'vs Pace', 'vs Spin', 'in Home', 'in Away'"},
                    value: { type: Type.INTEGER },
                },
                required: ['name', 'value']
            }
        },
        executiveSummary: { type: Type.STRING, description: "A 3-point summary of actionable areas for improvement, formatted as '1. ... 2. ... 3. ...'" },
        performanceVsCountry: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    matches: { type: Type.INTEGER },
                    runs: { type: Type.INTEGER },
                    average: { type: Type.NUMBER },
                    wickets: { type: Type.INTEGER },
                },
                 required: ['name', 'matches', 'runs', 'average', 'wickets']
            }
        },
        performanceVsOpponent: {
             type: Type.ARRAY,
             items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    matches: { type: Type.INTEGER },
                    runs: { type: Type.INTEGER },
                    average: { type: Type.NUMBER },
                    wickets: { type: Type.INTEGER },
                },
                required: ['name', 'matches', 'runs', 'average', 'wickets']
            }
        },
        bowlingStats: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    format: { type: Type.STRING },
                    matches: { type: Type.INTEGER },
                    wickets: { type: Type.INTEGER },
                    economy: { type: Type.NUMBER },
                    average: { type: Type.NUMBER },
                },
                required: ['format', 'matches', 'wickets', 'economy', 'average']
            }
        }
    },
    required: ['playerName', 'playerImage', 'profile', 'careerSummary', 'performanceOverTime', 'dismissalAnalysis', 'runsDistribution', 'executiveSummary', 'performanceVsCountry', 'performanceVsOpponent', 'bowlingStats']
};

export const generateReport = async (url: string): Promise<PlayerData> => {
    // FIX: Use gemini-2.5-pro for complex data extraction and analysis.
    const model = 'gemini-2.5-pro';
    
    const prompt = `Analyze the cricketer's profile from the URL: ${url}. 
    Provide a comprehensive analysis based on the provided JSON schema. 
    Ensure all fields are populated with accurate data. For performance vs country and opponent, pick the top 5 most frequent ones. 
    For bowling stats, provide stats for Test, ODI, and T20I formats.
    For performance over time, provide the last 10 years of data.
    For runs distribution, provide runs vs Pace, vs Spin, at Home, and Away.
    For dismissal analysis, provide the top 6 most frequent dismissal methods.`;

    // FIX: Use ai.models.generateContent with a prompt and a JSON response schema.
    const response = await ai.models.generateContent({
        model: model,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
            responseMimeType: "application/json",
            responseSchema: playerReportSchema,
            // FIX: Enable thinking for complex analysis.
            thinkingConfig: { thinkingBudget: 8192 }
        }
    });

    // FIX: Extract text and parse it as JSON.
    const text = response.text.trim();
    return JSON.parse(text);
};


// FIX: Define a schema for the player comparison data.
const comparisonSchema = {
    type: Type.OBJECT,
    properties: {
        playerName: { type: Type.STRING },
        playerImage: { type: Type.STRING, description: "A public URL to an image of the player." },
        careerSummary: {
            type: Type.OBJECT,
            properties: {
                matches: { type: Type.INTEGER },
                runs: { type: Type.INTEGER },
                wickets: { type: Type.INTEGER },
                battingAverage: { type: Type.NUMBER },
                strikeRate: { type: Type.NUMBER },
                hundreds: { type: Type.INTEGER },
                fifties: { type: Type.INTEGER },
                bestBowling: { type: Type.STRING },
            },
            required: ['matches', 'runs', 'wickets', 'battingAverage', 'strikeRate', 'hundreds', 'fifties', 'bestBowling']
        },
    },
    required: ['playerName', 'playerImage', 'careerSummary']
};


export const generateComparisonReport = async (playerName: string): Promise<ComparisonData> => {
    // FIX: Use gemini-2.5-pro for reliable data fetching.
    const model = 'gemini-2.5-pro';
    const prompt = `Generate a career summary for the cricketer: ${playerName}. Use the provided JSON schema. Fetch a publicly available image URL for the player.`;

    // FIX: Use ai.models.generateContent with a prompt and JSON response schema.
    const response = await ai.models.generateContent({
        model: model,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
            responseMimeType: "application/json",
            responseSchema: comparisonSchema,
        }
    });

    // FIX: Extract text and parse it as JSON.
    const text = response.text.trim();
    return JSON.parse(text);
};


export const sendChatMessage = async (message: string, playerName: string): Promise<ChatMessage> => {
    // FIX: Use gemini-2.5-flash for fast chat responses.
    const model = 'gemini-2.5-flash';
    const prompt = `You are a cricket analyst AI. The user is currently viewing a report about ${playerName}. 
    Answer the following question: "${message}".
    Keep your answer concise and informative. Use Google Search to find the most up-to-date information if needed.`;

    // FIX: Use ai.models.generateContent with the googleSearch tool.
    const response = await ai.models.generateContent({
        model: model,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    // FIX: Correctly extract text and grounding metadata for sources.
    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = groundingChunks
        .map(chunk => chunk.web)
        .filter((web): web is { uri: string, title: string } => !!web && !!web.uri && !!web.title);


    return {
        id: `model-${Date.now()}`,
        role: 'model',
        text: text,
        sources: sources,
    };
};
