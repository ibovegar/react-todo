import { Button, HStack } from '@navikt/ds-react'
import { SelectableTag } from '../SelectableTag'

import type { TodoTag } from '~/api'

interface TagCloudProps {
  tags: TodoTag[]
  disabledTags?: TodoTag[]
  onSelect: (tag: TodoTag) => void
}

export function TagCloud(props: TagCloudProps) {
  const { tags, disabledTags, onSelect } = props
  const isDisabled = (tag: TodoTag) => disabledTags?.some((d) => d.name === tag.name) ?? false

  return (
    <HStack gap="space-4" wrap>
      {tags.map((tag) => (
        <Button
          key={tag.name}
          type="button"
          variant="tertiary-neutral"
          size="small"
          style={{ padding: 0, minHeight: 'auto' }}
          onClick={() => onSelect(tag)}
        >
          <SelectableTag tag={tag} selected={!isDisabled(tag)} onClick={() => onSelect(tag)} />
        </Button>
      ))}
    </HStack>
  )
}
