export type TagColor =
  | 'color_1'
  | 'color_2'
  | 'color_3'
  | 'color_4'
  | 'color_5'
  | 'color_6'
  | 'color_7'
  | 'color_8'
  | 'color_9'
  | 'color_10'
  | 'color_11'

export interface TodoTag {
  id: string
  name: string
  color: TagColor
}
