export interface TaskDraft {
  title: string;
  subject: string;
  dueDate: string;
}

export interface Task extends TaskDraft {
  id: string;
  done: boolean;
}
