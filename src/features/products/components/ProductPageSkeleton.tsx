export function ProductPageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspct-square animate-pulse rounded-xl bg-line/60" />
        <div className="space-y-4">
          <div className="h-4 w-1/4 animate-pulse rounded bg-line/60" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-line/60" />
          <div className="h-6 w-1/3 animate-pulse rounded bg-line/60" />
          <div className="h-24 animate-pulse rounded bg-line/60" />
          <div className="h-12 animate-pulse rounded bg-line/60" />
        </div>
      </div>
    </div>
  )
}