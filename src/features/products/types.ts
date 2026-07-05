export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  category: string
  thumbnail: string
  images: string[]
  reviews?: Review[]
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Review {
  rating: number
  commet: string
  date: string
  reviewerName: string
}

