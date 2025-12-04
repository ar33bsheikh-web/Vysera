import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-4">
          <h3 className="text-xl font-black uppercase tracking-tighter">Vysera</h3>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Modern artifacts for the digital age. Crafted with precision, personalized by you.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold uppercase tracking-wider text-sm mb-6">Shop</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/new" className="hover:text-white transition">New Arrivals</Link></li>
            <li><Link href="/collections/rings" className="hover:text-white transition">Rings</Link></li>
            <li><Link href="/collections/necklaces" className="hover:text-white transition">Necklaces</Link></li>
            <li><Link href="/customize" className="hover:text-white transition">Personalized</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wider text-sm mb-6">Support</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/account" className="hover:text-white transition">My Account</Link></li>
            <li><Link href="/support" className="hover:text-white transition">Shipping & Returns</Link></li>
            <li><Link href="/support" className="hover:text-white transition">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wider text-sm mb-6">Newsletter</h4>
          <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive drops.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent border-b border-gray-600 text-sm w-full focus:outline-none focus:border-white py-2"
            />
            <button type="submit" className="text-xs font-bold uppercase hover:opacity-70">Join</button>
          </form>
        </div>
      </div>
      
      <div className="container px-4 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Vysera. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
        </div>
      </div>
    </footer>
  )
}