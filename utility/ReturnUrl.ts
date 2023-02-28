async function ReturnUrl (context:any) {    

  // if (process.env.NODE_ENV === "production") {
      return `https://${context.req.rawHeaders[1]}`;
      // } else  { 
      //       this gets rid of the error
      // } else if (process.env.NODE_ENV !== "production") {        
      //   return "http://localhost:3000";      
      // }
}

export default ReturnUrl
