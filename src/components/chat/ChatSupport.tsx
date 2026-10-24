import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  HardHat,
  ExternalLink,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import {
  LeadInfo,
  getSmartBotReply,
  extractLeadDetails,
  generateWhatsAppLink,
  DISPLAY_PHONE
} from '../../data/chatKnowledgeBase';
import { COMPANY_DATA } from '../../data/companyData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  showWhatsAppCta?: boolean;
}

// Gemini/rule-engine replies use light markdown (bold, italics, inline
// code, links, lists) for emphasis. A full markdown library would drag in
// its own default styling that fights the site's design tokens, so this
// is a small hand-rolled renderer scoped to exactly what the bot actually
// produces — it maps straight onto the existing --brick/--ink/--line vars.

// Inline spans: **bold**, *italic*, `code`, [text](url) — applied within
// a single line, in that priority order, without a full markdown parser.
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
  const parts = text.split(pattern);
  return parts.filter((p) => p.length > 0).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={key} className="px-1.5 py-0.5 bg-[var(--bg-raised,#f5f6f8)] border border-[var(--line)] rounded text-[0.9em] font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={key}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--brick)] underline underline-offset-2 hover:text-[var(--brick-deep)]"
        >
          {linkMatch[1]}
        </a>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2 && !part.startsWith('**')) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

// Block level: splits into paragraphs and detects consecutive bullet
// ("- "/"• ") or numbered ("1. ") lines as list blocks; everything else
// is a plain paragraph with inline formatting applied.
function renderFormattedText(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];
    const bulletMatch = line.match(/^\s*[-•]\s+(.*)$/);
    const numberedMatch = line.match(/^\s*\d+\.\s+(.*)$/);

    if (bulletMatch || numberedMatch) {
      const isOrdered = Boolean(numberedMatch);
      const items: string[] = [];
      while (i < lines.length) {
        const m = lines[i].match(isOrdered ? /^\s*\d+\.\s+(.*)$/ : /^\s*[-•]\s+(.*)$/);
        if (!m) break;
        items.push(m[1]);
        i++;
      }
      const ListTag = isOrdered ? 'ol' : 'ul';
      blocks.push(
        <ListTag
          key={`b-${blockKey++}`}
          className={isOrdered ? 'list-decimal pl-4 space-y-0.5' : 'list-disc pl-4 space-y-0.5'}
        >
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item, `li-${blockKey}-${idx}`)}</li>
          ))}
        </ListTag>
      );
    } else if (line.trim() === '') {
      i++;
    } else {
      blocks.push(<p key={`b-${blockKey++}`}>{renderInline(line, `p-${blockKey}`)}</p>);
      i++;
    }
  }

  return blocks;
}

const INITIAL_GREETING: ChatMessage = {
  id: 'msg-init-1',
  sender: 'bot',
  text: `Namaste, main Abdul Salam Constructions ka Chat Support hoon.

Hum Bhadohi, Gyanpur aur aas-paas ke ilaqon me foundation se lekar key handover tak full turnkey residential construction karte hain.

Aap apne ghar/plot ki construction se juda koi bhi sawal pooch sakte hain — rates, materials, payment process, ya site visit ke baare me. Kisi bhi language me poochein, main usi me jawab dunga.`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedPrompts: [
    '1500 sqft ka kharcha kitna aayega?',
    'Payment ke 7 stages kya hain?',
    'Cement aur saria kaun sa hai?',
    'Free site inspection book karo'
  ]
};

export const ChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPromptedBubble, setHasPromptedBubble] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // Stay hidden until the visitor has scrolled past the full-bleed Hero
  // section (if one is present on the page) so it doesn't sit on top of it.
  const [pastHero, setPastHero] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroStage = document.querySelector<HTMLElement>('.veloura .stage');
    if (!heroStage) {
      setPastHero(true);
      return;
    }

    // Cache the hero's document-relative bottom edge instead of calling
    // getBoundingClientRect() from inside the scroll callback.
    // getBoundingClientRect() always forces a synchronous reflow — it was
    // previously called on every rAF tick while scrolling (up to ~60/sec),
    // which is exactly the "read layout inside the scroll/update hot path"
    // pattern Chrome's forced-reflow trace flags, even though the call was
    // already rAF- and change-gated. The fix: measure once (on mount + on a
    // debounced resize, where a reflow is expected and cheap) and store the
    // hero's bottom position relative to the *document* (not the viewport),
    // then during scroll compare that fixed number against `scrollY` —
    // itself a free read, not a layout-forcing one — so the scroll callback
    // never touches layout at all.
    let heroBottomDoc = 0;
    const measure = () => {
      // getBoundingClientRect().bottom is viewport-relative; adding the
      // current scrollY converts it to a document-relative position that
      // stays valid regardless of how far the page has scrolled since.
      heroBottomDoc = heroStage.getBoundingClientRect().bottom + window.scrollY;
    };

    let ticking = false;
    let lastPastHero = false;
    const checkScrollPosition = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > heroBottomDoc;
        if (next !== lastPastHero) {
          lastPastHero = next;
          setPastHero(next);
        }
        ticking = false;
      });
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measure();
        checkScrollPosition();
      }, 120);
    };

    measure();
    checkScrollPosition();
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Lead State
  const [lead, setLead] = useState<LeadInfo>({
    name: null,
    phone: null,
    area: null,
    location: null,
    packagePreference: null,
    specificInterests: []
  });

  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // The WhatsApp CTA card should appear once per conversation, not on every
  // reply — once shown, later replies suppress it even if the backend says true.
  const hasShownWhatsAppCta = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPromptedBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasPromptedBubble && !isOpen && bubbleRef.current) {
      gsap.fromTo(
        bubbleRef.current,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [hasPromptedBubble, isOpen]);

  useEffect(() => {
    if (isOpen && windowRef.current) {
      gsap.fromTo(
        windowRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const runFallbackReply = (text: string, updatedLead: LeadInfo, newMessages: ChatMessage[]) => {
    setTimeout(() => {
      const botRes = getSmartBotReply(text, updatedLead, newMessages.length);
      const showWhatsApp = Boolean(botRes.showWhatsAppCta) && !hasShownWhatsAppCta.current;
      if (showWhatsApp) hasShownWhatsAppCta.current = true;

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botRes.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: botRes.suggestedPrompts,
        showWhatsAppCta: showWhatsApp
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    // Extract lead details locally from user input
    const localLeadUpdates = extractLeadDetails(text, lead);
    const updatedLead: LeadInfo = {
      ...lead,
      ...localLeadUpdates,
      specificInterests: [...lead.specificInterests, text.slice(0, 50)]
    };
    setLead(updatedLead);

    // 1. Stream the reply from Gemini token-by-token for a live typing feel.
    const botMsgId = `bot-${Date.now()}`;
    let streamedAny = false;
    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newMessages.map((m) => ({ sender: m.sender, text: m.text })),
          lead: updatedLead
        })
      });

      if (!response.ok || !response.body) {
        throw new Error(`Stream request failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const handleEvent = (eventName: string, dataStr: string) => {
        const data = JSON.parse(dataStr);
        if (eventName === 'chunk' && typeof data.text === 'string') {
          if (!streamedAny) {
            // First chunk: create the bot message and stop the typing dots.
            streamedAny = true;
            setIsTyping(false);
            setMessages((prev) => [...prev, {
              id: botMsgId,
              sender: 'bot',
              text: data.text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          } else {
            setMessages((prev) => prev.map((m) => m.id === botMsgId ? { ...m, text: m.text + data.text } : m));
          }
        } else if (eventName === 'done') {
          if (data.leadUpdate) {
            setLead((prev) => ({ ...prev, ...data.leadUpdate }));
          }
          const wantsWhatsApp = Boolean(data.showWhatsAppCta);
          const showWhatsApp = wantsWhatsApp && !hasShownWhatsAppCta.current;
          if (showWhatsApp) hasShownWhatsAppCta.current = true;

          setMessages((prev) => prev.map((m) => m.id === botMsgId ? {
            ...m,
            suggestedPrompts: Array.isArray(data.suggestedPrompts) ? data.suggestedPrompts : [],
            showWhatsAppCta: showWhatsApp
          } : m));
        }
      };

      // Parse SSE frames ("event: x\ndata: y\n\n") as they arrive; a frame
      // can be split across multiple stream reads, so buffer until a
      // blank-line terminator shows up.
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let boundary = buffer.indexOf('\n\n');
        while (boundary !== -1) {
          const frame = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);

          const eventLine = frame.split('\n').find((l) => l.startsWith('event: '));
          const dataLine = frame.split('\n').find((l) => l.startsWith('data: '));
          if (eventLine && dataLine) {
            handleEvent(eventLine.slice(7), dataLine.slice(6));
          }
          boundary = buffer.indexOf('\n\n');
        }
      }

      setIsTyping(false);
      if (streamedAny) return;
    } catch (err) {
      console.warn('Streaming endpoint unavailable, falling back:', err);
    }

    // 2. Non-streaming AI endpoint (covers browsers/proxies that buffer SSE).
    if (!streamedAny) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: newMessages.map((m) => ({ sender: m.sender, text: m.text })),
            lead: updatedLead
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.reply) {
            if (data.leadUpdate) {
              setLead((prev) => ({ ...prev, ...data.leadUpdate }));
            }

            const wantsWhatsApp = typeof data.showWhatsAppCta === 'boolean'
              ? data.showWhatsAppCta
              : Boolean(
                  updatedLead.phone ||
                  /whatsapp|contact|call|number|phone|milna|site visit|engineer/i.test(text)
                );
            const showWhatsApp = wantsWhatsApp && !hasShownWhatsAppCta.current;
            if (showWhatsApp) hasShownWhatsAppCta.current = true;

            const botMsg: ChatMessage = {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: data.reply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              suggestedPrompts: data.suggestedPrompts || [],
              showWhatsAppCta: showWhatsApp
            };

            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
            return;
          }
        }
      } catch (err) {
        console.warn('AI endpoint unavailable, using conversational fallback:', err);
      }
    }

    // 3. High-speed Conversational Rule Engine (Guaranteed zero brochure dumps)
    runFallbackReply(text, updatedLead, newMessages);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setLead({
      name: null,
      phone: null,
      area: null,
      location: null,
      packagePreference: null,
      specificInterests: []
    });
  };

  const currentWhatsAppLink = generateWhatsAppLink(
    lead,
    messages[messages.length - 1]?.text || 'Ghar ke construction rate aur details chahiye'
  );

  return (
    <>
      {/* FLOATING CHAT BUTTON & NUDGE BUBBLE — hidden while still inside the
          Hero section; appears once the visitor scrolls past it (or
          immediately on pages that don't have a Hero at all). */}
      {(pastHero || isOpen) && (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">

        {!isOpen && hasPromptedBubble && (
          <div
            ref={bubbleRef}
            className="pointer-events-auto bg-white border border-[var(--line)] text-[var(--ink)] p-4 max-w-[280px] shadow-[0_20px_50px_-15px_rgba(15,20,32,0.25)] relative mb-1 cursor-pointer hover:border-[var(--brick)] transition-all duration-300 rounded-2xl"
            onClick={() => setIsOpen(true)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHasPromptedBubble(false);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border border-[var(--line)] text-slate-400 hover:text-[var(--ink)] flex items-center justify-center text-[10px] shadow-sm"
              aria-label="Dismiss message"
            >
              ✕
            </button>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[var(--brick)]/10 border border-[var(--brick)]/30 flex items-center justify-center flex-shrink-0 text-[var(--brick)] mt-0.5">
                <HardHat className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--ink)] font-heading">
                  Ghar Banwana Hai?
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Plot size batayein, instant rate aur BOQ estimate payein!
                </p>
                <div className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-[var(--brick)] font-semibold">
                  <span>Chat Support Online</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Button — icon-only on phones (the full
            wide pill-with-label version took up a large, permanently
            visible chunk of the one corner every other floating element
            also lives in); the full label returns at sm: and up where
            there's room for it without crowding the scroll-to-top button
            stacked just above it. */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasPromptedBubble(false);
          }}
          className="pointer-events-auto flex items-center gap-2.5 p-3.5 sm:px-5 sm:py-4 bg-[var(--brick)] hover:bg-[var(--brick-deep)] border border-[var(--brick)] text-white shadow-[0_8px_24px_rgba(201, 162, 74,0.35)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group focus:outline-none rounded-full"
          aria-label="Toggle Chat Support"
        >
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 ring-2 ring-[var(--brick)] animate-pulse" />
            <MessageSquare className="w-5 h-5 text-white transition-colors" />
          </div>
          <div className="hidden sm:block text-left font-sans">
            <div className="font-heading font-black text-xs uppercase tracking-wider text-white">
              Chat Support
            </div>
            <div className="text-[10px] font-mono text-white/80 leading-none">
              Online • AI Support
            </div>
          </div>
        </button>
      </div>
      )}

      {/* CHAT SUPPORT MODAL / WINDOW */}
      {isOpen && (
        <div
          ref={windowRef}
          className="fixed inset-x-2 bottom-2 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-auto sm:w-[420px] md:w-[450px] max-h-[90vh] sm:max-h-[640px] h-[620px] bg-white border border-[var(--line)] shadow-[0_24px_64px_-20px_rgba(15,20,32,0.28)] flex flex-col overflow-hidden text-[var(--ink)] rounded-2xl"
        >
          {/* Window Header */}
          <div className="bg-[var(--ink)] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 bg-[var(--brick)] flex items-center justify-center text-white rounded-full">
                  <HardHat className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[var(--ink)]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-heading font-black text-sm text-white">
                    Chat Support
                  </h2>
                  <span className="text-[10px] font-mono bg-emerald-400/15 text-emerald-300 border border-emerald-400/40 px-1.5 py-0.5 rounded-md">
                    Live
                  </span>
                </div>
                <p className="text-[11px] font-mono text-white/60 truncate max-w-[200px]">
                  M/S Abdul Salam Constructions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${COMPANY_DATA.contact.phone}`}
                title="Direct Call Site Engineer"
                className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded-full border border-transparent hover:border-white/20"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer rounded-full border border-transparent hover:border-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer rounded-full border border-transparent hover:border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Context Memory Bar */}
          {(lead.area || lead.dimensions || lead.location || lead.name || lead.phone) && (
            <div className="bg-[var(--bg-raised,#f5f6f8)] border-b border-[var(--line)] px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="text-slate-400 text-[10px] uppercase">Active Inquiry:</span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {lead.name && (
                  <span className="bg-white text-[var(--brick)] px-2 py-1 border border-[var(--line)] rounded-md">
                    {lead.name}
                  </span>
                )}
                {lead.dimensions ? (
                  <span className="bg-[var(--brick)] text-white px-2 py-1 border border-[var(--brick)] font-medium rounded-md">
                    {lead.dimensions} ({lead.area} sqft)
                  </span>
                ) : lead.area ? (
                  <span className="bg-white text-[var(--ink)] px-2 py-1 border border-[var(--line)] rounded-md">
                    {lead.area} sqft
                  </span>
                ) : null}
                {lead.location && (
                  <span className="bg-white text-[var(--ink)] px-2 py-1 border border-[var(--line)] rounded-md">
                    {lead.location}
                  </span>
                )}
                {lead.phone && (
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-1 border border-emerald-200 rounded-md">
                    {lead.phone}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4 bg-[var(--bg-raised,#f5f6f8)] font-sans text-xs sm:text-[13px] leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[86%] p-3.5 sm:p-4 transition-all border ${
                    msg.sender === 'user'
                      ? 'bg-[var(--brick)] text-white font-medium selection:bg-[var(--brick-deep)] selection:text-white border-[var(--brick)] rounded-2xl rounded-tr-md shadow-[0_8px_20px_rgba(201, 162, 74,0.18)]'
                      : 'bg-white text-[var(--ink)] border-[var(--line)] rounded-2xl rounded-tl-md shadow-[0_1px_2px_rgba(15,20,32,0.04)]'
                  }`}
                >
                  <div className="break-words space-y-1.5">
                    {renderFormattedText(msg.text)}
                  </div>

                  <div
                    className={`text-[9px] font-mono mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.showWhatsAppCta && (
                  <div className="w-full max-w-[86%] mt-2 bg-white border border-emerald-200 p-4 shadow-[0_1px_2px_rgba(15,20,32,0.04)] space-y-2 rounded-2xl">
                    <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Send to WhatsApp (+91 {DISPLAY_PHONE})</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Senior Civil Engineer ko seedha WhatsApp bhejein — quotation, floor plan aur free inspection discuss karein:
                    </p>
                    <a
                      href={currentWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-[0_8px_20px_rgba(16,185,129,0.25)] active:translate-x-[2px] active:translate-y-[2px] rounded-full"
                    >
                      <span>Open in WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                    {msg.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[11px] font-mono bg-white hover:bg-[var(--brick)]/5 hover:text-[var(--brick)] hover:border-[var(--brick)] border border-[var(--line)] px-3 py-1.5 text-slate-600 transition-colors cursor-pointer text-left rounded-md"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono bg-white border border-[var(--line)] px-4 py-2.5 w-fit rounded-2xl rounded-tl-md shadow-[0_1px_2px_rgba(15,20,32,0.04)]">
                <div className="w-2 h-2 rounded-full bg-[var(--brick)] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[var(--brick)] animate-bounce [animation-delay:0.15s]" />
                <div className="w-2 h-2 rounded-full bg-[var(--brick)] animate-bounce [animation-delay:0.3s]" />
                <span className="ml-1 text-[11px]">Engineer replying...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Keyword Pills Above Input */}
          <div className="bg-white border-t border-[var(--line)] px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px] font-mono">
            <button
              type="button"
              onClick={() => handleSendMessage('1500 sqft ka rate aur kharcha batao')}
              className="whitespace-nowrap px-2.5 py-1 bg-[var(--bg-raised,#f5f6f8)] text-slate-600 hover:text-[var(--brick)] hover:border-[var(--brick)] border border-[var(--line)] transition-colors cursor-pointer rounded-md"
            >
              1500 sqft Cost
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('Cement aur Saria kaun sa lagate ho?')}
              className="whitespace-nowrap px-2.5 py-1 bg-[var(--bg-raised,#f5f6f8)] text-slate-600 hover:text-[var(--brick)] hover:border-[var(--brick)] border border-[var(--line)] transition-colors cursor-pointer rounded-md"
            >
              Materials
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('7 Payment Milestones kya hain?')}
              className="whitespace-nowrap px-2.5 py-1 bg-[var(--bg-raised,#f5f6f8)] text-slate-600 hover:text-[var(--brick)] hover:border-[var(--brick)] border border-[var(--line)] transition-colors cursor-pointer rounded-md"
            >
              7 Stages
            </button>
            <a
              href={currentWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer flex items-center gap-1 rounded-md"
            >
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-white border-t border-[var(--line)]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ghar banwane ka sawal poochein (Hinglish/Hindi/English)..."
                className="flex-1 bg-[var(--bg-raised,#f5f6f8)] border border-[var(--line)] text-[var(--ink)] placeholder-slate-400 text-xs sm:text-sm px-4 py-3 focus:outline-none focus:border-[var(--brick)] focus:bg-white transition-colors rounded-full"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-3 bg-[var(--brick)] hover:bg-[var(--brick-deep)] disabled:opacity-40 disabled:hover:bg-[var(--brick)] text-white font-bold transition-all duration-150 cursor-pointer rounded-full shadow-[0_8px_20px_rgba(201, 162, 74,0.22)] active:translate-x-[2px] active:translate-y-[2px]"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1.5 px-0.5">
              <span>WhatsApp Helpline: +91 {DISPLAY_PHONE}</span>
              <span className="text-[var(--brick)]">Zero Hidden Charges</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
