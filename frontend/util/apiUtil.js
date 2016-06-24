var ApiActions = require('../actions/apiActions.js');

var ApiUtil = {
  createUser: function (newUser, card) {
    var apiUtil = this;
    $.ajax({
      url: "api/users",
      method: "POST",
      data: {user: newUser, card: card},
      success: function (user) {
        // Login with newUser because it has password prop.
        apiUtil.login(newUser);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  fetchSession: function () {
    $.ajax({
      url: "session",
      method: "GET",
      success: function (session) {
        if (!session.user) { return }
        ApiActions.receiveSession(session);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  login: function (user) {
    $.ajax({
      url: "session",
      method: "POST",
      data: {user: user},
      success: function(session){
        ApiActions.receiveSession(session);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  logOut: function () {
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function () {
        ApiActions.logOut();
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  getMessages: function (id) {
    $.ajax({
      url: "api/messages",
      data: {id: id},
      success: function (messages) {
        ApiActions.receiveMessages(messages);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  createGroup: function(group, members) {
    $.ajax({
        url: "api/groups",
        data: {group: group, members: members},
        method: "POST",
        success: function(cohort) {
          ApiActions.updateCohort(cohort);
        },
        error: function(error) {
          ApiActions.invalidEntry(error);
        }
    });
  },

  createCohort: function(cohort, success_callback) {
   $.ajax({
      url: "api/cohorts",
      data: {cohort: cohort},
      method: "POST",
      success: function(cohort) {
        success_callback(cohort);
        ApiActions.receiveCohort(cohort);
      },
      error: function(error){
        ApiActions.invalidEntry(error);
      }
   });
  },

  flagProject: function(flag, projectIdx) {
    $.ajax({
      url: "api/flags",
      data: {flag: flag},
      method: "POST",
      success: function(flag){
        ApiActions.receiveFlag(flag, projectIdx);
      },
      error: function(error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  approveProject: function (flag, projectIdx) {
    $.ajax({
      url: "api/flags/" + flag.id,
      data: {flag: flag},
      method: "PATCH",
      success: function (flag) {
        ApiActions.receiveFlag(flag, projectIdx);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  createProject: function(project) {
    $.ajax({
      url: "api/projects",
      data: {project: project},
      method: 'POST',
      success: function(project) {
        ApiActions.receiveProject(project);
      },
      error: function(error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  createTask: function (task, projectIdx) {
    $.ajax({
      url: "api/tasks",
      data: {task: task},
      method: "POST",
      success: function (project) {
        project.idx = projectIdx;
        ApiActions.receiveProjectWithNewTask(project);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  updateTask: function (task, projectIdx) {
    var now = new Date;
    task.updated_at = now.toUTCString();

    $.ajax({
      url: 'api/tasks/' + task.id + '/',
      data: {task: task},
      method: "PATCH",
      success: function (project) {
        project.idx = projectIdx;
        ApiActions.receiveProjectWithNewTask(project);
      },
    });
  }
}

module.exports = ApiUtil;
