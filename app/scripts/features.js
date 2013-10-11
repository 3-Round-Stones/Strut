define([
	'framework/ServiceRegistry',
	'strut/etch_extension/main',
	'strut/themes/main',
	'strut/editor/main',
	'strut/presentation_generator/impress/main',
	'strut/presentation_generator/main',
	'strut/slide_editor/main',
	'strut/transition_editor/main',
	'strut/slide_components/main',
	'strut/well_context_buttons/main',
	'strut/startup/main'
	],
function(ServiceRegistry) {
	var registry = new ServiceRegistry();

	var args = Array.prototype.slice.call(arguments, 0);

	var i = 0;
	for (var i = 1; i < args.length; ++i) {
		args[i].initialize(registry);
	}

	return registry;
});
