var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var MovieModel = require('./movie');


module.exports = Backbone.View.extend({
  el: '#formBlock',
  template: _.template($('#formTmpl').html().trim()),
  initialize: function() {
    this.render();
  },
  events: {
    'submit form': 'handleSubmit',
  },
  render: function() {
    this.model = new MovieModel();
    var markup = this.template(this.model.toJSON());
    this.$el.html(markup);
    return this;
  },
  handleSubmit: function(event) {
    event.preventDefault();
    this.model.set({
      title: this.$el.find('input[name="title"]').val(),
      poster: this.$el.find('input[name="poster"]').val(),
      plot: this.$el.find('textarea[name="plot"]').val(),
      genre: this.$el.find('input[name="genre"]').val(),
      year: this.$el.find('input[name="year"]').val(),
      score: this.$el.find('input[name="score"]').val()
    });
    this.model.save();
    this.collection.add(this.model);
    this.$el.find('input').val('');
    this.$el.find('textarea').val('');
    $('#formBlockWrapper').toggle();
  }
});