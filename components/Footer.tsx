import { LucideGlobe, LucideMail, LucidePhone, LucideVideo } from 'lucide-react'
import React from 'react'
import { IconBase } from 'react-icons'
import { FaInternetExplorer, FaVoicemail } from 'react-icons/fa'

export default function Footer() {
  const footerNavLinks = [
    {
        title: "Products",
        links: [
            {
                name: "Makanan",
                url: "#"
            },
            {
                name: "Minuman",
                url: "#"
            },
            {
                name: "Fashion",
                url: "#"
            },
            {
                name: "Kebutuhan Dasar",
                url: "#"
            },
            {
                name: "Furniture",
                url: "#"
            },            
        ]
    },
    {
        title: "Resources",
        links: [
            {
                name: "Support 24/7",
                url: "#"
            },
            {
                name: "Blog & Tips",
                url: "#"
            },
            {
                name: "About Us",
                url: "#"
            },
        ]
    },
    {
        title: "Company",
        links: [
            {
                name: "Privacy and Policy",
                url: "#"
            },
            {
                name: "Terms and Conditions",
                url: "#"
            },
            {
                name: "Join With Us",
                url: "#"
            },
        ]
    },
  ]

  const iconLinks = [
    {
        icon: LucideMail,
        url: "#"
    },
    {
        icon: LucideGlobe,
        url: "#"
    },
    {
        icon: LucidePhone,
        url: "#"
    },
    {
        icon: LucideVideo,
        url: "#"
    },
  ]

  return (
    <div className="bg-white container mx-auto">
        <div className="space-y-8 py-16 lg:space-y-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <div  className="lg:col-span-1">
                    <div className='flex gap-4 items-center'>
                        <img src="/image/logo.png" alt="logo image" />
                        <p className='text-2xl font-bold'>For UMKM</p>
                    </div>

                    <p className="mt-8 max-w-xs text-foregroundSecondary">
                    Website Untuk Kebutuhan UMKM
                    </p>

                    <ul className="mt-8 flex gap-6">
                        {iconLinks.map((iconLink, i) => 
                            <li key={i}>
                                <a
                                    href={iconLink.url}
                                    rel="noreferrer"
                                    target="_blank"
                                    className="h-12 w-12 rounded-full grid place-items-center border hover:bg-accent hover:text-white transition-all"
                                >
                                    <iconLink.icon size={20} />
                                </a>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-3 lg:justify-items-end">
                    {footerNavLinks.map(link =>     
                        <div key={link.title}>
                            <p className="font-bold">{link.title}</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                {link.links.map(item => 
                                    <li key={item.name}>
                                        <a href={item.url} className="text-foregroundSecondary transition hover:underline hover:text-accent"> {item.name} </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* <p className="text-xs text-gray-500">&copy; 2025. Company Name. All rights reserved.</p> */}
        </div>
        </div>
  )
}
