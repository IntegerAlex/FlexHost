import express from 'express'
import {exec} from 'child_process'
import deploy from './host.js'

const app = express()



app.get('/deploy' ,async(req,res)=>{
	const {repo} = req.query 
	const deploy = await deploy()


})


app.listen(PORT , ()=>{
	
    console.log(`serverstarted at port ${PORT}` 
})
