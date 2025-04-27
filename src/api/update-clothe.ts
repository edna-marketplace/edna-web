import { api } from "@/lib/axios";
import { Clothe } from "./create-clothe";

export async function UpdateClothe({
  id,
  name,
  priceInCents,
  description,
  category,
  gender,
  brand,
  size,
  fabric,
  color,
}: Clothe) {
  await api.put('/clothes', {
    id,
    name,
    priceInCents,
    description,
    category,
    gender,
    brand,
    size,
    fabric,
    color,
  })
}