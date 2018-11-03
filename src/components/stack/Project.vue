<template>
    <v-list-tile @click="$emit('selected',project)"   @mouseover="showactions=true" @mouseleave="showactions=false" :to="{name:'TaskList',params:{projectID:project.id}}">
        <v-list-tile-title  >
            <span v-if="!edit" @dblclick="handleEditClicked">{{project.name}}</span>
            <v-text-field v-else type="text" :value="project.name" required autofocus
                @keyup.enter="handleEditClicked"  ref="inputField"></v-text-field>
        </v-list-tile-title>
        <v-list-tile-action v-show="showactions">
          <v-btn icon ripple @click="handleEditClicked">
            <v-icon color="grey lighten-1">edit</v-icon>
          </v-btn>
         </v-list-tile-action>
         <v-list-tile-action  v-show="showactions">
          <v-btn icon ripple @click="handleDeleteClicked">
            <v-icon color="red lighten-1">delete</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action>
          <v-progress-circular :size="30" :width="3" :value="project.root.progress" :color="progressColor">
              {{project.root.progress }}
          </v-progress-circular>
        </v-list-tile-action>
    </v-list-tile>
</template> 

<script>
import { progressColor } from "../../helpers";
export const PJT_MODIFY = "modify";
export const PJT_DELETE = "delete";
export default {
  name: "Project",
  props: { project: Object },
  data() {
    return {
      edit: false,
      showactions: false,
      tmpProjectName:this.project.name,
    };
  },
  computed:{
    progressColor: function(){
       return progressColor(this.project.root.progress)
    }
  },
  methods: {
    handleEditClicked: function(event) {
      this.edit = !this.edit;

      let projectname = !this.edit ? this.$refs.inputField.$refs.input.value : ""; //extra logic to ensure that inputfield is on the dom
      if (projectname.trim() != "") {
        //propagating changes to parent after it has been edited
        this.emitPropertyChanged({
          type: PJT_MODIFY,
          project: { id: this.project.id, name: projectname }
        });
      }
    },
    handleDeleteClicked: function(event) {
      this.emitPropertyChanged({ type: PJT_DELETE, project: this.project });
    },
    emitPropertyChanged: function(payload) {
      this.$emit("projectChanged", payload);
    }
  }
};
</script>