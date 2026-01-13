Authentication strategy (JWT / OAuth2 / Session-based):-

Here's a clear, practical comparison of Authentication Strategies- JWT,OAuth2, and Sesson-based-with when to use what, especially useful for NestJS.
1. Session-Based Authentication(Traditional)

How it works:-
1. User logs in with email/password
2. Server creates a session and stores it(memory/Redis/DB)
3. Server sends session ID(cookie) to client
4. Client sends cookie on every request
5. Server validates session on each request

Client -> Login -> Server
Client <- SessionID (Cookie)

Client -> Request + Cookie + Server
Server -> Validate Sesssion -> Response

PROS:-
. Simple to implement
. Easy logout (just destroy session)
. Good for monolithic apps

CONS:-
. Server must store sessions(memory heavy)
. Not scalable without Redis
. Poor fit for mobile apps & APIs
. Hard with microservices

Best Use Case

Traditional web apps
Small internal tools
Server-rendered apps


2. JWT(JSON Web Token) Authentication
How it works
1. User logs in
2. Server creates a JWT(signed token)
3. Client stores token (localStorage/cookie)
4. Client sends token in Authorization Header
5. Server verifies token (no DB call)

Diagram
Client -> Login -> Server
Client<- JWT

Client -> Request+JWT+Server
Server -> Verify Token -> Response

JWT Structure
Header.Payload.Signature

PROS:-
. Stateless(no session storage)
. Highly scalable
. Works well with REST APIs
. Perfect for microservices

CONS:-
. Logout is hard(token still valid)
. Token theft risk if stored poorly
. Token size larger than session ID

Best Use Case
REST APIs
Mobile apps
Microservices
SPA (React / Angular / Vue)

3. OAuth2(Authorization Framework)
OAuth2 is not authentication alone, it's delegated authorization.

How it works(Google Login example)
1. User clicks "Login with Google"
2. Google authenticates user.
3. Google sends access token.
4. Your backend uses token to get user info

Diagram
Client -> Google Login
Google -> Access Token
Client -> Backend -> Google API

Common OAuth2 flows
. Authorization Code (most secure)
. Client Credentials
. Password Grant (deprecated)
. Implicit(deprecated)

PROS
. No password handling
. Trusted third-party auth
. Secure & industry standard
. Single Sign-On (SSO)

CONS
. Complex to implement
. Depends on external providers
. Needs refresh token handling

Best Use Case

Login with Google/GitHub
Enterprise apps
Third-party API access
SSO systems

Quick Comparison Table
Features                Session             JWT             OAuth2
Server storage          Yes                 No              No
Stateless.              No                  Yes             Yes
Scalability             Low                 High            High
Logout control          Easy                Hard            Medium
Mobile friendly         No                  Yes             Yes
Third-party login       No                  No              Yes

Which One should You use?
Use Session-Bassed if:
. Simple web app
. No mobile or microservices
. Server-side rendering

Use JWT if:
. Rest API
. React/Mobile frontend
. MicroServices
. High scalability needed

Use OAuth2 if:
. Social login needed
. SSO
. Enterprise-level security


Password hashing and secure storage:-
Why Password Hashing is Mandatory

Storing passwords in plain text is a critical security vulnerability.

If the database is leaked:
. Plain text -> all accounts compromised
. Hashed passwords -> attacker connot reverse them easily

Rule: Never store raw passwords.

Hashing vs Encryption (important Difference)
Feature             Hashing             Encryption
Reversible          No                  Yes
Purpose             Password storage    Data protection
key required        NO                  Yes
Example             bcrypt              Yes

Passwords must be hashed, not encrypted

Salting(very Important):-
Salt = random value added to password before hashing.

hash=bcrypt(password + salt)

why salt?
. Prevents rainbow table attacks
. Same passwords -> different hashes
. bcrypt generates salt automatically

Best Hashing Algorithms (2026 Standard)
Algorithm               Recommended                 Reason
bcrypt                  Yes                         Adaptive, battle-tested
argon2                  Best                        Memory-hard(OWASP #1)
scrypt                  Yes                         Strong against GPU
SHA256                  No                          Too Fast (unsafe)
MD5                     Never                       Broken

bcrypt/argon2 only

Token generation, refresh, and expiration handling:-
JWT Strategy Overview

Access Token
. Short-lived (5-15 min)
. Sent in Authorization: Bearer <token>
. Used to access protected APIs

Refresh Token
. Long-lived (7-30days)
. Stored hashed in DB
. Used only to generate new access tokens

Flow Diagram:-
Login
    Access Token(15m)
    Refresh Token (7d)

Access Token expires
    Send Refresh Token
        New Access + Refresh Token


1. Install Dependencies
npm install @nestjs/jwt @nestjs/passport passport passport-jwt

2. JWT Config(Environment Variables)
JWT_ACCESS_SECRET=access_secret_123
JWT_REFRESH_SECRET=refresh_secret_456

JWT_ACCESS_EXPIRES=15M
JWT_REFRESH_EXPIRES=7D

3. Auth Module

// auth.module.ts
@Module({
    imports:[
        JwtModule.register({}),
    ],
    controllers:[],
    providers:[],
    exports:[],
})

export class AuthModule{}


4. User Entity(PostgreSQL)

// user.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({nullable:true})
    refreshToken?: string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

2. AuthService (JWT + Refresh Token)
// auth.service.ts
import {Injectable,UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeprm';
import {Repository} from 'typeorm';
import * as argon2 from 'argon2';

import {User} from './user.entity';

@Injectable()
export class AuthService{
    constructor(
        @InjectRespository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ){}

    async generateTokens(user:User){
        const payload={sub:user.id, email:user.email};

        const acessToken=await this.jwtService.signAsync(payload,{
            secret:process.env.JWT_ACCESS_SECRET,
            expiresIn:'15m',
        });

        const refreshToken = await this.jwtService.signAsync(payload,{
            secret:process.env.JWT_REFRESH_SECRET,
            expires:'7d',
        })

        await this.saveRefreshToken(user.id,refreshToken);

        return {accessToken,refreshToken};
    }

    async saveRefreshToken(userId:string, token:string){
        const hash=await argon2.hash(token);
        await this.userRepo.update(userId,{refreshToken:hash});
    }

    async refreshTokens(userId:string,refreshToken:string){
        const user=await this.userRepo.findOne({where:{id:userId}});

        if(!user || !user.refreshToken){
            throw new UnauthorizedException();
        }

        const isValid= await argon2.verify(user.refreshToken,refreshToken);

        if(!isValid){
            throw new UnauthorizedException('Invalid refresh token');
        }

        return this.generateTokens(user);
    }

    async logout(userId:string){
        await this.userRepo.update(userId,{refreshToken:null});
    }
}

5. JWT Strategy (Access Token Guard)
//strategies/jwt.strategy.ts
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Injectable} from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_ACCESS_SECRET,
        });
    }

    validate(payload:any){
        return payload;
    }
}


6. AuthController (Login+Refresh)
// auth.controller.ts
@Post('refersh')
refresh(
    @Body('userId') useId:string,
    @Body('refreshToken') refreshToken:string,
){
    return this.authService.refreshTokens(userId,refreshToken);
}

Role-Based Access Control (RBAC):-

RBAC concept
RBAC=Permissions based on roles

Example:
. ADMIN -> full access
. MANAGER -> manage users
. USER -> limited access

JWT will carry the role, and Guards will enforce access.

1. Define Roles(Enum)
//auth/roles.enum.ts
export enum Role{
    ADMIN='ADMIN'
    MANAGER='MANAGER',
    USER="USER',
}

2. Update User Entity (PostgreSQL)
//auth/user.entity.ts
import {Role} from './roles.enum';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({
        type:'enum',
        enum:Role,
        default:Role.USER,
    })
    role:Role;

    @Column({nullable:true})
    refreshToken?:string;
}

3. Include Role in JWT Payload
// auth.service.ts
async generateTokens(user:User){
    const payload:{
        sub:user.id,
        email:user.email,
        role:user.role,
    };

    const accessToken=await this.jwtService.signAsync(payload,{
        secret:process.env.JWT_ACCESS_SECRET,
        expiresIn:'15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload,{
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn:'7d',
    })

    await this.saveRefreshToken(user.id,refreshToken);
    return {accessToken,refreshToken};
}


4. Create Roles Decorator
// auth/decorators/roles.decorator.ts
import {SetMetadata} from '@nestjs/common';
import {Role} from '../roles.enum';

export const ROLES_KEY='roles';
export cosnt Roles=(...roles:Role[])=>
    SetMetadata(ROLES_KEY,roles);


5. Roles Guard (Core RBAC Logic)
// auth/gurads/roles.guard.ts
import{
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLES_KEY} from '../decorators/roles.decorators';
import {Role} from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector) {}

    canActivate(context: ExecutionContext):boolean{
        const requiredRoles=this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(),context.getClass()],
        );

        if(!requiredRoles) return true;

        const {user}=context.switchToHttp().getRequest();
        return requiredRoles.includes(user.role);
    }
}


6. Protect Routes (JWT + RBAC)
// admin.controller.ts
import {Controller,Get,UseGuards} from '@nestjs/common';
import {JwtAuthGuards} from '../auth/guards/jwt-auth.gurads';
import {RolesGuard} from '../auth/guards/roles.guard';
import {Roles} from '../auth/decorators/roles.decorator';
import {Role} from '../auth/roles.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard,RolesGuard)
export class AdminController{

    @Get('dashboard')
    @Roles(Role.ADMIN)
    getAdminDashboard(){
        return 'Admin only data';
    }
}

7. JWT Auth Guard
//auth/guards/jwt-auth.guards.ts
import {AuthGuard} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


8. Attach User to Request (JWT Strategy)
//auth/strategies/jwt.strategy.ts
validate(payload:any){
    return payload;//attaches to req.user
}


How Request is Authorized?
Request
 → JwtAuthGuard (valid token?)
 → RolesGuard (has required role?)
 → Controller

