
// ----------------------------------------------------------------
//   Test menu for scenario prepareNextDay 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'prepareNextDay', 'Test prepareNextDay', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.prepareNextDay.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario prepareNextDay Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: prepareNextDay
// ----------------------------------------------------------------
GLOBAL.scenario({ prepareNextDay: function(ev, sc) {
	var rootData = sc.data;
	ctx.log('starting Prepare');
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Custom_6);
}}, ctx.dataManagers.rootData).setId('503af750-a919-4255-8d26-2ca2fa9416f3') ;

// ----------------------------------------------------------------
//   Step: Custom_6
// ----------------------------------------------------------------
GLOBAL.step({ Custom_6: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('prepareNextDay', 'b70331e8-ce1a-4943-a9ae-f28a28e8643c') ;
	rootData.startDay++;
	
	if (rootData.startDay > 10) {
		//GLOBAL.scenarios.J1UFMATCHING.start(rootData);
		sc.endStep(); // end Scenario
		return;
	}
	
	rootData.currentDate = rootData.startDay + '092019';
	if (rootData.currentDate.length < 8) {
		rootData.currentDate = '0' + rootData.currentDate;
	}
	GLOBAL.scenarios.J1UFMATCHING.start(rootData);
	sc.endStep(); // end Scenario
	return;
}});
