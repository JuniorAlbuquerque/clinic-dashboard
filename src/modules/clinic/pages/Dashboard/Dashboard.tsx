import AppointmentCard from '@/components/AppointmentCard'
import { Text } from '@/components/Text'
import WeekCalendar from '@/components/WeekCalendar'
import { useUserStore } from '@/modules/auth/store/User'
import PageContainer from '@/styles/Layout/PageContainer'
import { format } from 'date-fns'
import { FC, useState } from 'react'
import { useWeekAppointments } from '../../hooks/appointments/useWeekAppointments'
import { ReactComponent as EmptyIcon } from '@/assets/empty.svg'
import Spinner from '@/components/Spinner'
import { dayTime } from '@/utils/isDayTime'

const Dashboard: FC = () => {
  const user = useUserStore((state) => state.user)
  const [initialDate, setInitialDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const { data, loading } = useWeekAppointments(
    parseInt(user?.id),
    format(initialDate, 'yyyy-MM-dd'),
    format(endDate, 'yyyy-MM-dd')
  )

  const onChangeWeekDay = (date: Date) => {
    setInitialDate(date)
    setEndDate(date)
  }
  return (
    <PageContainer className="bg-primary-50 rounded-l-2xl">
      <div className="flex flex-col min-h-screen lg:flex-row">
        <div className="lg:flex-1 p-8">
          <div className="bg-white p-8 rounded-2xl flex flex-col">
            <Text renderAs="span" className="text-3xl font-medium">
              {dayTime().saudation},{' '}
              <span className="text-primary-500">Junior</span>
            </Text>

            <Text renderAs="span" className="text-gray-700">
              Tenha {dayTime().isDayTime ? 'um ótimo dia' : 'uma ótima noite'}{' '}
              de trabalho
            </Text>
          </div>
        </div>

        <div className="pb-8 px-8 pt-0 lg:pt-0 lg:px-0 lg:pb-0 bg-red w-4/12">
          <div className="bg-white lg:max-w-2xl flex-1 h-full rounded-xl lg:rounded-none p-4 flex flex-col">
            <div className="mt-8">
              <WeekCalendar onChange={(date) => onChangeWeekDay(date)} />
            </div>

            <div className="mt-8">
              <div className="flex flex-col gap-4">
                <div className="pl-4 pr-2 py-2 flex flex-col gap-4 justify-between">
                  <div className="flex gap-2">
                    <Text renderAs="h1" className="mr-2">
                      Atendimentos
                    </Text>
                  </div>

                  {!loading && !data?.getWeekAppointments?.length ? (
                    <div className="flex flex-col gap-6 items-center justify-center">
                      <EmptyIcon width={200} height={200} />

                      <Text renderAs="span">
                        Sem atendimentos para este dia!
                      </Text>
                    </div>
                  ) : null}

                  {!!data?.getWeekAppointments?.length && (
                    <div className="grid grid-cols-3 gap-4">
                      {data?.getWeekAppointments?.map((item) => (
                        <AppointmentCard
                          key={item.id}
                          text={item?.patient?.name}
                          subtitle={
                            item?.patients_packages?.package?.treatment?.name
                          }
                          variant="blue"
                          footerText={item?.initial_hour}
                          active={item.id === data?.getWeekAppointments[0]?.id}
                        />
                      ))}
                    </div>
                  )}

                  {loading && (
                    <div className="flex flex-col gap-2 items-center justify-center">
                      Carregando listagem...
                      <Spinner />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Dashboard
