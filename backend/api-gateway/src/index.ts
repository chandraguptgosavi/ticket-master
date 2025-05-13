import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "@/middlewares/error-handler";
import proxy, { ProxyOptions } from "express-http-proxy";
import { authenticate } from "@/middlewares/auth-middleware";

dotenv.config();

const PORT = process.env.API_GATEWAY_PORT!;

const app = express();

app.use(express.json());

const proxyOptions: ProxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl;
  },
  proxyErrorHandler: (err, res, next) => {
    console.error(`Proxy error: ${err.message}`);
    res.status(500).json({
      message: err.message,
      name: "InternalServerError",
    });
  },
};

const eventCrudServiceProxy = proxy(process.env.EVENT_CRUD_SERVICE_URL!, {
  ...proxyOptions,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    if (proxyReqOpts.headers) {
      proxyReqOpts.headers["content-type"] = "application/json";
      proxyReqOpts.headers["x-username"] = srcReq.user?.sub;
      proxyReqOpts.headers["x-user-roles"] = srcReq.user?.roles;
    }
    return proxyReqOpts;
  },
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    console.info(
      `Response received from Event Crud Service: ${proxyRes.statusCode}`
    );

    return proxyResData;
  },
});

app.use(
  "/api/auth",
  proxy(process.env.IDENTITY_SERVICE_URL!, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers!!["content-type"] = "application/json";
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.info(
        `Response received from Identity Service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
  })
);

app.use("/api/events", authenticate, eventCrudServiceProxy);
app.use("/api/venues", authenticate, eventCrudServiceProxy);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
