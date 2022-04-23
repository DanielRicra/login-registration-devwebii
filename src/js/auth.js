
if (!sessionStorage.getItem("email") && document.URL !== "http://localhost:8000/" &&
      document.URL !== 'http://localhost:8000/?p=signup'){ 
   window.location.href = "/";
}