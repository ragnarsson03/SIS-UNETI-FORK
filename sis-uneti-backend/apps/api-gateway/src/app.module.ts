import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [AuthModule, GatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
