import { Component, signal } from '@angular/core';
import { Task, TaskDraft } from './task.model';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';

@Component({
  imports: [TaskForm, TaskList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly filters = [
    { id: 'todas', label: 'Todas' },
    { id: 'abertas', label: 'Em andamento' },
    { id: 'concluidas', label: 'Concluídas' },
  ];
  protected readonly tasks = signal<Task[]>(this.readTasks());
  protected readonly filter = signal('todas');
  protected readonly openCount = () => this.tasks().filter((task) => !task.done).length;
  protected readonly completedCount = () => this.tasks().length - this.openCount();
  protected readonly visibleTasks = () => this.tasks().filter((task) => (
    this.filter() === 'todas'
    || (this.filter() === 'abertas' && !task.done)
    || (this.filter() === 'concluidas' && task.done)
  ));

  protected addTask(draft: TaskDraft): void {
    this.updateTasks([{ ...draft, id: crypto.randomUUID(), done: false }, ...this.tasks()]);
  }

  protected toggleTask(id: string): void {
    this.updateTasks(this.tasks().map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  protected deleteTask(id: string): void {
    this.updateTasks(this.tasks().filter((task) => task.id !== id));
  }

  protected setFilter(id: string): void {
    this.filter.set(id);
  }

  private readTasks(): Task[] {
    try {
      const value: unknown = JSON.parse(localStorage.getItem('ritmo-agenda-angular-v1') || '[]');
      return Array.isArray(value) ? value as Task[] : [];
    } catch {
      return [];
    }
  }

  private updateTasks(value: Task[]): void {
    this.tasks.set(value);
    try {
      localStorage.setItem('ritmo-agenda-angular-v1', JSON.stringify(value));
    } catch {
      // A lista continua funcional quando o navegador bloqueia o armazenamento.
    }
  }
}
