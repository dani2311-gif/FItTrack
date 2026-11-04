import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BarChart3, ClipboardCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { Logo } from "@/components/fittrack/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitTrack — Seguimiento físico estudiantil" },
      {
        name: "description",
        content:
          "Plataforma para registrar estudiantes, pruebas y evaluaciones físicas. Reportes automáticos y análisis del progreso.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Iniciar sesión</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="hero">Probar demo</Button>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.07]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-6">
            <Activity className="h-3.5 w-3.5" /> Rendimiento físico estudiantil
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight max-w-3xl mx-auto">
            Digitaliza la evaluación física de tu institución
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Registra estudiantes, crea pruebas, captura resultados y visualiza el progreso
            individual y por curso — todo en una sola plataforma.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="gap-2">
                Ver demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Iniciar sesión</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid sm:grid-cols-3 gap-4">
        {[
          { icon: ClipboardCheck, title: "Evaluaciones centralizadas", desc: "Adiós a hojas de cálculo dispersas." },
          { icon: BarChart3, title: "Reportes automáticos", desc: "PDF, Excel y dashboards con un clic." },
          { icon: ShieldCheck, title: "Roles y auditoría", desc: "Admin, profesor, coordinador y estudiante." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-display font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
