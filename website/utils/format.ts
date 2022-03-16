import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

export const formatDateTime = (date: string): string => {
  return dayjs(date).format('MMM D YYYY, h:mm a')
}

export const formatDiffDuration = (start: string, end: string): string => {
  const started = dayjs(start)
  const ended = dayjs(end)
  return dayjs.duration(ended.diff(started)).humanize()
}
