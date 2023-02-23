import Modal from '@/components/Modal'
import { FC } from 'react'
import { useDeletePatientPackage } from '../../hooks/patient_package/useDeletePatientPackage'

type DeletePatientPackageProps = {
  open: boolean
  patient_package_id: number
  onClose(): void
}

const DeletePatientPackage: FC<DeletePatientPackageProps> = ({
  open,
  patient_package_id,
  onClose
}) => {
  const { deletePatientPackage } = useDeletePatientPackage()

  const onConfirm = () => {
    deletePatientPackage.mutate(
      {
        patientPackageId: patient_package_id
      },
      {
        onSuccess() {
          onClose()
        }
      }
    )
  }

  return (
    <Modal
      title={`Excluir pacote ${patient_package_id}`}
      open={open}
      onClose={onClose}
      confirmText="Sim, excluir"
      onSubmit={onConfirm}
      busy={deletePatientPackage?.isLoading}
    >
      <p>
        Essa ação é irreversível, todos os atendimentos deste paciente
        relacionados a este pacote serão excluídos, tem certeza que deseja
        excluir esse pacote?
      </p>
    </Modal>
  )
}

export default DeletePatientPackage
