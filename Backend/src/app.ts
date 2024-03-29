import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path'
import dotenv from "dotenv";

let ENV = process.env.ENVIRONNEMENT || ""
if (ENV == "production"){
    dotenv.config(
        { 
            path: path.join(__dirname, '..','.env.production') ,
            override: true,
            debug: true
        }
    );

}
else{
    dotenv.config(
        { 
            path: path.join(__dirname, '..','.env') ,
            override: true,
            debug: true
        }
    );
}

const PORT = 3535
const  whitelist = ['https://liolle.github.io','http://localhost:5173','http://localhost:4173','http://localhost:4200']

var corsOptions = {
  credentials: true,
  origin: whitelist
}

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));

app.use('/login',require('./routes/login.routes'))
app.use('/register',require('./routes/register.routes'))
app.use('/logout',require('./routes/logout.routes'))

app.use('/posts',require('./routes/posts.routes'))
app.use('/comments',require('./routes/comments.routes'))
app.use('/profiles',require('./routes/profiles.routes'))
app.use('/media',require('./routes/medias.routes'))
app.use('/users',require('./routes/follows.routes'))
app.use('/groups',require('./routes/groups.routes'))

app.listen(PORT,() =>{
    let ENV = process.env.ENVIRONNEMENT == 'production' ? 'PRODUCTION':'DEVELOPMENT' 
    console.log( `\nServer running on ---> http://localhost:${PORT} <${ENV}>\n` )
});