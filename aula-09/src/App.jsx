import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import AboutPage from './pages/AboutPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NewPostPage from './pages/NewPostPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import PostPage from './pages/PostPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="publicacoes/:postId" element={<PostPage />} />
          <Route path="nova-publicacao" element={<NewPostPage />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
