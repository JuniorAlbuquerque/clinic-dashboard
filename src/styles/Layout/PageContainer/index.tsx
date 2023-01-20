import { classNames } from '@/utils/mergeClassName'
import { FC, ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  className?: string
  fullHeight?: boolean
}

const PageContainer: FC<PageContainerProps> = ({
  children,
  className,
  fullHeight
}) => {
  return (
    <div
      className={classNames(
        'flex flex-col w-full',
        fullHeight ? 'h-screen' : 'h-full',
        className
      )}
    >
      {children}
    </div>
  )
}

export default PageContainer
