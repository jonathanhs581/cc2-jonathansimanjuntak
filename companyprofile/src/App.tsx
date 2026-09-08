import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import { useAuth } from './lib/auth'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Teams = lazy(() => import('./pages/Teams'))
const Blog = lazy(() => import('./pages/Blog'))
const PostDetail = lazy(() => import('./pages/PostDetail'))
const CreatePost = lazy(() => import('./pages/CreatePost'))
const Login = lazy(() => import('./pages/Login'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-mist">
      <p className="text-sm text-body">Loading…</p>
    </div>
  )
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    )
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return <Layout>{children}</Layout>
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/teams" element={<Layout><Teams /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:id" element={<Layout><PostDetail /></Layout>} />
          <Route path="/create-post" element={<RequireAuth><CreatePost /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
