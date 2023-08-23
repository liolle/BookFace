import { Request, Response, response } from "express";
import * as Type from "../models/types";
import { Tags } from '../models/tags';
import { checkResponse } from '../utils/response';
import { Like } from '../models/likes';
import { Comment } from '../models/comments';


export const addComment = async (req:Request, res:Response)=>{
    const {content,post_id,parent_comment} = req.body

    if (!content || !post_id){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    exemple:{
                        tag:req.params.user_tag,
                        content:"test content",
                        post_id:-1,
                        parent_comment:-1
                    }
                }
            }
        )
        return
    }

    let comment_obj = new Comment()
    let tag_obj = new Tags()
    let comment_response = await comment_obj.add(parseInt(req.params.user_id),post_id,content,parent_comment||-1)
    comment_obj.close()

    if (!checkResponse(comment_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )

}

export const getComment =async (req:Request, res:Response) => {
    console.log("Get comment ");
    
    const {post_id} = req.query 

    if (!post_id){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    exemple:{
                        post_id:1
                    }
                }
            }
        )
        return
    }

    let comment_obj = new Comment()
    let comment_response = await comment_obj.get(parseInt(post_id as string))
    comment_obj.close

    if (!checkResponse(comment_response,res))return

    let comment_list:Type.CommentType[] = []
    let {comments} = comment_response.content as {comments: Map<number,Type.CommentType>}
    
    for (let x of comments){
        comment_list.push(x[1])
    }
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: comment_list
        }
    )
}

export const likeComment = async (req:Request, res:Response)=>{
    const {context_id} = req.body

    if (  !context_id){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {}
            }
        )
        return
    }
    
    let like_obj = new Like()
    let like_response = await like_obj.like(context_id,parseInt(req.params.user_id),Type.LikeType.COMMENT)
    like_obj.close()

    if (!checkResponse(like_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: like_response.content
        }
    )
}