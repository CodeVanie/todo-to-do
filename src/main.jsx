import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AboutContent, ProjectsContent, HomeContent, ModifyContent, ProfileContent, NotFoundPage } from './pages/pages.js'
import './index.css'
import TodoApp from './TodoApp.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: TodoApp,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <Navigate to="/home" replace />},
      {path: 'home', Component: HomeContent},
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
