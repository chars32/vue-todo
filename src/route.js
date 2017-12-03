import TasksList from './components/TasksList.vue'
import TasksComplete from './components/TasksComplete.vue'
import TaskNew from './components/TaskNew.vue'
import Playground from './playground/playground.vue'

export const routes = [
  { path:'/taskslist', component: TasksList },
  { path:'/taskscomplete', name:'complete', component: TasksComplete },
  { path:'/tasknew', component: TaskNew },
  { path:'/playground', component: Playground }
]