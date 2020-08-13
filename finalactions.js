
// ----------------------------------------------------------------
//   Test menu for scenario FinalActions 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {

});

//---------------------------------------------------
// Scenario FinalActions Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: FinalActions
// ----------------------------------------------------------------
GLOBAL.scenario({ FinalActions: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Custom_2);
}}, ctx.dataManagers.rootData).setId('cee1365e-f716-412b-ac7a-beb3fb86cc63') ;

// ----------------------------------------------------------------
//   Step: Custom_2
// ----------------------------------------------------------------
GLOBAL.step({ Custom_2: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('FinalActions', '02729544-b557-4be4-a0a6-799b534fbc43') ;
	// Custom
	sc.endStep(); // end Scenario
	return;
}});
