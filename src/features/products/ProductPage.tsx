import { useParams } from "react-router";
import { Placeholder } from "@/shared/ui/Placeholder";

import React from 'react'

export function ProductPage() {
  const { id } = useParams()
  return <Placeholder title={`Produto #${id}`} description="PDP - Fase 03" />
}
