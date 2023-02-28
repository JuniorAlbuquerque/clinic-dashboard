import BreadCrumb from '@/components/BreadCrumb'
import Table from '@/components/Table'
import PageContainer from '@/styles/Layout/PageContainer'
import { FC, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useAllPatientPackageList } from '../../hooks/patient_package/useAllPatientPackages'
import { getRows, heads } from './utils'

const itemsPerPage = 10

const Packages: FC = () => {
  const [page, setPage] = useState(0)

  const { data, loading } = useAllPatientPackageList(page, itemsPerPage)

  const pageCount = Math.ceil(
    data?.getAllPatientPackageList?.count / itemsPerPage
  )

  const tableData = getRows({
    data: data?.getAllPatientPackageList?.data
  })

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected)
  }

  return (
    <PageContainer className="bg-primary-50 rounded-l-2xl">
      <div className="flex flex-col gap-4 p-8">
        <div className="bg-white p-4 h-fit w-full rounded-lg flex items-center justify-between">
          <BreadCrumb
            pages={[
              {
                title: 'Pacotes/Atendimentos',
                current: true,
                to: '/packages'
              }
            ]}
          />
        </div>

        <div className="bg-white p-4 h-fit w-full rounded-lg">
          <Table data={tableData} head={heads} busy={loading} />

          {data?.getAllPatientPackageList?.count > 10 && (
            <div className="flex mt-4 justify-end">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                forcePage={page}
                nextLinkClassName="no-underline text-primary-500"
                onPageChange={(event) => handlePageClick(event)}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                previousLinkClassName="no-underline text-primary-500"
                renderOnZeroPageCount={null}
                className="flex no-underline items-center gap-2 p-2 decoration-transparent"
                activeClassName="bg-primary-500"
                containerClassName="bg-primary-700"
                breakLinkClassName="no-underline text-primary-500"
                pageLinkClassName="no-underline text-primary-500 w-10 p-2 flex items-center justify-center"
                activeLinkClassName="text-white"
                pageClassName=" bg-white rounded-md border border-primary-100 "
              />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}

export default Packages
