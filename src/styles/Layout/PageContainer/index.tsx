import { classNames } from '@/utils/mergeClassName'
import { FC, ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  className?: string
}

const PageContainer: FC<PageContainerProps> = ({ children, className }) => {
  return (
    <div className={classNames('flex flex-col w-full h-screen', className)}>
      {children}
    </div>
  )
}

export default PageContainer
