import { classNames } from '@/utils/mergeClassName'
import { FC, ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  className?: string
  fullHeight?: boolean
}

const PageContainer: FC<PageContainerProps> = ({ children, className }) => {
  return (
    <div className={classNames('flex flex-col min-h-screen w-full', className)}>
      {children}
    </div>
  )
}

export default PageContainer
