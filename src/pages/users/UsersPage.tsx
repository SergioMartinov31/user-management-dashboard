import { useEffect, useState, useMemo } from 'react'
import { userApi } from '../../entities/user/api/userApi'
import type { User } from '../../entities/user/model/types'
import { groupApi } from '../../entities/group/api/groupApi'
import type { Group } from '../../entities/group/model/types'
import { UsersTable } from '../../entities/user/ui/UsersTable'
import './UsersPage.scss'

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  

  const [sortField, setSortField] = useState<'name' | 'email' | 'groupId' | null>(null)
  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [groupId, setGroupId] = useState<number | null>(null)
  const isFormValid = name.trim() !== '' && email.trim() !== ''


  const handleSort = (field: 'name' | 'email' | 'groupId') => {

    if (sortField === field) {
      setSortOrder(prev => (prev === 'ascending' ? 'descending' : 'ascending'))
    } else {
      setSortField(field)
      setSortOrder('ascending')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete user?')) return

    await userApi.deleteUser(id)

    setUsers(prev => prev.filter(user => user.id !== id))
  }

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) return users

    return users.filter(user => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      )
    })
  }, [users, search])

  const sortedUsers = useMemo(() => {
    if (!sortField) return filteredUsers

    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (aValue === null) return 1
      if (bValue === null) return -1 

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'ascending'
          ? aValue.localeCompare(bValue, undefined, { sensitivity: 'base' })
          : bValue.localeCompare(aValue, undefined, { sensitivity: 'base' })
      }

      if (aValue < bValue) return sortOrder === 'ascending' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'ascending' ? 1 : -1

      return 0
    })
  }, [filteredUsers, sortField, sortOrder])


  useEffect(() => {
    let isMounted = true

    Promise.all([userApi.getUsers(), groupApi.getGroups()])
      .then(([users, group]) => {
        if (!isMounted) return

        setUsers(users)
        setGroups(group)
      })
      .catch((error) => {
        if (!isMounted) return
        setError(error instanceof Error ? error.message : 'Failed to load users')
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
    }, [])

  if (error) return <div className="users-page__error">{error}</div>
  if (loading) return <div className="users-page__loading">Loading...</div>
  

  return (
    <section className="users-page">
        <div className="users-page__search-wrap">
          <img className="users-page__search-icon" src="/search_icon.svg" alt="Search" />
        <input
        className="users-page__search"
        type="text"
        placeholder="Search by name and email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        </div>

        <div className="users-page__table">
        <UsersTable 
        users={sortedUsers}
        onSort={handleSort}
        onDelete={handleDelete}
        sortField={sortField}
        sortOrder={sortOrder} 
        groups={groups}
        />
        </div>

        {sortedUsers.length === 0 && <div className="users-page__empty">No users found</div>}

        <form
          className="users-page__form"
          onSubmit={async (e) => {
            e.preventDefault()

            if (!isFormValid) return

            try {
              const newUser = await userApi.createUser({
                name,
                email,
                groupId,
              })

              setUsers(prev => [...prev, newUser])

              setName('')
              setEmail('')
            } catch {
              alert('Failed to create user');
            }
          }}
        >
          <input
            className="users-page__field"
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="users-page__field"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            className="users-page__field"
            value={groupId ?? ''}
            onChange={(e) =>
              setGroupId(e.target.value ? Number(e.target.value) : null)
            }
            >
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}

            <option value="">No group</option>

          </select>

          <button className="users-page__button" type="submit" disabled={!isFormValid}>
            Add User
          </button>
        </form>
    </section>
  )
}

export default UsersPage
