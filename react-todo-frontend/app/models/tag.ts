export type TagColor =
  | 'neutral'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'brand-magenta'
  | 'brand-beige'
  | 'brand-blue'
  | 'meta-purple'
  | 'meta-lime'

export interface TodoTag {
  name: string
  color: TagColor
}
