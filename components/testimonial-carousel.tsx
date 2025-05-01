"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Quote, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Define placeholder image URLs for each testimonial
const placeholderImages = {
  "Priya Sharma": "/confident-professional.png",
  "Rahul Patel": "/cheerful-indian-man.png",
  "Sarah Johnson": "/confident-blonde-professional.png",
  "Alex Chen": "/thoughtful-student.png",
  "Maya Rodriguez": "/joyful-latina.png",
  "David Kim": "/confident-korean-businessman.png",
  "Aisha Patel": "/confident-indian-architect.png",
  "James Wilson": "/confident-bearded-professional.png",
  "Sophia Garcia": "/confident-hispanic-professional.png",
  "Omar Hassan": "/confident-engineer.png",
}

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    quote:
      "Karan's personal branding strategies helped me stand out in a sea of applicants. I landed my dream job at Google within 3 months of following his system. The LinkedIn optimization guide was particularly helpful in getting noticed by recruiters. I went from zero callbacks to multiple interviews per week.",
    image: "/confident-professional.png",
  },
  {
    name: "Rahul Patel",
    role: "MBA Student at Harvard",
    quote:
      "I was rejected from my top choice schools twice before. After working with Karan, I got accepted to 3 Ivy League programs including Harvard. His approach to crafting personal statements and preparing for interviews completely transformed how I presented myself to admissions committees.",
    image: "/cheerful-indian-man.png",
  },
  {
    name: "Sarah Johnson",
    role: "Product Manager at Meta",
    quote:
      "The cold outreach templates and strategies were game-changers. I connected with senior leaders I never thought would respond to me. Within weeks, I had coffee chats with directors and VPs at top tech companies. Karan's system for following up was particularly effective in building meaningful relationships.",
    image: "/confident-blonde-professional.png",
  },
  {
    name: "Alex Chen",
    role: "CS Student at MIT",
    quote:
      "Coming from a no-name school, I didn't think MIT was possible. Karan's guidance on showcasing my projects got me noticed and accepted. His advice on how to structure my portfolio and highlight my technical achievements made all the difference. I'm now collaborating with professors on research I'm passionate about.",
    image: "/thoughtful-student.png",
  },
  {
    name: "Maya Rodriguez",
    role: "UX Designer at Apple",
    quote:
      "The community support was incredible. Having peers to review my portfolio and application materials made all the difference. Karan's feedback on my design case studies helped me articulate my process in a way that resonated with hiring managers. The mock interviews with community members prepared me for tough questions.",
    image: "/joyful-latina.png",
  },
  {
    name: "David Kim",
    role: "Research Assistant at Cambridge",
    quote:
      "Karan's advice on how to approach professors led to multiple research opportunities and eventually my position at Cambridge. His email templates for academic outreach helped me communicate my research interests clearly and professionally. I'm now working on projects I only dreamed about before.",
    image: "/confident-korean-businessman.png",
  },
  {
    name: "Aisha Patel",
    role: "Investment Banking Analyst",
    quote:
      "The personal branding roadmap helped me position myself perfectly for finance roles despite having no connections in the industry. Karan's networking strategies opened doors at top firms, and his interview preparation techniques gave me the confidence to excel. I received offers from three bulge bracket banks.",
    image: "/confident-indian-architect.png",
  },
  {
    name: "James Wilson",
    role: "PhD Candidate at Stanford",
    quote:
      "Following Karan's system, I was able to secure full funding for my PhD program at Stanford after being rejected the previous year. His guidance on how to communicate with potential advisors and structure my research proposal made my application much stronger. The difference in responses was night and day.",
    image: "/confident-bearded-professional.png",
  },
  {
    name: "Sophia Garcia",
    role: "Marketing Manager at Nike",
    quote:
      "The LinkedIn optimization guide alone transformed my profile. I started getting inbound opportunities within weeks. Karan's content strategy for personal branding helped me establish myself as a thought leader in my niche. His templates for reaching out to hiring managers led directly to my role at Nike.",
    image: "/confident-hispanic-professional.png",
  },
  {
    name: "Omar Hassan",
    role: "Software Engineering Intern at Microsoft",
    quote:
      "As an international student, I struggled to get noticed. Karan's strategies helped me land multiple FAANG interviews and ultimately my Microsoft internship. His resume review pointed out weaknesses I never would have noticed, and his system for preparing for technical interviews was incredibly effective.",
    image: "/confident-engineer.png",
  },
]

// Duplicate testimonials to create a seamless loop
const extendedTestimonials = [...testimonials, ...testimonials]

export default function TestimonialCarousel() {
  const [showAll, setShowAll] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const controls1 = useAnimation()
  const controls2 = useAnimation()
  const controls3 = useAnimation()

  useEffect(() => {
    // Start animations for each row
    const startAnimations = async () => {
      // Row 1 moves right to left
      controls1.start({
        x: [0, -1920],
        transition: {
          duration: hoveredRow === 0 ? 60 : 30,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        },
      })

      // Row 2 moves left to right
      controls2.start({
        x: [-1920, 0],
        transition: {
          duration: hoveredRow === 1 ? 60 : 30,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        },
      })

      // Row 3 moves right to left (faster)
      controls3.start({
        x: [0, -1920],
        transition: {
          duration: hoveredRow === 2 ? 60 : 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        },
      })
    }

    startAnimations()
  }, [controls1, controls2, controls3, hoveredRow])

  // Function to get the appropriate image source
  const getImageSrc = (testimonial: (typeof testimonials)[0]) => {
    // First try the testimonial's image
    if (testimonial.image) {
      return testimonial.image
    }

    // If no image, use the predefined placeholder for this person
    if (placeholderImages[testimonial.name as keyof typeof placeholderImages]) {
      return placeholderImages[testimonial.name as keyof typeof placeholderImages]
    }

    // Fallback to a generic placeholder
    return `/placeholder.svg?height=64&width=64&query=${encodeURIComponent(testimonial.name)}`
  }

  const renderTestimonialCard = (testimonial: (typeof testimonials)[0], index: number) => (
    <div className="inline-block w-[350px] flex-shrink-0 px-2" key={index}>
      <Card className="h-[280px] bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 hover:border-teal-500 transition-all duration-300">
        <CardContent className="p-4 h-full overflow-y-auto scrollbar-hide">
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-teal-500/20 blur-sm"></div>
              <img
                src={getImageSrc(testimonial) || "/placeholder.svg"}
                alt={testimonial.name}
                className="relative z-10 rounded-full w-16 h-16 object-cover border-2 border-teal-500/30"
                onError={(e) => {
                  // If image fails to load, replace with placeholder
                  const target = e.target as HTMLImageElement
                  target.src = `/placeholder.svg?height=64&width=64&query=${encodeURIComponent(testimonial.name)}`
                }}
              />
            </div>
            <div className="flex-1">
              <Quote className="h-4 w-4 text-teal-400 mb-1 opacity-50" />
              <p className="text-gray-300 mb-3 text-sm italic break-words whitespace-normal">{testimonial.quote}</p>
              <div>
                <h4 className="font-medium text-white text-sm">{testimonial.name}</h4>
                <p className="text-xs text-teal-400">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (showAll) {
    return (
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <Card className="h-[350px] bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 hover:border-teal-500 transition-all duration-300">
                <CardContent className="p-6 h-full overflow-y-auto scrollbar-hide">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-teal-500/20 blur-sm"></div>
                      <img
                        src={getImageSrc(testimonial) || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="relative z-10 rounded-full w-16 h-16 object-cover border-2 border-teal-500/30"
                        onError={(e) => {
                          // If image fails to load, replace with placeholder
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=64&width=64&query=${encodeURIComponent(testimonial.name)}`
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <Quote className="h-6 w-6 text-teal-400 mb-2 opacity-50" />
                      <p className="text-gray-300 mb-4 italic text-sm">{testimonial.quote}</p>
                      <div>
                        <h4 className="font-medium text-white">{testimonial.name}</h4>
                        <p className="text-sm text-teal-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-teal-500 text-teal-400 hover:bg-teal-500/10"
            onClick={() => setShowAll(false)}
          >
            Show Less <ChevronUp className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="space-y-8">
        {/* Row 1 - Moving Right to Left */}
        <div className="overflow-hidden" onMouseEnter={() => setHoveredRow(0)} onMouseLeave={() => setHoveredRow(null)}>
          <motion.div animate={controls1} className="flex whitespace-nowrap">
            {extendedTestimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
          </motion.div>
        </div>

        {/* Row 2 - Moving Left to Right */}
        <div className="overflow-hidden" onMouseEnter={() => setHoveredRow(1)} onMouseLeave={() => setHoveredRow(null)}>
          <motion.div animate={controls2} className="flex whitespace-nowrap">
            {extendedTestimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
          </motion.div>
        </div>

        {/* Row 3 - Moving Right to Left (Faster) */}
        <div className="overflow-hidden" onMouseEnter={() => setHoveredRow(2)} onMouseLeave={() => setHoveredRow(null)}>
          <motion.div animate={controls3} className="flex whitespace-nowrap">
            {extendedTestimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
          </motion.div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button
          variant="outline"
          className="border-teal-500 text-teal-400 hover:bg-teal-500/10"
          onClick={() => setShowAll(true)}
        >
          See All Testimonials <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
