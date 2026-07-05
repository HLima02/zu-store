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
        <img src={images[active]} alt={title} />
      </div>
    </div>
  )
}
