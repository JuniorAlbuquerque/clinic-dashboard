import BreadCrumb from '@/components/BreadCrumb'
import Button from '@/components/Button/Button'
import Table from '@/components/Table'
import { Text } from '@/components/Text'
import { GetPatientPackageById_getPatientPackageById_history } from '@/graphql/generated/GetPatientPackageById'
import PageContainer from '@/styles/Layout/PageContainer'
import { calculateAge } from '@/utils/calculateAge'
import { brStringToDate } from '@/utils/formats/date'
import { renderEmpty } from '@/utils/renderEmpty'
import { TrashIcon } from '@heroicons/react/24/outline'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import DeletePatientPackage from '../../components/DeletePatientPackage'
import ModalUpdatePayment from '../../components/ModaUpdatePayment'
import RenovatePackage from '../../components/RenovatePackage'
import { usePatientPackageById } from '../../hooks/patient_package/usePatientPackageById'
import {
  appointmentHead,
  getAppointmentRows,
  getHistoryRows,
  historyHead
} from './utils'

const PackageView: FC = () => {
  const { id } = useParams()

  const [openModalRenovate, setOpenModalRenovate] = useState(false)
  const [openModalPayment, setOpenModalPayment] = useState(false)
  const [openModalDeletePackage, setOpenModalDeletePackage] = useState(false)
  const [selectedPackageHistory, setSelectedPackageHistory] =
    useState<GetPatientPackageById_getPatientPackageById_history>(null)

  const { data } = usePatientPackageById(parseInt(id))

  const historyData = getHistoryRows({
    data: data?.getPatientPackageById?.history,
    onClickRow(item) {
      setOpenModalPayment(true)
      setSelectedPackageHistory(item)
    }
  })

  const appointmentData = getAppointmentRows({
    data: data?.getPatientPackageById?.appointments
  })

  return (
    <PageContainer className="bg-primary-50 rounded-l-2xl">
      <div className="flex flex-col gap-4 p-8">
        <div className="bg-white p-4 h-fit w-full rounded-lg flex items-center justify-between">
          <BreadCrumb
            pages={[
              {
                title: 'Pacotes/Atendimentos',
                to: '/packages',
                current: false
              },
              {
                title: `Pacote ${id}`,
                to: `/packages/${id}`,
                current: true
              }
            ]}
          />
        </div>

        <div className="bg-white p-4 h-fit w-full rounded-lg flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center rounded-3xl bg-gray-100">
            <div className="w-full lg:w-auto md:min-w-[340px] flex items-center lg:items-baseline flex-col gap-2 rounded-[25px] p-4 bg-primary-700 text-primary-50">
              <div className="flex flex-col md:flex-row items-center gap-7">
                <div className="px-4 pt-4 rounded-3xl bg-primary-50 w-24 min-w-[100px]">
                  <img
                    width={120}
                    height={120}
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light"
                  />
                </div>

                <div>
                  <Text renderAs="h3" className="text-xl">
                    {renderEmpty(data?.getPatientPackageById?.patient?.name)}
                  </Text>
                  <Text renderAs="span" className="text-gray-400">
                    {renderEmpty(
                      data?.getPatientPackageById?.patient?.birthdate
                        ? calculateAge(
                            brStringToDate(
                              data?.getPatientPackageById?.patient?.birthdate
                            )
                          )
                        : ''
                    )}{' '}
                    anos
                  </Text>
                </div>
              </div>

              <div className="flex gap-8 p-2">
                <div className="flex flex-col gap-1">
                  <Text renderAs="span" className="text-gray-500 text-sm">
                    Peso
                  </Text>

                  <Text renderAs="span" className="text-primary-50">
                    {renderEmpty(data?.getPatientPackageById?.patient?.weight)}
                  </Text>
                </div>

                <div className="flex flex-col gap-1 ml-12">
                  <Text renderAs="span" className="text-gray-500 text-sm">
                    Altura
                  </Text>

                  <Text renderAs="span" className="text-primary-50">
                    {renderEmpty(data?.getPatientPackageById?.patient?.height)}
                  </Text>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 p-4 w-full gap-4">
              <div className="flex flex-col gap-1">
                <Text renderAs="span" className="text-gray-700 text-sm">
                  ID do sistema
                </Text>

                <Text renderAs="span" className="text-primary-800 font-medium">
                  {renderEmpty(data?.getPatientPackageById?.patient?.id)}
                </Text>
              </div>

              <div className="flex flex-col gap-1">
                <Text renderAs="span" className="text-gray-700 text-sm">
                  Telefone
                </Text>

                <Text renderAs="span" className="text-primary-800 font-medium">
                  {renderEmpty(data?.getPatientPackageById?.patient?.telephone)}
                </Text>
              </div>

              <div className="flex flex-col gap-1">
                <Text renderAs="span" className="text-gray-700 text-sm">
                  E-mail
                </Text>

                <Text renderAs="span" className="text-primary-800 font-medium">
                  {renderEmpty(data?.getPatientPackageById?.patient?.email)}
                </Text>
              </div>

              <div className="flex flex-col gap-1">
                <Text renderAs="span" className="text-gray-700 text-sm">
                  Endereço
                </Text>

                <Text renderAs="span" className="text-primary-800 font-medium">
                  {renderEmpty(data?.getPatientPackageById?.patient?.address)},{' '}
                  {renderEmpty(data?.getPatientPackageById?.patient?.city)}
                </Text>
              </div>

              <div className="flex flex-col gap-1">
                <Text renderAs="span" className="text-gray-700 text-sm">
                  CPF
                </Text>

                <Text renderAs="span" className="text-primary-800 font-medium">
                  {renderEmpty(data?.getPatientPackageById?.patient?.cpf)}
                </Text>
              </div>
            </div>
          </div>

          <div className="ml-2 flex flex-col gap-2 items-center justify-between md:flex-row">
            <div>
              <div>
                <Text renderAs="span" className="text-gray-700">
                  Pacote:
                </Text>

                <Text
                  renderAs="span"
                  className="text-primary-800 font-medium ml-2"
                >
                  {data?.getPatientPackageById?.package?.treatment?.name} (
                  {data?.getPatientPackageById?.package?.quantity} sessões)
                </Text>
              </div>

              <div>
                <Text renderAs="span" className="text-gray-700">
                  História:
                </Text>

                <Text renderAs="span" className="ml-2 font-medium">
                  {data?.getPatientPackageById?.description}
                </Text>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setOpenModalRenovate(true)}>
                Renovar Pacote
              </Button>

              <Button onClick={() => setOpenModalDeletePackage(true)} danger>
                <div className="flex gap-2 items-center">
                  <TrashIcon width={20} />
                  Excluir Pacote
                </div>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1 p-4 rounded-xl border border-primary-50">
            <Text renderAs="span" className="text-gray-800 font-medium text-sm">
              Histórico:
            </Text>
            <Table data={historyData} head={historyHead} />
          </div>

          <div className="flex flex-col gap-1 p-4 rounded-xl border border-primary-50">
            <Text renderAs="span" className="text-gray-800 font-medium text-sm">
              Atendimentos:
            </Text>
            <Table data={appointmentData} head={appointmentHead} />
          </div>
        </div>
      </div>

      <RenovatePackage
        open={openModalRenovate}
        onClose={() => setOpenModalRenovate(false)}
        data={{
          weekDays: data?.getPatientPackageById?.history[0]?.week_days,
          patient_package_id: data?.getPatientPackageById?.id,
          minDate: new Date(
            data?.getPatientPackageById?.appointments[0]?.end_date
          )
        }}
      />

      <ModalUpdatePayment
        open={openModalPayment}
        onClose={() => {
          setSelectedPackageHistory(null)
          setOpenModalPayment(false)
        }}
        data={{
          package_history_id: selectedPackageHistory?.id,
          payment_date: selectedPackageHistory?.payment_date,
          payment_status: selectedPackageHistory?.payment_status,
          payment_type: selectedPackageHistory?.payment_type
        }}
      />

      <DeletePatientPackage
        open={openModalDeletePackage}
        onClose={() => {
          setOpenModalDeletePackage(false)
        }}
        patient_package_id={parseInt(id)}
      />
    </PageContainer>
  )
}

export default PackageView
