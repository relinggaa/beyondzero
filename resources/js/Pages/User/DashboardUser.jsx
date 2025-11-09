import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { Smile, MessageCircle, BookOpen, Users } from "lucide-react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function DashboardUser() {
    const [moodAvg, setMoodAvg] = useState('-');
    const [journalCount, setJournalCount] = useState('-');
    const [curhatCount, setCurhatCount] = useState('-');
    const [moodTrend, setMoodTrend] = useState([]);
    const [lastJournals, setLastJournals] = useState([]);
    const [todayMood, setTodayMood] = useState(null);

    // Map label mood ke skor 1–5
    const mapMood = (m) => {
        const t = String(m || '').toLowerCase();
        if (t.includes('amazing') || t.includes('bahagia')) return 5;
        if (t.includes('good') || t.includes('tenang') || t.includes('semangat')) return 4;
        if (t.includes('normal')) return 3;
        if (t.includes('bad') || t.includes('sedih') || t.includes('lelah')) return 2;
        if (t.includes('awful') || t.includes('cemas') || t.includes('marah')) return 1;
        return 3;
    };

    useEffect(() => {
        const fetchSummary = async () => {
            // Kumpulkan aktivitas per tanggal dari berbagai sumber, per kategori
            const moodByDate = {};      // { [YYYY-MM-DD]: item }
            const journalByDate = {};   // { [YYYY-MM-DD]: item }
            const curhatByDate = {};    // { [YYYY-MM-DD]: item }
            const healingByDate = {};   // { [YYYY-MM-DD]: item }
            const tsMood = {}; const tsJournal = {}; const tsCurhat = {}; const tsHealing = {}; // pilih entri terbaru per hari per kategori
            let hasServerSeries = false; // penanda jika chart sudah diisi dari API agregasi
            let hasServerSummary = false; // penanda jika kartu ringkasan diisi dari API
            const dayKey = (d) => {
                const x = new Date(d);
                const yyyy = x.getFullYear();
                const mm = String(x.getMonth()+1).padStart(2,'0');
                const dd = String(x.getDate()).padStart(2,'0');
                return `${yyyy}-${mm}-${dd}`;
            };
            // Coba ambil data agregasi counts harian dari server (lebih akurat & efisien)
            try {
                const aRes = await fetch('/api/dashboard/activity-counts?days=14', { credentials: 'include' });
                const aJson = await aRes.json().catch(() => ({}));
                if (aJson?.success && aJson.data) {
                    const d = aJson.data;
                    const series = {
                        days: Array.isArray(d.days) ? d.days.map(k => new Date(k)) : [],
                        mood: d.mood || [],
                        journaling: d.journaling || [],
                        curhat: d.curhat || [],
                        healing: d.healing || [],
                        psikolog: d.psikolog || [],
                    };
                    setMoodTrend(series);
                    hasServerSeries = true; // tetap lanjut fetch API lain untuk mengisi kartu ringkasan
                }
            } catch {}

            // Ambil ringkasan kartu langsung dari database
            try {
                const sRes = await fetch('/api/dashboard/summary', { credentials: 'include' });
                const sJson = await sRes.json().catch(() => ({}));
                if (sJson?.success && sJson.data) {
                    const d = sJson.data;
                    if (typeof d.mood_avg === 'number') {
                        setMoodAvg(`${d.mood_avg.toFixed(1)}/5`);
                    } else {
                        setMoodAvg('-');
                    }
                    setCurhatCount(String(d.curhat_count ?? 0));
                    setJournalCount(String(d.month_journal_count ?? 0));
                    setLastJournals(Array.isArray(d.latest_journals) ? d.latest_journals : []);
                    setTodayMood(d.today_mood || null);
                    hasServerSummary = true;
                }
            } catch {}
            if (!hasServerSummary) try {
                // Mood sessions summary
                const moodRes = await fetch('/api/chat/sessions?category=mood', { credentials: 'include' });
                const moodJson = await moodRes.json().catch(() => ({}));
                if (moodJson?.success && Array.isArray(moodJson.data)) {
                    // hitung rata-rata mood sederhana: map beberapa label ke angka
                    const scores = moodJson.data.map(s => mapMood(s.mood));
                    const avg = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
                    setMoodAvg(scores.length ? `${avg.toFixed(1)}/5` : '-');
                    // kumpulkan skor per hari dari sesi mood
                    moodJson.data.forEach(s => {
                        const ts = new Date(s.updated_at || s.created_at);
                        const key = dayKey(ts);
                        const score = mapMood(s.mood);
                        const prevTs = tsMood[key] || 0;
                        if (+ts > prevTs) {
                            tsMood[key] = +ts;
                            moodByDate[key] = {
                                score,
                                title: s.title,
                                label: s.mood,
                                date: ts,
                                source: 'mood',
                                category: s.category || 'mood'
                            };
                        }
                    });

                    // Mood harian dari sesi mood terbaru hari ini
                    try {
                        const now = new Date();
                        const isSameDay = (a,b) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
                        // urutkan berdasarkan updated_at desc bila ada
                        const sorted = [...moodJson.data].sort((a,b)=>new Date(b.updated_at||b.created_at) - new Date(a.updated_at||a.created_at));
                        const todaySession = sorted.find(s => {
                            const d = new Date(s.updated_at || s.created_at);
                            return isSameDay(d, now);
                        });
                        if (todaySession) {
                            setTodayMood({
                                label: todaySession.mood,
                                score: mapMood(todaySession.mood),
                                time: todaySession.updated_at || todaySession.created_at,
                                source: 'mood'
                            });
                        }
                    } catch {}
                }
            } catch {}

            if (!hasServerSummary) try {
                // Curhat sessions count
                const cRes = await fetch('/api/chat/sessions?category=curhat', { credentials: 'include' });
                const cJson = await cRes.json().catch(() => ({}));
                if (cJson?.success && Array.isArray(cJson.data)) {
                    setCurhatCount(String(cJson.data.length));
                    // simpan sebagai seri terpisah
                    cJson.data.forEach(s => {
                        const ts = new Date(s.updated_at || s.created_at);
                        const key = dayKey(ts);
                        const prevTs = tsCurhat[key] || 0;
                        if (+ts > prevTs) {
                            tsCurhat[key] = +ts;
                            curhatByDate[key] = {
                                score: 3, // netral untuk sesi curhat
                                title: s.title,
                                label: 'Curhat',
                                date: ts,
                                source: 'curhat',
                                category: s.category || 'curhat'
                            };
                        }
                    });
                }
            } catch {}

            try {
                // Healing (Stress Relief) history
                const hRes = await fetch('/api/games/stress-relief/history', { credentials: 'include' });
                const hJson = await hRes.json().catch(() => ({}));
                const sessions = hJson?.data?.sessions;
                if (Array.isArray(sessions)) {
                    const toScore = (intensity) => {
                        const x = Number(intensity || 0);
                        if (x <= 20) return 1;
                        if (x <= 40) return 2;
                        if (x <= 60) return 3;
                        if (x <= 80) return 4;
                        return 5;
                    };
                    sessions.forEach(s => {
                        const ts = new Date(s.completed_at || s.created_at || s.date);
                        if (isNaN(ts)) return;
                        const key = dayKey(ts);
                        const prevTs = tsHealing[key] || 0;
                        if (+ts > prevTs) {
                            tsHealing[key] = +ts;
                            healingByDate[key] = {
                                score: toScore(s.intensity),
                                title: s.title || 'Healing Session',
                                label: 'Healing',
                                date: ts,
                                source: 'healing',
                                category: 'healing'
                            };
                        }
                    });
                }
            } catch {}

            if (!hasServerSummary) try {
                // Journals API: ambil jumlah dan jurnal terakhir
                const jRes = await fetch('/api/journals', { credentials: 'include' });
                const jJson = await jRes.json().catch(() => ({}));
                if (jJson?.success) {
                    if (typeof jJson.month_count === 'number') {
                        setJournalCount(String(jJson.month_count));
                    } else if (Array.isArray(jJson.data)) {
                        // Fallback: hitung jumlah jurnal bulan ini di frontend
                        const now = new Date();
                        const mm = now.getMonth();
                        const yy = now.getFullYear();
                        const count = jJson.data.filter(j => {
                            const d = new Date(j.date || j.created_at);
                            return d.getMonth() === mm && d.getFullYear() === yy;
                        }).length;
                        setJournalCount(String(count));
                    }
                    // Ambil 3 jurnal terbaru
                    if (Array.isArray(jJson.data)) {
                        const sortedJournals = [...jJson.data].sort((a,b)=> new Date(b.date || b.created_at) - new Date(a.date || a.created_at));
                        setLastJournals(sortedJournals.slice(0,3));
                    } else if (jJson.latest) {
                        setLastJournals([jJson.latest]);
                    } else {
                        setLastJournals([]);
                    }

                    // Mood Harian kini hanya diambil dari moodtracker (tanpa fallback dari jurnal)

                    // Simpan seri jurnal terpisah (menggunakan mood dari jurnal bila ada)
                    try {
                        if (Array.isArray(jJson.data)) {
                            jJson.data.forEach(j => {
                                const ts = new Date(j.date || j.created_at);
                                const key = dayKey(ts);
                                if (j.mood) {
                                    const prevTs = tsJournal[key] || 0;
                                    if (+ts > prevTs) {
                                        tsJournal[key] = +ts;
                                        journalByDate[key] = {
                                            score: mapMood(j.mood),
                                            title: j.title,
                                            label: j.mood,
                                            date: ts,
                                            source: 'journal',
                                            category: 'journaling'
                                        };
                                    }
                                }
                            });
                        }
                    } catch {}
                }
            } catch {}

            // Setelah semua kategori diambil, susun 14 hari terakhir dan bentuk multi-seri
            try {
                const allDays = Array.from(new Set([
                    ...Object.keys(moodByDate),
                    ...Object.keys(journalByDate),
                    ...Object.keys(curhatByDate),
                    ...Object.keys(healingByDate),
                ])).sort();
                const lastDays = allDays.slice(-14);
                const series = {
                    days: lastDays.map(k => new Date(k)),
                    mood: lastDays.map(k => moodByDate[k] || null),
                    journaling: lastDays.map(k => journalByDate[k] || null),
                    curhat: lastDays.map(k => curhatByDate[k] || null),
                    healing: lastDays.map(k => healingByDate[k] || null),
                };
                if (!hasServerSeries) {
                    setMoodTrend(series);
                }
            } catch {}
        };
        fetchSummary();
    }, []);

    const formatDateShort = (date) => {
        try {
            const d = new Date(date);
            return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
        } catch {
            return '';
        }
    };

    const Chart = ({ data = [] }) => {
        const mapCategoryLabel = (raw) => {
            const x = String(raw || '').toLowerCase();
            if (x.includes('mood')) return 'MoodTracking';
            if (x.includes('curhat')) return 'Curhat';
            if (x.includes('psiko')) return 'Psikolog';
            if (x.includes('journal')) return 'Journaling';
            if (x.includes('heal')) return 'Healing';
            return 'Aktivitas';
        };
        // Deteksi mode multi-seri
        const isMulti = data && typeof data === 'object' && !Array.isArray(data);
        const w = 600; const h = 220; const pad = 24;
        const labelPadBottom = 48; // ruang untuk label sumbu-X (tanggal)
        const topPadExtra = 16;    // ruang ekstra di atas agar tidak mepet judul container
        const labelPadSide = 24;   // ruang kiri/kanan agar label tidak mepet tepi

        if (isMulti) {
            const days = Array.isArray(data.days) ? data.days : [];
            const seriesMap = {
                mood: data.mood || [],
                curhat: data.curhat || [],
                journaling: data.journaling || [],
                healing: data.healing || [],
                psikolog: data.psikolog || []
            };
            const [visible, setVisible] = useState({ mood: true, curhat: true, journaling: true, healing: true, psikolog: true });
            const toggleCat = (k) => setVisible(v => ({ ...v, [k]: !v[k] }));
            const allValues = Object.values(seriesMap).flat().map(it => it?.score).filter(v => typeof v === 'number');
            if (!days.length || !allValues.length) return <div className="flex-1 rounded-xl bg-slate-700/30 border border-blue-700/20"/>;
            const maxData = Math.max(...allValues, 1);
            const min = 0; // untuk counts gunakan baseline 0
            const max = Math.max(5, Math.ceil(maxData));
            const color = { mood: '#60a5fa', curhat: '#a78bfa', journaling: '#f59e0b', healing: '#14b8a6', psikolog: '#38bdf8' };
            const usableH = h - pad*2 - labelPadBottom - topPadExtra;
            const baselineY = h - pad - labelPadBottom;

            // Layout batang: berkelompok per hari (x), kategori berdampingan
            const groupWidth = (w - pad*2) / days.length;
            const cats = ['mood','curhat','journaling','healing','psikolog'];
            const innerPad = 6; // jarak antar batang dalam satu grup
            const innerWidth = Math.max(8, Math.min(22, (groupWidth - innerPad*(cats.length+1)) / cats.length));

            return (
                <div className="w-full">
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full rounded-xl bg-slate-700/30 border border-blue-700/20">
                    {/* Gridlines horizontal (skala 1..5) */}
                    {Array.from({length:6}, (_,i)=> Math.round(i*max/5)).map((v)=>{
                        const y = baselineY - ((v - min)/(max-min||1)) * Math.max(1, usableH);
                        const isAxis = v === 0;
                        return (
                            <g key={`grid-${v}`}>
                                <line x1={pad} x2={w-pad} y1={y} y2={y} stroke={isAxis? '#64748b' : '#334155'} strokeWidth={isAxis? 1.2 : 0.8} strokeDasharray={isAxis? '0' : '4 4'} />
                                <text x={pad-10} y={y+3} textAnchor="end" fontSize="10" fill="#cbd5e1">{v}</text>
                            </g>
                        );
                    })}

                    {/* Batang berkelompok per tanggal */}
                    {days.map((d,i)=>{
                        const groupX = pad + i*groupWidth;
                        return (
                            <g key={`grp-${i}`}>
                                {cats.map((k,idx)=>{
                                    const item = seriesMap[k][i];
                                    const x = groupX + innerPad + idx*(innerWidth + innerPad);
                                    if (!visible[k]) return null;
                                    if (!item) {
                                        // tampilkan placeholder tipis agar selalu terlihat 4 kategori
                                        const yTop = baselineY - 2; const hBar = 2;
                                        return (
                                            <rect key={`bar-${k}-${i}-empty`} x={x} y={yTop} width={innerWidth} height={hBar} rx={2} fill={color[k]} opacity={0.35}>
                                                <title>{mapCategoryLabel(k)}: Tidak ada aktivitas</title>
                                            </rect>
                                        );
                                    }
                                    const v = item.score ?? 0;
                                    const yTop = baselineY - ((v - min)/(max-min||1)) * Math.max(1, usableH);
                                    const hBar = Math.max(2, baselineY - yTop);
                                    const title = (item?.title || item?.label || mapCategoryLabel(item?.category || item?.source));
                                    const when = item?.date ? formatDateShort(item.date) : '';
                                    return (
                                        <rect key={`bar-${k}-${i}`} x={x} y={yTop} width={innerWidth} height={hBar} rx={3} fill={color[k]}>
                                            <title>{mapCategoryLabel(k)}: {title}{when ? ` — ${when}` : ''} (skor {v})</title>
                                        </rect>
                                    );
                                })}
                                {/* Label tanggal di bawah grup */}
                                <text x={groupX + groupWidth/2} y={baselineY + 14} textAnchor="middle" fontSize="10" fill="#cbd5e1">{formatDateShort(d)}</text>
                            </g>
                        );
                    })}

                </svg>
                {/* Legend di bawah chart */}
                <div className="mt-2 flex justify-center gap-6 select-none">
                    {cats.map((k)=>{
                        const active = !!visible[k];
                        return (
                            <button key={`legend-${k}`} onClick={() => toggleCat(k)} className="flex items-center gap-2" style={{ cursor: 'pointer', opacity: active ? 1 : 0.4 }}>
                                <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, backgroundColor: color[k] }} />
                                <span className="text-xs" style={{ color: '#cbd5e1' }}>{mapCategoryLabel(k)}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="text-center" style={{ marginTop: 8, fontSize: 12, color: '#cbd5e1' }}>
                    {data.title || 'Ringkasan Aktivitas'}
                </div>
                </div>
            );
        }

        // Mode lama: single-seri
        const values = Array.isArray(data) ? data.map(d => (typeof d === 'number' ? d : (d?.score ?? 0))) : [];
        if (!values.length) return <div className="flex-1 rounded-xl bg-slate-700/30 border border-blue-700/20"/>;
        const max = Math.max(...values, 5); const min = Math.min(...values, 1);
        const xStep = (w - pad * 2) / Math.max(1, values.length - 1);
        const points = values.map((v,i)=>{
            const usableH = h - pad*2 - labelPadBottom - topPadExtra;
            const y = h - pad - labelPadBottom - ((v - min)/(max-min||1)) * Math.max(1, usableH);
            const x = pad + i*xStep;
            return `${x},${y}`;
        }).join(' ');
        return (
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full rounded-xl bg-slate-700/30 border border-blue-700/20">
                <polyline fill="none" stroke="#60a5fa" strokeWidth="3" points={points} />
                {values.map((v,i)=>{
                    const x = pad + i*xStep;
                    const usableH = h - pad*2 - labelPadBottom - topPadExtra;
                    const y = h - pad - labelPadBottom - ((v - min)/(max-min||1)) * Math.max(1, usableH);
                    const labelY = h - pad - labelPadBottom + 14; // posisi label sedikit di atas tepi bawah
                    const item = Array.isArray(data) ? data[i] : null;
                    const label = typeof item === 'object' && item ? (item.title || item.label || 'Aktivitas') : 'Aktivitas';
                    const cat = typeof item === 'object' && item ? mapCategoryLabel(item.category || item.source || item.label) : 'Aktivitas';
                    const when = typeof item === 'object' && item?.date ? formatDateShort(item.date) : '';
                    const isFirst = i === 0;
                    const isLast = i === values.length - 1;
                    const anchor = isFirst ? 'start' : (isLast ? 'end' : 'middle');
                    let labelX = x + (isFirst ? labelPadSide : (isLast ? -labelPadSide : 0));
                    labelX = Math.max(pad + labelPadSide, Math.min(labelX, w - pad - labelPadSide));
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r="3.5" fill="#93c5fd">
                                <title>{label}{when ? ` — ${when}` : ''}</title>
                            </circle>
                            <text x={labelX} y={labelY} textAnchor={anchor} dominantBaseline="alphabetic" fontSize="10" fill="#cbd5e1">
                                {cat}
                            </text>
                        </g>
                    );
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
                                <Link href="/journaling" className="bg-slate-700/40 rounded-xl p-4 text-center hover:bg-slate-700/60 transition-colors">
                                    <div className="text-white text-xl font-bold">{journalCount}</div>
                                    <div className="text-white/60 text-xs">Jurnal Bulan Ini</div>
                                </Link>
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
                                {todayMood ? (
                                    <div className="mt-3 rounded-lg bg-slate-700/30 ">
                                        <div className="flex items-center justify-between ">
                                            <span className="text-white text-sm font-medium">{todayMood.label || '—'}</span>
                                            <span className="text-white/60 text-xs">{formatTimeAgo(todayMood.time)}</span>
                                        </div>
                                        <div className="mt-2 flex gap-1">
                                            {[1,2,3,4,5].map((i)=> (
                                                <div key={i} className={`h-2 flex-1 rounded ${i <= (todayMood.score||0) ? 'bg-blue-400' : 'bg-slate-600'}`}></div>
                                            ))}
                                        </div>
                                        <div className="mt-2 text-white/50 text-xs">Sumber: Mood tracker</div>
                                    </div>
                                ) : (
                                    <div className="mt-3 h-[90px] rounded-lg bg-slate-700/30 flex items-center justify-center">
                                        <span className="text-white/50 text-sm">Belum ada mood hari ini</span>
                                    </div>
                                )}
                            </div>
                            <div className="bg-slate-800/50 border border-blue-700/30 rounded-2xl p-4 shadow-xl">
                                <h4 className="text-white font-semibold">Jurnal Terakhir</h4>
                                {lastJournals && lastJournals.length ? (
                                    <ul className="mt-2 space-y-2">
                                        {lastJournals.map((j,idx)=> (
                                            <li key={idx} className="text-white/80 text-sm">
                                                {j.title || 'Jurnal'}
                                                <span className="text-white/50"> — {formatTimeAgo(j.date || j.created_at)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-white/50 text-sm mt-2">Belum ada jurnal</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}

// Util sederhana untuk format waktu relatif
function formatTimeAgo(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now - d;
    const minutes = Math.floor(diffMs / (60 * 1000));
    if (minutes < 1) return 'baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
}
