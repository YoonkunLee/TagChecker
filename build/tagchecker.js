var text;
var stack = [];
var resultString = [];
var tags = [];

//Take input string and collect tags 
//Return array of tags
function CollectTags(text)
{
    this.text = text;
    var tag = "";
    //Collect each char from text and define tags
    //If find tags, store that tag into tags array
    for (var j = 0; j < this.text.length; j++)
    {
        if (this.text.charAt(j) == '<') {
           
            if (text.charAt(j + 1) == '/') {
                tag = "/";
                TagCheckLastTwoChar(j + 2, tag);                                                
            }
            else {
                TagCheckLastTwoChar(j + 1, tag);               
            }
        }
        tag = "";
    }
    var returnArray = tags;
    //clear tags array for memory leak
    tags = [];
    return returnArray;
}

//Define last two charcters are match with tags 
function TagCheckLastTwoChar(index, tag)
{
    var completetag;
    if (this.text.charAt(index).match(/[a-zA-Z]/i)) {
        if (this.text.charAt(index).toUpperCase() == this.text.charAt(index)) {
            if (this.text.charAt(index + 1) == '>') {
                tag += this.text.charAt(index);
                completetag = tag;
            }
            tags.push(completetag);
        }
    }
}

function CheckVaildation(tags) {
    var checkTags = tags; 
    var stackLength
    var vaild = true;
    resultString = "";

    for (var i = 0; i < checkTags.length; i++) {
        //From array tags list, find Opening tag to store in the stack array, or find cloing tag to pass other condition
        if (checkTags[i].charAt(0) == '/') {
            stackLength = stack.length;
            //Check stack length, if it is 0 opening tag forgetting issue
            if (stackLength != 0) {      
                //If current closing tag is match with opening tag from last stack array, delete last stack element            
                if (stack[stackLength - 1].charAt(0) == checkTags[i].charAt(1)) {
                    stack.splice(stackLength - 1, stackLength);
                }
                //If current closing tag is not match with opening tag from last stack array, nesting tag issue
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
    //If stack array has element, it is close tag forgetting issue
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
//Return result and show in HTML 
function TagChecker(text) {
    var resultTag = CollectTags(text);
    if(resultTag.length > 0){
        $("p").text(CheckVaildation(resultTag));
    }
    else{
        $("p").text("No tags found! Please Try Again!");
    } 
}