import Vue from 'vue'

export function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
export function nextID() {
  let result = new Date().getTime();
  wait(5);
  return result
}
export function newProject() {
  let project = {
    id: nextID(),
    name: "new project",
    root: newTask(null),
  }
  project.root.isroot = true;
  project.root.tasks.push(newTask(project.root.id))
  project.root.title = "root"
  project.root.description = "project level"
  return project
}
export function newTask(parentId) {
  let task = {
    id: nextID(),
    parentId: parentId,
    title: "new task",
    description: "description",
    progress: 1,
    dueDate: new Date().getTime(),
    tasks: []
  }
  return task
}
export function alignTaskProgress(projects, projectID, taskID) {
  let currentTask = getProjectTask(projects, projectID, taskID)
  while (currentTask !=null && (currentTask.isroot||currentTask.parentId != null)) {
    let subtasks = currentTask.tasks || [];
    let length = subtasks.length;
    if (length != 0) {
      let totalProgress = 0;
      subtasks.forEach(t => {
        totalProgress += t.progress;
      });
      Vue.set(currentTask,'progress', Math.floor(totalProgress / length));
    }
    currentTask = getProjectTask(projects, projectID, currentTask.parentId)
  }
}

export function getProjectTask(projects, projectID, taskID) {
  let tprojects = projects.filter(pjt => pjt.id == projectID)
  let project = tprojects.length > 0 ? tprojects[0] : null;
  if (project == null) {
    return null;
  }
  let queue = [];
  let visited = [];
  queue.push(project.root);
  while (queue.length != 0) {
    let task = queue.pop()
    if (task.id === taskID) {
      return task;
    }
    if (visited.find(el => { return el.id === task.id && el.title === task.title && el.description === task.description; }) != undefined) {
      continue
    }
    if (task.tasks != null && task.tasks.length > 0) {
      queue.push(...task.tasks)
    }
    visited.push(task)
  }
  return null;
}
export function progressColor(progress) {
  let green = (255 * progress) / 100;
  let red = 255 - green;
  return "rgba(" + red + "," + green + " , 0, 1)";
}
