"use client"

import { useState, useRef, useEffect } from "react"
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

// Base testimonials
const baseTestimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    quote:
      "Karan's personal branding strategies helped me stand out in a sea of applicants. I landed my dream job at Google within 3 months of following his system. The LinkedIn optimization guide was particularly helpful in getting noticed by recruiters. I went from zero callbacks to multiple interviews per week.",
    image: "/confident-professional.png",
    featured: true,
    orangeFeatured: false,
  },
  {
    name: "Rahul Patel",
    role: "MBA Student at Harvard",
    quote:
      "I was rejected from my top choice schools twice before. After working with Karan, I got accepted to 3 Ivy League programs including Harvard. His approach to crafting personal statements and preparing for interviews completely transformed how I presented myself to admissions committees.",
    image: "/cheerful-indian-man.png",
    featured: true,
    orangeFeatured: true,
  },
  {
    name: "Sarah Johnson",
    role: "Product Manager at Meta",
    quote:
      "The cold outreach templates and strategies were game-changers. I connected with senior leaders I never thought would respond to me. Within weeks, I had coffee chats with directors and VPs at top tech companies. Karan's system for following up was particularly effective in building meaningful relationships.",
    image: "/confident-blonde-professional.png",
    featured: false,
    orangeFeatured: true,
  },
  {
    name: "Alex Chen",
    role: "CS Student at MIT",
    quote:
      "Coming from a no-name school, I didn't think MIT was possible. Karan's guidance on showcasing my projects got me noticed and accepted. His advice on how to structure my portfolio and highlight my technical achievements made all the difference. I'm now collaborating with professors on research I'm passionate about.",
    image: "/thoughtful-student.png",
    featured: true,
    orangeFeatured: false,
  },
  {
    name: "Maya Rodriguez",
    role: "UX Designer at Apple",
    quote:
      "The community support was incredible. Having peers to review my portfolio and application materials made all the difference. Karan's feedback on my design case studies helped me articulate my process in a way that resonated with hiring managers. The mock interviews with community members prepared me for tough questions.",
    image: "/joyful-latina.png",
    featured: false,
    orangeFeatured: true,
  },
  {
    name: "David Kim",
    role: "Research Assistant at Cambridge",
    quote:
      "Karan's advice on how to approach professors led to multiple research opportunities and eventually my position at Cambridge. His email templates for academic outreach helped me communicate my research interests clearly and professionally. I'm now working on projects I only dreamed about before.",
    image: "/confident-korean-businessman.png",
    featured: true,
    orangeFeatured: false,
  },
  {
    name: "Aisha Patel",
    role: "Investment Banking Analyst",
    quote:
      "The personal branding roadmap helped me position myself perfectly for finance roles despite having no connections in the industry. Karan's networking strategies opened doors at top firms, and his interview preparation techniques gave me the confidence to excel. I received offers from three bulge bracket banks.",
    image: "/confident-indian-architect.png",
    featured: false,
    orangeFeatured: true,
  },
  {
    name: "James Wilson",
    role: "PhD Candidate at Stanford",
    quote:
      "Following Karan's system, I was able to secure full funding for my PhD program at Stanford after being rejected the previous year. His guidance on how to communicate with potential advisors and structure my research proposal made my application much stronger. The difference in responses was night and day.",
    image: "/confident-bearded-professional.png",
    featured: false,
    orangeFeatured: true,
  },
  {
    name: "Sophia Garcia",
    role: "Marketing Manager at Nike",
    quote:
      "The LinkedIn optimization guide alone transformed my profile. I started getting inbound opportunities within weeks. Karan's content strategy for personal branding helped me establish myself as a thought leader in my niche. His templates for reaching out to hiring managers led directly to my role at Nike.",
    image: "/confident-hispanic-professional.png",
    featured: false,
    orangeFeatured: false,
  },
  {
    name: "Omar Hassan",
    role: "Software Engineering Intern at Microsoft",
    quote:
      "As an international student, I struggled to get noticed. Karan's strategies helped me land multiple FAANG interviews and ultimately my Microsoft internship. His resume review pointed out weaknesses I never would have noticed, and his system for preparing for technical interviews was incredibly effective.",
    image: "/confident-engineer.png",
    featured: false,
    orangeFeatured: true,
  },
]

// Generate more testimonials by modifying the base ones
const generateMoreTestimonials = () => {
  const allTestimonials = [...baseTestimonials]

  // Generate additional testimonials to reach 40+
  const companies = [
    "Amazon",
    "Netflix",
    "Spotify",
    "Airbnb",
    "Uber",
    "Twitter",
    "Dropbox",
    "Adobe",
    "IBM",
    "Intel",
    "Oracle",
    "Salesforce",
    "Tesla",
    "SpaceX",
    "Stripe",
  ]
  const universities = [
    "Stanford",
    "Yale",
    "Princeton",
    "Columbia",
    "Cornell",
    "Berkeley",
    "UCLA",
    "Oxford",
    "Cambridge",
    "ETH Zurich",
    "Imperial College",
    "Caltech",
    "UPenn",
    "Duke",
    "Northwestern",
  ]
  const roles = [
    "Software Developer",
    "Data Scientist",
    "Product Designer",
    "Marketing Specialist",
    "Financial Analyst",
    "Research Assistant",
    "Project Manager",
    "UX Researcher",
    "Business Analyst",
    "ML Engineer",
  ]

  for (let i = 0; i < 30; i++) {
    const baseIndex = i % baseTestimonials.length
    const baseTestimonial = baseTestimonials[baseIndex]

    // Create a variation
    const company = companies[i % companies.length]
    const university = universities[i % universities.length]
    const role = roles[i % roles.length]

    const newName = `${baseTestimonial.name.split(" ")[0]} ${String.fromCharCode(65 + (i % 26))}.`
    const newRole = i % 2 === 0 ? `${role} at ${company}` : `${role} at ${university}`

    allTestimonials.push({
      name: newName,
      role: newRole,
      quote: baseTestimonial.quote,
      image: baseTestimonial.image,
      featured: false,
      orangeFeatured: false,
    })
  }

  return allTestimonials
}

const allTestimonials = generateMoreTestimonials()

// Organize testimonials into rows
const organizeIntoRows = (testimonials: typeof baseTestimonials, rowCount = 4) => {
  const rows: (typeof baseTestimonials)[][] = Array.from({ length: rowCount }, () => [])
  const itemsPerRow = Math.ceil(testimonials.length / rowCount)

  testimonials.forEach((testimonial, index) => {
    const rowIndex = Math.floor(index / itemsPerRow)
    if (rowIndex < rowCount) {
      rows[rowIndex].push(testimonial)
    }
  })

  return rows
}

const testimonialRows = organizeIntoRows(allTestimonials, 4) // Changed from 5 to 4 rows

export default function StaticTestimonials() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const rowContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const rowContentRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationRef = useRef<number | null>(null)
  const [rowWidths, setRowWidths] = useState<number[]>([])
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Function to get the appropriate image source
  const getImageSrc = (testimonial: (typeof baseTestimonials)[0]) => {
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

  // Measure widths on mount and resize
  useEffect(() => {
    const measureWidths = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }

      const newRowWidths = rowContentRefs.current.map((row) => row?.scrollWidth || 0)
      setRowWidths(newRowWidths)
    }

    measureWidths()
    window.addEventListener("resize", measureWidths)

    return () => {
      window.removeEventListener("resize", measureWidths)
    }
  }, [])

  // Set up CSS animations for each row
  useEffect(() => {
    if (rowWidths.length === 0 || containerWidth === 0) return

    rowContentRefs.current.forEach((row, index) => {
      if (!row) return

      const isHovered = hoveredRow === index
      const direction = index % 2 === 0 ? 1 : -1 // Even rows go right, odd rows go left
      const itemWidth = rowWidths[index] / 3 // Divide by 3 because we have 3 copies

      // Calculate animation duration - slower when hovered
      const speed = isHovered ? 0.2 : 1
      const baseDuration = 30 // seconds
      const duration = baseDuration / speed

      // Set the animation
      row.style.transition = "none" // Reset transition
      row.style.transform = "translateX(0)" // Reset position

      // Force reflow
      void row.offsetWidth

      // Apply animation
      row.style.transition = `transform ${duration}s linear infinite infinite`

      if (direction > 0) {
        // Moving right - start at left edge, move right by itemWidth
        row.style.transform = "translateX(0)"
        row.style.animation = `moveRight${index} ${duration}s linear infinite`

        // Create keyframes for moving right
        const styleSheet = document.styleSheets[0]
        const keyframes = `
          @keyframes moveRight${index} {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${itemWidth}px); }
          }
        `

        // Remove existing rule if it exists
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
          if (styleSheet.cssRules[i].cssText.includes(`moveRight${index}`)) {
            styleSheet.deleteRule(i)
            break
          }
        }

        // Add new rule
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
      } else {
        // Moving left - start at right edge, move left by itemWidth
        row.style.transform = "translateX(0)"
        row.style.animation = `moveLeft${index} ${duration}s linear infinite`

        // Create keyframes for moving left
        const styleSheet = document.styleSheets[0]
        const keyframes = `
          @keyframes moveLeft${index} {
            0% { transform: translateX(-${itemWidth}px); }
            100% { transform: translateX(0); }
          }
        `

        // Remove existing rule if it exists
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
          if (styleSheet.cssRules[i].cssText.includes(`moveLeft${index}`)) {
            styleSheet.deleteRule(i)
            break
          }
        }

        // Add new rule
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
      }
    })
  }, [rowWidths, containerWidth, hoveredRow])

  return (
    <div className="relative" ref={containerRef}>
      {testimonialRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="relative py-4"
          ref={(el) => (rowContainerRefs.current[rowIndex] = el)}
          onMouseEnter={() => setHoveredRow(rowIndex)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <div ref={(el) => (rowContentRefs.current[rowIndex] = el)} className="flex whitespace-nowrap">
            {/* Repeat items 3 times to ensure seamless looping */}
            {[...row, ...row, ...row].map((testimonial, itemIndex) => (
              <div
                key={`${rowIndex}-${itemIndex}`}
                className="inline-block px-1"
                onMouseEnter={() => setHoveredItem(itemIndex)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative">
                  <Card
                    className={`
                      w-[180px] h-[120px]
                      transition-all duration-300 ease-in-out
                      ${
                        testimonial.orangeFeatured
                          ? "bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-orange-700 shadow-md shadow-orange-900/20"
                          : testimonial.featured
                            ? "bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-teal-700 shadow-md shadow-teal-900/20"
                            : "bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700/50"
                      }
                      ${
                        hoveredRow === rowIndex && hoveredItem === itemIndex
                          ? `border-${testimonial.orangeFeatured ? "orange" : testimonial.featured ? "teal" : "gray"}-500 shadow-lg shadow-${testimonial.orangeFeatured ? "orange" : testimonial.featured ? "teal" : "gray"}-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150 z-50 ${testimonial.orangeFeatured || testimonial.featured ? `ring-1 ring-${testimonial.orangeFeatured ? "orange" : "teal"}-400` : ""}`
                          : ""
                      }
                      ${hoveredRow !== null && hoveredRow !== rowIndex ? "opacity-30" : "opacity-100"}
                    `}
                    style={{
                      width: hoveredRow === rowIndex && hoveredItem === itemIndex ? "180px" : "180px",
                      height: hoveredRow === rowIndex && hoveredItem === itemIndex ? "120px" : "120px",
                    }}
                  >
                    <CardContent className="p-2 h-full overflow-hidden">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="relative">
                            <div
                              className={`absolute inset-0 rounded-full ${
                                testimonial.orangeFeatured
                                  ? "bg-orange-500/30"
                                  : testimonial.featured
                                    ? "bg-teal-500/30"
                                    : "bg-teal-500/20"
                              } blur-sm opacity-50`}
                            ></div>
                            <img
                              src={getImageSrc(testimonial) || "/placeholder.svg"}
                              alt={testimonial.name}
                              className={`relative z-10 rounded-full w-4 h-4 object-cover ${
                                testimonial.orangeFeatured
                                  ? "border border-orange-400/50"
                                  : testimonial.featured
                                    ? "border border-teal-400/50"
                                    : "border border-teal-500/30"
                              }`}
                              onError={(e) => {
                                // If image fails to load, replace with placeholder
                                const target = e.target as HTMLImageElement
                                target.src = `/placeholder.svg?height=64&width=64&query=${encodeURIComponent(
                                  testimonial.name,
                                )}`
                              }}
                            />
                          </div>
                          <div className="overflow-hidden">
                            <h4
                              className={`font-medium text-white truncate text-[9px] ${
                                testimonial.orangeFeatured
                                  ? "text-orange-50"
                                  : testimonial.featured
                                    ? "text-teal-50"
                                    : ""
                              }`}
                            >
                              {testimonial.name}
                            </h4>
                            <p
                              className={`${
                                testimonial.orangeFeatured
                                  ? "text-orange-300"
                                  : testimonial.featured
                                    ? "text-teal-300"
                                    : "text-teal-400"
                              } truncate text-[7px]`}
                            >
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-300 italic text-[7px] line-clamp-4">{testimonial.quote}</p>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Invisible placeholder to maintain layout when card is absolutely positioned */}
                  {hoveredRow === rowIndex && hoveredItem === itemIndex && (
                    <div className="w-[180px] h-[120px] invisible"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
