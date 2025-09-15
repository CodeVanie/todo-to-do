import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AboutContent, ProjectsContent, HomeContent, ModifyContent, NotifContent, NotFoundPage } from './pages/pages.js'
import './index.css'
import TodoApp from './TodoApp.jsx'
import ViewTodoModal from './shared/components/Modal/ViewTodoModal.jsx'
import TodoFormModal from './shared/components/Modal/TodoFormModal.jsx'
import CategoryFormModal from './shared/components/Modal/CategoryFormModal.jsx'
import AlertModal from './shared/components/Modal/AlertModal.jsx'
import SortFormModal from './shared/components/Modal/SortFormModal.jsx'
import ConfirmModal from './shared/components/Modal/ConfirmModal.jsx'

const router = createBrowserRouter([
  	{
		path: '/',
		Component: TodoApp,
		errorElement: <NotFoundPage />,
		children: [
			{index: true, element: <Navigate to="/home" replace />},
			{path: 'aboutapp', Component: AboutContent},
			{path: 'projects', Component: ProjectsContent},
			{path: 'home', Component: HomeContent,
				children: [
					{path: "view/:todoid", Component: ViewTodoModal},
					{path: "list/:action/:todoid?", Component: TodoFormModal}
				]
			},
			{path: 'modify', Component: ModifyContent,
				children: [
					{path: "view/:todoid", Component: ViewTodoModal},
					{path: ":action/todo/:todoid?", Component: TodoFormModal},
					{path: ":action/category/:categid?", Component: CategoryFormModal},
					{path: "edit/sort/:sortid?", Component: SortFormModal},
					{path: ":action/confirm", Component: ConfirmModal},
					{path: "alert/:alertid", Component: AlertModal}
				]
			},
			{path: 'notif', Component: NotifContent, 
				children: [
					{path: "view/:todoid", Component: ViewTodoModal}
				]
			},
		]
  	}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
