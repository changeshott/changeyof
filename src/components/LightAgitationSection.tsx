import { XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LightAgitationSection() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-[#111] relative">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 md:gap-8 mt-2 md:mt-0">

        {/* Social Proof (Trust Banner) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-3"
        >
          <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Trusted by indie hackers and modern developers shipping fast
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-10 opacity-40 grayscale">
            {/* Placeholders for logos */}
            <div className="h-5 md:h-6 flex items-center font-bold text-base md:text-lg tracking-tighter">Vercel</div>
            <div className="h-5 md:h-6 flex items-center font-bold text-base md:text-lg tracking-tight">Supabase</div>
            <div className="h-5 md:h-6 flex items-center font-bold text-base md:text-lg tracking-tight">Linear</div>
            <div className="h-5 md:h-6 flex items-center font-bold text-base md:text-lg tracking-tight">Stripe</div>
            <div className="h-5 md:h-6 flex items-center font-bold text-base md:text-lg tracking-tight">Raycast</div>
          </div>
        </motion.div>

        {/* Problem & Agitation */}
        <div className="flex flex-col items-center text-center gap-6 md:gap-8 mt-2 md:mt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="space-y-3 max-w-3xl px-2"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Stop Wasting Your Time <br className="hidden md:block" /> Designing Changelogs.
            </h2>
            <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Coding a custom "What's New" page, provisioning a database, and styling the UI from scratch drains your valuable development time.
            </p>
          </motion.div>

          {/* Pain Points (Horizontal Scroll on Mobile, Grid on Desktop) */}
          <div className="flex flex-row md:grid md:grid-cols-3 gap-4 md:gap-6 w-full overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory px-4 md:px-0">
            {/* Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="min-w-[85vw] md:min-w-0 snap-center bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-5 md:p-6 flex flex-col gap-3 text-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100 shrink-0">
                <XCircle className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-lg md:text-xl text-gray-900">Endless Re-deployments</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pushing code to your repository just to announce a minor bug fix.
              </p>
            </motion.div>

            {/* Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="min-w-[85vw] md:min-w-0 snap-center bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-5 md:p-6 flex flex-col gap-3 text-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100 shrink-0">
                <XCircle className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-lg md:text-xl text-gray-900">Lost in the Algorithm</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Social media announcements rarely reach your actual active users.
              </p>
            </motion.div>

            {/* Column 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="min-w-[85vw] md:min-w-0 snap-center bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-5 md:p-6 flex flex-col gap-3 text-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100 shrink-0">
                <XCircle className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-lg md:text-xl text-gray-900">Ignored Features</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Users simply don't notice the hard work you put into new updates.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
