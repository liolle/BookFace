import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { fromEnv } from "@aws-sdk/credential-providers";
import { parseUrl } from "@smithy/url-parser";
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from "@smithy/protocol-http";
import { formatUrl } from "@aws-sdk/util-format-url";
import https from "https";
import { randomUUID } from "crypto";

export const createPresignedUrlWithoutClient = async ({
  region,
  bucket,
  key,
}: {
  region: string;
  bucket: string;
  key: string;
}) => {
  const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);

  console.log(key);

  const presigner = new S3RequestPresigner({
    credentials: fromEnv(),
    region,
    sha256: Hash.bind(null, "sha256"),
  });

  return new Promise<string>(async (resolve, reject) => {
    try {
      const signedUrlObject = await presigner.presign(
        new HttpRequest({ ...url, method: "PUT" })
      );
      resolve(formatUrl(signedUrlObject));
    } catch (error) {
      reject(error);
    }
  });
};
