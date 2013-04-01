 describe("Math API", function(){
	it("Subtracting a smaller number from a bigger number should yield a negative number.", function(){
		var smallerNumber = 5;
		var biggerNumber = 6;
		
		expect(smallerNumber-biggerNumber).toEqual(-1);
	});
	
	it("Negative number is smaller than a positive number.", function(){
		var negativeNumber = -5;
		var biggerNumber = 5;
		
		expect(negativeNumber<biggerNumber).toEqual(true	);
	});
});