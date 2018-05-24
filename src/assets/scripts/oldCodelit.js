/*
	============================================================================
	============================================================================
	============================================================================
	=============================  DropBox codelit  ============================
	============================================================================
	============================================================================
	============================================================================
*/

componentDidMount = () => {
		let currentThis = this;
		if(!! this.state.dropbox) {
			console.log('on ComponentDidMount !!');
			this.state.dropbox.filesListFolder({path: '', recursive: true})
			  .then(function(response) {
			    console.log('data fetched from dropbox successfully :: ', response.entries);
			    let entries = response.entries || [];
			    let distinguished = currentThis.regroup(entries, (x) => { return x['.tag']; });
			    console.log('distinguished Entries :: ', distinguished);
			    window.d = distinguished;

			    console.log('#0. distinguished folder :: ', distinguished.folder)
			    let folders = distinguished.folder;
			    let files = distinguished.file;
			    console.log('#0. distinguished file :: ', files)
			    let tempData = currentThis.regroup(folders, (x) => { return x['name'] });
			    console.log('#1.  tempData :: ', tempData);
			    for (let date of Object.keys(tempData)) {
			    	console.log('#2.  tempData-date :: ', date);
			    	let dateElement = tempData[date][0] || {};
			    	files.forEach(memFile => {
			    		console.log('#3. memFile :: ', memFile);
			    		console.log('#4. tempData :: ', tempData);
			    		if(memFile['path_lower'].indexOf(date) > -1) {
			    			let testTemp = Object.assign({}, memFile);
			    			/*
								엘리먼트 맞춰줘야 데이터 제대로 나오겠다...
			    			*/
			    			dateElement['items'] = dateElement['items'] || [];
			    			dateElement['items'] = dateElement['items'].concat(memFile);
			    		}
			    	});
			    }
			    console.log('regrouped Data Array :: ', JSON.stringify(tempData));
			    // currentThis.setState({ data :  tempData });
			  })
			  .catch(function(error) {
			    console.log(error);
			});	
		} else {
			console.log('Dropbox data is null');
		}
	}