import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/fittrack/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  evaluaciones as seed,
  estudiantes,
  profesores,
  pruebas,
  type Evaluacion,
  nombreEstudiante,
  nombreProfesor,
  nombrePrueba,
} from "@/lib/fittrack-data";
import { CalendarDays, ClipboardList, Plus } from "lucide-react";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/evaluaciones")({
  head: () => ({ meta: [{ title: "Evaluaciones — FitTrack" }] }),
  component: EvaluacionesPage,
});

function EvaluacionesPage() {
  const [items, setItems] = useState<Evaluacion[]>(seed);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fecha: new Date().toISOString().slice(0, 10),
    estudianteId: estudiantes[0].id,
    profesorId: profesores[0].id,
    pruebaId: pruebas[0].id,
    valor: "",
    observaciones: "",
  });

  function save() {
    const valor = parseFloat(form.valor);
    if (Number.isNaN(valor)) return alert("Ingresa un valor numérico");
    const nueva: Evaluacion = {
      id: `v${Date.now()}`,
      fecha: form.fecha,
      estudianteId: form.estudianteId,
      profesorId: form.profesorId,
      observaciones: form.observaciones,
      resultados: [{ pruebaId: form.pruebaId, valor }],
    };
    setItems((xs) => [nueva, ...xs]);
    setOpen(false);
    setForm({ ...form, valor: "", observaciones: "" });
  }

  return (
    <AppLayout
      title="Evaluaciones"
      subtitle={`${items.length} jornadas registradas`}
      action={<Button variant="hero" onClick={() => setOpen(true)} className="gap-2"><Plus className="h-4 w-4" /> Registrar</Button>}
    >
      <div className="space-y-3">
        {items.map((v) => (
          <div key={v.id} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
            <div className="flex flex-wrap items-start gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{nombreEstudiante(v.estudianteId)}</h3>
                  <p className="text-xs text-muted-foreground">
                    Evaluado por {nombreProfesor(v.profesorId)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(v.fecha).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {v.resultados.map((r, i) => {
                const prueba = pruebas.find((p) => p.id === r.pruebaId);
                return (
                  <div key={i} className="rounded-lg bg-secondary/60 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {nombrePrueba(r.pruebaId)}
                    </p>
                    <p className="font-semibold">
                      {r.valor} <span className="text-xs font-normal text-muted-foreground">{prueba?.unidad}</span>
                    </p>
                  </div>
                );
              })}
            </div>
            {v.observaciones && (
              <p className="mt-3 text-sm text-muted-foreground italic">"{v.observaciones}"</p>
            )}
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Registrar evaluación</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Fecha</Label>
                <Input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Estudiante</Label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.estudianteId}
                  onChange={(e) => setForm({ ...form, estudianteId: e.target.value })}
                >
                  {estudiantes.map((e) => (
                    <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Profesor</Label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.profesorId}
                  onChange={(e) => setForm({ ...form, profesorId: e.target.value })}
                >
                  {profesores.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Prueba</Label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.pruebaId}
                  onChange={(e) => setForm({ ...form, pruebaId: e.target.value })}
                >
                  {pruebas.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Resultado ({pruebas.find((p) => p.id === form.pruebaId)?.unidad})</Label>
              <Input
                type="number" step="0.01"
                value={form.valor}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
                placeholder="Ej. 8.5"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Observaciones</Label>
              <Textarea rows={2} value={form.observaciones} onChange={(e) => setForm({ ...form, observaciones: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="hero" onClick={save}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
