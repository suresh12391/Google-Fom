function updateForm() {

  
  var form = FormApp.openById('XXX-XXX');
  
  // Following line just logs form title in logger. 
  // Helps in troubleshooting. :)
  Logger.log('Form Title is '+ form.getTitle()); 
  
  // Gets all items inside the form.   
  allItems = form.getItems();
  Logger.log(' Total items in this form '+ allItems.length)
  
  var TypeList = form.getItemById("XXXXXXX").asListItem();
  
  // identify the sheet where the data resides needed to populate the drop-down
  // Getting object of current spreadsheet from which we need
  // to get values for drop down list.
  // var ss = SpreadsheetApp.getActive();
  // To get any pre-exist workbook
  //var ss = SpreadsheetApp.openById("Workbook ID");
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("XXXXXXXXX");
 
  // Casting item to listItem. Should use .asCheckBoxItem()
  // if using checkbox or .asMultipleChoiceItem() if using
  // multiple choice. 
  // Multiple Choice - replace asListItem() with asMultipleChoiceItem() in the script.
  // var itemList = form.getItemById("XXXXXXX").asCheckBoxItem();
  
  var itemArray = form.getItems(FormApp.ItemType.LIST);
  var choice = itemArray[0].asListItem(); // Get the option item from this
  
  /*
  for (i=0; i < allItems.length; ++i) {
    var itemTitle = allItems[i].getTitle();
    var itemType = allItems[i].getType();
    //Logger.log('Item Title '+ itemTitle);
    //Logger.log('Item Type: '+ itemType);
  }
  */
  
  var a = allItems[4].asCheckboxItem();
  var b = allItems[5].asCheckboxItem();
  var c = allItems[6].asCheckboxItem();
        
  /*
  var aa = form.getItemById("#####").asCheckBoxItem();
  var bb = form.getItemById("#####").asCheckBoxItem();
  var cc = form.getItemById("####").asCheckBoxItem();  
  */
  
  // Get the drop down data from the sheet
  var aaa = getShetValueAsChoices(sheet, 3, 1);
  var bbbb = getShetValueAsChoices(sheet, 3, 2);
  var ccc = getShetValueAsChoices(sheet, 3, 3);
  
  /*
  Logger.log(' Choice List 1: '+ aaa);
  Logger.log(' Choice List 2: '+ bbb);
  Logger.log(' Choice List 3: '+ ccc);
  */
  
  // populate the drop-down with the array data
  // Setting the choice array to drop down item.
  a.setChoiceValues(aaa);
  b.setChoiceValues(bbb);
  c.setChoiceValues(ccc);
  
}

function getShetValueAsChoices(sheet, row, column) {
  
  // grab the values in the first column of the sheet - use 2 to skip header row 
  var sheetValues = sheet.getRange(row, column, sheet.getMaxRows() - 1).getValues();
  // ss.getRangeByName('EmployeeLocations').getValues().sort();
  // var options2DArr = SpreadsheetApp.openById(OPTIONS_SPREADSHEET_ID).getSheetByName(OPTIONS_SHEET_NAME).getRange(OPTIONS_RANGE).getValues();
  /*
  var options = options2DArr.reduce(function(a, e) {
    if (e[0] != "") {
      return a.concat(e[0]);
    }
    return a;
  }, []);
  */
  //var dates = doc.getRange("dates!A1:A10").getValues(); //available options
  //var taken_dates = doc.getRange("responses!F2:F51").getValues(); //just getting first 50 responses 
  
  var choices = [];

  // convert the array ignoring empty cells
  for(var i = 0; i < sheetValues.length; i++)    
    if(sheetValues[i][0] != "")
      choices[i] = sheetValues[i][0];
  
  // return the option items
  return choices;
}

function sendNotification(e) {
  if (e.value == 'Hi' && e.range.columnStart == 4 && e.range.rowStart > 1) {
    var email = 'suresh@gmail.com';
    MailApp.sendEmail(email, 'Test Subject-Mail by Google Script', 'This is Suresh Arumugam')
  }
}
