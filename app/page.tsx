"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import { ArrowRight, CheckCircle, ChevronRight, ExternalLink, Instagram, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NoiseBackground from "@/components/noise-background"
import ProgressIndicator from "@/components/progress-indicator"
import AnimatedGradientBackground from "@/components/animated-gradient-background"
import TestimonialCarousel from "@/components/testimonial-carousel"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(setScrollProgress)
    return () => unsubscribe()
  }, [scrollYProgress])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <NoiseBackground />
      <ProgressIndicator progress={scrollProgress} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradientBackground />

        <div className="container relative z-10 px-4 py-32 md:py-48 mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-all">
              Personal Branding & Growth
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-300">
              Tap Your Full Potential
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Cold-reach companies, universities & investors with proven branding strategies
            </p>
            <Button
              size="lg"
              onClick={() => scrollToSection("programs")}
              className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white border-0 rounded-full px-8 py-6 text-lg font-medium mb-4"
            >
              Start Your Growth Journey Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("testimonials")
              }}
              className="flex items-center justify-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <span key={i} className="text-yellow-400">
                    {i === 4 ? "★" : "★"}
                  </span>
                ))}
              </div>
              <span className="font-medium">4.89</span>
              <span className="text-gray-400">(173)</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Meet <span className="text-teal-400">(Jas)Karan</span>
            </h2>
            <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-1/3"
            >
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 blur-lg opacity-70"></div>
                <img
                  src="/confident-young-professional.png"
                  alt="(Jas)Karan Walia"
                  className="relative z-10 rounded-full w-64 h-64 object-cover border-4 border-teal-500/30"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-2/3"
            >
              <p className="text-xl mb-6 text-gray-300">
                He's a 21-year-old influencer who, despite being from a tier-3 uni, successfully broke into big-tech
                companies like Microsoft and got into top colleges like MIT, Cambridge, NUS and CMU.
              </p>
              <p className="text-lg mb-6 text-gray-400">
                Through years of trial and error, Karan has developed a proven system for personal branding that opens
                doors to opportunities most people think are out of reach. His methods have helped hundreds of students
                and professionals transform their careers and educational paths.
              </p>
              <p className="text-lg text-gray-400">
                Now, he's on a mission to share his knowledge and help others achieve similar success through strategic
                personal branding and cold outreach techniques.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Your Personal Branding Roadmap</h2>
            <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
          </motion.div>

          <div className="flex flex-nowrap overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
            {[
              {
                title: "Research & Target",
                description: "Identify your ideal opportunities and understand what decision-makers are looking for.",
                icon: "🔍",
              },
              {
                title: "Craft Your Story",
                description: "Develop a compelling personal narrative that highlights your unique value proposition.",
                icon: "✍️",
              },
              {
                title: "Cold-Reach Mastery",
                description: "Learn proven techniques to connect with gatekeepers and decision-makers.",
                icon: "📱",
              },
              {
                title: "Community Support",
                description: "Join a network of like-minded individuals on similar growth journeys.",
                icon: "👥",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="min-w-[280px] md:min-w-[320px] snap-center"
              >
                <Card className="h-full bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-2">
                  <CardHeader>
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{step.description}</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-teal-400 flex items-center text-sm">
                      Step {index + 1} <ChevronRight className="h-4 w-4 ml-1" />
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-gray-950 to-black relative">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Success Stories</h2>
            <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Final CTA - Moved before Programs & Pricing */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950 relative">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Level Up?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Don't let another opportunity pass you by. Start your personal branding journey today.
            </p>
            <Button
              size="lg"
              onClick={() => scrollToSection("programs")}
              className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white border-0 rounded-full px-8 py-6 text-lg font-medium"
            >
              Select Your Plan <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Programs & Pricing */}
      <section id="programs" className="py-24 bg-gradient-to-b from-gray-950 to-black relative">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Growth Path</h2>
            <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Free Starter",
                description: "Follow for daily tips and insights",
                features: ["Daily content on personal branding", "Success stories", "Community updates"],
                price: "Free",
                cta: "Join My Socials",
                popular: false,
                links: [
                  { icon: <Instagram className="h-5 w-5" />, url: "https://www.instagram.com/" },
                  {
                    icon: <Linkedin className="h-5 w-5" />,
                    url: "https://www.linkedin.com/in/jaskaran-singh-walia-657696271/",
                  },
                ],
              },
              {
                title: "DIY Toolkit",
                description: "Essential templates and guides",
                features: ["Cold email templates", "LinkedIn optimization guide", "Personal branding checklist"],
                price: "$10",
                cta: "Get Templates & Guides",
                popular: false,
                link: "https://topmate.io/karanwxlia",
              },
              {
                title: "Community Pass",
                description: "Join our growth-focused community",
                features: ["13+ Hours of Video Guides", "Weekly LIVE Community Calls", "Private Community"],
                price: "Coming Soon",
                cta: "Join the Community",
                popular: true,
                link: "https://whop.com",
              },
              {
                title: "VIP Coaching",
                description: "Personalized 1:1 guidance",
                features: [
                  "2 Weekly Private Calls with Karan",
                  "2 Weekly Coaching Calls",
                  "Exclusive Templates & Guides",
                ],
                price: "Apply Only",
                cta: "Apply Now",
                popular: false,
                link: "#",
              },
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card
                  className={`h-full bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 ${program.popular ? "border-teal-500 shadow-lg shadow-teal-500/20" : ""}`}
                >
                  <CardHeader>
                    {program.popular && <Badge className="self-start mb-2 bg-teal-500 text-black">Most Popular</Badge>}
                    <CardTitle className="text-xl text-white">{program.title}</CardTitle>
                    <CardDescription className="text-gray-400">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-2xl font-bold text-white">{program.price}</p>
                    <ul className="space-y-2">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-400 mr-2 shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {program.links ? (
                      <div className="flex space-x-2">
                        {program.links.map((link, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-teal-500 text-teal-400 hover:bg-teal-500/10"
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              {link.icon}
                            </a>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <Button
                        asChild
                        className={`w-full ${program.popular ? "bg-teal-500 hover:bg-teal-600 text-black" : "bg-gray-700 hover:bg-gray-600"}`}
                      >
                        <a href={program.link} target="_blank" rel="noopener noreferrer">
                          {program.cta} <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Follow My Journey Section */}
      <section id="follow" className="py-24 bg-gradient-to-b from-black to-gray-950 relative">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Follow My Journey</h2>
            <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <motion.a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-4 p-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                <Instagram className="h-12 w-12 text-white group-hover:text-pink-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Instagram</h3>
              <p className="text-teal-400 font-medium">30k+ Followers</p>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/jaskaran-singh-walia-657696271/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-4 p-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-blue-500/20 group-hover:to-blue-700/20 transition-all duration-300">
                <Linkedin className="h-12 w-12 text-white group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">LinkedIn</h3>
              <p className="text-teal-400 font-medium">50k+ Connections</p>
            </motion.a>

            <motion.a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-4 p-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-red-500/20 group-hover:to-red-700/20 transition-all duration-300">
                <Youtube className="h-12 w-12 text-white group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">YouTube</h3>
              <p className="text-teal-400 font-medium">Coming Soon</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Karan Walia. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                Terms of Service
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Instagram className="h-6 w-6 mr-2" />
                <span className="font-medium">30k+</span>
              </a>
              <a
                href="https://www.linkedin.com/in/jaskaran-singh-walia-657696271/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Linkedin className="h-6 w-6 mr-2" />
                <span className="font-medium">50k+</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
