
// ----------------------------------------------------------------
//   Test menu for scenario Post 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'Post', 'Test Post', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.Post.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario Post Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: Post
// ----------------------------------------------------------------
GLOBAL.scenario({ Post: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.selectRow, GLOBAL.steps.getResults);
	sc.step(GLOBAL.steps.getResults, null);
}}, ctx.dataManagers.rootData).setId('cc184968-4042-4840-a3c3-45aaa291cc55') ;

// ----------------------------------------------------------------
//   Step: selectRow
// ----------------------------------------------------------------
GLOBAL.step({ selectRow: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Post', '3d62f177-079f-4315-b638-eb5a2f4629e5') ;
	SAPLogon750.pProcessingOfTICTI.wait(function (ev) {
		
		SAPLogon750.pProcessingOfTICTI.oPane.selectAllRows();
		SAPLogon750.pProcessingOfTICTI.btPost.click();
		
		sc.endStep(); // end Scenario
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: Custom_5
// ----------------------------------------------------------------
GLOBAL.step({ getResults: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Post', '4d62f177-079f-4315-b638-eb5a2f4629e4') ;
	SAPLogon750.pLogDisplay.wait(function (ev) {
		
		var status = SAPLogon750.pLogDisplay.oStatusBar.getMessageType();
		if (status == 'Success') {
			SAPLogon750.pLogDisplay.btBack.click();
			
			try {
				while (SAPLogon750.pLogDisplay.isSAPGuiBusy()) {
					//do nothing
				}
				ctx.log('system responded normally');		
			} catch (ex) {
				ctx.log('system responded in catch');		
			}
			
			GLOBAL.scenarios.Match.start(rootData);
		} else {
			var statusText = SAPLogon750.pLogDisplay.oStatusBar.get();
		}
		
		sc.endStep(); // end Scenario
		return;
	});
}});
