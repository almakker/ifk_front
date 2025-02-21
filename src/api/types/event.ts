export interface HotelEventUser {
  id: number
  name: string
}

export interface HotelEvent {
  id: number
  datetime: string
  user: HotelEventUser
  event_type: string
  event_info: string
  booking?: {
    id: number
    room_number: string
    check_in: string
    check_out: string
    status: string
    hotel: {
      id: number
      name: string
      address: string
    }
    customers: Array<{
      id: number
      name: string
      email: string
      phone: string
      is_main: number
    }>
  }
}

export interface HotelEventFilters {
  dateRange?: [string, string] | undefined
  userId?: number | undefined
  eventType?: string | undefined
  page: number
  perPage: number
  sortBy?: string | undefined
  sortDesc?: boolean | undefined
}

export interface HotelEventResponse {
  data: HotelEvent[]
  meta: {
    total: [number, number]
    current_page: number
    from: number
    last_page: number
    per_page: string
    to: number
  }
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
}

export interface TablePagination {
  page: number
  rowsPerPage: number
  sortBy: string
  descending: boolean
  rowsNumber: number
}

export interface QTableRequestProps {
  pagination: Partial<TablePagination>
}