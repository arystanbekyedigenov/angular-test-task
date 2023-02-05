import {Task} from './Task'

export const TASKS: Task[] = [
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'May 5th at 2:30',
        reminder: true,
        status: 'todo',
    },
    {
        id: 2,
        text: 'Cleaning Service',
        day: 'June 21st at 2:30',
        reminder: false, 
        status: 'inprogress',
    },
    {
        id: 3,
        text: 'Car Wash',
        day: 'April 12th at 2:30',
        reminder: true, 
        status: 'done',
    }
]