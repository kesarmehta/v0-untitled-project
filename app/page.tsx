"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Instagram,
  Linkedin,
  FileText,
  Mail,
  Users,
  Twitter,
  Youtube,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NoiseBackground from "@/components/noise-background"
import ProgressIndicator from "@/components/progress-indicator"
import ProfessionalGradientBackground from "@/components/professional-gradient-background"
import StaticTestimonials from "@/components/static-testimonials"
import PricingToggle from "@/components/pricing-toggle"
import AboutSection from "@/components/about-section"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAnnualBilling, setIsAnnualBilling] = useState(false)
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
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <NoiseBackground />
      <ProgressIndicator progress={scrollProgress} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ProfessionalGradientBackground />

        <div className="container relative z-10 px-4 py-32 md:py-48 mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-300 leading-tight pb-2">
              Figure out what you're capable of
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
              Cold-reach companies, universities & investors with my strategies
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
              <span className="font-medium border-b border-teal-400">4.89</span>
              <span className="text-gray-400 border-b border-teal-400">(173)</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Rest of the code remains the same */}
      {/* 4 Skills You Need To Master */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">4 Skills You Need To Master</h2>
            <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
          </motion.div>

          <div className="flex flex-nowrap overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
            {[
              {
                title: "Cold-Emailing",
                description: "What to write, when to send, and what to ask for to get responses from decision-makers.",
                icon: <Mail className="h-10 w-10 text-teal-400" />,
              },
              {
                title: "Resume ATS Optimization",
                description: "Optimize your resume to pass ATS systems and land interview shortlists at big companies.",
                icon: <FileText className="h-10 w-10 text-teal-400" />,
              },
              {
                title: "Realistic Path Planning",
                description:
                  "How to plan your journey, target the right opportunities, and build a long-term strategy.",
                icon: <Users className="h-10 w-10 text-teal-400" />,
              },
              {
                title: "Social Media Presence",
                description: "Build your personal brand on LinkedIn and X to attract opportunities and connections.",
                icon: <Twitter className="h-10 w-10 text-teal-400" />,
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
                    <div className="mb-4">{step.icon}</div>
                    <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Now using static testimonials */}
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

          <StaticTestimonials />
        </div>
      </section>

      {/* Final CTA - Updated text */}
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
            <p className="text-xl text-gray-300 mb-8">Choose Your Growth Path</p>
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

      {/* Programs & Pricing - Updated heading */}
      <section id="programs" className="py-24 bg-gradient-to-b from-gray-950 to-black relative">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <PricingToggle isAnnual={isAnnualBilling} onToggle={setIsAnnualBilling} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Free Starter",
                description: "Follow for daily tips and insights",
                features: ["Daily content on personal branding", "Success stories", "Community updates"],
                price: "Free",
                cta: "Join My Socials",
                popular: false,
                socialLinks: [
                  {
                    icon: <Instagram className="h-8 w-8 text-white group-hover:text-pink-400 transition-colors" />,
                    url: "https://www.instagram.com/karanwalia.ai/",
                    platform: "Instagram",
                    followers: "50k+ Followers",
                  },
                  {
                    icon: <Linkedin className="h-8 w-8 text-white group-hover:text-blue-500 transition-colors" />,
                    url: "https://www.linkedin.com/in/jaskaran-singh-walia-657696271/",
                    platform: "LinkedIn",
                    followers: "55k+ Followers",
                  },
                  {
                    icon: <Youtube className="h-8 w-8 text-white group-hover:text-red-500 transition-colors" />,
                    url: "https://www.youtube.com/",
                    platform: "YouTube",
                    followers: "Coming Soon",
                  },
                ],
              },
              {
                title: "DIY Toolkit",
                description: "My Templates and guides",
                features: [
                  <>
                    <span key="cold-email-templates" className="font-bold">
                      Cold email templates
                    </span>
                    <div key="cold-email-templates-container">
                      <div key="cold-email-templates-1" className="flex">
                        <span className="mr-2">•</span>
                        <span>My 1h guide on how to be the best at cold-emailing.</span>
                      </div>
                      <div key="cold-email-templates-2" className="flex">
                        <span className="mr-2">•</span>
                        <span>The Mail that got me into Cambridge, MIT, CMU, NUS</span>
                      </div>
                      <div key="cold-email-templates-3" className="flex">
                        <span className="mr-2">•</span>
                        <span>The Mail that got me big tech & FAANG interviews</span>
                      </div>
                      <div key="cold-email-templates-4" className="flex">
                        <span className="mr-2">•</span>
                        <span>The Mail that secured me a call with a $1Bn+ VS CEO</span>
                      </div>
                    </div>
                  </>,
                  <>
                    <span key="resume-ats-optimization" className="font-bold">
                      Resume ATS optimization guide
                    </span>
                    <div key="resume-ats-optimization-container">
                      <div key="resume-ats-optimization-1" className="flex">
                        <span className="mr-2">•</span>
                        <span>My guide on how to beat the ATS</span>
                      </div>
                      <div key="resume-ats-optimization-2" className="flex">
                        <span className="mr-2">•</span>
                        <span>Including my resume that got me interviews at Microsoft, Google, Adobe, & more.</span>
                      </div>
                      <div key="resume-ats-optimization-3" className="flex">
                        <span className="mr-2">•</span>
                        <span>A bonus: My Academic_CV (not resume) for students.</span>
                      </div>
                    </div>
                  </>,
                ],
                price: "$10",
                cta: "Get Templates & Guides",
                popular: false,
                link: "https://topmate.io/karanwxlia",
              },
              {
                title: "Community Pass",
                description: "Join Karan's community",
                features: [
                  "Everything in DIY for FREE",
                  "Monthly private 1:1s with Karan for personalized guidance",
                  "2 Weekly LIVE Community Calls",
                  "Unlimited 1:1 Chat with Karan (replies daily)",
                  "Private community",
                  "Resume reviews with Karan",
                  "Cold-email strategy & reviews with Karan",
                ],
                price: isAnnualBilling ? "$25" : "$49",
                originalPrice: isAnnualBilling ? "$588" : null,
                discount: isAnnualBilling ? "49%" : null,
                annualTotal: isAnnualBilling ? "$299" : null,
                cta: "Join the Community",
                popular: true,
                link: isAnnualBilling
                  ? "https://whop.com/checkout/plan_OcuDXSg9n2hwY?d2c=true"
                  : "https://whop.com/checkout/plan_bg4tM71Fs9BFF?d2c=true",
              },
              {
                title: "Private Pass",
                description: "Personalized 1:1 guidance",
                features: [
                  "Everything in DIY for FREE",
                  "Everything in Community Pass for FREE",
                  "2 Weekly 1:1s with Karan",
                  "Personalized path planing to achieve your goal (the way I did mine)",
                  "Mock Interviews & Interview prep",
                  "Scholarship & Funding Guidance on MS",
                  "SOP/LOR/Resume/ColdMail/Presentation review",
                  "Interview presentation & guide on how I've never once failed an Interview",
                ],
                price: "Apply Only",
                cta: "Applications Closed",
                popular: false,
                link: "#",
                applicationsClosed: true,
              },
            ].map(
              (
                program: {
                  title: string
                  description: string
                  features: React.ReactNode[]
                  price: string
                  cta: string
                  popular: boolean
                  link?: string
                  links?: { icon: React.ReactNode; url: string }[]
                  socialLinks?: { icon: React.ReactNode; url: string; platform: string; followers: string }[]
                  originalPrice?: string | null
                  discount?: string | null
                  annualTotal?: string | null
                  applicationsClosed?: boolean
                },
                index,
              ) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card
                    className={`
  h-full 
  ${
    program.popular && !isAnnualBilling
      ? "bg-gradient-to-br from-gray-800 to-gray-900 border-teal-500 shadow-md shadow-teal-500/20"
      : program.popular && isAnnualBilling
        ? "bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500 shadow-lg shadow-orange-500/20"
        : "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
  }
`}
                  >
                    <CardHeader>
                      {program.popular && !isAnnualBilling && (
                        <Badge className="self-start mb-2 bg-teal-500 text-black">Most Popular</Badge>
                      )}
                      {program.popular && isAnnualBilling && (
                        <Badge className="self-start mb-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          Best Value
                        </Badge>
                      )}
                      <CardTitle className="text-xl text-white">{program.title}</CardTitle>
                      <CardDescription className="text-gray-400">{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div key={index}>
                        {program.originalPrice && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg text-gray-400 line-through">{program.originalPrice}</span>
                            {program.title === "Community Pass" && isAnnualBilling && (
                              <span className="text-lg text-white">{program.annualTotal}</span>
                            )}
                            <span className="text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full">
                              Save {program.discount}
                            </span>
                          </div>
                        )}
                        <p className="text-2xl font-bold text-white">
                          {isAnnualBilling && program.title === "Community Pass" ? (
                            <>
                              $25 <span className="text-sm font-normal text-gray-300">per month</span>
                            </>
                          ) : (
                            program.price
                          )}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {program.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle
                              className={`h-5 w-5 mr-2 shrink-0 mt-0.5 ${
                                program.popular && isAnnualBilling ? "text-orange-400" : "text-teal-400"
                              }`}
                            />
                            <span className="text-gray-300 text-sm">
                              {typeof feature === "string" && feature.includes("FREE") ? (
                                <>
                                  {feature.split("FREE")[0]}
                                  <span
                                    className={`font-bold ${program.popular && isAnnualBilling ? "text-orange-400" : "text-teal-400"}`}
                                  >
                                    FREE
                                  </span>
                                  {feature.split("FREE")[1]}
                                </>
                              ) : (
                                feature
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      {program.socialLinks ? (
                        <div className="w-full space-y-4">
                          {program.socialLinks.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center group w-full p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                            >
                              <div className="p-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 mr-3">
                                {link.icon}
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{link.platform}</h4>
                                <p className="text-sm text-teal-400">{link.followers}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      ) : program.applicationsClosed ? (
                        <div className="w-full">
                          <div className="w-full flex items-center justify-center bg-gray-900 text-gray-500 py-3 px-4 rounded-md border border-gray-700 cursor-not-allowed">
                            <XCircle className="mr-2 h-5 w-5" />
                            <span className="line-through">Applications Closed</span>
                          </div>
                          <p className="text-xs text-center text-gray-500 mt-2">
                            Private Pass applications are currently not being accepted
                          </p>
                        </div>
                      ) : (
                        <>
                          <Button
                            asChild
                            className={`w-full ${
                              program.popular && !isAnnualBilling
                                ? "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
                                : program.popular && isAnnualBilling
                                  ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                                  : "bg-gray-700 hover:bg-gray-600 text-white border border-teal-500 hover:border-teal-400 transition-colors"
                            }`}
                          >
                            <a href={program.link} target="_blank" rel="noopener noreferrer">
                              {program.cta} <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>

                          {program.title === "Community Pass" && (
                            <a
                              href={
                                isAnnualBilling
                                  ? "https://whop.com/checkout/plan_HkGp4mEaRuiCW?d2c=true"
                                  : "https://whop.com/checkout/plan_ksiotkOaM27RH?d2c=true"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-center text-gray-400 underline hover:text-teal-400 transition-colors mt-1"
                            >
                              Click here to pay in INR
                            </a>
                          )}
                        </>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-950 relative">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Questions?</h2>
            <p className="text-lg text-gray-300 mb-6">Contact me on my gmail</p>
            <Button asChild variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-500/10">
              <a
                href="mailto:karanwalia2k3@gmail.com?subject=[Doubt]%20Hi,%20I%20came%20here%20from%20your%20website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="mr-2 h-5 w-5" />
                karanwalia2k3@gmail.com
              </a>
            </Button>
          </motion.div>
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
              href="https://www.instagram.com/karanwalia.ai/"
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
              <p className="text-teal-400 font-medium">50k+ Followers</p>
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
              <p className="text-teal-400 font-medium">55k+ Followers</p>
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
                href="https://www.instagram.com/karanwalia.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Instagram className="h-6 w-6 mr-2" />
                <span className="font-medium">50k+</span>
              </a>
              <a
                href="https://www.linkedin.com/in/jaskaran-singh-walia-657696271/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Linkedin className="h-6 w-6 mr-2" />
                <span className="font-medium">55k+ Followers</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
