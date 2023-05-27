/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options) => {

    //console.log('RECEIVED options: ' + JSON.stringify(options));
        
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    
    let url;
    
    

    if(options.method === 'GET'){
        if (options.data != '') { 
          url = options.url+'?';
          for (let param in options.data) {
          url += (param+'='+options.data[param]+'&');
          }
        }
        else url = options.url;
      //  console.log('OPTIONS DATA: '+ (options.data == '')+'; '+Date.now());
       console.log('XHR GET REQ URL: '+url);

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
    else {
          const data = options.data ? options.data : null;
        
        /*if (options.data){
          for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
          };
        };*/
   
        
        
        xhr.open(options.method, options.url);
        xhr.responseType = 'json';
        xhr.send(data);        
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

