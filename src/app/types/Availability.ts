export type AvailableBlock = {
  start :string
  end :string
}

export type Availability = {
  [key :string] : AvailableBlock | null
}
