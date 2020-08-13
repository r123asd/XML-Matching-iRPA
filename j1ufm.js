
// ----------------------------------------------------------------
//   Test menu for scenario J1UFM 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {

});

//---------------------------------------------------
// Scenario J1UFM Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: J1UFM
// ----------------------------------------------------------------
GLOBAL.scenario({ J1UFM: function(ev, sc) {
	var rootData = sc.data;
	ctx.log('1m starter');
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.setTransCode, GLOBAL.steps.setXmlFilters);
	sc.step(GLOBAL.steps.setXmlFilters, null);
}}, ctx.dataManagers.rootData).setId('dee83227-42b0-4a80-8e1a-f0e7179f93d6') ;

// ----------------------------------------------------------------
//   Step: Custom_4
// ----------------------------------------------------------------
GLOBAL.step({ setTransCode: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('J1UFM', '14285b58-0630-44b2-8725-5d65e13e0f69') ;
	// Custom
	SAPLogon750.pSAPEasyAccess.wait(function(ev) {
		ctx.log('custom ea loaded');
		SAPLogon750.pSAPEasyAccess.oGuiOkCodeField.set('J1UFMATCHING');
		SAPLogon750.pSAPEasyAccess.btGuiButton.click();
		sc.endStep(); // end Scenario
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: Custom_4
// ----------------------------------------------------------------
GLOBAL.step({ setXmlFilters: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('J1UFM', '24285b58-0630-34b2-8725-5d65e13e0f68') ;
	// Custom
	SAPLogon750.pLinkingOfXMLFiles.wait(function(ev) {
		ctx.log('xml filters page loaded');
		SAPLogon750.pLinkingOfXMLFiles.oTaxInvoiceCreation.click();
		SAPLogon750.pLinkingOfXMLFiles.edCompanyCode.set('G110');
		
		SAPLogon750.pLinkingOfXMLFiles.edYearXML.set('2019');
		SAPLogon750.pLinkingOfXMLFiles.edYearDoc.set('2019');
		
		SAPLogon750.pLinkingOfXMLFiles.edDateFromXML.set('01052019');
		SAPLogon750.pLinkingOfXMLFiles.edDateToXML.set('31102019'); //T-ODO: change for speed optimization
		
		SAPLogon750.pLinkingOfXMLFiles.edDateFromDoc.set('01052019');
		SAPLogon750.pLinkingOfXMLFiles.edDateToDoc.set('31102019'); //T-ODO: change for speed optimization
		
		sc.endStep(); // end Scenario
		return;
	});
}});

