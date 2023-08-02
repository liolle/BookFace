import DbConnect from "./dbConnect";
import * as Type from "./types";
import { getTimeStamp } from "../utils/time";
import { User } from "./user";

export class Post extends DbConnect{

    constructor(){
        super();
    }

    async register(user_id:number,post_id:number){

        return new Promise<Type.ResponseMsg>( async (resolve, reject) => {
            
            let register_post_query =`
            INSERT INTO bf_registeredposts (user_id, post_id) 
            SELECT user_id, post_id 
            FROM (
                SELECT 
                (SELECT id  FROM bf_users WHERE id = ${user_id}) AS user_id,
                (SELECT id  FROM bf_posts WHERE id = ${post_id}) AS post_id
            ) t
            WHERE user_id IS NOT NULL AND post_id IS NOT NULL
            ON DUPLICATE KEY UPDATE do_delete = true;
            `

            let del_query = `
            DELETE FROM bf_registeredposts
            WHERE do_delete = true;
            `
            
            this.connection.query(register_post_query, (err:any, rows:any, fields:any)=>{
                let {affectedRows} = rows
                if (err){

                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                this.connection.query(del_query,(err:any, rows:any, fields:any)=>{
                    
                    if (err){
                        resolve({
                            status:404,
                            message:Type.StatusTypes[404],
                            content: {error: err}
                        })
                        return
                    }
                })
                
                
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {
                        isReg: affectedRows == 1
                    }
                })

            })


        })


    }

    async addGroupPost(group_id:number,user_id:number,content:string,media_id = 0,timestamp = getTimeStamp() ){
        
        let add_response = await this.add(user_id,content,media_id,timestamp)
        

        return new Promise<Type.ResponseMsg>( async (resolve, reject) => {
            
            if ( add_response.status != 100){
                resolve(add_response)
                return
            }
            
            let last_id_query = `
                SELECT LAST_INSERT_ID() AS id;
            `
            
            this.connection.query(last_id_query, (err:any, rows:any, fields:any)=>{
                
                if (err){
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }
                
                const id = rows[0]['id'] || 0
                
                if (id == 0){
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {}
                    })
                    return
                }
                
                let add_group_query = `
                    INSERT INTO bf_groupposts (post_id, group_id)
                    SELECT ${id}, ${group_id}
                    FROM bf_grouplist groupL
                    WHERE groupL.id = ${group_id};
                
                `
                this.connection.query(add_group_query, (err:any, rows:any, fields:any)=>{
                    if (err){
                        resolve({
                            status:404,
                            message:Type.StatusTypes[404],
                            content: {error: err}
                        })
                        return
                    }
                })
                
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })

            })


        })

    }
    
    async add(user_id:number,content:string,media_id = 0,timestamp = getTimeStamp() ){

        let add_query = `
        INSERT INTO bf_posts (user_id,media_id,content,created_at)
        VALUES('${user_id}',${media_id},'${content}',TIMESTAMP('${timestamp}','0:0:0'))
        `

        return new Promise<Type.ResponseMsg>( async (resolve, reject) => {

            let user = new User()
            let userResponse = await user.getById(user_id)
            user.close()

            if ( userResponse.status != 100){
                resolve(userResponse)
                return
            }

            this.connection.query(add_query, (err:any, rows:any, fields:any)=>{
                
                if (err){
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }
                
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })

            })


        })
    }

    async get(post_id:number ){
        
        let get_query = `
        SELECT * FROM bf_posts
        WHERE id = ${post_id}
        
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {

            this.connection.query(get_query, 
                (err:any, rows:any, fields:any)=>{

                if (err){
                    console.log(err)
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                if (rows == 0){

                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: {}
                    })
                    return 
                }

                let post = {
                    post_id: rows[0]['id'],
                    publisher: rows[0]['user_id'],
                    media: rows[0]['media_id'],
                    content: rows[0]['content'],
                    created_at: rows[0]['created_at'],
                    likes: rows[0]['likes']
                }
    
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: { post:post}
                })

            })

        })

    }

    private createSelectQuery(order:Type.PostOrderType,select:Type.PostSelectionType,tag:string,n:number,user_id:number){

        let base_query = ""

        // base 

        switch (select) {
            case 'GROUP':
                base_query = this.SELECT_GROUP(tag)
                break;
            case 'GROUP_ALL':
                base_query = this.SELECT_GROUP_ALL(user_id)
                break
            case 'USER':
                base_query = this.SELECT_USER(tag)
                break;
            case 'PUBLIC':
                base_query = this.SELECT_PUBLIC()
                break;
            
            case 'PUBLIC':
                base_query = this.SELECT_TARGET(tag)
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
                `
                break;
            case 'LATEST':
                base_query += `
                ORDER BY likes DESC
                LIMIT ${n}
                `
                break;
        
            default:
                break;
        }

        return base_query

    }

    async select(tag:string,order:Type.PostOrderType = 'LATEST',
    selection:Type.PostSelectionType ='PUBLIC',n=5,user_id:number){

        let get_query = this.createSelectQuery(order,selection,tag,n,user_id)
        
        return new Promise<Type.ResponseMsg>( async (resolve, reject) => {


            this.connection.query(get_query, (err:any, rows:[], fields:any)=>{
                
                if (err){
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                if (rows.length == 0){
                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: []
                    })
                    return
                }

                let output = []

                for( let x of rows){
                    
                    output.push(
                        {
                            post_id: x['id'],
                            publisher: x['publisher'],
                            avatar: x['avatar'] || "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
                            media: x['media_id'],
                            content: x['content'],
                            created_at: x['created_at'],
                            likes: x['likes'],
                            gp_tag: selection == 'GROUP_ALL'? x['G_tag'] : ""
                        }
                    )
                }
                
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: output
                })

            })


        })
    }

    async delete(post_id:number){

        let find_query = `
        DELETE FROM bf_posts
        WHERE id = '${post_id}'
        `

        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {

            let postResponse = await this.get(post_id)

            if (postResponse.status != 100){
                resolve(postResponse)
                return
            }
            
            this.connection.query(find_query, (err:any, rows:any, fields:any)=>{

                if (err){
                    console.log(err)
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                if (rows.length == 0){
                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: {}
                    })
                    return
                }

                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })

            })
        })
    }

    private SELECT_GROUP(gp_tag:string){
        return(
            `
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
            `

        )
    } 

    private SELECT_TARGET(u_tag:string){
        return (
            `
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
            `
        )
    }

    private SELECT_USER(u_tag:string){
        return(
            `
            SELECT regPost.post_id AS id, regUTag.tag AS RUTAG, 
            UTags.tag AS publisher , 
            COALESCE(Media.link, '') AS avatar,
            posts.content, 
            posts.media_id, posts.created_at, 
            COALESCE(likes.likes, 0) AS likes,
            COUNT(posts.id) AS com_number,
            FROM bf_registeredposts regPost 
            INNER JOIN bf_tags regUTag on regPost.user_id = regUTag.context_id
            LEFT JOIN bf_comments Comments ON Comments.post_id = posts.id
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
            GROUP BY id, RUTAG, publisher,avatar, posts.content, posts.media_id, posts.created_at, likes.likes;
            `

        )
    } 

    private SELECT_PUBLIC(){
        return(
            `
            SELECT posts.id, 
            UTags.tag AS publisher , 
            COALESCE(Media.link, '') AS avatar,
            posts.content, 
            posts.media_id, 
            posts.created_at, 
            COALESCE(likes.likes, 0) AS likes,
            COUNT(posts.id) AS com_number,
            from  bf_posts posts
            LEFT JOIN bf_comments Comments ON Comments.post_id = posts.id
            left join bf_groupposts gPosts  on gPosts.post_id = posts.id
            LEFT JOIN bf_tags UTags ON UTags.context_id = posts.user_id 
            LEFT JOIN bf_users User 
                ON User.id = posts.user_id
            LEFT JOIN bf_media Media 
                ON Media.id = User.picture
            LEFT JOIN (
                SELECT context_id, count(*) AS likes , type
                FROM bf_likes 
                WHERE type = 'POST'
                GROUP BY context_id
            ) likes ON posts.id = likes.context_id 
            WHERE gPosts.post_id is null and UTags.type = 'USER'
            GROUP BY posts.id, UTags.tag, Media.link, posts.content, posts.media_id, posts.created_at, likes.likes;
            `

        )
    } 

    private SELECT_GROUP_ALL (user_id:number){
        return (
            `
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
            `
        )
    }
    
}