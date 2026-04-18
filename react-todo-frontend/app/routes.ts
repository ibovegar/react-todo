import { index, layout, type RouteConfig, route } from '@react-router/dev/routes'

export default [
  layout('routes/tabs-layout.tsx', [
    index('routes/open.tsx'),
    route('finished', 'routes/finished.tsx'),
    route('settings', 'routes/settings-layout.tsx', [
      index('routes/settings/profile.tsx'),
      route('notifications', 'routes/settings/notifications.tsx'),
      route('tags', 'routes/settings/tags.tsx'),
    ]),
  ]),
] satisfies RouteConfig
