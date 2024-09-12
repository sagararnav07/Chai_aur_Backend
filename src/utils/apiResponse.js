/*2. apiResponse.js (Consistent Response Handling)
This file standardizes how success and error responses are sent from the API. It simplifies sending structured and consistent responses to the client.*/ 
class apiResponse{
    constructor(statusCode, data, massage = "Success"){
        this.statusCode = statusCode,
        this.data = data,
        this.message = message
        this.succeess = statusCode < 400
    }
}