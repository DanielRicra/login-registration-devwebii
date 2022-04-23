
if (!sessionStorage.getItem("email") && document.URL !== "http://localhost:8000/"){ 
   window.location.href = "/";
}