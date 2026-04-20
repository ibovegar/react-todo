import { TrashIcon } from '@navikt/aksel-icons'
import { Button, HStack, Select, Tag, TextField, VStack } from '@navikt/ds-react'
import { Form, useLoaderData } from 'react-router'

import { createTag as createTagApi, deleteTag as deleteTagApi, getTags } from '~/api'
import type { TagColor, TodoTag } from '~/models'
import { toAkselColor } from '~/utils'

export async function loader() {
  const tags = await getTags()
  return { tags }
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  if (intent === 'create') {
    const name = formData.get('name') as string
    const color = formData.get('color') as TagColor
    if (name?.trim()) {
      await createTagApi({ name: name.trim().toLowerCase(), color })
    }
  }

  if (intent === 'delete') {
    const id = formData.get('id') as string
    await deleteTagApi(id)
  }

  return { ok: true }
}

const colorOptions: { value: TagColor; label: string }[] = [
  { value: 'color_1', label: 'Neutral' },
  { value: 'color_2', label: 'Accent' },
  { value: 'color_3', label: 'Info' },
  { value: 'color_4', label: 'Success' },
  { value: 'color_5', label: 'Warning' },
  { value: 'color_6', label: 'Danger' },
  { value: 'color_7', label: 'Magenta' },
  { value: 'color_8', label: 'Beige' },
  { value: 'color_9', label: 'Blue' },
  { value: 'color_10', label: 'Purple' },
  { value: 'color_11', label: 'Lime' },
]

const TagsSettings = () => {
  const { tags } = useLoaderData<typeof loader>()

  return (
    <VStack gap="space-8">
      <Form method="post">
        <input type="hidden" name="intent" value="create" />
        <HStack gap="space-4" align="end" wrap>
          <TextField label="Tag name" name="name" size="small" />
          <Select label="Color" name="color" size="small">
            {colorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          <Button type="submit" variant="secondary" size="small">
            Add tag
          </Button>
        </HStack>
      </Form>

      <HStack gap="space-4" wrap>
        {tags.map((tag: TodoTag) => (
          <Form key={tag.id} method="post">
            <input type="hidden" name="intent" value="delete" />
            <input type="hidden" name="id" value={tag.id} />
            <Tag variant="moderate" data-color={toAkselColor(tag.color)}>
              {tag.name}
              <button
                type="submit"
                aria-label={`Remove ${tag.name}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
              >
                <TrashIcon aria-hidden />
              </button>
            </Tag>
          </Form>
        ))}
      </HStack>
    </VStack>
  )
}

export default TagsSettings
