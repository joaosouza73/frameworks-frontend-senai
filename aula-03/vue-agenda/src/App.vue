<script setup>
import { computed, ref, watch } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const STORAGE_KEY = 'ritmo-agenda-vue-v1'
const filters = [
  { id: 'todas', label: 'Todas' },
  { id: 'abertas', label: 'Em andamento' },
  { id: 'concluidas', label: 'Concluídas' },
]

function readTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const tasks = ref(readTasks())
const filter = ref('todas')
const openCount = computed(() => tasks.value.filter((task) => !task.done).length)
const completedCount = computed(() => tasks.value.length - openCount.value)
const visibleTasks = computed(() => tasks.value.filter((task) => (
  filter.value === 'todas'
  || (filter.value === 'abertas' && !task.done)
  || (filter.value === 'concluidas' && task.done)
)))

watch(tasks, (value) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) } catch { /* armazenamento local é opcional */ }
}, { deep: true })

function addTask(task) {
  tasks.value.unshift({ ...task, id: crypto.randomUUID(), done: false })
}

function toggleTask(id) {
  const task = tasks.value.find((item) => item.id === id)
  if (task) task.done = !task.done
}

function deleteTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <main class="page-shell">
    <header class="topbar"><a class="wordmark" href="#inicio"><span class="brand-icon">r</span> ritmo<span class="wordmark-dot">.</span></a><span class="topbar-note">Seu semestre, no seu ritmo.</span></header>
    <section id="inicio" class="intro">
      <div><p class="eyebrow">AGENDA ACADÊMICA</p><h1>Um passo de cada vez<span>.</span></h1><p class="intro-copy">Reúna entregas, aulas e ideias. O que importa hoje fica mais fácil de enxergar.</p></div>
      <div class="date-card"><span>ATIVIDADES ABERTAS</span><strong>{{ String(openCount).padStart(2, '0') }}</strong><small>{{ completedCount }} concluída{{ completedCount === 1 ? '' : 's' }}</small></div>
    </section>
    <section class="panel" aria-labelledby="new-task-title">
      <div class="section-title"><div><p class="eyebrow">PLANEJAMENTO</p><h2 id="new-task-title">Adicionar atividade</h2></div><span class="section-number">01</span></div>
      <TaskForm @add="addTask" />
    </section>
    <section class="task-section" aria-labelledby="task-list-title">
      <div class="task-heading"><div><p class="eyebrow">SUA ROTINA</p><h2 id="task-list-title">Lista de atividades <span>({{ visibleTasks.length }})</span></h2></div>
        <div class="filter-tabs" role="group" aria-label="Filtrar atividades"><button v-for="item in filters" :key="item.id" type="button" :class="{ active: filter === item.id }" :aria-pressed="filter === item.id" @click="filter = item.id">{{ item.label }}</button></div>
      </div>
      <TaskList :tasks="visibleTasks" @toggle="toggleTask" @delete="deleteTask" />
    </section>
    <footer class="footer"><span>Ritmo · organização acadêmica</span><span>Seus dados ficam salvos neste navegador.</span></footer>
  </main>
</template>
