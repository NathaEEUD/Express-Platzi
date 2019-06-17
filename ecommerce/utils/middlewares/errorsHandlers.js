const Sentry = require("@sentry/node");
const boom = require('boom');
const { config } = require('../../config');

const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}` });

function withErrorstack(err, stack) {
  if (config.dev) {
    // Object.assign({}, err, stack)
    console.log('Obj assign:::::', { ...err, stack});
    return { ...err, stack};
  }
}

function logErrors(err, req, res ,next) {
  Sentry.captureException(err);
  console.log(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function clientErrorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload}
  } = err;

  // catch errors for AJAX request or if an error occurs while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorstack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload}
  } = err;

  res.status(statusCode);
  res.render('error', withErrorstack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
};