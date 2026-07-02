import { useParams } from "react-router";
import { Placeholder } from "@/shared/ui/Placeholder";

export function OrderPage() {
  const { id } = useParams()
  return <Placeholder title={`Pedido #${id}`} description="Confirmação — Fase 09." />
}