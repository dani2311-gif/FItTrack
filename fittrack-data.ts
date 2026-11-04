// Mock data store for FitTrack MVP.
// Frontend-only — values reset on reload. Conectaremos Lovable Cloud después.

export type Genero = "M" | "F" | "Otro";

export interface Estudiante {
  id: string;
  nombre: string;
  apellido: string;
  edad: number;
  genero: Genero;
  grado: string;
  curso: string;
}

export interface Profesor {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  especialidad: string;
}

export interface PruebaFisica {
  id: string;
  nombre: string;
  descripcion: string;
  unidad: string;
  criterios: string;
}

export interface Resultado {
  pruebaId: string;
  valor: number;
  observacion?: string;
}

export interface Evaluacion {
  id: string;
  fecha: string; // ISO date
  estudianteId: string;
  profesorId: string;
  observaciones?: string;
  resultados: Resultado[];
}

export const estudiantes: Estudiante[] = [
  { id: "e1", nombre: "Sofía", apellido: "Ramírez", edad: 14, genero: "F", grado: "9°", curso: "A" },
  { id: "e2", nombre: "Mateo", apellido: "González", edad: 15, genero: "M", grado: "10°", curso: "B" },
  { id: "e3", nombre: "Valentina", apellido: "Rojas", edad: 13, genero: "F", grado: "8°", curso: "A" },
  { id: "e4", nombre: "Samuel", apellido: "Pérez", edad: 16, genero: "M", grado: "11°", curso: "C" },
  { id: "e5", nombre: "Isabella", apellido: "Torres", edad: 14, genero: "F", grado: "9°", curso: "B" },
  { id: "e6", nombre: "Daniel", apellido: "Martínez", edad: 15, genero: "M", grado: "10°", curso: "A" },
  { id: "e7", nombre: "Mariana", apellido: "López", edad: 13, genero: "F", grado: "8°", curso: "B" },
  { id: "e8", nombre: "Andrés", apellido: "Vargas", edad: 16, genero: "M", grado: "11°", curso: "A" },
];

export const profesores: Profesor[] = [
  { id: "p1", nombre: "Carolina", apellido: "Mendoza", correo: "cmendoza@colegio.edu", especialidad: "Educación Física" },
  { id: "p2", nombre: "Jorge", apellido: "Silva", correo: "jsilva@colegio.edu", especialidad: "Deporte y Salud" },
  { id: "p3", nombre: "Laura", apellido: "Castaño", correo: "lcastano@colegio.edu", especialidad: "Atletismo" },
];

export const pruebas: PruebaFisica[] = [
  { id: "t1", nombre: "Velocidad 50m", descripcion: "Sprint en línea recta de 50 metros.", unidad: "segundos", criterios: "Menor tiempo = mejor desempeño." },
  { id: "t2", nombre: "Resistencia (Cooper)", descripcion: "Distancia recorrida en 12 minutos.", unidad: "metros", criterios: "Mayor distancia = mejor capacidad aeróbica." },
  { id: "t3", nombre: "Salto largo", descripcion: "Salto sin impulso desde posición estática.", unidad: "cm", criterios: "Mayor distancia = mejor potencia." },
  { id: "t4", nombre: "Flexibilidad", descripcion: "Test sit-and-reach.", unidad: "cm", criterios: "Mayor alcance = mejor flexibilidad." },
  { id: "t5", nombre: "Abdominales", descripcion: "Repeticiones en 1 minuto.", unidad: "reps", criterios: "Más repeticiones = mejor resistencia muscular." },
];

export const evaluaciones: Evaluacion[] = [
  {
    id: "v1", fecha: "2025-03-12", estudianteId: "e1", profesorId: "p1",
    observaciones: "Buen desempeño general.",
    resultados: [
      { pruebaId: "t1", valor: 8.9 },
      { pruebaId: "t2", valor: 2100 },
      { pruebaId: "t3", valor: 165 },
      { pruebaId: "t5", valor: 32 },
    ],
  },
  {
    id: "v2", fecha: "2025-06-18", estudianteId: "e1", profesorId: "p1",
    observaciones: "Mejora notable en resistencia.",
    resultados: [
      { pruebaId: "t1", valor: 8.4 },
      { pruebaId: "t2", valor: 2350 },
      { pruebaId: "t3", valor: 172 },
      { pruebaId: "t5", valor: 38 },
    ],
  },
  {
    id: "v3", fecha: "2025-03-12", estudianteId: "e2", profesorId: "p2",
    resultados: [
      { pruebaId: "t1", valor: 7.8 },
      { pruebaId: "t2", valor: 2480 },
      { pruebaId: "t3", valor: 198 },
      { pruebaId: "t5", valor: 42 },
    ],
  },
  {
    id: "v4", fecha: "2025-06-18", estudianteId: "e2", profesorId: "p2",
    resultados: [
      { pruebaId: "t1", valor: 7.6 },
      { pruebaId: "t2", valor: 2620 },
      { pruebaId: "t3", valor: 210 },
      { pruebaId: "t5", valor: 45 },
    ],
  },
  {
    id: "v5", fecha: "2025-06-18", estudianteId: "e3", profesorId: "p1",
    resultados: [
      { pruebaId: "t1", valor: 9.4 },
      { pruebaId: "t2", valor: 1980 },
      { pruebaId: "t4", valor: 28 },
    ],
  },
  {
    id: "v6", fecha: "2025-06-18", estudianteId: "e4", profesorId: "p3",
    resultados: [
      { pruebaId: "t1", valor: 7.2 },
      { pruebaId: "t2", valor: 2780 },
      { pruebaId: "t3", valor: 225 },
    ],
  },
];

export function nombreEstudiante(id: string) {
  const e = estudiantes.find((x) => x.id === id);
  return e ? `${e.nombre} ${e.apellido}` : "—";
}
export function nombreProfesor(id: string) {
  const p = profesores.find((x) => x.id === id);
  return p ? `${p.nombre} ${p.apellido}` : "—";
}
export function nombrePrueba(id: string) {
  return pruebas.find((x) => x.id === id)?.nombre ?? "—";
}
