import { FaBurger, FaCube, FaShirt, FaWineGlass } from "react-icons/fa6"

export type ProductCategory = "Makanan" | "Minuman" | "Fashion" | "Kebutuhan Dasar"

export interface Product {
  id: string
  image: string
  title: string
  category: ProductCategory
  subCategory: string
  price: number
  isPopular: boolean
  isFeatured: boolean
  description: string
}

export const products: Product[] = [
  {
    id: "1",
    image: "/image/rendang.png",
    title: "Rendang Spesial",
    category: "Makanan",
    subCategory: "Masakan Padang",
    price: 27000,
    description: "Rendang daging sapi yang dimasak dengan bumbu rempah khas Padang, menghasilkan cita rasa yang kaya dan tekstur yang empuk.",
    isPopular: true,
    isFeatured: true
  },
  {
    id: "2",
    image: "/image/takoyaki.png",
    title: "Takoyaki",
    category: "Makanan",
    subCategory: "Makanan Jepang",
    price: 15000,
    description: "Camilan khas Jepang berbentuk bulat dengan isian gurita yang lembut, ditaburi dengan katsuobushi dan saus spesial.",
    isPopular: false,
    isFeatured: true
  },
  {
    id: "3",
    image: "/image/burger.png",
    title: "Burger",
    category: "Makanan",
    subCategory: "Fast Food",
    price: 20000,
    description: "Burger premium dengan daging sapi pilihan, sayuran segar, dan saus spesial yang disajikan dengan roti yang dipanggang sempurna.",
    isPopular: true,
    isFeatured: true
  },
  {
    id: "4",
    image: "/image/sushi.png",
    title: "Sushi Maki",
    category: "Makanan",
    subCategory: "Makanan Jepang",
    price: 18000,
    description: "Sushi roll yang dibuat dengan nasi Jepang premium, rumput laut, dan isian segar pilihan yang digulung dengan sempurna.",
    isPopular: false,
    isFeatured: true
  },
  {
    id: "5",
    image: "/image/products/tas-tote.png",
    title: "Tas Tote",
    category: "Fashion",
    subCategory: "Tas",
    price: 833000,
    description: "Tas tote berkualitas tinggi yang terbuat dari bahan premium. Cocok untuk kegiatan sehari-hari dengan desain yang stylish dan kapasitas yang besar.",
    isPopular: true,
    isFeatured: true
  },
  {
    id: "6",
    image: "/image/products/coach.png",
    title: "Coach Swift",
    category: "Fashion",
    subCategory: "Kerja",
    price: 950000,
    description: "Coach Swift adalah tas kerja elegan yang menggabungkan gaya klasik dengan fungsionalitas modern. Sempurna untuk profesional yang menghargai kualitas.",
    isPopular: false,
    isFeatured: true
  },
  {
    id: "7",
    image: "/image/products/switer.png",
    title: "Switer Nike",
    category: "Fashion",
    subCategory: "Gaya Hidup",
    price: 750000,
    description: "Sweater Nike yang nyaman dengan bahan berkualitas tinggi. Ideal untuk aktivitas olahraga atau casual wear sehari-hari.",
    isPopular: false,
    isFeatured: true
  },
  {
    id: "8",
    image: "/image/products/nike.png",
    title: "Nike Air",
    category: "Fashion",
    subCategory: "Gaya Hidup",
    price: 450000,
    description: "Sepatu Nike Air dengan teknologi cushioning terbaru. Memberikan kenyamanan maksimal untuk aktivitas sehari-hari.",
    isPopular: false,
    isFeatured: true
  },
  {
    id: "9",
    image: "/image/products/sock.png",
    title: "Kaos Kaki",
    category: "Kebutuhan Dasar",
    subCategory: "Gaya Hidup",
    price: 450000,
    description: "Kaos kaki premium dengan bahan yang nyaman dan tahan lama. Tersedia dalam berbagai ukuran dan warna.",
    isPopular: false,
    isFeatured: true
  },
  {
    id: "10",
    image: "/image/products/celana-sutra.png",
    title: "Celana Sutra",
    category: "Fashion",
    subCategory: "Gaya Hidup",
    price: 450000,
    description: "Celana sutra berkualitas tinggi dengan sentuhan mewah. Nyaman dipakai dan mudah dirawat.",
    isPopular: false,
    isFeatured: true
  },
  {
    id: "11",
    image: "/image/products/baju-santuy.png",
    title: "Baju Santuy",
    category: "Fashion",
    subCategory: "Gaya Hidup",
    price: 450000,
    description: "Baju santai dengan desain trendy dan bahan yang nyaman. Cocok untuk aktivitas casual sehari-hari.",
    isPopular: true,
    isFeatured: true
  },
  {
    id: "12",
    image: "/image/products/ipad.png",
    title: "Ipad Pro",
    category: "Kebutuhan Dasar",
    subCategory: "Gadget",
    price: 450000,
    description: "iPad Pro dengan performa tinggi dan layar Retina yang memukau. Sempurna untuk kreativitas dan produktivitas.",
    isPopular: false,
    isFeatured: true
  }
]

// Calculate total products per category
export const categoryTotals = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1
    return acc
}, {} as Record<string, number>)

export const productCategories = [
    { 
      icon: FaBurger,
      name: "Makanan",
      total: categoryTotals["Makanan"] || 0
    },
    { 
      icon: FaWineGlass,
      name: "Minuman",
      total: categoryTotals["Minuman"] || 0
    },
    { 
      icon: FaShirt,
      name: "Fashion",
      total: categoryTotals["Fashion"] || 0
    },
    { 
      icon: FaCube,
      name: "Kebutuhan Dasar",
      total: categoryTotals["Kebutuhan Dasar"] || 0
    },
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.isFeatured)
}

export function getFeaturedFoodAndBeverages(): Product[] {
  return products.filter(product => 
    product.isFeatured && 
    (product.category === "Makanan" || product.category === "Minuman")
  )
}

export function getFeaturedNonFoodProducts(): Product[] {
  return products.filter(product => 
    product.isFeatured && 
    (product.category === "Fashion" || product.category === "Kebutuhan Dasar")
  )
}

export function getFoodAndBeverages(): Product[] {
  return products.filter(product => 
    product.category === "Makanan" || product.category === "Minuman"
  )
}

export function getNonFoodProducts(): Product[] {
  return products.filter(product => 
    product.category === "Fashion" || product.category === "Kebutuhan Dasar"
  )
}

export function getSimilarProducts(currentProductId: string, limit: number = 4) {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];

  return products
    .filter(product => 
      // Get products in the same category, excluding the current product
      product.category === currentProduct.category && 
      product.id !== currentProduct.id
    )
    .slice(0, limit); // Limit the number of products returned
} 