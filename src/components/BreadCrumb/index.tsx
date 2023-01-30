import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

type BreadCrumbProps = {
  pages: {
    title: string
    to: string
    current: boolean
  }[]
}

export default function BreadCrumb({ pages }: BreadCrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.title}>
            <div className="hidden md:flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                to={page.to}
                className={`ml-4 text-sm font-medium ${
                  page.current
                    ? 'text-gray-700 hover:text-gray-800'
                    : 'text-gray-500 hover:text-gray-700'
                } `}
                aria-current={page.current ? 'page' : undefined}
              >
                {page.title}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
