import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export function Droppable(props: { id: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg shadow-md ${
        isOver ? 'bg-white' : 'bg-gray-100'
      }`}
    >
      {props.children}
    </div>
  )
}
