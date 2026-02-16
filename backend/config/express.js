const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');
const app = express();


app.use(logger('dev'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Router connections:
let projectsRouter = require('../app/routers/projectsRouter');
let referenceRouter = require('../app/routers/referenceRouter');
let servicesRouter = require('../app/routers/servicesRouter');
let usersRouter = require('../app/routers/usersRouter');

// Define paths for the routers
app.use('/api/projects', projectsRouter);
app.use("/api/references", referenceRouter);
app.use("/api/services", servicesRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error json
  res.status(err.status || 500);
  res.json(
    {
      success: false,
      message: err.message
    }
  );
});

module.exports = app;