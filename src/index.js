const MANIFEST = {
  id: "com.rnstream.addon",
  version: "0.1.0",
  name: "RN Stream",
  description: "Movie and TV-series add-on framework",
  resources: ["catalog", "meta", "stream"],
  types: ["movie", "series"],
  catalogs: [
    { type: "movie", id: "rn-movies", name: "RN Movies" },
    { type: "series", id: "rn-series", name: "RN Series" }
  ],
  idPrefixes: ["tt", "tmdb:"]
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store"
    }
  });

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (path === "/") {
      return new Response("RN Stream is running!");
    }

    if (path === "/health") {
      return json({ status: "ok", addon: "RN Stream", version: "0.1.0" });
    }

    if (path === "/manifest.json") {
      return json(MANIFEST);
    }

    // Stremio catalogue protocol: /catalog/:type/:id.json
    if (/^\/catalog\/(movie|series)\//.test(path)) {
      return json({ metas: [] });
    }

    // Stremio metadata protocol: /meta/:type/:id.json
    if (/^\/meta\/(movie|series)\//.test(path)) {
      return json({ meta: null });
    }

    // Stremio stream protocol: /stream/:type/:id.json
    // Provider adapters will be added after their authorized API formats
    // and permitted playback methods have been verified.
    if (/^\/stream\/(movie|series)\//.test(path)) {
      return json({ streams: [] });
    }

    return json({ error: "Not found" }, 404);
  }
};
