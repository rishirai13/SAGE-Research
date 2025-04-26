"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, FileText, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"

/**
 * Custom style component for the split text animation in hero section
 */
function SplitTextStyle() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      .split-word {
        will-change: transform, opacity;
        display: inline-block;
        margin-right: 0.25rem;
      }
      
      .hero-text-container {
        overflow: hidden;
      }
    `}} />
  )
}

/**
 * Type definitions for the component props
 */
interface ResearchItemProps {
  title: string
  description: string
  date: string
  category: string
  index: number
}

interface FeatureItemProps {
  title: string
  description: string
  index: number
}

/**
 * Featured research item component
 */
const FeaturedResearchItem = ({ 
  title, 
  description, 
  date, 
  category, 
  index 
}: ResearchItemProps) => (
  <motion.div
    key={index}
    className="group relative overflow-hidden rounded-lg border bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-950"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: 0.1 * index }}
  >
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
          <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="font-medium">{category}</div>
      </div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400 flex-grow">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <BookOpen className="h-4 w-4" />
        <span>Published: {date}</span>
      </div>
      <div className="mt-6">
        <Link href={`/research/${index+1}`} className="inline-flex items-center text-sm font-medium text-primary">
          Read Full Paper
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  </motion.div>
)

/**
 * Feature item component for the "Why Choose" section
 */
const FeatureItem = ({ title, description, index }: FeatureItemProps) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 * index }}
    className="flex flex-col items-center text-center p-6 bg-white rounded-lg border shadow-sm dark:bg-gray-950"
  >
    <div className="rounded-full bg-primary/10 p-3 mb-4">
      <div className="rounded-full bg-primary/20 p-2">
        <div className="rounded-full bg-primary w-6 h-6"></div>
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400">{description}</p>
  </motion.div>
)

/**
 * Hero section component
 */
const HeroSection = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
  
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!heroTextRef.current) return
      
      // Make sure the element is visible once fonts are loaded
      heroTextRef.current.style.visibility = "visible"
      
      // Animate the words in the heading
      const { words } = splitText(heroTextRef.current)
      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 2,
          bounce: 0.1,
          delay: stagger(0.05),
        }
      )
    })
  }, [])
  
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-text-container">
              <h1 
                ref={heroTextRef} 
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                style={{ visibility: "hidden" }}
              >
                Discover Educational Research That Matters
              </h1>
            </div>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Access thousands of peer-reviewed studies, articles, and resources to enhance your teaching and
              research.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto lg:ml-auto"
          >
            <div className="rounded-xl overflow-hidden border shadow-lg">
              <img
                src="/hero-image.jpg"
                alt="Educational research dashboard"
                className="aspect-video object-cover w-full"
                suppressHydrationWarning
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Search section component
 */
const SearchSection = () => (
  <motion.section
    className="py-12 bg-gray-50 dark:bg-gray-900"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Research</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Search our extensive database of educational research papers, studies, and articles.
          </p>
        </div>
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex w-full max-w-lg items-center space-x-2 mx-auto">
            <Input 
              type="text" 
              placeholder="Search for research papers..." 
              className="flex-1"
              suppressHydrationWarning 
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
)

/**
 * Featured research section component with research items
 */
const FeaturedResearchSection = () => {
  const featuredResearch = [
    {
      title: "The Impact of Technology on Student Engagement",
      description: "A comprehensive study on how educational technology affects student participation and learning outcomes.",
      date: "Jan 2023",
      category: "Education Technology"
    },
    {
      title: "Inclusive Teaching Methodologies",
      description: "Research on effective teaching strategies for diverse classroom environments and learning styles.",
      date: "Mar 2023",
      category: "Inclusive Education"
    },
    {
      title: "Long-term Effects of Remote Learning",
      description: "Analysis of how pandemic-era remote education has impacted student development and academic progress.",
      date: "Nov 2022",
      category: "Distance Learning"
    }
  ]
  
  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Research</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Explore the latest and most impactful educational research studies.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredResearch.map((item, i) => (
            <FeaturedResearchItem 
              key={i}
              title={item.title}
              description={item.description}
              date={item.date}
              category={item.category}
              index={i}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/research">
              View All Research
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

/**
 * Features section component with platform features
 */
const FeaturesSection = () => {
  const features = [
    {
      title: "Peer-Reviewed Content",
      description: "Access thousands of peer-reviewed studies ensuring quality and reliability.",
    },
    {
      title: "Easy Search & Filters",
      description: "Find exactly what you need with our powerful search and filtering tools.",
    },
    {
      title: "Citation Tools",
      description: "Generate citations in multiple formats with a single click.",
    },
    {
      title: "Personalized Recommendations",
      description: "Discover relevant research based on your interests and previous searches.",
    },
    {
      title: "Collaboration Features",
      description: "Share and collaborate on research with colleagues and peers.",
    },
    {
      title: "Regular Updates",
      description: "Stay current with the latest research in your field of interest.",
    },
  ]
  
  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose SAGE Research</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Our platform offers unique advantages for educators, researchers, and students.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureItem 
              key={i}
              title={feature.title}
              description={feature.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Call-to-action section component
 */
const CTASection = () => (
  <section className="py-16 md:py-20">
    <div className="container px-4 md:px-6">
      <div className="rounded-2xl bg-gray-100 p-6 md:p-10 dark:bg-gray-800">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Enhance Your Research?
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Join thousands of educators and researchers who use SAGE Research to discover, learn, and innovate.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Request Demo
              </Button>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto">
            <img
              src="/team-photo.jpg"
              alt="Research collaboration"
              className="rounded-xl object-cover w-full"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>
    </div>
  </section>
)

/**
 * Home page component that assembles all sections
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SplitTextStyle />
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <SearchSection />
        <FeaturedResearchSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
