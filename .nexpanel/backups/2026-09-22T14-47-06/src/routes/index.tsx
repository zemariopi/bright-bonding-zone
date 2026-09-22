import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
 component: Index,
});

function Index() {
 return (
 <div className="min-h-screen bg-[#FCFCF9] flex items-center justify-center p-6 lg:p-8">
 <div className="w-full max-w-[560px]">
 <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12),0_20px_60px_-20px_rgba(0,0,0,0.10)] border border-zinc-100">
 <img
 src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80"
 alt="Cachorro"
 className="absolute inset-0 w-full h-full object-cover"
 />
 </div>
 </div>
 </div>
 );
}
