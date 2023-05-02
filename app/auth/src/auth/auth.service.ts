import bcrypt from 'bcrypt';
import { prisma } from "../db";
import { TokenPair } from "../token/types/tokenPair.type";
import { TokenPayload } from "./utils/jwtUtils";
import tokenService from "../token/token.service";

class AuthService {
  private async generateTokens(user): Promise<TokenPair> {
    const payload = new TokenPayload(user);
    const tokens = tokenService.generateToken({...payload});
    await tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    return { ...tokens };
  }

  async signup(userDto): Promise<TokenPair> {
    const { email, password, ...rest } = userDto;
    const candidate = await prisma.user.findUnique({ where: { email } });
    if (candidate) {
      throw Error("Ops");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await prisma.user.create({ ...rest, password: hashPassword, email });
    return this.generateTokens(user);
  }

  async login(email: string, password: string): Promise<TokenPair> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw Error("Ops");
    }
    const {password: userPassword} = user;
    const isPasswordEquals = await bcrypt.compare(password, userPassword as string);
    if (!isPasswordEquals) {
      throw Error("Ops");
    }
    return this.generateTokens(user);
  }

  async refresh(refreshToken: string): Promise<TokenPair> {
    if (!refreshToken) {
      throw Error("Ops");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findRefreshToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw Error("Ops");
    }
    const user = prisma.user.findUnique({ where: { id: userData.id } });
    return this.generateTokens(user);
  }
}

export default new AuthService();