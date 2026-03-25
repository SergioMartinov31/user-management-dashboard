import { Link } from 'react-router-dom'
import './HomePage.scss'

const HomePage = () => {
  return (
    <section className="home-page">
      <h1 className="home-page__title">User Management System</h1>
      <p className="home-page__description">
        Manage users and groups in one place. Open a section below to view, search, and update data.
      </p>

      <div className="home-page__grid">
        <Link className="home-page__card" to="/users">
          <h2 className="home-page__card-title">Users</h2>
          <p className="home-page__card-text">Open the users table with search, sorting, and user actions.</p>
        </Link>

        <Link className="home-page__card" to="/groups">
          <h2 className="home-page__card-title">Groups</h2>
          <p className="home-page__card-text">View groups, member counts, and user names by group.</p>
        </Link>
      </div>

      <p className="home-page__hint">Choose a card to continue.</p>
      
    </section>
  )
}

export default HomePage
