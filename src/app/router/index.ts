import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../../pages/home/HomePage'
import UsersPage from '../../pages/users/UsersPage'
import GroupsPage from '../../pages/groups/GroupsPage'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/groups" element={<GroupsPage />} />
      </Routes>
    </BrowserRouter>
  )
}