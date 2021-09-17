const form =document.getElementById('form');
const output=document.getElementById('link-text');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    output.value='Your URL will appear here'
    const longUrl=form.url.value;

    fetch('/api/url/shorten',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({longUrl})
    }).then(async (res)=>{

        const data=await res.json();

        console.log(data);

        output.value=data.shortUrl;


    }).catch((err)=>{
       console.log(err);

       output.value="Invalid URL";

    });
});