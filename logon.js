// ----------------------------------------------------------------
//   Test menu for scenario LogOn 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	systray.addMenu('', 'LogOn', 'Start Log On', '', function (ev) {
		var rootData = ctx.dataManagers.rootData.create();
		
		// Initialize your data here.
		GLOBAL.scenarios.LogOn.start(rootData);
	});
});

//---------------------------------------------------
// Scenario LogOn Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: LogOn
// ----------------------------------------------------------------
GLOBAL.scenario({ LogOn: function(ev, sc) {
	var rootData = sc.data;
	
	rootData.messages = {
		info: [],
		warnings: [],
		errors: []
	};
		
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.RetrieveFactory, GLOBAL.steps.Kill_saplogon);
	sc.step(GLOBAL.steps.Kill_saplogon, GLOBAL.steps.Delay_1000_ms);
	sc.step(GLOBAL.steps.Delay_1000_ms, GLOBAL.steps.Start_SAPLogon750);
	sc.step(GLOBAL.steps.Start_SAPLogon750, GLOBAL.steps.pConnectionSelect_man);
	sc.step(GLOBAL.steps.pConnectionSelect_man, GLOBAL.steps.pSAP_management);
	sc.step(GLOBAL.steps.pSAP_management, null);
}}, ctx.dataManagers.rootData).setId('46be8eb4-be33-4d8c-8f6f-6de0977cf690') ;

// ----------------------------------------------------------------
//   Step: RetrieveFactory
// ----------------------------------------------------------------
GLOBAL.step({ RetrieveFactory: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('LogOn', '087e8165-d398-4082-956c-d06edf5bdf22') ;
	
	try {
		var resourcefilepath = ctx.fso.file.getParentFolderName(ctx.options.path.resources) + "\\local\\resources.json";
		rootData.Resources = getInputDetails(resourcefilepath);
	} catch (ex) {
		var _message = "Failed to read a config file. Path should be: " + resourcefilepath + " " + ex.message;
		ctx.log(_message, e.logIconType.Error);
		rootData.messages.errors.push (_message);

		GLOBAL.scenarios.FinalActions.start(rootData);
		sc.endScenario();
	}	
	
	rootData.username = rootData.Resources['variables']['username'];
	rootData.password = rootData.Resources['variables']['password'];
	rootData.systemID = rootData.Resources['variables']['systemID'];
	rootData.client 	= rootData.Resources['variables']['client'];

	sc.endStep(); // Kill_saplogon
	return;
}});

// ----------------------------------------------------------------
//   Step: Kill_saplogon
// ----------------------------------------------------------------
GLOBAL.step({ Kill_saplogon: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('LogOn', '3c6db46b-dbbc-47b6-9768-2b2126021b8f') ;
	
	kill_sap_logon(rootData); //function defined in AttachDocs2.js
	
	sc.endStep(); // Delay_1000_ms
	return;
}});

// ----------------------------------------------------------------
//   Step: Delay_1000_ms
// ----------------------------------------------------------------
GLOBAL.step({ Delay_1000_ms: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('LogOn', 'ad2fbc6f-ddec-4f87-81dd-6bd83430e034') ;
	// Delays execution for some milliseconds.
	// This is the standard pause that should be used in normal situations. It simply pauses the execution of the script for the indicated period.
	// It allows user interaction with Desktop Agent and other programs during the pause.
	// This can be useful to wait for a process to complete, to avoid going too fast for the operating system, or to give the user time to react.
	ctx.wait(function(ev) {
		sc.endStep(); // Start_SAPLogon750
		return;
	}, 1000);
}});

// ----------------------------------------------------------------
//   Step: Start_SAPLogon750
// ----------------------------------------------------------------
GLOBAL.step({ Start_SAPLogon750: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('LogOn', '3ac8a0f4-130e-4cc3-ba78-df3fb9142c6d') ;
	// Start 'SAPLogon750'
	SAPLogon750.start();
	sc.endStep(); // pConnectionSelect_man
	return;
}});

// ----------------------------------------------------------------
//   Step: pConnectionSelect_man
// ----------------------------------------------------------------
GLOBAL.step({ pConnectionSelect_man: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('LogOn', '25c2c69a-3750-4da7-a1c8-8307e74343db') ;
	// Wait until the Page loads
	SAPLogon750.pConnectionSelect.wait(function(ev) {
		var sysRow;
		var temp = SAPLogon750.pConnectionSelect.oConnList.getList();
		var i;
		var firstRow = 0;
		if (temp.items[1].length > 2) {
			firstRow = 1;
		} else {
			firstRow = 2;
		}
		try{
			for(i=firstRow; i<100; i++){
				if(temp.items[i][2].name.toUpperCase()== rootData.systemID){
					sysRow = temp.items[i][0].name;
					break;
				}
			}
			SAPLogon750.pConnectionSelect.oConnList.select(true, sysRow);
		}
		catch(ev){
			var _message = rootData.Resources['messages']['system_not_found'] + rootData.systemID;
			ctx.log(_message, e.logIconType.Error); 
			rootData.messages.errors.push (_message);
			
			GLOBAL.scenarios.FinalActions.start(rootData);
			sc.endScenario();
			sc.endStep(); // end Scenario
			return;
		}
		SAPLogon750.pConnectionSelect.keyStroke(e.key.Shift+e.key.Enter);  // Proceed for entering username and password
		sc.endStep(); // pSAP_management
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: pSAP_management
// ----------------------------------------------------------------
GLOBAL.step({ pSAP_management: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('LogOn', '50340cb2-d17d-4cf6-96c4-5d2945e04936') ;
	// Wait until the Page loads
	SAPLogon750.pSAP.waitReady(function(ev) {
		
		rootData.client = rootData.Resources['variables']['client'];
		try {
			// Enter SAP credentials mentioned in config file
			SAPLogon750.pSAP.edClient.set(rootData.client);
			SAPLogon750.pSAP.edUser.set(rootData.username);
			SAPLogon750.pSAP.oPassword.set(rootData.password);
		} catch (ex) {
			var _message = rootData.Resources['messages']['login_failed'] + ex.message;
			ctx.log(_message, e.logIconType.Error); 
			rootData.messages.errors.push (_message);
			
			GLOBAL.scenarios.FinalActions.start(rootData);
			sc.endScenario();
		}
		
		SAPLogon750.pSAP.keyStroke(e.SAPScripting.key._Enter_);
		
		rootData.transaction = 'J1UFMATCHING';
		GLOBAL.scenarios.SetTcode.start(rootData);
		
		sc.endStep(); // end Scenario
		return;
	});
}});

// ----------------------------------------------------------------
//   function to fetch credentials from Factory by name from resources.json
// ---------------------------------------------------------------
function getCredentials(rootData){
	var credentialsFactory = {};
	credentialsFactory[rootData.Resources['variables']['credentials']] = {
		server: true
	}
	ctx.cryptography.credential(credentialsFactory);
	
	var _success = false;
	ctx.cryptography.credentials[rootData.Resources['variables']['credentials']].get(function (code, label, credential) {
		if (code == e.error.OK) {
			rootData.username = credential.userName.get();
			rootData.password = credential.password.get();
			_success = true;
		} else {
			var _message = rootData.Resources['messages']['credential_fail'];
			ctx.log(_message, e.logIconType.Error);
			rootData.messages.errors.push (_message);
			
			GLOBAL.scenarios.FinalActions.start(rootData);
			_success = false;
		}
	});
	return _success;
}

// ----------------------------------------------------------------
//	function to fetch any setting from Factory by name from resources.json
//
//	if a setting is written is json file use in code 
//	rootData.mySetting = rootData.Resources['variables']['mySetting']	
// ---------------------------------------------------------------
function getSetting(rootData, name) {
	var _setting = {};
	_setting[rootData.Resources['variables'][name]] = {
		key:   ctx.cryptography.keys.none,
		server: true
	}
	ctx.setting(_setting);
	
	var _success = false;
	ctx.settings[rootData.Resources['variables'][name]].get(function (code, label, setting) {
		if (code == e.error.OK) {
			rootData[name] = setting.value;
			_success = true;
		}
		else {
			var _message = rootData.Resources['messages']['setting_fail'] + name;
			ctx.log(_message, e.logIconType.Error);
			rootData.messages.errors.push (_message);
			
			GLOBAL.scenarios.FinalActions.start(rootData);
			_success = false;
		}
	});
	return _success;
}

function kill_sap_logon (rootData) {
	var __result = ctx.wmi.query('Win32_Process', [ 'ProcessId', 'Name', 'ExecutionState' ], "Name='saplogon.exe'");
	if(__result.length > 0) {
	  for(var __counter = 0; __counter<__result.length; __counter++) {
	    var __result2 = ctx.wmi.query('Win32_Process', [ 'ProcessId', 'Name', 'ExecutionState' ], "ProcessId="+__result[__counter].ProcessId);
	    if(__result2.length > 0) {
	      ctx.wmi.killProcess(__result2[0].ProcessId);
	    }
	  }
	  ctx.log(rootData.Resources['messages']['logon_instances_killed'], e.logIconType.Info);
	}
	else {
	  ctx.log(rootData.Resources['messages']['logon_instances_not_found'], e.logIconType.Warning);
	}
}

// ----------------------------------------------------------------
//   function to read the resources.json
// ---------------------------------------------------------------
function getInputDetails(resourcefilepath) {
	var resources = ctx.json.parse(ctx.resources.loadHtml(resourcefilepath));
	return resources;
}