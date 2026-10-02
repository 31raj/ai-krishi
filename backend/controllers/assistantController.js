import aiService from '../services/aiService.js';

export async function handleAssistant(req, res) {
  try {
    const { prompt, history, image } = req.body;
    const response = await aiService.getAssistantResponse({ prompt, history, image });
    res.json({ success: true, ...response });
  } catch (error) {
    console.error(error);
    res.status(error.message === 'A question is required.' ? 400 : 500).json({ success: false, error: error.message || 'Unable to process assistant request' });
  }
}
