/** Cities and nearby areas AEROVENTIS publishes. No street address. */
export const SERVICE_AREAS = [
  { name: "Casablanca", schemaType: "City" },
  { name: "Rabat", schemaType: "City" },
  { name: "Marrakech", schemaType: "City" },
  { name: "Mohammedia", schemaType: "City" },
  { name: "Bouskoura", schemaType: "City" },
  { name: "Tamaris", schemaType: "Place" },
  { name: "Zenata", schemaType: "Place" },
] as const;

export const SERVICE_AREA_NAMES = SERVICE_AREAS.map((area) => area.name);

export function areaSchemaType(name: string): "City" | "Place" {
  const found = SERVICE_AREAS.find((area) => area.name === name);
  return found?.schemaType ?? "Place";
}
