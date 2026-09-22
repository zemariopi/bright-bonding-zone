import { createFileRoute } from "@tanstack/react-router";
import { PawPrint, MessageCircle, ShieldCheck, Award } from "lucide-react";

export const Route = createFileRoute("/")({
 component: Index,
});

function Index() {
 const whatsappNumber = "5562991615599";
 const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Ol%C3%A1%20Agrora%C3%A7a!%20Vi%20a%20vitrine%20premium%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20ra%C3%A7%C3%B5es.`;

 return (
 <div className="min-h-screen bg-[#FCFCF9] text-zinc-900 selection:bg-[#25D366]/20">
 {/* Header Minimalista Premium - Mantido */}
 <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
 <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center">
 <PawPrint className="w-5 h-5 text-white" />
 </div>
 <div>
 <h1 className="text-[20px] font-black tracking-[-0.02em] leading-none text-zinc-900">Agroraça</h1>
 <p className="text-[10px] tracking-[0.2em] font-semibold text-zinc-500 uppercase -mt-0.5">Pet Premium • Desde 2015</p>
 </div>
 </div>
 <div className="hidden md:flex items-center gap-2 text-xs font-medium text-zinc-600">
 <span className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5">
 <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Atendimento Especializado
 </span>
 <span className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5">
 <Award className="w-3.5 h-3.5 text-amber-600" /> Qualidade Garantida
 </span>
 </div>
 <a
 href={whatsappUrl}
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
 >
 <MessageCircle className="w-4 h-4 fill-white" />
 <span className="hidden sm:inline">(62) 99161-5599</span>
 <span className="sm:hidden">WhatsApp</span>
 </a>
 </div>
 </header>

 {/* Apenas a Imagem com os dizeres da loja */}
 <main className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8 lg:py-12 flex justify-center">
 <div className="w-full max-w-[560px]">
 {/* Card Fotográfico 4:5 */}
 <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.30),0_20px_60px_-20px_rgba(0,0,0,0.15)] border border-zinc-100">
 <img
 src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80"
 alt="Vitrine Agroraça pet premium"
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/10" />
 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 via-transparent to-transparent" />
 <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[280px] h-[480px] bg-white/40 blur-[60px] rounded-full pointer-events-none" />
 <div className="absolute -right-16 top-20 w-[200px] h-[300px] bg-amber-100/30 blur-[50px] rounded-full pointer-events-none" />

 <div className="absolute inset-0 flex flex-col p-6 lg:p-8">
 {/* Centro: Logotipo Agroraça em alto relevo */}
 <div className="flex-1 flex flex-col items-center justify-center">
 <div className="bg-white/95 backdrop-blur-xl rounded-[20px] px-8 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/80 text-center">
 <div className="flex items-center justify-center gap-2 mb-1">
 <PawPrint className="w-5 h-5 text-zinc-900" />
 <span className="text-[11px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Agroraça</span>
 <PawPrint className="w-5 h-5 text-zinc-900" />
 </div>
 <h2 className="text-[28px] lg:text-[32px] font-black tracking-[-0.03em] text-zinc-900 leading-none">AGRORAÇA</h2>
 <p className="text-[10px] tracking-[0.25em] font-bold text-zinc-500 uppercase mt-1">Qualidade Premium Pet</p>
 <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-900/20 to-transparent" />
 </div>
 </div>

 {/* Prateleiras Minimalistas com Rações - sem textos técnicos */}
 <div className="space-y-3">
 <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/70">
 <div className="grid grid-cols-4 gap-2.5">
 {[
 { color: "bg-[#0E6FFF]", label: "Premium", sub: "15kg", accent: "bg-blue-600" },
 { color: "bg-[#FF7A00]", label: "Super", sub: "10kg", accent: "bg-orange-600" },
 { color: "bg-[#00B37E]", label: "Natural", sub: "12kg", accent: "bg-emerald-600" },
 { color: "bg-[#E11D48]", label: "Vitale", sub: "8kg", accent: "bg-rose-600" },
 ].map((item) => (
 <div key={item.label} className="group">
 <div className={`relative h-[92px] rounded-xl ${item.color} p-2.5 flex flex-col justify-between overflow-hidden shadow-md`}>
 <div className={`absolute -right-3 -top-3 w-12 h-12 ${item.accent} rounded-full opacity-20 blur-[1px]`} />
 <div className="relative">
 <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
 <PawPrint className="w-3.5 h-3.5 text-zinc-900" />
 </div>
 </div>
 <div className="relative text-white">
 <p className="text-[11px] font-black leading-none">{item.label}</p>
 <p className="text-[9px] font-bold opacity-90">{item.sub}</p>
 </div>
 <div className="absolute bottom-1.5 right-1.5 bg-white text-zinc-900 text-[7px] font-black px-1.5 py-0.5 rounded-full">★ 5.0</div>
 </div>
 <div className="mt-1.5 h-1 w-full bg-white rounded-full shadow-sm border border-zinc-100" />
 </div>
 ))}
 </div>
 </div>

 <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.10)] border border-white/60 flex items-center justify-center gap-3">
 <div className="flex -space-x-2">
 <div className="w-10 h-10 rounded-xl bg-zinc-900 border-2 border-white flex items-center justify-center shadow-sm">
 <span className="text-[10px]">🦴</span>
 </div>
 <div className="w-10 h-10 rounded-xl bg-[#FFD23F] border-2 border-white flex items-center justify-center shadow-sm">
 <span className="text-[10px]">🎾</span>
 </div>
 <div className="w-10 h-10 rounded-xl bg-[#0E6FFF] border-2 border-white flex items-center justify-center shadow-sm">
 <span className="text-[10px]">🐾</span>
 </div>
 </div>
 </div>
 </div>

 <div className="mt-3 h-[18px] bg-gradient-to-b from-white/70 to-white/0 backdrop-blur-[1px] rounded-full border border-white/40 shadow-inner relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[6px]" />
 </div>
 </div>

 {/* Sobreposição gráfica elegante - dizeres da loja */}
 <div className="absolute bottom-4 right-4 left-4">
 <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10 relative overflow-hidden">
 <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#25D366]/20 blur-2xl rounded-full" />
 <div className="relative flex gap-3">
 <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
 <MessageCircle className="w-5 h-5 text-white fill-white" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-[13px] font-bold leading-tight text-white">Qualidade para o seu melhor amigo.</p>
 <p className="text-[12px] font-semibold text-emerald-300 mt-0.5 flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> WhatsApp: (62) 99161-5599
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </main>

 <div className="max-w-[1200px] mx-auto px-6 lg:px-8 border-t border-zinc-100 pt-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
 <p className="font-medium">© 2026 Agroraça • Qualidade para o seu melhor amigo.</p>
 <p className="inline-flex items-center gap-2 font-semibold bg-white border border-zinc-200 rounded-full px-3 py-1.5">
 <PawPrint className="w-3.5 h-3.5 text-zinc-900" /> (62) 99161-5599
 </p>
 </div>
 </div>
 );
}
