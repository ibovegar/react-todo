import type { TasklistIcon } from '@navikt/aksel-icons'
import { BodyShort, HStack } from '@navikt/ds-react'
import { NavLink } from 'react-router'

interface NavItemProps {
  to: string
  label: string
  icon: typeof TasklistIcon
  end: boolean
}

export const NavItem = ({ to, label, icon: Icon, end }: NavItemProps) => {
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
