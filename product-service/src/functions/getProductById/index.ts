import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        cors: true,
        path: "products/{productId}",
        request: {
          parameters: {
            paths: {
              productId: true,
            },
          },
        },
      }
    }
  ]
}
