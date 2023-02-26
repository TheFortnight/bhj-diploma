/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {

    console.log(options);
        
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    
    let url;
    const callback = options.callback;
    

    if(options.method == 'GET'){
        url = options.url+'?mail='+options.data.email+'&password='+options.data.password;
        xhr.open('GET', url);
        //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send();
    }
    else{
        const formData = options.data;
        //formData = new FormData;
        //formData.append('mail', options.data.email);
        //if(options.data.password) formData.append('password', options.data.password);
        //if(options.data.name) formData.append('name', options.data.name);

        xhr.open(options.method, options.url);
       // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send(formData);
    }
    xhr.onload = (event) => {
        event.preventDefault();
        const response = xhr.response;
        console.log('response: '+response);
       // if(response.success) console.log('success: '+response.success);
       // else console.log('fail: '+response.success);
    }
};

