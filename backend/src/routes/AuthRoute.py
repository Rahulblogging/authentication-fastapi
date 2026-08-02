from fastapi import APIRouter,HTTPException,status,Depends
from src.models.User import User as UserModel,LoginUser,UpdateUser
from src.config.db import db as MongoDB
import bcrypt
import os
import bson
from dotenv import load_dotenv
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials


import jwt

load_dotenv()

JWT_AUTH = os.getenv("JWT_AUTH","")

security = HTTPBearer()



async def get_current_user(credientials:HTTPAuthorizationCredentials=Depends(security)):
    try:
        token = credientials.credentials
        payload = jwt.decode(token,JWT_AUTH,algorithms="HS256")
        return payload['userId']
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Token"
        )

        
load_dotenv()

JWT_AUTH = os.getenv("JWT_AUTH","")
router = APIRouter(prefix="/api/v1/auth")

#collection
authCollection = MongoDB['user']

@router.post("/register")
async def registerUser(data:UserModel):
    user_data = data.dict()
    user_data["email"] = user_data["email"].lower()

    #check existance of user
    check_exist = await authCollection.find_one({
        "email":data.email.lower()})
    if check_exist:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exist with this email"
        )

    salt = bcrypt.gensalt(10)
    
    user_data['password'] = bcrypt.hashpw(user_data['password'].encode(), salt).decode()

    doc = await authCollection.insert_one(user_data)
    document = await authCollection.find_one({
        "_id": doc.inserted_id},
        {
        "name":1,
        "email":1,
        "address":1,
        "mobile":1
    })

    
    document['_id'] = str(document['_id'])
        # document.pop('password', None)

    token=jwt.encode({"userId":document['_id']},JWT_AUTH,algorithm="HS256")

    return {
        "msg": "User Register Successfully",
        "token": token
    }




@router.post("/login")
async def loginUser(data:LoginUser):

    #check existance of user
    check_exist = await authCollection.find_one({
        "email":data.email.lower()
        })
    if not check_exist:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User Does not have Account"
        )
        return

    is_match = bcrypt.checkpw(data.password.encode(),check_exist["password"].encode())

    if not is_match:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Credentials"
        )
        return
    print(data)

    
    check_exist['_id'] = str(check_exist['_id'])
    del check_exist['password']
    token=jwt.encode({"userId":check_exist['_id']},JWT_AUTH,algorithm="HS256")


    return {
        "msg": "User Login Successfully",
        "token": token
    }


@router.get("/profile")
async def getProfile(data:str = Depends(get_current_user)):
    user = await authCollection.find_one({"_id":bson.ObjectId(data)},{
        "password":0
    })
    user['_id'] = str(user['_id'])
    return user


@router.put("/profile")
async def updateProfile(data:UpdateUser,
                      user:str= Depends(get_current_user)):

    await authCollection.find_one_and_update({"_id":bson.ObjectId(user)},{
        "$set":data.dict()
    })
    return {
        "msg":"Profile Updated !"
    }
    # user = await authCollection.find_one({"_id":bson.ObjectId(data)},{
    #     "password":0
    # })
    # user['_id'] = str(user['_id'])
    # return user