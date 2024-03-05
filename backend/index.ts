import express from "express"
import {exec} from 'child_process'
import {deploy} from './host.js'
import dotenv from 'dotenv'
import {projects} from './nginx/set.js'


dotenv.config()
const PORT= process.env.PORT|| 3000
const app = express()

app.get('/deploy' , async(req,res)=>{
	const {repo , folder ,port }:any = req.query
	console.log(repo , folder)
	const result = await deploy(repo , folder, port).catch((err)=>{
		res.send(err)})
		.then((result)=>{
			res.send(result)
		}
		)
		
	res.send(result)
})



app.get('/deployments', async(req,res)=>{
	const result = projects
	res.json(result)
}	)

app.listen(PORT , ()=>{	
    console.log(`server started at port ${PORT}`) 
})
