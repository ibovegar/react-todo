import { TrashIcon } from '@navikt/aksel-icons'
import { Button, HStack, Select, Tag, TextField, VStack } from '@navikt/ds-react'
import { Form, useLoaderData } from 'react-router'

import { createTag, deleteTag, getTags, type TagColor, type TodoTag } from '~/api'

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
      await createTag({ name: name.trim().toLowerCase(), color })
    }
  }

  if (intent === 'delete') {
    const name = formData.get('name') as string
    await deleteTag(name)
  }

  return { ok: true }
}

const colorOptions: { value: TagColor; label: string }[] = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'accent', label: 'Accent' },
  { value: 'info', label: 'Info' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'danger', label: 'Danger' },
  { value: 'brand-magenta', label: 'Magenta' },
  { value: 'brand-beige', label: 'Beige' },
  { value: 'brand-blue', label: 'Blue' },
  { value: 'meta-purple', label: 'Purple' },
  { value: 'meta-lime', label: 'Lime' },
]

export default function TagsSettings() {
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
          <Form key={tag.name} method="post">
            <input type="hidden" name="intent" value="delete" />
            <input type="hidden" name="name" value={tag.name} />
            <Tag variant="moderate" data-color={tag.color}>
              {tag.name}
              <button
                type="submit"
                aria-label={`Remove ${tag.name}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
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
