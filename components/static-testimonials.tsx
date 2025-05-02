"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Real testimonials
const realTestimonials = [
  {
    name: "Karthik G Kumar",
    role: "MITCAS researcher",
    quote:
      "Karan's advice was quite helpful and I got selected for MITACS and got a research grant, this community has helped me with me what/how to do stuff.",
    image: "/placeholder.svg?height=64&width=64&text=KG",
    orangeFeatured: true,
  },
  {
    name: "Akhil Chhibber",
    role: "Senior AI Consultant - Lionsville, Netherlands",
    quote:
      "I have to say Karan is quite a bundle of knowledge. Being a professor, I didn't expect it, but I got to learn a lot from him. The way he approaches cold e-mailing is quite unique and definitely out of the box.",
    image: "/placeholder.svg?height=64&width=64&text=AC",
    orangeFeatured: false,
  },
  {
    name: "Shruti Priya",
    role: "Research Intern @DRDO",
    quote:
      "Jaskaran is an exceptional mentor. His clarity on advice is unmatched. He helped me secure my DRDO summer internship. Meeting him was an amazing experience, and I highly recommend him to all students feeling stuck.",
    image: "/placeholder.svg?height=64&width=64&text=SP",
    orangeFeatured: false,
  },
  {
    name: "Yashas Donthi",
    role: "Research Intern at CMU",
    quote:
      "Took his advice on Cold-Mailing and got it reviewed by him, this mail got me into CMU as a research intern, crazy!",
    image: "/person-forest-distance.png",
    orangeFeatured: true,
  },
  {
    name: "Nitin Dwivedi",
    role: "",
    quote:
      "Jaskaran is one of the very few people who is actually helping people land positions in universities abroad. I couldn't find advice like his anywhere.",
    image: "/person-distant-lake.png",
    orangeFeatured: false,
  },
  {
    name: "Swarna Baruah",
    role: "",
    quote:
      "I didn't think it would be this fast but after working with karan and using his advice, I already have 3 interviews lined up next week. Big shoutout to Jaskaran.",
    image: "/person-beach-sunset.png",
    orangeFeatured: true,
  },
  {
    name: "Parul Anand",
    role: "AI Policy @NLU",
    quote:
      "Jaskaran is not only a great mentor - he's also a great human being! It's clear how much he cares about solving your problem and providing you with the clarity you are seeking.",
    image: "/placeholder.svg?height=64&width=64&text=PA",
    orangeFeatured: false,
  },
  {
    name: "Pranav Shewale",
    role: "Intern at IIT-Mandi",
    quote: "I got into IIT",
    image: "/placeholder.svg?height=64&width=64&text=PS",
    orangeFeatured: true,
  },
  {
    name: "Kaustubh Patil",
    role: "REU @UIUC, USA",
    quote: "Got into UIUC",
    image: "/placeholder.svg?height=64&width=64&text=KP",
    orangeFeatured: true,
  },
  {
    name: "Jade Gourlay",
    role: "",
    quote:
      "The Community and guides was the best investment I've made, it has completely changed my applications and my knowledge.",
    image: "/person-cliff-distance.png",
    orangeFeatured: false,
  },
  {
    name: "Vansh Goyal",
    role: "Visiting student at Staford",
    quote:
      "I went from being rejected to getting so many replies with his suggestions, very impressive. I also got interviews from Stanford profs (which is cracked)",
    image: "/person-desert-distance.png",
    orangeFeatured: true,
  },
  {
    name: "Pragya Ramesh Nair",
    role: "",
    quote:
      "I got to learn so many things I didn't even know I needed. I don't think I can find such information and advice on google. Truly shows his experience.",
    image: "/person-waterfall-distance.png",
    orangeFeatured: false,
  },
  {
    name: "A K",
    role: "L2 SDE at Amazon, Blr",
    quote:
      "It's crazy how his guidance, resources, and reviews of my documents got me a FTO into Amazon, I owe it all to him :)",
    image: "/person-meadow-distance.png",
    orangeFeatured: true,
  },
  {
    name: "P Karthik Manikantan",
    role: "SWE Intern @Mercari Japan",
    quote:
      "He is extremely friendly and supportive , provided guidance on how to approach my research plan. Additionally, he helped me improve my research, enhancing my SOP, and even cold mailing.",
    image: "/placeholder.svg?height=64&width=64&text=PKM",
    orangeFeatured: false,
  },
  {
    name: "Shravan Venkatraman",
    role: "PhD MBZUAI, Abu Dhabi",
    quote:
      "Karan's the kind of person who makes the grind fun - insanely smart, moves at a crazy pace, and makes every grind session feel like a training montage. I worked with him and our work got into CVPR which is unreal.",
    image: "/placeholder.svg?height=64&width=64&text=SV",
    orangeFeatured: true,
  },
  {
    name: "Ashwin Kumar",
    role: "",
    quote:
      "Karan plans your entire pursuit, offering an entire structured approach and clears all doubts you have. He shares his own journey to offer recommendations and to gauge the feasibility of your dreams.",
    image: "/placeholder.svg?height=64&width=64&text=AK",
    orangeFeatured: false,
  },
  {
    name: "Sakshi Gor",
    role: "",
    quote:
      "His community exceeded all my expectations, providing insights into internships, networking, and so much more.",
    image: "/placeholder.svg?height=64&width=64&text=SG",
    orangeFeatured: false,
  },
]

// Organize testimonials into exactly 3 rows with 6 testimonials each
const organizeIntoThreeRowsWithSixEach = (testimonials: typeof realTestimonials) => {
  // Create 3 rows
  const rows: (typeof realTestimonials)[][] = [[], [], []]

  // Ensure we have at least 18 testimonials (3 rows of 6)
  const extendedTestimonials = [...testimonials]

  // If we don't have enough testimonials, duplicate some to reach 18
  while (extendedTestimonials.length < 18) {
    extendedTestimonials.push({
      ...testimonials[extendedTestimonials.length % testimonials.length],
      // Use a different image to avoid duplicates
      image: `/placeholder.svg?height=64&width=64&text=${extendedTestimonials.length}`,
    })
  }

  // Distribute 6 testimonials to each row
  for (let i = 0; i < extendedTestimonials.length; i++) {
    const rowIndex = Math.floor(i / 6)
    if (rowIndex < 3) {
      // Ensure we only fill 3 rows
      rows[rowIndex].push(extendedTestimonials[i])
    }
  }

  return rows
}

// Use the organizeIntoThreeRowsWithSixEach function directly
const testimonialRows = organizeIntoThreeRowsWithSixEach(realTestimonials)

export default function StaticTestimonials() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const rowContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const rowContentRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationRef = useRef<number | null>(null)
  const [rowWidths, setRowWidths] = useState<number[]>([])
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

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
          className="relative py-6" // Increased vertical spacing between rows
          ref={(el) => (rowContainerRefs.current[rowIndex] = el)}
          onMouseEnter={() => setHoveredRow(rowIndex)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <div ref={(el) => (rowContentRefs.current[rowIndex] = el)} className="flex">
            {/* Repeat items 3 times to ensure seamless looping */}
            {[...row, ...row, ...row].map((testimonial, itemIndex) => (
              <div
                key={`${rowIndex}-${itemIndex}`}
                className="inline-block px-2" // Increased horizontal spacing between cards
                onMouseEnter={() => setHoveredItem(itemIndex)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative">
                  <Card
                    className={`
                      w-[270px] h-[180px]
                      transition-all duration-300 ease-in-out
                      ${
                        testimonial.orangeFeatured
                          ? "bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-orange-700 shadow-md shadow-orange-900/20"
                          : "bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-teal-700 shadow-md shadow-teal-900/20"
                      }
                      ${
                        hoveredRow === rowIndex && hoveredItem === itemIndex
                          ? `border-${testimonial.orangeFeatured ? "orange" : "teal"}-500 shadow-lg shadow-${testimonial.orangeFeatured ? "orange" : "teal"}-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[1.5] z-50 ring-1 ring-${testimonial.orangeFeatured ? "orange" : "teal"}-400`
                          : ""
                      }
                      ${hoveredRow !== null && hoveredRow !== rowIndex ? "opacity-30" : "opacity-100"}
                    `}
                    style={{
                      width: hoveredRow === rowIndex && hoveredItem === itemIndex ? "270px" : "270px",
                      height: hoveredRow === rowIndex && hoveredItem === itemIndex ? "180px" : "180px",
                    }}
                  >
                    <CardContent className="p-3 h-full overflow-hidden">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="relative">
                            <div
                              className={`absolute inset-0 rounded-full ${
                                testimonial.orangeFeatured ? "bg-orange-500/30" : "bg-teal-500/30"
                              } blur-sm opacity-50`}
                            ></div>
                            <img
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className={`relative z-10 rounded-full w-6 h-6 object-cover ${
                                testimonial.orangeFeatured ? "border border-orange-400/50" : "border border-teal-400/50"
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
                              className={`font-medium text-white truncate text-xs ${
                                testimonial.orangeFeatured ? "text-orange-50" : "text-teal-50"
                              }`}
                            >
                              {testimonial.name}
                            </h4>
                            {testimonial.role && (
                              <p
                                className={`${
                                  testimonial.orangeFeatured ? "text-orange-300" : "text-teal-300"
                                } truncate text-[10px]`}
                              >
                                {testimonial.role}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 italic text-[11px] line-clamp-5 break-words whitespace-normal">
                          {testimonial.quote}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Invisible placeholder to maintain layout when card is absolutely positioned */}
                  {hoveredRow === rowIndex && hoveredItem === itemIndex && (
                    <div className="w-[270px] h-[180px] invisible"></div>
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
