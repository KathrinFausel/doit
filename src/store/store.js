import {reactive} from 'vue'

export const store = reactive({
  tasks: [],
  areTasksAvailable: true,
  archiveTasks: [],
  openTasks: [],
  completedTasks: [],
  setTasks(tasks) {
    if (tasks.length > 0) {
      this.areTasksAvailable = true;
      this.tasks = [...tasks]
      // sort open todos at the top
      this.tasks.sort(function (x, y) {
        return Number(x.completed) - Number(y.completed)
      })
      this.tasks.forEach(task =>
        task.completed ? this.completedTasks.push(task) : this.openTasks.push(task))
    } else {
      this.areTasksAvailable = false;
    }
  },
  editTask(id, newTitle) {
    const index = this.tasks.findIndex(obj => obj.id === id)
    this.tasks[index].title = newTitle
  },
  deleteTask(id, isArichveRoute) {
    let index = -1
    if (isArichveRoute) {
      index = this.archiveTasks.findIndex(obj => obj.id === id);
    } else {
      index = this.tasks.findIndex(obj => obj.id === id)
    }
    isArichveRoute ? this.archiveTasks.splice(index, 1) : this.tasks.splice(index, 1)
    this.completedTasks = []
    this.openTasks= []
    this.tasks.forEach(task =>
      task.completed ? this.completedTasks.push(task) : this.openTasks.push(task))
  },
  addTask(task) {
    this.tasks = [{
      "userId": 1,
      "id": (this.tasks[this.tasks.length - 1].id + 1),
      "title": task.toString(),
      "completed": false
    }, ...this.tasks]
    // sort open todos at the top
    this.tasks.sort(function (x, y) {
      return Number(x.completed) - Number(y.completed);
    })
    this.tasks.forEach(task =>
      task.completed ? this.completedTasks.push(task) : this.openTasks.push(task))
    this.completedTasks.push({
      "userId": 1,
      "id": (this.tasks[this.tasks.length - 1].id + 1),
      "title": task.toString(),
      "completed": false
    })
  },
  changeCompletionStatus(id) {
    const index = this.tasks.findIndex(obj => obj.id === id)
    this.tasks[index].completed = !this.tasks[index].completed
    // sort open todos at the top
    this.tasks.sort(function (x, y) {
      return Number(x.completed) - Number(y.completed)
    })
    this.completedTasks = []
    this.openTasks= []
    this.tasks.forEach(task =>
      task.completed ? this.completedTasks.push(task) : this.openTasks.push(task))
  },
  archiveTask(id) {
    const index = this.tasks.findIndex(obj => obj.id === id)
    this.archiveTasks.push(this.tasks[index])
    this.tasks.splice(index, 1)
    this.completedTasks = []
    this.openTasks= []
    this.tasks.forEach(task =>
      task.completed ? this.completedTasks.push(task) : this.openTasks.push(task))
  },
  restoreTask(id) {
    const index = this.archiveTasks.findIndex(obj => obj.id === id)
    this.tasks.unshift(this.archiveTasks[index])
    // sort open todos at the top
    this.tasks.sort(function (x, y) {
      return Number(x.completed) - Number(y.completed)
    });
    this.archiveTasks.splice(index, 1)
    this.completedTasks = []
    this.openTasks= []
    this.tasks.forEach(task =>
      task.completed ? this.completedTasks.push(task) : this.openTasks.push(task))
  }
})
