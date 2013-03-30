/*
@author Matt Crinklaw-Vogt
*/
define(["strut/slide_components/view/ThreeDRotatableComponentView",
        "./SlideDrawer",
        "css!styles/transition_editor/TransitionSlideSnapshot.css"],
function(ThreeDComponentView, SlideDrawer, empty) {
  return ThreeDComponentView.extend({
    className: "component transitionSlideSnapshot",
    events: function() {
      var parentEvents;
      parentEvents = ThreeDComponentView.prototype.events();
      return _.extend(parentEvents, {
        "click": "clicked"
      });
    },
    initialize: function() {
      return ThreeDComponentView.prototype.initialize.apply(this, arguments);
    },
    remove: function() {
      ThreeDComponentView.prototype.remove.call(this, true);
      if (this.slideDrawer != null) {
        this.slideDrawer.dispose();
      }
      return this.model.set("selected", false);
    },
    clicked: function() {
      ThreeDComponentView.prototype.clicked.apply(this, arguments);
      return this.model.set("active", true);
    },
    render: function() {
      var g2d;
      ThreeDComponentView.prototype.render.apply(this, arguments);
      if (this.slideDrawer != null) {
        this.slideDrawer.dispose();
      }
      g2d = this.$el.find("canvas")[0].getContext("2d");
      this.slideDrawer = new SlideDrawer(this.model, g2d, this.options.registry);
      this.slideDrawer.repaint();
      this.$el.css({
        left: this.model.get("x"),
        top: this.model.get("y")
      });

      var tform = window.browserPrefix + 'transform';
      var scale = 'scale(' + this.model.get('impScale') + ')';
      this.$el.css(tform, scale);

      return this;
    },
    __getTemplate: function() {
      return JST["strut.slide_snapshot/TransitionSlideSnapshot"];
    },
    constructor: function TransitionSlideSnapshot() {
			ThreeDComponentView.prototype.constructor.apply(this, arguments);
		}
  });
});
