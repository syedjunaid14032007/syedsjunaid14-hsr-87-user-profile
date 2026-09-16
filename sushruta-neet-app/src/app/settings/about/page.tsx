'use client';

import React from 'react';
import { ArrowLeft, ExternalLink, Shield, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="app-shell">
      <div className="flex items-center gap-3 px-4 py-3.5 bg-white border-b border-[#e8ecf0]">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] text-[#6b7685]" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1a2332] mr-8">About Sushruta</h1>
      </div>

      <div className="overflow-y-auto pb-24 px-4 pt-6 space-y-6">
        {/* Logo + Info */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#d1fae5' }}>
            <span className="text-4xl font-extrabold text-[#065f46]">S</span>
          </div>
          <div>
            <h2 className="text-[22px] font-extrabold text-[#1a2332]">Sushruta</h2>
            <p className="text-[13px] text-[#9ca3af]">Version 1.0.0</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #e8ecf0' }}>
          <p className="text-[14px] text-[#6b7685] leading-relaxed">
            Sushruta is a premium NEET preparation application designed to help medical aspirants
            achieve their dream of becoming a doctor. Named after the ancient Indian physician
            Sushruta, widely regarded as the father of surgery.
          </p>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #e8ecf0' }}>
          {[
            { label: 'App Version', value: '1.0.0' },
            { label: 'Build', value: 'Production' },
            { label: 'Platform', value: 'Web (Progressive)' },
            { label: 'Contact', value: 'hello@sushruta.in' },
          ].map((item, i, arr) => (
            <div key={item.label} className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-[#f0f2f5]' : ''}`}>
              <span className="text-[13px] text-[#9ca3af]">{item.label}</span>
              <span className="text-[13px] font-medium text-[#1a2332]">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #e8ecf0' }}>
          {[
            { label: 'Privacy Policy', icon: <Shield size={16} /> },
            { label: 'Terms of Service', icon: <FileText size={16} /> },
            { label: 'Open Source Licenses', icon: <ExternalLink size={16} /> },
          ].map((item, i, arr) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-[#f9fafb] ${i < arr.length - 1 ? 'border-b border-[#f0f2f5]' : ''}`}
            >
              <span className="text-[14px] font-medium text-[#1a2332]">{item.label}</span>
              <span className="text-[#9ca3af]">{item.icon}</span>
            </button>
          ))}
        </div>

        <p className="text-center text-[12px] text-[#c5cad5]">
          © 2026 Sushruta. Made with ❤️ for NEET aspirants.
        </p>
      </div>

      <BottomNavigation />
    </div>
  );
}
