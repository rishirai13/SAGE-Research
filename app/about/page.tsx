"use client"

import { useEffect, ReactNode } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  // Animation variants with faster transitions
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Hero section with scroll-triggered animations
  function AnimatedSection({ 
    children, 
    className, 
    delay = 0 
  }: { 
    children: ReactNode; 
    className?: string; 
    delay?: number;
  }) {
    const controls = useAnimation()
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
    })

    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeUp}
        transition={{ duration: 0.3, delay }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
            <div className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          <div className="container px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto space-y-6 text-center"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.3 }}
            >
              <motion.h1 
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
                variants={fadeUp}
              >
                About SAGE Research
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-lg md:text-xl dark:text-gray-300 max-w-2xl mx-auto"
                variants={fadeUp}
              >
                Empowering educators and researchers with access to high-quality educational research.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <AnimatedSection className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src="/team-photo.jpg"
                    alt="SAGE Research team"
                    className="w-full h-full object-cover aspect-video"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection className="space-y-6 order-1 lg:order-2" delay={0.1}>
                <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    At SAGE Research, we believe that access to high-quality educational research is essential for
                    advancing teaching practices and improving learning outcomes. Our mission is to connect educators,
                    researchers, and students with the latest findings and insights in educational research.
                  </p>
                  <p>
                    We are committed to making research accessible, understandable, and applicable to real-world
                    educational settings. By bridging the gap between research and practice, we aim to empower educators
                    to make evidence-based decisions that positively impact student learning.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="container px-4">
            <AnimatedSection className="max-w-3xl mx-auto space-y-2 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
            </AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <AnimatedSection className="space-y-6 text-gray-600 dark:text-gray-300" delay={0.1}>
                <p>
                  SAGE Research was founded in 2010 by a group of educators and researchers who recognized the need for
                  a platform that would make educational research more accessible to practitioners. What began as a
                  small repository of research papers has grown into a comprehensive platform serving thousands of users
                  worldwide.
                </p>
                <p>
                  Over the years, we have expanded our offerings to include not only research papers but also practical
                  resources, tools, and community features that help educators apply research findings in their
                  classrooms. Our team has grown to include experts in various educational fields, technology
                  specialists, and dedicated support staff.
                </p>
                <p>
                  Today, SAGE Research is recognized as a leading platform for educational research, trusted by
                  institutions, educators, and researchers around the globe. We continue to innovate and improve our
                  platform to better serve the educational community and advance the field of education.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container px-4">
            <AnimatedSection className="max-w-3xl mx-auto space-y-2 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Our Team</h2>
              <p className="text-gray-600 dark:text-gray-300">Meet the dedicated professionals behind SAGE Research.</p>
            </AnimatedSection>
            <motion.div 
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                {
                  name: "Rishi Rai",
                  role: "Founder & CEO",
                  bio: "Rishi Rai is the Founder & CEO of Sage Research Education, a next-generation EdTech venture dedicated to turning curious minds into industry-ready innovators. With a background in Computer Science and a passion for bridging the gap between academic learning and real-world application, Rishi leads Sage with a vision to make high-quality, hands-on education accessible to all. He believes in transforming learning into a research-driven, project-based journey that empowers students not just to secure jobs, but to create solutions that shape the future.",
                },
                {
                  name: "Kartikey",
                  role: "Chief Technology Officer",
                  bio: "Tech innovator with a passion for making research accessible through technology.",
                },
                {
                  name: "Ayush Rai",
                  role: "Research Director",
                  bio: "Specializes in curriculum development and assessment practices.",
                },
                {
                  name: "Vikash",
                  role: "Head of User Experience",
                  bio: "Dedicated to creating intuitive and accessible platforms for educators.",
                },
                {
                  name: "Shubham Singh",
                  role: "Content Curator",
                  bio: "Expert in educational policy and implementation research.",
                },
                {
                  name: "Ashish Shukla",
                  role: "Community Manager",
                  bio: "Former teacher focused on building connections between researchers and practitioners.",
                },
              ].map((member, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="mb-4 overflow-hidden rounded-full p-1 bg-gradient-to-r from-primary/20 to-primary/10 transition-all duration-300 group-hover:from-primary/40 group-hover:to-primary/20">
                    <div className="rounded-full overflow-hidden bg-white p-0.5">
                      <img
                        src="/user-profile.jpg"
                        alt={member.name}
                        className="h-24 w-24 object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xs">{member.bio}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection className="rounded-2xl bg-white dark:bg-gray-800 p-8 md:p-12 shadow-sm text-center space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Join Our Community</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                  Connect with educators and researchers who share your passion for evidence-based education.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Link href="/signup">
                    <Button size="lg" className="rounded-full px-8 transition-transform hover:scale-105">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="rounded-full px-8 transition-transform hover:scale-105">
                    Learn More
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
