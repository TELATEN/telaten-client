'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Send, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AssistantPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Halo! Saya TLATEN, asisten digital Anda. Ceritakan apa yang ingin Anda lakukan hari ini?',
      timestamp: new Date(),
    },
  ]);

  const handleVoiceInput = () => {
    toast({
      title: 'Fitur Voice-to-Text',
      description: 'Tekan dan tahan untuk mulai berbicara...',
    });
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: messageInput,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        const assistantReply: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: 'Baik, saya mengerti. TLATEN akan membantu Anda dengan sabar!',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantReply]);
      }, 1000);

      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
          <h1 className="text-lg font-semibold">TLATEN Assistant</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">TLATEN Assistant</h1>
              <p className="text-gray-600">Teknologi yang Sabar</p>
            </div>
          </div>
        </header>

        <div className="space-y-4 mb-24 md:mb-32">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-900'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-pink-500" />
                    <span className="text-xs font-semibold text-pink-600">TLATEN</span>
                  </div>
                )}
                <p className="text-base leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-20 md:bottom-6 left-0 right-0 px-4 max-w-2xl mx-auto">
          <Card className="shadow-lg border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleVoiceInput}
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 flex-shrink-0 shadow-lg"
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Ketik transaksi atau gunakan voice..."
                  className="flex-1 h-12 text-base bg-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="h-12 w-12 rounded-full bg-pink-500 hover:bg-pink-600 flex-shrink-0 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Contoh: "Tadi jual 10 nasi goreng @ 15rb"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
