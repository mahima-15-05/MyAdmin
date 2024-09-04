function deleteRecord(id, url) {
  swal("Are you sure you want to delete?", {
    buttons: ["No", "Yes"],
  }).then((value) => {
    console.log("URL",url)
    if (value === true) {
      var xhr = new XMLHttpRequest();
      xhr.open(`POST`, `${url}`, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      var data = { id: id };
      var jsonData = JSON.stringify(data);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          console.log("XHr" + xhr.status);
          if (xhr.status === 200) {
            toastr.success("Record successfully deleted");
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else {
            toastr.error("Failed to delete record!");

            console.log(console.error());
          }
        }
      };

      xhr.send(jsonData);
    }
  });
}
