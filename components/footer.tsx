import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

/**
 * Social media link component
 */
interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <Link href={href} className="text-muted-foreground hover:text-primary">
    {icon}
    <span className="sr-only">{label}</span>
  </Link>
)

/**
 * Footer section with links
 */
interface FooterSectionProps {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

const FooterSection = ({ title, links }: FooterSectionProps) => (
  <section className="space-y-4">
    <h3 className="text-sm font-medium">{title}</h3>
    <ul className="space-y-2 text-sm">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="text-muted-foreground hover:text-primary">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

/**
 * Footer branding section with logo and social links
 */
const BrandingSection = () => {
  const socialLinks = [
    { href: "#", icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
    { href: "#", icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { href: "#", icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
    { href: "#", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" }
  ]
  
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="SAGE Research" className="h-7 w-7" />
        <span className="font-bold">SAGE Research</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Empowering educators and researchers with access to high-quality educational research.
      </p>
      <div className="flex space-x-4">
        {socialLinks.map((link, index) => (
          <SocialLink
            key={index}
            href={link.href}
            icon={link.icon}
            label={link.label}
          />
        ))}
      </div>
    </section>
  )
}

/**
 * Copyright section
 */
const CopyrightSection = () => (
  <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
    <p className="text-xs text-muted-foreground">
      © {new Date().getFullYear()} SAGE Research. All rights reserved.
    </p>
    <p className="text-xs text-muted-foreground mt-4 sm:mt-0">
      Designed and developed with ❤️ for educators and researchers
    </p>
  </div>
)

/**
 * Main footer component that assembles all sections
 */
export default function Footer() {
  // Footer sections data
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Research", href: "/research" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Research Papers", href: "#" },
        { label: "Educational Tools", href: "#" },
        { label: "Webinars", href: "#" },
        { label: "Blog", href: "#" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Accessibility", href: "#" },
      ]
    }
  ]

  return (
    <footer className="w-full border-t bg-background">
      <div className="container max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12">
        <nav className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <BrandingSection />
          
          {footerSections.map((section, index) => (
            <FooterSection 
              key={index}
              title={section.title} 
              links={section.links} 
            />
          ))}
        </nav>
        
        <CopyrightSection />
      </div>
    </footer>
  )
}
