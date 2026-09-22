import { createFileRoute } from "@tanstack/react-router";
import { Camera, Aperture, Frame, MessageCircle, Download, Share2, Sparkles, Star, ShieldCheck, Award, PawPrint, Sun, Layers } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
 component: Index,
});

function Index() {
 const whatsappNumber = "5562991615599";
 const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Ol%C3%A1%20Agrora%C3%A7a!%20Vi%20a%20vitrine%20premium%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20ra%C3%A7%C3%B5es.`;

 return (
 <div className="min-h-screen bg-[#FCFCF9] text-zinc-900 selection:bg-[#25D366]/20">
 {/* Header Minimalista Premium */}
 <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
 <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center">
 <PawPrint className="w-5 h-5 text-white" />
 </div>
 <div>
 <h1 className="text-[20px] font-black tracking-[-0.02em] leading-none text-zinc-900">
 Agroraça
 </h1>
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

 {/* Hero Editorial */}
 <main className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8 lg:py-12">
 <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
 {/* Card Fotográfico 4:5 */}
 <div className="relative">
 <div className="relative aspect-[4/5] w-full max-w-[560px] mx-auto overflow-hidden rounded-[32px] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.30),0_20px_60px_-20px_rgba(0,0,0,0.15)] border border-zinc-100">
 {/* Imagem de Fundo - Vitrine */}
 <img
 src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80"
 alt="Vitrine Agroraça pet premium"
 className="absolute inset-0 w-full h-full object-cover"
 />
 {/* Overlay Editorial para limpeza visual */}
 <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/10" />
 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 via-transparent to-transparent" />
 {/* Softbox Luz Lateral */}
 <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[280px] h-[480px] bg-white/40 blur-[60px] rounded-full pointer-events-none" />
 <div className="absolute -right-16 top-20 w-[200px] h-[300px] bg-amber-100/30 blur-[50px] rounded-full pointer-events-none" />

 {/* Conteúdo cenográfico sobre a imagem */}
 <div className="absolute inset-0 flex flex-col p-6 lg:p-8">
 {/* Topo: iluminação embutida + logo alto relevo */}
 <div className="flex justify-between items-start">
 <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/60 rounded-full px-3 py-1.5 shadow-sm">
 <Sun className="w-3.5 h-3.5 text-amber-500" />
 <span className="text-[10px] font-bold tracking-[0.14em] text-zinc-700 uppercase">Iluminação 4500K • Softbox</span>
 </div>
 <div className="hidden sm:flex items-center gap-1.5 bg-zinc-900 text-white rounded-full px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase">
 <Layers className="w-3 h-3" /> Editorial Premium
 </div>
 </div>

 {/* Centro: Logotipo Agroraça em alto relevo */}
 <div className="flex-1 flex flex-col items-center justify-center -mt-6">
 <div className="bg-white/95 backdrop-blur-xl rounded-[20px] px-8 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/80 text-center">
 <div className="flex items-center justify-center gap-2 mb-1">
 <PawPrint className="w-5 h-5 text-zinc-900" />
 <span className="text-[11px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Agroraça</span>
 <PawPrint className="w-5 h-5 text-zinc-900" />
 </div>
 <h2 className="text-[28px] lg:text-[32px] font-black tracking-[-0.03em] text-zinc-900 leading-none">
 AGRORAÇA
 </h2>
 <p className="text-[10px] tracking-[0.25em] font-bold text-zinc-500 uppercase mt-1">Qualidade Premium Pet</p>
 <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-900/20 to-transparent" />
 </div>
 <p className="mt-3 text-[11px] font-medium tracking-wide text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] bg-zinc-900/30 backdrop-blur px-3 py-1 rounded-full border border-white/20">
 Vitrine iluminada • Organização por categorias
 </p>
 </div>

 {/* Prateleiras Minimalistas com Rações */}
 <div className="space-y-3">
 {/* Prateleira 1 */}
 <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/70">
 <div className="flex items-center justify-between mb-2.5">
 <span className="text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase">Ração Premium • Cães Adultos</span>
 <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5">+ Brilho & Vitalidade</span>
 </div>
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

 {/* Prateleira 2 - Acessórios */}
 <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.10)] border border-white/60 flex items-center gap-3">
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
 <div className="flex-1">
 <p className="text-[11px] font-black text-zinc-900 leading-none">Acessórios Minimalistas</p>
 <p className="text-[10px] font-medium text-zinc-500">Coleiras • Brinquedos • Higiene</p>
 </div>
 <div className="hidden sm:flex items-center gap-1 bg-zinc-900 text-white rounded-full px-2.5 py-1">
 <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
 <span className="text-[10px] font-bold">4.9/5</span>
 </div>
 </div>
 </div>

 {/* Piso porcelanato com reflexo suave */}
 <div className="mt-3 h-[18px] bg-gradient-to-b from-white/70 to-white/0 backdrop-blur-[1px] rounded-full border border-white/40 shadow-inner relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[6px]" />
 </div>
 </div>

 {/* Sobreposição gráfica elegante - canto inferior direito */}
 <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:max-w-[300px]">
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

 {/* Selo Editorial discreto */}
 <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-4 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm border border-zinc-200 sm:hidden">
 <Sparkles className="w-3 h-3 text-zinc-900" />
 <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-700">Editorial</span>
 </div>
 </div>

 {/* Especificações Técnicas - Estilo Editorial */}
 <div className="mt-4 bg-white rounded-2xl border border-zinc-100 p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm max-w-[560px] mx-auto">
 <div className="flex items-center gap-2">
 <span className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
 <Camera className="w-4 h-4 text-white" />
 </span>
 <div>
 <p className="text-[11px] font-black tracking-widest uppercase text-zinc-900">35mm • f/4.0</p>
 <p className="text-[10px] font-medium text-zinc-500 -mt-0.5">Foco total • Nitidez extrema</p>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <span className="inline-flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5 text-[11px] font-bold text-zinc-700">
 <Aperture className="w-3.5 h-3.5" /> 4500K Neutra
 </span>
 <span className="inline-flex items-center gap-1.5 bg-zinc-900 text-white rounded-full px-3 py-1.5 text-[11px] font-bold">
 <Frame className="w-3.5 h-3.5" /> 4:5 Instagram
 </span>
 </div>
 </div>
 </div>

 {/* Lado Direito - Copy e Conversão */}
 <div className="lg:sticky lg:top-[88px]">
 <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-full px-3.5 py-1.5 text-xs font-bold">
 <Sparkles className="w-3.5 h-3.5" /> Campanha Oficial • Agroraça
 </div>
 <h1 className="mt-4 text-[34px] lg:text-[44px] font-black tracking-[-0.03em] leading-[0.95] text-zinc-900">
 Limpeza visual <br />
 <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent">que atrai</span> <br />
 e converte.
 </h1>
 <p className="mt-4 text-[15px] leading-6 text-zinc-600 max-w-[520px]">
 Vitrine moderna, iluminação softbox e organização minimalista. Cada ração premium ganha destaque sem ofuscar — experiência de varejo pet editorial, pronta para encantar tutores exigentes.
 </p>

 {/* Benefícios */}
 <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
 {[
 { title: "Organização", desc: "Por categorias", icon: Layers },
 { title: "Luz Suave", desc: "Sem sombras duras", icon: Sun },
 { title: "Cores Vivas", desc: "Naturais e fiéis", icon: Sparkles },
 ].map((b) => (
 <div key={b.title} className="bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
 <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center mb-2.5">
 <b.icon className="w-4 h-4 text-white" />
 </div>
 <p className="text-[13px] font-black text-zinc-900 leading-none">{b.title}</p>
 <p className="text-xs text-zinc-500 font-medium mt-1">{b.desc}</p>
 </div>
 ))}
 </div>

 {/* CTAs */}
 <div className="mt-8 space-y-3">
 <a
 href={whatsappUrl}
 target="_blank"
 rel="noreferrer"
 className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-[15px] px-6 py-4 rounded-2xl shadow-[0_16px_32px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
 >
 <MessageCircle className="w-5 h-5 fill-white" />
 Chamar no WhatsApp Agora
 <span className="hidden sm:inline-flex bg-white/20 rounded-full px-2.5 py-1 text-xs font-bold">(62) 99161-5599</span>
 </a>
 <div className="grid grid-cols-2 gap-3">
 <button
 onClick={() => toast.success("Imagem em alta resolução pronta para download! (4:5 • 1080x1350)")}
 className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 font-bold text-sm px-4 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-md"
 >
 <Download className="w-4 h-4" /> Baixar 4:5 HD
 </button>
 <button
 onClick={() => {
 if (navigator.share) navigator.share({ title: "Agroraça - Vitrine Premium", text: "Qualidade para o seu melhor amigo. WhatsApp: (62) 99161-5599", url: whatsappUrl });
 else toast.success("Link copiado! Compartilhe no Instagram.");
 }}
 className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white font-bold text-sm px-4 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-lg"
 >
 <Share2 className="w-4 h-4" /> Compartilhar
 </button>
 </div>
 <p className="text-center text-xs font-medium text-zinc-500 flex items-center justify-center gap-1.5">
 <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Resposta rápida no WhatsApp • Entrega e orientação especializada
 </p>
 </div>

 {/* Detalhes Técnicos */}
 <div className="mt-8 bg-zinc-900 rounded-[20px] p-5 text-white relative overflow-hidden">
 <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
 <h3 className="relative text-sm font-black tracking-widest uppercase flex items-center gap-2">
 <Camera className="w-4 h-4" /> Ficha Técnica Editorial
 </h3>
 <div className="relative mt-4 grid grid-cols-2 gap-3 text-sm">
 <div className="bg-white/10 rounded-xl p-3 border border-white/10">
 <p className="text-[10px] tracking-widest font-bold text-white/60 uppercase">Lente & Abertura</p>
 <p className="font-bold mt-1">35mm • f/4.0</p>
 <p className="text-xs text-white/70">Foco total em todos os produtos</p>
 </div>
 <div className="bg-white/10 rounded-xl p-3 border border-white/10">
 <p className="text-[10px] tracking-widest font-bold text-white/60 uppercase">Iluminação</p>
 <p className="font-bold mt-1">Softbox Lateral • 4500K</p>
 <p className="text-xs text-white/70">Sem sombras duras, nitidez extrema</p>
 </div>
 <div className="bg-white/10 rounded-xl p-3 border border-white/10">
 <p className="text-[10px] tracking-widest font-bold text-white/60 uppercase">Tratamento</p>
 <p className="font-bold mt-1">Cores vivas naturais</p>
 <p className="text-xs text-white/70">Alto contraste, zero ruído</p>
 </div>
 <div className="bg-white/10 rounded-xl p-3 border border-white/10">
 <p className="text-[10px] tracking-widest font-bold text-white/60 uppercase">Proporção</p>
 <p className="font-bold mt-1">4:5 Instagram</p>
 <p className="text-xs text-white/70">1080 × 1350px • Pronto p/ Ads</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Rodapé Editorial */}
 <div className="mt-10 border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
 <p className="font-medium">© 2026 Agroraça • Qualidade para o seu melhor amigo. Todos os direitos reservados.</p>
 <p className="inline-flex items-center gap-2 font-semibold bg-white border border-zinc-200 rounded-full px-3 py-1.5">
 <PawPrint className="w-3.5 h-3.5 text-zinc-900" /> Loja física com vitrine iluminada • Atendimento via WhatsApp
 </p>
 </div>
 </main>
 </div>
 );
}
