import { useMemo } from 'react'
import type { User } from '../model/types'
import type {Group} from '../../group/model/types'
import './UsersTable.scss'

interface Props {
  users: User[]
  onSort: (field: 'name' | 'email' | 'groupId') => void
  onDelete: (id: string) => void
  sortField: string | null
  sortOrder: 'ascending' | 'descending'
  groups: Group[]
}

export const UsersTable = ({ users, onSort, onDelete, sortField, sortOrder, groups }: Props) => {
  
  const groupMap = useMemo(() => {
  return Object.fromEntries(groups.map(g => [g.id, g.name]))
  }, [groups])

  return (
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort('name')}>
              Name {sortField === 'name' ? (sortOrder === 'ascending' ? '↑' : '↓') : ''}
            </th>

            <th onClick={() => onSort('email')}>
              Email {sortField === 'email' ? (sortOrder === 'ascending' ? '↑' : '↓') : ''}
            </th>

            <th onClick={() => onSort('groupId')}>
              Group {sortField === 'groupId' ? (sortOrder === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.groupId ? groupMap[user.groupId] : '—'}</td>
              <td>
                <button className='btn-delete' onClick={() => onDelete(user.id)} disabled={!user.name || !user.email}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}
