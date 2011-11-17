Appcelerator Titanium Intent Module
===================================

This module is intended to provide a wrapper to several methods on the
Intent class that are missing in Titanium Mobile core.  Specifically,
`getStringArrayListExtra()` and `putExtra()` for Integer values have been
made available.

Usage
-----------

1. Copy the zip file into your project directory.  (Alternatively, unzip
   the contents into your project directory.)

2. Load the module into your code wherever appropriate.

        var intentModule = require("com.foodonthetable.intent");

3. Call whichever method on the module that you need to access.

        // For putting an int extra, pass the IntentProxy reference, the
        // extra key, and the extra int value.
        var intent = Ti.Android.createIntent({
          action: "android.speech.action.RECOGNIZE_SPEECH"
        });
        intentModule.putIntExtra(intent, "android.speech.extra.MAX_RESULTS", maxResults);
        
        // For retrieving the array list 
        Ti.Android.currentActivity.startActivityForResult(intent, function(event) {
          var intent = event.intent;
          var results = intentModule.getStringArrayListExtra(intent, "android.speech.extra.RESULTS");
          
          if (results && results.length) {
            console.log("There were " + results.length + " results");
          } else {
            console.log("No results");
          }
        });
