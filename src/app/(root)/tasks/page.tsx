'use client'
import React, { useState } from 'react'
import { DndContext } from '@dnd-kit/core'

import { Droppable } from '@/components/Droppable'
import { Draggable } from '@/components/Draggable'

const Page = () => {
  const columns = ['To Do', 'In Progress', 'Done']
  const [tasks, setTasks] = useState({
    'To Do': ['Task 1', 'Task 2'],
    'In Progress': ['Task 3'],
    Done: ['Task 4'],
  })

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event
    if (over) {
      const fromColumn = findColumnContainingTask(active.id)
      const toColumn = over.id

      if (fromColumn !== toColumn) {
        setTasks((prevTasks) => {
          const fromColumnTasks = [...prevTasks[fromColumn]]
          const toColumnTasks = [...prevTasks[toColumn]]
          const taskIndex = fromColumnTasks.indexOf(active.id)
          const [movedTask] = fromColumnTasks.splice(taskIndex, 1)
          toColumnTasks.push(movedTask)

          return {
            ...prevTasks,
            [fromColumn]: fromColumnTasks,
            [toColumn]: toColumnTasks,
          }
        })
      }
    }
  }

  const findColumnContainingTask = (taskId: string) => {
    return columns.find((column) => tasks[column].includes(taskId)) || ''
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex space-x-4 p-4 mx-auto'>
        {columns.map((column) => (
          <Droppable key={column} id={column}>
            <div className='bg-gray-200 p-4 rounded-md shadow-md w-64'>
              <h2 className='text-lg font-semibold mb-2 text-gray-900'>
                {column}
              </h2>
              {tasks[column].map((task) => (
                <Draggable key={task} id={task}>
                  <div className='bg-blue-500 p-2 mb-2 rounded-md shadow cursor-pointer text-white'>
                    {task}
                  </div>
                </Draggable>
              ))}
            </div>
          </Droppable>
        ))}
      </div>
    </DndContext>
  )
}

export default Page
