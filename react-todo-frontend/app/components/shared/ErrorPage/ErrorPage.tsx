import { Alert, BodyLong, Box, Heading, Page, VStack } from '@navikt/ds-react'

interface ErrorPageProps {
  message: string
  details: string
  is404?: boolean
  stack?: string
}

export const ErrorPage = ({ message, details, is404, stack }: ErrorPageProps) => {
  return (
    <Page>
      <Page.Block as="main" width="md" gutters>
        <Box paddingBlock="space-16">
          <VStack gap="space-16">
            <Heading size="xlarge">{message}</Heading>
            <Alert variant={is404 ? 'warning' : 'error'}>
              <BodyLong>{details}</BodyLong>
            </Alert>
            {stack && (
              <Box as="pre" padding="space-16" background="neutral-soft" borderRadius="8" style={{ overflow: 'auto' }}>
                <code>{stack}</code>
              </Box>
            )}
          </VStack>
        </Box>
      </Page.Block>
    </Page>
  )
}
