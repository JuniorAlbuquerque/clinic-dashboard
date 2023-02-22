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
  busy?: boolean
}

const Table: FC<TableProps> = ({ data, head, busy }) => {
  return (
    <div className=" overflow-x-auto shadow ring-1 ring-black ring-opacity-0 md:rounded-lg">
      <table className="min-w-full divide-y border-collapse divide-gray-200">
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
          {busy && (
            <tr>
              <td
                className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                colSpan={12}
              >
                Carregando...
              </td>
            </tr>
          )}

          {!busy &&
            data?.map((row, index) => (
              <tr key={index}>
                {head?.map((column) => (
                  <td
                    key={column.id}
                    className="min-w-[200px] max-w-[280px] py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
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
  )
}

export default Table
