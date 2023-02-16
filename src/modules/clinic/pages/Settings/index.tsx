import BreadCrumb from '@/components/BreadCrumb'
import Button from '@/components/Button/Button'
import { Text } from '@/components/Text'
import PageContainer from '@/styles/Layout/PageContainer'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'
import ModalTreatment from '../../components/ModalTreatment'
import { useTreatmentPackages } from '../../hooks/treatments/useTreatmentsPackages'

const Settings: FC = () => {
  const [openModalNewTreatment, setOpenModalNewTreatment] = useState(false)

  const { data } = useTreatmentPackages()

  const handleOpenModalNewTreatment = () => {
    setOpenModalNewTreatment(true)
  }

  return (
    <PageContainer className="bg-primary-50 rounded-l-2xl">
      <div className="flex flex-col gap-4 min-h-screen p-8">
        <div className="bg-white p-4 h-fit w-full rounded-lg flex items-center justify-between">
          <BreadCrumb
            pages={[
              {
                title: 'Configurações',
                current: true,
                to: '/settings'
              }
            ]}
          />
        </div>

        {/* TODO - EDICAO DE INFORMACOES DA CLINICA */}
        {/* <div className="bg-white p-4 h-fit w-full rounded-lg">
          <div className="flex flex-col gap-1">
            <Text renderAs="h2">Informações</Text>
            <Text renderAs="p" className="text-slate-500 text-sm">
              Aqui você pode ajustar as informações da sua clínica
            </Text>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <Input label="Nome" />
            <Input label="Endereço" />
          </div>
        </div> */}

        <div className="bg-white p-4 h-fit w-full rounded-lg">
          <div className="flex flex-col gap-1">
            <Text renderAs="h2">Configurações de Serviços</Text>
            <Text renderAs="p" className="text-slate-500 text-sm">
              Aqui você pode ajustar as configurações dos serviços da sua
              clínica
            </Text>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3 p-4 border border-gray-300 rounded-lg">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-medium text-sm">Lista de Tratamentos</p>

                <Button
                  className="h-8 bg-primary-600"
                  onClick={handleOpenModalNewTreatment}
                >
                  + Adicionar
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                {data?.getAllTreatmentsWithPackages?.map((treatment) => (
                  <div
                    key={treatment.id}
                    className={clsx(
                      'flex gap-2 items-center justify-between',
                      'p-4 bg-primary-600 text-white rounded-lg'
                    )}
                  >
                    <p>{treatment.name}</p>

                    <button>
                      <PencilSquareIcon width={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 py-4 px-4 border border-gray-300 rounded-lg">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-medium text-sm">Visualização dos pacotes</p>
              </div>

              <div className="flex flex-col gap-2">
                {data?.getAllTreatmentsWithPackages?.map((treatment) => (
                  <div
                    key={treatment.id}
                    className={clsx(
                      'flex gap-2 items-center',
                      'p-4 bg-primary-600 text-white rounded-lg'
                    )}
                  >
                    <p>{treatment.name}</p>

                    <span className="text-primary-300">
                      ({treatment.Package.map((pkg) => pkg.quantity).join(', ')}
                      )
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModalNewTreatment && (
        <ModalTreatment
          open={openModalNewTreatment}
          onClose={() => setOpenModalNewTreatment(false)}
        />
      )}
    </PageContainer>
  )
}

export default Settings
