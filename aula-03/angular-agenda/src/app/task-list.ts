import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
})
export class TaskList {
  @Input() tasks: Task[] = [];
  @Output() toggle = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  protected formatDueDate(value: string): string {
    return value
      ? new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(new Date(`${value}T12:00:00`))
      : 'Sem prazo';
  }
}
