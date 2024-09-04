function ajaxTextRequest(id, url, method, data) {
  console.log(data.country_id)
    var xhttp = new XMLHttpRequest();
    
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
            // return datares;
            
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
    
    xhttp.open(`${method}`, `${url}`);
    xhttp.setRequestHeader("Content-Type", "application/json"); // Set appropriate content type for JSON 

    xhttp.send(JSON.stringify(data)); // Convert data to JSON string before sending
  }