//Take input string and collect tags 
//Return array of tags
function CollectTags(text)
{
    let tags = [];
    //Collect each char from text and define tags
    //If find tags, store that tag into tags array
    for (let j = 0; j < text.length; j++)
    {
        if (text.charAt(j) == '<') {         
            if (text.charAt(j + 1) == '/') {
                let tag = '/' + TagCheckLastTwoChar(j + 2, text);  
                checkResultAndPush(tag, tags)
            }
            else {
                let tag = TagCheckLastTwoChar(j + 1, text);  
                checkResultAndPush(tag, tags)             
            }
        }
    }
    return tags;
}

function checkResultAndPush(tag, tags){
    if(tag != null && tag != "/null" ){
        tags.push(tag);
    }
}

//Define last two charcters are match with tags 
function TagCheckLastTwoChar(index, text)
{   
    if (text.charAt(index).match(/[A-Z]/)) {
        if (text.charAt(index + 1) == '>') {
            return text.charAt(index);
        }
        else return null;  
    }
    else return null;
}

function CheckValidation(tags) {
    let Valid = true;
    let stack = [];
    let resultString;

    for (let i = 0; i < tags.length; i++) {
        //From array tags list, find Opening tag to store in the stack array, or find cloing tag to pass other condition
        if (tags[i].charAt(0) == '/') {
            //Check stack length, if it is 0 opening tag forgetting issue
            if (stack != 0) {      
                //If current closing tag is match with opening tag from last stack array, delete last stack element            
                if (stack[stack.length - 1].charAt(0) == tags[i].charAt(1)) {
                    stack.pop(stack[stack.length - 1]);
                }
                //If current closing tag is not match with opening tag from last stack array, nesting tag issue
                else {
                    resultString = "Expected </" + stack[stack.length - 1] + "> found <" + tags[i] + ">";
                    Valid = false;
                    break;
                }
            }
            else {
                resultString = "Expected # found <" + tags[i] + ">";
                Valid = false;
                break;
            }
        }
        else {           
            let tag = tags[i];
            stack.push(tag);
        }
    }
    //If stack array has element, it is close tag forgetting issue
    if (stack.length > 0 && Valid == true) {
        resultString = "Expected </" + stack[stack.length -1] + "> found #";
        Valid = false;
    }

    if (Valid == true) {
        resultString = "Correctly tagged paragraph";
    }

    return resultString;
}

function TagChecker(text) {
    let resultTag = CollectTags(text);

    if(resultTag.length > 0){
        return CheckValidation(resultTag);
    }
    else{
        return null
    }
}

//Return result and show in HTML 
function PrintTagChecker(text) {
    var resultString = TagChecker(text);
    if(resultString != null){
        $("p").text(resultString);
    }
    else{
        $("p").text("No tags found! Please Try Again!");
    } 
}

module.exports = {TagChecker, CheckValidation, CollectTags}