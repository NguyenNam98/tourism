import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProxyMiddlewareAPI implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const apiAuth = 'http://localhost:7801';
        const apiBookTour = 'http://localhost:7802';
        const apiOrderMenu = 'http://localhost:7803';
        const apiTableReservation = 'http://localhost:7804';
        // Create a proxy middleware for API requests

        // Route requests based on URL path
        if (req.originalUrl.startsWith('/api/auth')) {
            return this.createProxy(apiAuth)(req, res, next);
        }
        if (req.originalUrl.startsWith('/api/book-tour')) {
            return this.createProxy(apiBookTour)(req, res, next);
        }
        if (req.originalUrl.startsWith('/api/order-menu')) {
            return this.createProxy(apiOrderMenu)(req, res, next);
        }
        if (req.originalUrl.startsWith('/api/table-reservation')) {
            return this.createProxy(apiTableReservation)(req, res, next);
        }
    }
    createProxy(target: string) {
        return createProxyMiddleware({
            target,
            changeOrigin: true,
            onProxyReq: (proxyReq, req, res) => {
                if (req.method !== "GET" && req.body) {
                    const bodyData = JSON.stringify(req.body);

                    // Update the headers for content type and length
                    proxyReq.setHeader('Content-Type', 'application/json');
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));

                    // Write the body data to the proxy request
                    proxyReq.write(bodyData);
                }
            },
        });
    }
}
