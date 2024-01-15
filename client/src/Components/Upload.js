import React from "react";
import axios from "axios";

const Upload = (props) => {

  const addImageId=async()=>{
    try{
    let id=document.getElementById("docker_image_id_2");
    let res=await axios.post("http://localhost:5000/user/addImage",{
      imageName:id.value,
      userEmail:props.email,
      type:'image-name',
    })
    alert("File Uploaded")
    console.log(res);
  }
  catch(e){
    if(e?.response?.data!="java.lang.StackOverflowError")
    alert("File Upload Failed")
    else
    alert("File Uploaded")
    console.log(e.response);
  }
  }
  const addGithubUrl=async()=>{
    try{
    let id=document.getElementById("docker_image_id_3");
    let res=await axios.post("http://localhost:5000/user/addImage",{
      imageName:id.value,
      githubUrl:id.value,
      userEmail:props.email,
      type:'github-url',
    })
    console.log(res);
    alert("File Uploaded")
  }
  catch(e){
    if(e?.response?.data!="java.lang.StackOverflowError")
    alert("File Upload Failed")
    else
    alert("File Uploaded")

    console.log(e);
  }
  }
  const uploadFile = async () => {
    try{
    let file = document.getElementById("uploadedFile").files[0];
    if (!file) {
      alert("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try{
      const data = {
        imageName: file.name,
        tarFileBase64String: reader.result,
        userEmail: props.email,
        type:'image-tar',
      };
      console.log(typeof(reader.result))
      console.log(data);
      const res = await axios.post("http://localhost:5000/user/addImage", data);
      // console.log(res.data);
      alert("File Uploaded")
    }
    catch(e){
      console.log(e)
      if(e?.response?.data!="java.lang.StackOverflowError")
      alert("File Upload Failed")
      else
      alert("File Uploaded")
    }
  }
  }
  catch(e){
    console.log(e)
  }
  
  };
  return <div class="mx-2 mt-10 xl:mx-20 flex flex-col items-center justify-center border-2 p-10 border-gray-400">
    <h1 class="mb-5 text-3xl">Upload Your Image<br /></h1>
    <div class="flex xl:w-2/4 w-full  items-center justify-center">
      <label for="uploadedFile" class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        
      <div class="flex flex-col items-center justify-center pb-6 pt-5">
      <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="uploadedFile" type="file"/>
      <svg class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
        </div>
      </label>
    </div>
    <button class="group relative mb-2 me-2 mt-10 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
    onClick={uploadFile}>
      <span class="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900"> Submit </span>
    </button>
    <h1 class="mb-5 mt-10 text-5xl">OR<br /></h1>
    <h1 class="mb-5 text-3xl">Enter Dockerhub Id<br /></h1>
    <input type="text" name="docker_url" id="docker_image_id_2"class="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="URL" />
  
    <button class="group relative mb-2 me-2 mt-10 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
    onClick={addImageId}>
      <span class="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900"> Submit </span>
    </button>
    <h1 class="mb-5 mt-10 text-5xl">OR<br /></h1>
    <h1 class="mb-5 text-3xl">Enter Github URL<br /></h1>
    <input type="text" name="docker_url" id="docker_image_id_3"class="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="URL" />
  
    <button class="group relative mb-2 me-2 mt-10 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
    onClick={addGithubUrl}>
      <span class="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900"> Submit </span>
    </button>
  </div>
};

export default Upload;
