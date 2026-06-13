import type { EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import * as ReactDOMServer from "react-dom/server";

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
): Promise<Response> {
  const waitForAll = isbot(request.headers.get("user-agent") ?? "");
  responseHeaders.set("Content-Type", "text/html");

  // Oxygen / Edge: react-dom/server.browser.js exports renderToReadableStream
  if ("renderToReadableStream" in ReactDOMServer) {
    return renderWithReadableStream(
      request,
      responseStatusCode,
      responseHeaders,
      routerContext,
      waitForAll,
    );
  }

  // Node.js dev server: react-dom/server.node.js exports renderToPipeableStream
  return renderWithPipeableStream(
    request,
    responseStatusCode,
    responseHeaders,
    routerContext,
    waitForAll,
  );
}

async function renderWithReadableStream(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  waitForAll: boolean,
): Promise<Response> {
  let statusCode = responseStatusCode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = await (ReactDOMServer as any).renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      signal: AbortSignal.timeout(ABORT_DELAY),
      onError(error: unknown) {
        console.error(error);
        statusCode = 500;
      },
    },
  );
  if (waitForAll) {
    await stream.allReady;
  }
  return new Response(stream, {
    headers: responseHeaders,
    status: statusCode,
  });
}

function renderWithPipeableStream(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  waitForAll: boolean,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    let didError = false;
    let writerClosed = false;
    const encoder = new TextEncoder();
    const { readable, writable } = new TransformStream<Uint8Array>();
    const writer = writable.getWriter();
    const callbackName = waitForAll ? "onAllReady" : "onShellReady";

    function safeClose() {
      if (!writerClosed) {
        writerClosed = true;
        writer.close();
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { pipe, abort } = (ReactDOMServer as any).renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        [callbackName]() {
          // Clear abort timer — stream started successfully.
          clearTimeout(timer);
          resolve(
            new Response(readable, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );
          // Minimal Node.js Writable-compatible shim backed by a Web Streams writer.
          // TransformStream + TextEncoder means no `node:stream` import needed.
          pipe({
            write(chunk: Buffer | string) {
              if (writerClosed) return;
              const bytes =
                typeof chunk === "string"
                  ? encoder.encode(chunk)
                  : new Uint8Array(
                      chunk.buffer,
                      (chunk as Buffer).byteOffset,
                      (chunk as Buffer).byteLength,
                    );
              writer.write(bytes);
            },
            end() {
              safeClose();
            },
            on() {
              return this;
            },
            once() {
              return this;
            },
            emit() {
              return false;
            },
            removeListener() {
              return this;
            },
          } as unknown as NodeJS.WritableStream);
        },
        onShellError(error: unknown) {
          clearTimeout(timer);
          safeClose();
          reject(error);
        },
        onError(error: unknown) {
          didError = true;
          console.error(error);
        },
      },
    );
    // abort() may call end() on the shim; safeClose() guards against double-close.
    const timer = setTimeout(abort, ABORT_DELAY);
  });
}
