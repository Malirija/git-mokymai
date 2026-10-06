import { useState } from 'react'
import './TestTable.css'
import StatusSummary from './StatusSummary'

const initialData = [
  {
    id: 1,
    name: 'Jonas',
    city: 'Vilnius',
    status: 'Aktyvus',
  },
  {
    id: 2,
    name: 'Petras',
    city: 'Kaunas',
    status: 'Neaktyvus',
  },
  {
    id: 3,
    name: 'Ona',
    city: 'Klaipėda',
    status: 'Aktyvus',
  },
  {
    id: 4,
    name: 'Tomas',
    city: 'Šiauliai',
    status: 'Laukiantis',
  },
]

function TestTable() {
  const [filter, setFilter] = useState('')
  const [rows, setRows] = useState(initialData)

  const filteredData = rows.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  )

  function handleStatusChange(id, status) {
    setRows((currentRows) =>
      currentRows.map((row) => (row.id === id ? { ...row, status } : row))
    )
  }

  return (
    <div className="test-table-container">
      <h2>Testinė lentelė</h2>

      <input
        type="text"
        placeholder="Filtruoti pagal vardą..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="table-filter"
      />

      <table className="test-table">
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Miestas</th>
            <th>Statusas</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.city}</td>
              <td>
                <select
                  className={`table-status table-status--${row.status.toLowerCase()}`}
                  value={row.status}
                  onChange={(event) => handleStatusChange(row.id, event.target.value)}
                  aria-label={`${row.name} statusas`}
                >
                  <option value="Aktyvus">Aktyvus</option>
                  <option value="Neaktyvus">Neaktyvus</option>
                  <option value="Laukiantis">Laukiantis</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <StatusSummary rows={rows} />
    </div>
  )
}

export default TestTable
