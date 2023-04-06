import uvicorn
import cloudinary
import cloudinary.uploader
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

cloudinary.config( 
  cloud_name = "drq0ppqcl", 
  api_key = "987225648978334", 
  api_secret = "YmzPITck1lP7uBG41WbwuTIEsIE" 
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def uploader(file: UploadFile = File(...)):
    type = file.content_type.upper()
    if(len(type) > 0 and (type.find("JPEG") > -1 or type.find("PNG") > -1)):
        result = cloudinary.uploader.upload(file.file, public_id = "demo/uploader")
        url = result.get("url")
        return {
            "error": False,
            "url": url,
            "message": "success"
        }
    else:
        return {
            "error": True,
            "message": "Only upload JPEG / PNG formats."}
        
        
        
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)