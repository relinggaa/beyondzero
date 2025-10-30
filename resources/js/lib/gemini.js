// Lightweight Gemini API helper for frontend usage
// Requires: VITE_GEMINI_API_KEY in your environment

// Align with current Developer Docs
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function getApiKey() {
    try {
        // 1) Vite build-time env
        const fromVite = import.meta?.env?.VITE_GEMINI_API_KEY;
        if (fromVite) return fromVite;

        // 2) Runtime global (can be injected without rebuild)
        if (typeof window !== 'undefined' && window.__GEMINI_API_KEY) {
            return window.__GEMINI_API_KEY;
        }

        // 3) Runtime meta tag
        if (typeof document !== 'undefined') {
            const meta = document.querySelector('meta[name="gemini-api-key"]');
            if (meta?.content) return meta.content;
        }

        return '';
    } catch {
        return '';
    }
}

export async function geminiGenerate(prompt) {
    // Prefer server-side proxy if available
    try {
        const resp = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
            credentials: 'include',
        });
        if (resp.ok) {
            const data = await resp.json();
            if (data?.success && data?.response) return data.response;
        }
    } catch {}

    // Fallback to direct browser call
    const apiKey = getApiKey();

    if (!apiKey) {
        throw new Error('Missing VITE_GEMINI_API_KEY');
    }

    const url = `${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: String(prompt || '') }],
                },
            ],
        }),
    });

    if (!res.ok) {
        let detail = '';
        try { detail = await res.text(); } catch {}
        console.error('[Gemini] Request failed', { status: res.status, url, detail });
        throw new Error(`Gemini HTTP ${res.status}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.map(p => p?.text || '').join(' ').trim();
    return text || 'Maaf, tidak ada respons.';
}


