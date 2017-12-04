import TasksList from './components/TasksList.vue'
import TasksComplete from './components/TasksComplete.vue'
import TaskNew from './components/TaskNew.vue'
import Playground from './playground/playground.vue'

export const routes = [
  { path:'/taskslist', name:'list', component: TasksList },
  { path:'/taskscomplete', name:'complete', component: TasksComplete, props: true },
  { path:'/tasknew', name:'new', component: TaskNew },
  { path:'/playground', name:'playground', component: Playground }
]