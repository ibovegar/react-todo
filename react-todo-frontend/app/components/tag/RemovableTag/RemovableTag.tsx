import { XMarkIcon } from '@navikt/aksel-icons'
import { Tag } from '@navikt/ds-react'

import type { TodoTag } from '~/models'
import { toAkselColor } from '~/utils'

interface RemovableTagProps {
  tag: TodoTag
  onRemove: (tagId: string) => void
}

export const RemovableTag = (props: RemovableTagProps) => {
  const { tag, onRemove } = props
  return (
    <Tag variant="moderate" size="small" data-color={toAkselColor(tag.color)}>
      {tag.name}
      <button
        type="button"
        aria-label={`Remove ${tag.name}`}
        onClick={() => onRemove(tag.id)}
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'inline-flex',
          marginInlineStart: 'var(--ax-space-2)',
          color: 'var(--ax-text-decoration)',
        }}
      >
        <XMarkIcon fontSize="1.5em" />
      </button>
    </Tag>
  )
}
