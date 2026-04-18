import { PlusIcon } from '@navikt/aksel-icons'
import { Button, Popover } from '@navikt/ds-react'
import { useRef, useState } from 'react'
import { TagCloud } from '../TagCloud'

import type { TodoTag } from '~/api'

interface TagPickerProps {
  unusedTags: TodoTag[]
  hasExistingTags: boolean
  onAdd: (tag: TodoTag) => void
}

export function TagPicker(props: TagPickerProps) {
  const { unusedTags, hasExistingTags, onAdd } = props
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  function handleAdd(tag: TodoTag) {
    onAdd(tag)
    buttonRef.current?.focus()
    setOpen(false)
  }

  return (
    <>
      <Button
        ref={buttonRef}
        variant={hasExistingTags ? 'tertiary' : 'secondary'}
        size="small"
        icon={<PlusIcon title="Add tag" />}
        onClick={() => setOpen(!open)}
      >
        {hasExistingTags ? undefined : 'Add tag'}
      </Button>
      <Popover open={open} onClose={() => setOpen(false)} anchorEl={buttonRef.current}>
        <Popover.Content style={{ maxWidth: '300px' }}>
          <TagCloud tags={unusedTags} onSelect={handleAdd} />
        </Popover.Content>
      </Popover>
    </>
  )
}
