function skillsMember() {
  return {
    restrict: 'E',
    template: '<div class="skills-member">' +
      '<div class="member-name">{{member.name}}</div>' +
      '<div class="member-skills">' +
      '<div class="skill" ng-repeat="skill in member.skills">{{skill}}</div>' +
      '</div>' +
      '</div>',
    scope: {
      member: '='
    }
  };
}