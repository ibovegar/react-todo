import { BellIcon, PersonIcon, TagIcon } from '@navikt/aksel-icons'
import { HGrid, VStack } from '@navikt/ds-react'
import { Outlet } from 'react-router'

import { PageHeader, SidebarLink } from '~/components'

const SettingsLayout = () => {
  return (
    <VStack gap="space-20">
      <PageHeader title="Settings" />
      <HGrid columns="250px 1fr" gap="space-8">
        <VStack as="nav" gap="space-4">
          <SidebarLink to="/settings" end label="Profile" icon={PersonIcon} />
          <SidebarLink to="/settings/notifications" label="Notifications" icon={BellIcon} />
          <SidebarLink to="/settings/tags" label="Tags" icon={TagIcon} />
        </VStack>
        <div style={{ paddingInlineStart: 'var(--ax-space-16)' }}>
          <Outlet />
        </div>
      </HGrid>
    </VStack>
  )
}

export default SettingsLayout
