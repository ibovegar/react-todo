import { HStack, Textarea, TextField, VStack } from '@navikt/ds-react'
import { useEffect, useRef, useState } from 'react'
import { useFetcher } from 'react-router'
import { ExpandModal } from '../../shared/ExpandModal'
import { RemovableTag } from '../../tag/RemovableTag'
import { TagCloud } from '../../tag/TagCloud'
import { TodoDetailFooter } from '../TodoDetailFooter'
import styles from './TodoDetailDialog.module.css'

import { useAutoSave } from '~/hooks/use-auto-save'
import { useCardExpandAnimation } from '~/hooks/use-card-expand-animation'
import type { Todo, TodoTag } from '~/models'
import { getUnusedTags } from '~/utils'

interface TodoDetailDialogProps {
  todo?: Todo
  availableTags: TodoTag[]
  originElement: HTMLElement | null
  onClose: () => void
}

export const TodoDetailDialog = (props: TodoDetailDialogProps) => {
  const { todo, availableTags, originElement, onClose } = props
  const isCreateMode = !todo
  const fetcher = useFetcher()
  const deleteFetcher = useFetcher()
  const tagFetcher = useFetcher()
  const updateFetcher = useFetcher()
  const createSubmittedRef = useRef(false)
  const animation = useCardExpandAnimation(onClose)
  const [title, setTitle] = useState(todo?.title ?? '')
  const [description, setDescription] = useState(todo?.description ?? '')
  const [localTags, setLocalTags] = useState<TodoTag[]>(todo?.tags ?? [])
  const [showTagEditor, setShowTagEditor] = useState(false)
  const [shaking, setShaking] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const tags = todo?.tags ?? localTags
  const unusedTags = getUnusedTags(availableTags, tags)

  useAutoSave(
    (t, d) => {
      if (!todo) return
      if (t !== todo.title || d !== todo.description) {
        updateFetcher.submit({ intent: 'update', id: todo.id, title: t, description: d }, { method: 'post' })
      }
    },
    title,
    description,
    !isCreateMode
  )

  useEffect(() => {
    animation.open(originElement)
  }, [animation.open, originElement])

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      animation.close()
    }
  }, [fetcher.state, fetcher.data, animation.close])

  useEffect(() => {
    if (deleteFetcher.state === 'idle' && deleteFetcher.data) {
      animation.close()
    }
  }, [deleteFetcher.state, deleteFetcher.data, animation.close])

  useEffect(() => {
    if (isCreateMode && fetcher.state === 'idle' && createSubmittedRef.current) {
      createSubmittedRef.current = false
      animation.close()
    }
  }, [fetcher.state, animation.close, isCreateMode])

  function handleAddTag(tag: TodoTag) {
    if (tags.some((t) => t.id === tag.id)) return
    const newTags = [...tags, tag]
    if (todo) {
      tagFetcher.submit({ intent: 'addTag', id: todo.id, tags: JSON.stringify(newTags) }, { method: 'post' })
    } else {
      setLocalTags(newTags)
    }
  }

  function handleRemoveTag(tagId: string) {
    const newTags = tags.filter((t) => t.id !== tagId)
    if (todo) {
      tagFetcher.submit({ intent: 'addTag', id: todo.id, tags: JSON.stringify(newTags) }, { method: 'post' })
    } else {
      setLocalTags(newTags)
    }
  }

  function handleCreate() {
    if (!title.trim()) {
      setShaking(true)
      titleRef.current?.focus()
      setTimeout(() => setShaking(false), 400)
      return
    }
    createSubmittedRef.current = true
    fetcher.submit({ intent: 'create', title, description, tags: JSON.stringify(localTags) }, { method: 'post' })
  }

  function handleDelete() {
    if (!todo) return
    deleteFetcher.submit({ intent: 'delete', id: todo.id }, { method: 'post' })
  }

  function handleToggleDone() {
    if (!todo) return
    fetcher.submit({ intent: todo.done ? 'markOpen' : 'markDone', id: todo.id }, { method: 'post' })
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
        <TextField
          ref={titleRef}
          label="Title"
          size="small"
          hideLabel
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.borderlessInput} ${styles.title} ${shaking ? styles.shake : ''}`}
          placeholder="Title"
          autoFocus={isCreateMode}
        />
        <Textarea
          label="Description"
          size="small"
          hideLabel
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={4}
          className={styles.borderlessInput}
          placeholder="Add a description..."
        />
        {tags.length > 0 && (
          <HStack gap="space-2" wrap>
            {tags.map((tag) => (
              <RemovableTag key={tag.id} tag={tag} onRemove={handleRemoveTag} />
            ))}
          </HStack>
        )}
        {showTagEditor && unusedTags.length > 0 && (
          <TagCloud tags={unusedTags} disabledTags={unusedTags} onSelect={handleAddTag} />
        )}
        <TodoDetailFooter
          todo={todo}
          isSubmitting={fetcher.state !== 'idle'}
          isDeleting={deleteFetcher.state !== 'idle'}
          onDelete={handleDelete}
          onToggleDone={handleToggleDone}
          onToggleTags={() => setShowTagEditor((v) => !v)}
          onCreate={handleCreate}
          onClose={animation.close}
        />
      </VStack>
    </ExpandModal>
  )
}
