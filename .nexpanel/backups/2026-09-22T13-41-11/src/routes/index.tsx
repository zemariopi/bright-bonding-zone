import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
 component: Index,
});

function Index() {
 return (
 <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
 <div className="text-center space-y-4">
 <h1 className="text-4xl font-bold">Bem-vindo</h1>
 <p className="text-muted-foreground">Projeto pronto para desenvolvimento.</p>
 </div>
 </div>
 );
}
