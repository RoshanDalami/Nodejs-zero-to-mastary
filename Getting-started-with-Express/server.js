const express = require("express");
const path = require('path');
const app = express();
const PORT = 3000;
const friendsRouter = require("./Routers/friends.router");
const messagesRouter = require("./Routers/messages.router");



//middleWare

app.use((req, res, next) => {
  const start = Date.now();
  next(); //hence this is a middle ware and no an endpoint we have to call next fucntion. so that request will passed to the one of the correct handler down.

  //action will return after middle ware;
  //baseURL gives actual url while using MVC and express router
  const delta = Date.now() - start;
  console.log(
    `Request method is ${req.method} and Url is  ${req.baseUrl}${req.url} completed in ${delta} ms`
  );
});

//adding middleware for json parsing
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.use('/friends',friendsRouter);
app.use('/messages',messagesRouter);

app.listen(PORT, () => {
  console.log("Express sever is listing at " + PORT);
});
