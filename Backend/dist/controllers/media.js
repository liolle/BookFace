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
exports.upload = exports.getMedia = void 0;
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
const upload = async (req, res) => {
    const REGION = process.env.AWS_REGION;
    const BUCKET = process.env.AWS_BUCKET_NAME;
    const { extension, size } = await req.body;
    if (!extension) {
        res.status(400).json({
            status: 400,
            message: "Missing extension: expected jpg,jpeg, png, webp, gif ",
            content: {}
        });
        return;
    }
    if (!supportedExtension.includes(extension)) {
        res.status(400).json({
            status: 401,
            message: `Files extension not supported : expect ${supportedExtension} found: ${extension}`,
            content: {}
        });
        return;
    }
    if (!size) {
        res.status(400).json({
            status: 401,
            message: "Missing size: expected 0 < size <= 2000000 ",
            content: {}
        });
        return;
    }
    if (size > 2000000) {
        res.status(400).json({
            status: 401,
            message: "File to big: expected 0 < size <= 2000000 ",
            content: {}
        });
        return;
    }
    const KEY = `${(0, crypto_1.randomUUID)()}.${extension}`;
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
