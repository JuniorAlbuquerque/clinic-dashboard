import { Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from '../Button/Button'

type ModalProps = {
  open: boolean
  title?: string
  confirmText?: string
  cancelText?: string
  children: ReactNode
  onClose: () => void
  onCancel?: () => void
  onSubmit?: () => void
}

export default function Modal({
  open,
  title,
  children,
  onClose,
  onSubmit
}: ModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="text-lg font-semibold mb-4">
                  {!!title && title}
                </div>
                <div>{children}</div>
                <div className="mt-5 sm:mt-6 flex gap-8 ml-auto items-center justify-end">
                  <p
                    className="text-sm text-primary-600 cursor-pointer"
                    onClick={onClose}
                  >
                    Cancelar
                  </p>
                  <Button onClick={() => onSubmit && onSubmit()}>
                    Confirmar
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
