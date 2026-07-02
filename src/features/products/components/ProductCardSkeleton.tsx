export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="aspect-square animate-pulse bg-line/60" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-line/60" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-line/60" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-line/60" />
      </div>
    </div>
  )
}
