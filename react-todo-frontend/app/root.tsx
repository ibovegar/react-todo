import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'

import { ErrorPage } from '~/components'
import '@navikt/ds-css'
import './app.css'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const App = () => {
  return <Outlet />
}

export default App

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined
  let is404 = false

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404
    message = is404 ? '404' : 'Error'
    details = is404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return <ErrorPage message={message} details={details} is404={is404} stack={stack} />
}
