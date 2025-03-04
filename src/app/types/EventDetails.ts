

export type EventDetails = {
  eventId :string
  owner :string
  description :string
  date :string
  startTime :string | null
  endTime :string | null
  name :string

}

export type EventPanelDetails  = EventDetails & {
  hasWriteAccess : boolean
}
