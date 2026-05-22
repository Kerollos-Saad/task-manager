import { computed, Injectable, signal } from '@angular/core';

export interface Task {
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSignal = signal<Task[]>([
    {
      id: 1,
      title: 'Learn Angular Basics',
      description: 'Understand components',
      completed: true,
      createdAt : new Date('2024-01-01'),
    },
    {
      id: 2,
      title: 'Learn Angular Advanced',
      description: 'Understand components',
      completed: false,
      createdAt : new Date('2025-12-07'),
    },
  ]);

  tasks = this.tasksSignal.asReadonly();

  completedTasks = computed(() => {
    return this.tasksSignal().filter((tasks) => tasks.completed);
  });

  activeTasks = computed(() => {
    return this.tasksSignal().filter((tasks) => !tasks.completed);
  })

  getTask(id: number){
    return this.tasks().find(task => task.id === id);
  }

  deleteTask(id: number){
    this.tasksSignal.update((tasks) => {
      return tasks.filter((task) => task.id !== id);
    });
  }

  addTask(title: string, description: string){
    const task = {
      id: this.tasks.length + 1,
      title,
      description,
      completed: false,
      createdAt: new Date()
    };

    this.tasksSignal.update((tasks) => [...tasks, task]);
  }
}


