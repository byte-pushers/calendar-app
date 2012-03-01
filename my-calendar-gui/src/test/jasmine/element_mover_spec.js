describe('the ElementMover object',function(){
	
	var rootId = 'testContainer';
	
	//Create an easily-removed container for our tests to play in
	beforeEach(function() {
		var container = document.createElement('div');
		container.setAttribute('id',rootId);		
		document.body.appendChild(container);
	});
	
	//Clean it up after each spec
	afterEach(function() {
		var container = document.getElementById(rootId);
		container.parentNode.removeChild(container);
	});
		
	//Specs
	describe('instantiation',function() {
		it('throws an exception if you forget "new"',function(){
			var thrown;
			try {
				var oops = ElementMover();
			} catch(e) {
				thrown = e;
			}
			expect(thrown).toBe('Remember to use new on constructors!');
		});
	});
	
	describe('moving around two divs',function() {
		var div1,div2;
		var mover = new ElementMover();
		
		beforeEach(function(){
			div1 = document.createElement('div');			
			appendToContainer(div1);
			div2 = document.createElement('div');
			appendToContainer(div2);
		});
		
		it('initially sees that div1 is above div2',function(){
			expect(div1.nextSibling).toBe(div2);
		});
		
		it('moves div1 after div2',function() {
			mover.moveElementAfter(div1,div2);
			
			expect(div2.nextSibling).toBe(div1);
		});
		
		it('moves div2 before div1',function() {
			mover.moveElementBefore(div2,div1);
			
			expect(div1.previousSibling).toBe(div2);
		});
		
		describe('adding a third div to the mix',function() {
			var div3;
			beforeEach(function() {
				div3 = document.createElement('div');
				appendToContainer(div3);
			});
			
			it('moves div1 betwixt div2 & div3',function(){
				mover.moveElementAfter(div1,div2);

				expect(div2.nextSibling).toBe(div1);
				expect(div3.previousSibling).toBe(div1);
			});
			
			it('moves div3 before div1',function() {
				mover.moveElementBefore(div3,div1);
				
				expect(div1.previousSibling).toBe(div3);
				expect(div2.nextSibling).not.toBe(div3);
			});
		});
	});
	
	//private convenience method
	var appendToContainer = function(element) {
		var container = document.getElementById(rootId);
		container.appendChild(element);		
	}

});