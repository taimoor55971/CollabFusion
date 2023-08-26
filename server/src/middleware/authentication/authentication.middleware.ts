import { Injectable, NestMiddleware } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Authentication middleware executed');

    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    try {
      const decodedToken = jwt.verify(accessToken, process.env.JWT_TOKEN) as { sub: string };
      req.user = decodedToken.sub; // Attach user ID to the request object
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }
}
