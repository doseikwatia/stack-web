<template>
  <div >
      <v-layout row  wrap  align-center  > 
        <v-flex xs12>
    <v-card class="taskitem" @dblclick="$emit('edit',task)" >
      <v-layout align-center>
        <v-flex xs1 >
            <v-btn v-if="expanded && task.tasks!=null && task.tasks.length > 0" icon ripple @click="expanded=false">
              <v-icon >expand_less</v-icon>
            </v-btn>
            <v-btn v-else-if="!expanded &&  task.tasks!=null && task.tasks.length > 0" icon ripple @click="expanded=true">
              <v-icon >expand_more</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs1>
            <v-progress-circular :size="40" :width="5" :value="task.progress" :color="progressColor">
              {{task.progress }}
            </v-progress-circular>
        </v-flex>
        <v-flex xs5>
          <v-card-title primary-title> 
            <span class="title">{{ task.title }}</span>
          </v-card-title>
        </v-flex>
        <v-flex xs2>
        <v-card-text>
          <span v-if="task.dueDate" v-bind:style="{color:task.dueDate <new Date().getTime()?'red':'green'}" ><span>Due </span><timeago  :datetime="task.dueDate" :autoUpdate="true"></timeago></span>
        </v-card-text>
        </v-flex>
        <v-flex xs2>
        <v-card-actions class="show-on-hover">
          <v-btn  icon ripple>
            <v-icon color="grey lighten-1" @click.stop="$emit('edit',task)">edit</v-icon>
          </v-btn>
          <v-btn icon ripple>
            <v-icon color="green" @click.stop="$emit('add',task); expanded=true">add</v-icon>
          </v-btn>
          <v-btn icon ripple @click.stop="$emit('delete',task)">
            <v-icon color="red">delete</v-icon>
          </v-btn>
        </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
    </v-flex>
      </v-layout>
      <v-flex xs12 v-if="expanded" class="subcontainer">
        <task-item v-for="subtask in task.tasks" :key="subtask.id" :task="subtask" @delete="deletet" @edit="edit"  @add="add"></task-item>
      </v-flex>
  </div>
</template>
<script>
import { progressColor } from "../../helpers";
export default {
  name: "task-item",
  props: {
    task: Object,
    subgroup: Boolean
  },
  data: function() {
    return {
      expanded: false
    };
  },
  computed: {
    progressColor: function() {
      if (this.task == null) {
        return "red";
      }
      return progressColor(this.task.progress);
    }
  },
  methods: {
    edit: function(task) {
      this.$emit("edit", task);
    },
    add: function(task) {
      this.$emit("add", task);
    },
    deletet: function(task) {
      this.$emit("delete", task);
    }
  }
};
</script>
<style scoped>
.taskitem {
  cursor: pointer;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.125);
  border-width: 1px;
  border-radius: 3px;
  padding: 4px;
  margin: 2px;
}
.taskitem .show-on-hover {
  display: none;
}
.taskitem:hover .show-on-hover {
  display: inline;
}
.subcontainer {
  margin: auto auto auto 25px;
}
.fullwidth {
  width: 750px;
}
</style>
