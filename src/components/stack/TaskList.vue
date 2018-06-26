<template>
    <div>
        <div>
          
            <task-item v-for="taskitem in tasklist" :task="taskitem" :key="taskitem.id" @edit="editTask" @add="addTask" @delete="deleteTask"></task-item>
  
        </div>
        <task-editor :task="currentTask" @change="currentTaskChange" ref="taskEditor"></task-editor>
    </div>
</template>
<script>
import Task from "./Task";
import TaskEditor from "./TaskEditor";
import { newTask } from "../../helpers";
export default {
  name: "TaskList",

  components: {
    "task-item": Task,
    "task-editor": TaskEditor
  },
  data: function() {
    return {
      currentTask: {}
    };
  },
  computed: {
    tasklist: function() {
      let project = this.$store.getters.getProject(this.projectID);
      if (!project) {
        return [];
      }
      return project.root.tasks || [];
    },
    projectID: function() {
      return this.$route.params.projectID;
    }
  },
  methods: {
    currentTaskChange: function(changedTask) {
      let payload = { projectID: this.projectID, task: changedTask };
      this.$store.commit("updateProjectTask", payload);
    },
    editTask: function(currentTask) {
      this.currentTask = currentTask;
      this.$refs.taskEditor.show();
    },
    deleteTask: function(task) {
      let payload = { projectID: this.projectID, task: task };
      this.$store.commit("deleteProjectTask", payload);
    },
    addTask: function(task) {
      let payload = { projectID: this.projectID, task: newTask(task.id) };
      this.$store.commit("addProjectTask", payload);
    }
  }
};
</script>
<style scopped>
</style>