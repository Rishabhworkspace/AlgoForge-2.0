import { motion } from 'framer-motion';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

// Footer component - onNavigate prop reserved for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ViewType = 'home' | 'dashboard' | 'topic' | 'problems' | 'notes' | 'leaderboard';

interface FooterProps {
  onNavigate: (_view: ViewType) => void;
}

const footerLinks = {
  product: [
    { label: 'Roadmaps', href: '#roadmaps' },
    { label: 'Problems', href: '#problems' },
    { label: 'Leaderboard', href: '#leaderboard' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ]
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/Rishabhworkspace/AlgoForge-2.0', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rishabh-tripathi-728a77317', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/RishabhTri8805', label: 'Twitter' },
];

export function Footer({ onNavigate }: FooterProps) {
  // Use onNavigate for footer navigation links
  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
  };

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Logo className="w-6 h-6" />
                </div>
                <span className="font-display text-2xl text-white">AlgoForge</span>
              </div>
              <p className="text-white/60 text-sm mb-6 max-w-xs">
                Master coding, one step at a time. Structured learning paths for DSA,
                interview prep, and beyond.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors group"
                  >
                    <social.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.label === 'Roadmaps') {
                        e.preventDefault();
                        handleNavClick('topic');
                      } else if (link.label === 'Problems') {
                        e.preventDefault();
                        handleNavClick('problems');
                      } else if (link.label === 'Leaderboard') {
                        e.preventDefault();
                        handleNavClick('leaderboard');
                      }
                    }}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>



          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="w-4 h-4" />
                rishabh.j.tripathi2903@gmail.com
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5" />
                Chennai, Tamil Nadu
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-white mb-1">Stay Updated</h4>
              <p className="text-sm text-white/60">Get the latest problems and tips delivered to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#a088ff]"
              />
              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#a088ff] to-[#63e3ff] text-[#141414] font-medium hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} AlgoForge. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
