import Modal from '@/components/Modal'
import { FC } from 'react'
import { useLogin } from '../../hooks/useLogin'

type ModalLogoutProps = {
  open: boolean
  onClose(): void
}

export const ModalLogout: FC<ModalLogoutProps> = ({ open, onClose }) => {
  const { signOut } = useLogin()

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Finalizar sessão"
      onSubmit={signOut}
    >
      <div>Tem certeza que deseja sair?</div>
    </Modal>
  )
}
