"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const USE_CRISP = typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

type Message = { role: "bot" | "user"; text: string } | { role: "user"; option: string };

const QUICK_REPLIES_MAIN = [
  "Place a New Order",
  "Track an Order",
  "Product Questions",
];

const QUICK_REPLIES_PURCHASING = [
  "Help Purchasing Exercise Equipment",
  "ForgeFit Membership",
  "Parts or Accessories",
];

const QUICK_REPLIES_TRACKING = ["My Exercise Equipment", "Membership", "Other"];

export default function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ email: "", firstName: "", lastName: "" });
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formSubmittedRef = useRef(false);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, showForm]);

  const addBotMessage = (text: string) => {
    setMessages((m) => [...m, { role: "bot", text }]);
  };

  const handleQuickReply = (option: string) => {
    setMessages((m) => [...m, { role: "user", option }]);

    if (option === "Place a New Order" || option === "Product Questions") {
      addBotMessage("What would you like help with purchasing?");
      setMessages((m) => [...m, { role: "bot", text: "__QUICK_PURCHASING__" }]);
    } else if (option === "Track an Order") {
      addBotMessage("What do you need help tracking?");
      setMessages((m) => [...m, { role: "bot", text: "__QUICK_TRACKING__" }]);
    }
  };

  const handlePurchasingReply = (option: string) => {
    setMessages((m) => [...m, { role: "user", option }]);
    if (option === "Help Purchasing Exercise Equipment") {
      addBotMessage("Alright, I'll get you to a product specialist now.");
      addBotMessage("Please provide me with the following information in order to get you to the right team member.");
      setShowForm(true);
    } else {
      addBotMessage("You can learn more about ForgeFit membership and connect your equipment here.");
      addBotMessage("Is there anything else I can help with?");
    }
  };

  const handleTrackingReply = (option: string) => {
    setMessages((m) => [...m, { role: "user", option }]);
    addBotMessage("You can track your order in your account dashboard or in your order confirmation email.");
    addBotMessage("If you need your order number, you can find it in your order confirmation email.");
    addBotMessage("Would you still like to speak with an agent?");
    setMessages((m) => [...m, { role: "bot", text: "__QUICK_YESNO__" }]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formSubmittedRef.current) return;
    formSubmittedRef.current = true;
    setShowForm(false);
    addBotMessage("Thanks! A product specialist will reach out to you shortly. Is there anything else we can help with?");
  };

  const handleNeverMind = () => {
    setShowForm(false);
    setFormData({ email: "", firstName: "", lastName: "" });
    addBotMessage("No problem. What would you like help with?");
  };

  const handleSendMessage = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInputValue("");
    addBotMessage("Thanks for your message. A team member will get back to you soon. Is there anything else?");
  };

  const openChat = () => {
    if (USE_CRISP && typeof window !== "undefined" && (window as unknown as { $crisp?: unknown[][] }).$crisp) {
      (window as unknown as { $crisp: unknown[][] }).$crisp.push(["do", "chat:open"]);
    } else {
      setExpanded(true);
    }
  };
  const minimizeChat = () => setExpanded(false);
  const closeChat = () => {
    setOpen(false);
    setExpanded(false);
  };

  if (!open) return null;

  // When using Crisp (or other widget service): only show teaser; button opens their chat
  if (USE_CRISP) {
    return (
      <div className="fixed bottom-6 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700 overflow-hidden">
        <div className="p-4 flex justify-between items-start">
          <p className="text-zinc-200 text-sm">Hi, what can we help you with today?</p>
          <button
            type="button"
            onClick={closeChat}
            className="text-zinc-400 hover:text-white text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-4 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white text-lg font-semibold">?</div>
          <button
            type="button"
            onClick={openChat}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#ea580c] text-white text-sm font-semibold uppercase hover:bg-[#f97316] transition-colors"
          >
            Chat with an expert
          </button>
        </div>
      </div>
    );
  }

  // Collapsed widget (teaser) when using built-in scripted chat
  if (!expanded) {
    return (
      <div className="fixed bottom-6 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700 overflow-hidden">
        <div className="p-4 flex justify-between items-start">
          <p className="text-zinc-200 text-sm">Hi, what can we help you with today?</p>
          <button
            type="button"
            onClick={closeChat}
            className="text-zinc-400 hover:text-white text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-4 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white text-lg font-semibold">?</div>
          <button
            type="button"
            onClick={openChat}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#ea580c] text-white text-sm font-semibold uppercase hover:bg-[#f97316] transition-colors"
          >
            Chat with an expert
          </button>
        </div>
      </div>
    );
  }

  // Expanded chat modal (iFIT-style)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-md h-[85vh] max-h-[700px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between shrink-0 bg-zinc-900 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">&gt;</span>
            <span className="text-white font-semibold">ForgeFit AgentBot</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={minimizeChat} className="p-1.5 text-white/80 hover:text-white" aria-label="Minimize">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
            </button>
            <button type="button" onClick={closeChat} className="p-1.5 text-white/80 hover:text-white" aria-label="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.length === 0 && (
            <>
              <div className="flex gap-2">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0d9488] flex items-center justify-center text-white text-sm">›</span>
                <div className="rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-3 text-sm text-zinc-800 max-w-[85%]">
                  <p className="font-medium">Hi there, I&apos;m the ForgeFit AgentBot. How can I help you today?</p>
                  <p className="mt-2">New at ForgeFit: Check out our competition show Trainer Games, now streaming on Prime Video and the ForgeFit platform.</p>
                  <p className="mt-2 text-xs text-zinc-600">
                    ForgeFit and its agents may record and retain this Chat with an Expert conversation. By using this Chat, you consent to this use. Please see our{" "}
                    <Link href="#" className="text-blue-600 underline">Privacy Policy</Link> for more information.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex flex-wrap gap-2 justify-end">
                  {QUICK_REPLIES_MAIN.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleQuickReply(label)}
                      className="px-4 py-2 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === "bot" && "text" in msg && msg.text === "__QUICK_PURCHASING__" && (
                <div className="flex flex-wrap gap-2 pl-9">
                  {QUICK_REPLIES_PURCHASING.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handlePurchasingReply(label)}
                      className="px-4 py-2 rounded-full border border-zinc-300 bg-white text-zinc-800 text-sm hover:bg-zinc-50"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
              {msg.role === "bot" && "text" in msg && msg.text === "__QUICK_TRACKING__" && (
                <div className="flex flex-wrap gap-2 pl-9">
                  {QUICK_REPLIES_TRACKING.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleTrackingReply(label)}
                      className="px-4 py-2 rounded-full border border-zinc-300 bg-white text-zinc-800 text-sm hover:bg-zinc-50"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
              {msg.role === "bot" && "text" in msg && msg.text === "__QUICK_YESNO__" && (
                <div className="flex flex-wrap gap-2 pl-9">
                  <button type="button" onClick={() => { setMessages((m) => [...m, { role: "user", option: "Yes" }]); addBotMessage("Great! A team member will reach out shortly. Have a great day!"); }} className="px-4 py-2 rounded-full border border-zinc-300 bg-white text-zinc-800 text-sm hover:bg-zinc-50">Yes</button>
                  <button type="button" onClick={() => { setMessages((m) => [...m, { role: "user", option: "No, I'm good" }]); addBotMessage("Great! If you have any other questions, feel free to reach out. Have a great day!"); }} className="px-4 py-2 rounded-full border border-zinc-300 bg-white text-zinc-800 text-sm hover:bg-zinc-50">No, I&apos;m good</button>
                </div>
              )}
              {msg.role === "bot" && "text" in msg && !msg.text.startsWith("__") && (
                <div className="flex gap-2">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0d9488] flex items-center justify-center text-white text-sm">›</span>
                  <div className="rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-3 text-sm text-zinc-800 max-w-[85%]">
                    {msg.text}
                  </div>
                </div>
              )}
              {msg.role === "user" && (
                <div className="flex justify-end">
                  {"option" in msg ? (
                    <span className="px-4 py-2 rounded-2xl rounded-tr-md bg-zinc-900 text-white text-sm">{msg.option}</span>
                  ) : (
                    <span className="px-4 py-2 rounded-2xl rounded-tr-md bg-zinc-900 text-white text-sm">{msg.text}</span>
                  )}
                </div>
              )}
            </div>
          ))}

          {showForm && (
            <div className="pl-9 space-y-3">
              <form onSubmit={handleFormSubmit} className="space-y-3 p-4 rounded-xl border border-zinc-200 bg-zinc-50">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">Email <span className="text-red-500">Required</span></label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-800 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">First Name <span className="text-red-500">Required</span></label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData((f) => ({ ...f, firstName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-800 text-sm"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">Last Name <span className="text-red-500">Required</span></label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData((f) => ({ ...f, lastName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-800 text-sm"
                    placeholder="Last name"
                  />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <button type="submit" className="w-full py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800">
                    Send
                  </button>
                  <button type="button" onClick={handleNeverMind} className="w-full py-2 rounded-lg border border-zinc-300 bg-white text-zinc-800 text-sm hover:bg-zinc-50">
                    Never mind
                  </button>
                </div>
              </form>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 p-4 border-t border-zinc-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Message..."
              className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 text-zinc-800 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className="p-3 rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              aria-label="Send"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          <p className="text-center text-zinc-400 text-xs mt-2">Chat with an Expert</p>
        </div>
      </div>
    </div>
  );
}
