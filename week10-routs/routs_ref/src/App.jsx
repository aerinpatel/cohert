import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import "./App.css";

// Layout Component with Dark Mode Toggle
function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">YourName</div>
            <ul className="flex space-x-6">
              {['/', '/about', '/projects', '/contact'].map((path, idx) => {
                const name = ['Home','About','Projects','Contact'][idx];
                return (
                  <li key={name}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-full font-medium transition-colors ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-indigo-100 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      {name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>

        <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-6">
          <div className="container mx-auto text-center">
            &copy; {new Date().getFullYear()} YourName. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

// Page Components with Enhanced Styles
function Home() {
  return (
    <section className="text-center py-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl text-white shadow-xl">
      <h1 className="text-6xl font-extrabold mb-4 tracking-wide drop-shadow-lg">Hi, I'm YourName</h1>
      <p className="max-w-2xl mx-auto text-xl mb-10 opacity-90">I design and develop user-centric web applications with beautiful interfaces.</p>
      <NavLink
        to="/projects"
        className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
      >
        Explore Projects
      </NavLink>
    </section>
  );
}

function About() {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-center py-20">
      <motion.img
        src="/profile.jpg"
        alt="Profile"
        className="w-72 h-72 rounded-full mx-auto shadow-2xl border-4 border-indigo-500"
        initial={{ scale: 0.7, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6 }}
      />
      <div>
        <h2 className="text-4xl font-bold mb-6 border-b-4 border-indigo-500 inline-block">About Me</h2>
        <p className="text-lg leading-relaxed mb-4">I'm a frontend developer with a knack for crafting engaging user experiences. With expertise in React, Tailwind CSS, and Framer Motion, I bring designs to life with smooth animations and robust code.</p>
        <p className="text-lg leading-relaxed">Beyond coding, I explore design systems, participate in hackathons, and contribute to open-source. Let's build something amazing together!</p>
      </div>
    </section>
  );
}

const projectList = [
  { id: 1, title: "Project One", img: "/project1.png", desc: "A real-time chat application with seamless animations." },
  { id: 2, title: "Project Two", img: "/project2.png", desc: "An e-commerce site with dynamic filtering and smooth checkout." },
  { id: 3, title: "Project Three", img: "/project3.png", desc: "A responsive dashboard with complex data visualizations." }
];

function Projects() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projectList.map(({ id, title, img, desc }) => (
          <motion.div
            key={id}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-transform transform hover:-translate-y-2"
            whileHover={{ scale: 1.03 }}
          >
            <img src={img} alt={title} className="w-full h-56 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">{title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-5">{desc}</p>
              <a
                href="#"
                className="inline-block text-white bg-indigo-600 dark:bg-indigo-500 px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
              >
                Details
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-10">Get In Touch</h2>
      <form className="max-w-lg mx-auto space-y-6 backdrop-blur bg-white/50 dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg">
        {['Name','Email','Message'].map((field) => (
          field !== 'Message' ? (
            <input
              key={field}
              type={field.toLowerCase()}
              placeholder={field}
              className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent text-gray-900 dark:text-gray-100"
            />
          ) : (
            <textarea
              key={field}
              rows={5}
              placeholder={field}
              className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent text-gray-900 dark:text-gray-100"
            />
          )
        ))}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 rounded-3xl shadow-lg hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}

// Main App with Router
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
