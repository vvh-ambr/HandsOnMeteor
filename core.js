_Entities = new Meteor.Collection('entities');

if (Meteor.isClient) {

  Session.setDefault('editingState', 0);

  Template.coreTemplate.helpers({
    entities: function() {
      return _Entities.find(); //We taking data from the server
                                 //here we could make an additional sorting, like "only javascript posts" or something
    }
  });

  Template.coreTemplate.events({
    // 'keypress #entryPoint': function(e, t) {
    //   if (e.keyCode === 13) {
    //     var a = e.currentTarget;
    //     _Categories.insert({message: a.value});
    //     a.value = '';
    //   }
    //}
    'click button': function(e, t) {
      _Entities.insert({name: "some new item"});
    }
  });

  Template.singleEntity.helpers({
    editing: function() {
      return !!Session.get('editingState');
    }
  });

  Template.singleEntity.events({
    'click #editButton': function(e, t) {
      Session.set('editingState', Session.get('editingState') + 1);
    },
    'click #saveButton': function(e, t) {
      var currentEntityId = this._id,
          newName = t.find('input'),
          newContent = t.find('textarea');
      _Entities.update(currentEntityId, {$set: {name: newName.value, content: newContent.value}});
      Session.set('editingState', 0);
    },
    'click #deleteButton': function(e, t) {
      _Entities.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.publish('entities', function(someparams) { //parameters to sort
  return _Entities.find();    //This is primary sorting the data from the server
});
}
