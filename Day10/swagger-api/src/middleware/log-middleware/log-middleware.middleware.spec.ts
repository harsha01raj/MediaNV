import { LogMiddlewareMiddleware } from './log-middleware.middleware';

describe('LogMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new LogMiddlewareMiddleware()).toBeDefined();
  });
});
