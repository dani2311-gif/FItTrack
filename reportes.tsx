import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/fittrack/AppLayout";
import { Button } from "@/components/ui/button";
import { FileDown, FileSpreadsheet, FileText } from "lucide-react";
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
import { estudiantes, evaluaciones, pruebas } from "@/lib/fittrack-data";

export const Route = createFileRoute("/reportes")({
  head: () => ({ meta: [{ title: "Reportes — FitTrack" }] }),
  component: ReportesPage,
});

const promedioPorPrueba = pruebas.map((p) => {
  const vals = evaluaciones.flatMap((e) => e.resultados.filter((r) => r.pruebaId === p.id).map((r) => r.valor));
  const prom = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  return { prueba: p.nombre.split(" ")[0], promedio: Number(prom.toFixed(2)) };
});

const evolucion = [
  { mes: "Ene", actual: 62, anterior: 55 },
  { mes: "Feb", actual: 65, anterior: 58 },
  { mes: "Mar", actual: 68, anterior: 60 },
  { mes: "Abr", actual: 70, anterior: 63 },
  { mes: "May", actual: 73, anterior: 65 },
  { mes: "Jun", actual: 78, anterior: 68 },
];

function ReportesPage() {
  function fakeDownload(name: string) {
    alert(`Generando ${name}…\n(Demo sin backend — conectar Cloud para generación real)`);
  }
  return (
    <AppLayout
      title="Reportes"
      subtitle="Indicadores institucionales y exportación"
      action={
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => fakeDownload("reporte.xlsx")}>
            <FileSpreadsheet className="h-4 w-4" /> Excel
          </Button>
          <Button variant="hero" className="gap-2" onClick={() => fakeDownload("reporte.pdf")}>
            <FileDown className="h-4 w-4" /> PDF
          </Button>
        </div>
      }
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
          <h3 className="font-display font-semibold">Promedio por prueba</h3>
          <p className="text-xs text-muted-foreground mb-4">Resultado promedio institucional</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={promedioPorPrueba} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="prueba" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="promedio" fill="var(--color-success)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
          <h3 className="font-display font-semibold">Comparativo histórico</h3>
          <p className="text-xs text-muted-foreground mb-4">Periodo actual vs. anterior</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolucion} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }}
                />
                <Line type="monotone" dataKey="actual" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="anterior" stroke="var(--color-muted-foreground)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-soft mt-4 overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Reportes individuales</h3>
            <p className="text-xs text-muted-foreground">Genera el informe físico de cada estudiante</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Estudiante</th>
                <th className="text-left px-4 py-3">Grado</th>
                <th className="text-left px-4 py-3">Evaluaciones</th>
                <th className="text-right px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((e) => {
                const count = evaluaciones.filter((v) => v.estudianteId === e.id).length;
                return (
                  <tr key={e.id} className="border-t border-border hover:bg-secondary/40">
                    <td className="px-4 py-3 font-medium">{e.nombre} {e.apellido}</td>
                    <td className="px-4 py-3">{e.grado} · {e.curso}</td>
                    <td className="px-4 py-3">{count}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => fakeDownload(`${e.nombre}.xlsx`)}>
                          <FileSpreadsheet className="h-4 w-4" /> Excel
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => fakeDownload(`${e.nombre}.pdf`)}>
                          <FileDown className="h-4 w-4" /> PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
