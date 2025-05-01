export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-black to-gray-900 z-10">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Meet <span className="text-teal-400">(Jas)Karan</span>
          </h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 blur-lg opacity-70"></div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picture1-bUjxZTKfivqadOtMUwKu6xLYZXSxUT.png"
                alt="Karan Walia"
                className="relative z-10 rounded-full w-64 h-64 object-cover border-4 border-teal-500/30"
              />
            </div>
          </div>

          <div className="md:w-2/3">
            <p className="text-xl mb-6 text-white">
              Hey there :) You may have seen before but if not..... My name is Karan and I'm a 21-year-old from a tier-3
              university in India who broke into <span className="font-bold text-teal-400">big tech</span>, landing
              roles at <span className="font-bold text-teal-400">Microsoft</span> and Google, and at the same time also
              got into <span className="font-bold text-teal-400">MIT</span>, NUS,{" "}
              <span className="font-bold text-teal-400">CMU</span> and Cambridge.
            </p>

            <p className="text-lg mb-6 text-white">
              In college, I spent months wondering whether to focus on research, internships, or side projects, even
              applying to over 100 companies and never landing a single interview.
            </p>

            <p className="text-lg mb-6 text-white">
              After landing offers from Microsoft, Google, and top institutions like MIT, CMU, NUS and Cambridge, I
              started sharing what really helped me (unlike these online "gurus" who sell without achieving), no fluff,
              just honest advice of what works and what doesn't ;)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
