export function deploy(link:string):Promise<any>{
	return new Promise((resolve,reject)=>{
		if(link){
		return resolve(true);
		}
		return reject()
	})


}


function isValid(link:string){
	if(link != null && link != undefined && link != "" && link.length > 0){
	return true
	}
	else return false
}
