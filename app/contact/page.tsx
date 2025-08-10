"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ContactPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-12 md:py-24">
        <motion.div
          className="space-y-2 mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions or feedback? We're here to help and would love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">
                    First name
                  </label>
                  <Input 
                    id="first-name" 
                    placeholder="Enter your first name" 
                    className="h-11 rounded-xl"
                    suppressHydrationWarning
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">
                    Last name
                  </label>
                  <Input 
                    id="last-name" 
                    placeholder="Enter your last name" 
                    className="h-11 rounded-xl"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input 
                  id="email" 
                  placeholder="Enter your email" 
                  type="email" 
                  className="h-11 rounded-xl"
                  suppressHydrationWarning
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="Enter the subject" 
                  className="h-11 rounded-xl"
                  suppressHydrationWarning
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Enter your message" 
                  className="min-h-[120px] rounded-xl resize-none"
                  suppressHydrationWarning
                />
              </div>
              
              <Button size="lg" className="w-full rounded-xl h-12 mt-2 gap-2 bg-primary hover:bg-primary/90">
                Send Message <Send className="h-4 w-4 ml-1" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <Card className="overflow-hidden border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a 
                      href="mailto:rairishi934@gmail.com" 
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      rairishi934@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a 
                      href="tel:+91 9508300862" 
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      +91 9508300862
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Badarpur<br />
                      New Delhi, 110076<br />
                      India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 rounded-2xl overflow-hidden shadow-sm h-[200px] md:h-[240px]">
              <img
                src="/map-view.jpg"
                alt="Office location map"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <Separator className="my-16" />

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Find answers to common questions about SAGE Research
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I create an account?",
                answer:
                  "You can create an account by clicking the 'Sign Up' button in the top right corner of our website. Follow the prompts to complete your registration.",
              },
              {
                question: "Is SAGE Research free to use?",
                answer:
                  "We offer both free and premium subscription options. The free tier provides access to basic features, while premium subscriptions unlock additional resources and capabilities.",
              },
              {
                question: "How can I submit my research to SAGE?",
                answer:
                  "Researchers can submit their work through our submission portal. All submissions undergo a peer review process before being published on our platform.",
              },
              {
                question: "Do you offer institutional subscriptions?",
                answer:
                  "Yes, we offer special subscription plans for educational institutions. Contact our sales team for more information about institutional pricing.",
              },
            ].map((faq, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
