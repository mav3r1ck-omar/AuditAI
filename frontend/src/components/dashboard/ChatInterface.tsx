"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Loader2 } from "lucide-react";
import { sendChatMessage } from "@/app/actions";

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function ChatInterface({ report }: { report: any }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I am your SEO Audit AI. How can I help you understand this SEO report?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const historyMsg = messages.map(m => ({ 
        role: m.role, 
        parts: [{ text: m.content }] 
      }));
      const res = await sendChatMessage(report, historyMsg, userMsg);
      
      if (res.error) {
        setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error: " + res.error }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', content: res.response || "No response." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "Something went wrong communicating with the server." }]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    // Robust cleanup: Replace markdown-style bolding and strip excessive asterisks for a cleaner Look
    return content
      .replace(/\*\*(.*?)\*\*/g, "$1") // Bold text
      .replace(/\* (.*?)/g, "• $1")    // List items
      .replace(/• •/g, "•")           // Double bullet fixes
      .trim();
  };

  return (
    <Card className="flex flex-col h-full min-h-[500px] bg-slate-900 border border-slate-700/50 rounded-xl text-white shadow-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 to-transparent opacity-50 z-0"></div>
      <CardHeader className="relative z-10 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-violet-400" />
          <CardTitle className="text-lg font-bold tracking-tight text-white/90">Audit Chatbot</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 relative z-10 flex flex-col">
        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="space-y-5 p-4 flex flex-col justify-end">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-auto mb-auto">
                    <Bot className="w-4 h-4 text-violet-400" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-blue-600/90 text-white rounded-br-sm' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700/50'
                  }`}
                >
                  {formatMessage(msg.content)}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 mt-auto mb-auto">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start items-center text-slate-400 px-2 py-4">
                 <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
                 <span className="text-xs font-medium tracking-wide">AI is thinking...</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="relative z-10 p-4 bg-slate-950/60 border-t border-slate-800 backdrop-blur-xl">
        <form 
          className="flex w-full items-center gap-2" 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your SEO metrics..."
            className="flex-1 bg-slate-800/80 border-slate-700 focus-visible:ring-1 focus-visible:ring-violet-500 text-white rounded-full h-11 px-5 shadow-inner"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={loading || !input.trim()} 
            className="rounded-full bg-violet-600 hover:bg-violet-500 text-white h-11 w-11 shrink-0 transition-colors shadow-lg shadow-violet-500/20"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
