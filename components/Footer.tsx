"use client"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top section with logo and social media */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <svg width="50" height="50" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M32 20C60 1 101 16 106.5 53.5L113 35.5C100.5 8 75.5 0.5 61.5 1.45612e-06C33.5 -0.399999 13.8333 18.5 8.5 28C-7.49999 55.2 2.83334 82.3333 10 92.5C24.8 114.5 49.1667 119 59.5 118.5C71.0432 118.072 85.5 114 94 107C110.5 95 115.925 75.8664 118.5 69L135.5 21.5L171.5 118.5H183.5L142 1.5H129.5L108 63.5L105 71L101.5 79C98 88.5 90.5 95 90.5 95C81.5 103 75.5 104 75.5 104C51 112.481 34 100.5 28.5 96C16.7175 86.3597 13 73.5 11.5 66.5C8.5 40.5 23 25.6667 32 20Z"
                  fill="#F05A28"
                />
              </svg>
              <div className="ml-3">
                <h2 className="text-2xl font-bold">Opulent</h2>
                <p className="text-sm text-gray-600">Abodes</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Link href="#" className="bg-[#F05A28] text-white p-3 rounded-full hover:bg-orange-600 transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="bg-[#F05A28] text-white p-3 rounded-full hover:bg-orange-600 transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="bg-[#F05A28] text-white p-3 rounded-full hover:bg-orange-600 transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="bg-[#F05A28] text-white p-3 rounded-full hover:bg-orange-600 transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        {/* Middle section with links and contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-t border-b border-gray-200 py-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F05A28]">Properties</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Luxury Living
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Waterfront Estates
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Urban Penthouses
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Country Estates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F05A28]">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F05A28]">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Market Insights
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Buyer's Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#F05A28] transition-colors">
                  Seller's Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F05A28]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-[#F05A28] flex-shrink-0 mt-1" />
                <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-[#F05A28]" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-[#F05A28]" />
                <span>info@opulentabodes.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Opulent Abodes. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="#" className="hover:text-[#F05A28] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#F05A28] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[#F05A28] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
