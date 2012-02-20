var ElementMover = function() {
	if(!(this instanceof ElementMover)) {
		throw 'Remember to use new on constructors!';
	}
};

ElementMover.prototype.moveElementBefore = function(elementToMove,elementToInsertBefore) {
	elementToMove.parentNode.removeChild(elementToMove);
	elementToInsertBefore.parentNode.insertBefore(elementToMove,elementToInsertBefore);
};

ElementMover.prototype.moveElementAfter = function(elementToMove,elementToInsertAfter) {
	elementToMove.parentNode.removeChild(elementToMove);
	if(elementToInsertAfter.nextSibling) {
		elementToInsertAfter.parentNode.insertBefore(elementToMove,elementToInsertAfter.nextSibling);
	} else {
		elementToInsertAfter.parentNode.appendChild(elementToMove);
	}
};