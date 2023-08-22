import DbConnect from "./dbConnect";
import * as Type from "./types";




export class Media extends DbConnect {

    constructor() {
        super();
    }

    async get(media_id: number) {

        let media_query = `
            select * from bf_media
            where id = ${media_id}
        `

        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {


            this.connection.query(media_query,
                (err: any, rows: any, fields: any) => {

                    if (err) {
                        resolve({
                            status: 404,
                            message: Type.StatusTypes[404],
                            content: { error: err }
                        })
                        return
                    }

                    if (rows.length == 0) {
                        resolve({
                            status: 201,
                            message: Type.StatusTypes[201],
                            content: {}
                        })
                        return
                    }

                    resolve({
                        status: 100,
                        message: Type.StatusTypes[100],
                        content: {
                            type: rows[0]['likes'],
                            link: rows[0]['link']
                        }
                    })

                })
        })

    }

    async add(link: string, owner: number, type = 'png') {

        let media_query = `
            INSERT INTO bf_media (type, link,owner)
            VALUES ('${type}', '${link}', '${owner}')
        `

        let last_id_query = `
                SELECT LAST_INSERT_ID() AS id;
            `

        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {

            this.connection.query(media_query,
                (err: any, rows: any, fields: any) => {

                    if (err) {
                        let { code } = err
                        if (code == 'ER_DUP_ENTRY') {
                            resolve({
                                status: 200,
                                message: Type.StatusTypes[200],
                                content: {  }
                            })
                            return
                        }
                        resolve({
                            status: 404,
                            message: Type.StatusTypes[404],
                            content: { error: err }
                        })
                        return
                    }

                    this.connection.query(last_id_query, (err: any, rows: any, fields: any) => {

                        const id = rows[0]['id'] || 0
                        if (id == 0 || err) {
                            resolve({
                                status: 404,
                                message: Type.StatusTypes[404],
                                content: { err }
                            })
                            return
                        }

                        resolve({
                            status: 100,
                            message: Type.StatusTypes[100],
                            content: {
                                id: id
                            }
                        })
                    })


                })
        })
    }

    async getAll(user_id: number) {

        let media_query = `
            select * from bf_media
            where owner = ${user_id}
        `

        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {


            this.connection.query(media_query,
                (err: any, rows: any, fields: any) => {

                    if (err) {
                        resolve({
                            status: 404,
                            message: Type.StatusTypes[404],
                            content: { error: err }
                        })
                        return
                    }

                    resolve({
                        status: 100,
                        message: Type.StatusTypes[100],
                        content: rows
                    })

                })
        })
    }

}