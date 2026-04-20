import { CheckmarkCircleIcon, CogIcon, TasklistIcon } from '@navikt/aksel-icons'
import { HStack, Page, VStack } from '@navikt/ds-react'
import { Outlet } from 'react-router'

import { NavItem } from '~/components'

const TabsLayout = () => {
  return (
    <Page>
      <Page.Block as="main" gutters width="lg">
        <VStack gap="space-20" style={{ paddingBlockStart: 'var(--ax-space-32)' }}>
          <HStack
            as="nav"
            justify="space-between"
            align="end"
            style={{
              borderBottom: '1px solid var(--ax-border-neutral-subtle)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              background: 'var(--ax-bg-default)',
              paddingTop: 'var(--ax-space-12)',
            }}
          >
            <HStack gap="space-8">
              <NavItem to="/" label="Open" icon={TasklistIcon} end />
              <NavItem to="/finished" label="Finished" icon={CheckmarkCircleIcon} end={false} />
            </HStack>
            <HStack gap="space-8">
              <NavItem to="/settings" label="Settings" icon={CogIcon} end={false} />
            </HStack>
          </HStack>
          <Outlet />
        </VStack>
      </Page.Block>
    </Page>
  )
}

export default TabsLayout
