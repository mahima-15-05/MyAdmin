
   function ajaxRequest(id, url, method,formData){
    console.log("FORMDATA is "+formData)
            var xhttp = new XMLHttpRequest(); // create new AJAX request

           
        
            xhttp.onreadystatechange = function () {
              if (this.readyState === 4) {
                if (this.status === 200) {
                  // sucess from server
                  console.log("Response ",this.responseText);
                  if (this.responseText.trim() === '') {
                    // Handle empty response
                    console.log('Empty response received');
                    return;
                }
                  var datares = JSON.parse(this.responseText);

                  var rstext = datares.message;
                  var statusCode = datares.status;
                  console.log(statusCode, "statusCode");              
                  if (statusCode === 200) {
                    toastr.success(datares.message);
                    setTimeout(() => {
                         window.location.href=datares.redirect
                      // location.reload();
                    }, 1000);
                  } else {
                    toastr.error(datares.message);
                  }
                } else {
                  toastr.error("Eror"+this.statusText);
                }
              }
            };
        
            xhttp.open("POST", `${url}`);
            xhttp.open(`${method}`, `${url}`);

            console.log("FORM"+formData)
           
            xhttp.send(formData);
          // };
    }


