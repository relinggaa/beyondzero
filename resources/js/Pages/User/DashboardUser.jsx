import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { Smile, MessageCircle, BookOpen, Users } from "lucide-react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function DashboardUser() {
    const [moodAvg, setMoodAvg] = useState('-');
    const [journalCount, setJournalCount] = useState('-');
    const [curhatCount, setCurhatCount] = useState('-');
    const [moodTrend, setMoodTrend] = useState([]);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                // Mood sessions summary
                const moodRes = await fetch('/api/chat/sessions?category=mood', { credentials: 'include' });
                const moodJson = await moodRes.json().catch(() => ({}));
                if (moodJson?.success && Array.isArray(moodJson.data)) {
                    // hitung rata-rata mood sederhana: map beberapa label ke angka
                    const mapMood = (m) => {
                        const t = String(m || '').toLowerCase();
                        if (t.includes('amazing') || t.includes('bahagia')) return 5;
                        if (t.includes('good') || t.includes('tenang')) return 4;
                        if (t.includes('normal')) return 3;
                        if (t.includes('bad') || t.includes('sedih')) return 2;
                        if (t.includes('awful') || t.includes('cemas') || t.includes('marah')) return 1;
                        return 3;
                    };
                    const scores = moodJson.data.map(s => mapMood(s.mood));
                    const avg = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
                    setMoodAvg(scores.length ? `${avg.toFixed(1)}/5` : '-');
                    // mood trend 14 hari terakhir dummy dari scores
                    const sample = scores.slice(-14);
                    setMoodTrend(sample.length ? sample : [3,3,4,2,5,4,3]);
                }
            } catch {}

            try {
                // Curhat sessions count
                const cRes = await fetch('/api/chat/sessions?category=curhat', { credentials: 'include' });
                const cJson = await cRes.json().catch(() => ({}));
                if (cJson?.success && Array.isArray(cJson.data)) {
                    setCurhatCount(String(cJson.data.length));
                }
            } catch {}

            try {
                // Journaling count (attempt). Jika tidak ada endpoint, biarkan '-'
                const jRes = await fetch('/api/journals', { credentials: 'include' });
                if (jRes.ok) {
                    const jJson = await jRes.json();
                    if (Array.isArray(jJson)) setJournalCount(String(jJson.length));
                    if (jJson?.success && Array.isArray(jJson.data)) setJournalCount(String(jJson.data.length));
                }
            } catch {}
        };
        fetchSummary();
    }, []);

    const Chart = ({ data = [] }) => {
        if (!data || data.length === 0) return <div className="flex-1 rounded-xl bg-slate-700/30 border border-blue-700/20"/>;
        const w = 600; const h = 200; const pad = 24;
        const max = Math.max(...data, 5); const min = Math.min(...data, 1);
        const xStep = (w - pad * 2) / Math.max(1, data.length - 1);
        const points = data.map((v,i)=>`${pad + i*xStep},${h - pad - ((v - min)/(max-min||1))*(h - pad*2)}`).join(' ');
        return (
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full rounded-xl bg-slate-700/30 border border-blue-700/20">
                <polyline fill="none" stroke="#60a5fa" strokeWidth="3" points={points} />
                {data.map((v,i)=>{
                    const x = pad + i*xStep;
                    const y = h - pad - ((v - min)/(max-min||1))*(h - pad*2);
                    return <circle key={i} cx={x} cy={y} r="3" fill="#93c5fd"/>;
                })}
            </svg>
        );
    };
    return (
        <LayoutUser>
            <div className="min-h-screen cursor-gaming bg-gradient-to-br from-slate-950 via-blue-950 to-black pt-24">
                <div className="mt-10 max-w-7xl mx-auto px-4 lg:px-8">
                    {/* Compact header */}
                    <div className="mb-6 grid grid-cols-12 gap-6 items-stretch">
                        <div className="col-span-12 lg:col-span-8 bg-slate-800/50 border border-blue-700/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">Selamat Datang di FixYou</h1>
                            <p className="text-white/70 text-sm lg:text-base">Ringkasan kesehatan mental Anda hari ini</p>
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div className="bg-slate-700/40 rounded-xl p-4 text-center">
                                    <div className="text-white text-xl font-bold">{moodAvg}</div>
                                    <div className="text-white/60 text-xs">Mood Rata-rata</div>
                                </div>
                                <div className="bg-slate-700/40 rounded-xl p-4 text-center">
                                    <div className="text-white text-xl font-bold">{journalCount}</div>
                                    <div className="text-white/60 text-xs">Jurnal Bulan Ini</div>
                                </div>
                                <div className="bg-slate-700/40 rounded-xl p-4 text-center">
                                    <div className="text-white text-xl font-bold">{curhatCount}</div>
                                    <div className="text-white/60 text-xs">Sesi Curhat</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-4 bg-slate-800/50 border border-blue-700/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex items-center justify-center">
                            <div className="grid grid-cols-4 gap-3 w-full">
                                <Link href="/moodtracker" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-medium text-white transition-all duration-300">
                                    <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                                    <Smile className="w-4 h-4 relative" />
                                    <span className="relative group-active:scale-95 transition-transform">Mood</span>
                                </Link>
                                <Link href="/curhat" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-medium text-white transition-all duration-300">
                                    <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                                    <MessageCircle className="w-4 h-4 relative" />
                                    <span className="relative group-active:scale-95 transition-transform">Curhat</span>
                                </Link>
                                <Link href="/journaling" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-medium text-white transition-all duration-300">
                                    <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                                    <BookOpen className="w-4 h-4 relative" />
                                    <span className="relative group-active:scale-95 transition-transform">Journal</span>
                                </Link>
                                <Link href="/psikolog" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-medium text-white transition-all duration-300">
                                    <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                                    <Users className="w-4 h-4 relative" />
                                    <span className="relative group-active:scale-95 transition-transform">Psikolog</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Single-screen summary grid */}
                    <div className="grid grid-cols-12 gap-6 pb-10">
                        {/* Left column - large chart placeholder */}
                        <div className="col-span-12 lg:col-span-8 bg-slate-800/50 border border-blue-700/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl h-[360px] flex flex-col">
                            <h3 className="text-white font-bold mb-2">Ringkasan Aktivitas</h3>
                            <div className="flex-1">
                                <Chart data={moodTrend} />
                            </div>
                        </div>

                        {/* Right column - small widgets */}
                        <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-6">
                            <div className="bg-slate-800/50 border border-blue-700/30 rounded-2xl p-4 shadow-xl">
                                <h4 className="text-white font-semibold">Mood Harian</h4>
                                <div className="mt-3 h-[90px] rounded-lg bg-slate-700/30"></div>
                            </div>
                            <div className="bg-slate-800/50 border border-blue-700/30 rounded-2xl p-4 shadow-xl">
                                <h4 className="text-white font-semibold">Jurnal Terakhir</h4>
                                <p className="text-white/60 text-sm mt-2">Refleksi Pagi - 1 jam lalu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}
