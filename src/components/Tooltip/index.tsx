import clsx from 'clsx'
import { FC } from 'react'
import { Tooltip as ReactTooltip, ITooltip } from 'react-tooltip'

const Tooltip: FC<ITooltip> = ({ children, ...rest }) => {
  return (
    <ReactTooltip
      place="right"
      className={clsx('rounded-md bg-primary-800 text-primary-50 font-normal', {
        'ml-2': rest?.place !== 'top'
      })}
      {...rest}
    >
      {children}
    </ReactTooltip>
  )
}

export default Tooltip
