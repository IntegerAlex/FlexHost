import express from "express"
import {exec} from 'child_process'
import {deploy} from './host.js'
import dotenv from 'dotenv'

dotenv.config()
const PORT= process.env.PORT|| 3000
const app = express()


app.get('/deploy' , async(req,res)=>{
	const {repo }:any = req.query 
	const result = await deploy(repo)

})

app.listen(PORT , ()=>{	
    console.log(`serverstarted at port ${PORT}`) 
})
