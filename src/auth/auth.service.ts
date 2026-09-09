import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    if (!getApps().length) {
      const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');
      if (privateKey) {
        initializeApp({
          credential: cert({
            projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
            clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
            privateKey: privateKey.replace(/\\n/g, '\n'),
          }),
        });
      }
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async register(userData: any) {
    const existing = await this.usersService.findByEmail(userData.email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }
    const user = await this.usersService.create(userData);
    return this.login(user);
  }

  async firebaseLogin(firebaseToken: string) {
    try {
      if (!getApps().length) {
        throw new BadRequestException('Firebase admin is not initialized');
      }

      const decodedToken = await getAuth().verifyIdToken(firebaseToken);
      
      const email = decodedToken.email;
      const name = decodedToken.name || (email ? email.split('@')[0] : 'User');
      const uid = decodedToken.uid || decodedToken.sub;

      if (!email) {
        throw new BadRequestException('Firebase token does not contain email');
      }

      let user = await this.usersService.findByEmail(email);
      
      if (!user) {
        // Register new user via Firebase
        const randomPassword = Math.random().toString(36).slice(-10) + 'A1!'; // Satisfy strong password if needed
        user = await this.usersService.create({
          name,
          email,
          password: randomPassword, // Fallback password
        });
        
        // Save firebase uid
        user.firebaseUid = uid;
        await user.save();
      } else if (!user.firebaseUid) {
        // Link account
        user.firebaseUid = uid;
        await user.save();
      }

      return this.login(user);
    } catch (error) {
      console.error('Firebase login error:', error);
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}
