var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');
var ChannelConstants = require('../constants/channelConstants.js');

var ApiActions = {

  receiveSession: function (session) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SESSION_RECEIVED,
      session: session
    });
  },

  logOut: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SESSION_DESTROYED,
    });
  },

  invalidEntry: function (error) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.INVALID_ENTRY,
      error: error
    });
  },

  receiveCohort: function(cohort) {
    AppDispatcher.dispatch({
        actionType: SessionConstants.COHORT_RECEIVED,
        cohort: cohort
    })
  },

  updateCohort: function(cohort) {
    AppDispatcher.dispatch({
        actionType: SessionConstants.GROUP_RECEIVED,
        cohort: cohort
    })
  },

  receiveFlag: function(flag, projectIdx){
    AppDispatcher.dispatch({
      actionType: SessionConstants.FLAG_RECEIVED,
      flag: flag,
      projectIdx: projectIdx
    });
  },

  receiveProject: function(project) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.PROJECT_RECEIVED,
      project: project
    });
  },

  receiveProjectWithNewTask: function (project) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.UPDATED_PROJECT_RECEIVED,
      project: project
    })
  },

  receiveChannel: function (channel) {
    AppDispatcher.dispatch({
      actionType: ChannelConstants.CHANNEL_RECEIVED,
      channel: channel
    })
  }
}

module.exports = ApiActions;
