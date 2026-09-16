'use client';

import React from 'react';
import { ArrowLeft, Download, FileText, BookOpen, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';

const mockDownloads = [
  { id: '1', name: 'NEET Biology — Cell Biology', size: '12.4 MB', type: 'PDF', downloaded: true },
  { id: '2', name: 'Physics — Mechanics Complete Notes', size: '8.7 MB', type: 'PDF', downloaded: true },
  { id: '3', name: 'Chemistry — Organic Reactions', size: '15.2 MB', type: 'PDF', downloaded: false },
  { id: '4', name: 'NEET 2023 Mock Test Paper', size: '2.1 MB', type: 'Test', downloaded: true },
];

export default function DownloadsPage() {
  const router = useRouter();

  return (
    <div className="app-shell">
      <div className="flex items-center gap-3 px-4 py-3.5 bg-white border-b border-[#e8ecf0]">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] text-[#6b7685]" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1a2332] mr-8">Download Manager</h1>
      </div>

      <div className="overflow-y-auto pb-24 px-4 pt-5 space-y-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-[13px] text-[#9ca3af]">{mockDownloads.filter(d => d.downloaded).length} downloaded resources</p>
          <p className="text-[12px] text-[#10b981] font-medium">Clear All</p>
        </div>
        {mockDownloads.map((item) => (
          <div key={item.id} className="bg-white rounded-xl px-4 py-3.5 flex items-center gap-3" style={{ border: '1px solid #e8ecf0' }}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.type === 'Test' ? 'bg-[#ede9fe]' : 'bg-[#dbeafe]'}`}>
              {item.type === 'Test' ? <FileText size={18} color="#8b5cf6" /> : <BookOpen size={18} color="#3b82f6" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#1a2332] truncate">{item.name}</p>
              <p className="text-[11px] text-[#9ca3af]">{item.size} · {item.type}</p>
            </div>
            {item.downloaded ? (
              <CheckCircle size={18} color="#10b981" />
            ) : (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#d1fae5] text-[#10b981]">
                <Download size={15} />
              </button>
            )}
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
}
