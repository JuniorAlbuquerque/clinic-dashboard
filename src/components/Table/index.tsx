import { FC, ReactElement } from 'react'

type TableData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: string | number | ReactElement | any
}

type TableHead = {
  id: string
  label: string
}

type TableProps = {
  data: TableData[]
  head: TableHead[]
}

const Table: FC<TableProps> = ({ data, head }) => {
  return (
    <div className="inline-block min-w-full py-2 align-middle">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {head?.map((column) => (
                <th
                  scope="col"
                  key={column.id}
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data?.map((row, index) => (
              <tr key={index}>
                {head?.map((column) => (
                  <td
                    key={column.id}
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {row[column.id]}
                  </td>
                ))}
              </tr>
            ))}

            {data?.length === 0 && (
              <tr>
                <td
                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  colSpan={12}
                >
                  Nenhum dado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
