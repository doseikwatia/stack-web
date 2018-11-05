<template>
    <div >
        <v-dialog v-model="visible" persistent max-width="700px">
            <v-card>
            <v-card-title primary-title><span class="headline">{{title}}</span></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container fluid grid-list-xs>
                    <v-layout column>
                        <v-flex>
                            <v-text-field v-model="title" required label="Title" counter :rules="[rules.lessThanOrEqualTo50Chars]"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-textarea v-model="description" required label="Description"></v-textarea>
                        </v-flex>
                        <v-flex v-show="!task.tasks || task.tasks.length ==0">
                            <v-subheader class="pl-0">Progress</v-subheader>
                            <v-slider v-model="progress" thumb-label="always"></v-slider>
                        </v-flex>
                        <v-flex>
                          <v-datetime-picker v-show="!isNaN(dueDate.getTime())" label="Due date" v-model="dueDate"> </v-datetime-picker>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close">Cancel</v-btn>
                <v-btn @click="save">Save</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
  name: "TaskEditor",
  model: {
    prop: "task",
    event: "change"
  },
  props: {
    task: Object
  },
  data: function() {
    return {
      title: "",
      description: "",
      progress: 0,
      dueDate: new Date(),
      visible: false,
      rules:{
          lessThanOrEqualTo50Chars: value=>{
              return value.length > 50 ? "length should be less than or equal to 50":"";
          },
      }
    };
  },
  methods: {
    save: function() {
      this.$emit("change",{
        id : this.task.id,
        title: this.title,
        description: this.description,
        progress: this.progress,
        dueDate: this.dueDate.getTime()
      });
      this.close();
    },
    close: function() {
      this.visible = false;
    },
    show: function() {
      this.visible = true;
    }
  },
  watch: {
    task: function(newTask, oldTask) {
      this.title = newTask.title;
      this.progress = newTask.progress;
      this.description = newTask.description;
      this.dueDate = new Date(newTask.dueDate);
    }
  }
};
</script>

