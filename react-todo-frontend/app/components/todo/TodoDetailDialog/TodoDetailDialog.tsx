import { BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react'
import { useEffect } from 'react'
import { useFetcher } from 'react-router'
import { ExpandModal } from '../../shared/ExpandModal'
import { TodoTagEditor } from '../TodoTagEditor'

import type { Todo, TodoTag } from '~/api'
import { useCardExpandAnimation } from '~/hooks/use-card-expand-animation'

interface TodoDetailDialogProps {
  todo: Todo
  availableTags: TodoTag[]
  originElement: HTMLElement | null
  onClose: () => void
}

export function TodoDetailDialog(props: TodoDetailDialogProps) {
  const { todo, availableTags, originElement, onClose } = props
  const fetcher = useFetcher()
  const tagFetcher = useFetcher()
  const isSubmitting = fetcher.state !== 'idle'
  const actionPath = todo.done ? '/finished' : '/?index'
  const animation = useCardExpandAnimation(onClose)

  useEffect(() => {
    animation.open(originElement)
  }, [animation.open, originElement])

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      animation.close()
    }
  }, [fetcher.state, fetcher.data, animation.close])

  function handleAddTag(tag: TodoTag) {
    if (todo.tags.some((t) => t.name === tag.name)) return
    const newTags = [...todo.tags, tag]
    tagFetcher.submit(
      { intent: 'addTag', id: todo.id, tags: JSON.stringify(newTags) },
      { method: 'post', action: actionPath }
    )
  }

  function handleRemoveTag(tagName: string) {
    const newTags = todo.tags.filter((t) => t.name !== tagName)
    tagFetcher.submit(
      { intent: 'addTag', id: todo.id, tags: JSON.stringify(newTags) },
      { method: 'post', action: actionPath }
    )
  }

  if (!animation.isOpen) return null

  return (
    <ExpandModal
      isClosing={animation.isClosing}
      animationStyle={animation.animationStyle}
      modalRef={animation.modalRef}
      onAnimationEnd={animation.onAnimationEnd}
      onClose={animation.close}
    >
      <VStack gap="space-12">
        <Heading size="medium">{todo.title}</Heading>
        <TodoTagEditor tags={todo.tags} availableTags={availableTags} onAdd={handleAddTag} onRemove={handleRemoveTag} />
        <BodyShort>{todo.description}</BodyShort>
        <HStack gap="space-4" justify="end">
          <Button variant="secondary" size="small" onClick={animation.close}>
            Close
          </Button>
          <Button
            variant="primary"
            size="small"
            loading={isSubmitting}
            onClick={() => fetcher.submit({ id: todo.id }, { method: 'post', action: actionPath })}
          >
            {todo.done ? 'Reopen' : 'Mark as finished'}
          </Button>
        </HStack>
      </VStack>
    </ExpandModal>
  )
}
