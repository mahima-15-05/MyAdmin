
  function updateStatus(id, status,url) {
    var xhr = new XMLHttpRequest();
    // const url = url;
    console.log("URL "+url)
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    // console.log("ID"+id);
    var data = { id: id };
    var jsonData = JSON.stringify(data);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // alert("Status updated");
          toastr.success("Status Updated");
          setTimeout(function () {
            // window.location.href = '/dashboard';
            location.reload();
        }, 1000);
          
        } else {
          // alert("Failed to update status" + console.error());
          toastr.error("Failed to update status");
        }
      }
    };

    xhr.send(jsonData);
  }

