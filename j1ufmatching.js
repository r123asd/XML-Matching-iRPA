
// ----------------------------------------------------------------
//   Test menu for scenario J1UFMATCHING 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'J1UFMATCHING', 'Test J1UFMATCHING', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.J1UFMATCHING.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario J1UFMATCHING Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: J1UFMATCHING
// ----------------------------------------------------------------
GLOBAL.scenario({ J1UFMATCHING: function(ev, sc) {
	var rootData = sc.data;
	
	ctx.log('in J1 starter');
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.setFilters, GLOBAL.steps.waitSystem);
}}, ctx.dataManagers.rootData).setId('9919d9c6-6cf6-4a0b-9dd9-ca131a4591b9') ;


// ----------------------------------------------------------------
//   Step: SetFilters
// ----------------------------------------------------------------
GLOBAL.step({ setFilters: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('J1UFMATCHING', 'cb46e589-1e6e-48c2-aa32-fefb3c182e47') ;
	// Custom
	SAPLogon750.pLinkingOfXMLFiles.wait(function(ev) {
		ctx.log('xml filters page loaded');
		SAPLogon750.pLinkingOfXMLFiles.oTaxInvoiceCreation.click();
		SAPLogon750.pLinkingOfXMLFiles.edCompanyCode.set('G110');
		
		SAPLogon750.pLinkingOfXMLFiles.edYearXML.set('2019');
		SAPLogon750.pLinkingOfXMLFiles.edYearDoc.set('2019');
		
		SAPLogon750.pLinkingOfXMLFiles.edDateFromXML.set(rootData.currentDate);
		SAPLogon750.pLinkingOfXMLFiles.edDateToXML.set(rootData.currentDate);
		
		SAPLogon750.pLinkingOfXMLFiles.edDateFromDoc.set(rootData.currentDate);
		SAPLogon750.pLinkingOfXMLFiles.edDateToDoc.set(rootData.currentDate);
		
		SAPLogon750.pLinkingOfXMLFiles.cbCreateWithDocPost.set(true);
		SAPLogon750.pLinkingOfXMLFiles.cbDisableDocSplit.set(true);
		SAPLogon750.pLinkingOfXMLFiles.cbStartBatch.set(true);
		
		SAPLogon750.pLinkingOfXMLFiles.btExec.click();
	
		sc.endStep(); // end Scenario
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: EnterTransaction
// ----------------------------------------------------------------
GLOBAL.step({ waitSystem: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('J1UFMATCHING', 'cb36e589-1e6e-47c2-aa32-fefb3c182e41') ;
	// Custom
	ctx.log('before waiting system response');
	try {
		while (SAPLogon750.pLinkingOfXMLFiles.isSAPGuiBusy()) {
			//do nothing
		}
		ctx.log('system responded normally');		
	} catch (ex) {
		ctx.log('system responded in catch');		
	}
	
	ctx.sleep(2000);
	try {
		if (!SAPLogon750.pCreationOfIncoming.oLeft.exist() && SAPLogon750.pLinkingOfXMLFiles.oGuiUserArea.exist()) {
			ctx.log('No relevant account documents');
			SAPLogon750.pLinkingOfXMLFiles.btBackYellow.click();
			GLOBAL.scenarios.prepareNextDay.start(rootData);
			sc.endScenario(); // end Scenario
			return;
		}
	} catch (ex) {
		ctx.log('Catch in J1');
	}
	
	GLOBAL.scenarios.Match.start(rootData);
	sc.endStep(); // SetFilters
	return;
}});