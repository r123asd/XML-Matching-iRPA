// Desktop Studio
// Auto-generated declaration file : do not modify !



var POPUPS = POPUPS || ctx.addApplication('POPUPS');



var SAPLogon750 = ctx.addApplication('SAPLogon750', {"nature":"UIAUTOMATION","path":"C:\\Program Files (x86)\\SAP\\FrontEnd\\SapGui\\saplogon.exe"});

SAPLogon750.pConnectionSelect = SAPLogon750.addPage('pConnectionSelect', {"comment":"SAP Logon 760"});
SAPLogon750.pConnectionSelect.oGUA = SAPLogon750.pConnectionSelect.addItem('oGUA');
SAPLogon750.pConnectionSelect.oConnList = SAPLogon750.pConnectionSelect.addItem('oConnList');

SAPLogon750.pSAP = SAPLogon750.addPage('pSAP', {"comment":"GuiMainWindow - SAP","nature":"SAPGUI","customType":"GuiMainWindow"});
SAPLogon750.pSAP.edClient = SAPLogon750.pSAP.addItem('edClient', {"customType":"GuiTextField"});
SAPLogon750.pSAP.edUser = SAPLogon750.pSAP.addItem('edUser', {"customType":"GuiTextField"});
SAPLogon750.pSAP.oPassword = SAPLogon750.pSAP.addItem('oPassword', {"customType":"GuiPasswordField"});
SAPLogon750.pSAP.edLogonLanguage = SAPLogon750.pSAP.addItem('edLogonLanguage', {"customType":"GuiTextField"});

SAPLogon750.pSAPEasyAccess = SAPLogon750.addPage('pSAPEasyAccess', {"comment":"GuiMainWindow - SAP Easy Access","nature":"SAPGUI","customType":"GuiMainWindow"});
SAPLogon750.pSAPEasyAccess.oGuiOkCodeField = SAPLogon750.pSAPEasyAccess.addItem('oGuiOkCodeField', {"customType":"GuiOkCodeField"});
SAPLogon750.pSAPEasyAccess.btGuiButton = SAPLogon750.pSAPEasyAccess.addItem('btGuiButton', {"customType":"GuiButton"});

SAPLogon750.pLinkingOfXMLFiles = SAPLogon750.addPage('pLinkingOfXMLFiles', {"comment":"GuiMainWindow - Linking of XML Files to Accounting Documents","nature":"SAPGUI","customType":"GuiMainWindow"});
SAPLogon750.pLinkingOfXMLFiles.oTaxInvoiceCreation = SAPLogon750.pLinkingOfXMLFiles.addItem('oTaxInvoiceCreation', {"customType":"GuiRadioButton"});
SAPLogon750.pLinkingOfXMLFiles.edCompanyCode = SAPLogon750.pLinkingOfXMLFiles.addItem('edCompanyCode', {"customType":"GuiCTextField"});
SAPLogon750.pLinkingOfXMLFiles.edYearXML = SAPLogon750.pLinkingOfXMLFiles.addItem('edYearXML', {"customType":"GuiCTextField"});
SAPLogon750.pLinkingOfXMLFiles.edDateFromXML = SAPLogon750.pLinkingOfXMLFiles.addItem('edDateFromXML', {"customType":"GuiCTextField"});
SAPLogon750.pLinkingOfXMLFiles.edDateToXML = SAPLogon750.pLinkingOfXMLFiles.addItem('edDateToXML', {"customType":"GuiCTextField"});
SAPLogon750.pLinkingOfXMLFiles.edYearDoc = SAPLogon750.pLinkingOfXMLFiles.addItem('edYearDoc', {"customType":"GuiTextField"});
SAPLogon750.pLinkingOfXMLFiles.edDateFromDoc = SAPLogon750.pLinkingOfXMLFiles.addItem('edDateFromDoc', {"customType":"GuiCTextField"});
SAPLogon750.pLinkingOfXMLFiles.edDateToDoc = SAPLogon750.pLinkingOfXMLFiles.addItem('edDateToDoc', {"customType":"GuiCTextField"});
SAPLogon750.pLinkingOfXMLFiles.btExec = SAPLogon750.pLinkingOfXMLFiles.addItem('btExec', {"customType":"GuiButton"});
SAPLogon750.pLinkingOfXMLFiles.cbStartBatch = SAPLogon750.pLinkingOfXMLFiles.addItem('cbStartBatch', {"customType":"GuiCheckBox"});
SAPLogon750.pLinkingOfXMLFiles.cbDisableDocSplit = SAPLogon750.pLinkingOfXMLFiles.addItem('cbDisableDocSplit', {"customType":"GuiCheckBox"});
SAPLogon750.pLinkingOfXMLFiles.cbCreateWithDocPost = SAPLogon750.pLinkingOfXMLFiles.addItem('cbCreateWithDocPost', {"customType":"GuiCheckBox"});
SAPLogon750.pLinkingOfXMLFiles.oGuiUserArea = SAPLogon750.pLinkingOfXMLFiles.addItem('oGuiUserArea', {"customType":"GuiUserArea"});
SAPLogon750.pLinkingOfXMLFiles.btBackYellow = SAPLogon750.pLinkingOfXMLFiles.addItem('btBackYellow', {"customType":"GuiButton"});

SAPLogon750.pCreationOfIncoming = SAPLogon750.addPage('pCreationOfIncoming', {"comment":"GuiMainWindow - Creation of Incoming TI/TC","nature":"SAPGUI","customType":"GuiMainWindow"});
SAPLogon750.pCreationOfIncoming.oLeft = SAPLogon750.pCreationOfIncoming.addItem('oLeft', {"customType":"GUIGridViewPane"});
SAPLogon750.pCreationOfIncoming.oRight1 = SAPLogon750.pCreationOfIncoming.addItem('oRight1', {"customType":"GuiCtrlGridView"});
SAPLogon750.pCreationOfIncoming.oLeft1 = SAPLogon750.pCreationOfIncoming.addItem('oLeft1', {"customType":"GuiCtrlGridView"});
SAPLogon750.pCreationOfIncoming.btCreateTaxInvoice = SAPLogon750.pCreationOfIncoming.addItem('btCreateTaxInvoice', {"customType":"GuiButton"});
SAPLogon750.pCreationOfIncoming.btBackYellow = SAPLogon750.pCreationOfIncoming.addItem('btBackYellow', {"customType":"GuiButton"});

SAPLogon750.pProcessingOfTICTI = SAPLogon750.addPage('pProcessingOfTICTI', {"comment":"GuiMainWindow - Processing of TI/CTI Items","nature":"SAPGUI","customType":"GuiMainWindow"});
SAPLogon750.pProcessingOfTICTI.oPane = SAPLogon750.pProcessingOfTICTI.addItem('oPane', {"customType":"GUIGridViewPane"});
SAPLogon750.pProcessingOfTICTI.btPost = SAPLogon750.pProcessingOfTICTI.addItem('btPost', {"customType":"GuiButton"});

SAPLogon750.pLogDisplay = SAPLogon750.addPage('pLogDisplay', {"comment":"GuiMainWindow - Log Display","nature":"SAPGUI","customType":"GuiMainWindow"});
SAPLogon750.pLogDisplay.oStatusBar = SAPLogon750.pLogDisplay.addItem('oStatusBar', {"customType":"GuiStatusbar"});
SAPLogon750.pLogDisplay.btBack = SAPLogon750.pLogDisplay.addItem('btBack', {"customType":"GuiButton"});

GLOBAL.events.START.on(function(ev) { 
    GLOBAL.createExtendedConnector(e.extendedConnector.UIAutomation, '', '', '');
});
