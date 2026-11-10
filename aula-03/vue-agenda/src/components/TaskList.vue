<script setup>
import TaskItem from './TaskItem.vue'

defineProps({ tasks: { type: Array, required: true } })
defineEmits(['toggle', 'delete'])
</script>

<template>
  <ul v-if="tasks.length" class="task-list"><TaskItem v-for="task in tasks" :key="task.id" :task="task" @toggle="$emit('toggle', $event)" @delete="$emit('delete', $event)" /></ul>
  <div v-else class="empty-state"><span aria-hidden="true">✳</span><strong>Nenhuma atividade por aqui</strong><p>Adicione uma tarefa ou escolha outro filtro.</p></div>
</template>
