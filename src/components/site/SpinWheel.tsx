import { useEffect, useRef, useState } from "react";
import { X, Gift } from "lucide-react";
import { LINKS } from "@/lib/social";

const STORAGE_KEY = "fno_spin_done";
const PROMO_KEY = "fno_promo";

function generateCode(offer: string): string {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  const prefix = offer.includes("%") ? "PCT" : offer.includes("Free") ? "FREE" : "OFF";
  return `FNO-${prefix}-${rand}`;
}

const SEGMENTS = [
  { label: "10% Off",        color: "#f43f5e", text: "#fff" },
  { label: "₹100 Off",       color: "#fb923c", text: "#fff" },
  { label: "5% Off",         color: "#f43f5e", text: "#fff" },
  { label: "Better Luck!",   color: "#fda4af", text: "#fff" },
  { label: "Free Accessory", color: "#e11d48", text: "#fff" },
  { label: "₹50 Off",        color: "#fb923c", text: "#fff" },
];

const TOTAL = SEGMENTS.length;
const ARC = (2 * Math.PI) / TOTAL;
const RADIUS = 130;
const CENTER = 150;

function drawWheel(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  SEGMENTS.forEach((seg, i) => {
    const start = i * ARC - Math.PI / 2;
    const end = start + ARC;

    // Slice
    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.arc(CENTER, CENTER, RADIUS, start, end);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label
    ctx.save();
    ctx.translate(CENTER, CENTER);
    ctx.rotate(start + ARC / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = seg.text;
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.fillText(seg.label, RADIUS - 10, 5);
    ctx.restore();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(CENTER, CENTER, 18, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.strokeStyle = "#f43f5e";
  ctx.lineWidth = 3;
  ctx.stroke();
}

export function SpinWheel() {
  const [visible, setVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Show popup after 3s, only if never spun before
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Draw wheel whenever visible
  useEffect(() => {
    if (visible && canvasRef.current) {
      drawWheel(canvasRef.current);
    }
  }, [visible]);

  function spin() {
    if (spinning || result) return;
    setSpinning(true);

    // Pick a random winning segment
    const winIndex = Math.floor(Math.random() * TOTAL);
    // Land pointer (top = -90°) on segment center
    const targetAngle =
      360 * 5 + // 5 full spins
      (360 - (winIndex * (360 / TOTAL) + 360 / TOTAL / 2));

    const duration = 4000;
    const start = performance.now();
    const startRot = rotationRef.current % 360;

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentRot = startRot + targetAngle * ease;
      rotationRef.current = currentRot;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d")!;
        ctx.save();
        ctx.translate(CENTER, CENTER);
        ctx.rotate((currentRot * Math.PI) / 180);
        ctx.translate(-CENTER, -CENTER);
        drawWheel(canvas);
        ctx.restore();
        // Redraw properly with rotation
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(CENTER, CENTER);
        ctx.rotate((currentRot * Math.PI) / 180);
        ctx.translate(-CENTER, -CENTER);
        drawWheel(canvas);
        ctx.restore();
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setResult(SEGMENTS[winIndex].label);
        localStorage.setItem(STORAGE_KEY, "1");
        // Save promo code if it's a real win
        if (SEGMENTS[winIndex].label !== "Better Luck!") {
          const code = generateCode(SEGMENTS[winIndex].label);
          localStorage.setItem(PROMO_KEY, JSON.stringify({
            code,
            offer: SEGMENTS[winIndex].label,
            used: false,
          }));
        }
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }

  function close() {
    cancelAnimationFrame(rafRef.current);
    setVisible(false);
    // Mark as done so it never shows again
    localStorage.setItem(STORAGE_KEY, "1");
  }

  if (!visible) return null;

  const whatsappMsg = result && result !== "Better Luck!"
    ? `Hi! I just won "${result}" on FNO Jaripatka's spin wheel 🎉 I'd like to use this offer on my next order!`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-rose/10 flex items-center justify-center text-rose hover:bg-rose hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        {!result ? (
          <>
            <div className="flex items-center gap-2 text-rose">
              <Gift className="h-5 w-5" />
              <span className="font-display text-xl text-ink">Spin & Win!</span>
            </div>
            <p className="text-xs text-ink/50 text-center -mt-2">
              Spin once to unlock your exclusive offer 🎀
            </p>
          </>
        ) : (
          <div className="flex items-center gap-2 text-rose">
            <Gift className="h-5 w-5" />
            <span className="font-display text-xl text-ink">You Won!</span>
          </div>
        )}

        {/* Wheel */}
        {!result && (
          <div className="relative">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-rose drop-shadow" />
            </div>
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="rounded-full shadow-lg"
            />
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="text-center flex flex-col items-center gap-3 py-2">
            {result === "Better Luck!" ? (
              <>
                <div className="text-5xl">😅</div>
                <p className="font-display text-2xl text-ink">Better Luck Next Time!</p>
                <p className="text-sm text-ink/50">Don't worry — come visit us in store for the best deals!</p>
                <button
                  onClick={close}
                  className="mt-2 bg-ink text-white px-6 py-2.5 rounded-full text-xs tracking-widest hover:bg-rose transition"
                >
                  CLOSE
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl">🎉</div>
                <div className="bg-rose-soft rounded-2xl px-8 py-4 text-center">
                  <p className="text-xs text-rose tracking-widest uppercase mb-1">Your Offer</p>
                  <p className="font-display text-3xl text-ink">{result}</p>
                </div>
                {/* Show promo code */}
                {(() => {
                  const saved = localStorage.getItem(PROMO_KEY);
                  const promo = saved ? JSON.parse(saved) : null;
                  return promo ? (
                    <div className="w-full">
                      <p className="text-xs text-ink/50 text-center mb-2">Your promo code:</p>
                      <div className="flex items-center gap-2 bg-ink rounded-xl px-4 py-3">
                        <span className="flex-1 text-center font-mono font-bold text-white text-lg tracking-widest">
                          {promo.code}
                        </span>
                        <button
                          onClick={() => navigator.clipboard.writeText(promo.code)}
                          className="text-white/60 hover:text-white text-xs border border-white/30 rounded px-2 py-1 transition"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-[10px] text-ink/40 text-center mt-2">
                        Apply this code in your cart to get {result}
                      </p>
                    </div>
                  ) : null;
                })()}
                <p className="text-xs text-ink/50 text-center max-w-xs">
                  Apply the code in your cart or show this on WhatsApp to claim!
                </p>
                {whatsappMsg && (
                  <a
                    href={`https://wa.me/${LINKS.phone1.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-full text-sm font-medium hover:bg-[#22c55e] transition"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Claim on WhatsApp
                  </a>
                )}
                <button
                  onClick={close}
                  className="text-xs text-ink/40 hover:text-ink transition"
                >
                  Close
                </button>
              </>
            )}
          </div>
        )}

        {/* Spin button */}
        {!result && (
          <button
            onClick={spin}
            disabled={spinning}
            className={`w-full py-3.5 rounded-full text-white font-medium text-sm tracking-wide transition-all ${
              spinning
                ? "bg-rose/50 cursor-not-allowed"
                : "bg-rose hover:bg-rose/90 shadow-lg hover:shadow-rose/30 hover:scale-105"
            }`}
          >
            {spinning ? "Spinning..." : "🎰 SPIN NOW"}
          </button>
        )}

        <p className="text-[10px] text-ink/30 text-center">
          One spin per device • Valid in-store only
        </p>
      </div>
    </div>
  );
}
