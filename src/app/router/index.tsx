import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../../pages/home/HomePage'
import UsersPage from '../../pages/users/UsersPage'
import GroupsPage from '../../pages/groups/GroupsPage'
import { Layout } from '../layout/Layout'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/groups" element={<GroupsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}