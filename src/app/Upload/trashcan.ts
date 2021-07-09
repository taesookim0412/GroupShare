export {}

// needs an additional state variable for while unloading. kind of messy states.
// useEffect(() => {
//     if (loggedIn) load();
//     return () => {
//         unloadAsync().then(() => {
//             dispatch(setStatus("idle"))
//             console.log(status)
//             return;
//         })
//     }
// }, [])
// async function unloadAsync() {
//     await new Promise<void>(resolve => {
//         try{
//             //seems like exit doesn't work.
//             ffmpeg.exit();
//         }
//         catch{
//             setTimeout(() => {
//                     console.log('unloaded');
//                     resolve()}
//                 , 2000);
//         }
//     });
// }
// const load = async () => {
//     console.log(status)
//     const prevStatus = status;
//     while(status === "uploading"){
//         await new Promise<void>(resolve => {
//             const a = setInterval(() => {// @ts-ignore
//             if (status == "idle") {
//                 clearInterval(a);
//                 console.log("Cleared")
//                 resolve();
//             }
//             else{
//                 try{
//                     ffmpeg.exit();
//                 }
//                 catch{}
//                 console.log(status)
//                 console.log("Still looping")
//             }} , 1000);
//         });
//     }
//
//     dispatch(setStatus("uploading"))
//
//     if (!ffmpeg.isLoaded()) {
//         await ffmpeg.load();
//     }
//     // put a video for testing
//     axios.post("/test_file", {url: "https://groupsharetk.s3.us-west-1.amazonaws.com/videos/1625451065385+when+they+call+u+a+good+boi.webm"}).then((file) => {
//         handleTestFile(file.data.data)
//     })
// }
// const load = async () => {
//     //intense memory leaks (DON'T DO THIS).
//     // const promise = new Promise<void>((resolve) => {
//     //
//     //     setInterval(() => { // @ts-ignore
//     //         console.log(status)
//     //
//     //         if (status === "idle") resolve()
//     //     }, 1000);
//     // })
//     // await promise;
//     // Why is there an exit function if we don't get to reload the module without an error....?
//     const prevStatus = status;
//     dispatch(setStatus("uploading"))
//     if (prevStatus === "uploading") {
//         const promise = new Promise<void>(resolve => {
//             try {
//                 ffmpeg.exit();
//             } catch (e) {
//                 setTimeout(() => resolve(), 5000);
//             }
//         })
//         promise.then(async() => {
//             await ffmpeg.load()
//             axios.post("/test_file", {url: "https://groupsharetk.s3.us-west-1.amazonaws.com/videos/1625451065385+when+they+call+u+a+good+boi.webm"}).then((file) => {
//                 handleTestFile(file.data.data)
//             })
//         })
//     }
//     else {
//         await ffmpeg.load();
//         axios.post("/test_file", {url: "https://groupsharetk.s3.us-west-1.amazonaws.com/videos/1625451065385+when+they+call+u+a+good+boi.webm"}).then((file) => {
//             handleTestFile(file.data.data)
//         })
//     }
// }
