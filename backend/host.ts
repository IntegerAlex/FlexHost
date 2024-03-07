import {exec } from 'child_process'
import fs from 'node:fs/promises'
import {projects , generateNginxConfig } from './nginx/set.js'
export function deploy(link:string , folder:string ,port:number):Promise<any>{
	return new Promise(async(resolve,reject)=>{
		//check if the link is valid
		if(await isValid(link) === true){

			const projectName:string = checkName(link)

			exec(`bash project.sh ${link} ${folder} ${projectName}` , (err,stdout,stderr)=>{
				if(err){
					reject(err)
				}
				if(stdout){
					const filename:string = "test.txt"
					fs.writeFile(filename, stdout).then(()=>{
						if(err){
							console.log(err)
						}
						console.log("process written to file")
						
						isHttpServerRunning(folder , projectName ,port) //run the website
						setTimeout(()=>{
							resolve("build done")

							checkPort(port).then(()=> { //check if the port is running
								projects.push({path:projectName , port:{port}})  //add the project to the nginx config
								generateNginxConfig().then(()=>{
									// generate Config and reload nginx
									console.log(projects) //print the projects
								}
								)
							}
							)
						}
						,10000
						)
					
					}
					)
				}

				// console.log(stdout)
				resolve("build done")
				
			}
			)
		}
		else{
			reject("Invalid Link")
		}
	})
}


// to run the Http server
function isHttpServerRunning(folder: string, projectName: string, port: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const command = `sudo bash deploy.sh ${folder} ${projectName} ${port}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
			if (stdout) {
				console.log(stdout);
				return resolve(true);
			}
			if (stderr) {
				console.error(stderr);
				return reject(false);
			}
		})
	})
}
  

// this function is used to check Project Name
function checkName(link:string):string {
    const repoUrl:string = link;
    const repoName:string = repoUrl.split('/').pop() || '';
    console.log("Repository name:", repoName);
    return repoName;
}


// this function is used to check if the port is running
function checkPort(port:number):Promise<any>{
	return new Promise((resolve,reject)=>{
		exec(`lsof -i:${port}` , (err,stdout,stderr)=>{
			if(err){
				reject(err)
			}
			if(stdout){
				console.log(stdout)
				resolve(stdout)
			}
			if(stderr){
				console.log(stderr)
				reject(stderr)
			}
		}
		)
	})
}


// this function is used to check if the link is valid
function isValid(link:string):any{
	return new Promise((resolve,reject)=>{
		fetch(link , {method:'HEAD'})
		.then((res)=>{
		if(res.status === 200){
			console.log(res.status)
			resolve(true)
		}
		else{
			console.log(res.status)
			reject(false)
		}
		})
	
	})

}











