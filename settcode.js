﻿
// ----------------------------------------------------------------
//   Test menu for scenario SetTcode 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {

});

//---------------------------------------------------
// Scenario SetTcode Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: SetTcode
// ----------------------------------------------------------------
GLOBAL.scenario({ SetTcode: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.EnterTransaction1);
}}, ctx.dataManagers.rootData).setId('f65f0c12-a3e3-4508-ab0a-a3f512543f4b') ;

// ----------------------------------------------------------------
//   Step: EnterTransaction
// ----------------------------------------------------------------
GLOBAL.step({ EnterTransaction1: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('SetTcode', 'cb36e589-1e6e-47c2-aa32-fefb3c182e41') ;
	// Custom
	SAPLogon750.pSAPEasyAccess.wait(function(ev) {
		SAPLogon750.pSAPEasyAccess.oGuiOkCodeField.set(rootData.transaction);
		SAPLogon750.pSAPEasyAccess.btGuiButton.click();
		
		if (rootData.transaction == 'J1UFMATCHING') {
			rootData.startDay = 18;
			GLOBAL.scenarios.prepareNextDay.start(rootData);
		} else if (rootData.transaction == 'J1UFDIPROCIN') {
			GLOBAL.scenarios.Load_XML.start(rootData);
		} 
		sc.endStep(); // SetFilters
		return;
	});
}});
