import type { TodoTag } from './tag'

export interface Todo {
  id: string
  title: string
  description: string
  done: boolean
  tags: TodoTag[]
  createdAt: string
}
