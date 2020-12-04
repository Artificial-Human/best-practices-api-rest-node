import { RouteDefinition } from "@models/RouteDefinition";
import { Http } from "@status/codes";
import express, { NextFunction, RequestHandler, Response, Request, RouterOptions, Router } from 'express'
import { PathParams, RequestHandlerParams } from "express-serve-static-core";
import BaseError from "./baseError";

const buildRouter = (options?: RouterOptions): Router => {
  const router = Router({ ...options, mergeParams: true });

  const useMethod = router.use;
  const getMethod = router.get;
  const postMethod = router.post;
  const putMethod = router.put;
  const patchMethod = router.patch;
  const deleteMethod = router.delete;

  // @ts-ignore
  router['use'] = function(
    path: PathParams,
    ...handlers: RequestHandler[] | RequestHandlerParams[]
  ) {
    // @ts-ignore
    return useMethod.call(router, path, wrap(...handlers));
  };

  router['get'] = function(
    path: PathParams,
    ...handlers: RequestHandler[] | RequestHandlerParams[]
  ) {
    // @ts-ignore
    return getMethod.call(router, path, wrap(...handlers));
  };

  router['post'] = function(
    path: PathParams,
    ...handlers: RequestHandler[] | RequestHandlerParams[]
  ) {
    // @ts-ignore
    return postMethod.call(router, path, wrap(...handlers));
  };

  router['put'] = function(
    path: PathParams,
    ...handlers: RequestHandler[] | RequestHandlerParams[]
  ) {
    // @ts-ignore
    return putMethod.call(router, path, wrap(...handlers));
  };

  router['patch'] = function(
    path: PathParams,
    ...handlers: RequestHandler[] | RequestHandlerParams[]
  ) {
    // @ts-ignore
    return patchMethod.call(router, path, wrap(...handlers));
  };

  router['delete'] = function(
    path: PathParams,
    ...handlers: RequestHandler[] | RequestHandlerParams[]
  ) {
    // @ts-ignore
    return deleteMethod.call(router, path, wrap(...handlers));
  };

  return router;
};


export const register = (app: express.Express, controllers: Array<any>) => {  
  const router = buildRouter()
  controllers.forEach((controller: any) => {   
    const instance = new controller();
    const prefix                         = Reflect.getMetadata('prefix', controller);
    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);
    routes.forEach(route => {    
      const callback: RequestHandler = async (req: express.Request, res: Response, next: NextFunction) => {        
        try {
          await instance[route.methodName](req, res);
        } catch (error) {
          handleError(error, res);
        }
      } 
      return router[route.requestMethod](prefix + route.path, callback );
    });   
  });

  app.use(router)

  app.use((err: Error, _: any, res: Response, next: NextFunction) => {
    console.log("Error handler");
    handleError(err, res);
  });
}

const handleError = (err: Error, res: Response) => {
  if ((err as BaseError).status) {
    const e = err as BaseError;
    res
      .status(e.status)
      .send({
        message: e.message,
        code: e.code,
        error: e.error
          ? e.error
          : null
      });
    return;
  }

  return res
    .status(Http.InternalServerError)
    .send({ code: Http.InternalServerError, error: err.message });
};


let wrap = (...handlers: any[]) => async (req: Request, res: Response, next: NextFunction) => {
  for (let i = 0; i < handlers.length; i += 1) {
    try {
      await handlers[i](req, res, next)
    } catch (error) {      
      next(error)
    }
  }
}