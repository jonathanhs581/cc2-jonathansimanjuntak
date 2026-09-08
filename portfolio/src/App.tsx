import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ActiveSectionContext } from './context/ActiveSectionContext'
import { useScrollSpy } from './hooks/useScrollSpy'
import { SECTION_IDS } from './data/navigation'

// Navbar + Hero + section di <main> + Footer.
// Section aktif (scrollspy) dibagikan ke Navbar lewat Context.
function App() {
  const activeSection = useScrollSpy(SECTION_IDS)

  return (
    <ActiveSectionContext.Provider value={activeSection}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </ActiveSectionContext.Provider>
  )
}

export default App
