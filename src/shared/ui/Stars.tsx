export function Star({ value }:{ value:number}) {
  return(
    <div className="flex text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < Math.round(value) ? '★' : '☆'}</span>
      ))}
    </div>
  )
}