import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/fittrack/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — FitTrack" },
      { name: "description", content: "Accede a la plataforma FitTrack." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative gradient-hero text-primary-foreground p-12 flex-col justify-between overflow-hidden">
        <Logo />
        <div className="relative z-10">
          <h2 className="text-4xl font-display font-bold leading-tight">
            Mide, analiza y eleva el rendimiento físico de tus estudiantes.
          </h2>
          <p className="mt-4 text-primary-foreground/85 max-w-md">
            Reportes automáticos, evolución por estudiante y comparativas por curso.
          </p>
        </div>
        <div className="text-xs text-primary-foreground/70">© FitTrack 2025</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center"><Logo size="lg" /></div>
          <h1 className="text-3xl font-display font-bold">Bienvenido de nuevo</h1>
          <p className="text-muted-foreground mt-1">Inicia sesión para continuar.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => navigate({ to: "/dashboard" }), 500);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Correo</Label>
              <Input id="email" type="email" placeholder="profesor@colegio.edu" defaultValue="admin@fittrack.edu" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <Input id="password" type="password" placeholder="••••••••" defaultValue="demo1234" required />
            </div>
            <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            Demo sin backend ·{" "}
            <Link to="/" className="text-primary hover:underline">Volver al inicio</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
