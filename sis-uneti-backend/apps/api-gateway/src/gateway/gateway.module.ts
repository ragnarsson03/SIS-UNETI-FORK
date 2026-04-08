// apps/api-gateway/src/gateway/gateway.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController, AcademicoGatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'redis',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [GatewayController, AcademicoGatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}