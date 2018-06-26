<template>
  <div id="app">
    <v-navigation-drawer 
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <!--project list-->
      <v-list dense>
        <project-item v-for="project in projects" :key="project.id" :project="project"  @selected="handleProjectItemClicked"
          @projectChanged="handleProjectChanged"></project-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar  
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Stack Web</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn v-if="hasChnages" icon @click="save">
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-menu offset-y>
        <v-btn icon large slot="activator">
          <v-avatar size="32px" tile>
            <img v-if="user" :src="user.photoURL">
          </v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in useritems" :key="item.id" :to="item.path">
            <v-list-tile-title >{{item.title}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap>
          <v-flex xs6 offset-xs2>
            <div v-if="currentProject">
            <span class="overall-project-title">{{currentProject.name}}</span>
            <v-progress-circular class="overall-project-progress" :size="40" :width="5" :value="currentProject.root.progress" :color="progressColor">
              {{currentProject.root.progress }}
            </v-progress-circular>
            </div>
          </v-flex>
          <!-- Task List -->
          <v-flex  xs12>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-speed-dial
      bottom
      left
      fixed
      open-on-hover
      transition="slide-y-reverse-transition"
    >
    <v-btn fab color="pink" dark slot="activator">
      <v-icon>add</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn fab  color="blue" dark small @click.stop="handleCreateNewProject"> 
      <v-icon>book</v-icon>
    </v-btn>
    <v-btn fab  color="blue" dark small @click.stop="handleCreateNewProjectTask"> 
      <v-icon>note_add</v-icon>
    </v-btn>
    </v-speed-dial>
</div>
</template>

<script>
import Project from "./stack/Project";
import { PJT_MODIFY, PJT_DELETE } from "./stack/Project";
import { mapGetters } from "vuex";
import { newProject, newTask, progressColor } from "../helpers";
export default {
  name: "Home",
  components: {
    "project-item": Project
  },
  data: () => ({
    dialog: false,
    drawer: null,
    useritems: [{ title: "Logout", path: { name: "Logout" } }],
    currentProject: null
  }),
  methods: {
    handleProjectChanged: function(payload) {
      let project = payload.project;
      switch (payload.type) {
        case PJT_MODIFY:
          this.projects.filter(pjt => pjt.id == project.id)[0].name =
            project.name;
          break;
        case PJT_DELETE:
          this.$store.commit("deleteProject", project);
          break;
      }
    },
    handleCreateNewProject: function() {
      let project = newProject();
      let cmpt = this;
      this.$store.dispatch("addProject", project).then(function() {
        cmpt.handleProjectItemClicked(project);
        cmpt.$router.push({
          name: "TaskList",
          params: { projectID: project.id }
        });
      });
    },
    handleProjectItemClicked: function(selectedProject) {
      this.currentProject = this.$store.getters.getProject(selectedProject.id);
    },
    handleCreateNewProjectTask: function() {
      if (this.currentProject == null) {
        return;
      }
      let payload = {
        projectID: this.currentProject.id,
        task: newTask(this.currentProject.root.id)
      };
      this.$store.commit("addProjectTask", payload);
    },
    save: function() {
      this.$store.dispatch("uploadProjects");
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: "isloggedIn",
      user: "user",
      projects: "projects",
      hasChnages: "hasChanges"
    }),
    progressColor: function() {
      if (this.currentProject == null) {
        return "red";
      }
      return progressColor(this.currentProject.root.progress);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(cmpt => {
      if (!cmpt.loggedIn) {
        //If user is not logged in go to the authentication page
        cmpt.$router.push({ name: "Login" });
      }
    });
  }
};
</script>

<style scoped>
.overall-project-title {
  font-size: 24pt;
  font-weight: bold;
}
.overall-project-progress {
  margin-left: 50px;
}
</style>
