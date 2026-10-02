import { useEffect, useRef, useState } from 'react';
import { Image, Send, Sparkles, X } from 'lucide-react';

const EXAMPLES = [
  '🌱 Meri fasal kaisi hai?',
  '💧 Kya mujhe aaj irrigation karni chahiye?',
  '🍅 Tomato disease prevention',
];

export default function Assistant() {
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Namaste! Main AI Krishi Mitra hoon. Apni fasal, mausam ya kheti se juda koi bhi sawal poochiye.' }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const fileRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, typing]);

  async function sendMessage(message = input) {
    const prompt = message.trim();
    if (!prompt || typing) return;

    const selectedImage = image;
    const userMessage = { from: 'user', text: prompt, image: selectedImage?.preview };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setImage(null);
    setError('');
    setTyping(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          image: selectedImage?.dataUrl,
          history: messages.slice(-8).map(({ from, text }) => ({ from, text })),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Assistant se response nahi mila.');
      setMessages((current) => [...current, { from: 'ai', text: data.reply, offline: data.source === 'offline' }]);
    } catch (requestError) {
      setError(requestError.message || 'Assistant se connect nahi ho pa raha. Backend start karke phir try karein.');
    } finally {
      setTyping(false);
    }
  }

  function onUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Kripya crop ki JPG, PNG, ya doosri image file select karein.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image 5 MB se chhoti honi chahiye.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage({ dataUrl: reader.result, preview: reader.result, name: file.name });
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] min-h-[34rem]">
      <section className="card flex min-h-0 flex-1 flex-col p-4">
        <header className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold"><Sparkles className="h-5 w-5 text-agri-fresh" /> AI Krishi Mitra</h2>
            <p className="muted mt-1 text-sm">Aapka intelligent farming assistant</p>
          </div>
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">Online</span>
        </header>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.from === 'ai' ? 'bg-slate-50 text-slate-800' : 'bg-agri-fresh text-white'}`}>
                {message.image && <img className="mb-2 max-h-44 w-full rounded-lg object-cover" src={message.image} alt="Uploaded crop" />}
                <p className="whitespace-pre-wrap">{message.text}</p>
                {message.offline && <p className="mt-2 text-xs text-slate-500">Basic advisory mode</p>}
              </div>
            </div>
          ))}
          {typing && <div className="flex justify-start"><div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">Krishi Mitra soch raha hai...</div></div>}
          <div ref={endRef} />
        </div>
      </section>

      <div className="mt-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {EXAMPLES.map((example) => <button key={example} type="button" disabled={typing} onClick={() => sendMessage(example)} className="whitespace-nowrap rounded-md bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 disabled:opacity-60">{example}</button>)}
        </div>
        {image && <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-green-50 px-2 py-1 text-xs text-green-800"><img src={image.preview} className="h-8 w-8 rounded object-cover" alt="Selected crop" />{image.name}<button onClick={() => setImage(null)} title="Remove image"><X className="h-4 w-4" /></button></div>}
        {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
        <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="flex items-center gap-2">
          <input ref={fileRef} onChange={onUpload} type="file" accept="image/*" className="hidden" />
          <button type="button" onClick={() => fileRef.current?.click()} className="rounded-md bg-white p-2 shadow-sm transition hover:bg-slate-50" title="Crop image upload"><Image className="h-5 w-5" /></button>
          <input value={input} disabled={typing} onChange={(event) => setInput(event.target.value)} placeholder="Apne farm ke baare mein poochiye..." className="flex-1 rounded-md border border-slate-200 px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 disabled:bg-slate-50" />
          <button className="btn-primary px-3 py-2 disabled:opacity-60" disabled={!input.trim() || typing} type="submit" title="Send message"><Send className="h-4 w-4" /></button>
        </form>
      </div>
    </div>
  );
}
