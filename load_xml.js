
// ----------------------------------------------------------------
//   Test menu for scenario Load_XML 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {

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
	sc.step(GLOBAL.steps.Execute);
	sc.step(GLOBAL.steps.GetResults);
//	sc.step(GLOBAL.steps.BackToPreviousPage);
	sc.step(GLOBAL.steps.PrepareForNextTransaction);
}}, ctx.dataManagers.rootData).setId('182ae096-505c-4ef1-b3ce-de3c9ed49128') ;

// ----------------------------------------------------------------
//   Step: Execute
// ----------------------------------------------------------------
GLOBAL.step({ Execute: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Load_XML', 'f793e306-6abd-4dfd-93c5-eaf7bb51cf40') ;
	// Custom
	SAPLogon750.pXMLselect.wait( function (ev) {
		SAPLogon750.pXMLselect.btExec.click();
		try {
			while (SAPLogon750.pLinkingOfXMLFiles.isSAPGuiBusy()) {
				//do nothing
			}
		} catch (ex) {
			//do nothing.
		}
		ctx.log('Loading finished');		
		sc.endStep(); // end Scenario
		return;
	});
}});


// ----------------------------------------------------------------
//   Step: GetResults
// ----------------------------------------------------------------
GLOBAL.step({ GetResults: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Load_XML', 'f493e306-1abd-4dfd-93c5-eaf7bb51cf44') ;
	// Custom
	SAPLogon750.pXMLresults.wait( function (ev) {
		if (!SAPLogon750.pXMLresults.oTotal.exist()) {
			ctx.log('No XML files found in directory');
			SAPLogon750.pXMLresults.keyStroke(e.SAPScripting.key._Shift__F3_);
//			sc.endStep(GLOBAL.steps.BackToPreviousPage);
//			return;
		} else {
			ctx.log('success ' + SAPLogon750.pXMLresults.oSuccessTotal.get().trim());
			ctx.log('fail ' + SAPLogon750.pXMLresults.oFailTotal.get().trim());
			SAPLogon750.pXMLresults.keyStroke(e.SAPScripting.key._Shift__F3_);
//			sc.endStep(GLOBAL.steps.PrepareForNextTransaction); // end Scenario
//			sc.endStep(); // end Scenario
//			return;
		}
		sc.endStep(); // end Scenario
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: BackToPreviousPage
// ----------------------------------------------------------------
GLOBAL.step({ BackToPreviousPage: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Load_XML', 'f893e386-6abd-4dfd-93c5-eaf7bb51cf80') ;
	// Custom
	SAPLogon750.pXMLselect.wait( function (ev) {
		SAPLogon750.pXMLselect.keyStroke(e.SAPScripting.key._Shift__F3_);
		sc.endStep(GLOBAL.steps.PrepareForNextTransaction); // end Scenario
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: PrepareForNextTransaction
// ----------------------------------------------------------------
GLOBAL.step({ PrepareForNextTransaction: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Load_XML', 'f893e386-6abd-4dfd-93c5-eaf7bb51cf80') ;
	// Custom
	SAPLogon750.pSAPEasyAccess.wait( function (ev) {
		ctx.log('PrepareForNextTransaction');
		rootData.transaction = 'J1UFMATCHING';
		GLOBAL.scenarios.SetTcode.start(rootData);
		sc.endStep(); // end Scenario
		return;
	});
}});