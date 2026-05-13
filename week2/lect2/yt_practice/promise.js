//--------------------------------------------------------------------------------------------------------//
// promise has 3 state:
    // 1. accepted (resolved)
    // 2. await
    // 3. reject
//--------------------------------------------------------------------------------------------------------//   
    // this is a schronous promise but mainly promise is used for aschronous task;
        const data = new Promise((resolve,notrecived) => {
            const check = true;
            if(check) resolve("data has been arrived :)");
            else notrecived("data is not recived :(");
        });

        data.then((output) => {
            console.log("yeee",output);
        }).catch((output) => {
            console.log("ohh no ",output);
        }).finally(() => {
            console.log("api call ended");
        });
//--------------------------------------------------------------------------------------------------------//   
