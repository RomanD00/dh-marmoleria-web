/**
 * ==========================================================================
 * CONTROL DE ACCESO EDGE PARA BETA PRIVADA — DH MÁRMOLES
 * ==========================================================================
 * Protege despliegues Vercel (tanto `dh-marmoleria-web.vercel.app` en
 * Producción como Previews) mediante HTTP Basic Authentication cuando se
 * configuran variables de entorno en Vercel (nunca credenciales en código).
 *
 * Seguridad y límites:
 * - Nunca almacena contraseñas ni tokens en el código fuente.
 * - Mantiene bypass automático para el dominio oficial `dhmarmoleria.com.ar`
 *   una vez conectado al lanzamiento definitivo (salvo BETA_PROTECT_CUSTOM_DOMAIN=true).
 * - Para proteger la beta pública en `dh-marmoleria-web.vercel.app` en plan
 *   Hobby o como refuerzo de Deployment Protection, configurar en Vercel
 *   Environment Variables (All Environments):
 *   - BETA_AUTH_PASSWORD (requerida para exigir clave)
 *   - BETA_AUTH_USER (opcional, por defecto: "dh-beta")
 *   - BETA_REQUIRE_AUTH ("true" bloquea en 503 fail-closed si faltara clave)
 * ==========================================================================
 */

export const config = {
  matcher: '/((?!_astro|scripts|favicon\\.ico|robots\\.txt|site\\.webmanifest).*)'
};

function passThrough() {
  return new Response(null, {
    headers: {
      'x-middleware-next': '1'
    }
  });
}

function safeEqual(a, b) {
  const maxLen = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;

  for (let i = 0; i < maxLen; i += 1) {
    const codeA = i < a.length ? a.charCodeAt(i) : 0;
    const codeB = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= codeA ^ codeB;
  }

  return mismatch === 0;
}

function decodeBasicCredentials(authHeader) {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null;
  }

  try {
    const decoded = atob(authHeader.slice(6).trim());
    const separatorIndex = decoded.indexOf(':');
    if (separatorIndex < 0) {
      return null;
    }

    return {
      user: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1)
    };
  } catch {
    return null;
  }
}

export default function middleware(request) {
  const host = (request.headers.get('host') || '').toLowerCase();
  const isOfficialCustomDomain = /^(?:www\.)?dh(?:marmoleria|marmoles)\.com\.ar(?::\d+)?$/.test(host);

  // Al conectar el dominio oficial en lanzamiento definitivo, permitir acceso público directo
  // salvo que explícitamente se marque BETA_PROTECT_CUSTOM_DOMAIN=true.
  if (isOfficialCustomDomain && process.env.BETA_PROTECT_CUSTOM_DOMAIN !== 'true') {
    return passThrough();
  }

  const requireAuth = process.env.BETA_REQUIRE_AUTH === 'true';
  const expectedUser = (process.env.BETA_AUTH_USER || 'dh-beta').trim();
  const expectedPassword = process.env.BETA_AUTH_PASSWORD || '';

  // Fail-closed si se activó BETA_REQUIRE_AUTH=true pero falta la contraseña
  if (requireAuth && !expectedPassword) {
    return new Response(
      'Beta privada bloqueada: falta configurar BETA_AUTH_PASSWORD en las variables de entorno de Vercel.',
      {
        status: 503,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store, private',
          'X-Robots-Tag': 'noindex, nofollow, noarchive'
        }
      }
    );
  }

  if (!expectedPassword) {
    return passThrough();
  }

  const credentials = decodeBasicCredentials(request.headers.get('authorization') || '');
  if (
    credentials &&
    safeEqual(credentials.user, expectedUser) &&
    safeEqual(credentials.password, expectedPassword)
  ) {
    return passThrough();
  }

  return new Response('Acceso restringido — Beta privada DH Mármoles.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="DH Marmoles - Beta Privada", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, private',
      'X-Robots-Tag': 'noindex, nofollow, noarchive'
    }
  });
}
