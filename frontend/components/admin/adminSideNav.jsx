var React = require('react');
var AdminSideNavItem = require('./adminSideNavItem');

var AdminSideNav = React.createClass({
  getInitialState: function () {
    return { cohorts: this.props.cohorts }
  },

  renderCohorts: function () {
    if (this.props.cohorts) {
      var activeCohort = this.props.activeCohort;
      var setActiveCohortCallback = this.props.setActiveCohortCallback;

      var reactCohorts = this.props.cohorts.map(function(cohort, idx) {
        var isActive = activeCohort === cohort ? true : false;

        return (
          <AdminSideNavItem
            cohort={cohort}
            isActive={isActive}
            key={idx}
            onClick={setActiveCohortCallback}>
          </AdminSideNavItem>
        )
      });

      return reactCohorts;
    }
  },

  componentWillReceiveProps: function (newProps) {
  },

  render: function () {
    return (
        <nav className="navbar-default navbar-static-side sidebar-content">
          <div className="sidebar-collapse">
              <ul className="nav metismenu" id="side-menu">

                  <li className="nav-header">
                      <div className="logo-element">
                          mL
                      </div>
                  </li>

                  <li><a><span
                    className="label label-primary"
                    onClick={this.props.showCohortFormCallback}>
                    NEW COHORT
                  </span></a></li>

                  { this.renderCohorts() }

              </ul>
          </div>
        </nav>
      )
  }
});

module.exports = AdminSideNav;
