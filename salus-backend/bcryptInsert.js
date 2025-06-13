const bcrypt = require('bcrypt');
const db = require('./db/connection');

async function hashPasswords() {
  const users = [
    { correo: 'laura.mendoza@example.com', password: '123456' },
    { correo: 'ricardo.perez@example.com', password: 'abcdef' },
    { correo: 'admin.flores@example.com', password: 'admin123' },
    { correo: 'asesor.rivas@example.com', password: 'asesor123' },
    { correo: 'cliente.soto@example.com', password: 'cliente123' }
  ];

  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE usuario SET password = ? WHERE correo = ?',
        [hash, user.correo],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
    console.log(`Contraseña actualizada para ${user.correo}`);
  }
  db.end();
}

hashPasswords();
