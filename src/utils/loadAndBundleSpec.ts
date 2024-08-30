import { type Document, BaseResolver, readFileFromUrl, ResolveError, Source } from '@redocly/openapi-core';
// eslint-disable-next-line import/no-internal-modules
import type { ResolvedConfig } from '@redocly/openapi-core/lib/config';

// eslint-disable-next-line import/no-internal-modules
import { Config } from '@redocly/openapi-core/lib/config/config';

/* tslint:disable-next-line:no-implicit-dependencies */
import { convertObj } from 'swagger2openapi';
import { OpenAPISpec } from '../types';
import { IS_BROWSER } from './dom';
import { bundleDocument, BundleOptions } from '@redocly/openapi-core/lib/bundle';

export async function loadAndBundleSpec(specUrlOrObject: object | string): Promise<OpenAPISpec> {
  const config = new Config({} as ResolvedConfig);
  const bundleOpts = {
    config,
    base: IS_BROWSER ? window.location.href : process.cwd(),
  };

  if (IS_BROWSER) {
    config.resolve.http.customFetch = global.fetch;
  }

  if (typeof specUrlOrObject === 'object' && specUrlOrObject !== null) {
    bundleOpts['doc'] = {
      source: { absoluteRef: '' } as Source,
      parsed: specUrlOrObject,
    } as Document;
  } else {
    bundleOpts['ref'] = specUrlOrObject;
  }

  const {
    bundle: { parsed },
  } = await bundle(bundleOpts);
  return parsed.swagger !== undefined ? convertSwagger2OpenAPI(parsed) : parsed;
}

export function convertSwagger2OpenAPI(spec: any): Promise<OpenAPISpec> {
  console.warn('[ReDoc Compatibility mode]: Converting OpenAPI 2.0 to OpenAPI 3.0');
  return new Promise<OpenAPISpec>((resolve, reject) =>
    convertObj(spec, { patch: true, warnOnly: true, text: '{}', anchors: true }, (err, res) => {
      // TODO: log any warnings
      if (err) {
        return reject(err);
      }
      resolve(res && (res.openapi as any));
    }),
  );
}

class LocalResolver extends BaseResolver {
  resolveExternalRef(base: string | null, ref: string): string {
    return new URL(ref, base || window.location.href).href;
  }

  async loadExternalRef(absoluteRef: string): Promise<Source> {
    try {
      const { body, mimeType } = await readFileFromUrl(absoluteRef, this.config.http);
      return new Source(absoluteRef, body, mimeType);
    } catch (error) {
      error.message = error.message.replace(', lstat', '');
      throw new ResolveError(error);
    }
  }
}

async function bundle(
  opts: {
    ref?: string;
    doc?: Document;
  } & BundleOptions
) {
  const {
    ref,
    doc,
    externalRefResolver = new LocalResolver(opts.config.resolve),
    base = null,
  } = opts;
  if (!(ref || doc)) {
    throw new Error('Document or reference is required.\n');
  }

  const document =
    doc === undefined ? await externalRefResolver.resolveDocument(base, ref!, true) : doc;

  if (document instanceof Error) {
    throw document;
  }

  return bundleDocument({
    document,
    ...opts,
    config: opts.config.styleguide,
    externalRefResolver,
  });
}
