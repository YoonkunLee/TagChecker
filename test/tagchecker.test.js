const assert = require('assert');
const foo = require('../source/tagchecker');

describe('Test CheckVaildation', () => {
    it('Pass Validation', () =>{
        const testArray = ["B","C","/C","/B"];
        const actual = foo.CheckVaildation(testArray);
        const expected = "Correctly tagged paragraph";
        assert.equal(actual, expected);
    });
    it('Fail Validation - Nesting Issue', ()=> {
        const testArray = ["C", "D", "/C", "/D"];
        const actual = foo.CheckVaildation(testArray);
        const expected = "Expected </D> found </C>";
        assert.equal(actual, expected);
    });
    it('Fail Validation - Opening Tag Forgetten Issue', ()=> {
        const testArray = ["D", "/D", "/C"];
        const actual = foo.CheckVaildation(testArray);
        const expected = "Expected # found </C>";
        assert.equal(actual, expected);
    });
    it('Fail Validation - Closing Tag Forgetten Issue', ()=> {
        const testArray = ["C", "D", "/D"];
        const actual = foo.CheckVaildation(testArray);
        const expected = "Expected </C> found #";
        assert.equal(actual, expected);
    });
});

describe('Test Whole Process With Examples', () => {
    it('Example 1', () =>{
        const testString = "The following text<C><B>is centred and in boldface</B></C>"
        const actual = foo.TestTagChecker(testString);
        const expected = "Correctly tagged paragraph";
        assert.equal(actual, expected);
    });
    it('Example 2', () =>{
        const testString = "<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence"
        const actual = foo.TestTagChecker(testString);
        const expected = "Correctly tagged paragraph";
        assert.equal(actual, expected);
    });
    it('Example 3', () =>{
        const testString = "<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>"
        const actual = foo.TestTagChecker(testString);
        const expected = "Expected </C> found </B>";
        assert.equal(actual, expected);
    });
    it('Example 4', () =>{
        const testString = "<B>This should be in boldface, but these is an extra closing tag</B></C>"
        const actual = foo.TestTagChecker(testString);
        const expected = "Expected # found </C>";
        assert.equal(actual, expected);
    });
    it('Example 5', () =>{
        const testString = "<B><C>This should be centred and in boldface, but there is a missing closing tag</C>"
        const actual = foo.TestTagChecker(testString);
        const expected = "Expected </B> found #";
        assert.equal(actual, expected);
    });
});