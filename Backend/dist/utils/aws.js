"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPresignedUrlWithoutClient = void 0;
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const credential_providers_1 = require("@aws-sdk/credential-providers");
const url_parser_1 = require("@smithy/url-parser");
const hash_node_1 = require("@smithy/hash-node");
const protocol_http_1 = require("@smithy/protocol-http");
const util_format_url_1 = require("@aws-sdk/util-format-url");
const createPresignedUrlWithoutClient = async ({ region, bucket, key, }) => {
    const url = (0, url_parser_1.parseUrl)(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
    console.log(key);
    const presigner = new s3_request_presigner_1.S3RequestPresigner({
        credentials: (0, credential_providers_1.fromEnv)(),
        region,
        sha256: hash_node_1.Hash.bind(null, "sha256"),
    });
    return new Promise(async (resolve, reject) => {
        try {
            const signedUrlObject = await presigner.presign(new protocol_http_1.HttpRequest({ ...url, method: "PUT" }));
            resolve((0, util_format_url_1.formatUrl)(signedUrlObject));
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.createPresignedUrlWithoutClient = createPresignedUrlWithoutClient;
