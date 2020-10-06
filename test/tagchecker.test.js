var assert = require('assert');
var resultString = [];
 
function CollectTags(text)
{
    this.text = text;
    var tag = "";
    var tags = [];

    for (var j = 0; j < this.text.length; j++)
    {
        if (this.text.charAt(j) == '<') {
           
            if (text.charAt(j + 1) == '/') {
                tag = "/";

                var result = TagCheckLastTwoChar(j + 2, tag);
                if (result != null) {
                    tags.push(result);
                }
                
                    
            }
            else {
                var result = TagCheckLastTwoChar(j + 1, tag);
                if (result != null) {
                    tags.push(result);
                }
            }
        }
        tag = "";
    }
    var returnArray = tags;
    tags = [];
    return returnArray;
}

function TagCheckLastTwoChar(index, tag)
{
    var completetag;
    if (this.text.charAt(index).match(/[a-zA-Z]/i)) {
        if (this.text.charAt(index).toUpperCase() == this.text.charAt(index)) {
            if (this.text.charAt(index + 1) == '>') {
                tag += this.text.charAt(index);

                completetag = tag;
            }
            return completetag;
        }
    }
    else {
        return null;
    }
}

function CheckVaildation(tags) {
    var stack = [];
    var checkTags = tags; 
    var stackLength;
    var vaild = true;
    resultString = "";
    for (var i = 0; i < checkTags.length; i++) {
        if (checkTags[i].charAt(0) == '/') {
            stackLength = stack.length;
            if (stackLength != 0) {   
                if (stack[stackLength - 1].charAt(0) === checkTags[i].charAt(1)) {
                    stack.splice(stackLength - 1, stackLength);
                }
                else {
                    resultString = "Expected </" + stack[stackLength - 1] + "> found <" + checkTags[i] + ">";
                    vaild = false;
                    break;
                }
            }
            else {
                resultString = "Expected # found <" + checkTags[i] + ">";
                vaild = false;
                break;
            }
        }
        else {
            var tag = checkTags[i];
            stack.push(tag);
        }
    }

    if (stack.length > 0 && vaild == true) {
        resultString = "Expected </" + stack[stack.length -1] + "> found #";
        vaild = false;
    }

    if (vaild == true) {
        resultString = "Correctly tagged paragraph";
    }

    stack = [];
    checkTags = null;
    tags = [];

    return resultString;
}

function TagChecker(text) {
    var resultTag = CollectTags(text);
    return CheckVaildation(resultTag);
}

describe('Test CollectTags', () => {
    it('return 4 tags', () =>{
        var testString = "<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>"
        var actual = CollectTags(testString);
        var expected = 4;
        assert.equal(actual.length , expected);
    });

    it('return 6 tags', () =>{
        var testString = "<B><C> This should be centred and in boldface, <B><//T><A>but the tags are wrongly nested </B></C>"
        var acutal = CollectTags(testString);
        var expected = 6;
        assert.equal(acutal.length, expected);
    });
});

describe('Test CheckVaildation', () => {
    it('Pass Validation', () =>{
        var testArray = ["B","C","/C","/B"];
        var actual = CheckVaildation(testArray);
        var expected = "Correctly tagged paragraph";
        assert.equal(actual, expected);
    });
    it('Fail Validation - Nesting Issue', ()=> {
        var testArray = ["C", "D", "/C", "/D"];
        var actual = CheckVaildation(testArray);
        var expected = "Expected </D> found </C>";
        assert.equal(actual, expected);
    });
    it('Fail Validation - Opening Tag Forgetten Issue', ()=> {
        var testArray = ["D", "/D", "/C"];
        var actual = CheckVaildation(testArray);
        var expected = "Expected # found </C>";
        assert.equal(actual, expected);
    });
    it('Fail Validation - Closing Tag Forgetten Issue', ()=> {
        var testArray = ["C", "D", "/D"];
        var actual = CheckVaildation(testArray);
        var expected = "Expected </C> found #";
        assert.equal(actual, expected);
    });
});

describe('Test Whole Process With Examples', () => {
    it('Example 1', () =>{
        var testString = "The following text<C><B>is centred and in boldface</B></C>"
        var actual = TagChecker(testString);
        var expected = "Correctly tagged paragraph";
        assert.equal(actual, expected);
    });
    it('Example 2', () =>{
        var testString = "<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence"
        var actual = TagChecker(testString);
        var expected = "Correctly tagged paragraph";
        assert.equal(actual, expected);
    });
    it('Example 3', () =>{
        var testString = "<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>"
        var actual = TagChecker(testString);
        var expected = "Expected </C> found </B>";
        assert.equal(actual, expected);
    });
    it('Example 4', () =>{
        var testString = "<B>This should be in boldface, but these is an extra closing tag</B></C>"
        var actual = TagChecker(testString);
        var expected = "Expected # found </C>";
        assert.equal(actual, expected);
    });
    it('Example 5', () =>{
        var testString = "<B><C>This should be centred and in boldface, but there is a missing closing tag</C>"
        var actual = TagChecker(testString);
        var expected = "Expected </B> found #";
        assert.equal(actual, expected);
    });
});