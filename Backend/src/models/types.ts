
// 100 - 199 general message
// 200 - 399 db error
// 400+ other
export const StatusTypes = {
    100: 'Success',
    200: 'Already exist',
    201: 'Input does not exist',
    202: 'Request fail',
    203: 'Unauthorized',
    400: 'Input missing',
    401: 'Incorrect input',
    402: 'Incorrect input type',
    403: 'Not authorized',
    404: 'System error',
    405: 'Already connected',
    406: 'Missing Token',
    407: 'Token does not correspond to any session'
};

export const TagTypes = {
    USER: 'USER',
    GROUP: 'GROUP',
    EVENT: 'EVENT'
    
};

export const LikeType = {
    COMMENT: 'COMMENT',
    POST: 'POST'
};

export type PostOrderType = 'LATEST'|'LIKES'
export const PostOrder = {
    LATEST: 'LATEST',
    LIKES: 'LIKES'
}


export type PostSelectionType = 'PUBLIC'|'USER'|'GROUP'|'GROUP_ALL'|'TARGET'
export const PostSelection = {
    PUBLIC:'PUBLIC',
    USER: 'USER',
    GROUP: 'GROUP',
    GROUP_ALL: 'GROUP_ALL'
}

export type ResponseMsg = {
    status: number,
    message: string,
    content: object | []
}


export type UserResponseInfo = {
    tag: string,
    username: string,
    email: string,
    created: string
    status: number,
    picture: string,
    banner: string
}

export type PostType = {
    user: number,
    media: number
    content: string,
    created_at: string,
    likes:number,
    com_number:number
}

export type CommentType = {
    id:number,
    avatar:string,
    user: string,
    content: string,
    responses: CommentResponseType[]
    created_at: string,
    likes:number
}

export type CommentResponseType = {
    id:number,
    avatar:string,
    user: string,
    content: string,
    created_at: string,
    likes:number

}
