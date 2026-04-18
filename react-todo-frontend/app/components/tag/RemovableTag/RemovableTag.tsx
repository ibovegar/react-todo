import { XMarkIcon } from '@navikt/aksel-icons'
import { Tag } from '@navikt/ds-react'

import type { TodoTag } from '~/api'

interface RemovableTagProps {
  tag: TodoTag
  onRemove: (tagName: string) => void
}

export function RemovableTag(props: RemovableTagProps) {
  const { tag, onRemove } = props
  return (
    <Tag variant="moderate" size="small" data-color={tag.color}>
      {tag.name}
      <button
        type="button"
        aria-label={`Remove ${tag.name}`}
        onClick={() => onRemove(tag.name)}
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
