import { Component, EventEmitter, Output } from '@angular/core';
import { TaskDraft } from './task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
})
export class TaskForm {
  @Output() add = new EventEmitter<TaskDraft>();

  protected submit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const title = String(data.get('title') || '').trim();
    if (!title) return;

    this.add.emit({
      title,
      subject: String(data.get('subject') || '').trim(),
      dueDate: String(data.get('dueDate') || ''),
    });
    form.reset();
  }
}
