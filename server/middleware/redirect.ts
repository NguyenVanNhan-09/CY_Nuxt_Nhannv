export default defineEventHandler((event) => {
    //check what the page is
    const req = event.node.req ?? {};
    const res = event.node.res ?? {};
    if(req.url?.includes("/news")) {
        //redirect to the product page
        res.writeHead(301, {Location: "/tin-tuc"});
        res.end();
    }
}) 