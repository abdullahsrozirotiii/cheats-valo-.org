const NOINDEX = 'noindex, nofollow';

function isPreviewHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host.endsWith('.pages.dev') || host.endsWith('.workers.dev');
}

class RobotsMetaHandler {
  element(element: Element) {
    element.setAttribute('content', NOINDEX);
  }
}

export const onRequest: PagesFunction = async (context) => {
  const hostname = new URL(context.request.url).hostname;
  if (!isPreviewHostname(hostname)) {
    return context.next();
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', NOINDEX);

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return new HTMLRewriter()
    .on('meta[name="robots"]', new RobotsMetaHandler())
    .on('meta[name="googlebot"]', new RobotsMetaHandler())
    .transform(
      new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      }),
    );
};
