<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])
const title = ref('')
const subject = ref('')
const dueDate = ref('')

function submit() {
  if (!title.value.trim()) return
  emit('add', { title: title.value.trim(), subject: subject.value.trim(), dueDate: dueDate.value })
  title.value = ''
  subject.value = ''
  dueDate.value = ''
}
</script>

<template>
  <form class="task-form" @submit.prevent="submit">
    <label class="field field-wide"><span>O que precisa fazer?</span><input v-model="title" placeholder="Ex.: revisar os componentes React" maxlength="100" required /></label>
    <label class="field"><span>Disciplina</span><input v-model="subject" placeholder="Ex.: Front-end" maxlength="40" /></label>
    <label class="field"><span>Prazo</span><input v-model="dueDate" type="date" /></label>
    <button class="add-button" type="submit">Adicionar atividade <span aria-hidden="true">+</span></button>
  </form>
</template>
