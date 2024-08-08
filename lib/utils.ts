import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  const now = new Date()
  const inputDate = new Date(date)

  const diff = now.getTime() - inputDate.getTime()
  const diffMinutes = Math.floor(diff / 1000 / 60)
  const diffHours = Math.floor(diff / 1000 / 60 / 60)

  const isToday = now.toDateString() === inputDate.toDateString()
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    inputDate.toDateString()

  if (isToday) {
    if (diffMinutes < 60) {
      return `${diffMinutes} mins ago`
    }
    return "Today"
  } else if (isYesterday) {
    return "Yesterday"
  } else {
    const month = inputDate.getMonth() + 1
    const day = inputDate.getDate()
    const year = inputDate.getFullYear()
    return `${day}/${month}/${year}`
  }
}
