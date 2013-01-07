var NoesisCode = NoesisCode || {};
NoesisCode.modules = NoesisCode.namespace("com.noesiscode.modules");
NoesisCode.modules.calendar = angular.module("calendar", []);
NoesisCode.modules.calendar.value('a', 123);
NoesisCode.modules.calendar.directive ('draggableThing', function() {
    "use strict";
	return {
		restrict : 'A', // attribute only
		link : function (scope, elem, attr, ctrl) {
			elem.bind ('dragstart', function(event) {
				"use strict";
				event.target.style.opacity = '0.4';  // this / event.target is the source node.
				this.dragSourceElement = event.target;
				event.dataTransfer.effectAllowed = "move";
				event.dataTransfer.setData("text/html", event.target.id);
			});
		}
	};
});