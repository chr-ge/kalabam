import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

export const formatDateTime = (date) => {
  return dayjs(date).format('MMM D YYYY, h:mm a')
}

export const formatDiffDuration = (start, end) => {
  const started = dayjs(start)
  const ended = dayjs(end)
  return dayjs.duration(ended.diff(started)).humanize()
}
