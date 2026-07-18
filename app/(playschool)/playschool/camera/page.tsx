"use client";

import { useEffect, useState, useRef } from "react";
import { usePlayschoolDb } from "../context/PlayschoolDb";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PlayschoolCamera() {
  const { session, isCameraAccessible, cameraSettings } = usePlayschoolDb();
  const router = useRouter();

  const [access, setAccess] = useState<{ accessible: boolean; reason?: string }>({ accessible: false });
  const [loading, setLoading] = useState(true);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [timeStr, setTimeStr] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check auth and hours
  useEffect(() => {
    if (!session || session.role !== "parent" || !session.childProfile) {
      router.push("/playschool/login");
      return;
    }

    const checkAccess = () => {
      const child = session.childProfile;
      if (child) {
        const authCheck = isCameraAccessible(child.cameraName);
        setAccess(authCheck);
      }
      setLoading(false);
    };

    checkAccess();
    const interval = setInterval(checkAccess, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, [session, isCameraAccessible, router]);

  // Update CCTV Timestamp clock
  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      setTimeStr(d.toLocaleDateString() + "  " + d.toLocaleTimeString());
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Animate mock CCTV canvas stream
  useEffect(() => {
    if (!access.accessible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let frameCount = 0;

    // Mini items to draw (simulating kids & blocks)
    const items = [
      { x: 120, y: 150, r: 18, color: "#DB2777", label: "👶 Aarav", vx: 0.1, vy: -0.05 },
      { x: 300, y: 220, r: 18, color: "#0284C7", label: "👶 Kabir", vx: -0.08, vy: 0.09 },
      { x: 200, y: 100, r: 18, color: "#EA580C", label: "👶 Saanvi", vx: 0.05, vy: 0.05 },
      { x: 400, y: 120, r: 18, color: "#16A34A", label: "👶 Riya", vx: -0.04, vy: -0.04 }
    ];

    const draw = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Apply Zoom & Pan
      ctx.translate(canvas.width / 2 + pan.x, canvas.height / 2 + pan.y);
      ctx.scale(zoom, zoom);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Draw Classroom Background (walls, carpet, shelves)
      ctx.fillStyle = "#FEF08A"; // Yellow playroom walls
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#E0F2FE"; // Sky blue play carpet
      ctx.fillRect(30, 60, canvas.width - 60, canvas.height - 90);

      // Shelves/Toys grid
      ctx.fillStyle = "#E2E8F0";
      ctx.fillRect(40, 10, 100, 30);
      ctx.fillStyle = "#F472B6"; // Toy block
      ctx.fillRect(50, 15, 20, 20);
      ctx.fillStyle = "#60A5FA"; // Toy block
      ctx.fillRect(75, 15, 25, 20);

      // Teacher Desk
      ctx.fillStyle = "#D97706";
      ctx.fillRect(canvas.width - 120, 20, 80, 45);
      ctx.fillStyle = "#111827";
      ctx.font = "8px sans-serif";
      ctx.fillText("TEACHER DESK", canvas.width - 110, 45);

      // Draw children bouncing around playing
      items.forEach((item) => {
        // Move children
        item.x += item.vx;
        item.y += item.vy;

        // Bounce walls
        if (item.x - item.r < 30 || item.x + item.r > canvas.width - 30) item.vx *= -1;
        if (item.y - item.r < 60 || item.y + item.r > canvas.height - 30) item.vy *= -1;

        // Shadow
        ctx.beginPath();
        ctx.ellipse(item.x, item.y + 14, item.r * 0.8, 5, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fill();

        // Kid circle
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.fillStyle = item.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

        // Label name
        ctx.fillStyle = "#1F2937";
        ctx.font = "bold 9px sans-serif";
        ctx.fillText(item.label, item.x - 18, item.y - 22);

        // Smiley face inside circle
        ctx.beginPath();
        ctx.arc(item.x - 5, item.y - 2, 2, 0, Math.PI * 2);
        ctx.arc(item.x + 5, item.y - 2, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(item.x, item.y + 3, 5, 0, Math.PI);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Play Gym slides
      ctx.fillStyle = "#F59E0B";
      ctx.fillRect(50, 180, 60, 40);
      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.moveTo(110, 180);
      ctx.lineTo(150, 220);
      ctx.lineTo(130, 220);
      ctx.lineTo(110, 200);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // CCTV HUD overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, 25);

      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.arc(20, 12, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#34D399";
      ctx.font = "bold 10px monospace";
      ctx.fillText("REC  LIVE  CAM_01  " + (session?.childProfile?.cameraName.toUpperCase() || "CLASSROOM"), 32, 16);

      ctx.fillText(timeStr, canvas.width - 190, 16);

      // Scanline static overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let i = 0; i < canvas.height; i += 4) {
        ctx.fillRect(0, i, canvas.width, 1);
      }

      // Simulate slight CCTV grain/flicker
      if (Math.random() > 0.98) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animFrame);
  }, [access, timeStr, pan, zoom, session]);

  const handleZoom = (factor: number) => {
    setZoom(prev => Math.max(1, Math.min(3, prev + factor)));
  };

  const handlePan = (dx: number, dy: number) => {
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  if (loading) {
    return (
      <main className="bg-slate-50 min-h-screen pt-28 pb-20 flex items-center justify-center font-['Quicksand']">
        <div className="text-center space-y-4">
          <span className="text-5xl block animate-spin">⏳</span>
          <p className="font-bold text-gray-500">Checking Camera Permissions...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 LIVE CAMERA FEED</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Secure Classroom CCTV Stream
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Authorized portal mapping your child directly to their mapped playroom camera feed.
          </p>
        </div>
      </section>

      {/* ========== VIDEO CONSOLE ========== */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        
        {access.accessible ? (
          <div className="space-y-6">
            
            {/* Screen */}
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-8 border-slate-900 shadow-2xl bg-black">
              <canvas
                ref={canvasRef}
                width={720}
                height={405}
                className="w-full h-full block bg-[#1e293b]"
              />

              {/* Pan/Zoom HUD indicator */}
              <div className="absolute bottom-6 right-6 bg-slate-900/80 text-white px-3.5 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase">
                Zoom: {zoom.toFixed(1)}x | Pan: X({pan.x}), Y({pan.y})
              </div>
            </div>

            {/* Camera Console Controllers */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleZoom(0.2)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-black shadow-xs transition"
                >
                  ➕ Zoom In
                </button>
                <button
                  onClick={() => handleZoom(-0.2)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-black shadow-xs transition"
                >
                  ➖ Zoom Out
                </button>
                <button
                  onClick={handleReset}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-black shadow-xs transition"
                >
                  🔄 Reset View
                </button>
              </div>

              <div className="flex gap-2.5 font-black text-xs">
                <button onClick={() => handlePan(-15, 0)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center shadow-xs">◀</button>
                <button onClick={() => handlePan(0, -15)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center shadow-xs">▲</button>
                <button onClick={() => handlePan(0, 15)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center shadow-xs">▼</button>
                <button onClick={() => handlePan(15, 0)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center shadow-xs">▶</button>
              </div>
            </div>

            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 text-left text-xs text-pink-800 font-bold space-y-2.5">
              <h4 className="font-['Fredoka'] font-black text-sm">🔒 Encryption & Privacy Guidelines</h4>
              <p>
                Classroom feeds are secure point-to-point tunnels. Feeds are only active during preschool class times (Monday-Friday: {cameraSettings.startTime} to {cameraSettings.endTime}). Session logs record your IP address for security auditing.
              </p>
              <Link href="/playschool/login" className="text-pink-600 font-extrabold block">
                ← Go back to Parent Dashboard
              </Link>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border-4 border-dashed border-pink-200 p-12 text-center space-y-6 shadow-md max-w-xl mx-auto">
            <span className="text-6xl block">📹⚠️</span>
            <h2 className="font-['Fredoka'] font-black text-2xl text-slate-800">CCTV Feed Unavailable</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed">
              {access.reason || "CCTV cameras are offline. Fee restrictions or non-school hours policy is active."}
            </p>
            
            <div className="bg-slate-50 p-4.5 rounded-2xl text-xs text-slate-600 leading-relaxed font-bold text-left space-y-1.5">
              <p>🟢 <strong>Expected school hours:</strong> Monday to Friday: 09:00 AM - 01:00 PM</p>
              <p>🚫 <strong>Current CCTV switch:</strong> {cameraSettings.enabled ? "ACTIVE" : "OFFLINE"}</p>
            </div>

            <div className="flex justify-center gap-4.5 pt-4">
              <Link
                href="/playschool/login"
                className="bg-sky-500 hover:bg-sky-600 text-white font-black text-xs uppercase px-6 py-3 rounded-full shadow-sm transition"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/playschool/faq#cctv"
                className="border-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-black text-xs uppercase px-6 py-3 rounded-full transition"
              >
                Read Camera FAQ
              </Link>
            </div>
          </div>
        )}

      </section>

    </div>
  );
}
