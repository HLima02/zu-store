import { useState} from 'react'

interface ProductGalleryProps {
  images: string []
  title: string
}

export function ProductGallery({ images, title }:ProductGalleryProps ) {
  const [active, setActive] = useState(0)


  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-xl border border-line bg-surface">
        <img src={images[active]} alt={title} className='h-full w-full object-contain p-6' />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button key={img} onClick={() => setActive(i)}
            className={`aspect-square w-16 cursor-pointer shrink-0 overflow-hidden rounded-lg border
            ${i === active ? 'border-brand' : 'border-line'}`}>
              <img src={img} alt="" className="h-full w-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
