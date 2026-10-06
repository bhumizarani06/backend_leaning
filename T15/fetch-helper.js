async function fetchData(url){
    try{
        console.log(`requesting : ${url}`);

        const response = await fetch(url);
        console.log("http status :",response.status);

        if(!response.ok)
        {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("response data:",data);
        return data;
    }catch(error){
       console.log("request failed:",error.message);
    }
}

async function main(){
    await fetchData("http://localhost:3000/success");
    console.log("--------------------");

  await fetchData("http://localhost:3000/unavailable");

  console.log("--------------------");

  await fetchData("http://localhost:3000/invalid-json");
}

main();
