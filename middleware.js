/**
 * ==========================================================================
 * CONTROL DE ACCESO EDGE PARA BETA PRIVADA — DH MÁRMOLES
 * ==========================================================================
 * Protege despliegues Vercel Preview mediante HTTP Basic Authentication cuando
 * se configuran variables de entorno en Vercel (Preview Environment Variables).
 *
 * Seguridad y límites:
 * - Nunca almacena contraseñas ni tokens en el código fuente.
 * - Nunca bloquea despliegues de Producción (VERCEL_ENV === 'production').
 * - Compatible como capa adicional o alternativa a Vercel Deployment Protection.
 *
 * Variables esperadas en Vercel (solo Preview):
 * - BETA_AUTH_PASSWORD (requerida para activar el candado Basic Auth)
 * - BETA_AUTH_USER (opcional, por defecto: "dh-beta")
 * - BETA_REQUIRE_AUTH ("true" exige contraseña obligatoria; si falta BETA_AUTH_PASSWORD
 *   devuelve 503 fail-closed para evitar exposición accidental en beta privada)
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
  const vercelEnv = (process.env.VERCEL_ENV || '').trim();

  // Nunca interferir con el sitio público en producción
  if (vercelEnv === 'production') {
    return passThrough();
  }

  const requireAuth = process.env.BETA_REQUIRE_AUTH === 'true';
  const expectedUser = (process.env.BETA_AUTH_USER || 'dh-beta').trim();
  const expectedPassword = process.env.BETA_AUTH_PASSWORD || '';

  // Fail-closed si se marcó BETA_REQUIRE_AUTH=true pero no se definió la clave
  if (requireAuth && !expectedPassword) {
    return new Response(
      'Beta privada bloqueada: falta configurar BETA_AUTH_PASSWORD en las variables de entorno Preview de Vercel.',
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

  // Solo exigir autenticación cuando el entorno Preview o flag explícito tenga clave cargada
  const shouldProtect = Boolean(expectedPassword) && (vercelEnv === 'preview' || requireAuth);
  if (!shouldProtect) {
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
