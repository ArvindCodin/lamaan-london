import type {EntryContext} from "react-router";
import {ServerRouter} from "react-router";
import {isbot} from "isbot";
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

  if ("renderToReadableStream" in ReactDOMServer) {
    return renderWithReadableStream(
      request,
      responseStatusCode,
      responseHeaders,
      routerContext,
      waitForAll,
    );
  }

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
  const stream = await ReactDOMServer.renderToReadableStream(
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
    const {readable, writable} = new TransformStream<Uint8Array>();
    const writer = writable.getWriter();
    const callbackName = waitForAll ? "onAllReady" : "onShellReady";

    function safeClose() {
      if (!writerClosed) {
        writerClosed = true;
        writer.close();
      }
    }

    const {pipe, abort} = ReactDOMServer.renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        [callbackName]() {
          clearTimeout(timer);
          resolve(
            new Response(readable, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          pipe({
            write(chunk: Uint8Array | string) {
              if (writerClosed) return true;
              const bytes =
                typeof chunk === "string" ? encoder.encode(chunk) : chunk;
              writer.write(bytes);
              return true;
            },
            end() {
              safeClose();
            },
            destroy(error?: unknown) {
              if (error) {
                writer.abort(error);
                return;
              }
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
          } as never);
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

    const timer = setTimeout(abort, ABORT_DELAY);
  });
}
