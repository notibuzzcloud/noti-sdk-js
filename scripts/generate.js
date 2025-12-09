import { promises as fs } from 'fs';
import path from 'path';
// Importa las categorías desde data.ts en el root del proyecto
import { apiCategories } from '../data.ts';
function toCamelCase(id) {
    return id
        .replace(/^[^a-zA-Z]+|[^a-zA-Z0-9]+/g, ' ') // separa no-alfanum
        .trim()
        .split(/\s+/)
        .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
}
function ensureDir(p) {
    return fs.mkdir(p, { recursive: true });
}
function fillPath(pathTpl, params) {
    if (!params)
        return pathTpl;
    return pathTpl.replace(/\{(\w+)\}/g, (_, key) => {
        const v = params[key];
        if (v === undefined)
            throw new Error(`Falta pathParam: ${key}`);
        return encodeURIComponent(String(v));
    });
}
async function generateCategoryFile(root, key, endpoints) {
    const filePath = path.join(root, `src/api/endpoints/${key}.ts`);
    await ensureDir(path.dirname(filePath));
    const lines = [];
    lines.push(`// AUTO-GENERATED from data.ts. Do not edit.`);
    lines.push(`import { client } from '../client.js'`);
    lines.push(`\nconst makePath = (tpl: string, params?: Record<string, string | number | boolean>) => tpl.replace(/\\{(\\w+)\\}/g, (_, k) => encodeURIComponent(String(params?.[k])))`);
    for (const ep of endpoints) {
        const fn = toCamelCase(ep.id);
        const method = String(ep.method).toUpperCase();
        const description = ep.description || ep.title || '';
        const pathTpl = ep.path;
        lines.push(`\n/**\n * ${description}\n * Method: ${method}\n * Path: ${pathTpl}\n */`);
        lines.push(`export async function ${fn}<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {`);
        lines.push(`  const p = makePath('${pathTpl}', args.pathParams) || '${pathTpl}'`);
        if (method === 'GET') {
            lines.push(`  return client.get<T>(p, args.query)`);
        }
        else if (method === 'POST') {
            lines.push(`  return client.post<T>(p, args.body)`);
        }
        else if (method === 'PUT') {
            lines.push(`  return client.put<T>(p, args.body)`);
        }
        else if (method === 'DELETE') {
            lines.push(`  return client.delete<T>(p)`);
        }
        else {
            lines.push(`  throw new Error('Unsupported method: ${method}')`);
        }
        lines.push(`}`);
    }
    await fs.writeFile(filePath, lines.join('\n'), 'utf8');
}
async function generateIndex(root, categories) {
    const indexPath = path.join(root, 'src/index.ts');
    const exportsLines = [];
    exportsLines.push(`export * from './api/client.js'`);
    for (const c of categories) {
        exportsLines.push(`export * from './api/endpoints/${c.key}.js'`);
    }
    await fs.writeFile(indexPath, exportsLines.join('\n') + '\n', 'utf8');
}
async function generateDocs(root, categories) {
    const docsPath = path.join(root, 'docs/endpoints.md');
    await ensureDir(path.dirname(docsPath));
    const out = [];
    out.push(`# Endpoints`);
    out.push(`\nDocumentación generada desde data.ts. Usa NOTI_URL y NOTI_KEY para tus llamadas.`);
    for (const c of categories) {
        out.push(`\n## ${c.name} (${c.key})`);
        for (const ep of c.endpoints) {
            out.push(`\n### ${ep.id} — ${ep.title || ''}`);
            out.push(`- Method: ${ep.method}`);
            out.push(`- Path: \`${ep.path}\``);
            if (ep.description)
                out.push(`- Descripción: ${ep.description}`);
            if (ep.bodyExample) {
                out.push(`\nBody example:`);
                out.push('```json');
                out.push(String(ep.bodyExample));
                out.push('```');
            }
            if (ep.request) {
                out.push(`\nCurl:`);
                out.push('```bash');
                out.push(String(ep.request));
                out.push('```');
            }
            if (ep.response) {
                out.push(`\nResponse:`);
                out.push('```json');
                out.push(String(ep.response));
                out.push('```');
            }
        }
    }
    await fs.writeFile(docsPath, out.join('\n'), 'utf8');
}
async function main() {
    const root = process.cwd();
    const categories = apiCategories;
    if (!Array.isArray(categories))
        throw new Error('apiCategories no es un arreglo');
    // Generar archivos por categoría
    for (const c of categories) {
        await generateCategoryFile(root, c.key, c.endpoints);
    }
    await generateIndex(root, categories);
    await generateDocs(root, categories);
    console.log('Generación completa: endpoints y docs actualizados.');
}
main().catch(err => {
    console.error('Error generando SDK:', err);
    process.exit(1);
});
