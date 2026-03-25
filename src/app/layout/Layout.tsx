import { Outlet, NavLink } from 'react-router-dom'
import './Layout.scss'


export const Layout = () => {
  return (
    <>
      <nav className="layout-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/groups">Groups</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  )
}