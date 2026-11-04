import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/fittrack/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profesores as seed, type Profesor } from "@/lib/fittrack-data";
import { Mail, Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/profesores")({
  head: () => ({ meta: [{ title: "Profesores — FitTrack" }] }),
  component: ProfesoresPage,
});

const empty: Omit<Profesor, "id"> = { nombre: "", apellido: "", correo: "", especialidad: "" };

function ProfesoresPage() {
  const [items, setItems] = useState<Profesor[]>(seed);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Profesor | null>(null);
  const [form, setForm] = useState<Omit<Profesor, "id">>(empty);

  function openNew() { setEditing(null); setForm(empty); setOpen(true); }
  function openEdit(p: Profesor) {
    setEditing(p);
    const { id: _i, ...rest } = p; void _i;
    setForm(rest); setOpen(true);
  }
  function save() {
    if (!form.nombre.trim()) return;
    if (editing) setItems((xs) => xs.map((x) => (x.id === editing.id ? { ...editing, ...form } : x)));
    else setItems((xs) => [...xs, { id: `p${Date.now()}`, ...form }]);
    setOpen(false);
  }
  function remove(id: string) {
    if (confirm("¿Eliminar profesor?")) setItems((xs) => xs.filter((x) => x.id !== id));
  }

  return (
    <AppLayout
      title="Profesores"
      subtitle={`${items.length} registrados`}
      action={<Button variant="hero" onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Nuevo</Button>}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                {p.nombre[0]}{p.apellido[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold truncate">{p.nombre} {p.apellido}</h3>
                <p className="text-sm text-muted-foreground truncate">{p.especialidad}</p>
                <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5 truncate">
                  <Mail className="h-3 w-3" /> {p.correo}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-1">
              <Button variant="ghost" size="icon" onClick={() => openEdit(p)} aria-label="Editar">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(p.id)} aria-label="Eliminar">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar profesor" : "Nuevo profesor"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Nombre</Label>
              <Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Apellido</Label>
              <Input value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Correo</Label>
              <Input type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Especialidad</Label>
              <Input value={form.especialidad} onChange={(e) => setForm({ ...form, especialidad: e.target.value })} />
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
