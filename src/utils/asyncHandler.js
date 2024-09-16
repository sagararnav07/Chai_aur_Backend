/*asyncHandler() is a middleware function typically used in Express.js to handle asynchronous operations, 
such as database queries or API calls, within route handlers. It helps streamline error handling by 
wrapping asynchronous code in a way that automatically catches any errors and passes them to the next
 middleware (such as an error handler) using next().*/

 //HELPER FILE
//1. Wrapper function (using promise)  that wil be used everywhere will reduce redundancy
const asyncHandler = (requestHandler)=>{ 
    (req,res,next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

/*In this implementation:
1. It takes a function fn (usually a route handler).
2.The middleware returns another function that executes the passed function (fn) and ensures that
 any rejected promise or thrown error is automatically passed to Express' next() function, 
 which will then call any error-handling middleware.*/


export {asyncHandler}

//ERROR CONTROL IN apiError


//2. Wrapper function (using try catch)  that wil be used everywhere will reduce redundancy
// const asyncHandler = (fn) => (req, res, next) => {} //higher order function that take another function as a parameter
   
//      try{

//      }catch(error){
//         res.status(err.code || 500).json{
//             success: false,
//             message: err.message
//         }

//      }