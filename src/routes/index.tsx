import { createFileRoute } from "@tanstack/react-router";
import { Heart, Sparkles, Star, Award } from "lucide-react";

export const Route = createFileRoute("/")({
 component: Index,
});

function Index() {
 return (
 <div className="min-h-screen bg-[#FCFCF9] flex items-center justify-center p-6 lg:p-8">
 <div className="w-full max-w-[560px]">
 {/* Card principal - fotografia com efeito Bartô */}
 <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.18),0_20px_60px_-20px_rgba(0,0,0,0.14)] border border-zinc-100">
 {/* Imagem original do cachorro - INTACTA */}
 <img
 src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80"
 alt="Cachorro comendo ração Bartô"
 className="absolute inset-0 w-full h-full object-cover object-[center_28%]"
 />

 {/* Vinheta suave para profundidade */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/[0.18] via-transparent via-40% to-transparent pointer-events-none" />
 <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

 {/* Selo Logo Bartô - Topo */}
 <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
 <div className="bg-white/95 backdrop-blur-xl rounded-[16px] sm:rounded-[18px] px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_12px_32px_rgba(0,0,0,0.14),0_4px_12px_rgba(0,0,0,0.10)] border border-white flex items-center gap-3">
 <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] bg-gradient-to-br from-[#E53935] to-[#8B1A1A] flex items-center justify-center shadow-[0_4px_12px_rgba(197,40,40,0.35)] shrink-0">
 <span className="text-white font-black text-[16px] tracking-tighter leading-none">B</span>
 </div>
 <div className="leading-none">
 <p className="text-[15px] sm:text-[16px] font-black tracking-[-0.04em] text-zinc-900 leading-none">BARTÔ</p>
 <p className="text-[8px] sm:text-[9px] font-extrabold tracking-[0.14em] text-[#C62828] mt-[2px]">PREMIUM ESPECIAL</p>
 <div className="flex items-center gap-1 mt-1">
 <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
 <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
 <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
 <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
 <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
 <span className="text-[8px] font-bold text-zinc-500 ml-1">5.0</span>
 </div>
 </div>
 </div>
 </div>

 {/* Badge flutuante direito */}
 <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 hidden sm:flex">
 <div className="bg-[#1A1A1A] rounded-full px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.20)] border border-white/10 flex items-center gap-2">
 <Award className="w-3.5 h-3.5 text-amber-400" />
 <span className="text-[10px] font-bold tracking-widest text-white">100% NATURAL</span>
 </div>
 </div>

 {/* Embalagem Bartô - apoio cênico lateral */}
 <div className="absolute left-[14px] sm:left-[18px] bottom-[28%] sm:bottom-[30%] z-10 rotate-[-7deg] w-[36%] sm:w-[34%] max-w-[168px]">
 <div className="relative w-full aspect-[3/4.15] rounded-[20px] bg-gradient-to-br from-[#FF3B30] via-[#E53935] to-[#7A0F0F] shadow-[0_24px_48px_rgba(0,0,0,0.38),0_8px_16px_rgba(0,0,0,0.22)] border border-white/15 overflow-hidden">
 {/* Brilho da embalagem */}
 <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
 <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/15 rounded-full blur-2xl pointer-events-none" />
 
 {/* Topo amarelo */}
 <div className="absolute top-0 inset-x-0 h-[10px] bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400" />
 
 {/* Conteúdo da embalagem */}
 <div className="relative h-full flex flex-col p-3 sm:p-3.5 pt-5">
 <div className="flex items-center gap-2">
 <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
 <Heart className="w-3.5 h-3.5 text-[#C62828] fill-[#C62828]" />
 </div>
 <span className="text-white font-black tracking-[-0.03em] text-[10px] leading-none">BARTÔ</span>
 <span className="ml-auto text-[7px] font-extrabold tracking-widest text-white/80 border border-white/30 rounded-full px-1.5 py-0.5">15 KG</span>
 </div>

 <div className="mt-3 leading-[0.85]">
 <p className="text-white font-black text-[28px] sm:text-[30px] tracking-[-0.05em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">BAR</p>
 <p className="text-white font-black text-[28px] sm:text-[30px] tracking-[-0.05em] -mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">TÔ</p>
 <p className="text-amber-200 font-extrabold text-[9px] tracking-[0.18em] mt-1">PREMIUM ESPECIAL</p>
 </div>

 <div className="mt-auto">
 <div className="bg-white rounded-[12px] p-2 flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
 <div className="w-10 h-10 rounded-[9px] bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center overflow-hidden shrink-0">
 <span className="text-[16px]">🦴</span>
 </div>
 <div className="leading-none">
 <p className="text-[8px] font-black tracking-widest text-[#C62828]">SABOR CARNE</p>
 <p className="text-[10px] font-bold text-zinc-800 tracking-tight">Cães Adultos</p>
 <p className="text-[7px] font-medium text-zinc-500">Raças Médias e Grandes</p>
 </div>
 </div>
 <div className="flex items-center justify-center gap-1.5 mt-2.5">
 <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
 <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
 <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
 </div>
 </div>
 </div>
 </div>
 {/* Sombra projetada da embalagem */}
 <div className="absolute -bottom-3 left-3 right-3 h-6 bg-black/25 blur-[12px] rounded-[50%] -z-10" />
 </div>

 {/* Tigela com ração Bartô - exatamente onde ele come */}
 <div className="absolute left-1/2 -translate-x-[42%] sm:-translate-x-[38%] bottom-[7%] sm:bottom-[8%] z-30 w-[62%] sm:w-[56%] max-w-[300px]">
 <div className="relative">
 {/* Kibbles espalhados - efeito apetitoso */}
 <div className="absolute -top-3 -right-2 w-3 h-[11px] bg-[#8B4513] rounded-[4px] rotate-[18deg] shadow-[0_2px_6px_rgba(0,0,0,0.18)] border border-[#A05A24]/30" />
 <div className="absolute -top-1 -right-6 w-2.5 h-2.5 bg-[#7A3A0F] rounded-[3px] rotate-[-12deg] shadow-sm" />
 <div className="absolute -top-2 left-8 w-2 h-2 bg-[#9C5A1F] rounded-[3px] rotate-[24deg] shadow-sm opacity-90" />
 <div className="absolute -top-5 left-1/2 w-2.5 h-2.5 bg-[#8B4513] rounded-[4px] rotate-[8deg] shadow-sm" />
 
 {/* Tigela cerâmica premium */}
 <div className="relative mx-auto w-full h-[64px] sm:h-[74px] bg-gradient-to-b from-white via-white to-zinc-50 rounded-[50%] border border-zinc-200/80 shadow-[0_18px_36px_rgba(0,0,0,0.20),0_6px_16px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,1)] overflow-hidden">
 {/* Borda interna */}
 <div className="absolute inset-[5px] rounded-[50%] border border-zinc-100 pointer-events-none" />
 {/* Sombra interna superior */}
 <div className="absolute inset-x-5 top-[7px] h-7 bg-gradient-to-b from-zinc-900/[0.07] to-transparent rounded-[50%] blur-[1px] pointer-events-none" />
 {/* Brilho da borda */}
 <div className="absolute inset-x-8 top-[4px] h-[10px] bg-white/90 rounded-[50%] blur-[1px] pointer-events-none opacity-70" />
 
 {/* Ração dentro da tigela */}
 <div className="absolute inset-x-3 top-[11px] bottom-[10px] flex flex-wrap content-center justify-center items-center gap-[5px] sm:gap-[6px] p-1">
 {Array.from({ length: 22 }).map((_, i) => (
 <div
 key={i}
 className="shrink-0 rounded-[4px] sm:rounded-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.35)] border border-black/5"
 style={{
 width: `${9 + (i % 3) * 1.5}px`,
 height: `${8 + (i % 4)}px`,
 background: i % 3 === 0? "linear-gradient(135deg,#9C5A1F 0%,#7A3A0F 100%)": i % 3 === 1? "linear-gradient(135deg,#A66A2A 0%,#8B4513 100%)": "linear-gradient(135deg,#8B4513 0%,#6B2F0B 100%)",
 transform: `rotate(${(i * 17) % 40 - 20}deg)`,
 }}
 />
 ))}
 </div>
 {/* Reflexo úmido da ração */}
 <div className="absolute left-1/2 -translate-x-1/2 top-[14px] w-[58%] h-5 bg-gradient-to-b from-amber-100/20 to-transparent rounded-[50%] blur-[2px] pointer-events-none" />
 </div>
 
 {/* Sombra projetada da tigela no chão */}
 <div className="absolute -bottom-2 left-6 right-6 h-5 bg-black/20 blur-[10px] rounded-[50%] -z-10" />
 <div className="absolute -bottom-1 left-10 right-10 h-3 bg-black/15 blur-[6px] rounded-[50%] -z-10" />
 </div>
 </div>

 {/* Efeito mágico - partículas e amor pela ração */}
 <div className="absolute left-[58%] bottom-[21%] z-20 flex items-center gap-1.5 pointer-events-none">
 <div className="w-7 h-7 rounded-full bg-white/95 backdrop-blur shadow-[0_6px_16px_rgba(0,0,0,0.14)] border border-amber-100 flex items-center justify-center animate-pulse">
 <Heart className="w-3.5 h-3.5 text-[#E53935] fill-[#E53935]" />
 </div>
 <div className="hidden sm:flex bg-white/95 backdrop-blur rounded-full px-3 py-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-zinc-100 items-center gap-1.5">
 <Sparkles className="w-3 h-3 text-amber-500" />
 <span className="text-[10px] font-extrabold tracking-tight text-zinc-800 whitespace-nowrap">Amor à primeira mordida</span>
 </div>
 </div>

 {/* Brilhos flutuantes */}
 <div className="absolute left-[52%] bottom-[26%] w-1.5 h-1.5 bg-amber-300 rounded-full blur-[0.5px] shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse pointer-events-none" />
 <div className="absolute left-[62%] bottom-[24%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)] pointer-events-none" />
 <div className="absolute left-[68%] bottom-[19%] w-1 h-1 bg-amber-200 rounded-full blur-[0.3px] pointer-events-none" />

 {/* Faixa inferior premium - discreta */}
 <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#C62828] via-[#E53935] to-amber-400 pointer-events-none" />
 </div>

 {/* Legenda externa opcional - elegante e minimalista */}
 <div className="mt-5 flex items-center justify-center gap-2">
 <div className="h-px w-8 bg-zinc-200" />
 <p className="text-[11px] font-bold tracking-[0.18em] text-zinc-400 uppercase">Bartô • Nutrição que ele ama</p>
 <div className="h-px w-8 bg-zinc-200" />
 </div>
 </div>
 </div>
 );
}
