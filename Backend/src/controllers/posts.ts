import { Post } from '../models/posts';
import { Request, Response, response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";
import { Tags } from '../models/tags';
import { checkResponse } from '../utils/response';
import { Like } from '../models/likes';

export const addPost = async (req:Request, res:Response)=>{
    //TODO
    const {tag,content,media} = req.body

    if (!tag ||!content){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    exemple:{
                        tag:"@xyz",
                        content:"test content",
                        media:0
                    }
                }
            }
        )
        return
    }

    let post_obj = new Post()
    let tag_obj = new Tags()
    
    //check tag 

    let tag_response = await tag_obj.getTag(tag)

    if (!checkResponse(tag_response,res))return

    const {id,type} = tag_response.content as {id:number,type:string}

    if (type != Type.TagTypes.USER){
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: "Wrong tag type: "+tag 
            }
        )
        return
    }

    let post_response = await post_obj.add(id,content,media||0)

    if (!checkResponse(post_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )

}

export const like = async (req:Request, res:Response)=>{
    const {tag,context_id} = req.body

    if ( !tag || !context_id){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    example:{
                        tag:"@xyz",
                        context_id:"test content"
                    }
                }
            }
        )
        return
    }
    
    let like_obj = new Like()
    let tag_obj = new Tags()

    let tag_response = await tag_obj.getTag(tag)

    if (!checkResponse(tag_response,res))return

    const {id,type} = tag_response.content as {id:number,type:string}

    if (type != Type.TagTypes.USER){
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: "Wrong tag type: "+tag 
            }
        )
        return
    }

    

    let like_response = await like_obj.like(context_id,id,Type.LikeType.POST)

    if (!checkResponse(like_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )
}