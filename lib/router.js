Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('entities'); }
    //passing in parameters, talked about it below | If .waitOn -> paste this line there
});

Router.map(function() {
  this.route('coreTemplate', {path: '/'});

  this.route('singleEntity', {

    path: '/Entity/:_id',
    data: function() { return _Entities.findOne({_id: this.params._id}); }

  });
});

Router.onBeforeAction('loading');
