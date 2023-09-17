"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.claim = exports.upload = exports.getUserMedia = exports.getMedia = void 0;
const Type = __importStar(require("../models/types"));
const media_1 = require("../models/media");
const crypto_1 = require("crypto");
const aws_1 = require("../utils/aws");
const supportedExtension = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
const getMedia = async (req, res) => {
    const { media_id } = req.query;
    let m = parseInt(media_id);
    if (isNaN(m)) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: {}
        });
        return;
    }
    let media = new media_1.Media();
    let resp = await media.get(m);
    media.close();
    if (resp.status != 100) {
        res.status(400).json({
            status: resp.status,
            message: resp.message,
            content: {}
        });
        return;
    }
    res.status(200).json({
        status: resp.status,
        message: resp.message,
        content: resp.content
    });
};
exports.getMedia = getMedia;
const getUserMedia = async (req, res) => {
    const { user_id } = req.params;
    if (!user_id) {
        res.status(400).json({
            status: 403,
            message: Type.StatusTypes[403],
            content: {}
        });
        return;
    }
    let UID = Number(user_id);
    if (isNaN(UID)) {
        res.status(400).json({
            status: 404,
            message: Type.StatusTypes[404],
            content: {}
        });
        return;
    }
    let media = new media_1.Media();
    let resp = await media.getAll(UID);
    media.close();
    res.status(resp.status != 100 ? 200 : 400).json({
        status: resp.status,
        message: resp.message,
        content: resp.content
    });
};
exports.getUserMedia = getUserMedia;
const upload = async (req, res) => {
    const REGION = process.env.AWS_REGION;
    const BUCKET = process.env.AWS_BUCKET_NAME;
    const KEY = `${(0, crypto_1.randomUUID)()}`;
    if (!REGION || !BUCKET || !KEY) {
        res.status(400).json({
            status: 400,
            message: "Missing access information",
            content: {}
        });
        return;
    }
    try {
        let clientUrl = await (0, aws_1.createPresignedUrlWithoutClient)({
            region: REGION,
            bucket: BUCKET,
            key: KEY,
        });
        res.status(200).json({
            status: 100,
            message: "success",
            content: {
                url: clientUrl,
                key: KEY
            }
        });
        return;
    }
    catch (err) {
        res.status(400).json({
            status: 404,
            message: err,
            content: {}
        });
        return;
    }
};
exports.upload = upload;
const claim = async (req, res) => {
    const { user_id } = req.params;
    const { key } = req.body;
    if (!user_id) {
        res.status(400).json({
            status: 403,
            message: Type.StatusTypes[403],
            content: {}
        });
        return;
    }
    if (!key) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                example: {
                    key: "random-key.png"
                }
            }
        });
        return;
    }
    let UID = Number(user_id);
    if (isNaN(UID)) {
        res.status(400).json({
            status: 404,
            message: Type.StatusTypes[404],
            content: {}
        });
        return;
    }
    let media = new media_1.Media();
    let resp = await media.add(`https://${process.env.AWS_CDN}/${key}`, UID);
    media.close();
    res.status(resp.status != 100 ? 400 : 200).json({
        status: resp.status,
        message: resp.message,
        content: resp.status != 100 ? resp.content : { ...resp.content, link: `https://${process.env.AWS_CDN}/${key}` }
    });
};
exports.claim = claim;
