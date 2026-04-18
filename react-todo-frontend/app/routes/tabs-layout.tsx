import { CheckmarkCircleIcon, CogIcon, TasklistIcon } from '@navikt/aksel-icons'
import { BodyShort, HStack, Page, VStack } from '@navikt/ds-react'
import { NavLink, Outlet } from 'react-router'

const leftItems = [
  { to: '/', label: 'Open', icon: TasklistIcon, end: true },
  { to: '/finished', label: 'Finished', icon: CheckmarkCircleIcon, end: false },
]

const rightItems = [{ to: '/settings', label: 'Settings', icon: CogIcon, end: false }]

function NavItem({ to, label, icon: Icon, end }: { to: string; label: string; icon: typeof CogIcon; end: boolean }) {
  return (
    <NavLink key={to} to={to} end={end} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <HStack
          gap="space-2"
          align="center"
          style={{
            color: 'var(--ax-text-neutral)',
            padding: 'var(--ax-space-8) var(--ax-space-12)',
            background: isActive ? 'var(--ax-bg-neutral-moderate)' : 'transparent',
            borderRadius: 'var(--ax-radius-8) var(--ax-radius-8) 0 0',
          }}
        >
          <Icon aria-hidden />
          <BodyShort style={{ color: 'inherit' }}>{label}</BodyShort>
        </HStack>
      )}
    </NavLink>
  )
}

export default function TabsLayout() {
  return (
    <Page>
      <Page.Block as="main" gutters width="lg">
        <VStack gap="space-20" style={{ paddingBlockStart: 'var(--ax-space-32)' }}>
          <HStack
            as="nav"
            justify="space-between"
            align="end"
            style={{ borderBottom: '1px solid var(--ax-border-neutral-subtle)' }}
          >
            <HStack gap="space-8">
              {leftItems.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </HStack>
            <HStack gap="space-8">
              {rightItems.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </HStack>
          </HStack>
          <Outlet />
        </VStack>
      </Page.Block>
    </Page>
  )
}
