(async ()=>{
  try{
    const res = await fetch('http://localhost:5000/api/users/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({username:'admin', password:'Admin123!'})
    });
    const text = await res.text();
    console.log('STATUS', res.status);
    console.log(text);
  }catch(err){
    console.error('ERR', err);
  }
})();
