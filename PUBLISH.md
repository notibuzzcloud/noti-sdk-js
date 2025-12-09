# Guía de Publicación

Esta guía explica cómo publicar `@notibuzz/noti-sdk-js` en npm y GitHub.

## Prerrequisitos

1. Tener una cuenta en [npm](https://www.npmjs.com/)
2. Tener una cuenta en [GitHub](https://github.com/)
3. Tener acceso al repositorio `notibuzzcloud/noti-sdk-js`

## Preparación

### 1. Verificar package.json

Asegúrate de que `package.json` tenga:
- ✅ Nombre único en npm
- ✅ Versión correcta
- ✅ Descripción clara
- ✅ Keywords relevantes
- ✅ Repository URL correcta
- ✅ License especificada

### 2. Construir el proyecto

```bash
npm run clean
npm run build
```

Esto generará los archivos en `dist/`.

### 3. Verificar archivos incluidos

El archivo `.npmignore` controla qué archivos se incluyen en el paquete npm. Por defecto, solo se incluyen:
- `dist/` (archivos compilados)
- `README.md`
- `LICENSE`

## Publicar en npm

### Primera publicación

1. **Iniciar sesión en npm:**
```bash
npm login
```

2. **Verificar que estás autenticado:**
```bash
npm whoami
```

3. **Publicar:**
```bash
npm publish --access public
```

> Nota: `--access public` es necesario para paquetes scoped o si quieres asegurar que sea público.

### Actualizaciones futuras

1. **Actualizar versión en package.json:**
```bash
# Versión patch (0.1.0 -> 0.1.1)
npm version patch

# Versión minor (0.1.0 -> 0.2.0)
npm version minor

# Versión major (0.1.0 -> 1.0.0)
npm version major
```

2. **Actualizar CHANGELOG.md** con los cambios

3. **Construir y publicar:**
```bash
npm run build
npm publish
```

> Nota: El script `prepublishOnly` se ejecutará automáticamente antes de publicar, limpiando y construyendo el proyecto.

## Publicar en GitHub

### Crear repositorio

1. Ve a [GitHub](https://github.com/new)
2. Crea un nuevo repositorio llamado `noti-sdk-js`
3. No inicialices con README, .gitignore o LICENSE (ya los tenemos)

### Configurar Git

```bash
# Si aún no tienes el repositorio inicializado
git init

# Agregar remoto
git remote add origin https://github.com/notibuzzcloud/noti-sdk-js.git

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: @notibuzz/noti-sdk-js v1.0.0"

# Push a GitHub
git branch -M main
git push -u origin main
```

### Crear release en GitHub

1. Ve a tu repositorio en GitHub
2. Click en "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: `v1.0.0 - Initial Release`
5. Description: Copia el contenido de CHANGELOG.md
6. Publicar release

## Verificación

### Verificar en npm

```bash
npm view @notibuzz/noti-sdk-js
```

O visita: https://www.npmjs.com/package/@notibuzz/noti-sdk-js

### Verificar instalación

```bash
npm install @notibuzz/noti-sdk-js
```

Luego en un proyecto de prueba:

```typescript
import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'
// Debería funcionar sin errores
```

## Checklist antes de publicar

- [ ] `package.json` tiene información correcta
- [ ] Versión actualizada
- [ ] `README.md` está completo y actualizado
- [ ] `LICENSE` está presente
- [ ] `.npmignore` está configurado correctamente
- [ ] `CHANGELOG.md` está actualizado
- [ ] Código compila sin errores (`npm run build`)
- [ ] Tests pasan (si los hay)
- [ ] Ejemplos funcionan correctamente
- [ ] Documentación está completa

## Comandos útiles

```bash
# Ver qué archivos se incluirán en el paquete
npm pack --dry-run

# Probar el paquete localmente antes de publicar
npm pack
npm install ./notibuzz-noti-sdk-js-1.0.0.tgz

# Despublicar (solo dentro de 72 horas)
npm unpublish @notibuzz/noti-sdk-js@1.0.0
```

## Notas importantes

- ⚠️ **No publiques versiones con errores**: Una vez publicada, no puedes eliminar una versión después de 72 horas
- ⚠️ **Usa versiones semánticas**: Sigue [Semantic Versioning](https://semver.org/)
- ⚠️ **Actualiza CHANGELOG**: Mantén un registro de cambios
- ⚠️ **Prueba antes de publicar**: Siempre prueba el paquete localmente

