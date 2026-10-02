const SYSTEM_INSTRUCTIONS = `You are Krishi Mitra, a practical and friendly agricultural assistant for Indian farmers. Reply in the same language as the farmer, preferring clear Hindi/Hinglish when they use it. Give concise, actionable guidance. Ask one focused follow-up question when crop, location, growth stage, weather, or symptoms are needed. Do not claim certainty from an image or diagnose a disease conclusively. For pesticide, fertiliser, or dosage advice, recommend checking the product label and local agricultural extension guidance. Mention urgent warning signs and advise a local expert when appropriate.`;

function offlineReply(prompt) {
  const question = prompt.toLowerCase();

  if (question.includes('irrig') || question.includes('paani') || question.includes('water')) {
    return 'Irrigation se pehle 5–7 cm mitti ko check karein. Agar mitti nami wali hai, paani rok dein; agar sookhi aur crumbly hai, subah jaldi halki irrigation dein. Crop aur recent rain batayenge to main zyada specific salah de sakta hoon.';
  }

  if (question.includes('disease') || question.includes('bimari') || question.includes('spot')) {
    return 'Pehle affected patton ko dhyan se dekhein aur photo ke saath crop, plant age, aur symptoms kab se hain yeh note karein. Zyada affected leaves ko alag karke overhead watering avoid karein. Exact treatment ke liye local agriculture expert se diagnosis confirm karna behtar rahega.';
  }

  return 'Main aapki farming mein madad ke liye taiyar hoon. Crop ka naam, location, growth stage aur problem ke symptoms batayein—jaise patte pe daag, paani ki zarurat, ya fertiliser planning.';
}

const hasValidOpenAiKey = () => {
  const key = process.env.OPENAI_API_KEY?.trim();

  if (!key) return false;
  if (key.toLowerCase().includes('your_api_key')) return false;
  if (key.toLowerCase().includes('example')) return false;

  return key.startsWith('sk-');
};

const aiService = {
  async getAssistantResponse({ prompt, history = [], image }) {
    if (!prompt?.trim()) {
      throw new Error('A question is required.');
    }

    if (!hasValidOpenAiKey()) {
      return {
        reply: offlineReply(prompt),
        source: 'offline',
      };
    }

    const recentHistory = history.slice(-8).map((message) => ({
      role: message.from === 'ai' ? 'assistant' : 'user',
      content: message.text,
    }));

    const userContent = [{ type: 'input_text', text: prompt.trim() }];
    if (image) userContent.push({ type: 'input_image', image_url: image, detail: 'low' });

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        instructions: SYSTEM_INSTRUCTIONS,
        input: [
          ...recentHistory,
          { role: 'user', content: userContent },
        ],
        max_output_tokens: 450,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'AI service request failed.');

    return {
      reply: data.output_text?.trim() || 'Mujhe jawab generate karne mein dikkat hui. Kripya dobara poochhein.',
      source: 'ai',
    };
  },
};

export default aiService;
