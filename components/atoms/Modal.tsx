import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import ReactModal from 'react-modal'

import { Button } from './Button'

type ModalProps = {
  children: ReactNode | string | number
  isOpen: boolean
  title: string
  isPrimaryBtnDisabled?: boolean
  handleIsOpen: Dispatch<SetStateAction<boolean>>
  handleSubmit: () => void
}

export const Modal = (props: ModalProps) => {
  const {
    isOpen,
    handleIsOpen,
    handleSubmit,
    children,
    title,
    isPrimaryBtnDisabled = false,
    ...rest
  } = props

  return (
    <ReactModal
      contentLabel={`${title} Modal`}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
        content: {
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          background: '#fff',
          border: 'none',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '8px',
          outline: 'none',
          padding: '20px',
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      isOpen={isOpen}
      {...rest}>
      <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div
          onClick={() => handleIsOpen(!isOpen)}
          className="transition-button close-btn flex h-6 w-6 cursor-pointer items-center justify-center rounded-md">
          <FontAwesomeIcon icon={faTimes} className="" />
        </div>
      </div>
      <div>{children}</div>
      <div className="mt-auto flex border-t border-gray-200 pt-6">
        <Button
          btnStyle="secondary"
          className="ml-auto mr-3"
          onClick={() => handleIsOpen(!isOpen)}>
          cancel
        </Button>
        <Button onClick={() => handleSubmit()} disabled={isPrimaryBtnDisabled}>
          submit
        </Button>
      </div>
    </ReactModal>
  )
}
