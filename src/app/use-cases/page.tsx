import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const useCases = [
  {
    title: "Core Product Communication",
    description: "Changelog, announcements, feature requests, and feedback - the foundation of product communication.",
    items: [
      {
        title: "Changelog Software",
        desc: "Keep a changelog users actually check. Standalone page, custom domain, widgets, and email digest.",
        icon: "📋"
      },
      {
        title: "Product Announcements",
        desc: "Make every update impossible to miss. Includes release notes. Boosters, in-app notifications, segmentation.",
        icon: "📢"
      },
      {
        title: "Release Notes",
        desc: "Ship release notes developers respect - API, webhooks, labels, scheduling.",
        icon: "📝"
      },
      {
        title: "Changelog Automation (MCP)",
        desc: "Connect Claude, ChatGPT, or Cursor over MCP. Your AI drafts, targets, and publishes updates for you.",
        icon: "🤖"
      },
      {
        title: "Feature Request Tracking",
        desc: "Turn user feedback into your roadmap. Voting, Jira sync, approval workflow, and public roadmap stages.",
        icon: "🎯"
      },
      {
        title: "Customer Feedback",
        desc: "Hear from users where they already are. Reactions, comments, NPS surveys, and segmented targeting.",
        icon: "💬"
      },
      {
        title: "NPS Software",
        desc: "Measure customer satisfaction with in-app NPS surveys. Segmentation, follow-up questions, and multi-language support.",
        icon: "📊"
      }
    ]
  },
  {
    title: "Communication Scenarios",
    description: "Company news, community updates, internal comms, and status communication.",
    items: [
      {
        title: "Company Updates",
        desc: "Leadership, ops, and founders. Company news, policy changes, quarterly updates - one place for everyone.",
        icon: "🏢"
      },
      {
        title: "Community Updates",
        desc: "Communities, dev tools, open-source. Events, betas, community releases - keep your community in the loop.",
        icon: "🌍"
      },
      {
        title: "Internal Communication",
        desc: "Use Changeyof as a company updates hub. Private feeds, team news, security alerts, and campaign announcements.",
        icon: "🔒"
      },
      {
        title: "Incident & Status Updates",
        desc: "Maintenance windows, downtime notices, and status alerts. Reach users in-app and via email when it matters.",
        icon: "⚠️"
      }
    ]
  },
  {
    title: "Growth & Adoption",
    description: "Targeted communication, user education, and mobile - so the right users see the right updates.",
    items: [
      {
        title: "Feature Adoption & User Education",
        desc: "PLG adoption, onboarding nudges, \"Did you know?\" and re-engagement. In-app messages that drive usage.",
        icon: "🚀"
      },
      {
        title: "Targeted User Communication",
        desc: "Segmentation, targeting, user-level analytics, engagement tracking, and channel performance.",
        icon: "🎯"
      },
      {
        title: "Mobile App Announcements",
        desc: "Announce updates inside iOS, React Native, and Flutter apps with native SDKs.",
        icon: "📱"
      },
      {
        title: "Multi-Channel Updates",
        desc: "In-app notifications, email newsletters and digests, Slack, RSS. One message, every channel.",
        icon: "🔄"
      }
    ]
  }
];

const teamRoles = [
  {
    title: "For Product Teams",
    desc: "Ship changelogs, collect feature requests, and measure engagement - all from one dashboard."
  },
  {
    title: "For Customer Success",
    desc: "Share updates proactively, collect NPS scores, and show customers you're building what they need."
  },
  {
    title: "For Enterprise",
    desc: "SOC 2 certified, SAML SSO, RBAC, audit logs - and flat pricing that doesn't punish growth."
  }
];

export default function UseCasesPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-200">
      <Navbar theme="light" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-500 mb-8">
          Use Cases
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          One platform, many ways<br />to use it
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether you're shipping changelogs, collecting feature requests, or measuring satisfaction - Changeyof adapts to your workflow.
        </p>
      </section>

      {/* Use Cases Sections */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-32">
          {useCases.map((section, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 text-center">
                {section.title}
              </h2>
              <p className="text-slate-500 text-lg mb-12 text-center max-w-2xl">
                {section.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {section.items.map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* For Teams Section */}
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 text-center">
            Changeyof for your team
          </h2>
          <p className="text-slate-500 text-lg mb-12 text-center max-w-2xl">
            Whether you're in product, customer success, or enterprise - Changeyof adapts to your role.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {teamRoles.map((role, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{role.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section (Dark context) */}
      <div className="bg-[#050505] text-white py-32 border-t border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Start shipping updates your users will see
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            15-day free trial. All features included. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input 
              type="email" 
              placeholder="Your work email" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
              Start free <MoveRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Using Dark Footer here because the CTA above it is dark */}
      <Footer theme="dark" />
    </main>
  );
}
