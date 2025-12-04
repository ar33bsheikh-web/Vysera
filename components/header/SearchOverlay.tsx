'use client';

import * as React from "react"
import { Search, X, Loader2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { formatPrice } from "../../lib/utils"

// Mocks results
const MOCK_HITS = [
  { id: 1, title: "Crossover Pavé Bangle", price: "120.00", handle: "crossover-pave-bangle", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=200&q=80" },
  { id: 2, title: "Teardrop Blue Pendant", price: "85.00", handle: "teardrop-blue-pendant", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&q=80" },
];

export function SearchOverlay() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    if(query.length > 1) {
      setIsLoading(true);
      // Simulate network request
      const t = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(t);
    }
  }, [query]);

  const handleSelect = (handle: string) => {
    setOpen(false)
    router.push(`/product/${handle}`)
  }

  return (
    <button className="hover:opacity-70">
      <Search className="w-5 h-5" />
    </button>
  )
}