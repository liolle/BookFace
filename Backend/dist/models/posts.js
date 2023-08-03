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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const dbConnect_1 = __importDefault(require("./dbConnect"));
const Type = __importStar(require("./types"));
const time_1 = require("../utils/time");
const user_1 = require("./user");
class Post extends dbConnect_1.default {
    constructor() {
        super();
    }
    async register(user_id, post_id) {
        return new Promise(async (resolve, reject) => {
            let register_post_query = `
            INSERT INTO bf_registeredposts (user_id, post_id) 
            SELECT user_id, post_id 
            FROM (
                SELECT 
                (SELECT id  FROM bf_users WHERE id = ${user_id}) AS user_id,
                (SELECT id  FROM bf_posts WHERE id = ${post_id}) AS post_id
            ) t
            WHERE user_id IS NOT NULL AND post_id IS NOT NULL
            ON DUPLICATE KEY UPDATE do_delete = true;
            `;
            let del_query = `
            DELETE FROM bf_registeredposts
            WHERE do_delete = true;
            `;
            this.connection.query(register_post_query, (err, rows, fields) => {
                let { affectedRows } = rows;
                if (err) {
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                this.connection.query(del_query, (err, rows, fields) => {
                    if (err) {
                        resolve({
                            status: 404,
                            message: Type.StatusTypes[404],
                            content: { error: err }
                        });
                        return;
                    }
                });
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {
                        isReg: affectedRows == 1
                    }
                });
            });
        });
    }
    async addGroupPost(group_id, user_id, content, media_id = 0, timestamp = (0, time_1.getTimeStamp)()) {
        let add_response = await this.add(user_id, content, media_id, timestamp);
        return new Promise(async (resolve, reject) => {
            if (add_response.status != 100) {
                resolve(add_response);
                return;
            }
            let last_id_query = `
                SELECT LAST_INSERT_ID() AS id;
            `;
            this.connection.query(last_id_query, (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                const id = rows[0]['id'] || 0;
                if (id == 0) {
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: {}
                    });
                    return;
                }
                let add_group_query = `
                    INSERT INTO bf_groupposts (post_id, group_id)
                    SELECT ${id}, ${group_id}
                    FROM bf_grouplist groupL
                    WHERE groupL.id = ${group_id};
                
                `;
                this.connection.query(add_group_query, (err, rows, fields) => {
                    if (err) {
                        resolve({
                            status: 404,
                            message: Type.StatusTypes[404],
                            content: { error: err }
                        });
                        return;
                    }
                });
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {}
                });
            });
        });
    }
    async add(user_id, content, media_id = 0, timestamp = (0, time_1.getTimeStamp)()) {
        let add_query = `
        INSERT INTO bf_posts (user_id,media_id,content,created_at)
        VALUES('${user_id}',${media_id},'${content}',TIMESTAMP('${timestamp}','0:0:0'))
        `;
        return new Promise(async (resolve, reject) => {
            let user = new user_1.User();
            let userResponse = await user.getById(user_id);
            user.close();
            if (userResponse.status != 100) {
                resolve(userResponse);
                return;
            }
            this.connection.query(add_query, (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {}
                });
            });
        });
    }
    async get(post_id) {
        let get_query = `
        SELECT * FROM bf_posts
        WHERE id = ${post_id}
        
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(get_query, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                if (rows == 0) {
                    resolve({
                        status: 201,
                        message: Type.StatusTypes[201],
                        content: {}
                    });
                    return;
                }
                let post = {
                    post_id: rows[0]['id'],
                    publisher: rows[0]['user_id'],
                    media: rows[0]['media_id'],
                    content: rows[0]['content'],
                    created_at: rows[0]['created_at'],
                    likes: rows[0]['likes']
                };
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: { post: post }
                });
            });
        });
    }
    createSelectQuery(order, select, tag, n, user_id) {
        let base_query = "";
        // base 
        switch (select) {
            case 'GROUP':
                base_query = this.SELECT_GROUP(tag);
                break;
            case 'GROUP_ALL':
                base_query = this.SELECT_GROUP_ALL(user_id);
                break;
            case 'USER':
                base_query = this.SELECT_USER(tag);
                break;
            case 'PUBLIC':
                base_query = this.SELECT_PUBLIC();
                break;
            case 'PUBLIC':
                base_query = this.SELECT_TARGET(tag);
                break;
            default:
                break;
        }
        // order + limit
        switch (order) {
            case 'LATEST':
                base_query += `
                ORDER BY created_at DESC
                LIMIT ${n}
                `;
                break;
            case 'LATEST':
                base_query += `
                ORDER BY likes DESC
                LIMIT ${n}
                `;
                break;
            default:
                break;
        }
        return base_query;
    }
    async select(tag, order = 'LATEST', selection = 'PUBLIC', n = 5, user_id) {
        let get_query = this.createSelectQuery(order, selection, tag, n, user_id);
        return new Promise(async (resolve, reject) => {
            this.connection.query(get_query, (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                if (rows.length == 0) {
                    resolve({
                        status: 201,
                        message: Type.StatusTypes[201],
                        content: []
                    });
                    return;
                }
                let output = [];
                for (let x of rows) {
                    output.push({
                        post_id: x['id'],
                        publisher: x['publisher'],
                        avatar: x['avatar'] || "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
                        media: x['media_id'],
                        content: x['content'],
                        created_at: x['created_at'],
                        likes: x['likes'],
                        gp_tag: selection == 'GROUP_ALL' ? x['G_tag'] : "",
                        com_number: x['com_number'] || 0
                    });
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: output
                });
            });
        });
    }
    async delete(post_id) {
        let find_query = `
        DELETE FROM bf_posts
        WHERE id = '${post_id}'
        `;
        return new Promise(async (resolve, reject) => {
            let postResponse = await this.get(post_id);
            if (postResponse.status != 100) {
                resolve(postResponse);
                return;
            }
            this.connection.query(find_query, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                if (rows.length == 0) {
                    resolve({
                        status: 201,
                        message: Type.StatusTypes[201],
                        content: {}
                    });
                    return;
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {}
                });
            });
        });
    }
    SELECT_GROUP(gp_tag) {
        return (`
            SELECT gpost.post_id AS id, 
            tags.tag AS GP_TAG , 
            COALESCE(UTags.tag, '') AS publisher,
			COALESCE(Media.link, '') AS avatar,
            posts.content, 
            User.picture, 
            posts.created_at, 
            COALESCE(likes.likes, 0) AS likes 
            FROM bf_groupposts gpost 
            INNER JOIN bf_tags tags 
                ON tags.context_id = gpost.group_id 
            LEFT JOIN bf_posts posts 
                ON gpost.post_id = posts.id 
            LEFT JOIN bf_tags UTags 
                ON UTags.context_id = posts.user_id 
			LEFT JOIN bf_users User 
                ON User.id = posts.user_id 
			LEFT JOIN bf_media Media 
                ON Media.id = User.picture
            LEFT JOIN (
                SELECT context_id, count(*) AS likes 
                FROM bf_likes 
                WHERE type = 'POST'
                GROUP BY context_id
            ) likes 
                ON gpost.post_id = likes.context_id 
            WHERE tags.tag = '${gp_tag}' 
            `);
    }
    SELECT_TARGET(u_tag) {
        return (`
            SELECT
            COALESCE(T.tag, '') AS publisher,
            COALESCE(Media.link, '') AS avatar,
            P.content, 
            User.picture, 
            P.created_at, 
            COALESCE(likes.likes, 0) AS likes 
            FROM bf_tags T
            right join bf_posts P ON P.user_id = T.context_id
            LEFT JOIN bf_users User ON User.id = P.user_id 
            LEFT JOIN bf_media Media ON Media.id = User.picture
            LEFT JOIN (
                SELECT count(*) as likes, context_id 
                FROM bf_likes
                WHERE type = 'POST'
                GROUP BY context_id
            ) likes ON P.id = likes.context_id  
            WHERE T.tag = '${u_tag}'
            `);
    }
    SELECT_USER(u_tag) {
        return (`
            SELECT regPost.post_id AS id, regUTag.tag AS RUTAG, 
                UTags.tag AS publisher , 
                COALESCE(Media.link, '') AS avatar,
                posts.content, 
                posts.media_id, posts.created_at, 
                COALESCE(likes.likes, 0) AS likes,
                SUM(CASE WHEN Comments.post_id IS NOT NULL THEN 1 ELSE 0 END) AS com_number
            FROM bf_registeredposts regPost 
            INNER JOIN bf_tags regUTag on regPost.user_id = regUTag.context_id
            LEFT JOIN bf_comments Comments ON Comments.post_id = regPost.post_id
            LEFT JOIN bf_posts posts ON regPost.post_id = posts.id 
            LEFT JOIN bf_tags UTags ON UTags.context_id = posts.user_id 
            LEFT JOIN bf_users User 
                ON User.id = posts.user_id
            LEFT JOIN bf_media Media 
                ON Media.id = User.picture
            LEFT JOIN (
                SELECT context_id, count(*) AS likes 
                FROM bf_likes 
                WHERE type = 'POST'
                GROUP BY context_id
            ) likes ON regPost.post_id = likes.context_id 
            WHERE regUTag.tag = '${u_tag}'
            GROUP BY id, RUTAG, publisher,avatar, posts.content, posts.media_id, posts.created_at, likes.likes
            `);
    }
    SELECT_PUBLIC() {
        return (`
            SELECT
                posts.id,
                UTags.tag AS publisher,
                COALESCE(Media.link, '') AS avatar,
                posts.content,
                posts.media_id,
                posts.created_at,
                COALESCE(likes.likes, 0) AS likes,
                SUM(CASE WHEN Comments.post_id IS NOT NULL THEN 1 ELSE 0 END) AS com_number
            FROM bf_posts posts
            LEFT JOIN bf_comments Comments ON Comments.post_id = posts.id
            LEFT JOIN bf_groupposts gPosts ON gPosts.post_id = posts.id
            LEFT JOIN bf_tags UTags ON UTags.context_id = posts.user_id
            LEFT JOIN bf_users User ON User.id = posts.user_id
            LEFT JOIN bf_media Media ON Media.id = User.picture
            LEFT JOIN (
                SELECT context_id, COUNT(*) AS likes, type
                FROM bf_likes
                WHERE type = 'POST'
                GROUP BY context_id
            ) likes ON posts.id = likes.context_id
            WHERE gPosts.post_id IS NULL AND UTags.type = 'USER'
            GROUP BY
                posts.id,
                UTags.tag,
                Media.link,
                posts.content,
                posts.media_id,
                posts.created_at,
                likes.likes;
            `);
    }
    SELECT_GROUP_ALL(user_id) {
        return (`
            SELECT 
            P.id, 
            P.created_at,
            COALESCE(T.tag, '') AS publisher,
            COALESCE(Media.link, '') AS avatar,
            P.content,
            GT.tag AS G_tag,
            COALESCE(likes.likes, 0) AS likes 
            FROM bf_usergroup UG
            RIGHT JOIN bf_groupposts GP ON GP.group_id = UG.group_id
            LEFT JOIN bf_posts P ON P.id = GP.post_id
            LEFT JOIN bf_tags T  ON T.context_id = P.user_id 
            LEFT JOIN bf_users User ON User.id = P.user_id 
            LEFT JOIN bf_media Media ON Media.id = User.picture
            LEFT JOIN (
                SELECT context_id, count(*) AS likes 
                FROM bf_likes 
                WHERE type = 'POST'
                GROUP BY context_id
            ) likes ON P.id = likes.context_id 
            LEFT JOIN bf_tags GT on GT.context_id = UG.group_id
            WHERE UG.user_id = ${user_id}
            `);
    }
}
exports.Post = Post;
