import { useEffect, useMemo, useState } from 'react'
import { groupApi } from '../../entities/group/api/groupApi'
import type { Group } from '../../entities/group/model/types'
import { userApi } from '../../entities/user/api/userApi'
import type { User } from '../../entities/user/model/types'
import './GroupsPage.scss'

type GroupRow = {
  id: number
  name: string
  usersCount: number
  userNames: string
}

const GroupsPage = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    Promise.all([groupApi.getGroups(), userApi.getUsers()])
      .then(([loadedGroups, loadedUsers]) => {
        if (!isMounted) return

        setGroups(loadedGroups)
        setUsers(loadedUsers)
      })
      .catch((error) => {
        if (!isMounted) return
        setError(error instanceof Error ? error.message : 'Failed to load groups')
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

  const usersByGroupId = useMemo(() => {
    return users.reduce<Record<number, User[]>>((accumulator, user) => {
      if (user.groupId === null) {
        return accumulator
      }

      if (!accumulator[user.groupId]) {
        accumulator[user.groupId] = []
      }

      accumulator[user.groupId].push(user)
      return accumulator
    }, {})
  }, [users])

  const groupRows = useMemo<GroupRow[]>(() => {
    return groups.map((group) => {
      const groupUsers = usersByGroupId[group.id] ?? []

      return {
        id: group.id,
        name: group.name,
        usersCount: groupUsers.length,
        userNames: groupUsers.length > 0 ? groupUsers.map((user) => user.name).join(', ') : '—',
      }
    })
  }, [groups, usersByGroupId])

  if (error) {
    return <div className="groups-page__error">{error}</div>
  }

  if (loading) {
    return <div className="groups-page__loading">Loading...</div>
  }

  return (
    <section className="groups-page">
      <div className="groups-page__table-wrap">
        <table className="groups-page__table">
          <thead>
            <tr>
              <th>Group</th>
              <th>Users count</th>
              <th>Users</th>
            </tr>
          </thead>

          <tbody>
            {groupRows.map((group) => (
              <tr key={group.id}>
                <td>{group.name}</td>
                <td>{group.usersCount}</td>
                <td>{group.userNames}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default GroupsPage
