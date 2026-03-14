// apps/api-gateway/src/auth/auth.controller.ts
@Post('login')
async login(@Body() body: { cedula: string; clave: string }) {
    const { cedula, clave } = body;

    // Enviamos la petición a través de Redis
    const response = await lastValueFrom(
        this.redisClient.send({ cmd: 'auth.login' }, { cedula, clave })
    );

    if (!response.success) {
        throw new UnauthorizedException(response.message);
    }

    return response;
}
