(function(HostAdmin){
	
	var fire_config = (function(){
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		prefs = prefs.getBranch("extensions.hostadmin.");

		return {
			set: function(key, value){
				if (typeof(value) === "boolean"){
					prefs.setBoolPref(key, value);
				}else{
					prefs.setComplexValue(key, Components.interfaces.nsISupportsString, value);
				}
			},
			get: function(key){
				if (prefs.prefHasUserValue(key)){
					
					if (prefs.getPrefType(key) == prefs.PREF_BOOL){
						return prefs.getBoolPref(key);
					}else { // not others here
						return prefs.getComplexValue(key, Components.interfaces.nsISupportsString).data;
					}

				}
				return undefined;
			},
			run_when_not_equal: function(key, value, f){
				var v = this.get(key);
				if(v && v != value){
					f(v);
				}
			}
		};
	})();

	HostAdmin.config = fire_config;
})(window.HostAdmin);
