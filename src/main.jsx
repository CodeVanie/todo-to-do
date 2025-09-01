import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import HomeContent from './pages/HomeContent.jsx'
import AboutContent from './pages/AboutContent.jsx'
import ProjectsContent from './pages/ProjectsContent.jsx'
import ModifyContent from './pages/ModifyContent.jsx'
import ProfileContent from './pages/ProfileContent.jsx'

const router = createBrowserRouter([
  {
    path: '/home?',
    Component: App,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, Component: HomeContent},
      {path: 'aboutme', Component: AboutContent},
      {path: 'projects', Component: ProjectsContent},
      {path: 'modify', Component: ModifyContent},
      {path: 'profile', Component: ProfileContent},
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
)
