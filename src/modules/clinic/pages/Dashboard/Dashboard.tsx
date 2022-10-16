import { Text } from '@/components/Text'
import PageContainer from '@/styles/Layout/PageContainer'
import { FC } from 'react'

const Dashboard: FC = () => {
  return (
    <PageContainer className="bg-primary-50 rounded-l-2xl">
      <div className="flex">
        <div className="flex-1 p-8">
          <div className="bg-white p-8 rounded-2xl flex flex-col">
            <Text renderAs="span" className="text-3xl font-medium">
              Bom dia, <span className="text-primary-500">Sabrina</span>
            </Text>

            <Text renderAs="span" className="text-gray-700">
              Tenha um ótima dia de trabalho
            </Text>
          </div>
        </div>
        <div className="flex-1 bg-white h-screen p-4">Agenda</div>
      </div>
    </PageContainer>
  )
}

export default Dashboard
