import type { Todo, TodoTag } from '~/api'

export const tags: TodoTag[] = [
  { name: 'setup', color: 'neutral' },
  { name: 'tooling', color: 'brand-blue' },
  { name: 'design', color: 'brand-magenta' },
  { name: 'frontend', color: 'accent' },
  { name: 'data', color: 'info' },
  { name: 'backend', color: 'meta-purple' },
  { name: 'forms', color: 'brand-beige' },
  { name: 'testing', color: 'meta-lime' },
  { name: 'quality', color: 'success' },
  { name: 'security', color: 'danger' },
  { name: 'ux', color: 'warning' },
]

export const todos: Todo[] = [
  {
    id: '1',
    title: 'Set up React Router',
    description:
      'Initialize a new React Router 7 project using framework mode with server-side rendering enabled. Configure the Vite build tool with the React Router plugin, set up TypeScript with strict mode and verbatim module syntax, and verify that the development server starts correctly with hot module replacement working across all route modules.',
    done: true,
    tags: [
      { name: 'setup', color: 'neutral' },
      { name: 'tooling', color: 'brand-blue' },
    ],
    createdAt: '2026-04-01T08:00:00.000Z',
  },
  {
    id: '2',
    title: 'Add Aksel design system',
    description:
      'Install the @navikt/ds-react component library, @navikt/ds-css for base styles, and @navikt/aksel-icons for the icon set. Import the CSS at the application root, replace all default HTML elements with their Aksel equivalents (Heading, BodyShort, Button, etc.), and ensure the design tokens are properly loaded so that spacing, typography, and color scales match the Nav design guidelines.',
    done: true,
    tags: [
      { name: 'design', color: 'brand-magenta' },
      { name: 'frontend', color: 'accent' },
    ],
    createdAt: '2026-04-02T10:30:00.000Z',
  },
  {
    id: '3',
    title: 'Implement loaders',
    description:
      'Add server-side data loading to each route module by exporting async loader functions that fetch data before the component renders. Use useLoaderData with the typeof loader generic for end-to-end type safety without manual type definitions. Set up MSW with Node.js server handlers to intercept fetch calls during development, allowing loaders to use the same HTTP fetch pattern they will use against real APIs in production.',
    done: false,
    tags: [
      { name: 'data', color: 'info' },
      { name: 'backend', color: 'meta-purple' },
    ],
    createdAt: '2026-04-03T14:00:00.000Z',
  },
  {
    id: '4',
    title: 'Add form actions',
    description:
      'Create form mutations using React Router actions with progressive enhancement, so forms work even without JavaScript. Export action functions from route modules that process FormData submissions on the server, validate input, and return appropriate responses. Use the Form component from React Router instead of plain HTML forms to get client-side navigation on submission. Add optimistic UI updates using useNavigation and useFetcher for a responsive user experience while mutations are in flight.',
    done: false,
    tags: [
      { name: 'frontend', color: 'accent' },
      { name: 'forms', color: 'brand-beige' },
    ],
    createdAt: '2026-04-05T09:15:00.000Z',
  },
  {
    id: '5',
    title: 'Write tests',
    description:
      'Set up Vitest as the test runner with jsdom environment and React Testing Library for component testing. Write integration tests that verify route loaders return the correct data, components render the expected content, user interactions like clicking links and submitting forms produce the right navigation and state changes, and error boundaries display appropriate messages when loaders or actions fail. Configure MSW handlers in the test setup to provide consistent mock data across all test suites.',
    done: false,
    tags: [
      { name: 'testing', color: 'meta-lime' },
      { name: 'quality', color: 'success' },
    ],
    createdAt: '2026-04-07T11:00:00.000Z',
  },
  {
    id: '6',
    title: 'Add authentication',
    description:
      'Implement user authentication using cookie-based sessions with secure HTTP-only cookies. Create login and logout routes with server-side session management, protect routes that require authentication by checking session data in loaders, and redirect unauthenticated users to the login page while preserving the original URL they tried to access.',
    done: false,
    tags: [
      { name: 'security', color: 'danger' },
      { name: 'backend', color: 'meta-purple' },
    ],
    createdAt: '2026-04-09T16:45:00.000Z',
  },
  {
    id: '7',
    title: 'Set up error boundaries',
    description:
      'Add error boundary components to route modules by exporting ErrorBoundary functions that catch and display errors gracefully. Handle both expected errors like 404 Not Found responses and unexpected runtime errors with appropriate user-facing messages. Use isRouteErrorResponse to differentiate between response errors thrown from loaders and actions versus unexpected JavaScript errors.',
    done: false,
    tags: [
      { name: 'frontend', color: 'accent' },
      { name: 'quality', color: 'success' },
    ],
    createdAt: '2026-04-10T13:30:00.000Z',
  },
  {
    id: '8',
    title: 'Implement search and filtering',
    description:
      'Add a search input that filters todos by title using URL search parameters so the filter state is shareable and bookmarkable. Use the useSearchParams hook to read and update the query string, debounce the input to avoid excessive re-renders, and update the loader to accept a search query parameter that filters results on the server side before returning them to the client.',
    done: false,
    tags: [
      { name: 'frontend', color: 'accent' },
      { name: 'data', color: 'info' },
    ],
    createdAt: '2026-04-12T10:00:00.000Z',
  },
  {
    id: '9',
    title: 'Add drag and drop reordering',
    description:
      'Implement drag and drop functionality to allow users to reorder todos within a list and move them between the open and finished columns. Use a library like dnd-kit that supports keyboard accessibility out of the box, persist the new order to the server via an action, and add visual feedback during the drag operation so users can see where the item will be placed.',
    done: false,
    tags: [
      { name: 'frontend', color: 'accent' },
      { name: 'ux', color: 'warning' },
    ],
    createdAt: '2026-04-15T15:20:00.000Z',
  },
]
