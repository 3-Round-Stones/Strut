define(['libs/backbone',
		'./ThemeProviderView',
		'./Tablets',
		'css!styles/header/header.css'],
function(Backbone, ThemeProviderView, Tablets, empty) {
	return Backbone.View.extend({
		className: 'row-fluid header',

		initialize: function() {
			this._template = JST['strut.header/Header'];
			this._themeProviderView = new ThemeProviderView(this.model.editorModel());

			this.model.editorModel().on('change:activeMode', this._modeChanged, this);

			this._tablets = new Tablets(this.model.editorModel());
		},

		_modeChanged: function(model, value) {
			if (value.id == 'overview') {
				this.$el.find('.create-comp-buttons').addClass('hidden');
			} else {
				this.$el.find('.create-comp-buttons').removeClass('hidden');
			}
		},

		// TODO: need to respond to addition/removal of
		// create component buttons
		render: function() {
			this.$el.html(this._template());

			var $modeButtons = this.$el.find('.mode-buttons');
			this.model.get('modeButtons').forEach(function(button) {
				$modeButtons.append(button.render().el);
			}, this);

			var $createCompButtons = this.$el.find('.create-comp-buttons > div');
			this.model.get('createCompButtons').forEach(function(button) {
				$createCompButtons.append(button.render().el);
			}, this);

			var $themeButtons = this.$el.find('.theme-buttons');
			$themeButtons.append(this._themeProviderView.render().$el);

			this._tablets.render();
			this.$el.append(this._tablets.$el);

			return this;
		},

		constructor: function HeaderView() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});
