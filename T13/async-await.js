/*
function getUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("User data received");
        }, 2000);
    });
}

async function loadUser() {
    console.log("Loading user...");

    const result = await getUser();

    console.log(result);
    console.log("Done");
}
    
/*
loadUser();
/*

function getUser(){
    return new Promise((resolve,reject) =>
    {
         setTimeout(() =>
        {
                  reject(new Error("user not found"));
        },2000);
    });
}

async function loadUser(){
    console.log("loading user");
    try{
    const result = await getUser();
    console.log(result)
    }catch(error){
        console.log("error:",error.message);

    }
    

    console.log("done");
}
loadUser();
//loading user - user not found -done

*/

function getUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("user not found"));
            //resolve("User data received");
        }, 2000);
    });
}

async function loadUser() {
    console.log("Loading user...");

    try {
        const result = await getUser();

        console.log(result);
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        console.log("User lookup finished");
    }
}

loadUser();