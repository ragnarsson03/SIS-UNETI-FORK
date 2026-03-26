import { Client } from 'pg';

// Datos basados en tu app.module.ts
const client = new Client({
  host: 'localhost',
  port: 5433, // Puerto configurado en tu AppModule
  user: 'postgres',
  password: 'postgres',
  database: 'data_soberana',
});

async function testConnection() {
  console.log("🔄 Intentando conectar a PostgreSQL en el puerto 5433...");
  try {
    await client.connect();
    console.log("✅ ¡Conexión exitosa a la base de datos 'data_soberana'!");
    
    const res = await client.query('SELECT NOW()');
    console.log("🕒 Hora del servidor DB:", res.rows[0].now);
    
    await client.end();
  } catch (err: any) {
    console.error("❌ Error de conexión detallado:");
    console.error(`   Mensaje: ${err.message}`);
    console.error(`   Código de error: ${err.code}`);
    console.log("\n💡 Tip: Verifica si PostgreSQL está corriendo y si el puerto es realmente el 5433.");
  }
}

testConnection();