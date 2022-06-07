function stringtoArray(cadena){
	cadena = cadena.replace(/\r/g, '');
	return cadena.split('\n').filter(el => el!="");
}


function formatNameProyecto(nameProyecto){
    let format = nameProyecto.toLowerCase().replace(/ /g, '-');
    return format;
}

function containEns(ens, array){
    return array.includes(ens);
}

function eliminarRepetidos(items){
	return [... new Set(items.map(el => JSON.stringify(el)))].map(el => JSON.parse(el))
}

function getNodosDmgr(dmgr){
	const nodosRepetidos = dmgr.map(el => el.Nodos);

	if(nodosRepetidos.length > 0){ 
		const nodos = Array.from(new Set(nodosRepetidos.reduce((a,b) => a.concat(b)).map(el => el.Nombre).filter(el => el != 'NA'))).sort(); 
		return nodos;
	}	
	return nodosRepetidos.sort();
}

function getOneNodoCluster(dmgr){
	const allNodes = dmgr.map(el => el.Nodos);

	const firstNodoCluster = allNodes.map(el => {
		if(el[0])
			return el[0].Nombre;
	
	}).filter(el => el != 'NA' && el != undefined);

	const nodos = [... new Set(firstNodoCluster)].sort()

	return nodos;
}


function formatFileSGS(file){

    let result = [];

    try {
        let array = file.split('\n').filter(el => el);
        for(const line of array){

			let lineFormat = line.trim().replace(/\t/g, ' ').replace(/\s\s+/g, ' ');

			let lineSplit = lineFormat.split(' ');

			let publicacion = {Producto: lineSplit[0], Old_psi: Number(lineSplit[1]), New_psi: Number(lineSplit[2]) }
			
			result.push(publicacion);  
        }
        return result;
    } catch (error) {
		console.log(`AreaText vacio`);
		return result;
    }

}


function getPsiSGS(item){
	let psi = item;
	
    if(item && item.includes('/')){
		let init = item.lastIndexOf('/');
		let end = item.indexOf('.', init);
		psi = item.substring(init+1,end);
	}   

	return psi;
}

function formatUrlGit(url, pvc){
	try { 
		const git = new URL(url);
		let result = {git: git.hostname, repositorio: git.pathname.substring(1,git.pathname.length-4)}

        if(pvc && pvc.includes('-test'))
            result.repositorio = `${result.repositorio}-test`;

		return result;

	} catch (error) {
		return error;
	}
}

function getAppVersionImagenHarbour(imagen){

	try {

		let infoImage = imagen.split('/');

		if(infoImage.length > 2){
			let [harbour, project, app] = infoImage;
			let [nombre, version] = app.split(':');
			return {harbour, project, nombre, version}
		}
		
		else {
			let [project, app] = infoImage;
			let [nombre, version] = app.split(':');
			return {harbour: '', project, nombre, version}
		}


	} catch (error) {
		throw error;
	}
}


function formatNameOpenshift(item){
    let format = item.toLowerCase().replace(/_/g, '-');
    return format;
}

function gitToString(item){
    let format = item.toLowerCase().replace(/\./g, '');
    return format;
}

function getPropertiesName(path){
	let nameProperties =  path;

    if(path && path.includes('/')){
		let init = path.lastIndexOf('/');
		nameProperties = path.substring(init+1);
	}   

	return nameProperties;
}

function celdasInlude(nameCelda, celdas){

    let arrayCeldas = celdas.split(',');
    let formatnameCelda = nameCelda.toLowerCase().replace(/ /g, '-');
    if(arrayCeldas.includes(formatnameCelda))
        return true;
    else
        return false;
}

function getVersionNumber(version){
    try {
        let vrf = version.substring(version.lastIndexOf('_')+1)
        let v=vrf.substring(1, vrf.indexOf('R'))
        let r=vrf.substring(vrf.indexOf('R')+1, vrf.indexOf('F'))
        let f=vrf.substring(vrf.indexOf('F')+1)
    
        return parseFloat(`${v}.${r}${f}`)
    } catch (error) {
        throw error;
    }

}
 
module.exports = {
	stringtoArray,
	formatNameProyecto,
	containEns,
	eliminarRepetidos,
	getNodosDmgr,
	getOneNodoCluster,
	formatFileSGS,
	getPsiSGS,
	formatUrlGit,
	getAppVersionImagenHarbour,
	formatNameOpenshift,
	gitToString,
	getPropertiesName,
	celdasInlude,
	getVersionNumber
}