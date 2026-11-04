import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/fittrack/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { pruebas as seed, type PruebaFisica } from "@/lib/fittrack-data";
import { Dumbbell, Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/pruebas")({
  head: () => ({ meta: [{ title: "Pruebas físicas — FitTrack" }] }),
  component: PruebasPage,
});

const empty: Omit<PruebaFisica, "id"> = { nombre: "", descripcion: "", unidad: "", criterios: "" };

function PruebasPage() {
  const [items, setItems] = useState<PruebaFisica[]>(seed);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PruebaFisica | null>(null);
  const [form, setForm] = useState<Omit<PruebaFisica, "id">>(empty);

  function openNew() { setEditing(null); setForm(empty); setOpen(true); }
  function openEdit(p: PruebaFisica) {
    setEditing(p);
    const { id: _i, ...rest } = p; void _i;
    setForm(rest); setOpen(true);
  }
  function save() {
    if (!form.nombre.trim()) return;
    if (editing) setItems((xs) => xs.map((x) => (x.id === editing.id ? { ...editing, ...form } : x)));
    else setItems((xs) => [...xs, { id: `t${Date.now()}`, ...form }]);
    setOpen(false);
  }
  function remove(id: string) {
    if (confirm("¿Eliminar prueba?")) setItems((xs) => xs.filter((x) => x.id !== id));
  }

  return (
    <AppLayout
      title="Pruebas físicas"
      subtitle="Catálogo de evaluaciones disponibles"
      action={<Button variant="hero" onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Nueva prueba</Button>}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="rounded-2xl bg-card border border-border p-5 shadow-soft flex flex-col">
            <div className="h-10 w-10 rounded-lg bg-success/10 text-success flex items-center justify-center">
              <Dumbbell className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display font-semibold">{p.nombre}</h3>
            <p className="text-sm text-muted-foreground mt-1 flex-1">{p.descripcion}</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                {p.unidad}
              </span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => openEdit(p)} aria-label="Editar">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(p.id)} aria-label="Eliminar">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar prueba" : "Nueva prueba"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="space-y-1.5">
              <Label>Nombre</Label>
              <Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Descripción</Label>
              <Textarea rows={2} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Unidad</Label>
                <Input placeholder="segundos, metros, cm..." value={form.unidad} onChange={(e) => setForm({ ...form, unidad: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Criterios</Label>
                <Input value={form.criterios} onChange={(e) => setForm({ ...form, criterios: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="hero" onClick={save}>{editing ? "Guardar" : "Crear"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
