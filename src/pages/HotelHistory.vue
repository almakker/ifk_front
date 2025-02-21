<template>
  <q-page padding>
    <h2>Hotel History</h2>
    <div class="q-mb-md">
      <div class="row q-col-gutter-md">
        <!-- Date Range Filter -->
        <div class="col-12 col-md-4">
          <q-date v-model="dateRange" range filled label="Date Range" class="full-width" />
        </div>

        <!-- User Filter -->
        <div class="col-12 col-md-4">
          <q-select v-model="selectedUser" :options="users" option-label="name" option-value="id" filled label="User"
            clearable />
        </div>

        <!-- Event Type Filter -->
        <div class="col-12 col-md-4">
          <q-select v-model="selectedEventType" :options="eventTypes" filled label="Event Type" clearable />
        </div>
      </div>
    </div>

    <q-table v-model:pagination="pagination" :rows="events" :columns="columns" :loading="loading"
      :rows-per-page-options="[16]" row-key="id" @request="onRequest">
      <template v-slot:body-cell-datetime="props">
        <q-td :props="props">
          {{ formatDate(props.value) }}
        </q-td>
      </template>

      <template v-slot:body-cell-booking="props">
        <q-td :props="props">
          {{ props.row.booking?.room_number || '-' }}
        </q-td>
      </template>

      <template v-slot:body-cell-hotel="props">
        <q-td :props="props">
          {{ props.row.booking?.hotel?.name || '-' }}
        </q-td>
      </template>

      <template v-slot:body-cell-customer="props">
        <q-td :props="props">
          {{ getMainCustomerName(props.row.booking?.customers) }}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { date } from 'quasar'
import { hotelEventsApi } from 'src/api/event'
import type { HotelEvent, HotelEventFilters, TablePagination } from 'src/api/types/event'
import type { User } from 'src/api/types/auth'
import type { HotelEventUser } from 'src/api/types/event'

const events = ref<HotelEvent[]>([])
const loading = ref(false)
const users = ref<HotelEventUser[]>([])
const eventTypes = ref<string[]>([])
const dateRange = ref<{ from: string; to: string } | null>(null)
const selectedUser = ref<User | null>(null)
const selectedEventType = ref<string | null>(null)

const pagination = ref<TablePagination>({
  page: 1,
  rowsPerPage: 16,
  sortBy: 'datetime',
  descending: true,
  rowsNumber: 0
})

const columns = [
  {
    name: 'datetime',
    label: 'Date & Time',
    field: 'datetime',
    sortable: true,
    align: 'left' as const
  },
  {
    name: 'user',
    label: 'User',
    field: (row: HotelEvent) => row.user.name,
    sortable: false,
    align: 'left' as const
  },
  {
    name: 'event_type',
    label: 'Event',
    field: 'event_type',
    sortable: false,
    align: 'left' as const
  },
  {
    name: 'event_info',
    label: 'Information',
    field: 'event_info',
    sortable: false,
    align: 'left' as const
  },
  {
    name: 'booking',
    label: 'Room',
    field: 'booking',
    sortable: false,
    align: 'left' as const
  },
  {
    name: 'hotel',
    label: 'Hotel',
    field: 'booking',
    sortable: false,
    align: 'left' as const
  },
  {
    name: 'customer',
    label: 'Main Customer',
    field: 'booking',
    sortable: false,
    align: 'left' as const
  }
]

const formatDate = (value: string) => {
  return date.formatDate(value, 'YYYY-MM-DD HH:mm:ss')
}

const getMainCustomerName = (customers: Array<{ name: string; is_main: number }> | undefined) => {
  return customers?.find((c) => c.is_main)?.name || '-'
}

const fetchData = async () => {
  loading.value = true
  try {
    const filters: HotelEventFilters = {
      page: pagination.value.page,
      perPage: pagination.value.rowsPerPage,
      sortBy: pagination.value.sortBy,
      sortDesc: pagination.value.descending,
      dateRange: dateRange.value ? [dateRange.value.from, dateRange.value.to] : undefined,
      userId: selectedUser.value?.id,
      eventType: selectedEventType.value || undefined
    }

    const { data, meta } = await hotelEventsApi.getEvents(filters)
    events.value = data
    pagination.value.rowsNumber = meta.total[0]
    pagination.value.page = meta.current_page
  } catch (error) {
    console.error('Error fetching events:', error)
  } finally {
    loading.value = false
  }
}

const onRequest = async (props: { pagination: Partial<TablePagination> }) => {
  if (props.pagination) {
    pagination.value = {
      ...pagination.value,
      ...props.pagination
    }
    await fetchData()
  }
}

onMounted(async () => {
  try {
    const [usersData, typesData] = await Promise.all([
      hotelEventsApi.getUsers(),
      hotelEventsApi.getEventTypes()
    ])
    users.value = usersData
    eventTypes.value = typesData
    await fetchData()
  } catch (error) {
    console.error('Error loading initial data:', error)
  }
})

watch([dateRange, selectedUser, selectedEventType], () => {
  pagination.value.page = 1
  void fetchData()
})
</script>