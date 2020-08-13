
// ----------------------------------------------------------------
//   Test menu for scenario Load_XML 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'Load_XML', 'Test Load_XML', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.Load_XML.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario Load_XML Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: Load_XML
// ----------------------------------------------------------------
GLOBAL.scenario({ Load_XML: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Custom_8);
}}, ctx.dataManagers.rootData).setId('182ae096-505c-4ef1-b3ce-de3c9ed49128') ;

// ----------------------------------------------------------------
//   Step: Custom_8
// ----------------------------------------------------------------
GLOBAL.step({ Custom_8: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Load_XML', 'f793e306-6abd-4dfd-93c5-eaf7bb51cf40') ;
	// Custom
	sc.endStep(); // end Scenario
	return;
}});
