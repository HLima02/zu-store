interface PlaceholderProps {
  title: string
  description: string
}

export function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-brand">em construção</p>
      <h1 className="font-display text-3xl font-bold m-2">{ title }</h1>
      { description && <p className="text-muted mt-2">{ description }</p>}
    </div>
  )
}
