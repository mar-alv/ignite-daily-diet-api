import dayJs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayJs.extend(utc)
dayJs.extend(timezone)

export const dayjs = {
  toDate(value?: string) {
    if (!value) return undefined

    return dayJs(value).format()
  },
}
