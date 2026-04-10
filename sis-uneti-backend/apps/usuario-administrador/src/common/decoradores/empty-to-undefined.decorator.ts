import { Transform } from 'class-transformer';

/**
 * Decorador que intercepta la carga útil JSON y transforma strings vacíos ("") o puramente espacios en undefined.
 * Ideal para ser usado de la mano de @IsOptional() permitiendo que class-validator ignore el campo correctamente.
 */
export function EmptyToUndefined() {
  return Transform(({ value }) => {
    if (value === '' || (typeof value === 'string' && value.trim() === '')) {
      return undefined;
    }
    return value;
  });
}
