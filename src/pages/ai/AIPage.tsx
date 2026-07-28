import { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Send, Sparkles, User, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Form';
import { callAI, getAIFeatureName } from '@/services/aiService';
import { AI_FEATURES } from '@/constants';
import { useToastStore } from '@/store';
import { cn } from '@/lib/utils';
import type { AIMessage } from '@/types';

export function AIPage() {
  const { feature } = useParams();
  const [searchParams] = useSearchParams();
  const { addToast } = useToastStore();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const featureConfig = AI_FEATURES.find(f => f.id === feature);
  const featureName = getAIFeatureName(feature || '');

  useEffect(() => {
    if (searchParams.get('q')) {
      handleSend(searchParams.get('q')!);
    }
  }, [feature]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const content = text || input;
    if (!content.trim()) return;

    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await callAI({ feature: feature || 'faq-assistant', input: content });
      const aiMsg: AIMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: res.output,
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    'Tell me more about wedding packages',
    'What are the best destinations?',
    'How do I compare creators?',
    'Estimate my budget',
  ];

  return (
    <div className="bg-white rounded-2xl border border-border flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-brand-gradient text-white flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-text-primary">{featureName}</h2>
          <p className="text-xs text-text-secondary">{featureConfig?.description}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-gradient text-white flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">{featureName}</h3>
            <p className="text-sm text-text-secondary max-w-md mb-6">{featureConfig?.description}</p>
            <div className="grid grid-cols-2 gap-2 max-w-md w-full">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-left text-sm px-3 py-2.5 rounded-xl bg-white border border-border hover:border-primary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-brand-gradient text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap',
                msg.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-border text-text-primary'
              )}>
                {msg.content}
                {msg.role === 'assistant' && (
                  <div className="flex gap-2 mt-2 pt-2 border-t border-border/50">
                    <button onClick={() => { navigator.clipboard.writeText(msg.content); addToast('Copied!'); }} className="text-xs text-text-secondary hover:text-primary flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-text-secondary" />
                </div>
              )}
            </div>
          ))
        )}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="bg-white border border-border rounded-2xl px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <Textarea
            placeholder={`Ask ${featureName}...`}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 !py-2 resize-none"
            rows={1}
          />
          <Button type="submit" size="md" disabled={loading || !input.trim()} className="self-end">
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-text-secondary mt-2 text-center">AI responses are placeholders. Connect a Gemini API key for full functionality.</p>
      </div>
    </div>
  );
}
