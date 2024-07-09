import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import toast from 'react-hot-toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = async (err: any) => {
  console.log('ShritCodeError: ', err)
  const errorMessage =
    err.message || String(err) || 'An unexpected error occurred'

  toast.error(errorMessage)
}

export function getFromAndTo(page: number, itemPerPage: number) {
  let from = page * itemPerPage
  let to = from + itemPerPage

  if (page > 0) {
    from += 1
  }
  return { from, to }
}
