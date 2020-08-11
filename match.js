
// ----------------------------------------------------------------
//   Test menu for scenario Match 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'Match', 'Test Match', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.Match.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario Match Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: Match
// ----------------------------------------------------------------
GLOBAL.scenario({ Match: function(ev, sc) {
	var rootData = sc.data;
	ctx.log('starting Match');
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	
	//for testing purposes
	//sc.step(GLOBAL.steps.clickBack);
	sc.step(GLOBAL.steps.setConstants, GLOBAL.steps.readTables);
	sc.step(GLOBAL.steps.readTables, GLOBAL.steps.getPairedRows);
	sc.step(GLOBAL.steps.getPairedRows, null);
}}, ctx.dataManagers.rootData).setId('792c4858-613b-44a1-8813-cf1155027fc9') ;

// ----------------------------------------------------------------
//   Step: Custom
// ----------------------------------------------------------------
GLOBAL.step({ setConstants: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Match', '2453bee5-6dc8-48c0-ba8f-c1a78fe54cb8') ;
	// Custom
	rootData.xmlColNames = {
		vendor: 'XML_PARTNER',
		date: 'XML_BLDAT',
		total: 'XML_TOTAL_AMOUNT',
		tax: 'XML_TAX',
		base: 'XML_TAXBASE'
	}

	rootData.docColNames = {
		vendor: 'LIFNR',
		date: 'BLDAT',
		total: 'TOTAL_AMOUNT',
		tax: 'TAX_AMOUNT',
		base: 'DMBTR'
	}
	sc.endStep(); // end Scenario
	return;
}});

// ----------------------------------------------------------------
//   Step: Custom
// ----------------------------------------------------------------
GLOBAL.step({ readTables: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Match', '2953bee5-6dc8-48c0-ba8f-c1a78fe54cb1') ;
	// Custom
	SAPLogon750.pCreationOfIncoming.wait(function (ev) {
		
		rootData.rowsCountLeft 	= SAPLogon750.pCreationOfIncoming.oLeft1.getRowCount();
		rootData.rowsCountRight = SAPLogon750.pCreationOfIncoming.oRight1.getRowCount();
		/*
		if (rootData.rowsCountLeft == 0 || rootData.rowsCountRight == 0) {
			ctx.log('Some data is missing for ' + rootData.startDay);
			sc.endStep(GLOBAL.steps.clickBack);
			return;
		}
		*/
		if (rootData.rowsCountRight == 0) {
			ctx.log('Some data is missing for ' + rootData.startDay);
			nextDay(rootData);
			sc.endScenario();
			return;
		}
		
		//rootData.left = getTableData (SAPLogon750.pCreationOfIncoming.oLeft1,  rootData.xmlColNames, rootData.rowsCountLeft);
		rootData.right = getTableData (SAPLogon750.pCreationOfIncoming.oRight1, rootData.docColNames, rootData.rowsCountRight);

		sc.endStep(); // end Scenario
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: Custom
// ----------------------------------------------------------------
GLOBAL.step({ getPairedRows: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Match', '4953bee5-6dc8-48c0-ba68f-c1a78fe54cb2') ;
	// Custom
	SAPLogon750.pCreationOfIncoming.wait(function (ev) {
		/*
		rootData.arrVendorNumbers = Object.keys(rootData.right);
		for (var index = 0; index < rootData.arrVendorNumbers.length; index++) {
			var vendorNum = rootData.arrVendorNumbers[index];
			if (!rootData.left[vendorNum]) {
				ctx.log('XML list does not contain info about vendor ' + vendorNum, e.logIconType.Warning);
				continue;
			}
			var vendor = rootData.left[vendorNum];
			for (var line = 0; line < vendor.length; line++) {
				ctx.log(vendor[line].total);
			}
		}
		*/
		
		findPair(rootData);
		SAPLogon750.pCreationOfIncoming.btCreateTaxInvoice.click();
		GLOBAL.scenarios.Post.start(rootData);
		
		sc.endStep(); // end Scenario
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: Custom
// ----------------------------------------------------------------
GLOBAL.step({ clickBack: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('Match', '7953bee5-7dc8-48c0-ba8f-c2a78fe54cb1') ;
	// Custom
	SAPLogon750.pCreationOfIncoming.wait(function (ev) {
		
		SAPLogon750.pCreationOfIncoming.btBackYellow.click();
		ctx.log('about to start Prepare');
		GLOBAL.scenarios.prepareNextDay.start(rootData);
		sc.endStep(); // end Scenario
		return;
	});
}});

function getTableData (table, colNames, rowsCount) {
	ctx.log('Reading data from table');
	var tableData = {};
	for (var row = 0; row < rowsCount; row++) {
		var date = table.getCell(row, colNames.date);
		var meaningfulLine = date.length > 0;
		if (meaningfulLine) {
			var vendor = table.getCell(row, colNames.vendor);
			var total = table.getCell(row, colNames.total);
			var tax = table.getCell(row, colNames.tax);
			var base = table.getCell(row, colNames.base);
			
			var data = {
				row: row, 
				date: date,
				total: total,
				tax: tax,
				base: base
			}
			if (!tableData[vendor]) {
				tableData[vendor] = [];
			}
			tableData[vendor].push(data);
		}
	}
	return tableData;
}

function findPair(rootData) {
	for (var row = 0; row < rootData.rowsCountLeft; row++) {
		var date = SAPLogon750.pCreationOfIncoming.oLeft1.getCell(row, rootData.xmlColNames.date);
		if (date.length == 0 ) {continue;}
		
		var vendor = 	SAPLogon750.pCreationOfIncoming.oLeft1.getCell(row, rootData.xmlColNames.vendor);
		if (!rootData.right[vendor]) { continue;}

		var total = 	SAPLogon750.pCreationOfIncoming.oLeft1.getCell(row, rootData.xmlColNames.total);
		var tax = 		SAPLogon750.pCreationOfIncoming.oLeft1.getCell(row, rootData.xmlColNames.tax);
		var base =	 	SAPLogon750.pCreationOfIncoming.oLeft1.getCell(row, rootData.xmlColNames.base);
		for (var j = 0; j < rootData.right[vendor].length; j++) {
			var itemRight = rootData.right[vendor][j];
			if (total 	== itemRight.total 	&& 
					base 		== itemRight.base 	&&
					tax 		== itemRight.tax		&&
					date 		== itemRight.date) 
			{
				SAPLogon750.pCreationOfIncoming.oLeft1.selectRow(row);
				SAPLogon750.pCreationOfIncoming.oRight1.selectRow(itemRight.row);
				return;
			}
		}
	}
	
	nextDay(rootData);
}

function nextDay(rootData) {
	SAPLogon750.pCreationOfIncoming.btBackYellow.click();
	ctx.log('about to start Prepare');
	GLOBAL.scenarios.prepareNextDay.start(rootData);
}