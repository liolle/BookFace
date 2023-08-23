import { Request, Response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";
import { Tags } from "../models/tags";

export const getPublicProfile = async (req: Request, res: Response) => {
    let { u_tag } = req.params

    if (!u_tag) {
        getProfile(req, res)
        return
    }

    let user = new User()
    let resp = await user.getProfile(u_tag)
    user.close()
    res.status(200).json(
        {
            status: resp.status,
            message: resp.message,
            content: resp.content
        }
    )
}

export const getProfile = async (req: Request, res: Response) => {

    let user = new User()
    let resp = await user.getProfile(req.params.user_tag)
    user.close()
    if (resp.status != 100) {
        res.status(400).json(
            {
                status: resp.status,
                message: resp.message,
                content: {}
            }
        )
        return
    }

    res.status(200).json(
        {
            status: resp.status,
            message: resp.message,
            content: resp.content
        }
    )

}

export const changeTag = async (req: Request, res: Response) => {

    const { new_tag } = req.body

    if (!new_tag) {
        res.status(400).json(
            {
                status: 400,
                message: Type.StatusTypes[400],
                content: {
                    example: {
                        new_tag: "xyz"
                    }
                }
            }
        )
        return
    }

    let tag = new Tags()
    let resp = await tag.updateTag(req.params.user_tag, "@" + new_tag)
    tag.close()
    if (resp.status != 100) {
        res.status(400).json(
            {
                status: resp.status,
                message: resp.message,
                content: resp.content
            }
        )
        return
    }

    res.status(200).json(
        {
            status: resp.status,
            message: resp.message,
            content: resp.content
        }
    )

}

export const changeAvatar = async (req: Request, res: Response) => {

    const { key } = req.body
    const {user_id} = req.params

    if (!user_id) {
        res.status(400).json(
            {
                status: 403,
                message: Type.StatusTypes[403],
                content: {
                }
            }
        )
        return
    }

    let UID = Number(user_id);
    if (isNaN(UID)){
        res.status(400).json(
            {
                status: 404,
                message: Type.StatusTypes[404],
                content: {
                }
            }
        )
        return
    }

    if (!key) {
        res.status(400).json(
            {
                status: 400,
                message: Type.StatusTypes[400],
                content: {
                    example: {
                        key: "random-key.png"
                    }
                }
            }
        )
        return
    }

    let URL = `https://${process.env.AWS_CDN}/${key}`
    let user = new User()
    let user_response = await user.changeAvatar(UID,URL)
    user.close()

    if (user_response.status != 100){
        res.status(400).json(
            {
                status: user_response.status,
                message: user_response.message,
                content: user_response.content
            }
        )
        return
    }

    res.status(200).json(
        {
            status: 100,
            message: Type.StatusTypes[100],
            content: {
                
            }
        }
    )


}
