import { Request, Response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";
import { Media } from "../models/media";

import { randomUUID } from "crypto";
import { createPresignedUrlWithoutClient } from "../utils/aws";

const supportedExtension = ['png', 'jpg', 'jpeg', 'webp', 'gif']

export const getMedia = async (req: Request, res: Response) => {

    const { media_id } = req.query

    let m = parseInt(media_id as string)

    if (isNaN(m)) {
        res.status(400).json(
            {
                status: 401,
                message: Type.StatusTypes[401],
                content: {}
            }
        )
        return
    }

    let media = new Media()
    let resp = await media.get(m)
    media.close()
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

export const getUserMedia = async (req: Request, res: Response) => {
    const { user_id } = req.params

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
    if (isNaN(UID)) {
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

    let media = new Media()
    let resp = await media.getAll(UID)
    media.close()

    res.status(resp.status != 100 ? 200 : 400).json(
        {
            status: resp.status,
            message: resp.message,
            content: resp.content
        }
    )

}

export const upload = async (req: Request, res: Response) => {
    const REGION = process.env.AWS_REGION;
    const BUCKET = process.env.AWS_BUCKET_NAME;

    const { extension, size } = await req.body

    if (!extension) {

        res.status(400).json(
            {
                status: 400,
                message: "Missing extension: expected jpg,jpeg, png, webp, gif ",
                content: {}
            }
        )
        return
    }

    if (!supportedExtension.includes(extension)) {

        res.status(400).json(
            {
                status: 401,
                message: `Files extension not supported : expect ${supportedExtension} found: ${extension}`,
                content: {}
            }
        )
        return
    }

    if (!size) {

        res.status(400).json(
            {
                status: 401,
                message: "Missing size: expected 0 < size <= 2000000 ",
                content: {}
            }
        )
        return

    }

    if (size > 2000000) {

        res.status(400).json(
            {
                status: 401,
                message: "File to big: expected 0 < size <= 2000000 ",
                content: {}
            }
        )
        return
    }


    const KEY = `${randomUUID()}.${extension}`;

    if (!REGION || !BUCKET || !KEY) {
        res.status(400).json(
            {
                status: 400,
                message: "Missing access information",
                content: {}
            }
        )
        return
    }

    try {

        let clientUrl = await createPresignedUrlWithoutClient({
            region: REGION,
            bucket: BUCKET,
            key: KEY,
        });

        res.status(200).json(
            {
                status: 100,
                message: "success",
                content: {
                    url: clientUrl,
                    key: KEY
                }
            }
        )
        return

    } catch (err) {

        res.status(400).json(
            {
                status: 404,
                message: err,
                content: {}
            }
        )
        return
    }
}

export const claim = async (req: Request, res: Response) => {
    const { user_id } = req.params
    const { key } = req.body
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

    let UID = Number(user_id);
    if (isNaN(UID)) {
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

    let media = new Media()
    let resp = await media.add(`https://${process.env.AWS_CDN}/${key}`,UID)
    media.close()

    res.status(resp.status != 100 ? 200 : 400).json(
        {
            status: resp.status,
            message: resp.message,
            content:resp.status != 100 ? resp.content : {...resp.content,link:`https://${process.env.AWS_CDN}/${key}`}
        }
    )
}

