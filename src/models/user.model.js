import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true //not to use everytime as it decrease performance and increase cost
        },

        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true

        },

        fullname:{
            type: String,
            required: true,
            trim: true,
            index: true
        },

        avatar:{
            type: String, //cloudinary url
            required: true,
            
        },

        coverimage:{
            type: String //cloudinary url
        },

        watchhistory:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },

        password:{
            type: String,
            required: [true, 'password id required']
        },

        refreshToken:{
            type: String

        }

        
    },{timestamps: true})

    //PASSWORD AND ENCRYPTION :- using "bcrypt" -- visit bcrypt.md
    

/*It is not possible to encrypt you data directly so we use hooks from mongoose. for i.e we use ".pre"
hooks that runs when data is going to validate,save,remove,updateOne,deleteOne,init (note: init hooks are synchronous)*/

/*"next": is a middleware jab end me aapka kaam ho gya ho to "next" ko callback krna pdta hai ki flag aage pass krdo*/ 
userSchema.pre("save", async function (next) {  //here we should callback "next" function but instead of useing an arrow function we use "function(){}" necause arrow function do not give current context from "this" keyword also we use "async" as it takes time to complete
    
    if(!this.isModified("password")) //this.isModified("password"): This is a method provided by Mongoose to check whether the field "password" has been modified. It returns true if the password was changed or newly set, and false otherwise.!this.isModified("password"): The negation (!) is used to check if the password hasn't been modified. If the password hasn't been modified (i.e., false), the code calls return next();.

      return next(); //return next();: If the password was not modified, it skips the password hashing process and moves on to the next middleware or the saving process. This ensures that we only hash the password when it has been newly set or changed, and not every time the document is saved.
      this.password = bcrypt.hash(this.password, 10)//The first argument is the plain text password (this.password), which will be hashed.The second argument (10) is the salt rounds, which defines how many times the password is hashed to make it more secure. A higher number of rounds makes the hash stronger, but increases the computation time.
      next() //This calls the next middleware in the chain. In Mongoose pre-save hooks, this is essential for continuing the execution of the next step (saving the document to the database).If next() is not called, the execution will hang, and the save operation won't complete.
})
 //To check whether the given password the user enter matches. We will use ".methods" to create custom methods

 userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) //return true or false
 }
 
  //USING JWT(jsonwebtokens) --visit jwt.md

  //To generate Access token
userSchema.methods.generateAccessToken = function () {
   return jwt.sign(
        {  //payload
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET, //access token address
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY //acess token expiry address
        }
    )
}

// To generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {  //payload
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET, //Refresh token address
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY //Refresh token expiry address
        }
    )
}


    

 //JWT IS A BEARER TOKEN :- jiske paas bhi token rhega uske pass data jaega chabi ki trah h jiske paas chabi uske paas data

 //go to .env it is stored in .env

 //learn more of jwt for node on: https://github.com/auth0/node-jsonwebtoken/blob/master/README.md


 export const User = mongoose.model("User", userSchema)