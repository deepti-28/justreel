import { useState } from 'react';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '@/data/mockData';
import { Avatar, Badge } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { Send, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/lib/utils';

export function MessagesPage() {
  const [activeId, setActiveId] = useState(MOCK_CONVERSATIONS[0]?.id || null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const active = MOCK_CONVERSATIONS.find(c => c.id === activeId);
  const activeMessages = activeId ? messages[activeId] || [] : [];

  const sendMessage = () => {
    if (!input.trim() || !activeId || !active) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      senderId: 'current',
      receiverId: active?.participants[1] || '',
      content: input,
      createdAt: new Date().toISOString(),
      read: true,
      type: 'text' as const,
    };
    setMessages({ ...messages, [activeId]: [...activeMessages, newMsg] });
    setInput('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Messages</h1>
      <div className="grid md:grid-cols-[300px_1fr] gap-4 bg-white rounded-2xl border border-border overflow-hidden h-[70vh]">
        <div className="border-r border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input placeholder="Search conversations..." className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_CONVERSATIONS.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={cn('w-full flex items-center gap-3 p-3 hover:bg-surface text-left transition-colors', activeId === conv.id && 'bg-primary/5')}
              >
                <Avatar src={conv.participantAvatar} alt={conv.participantName} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate">{conv.participantName}</p>
                    <span className="text-xs text-text-secondary shrink-0">{timeAgo(conv.lastMessageAt)}</span>
                  </div>
                  <p className="text-xs text-text-secondary truncate">{conv.lastMessage}</p>
                </div>
                {conv.unreadCount > 0 && <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">{conv.unreadCount}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {active && (
            <>
              <div className="p-3 border-b border-border flex items-center gap-3">
                <Avatar src={active.participantAvatar} alt={active.participantName} size="sm" />
                <div>
                  <p className="font-semibold text-sm">{active.participantName}</p>
                  <p className="text-xs text-green-500">Online</p>
                </div>
                {active.bookingId && <Badge variant="primary" className="ml-auto">Booking</Badge>}
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface">
                {activeMessages.map(msg => (
                  <div key={msg.id} className={cn('flex', msg.senderId === 'current' ? 'justify-end' : 'justify-start')}>
                    <div className={cn('max-w-[70%] rounded-2xl px-4 py-2 text-sm', msg.senderId === 'current' ? 'bg-primary text-white' : 'bg-white border border-border')}>
                      {msg.content}
                      <p className={cn('text-xs mt-1', msg.senderId === 'current' ? 'text-white/70' : 'text-text-secondary')}>{timeAgo(msg.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button size="sm" onClick={sendMessage}><Send className="w-4 h-4" /></Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
