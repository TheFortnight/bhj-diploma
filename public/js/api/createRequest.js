/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
/*const createRequest = (options) => {
  console.log('OPTS: '+(options.method==='GET'));
 
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json'; 
  
  let formData = new FormData();
  formData.append( 'name', 'Oleg');
  formData.append( 'email', 'ivan3@biz.pro' );
  formData.append( 'password', 'odinodin' );

  if(options.method === 'GET') {
    xhr.open('GET', '/current/?mail=ivan@biz.pro&password=odinodin');
    xhr.send();
  }
  else {
    xhr.open('POST', '/user/register');
    xhr.send(formData);
    xhr.onload = () => {
      if (xhr.status != 200) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      let response = JSON.stringify(xhr.response);
      alert(`Done, got ${response}`); // response is the server response
    }
  } 
    
    
  }
}*/



const createRequest = (options) => {

    //console.log('RECEIVED options: ' + JSON.stringify(options));
        
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    
    let url;
    const callback = options.callback;
    let formData = new FormData();
    

    if(options.method === 'GET'){
        let request = options.url;
        for (const [key, value] of Object.entries(options.data)) {
            request += ``
            formData.append(key, value);
          };

        url = options.url+'?'
        for (let param in options.data) {
        //  console.log('Key: '+param+'; Value: '+options.data[param]);
          url += (param+'='+options.data[param]+'&');
        }
      //  console.log('OPTIONS DATA: '+ (options.data == '')+'; '+Date.now());
       // console.log('XHR GET REQ URL: '+url);

        xhr.open('GET', url);
        xhr.responseType = 'json'; 
        xhr.send();
        xhr.onload = () => {
          const respObj = xhr.response;           
         // console.log('XHR.RESPONSE success: '+respObj.success+'; '+xhr.status);
          if (xhr.status != 200) { 

        } else {
        //  console.log('GET REQ RESP: '+JSON.stringify(respObj)) 
          options.callback(respObj);
        }
      }
    }
    else{
        

        const data = options.data;
        
        if (options.data){
          for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
          };
        };
   
        for (const [key, value] of formData) {
            console.log(`${key}: ${value}\n`);           
          };
        
        xhr.open(options.method, options.url);
        xhr.responseType = 'json'; 
        xhr.send(formData);
        
        xhr.onload = () => {
          const respObj = xhr.response;           
        // console.log('XHR POST RESPONSE success: '+JSON.stringify(respObj));
          if (xhr.status != 200) { 

        } else { 
          options.callback(respObj);
        }
      }
    }   
};

