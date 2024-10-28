> [!WARNING]
> Tener conexión a internet. La base de datos está en la nube. Si desea levantarla en local, agregue el archivo `.env` en la raíz del proyecto y añada: `NEXT_PUBLIC_API_URL=http://localhost:4000/api`.

> EasyPark es una plataforma web que permite registrar autos y motos en un parqueadero. Las capacidades son limitadas.

> [!NOTE]
> Asegúrese de tener las versiones estables de Node y npm.
> Versiones usadas:
>
> - Node: v20.9.0
> - npm: 10.5.2

> [!NOTE]
> Ejecute `npm install` cuando clone el repositorio para instalar las dependencias. Use `npm run dev` para levantar el proyecto. Recuerde que primero debe tener el backend corriendo y las variables de entorno configuradas.

> [!IMPORTANT]
> Cree el archivo `.env` y agregue las siguientes variables de entorno:
> `NEXT_PUBLIC_API_URL=http://localhost:4000/api`.

> [!IMPORTANT]
> Clonar, instalar y levantar primero el backend.

> [!NOTE]
> Credenciales de usuario: [email: employee1@gmail.com, password: 1234]. Las contraseñas están encriptadas en el backend.

> [!WARNING]
> Asegúrese de que la conexión Wi-Fi que tenga al levantar el backend y el frontend no bloquee los puertos, ya que podría causar problemas.

### Tecnologías

> Next.js, Redux Toolkit, Tailwind CSS, Axios, Vercel

### Autenticación

La aplicación utiliza autenticación basada en tokens. Si el usuario no está autenticado, no podrá acceder a las funciones de la aplicación. Una vez que el usuario inicie sesión, se generará un token que permite el acceso sin necesidad de ingresar credenciales nuevamente durante un plazo de 1 hora. Después de este tiempo, el token expirará y será necesario volver a iniciar sesión.

### Pasos para usar la aplicación

1. **Iniciar sesión**: Utilice las credenciales proporcionadas (email: `employee1@gmail.com`, password: `1234`) para iniciar sesión en la plataforma, para hacerlo en local use: http://localhost:3000, para hacerlo en la app desplegada en vercel usar:
   https://parking-front-end.vercel.app
2. **Ver parqueadero**: Acceda a la sección del parqueadero para ver las disponibilidades actuales.
3. **Realizar un nuevo registro**: Podrá registrar un nuevo vehículo en el parqueadero siempre que haya disponibilidad. Si no hay espacio, el sistema bloqueará la opción de registro.
4. **Detalles del vehículo**: Podrá ver los detalles del auto que está parqueado.
5. **Registrar salida**: Tendrá la opción de registrar la salida del vehículo y liberar el espacio correspondiente en el parqueadero.

### Problemas comunes

- **Problemas de conexión**: Asegúrese de que su conexión a internet no esté bloqueando los puertos necesarios.
- **Errores de autenticación**: Verifique que las credenciales de usuario sean correctas.
- **Falta de disponibilidad**: Si no puede registrar un vehículo, compruebe si hay espacio disponible en el parqueadero.
