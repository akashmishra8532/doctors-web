import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react'

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const linkHoverVariants = {
    initial: { x: 0 },
    hover: { x: 5 },
  }

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Privacy Policy', href: '#' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Find Doctors', href: '/doctors' },
        { name: 'Book Appointment', href: '/doctors' },
        { name: 'Health Dashboard', href: '#' },
        { name: 'AI Chat', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Disclaimer', href: '#' },
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-white via-blue-50 to-indigo-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <img className="mb-4 w-32 h-auto" src={assets.logo} alt="Prescripto" />
            <p className="text-gray-700 leading-relaxed text-sm mb-6 max-w-sm">
              Your trusted platform for finding qualified doctors and booking appointments online. Providing healthcare solutions at your fingertips with cutting-edge AI technology.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-full bg-indigo-100 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white transition-all duration-300"
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, i) => (
            <motion.div key={i} variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <motion.li key={j} variants={linkHoverVariants} initial="initial" whileHover="hover">
                    <a
                      href={link.href}
                      className="text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-4">
              <a
                href="tel:+919985895545"
                className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-indigo-100 rounded-lg"
                >
                  <Phone className="w-5 h-5 text-indigo-600" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">+91 9985895545</p>
                </div>
              </a>
              <a
                href="mailto:akashmishra@gmail.com"
                className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-indigo-100 rounded-lg"
                >
                  <Mail className="w-5 h-5 text-indigo-600" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">info@prescripto.com</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-gray-700">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-indigo-100 rounded-lg"
                >
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900">India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12 border border-indigo-100 backdrop-blur-xl"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-gray-600 mb-4">Get the latest health tips and appointment updates delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8" />

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <p className="text-gray-600 text-sm">
            © 2024 Prescripto. All rights reserved. Made with ❤️ for better healthcare.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Cookie Settings
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

