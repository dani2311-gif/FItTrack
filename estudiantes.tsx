import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/fittrack/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { estudiantes as seed, type Estudiante } from "@/lib/fittrack-data";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/estudiantes")({
  head: () => ({ meta: [{ title: "Estudiantes — FitTrack" }] }),
  component: EstudiantesPage,
});

const empty: Omit<Estudiante, "id"> = {
  nombre: "", apellido: "", edad: 14, genero: "M", grado: "9°", curso: "A",
};

function EstudiantesPage() {
  const [items, setItems] = useState<Estudiante[]>(seed);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Estudiante | null>(null);
  const [form, setForm] = useState<Omit<Estudiante, "id">>(empty);

  const filtered = useMemo(() => {
    const t = q.toLowerCase().trim();
    if (!t) return items;
    return items.filter((e) =>
      `${e.nombre} ${e.apellido} ${e.grado} ${e.curso}`.toLowerCase().includes(t),
    );
  }, [items, q]);

  function openNew() {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  }
  function openEdit(e: Estudiante) {
    setEditing(e);
    const { id: _ignore, ...rest } = e;
    void _ignore;
    setForm(rest);
    setOpen(true);
  }
  function save() {
    if (!form.nombre.trim() || !form.apellido.trim()) return;
    if (editing) {
      setItems((xs) => xs.map((x) => (x.id === editing.id ? { ...editing, ...form } : x)));
    } else {
      setItems((xs) => [...xs, { id: `e${Date.now()}`, ...form }]);
    }
    setOpen(false);
  }
  function remove(id: string) {
    if (confirm("¿Eliminar estudiante?")) setItems((xs) => xs.filter((x) => x.id !== id));
  }

  return (
    <AppLayout
      title="Estudiantes"
      subtitle={`${items.length} registrados`}
      action={
        <Button variant="hero" onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Nuevo
        </Button>
      }
    >
      <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, grado o curso..."
              className="pl-9"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Estudiante</th>
                <th className="text-left px-4 py-3">Edad</th>
                <th className="text-left px-4 py-3">Género</th>
                <th className="text-left px-4 py-3">Grado</th>
                <th className="text-left px-4 py-3">Curso</th>
                <th className="text-right px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-t border-border hover:bg-secondary/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                        {e.nombre[0]}{e.apellido[0]}
                      </div>
                      <span className="font-medium">{e.nombre} {e.apellido}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{e.edad}</td>
                  <td className="px-4 py-3">{e.genero}</td>
                  <td className="px-4 py-3">{e.grado}</td>
                  <td className="px-4 py-3">{e.curso}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(e)} aria-label="Editar">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => remove(e.id)} aria-label="Eliminar">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                    Sin resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild><span /></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar estudiante" : "Nuevo estudiante"}</DialogTitle>
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
            <div className="space-y-1.5">
              <Label>Edad</Label>
              <Input
                type="number" min={5} max={25}
                value={form.edad}
                onChange={(e) => setForm({ ...form, edad: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Género</Label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.genero}
                onChange={(e) => setForm({ ...form, genero: e.target.value as Estudiante["genero"] })}
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Grado</Label>
              <Input value={form.grado} onChange={(e) => setForm({ ...form, grado: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Curso</Label>
              <Input value={form.curso} onChange={(e) => setForm({ ...form, curso: e.target.value })} />
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
