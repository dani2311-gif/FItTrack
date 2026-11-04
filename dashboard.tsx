import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/fittrack/AppLayout";
import { estudiantes, profesores, pruebas, evaluaciones } from "@/lib/fittrack-data";
import { Users, GraduationCap, Dumbbell, ClipboardList, TrendingUp, TrendingDown } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — FitTrack" }] }),
  component: Dashboard,
});

const kpis = [
  { label: "Estudiantes", value: estudiantes.length, icon: Users, trend: "+12%", up: true },
  { label: "Profesores", value: profesores.length, icon: GraduationCap, trend: "+1", up: true },
  { label: "Pruebas activas", value: pruebas.length, icon: Dumbbell, trend: "0%", up: true },
  { label: "Evaluaciones", value: evaluaciones.length, icon: ClipboardList, trend: "+24%", up: true },
];

const evolucion = [
  { mes: "Ene", promedio: 62 },
  { mes: "Feb", promedio: 65 },
  { mes: "Mar", promedio: 68 },
  { mes: "Abr", promedio: 70 },
  { mes: "May", promedio: 73 },
  { mes: "Jun", promedio: 78 },
];

const porCurso = [
  { curso: "8°A", puntaje: 71 },
  { curso: "8°B", puntaje: 66 },
  { curso: "9°A", puntaje: 78 },
  { curso: "9°B", puntaje: 74 },
  { curso: "10°A", puntaje: 81 },
  { curso: "10°B", puntaje: 79 },
  { curso: "11°A", puntaje: 84 },
  { curso: "11°C", puntaje: 76 },
];

function Dashboard() {
  return (
    <AppLayout title="Dashboard" subtitle="Vista general del rendimiento físico">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, icon: Icon, trend, up }) => (
          <div key={label} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium ${
                  up ? "text-success" : "text-destructive"
                }`}
              >
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend}
              </span>
            </div>
            <p className="mt-4 text-3xl font-display font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold">Evolución del rendimiento</h3>
              <p className="text-xs text-muted-foreground">Promedio institucional (últimos 6 meses)</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolucion} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="promedio"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "var(--color-primary)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
          <h3 className="font-display font-semibold">Top desempeño</h3>
          <p className="text-xs text-muted-foreground mb-4">Estudiantes destacados</p>
          <ul className="space-y-3">
            {estudiantes.slice(0, 5).map((e, i) => (
              <li key={e.id} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold">
                  {e.nombre[0]}{e.apellido[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{e.nombre} {e.apellido}</p>
                  <p className="text-xs text-muted-foreground">{e.grado} · Curso {e.curso}</p>
                </div>
                <span className="text-sm font-semibold text-primary">{90 - i * 3}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 shadow-soft mt-6">
        <h3 className="font-display font-semibold">Rendimiento por curso</h3>
        <p className="text-xs text-muted-foreground mb-4">Puntaje promedio (0-100)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={porCurso} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="curso" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="puntaje" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
}
