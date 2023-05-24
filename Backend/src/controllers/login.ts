import { Request, Response } from "express";
import { User } from "../models/user";
import { Session } from "../models/sessions";
import { signJWT } from "../utils/token";
import  bcrypt, { hashSync }  from "bcrypt";
import * as Type from "../models/types";


const basicConnect = async (email:string,pwd:string,hashedPwd:string,id:number,user_tag:string,session_id:number,req: Request, res: Response)=>{

    if(bcrypt.compareSync(pwd,hashedPwd)){

        const accessToken = signJWT({"email": email,"id": id,"user_tag":user_tag,"session_id":session_id}, process.env.ACCESS_TOKEN_TTL as string ||'1d');
        const refreshToken = signJWT({"email": email,"id": id,"user_tag":user_tag,"session_id":session_id}, process.env.REFRESH_TOKEN_TTL as string || '1d');
        
        try {
            // await user.update("",0,refreshToken)
                
            // res.cookie("VRToken",refreshToken,{httpOnly:true,maxAge:24*60*60*1000, sameSite:"none" ,secure:true})
            // res.cookie("VAToken",accessToken,{httpOnly:true,maxAge:20*60*1000, sameSite:"none" ,secure:true})
            res.cookie("VRToken",refreshToken,{maxAge:24*60*60*1000 ,sameSite:"none",secure:true})
            res.cookie("VAToken",accessToken,{maxAge:24*60*60*1000,sameSite:"none",secure:true})

            res.status(200).json(
                {
                    status:100,
                    message:Type.StatusTypes[100],
                    content: accessToken
                }
            )
        } catch (error) {
            res.status(400).json(
                {
                    status:404,
                    message:Type.StatusTypes[404],
                    content: {}
                }
            )
        }
    }
    else{
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: {}
            }
        )
        return
    }
}

export const login = async (req:Request, res:Response)=>{

    const {email,pwd} = req.body

    if (!email || !pwd){
        res.status(400).json(
            {
                status:404,
                message:Type.StatusTypes[404],
                content: {}
            }
        )
        return
    }

    let user = new User()
    let resp = await user.login(email,pwd)
    user.close()
    if ( resp.status != 100){
        res.status(400).json(
            {
                status:resp.status,
                message:resp.message,
                content: {}
            }
        )
        return
    }
    console.log(resp);
    
    let {hashedPWD,user_id,user_tag,session_id} = resp.content as {hashedPWD:string,user_id:number,user_tag:string,session_id:number}

    basicConnect(email,pwd,hashedPWD,user_id,user_tag,session_id,req, res)
}

export const auth = async (req:Request, res:Response)=>{


    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )
}