import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convierte diferentes representaciones de imágenes a un src usable en <img>
// Acepta:
//  - string que ya es URL (http/https)
//  - string que ya es data URL (data:...)
//  - string base64 "iVBORw0KG..." (asumimos image/png por defecto)
//  - arreglo de números (bytes)
export function imageSourceFromUnknown(
  value: string | number[] | undefined | null,
  mime: string = "image/png"
): string | undefined {
  if (value == null) return undefined
  if (typeof value === "string") {
    if (value.startsWith("http") || value.startsWith("data:")) return value
    // Heurística: si la cadena sólo contiene base64 chars
    if (/^[A-Za-z0-9+/=]+$/.test(value) && value.length > 20) {
      return `data:${mime};base64,${value}`
    }
    return value // fallback: podría ser ruta relativa
  }
  if (Array.isArray(value)) {
    // Convertimos byte[] a base64
    // Nota: value es number[] (0-255)
    const uint8 = Uint8Array.from(value)
    let binary = ""
    for (let i = 0; i < uint8.length; i++) binary += String.fromCharCode(uint8[i])
    const base64 = btoa(binary)
    return `data:${mime};base64,${base64}`
  }
  return undefined
}
