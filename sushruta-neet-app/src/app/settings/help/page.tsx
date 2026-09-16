'use client';

import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, AlertTriangle, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';

const faqs = [
  { q: 'How are my statistics calculated?', a: 'Your statistics are tracked in real-time as you complete topics, take mock tests, and study. All data is synced securely to your account.' },
  { q: 'Can I use Sushruta offline?', a: 'Yes! Download learning resources using the Download Manager. Downloaded content is available offline.' },
  { q: 'How do I reset my progress?', a: 'You can reset individual subject progress from the Study section. To reset all data, contact support.' },
  { q: 'What is the daily study goal?', a: 'Your daily study goal is the target minutes per day you want to study. You can customize it in Study Preferences.' },
];

export default function HelpPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="app-shell">
      <div className="flex items-center gap-3 px-4 py-3.5 bg-white border-b border-[#e8ecf0]">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] text-[#6b7685]" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1a2332] mr-8">Help & Support</h1>
      </div>

      <div className="overflow-y-auto pb-24 px-4 pt-5 space-y-4">
        {/* FAQ */}
        <h2 className="text-[13px] font-semibold text-[#6b7685] uppercase tracking-wide px-1">Frequently Asked Questions</h2>
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #e8ecf0' }}>
          {faqs.map((faq, i) => (
            <div key={i} className={i < faqs.length - 1 ? 'border-b border-[#f0f2f5]' : ''}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
                aria-expanded={openFaq === i}
              >
                <span className="text-[14px] font-medium text-[#1a2332] pr-4">{faq.q}</span>
                {openFaq === i ? <ChevronUp size={16} className="text-[#9ca3af] flex-shrink-0" /> : <ChevronDown size={16} className="text-[#9ca3af] flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-[13px] text-[#6b7685] leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <h2 className="text-[13px] font-semibold text-[#6b7685] uppercase tracking-wide px-1 mt-2">Get In Touch</h2>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3.5 px-4 py-4 bg-white rounded-xl hover:bg-[#f9fafb] press-effect" style={{ border: '1px solid #e8ecf0' }}>
            <div className="w-9 h-9 rounded-full bg-[#dbeafe] flex items-center justify-center"><Mail size={17} color="#3b82f6" /></div>
            <div className="flex-1 text-left">
              <p className="text-[14px] font-medium text-[#1a2332]">Contact Support</p>
              <p className="text-[12px] text-[#9ca3af]">support@sushruta.in</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3.5 px-4 py-4 bg-white rounded-xl hover:bg-[#f9fafb] press-effect" style={{ border: '1px solid #e8ecf0' }}>
            <div className="w-9 h-9 rounded-full bg-[#fef3c7] flex items-center justify-center"><AlertTriangle size={17} color="#f59e0b" /></div>
            <div className="flex-1 text-left">
              <p className="text-[14px] font-medium text-[#1a2332]">Report a Problem</p>
              <p className="text-[12px] text-[#9ca3af]">Help us improve Sushruta</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3.5 px-4 py-4 bg-white rounded-xl hover:bg-[#f9fafb] press-effect" style={{ border: '1px solid #e8ecf0' }}>
            <div className="w-9 h-9 rounded-full bg-[#ede9fe] flex items-center justify-center"><MessageCircle size={17} color="#8b5cf6" /></div>
            <div className="flex-1 text-left">
              <p className="text-[14px] font-medium text-[#1a2332]">Live Chat</p>
              <p className="text-[12px] text-[#9ca3af]">Mon–Fri, 9am–6pm IST</p>
            </div>
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
