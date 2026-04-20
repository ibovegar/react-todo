import { Button, HStack } from '@navikt/ds-react'
import { SelectableTag } from '../SelectableTag'

import type { TodoTag } from '~/models'

interface TagCloudProps {
  tags: TodoTag[]
  disabledTags?: TodoTag[]
  onSelect: (tag: TodoTag) => void
}

export const TagCloud = (props: TagCloudProps) => {
  const { tags, disabledTags, onSelect } = props
  const isDisabled = (tag: TodoTag) => disabledTags?.some((d) => d.id === tag.id) ?? false

  return (
    <HStack gap="space-4" wrap>
      {tags.map((tag) => (
        <Button
          key={tag.id}
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
