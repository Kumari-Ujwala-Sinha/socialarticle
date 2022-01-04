export const checkImage=(file)=>{
    let err=""
    if (!file) return err="File does not exist"
    if (file.size > 1024 * 1024) return err="The largest image size is 1mb."
    if (file.type !=="image/jpeg" && file.type !=="image/png") return err="File format is incorrect"
    return err; 
}

export const imageUpload = async (images)=>{
    let imgArray =[]
    for (const item of images){
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset","azoqcbg6")
        formData.append("cloud_name","dtl11nkyo")
        const res= await fetch("https://api.cloudinary.com/v1_1/dtl11nkyo/image/upload",{
            method:"POST",
            body:formData
        })
        const data=  await res.json()
        imgArray.push({public_id:data.public_id, url:data.secure_url})
        console.log(data)

    }
    return imgArray;
}