// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var window = Ti.UI.createWindow({
	backgroundColor: "white"
});
var label = Ti.UI.createLabel();
window.add(label);
window.open();

// load the Intent module
var intentModule = require("com.foodonthetable.intent");
Ti.API.info("module is => " + intentModule);

if (Ti.Platform.name == "android") {
	// open voice recognition
	var intent = Ti.Android.createIntent({
		action: "android.speech.action.RECOGNIZE_SPEECH"
	});
	
	intent.putExtra("calling_package", "com.foodonthetable.intent");
	intent.putExtra("android.speech.extra.PROMPT", "Start speaking...");
	intent.putExtra("android.speech.extra.LANGUAGE_MODEL", "free_form");
	
	// pass an int value to the intent via the Intent module
	intentModule.putIntExtra(intent, "android.speech.extra.RESULTS", 5);
	
	Ti.Android.currentActivity.startActivityForResult(intent, callback);
	
	function callback(event) {
		// parse the intent results via the Intent module
		var results = intentModule.getStringArrayListExtra(event.intent, "android.speech.extra.RESULTS");
		
		if (results && results.length) {
			var str = "";
			for (var i in results) {
				str += results[i] + "\n";
			}
			label.text = str;
		}
	}
}
