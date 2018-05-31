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

/*
	============================================================================
	============================================================================
	============================================================================
	========  Image Upload Overrige react-dreft-wysiwyg editor  ================
	============================================================================
	============================================================================
	============================================================================
*/

uploadImageCallBack(file) {

	let dbx = this.state.dropbox;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // if (month.length < 2) month = '0' + month; 
    // if (day.length < 2) day = '0' + day;

    let fileInfo = {
    	path: '/' + [ year, ( month > 9 ? '' : '0' ) + month, ( day > 9 ? '' : '0' ) + day ].join('') +  '/' + file.name
    	, contents : file
    	, settings : {
    		requested_visibility: "public"
    	}
    }

    // dropBox API 로 파일 업데이트를 하자 
    // https://github.com/jpuri/react-draft-wysiwyg/issues/445
    // DropBox 는 절대적으로 Promise 를 반환해야 함 - 구린데??
    return new Promise(
        (resolve, reject) => {
	        dbx.filesUpload(fileInfo)
			.then(function(response) {
				console.log('dropbox Save success :: ', response, dbx);
				// resolve({ data: {link: response.path_display}})
				// 리소스 호출 URL 만들기가 어려움 ... ajax 에서 ajax 또 호출할 것도 아니고 그냥 data 스트림으로 처리하는 게 나을 듯 

				// 여기서 성공하면 shared URL 을 호출한다 

				dbx.sharingGetSharedLinkFile({url : encodeURI(response.path_display)})
				.then(function(data) {
					var downloadUrl = URL.createObjectURL(data.fileBlob);
					console.log('downloadUrl :: ', downloadUrl);
				})
				.catch(function(error) {
					console.error(error);
				});

				resolve({ data: {link: 'https://www.dropbox.com/preview/앱/Berlin2018/' + encodeURI(response.path_display) + '?dl=1' }})
			})
			.catch(function(error) {
				console.error('dropbox Save error :: ', error);
				reject(error);
	        });
        }
    );
}
