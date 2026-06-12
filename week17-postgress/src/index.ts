import express,{Response,Request} from 'express';
const app = express();
import { Client } from 'pg';
const pgClient = new Client("postgresql://neondb_owner:npg_lbZt0SJR8kDH@ep-dry-wildflower-aq7kk5fa-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
app.use(express.json());
app.get("/users",(req:Request,res:Response) => {
    try{ 
        const getQuery = "SELECT * FROM users";
        pgClient.query(getQuery);
    }catch (e){
        console.log("things went wrong at /GET USERS");
    }
});

function start(){
    pgClient.connect();
    app.listen(3000,() =>{
        console.log("app is running at 3000");
    });
}
start();