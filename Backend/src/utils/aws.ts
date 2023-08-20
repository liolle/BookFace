


import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { fromEnv } from "@aws-sdk/credential-providers";
import { parseUrl } from "@smithy/url-parser";
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from "@smithy/protocol-http";
import { formatUrl } from "@aws-sdk/util-format-url";
import https from 'https';
import { randomUUID } from "crypto";

export const createPresignedUrlWithoutClient = async ({ region, bucket, key }: { region: string, bucket: string, key: string }) => {
    const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);

    console.log((key));
    
    const presigner = new S3RequestPresigner({
        credentials: fromEnv(),
        region,
        sha256: Hash.bind(null, "sha256"),
    });

    
    return new Promise<string>(async(resolve, reject) => {

        try {
            setTimeout(async()=>{
                const signedUrlObject = await presigner.presign(
                    new HttpRequest({ ...url, method: "PUT" })
                );
                resolve(formatUrl(signedUrlObject));
            }, Math.floor(Math.random() * 2001) + 50)
        } catch (error) {
            reject(error)
        }
        
    })
};


//front
const requestPresignedURL = async (size: number, extension: string) => {


    return new Promise<{ url: string, key: string }>(async (resolve, reject) => {
        if (!['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(extension)) {
            reject({
                url: "",
                key: ""
            })
            return
        }
        const URL = "http://localhost:3000/api/upload"

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    extension: extension,
                    size: size
                }),
            });

            const { url, key } = await response.json() as { url: string, key: string }
            
            resolve({
                url: url,
                key: key
            })

        } catch (error) {
            reject(error)
        }

    })


}

//front
const putS3 = async (url: string, data: File) => {

    return new Promise<string>(async (resolve, reject) => {

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": data.type
                },
                body: data
            })

            if (!response.ok) {
                reject("failed uploading")
                return
            }

            resolve("upload successful");

        } catch (error) {
            reject(error)
        }
    })

}

//front
const upload = async (file: File) => {

    return new Promise<string>((resolve, reject) => {

        try {
            setTimeout(async () => {
                let presignedInfo = await requestPresignedURL(file.size, file.type.split("/")[1]);
                let putStatus = await putS3(presignedInfo.url, file)
                //TODO notify the server here.
            }, Math.floor(Math.random() * 101) + 50)

            resolve("")

        } catch (error) {
            reject(error)
        }
    })

}

//front
export const multiUpload = async (files: File[]) => {
    const promiseList: Promise<string>[] = files.map(file => {
        return upload(file).catch((error) => error)
    });

    return new Promise<string[]>(async (resolve, reject) => {

        try {
            let promises = await Promise.all(promiseList)
            resolve(promises)

        } catch (error) {
            reject([])
        }
    })
}