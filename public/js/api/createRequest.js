/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
    console.log('CREATEREQ WORKS');
    //console.log('METHOD IS: '+options.method);
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
        formData = new FormData;
        formData.append('mail', options.data.email);
        if(options.data.password) formData.append('password', options.data.password);
        if(options.data.name) formData.append('name', options.data.name);

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

const data1 = {
    name: 'Vlad',
    email: 'test@test.ru',
    password: 'abracadabra'
  }

  let params = {};
  params.data = data1;
  params.method = 'POST';
  params.responseType = 'json';
  params.url = '/register';


  //setTimeout(()=> createRequest(params), 5000);
  //createRequest(params);