var NoesisCode = NoesisCode || {};
NoesisCode.namespace = function (ns_string) { 
	var parts = ns_string.split('.'),
	parent = NoesisCode, i;
	// strip redundant leading global 
	if (parts[0] === "NoesisCode") {
		parts = parts.slice(1);
	}
	for (i = 0; i < parts.length; i += 1) {
		// create a property if it doesn't exist
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {}; 
		}
		parent = parent[parts[i]]; 
	}
	return parent;
};