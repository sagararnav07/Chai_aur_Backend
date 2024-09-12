//in asyncHandler file we have created promise to catch error but ther is no standard way 
//to catch an error so we use apiError to create a standard error control

//if ApiError comes it should be in this manner

/*Creating apiError.js and apiResponse.js files is a common practice in web development to handle API errors and responses consistently. These two files help maintain a cleaner codebase by centralizing the logic for sending success and error responses in your application. */
/*1. apiError.js (Custom Error Handling)
This file contains a custom error class that extends the default JavaScript Error object. It allows you to create meaningful API errors with additional information like status codes and error messages.
*/


class apiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = "" //error stack
    ){
        super(message) //override
        this.statusCode = statusCodethis
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors
        
        
//Error.captureStackTrace(this):This captures the current execution stack trace and attaches it to the error object (this in this case).
//This provides useful debugging information, such as where the error originated, by recording the call stack at the point the error was created.
//this.constructor:
//This argument specifies the constructor that should be excluded from the stack trace. In this case, this.constructor is the function (class) that is being executed. By passing this.constructor, you are telling Node.js to omit the constructor itself from the stack trace, allowing it to be cleaner and focused on the root cause of the error.

        if (stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export{apiError}