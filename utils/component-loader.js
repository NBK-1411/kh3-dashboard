const loadedStyles = new Set();
const moduleCache = new Map();

export async function loadComponent(name, target, props = {}) {
  const mount = typeof target === "string" ? document.querySelector(target) : target;
  if (!mount) return null;

  const basePath = `./components/${name}`;
  const html = await fetchText(`${basePath}/component.html`);
  mount.innerHTML = html;
  await loadCssOnce(name, `${basePath}/component.css`);

  const module = await importModuleOnce(name, `../components/${name}/component.js`);
  if (typeof module.init === "function") {
    return module.init(mount, props);
  }
  return null;
}

export async function loadLayout(name, target, props = {}) {
  const mount = typeof target === "string" ? document.querySelector(target) : target;
  if (!mount) return null;

  const basePath = `./layouts/${name}`;
  const html = await fetchText(`${basePath}/layout.html`);
  mount.innerHTML = html;
  await loadCssOnce(`layout-${name}`, `${basePath}/layout.css`);

  const module = await import(`../layouts/${name}/layout.js`);
  if (typeof module.init === "function") {
    return module.init(mount, props);
  }
  return null;
}

async function fetchText(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }
  return response.text();
}

async function loadCssOnce(key, href) {
  if (loadedStyles.has(key)) return;

  const response = await fetch(href);
  if (response.ok) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.append(link);
    loadedStyles.add(key);
  }
}

async function importModuleOnce(key, href) {
  if (!moduleCache.has(key)) {
    moduleCache.set(key, import(href));
  }
  return moduleCache.get(key);
}
