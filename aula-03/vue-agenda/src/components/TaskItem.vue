<script setup>
defineProps({ task: { type: Object, required: true } })
defineEmits(['toggle', 'delete'])

function formatDueDate(value) {
  return value ? new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(new Date(`${value}T12:00:00`)) : 'Sem prazo'
}
</script>

<template>
  <li class="task-item" :class="{ 'is-done': task.done }">
    <button class="check-button" type="button" :aria-label="task.done ? `Reabrir: ${task.title}` : `Concluir: ${task.title}`" :aria-pressed="task.done" @click="$emit('toggle', task.id)"><span v-if="task.done" aria-hidden="true">✓</span></button>
    <div class="task-copy"><strong>{{ task.title }}</strong><span>{{ task.subject || 'Sem disciplina' }} <i aria-hidden="true">·</i> {{ formatDueDate(task.dueDate) }}</span></div>
    <button class="delete-button" type="button" :aria-label="`Excluir: ${task.title}`" @click="$emit('delete', task.id)">Excluir</button>
  </li>
</template>
