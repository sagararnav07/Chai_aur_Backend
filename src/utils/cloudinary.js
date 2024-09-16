//file handling

import {v2 as cloudinary} from "cloudinary"
import fs from "fs" //imporing file system it is by default avialable in node.js

/*We should not upload a file directly to cloudinary 1st we should upload it on our local server then it should be uploaded on cloudinary as it reduces the risk of error and we can reuse the function */
//1.copy paste in .env file  2.assign variable in .env file  3.give the address to config in this file 
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key:process.env.CLOUDINARY_API_KEY  , 
    api_secret:process.env.CLOUDINARY_API_SECRE
});

//creataing a sperate general reusable function to upload a file on cloudinary

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        //to upload file on cloudinary we will use async/await as it is tedious long process
        // uploader.upload has many more features read documentation
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: auto //auto detect file type
        })
        //if file has been uploaded successfully
        console.log("File has been uploaded on cloudinary",response.url); //response.url will give you the uploaded file url
        return response //it will return all response to the user
        
    } catch (error) {
        fs.unlink(localFilePath)//remove the localley saved temporary file as the upload operation got failed
        
    }
}

export{uploadOnCloudinary}