document.getElementById("Registration").addEventListener("submit",async(e)=>
{
  e.preventDefault();
  const fdata={
    name:document.getElementById("username").value,
    email:document.getElementById("email").value,
    password:document.getElementById("password").value,
    cpassword:document.getElementById("confirm-password").value,
  }
  try {
    const res=await fetch("http://localhost:3000/submit_registration",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(fdata)
    })
    const resData = await res.json();

    if (resData.success) {
      alert(resData.message);
      document.getElementById("Registration").reset();
    } else {
      alert(resData.message);
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  
  }
 
 
})
