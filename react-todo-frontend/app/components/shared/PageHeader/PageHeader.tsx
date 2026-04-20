import { Heading, HStack } from '@navikt/ds-react'

interface PageHeaderProps {
  title: string
  actions?: React.ReactNode
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, actions } = props
  return (
    <HStack gap="space-4" align="center" justify="space-between" wrap>
      <Heading size="medium" style={{ marginInlineStart: 'var(--ax-space-16)' }}>
        {title}
      </Heading>
      {actions}
    </HStack>
  )
}
