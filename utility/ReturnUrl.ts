async function ReturnUrl (context:any) {
    console.log("in the return Url function");

    if (process.env.NODE_ENV === "production") {
        return `https://${context.req.rawHeaders[1]}`;
      } else if (process.env.NODE_ENV !== "production") {
        console.log("were still returning this no problem then")
        return "http://localhost:3000";
      }


    console.log(process.env.NODE_ENV)

    console.log('context')
    console.log(context)
    console.log(typeof context)
}

export default ReturnUrl