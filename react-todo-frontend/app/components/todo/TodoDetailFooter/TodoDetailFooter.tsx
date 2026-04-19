import { ArrowUndoIcon, CheckmarkCircleIcon, TagIcon, TrashIcon } from '@navikt/aksel-icons'
import { Button, HStack } from '@navikt/ds-react'
import type { Todo } from '~/api'

interface TodoDetailFooterProps {
  todo?: Todo
  isSubmitting: boolean
  isDeleting: boolean
  onDelete: () => void
  onToggleDone: () => void
  onToggleTags: () => void
  onCreate: () => void
  onClose: () => void
}

export const TodoDetailFooter = (props: TodoDetailFooterProps) => {
  const { todo, isSubmitting, isDeleting, onDelete, onToggleDone, onToggleTags, onCreate, onClose } = props
  const isCreateMode = !todo

  return (
    <HStack gap="space-4" justify="space-between">
      <HStack gap="space-2">
        {!isCreateMode && (
          <>
            <Button
              variant="tertiary-neutral"
              size="small"
              icon={<TrashIcon aria-hidden />}
              loading={isDeleting}
              onClick={onDelete}
              title="Delete"
            />
            <Button
              variant="tertiary-neutral"
              size="small"
              icon={todo.done ? <ArrowUndoIcon aria-hidden /> : <CheckmarkCircleIcon aria-hidden />}
              loading={isSubmitting}
              onClick={onToggleDone}
              title={todo.done ? 'Reopen' : 'Mark as finished'}
            />
          </>
        )}
        <Button
          variant="tertiary-neutral"
          size="small"
          icon={<TagIcon aria-hidden />}
          onClick={onToggleTags}
          title="Add tag"
        />
      </HStack>
      <HStack gap="space-2">
        {isCreateMode && (
          <Button variant="primary" size="small" loading={isSubmitting} onClick={onCreate}>
            Create
          </Button>
        )}
        <Button variant="secondary" size="small" onClick={onClose}>
          Close
        </Button>
      </HStack>
    </HStack>
  )
}
