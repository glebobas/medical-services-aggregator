import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid'
import { PlusIcon as PlusIconOutline } from '@heroicons/react/24/outline'

export default function AddButton() {
  return (
    <>
      <button
        type="button"
        className="ml-2 inline-flex items-center rounded-full border border-transparent bg-green-600 p-1 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <PlusIconMini className="h-3 w-3" aria-hidden="true" />
      </button>
    </>
  )
}