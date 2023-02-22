import BreadCrumb from '@/components/BreadCrumb'
import Table from '@/components/Table'
import PageContainer from '@/styles/Layout/PageContainer'
import { FC } from 'react'
import { useAllPatientPackageList } from '../../hooks/patient_package/useAllPatientPackages'
import { getRows, heads } from './utils'

const Packages: FC = () => {
  const { data } = useAllPatientPackageList()

  const tableData = getRows({
    data: data?.getAllPatientPackageList?.data
  })

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
          <Table data={tableData} head={heads} />
        </div>
      </div>
    </PageContainer>
  )
}

export default Packages
