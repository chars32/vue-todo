import TasksList from './components/TasksList.vue'
import Taskscomplete from './components/TasksComplete.vue'
import Playground from './playground/playground.vue'

export const routes = [
  { path:'/taskslist', component: TasksList },
  { path:'/taskscomplete', component: Taskscomplete },
  { path:'/playground', component: Playground }
]