var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/@sveltejs/adapter-node/files/shims.js
import { createRequire } from "module";

// node_modules/@sveltejs/kit/dist/install-fetch.js
import http from "http";
import https from "https";
import zlib from "zlib";
import Stream, { PassThrough, pipeline } from "stream";
import { types } from "util";
import { randomBytes } from "crypto";
import { format } from "url";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data2 = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data2, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var dataUriToBuffer$1 = src;
var ponyfill_es2018 = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
    function noop3() {
      return void 0;
    }
    function getGlobals() {
      if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else if (typeof commonjsGlobal !== "undefined") {
        return commonjsGlobal;
      }
      return void 0;
    }
    const globals = getGlobals();
    function typeIsObject(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    const rethrowAssertionErrorRejection = noop3;
    const originalPromise = Promise;
    const originalPromiseThen = Promise.prototype.then;
    const originalPromiseResolve = Promise.resolve.bind(originalPromise);
    const originalPromiseReject = Promise.reject.bind(originalPromise);
    function newPromise(executor) {
      return new originalPromise(executor);
    }
    function promiseResolvedWith(value) {
      return originalPromiseResolve(value);
    }
    function promiseRejectedWith(reason) {
      return originalPromiseReject(reason);
    }
    function PerformPromiseThen(promise, onFulfilled, onRejected) {
      return originalPromiseThen.call(promise, onFulfilled, onRejected);
    }
    function uponPromise(promise, onFulfilled, onRejected) {
      PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
    }
    function uponFulfillment(promise, onFulfilled) {
      uponPromise(promise, onFulfilled);
    }
    function uponRejection(promise, onRejected) {
      uponPromise(promise, void 0, onRejected);
    }
    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
      return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
    }
    function setPromiseIsHandledToTrue(promise) {
      PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
    }
    const queueMicrotask = (() => {
      const globalQueueMicrotask = globals && globals.queueMicrotask;
      if (typeof globalQueueMicrotask === "function") {
        return globalQueueMicrotask;
      }
      const resolvedPromise = promiseResolvedWith(void 0);
      return (fn) => PerformPromiseThen(resolvedPromise, fn);
    })();
    function reflectCall(F, V, args) {
      if (typeof F !== "function") {
        throw new TypeError("Argument is not a function");
      }
      return Function.prototype.apply.call(F, V, args);
    }
    function promiseCall(F, V, args) {
      try {
        return promiseResolvedWith(reflectCall(F, V, args));
      } catch (value) {
        return promiseRejectedWith(value);
      }
    }
    const QUEUE_MAX_ARRAY_SIZE = 16384;
    class SimpleQueue {
      constructor() {
        this._cursor = 0;
        this._size = 0;
        this._front = {
          _elements: [],
          _next: void 0
        };
        this._back = this._front;
        this._cursor = 0;
        this._size = 0;
      }
      get length() {
        return this._size;
      }
      push(element) {
        const oldBack = this._back;
        let newBack = oldBack;
        if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
          newBack = {
            _elements: [],
            _next: void 0
          };
        }
        oldBack._elements.push(element);
        if (newBack !== oldBack) {
          this._back = newBack;
          oldBack._next = newBack;
        }
        ++this._size;
      }
      shift() {
        const oldFront = this._front;
        let newFront = oldFront;
        const oldCursor = this._cursor;
        let newCursor = oldCursor + 1;
        const elements = oldFront._elements;
        const element = elements[oldCursor];
        if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
          newFront = oldFront._next;
          newCursor = 0;
        }
        --this._size;
        this._cursor = newCursor;
        if (oldFront !== newFront) {
          this._front = newFront;
        }
        elements[oldCursor] = void 0;
        return element;
      }
      forEach(callback) {
        let i = this._cursor;
        let node = this._front;
        let elements = node._elements;
        while (i !== elements.length || node._next !== void 0) {
          if (i === elements.length) {
            node = node._next;
            elements = node._elements;
            i = 0;
            if (elements.length === 0) {
              break;
            }
          }
          callback(elements[i]);
          ++i;
        }
      }
      peek() {
        const front = this._front;
        const cursor = this._cursor;
        return front._elements[cursor];
      }
    }
    function ReadableStreamReaderGenericInitialize(reader, stream) {
      reader._ownerReadableStream = stream;
      stream._reader = reader;
      if (stream._state === "readable") {
        defaultReaderClosedPromiseInitialize(reader);
      } else if (stream._state === "closed") {
        defaultReaderClosedPromiseInitializeAsResolved(reader);
      } else {
        defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
      }
    }
    function ReadableStreamReaderGenericCancel(reader, reason) {
      const stream = reader._ownerReadableStream;
      return ReadableStreamCancel(stream, reason);
    }
    function ReadableStreamReaderGenericRelease(reader) {
      if (reader._ownerReadableStream._state === "readable") {
        defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      } else {
        defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      }
      reader._ownerReadableStream._reader = void 0;
      reader._ownerReadableStream = void 0;
    }
    function readerLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released reader");
    }
    function defaultReaderClosedPromiseInitialize(reader) {
      reader._closedPromise = newPromise((resolve3, reject) => {
        reader._closedPromise_resolve = resolve3;
        reader._closedPromise_reject = reject;
      });
    }
    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseReject(reader, reason);
    }
    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseResolve(reader);
    }
    function defaultReaderClosedPromiseReject(reader, reason) {
      if (reader._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(reader._closedPromise);
      reader._closedPromise_reject(reason);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
      defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
    }
    function defaultReaderClosedPromiseResolve(reader) {
      if (reader._closedPromise_resolve === void 0) {
        return;
      }
      reader._closedPromise_resolve(void 0);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
    const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
    const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
    const PullSteps = SymbolPolyfill("[[PullSteps]]");
    const NumberIsFinite = Number.isFinite || function(x) {
      return typeof x === "number" && isFinite(x);
    };
    const MathTrunc = Math.trunc || function(v) {
      return v < 0 ? Math.ceil(v) : Math.floor(v);
    };
    function isDictionary(x) {
      return typeof x === "object" || typeof x === "function";
    }
    function assertDictionary(obj, context2) {
      if (obj !== void 0 && !isDictionary(obj)) {
        throw new TypeError(`${context2} is not an object.`);
      }
    }
    function assertFunction(x, context2) {
      if (typeof x !== "function") {
        throw new TypeError(`${context2} is not a function.`);
      }
    }
    function isObject(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    function assertObject(x, context2) {
      if (!isObject(x)) {
        throw new TypeError(`${context2} is not an object.`);
      }
    }
    function assertRequiredArgument(x, position, context2) {
      if (x === void 0) {
        throw new TypeError(`Parameter ${position} is required in '${context2}'.`);
      }
    }
    function assertRequiredField(x, field, context2) {
      if (x === void 0) {
        throw new TypeError(`${field} is required in '${context2}'.`);
      }
    }
    function convertUnrestrictedDouble(value) {
      return Number(value);
    }
    function censorNegativeZero(x) {
      return x === 0 ? 0 : x;
    }
    function integerPart(x) {
      return censorNegativeZero(MathTrunc(x));
    }
    function convertUnsignedLongLongWithEnforceRange(value, context2) {
      const lowerBound = 0;
      const upperBound = Number.MAX_SAFE_INTEGER;
      let x = Number(value);
      x = censorNegativeZero(x);
      if (!NumberIsFinite(x)) {
        throw new TypeError(`${context2} is not a finite number`);
      }
      x = integerPart(x);
      if (x < lowerBound || x > upperBound) {
        throw new TypeError(`${context2} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
      }
      if (!NumberIsFinite(x) || x === 0) {
        return 0;
      }
      return x;
    }
    function assertReadableStream(x, context2) {
      if (!IsReadableStream(x)) {
        throw new TypeError(`${context2} is not a ReadableStream.`);
      }
    }
    function AcquireReadableStreamDefaultReader(stream) {
      return new ReadableStreamDefaultReader(stream);
    }
    function ReadableStreamAddReadRequest(stream, readRequest) {
      stream._reader._readRequests.push(readRequest);
    }
    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readRequest = reader._readRequests.shift();
      if (done) {
        readRequest._closeSteps();
      } else {
        readRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadRequests(stream) {
      return stream._reader._readRequests.length;
    }
    function ReadableStreamHasDefaultReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamDefaultReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamDefaultReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("read"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve3, reject) => {
          resolvePromise = resolve3;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: () => resolvePromise({ value: void 0, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamDefaultReaderRead(this, readRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamDefaultReader(this)) {
          throw defaultReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultReader",
        configurable: true
      });
    }
    function IsReadableStreamDefaultReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readRequests")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultReader;
    }
    function ReadableStreamDefaultReaderRead(reader, readRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "closed") {
        readRequest._closeSteps();
      } else if (stream._state === "errored") {
        readRequest._errorSteps(stream._storedError);
      } else {
        stream._readableStreamController[PullSteps](readRequest);
      }
    }
    function defaultReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
    }
    const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    class ReadableStreamAsyncIteratorImpl {
      constructor(reader, preventCancel) {
        this._ongoingPromise = void 0;
        this._isFinished = false;
        this._reader = reader;
        this._preventCancel = preventCancel;
      }
      next() {
        const nextSteps = () => this._nextSteps();
        this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
        return this._ongoingPromise;
      }
      return(value) {
        const returnSteps = () => this._returnSteps(value);
        return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
      }
      _nextSteps() {
        if (this._isFinished) {
          return Promise.resolve({ value: void 0, done: true });
        }
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("iterate"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve3, reject) => {
          resolvePromise = resolve3;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => {
            this._ongoingPromise = void 0;
            queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
          },
          _closeSteps: () => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            resolvePromise({ value: void 0, done: true });
          },
          _errorSteps: (reason) => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            rejectPromise(reason);
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promise;
      }
      _returnSteps(value) {
        if (this._isFinished) {
          return Promise.resolve({ value, done: true });
        }
        this._isFinished = true;
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("finish iterating"));
        }
        if (!this._preventCancel) {
          const result = ReadableStreamReaderGenericCancel(reader, value);
          ReadableStreamReaderGenericRelease(reader);
          return transformPromiseWith(result, () => ({ value, done: true }));
        }
        ReadableStreamReaderGenericRelease(reader);
        return promiseResolvedWith({ value, done: true });
      }
    }
    const ReadableStreamAsyncIteratorPrototype = {
      next() {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
        }
        return this._asyncIteratorImpl.next();
      },
      return(value) {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
        }
        return this._asyncIteratorImpl.return(value);
      }
    };
    if (AsyncIteratorPrototype !== void 0) {
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
      const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
      iterator._asyncIteratorImpl = impl;
      return iterator;
    }
    function IsReadableStreamAsyncIterator(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_asyncIteratorImpl")) {
        return false;
      }
      try {
        return x._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
      } catch (_a2) {
        return false;
      }
    }
    function streamAsyncIteratorBrandCheckException(name) {
      return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
    }
    const NumberIsNaN = Number.isNaN || function(x) {
      return x !== x;
    };
    function CreateArrayFromList(elements) {
      return elements.slice();
    }
    function CopyDataBlockBytes(dest, destOffset, src2, srcOffset, n) {
      new Uint8Array(dest).set(new Uint8Array(src2, srcOffset, n), destOffset);
    }
    function TransferArrayBuffer(O) {
      return O;
    }
    function IsDetachedBuffer(O) {
      return false;
    }
    function ArrayBufferSlice(buffer, begin, end) {
      if (buffer.slice) {
        return buffer.slice(begin, end);
      }
      const length = end - begin;
      const slice = new ArrayBuffer(length);
      CopyDataBlockBytes(slice, 0, buffer, begin, length);
      return slice;
    }
    function IsNonNegativeNumber(v) {
      if (typeof v !== "number") {
        return false;
      }
      if (NumberIsNaN(v)) {
        return false;
      }
      if (v < 0) {
        return false;
      }
      return true;
    }
    function CloneAsUint8Array(O) {
      const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
      return new Uint8Array(buffer);
    }
    function DequeueValue(container) {
      const pair = container._queue.shift();
      container._queueTotalSize -= pair.size;
      if (container._queueTotalSize < 0) {
        container._queueTotalSize = 0;
      }
      return pair.value;
    }
    function EnqueueValueWithSize(container, value, size) {
      if (!IsNonNegativeNumber(size) || size === Infinity) {
        throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
      }
      container._queue.push({ value, size });
      container._queueTotalSize += size;
    }
    function PeekQueueValue(container) {
      const pair = container._queue.peek();
      return pair.value;
    }
    function ResetQueue(container) {
      container._queue = new SimpleQueue();
      container._queueTotalSize = 0;
    }
    class ReadableStreamBYOBRequest {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get view() {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("view");
        }
        return this._view;
      }
      respond(bytesWritten) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respond");
        }
        assertRequiredArgument(bytesWritten, 1, "respond");
        bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(this._view.buffer))
          ;
        ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
      }
      respondWithNewView(view) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respondWithNewView");
        }
        assertRequiredArgument(view, 1, "respondWithNewView");
        if (!ArrayBuffer.isView(view)) {
          throw new TypeError("You can only respond with array buffer views");
        }
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
      }
    }
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
      respond: { enumerable: true },
      respondWithNewView: { enumerable: true },
      view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBRequest",
        configurable: true
      });
    }
    class ReadableByteStreamController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get byobRequest() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("byobRequest");
        }
        return ReadableByteStreamControllerGetBYOBRequest(this);
      }
      get desiredSize() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("desiredSize");
        }
        return ReadableByteStreamControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("close");
        }
        if (this._closeRequested) {
          throw new TypeError("The stream has already been closed; do not close it again!");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
        }
        ReadableByteStreamControllerClose(this);
      }
      enqueue(chunk) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("enqueue");
        }
        assertRequiredArgument(chunk, 1, "enqueue");
        if (!ArrayBuffer.isView(chunk)) {
          throw new TypeError("chunk must be an array buffer view");
        }
        if (chunk.byteLength === 0) {
          throw new TypeError("chunk must have non-zero byteLength");
        }
        if (chunk.buffer.byteLength === 0) {
          throw new TypeError(`chunk's buffer must have non-zero byteLength`);
        }
        if (this._closeRequested) {
          throw new TypeError("stream is closed or draining");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
        }
        ReadableByteStreamControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("error");
        }
        ReadableByteStreamControllerError(this, e);
      }
      [CancelSteps](reason) {
        ReadableByteStreamControllerClearPendingPullIntos(this);
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableByteStreamControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableByteStream;
        if (this._queueTotalSize > 0) {
          const entry = this._queue.shift();
          this._queueTotalSize -= entry.byteLength;
          ReadableByteStreamControllerHandleQueueDrain(this);
          const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
          readRequest._chunkSteps(view);
          return;
        }
        const autoAllocateChunkSize = this._autoAllocateChunkSize;
        if (autoAllocateChunkSize !== void 0) {
          let buffer;
          try {
            buffer = new ArrayBuffer(autoAllocateChunkSize);
          } catch (bufferE) {
            readRequest._errorSteps(bufferE);
            return;
          }
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: autoAllocateChunkSize,
            byteOffset: 0,
            byteLength: autoAllocateChunkSize,
            bytesFilled: 0,
            elementSize: 1,
            viewConstructor: Uint8Array,
            readerType: "default"
          };
          this._pendingPullIntos.push(pullIntoDescriptor);
        }
        ReadableStreamAddReadRequest(stream, readRequest);
        ReadableByteStreamControllerCallPullIfNeeded(this);
      }
    }
    Object.defineProperties(ReadableByteStreamController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      byobRequest: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableByteStreamController",
        configurable: true
      });
    }
    function IsReadableByteStreamController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableByteStream")) {
        return false;
      }
      return x instanceof ReadableByteStreamController;
    }
    function IsReadableStreamBYOBRequest(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_associatedReadableByteStreamController")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBRequest;
    }
    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableByteStreamControllerError(controller, e);
      });
    }
    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      controller._pendingPullIntos = new SimpleQueue();
    }
    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
      let done = false;
      if (stream._state === "closed") {
        done = true;
      }
      const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
      if (pullIntoDescriptor.readerType === "default") {
        ReadableStreamFulfillReadRequest(stream, filledView, done);
      } else {
        ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
      }
    }
    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
      const bytesFilled = pullIntoDescriptor.bytesFilled;
      const elementSize = pullIntoDescriptor.elementSize;
      return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
    }
    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
      controller._queue.push({ buffer, byteOffset, byteLength });
      controller._queueTotalSize += byteLength;
    }
    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
      const elementSize = pullIntoDescriptor.elementSize;
      const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
      const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
      const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
      const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
      let totalBytesToCopyRemaining = maxBytesToCopy;
      let ready = false;
      if (maxAlignedBytes > currentAlignedBytes) {
        totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
        ready = true;
      }
      const queue = controller._queue;
      while (totalBytesToCopyRemaining > 0) {
        const headOfQueue = queue.peek();
        const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
        const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
        if (headOfQueue.byteLength === bytesToCopy) {
          queue.shift();
        } else {
          headOfQueue.byteOffset += bytesToCopy;
          headOfQueue.byteLength -= bytesToCopy;
        }
        controller._queueTotalSize -= bytesToCopy;
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
        totalBytesToCopyRemaining -= bytesToCopy;
      }
      return ready;
    }
    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
      pullIntoDescriptor.bytesFilled += size;
    }
    function ReadableByteStreamControllerHandleQueueDrain(controller) {
      if (controller._queueTotalSize === 0 && controller._closeRequested) {
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(controller._controlledReadableByteStream);
      } else {
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
    }
    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
      if (controller._byobRequest === null) {
        return;
      }
      controller._byobRequest._associatedReadableByteStreamController = void 0;
      controller._byobRequest._view = null;
      controller._byobRequest = null;
    }
    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
      while (controller._pendingPullIntos.length > 0) {
        if (controller._queueTotalSize === 0) {
          return;
        }
        const pullIntoDescriptor = controller._pendingPullIntos.peek();
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
      const stream = controller._controlledReadableByteStream;
      let elementSize = 1;
      if (view.constructor !== DataView) {
        elementSize = view.constructor.BYTES_PER_ELEMENT;
      }
      const ctor = view.constructor;
      const buffer = TransferArrayBuffer(view.buffer);
      const pullIntoDescriptor = {
        buffer,
        bufferByteLength: buffer.byteLength,
        byteOffset: view.byteOffset,
        byteLength: view.byteLength,
        bytesFilled: 0,
        elementSize,
        viewConstructor: ctor,
        readerType: "byob"
      };
      if (controller._pendingPullIntos.length > 0) {
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        return;
      }
      if (stream._state === "closed") {
        const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
        readIntoRequest._closeSteps(emptyView);
        return;
      }
      if (controller._queueTotalSize > 0) {
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          ReadableByteStreamControllerHandleQueueDrain(controller);
          readIntoRequest._chunkSteps(filledView);
          return;
        }
        if (controller._closeRequested) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          readIntoRequest._errorSteps(e);
          return;
        }
      }
      controller._pendingPullIntos.push(pullIntoDescriptor);
      ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
      const stream = controller._controlledReadableByteStream;
      if (ReadableStreamHasBYOBReader(stream)) {
        while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
      ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
      if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
        return;
      }
      ReadableByteStreamControllerShiftPendingPullInto(controller);
      const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
      if (remainderSize > 0) {
        const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
      }
      pullIntoDescriptor.bytesFilled -= remainderSize;
      ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
      ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        ReadableByteStreamControllerRespondInClosedState(controller);
      } else {
        ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
      const descriptor = controller._pendingPullIntos.shift();
      return descriptor;
    }
    function ReadableByteStreamControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return false;
      }
      if (controller._closeRequested) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableByteStreamControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
    }
    function ReadableByteStreamControllerClose(controller) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      if (controller._queueTotalSize > 0) {
        controller._closeRequested = true;
        return;
      }
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (firstPendingPullInto.bytesFilled > 0) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          throw e;
        }
      }
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamClose(stream);
    }
    function ReadableByteStreamControllerEnqueue(controller, chunk) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      const buffer = chunk.buffer;
      const byteOffset = chunk.byteOffset;
      const byteLength = chunk.byteLength;
      const transferredBuffer = TransferArrayBuffer(buffer);
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (IsDetachedBuffer(firstPendingPullInto.buffer))
          ;
        firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
      }
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      if (ReadableStreamHasDefaultReader(stream)) {
        if (ReadableStreamGetNumReadRequests(stream) === 0) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        } else {
          const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
          ReadableStreamFulfillReadRequest(stream, transferredView, false);
        }
      } else if (ReadableStreamHasBYOBReader(stream)) {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      } else {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerError(controller, e) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return;
      }
      ReadableByteStreamControllerClearPendingPullIntos(controller);
      ResetQueue(controller);
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableByteStreamControllerGetBYOBRequest(controller) {
      if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
        const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
        SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
        controller._byobRequest = byobRequest;
      }
      return controller._byobRequest;
    }
    function ReadableByteStreamControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableByteStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (bytesWritten !== 0) {
          throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        }
      } else {
        if (bytesWritten === 0) {
          throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
        }
        if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
          throw new RangeError("bytesWritten out of range");
        }
      }
      firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
      ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
    }
    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (view.byteLength !== 0) {
          throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        }
      } else {
        if (view.byteLength === 0) {
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        }
      }
      if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
        throw new RangeError("The region specified by view does not match byobRequest");
      }
      if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
        throw new RangeError("The buffer of view has different capacity than byobRequest");
      }
      if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
        throw new RangeError("The region specified by view is larger than byobRequest");
      }
      firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
      ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
    }
    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
      controller._controlledReadableByteStream = stream;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._byobRequest = null;
      controller._queue = controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._closeRequested = false;
      controller._started = false;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      controller._autoAllocateChunkSize = autoAllocateChunkSize;
      controller._pendingPullIntos = new SimpleQueue();
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableByteStreamControllerError(controller, r);
      });
    }
    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
      const controller = Object.create(ReadableByteStreamController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingByteSource.start !== void 0) {
        startAlgorithm = () => underlyingByteSource.start(controller);
      }
      if (underlyingByteSource.pull !== void 0) {
        pullAlgorithm = () => underlyingByteSource.pull(controller);
      }
      if (underlyingByteSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
      }
      const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
      if (autoAllocateChunkSize === 0) {
        throw new TypeError("autoAllocateChunkSize must be greater than 0");
      }
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
    }
    function SetUpReadableStreamBYOBRequest(request, controller, view) {
      request._associatedReadableByteStreamController = controller;
      request._view = view;
    }
    function byobRequestBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
    }
    function byteStreamControllerBrandCheckException(name) {
      return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
    }
    function AcquireReadableStreamBYOBReader(stream) {
      return new ReadableStreamBYOBReader(stream);
    }
    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
      stream._reader._readIntoRequests.push(readIntoRequest);
    }
    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readIntoRequest = reader._readIntoRequests.shift();
      if (done) {
        readIntoRequest._closeSteps(chunk);
      } else {
        readIntoRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadIntoRequests(stream) {
      return stream._reader._readIntoRequests.length;
    }
    function ReadableStreamHasBYOBReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamBYOBReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamBYOBReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        if (!IsReadableByteStreamController(stream._readableStreamController)) {
          throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readIntoRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read(view) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("read"));
        }
        if (!ArrayBuffer.isView(view)) {
          return promiseRejectedWith(new TypeError("view must be an array buffer view"));
        }
        if (view.byteLength === 0) {
          return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
        }
        if (view.buffer.byteLength === 0) {
          return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve3, reject) => {
          resolvePromise = resolve3;
          rejectPromise = reject;
        });
        const readIntoRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamBYOBReader(this)) {
          throw byobReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readIntoRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBReader",
        configurable: true
      });
    }
    function IsReadableStreamBYOBReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readIntoRequests")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBReader;
    }
    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "errored") {
        readIntoRequest._errorSteps(stream._storedError);
      } else {
        ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
      }
    }
    function byobReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
    }
    function ExtractHighWaterMark(strategy, defaultHWM) {
      const { highWaterMark } = strategy;
      if (highWaterMark === void 0) {
        return defaultHWM;
      }
      if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
        throw new RangeError("Invalid highWaterMark");
      }
      return highWaterMark;
    }
    function ExtractSizeAlgorithm(strategy) {
      const { size } = strategy;
      if (!size) {
        return () => 1;
      }
      return size;
    }
    function convertQueuingStrategy(init2, context2) {
      assertDictionary(init2, context2);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
      return {
        highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
        size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context2} has member 'size' that`)
      };
    }
    function convertQueuingStrategySize(fn, context2) {
      assertFunction(fn, context2);
      return (chunk) => convertUnrestrictedDouble(fn(chunk));
    }
    function convertUnderlyingSink(original, context2) {
      assertDictionary(original, context2);
      const abort = original === null || original === void 0 ? void 0 : original.abort;
      const close = original === null || original === void 0 ? void 0 : original.close;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      const write = original === null || original === void 0 ? void 0 : original.write;
      return {
        abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context2} has member 'abort' that`),
        close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context2} has member 'close' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context2} has member 'start' that`),
        write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context2} has member 'write' that`),
        type
      };
    }
    function convertUnderlyingSinkAbortCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSinkCloseCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return () => promiseCall(fn, original, []);
    }
    function convertUnderlyingSinkStartCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertUnderlyingSinkWriteCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    function assertWritableStream(x, context2) {
      if (!IsWritableStream(x)) {
        throw new TypeError(`${context2} is not a WritableStream.`);
      }
    }
    function isAbortSignal2(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      try {
        return typeof value.aborted === "boolean";
      } catch (_a2) {
        return false;
      }
    }
    const supportsAbortController = typeof AbortController === "function";
    function createAbortController() {
      if (supportsAbortController) {
        return new AbortController();
      }
      return void 0;
    }
    class WritableStream {
      constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
        if (rawUnderlyingSink === void 0) {
          rawUnderlyingSink = null;
        } else {
          assertObject(rawUnderlyingSink, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
        InitializeWritableStream(this);
        const type = underlyingSink.type;
        if (type !== void 0) {
          throw new RangeError("Invalid type is specified");
        }
        const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
        const highWaterMark = ExtractHighWaterMark(strategy, 1);
        SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
      }
      get locked() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("locked");
        }
        return IsWritableStreamLocked(this);
      }
      abort(reason = void 0) {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("abort"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
        }
        return WritableStreamAbort(this, reason);
      }
      close() {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("close"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
        }
        if (WritableStreamCloseQueuedOrInFlight(this)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamClose(this);
      }
      getWriter() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("getWriter");
        }
        return AcquireWritableStreamDefaultWriter(this);
      }
    }
    Object.defineProperties(WritableStream.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      getWriter: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStream",
        configurable: true
      });
    }
    function AcquireWritableStreamDefaultWriter(stream) {
      return new WritableStreamDefaultWriter(stream);
    }
    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(WritableStream.prototype);
      InitializeWritableStream(stream);
      const controller = Object.create(WritableStreamDefaultController.prototype);
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function InitializeWritableStream(stream) {
      stream._state = "writable";
      stream._storedError = void 0;
      stream._writer = void 0;
      stream._writableStreamController = void 0;
      stream._writeRequests = new SimpleQueue();
      stream._inFlightWriteRequest = void 0;
      stream._closeRequest = void 0;
      stream._inFlightCloseRequest = void 0;
      stream._pendingAbortRequest = void 0;
      stream._backpressure = false;
    }
    function IsWritableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_writableStreamController")) {
        return false;
      }
      return x instanceof WritableStream;
    }
    function IsWritableStreamLocked(stream) {
      if (stream._writer === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamAbort(stream, reason) {
      var _a2;
      if (stream._state === "closed" || stream._state === "errored") {
        return promiseResolvedWith(void 0);
      }
      stream._writableStreamController._abortReason = reason;
      (_a2 = stream._writableStreamController._abortController) === null || _a2 === void 0 ? void 0 : _a2.abort();
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseResolvedWith(void 0);
      }
      if (stream._pendingAbortRequest !== void 0) {
        return stream._pendingAbortRequest._promise;
      }
      let wasAlreadyErroring = false;
      if (state === "erroring") {
        wasAlreadyErroring = true;
        reason = void 0;
      }
      const promise = newPromise((resolve3, reject) => {
        stream._pendingAbortRequest = {
          _promise: void 0,
          _resolve: resolve3,
          _reject: reject,
          _reason: reason,
          _wasAlreadyErroring: wasAlreadyErroring
        };
      });
      stream._pendingAbortRequest._promise = promise;
      if (!wasAlreadyErroring) {
        WritableStreamStartErroring(stream, reason);
      }
      return promise;
    }
    function WritableStreamClose(stream) {
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
      }
      const promise = newPromise((resolve3, reject) => {
        const closeRequest = {
          _resolve: resolve3,
          _reject: reject
        };
        stream._closeRequest = closeRequest;
      });
      const writer = stream._writer;
      if (writer !== void 0 && stream._backpressure && state === "writable") {
        defaultWriterReadyPromiseResolve(writer);
      }
      WritableStreamDefaultControllerClose(stream._writableStreamController);
      return promise;
    }
    function WritableStreamAddWriteRequest(stream) {
      const promise = newPromise((resolve3, reject) => {
        const writeRequest = {
          _resolve: resolve3,
          _reject: reject
        };
        stream._writeRequests.push(writeRequest);
      });
      return promise;
    }
    function WritableStreamDealWithRejection(stream, error2) {
      const state = stream._state;
      if (state === "writable") {
        WritableStreamStartErroring(stream, error2);
        return;
      }
      WritableStreamFinishErroring(stream);
    }
    function WritableStreamStartErroring(stream, reason) {
      const controller = stream._writableStreamController;
      stream._state = "erroring";
      stream._storedError = reason;
      const writer = stream._writer;
      if (writer !== void 0) {
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
      }
      if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
        WritableStreamFinishErroring(stream);
      }
    }
    function WritableStreamFinishErroring(stream) {
      stream._state = "errored";
      stream._writableStreamController[ErrorSteps]();
      const storedError = stream._storedError;
      stream._writeRequests.forEach((writeRequest) => {
        writeRequest._reject(storedError);
      });
      stream._writeRequests = new SimpleQueue();
      if (stream._pendingAbortRequest === void 0) {
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const abortRequest = stream._pendingAbortRequest;
      stream._pendingAbortRequest = void 0;
      if (abortRequest._wasAlreadyErroring) {
        abortRequest._reject(storedError);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
      uponPromise(promise, () => {
        abortRequest._resolve();
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      }, (reason) => {
        abortRequest._reject(reason);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      });
    }
    function WritableStreamFinishInFlightWrite(stream) {
      stream._inFlightWriteRequest._resolve(void 0);
      stream._inFlightWriteRequest = void 0;
    }
    function WritableStreamFinishInFlightWriteWithError(stream, error2) {
      stream._inFlightWriteRequest._reject(error2);
      stream._inFlightWriteRequest = void 0;
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamFinishInFlightClose(stream) {
      stream._inFlightCloseRequest._resolve(void 0);
      stream._inFlightCloseRequest = void 0;
      const state = stream._state;
      if (state === "erroring") {
        stream._storedError = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._resolve();
          stream._pendingAbortRequest = void 0;
        }
      }
      stream._state = "closed";
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseResolve(writer);
      }
    }
    function WritableStreamFinishInFlightCloseWithError(stream, error2) {
      stream._inFlightCloseRequest._reject(error2);
      stream._inFlightCloseRequest = void 0;
      if (stream._pendingAbortRequest !== void 0) {
        stream._pendingAbortRequest._reject(error2);
        stream._pendingAbortRequest = void 0;
      }
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamCloseQueuedOrInFlight(stream) {
      if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamHasOperationMarkedInFlight(stream) {
      if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamMarkCloseRequestInFlight(stream) {
      stream._inFlightCloseRequest = stream._closeRequest;
      stream._closeRequest = void 0;
    }
    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
      stream._inFlightWriteRequest = stream._writeRequests.shift();
    }
    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
      if (stream._closeRequest !== void 0) {
        stream._closeRequest._reject(stream._storedError);
        stream._closeRequest = void 0;
      }
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseReject(writer, stream._storedError);
      }
    }
    function WritableStreamUpdateBackpressure(stream, backpressure) {
      const writer = stream._writer;
      if (writer !== void 0 && backpressure !== stream._backpressure) {
        if (backpressure) {
          defaultWriterReadyPromiseReset(writer);
        } else {
          defaultWriterReadyPromiseResolve(writer);
        }
      }
      stream._backpressure = backpressure;
    }
    class WritableStreamDefaultWriter {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
        assertWritableStream(stream, "First parameter");
        if (IsWritableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive writing by another writer");
        }
        this._ownerWritableStream = stream;
        stream._writer = this;
        const state = stream._state;
        if (state === "writable") {
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
            defaultWriterReadyPromiseInitialize(this);
          } else {
            defaultWriterReadyPromiseInitializeAsResolved(this);
          }
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "erroring") {
          defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "closed") {
          defaultWriterReadyPromiseInitializeAsResolved(this);
          defaultWriterClosedPromiseInitializeAsResolved(this);
        } else {
          const storedError = stream._storedError;
          defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
          defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
        }
      }
      get closed() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      get desiredSize() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("desiredSize");
        }
        if (this._ownerWritableStream === void 0) {
          throw defaultWriterLockException("desiredSize");
        }
        return WritableStreamDefaultWriterGetDesiredSize(this);
      }
      get ready() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
        }
        return this._readyPromise;
      }
      abort(reason = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("abort"));
        }
        return WritableStreamDefaultWriterAbort(this, reason);
      }
      close() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("close"));
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("close"));
        }
        if (WritableStreamCloseQueuedOrInFlight(stream)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamDefaultWriterClose(this);
      }
      releaseLock() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("releaseLock");
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return;
        }
        WritableStreamDefaultWriterRelease(this);
      }
      write(chunk = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("write"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        return WritableStreamDefaultWriterWrite(this, chunk);
      }
    }
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      releaseLock: { enumerable: true },
      write: { enumerable: true },
      closed: { enumerable: true },
      desiredSize: { enumerable: true },
      ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultWriter",
        configurable: true
      });
    }
    function IsWritableStreamDefaultWriter(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_ownerWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultWriter;
    }
    function WritableStreamDefaultWriterAbort(writer, reason) {
      const stream = writer._ownerWritableStream;
      return WritableStreamAbort(stream, reason);
    }
    function WritableStreamDefaultWriterClose(writer) {
      const stream = writer._ownerWritableStream;
      return WritableStreamClose(stream);
    }
    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      return WritableStreamDefaultWriterClose(writer);
    }
    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
      if (writer._closedPromiseState === "pending") {
        defaultWriterClosedPromiseReject(writer, error2);
      } else {
        defaultWriterClosedPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
      if (writer._readyPromiseState === "pending") {
        defaultWriterReadyPromiseReject(writer, error2);
      } else {
        defaultWriterReadyPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterGetDesiredSize(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (state === "errored" || state === "erroring") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
    }
    function WritableStreamDefaultWriterRelease(writer) {
      const stream = writer._ownerWritableStream;
      const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
      WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
      WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
      stream._writer = void 0;
      writer._ownerWritableStream = void 0;
    }
    function WritableStreamDefaultWriterWrite(writer, chunk) {
      const stream = writer._ownerWritableStream;
      const controller = stream._writableStreamController;
      const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
      if (stream !== writer._ownerWritableStream) {
        return promiseRejectedWith(defaultWriterLockException("write to"));
      }
      const state = stream._state;
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
      }
      if (state === "erroring") {
        return promiseRejectedWith(stream._storedError);
      }
      const promise = WritableStreamAddWriteRequest(stream);
      WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
      return promise;
    }
    const closeSentinel = {};
    class WritableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get abortReason() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("abortReason");
        }
        return this._abortReason;
      }
      get signal() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("signal");
        }
        if (this._abortController === void 0) {
          throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
        }
        return this._abortController.signal;
      }
      error(e = void 0) {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("error");
        }
        const state = this._controlledWritableStream._state;
        if (state !== "writable") {
          return;
        }
        WritableStreamDefaultControllerError(this, e);
      }
      [AbortSteps](reason) {
        const result = this._abortAlgorithm(reason);
        WritableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [ErrorSteps]() {
        ResetQueue(this);
      }
    }
    Object.defineProperties(WritableStreamDefaultController.prototype, {
      error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultController",
        configurable: true
      });
    }
    function IsWritableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultController;
    }
    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledWritableStream = stream;
      stream._writableStreamController = controller;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._abortReason = void 0;
      controller._abortController = createAbortController();
      controller._started = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._writeAlgorithm = writeAlgorithm;
      controller._closeAlgorithm = closeAlgorithm;
      controller._abortAlgorithm = abortAlgorithm;
      const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
      WritableStreamUpdateBackpressure(stream, backpressure);
      const startResult = startAlgorithm();
      const startPromise = promiseResolvedWith(startResult);
      uponPromise(startPromise, () => {
        controller._started = true;
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (r) => {
        controller._started = true;
        WritableStreamDealWithRejection(stream, r);
      });
    }
    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(WritableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let writeAlgorithm = () => promiseResolvedWith(void 0);
      let closeAlgorithm = () => promiseResolvedWith(void 0);
      let abortAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSink.start !== void 0) {
        startAlgorithm = () => underlyingSink.start(controller);
      }
      if (underlyingSink.write !== void 0) {
        writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
      }
      if (underlyingSink.close !== void 0) {
        closeAlgorithm = () => underlyingSink.close();
      }
      if (underlyingSink.abort !== void 0) {
        abortAlgorithm = (reason) => underlyingSink.abort(reason);
      }
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function WritableStreamDefaultControllerClearAlgorithms(controller) {
      controller._writeAlgorithm = void 0;
      controller._closeAlgorithm = void 0;
      controller._abortAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function WritableStreamDefaultControllerClose(controller) {
      EnqueueValueWithSize(controller, closeSentinel, 0);
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
      try {
        return controller._strategySizeAlgorithm(chunk);
      } catch (chunkSizeE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
        return 1;
      }
    }
    function WritableStreamDefaultControllerGetDesiredSize(controller) {
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
      try {
        EnqueueValueWithSize(controller, chunk, chunkSize);
      } catch (enqueueE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
        return;
      }
      const stream = controller._controlledWritableStream;
      if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
      }
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
      const stream = controller._controlledWritableStream;
      if (!controller._started) {
        return;
      }
      if (stream._inFlightWriteRequest !== void 0) {
        return;
      }
      const state = stream._state;
      if (state === "erroring") {
        WritableStreamFinishErroring(stream);
        return;
      }
      if (controller._queue.length === 0) {
        return;
      }
      const value = PeekQueueValue(controller);
      if (value === closeSentinel) {
        WritableStreamDefaultControllerProcessClose(controller);
      } else {
        WritableStreamDefaultControllerProcessWrite(controller, value);
      }
    }
    function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
      if (controller._controlledWritableStream._state === "writable") {
        WritableStreamDefaultControllerError(controller, error2);
      }
    }
    function WritableStreamDefaultControllerProcessClose(controller) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkCloseRequestInFlight(stream);
      DequeueValue(controller);
      const sinkClosePromise = controller._closeAlgorithm();
      WritableStreamDefaultControllerClearAlgorithms(controller);
      uponPromise(sinkClosePromise, () => {
        WritableStreamFinishInFlightClose(stream);
      }, (reason) => {
        WritableStreamFinishInFlightCloseWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkFirstWriteRequestInFlight(stream);
      const sinkWritePromise = controller._writeAlgorithm(chunk);
      uponPromise(sinkWritePromise, () => {
        WritableStreamFinishInFlightWrite(stream);
        const state = stream._state;
        DequeueValue(controller);
        if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (reason) => {
        if (stream._state === "writable") {
          WritableStreamDefaultControllerClearAlgorithms(controller);
        }
        WritableStreamFinishInFlightWriteWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerGetBackpressure(controller) {
      const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
      return desiredSize <= 0;
    }
    function WritableStreamDefaultControllerError(controller, error2) {
      const stream = controller._controlledWritableStream;
      WritableStreamDefaultControllerClearAlgorithms(controller);
      WritableStreamStartErroring(stream, error2);
    }
    function streamBrandCheckException$2(name) {
      return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
    }
    function defaultControllerBrandCheckException$2(name) {
      return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
    }
    function defaultWriterBrandCheckException(name) {
      return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
    }
    function defaultWriterLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released writer");
    }
    function defaultWriterClosedPromiseInitialize(writer) {
      writer._closedPromise = newPromise((resolve3, reject) => {
        writer._closedPromise_resolve = resolve3;
        writer._closedPromise_reject = reject;
        writer._closedPromiseState = "pending";
      });
    }
    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseReject(writer, reason);
    }
    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseResolve(writer);
    }
    function defaultWriterClosedPromiseReject(writer, reason) {
      if (writer._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._closedPromise);
      writer._closedPromise_reject(reason);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "rejected";
    }
    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
      defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterClosedPromiseResolve(writer) {
      if (writer._closedPromise_resolve === void 0) {
        return;
      }
      writer._closedPromise_resolve(void 0);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "resolved";
    }
    function defaultWriterReadyPromiseInitialize(writer) {
      writer._readyPromise = newPromise((resolve3, reject) => {
        writer._readyPromise_resolve = resolve3;
        writer._readyPromise_reject = reject;
      });
      writer._readyPromiseState = "pending";
    }
    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseReject(writer, reason);
    }
    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseResolve(writer);
    }
    function defaultWriterReadyPromiseReject(writer, reason) {
      if (writer._readyPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._readyPromise);
      writer._readyPromise_reject(reason);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "rejected";
    }
    function defaultWriterReadyPromiseReset(writer) {
      defaultWriterReadyPromiseInitialize(writer);
    }
    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
      defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterReadyPromiseResolve(writer) {
      if (writer._readyPromise_resolve === void 0) {
        return;
      }
      writer._readyPromise_resolve(void 0);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "fulfilled";
    }
    const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
    function isDOMExceptionConstructor(ctor) {
      if (!(typeof ctor === "function" || typeof ctor === "object")) {
        return false;
      }
      try {
        new ctor();
        return true;
      } catch (_a2) {
        return false;
      }
    }
    function createDOMExceptionPolyfill() {
      const ctor = function DOMException2(message, name) {
        this.message = message || "";
        this.name = name || "Error";
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      };
      ctor.prototype = Object.create(Error.prototype);
      Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
      return ctor;
    }
    const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
      const reader = AcquireReadableStreamDefaultReader(source);
      const writer = AcquireWritableStreamDefaultWriter(dest);
      source._disturbed = true;
      let shuttingDown = false;
      let currentWrite = promiseResolvedWith(void 0);
      return newPromise((resolve3, reject) => {
        let abortAlgorithm;
        if (signal !== void 0) {
          abortAlgorithm = () => {
            const error2 = new DOMException$1("Aborted", "AbortError");
            const actions = [];
            if (!preventAbort) {
              actions.push(() => {
                if (dest._state === "writable") {
                  return WritableStreamAbort(dest, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            if (!preventCancel) {
              actions.push(() => {
                if (source._state === "readable") {
                  return ReadableStreamCancel(source, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
          };
          if (signal.aborted) {
            abortAlgorithm();
            return;
          }
          signal.addEventListener("abort", abortAlgorithm);
        }
        function pipeLoop() {
          return newPromise((resolveLoop, rejectLoop) => {
            function next(done) {
              if (done) {
                resolveLoop();
              } else {
                PerformPromiseThen(pipeStep(), next, rejectLoop);
              }
            }
            next(false);
          });
        }
        function pipeStep() {
          if (shuttingDown) {
            return promiseResolvedWith(true);
          }
          return PerformPromiseThen(writer._readyPromise, () => {
            return newPromise((resolveRead, rejectRead) => {
              ReadableStreamDefaultReaderRead(reader, {
                _chunkSteps: (chunk) => {
                  currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                  resolveRead(false);
                },
                _closeSteps: () => resolveRead(true),
                _errorSteps: rejectRead
              });
            });
          });
        }
        isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
          if (!preventAbort) {
            shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesClosed(source, reader._closedPromise, () => {
          if (!preventClose) {
            shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
          } else {
            shutdown();
          }
        });
        if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
          const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
          } else {
            shutdown(true, destClosed);
          }
        }
        setPromiseIsHandledToTrue(pipeLoop());
        function waitForWritesToFinish() {
          const oldCurrentWrite = currentWrite;
          return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
        }
        function isOrBecomesErrored(stream, promise, action) {
          if (stream._state === "errored") {
            action(stream._storedError);
          } else {
            uponRejection(promise, action);
          }
        }
        function isOrBecomesClosed(stream, promise, action) {
          if (stream._state === "closed") {
            action();
          } else {
            uponFulfillment(promise, action);
          }
        }
        function shutdownWithAction(action, originalIsError, originalError) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), doTheRest);
          } else {
            doTheRest();
          }
          function doTheRest() {
            uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
          }
        }
        function shutdown(isError, error2) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
          } else {
            finalize(isError, error2);
          }
        }
        function finalize(isError, error2) {
          WritableStreamDefaultWriterRelease(writer);
          ReadableStreamReaderGenericRelease(reader);
          if (signal !== void 0) {
            signal.removeEventListener("abort", abortAlgorithm);
          }
          if (isError) {
            reject(error2);
          } else {
            resolve3(void 0);
          }
        }
      });
    }
    class ReadableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("desiredSize");
        }
        return ReadableStreamDefaultControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("close");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits close");
        }
        ReadableStreamDefaultControllerClose(this);
      }
      enqueue(chunk = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("enqueue");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits enqueue");
        }
        return ReadableStreamDefaultControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("error");
        }
        ReadableStreamDefaultControllerError(this, e);
      }
      [CancelSteps](reason) {
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableStream;
        if (this._queue.length > 0) {
          const chunk = DequeueValue(this);
          if (this._closeRequested && this._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(this);
            ReadableStreamClose(stream);
          } else {
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
          readRequest._chunkSteps(chunk);
        } else {
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableStreamDefaultControllerCallPullIfNeeded(this);
        }
      }
    }
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultController",
        configurable: true
      });
    }
    function IsReadableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableStream")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultController;
    }
    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableStreamDefaultControllerError(controller, e);
      });
    }
    function ReadableStreamDefaultControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableStream;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function ReadableStreamDefaultControllerClose(controller) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      controller._closeRequested = true;
      if (controller._queue.length === 0) {
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
    }
    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        ReadableStreamFulfillReadRequest(stream, chunk, false);
      } else {
        let chunkSize;
        try {
          chunkSize = controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          ReadableStreamDefaultControllerError(controller, chunkSizeE);
          throw chunkSizeE;
        }
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          ReadableStreamDefaultControllerError(controller, enqueueE);
          throw enqueueE;
        }
      }
      ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    function ReadableStreamDefaultControllerError(controller, e) {
      const stream = controller._controlledReadableStream;
      if (stream._state !== "readable") {
        return;
      }
      ResetQueue(controller);
      ReadableStreamDefaultControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableStreamDefaultControllerHasBackpressure(controller) {
      if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
        return false;
      }
      return true;
    }
    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
      const state = controller._controlledReadableStream._state;
      if (!controller._closeRequested && state === "readable") {
        return true;
      }
      return false;
    }
    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledReadableStream = stream;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._started = false;
      controller._closeRequested = false;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableStreamDefaultControllerError(controller, r);
      });
    }
    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSource.start !== void 0) {
        startAlgorithm = () => underlyingSource.start(controller);
      }
      if (underlyingSource.pull !== void 0) {
        pullAlgorithm = () => underlyingSource.pull(controller);
      }
      if (underlyingSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
      }
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function defaultControllerBrandCheckException$1(name) {
      return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
    }
    function ReadableStreamTee(stream, cloneForBranch2) {
      if (IsReadableByteStreamController(stream._readableStreamController)) {
        return ReadableByteStreamTee(stream);
      }
      return ReadableStreamDefaultTee(stream);
    }
    function ReadableStreamDefaultTee(stream, cloneForBranch2) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve3) => {
        resolveCancelPromise = resolve3;
      });
      function pullAlgorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              const chunk2 = chunk;
              if (!canceled1) {
                ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableStreamDefaultControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableStreamDefaultControllerClose(branch2._readableStreamController);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
      }
      branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
      branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
      uponRejection(reader._closedPromise, (r) => {
        ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
        ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
        if (!canceled1 || !canceled2) {
          resolveCancelPromise(void 0);
        }
      });
      return [branch1, branch2];
    }
    function ReadableByteStreamTee(stream) {
      let reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve3) => {
        resolveCancelPromise = resolve3;
      });
      function forwardReaderError(thisReader) {
        uponRejection(thisReader._closedPromise, (r) => {
          if (thisReader !== reader) {
            return;
          }
          ReadableByteStreamControllerError(branch1._readableStreamController, r);
          ReadableByteStreamControllerError(branch2._readableStreamController, r);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
      }
      function pullWithDefaultReader() {
        if (IsReadableStreamBYOBReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamDefaultReader(stream);
          forwardReaderError(reader);
        }
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              let chunk2 = chunk;
              if (!canceled1 && !canceled2) {
                try {
                  chunk2 = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
              }
              if (!canceled1) {
                ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableByteStreamControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableByteStreamControllerClose(branch2._readableStreamController);
            }
            if (branch1._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
            }
            if (branch2._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
      }
      function pullWithBYOBReader(view, forBranch2) {
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamBYOBReader(stream);
          forwardReaderError(reader);
        }
        const byobBranch = forBranch2 ? branch2 : branch1;
        const otherBranch = forBranch2 ? branch1 : branch2;
        const readIntoRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!otherCanceled) {
                let clonedChunk;
                try {
                  clonedChunk = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
              } else if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
            });
          },
          _closeSteps: (chunk) => {
            reading = false;
            const byobCanceled = forBranch2 ? canceled2 : canceled1;
            const otherCanceled = forBranch2 ? canceled1 : canceled2;
            if (!byobCanceled) {
              ReadableByteStreamControllerClose(byobBranch._readableStreamController);
            }
            if (!otherCanceled) {
              ReadableByteStreamControllerClose(otherBranch._readableStreamController);
            }
            if (chunk !== void 0) {
              if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
              if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
              }
            }
            if (!byobCanceled || !otherCanceled) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
      }
      function pull1Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, false);
        }
        return promiseResolvedWith(void 0);
      }
      function pull2Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, true);
        }
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
        return;
      }
      branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
      branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
      forwardReaderError(reader);
      return [branch1, branch2];
    }
    function convertUnderlyingDefaultOrByteSource(source, context2) {
      assertDictionary(source, context2);
      const original = source;
      const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
      const cancel = original === null || original === void 0 ? void 0 : original.cancel;
      const pull = original === null || original === void 0 ? void 0 : original.pull;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      return {
        autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context2} has member 'autoAllocateChunkSize' that`),
        cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context2} has member 'cancel' that`),
        pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context2} has member 'pull' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context2} has member 'start' that`),
        type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context2} has member 'type' that`)
      };
    }
    function convertUnderlyingSourceCancelCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSourcePullCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertUnderlyingSourceStartCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertReadableStreamType(type, context2) {
      type = `${type}`;
      if (type !== "bytes") {
        throw new TypeError(`${context2} '${type}' is not a valid enumeration value for ReadableStreamType`);
      }
      return type;
    }
    function convertReaderOptions(options2, context2) {
      assertDictionary(options2, context2);
      const mode = options2 === null || options2 === void 0 ? void 0 : options2.mode;
      return {
        mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context2} has member 'mode' that`)
      };
    }
    function convertReadableStreamReaderMode(mode, context2) {
      mode = `${mode}`;
      if (mode !== "byob") {
        throw new TypeError(`${context2} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
      }
      return mode;
    }
    function convertIteratorOptions(options2, context2) {
      assertDictionary(options2, context2);
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      return { preventCancel: Boolean(preventCancel) };
    }
    function convertPipeOptions(options2, context2) {
      assertDictionary(options2, context2);
      const preventAbort = options2 === null || options2 === void 0 ? void 0 : options2.preventAbort;
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      const preventClose = options2 === null || options2 === void 0 ? void 0 : options2.preventClose;
      const signal = options2 === null || options2 === void 0 ? void 0 : options2.signal;
      if (signal !== void 0) {
        assertAbortSignal(signal, `${context2} has member 'signal' that`);
      }
      return {
        preventAbort: Boolean(preventAbort),
        preventCancel: Boolean(preventCancel),
        preventClose: Boolean(preventClose),
        signal
      };
    }
    function assertAbortSignal(signal, context2) {
      if (!isAbortSignal2(signal)) {
        throw new TypeError(`${context2} is not an AbortSignal.`);
      }
    }
    function convertReadableWritablePair(pair, context2) {
      assertDictionary(pair, context2);
      const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
      assertRequiredField(readable2, "readable", "ReadableWritablePair");
      assertReadableStream(readable2, `${context2} has member 'readable' that`);
      const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
      assertRequiredField(writable2, "writable", "ReadableWritablePair");
      assertWritableStream(writable2, `${context2} has member 'writable' that`);
      return { readable: readable2, writable: writable2 };
    }
    class ReadableStream2 {
      constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
        if (rawUnderlyingSource === void 0) {
          rawUnderlyingSource = null;
        } else {
          assertObject(rawUnderlyingSource, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
        InitializeReadableStream(this);
        if (underlyingSource.type === "bytes") {
          if (strategy.size !== void 0) {
            throw new RangeError("The strategy for a byte stream cannot have a size function");
          }
          const highWaterMark = ExtractHighWaterMark(strategy, 0);
          SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
        } else {
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
        }
      }
      get locked() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("locked");
        }
        return IsReadableStreamLocked(this);
      }
      cancel(reason = void 0) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("cancel"));
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
        }
        return ReadableStreamCancel(this, reason);
      }
      getReader(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("getReader");
        }
        const options2 = convertReaderOptions(rawOptions, "First parameter");
        if (options2.mode === void 0) {
          return AcquireReadableStreamDefaultReader(this);
        }
        return AcquireReadableStreamBYOBReader(this);
      }
      pipeThrough(rawTransform, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("pipeThrough");
        }
        assertRequiredArgument(rawTransform, 1, "pipeThrough");
        const transform = convertReadableWritablePair(rawTransform, "First parameter");
        const options2 = convertPipeOptions(rawOptions, "Second parameter");
        if (IsReadableStreamLocked(this)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
        }
        if (IsWritableStreamLocked(transform.writable)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
        }
        const promise = ReadableStreamPipeTo(this, transform.writable, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
        setPromiseIsHandledToTrue(promise);
        return transform.readable;
      }
      pipeTo(destination, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
        }
        if (destination === void 0) {
          return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
        }
        if (!IsWritableStream(destination)) {
          return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
        }
        let options2;
        try {
          options2 = convertPipeOptions(rawOptions, "Second parameter");
        } catch (e) {
          return promiseRejectedWith(e);
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
        }
        if (IsWritableStreamLocked(destination)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
        }
        return ReadableStreamPipeTo(this, destination, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
      }
      tee() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("tee");
        }
        const branches = ReadableStreamTee(this);
        return CreateArrayFromList(branches);
      }
      values(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("values");
        }
        const options2 = convertIteratorOptions(rawOptions, "First parameter");
        return AcquireReadableStreamAsyncIterator(this, options2.preventCancel);
      }
    }
    Object.defineProperties(ReadableStream2.prototype, {
      cancel: { enumerable: true },
      getReader: { enumerable: true },
      pipeThrough: { enumerable: true },
      pipeTo: { enumerable: true },
      tee: { enumerable: true },
      values: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStream",
        configurable: true
      });
    }
    if (typeof SymbolPolyfill.asyncIterator === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
    }
    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableByteStreamController.prototype);
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
      return stream;
    }
    function InitializeReadableStream(stream) {
      stream._state = "readable";
      stream._reader = void 0;
      stream._storedError = void 0;
      stream._disturbed = false;
    }
    function IsReadableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readableStreamController")) {
        return false;
      }
      return x instanceof ReadableStream2;
    }
    function IsReadableStreamLocked(stream) {
      if (stream._reader === void 0) {
        return false;
      }
      return true;
    }
    function ReadableStreamCancel(stream, reason) {
      stream._disturbed = true;
      if (stream._state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (stream._state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      ReadableStreamClose(stream);
      const reader = stream._reader;
      if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._closeSteps(void 0);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
      const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
      return transformPromiseWith(sourceCancelPromise, noop3);
    }
    function ReadableStreamClose(stream) {
      stream._state = "closed";
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseResolve(reader);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._closeSteps();
        });
        reader._readRequests = new SimpleQueue();
      }
    }
    function ReadableStreamError(stream, e) {
      stream._state = "errored";
      stream._storedError = e;
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseReject(reader, e);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e);
        });
        reader._readRequests = new SimpleQueue();
      } else {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
    }
    function streamBrandCheckException$1(name) {
      return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
    }
    function convertQueuingStrategyInit(init2, context2) {
      assertDictionary(init2, context2);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
      return {
        highWaterMark: convertUnrestrictedDouble(highWaterMark)
      };
    }
    const byteLengthSizeFunction = (chunk) => {
      return chunk.byteLength;
    };
    Object.defineProperty(byteLengthSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class ByteLengthQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "ByteLengthQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._byteLengthQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("highWaterMark");
        }
        return this._byteLengthQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("size");
        }
        return byteLengthSizeFunction;
      }
    }
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "ByteLengthQueuingStrategy",
        configurable: true
      });
    }
    function byteLengthBrandCheckException(name) {
      return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
    }
    function IsByteLengthQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_byteLengthQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof ByteLengthQueuingStrategy;
    }
    const countSizeFunction = () => {
      return 1;
    };
    Object.defineProperty(countSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class CountQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "CountQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._countQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("highWaterMark");
        }
        return this._countQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("size");
        }
        return countSizeFunction;
      }
    }
    Object.defineProperties(CountQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "CountQueuingStrategy",
        configurable: true
      });
    }
    function countBrandCheckException(name) {
      return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
    }
    function IsCountQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_countQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof CountQueuingStrategy;
    }
    function convertTransformer(original, context2) {
      assertDictionary(original, context2);
      const flush = original === null || original === void 0 ? void 0 : original.flush;
      const readableType = original === null || original === void 0 ? void 0 : original.readableType;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const transform = original === null || original === void 0 ? void 0 : original.transform;
      const writableType = original === null || original === void 0 ? void 0 : original.writableType;
      return {
        flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context2} has member 'flush' that`),
        readableType,
        start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context2} has member 'start' that`),
        transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context2} has member 'transform' that`),
        writableType
      };
    }
    function convertTransformerFlushCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertTransformerStartCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertTransformerTransformCallback(fn, original, context2) {
      assertFunction(fn, context2);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    class TransformStream {
      constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
        if (rawTransformer === void 0) {
          rawTransformer = null;
        }
        const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
        const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
        const transformer = convertTransformer(rawTransformer, "First parameter");
        if (transformer.readableType !== void 0) {
          throw new RangeError("Invalid readableType specified");
        }
        if (transformer.writableType !== void 0) {
          throw new RangeError("Invalid writableType specified");
        }
        const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
        const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
        const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
        const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
        let startPromise_resolve;
        const startPromise = newPromise((resolve3) => {
          startPromise_resolve = resolve3;
        });
        InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
        if (transformer.start !== void 0) {
          startPromise_resolve(transformer.start(this._transformStreamController));
        } else {
          startPromise_resolve(void 0);
        }
      }
      get readable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("readable");
        }
        return this._readable;
      }
      get writable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("writable");
        }
        return this._writable;
      }
    }
    Object.defineProperties(TransformStream.prototype, {
      readable: { enumerable: true },
      writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStream",
        configurable: true
      });
    }
    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
      function startAlgorithm() {
        return startPromise;
      }
      function writeAlgorithm(chunk) {
        return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
      }
      function abortAlgorithm(reason) {
        return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
      }
      function closeAlgorithm() {
        return TransformStreamDefaultSinkCloseAlgorithm(stream);
      }
      stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
      function pullAlgorithm() {
        return TransformStreamDefaultSourcePullAlgorithm(stream);
      }
      function cancelAlgorithm(reason) {
        TransformStreamErrorWritableAndUnblockWrite(stream, reason);
        return promiseResolvedWith(void 0);
      }
      stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
      stream._backpressure = void 0;
      stream._backpressureChangePromise = void 0;
      stream._backpressureChangePromise_resolve = void 0;
      TransformStreamSetBackpressure(stream, true);
      stream._transformStreamController = void 0;
    }
    function IsTransformStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_transformStreamController")) {
        return false;
      }
      return x instanceof TransformStream;
    }
    function TransformStreamError(stream, e) {
      ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
      TransformStreamErrorWritableAndUnblockWrite(stream, e);
    }
    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
      TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
      WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
      if (stream._backpressure) {
        TransformStreamSetBackpressure(stream, false);
      }
    }
    function TransformStreamSetBackpressure(stream, backpressure) {
      if (stream._backpressureChangePromise !== void 0) {
        stream._backpressureChangePromise_resolve();
      }
      stream._backpressureChangePromise = newPromise((resolve3) => {
        stream._backpressureChangePromise_resolve = resolve3;
      });
      stream._backpressure = backpressure;
    }
    class TransformStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("desiredSize");
        }
        const readableController = this._controlledTransformStream._readable._readableStreamController;
        return ReadableStreamDefaultControllerGetDesiredSize(readableController);
      }
      enqueue(chunk = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("enqueue");
        }
        TransformStreamDefaultControllerEnqueue(this, chunk);
      }
      error(reason = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("error");
        }
        TransformStreamDefaultControllerError(this, reason);
      }
      terminate() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("terminate");
        }
        TransformStreamDefaultControllerTerminate(this);
      }
    }
    Object.defineProperties(TransformStreamDefaultController.prototype, {
      enqueue: { enumerable: true },
      error: { enumerable: true },
      terminate: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStreamDefaultController",
        configurable: true
      });
    }
    function IsTransformStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledTransformStream")) {
        return false;
      }
      return x instanceof TransformStreamDefaultController;
    }
    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
      controller._controlledTransformStream = stream;
      stream._transformStreamController = controller;
      controller._transformAlgorithm = transformAlgorithm;
      controller._flushAlgorithm = flushAlgorithm;
    }
    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
      const controller = Object.create(TransformStreamDefaultController.prototype);
      let transformAlgorithm = (chunk) => {
        try {
          TransformStreamDefaultControllerEnqueue(controller, chunk);
          return promiseResolvedWith(void 0);
        } catch (transformResultE) {
          return promiseRejectedWith(transformResultE);
        }
      };
      let flushAlgorithm = () => promiseResolvedWith(void 0);
      if (transformer.transform !== void 0) {
        transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
      }
      if (transformer.flush !== void 0) {
        flushAlgorithm = () => transformer.flush(controller);
      }
      SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
    }
    function TransformStreamDefaultControllerClearAlgorithms(controller) {
      controller._transformAlgorithm = void 0;
      controller._flushAlgorithm = void 0;
    }
    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
        throw new TypeError("Readable side is not in a state that permits enqueue");
      }
      try {
        ReadableStreamDefaultControllerEnqueue(readableController, chunk);
      } catch (e) {
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
        throw stream._readable._storedError;
      }
      const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
      if (backpressure !== stream._backpressure) {
        TransformStreamSetBackpressure(stream, true);
      }
    }
    function TransformStreamDefaultControllerError(controller, e) {
      TransformStreamError(controller._controlledTransformStream, e);
    }
    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
      const transformPromise = controller._transformAlgorithm(chunk);
      return transformPromiseWith(transformPromise, void 0, (r) => {
        TransformStreamError(controller._controlledTransformStream, r);
        throw r;
      });
    }
    function TransformStreamDefaultControllerTerminate(controller) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      ReadableStreamDefaultControllerClose(readableController);
      const error2 = new TypeError("TransformStream terminated");
      TransformStreamErrorWritableAndUnblockWrite(stream, error2);
    }
    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
      const controller = stream._transformStreamController;
      if (stream._backpressure) {
        const backpressureChangePromise = stream._backpressureChangePromise;
        return transformPromiseWith(backpressureChangePromise, () => {
          const writable2 = stream._writable;
          const state = writable2._state;
          if (state === "erroring") {
            throw writable2._storedError;
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        });
      }
      return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    }
    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
      TransformStreamError(stream, reason);
      return promiseResolvedWith(void 0);
    }
    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
      const readable2 = stream._readable;
      const controller = stream._transformStreamController;
      const flushPromise = controller._flushAlgorithm();
      TransformStreamDefaultControllerClearAlgorithms(controller);
      return transformPromiseWith(flushPromise, () => {
        if (readable2._state === "errored") {
          throw readable2._storedError;
        }
        ReadableStreamDefaultControllerClose(readable2._readableStreamController);
      }, (r) => {
        TransformStreamError(stream, r);
        throw readable2._storedError;
      });
    }
    function TransformStreamDefaultSourcePullAlgorithm(stream) {
      TransformStreamSetBackpressure(stream, false);
      return stream._backpressureChangePromise;
    }
    function defaultControllerBrandCheckException(name) {
      return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
    }
    function streamBrandCheckException(name) {
      return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
    }
    exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
    exports2.CountQueuingStrategy = CountQueuingStrategy;
    exports2.ReadableByteStreamController = ReadableByteStreamController;
    exports2.ReadableStream = ReadableStream2;
    exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
    exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
    exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
    exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
    exports2.TransformStream = TransformStream;
    exports2.TransformStreamDefaultController = TransformStreamDefaultController;
    exports2.WritableStream = WritableStream;
    exports2.WritableStreamDefaultController = WritableStreamDefaultController;
    exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
})(ponyfill_es2018, ponyfill_es2018.exports);
var POOL_SIZE$1 = 65536;
if (!globalThis.ReadableStream) {
  try {
    Object.assign(globalThis, __require("stream/web"));
  } catch (error2) {
    Object.assign(globalThis, ponyfill_es2018.exports);
  }
}
try {
  const { Blob: Blob2 } = __require("buffer");
  if (Blob2 && !Blob2.prototype.stream) {
    Blob2.prototype.stream = function name(params) {
      let position = 0;
      const blob = this;
      return new ReadableStream({
        type: "bytes",
        async pull(ctrl) {
          const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
          const buffer = await chunk.arrayBuffer();
          position += buffer.byteLength;
          ctrl.enqueue(new Uint8Array(buffer));
          if (position === blob.size) {
            ctrl.close();
          }
        }
      });
    };
  }
} catch (error2) {
}
var POOL_SIZE = 65536;
async function* toIterator(parts, clone2 = true) {
  for (let part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        let end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var _parts, _type, _size, _a;
var _Blob = (_a = class {
  constructor(blobParts = [], options2 = {}) {
    __privateAdd(this, _parts, []);
    __privateAdd(this, _type, "");
    __privateAdd(this, _size, 0);
    let size = 0;
    const parts = blobParts.map((element) => {
      let part;
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0));
      } else if (element instanceof _a) {
        part = element;
      } else {
        part = new TextEncoder().encode(element);
      }
      size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
      return part;
    });
    const type = options2.type === void 0 ? "" : String(options2.type);
    __privateSet(this, _type, /[^\u0020-\u007E]/.test(type) ? "" : type);
    __privateSet(this, _size, size);
    __privateSet(this, _parts, parts);
  }
  get size() {
    return __privateGet(this, _size);
  }
  get type() {
    return __privateGet(this, _type);
  }
  async text() {
    const decoder = new TextDecoder();
    let str = "";
    for await (let part of toIterator(__privateGet(this, _parts), false)) {
      str += decoder.decode(part, { stream: true });
    }
    str += decoder.decode();
    return str;
  }
  async arrayBuffer() {
    const data2 = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
      data2.set(chunk, offset);
      offset += chunk.length;
    }
    return data2.buffer;
  }
  stream() {
    const it = toIterator(__privateGet(this, _parts), true);
    return new ReadableStream({
      type: "bytes",
      async pull(ctrl) {
        const chunk = await it.next();
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
      }
    });
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = __privateGet(this, _parts);
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      if (added >= span) {
        break;
      }
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        let chunk;
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.byteLength;
        } else {
          chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.size;
        }
        blobParts.push(chunk);
        relativeStart = 0;
      }
    }
    const blob = new _a([], { type: String(type).toLowerCase() });
    __privateSet(blob, _size, span);
    __privateSet(blob, _parts, blobParts);
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
}, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var Blob = _Blob;
var Blob$1 = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => randomBytes(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    length += isBlob(value) ? value.size : Buffer.byteLength(String(value));
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = Stream.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof Stream) {
      body.on("error", (error_) => {
        const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data2) {
  if (data2[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data2.url}`);
  }
  data2[INTERNALS$2].disturbed = true;
  if (data2[INTERNALS$2].error) {
    throw data2[INTERNALS$2].error;
  }
  let { body } = data2;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = Stream.Readable.from(body.stream());
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof Stream)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data2.size > 0 && accumBytes + chunk.length > data2.size) {
        const error2 = new FetchError(`content size at ${data2.url} over limit: ${data2.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data2.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data2.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data2.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream && typeof body.getBoundary !== "function") {
    p1 = new PassThrough({ highWaterMark });
    p2 = new PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof Stream) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    Stream.Readable.from(body.stream()).pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error2;
  }
};
var validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
    throw error2;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status != null ? options2.status : 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      type: "default",
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$1].type;
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response(null, { status: 0, statusText: "" });
    response[INTERNALS$1].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return format(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve3, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data2 = dataUriToBuffer$1(request.url);
      const response2 = new Response(data2, { headers: { "Content-Type": data2.typeFull } });
      resolve3(response2);
      return;
    }
    const send3 = (options2.protocol === "https:" ? https : http).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof Stream.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send3(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve3(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pipeline(response_, new PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve3(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pipeline(body, zlib.createGunzip(zlibOptions), reject);
        response = new Response(body, responseOptions);
        resolve3(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pipeline(response_, new PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? pipeline(body, zlib.createInflate(), reject) : pipeline(body, zlib.createInflateRaw(), reject);
          response = new Response(body, responseOptions);
          resolve3(response);
        });
        return;
      }
      if (codings === "br") {
        body = pipeline(body, zlib.createBrotliDecompress(), reject);
        response = new Response(body, responseOptions);
        resolve3(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve3(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}

// node_modules/@sveltejs/adapter-node/files/shims.js
Object.defineProperty(globalThis, "require", {
  enumerable: true,
  value: createRequire(import.meta.url)
});

// .svelte-kit/output/server/app.js
import {
  parse
} from "cookie";
import { minify } from "html-minifier";
import io from "socket.io-client";
import marked from "marked";
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler(__spreadProps(__spreadValues({}, request), { params }));
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = __spreadProps(__spreadValues({}, headers), { "content-type": "application/json; charset=utf-8" });
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a2) {
            var k = _a2[0], v = _a2[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal$1(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal$1(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue$1.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue$1.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue$1.length; i += 2) {
            subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
          }
          subscriber_queue$1.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape$1(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape$1(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape$1(str, dict, unicode_encoder) {
  let result = "";
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page: page2
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session2 = writable$1($session);
    const props = {
      stores: {
        page: writable$1(null),
        navigating: writable$1(null),
        session: session2
      },
      page: page2,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session2.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page2 && page2.host ? s$1(page2.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page2 && page2.host ? s$1(page2.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page2 && page2.path)},
						query: new URLSearchParams(${page2 ? s$1(page2.query.toString()) : ""}),
						params: ${page2 && s$1(page2.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url)}`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data2, fail) {
  try {
    return devalue(data2);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page: page2,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page2, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page2.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = __spreadValues({}, opts.headers);
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond$2({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = __spreadProps(__spreadValues({}, opts.headers), {
                cookie: request.headers.cookie
              });
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: __spreadValues({}, stuff)
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page: page2,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page: page2,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page: page2
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            }));
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page: page2
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd2(this, _map, void 0);
    __privateSet2(this, _map, map);
  }
  get(key) {
    const value = __privateGet2(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet2(this, _map).get(key);
  }
  has(key) {
    return __privateGet2(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet2(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet2(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data: data2, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data2;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data: data2, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data2;
}
async function respond$2(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = __spreadProps(__spreadValues({}, incoming), {
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  });
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key in slots) {
    result[key] = true;
  }
  return result;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context2) {
  get_current_component().$$.context.set(key, context2);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
Promise.resolve();
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);
  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += " " + classes_to_add;
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context2) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context2 || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context: context2 = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context2);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function add_classes(classes) {
  return classes ? ` class="${classes}"` : "";
}
function afterUpdate() {
}
var css$b = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$b);
  {
    stores.page.set(page2);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
var base$1 = "";
var assets = "";
function set_paths(paths2) {
  base$1 = paths2.base;
  assets = paths2.assets || base$1;
}
var prerendering = false;
function set_prerendering(value) {
  prerendering = value;
}
var live = "https://api.apexlinks.org";
var base = live;
function send$1({ method, path, data: data2, auth }) {
  console.log("path: ", path, "|", "method: ", method);
  const opts = { method, headers: {} };
  if (auth) {
    if (auth.username && auth.password) {
      opts.headers["auth"] = Buffer.from(`${auth.username}:${auth.password}`).toString("base64");
    } else {
      opts.headers["auth"] = auth;
    }
  }
  if (data2) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data2);
  }
  return fetch(`${base}/${path}`, opts).then(async (r) => {
    return {
      status: r.status,
      text: await r.text()
    };
  }).then((res) => {
    try {
      let json = JSON.parse(res.text);
      if (json.error && !json.status) {
        json.status = res.status;
      }
      console.log("json: ", json);
      return json;
    } catch (err) {
      console.log("res.text: ", res.text);
      return res.text;
    }
  }).catch((err) => {
    console.log(err);
    return;
  });
}
var min_opts = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true
};
function getSession(request) {
  return {
    user: request.locals.user
  };
}
async function handle({ request, resolve: resolve22 }) {
  const { token } = parse(request.headers.cookie || "");
  console.log("handle token", token);
  const res = await send$1({ method: "GET", path: "tokens", auth: token });
  console.log("handle api res: ", res);
  if (res.id) {
    request.locals.user = res;
    request.locals.token = token;
  }
  {
    if (request.headers["x-forwarded-proto"] !== "https") {
      console.log("request.path: ", request.path);
      const path = request.path === "/" ? "/apexlinks" : request.path;
      return {
        headers: {
          Location: `https://${request.host}${path}`
        },
        status: 301
      };
    }
  }
  const response = await resolve22(request);
  if (prerendering && response.headers["content-type"] === "text/html") {
    response.body = minify(response.body, min_opts);
  }
  return response;
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  getSession,
  handle
});
var template = ({ head, body }) => `<!DOCTYPE html>\r
<html lang="en">\r
  <head>\r
    <meta charset="utf-8" />\r
    <link rel="manifest" href="manifest.webmanifest" />\r
    <meta name="description" content="List items" />\r
    <meta name="theme-color" content="#e0e0e0" />\r
    <link rel='apple-touch-icon' sizes="120x120" href="apple-touch-icon-120x120.png">\r
    <link rel='apple-touch-icon' sizes="152x152" href="apple-touch-icon-152x152.png">\r
    <link rel='apple-touch-icon' sizes="167x167" href="apple-touch-icon-167x167.png">\r
    <link rel='apple-touch-icon' sizes="180x180" href="apple-touch-icon-180x180.png">\r
    <link rel='apple-touch-icon' sizes="1024x1024" href="apple-touch-icon-1024x1024.png">\r
    <link rel="shortcut icon" href="/favicon.ico" />\r
    <meta\r
      name="viewport"\r
      content="width=device-width, initial-scale=1, shrink-to-fit=no"\r
    />\r
    ` + head + "\r\n  </head>\r\n  <body>\r\n    <div>" + body + "</div>\r\n  </body>\r\n</html>\r\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-19d4bd65.js",
      css: [assets + "/_app/assets/start-61d1577b.css", assets + "/_app/assets/vendor-30b899a4.css"],
      js: [assets + "/_app/start-19d4bd65.js", assets + "/_app/chunks/vendor-cce9f310.js", assets + "/_app/chunks/singletons-12a22614.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: "/service-worker.js",
    router: true,
    ssr: true,
    target: null,
    template,
    trailing_slash: "never"
  };
}
var d = (s2) => s2.replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
var empty = () => ({});
var manifest = {
  assets: [{ "file": "apexlinks-144.png", "size": 2024, "type": "image/png" }, { "file": "apexlinks-192.png", "size": 2750, "type": "image/png" }, { "file": "apexlinks-512.png", "size": 7878, "type": "image/png" }, { "file": "apple-touch-icon-1024x1024.png", "size": 17278, "type": "image/png" }, { "file": "apple-touch-icon-120x120.png", "size": 1719, "type": "image/png" }, { "file": "apple-touch-icon-152x152.png", "size": 2120, "type": "image/png" }, { "file": "apple-touch-icon-167x167.png", "size": 2407, "type": "image/png" }, { "file": "apple-touch-icon-180x180.png", "size": 2619, "type": "image/png" }, { "file": "favicon.ico", "size": 2024, "type": "image/vnd.microsoft.icon" }, { "file": "junegull.ttf", "size": 46976, "type": "font/ttf" }, { "file": "manifest.webmanifest", "size": 889, "type": "application/manifest+json" }, { "file": "placeholder.png", "size": 2024, "type": "image/png" }, { "file": "robots.txt", "size": 273, "type": "text/plain" }],
  layout: "src/routes/__layout.svelte",
  error: "src/routes/__error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/reset_password\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/reset_password.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/how_it_works\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/how_it_works.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/item_search\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/item_search.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/edit_room\/([^/]+?)\/?$/,
      params: (m) => ({ id: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/edit_room/[id].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/add_item\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/add_item.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/add_room\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/add_room.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/my_rooms\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/my_rooms.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/event\/([^/]+?)\/?$/,
      params: (m) => ({ id: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/event/[id].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/items\/([^/]+?)\/?$/,
      params: (m) => ({ id: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/items/[id].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/login\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/login.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/rooms\/([^/]+?)\/?$/,
      params: (m) => ({ id: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/rooms/[id].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/rooms\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/rooms.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/auth\/login\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return login$1;
      })
    },
    {
      type: "endpoint",
      pattern: /^\/auth\/exit\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return exit;
      })
    },
    {
      type: "endpoint",
      pattern: /^\/auth\/join\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return join;
      })
    },
    {
      type: "page",
      pattern: /^\/beee\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/beee.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/edit\/([^/]+?)\/?$/,
      params: (m) => ({ id: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/edit/[id].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/edit\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/edit.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/item\/([^/]+?)\/?$/,
      params: (m) => ({ id: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/item/[id].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/room\/([^/]+?)\/?$/,
      params: (m) => ({ id: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/room/[id].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/send\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return send;
      })
    },
    {
      type: "page",
      pattern: /^\/([^/]+?)\/?$/,
      params: (m) => ({ username: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/[username].svelte"],
      b: ["src/routes/__error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve22 }) => resolve22(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  "src/routes/__error.svelte": () => Promise.resolve().then(function() {
    return __error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/reset_password.svelte": () => Promise.resolve().then(function() {
    return reset_password;
  }),
  "src/routes/how_it_works.svelte": () => Promise.resolve().then(function() {
    return how_it_works;
  }),
  "src/routes/item_search.svelte": () => Promise.resolve().then(function() {
    return item_search;
  }),
  "src/routes/edit_room/[id].svelte": () => Promise.resolve().then(function() {
    return _id_$6;
  }),
  "src/routes/add_item.svelte": () => Promise.resolve().then(function() {
    return add_item;
  }),
  "src/routes/add_room.svelte": () => Promise.resolve().then(function() {
    return add_room;
  }),
  "src/routes/my_rooms.svelte": () => Promise.resolve().then(function() {
    return my_rooms;
  }),
  "src/routes/event/[id].svelte": () => Promise.resolve().then(function() {
    return _id_$5;
  }),
  "src/routes/items/[id].svelte": () => Promise.resolve().then(function() {
    return _id_$4;
  }),
  "src/routes/login.svelte": () => Promise.resolve().then(function() {
    return login;
  }),
  "src/routes/rooms/[id].svelte": () => Promise.resolve().then(function() {
    return _id_$3;
  }),
  "src/routes/rooms.svelte": () => Promise.resolve().then(function() {
    return rooms;
  }),
  "src/routes/beee.svelte": () => Promise.resolve().then(function() {
    return beee;
  }),
  "src/routes/edit/[id].svelte": () => Promise.resolve().then(function() {
    return _id_$2;
  }),
  "src/routes/edit.svelte": () => Promise.resolve().then(function() {
    return edit;
  }),
  "src/routes/item/[id].svelte": () => Promise.resolve().then(function() {
    return _id_$1;
  }),
  "src/routes/room/[id].svelte": () => Promise.resolve().then(function() {
    return _id_;
  }),
  "src/routes/[username].svelte": () => Promise.resolve().then(function() {
    return _username_;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-4cdca4a1.js", "css": ["assets/pages/__layout.svelte-5347e0db.css", "assets/vendor-30b899a4.css"], "js": ["pages/__layout.svelte-4cdca4a1.js", "chunks/vendor-cce9f310.js", "chunks/stores-befe408a.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/stores-83bcb05a.js"], "styles": [] }, "src/routes/__error.svelte": { "entry": "pages/__error.svelte-1482ca79.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/__error.svelte-1482ca79.js", "chunks/vendor-cce9f310.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-9e9e357a.js", "css": ["assets/pages/index.svelte-2915abeb.css", "assets/vendor-30b899a4.css"], "js": ["pages/index.svelte-9e9e357a.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/stores-befe408a.js", "chunks/Tag-6147c832.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js"], "styles": [] }, "src/routes/reset_password.svelte": { "entry": "pages/reset_password.svelte-617d0723.js", "css": ["assets/pages/reset_password.svelte-0fddace4.css", "assets/vendor-30b899a4.css"], "js": ["pages/reset_password.svelte-617d0723.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/Input-93bd4be1.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/stores-befe408a.js"], "styles": [] }, "src/routes/how_it_works.svelte": { "entry": "pages/how_it_works.svelte-dfe19f08.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/how_it_works.svelte-dfe19f08.js", "chunks/vendor-cce9f310.js"], "styles": [] }, "src/routes/item_search.svelte": { "entry": "pages/item_search.svelte-aafe37f3.js", "css": ["assets/pages/items/[id].svelte-68186132.css", "assets/vendor-30b899a4.css"], "js": ["pages/item_search.svelte-aafe37f3.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/stores-befe408a.js", "chunks/Tag-6147c832.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/Fields-e6f6d5c0.js", "chunks/Input-93bd4be1.js"], "styles": [] }, "src/routes/edit_room/[id].svelte": { "entry": "pages/edit_room/[id].svelte-bce86f33.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/edit_room/[id].svelte-bce86f33.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/stores-befe408a.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/Tag-6147c832.js", "chunks/Input-93bd4be1.js"], "styles": [] }, "src/routes/add_item.svelte": { "entry": "pages/add_item.svelte-77731fb4.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/add_item.svelte-77731fb4.js", "chunks/vendor-cce9f310.js", "chunks/initialCaps-68f7c1e1.js", "chunks/Image-3c710c51.js", "chunks/Tag-6147c832.js", "chunks/Input-93bd4be1.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js"], "styles": [] }, "src/routes/add_room.svelte": { "entry": "pages/add_room.svelte-9895c60c.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/add_room.svelte-9895c60c.js", "chunks/vendor-cce9f310.js", "chunks/Input-93bd4be1.js", "chunks/Tag-6147c832.js", "chunks/stores-befe408a.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js"], "styles": [] }, "src/routes/my_rooms.svelte": { "entry": "pages/my_rooms.svelte-22a4f7a7.js", "css": ["assets/pages/my_rooms.svelte-1f8dd424.css", "assets/vendor-30b899a4.css"], "js": ["pages/my_rooms.svelte-22a4f7a7.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/Tag-6147c832.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js"], "styles": [] }, "src/routes/event/[id].svelte": { "entry": "pages/event/[id].svelte-8b3d6dad.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/event/[id].svelte-8b3d6dad.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/parseMarkdown-e6b8768e.js", "chunks/stores-83bcb05a.js"], "styles": [] }, "src/routes/items/[id].svelte": { "entry": "pages/items/[id].svelte-6691e8a5.js", "css": ["assets/pages/items/[id].svelte-68186132.css", "assets/vendor-30b899a4.css"], "js": ["pages/items/[id].svelte-6691e8a5.js", "chunks/vendor-cce9f310.js", "chunks/Tag-6147c832.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js"], "styles": [] }, "src/routes/login.svelte": { "entry": "pages/login.svelte-f11a2cad.js", "css": ["assets/pages/login.svelte-599f309d.css", "assets/vendor-30b899a4.css"], "js": ["pages/login.svelte-f11a2cad.js", "chunks/vendor-cce9f310.js", "chunks/post-5b27026c.js", "chunks/Input-93bd4be1.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/stores-83bcb05a.js", "chunks/stores-befe408a.js", "chunks/checkEmail-33bd547c.js"], "styles": [] }, "src/routes/rooms/[id].svelte": { "entry": "pages/rooms/[id].svelte-8db81cd6.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/rooms/[id].svelte-8db81cd6.js", "chunks/vendor-cce9f310.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/stores-befe408a.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js"], "styles": [] }, "src/routes/rooms.svelte": { "entry": "pages/rooms.svelte-24776e7f.js", "css": ["assets/pages/rooms.svelte-0215511b.css", "assets/vendor-30b899a4.css"], "js": ["pages/rooms.svelte-24776e7f.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/Tag-6147c832.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/stores-befe408a.js"], "styles": [] }, "src/routes/beee.svelte": { "entry": "pages/beee.svelte-857660c6.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/beee.svelte-857660c6.js", "chunks/vendor-cce9f310.js"], "styles": [] }, "src/routes/edit/[id].svelte": { "entry": "pages/edit/[id].svelte-a2b5a698.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/edit/[id].svelte-a2b5a698.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/initialCaps-68f7c1e1.js", "chunks/Tag-6147c832.js", "chunks/Image-3c710c51.js", "chunks/Fields-e6f6d5c0.js", "chunks/Input-93bd4be1.js", "chunks/abslink-3768d0d8.js"], "styles": [] }, "src/routes/edit.svelte": { "entry": "pages/edit.svelte-b994efa7.js", "css": ["assets/pages/reset_password.svelte-0fddace4.css", "assets/vendor-30b899a4.css"], "js": ["pages/edit.svelte-b994efa7.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/Fields-e6f6d5c0.js", "chunks/Input-93bd4be1.js", "chunks/Image-3c710c51.js", "chunks/Tag-6147c832.js", "chunks/checkEmail-33bd547c.js", "chunks/abslink-3768d0d8.js"], "styles": [] }, "src/routes/item/[id].svelte": { "entry": "pages/item/[id].svelte-e16fd6b7.js", "css": ["assets/pages/item/[id].svelte-82848076.css", "assets/vendor-30b899a4.css"], "js": ["pages/item/[id].svelte-e16fd6b7.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/parseMarkdown-e6b8768e.js"], "styles": [] }, "src/routes/room/[id].svelte": { "entry": "pages/room/[id].svelte-2600f19c.js", "css": ["assets/pages/room/[id].svelte-0f6b7c1a.css", "assets/vendor-30b899a4.css"], "js": ["pages/room/[id].svelte-2600f19c.js", "chunks/vendor-cce9f310.js", "chunks/api-5c0c9630.js", "chunks/post-5b27026c.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/stores-befe408a.js"], "styles": [] }, "src/routes/[username].svelte": { "entry": "pages/[username].svelte-9caf1e7b.js", "css": ["assets/vendor-30b899a4.css"], "js": ["pages/[username].svelte-9caf1e7b.js", "chunks/vendor-cce9f310.js", "chunks/parseMarkdown-e6b8768e.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond$2(__spreadProps(__spreadValues({}, request), { host }), options, { prerender });
}
function respond(body) {
  if (body.error) {
    return {
      status: 401,
      body
    };
  } else if (body.token) {
    console.log("response token: ", body.token);
    return {
      headers: {
        "set-cookie": `token=${body.token}; SameSite=Strict; HttpOnly; Max-Age=67376900; Path=/; Secure; HttpOnly;`
      },
      body
    };
  } else {
    return {
      body
    };
  }
}
async function post$4(req) {
  const { username: username2, password } = req.body;
  const body = await send$1({ method: "POST", path: "tokens", auth: { username: username2, password } });
  return respond(body);
}
var login$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  post: post$4
});
function post$3(endpoint, data2) {
  return fetch(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data2 || {}),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((r) => r.json());
}
var api = {
  get: async (endpoint, data2) => await post$3("/send", { endpoint, method: "GET", data: data2 }),
  put: async (endpoint, data2) => await post$3("/send", { endpoint, method: "PUT", data: data2 }),
  post: async (endpoint, data2) => await post$3("/send", { endpoint, method: "POST", data: data2 }),
  del: async (endpoint, data2) => await post$3("/send", { endpoint, method: "DEL", data: data2 })
};
async function post$2(req) {
  req.locals.token = null;
  await api.del("tokens", req.locals.token);
  return {
    headers: {
      "set-cookie": "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    },
    body: {
      ok: true
    }
  };
}
var exit = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  post: post$2
});
function post$1(req, res) {
  const { email, username: username2, password } = req.body;
  const token = send$1({ method: "POST", path: "users", data: { email }, auth: { username: username2, password } });
  return respond(token);
}
var join = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  post: post$1
});
async function post(request) {
  console.log("s init");
  const token = request.locals.token;
  console.log("send token", token);
  const { endpoint, method, data: data2 } = request.body;
  console.log("send: ", endpoint, method);
  return { body: await send$1({ method, path: endpoint, data: data2, auth: token }) };
}
var send = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  post
});
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
var Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "href", "inline", "icon", "disabled", "visited", "ref"]);
  let { size = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { inline = false } = $$props;
  let { icon = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { visited = false } = $$props;
  let { ref = null } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.visited === void 0 && $$bindings.visited && visited !== void 0)
    $$bindings.visited(visited);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `
${disabled ? `<p${spread([escape_object($$restProps)], "bx--link " + (disabled ? "bx--link--disabled" : "") + " " + (inline ? "bx--link--inline" : "") + " " + (visited ? "bx--link--visited" : ""))}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}${!inline && icon ? `<div${add_classes(["bx--link__icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}</p>` : `<a${spread([
    {
      rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    { href: escape_attribute_value(href) },
    escape_object($$restProps)
  ], "bx--link " + (disabled ? "bx--link--disabled" : "") + " " + (inline ? "bx--link--inline" : "") + " " + (visited ? "bx--link--visited" : "") + " " + (size === "sm" ? "bx--link--sm" : "") + " " + (size === "lg" ? "bx--link--lg" : ""))}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}${!inline && icon ? `<div${add_classes(["bx--link__icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}</a>`}`;
});
var ButtonSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "size", "small"]);
  let { href = void 0 } = $$props;
  let { size = "default" } = $$props;
  let { small = false } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  return `
${href ? `<a${spread([
    { href: escape_attribute_value(href) },
    {
      rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    { role: "button" },
    escape_object($$restProps)
  ], "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" || small ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : ""))}>${escape("")}</a>` : `<div${spread([escape_object($$restProps)], "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" || small ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : ""))}></div>`}`;
});
var Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buttonProps;
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "size",
    "expressive",
    "isSelected",
    "hasIconOnly",
    "icon",
    "iconDescription",
    "tooltipAlignment",
    "tooltipPosition",
    "as",
    "skeleton",
    "disabled",
    "href",
    "tabindex",
    "type",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { kind = "primary" } = $$props;
  let { size = "default" } = $$props;
  let { expressive = false } = $$props;
  let { isSelected = false } = $$props;
  let { hasIconOnly = false } = $$props;
  let { icon = void 0 } = $$props;
  let { iconDescription = void 0 } = $$props;
  let { tooltipAlignment = "center" } = $$props;
  let { tooltipPosition = "bottom" } = $$props;
  let { as = false } = $$props;
  let { skeleton = false } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  let { tabindex = "0" } = $$props;
  let { type = "button" } = $$props;
  let { ref = null } = $$props;
  const ctx = getContext("ComposedModal");
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.expressive === void 0 && $$bindings.expressive && expressive !== void 0)
    $$bindings.expressive(expressive);
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
    $$bindings.isSelected(isSelected);
  if ($$props.hasIconOnly === void 0 && $$bindings.hasIconOnly && hasIconOnly !== void 0)
    $$bindings.hasIconOnly(hasIconOnly);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0)
    $$bindings.tooltipAlignment(tooltipAlignment);
  if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0)
    $$bindings.tooltipPosition(tooltipPosition);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef(ref);
    }
  }
  hasIconOnly = icon && !$$slots.default;
  buttonProps = __spreadProps(__spreadValues({
    type: href && !disabled ? void 0 : type,
    tabindex,
    disabled: disabled === true ? true : void 0,
    href,
    "aria-pressed": hasIconOnly && kind === "ghost" ? isSelected : void 0
  }, $$restProps), {
    class: [
      "bx--btn",
      expressive && "bx--btn--expressive",
      (size === "small" && !expressive || size === "sm" && !expressive || size === "small" && !expressive) && "bx--btn--sm",
      size === "field" && !expressive || size === "md" && !expressive && "bx--btn--md",
      size === "field" && "bx--btn--field",
      size === "small" && "bx--btn--sm",
      size === "lg" && "bx--btn--lg",
      size === "xl" && "bx--btn--xl",
      kind && `bx--btn--${kind}`,
      disabled && "bx--btn--disabled",
      hasIconOnly && "bx--btn--icon-only",
      hasIconOnly && "bx--tooltip__trigger",
      hasIconOnly && "bx--tooltip--a11y",
      hasIconOnly && tooltipPosition && `bx--btn--icon-only--${tooltipPosition}`,
      hasIconOnly && tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`,
      hasIconOnly && isSelected && kind === "ghost" && "bx--btn--selected",
      $$restProps.class
    ].filter(Boolean).join(" ")
  });
  return `
${skeleton ? `${validate_component(ButtonSkeleton, "ButtonSkeleton").$$render($$result, Object.assign({ href }, { size }, $$restProps, { style: hasIconOnly && "width: 3rem;" }), {}, {})}` : `${as ? `${slots.default ? slots.default({ props: buttonProps }) : ``}` : `${href && !disabled ? `
  <a${spread([escape_object(buttonProps)])}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes(["bx--assistive-text"].join(" ").trim())}>${escape(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
    "aria-hidden": "true",
    class: "bx--btn__icon",
    "aria-label": iconDescription
  }, {}, {})}</a>` : `<button${spread([escape_object(buttonProps)])}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes(["bx--assistive-text"].join(" ").trim())}>${escape(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
    "aria-hidden": "true",
    class: "bx--btn__icon",
    "aria-label": iconDescription
  }, {}, {})}</button>`}`}`}`;
});
var ButtonSet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["stacked"]);
  let { stacked = false } = $$props;
  if ($$props.stacked === void 0 && $$bindings.stacked && stacked !== void 0)
    $$bindings.stacked(stacked);
  return `<div${spread([escape_object($$restProps)], "bx--btn-set " + (stacked ? "bx--btn-set--stacked" : ""))}>${slots.default ? slots.default({}) : ``}</div>`;
});
var CheckboxSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `
<div${spread([escape_object($$restProps)], "bx--form-item bx--checkbox-wrapper bx--checkbox-label")}><span${add_classes(["bx--checkbox-label-text bx--skeleton"].join(" ").trim())}></span></div>`;
});
var Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "checked",
    "indeterminate",
    "skeleton",
    "readonly",
    "disabled",
    "labelText",
    "hideLabel",
    "name",
    "title",
    "id",
    "ref"
  ]);
  let { checked = false } = $$props;
  let { indeterminate = false } = $$props;
  let { skeleton = false } = $$props;
  let { readonly = false } = $$props;
  let { disabled = false } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { name = "" } = $$props;
  let { title = void 0 } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0)
    $$bindings.indeterminate(indeterminate);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    dispatch("check", checked);
  }
  return `
${skeleton ? `${validate_component(CheckboxSkeleton, "CheckboxSkeleton").$$render($$result, Object.assign($$restProps), {}, {})}` : `<div${spread([escape_object($$restProps)], "bx--form-item bx--checkbox-wrapper")}><input type="${"checkbox"}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("indeterminate", indeterminate, 0)}${add_attribute("name", name, 0)} ${readonly ? "readonly" : ""}${add_classes(["bx--checkbox"].join(" ").trim())}${add_attribute("this", ref, 0)}>
    <label${add_attribute("for", id, 0)}${add_attribute("title", title, 0)}${add_classes(["bx--checkbox-label"].join(" ").trim())}><span${add_classes([
    "bx--checkbox-label-text " + (hideLabel ? "bx--visually-hidden" : "")
  ].join(" ").trim())}>${slots.labelText ? slots.labelText({}) : `
          ${escape(labelText)}
        `}</span></label></div>`}`;
});
var Checkmark16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Checkmark16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M13 24L4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Checkmark16$1 = Checkmark16;
var CaretRight16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "CaretRight16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M12 8L22 16 12 24z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var CaretRight16$1 = CaretRight16;
var WarningFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "WarningFilled16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 16 16" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2	c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"}"></path><path d="${"M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8	c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var WarningFilled16$1 = WarningFilled16;
var WarningAltFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "WarningAltFilled16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path fill="${"none"}" d="${"M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z"}" data-icon-path="${"inner-path"}"></path><path d="${"M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"}"></path><path d="${"M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var WarningAltFilled16$1 = WarningAltFilled16;
var ChevronDown16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "ChevronDown16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 16 16" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var ChevronDown16$1 = ChevronDown16;
var Close16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Close16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Close16$1 = Close16;
var Close20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Close20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Close20$1 = Close20;
var Search16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Search16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 16 16" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5	C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Search16$1 = Search16;
var SearchSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["small", "size"]);
  let { small = false } = $$props;
  let { size = "xl" } = $$props;
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `
<div${spread([escape_object($$restProps)], "bx--skeleton " + (size === "sm" || small ? "bx--search--sm" : "") + " " + (size === "lg" ? "bx--search--lg" : "") + " " + (size === "xl" ? "bx--search--xl" : ""))}><span${add_classes(["bx--label"].join(" ").trim())}></span>
  <div${add_classes(["bx--search-input"].join(" ").trim())}></div></div>`;
});
var Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "small",
    "size",
    "searchClass",
    "skeleton",
    "light",
    "disabled",
    "expandable",
    "expanded",
    "value",
    "type",
    "placeholder",
    "autocomplete",
    "autofocus",
    "closeButtonLabelText",
    "labelText",
    "icon",
    "id",
    "ref"
  ]);
  let { small = false } = $$props;
  let { size = "xl" } = $$props;
  let { searchClass = "" } = $$props;
  let { skeleton = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { expandable = false } = $$props;
  let { expanded = false } = $$props;
  let { value = "" } = $$props;
  let { type = "text" } = $$props;
  let { placeholder = "Search..." } = $$props;
  let { autocomplete = "off" } = $$props;
  let { autofocus = false } = $$props;
  let { closeButtonLabelText = "Clear search input" } = $$props;
  let { labelText = "" } = $$props;
  let { icon = Search16$1 } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  const dispatch = createEventDispatcher();
  let searchRef = null;
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.searchClass === void 0 && $$bindings.searchClass && searchClass !== void 0)
    $$bindings.searchClass(searchClass);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.expandable === void 0 && $$bindings.expandable && expandable !== void 0)
    $$bindings.expandable(expandable);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0)
    $$bindings.autocomplete(autocomplete);
  if ($$props.autofocus === void 0 && $$bindings.autofocus && autofocus !== void 0)
    $$bindings.autofocus(autofocus);
  if ($$props.closeButtonLabelText === void 0 && $$bindings.closeButtonLabelText && closeButtonLabelText !== void 0)
    $$bindings.closeButtonLabelText(closeButtonLabelText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (expanded && ref)
      ref.focus();
  }
  {
    dispatch(expanded ? "expand" : "collapse");
  }
  return `${skeleton ? `${validate_component(SearchSkeleton, "SearchSkeleton").$$render($$result, Object.assign({ small }, { size }, $$restProps), {}, {})}` : `<div role="${"search"}" aria-labelledby="${escape(id) + "-search"}" class="${[
    escape(searchClass),
    "bx--search " + (light ? "bx--search--light" : "") + " " + (disabled ? "bx--search--disabled" : "") + " " + (size === "sm" || small ? "bx--search--sm" : "") + " " + (size === "lg" ? "bx--search--lg" : "") + " " + (size === "xl" ? "bx--search--xl" : "") + " " + (expandable ? "bx--search--expandable" : "") + " " + (expanded ? "bx--search--expanded" : "")
  ].join(" ").trim()}"><div${add_classes(["bx--search-magnifier"].join(" ").trim())}${add_attribute("this", searchRef, 0)}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "bx--search-magnifier-icon" }, {}, {})}</div>
    <label id="${escape(id) + "-search"}"${add_attribute("for", id, 0)}${add_classes(["bx--label"].join(" ").trim())}>${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>
    
    <input${spread([
    { role: "searchbox" },
    {
      autofocus: (autofocus === true ? true : void 0) || null
    },
    {
      autocomplete: escape_attribute_value(autocomplete)
    },
    { disabled: disabled || null },
    { id: escape_attribute_value(id) },
    {
      placeholder: escape_attribute_value(placeholder)
    },
    { type: escape_attribute_value(type) },
    { value: escape_attribute_value(value) },
    escape_object($$restProps)
  ], "bx--search-input")}${add_attribute("this", ref, 0)}>
    <button type="${"button"}"${add_attribute("aria-label", closeButtonLabelText, 0)} ${disabled ? "disabled" : ""}${add_classes([
    "bx--search-close " + (value === "" ? "bx--search-close--hidden" : "")
  ].join(" ").trim())}>${validate_component((size === "xl" ? Close20$1 : Close16$1) || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</button></div>`}`;
});
var OverflowMenuHorizontal16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    {
      "data-carbon-icon": "OverflowMenuHorizontal16"
    },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><circle cx="${"8"}" cy="${"16"}" r="${"2"}"></circle><circle cx="${"16"}" cy="${"16"}" r="${"2"}"></circle><circle cx="${"24"}" cy="${"16"}" r="${"2"}"></circle>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var OverflowMenuHorizontal16$1 = OverflowMenuHorizontal16;
var HOOKS = [
  "onChange",
  "onClose",
  "onDayCreate",
  "onDestroy",
  "onKeyDown",
  "onMonthChange",
  "onOpen",
  "onParseConfig",
  "onReady",
  "onValueUpdate",
  "onYearChange",
  "onPreCalendarPosition"
];
var defaults = {
  _disable: [],
  allowInput: false,
  allowInvalidPreload: false,
  altFormat: "F j, Y",
  altInput: false,
  altInputClass: "form-control input",
  animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
  ariaDateFormat: "F j, Y",
  autoFillDefaultTime: true,
  clickOpens: true,
  closeOnSelect: true,
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultHour: 12,
  defaultMinute: 0,
  defaultSeconds: 0,
  disable: [],
  disableMobile: false,
  enableSeconds: false,
  enableTime: false,
  errorHandler: (err) => typeof console !== "undefined" && console.warn(err),
  getWeek: (givenDate) => {
    const date = new Date(givenDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
  },
  hourIncrement: 1,
  ignoredFocusElements: [],
  inline: false,
  locale: "default",
  minuteIncrement: 5,
  mode: "single",
  monthSelectorType: "dropdown",
  nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
  noCalendar: false,
  now: new Date(),
  onChange: [],
  onClose: [],
  onDayCreate: [],
  onDestroy: [],
  onKeyDown: [],
  onMonthChange: [],
  onOpen: [],
  onParseConfig: [],
  onReady: [],
  onValueUpdate: [],
  onYearChange: [],
  onPreCalendarPosition: [],
  plugins: [],
  position: "auto",
  positionElement: void 0,
  prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
  shorthandCurrentMonth: false,
  showMonths: 1,
  static: false,
  time_24hr: false,
  weekNumbers: false,
  wrap: false
};
var english = {
  weekdays: {
    shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longhand: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  months: {
    shorthand: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    longhand: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  firstDayOfWeek: 0,
  ordinal: (nth) => {
    const s2 = nth % 100;
    if (s2 > 3 && s2 < 21)
      return "th";
    switch (s2 % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle",
  amPM: ["AM", "PM"],
  yearAriaLabel: "Year",
  monthAriaLabel: "Month",
  hourAriaLabel: "Hour",
  minuteAriaLabel: "Minute",
  time_24hr: false
};
var pad = (number, length = 2) => `000${number}`.slice(length * -1);
var int = (bool) => bool === true ? 1 : 0;
function debounce(fn, wait) {
  let t;
  return function() {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), wait);
  };
}
var arrayify = (obj) => obj instanceof Array ? obj : [obj];
function toggleClass(elem, className, bool) {
  if (bool === true)
    return elem.classList.add(className);
  elem.classList.remove(className);
}
function createElement(tag, className, content) {
  const e = window.document.createElement(tag);
  className = className || "";
  content = content || "";
  e.className = className;
  if (content !== void 0)
    e.textContent = content;
  return e;
}
function clearNode(node) {
  while (node.firstChild)
    node.removeChild(node.firstChild);
}
function findParent(node, condition) {
  if (condition(node))
    return node;
  else if (node.parentNode)
    return findParent(node.parentNode, condition);
  return void 0;
}
function createNumberInput(inputClassName, opts) {
  const wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
    numInput.type = "number";
  } else {
    numInput.type = "text";
    numInput.pattern = "\\d*";
  }
  if (opts !== void 0)
    for (const key in opts)
      numInput.setAttribute(key, opts[key]);
  wrapper.appendChild(numInput);
  wrapper.appendChild(arrowUp);
  wrapper.appendChild(arrowDown);
  return wrapper;
}
function getEventTarget(event) {
  try {
    if (typeof event.composedPath === "function") {
      const path = event.composedPath();
      return path[0];
    }
    return event.target;
  } catch (error2) {
    return event.target;
  }
}
var doNothing = () => void 0;
var monthToStr = (monthNumber, shorthand, locale) => locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
var revFormat = {
  D: doNothing,
  F: function(dateObj, monthName, locale) {
    dateObj.setMonth(locale.months.longhand.indexOf(monthName));
  },
  G: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  H: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  J: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  K: (dateObj, amPM, locale) => {
    dateObj.setHours(dateObj.getHours() % 12 + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
  },
  M: function(dateObj, shortMonth, locale) {
    dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
  },
  S: (dateObj, seconds) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  U: (_, unixSeconds) => new Date(parseFloat(unixSeconds) * 1e3),
  W: function(dateObj, weekNum, locale) {
    const weekNumber = parseInt(weekNum);
    const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
    return date;
  },
  Y: (dateObj, year) => {
    dateObj.setFullYear(parseFloat(year));
  },
  Z: (_, ISODate) => new Date(ISODate),
  d: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  h: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  i: (dateObj, minutes) => {
    dateObj.setMinutes(parseFloat(minutes));
  },
  j: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  l: doNothing,
  m: (dateObj, month) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  n: (dateObj, month) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  s: (dateObj, seconds) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  u: (_, unixMillSeconds) => new Date(parseFloat(unixMillSeconds)),
  w: doNothing,
  y: (dateObj, year) => {
    dateObj.setFullYear(2e3 + parseFloat(year));
  }
};
var tokenRegex = {
  D: "(\\w+)",
  F: "(\\w+)",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "",
  M: "(\\w+)",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "(\\w+)",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})"
};
var formats = {
  Z: (date) => date.toISOString(),
  D: function(date, locale, options2) {
    return locale.weekdays.shorthand[formats.w(date, locale, options2)];
  },
  F: function(date, locale, options2) {
    return monthToStr(formats.n(date, locale, options2) - 1, false, locale);
  },
  G: function(date, locale, options2) {
    return pad(formats.h(date, locale, options2));
  },
  H: (date) => pad(date.getHours()),
  J: function(date, locale) {
    return locale.ordinal !== void 0 ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
  },
  K: (date, locale) => locale.amPM[int(date.getHours() > 11)],
  M: function(date, locale) {
    return monthToStr(date.getMonth(), true, locale);
  },
  S: (date) => pad(date.getSeconds()),
  U: (date) => date.getTime() / 1e3,
  W: function(date, _, options2) {
    return options2.getWeek(date);
  },
  Y: (date) => pad(date.getFullYear(), 4),
  d: (date) => pad(date.getDate()),
  h: (date) => date.getHours() % 12 ? date.getHours() % 12 : 12,
  i: (date) => pad(date.getMinutes()),
  j: (date) => date.getDate(),
  l: function(date, locale) {
    return locale.weekdays.longhand[date.getDay()];
  },
  m: (date) => pad(date.getMonth() + 1),
  n: (date) => date.getMonth() + 1,
  s: (date) => date.getSeconds(),
  u: (date) => date.getTime(),
  w: (date) => date.getDay(),
  y: (date) => String(date.getFullYear()).substring(2)
};
var createDateFormatter = ({ config = defaults, l10n = english, isMobile = false }) => (dateObj, frmt, overrideLocale) => {
  const locale = overrideLocale || l10n;
  if (config.formatDate !== void 0 && !isMobile) {
    return config.formatDate(dateObj, frmt, locale);
  }
  return frmt.split("").map((c, i, arr) => formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "").join("");
};
var createDateParser = ({ config = defaults, l10n = english }) => (date, givenFormat, timeless, customLocale) => {
  if (date !== 0 && !date)
    return void 0;
  const locale = customLocale || l10n;
  let parsedDate;
  const dateOrig = date;
  if (date instanceof Date)
    parsedDate = new Date(date.getTime());
  else if (typeof date !== "string" && date.toFixed !== void 0)
    parsedDate = new Date(date);
  else if (typeof date === "string") {
    const format2 = givenFormat || (config || defaults).dateFormat;
    const datestr = String(date).trim();
    if (datestr === "today") {
      parsedDate = new Date();
      timeless = true;
    } else if (/Z$/.test(datestr) || /GMT$/.test(datestr))
      parsedDate = new Date(date);
    else if (config && config.parseDate)
      parsedDate = config.parseDate(date, format2);
    else {
      parsedDate = !config || !config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
      let matched, ops = [];
      for (let i = 0, matchIndex = 0, regexStr = ""; i < format2.length; i++) {
        const token = format2[i];
        const isBackSlash = token === "\\";
        const escaped2 = format2[i - 1] === "\\" || isBackSlash;
        if (tokenRegex[token] && !escaped2) {
          regexStr += tokenRegex[token];
          const match = new RegExp(regexStr).exec(date);
          if (match && (matched = true)) {
            ops[token !== "Y" ? "push" : "unshift"]({
              fn: revFormat[token],
              val: match[++matchIndex]
            });
          }
        } else if (!isBackSlash)
          regexStr += ".";
        ops.forEach(({ fn, val }) => parsedDate = fn(parsedDate, val, locale) || parsedDate);
      }
      parsedDate = matched ? parsedDate : void 0;
    }
  }
  if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
    config.errorHandler(new Error(`Invalid date provided: ${dateOrig}`));
    return void 0;
  }
  if (timeless === true)
    parsedDate.setHours(0, 0, 0, 0);
  return parsedDate;
};
function compareDates(date1, date2, timeless = true) {
  if (timeless !== false) {
    return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
  }
  return date1.getTime() - date2.getTime();
}
var isBetween = (ts, ts1, ts2) => {
  return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
var duration = {
  DAY: 864e5
};
function getDefaultHours(config) {
  let hours = config.defaultHour;
  let minutes = config.defaultMinute;
  let seconds = config.defaultSeconds;
  if (config.minDate !== void 0) {
    const minHour = config.minDate.getHours();
    const minMinutes = config.minDate.getMinutes();
    const minSeconds = config.minDate.getSeconds();
    if (hours < minHour) {
      hours = minHour;
    }
    if (hours === minHour && minutes < minMinutes) {
      minutes = minMinutes;
    }
    if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
      seconds = config.minDate.getSeconds();
  }
  if (config.maxDate !== void 0) {
    const maxHr = config.maxDate.getHours();
    const maxMinutes = config.maxDate.getMinutes();
    hours = Math.min(hours, maxHr);
    if (hours === maxHr)
      minutes = Math.min(maxMinutes, minutes);
    if (hours === maxHr && minutes === maxMinutes)
      seconds = config.maxDate.getSeconds();
  }
  return { hours, minutes, seconds };
}
if (typeof Object.assign !== "function") {
  Object.assign = function(target, ...args) {
    if (!target) {
      throw TypeError("Cannot convert undefined or null to object");
    }
    for (const source of args) {
      if (source) {
        Object.keys(source).forEach((key) => target[key] = source[key]);
      }
    }
    return target;
  };
}
var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
  const self2 = {
    config: Object.assign(Object.assign({}, defaults), flatpickr.defaultConfig),
    l10n: english
  };
  self2.parseDate = createDateParser({ config: self2.config, l10n: self2.l10n });
  self2._handlers = [];
  self2.pluginElements = [];
  self2.loadedPlugins = [];
  self2._bind = bind;
  self2._setHoursFromDate = setHoursFromDate;
  self2._positionCalendar = positionCalendar;
  self2.changeMonth = changeMonth;
  self2.changeYear = changeYear;
  self2.clear = clear;
  self2.close = close;
  self2._createElement = createElement;
  self2.destroy = destroy;
  self2.isEnabled = isEnabled;
  self2.jumpToDate = jumpToDate;
  self2.open = open2;
  self2.redraw = redraw;
  self2.set = set;
  self2.setDate = setDate;
  self2.toggle = toggle;
  function setupHelperFunctions() {
    self2.utils = {
      getDaysInMonth(month = self2.currentMonth, yr = self2.currentYear) {
        if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0))
          return 29;
        return self2.l10n.daysInMonth[month];
      }
    };
  }
  function init2() {
    self2.element = self2.input = element;
    self2.isOpen = false;
    parseConfig();
    setupLocale();
    setupInputs();
    setupDates();
    setupHelperFunctions();
    if (!self2.isMobile)
      build();
    bindEvents();
    if (self2.selectedDates.length || self2.config.noCalendar) {
      if (self2.config.enableTime) {
        setHoursFromDate(self2.config.noCalendar ? self2.latestSelectedDateObj : void 0);
      }
      updateValue(false);
    }
    setCalendarWidth();
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!self2.isMobile && isSafari) {
      positionCalendar();
    }
    triggerEvent("onReady");
  }
  function bindToInstance(fn) {
    return fn.bind(self2);
  }
  function setCalendarWidth() {
    const config = self2.config;
    if (config.weekNumbers === false && config.showMonths === 1) {
      return;
    } else if (config.noCalendar !== true) {
      window.requestAnimationFrame(function() {
        if (self2.calendarContainer !== void 0) {
          self2.calendarContainer.style.visibility = "hidden";
          self2.calendarContainer.style.display = "block";
        }
        if (self2.daysContainer !== void 0) {
          const daysWidth = (self2.days.offsetWidth + 1) * config.showMonths;
          self2.daysContainer.style.width = daysWidth + "px";
          self2.calendarContainer.style.width = daysWidth + (self2.weekWrapper !== void 0 ? self2.weekWrapper.offsetWidth : 0) + "px";
          self2.calendarContainer.style.removeProperty("visibility");
          self2.calendarContainer.style.removeProperty("display");
        }
      });
    }
  }
  function updateTime(e) {
    if (self2.selectedDates.length === 0) {
      const defaultDate = self2.config.minDate === void 0 || compareDates(new Date(), self2.config.minDate) >= 0 ? new Date() : new Date(self2.config.minDate.getTime());
      const defaults2 = getDefaultHours(self2.config);
      defaultDate.setHours(defaults2.hours, defaults2.minutes, defaults2.seconds, defaultDate.getMilliseconds());
      self2.selectedDates = [defaultDate];
      self2.latestSelectedDateObj = defaultDate;
    }
    if (e !== void 0 && e.type !== "blur") {
      timeWrapper(e);
    }
    const prevValue = self2._input.value;
    setHoursFromInputs();
    updateValue();
    if (self2._input.value !== prevValue) {
      self2._debouncedChange();
    }
  }
  function ampm2military(hour, amPM) {
    return hour % 12 + 12 * int(amPM === self2.l10n.amPM[1]);
  }
  function military2ampm(hour) {
    switch (hour % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return hour % 12;
    }
  }
  function setHoursFromInputs() {
    if (self2.hourElement === void 0 || self2.minuteElement === void 0)
      return;
    let hours = (parseInt(self2.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self2.minuteElement.value, 10) || 0) % 60, seconds = self2.secondElement !== void 0 ? (parseInt(self2.secondElement.value, 10) || 0) % 60 : 0;
    if (self2.amPM !== void 0) {
      hours = ampm2military(hours, self2.amPM.textContent);
    }
    const limitMinHours = self2.config.minTime !== void 0 || self2.config.minDate && self2.minDateHasTime && self2.latestSelectedDateObj && compareDates(self2.latestSelectedDateObj, self2.config.minDate, true) === 0;
    const limitMaxHours = self2.config.maxTime !== void 0 || self2.config.maxDate && self2.maxDateHasTime && self2.latestSelectedDateObj && compareDates(self2.latestSelectedDateObj, self2.config.maxDate, true) === 0;
    if (limitMaxHours) {
      const maxTime = self2.config.maxTime !== void 0 ? self2.config.maxTime : self2.config.maxDate;
      hours = Math.min(hours, maxTime.getHours());
      if (hours === maxTime.getHours())
        minutes = Math.min(minutes, maxTime.getMinutes());
      if (minutes === maxTime.getMinutes())
        seconds = Math.min(seconds, maxTime.getSeconds());
    }
    if (limitMinHours) {
      const minTime = self2.config.minTime !== void 0 ? self2.config.minTime : self2.config.minDate;
      hours = Math.max(hours, minTime.getHours());
      if (hours === minTime.getHours() && minutes < minTime.getMinutes())
        minutes = minTime.getMinutes();
      if (minutes === minTime.getMinutes())
        seconds = Math.max(seconds, minTime.getSeconds());
    }
    setHours(hours, minutes, seconds);
  }
  function setHoursFromDate(dateObj) {
    const date = dateObj || self2.latestSelectedDateObj;
    if (date) {
      setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
  }
  function setHours(hours, minutes, seconds) {
    if (self2.latestSelectedDateObj !== void 0) {
      self2.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
    }
    if (!self2.hourElement || !self2.minuteElement || self2.isMobile)
      return;
    self2.hourElement.value = pad(!self2.config.time_24hr ? (12 + hours) % 12 + 12 * int(hours % 12 === 0) : hours);
    self2.minuteElement.value = pad(minutes);
    if (self2.amPM !== void 0)
      self2.amPM.textContent = self2.l10n.amPM[int(hours >= 12)];
    if (self2.secondElement !== void 0)
      self2.secondElement.value = pad(seconds);
  }
  function onYearInput(event) {
    const eventTarget = getEventTarget(event);
    const year = parseInt(eventTarget.value) + (event.delta || 0);
    if (year / 1e3 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) {
      changeYear(year);
    }
  }
  function bind(element2, event, handler, options2) {
    if (event instanceof Array)
      return event.forEach((ev) => bind(element2, ev, handler, options2));
    if (element2 instanceof Array)
      return element2.forEach((el) => bind(el, event, handler, options2));
    element2.addEventListener(event, handler, options2);
    self2._handlers.push({
      remove: () => element2.removeEventListener(event, handler)
    });
  }
  function triggerChange() {
    triggerEvent("onChange");
  }
  function bindEvents() {
    if (self2.config.wrap) {
      ["open", "close", "toggle", "clear"].forEach((evt) => {
        Array.prototype.forEach.call(self2.element.querySelectorAll(`[data-${evt}]`), (el) => bind(el, "click", self2[evt]));
      });
    }
    if (self2.isMobile) {
      setupMobile();
      return;
    }
    const debouncedResize = debounce(onResize, 50);
    self2._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
    if (self2.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
      bind(self2.daysContainer, "mouseover", (e) => {
        if (self2.config.mode === "range")
          onMouseOver(getEventTarget(e));
      });
    bind(window.document.body, "keydown", onKeyDown);
    if (!self2.config.inline && !self2.config.static)
      bind(window, "resize", debouncedResize);
    if (window.ontouchstart !== void 0)
      bind(window.document, "touchstart", documentClick);
    else
      bind(window.document, "mousedown", documentClick);
    bind(window.document, "focus", documentClick, { capture: true });
    if (self2.config.clickOpens === true) {
      bind(self2._input, "focus", self2.open);
      bind(self2._input, "click", self2.open);
    }
    if (self2.daysContainer !== void 0) {
      bind(self2.monthNav, "click", onMonthNavClick);
      bind(self2.monthNav, ["keyup", "increment"], onYearInput);
      bind(self2.daysContainer, "click", selectDate);
    }
    if (self2.timeContainer !== void 0 && self2.minuteElement !== void 0 && self2.hourElement !== void 0) {
      const selText = (e) => getEventTarget(e).select();
      bind(self2.timeContainer, ["increment"], updateTime);
      bind(self2.timeContainer, "blur", updateTime, { capture: true });
      bind(self2.timeContainer, "click", timeIncrement);
      bind([self2.hourElement, self2.minuteElement], ["focus", "click"], selText);
      if (self2.secondElement !== void 0)
        bind(self2.secondElement, "focus", () => self2.secondElement && self2.secondElement.select());
      if (self2.amPM !== void 0) {
        bind(self2.amPM, "click", (e) => {
          updateTime(e);
          triggerChange();
        });
      }
    }
    if (self2.config.allowInput) {
      bind(self2._input, "blur", onBlur);
    }
  }
  function jumpToDate(jumpDate, triggerChange2) {
    const jumpTo = jumpDate !== void 0 ? self2.parseDate(jumpDate) : self2.latestSelectedDateObj || (self2.config.minDate && self2.config.minDate > self2.now ? self2.config.minDate : self2.config.maxDate && self2.config.maxDate < self2.now ? self2.config.maxDate : self2.now);
    const oldYear = self2.currentYear;
    const oldMonth = self2.currentMonth;
    try {
      if (jumpTo !== void 0) {
        self2.currentYear = jumpTo.getFullYear();
        self2.currentMonth = jumpTo.getMonth();
      }
    } catch (e) {
      e.message = "Invalid date supplied: " + jumpTo;
      self2.config.errorHandler(e);
    }
    if (triggerChange2 && self2.currentYear !== oldYear) {
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    if (triggerChange2 && (self2.currentYear !== oldYear || self2.currentMonth !== oldMonth)) {
      triggerEvent("onMonthChange");
    }
    self2.redraw();
  }
  function timeIncrement(e) {
    const eventTarget = getEventTarget(e);
    if (~eventTarget.className.indexOf("arrow"))
      incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
  }
  function incrementNumInput(e, delta, inputElem) {
    const target = e && getEventTarget(e);
    const input = inputElem || target && target.parentNode && target.parentNode.firstChild;
    const event = createEvent("increment");
    event.delta = delta;
    input && input.dispatchEvent(event);
  }
  function build() {
    const fragment = window.document.createDocumentFragment();
    self2.calendarContainer = createElement("div", "flatpickr-calendar");
    self2.calendarContainer.tabIndex = -1;
    if (!self2.config.noCalendar) {
      fragment.appendChild(buildMonthNav());
      self2.innerContainer = createElement("div", "flatpickr-innerContainer");
      if (self2.config.weekNumbers) {
        const { weekWrapper, weekNumbers } = buildWeeks();
        self2.innerContainer.appendChild(weekWrapper);
        self2.weekNumbers = weekNumbers;
        self2.weekWrapper = weekWrapper;
      }
      self2.rContainer = createElement("div", "flatpickr-rContainer");
      self2.rContainer.appendChild(buildWeekdays());
      if (!self2.daysContainer) {
        self2.daysContainer = createElement("div", "flatpickr-days");
        self2.daysContainer.tabIndex = -1;
      }
      buildDays();
      self2.rContainer.appendChild(self2.daysContainer);
      self2.innerContainer.appendChild(self2.rContainer);
      fragment.appendChild(self2.innerContainer);
    }
    if (self2.config.enableTime) {
      fragment.appendChild(buildTime());
    }
    toggleClass(self2.calendarContainer, "rangeMode", self2.config.mode === "range");
    toggleClass(self2.calendarContainer, "animate", self2.config.animate === true);
    toggleClass(self2.calendarContainer, "multiMonth", self2.config.showMonths > 1);
    self2.calendarContainer.appendChild(fragment);
    const customAppend = self2.config.appendTo !== void 0 && self2.config.appendTo.nodeType !== void 0;
    if (self2.config.inline || self2.config.static) {
      self2.calendarContainer.classList.add(self2.config.inline ? "inline" : "static");
      if (self2.config.inline) {
        if (!customAppend && self2.element.parentNode)
          self2.element.parentNode.insertBefore(self2.calendarContainer, self2._input.nextSibling);
        else if (self2.config.appendTo !== void 0)
          self2.config.appendTo.appendChild(self2.calendarContainer);
      }
      if (self2.config.static) {
        const wrapper = createElement("div", "flatpickr-wrapper");
        if (self2.element.parentNode)
          self2.element.parentNode.insertBefore(wrapper, self2.element);
        wrapper.appendChild(self2.element);
        if (self2.altInput)
          wrapper.appendChild(self2.altInput);
        wrapper.appendChild(self2.calendarContainer);
      }
    }
    if (!self2.config.static && !self2.config.inline)
      (self2.config.appendTo !== void 0 ? self2.config.appendTo : window.document.body).appendChild(self2.calendarContainer);
  }
  function createDay(className, date, dayNumber, i) {
    const dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
    dayElement.dateObj = date;
    dayElement.$i = i;
    dayElement.setAttribute("aria-label", self2.formatDate(date, self2.config.ariaDateFormat));
    if (className.indexOf("hidden") === -1 && compareDates(date, self2.now) === 0) {
      self2.todayDateElem = dayElement;
      dayElement.classList.add("today");
      dayElement.setAttribute("aria-current", "date");
    }
    if (dateIsEnabled) {
      dayElement.tabIndex = -1;
      if (isDateSelected(date)) {
        dayElement.classList.add("selected");
        self2.selectedDateElem = dayElement;
        if (self2.config.mode === "range") {
          toggleClass(dayElement, "startRange", self2.selectedDates[0] && compareDates(date, self2.selectedDates[0], true) === 0);
          toggleClass(dayElement, "endRange", self2.selectedDates[1] && compareDates(date, self2.selectedDates[1], true) === 0);
          if (className === "nextMonthDay")
            dayElement.classList.add("inRange");
        }
      }
    } else {
      dayElement.classList.add("flatpickr-disabled");
    }
    if (self2.config.mode === "range") {
      if (isDateInRange(date) && !isDateSelected(date))
        dayElement.classList.add("inRange");
    }
    if (self2.weekNumbers && self2.config.showMonths === 1 && className !== "prevMonthDay" && dayNumber % 7 === 1) {
      self2.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self2.config.getWeek(date) + "</span>");
    }
    triggerEvent("onDayCreate", dayElement);
    return dayElement;
  }
  function focusOnDayElem(targetNode) {
    targetNode.focus();
    if (self2.config.mode === "range")
      onMouseOver(targetNode);
  }
  function getFirstAvailableDay(delta) {
    const startMonth = delta > 0 ? 0 : self2.config.showMonths - 1;
    const endMonth = delta > 0 ? self2.config.showMonths : -1;
    for (let m = startMonth; m != endMonth; m += delta) {
      const month = self2.daysContainer.children[m];
      const startIndex = delta > 0 ? 0 : month.children.length - 1;
      const endIndex = delta > 0 ? month.children.length : -1;
      for (let i = startIndex; i != endIndex; i += delta) {
        const c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
          return c;
      }
    }
    return void 0;
  }
  function getNextAvailableDay(current, delta) {
    const givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self2.currentMonth;
    const endMonth = delta > 0 ? self2.config.showMonths : -1;
    const loopDelta = delta > 0 ? 1 : -1;
    for (let m = givenMonth - self2.currentMonth; m != endMonth; m += loopDelta) {
      const month = self2.daysContainer.children[m];
      const startIndex = givenMonth - self2.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
      const numMonthDays = month.children.length;
      for (let i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
        const c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta))
          return focusOnDayElem(c);
      }
    }
    self2.changeMonth(loopDelta);
    focusOnDay(getFirstAvailableDay(loopDelta), 0);
    return void 0;
  }
  function focusOnDay(current, offset) {
    const dayFocused = isInView(document.activeElement || document.body);
    const startElem = current !== void 0 ? current : dayFocused ? document.activeElement : self2.selectedDateElem !== void 0 && isInView(self2.selectedDateElem) ? self2.selectedDateElem : self2.todayDateElem !== void 0 && isInView(self2.todayDateElem) ? self2.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
    if (startElem === void 0) {
      self2._input.focus();
    } else if (!dayFocused) {
      focusOnDayElem(startElem);
    } else {
      getNextAvailableDay(startElem, offset);
    }
  }
  function buildMonthDays(year, month) {
    const firstOfMonth = (new Date(year, month, 1).getDay() - self2.l10n.firstDayOfWeek + 7) % 7;
    const prevMonthDays = self2.utils.getDaysInMonth((month - 1 + 12) % 12, year);
    const daysInMonth = self2.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self2.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
    let dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
    for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
      days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
    }
    for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
      days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
    }
    for (let dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self2.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
      days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
    }
    const dayContainer = createElement("div", "dayContainer");
    dayContainer.appendChild(days);
    return dayContainer;
  }
  function buildDays() {
    if (self2.daysContainer === void 0) {
      return;
    }
    clearNode(self2.daysContainer);
    if (self2.weekNumbers)
      clearNode(self2.weekNumbers);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < self2.config.showMonths; i++) {
      const d2 = new Date(self2.currentYear, self2.currentMonth, 1);
      d2.setMonth(self2.currentMonth + i);
      frag.appendChild(buildMonthDays(d2.getFullYear(), d2.getMonth()));
    }
    self2.daysContainer.appendChild(frag);
    self2.days = self2.daysContainer.firstChild;
    if (self2.config.mode === "range" && self2.selectedDates.length === 1) {
      onMouseOver();
    }
  }
  function buildMonthSwitch() {
    if (self2.config.showMonths > 1 || self2.config.monthSelectorType !== "dropdown")
      return;
    const shouldBuildMonth = function(month) {
      if (self2.config.minDate !== void 0 && self2.currentYear === self2.config.minDate.getFullYear() && month < self2.config.minDate.getMonth()) {
        return false;
      }
      return !(self2.config.maxDate !== void 0 && self2.currentYear === self2.config.maxDate.getFullYear() && month > self2.config.maxDate.getMonth());
    };
    self2.monthsDropdownContainer.tabIndex = -1;
    self2.monthsDropdownContainer.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      if (!shouldBuildMonth(i))
        continue;
      const month = createElement("option", "flatpickr-monthDropdown-month");
      month.value = new Date(self2.currentYear, i).getMonth().toString();
      month.textContent = monthToStr(i, self2.config.shorthandCurrentMonth, self2.l10n);
      month.tabIndex = -1;
      if (self2.currentMonth === i) {
        month.selected = true;
      }
      self2.monthsDropdownContainer.appendChild(month);
    }
  }
  function buildMonth() {
    const container = createElement("div", "flatpickr-month");
    const monthNavFragment = window.document.createDocumentFragment();
    let monthElement;
    if (self2.config.showMonths > 1 || self2.config.monthSelectorType === "static") {
      monthElement = createElement("span", "cur-month");
    } else {
      self2.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
      self2.monthsDropdownContainer.setAttribute("aria-label", self2.l10n.monthAriaLabel);
      bind(self2.monthsDropdownContainer, "change", (e) => {
        const target = getEventTarget(e);
        const selectedMonth = parseInt(target.value, 10);
        self2.changeMonth(selectedMonth - self2.currentMonth);
        triggerEvent("onMonthChange");
      });
      buildMonthSwitch();
      monthElement = self2.monthsDropdownContainer;
    }
    const yearInput = createNumberInput("cur-year", { tabindex: "-1" });
    const yearElement = yearInput.getElementsByTagName("input")[0];
    yearElement.setAttribute("aria-label", self2.l10n.yearAriaLabel);
    if (self2.config.minDate) {
      yearElement.setAttribute("min", self2.config.minDate.getFullYear().toString());
    }
    if (self2.config.maxDate) {
      yearElement.setAttribute("max", self2.config.maxDate.getFullYear().toString());
      yearElement.disabled = !!self2.config.minDate && self2.config.minDate.getFullYear() === self2.config.maxDate.getFullYear();
    }
    const currentMonth = createElement("div", "flatpickr-current-month");
    currentMonth.appendChild(monthElement);
    currentMonth.appendChild(yearInput);
    monthNavFragment.appendChild(currentMonth);
    container.appendChild(monthNavFragment);
    return {
      container,
      yearElement,
      monthElement
    };
  }
  function buildMonths() {
    clearNode(self2.monthNav);
    self2.monthNav.appendChild(self2.prevMonthNav);
    if (self2.config.showMonths) {
      self2.yearElements = [];
      self2.monthElements = [];
    }
    for (let m = self2.config.showMonths; m--; ) {
      const month = buildMonth();
      self2.yearElements.push(month.yearElement);
      self2.monthElements.push(month.monthElement);
      self2.monthNav.appendChild(month.container);
    }
    self2.monthNav.appendChild(self2.nextMonthNav);
  }
  function buildMonthNav() {
    self2.monthNav = createElement("div", "flatpickr-months");
    self2.yearElements = [];
    self2.monthElements = [];
    self2.prevMonthNav = createElement("span", "flatpickr-prev-month");
    self2.prevMonthNav.innerHTML = self2.config.prevArrow;
    self2.nextMonthNav = createElement("span", "flatpickr-next-month");
    self2.nextMonthNav.innerHTML = self2.config.nextArrow;
    buildMonths();
    Object.defineProperty(self2, "_hidePrevMonthArrow", {
      get: () => self2.__hidePrevMonthArrow,
      set(bool) {
        if (self2.__hidePrevMonthArrow !== bool) {
          toggleClass(self2.prevMonthNav, "flatpickr-disabled", bool);
          self2.__hidePrevMonthArrow = bool;
        }
      }
    });
    Object.defineProperty(self2, "_hideNextMonthArrow", {
      get: () => self2.__hideNextMonthArrow,
      set(bool) {
        if (self2.__hideNextMonthArrow !== bool) {
          toggleClass(self2.nextMonthNav, "flatpickr-disabled", bool);
          self2.__hideNextMonthArrow = bool;
        }
      }
    });
    self2.currentYearElement = self2.yearElements[0];
    updateNavigationCurrentMonth();
    return self2.monthNav;
  }
  function buildTime() {
    self2.calendarContainer.classList.add("hasTime");
    if (self2.config.noCalendar)
      self2.calendarContainer.classList.add("noCalendar");
    const defaults2 = getDefaultHours(self2.config);
    self2.timeContainer = createElement("div", "flatpickr-time");
    self2.timeContainer.tabIndex = -1;
    const separator = createElement("span", "flatpickr-time-separator", ":");
    const hourInput = createNumberInput("flatpickr-hour", {
      "aria-label": self2.l10n.hourAriaLabel
    });
    self2.hourElement = hourInput.getElementsByTagName("input")[0];
    const minuteInput = createNumberInput("flatpickr-minute", {
      "aria-label": self2.l10n.minuteAriaLabel
    });
    self2.minuteElement = minuteInput.getElementsByTagName("input")[0];
    self2.hourElement.tabIndex = self2.minuteElement.tabIndex = -1;
    self2.hourElement.value = pad(self2.latestSelectedDateObj ? self2.latestSelectedDateObj.getHours() : self2.config.time_24hr ? defaults2.hours : military2ampm(defaults2.hours));
    self2.minuteElement.value = pad(self2.latestSelectedDateObj ? self2.latestSelectedDateObj.getMinutes() : defaults2.minutes);
    self2.hourElement.setAttribute("step", self2.config.hourIncrement.toString());
    self2.minuteElement.setAttribute("step", self2.config.minuteIncrement.toString());
    self2.hourElement.setAttribute("min", self2.config.time_24hr ? "0" : "1");
    self2.hourElement.setAttribute("max", self2.config.time_24hr ? "23" : "12");
    self2.hourElement.setAttribute("maxlength", "2");
    self2.minuteElement.setAttribute("min", "0");
    self2.minuteElement.setAttribute("max", "59");
    self2.minuteElement.setAttribute("maxlength", "2");
    self2.timeContainer.appendChild(hourInput);
    self2.timeContainer.appendChild(separator);
    self2.timeContainer.appendChild(minuteInput);
    if (self2.config.time_24hr)
      self2.timeContainer.classList.add("time24hr");
    if (self2.config.enableSeconds) {
      self2.timeContainer.classList.add("hasSeconds");
      const secondInput = createNumberInput("flatpickr-second");
      self2.secondElement = secondInput.getElementsByTagName("input")[0];
      self2.secondElement.value = pad(self2.latestSelectedDateObj ? self2.latestSelectedDateObj.getSeconds() : defaults2.seconds);
      self2.secondElement.setAttribute("step", self2.minuteElement.getAttribute("step"));
      self2.secondElement.setAttribute("min", "0");
      self2.secondElement.setAttribute("max", "59");
      self2.secondElement.setAttribute("maxlength", "2");
      self2.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
      self2.timeContainer.appendChild(secondInput);
    }
    if (!self2.config.time_24hr) {
      self2.amPM = createElement("span", "flatpickr-am-pm", self2.l10n.amPM[int((self2.latestSelectedDateObj ? self2.hourElement.value : self2.config.defaultHour) > 11)]);
      self2.amPM.title = self2.l10n.toggleTitle;
      self2.amPM.tabIndex = -1;
      self2.timeContainer.appendChild(self2.amPM);
    }
    return self2.timeContainer;
  }
  function buildWeekdays() {
    if (!self2.weekdayContainer)
      self2.weekdayContainer = createElement("div", "flatpickr-weekdays");
    else
      clearNode(self2.weekdayContainer);
    for (let i = self2.config.showMonths; i--; ) {
      const container = createElement("div", "flatpickr-weekdaycontainer");
      self2.weekdayContainer.appendChild(container);
    }
    updateWeekdays();
    return self2.weekdayContainer;
  }
  function updateWeekdays() {
    if (!self2.weekdayContainer) {
      return;
    }
    const firstDayOfWeek = self2.l10n.firstDayOfWeek;
    let weekdays = [...self2.l10n.weekdays.shorthand];
    if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
      weekdays = [
        ...weekdays.splice(firstDayOfWeek, weekdays.length),
        ...weekdays.splice(0, firstDayOfWeek)
      ];
    }
    for (let i = self2.config.showMonths; i--; ) {
      self2.weekdayContainer.children[i].innerHTML = `
      <span class='flatpickr-weekday'>
        ${weekdays.join("</span><span class='flatpickr-weekday'>")}
      </span>
      `;
    }
  }
  function buildWeeks() {
    self2.calendarContainer.classList.add("hasWeeks");
    const weekWrapper = createElement("div", "flatpickr-weekwrapper");
    weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self2.l10n.weekAbbreviation));
    const weekNumbers = createElement("div", "flatpickr-weeks");
    weekWrapper.appendChild(weekNumbers);
    return {
      weekWrapper,
      weekNumbers
    };
  }
  function changeMonth(value, isOffset = true) {
    const delta = isOffset ? value : value - self2.currentMonth;
    if (delta < 0 && self2._hidePrevMonthArrow === true || delta > 0 && self2._hideNextMonthArrow === true)
      return;
    self2.currentMonth += delta;
    if (self2.currentMonth < 0 || self2.currentMonth > 11) {
      self2.currentYear += self2.currentMonth > 11 ? 1 : -1;
      self2.currentMonth = (self2.currentMonth + 12) % 12;
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    buildDays();
    triggerEvent("onMonthChange");
    updateNavigationCurrentMonth();
  }
  function clear(triggerChangeEvent = true, toInitial = true) {
    self2.input.value = "";
    if (self2.altInput !== void 0)
      self2.altInput.value = "";
    if (self2.mobileInput !== void 0)
      self2.mobileInput.value = "";
    self2.selectedDates = [];
    self2.latestSelectedDateObj = void 0;
    if (toInitial === true) {
      self2.currentYear = self2._initialDate.getFullYear();
      self2.currentMonth = self2._initialDate.getMonth();
    }
    if (self2.config.enableTime === true) {
      const { hours, minutes, seconds } = getDefaultHours(self2.config);
      setHours(hours, minutes, seconds);
    }
    self2.redraw();
    if (triggerChangeEvent)
      triggerEvent("onChange");
  }
  function close() {
    self2.isOpen = false;
    if (!self2.isMobile) {
      if (self2.calendarContainer !== void 0) {
        self2.calendarContainer.classList.remove("open");
      }
      if (self2._input !== void 0) {
        self2._input.classList.remove("active");
      }
    }
    triggerEvent("onClose");
  }
  function destroy() {
    if (self2.config !== void 0)
      triggerEvent("onDestroy");
    for (let i = self2._handlers.length; i--; ) {
      self2._handlers[i].remove();
    }
    self2._handlers = [];
    if (self2.mobileInput) {
      if (self2.mobileInput.parentNode)
        self2.mobileInput.parentNode.removeChild(self2.mobileInput);
      self2.mobileInput = void 0;
    } else if (self2.calendarContainer && self2.calendarContainer.parentNode) {
      if (self2.config.static && self2.calendarContainer.parentNode) {
        const wrapper = self2.calendarContainer.parentNode;
        wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
        if (wrapper.parentNode) {
          while (wrapper.firstChild)
            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
          wrapper.parentNode.removeChild(wrapper);
        }
      } else
        self2.calendarContainer.parentNode.removeChild(self2.calendarContainer);
    }
    if (self2.altInput) {
      self2.input.type = "text";
      if (self2.altInput.parentNode)
        self2.altInput.parentNode.removeChild(self2.altInput);
      delete self2.altInput;
    }
    if (self2.input) {
      self2.input.type = self2.input._type;
      self2.input.classList.remove("flatpickr-input");
      self2.input.removeAttribute("readonly");
    }
    [
      "_showTimeInput",
      "latestSelectedDateObj",
      "_hideNextMonthArrow",
      "_hidePrevMonthArrow",
      "__hideNextMonthArrow",
      "__hidePrevMonthArrow",
      "isMobile",
      "isOpen",
      "selectedDateElem",
      "minDateHasTime",
      "maxDateHasTime",
      "days",
      "daysContainer",
      "_input",
      "_positionElement",
      "innerContainer",
      "rContainer",
      "monthNav",
      "todayDateElem",
      "calendarContainer",
      "weekdayContainer",
      "prevMonthNav",
      "nextMonthNav",
      "monthsDropdownContainer",
      "currentMonthElement",
      "currentYearElement",
      "navigationCurrentMonth",
      "selectedDateElem",
      "config"
    ].forEach((k) => {
      try {
        delete self2[k];
      } catch (_) {
      }
    });
  }
  function isCalendarElem(elem) {
    if (self2.config.appendTo && self2.config.appendTo.contains(elem))
      return true;
    return self2.calendarContainer.contains(elem);
  }
  function documentClick(e) {
    if (self2.isOpen && !self2.config.inline) {
      const eventTarget = getEventTarget(e);
      const isCalendarElement = isCalendarElem(eventTarget);
      const isInput = eventTarget === self2.input || eventTarget === self2.altInput || self2.element.contains(eventTarget) || e.path && e.path.indexOf && (~e.path.indexOf(self2.input) || ~e.path.indexOf(self2.altInput));
      const lostFocus = e.type === "blur" ? isInput && e.relatedTarget && !isCalendarElem(e.relatedTarget) : !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
      const isIgnored = !self2.config.ignoredFocusElements.some((elem) => elem.contains(eventTarget));
      if (lostFocus && isIgnored) {
        if (self2.timeContainer !== void 0 && self2.minuteElement !== void 0 && self2.hourElement !== void 0 && self2.input.value !== "" && self2.input.value !== void 0) {
          updateTime();
        }
        self2.close();
        if (self2.config && self2.config.mode === "range" && self2.selectedDates.length === 1) {
          self2.clear(false);
          self2.redraw();
        }
      }
    }
  }
  function changeYear(newYear) {
    if (!newYear || self2.config.minDate && newYear < self2.config.minDate.getFullYear() || self2.config.maxDate && newYear > self2.config.maxDate.getFullYear())
      return;
    const newYearNum = newYear, isNewYear = self2.currentYear !== newYearNum;
    self2.currentYear = newYearNum || self2.currentYear;
    if (self2.config.maxDate && self2.currentYear === self2.config.maxDate.getFullYear()) {
      self2.currentMonth = Math.min(self2.config.maxDate.getMonth(), self2.currentMonth);
    } else if (self2.config.minDate && self2.currentYear === self2.config.minDate.getFullYear()) {
      self2.currentMonth = Math.max(self2.config.minDate.getMonth(), self2.currentMonth);
    }
    if (isNewYear) {
      self2.redraw();
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
  }
  function isEnabled(date, timeless = true) {
    var _a2;
    const dateToCheck = self2.parseDate(date, void 0, timeless);
    if (self2.config.minDate && dateToCheck && compareDates(dateToCheck, self2.config.minDate, timeless !== void 0 ? timeless : !self2.minDateHasTime) < 0 || self2.config.maxDate && dateToCheck && compareDates(dateToCheck, self2.config.maxDate, timeless !== void 0 ? timeless : !self2.maxDateHasTime) > 0)
      return false;
    if (!self2.config.enable && self2.config.disable.length === 0)
      return true;
    if (dateToCheck === void 0)
      return false;
    const bool = !!self2.config.enable, array = (_a2 = self2.config.enable) !== null && _a2 !== void 0 ? _a2 : self2.config.disable;
    for (let i = 0, d2; i < array.length; i++) {
      d2 = array[i];
      if (typeof d2 === "function" && d2(dateToCheck))
        return bool;
      else if (d2 instanceof Date && dateToCheck !== void 0 && d2.getTime() === dateToCheck.getTime())
        return bool;
      else if (typeof d2 === "string") {
        const parsed = self2.parseDate(d2, void 0, true);
        return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
      } else if (typeof d2 === "object" && dateToCheck !== void 0 && d2.from && d2.to && dateToCheck.getTime() >= d2.from.getTime() && dateToCheck.getTime() <= d2.to.getTime())
        return bool;
    }
    return !bool;
  }
  function isInView(elem) {
    if (self2.daysContainer !== void 0)
      return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self2.daysContainer.contains(elem);
    return false;
  }
  function onBlur(e) {
    const isInput = e.target === self2._input;
    if (isInput && (self2.selectedDates.length > 0 || self2._input.value.length > 0) && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
      self2.setDate(self2._input.value, true, e.target === self2.altInput ? self2.config.altFormat : self2.config.dateFormat);
    }
  }
  function onKeyDown(e) {
    const eventTarget = getEventTarget(e);
    const isInput = self2.config.wrap ? element.contains(eventTarget) : eventTarget === self2._input;
    const allowInput = self2.config.allowInput;
    const allowKeydown = self2.isOpen && (!allowInput || !isInput);
    const allowInlineKeydown = self2.config.inline && isInput && !allowInput;
    if (e.keyCode === 13 && isInput) {
      if (allowInput) {
        self2.setDate(self2._input.value, true, eventTarget === self2.altInput ? self2.config.altFormat : self2.config.dateFormat);
        return eventTarget.blur();
      } else {
        self2.open();
      }
    } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
      const isTimeObj = !!self2.timeContainer && self2.timeContainer.contains(eventTarget);
      switch (e.keyCode) {
        case 13:
          if (isTimeObj) {
            e.preventDefault();
            updateTime();
            focusAndClose();
          } else
            selectDate(e);
          break;
        case 27:
          e.preventDefault();
          focusAndClose();
          break;
        case 8:
        case 46:
          if (isInput && !self2.config.allowInput) {
            e.preventDefault();
            self2.clear();
          }
          break;
        case 37:
        case 39:
          if (!isTimeObj && !isInput) {
            e.preventDefault();
            if (self2.daysContainer !== void 0 && (allowInput === false || document.activeElement && isInView(document.activeElement))) {
              const delta2 = e.keyCode === 39 ? 1 : -1;
              if (!e.ctrlKey)
                focusOnDay(void 0, delta2);
              else {
                e.stopPropagation();
                changeMonth(delta2);
                focusOnDay(getFirstAvailableDay(1), 0);
              }
            }
          } else if (self2.hourElement)
            self2.hourElement.focus();
          break;
        case 38:
        case 40:
          e.preventDefault();
          const delta = e.keyCode === 40 ? 1 : -1;
          if (self2.daysContainer && eventTarget.$i !== void 0 || eventTarget === self2.input || eventTarget === self2.altInput) {
            if (e.ctrlKey) {
              e.stopPropagation();
              changeYear(self2.currentYear - delta);
              focusOnDay(getFirstAvailableDay(1), 0);
            } else if (!isTimeObj)
              focusOnDay(void 0, delta * 7);
          } else if (eventTarget === self2.currentYearElement) {
            changeYear(self2.currentYear - delta);
          } else if (self2.config.enableTime) {
            if (!isTimeObj && self2.hourElement)
              self2.hourElement.focus();
            updateTime(e);
            self2._debouncedChange();
          }
          break;
        case 9:
          if (isTimeObj) {
            const elems = [
              self2.hourElement,
              self2.minuteElement,
              self2.secondElement,
              self2.amPM
            ].concat(self2.pluginElements).filter((x) => x);
            const i = elems.indexOf(eventTarget);
            if (i !== -1) {
              const target = elems[i + (e.shiftKey ? -1 : 1)];
              e.preventDefault();
              (target || self2._input).focus();
            }
          } else if (!self2.config.noCalendar && self2.daysContainer && self2.daysContainer.contains(eventTarget) && e.shiftKey) {
            e.preventDefault();
            self2._input.focus();
          }
          break;
      }
    }
    if (self2.amPM !== void 0 && eventTarget === self2.amPM) {
      switch (e.key) {
        case self2.l10n.amPM[0].charAt(0):
        case self2.l10n.amPM[0].charAt(0).toLowerCase():
          self2.amPM.textContent = self2.l10n.amPM[0];
          setHoursFromInputs();
          updateValue();
          break;
        case self2.l10n.amPM[1].charAt(0):
        case self2.l10n.amPM[1].charAt(0).toLowerCase():
          self2.amPM.textContent = self2.l10n.amPM[1];
          setHoursFromInputs();
          updateValue();
          break;
      }
    }
    if (isInput || isCalendarElem(eventTarget)) {
      triggerEvent("onKeyDown", e);
    }
  }
  function onMouseOver(elem) {
    if (self2.selectedDates.length !== 1 || elem && (!elem.classList.contains("flatpickr-day") || elem.classList.contains("flatpickr-disabled")))
      return;
    const hoverDate = elem ? elem.dateObj.getTime() : self2.days.firstElementChild.dateObj.getTime(), initialDate = self2.parseDate(self2.selectedDates[0], void 0, true).getTime(), rangeStartDate = Math.min(hoverDate, self2.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self2.selectedDates[0].getTime());
    let containsDisabled = false;
    let minRange = 0, maxRange = 0;
    for (let t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
      if (!isEnabled(new Date(t), true)) {
        containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
        if (t < initialDate && (!minRange || t > minRange))
          minRange = t;
        else if (t > initialDate && (!maxRange || t < maxRange))
          maxRange = t;
      }
    }
    for (let m = 0; m < self2.config.showMonths; m++) {
      const month = self2.daysContainer.children[m];
      for (let i = 0, l = month.children.length; i < l; i++) {
        const dayElem = month.children[i], date = dayElem.dateObj;
        const timestamp = date.getTime();
        const outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
        if (outOfRange) {
          dayElem.classList.add("notAllowed");
          ["inRange", "startRange", "endRange"].forEach((c) => {
            dayElem.classList.remove(c);
          });
          continue;
        } else if (containsDisabled && !outOfRange)
          continue;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach((c) => {
          dayElem.classList.remove(c);
        });
        if (elem !== void 0) {
          elem.classList.add(hoverDate <= self2.selectedDates[0].getTime() ? "startRange" : "endRange");
          if (initialDate < hoverDate && timestamp === initialDate)
            dayElem.classList.add("startRange");
          else if (initialDate > hoverDate && timestamp === initialDate)
            dayElem.classList.add("endRange");
          if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate))
            dayElem.classList.add("inRange");
        }
      }
    }
  }
  function onResize() {
    if (self2.isOpen && !self2.config.static && !self2.config.inline)
      positionCalendar();
  }
  function open2(e, positionElement = self2._positionElement) {
    if (self2.isMobile === true) {
      if (e) {
        e.preventDefault();
        const eventTarget = getEventTarget(e);
        if (eventTarget) {
          eventTarget.blur();
        }
      }
      if (self2.mobileInput !== void 0) {
        self2.mobileInput.focus();
        self2.mobileInput.click();
      }
      triggerEvent("onOpen");
      return;
    } else if (self2._input.disabled || self2.config.inline) {
      return;
    }
    const wasOpen = self2.isOpen;
    self2.isOpen = true;
    if (!wasOpen) {
      self2.calendarContainer.classList.add("open");
      self2._input.classList.add("active");
      triggerEvent("onOpen");
      positionCalendar(positionElement);
    }
    if (self2.config.enableTime === true && self2.config.noCalendar === true) {
      if (self2.config.allowInput === false && (e === void 0 || !self2.timeContainer.contains(e.relatedTarget))) {
        setTimeout(() => self2.hourElement.select(), 50);
      }
    }
  }
  function minMaxDateSetter(type) {
    return (date) => {
      const dateObj = self2.config[`_${type}Date`] = self2.parseDate(date, self2.config.dateFormat);
      const inverseDateObj = self2.config[`_${type === "min" ? "max" : "min"}Date`];
      if (dateObj !== void 0) {
        self2[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
      }
      if (self2.selectedDates) {
        self2.selectedDates = self2.selectedDates.filter((d2) => isEnabled(d2));
        if (!self2.selectedDates.length && type === "min")
          setHoursFromDate(dateObj);
        updateValue();
      }
      if (self2.daysContainer) {
        redraw();
        if (dateObj !== void 0)
          self2.currentYearElement[type] = dateObj.getFullYear().toString();
        else
          self2.currentYearElement.removeAttribute(type);
        self2.currentYearElement.disabled = !!inverseDateObj && dateObj !== void 0 && inverseDateObj.getFullYear() === dateObj.getFullYear();
      }
    };
  }
  function parseConfig() {
    const boolOpts = [
      "wrap",
      "weekNumbers",
      "allowInput",
      "allowInvalidPreload",
      "clickOpens",
      "time_24hr",
      "enableTime",
      "noCalendar",
      "altInput",
      "shorthandCurrentMonth",
      "inline",
      "static",
      "enableSeconds",
      "disableMobile"
    ];
    const userConfig = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
    const formats2 = {};
    self2.config.parseDate = userConfig.parseDate;
    self2.config.formatDate = userConfig.formatDate;
    Object.defineProperty(self2.config, "enable", {
      get: () => self2.config._enable,
      set: (dates) => {
        self2.config._enable = parseDateRules(dates);
      }
    });
    Object.defineProperty(self2.config, "disable", {
      get: () => self2.config._disable,
      set: (dates) => {
        self2.config._disable = parseDateRules(dates);
      }
    });
    const timeMode = userConfig.mode === "time";
    if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
      const defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
      formats2.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
    }
    if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
      const defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
      formats2.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + ` h:i${userConfig.enableSeconds ? ":S" : ""} K`;
    }
    Object.defineProperty(self2.config, "minDate", {
      get: () => self2.config._minDate,
      set: minMaxDateSetter("min")
    });
    Object.defineProperty(self2.config, "maxDate", {
      get: () => self2.config._maxDate,
      set: minMaxDateSetter("max")
    });
    const minMaxTimeSetter = (type) => (val) => {
      self2.config[type === "min" ? "_minTime" : "_maxTime"] = self2.parseDate(val, "H:i:S");
    };
    Object.defineProperty(self2.config, "minTime", {
      get: () => self2.config._minTime,
      set: minMaxTimeSetter("min")
    });
    Object.defineProperty(self2.config, "maxTime", {
      get: () => self2.config._maxTime,
      set: minMaxTimeSetter("max")
    });
    if (userConfig.mode === "time") {
      self2.config.noCalendar = true;
      self2.config.enableTime = true;
    }
    Object.assign(self2.config, formats2, userConfig);
    for (let i = 0; i < boolOpts.length; i++)
      self2.config[boolOpts[i]] = self2.config[boolOpts[i]] === true || self2.config[boolOpts[i]] === "true";
    HOOKS.filter((hook) => self2.config[hook] !== void 0).forEach((hook) => {
      self2.config[hook] = arrayify(self2.config[hook] || []).map(bindToInstance);
    });
    self2.isMobile = !self2.config.disableMobile && !self2.config.inline && self2.config.mode === "single" && !self2.config.disable.length && !self2.config.enable && !self2.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (let i = 0; i < self2.config.plugins.length; i++) {
      const pluginConf = self2.config.plugins[i](self2) || {};
      for (const key in pluginConf) {
        if (HOOKS.indexOf(key) > -1) {
          self2.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self2.config[key]);
        } else if (typeof userConfig[key] === "undefined")
          self2.config[key] = pluginConf[key];
      }
    }
    if (!userConfig.altInputClass) {
      self2.config.altInputClass = getInputElem().className + " " + self2.config.altInputClass;
    }
    triggerEvent("onParseConfig");
  }
  function getInputElem() {
    return self2.config.wrap ? element.querySelector("[data-input]") : element;
  }
  function setupLocale() {
    if (typeof self2.config.locale !== "object" && typeof flatpickr.l10ns[self2.config.locale] === "undefined")
      self2.config.errorHandler(new Error(`flatpickr: invalid locale ${self2.config.locale}`));
    self2.l10n = Object.assign(Object.assign({}, flatpickr.l10ns.default), typeof self2.config.locale === "object" ? self2.config.locale : self2.config.locale !== "default" ? flatpickr.l10ns[self2.config.locale] : void 0);
    tokenRegex.K = `(${self2.l10n.amPM[0]}|${self2.l10n.amPM[1]}|${self2.l10n.amPM[0].toLowerCase()}|${self2.l10n.amPM[1].toLowerCase()})`;
    const userConfig = Object.assign(Object.assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
    if (userConfig.time_24hr === void 0 && flatpickr.defaultConfig.time_24hr === void 0) {
      self2.config.time_24hr = self2.l10n.time_24hr;
    }
    self2.formatDate = createDateFormatter(self2);
    self2.parseDate = createDateParser({ config: self2.config, l10n: self2.l10n });
  }
  function positionCalendar(customPositionElement) {
    if (typeof self2.config.position === "function") {
      return void self2.config.position(self2, customPositionElement);
    }
    if (self2.calendarContainer === void 0)
      return;
    triggerEvent("onPreCalendarPosition");
    const positionElement = customPositionElement || self2._positionElement;
    const calendarHeight = Array.prototype.reduce.call(self2.calendarContainer.children, (acc, child) => acc + child.offsetHeight, 0), calendarWidth = self2.calendarContainer.offsetWidth, configPos = self2.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
    const top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
    toggleClass(self2.calendarContainer, "arrowTop", !showOnTop);
    toggleClass(self2.calendarContainer, "arrowBottom", showOnTop);
    if (self2.config.inline)
      return;
    let left = window.pageXOffset + inputBounds.left;
    let isCenter = false;
    let isRight = false;
    if (configPosHorizontal === "center") {
      left -= (calendarWidth - inputBounds.width) / 2;
      isCenter = true;
    } else if (configPosHorizontal === "right") {
      left -= calendarWidth - inputBounds.width;
      isRight = true;
    }
    toggleClass(self2.calendarContainer, "arrowLeft", !isCenter && !isRight);
    toggleClass(self2.calendarContainer, "arrowCenter", isCenter);
    toggleClass(self2.calendarContainer, "arrowRight", isRight);
    const right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
    const rightMost = left + calendarWidth > window.document.body.offsetWidth;
    const centerMost = right + calendarWidth > window.document.body.offsetWidth;
    toggleClass(self2.calendarContainer, "rightMost", rightMost);
    if (self2.config.static)
      return;
    self2.calendarContainer.style.top = `${top}px`;
    if (!rightMost) {
      self2.calendarContainer.style.left = `${left}px`;
      self2.calendarContainer.style.right = "auto";
    } else if (!centerMost) {
      self2.calendarContainer.style.left = "auto";
      self2.calendarContainer.style.right = `${right}px`;
    } else {
      const doc = getDocumentStyleSheet();
      if (doc === void 0)
        return;
      const bodyWidth = window.document.body.offsetWidth;
      const centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
      const centerBefore = ".flatpickr-calendar.centerMost:before";
      const centerAfter = ".flatpickr-calendar.centerMost:after";
      const centerIndex = doc.cssRules.length;
      const centerStyle = `{left:${inputBounds.left}px;right:auto;}`;
      toggleClass(self2.calendarContainer, "rightMost", false);
      toggleClass(self2.calendarContainer, "centerMost", true);
      doc.insertRule(`${centerBefore},${centerAfter}${centerStyle}`, centerIndex);
      self2.calendarContainer.style.left = `${centerLeft}px`;
      self2.calendarContainer.style.right = "auto";
    }
  }
  function getDocumentStyleSheet() {
    let editableSheet = null;
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i];
      try {
        sheet.cssRules;
      } catch (err) {
        continue;
      }
      editableSheet = sheet;
      break;
    }
    return editableSheet != null ? editableSheet : createStyleSheet();
  }
  function createStyleSheet() {
    const style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
  }
  function redraw() {
    if (self2.config.noCalendar || self2.isMobile)
      return;
    buildMonthSwitch();
    updateNavigationCurrentMonth();
    buildDays();
  }
  function focusAndClose() {
    self2._input.focus();
    if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0) {
      setTimeout(self2.close, 0);
    } else {
      self2.close();
    }
  }
  function selectDate(e) {
    e.preventDefault();
    e.stopPropagation();
    const isSelectable = (day) => day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
    const t = findParent(getEventTarget(e), isSelectable);
    if (t === void 0)
      return;
    const target = t;
    const selectedDate = self2.latestSelectedDateObj = new Date(target.dateObj.getTime());
    const shouldChangeMonth = (selectedDate.getMonth() < self2.currentMonth || selectedDate.getMonth() > self2.currentMonth + self2.config.showMonths - 1) && self2.config.mode !== "range";
    self2.selectedDateElem = target;
    if (self2.config.mode === "single")
      self2.selectedDates = [selectedDate];
    else if (self2.config.mode === "multiple") {
      const selectedIndex = isDateSelected(selectedDate);
      if (selectedIndex)
        self2.selectedDates.splice(parseInt(selectedIndex), 1);
      else
        self2.selectedDates.push(selectedDate);
    } else if (self2.config.mode === "range") {
      if (self2.selectedDates.length === 2) {
        self2.clear(false, false);
      }
      self2.latestSelectedDateObj = selectedDate;
      self2.selectedDates.push(selectedDate);
      if (compareDates(selectedDate, self2.selectedDates[0], true) !== 0)
        self2.selectedDates.sort((a, b) => a.getTime() - b.getTime());
    }
    setHoursFromInputs();
    if (shouldChangeMonth) {
      const isNewYear = self2.currentYear !== selectedDate.getFullYear();
      self2.currentYear = selectedDate.getFullYear();
      self2.currentMonth = selectedDate.getMonth();
      if (isNewYear) {
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
      triggerEvent("onMonthChange");
    }
    updateNavigationCurrentMonth();
    buildDays();
    updateValue();
    if (!shouldChangeMonth && self2.config.mode !== "range" && self2.config.showMonths === 1)
      focusOnDayElem(target);
    else if (self2.selectedDateElem !== void 0 && self2.hourElement === void 0) {
      self2.selectedDateElem && self2.selectedDateElem.focus();
    }
    if (self2.hourElement !== void 0)
      self2.hourElement !== void 0 && self2.hourElement.focus();
    if (self2.config.closeOnSelect) {
      const single = self2.config.mode === "single" && !self2.config.enableTime;
      const range = self2.config.mode === "range" && self2.selectedDates.length === 2 && !self2.config.enableTime;
      if (single || range) {
        focusAndClose();
      }
    }
    triggerChange();
  }
  const CALLBACKS = {
    locale: [setupLocale, updateWeekdays],
    showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
    minDate: [jumpToDate],
    maxDate: [jumpToDate],
    clickOpens: [
      () => {
        if (self2.config.clickOpens === true) {
          bind(self2._input, "focus", self2.open);
          bind(self2._input, "click", self2.open);
        } else {
          self2._input.removeEventListener("focus", self2.open);
          self2._input.removeEventListener("click", self2.open);
        }
      }
    ]
  };
  function set(option, value) {
    if (option !== null && typeof option === "object") {
      Object.assign(self2.config, option);
      for (const key in option) {
        if (CALLBACKS[key] !== void 0)
          CALLBACKS[key].forEach((x) => x());
      }
    } else {
      self2.config[option] = value;
      if (CALLBACKS[option] !== void 0)
        CALLBACKS[option].forEach((x) => x());
      else if (HOOKS.indexOf(option) > -1)
        self2.config[option] = arrayify(value);
    }
    self2.redraw();
    updateValue(true);
  }
  function setSelectedDate(inputDate, format2) {
    let dates = [];
    if (inputDate instanceof Array)
      dates = inputDate.map((d2) => self2.parseDate(d2, format2));
    else if (inputDate instanceof Date || typeof inputDate === "number")
      dates = [self2.parseDate(inputDate, format2)];
    else if (typeof inputDate === "string") {
      switch (self2.config.mode) {
        case "single":
        case "time":
          dates = [self2.parseDate(inputDate, format2)];
          break;
        case "multiple":
          dates = inputDate.split(self2.config.conjunction).map((date) => self2.parseDate(date, format2));
          break;
        case "range":
          dates = inputDate.split(self2.l10n.rangeSeparator).map((date) => self2.parseDate(date, format2));
          break;
      }
    } else
      self2.config.errorHandler(new Error(`Invalid date supplied: ${JSON.stringify(inputDate)}`));
    self2.selectedDates = self2.config.allowInvalidPreload ? dates : dates.filter((d2) => d2 instanceof Date && isEnabled(d2, false));
    if (self2.config.mode === "range")
      self2.selectedDates.sort((a, b) => a.getTime() - b.getTime());
  }
  function setDate(date, triggerChange2 = false, format2 = self2.config.dateFormat) {
    if (date !== 0 && !date || date instanceof Array && date.length === 0)
      return self2.clear(triggerChange2);
    setSelectedDate(date, format2);
    self2.latestSelectedDateObj = self2.selectedDates[self2.selectedDates.length - 1];
    self2.redraw();
    jumpToDate(void 0, triggerChange2);
    setHoursFromDate();
    if (self2.selectedDates.length === 0) {
      self2.clear(false);
    }
    updateValue(triggerChange2);
    if (triggerChange2)
      triggerEvent("onChange");
  }
  function parseDateRules(arr) {
    return arr.slice().map((rule) => {
      if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
        return self2.parseDate(rule, void 0, true);
      } else if (rule && typeof rule === "object" && rule.from && rule.to)
        return {
          from: self2.parseDate(rule.from, void 0),
          to: self2.parseDate(rule.to, void 0)
        };
      return rule;
    }).filter((x) => x);
  }
  function setupDates() {
    self2.selectedDates = [];
    self2.now = self2.parseDate(self2.config.now) || new Date();
    const preloadedDate = self2.config.defaultDate || ((self2.input.nodeName === "INPUT" || self2.input.nodeName === "TEXTAREA") && self2.input.placeholder && self2.input.value === self2.input.placeholder ? null : self2.input.value);
    if (preloadedDate)
      setSelectedDate(preloadedDate, self2.config.dateFormat);
    self2._initialDate = self2.selectedDates.length > 0 ? self2.selectedDates[0] : self2.config.minDate && self2.config.minDate.getTime() > self2.now.getTime() ? self2.config.minDate : self2.config.maxDate && self2.config.maxDate.getTime() < self2.now.getTime() ? self2.config.maxDate : self2.now;
    self2.currentYear = self2._initialDate.getFullYear();
    self2.currentMonth = self2._initialDate.getMonth();
    if (self2.selectedDates.length > 0)
      self2.latestSelectedDateObj = self2.selectedDates[0];
    if (self2.config.minTime !== void 0)
      self2.config.minTime = self2.parseDate(self2.config.minTime, "H:i");
    if (self2.config.maxTime !== void 0)
      self2.config.maxTime = self2.parseDate(self2.config.maxTime, "H:i");
    self2.minDateHasTime = !!self2.config.minDate && (self2.config.minDate.getHours() > 0 || self2.config.minDate.getMinutes() > 0 || self2.config.minDate.getSeconds() > 0);
    self2.maxDateHasTime = !!self2.config.maxDate && (self2.config.maxDate.getHours() > 0 || self2.config.maxDate.getMinutes() > 0 || self2.config.maxDate.getSeconds() > 0);
  }
  function setupInputs() {
    self2.input = getInputElem();
    if (!self2.input) {
      self2.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    self2.input._type = self2.input.type;
    self2.input.type = "text";
    self2.input.classList.add("flatpickr-input");
    self2._input = self2.input;
    if (self2.config.altInput) {
      self2.altInput = createElement(self2.input.nodeName, self2.config.altInputClass);
      self2._input = self2.altInput;
      self2.altInput.placeholder = self2.input.placeholder;
      self2.altInput.disabled = self2.input.disabled;
      self2.altInput.required = self2.input.required;
      self2.altInput.tabIndex = self2.input.tabIndex;
      self2.altInput.type = "text";
      self2.input.setAttribute("type", "hidden");
      if (!self2.config.static && self2.input.parentNode)
        self2.input.parentNode.insertBefore(self2.altInput, self2.input.nextSibling);
    }
    if (!self2.config.allowInput)
      self2._input.setAttribute("readonly", "readonly");
    self2._positionElement = self2.config.positionElement || self2._input;
  }
  function setupMobile() {
    const inputType = self2.config.enableTime ? self2.config.noCalendar ? "time" : "datetime-local" : "date";
    self2.mobileInput = createElement("input", self2.input.className + " flatpickr-mobile");
    self2.mobileInput.tabIndex = 1;
    self2.mobileInput.type = inputType;
    self2.mobileInput.disabled = self2.input.disabled;
    self2.mobileInput.required = self2.input.required;
    self2.mobileInput.placeholder = self2.input.placeholder;
    self2.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
    if (self2.selectedDates.length > 0) {
      self2.mobileInput.defaultValue = self2.mobileInput.value = self2.formatDate(self2.selectedDates[0], self2.mobileFormatStr);
    }
    if (self2.config.minDate)
      self2.mobileInput.min = self2.formatDate(self2.config.minDate, "Y-m-d");
    if (self2.config.maxDate)
      self2.mobileInput.max = self2.formatDate(self2.config.maxDate, "Y-m-d");
    if (self2.input.getAttribute("step"))
      self2.mobileInput.step = String(self2.input.getAttribute("step"));
    self2.input.type = "hidden";
    if (self2.altInput !== void 0)
      self2.altInput.type = "hidden";
    try {
      if (self2.input.parentNode)
        self2.input.parentNode.insertBefore(self2.mobileInput, self2.input.nextSibling);
    } catch (_a2) {
    }
    bind(self2.mobileInput, "change", (e) => {
      self2.setDate(getEventTarget(e).value, false, self2.mobileFormatStr);
      triggerEvent("onChange");
      triggerEvent("onClose");
    });
  }
  function toggle(e) {
    if (self2.isOpen === true)
      return self2.close();
    self2.open(e);
  }
  function triggerEvent(event, data2) {
    if (self2.config === void 0)
      return;
    const hooks = self2.config[event];
    if (hooks !== void 0 && hooks.length > 0) {
      for (let i = 0; hooks[i] && i < hooks.length; i++)
        hooks[i](self2.selectedDates, self2.input.value, self2, data2);
    }
    if (event === "onChange") {
      self2.input.dispatchEvent(createEvent("change"));
      self2.input.dispatchEvent(createEvent("input"));
    }
  }
  function createEvent(name) {
    const e = document.createEvent("Event");
    e.initEvent(name, true, true);
    return e;
  }
  function isDateSelected(date) {
    for (let i = 0; i < self2.selectedDates.length; i++) {
      if (compareDates(self2.selectedDates[i], date) === 0)
        return "" + i;
    }
    return false;
  }
  function isDateInRange(date) {
    if (self2.config.mode !== "range" || self2.selectedDates.length < 2)
      return false;
    return compareDates(date, self2.selectedDates[0]) >= 0 && compareDates(date, self2.selectedDates[1]) <= 0;
  }
  function updateNavigationCurrentMonth() {
    if (self2.config.noCalendar || self2.isMobile || !self2.monthNav)
      return;
    self2.yearElements.forEach((yearElement, i) => {
      const d2 = new Date(self2.currentYear, self2.currentMonth, 1);
      d2.setMonth(self2.currentMonth + i);
      if (self2.config.showMonths > 1 || self2.config.monthSelectorType === "static") {
        self2.monthElements[i].textContent = monthToStr(d2.getMonth(), self2.config.shorthandCurrentMonth, self2.l10n) + " ";
      } else {
        self2.monthsDropdownContainer.value = d2.getMonth().toString();
      }
      yearElement.value = d2.getFullYear().toString();
    });
    self2._hidePrevMonthArrow = self2.config.minDate !== void 0 && (self2.currentYear === self2.config.minDate.getFullYear() ? self2.currentMonth <= self2.config.minDate.getMonth() : self2.currentYear < self2.config.minDate.getFullYear());
    self2._hideNextMonthArrow = self2.config.maxDate !== void 0 && (self2.currentYear === self2.config.maxDate.getFullYear() ? self2.currentMonth + 1 > self2.config.maxDate.getMonth() : self2.currentYear > self2.config.maxDate.getFullYear());
  }
  function getDateStr(format2) {
    return self2.selectedDates.map((dObj) => self2.formatDate(dObj, format2)).filter((d2, i, arr) => self2.config.mode !== "range" || self2.config.enableTime || arr.indexOf(d2) === i).join(self2.config.mode !== "range" ? self2.config.conjunction : self2.l10n.rangeSeparator);
  }
  function updateValue(triggerChange2 = true) {
    if (self2.mobileInput !== void 0 && self2.mobileFormatStr) {
      self2.mobileInput.value = self2.latestSelectedDateObj !== void 0 ? self2.formatDate(self2.latestSelectedDateObj, self2.mobileFormatStr) : "";
    }
    self2.input.value = getDateStr(self2.config.dateFormat);
    if (self2.altInput !== void 0) {
      self2.altInput.value = getDateStr(self2.config.altFormat);
    }
    if (triggerChange2 !== false)
      triggerEvent("onValueUpdate");
  }
  function onMonthNavClick(e) {
    const eventTarget = getEventTarget(e);
    const isPrevMonth = self2.prevMonthNav.contains(eventTarget);
    const isNextMonth = self2.nextMonthNav.contains(eventTarget);
    if (isPrevMonth || isNextMonth) {
      changeMonth(isPrevMonth ? -1 : 1);
    } else if (self2.yearElements.indexOf(eventTarget) >= 0) {
      eventTarget.select();
    } else if (eventTarget.classList.contains("arrowUp")) {
      self2.changeYear(self2.currentYear + 1);
    } else if (eventTarget.classList.contains("arrowDown")) {
      self2.changeYear(self2.currentYear - 1);
    }
  }
  function timeWrapper(e) {
    e.preventDefault();
    const isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
    if (self2.amPM !== void 0 && eventTarget === self2.amPM) {
      self2.amPM.textContent = self2.l10n.amPM[int(self2.amPM.textContent === self2.l10n.amPM[0])];
    }
    const min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
    let newValue = curValue + step * delta;
    if (typeof input.value !== "undefined" && input.value.length === 2) {
      const isHourElem = input === self2.hourElement, isMinuteElem = input === self2.minuteElement;
      if (newValue < min) {
        newValue = max + newValue + int(!isHourElem) + (int(isHourElem) && int(!self2.amPM));
        if (isMinuteElem)
          incrementNumInput(void 0, -1, self2.hourElement);
      } else if (newValue > max) {
        newValue = input === self2.hourElement ? newValue - max - int(!self2.amPM) : min;
        if (isMinuteElem)
          incrementNumInput(void 0, 1, self2.hourElement);
      }
      if (self2.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) {
        self2.amPM.textContent = self2.l10n.amPM[int(self2.amPM.textContent === self2.l10n.amPM[0])];
      }
      input.value = pad(newValue);
    }
  }
  init2();
  return self2;
}
function _flatpickr(nodeList, config) {
  const nodes = Array.prototype.slice.call(nodeList).filter((x) => x instanceof HTMLElement);
  const instances = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    try {
      if (node.getAttribute("data-fp-omit") !== null)
        continue;
      if (node._flatpickr !== void 0) {
        node._flatpickr.destroy();
        node._flatpickr = void 0;
      }
      node._flatpickr = FlatpickrInstance(node, config || {});
      instances.push(node._flatpickr);
    } catch (e) {
      console.error(e);
    }
  }
  return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
  HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config) {
    return _flatpickr(this, config);
  };
  HTMLElement.prototype.flatpickr = function(config) {
    return _flatpickr([this], config);
  };
}
var flatpickr = function(selector, config) {
  if (typeof selector === "string") {
    return _flatpickr(window.document.querySelectorAll(selector), config);
  } else if (selector instanceof Node) {
    return _flatpickr([selector], config);
  } else {
    return _flatpickr(selector, config);
  }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
  en: Object.assign({}, english),
  default: Object.assign({}, english)
};
flatpickr.localize = (l10n) => {
  flatpickr.l10ns.default = Object.assign(Object.assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = (config) => {
  flatpickr.defaultConfig = Object.assign(Object.assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
  jQuery.fn.flatpickr = function(config) {
    return _flatpickr(this, config);
  };
}
Date.prototype.fp_incr = function(days) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
  window.flatpickr = flatpickr;
}
var CheckmarkFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "CheckmarkFilled16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 16 16" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"}"></path><path d="${"M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var CheckmarkFilled16$1 = CheckmarkFilled16;
var Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let spinnerRadius;
  let $$restProps = compute_rest_props($$props, ["small", "active", "withOverlay", "description", "id"]);
  let { small = false } = $$props;
  let { active = true } = $$props;
  let { withOverlay = true } = $$props;
  let { description = "Active loading indicator" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.withOverlay === void 0 && $$bindings.withOverlay && withOverlay !== void 0)
    $$bindings.withOverlay(withOverlay);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  spinnerRadius = small ? "42" : "44";
  return `${withOverlay ? `<div${spread([escape_object($$restProps)], "bx--loading-overlay " + (!active ? "bx--loading-overlay--stop" : ""))}><div aria-atomic="${"true"}"${add_attribute("aria-labelledby", id, 0)}${add_attribute("aria-live", active ? "assertive" : "off", 0)}${add_classes([
    "bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : "")
  ].join(" ").trim())}>
      <label${add_attribute("id", id, 0)}${add_classes(["bx--visually-hidden"].join(" ").trim())}>${escape(description)}</label>
      <svg viewBox="${"0 0 100 100"}"${add_classes(["bx--loading__svg"].join(" ").trim())}><title>${escape(description)}</title>${small ? `<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes(["bx--loading__background"].join(" ").trim())}></circle>` : ``}<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes(["bx--loading__stroke"].join(" ").trim())}></circle></svg></div></div>` : `<div${spread([
    { "aria-atomic": "true" },
    {
      "aria-labelledby": escape_attribute_value(id)
    },
    {
      "aria-live": escape_attribute_value(active ? "assertive" : "off")
    },
    escape_object($$restProps)
  ], "bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : ""))}>
    <label${add_attribute("id", id, 0)}${add_classes(["bx--visually-hidden"].join(" ").trim())}>${escape(description)}</label>
    <svg viewBox="${"0 0 100 100"}"${add_classes(["bx--loading__svg"].join(" ").trim())}><title>${escape(description)}</title>${small ? `<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes(["bx--loading__background"].join(" ").trim())}></circle>` : ``}<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes(["bx--loading__stroke"].join(" ").trim())}></circle></svg></div>`}`;
});
var FileUploaderButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "accept",
    "multiple",
    "disabled",
    "disableLabelChanges",
    "kind",
    "labelText",
    "role",
    "tabindex",
    "id",
    "name",
    "ref"
  ]);
  let { accept = [] } = $$props;
  let { multiple = false } = $$props;
  let { disabled = false } = $$props;
  let { disableLabelChanges = false } = $$props;
  let { kind = "primary" } = $$props;
  let { labelText = "Add file" } = $$props;
  let { role = "button" } = $$props;
  let { tabindex = "0" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = "" } = $$props;
  let { ref = null } = $$props;
  if ($$props.accept === void 0 && $$bindings.accept && accept !== void 0)
    $$bindings.accept(accept);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.disableLabelChanges === void 0 && $$bindings.disableLabelChanges && disableLabelChanges !== void 0)
    $$bindings.disableLabelChanges(disableLabelChanges);
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<label${add_attribute("aria-disabled", disabled, 0)}${add_attribute("for", id, 0)}${add_attribute("tabindex", disabled ? "-1" : tabindex, 0)} class="${[
    escape(kind && `bx--btn--${kind}`),
    "bx--btn bx--btn--sm " + (disabled ? "bx--btn--disabled" : "")
  ].join(" ").trim()}"><span${add_attribute("role", role, 0)}>${slots.labelText ? slots.labelText({}) : `
      ${escape(labelText)}
    `}</span></label>
<input${spread([
    { type: "file" },
    { tabindex: "-1" },
    { accept: escape_attribute_value(accept) },
    { disabled: disabled || null },
    { id: escape_attribute_value(id) },
    { multiple: multiple || null },
    { name: escape_attribute_value(name) },
    escape_object($$restProps)
  ], "bx--visually-hidden")}>`;
});
var Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `
<form${spread([escape_object($$restProps)], "bx--form")}>${slots.default ? slots.default({}) : ``}</form>`;
});
var FluidForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  setContext("Form", { isFluid: true });
  return `${validate_component(Form, "Form").$$render($$result, Object.assign($$restProps, {
    class: "bx--form--fluid " + $$restProps.class
  }), {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
var Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "condensed",
    "narrow",
    "fullWidth",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding"
  ]);
  let { as = false } = $$props;
  let { condensed = false } = $$props;
  let { narrow = false } = $$props;
  let { fullWidth = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
    $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
    $$bindings.narrow(narrow);
  if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0)
    $$bindings.fullWidth(fullWidth);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  props = __spreadProps(__spreadValues({}, $$restProps), {
    class: [
      $$restProps.class,
      "bx--grid",
      condensed && "bx--grid--condensed",
      narrow && "bx--grid--narrow",
      fullWidth && "bx--grid--full-width",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  });
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)])}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
var Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, ["as", "condensed", "narrow", "noGutter", "noGutterLeft", "noGutterRight", "padding"]);
  let { as = false } = $$props;
  let { condensed = false } = $$props;
  let { narrow = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
    $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
    $$bindings.narrow(narrow);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  props = __spreadProps(__spreadValues({}, $$restProps), {
    class: [
      $$restProps.class,
      "bx--row",
      condensed && "bx--row--condensed",
      narrow && "bx--row--narrow",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  });
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)])}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
var Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let columnClass;
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding",
    "aspectRatio",
    "sm",
    "md",
    "lg",
    "xlg",
    "max"
  ]);
  let { as = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  let { aspectRatio = void 0 } = $$props;
  let { sm = void 0 } = $$props;
  let { md = void 0 } = $$props;
  let { lg = void 0 } = $$props;
  let { xlg = void 0 } = $$props;
  let { max = void 0 } = $$props;
  const breakpoints = ["sm", "md", "lg", "xlg", "max"];
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.aspectRatio === void 0 && $$bindings.aspectRatio && aspectRatio !== void 0)
    $$bindings.aspectRatio(aspectRatio);
  if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0)
    $$bindings.sm(sm);
  if ($$props.md === void 0 && $$bindings.md && md !== void 0)
    $$bindings.md(md);
  if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0)
    $$bindings.lg(lg);
  if ($$props.xlg === void 0 && $$bindings.xlg && xlg !== void 0)
    $$bindings.xlg(xlg);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  columnClass = [sm, md, lg, xlg, max].map((breakpoint, i) => {
    const name = breakpoints[i];
    if (breakpoint === true) {
      return `bx--col-${name}`;
    } else if (typeof breakpoint === "number") {
      return `bx--col-${name}-${breakpoint}`;
    } else if (typeof breakpoint === "object") {
      let bp = [];
      if (typeof breakpoint.span === "number") {
        bp = [...bp, `bx--col-${name}-${breakpoint.span}`];
      } else if (breakpoint.span === true) {
        bp = [...bp, `bx--col-${name}`];
      }
      if (typeof breakpoint.offset === "number") {
        bp = [...bp, `bx--offset-${name}-${breakpoint.offset}`];
      }
      return bp.join(" ");
    }
  }).filter(Boolean).join(" ");
  props = __spreadProps(__spreadValues({}, $$restProps), {
    class: [
      $$restProps.class,
      columnClass,
      !columnClass && "bx--col",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      aspectRatio && `bx--aspect-ratio bx--aspect-ratio--${aspectRatio}`,
      padding && "bx--col-padding"
    ].filter(Boolean).join(" ")
  });
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)])}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
var ErrorFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "ErrorFilled16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 16 16" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M8,1C4.1,1,1,4.1,1,8s3.1,7,7,7s7-3.1,7-7S11.9,1,8,1z M10.7,11.5L4.5,5.3l0.8-0.8l6.2,6.2L10.7,11.5z"}"></path><path fill="${"none"}" d="${"M10.7,11.5L4.5,5.3l0.8-0.8l6.2,6.2L10.7,11.5z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var ErrorFilled16$1 = ErrorFilled16;
var InlineLoading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["status", "description", "iconDescription", "successDelay"]);
  let { status = "active" } = $$props;
  let { description = void 0 } = $$props;
  let { iconDescription = void 0 } = $$props;
  let { successDelay = 1500 } = $$props;
  createEventDispatcher();
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.successDelay === void 0 && $$bindings.successDelay && successDelay !== void 0)
    $$bindings.successDelay(successDelay);
  return `
<div${spread([{ "aria-live": "assertive" }, escape_object($$restProps)], "bx--inline-loading")}><div${add_classes(["bx--inline-loading__animation"].join(" ").trim())}>${status === "error" ? `${validate_component(ErrorFilled16$1, "ErrorFilled16").$$render($$result, {
    class: "bx--inline-loading--error",
    title: iconDescription
  }, {}, {})}` : `${status === "finished" ? `${validate_component(CheckmarkFilled16$1, "CheckmarkFilled16").$$render($$result, {
    class: "bx--inline-loading__checkmark-container",
    title: iconDescription
  }, {}, {})}` : `${status === "inactive" || status === "active" ? `${validate_component(Loading, "Loading").$$render($$result, {
    small: true,
    description: iconDescription,
    withOverlay: false,
    active: status === "active"
  }, {}, {})}` : ``}`}`}</div>
  ${description ? `<div${add_classes(["bx--inline-loading__text"].join(" ").trim())}>${escape(description)}</div>` : ``}</div>`;
});
var Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let modalLabelId;
  let modalHeadingId;
  let modalBodyId;
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "open",
    "danger",
    "alert",
    "passiveModal",
    "modalHeading",
    "modalLabel",
    "modalAriaLabel",
    "iconDescription",
    "hasForm",
    "hasScrollingContent",
    "primaryButtonText",
    "primaryButtonDisabled",
    "shouldSubmitOnEnter",
    "secondaryButtonText",
    "secondaryButtons",
    "selectorPrimaryFocus",
    "preventCloseOnClickOutside",
    "id",
    "ref"
  ]);
  let { size = void 0 } = $$props;
  let { open: open2 = false } = $$props;
  let { danger = false } = $$props;
  let { alert = false } = $$props;
  let { passiveModal = false } = $$props;
  let { modalHeading = void 0 } = $$props;
  let { modalLabel = void 0 } = $$props;
  let { modalAriaLabel = void 0 } = $$props;
  let { iconDescription = "Close the modal" } = $$props;
  let { hasForm = false } = $$props;
  let { hasScrollingContent = false } = $$props;
  let { primaryButtonText = "" } = $$props;
  let { primaryButtonDisabled = false } = $$props;
  let { shouldSubmitOnEnter = true } = $$props;
  let { secondaryButtonText = "" } = $$props;
  let { secondaryButtons = [] } = $$props;
  let { selectorPrimaryFocus = "[data-modal-primary-focus]" } = $$props;
  let { preventCloseOnClickOutside = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  createEventDispatcher();
  let buttonRef = null;
  let innerModal = null;
  let alertDialogProps = {};
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open2 !== void 0)
    $$bindings.open(open2);
  if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
    $$bindings.danger(danger);
  if ($$props.alert === void 0 && $$bindings.alert && alert !== void 0)
    $$bindings.alert(alert);
  if ($$props.passiveModal === void 0 && $$bindings.passiveModal && passiveModal !== void 0)
    $$bindings.passiveModal(passiveModal);
  if ($$props.modalHeading === void 0 && $$bindings.modalHeading && modalHeading !== void 0)
    $$bindings.modalHeading(modalHeading);
  if ($$props.modalLabel === void 0 && $$bindings.modalLabel && modalLabel !== void 0)
    $$bindings.modalLabel(modalLabel);
  if ($$props.modalAriaLabel === void 0 && $$bindings.modalAriaLabel && modalAriaLabel !== void 0)
    $$bindings.modalAriaLabel(modalAriaLabel);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.hasForm === void 0 && $$bindings.hasForm && hasForm !== void 0)
    $$bindings.hasForm(hasForm);
  if ($$props.hasScrollingContent === void 0 && $$bindings.hasScrollingContent && hasScrollingContent !== void 0)
    $$bindings.hasScrollingContent(hasScrollingContent);
  if ($$props.primaryButtonText === void 0 && $$bindings.primaryButtonText && primaryButtonText !== void 0)
    $$bindings.primaryButtonText(primaryButtonText);
  if ($$props.primaryButtonDisabled === void 0 && $$bindings.primaryButtonDisabled && primaryButtonDisabled !== void 0)
    $$bindings.primaryButtonDisabled(primaryButtonDisabled);
  if ($$props.shouldSubmitOnEnter === void 0 && $$bindings.shouldSubmitOnEnter && shouldSubmitOnEnter !== void 0)
    $$bindings.shouldSubmitOnEnter(shouldSubmitOnEnter);
  if ($$props.secondaryButtonText === void 0 && $$bindings.secondaryButtonText && secondaryButtonText !== void 0)
    $$bindings.secondaryButtonText(secondaryButtonText);
  if ($$props.secondaryButtons === void 0 && $$bindings.secondaryButtons && secondaryButtons !== void 0)
    $$bindings.secondaryButtons(secondaryButtons);
  if ($$props.selectorPrimaryFocus === void 0 && $$bindings.selectorPrimaryFocus && selectorPrimaryFocus !== void 0)
    $$bindings.selectorPrimaryFocus(selectorPrimaryFocus);
  if ($$props.preventCloseOnClickOutside === void 0 && $$bindings.preventCloseOnClickOutside && preventCloseOnClickOutside !== void 0)
    $$bindings.preventCloseOnClickOutside(preventCloseOnClickOutside);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  modalLabelId = `bx--modal-header__label--modal-${id}`;
  modalHeadingId = `bx--modal-header__heading--modal-${id}`;
  modalBodyId = `bx--modal-body--${id}`;
  ariaLabel = modalLabel || $$props["aria-label"] || modalAriaLabel || modalHeading;
  {
    if (alert) {
      if (passiveModal) {
        alertDialogProps.role = "alert";
      }
      if (!passiveModal) {
        alertDialogProps.role = "alertdialog";
        alertDialogProps["aria-describedby"] = modalBodyId;
      }
    }
  }
  return `
<div${spread([
    { role: "presentation" },
    { id: escape_attribute_value(id) },
    escape_object($$restProps)
  ], "bx--modal " + (!passiveModal ? "bx--modal-tall" : "") + " " + (open2 ? "is-visible" : "") + " " + (danger ? "bx--modal--danger" : ""))}${add_attribute("this", ref, 0)}><div${spread([
    { role: "dialog" },
    { tabindex: "-1" },
    escape_object(alertDialogProps),
    { "aria-modal": "true" },
    {
      "aria-label": escape_attribute_value(ariaLabel)
    }
  ], "bx--modal-container " + (size === "xs" ? "bx--modal-container--xs" : "") + " " + (size === "sm" ? "bx--modal-container--sm" : "") + " " + (size === "lg" ? "bx--modal-container--lg" : ""))}${add_attribute("this", innerModal, 0)}><div${add_classes(["bx--modal-header"].join(" ").trim())}>${passiveModal ? `<button type="${"button"}"${add_attribute("aria-label", iconDescription, 0)}${add_attribute("title", iconDescription, 0)}${add_classes(["bx--modal-close"].join(" ").trim())}${add_attribute("this", buttonRef, 0)}>${validate_component(Close20$1, "Close20").$$render($$result, {
    "aria-label": iconDescription,
    class: "bx--modal-close__icon"
  }, {}, {})}</button>` : ``}
      ${modalLabel ? `<h2${add_attribute("id", modalLabelId, 0)}${add_classes(["bx--modal-header__label"].join(" ").trim())}>${slots.label ? slots.label({}) : `${escape(modalLabel)}`}</h2>` : ``}
      <h3${add_attribute("id", modalHeadingId, 0)}${add_classes(["bx--modal-header__heading"].join(" ").trim())}>${slots.heading ? slots.heading({}) : `${escape(modalHeading)}`}</h3>
      ${!passiveModal ? `<button type="${"button"}"${add_attribute("aria-label", iconDescription, 0)}${add_attribute("title", iconDescription, 0)}${add_classes(["bx--modal-close"].join(" ").trim())}${add_attribute("this", buttonRef, 0)}>${validate_component(Close20$1, "Close20").$$render($$result, {
    "aria-label": iconDescription,
    class: "bx--modal-close__icon"
  }, {}, {})}</button>` : ``}</div>
    <div${add_attribute("id", modalBodyId, 0)}${add_attribute("tabindex", hasScrollingContent ? "0" : void 0, 0)}${add_attribute("role", hasScrollingContent ? "region" : void 0, 0)}${add_attribute("aria-label", hasScrollingContent ? ariaLabel : void 0, 0)}${add_attribute("aria-labelledby", modalLabel ? modalLabelId : modalHeadingId, 0)}${add_classes([
    "bx--modal-content " + (hasForm ? "bx--modal-content--with-form" : "") + " " + (hasScrollingContent ? "bx--modal-scroll-content" : "")
  ].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div>
    ${hasScrollingContent ? `<div${add_classes(["bx--modal-content--overflow-indicator"].join(" ").trim())}></div>` : ``}
    ${!passiveModal ? `<div${add_classes([
    "bx--modal-footer " + (secondaryButtons.length === 2 ? "bx--modal-footer--three-button" : "")
  ].join(" ").trim())}>${secondaryButtons.length > 0 ? `${each(secondaryButtons, (button) => `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
    default: () => `${escape(button.text)}
            `
  })}`)}` : `${secondaryButtonText ? `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
    default: () => `${escape(secondaryButtonText)}`
  })}` : ``}`}
        ${validate_component(Button, "Button").$$render($$result, {
    kind: danger ? "danger" : "primary",
    disabled: primaryButtonDisabled
  }, {}, {
    default: () => `${escape(primaryButtonText)}`
  })}</div>` : ``}</div></div>`;
});
var NotificationButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["notificationType", "icon", "title", "iconDescription"]);
  let { notificationType = "toast" } = $$props;
  let { icon = Close20$1 } = $$props;
  let { title = void 0 } = $$props;
  let { iconDescription = "Close icon" } = $$props;
  if ($$props.notificationType === void 0 && $$bindings.notificationType && notificationType !== void 0)
    $$bindings.notificationType(notificationType);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  return `
<button${spread([
    { type: "button" },
    {
      "aria-label": escape_attribute_value(iconDescription)
    },
    {
      title: escape_attribute_value(iconDescription)
    },
    escape_object($$restProps)
  ], (notificationType === "toast" ? "bx--toast-notification__close-button" : "") + " " + (notificationType === "inline" ? "bx--inline-notification__close-button" : ""))}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
    title,
    class: "bx--" + notificationType + "-notification__close-icon"
  }, {}, {})}</button>`;
});
var CheckmarkFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "CheckmarkFilled20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 20 20" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M10,1c-4.9,0-9,4.1-9,9s4.1,9,9,9s9-4,9-9S15,1,10,1z M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"}"></path><path fill="${"none"}" d="${"M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var CheckmarkFilled20$1 = CheckmarkFilled20;
var ErrorFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "ErrorFilled20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 20 20" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"}"></path><path d="${"M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var ErrorFilled20$1 = ErrorFilled20;
var InformationFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    {
      "data-carbon-icon": "InformationFilled20"
    },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path fill="${"none"}" d="${"M16,8a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,13.875H17.125v-8H13v2.25h1.875v5.75H12v2.25h8Z"}" data-icon-path="${"inner-path"}"></path><path d="${"M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,6a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,16.125H12v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var InformationFilled20$1 = InformationFilled20;
var InformationSquareFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    {
      "data-carbon-icon": "InformationSquareFilled20"
    },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path fill="${"none"}" d="${"M16,8a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,13.875H17.125v-8H13v2.25h1.875v5.75H12v2.25h8Z"}" data-icon-path="${"inner-path"}"></path><path d="${"M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM16,8a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,16.125H12v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var InformationSquareFilled20$1 = InformationSquareFilled20;
var WarningFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "WarningFilled20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 20 20" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1	s1,0.4,1,1S10.6,16,10,16z"}"></path><path d="${"M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var WarningFilled20$1 = WarningFilled20;
var WarningAltFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "WarningAltFilled20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path fill="${"none"}" d="${"M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z"}" data-icon-path="${"inner-path"}"></path><path d="${"M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"}"></path><path d="${"M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var WarningAltFilled20$1 = WarningAltFilled20;
var NotificationIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { kind = "error" } = $$props;
  let { notificationType = "toast" } = $$props;
  let { iconDescription = "Closes notification" } = $$props;
  const icons = {
    error: ErrorFilled20$1,
    "info-square": InformationSquareFilled20$1,
    info: InformationFilled20$1,
    success: CheckmarkFilled20$1,
    warning: WarningFilled20$1,
    "warning-alt": WarningAltFilled20$1
  };
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.notificationType === void 0 && $$bindings.notificationType && notificationType !== void 0)
    $$bindings.notificationType(notificationType);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  return `${validate_component(icons[kind] || missing_component, "svelte:component").$$render($$result, {
    title: iconDescription,
    class: "bx--" + notificationType + "-notification__icon"
  }, {}, {})}`;
});
var NotificationTextDetails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { notificationType = "toast" } = $$props;
  let { title = "Title" } = $$props;
  let { subtitle = "" } = $$props;
  let { caption = "Caption" } = $$props;
  if ($$props.notificationType === void 0 && $$bindings.notificationType && notificationType !== void 0)
    $$bindings.notificationType(notificationType);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  return `${notificationType === "toast" ? `<div${add_classes(["bx--toast-notification__details"].join(" ").trim())}><h3${add_classes(["bx--toast-notification__title"].join(" ").trim())}>${escape(title)}</h3>
    <div${add_classes(["bx--toast-notification__subtitle"].join(" ").trim())}>${escape(subtitle)}</div>
    <div${add_classes(["bx--toast-notification__caption"].join(" ").trim())}>${escape(caption)}</div>
    ${slots.default ? slots.default({}) : ``}</div>` : ``}

${notificationType === "inline" ? `<div${add_classes(["bx--inline-notification__text-wrapper"].join(" ").trim())}><p${add_classes(["bx--inline-notification__title"].join(" ").trim())}>${escape(title)}</p>
    <div${add_classes(["bx--inline-notification__subtitle"].join(" ").trim())}>${escape(subtitle)}</div>
    ${slots.default ? slots.default({}) : ``}</div>` : ``}`;
});
var ToastNotification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "lowContrast",
    "timeout",
    "role",
    "title",
    "subtitle",
    "caption",
    "iconDescription",
    "hideCloseButton"
  ]);
  let { kind = "error" } = $$props;
  let { lowContrast = false } = $$props;
  let { timeout = 0 } = $$props;
  let { role = "alert" } = $$props;
  let { title = "" } = $$props;
  let { subtitle = "" } = $$props;
  let { caption = "" } = $$props;
  let { iconDescription = "Closes notification" } = $$props;
  let { hideCloseButton = false } = $$props;
  createEventDispatcher();
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.lowContrast === void 0 && $$bindings.lowContrast && lowContrast !== void 0)
    $$bindings.lowContrast(lowContrast);
  if ($$props.timeout === void 0 && $$bindings.timeout && timeout !== void 0)
    $$bindings.timeout(timeout);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.hideCloseButton === void 0 && $$bindings.hideCloseButton && hideCloseButton !== void 0)
    $$bindings.hideCloseButton(hideCloseButton);
  return `
${`<div${spread([
    { role: escape_attribute_value(role) },
    { kind: escape_attribute_value(kind) },
    escape_object($$restProps)
  ], "bx--toast-notification " + (lowContrast ? "bx--toast-notification--low-contrast" : "") + " " + (kind === "error" ? "bx--toast-notification--error" : "") + " " + (kind === "info" ? "bx--toast-notification--info" : "") + " " + (kind === "info-square" ? "bx--toast-notification--info-square" : "") + " " + (kind === "success" ? "bx--toast-notification--success" : "") + " " + (kind === "warning" ? "bx--toast-notification--warning" : "") + " " + (kind === "warning-alt" ? "bx--toast-notification--warning-alt" : ""))}>${validate_component(NotificationIcon, "NotificationIcon").$$render($$result, { kind }, {}, {})}
    ${validate_component(NotificationTextDetails, "NotificationTextDetails").$$render($$result, { title, subtitle, caption }, {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}
    ${!hideCloseButton ? `${validate_component(NotificationButton, "NotificationButton").$$render($$result, { iconDescription }, {}, {})}` : ``}</div>`}`;
});
var Add16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Add16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Add16$1 = Add16;
var Subtract16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Subtract16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M8 15H24V17H8z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Subtract16$1 = Subtract16;
var EditOff16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "EditOff16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M30 28.6L3.4 2 2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30 30 28.6zM9.6 26H6v-3.6l7.5-7.5 3.6 3.6L9.6 26zM29.4 6.2L29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l0 0 0 0-8 8 1.4 1.4L20 8.4l3.6 3.6L20 15.6l1.4 1.4 8-8C30.2 8.2 30.2 7 29.4 6.2L29.4 6.2zM25 10.6L21.4 7l3-3L28 7.6 25 10.6z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var EditOff16$1 = EditOff16;
var NumberInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let incrementLabel;
  let decrementLabel;
  let error2;
  let errorId;
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "step",
    "max",
    "min",
    "light",
    "readonly",
    "mobile",
    "allowEmpty",
    "disabled",
    "hideSteppers",
    "iconDescription",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "label",
    "hideLabel",
    "translateWithId",
    "translationIds",
    "id",
    "name",
    "ref"
  ]);
  let { size = void 0 } = $$props;
  let { value = "" } = $$props;
  let { step = 1 } = $$props;
  let { max = void 0 } = $$props;
  let { min = void 0 } = $$props;
  let { light = false } = $$props;
  let { readonly = false } = $$props;
  let { mobile = false } = $$props;
  let { allowEmpty = false } = $$props;
  let { disabled = false } = $$props;
  let { hideSteppers = false } = $$props;
  let { iconDescription = "" } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { helperText = "" } = $$props;
  let { label = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { translateWithId = (id2) => defaultTranslations[id2] } = $$props;
  const translationIds = {
    increment: "increment",
    decrement: "decrement"
  };
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  const defaultTranslations = {
    [translationIds.increment]: "Increment number",
    [translationIds.decrement]: "Decrement number"
  };
  const dispatch = createEventDispatcher();
  let inputValue = value;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.mobile === void 0 && $$bindings.mobile && mobile !== void 0)
    $$bindings.mobile(mobile);
  if ($$props.allowEmpty === void 0 && $$bindings.allowEmpty && allowEmpty !== void 0)
    $$bindings.allowEmpty(allowEmpty);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.hideSteppers === void 0 && $$bindings.hideSteppers && hideSteppers !== void 0)
    $$bindings.hideSteppers(hideSteppers);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
    $$bindings.translationIds(translationIds);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  value = Number(inputValue);
  {
    dispatch("change", value);
  }
  incrementLabel = translateWithId("increment");
  decrementLabel = translateWithId("decrement");
  error2 = invalid || !allowEmpty && value === "" || value > max || value < min;
  errorId = `error-${id}`;
  ariaLabel = $$props["aria-label"] || "Numeric input field with increment and decrement buttons";
  return `
<div${add_classes(["bx--form-item"].join(" ").trim())}><div${add_attribute("data-invalid", error2 || void 0, 0)} class="${[
    escape(size && `bx--number--${size}`),
    "bx--number bx--number--helpertext " + (readonly ? "bx--number--readonly" : "") + " " + (light ? "bx--number--light" : "") + " " + (hideLabel ? "bx--number--nolabel" : "") + " " + (hideSteppers ? "bx--number--nosteppers" : "") + " " + (mobile ? "bx--number--mobile" : "")
  ].join(" ").trim()}">${mobile ? `${label ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (disabled ? "bx--label--disabled" : "") + " " + (hideLabel ? "bx--visually-hidden" : "")
  ].join(" ").trim())}>${slots.label ? slots.label({}) : `${escape(label)}`}</label>` : ``}
      <div${add_classes([
    "bx--number__input-wrapper " + (!invalid && warn ? "bx--number__input-wrapper--warning" : "")
  ].join(" ").trim())}><button type="${"button"}" aria-live="${"polite"}" aria-atomic="${"true"}"${add_attribute("title", decrementLabel, 0)}${add_attribute("aria-label", decrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--number__control-btn down-icon"].join(" ").trim())}>${validate_component(Subtract16$1, "Subtract16").$$render($$result, { class: "down-icon" }, {}, {})}</button>
        <input${spread([
    { type: "number" },
    { pattern: "[0-9]*" },
    {
      "aria-label": escape_attribute_value(label ? void 0 : ariaLabel)
    },
    { disabled: disabled || null },
    { id: escape_attribute_value(id) },
    { name: escape_attribute_value(name) },
    { max: escape_attribute_value(max) },
    { min: escape_attribute_value(min) },
    { step: escape_attribute_value(step) },
    { value: escape_attribute_value(value) },
    { readonly: readonly || null },
    escape_object($$restProps)
  ])}${add_attribute("this", ref, 0)}>
        <button type="${"button"}" aria-live="${"polite"}" aria-atomic="${"true"}"${add_attribute("title", incrementLabel, 0)}${add_attribute("aria-label", incrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--number__control-btn up-icon"].join(" ").trim())}>${validate_component(Add16$1, "Add16").$$render($$result, { class: "up-icon" }, {}, {})}</button></div>` : `${label ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (disabled ? "bx--label--disabled" : "") + " " + (hideLabel ? "bx--visually-hidden" : "")
  ].join(" ").trim())}>${slots.label ? slots.label({}) : `${escape(label)}`}</label>` : ``}
      <div${add_classes([
    "bx--number__input-wrapper " + (!invalid && warn ? "bx--number__input-wrapper--warning" : "")
  ].join(" ").trim())}><input${spread([
    { type: "number" },
    { pattern: "[0-9]*" },
    {
      "aria-describedby": escape_attribute_value(errorId)
    },
    {
      "data-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-label": escape_attribute_value(label ? void 0 : ariaLabel)
    },
    { disabled: disabled || null },
    { id: escape_attribute_value(id) },
    { name: escape_attribute_value(name) },
    { max: escape_attribute_value(max) },
    { min: escape_attribute_value(min) },
    { step: escape_attribute_value(step) },
    { value: escape_attribute_value(value) },
    { readonly: readonly || null },
    escape_object($$restProps)
  ])}${add_attribute("this", ref, 0)}>
        ${invalid ? `${validate_component(WarningFilled16$1, "WarningFilled16").$$render($$result, { class: "bx--number__invalid" }, {}, {})}` : ``}
        ${!invalid && warn ? `${validate_component(WarningAltFilled16$1, "WarningAltFilled16").$$render($$result, {
    class: "bx--number__invalid bx--number__invalid--warning"
  }, {}, {})}` : ``}
        ${readonly ? `${validate_component(EditOff16$1, "EditOff16").$$render($$result, { class: "bx--text-input__readonly-icon" }, {}, {})}` : ``}
        ${!hideSteppers ? `<div${add_classes(["bx--number__controls"].join(" ").trim())}><button type="${"button"}" tabindex="${"-1"}"${add_attribute("title", decrementLabel || iconDescription, 0)}${add_attribute("aria-label", decrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--number__control-btn down-icon"].join(" ").trim())}>${validate_component(Subtract16$1, "Subtract16").$$render($$result, { class: "down-icon" }, {}, {})}</button>
            <div${add_classes(["bx--number__rule-divider"].join(" ").trim())}></div>
            <button type="${"button"}" tabindex="${"-1"}"${add_attribute("title", incrementLabel || iconDescription, 0)}${add_attribute("aria-label", incrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--number__control-btn up-icon"].join(" ").trim())}>${validate_component(Add16$1, "Add16").$$render($$result, { class: "up-icon" }, {}, {})}</button>
            <div${add_classes(["bx--number__rule-divider"].join(" ").trim())}></div></div>` : ``}</div>`}
    ${!error2 && !warn && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}
    ${error2 ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
    ${!error2 && warn ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
});
var CaretLeft16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "CaretLeft16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M20 24L10 16 20 8z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var CaretLeft16$1 = CaretLeft16;
var Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorId;
  let $$restProps = compute_rest_props($$props, [
    "selected",
    "size",
    "inline",
    "light",
    "disabled",
    "id",
    "name",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "noLabel",
    "labelText",
    "hideLabel",
    "ref"
  ]);
  let $$unsubscribe_selectedValue;
  let { selected = void 0 } = $$props;
  let { size = void 0 } = $$props;
  let { inline = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { helperText = "" } = $$props;
  let { noLabel = false } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { ref = null } = $$props;
  createEventDispatcher();
  const selectedValue = writable(selected);
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value) => value);
  setContext("Select", { selectedValue });
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.noLabel === void 0 && $$bindings.noLabel && noLabel !== void 0)
    $$bindings.noLabel(noLabel);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  errorId = `error-${id}`;
  {
    selectedValue.set(selected);
  }
  $$unsubscribe_selectedValue();
  return `<div${spread([escape_object($$restProps)], "bx--form-item")}><div${add_classes([
    "bx--select " + (inline ? "bx--select--inline" : "") + " " + (light ? "bx--select--light" : "") + " " + (invalid ? "bx--select--invalid" : "") + " " + (disabled ? "bx--select--disabled" : "") + " " + (warn ? "bx--select--warning" : "")
  ].join(" ").trim())}>${!noLabel ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")
  ].join(" ").trim())}>${slots.labelText ? slots.labelText({}) : `
          ${escape(labelText)}
        `}</label>` : ``}
    ${inline ? `<div${add_classes(["bx--select-input--inline__wrapper"].join(" ").trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes(["bx--select-input__wrapper"].join(" ").trim())}><select${add_attribute("aria-describedby", invalid ? errorId : void 0, 0)}${add_attribute("aria-invalid", invalid || void 0, 0)} ${disabled || void 0 ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("name", name, 0)} class="${[escape(size && `bx--select-input--${size}`), "bx--select-input"].join(" ").trim()}"${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</select>
          ${validate_component(ChevronDown16$1, "ChevronDown16").$$render($$result, { class: "bx--select__arrow" }, {}, {})}
          ${invalid ? `${validate_component(WarningFilled16$1, "WarningFilled16").$$render($$result, { class: "bx--select__invalid-icon" }, {}, {})}` : ``}</div>
        ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}</div>
      ${helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}` : ``}
    ${!inline ? `<div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes(["bx--select-input__wrapper"].join(" ").trim())}><select${add_attribute("id", id, 0)}${add_attribute("name", name, 0)}${add_attribute("aria-describedby", invalid ? errorId : void 0, 0)} ${disabled || void 0 ? "disabled" : ""}${add_attribute("aria-invalid", invalid || void 0, 0)} class="${[escape(size && `bx--select-input--${size}`), "bx--select-input"].join(" ").trim()}"${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</select>
        ${validate_component(ChevronDown16$1, "ChevronDown16").$$render($$result, { class: "bx--select__arrow" }, {}, {})}
        ${invalid ? `${validate_component(WarningFilled16$1, "WarningFilled16").$$render($$result, { class: "bx--select__invalid-icon" }, {}, {})}` : ``}
        ${!invalid && warn ? `${validate_component(WarningAltFilled16$1, "WarningAltFilled16").$$render($$result, {
    class: "bx--select__invalid-icon bx--select__invalid-icon--warning"
  }, {}, {})}` : ``}</div>
      ${!invalid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}
      ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
      ${!invalid && warn ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}` : ``}</div></div>`;
});
var SelectItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "text", "hidden", "disabled"]);
  let { value = "" } = $$props;
  let { text = "" } = $$props;
  let { hidden = false } = $$props;
  let { disabled = false } = $$props;
  const ctx = getContext("Select") || getContext("TimePickerSelect");
  let selected = false;
  const unsubscribe = ctx.selectedValue.subscribe((currentValue) => {
    selected = currentValue === value;
  });
  onDestroy(() => {
    unsubscribe();
  });
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0)
    $$bindings.hidden(hidden);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `<option${add_attribute("value", value, 0)} ${disabled ? "disabled" : ""} ${hidden ? "hidden" : ""} ${selected ? "selected" : ""} class="${[escape($$restProps.class), "bx--select-option"].join(" ").trim()}"${add_attribute("style", $$restProps.style, 0)}>${escape(text || value)}</option>`;
});
var PaginationItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { page: page2 = 0 } = $$props;
  let { active = false } = $$props;
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  return `<li${add_classes(["bx--pagination-nav__list-item"].join(" ").trim())}><button${add_attribute("data-page", page2, 0)}${add_attribute("aria-current", active ? "page" : void 0, 0)}${add_classes([
    "bx--pagination-nav__page " + (active ? "bx--pagination-nav__page--active" : "")
  ].join(" ").trim())}><span${add_classes(["bx--pagination-nav__accessibility-label"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</span>
    ${escape(page2)}</button></li>`;
});
var PaginationOverflow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { fromIndex = 0 } = $$props;
  let { count = 0 } = $$props;
  createEventDispatcher();
  let value = "";
  if ($$props.fromIndex === void 0 && $$bindings.fromIndex && fromIndex !== void 0)
    $$bindings.fromIndex(fromIndex);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  return `${count > 1 ? `<li${add_classes(["bx--pagination-nav__list-item"].join(" ").trim())}><div${add_classes(["bx--pagination-nav__select"].join(" ").trim())}>
      <select aria-label="${"Select Page number"}"${add_attribute("value", value, 0)}${add_classes([
    "bx--pagination-nav__page bx--pagination-nav__page--select"
  ].join(" ").trim())}><option value="${""}" hidden></option>${each(Array.from({ length: count }, (_, i) => i), (i) => `<option${add_attribute("value", fromIndex + i, 0)}${add_attribute("data-page", fromIndex + i + 1, 0)}>${escape(fromIndex + i + 1)}
          </option>`)}</select>
      <div${add_classes(["bx--pagination-nav__select-icon-wrapper"].join(" ").trim())}>${validate_component(OverflowMenuHorizontal16$1, "OverflowMenuHorizontal16").$$render($$result, { class: "bx--pagination-nav__select-icon" }, {}, {})}</div></div></li>` : `${count === 1 ? `${validate_component(PaginationItem, "PaginationItem").$$render($$result, { page: fromIndex + 1 }, {}, {
    default: () => `Page
  `
  })}` : ``}`}`;
});
var MIN = 4;
var PaginationNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fit;
  let startOffset;
  let items;
  let $$restProps = compute_rest_props($$props, ["page", "total", "shown", "loop", "forwardText", "backwardText"]);
  let { page: page2 = 0 } = $$props;
  let { total = 10 } = $$props;
  let { shown = 10 } = $$props;
  let { loop = false } = $$props;
  let { forwardText = "Next page" } = $$props;
  let { backwardText = "Previous page" } = $$props;
  createEventDispatcher();
  let front = 0;
  let back = 0;
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.shown === void 0 && $$bindings.shown && shown !== void 0)
    $$bindings.shown(shown);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
    $$bindings.loop(loop);
  if ($$props.forwardText === void 0 && $$bindings.forwardText && forwardText !== void 0)
    $$bindings.forwardText(forwardText);
  if ($$props.backwardText === void 0 && $$bindings.backwardText && backwardText !== void 0)
    $$bindings.backwardText(backwardText);
  fit = shown >= MIN ? shown : MIN;
  startOffset = fit <= MIN && page2 > 1 ? 0 : 1;
  {
    if (fit >= total) {
      front = 0;
      back = 0;
    }
  }
  {
    if (fit < total) {
      const split = Math.ceil(fit / 2) - 1;
      front = page2 - split + 1;
      back = total - page2 - (fit - split) + 1;
      if (front <= 1) {
        back -= front <= 0 ? Math.abs(front) + 1 : 0;
        front = 0;
      }
      if (back <= 1) {
        front -= back <= 0 ? Math.abs(back) + 1 : 0;
        back = 0;
      }
    }
  }
  items = Array.from({ length: total }).map((e, i) => i).slice(startOffset + front, (back + 1) * -1);
  return `<nav${spread([{ "aria-label": "pagination" }, escape_object($$restProps)], "bx--pagination-nav")}><ul${add_classes(["bx--pagination-nav__list"].join(" ").trim())}><li${add_classes(["bx--pagination-nav__list-item"].join(" ").trim())}>${validate_component(Button, "Button").$$render($$result, {
    hasIconOnly: true,
    kind: "ghost",
    tooltipAlignment: "center",
    tooltipPosition: "bottom",
    iconDescription: backwardText,
    disabled: !loop && page2 === 0,
    icon: CaretLeft16$1
  }, {}, {})}</li>
    ${fit > MIN || fit <= MIN && page2 <= 1 ? `${validate_component(PaginationItem, "PaginationItem").$$render($$result, { page: 1, active: page2 === 0 }, {}, {
    default: () => `${escape(page2 === 0 ? "Active, Page" : "Page")}`
  })}` : ``}
    ${validate_component(PaginationOverflow, "PaginationOverflow").$$render($$result, { fromIndex: startOffset, count: front }, {}, {})}
    ${each(items, (item) => `${validate_component(PaginationItem, "PaginationItem").$$render($$result, { page: item + 1, active: page2 === item }, {}, {
    default: () => `${escape(page2 === item ? "Active, Page" : "Page")}
      `
  })}`)}
    ${validate_component(PaginationOverflow, "PaginationOverflow").$$render($$result, { fromIndex: total - back - 1, count: back }, {}, {})}
    ${total > 1 ? `${validate_component(PaginationItem, "PaginationItem").$$render($$result, { page: total, active: page2 === total - 1 }, {}, {
    default: () => `${escape(page2 === total - 1 ? "Active, Page" : "Page")}`
  })}` : ``}
    <li${add_classes(["bx--pagination-nav__list-item"].join(" ").trim())}>${validate_component(Button, "Button").$$render($$result, {
    hasIconOnly: true,
    kind: "ghost",
    tooltipAlignment: "center",
    tooltipPosition: "bottom",
    iconDescription: forwardText,
    disabled: !loop && page2 === total - 1,
    icon: CaretRight16$1
  }, {}, {})}</li></ul>
  <div aria-live="${"polite"}" aria-atomic="${"true"}"${add_classes(["bx--pagination-nav__accessibility-label"].join(" ").trim())}>Page
    ${escape(page2 + 1)}
    of
    ${escape(total)}</div></nav>`;
});
var TextArea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorId;
  let $$restProps = compute_rest_props($$props, [
    "value",
    "placeholder",
    "cols",
    "rows",
    "light",
    "disabled",
    "helperText",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "id",
    "name",
    "ref"
  ]);
  let { value = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { cols = 50 } = $$props;
  let { rows = 4 } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { helperText = "" } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.cols === void 0 && $$bindings.cols && cols !== void 0)
    $$bindings.cols(cols);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  errorId = `error-${id}`;
  return `
<div${add_classes(["bx--form-item"].join(" ").trim())}>${labelText && !hideLabel ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")
  ].join(" ").trim())}>${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>` : ``}
  <div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes(["bx--text-area__wrapper"].join(" ").trim())}>${invalid ? `${validate_component(WarningFilled16$1, "WarningFilled16").$$render($$result, { class: "bx--text-area__invalid-icon" }, {}, {})}` : ``}
    <textarea${spread([
    {
      "aria-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-describedby": escape_attribute_value(invalid ? errorId : void 0)
    },
    { disabled: disabled || null },
    { id: escape_attribute_value(id) },
    { name: escape_attribute_value(name) },
    { cols: escape_attribute_value(cols) },
    { rows: escape_attribute_value(rows) },
    {
      placeholder: escape_attribute_value(placeholder)
    },
    escape_object($$restProps),
    {
      readonly: ($$restProps.readonly === true ? true : void 0) || null
    }
  ], "bx--text-area " + (light ? "bx--text-area--light" : "") + " " + (invalid ? "bx--text-area--invalid" : ""))}${add_attribute("this", ref, 0)}>${escape(value)}</textarea></div>
  ${!invalid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}
  ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}</div>`;
});
var TextInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFluid;
  let errorId;
  let warnId;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "type",
    "placeholder",
    "light",
    "disabled",
    "helperText",
    "id",
    "name",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "ref",
    "required",
    "inline",
    "readonly"
  ]);
  let { size = void 0 } = $$props;
  let { value = "" } = $$props;
  let { type = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { helperText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { ref = null } = $$props;
  let { required = false } = $$props;
  let { inline = false } = $$props;
  let { readonly = false } = $$props;
  const ctx = getContext("Form");
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  isFluid = !!ctx && ctx.isFluid;
  errorId = `error-${id}`;
  warnId = `warn-${id}`;
  return `
<div${add_classes([
    "bx--form-item bx--text-input-wrapper " + (inline ? "bx--text-input-wrapper--inline" : "") + " " + (light ? "bx--text-input-wrapper--light" : "") + " " + (readonly ? "bx--text-input-wrapper--readonly" : "")
  ].join(" ").trim())}>${inline ? `<div${add_classes(["bx--text-input__label-helper-wrapper"].join(" ").trim())}>${labelText ? `<label${add_attribute("for", id, 0)} class="${[
    escape(inline && !!size && `bx--label--inline--${size}`),
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
  ].join(" ").trim()}">${slots.labelText ? slots.labelText({}) : `
            ${escape(labelText)}
          `}</label>` : ``}
      ${!isFluid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}</div>` : ``}
  ${!inline && labelText ? `<label${add_attribute("for", id, 0)} class="${[
    escape(inline && !!size && `bx--label--inline--${size}`),
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
  ].join(" ").trim()}">${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>` : ``}
  <div${add_classes([
    "bx--text-input__field-outer-wrapper " + (inline ? "bx--text-input__field-outer-wrapper--inline" : "")
  ].join(" ").trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_attribute("data-warn", warn || void 0, 0)}${add_classes([
    "bx--text-input__field-wrapper " + (!invalid && warn ? "bx--text-input__field-wrapper--warning" : "")
  ].join(" ").trim())}>${invalid ? `${validate_component(WarningFilled16$1, "WarningFilled16").$$render($$result, { class: "bx--text-input__invalid-icon" }, {}, {})}` : ``}
      ${!invalid && warn ? `${validate_component(WarningAltFilled16$1, "WarningAltFilled16").$$render($$result, {
    class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
  }, {}, {})}` : ``}
      ${readonly ? `${validate_component(EditOff16$1, "EditOff16").$$render($$result, { class: "bx--text-input__readonly-icon" }, {}, {})}` : ``}
      <input${spread([
    {
      "data-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "data-warn": escape_attribute_value(warn || void 0)
    },
    {
      "aria-describedby": escape_attribute_value(invalid ? errorId : warn ? warnId : void 0)
    },
    { disabled: disabled || null },
    { id: escape_attribute_value(id) },
    { name: escape_attribute_value(name) },
    {
      placeholder: escape_attribute_value(placeholder)
    },
    { type: escape_attribute_value(type) },
    { value: escape_attribute_value(value) },
    { required: required || null },
    { readonly: readonly || null },
    escape_object($$restProps),
    {
      class: escape_attribute_value(size && `bx--text-input--${size}`)
    }
  ], "bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : "") + " " + (warn ? "bx--text-input--warn" : ""))}${add_attribute("this", ref, 0)}>
      ${isFluid ? `<hr${add_classes(["bx--text-input__divider"].join(" ").trim())}>` : ``}
      ${isFluid && !inline && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
      ${isFluid && !inline && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}</div>
    ${!invalid && !warn && !isFluid && !inline && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}
    ${!isFluid && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
    ${!isFluid && !invalid && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
});
var View16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "View16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 16 16" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M15.5,7.8C14.3,4.7,11.3,2.6,8,2.5C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3c1.2,3.1,4.1,5.2,7.5,5.3	c3.3-0.1,6.3-2.2,7.5-5.3C15.5,8.1,15.5,7.9,15.5,7.8z M8,12.5c-2.7,0-5.4-2-6.5-4.5c1-2.5,3.8-4.5,6.5-4.5s5.4,2,6.5,4.5	C13.4,10.5,10.6,12.5,8,12.5z"}"></path><path d="${"M8,5C6.3,5,5,6.3,5,8s1.3,3,3,3s3-1.3,3-3S9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S9.1,10,8,10z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var View16$1 = View16;
var ViewOff16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "ViewOff16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 16 16" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M2.6,11.3l0.7-0.7C2.6,9.8,1.9,9,1.5,8c1-2.5,3.8-4.5,6.5-4.5c0.7,0,1.4,0.1,2,0.4l0.8-0.8C9.9,2.7,9,2.5,8,2.5	C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3C1,9.3,1.7,10.4,2.6,11.3z"}"></path><path d="${"M6 7.9c.1-1 .9-1.8 1.8-1.8l.9-.9C7.2 4.7 5.5 5.6 5.1 7.2 5 7.7 5 8.3 5.1 8.8L6 7.9zM15.5 7.8c-.6-1.5-1.6-2.8-2.9-3.7L15 1.7 14.3 1 1 14.3 1.7 15l2.6-2.6c1.1.7 2.4 1 3.7 1.1 3.3-.1 6.3-2.2 7.5-5.3C15.5 8.1 15.5 7.9 15.5 7.8zM10 8c0 1.1-.9 2-2 2-.3 0-.7-.1-1-.3L9.7 7C9.9 7.3 10 7.6 10 8zM8 12.5c-1 0-2.1-.3-3-.8l1.3-1.3c1.4.9 3.2.6 4.2-.8.7-1 .7-2.4 0-3.4l1.4-1.4c1.1.8 2 1.9 2.6 3.2C13.4 10.5 10.6 12.5 8 12.5z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var ViewOff16$1 = ViewOff16;
var PasswordInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFluid;
  let errorId;
  let warnId;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "type",
    "placeholder",
    "hidePasswordLabel",
    "showPasswordLabel",
    "tooltipAlignment",
    "tooltipPosition",
    "light",
    "disabled",
    "helperText",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "inline",
    "id",
    "name",
    "ref"
  ]);
  let { size = void 0 } = $$props;
  let { value = "" } = $$props;
  let { type = "password" } = $$props;
  let { placeholder = "" } = $$props;
  let { hidePasswordLabel = "Hide password" } = $$props;
  let { showPasswordLabel = "Show password" } = $$props;
  let { tooltipAlignment = "center" } = $$props;
  let { tooltipPosition = "bottom" } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { helperText = "" } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { inline = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  const ctx = getContext("Form");
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.hidePasswordLabel === void 0 && $$bindings.hidePasswordLabel && hidePasswordLabel !== void 0)
    $$bindings.hidePasswordLabel(hidePasswordLabel);
  if ($$props.showPasswordLabel === void 0 && $$bindings.showPasswordLabel && showPasswordLabel !== void 0)
    $$bindings.showPasswordLabel(showPasswordLabel);
  if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0)
    $$bindings.tooltipAlignment(tooltipAlignment);
  if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0)
    $$bindings.tooltipPosition(tooltipPosition);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  isFluid = !!ctx && ctx.isFluid;
  errorId = `error-${id}`;
  warnId = `warn-${id}`;
  return `
<div${add_classes([
    "bx--form-item bx--text-input-wrapper " + (!isFluid ? "bx--password-input-wrapper" : "") + " " + (light ? "bx--text-input-wrapper--light" : "") + " " + (inline ? "bx--text-input-wrapper--inline" : "")
  ].join(" ").trim())}>${inline ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "") + " " + (inline && size === "sm" ? "bx--label--inline--sm" : "") + " " + (inline && size === "xl" ? "bx--label--inline--xl" : "")
  ].join(" ").trim())}>${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>
    ${!isFluid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}` : `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "") + " " + (inline && size === "sm" ? "bx--label--inline--sm" : "") + " " + (inline && size === "xl" ? "bx--label--inline--xl" : "")
  ].join(" ").trim())}>${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>`}
  <div${add_classes([
    "bx--text-input__field-outer-wrapper " + (inline ? "bx--text-input__field-outer-wrapper--inline" : "")
  ].join(" ").trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes([
    "bx--text-input__field-wrapper " + (warn ? "bx--text-input__field-wrapper--warning" : "")
  ].join(" ").trim())}>${invalid ? `${validate_component(WarningFilled16$1, "WarningFilled16").$$render($$result, { class: "bx--text-input__invalid-icon" }, {}, {})}` : ``}
      ${!invalid && warn ? `${validate_component(WarningAltFilled16$1, "WarningAltFilled16").$$render($$result, {
    class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
  }, {}, {})}` : ``}
      <input${spread([
    {
      "data-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-describedby": escape_attribute_value(invalid ? errorId : warn ? warnId : void 0)
    },
    { id: escape_attribute_value(id) },
    { name: escape_attribute_value(name) },
    {
      placeholder: escape_attribute_value(placeholder)
    },
    { type: escape_attribute_value(type) },
    { value: escape_attribute_value(value) },
    { disabled: disabled || null },
    escape_object($$restProps),
    {
      class: escape_attribute_value(size && `bx--text-input--${size}`)
    }
  ], "bx--text-input bx--password-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : "") + " " + (warn ? "bx--text-input--warning" : ""))}${add_attribute("this", ref, 0)}>
      <button type="${"button"}" ${disabled ? "disabled" : ""} class="${[
    escape(tooltipPosition && `bx--tooltip--${tooltipPosition}`) + " " + escape(tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`),
    "bx--text-input--password__visibility__toggle bx--btn bx--btn--icon-only " + (disabled ? "bx--btn--disabled" : "") + " bx--tooltip__trigger bx--tooltip--a11y"
  ].join(" ").trim()}">${!disabled ? `<span${add_classes(["bx--assistive-text"].join(" ").trim())}>${type === "text" ? `${escape(hidePasswordLabel)}` : `${escape(showPasswordLabel)}`}</span>` : ``}
        ${type === "text" ? `${validate_component(ViewOff16$1, "ViewOff16").$$render($$result, { class: "bx--icon-visibility-off" }, {}, {})}` : `${validate_component(View16$1, "View16").$$render($$result, { class: "bx--icon-visibility-on" }, {}, {})}`}</button></div>
    ${!isFluid && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
    ${!invalid && !warn && !isFluid && !inline ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}
    ${!isFluid && !invalid && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
});
var Menu20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Menu20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 20 20" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M2 14.8H18V16H2zM2 11.2H18V12.399999999999999H2zM2 7.6H18V8.799999999999999H2zM2 4H18V5.2H2z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Menu20$1 = Menu20;
var shouldRenderHamburgerMenu = writable(false);
var HamburgerMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ariaLabel", "isOpen", "iconMenu", "iconClose", "ref"]);
  let { ariaLabel = void 0 } = $$props;
  let { isOpen = false } = $$props;
  let { iconMenu = Menu20$1 } = $$props;
  let { iconClose = Close20$1 } = $$props;
  let { ref = null } = $$props;
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.iconMenu === void 0 && $$bindings.iconMenu && iconMenu !== void 0)
    $$bindings.iconMenu(iconMenu);
  if ($$props.iconClose === void 0 && $$bindings.iconClose && iconClose !== void 0)
    $$bindings.iconClose(iconClose);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread([
    { type: "button" },
    { title: escape_attribute_value(ariaLabel) },
    {
      "aria-label": escape_attribute_value(ariaLabel)
    },
    escape_object($$restProps)
  ], "bx--header__action bx--header__menu-trigger bx--header__menu-toggle")}${add_attribute("this", ref, 0)}>${validate_component((isOpen ? iconClose : iconMenu) || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</button>`;
});
var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "expandedByDefault",
    "isSideNavOpen",
    "uiShellAriaLabel",
    "href",
    "company",
    "platformName",
    "persistentHamburgerMenu",
    "expansionBreakpoint",
    "ref",
    "iconMenu",
    "iconClose"
  ]);
  let $shouldRenderHamburgerMenu, $$unsubscribe_shouldRenderHamburgerMenu;
  $$unsubscribe_shouldRenderHamburgerMenu = subscribe(shouldRenderHamburgerMenu, (value) => $shouldRenderHamburgerMenu = value);
  let { expandedByDefault = true } = $$props;
  let { isSideNavOpen: isSideNavOpen2 = false } = $$props;
  let { uiShellAriaLabel = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { company = void 0 } = $$props;
  let { platformName = "" } = $$props;
  let { persistentHamburgerMenu = false } = $$props;
  let { expansionBreakpoint = 1056 } = $$props;
  let { ref = null } = $$props;
  let { iconMenu = Menu20$1 } = $$props;
  let { iconClose = Close20$1 } = $$props;
  let winWidth = void 0;
  if ($$props.expandedByDefault === void 0 && $$bindings.expandedByDefault && expandedByDefault !== void 0)
    $$bindings.expandedByDefault(expandedByDefault);
  if ($$props.isSideNavOpen === void 0 && $$bindings.isSideNavOpen && isSideNavOpen2 !== void 0)
    $$bindings.isSideNavOpen(isSideNavOpen2);
  if ($$props.uiShellAriaLabel === void 0 && $$bindings.uiShellAriaLabel && uiShellAriaLabel !== void 0)
    $$bindings.uiShellAriaLabel(uiShellAriaLabel);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.company === void 0 && $$bindings.company && company !== void 0)
    $$bindings.company(company);
  if ($$props.platformName === void 0 && $$bindings.platformName && platformName !== void 0)
    $$bindings.platformName(platformName);
  if ($$props.persistentHamburgerMenu === void 0 && $$bindings.persistentHamburgerMenu && persistentHamburgerMenu !== void 0)
    $$bindings.persistentHamburgerMenu(persistentHamburgerMenu);
  if ($$props.expansionBreakpoint === void 0 && $$bindings.expansionBreakpoint && expansionBreakpoint !== void 0)
    $$bindings.expansionBreakpoint(expansionBreakpoint);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.iconMenu === void 0 && $$bindings.iconMenu && iconMenu !== void 0)
    $$bindings.iconMenu(iconMenu);
  if ($$props.iconClose === void 0 && $$bindings.iconClose && iconClose !== void 0)
    $$bindings.iconClose(iconClose);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    isSideNavOpen2 = expandedByDefault && winWidth >= expansionBreakpoint && !persistentHamburgerMenu;
    ariaLabel = company ? `${company} ` : "" + (uiShellAriaLabel || $$props["aria-label"] || platformName);
    $$rendered = `

<header role="${"banner"}"${add_attribute("aria-label", ariaLabel, 0)}${add_classes(["bx--header"].join(" ").trim())}>${slots["skip-to-content"] ? slots["skip-to-content"]({}) : ``}
  ${$shouldRenderHamburgerMenu && winWidth < expansionBreakpoint || persistentHamburgerMenu ? `${validate_component(HamburgerMenu, "HamburgerMenu").$$render($$result, {
      iconClose,
      iconMenu,
      isOpen: isSideNavOpen2
    }, {
      isOpen: ($$value) => {
        isSideNavOpen2 = $$value;
        $$settled = false;
      }
    }, {})}` : ``}
  <a${spread([{ href: escape_attribute_value(href) }, escape_object($$restProps)], "bx--header__name")}${add_attribute("this", ref, 0)}>${company ? `<span${add_classes(["bx--header__name--prefix"].join(" ").trim())}>${escape(company)}\xA0</span>` : ``}
    ${slots.platform ? slots.platform({}) : `${escape(platformName)}`}</a>
  ${slots.default ? slots.default({}) : ``}</header>`;
  } while (!$$settled);
  $$unsubscribe_shouldRenderHamburgerMenu();
  return $$rendered;
});
var data = [
  {
    href: "#",
    title: "Test title search 1",
    menu: "Test menu 1",
    description: "This is a description for seach #1"
  },
  {
    href: "#",
    title: "Changing text to simulate search",
    menu: "Test menu 2",
    description: "This is a description for seach #2"
  },
  {
    href: "#",
    title: "More testing texts",
    menu: "Test menu 3",
    description: "This is a description for seach #3"
  },
  {
    href: "#",
    title: "We can find here another test text",
    menu: "Test menu 4",
    description: "This is a description for seach #4"
  }
];
var globalStore = writable(void 0);
({
  subscribe: globalStore.subscribe,
  search: (searchString) => {
    if (searchString.length > 1) {
      let resultSearch = [];
      data.forEach((item) => {
        if (item.title.toLowerCase().includes(searchString.toLowerCase())) {
          resultSearch.push(item);
        }
      });
      if (resultSearch.length > 0) {
        globalStore.set(resultSearch);
      } else {
        globalStore.set(void 0);
      }
    } else {
      globalStore.set(void 0);
    }
  },
  clear: () => {
    globalStore.set(void 0);
  }
});
var SideNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["fixed", "rail", "ariaLabel", "isOpen", "expansionBreakpoint"]);
  let { fixed = false } = $$props;
  let { rail = false } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { isOpen = false } = $$props;
  let { expansionBreakpoint = 1056 } = $$props;
  const dispatch = createEventDispatcher();
  let winWidth = void 0;
  if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0)
    $$bindings.fixed(fixed);
  if ($$props.rail === void 0 && $$bindings.rail && rail !== void 0)
    $$bindings.rail(rail);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.expansionBreakpoint === void 0 && $$bindings.expansionBreakpoint && expansionBreakpoint !== void 0)
    $$bindings.expansionBreakpoint(expansionBreakpoint);
  {
    dispatch(isOpen ? "open" : "close");
  }
  return `

${!fixed ? `<div${add_classes([
    "bx--side-nav__overlay " + (isOpen ? "bx--side-nav__overlay-active" : "")
  ].join(" ").trim())}></div>` : ``}
<nav${spread([
    {
      "aria-hidden": escape_attribute_value(!isOpen)
    },
    {
      "aria-label": escape_attribute_value(ariaLabel)
    },
    escape_object($$restProps)
  ], "bx--side-nav__navigation bx--side-nav bx--side-nav--ux " + ((rail && winWidth >= expansionBreakpoint ? false : isOpen) ? "bx--side-nav--expanded" : "") + " " + (!isOpen && !rail ? "bx--side-nav--collapsed" : "") + " " + (rail ? "bx--side-nav--rail" : ""))}>${slots.default ? slots.default({}) : ``}</nav>`;
});
var SideNavItems = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<ul${add_classes(["bx--side-nav__items"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</ul>`;
});
var SideNavLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["isSelected", "href", "text", "icon", "ref"]);
  let { isSelected = false } = $$props;
  let { href = void 0 } = $$props;
  let { text = void 0 } = $$props;
  let { icon = void 0 } = $$props;
  let { ref = null } = $$props;
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
    $$bindings.isSelected(isSelected);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<li${add_classes(["bx--side-nav__item"].join(" ").trim())}><a${spread([
    {
      "aria-current": escape_attribute_value(isSelected ? "page" : void 0)
    },
    { href: escape_attribute_value(href) },
    {
      rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    escape_object($$restProps)
  ], "bx--side-nav__link " + (isSelected ? "bx--side-nav__link--current" : ""))}${add_attribute("this", ref, 0)}>${icon ? `<div${add_classes([
    "bx--side-nav__icon bx--side-nav__icon--small"
  ].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}
    <span${add_classes(["bx--side-nav__link-text"].join(" ").trim())}>${escape(text)}</span></a></li>`;
});
var Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["id"]);
  let { id = "main-content" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `<main${spread([{ id: escape_attribute_value(id) }, escape_object($$restProps)], "bx--content")}>${slots.default ? slots.default({}) : ``}</main>`;
});
var SkipToContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "tabindex"]);
  let { href = "#main-content" } = $$props;
  let { tabindex = "0" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  return `<a${spread([
    { href: escape_attribute_value(href) },
    {
      tabindex: escape_attribute_value(tabindex)
    },
    escape_object($$restProps)
  ], "bx--skip-to-content")}>${slots.default ? slots.default({}) : `Skip to main content`}</a>`;
});
function simpleStore() {
  const { subscribe: subscribe2, set } = writable([]);
  return {
    subscribe: subscribe2,
    set: (value) => set(value)
  };
}
var itemFields = simpleStore();
var username = simpleStore();
var notify = simpleStore();
var open = simpleStore();
var context = simpleStore();
var myTags = simpleStore();
var roomTags = simpleStore();
var itemTags = simpleStore();
var userTags = simpleStore();
var isSideNavOpen = simpleStore();
var SideNavLink_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "text"]);
  let $$unsubscribe_isSideNavOpen;
  $$unsubscribe_isSideNavOpen = subscribe(isSideNavOpen, (value) => value);
  let { href = "" } = $$props;
  let { text = "" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(SideNavLink, "SideNavLink").$$render($$result, Object.assign($$restProps, { href }, { text }), {
      href: ($$value) => {
        href = $$value;
        $$settled = false;
      },
      text: ($$value) => {
        text = $$value;
        $$settled = false;
      }
    }, {})}`;
  } while (!$$settled);
  $$unsubscribe_isSideNavOpen();
  return $$rendered;
});
function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
function guard(name) {
  return () => {
    throw new Error(`Cannot call ${name}(...) on the server`);
  };
}
var goto = guard("goto");
var getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
var page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
var navigating = {
  subscribe(fn) {
    const store = getStores().navigating;
    return store.subscribe(fn);
  }
};
var error = (verb) => {
  throw new Error(`Can only ${verb} session store in browser`);
};
var session = {
  subscribe(fn) {
    const store = getStores().session;
    return store.subscribe(fn);
  },
  set: () => error("set"),
  update: () => error("update")
};
var Header_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  let $isSideNavOpen, $$unsubscribe_isSideNavOpen;
  let $navigating, $$unsubscribe_navigating;
  let $page, $$unsubscribe_page;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  $$unsubscribe_isSideNavOpen = subscribe(isSideNavOpen, (value) => $isSideNavOpen = value);
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  set_store_value(isSideNavOpen, $isSideNavOpen = false, $isSideNavOpen);
  const getSub = () => {
    navigator.serviceWorker.ready.then((registration) => {
      return registration.pushManager.getSubscription().then(async (sub) => {
        if (sub) {
          return sub;
        }
        const response = await fetch(`get`);
        const vapidKey = await response.text();
        let int8VapidKey = urlBase64ToUint8Array(vapidKey);
        const options2 = {
          userVisibleOnly: true,
          applicationServerKey: int8VapidKey
        };
        return registration.pushManager.subscribe(options2);
      });
    }).then((sub) => {
      api.post("subs", { id: $session.user.id, sub });
    });
  };
  if (typeof window != "undefined") {
    if (navigator && navigator.serviceWorker && $session.user) {
      getSub();
    }
  }
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `



${validate_component(Header, "Header").$$render($$result, {
      persistentHamburgerMenu: true,
      company: "Apexlinks",
      platFormName: "",
      href: "/",
      isSideNavOpen: $isSideNavOpen
    }, {
      isSideNavOpen: ($$value) => {
        $isSideNavOpen = $$value;
        $$settled = false;
      }
    }, {
      "skip-to-content": () => `<div slot="${"skip-to-content"}">${validate_component(SkipToContent, "SkipToContent").$$render($$result, {}, {}, {})}</div>`,
      default: () => `${$navigating ? `${validate_component(InlineLoading, "InlineLoading").$$render($$result, {}, {}, {})}` : ``}`
    })}

${validate_component(SideNav, "SideNav").$$render($$result, { isOpen: $isSideNavOpen }, {
      isOpen: ($$value) => {
        $isSideNavOpen = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${validate_component(SideNavItems, "SideNavItems").$$render($$result, {}, {}, {
        default: () => `${!$session.user ? `${``}
      ${validate_component(SideNavLink_1, "SideNavLink").$$render($$result, {
          isSelected: $page.path.split("/")[1] == "login" ? true : false,
          text: "Login",
          href: "/login"
        }, {}, {})}` : ``}
    ${$session.user ? `
      
      
      ${validate_component(SideNavLink_1, "SideNavLink").$$render($$result, {
          isSelected: $page.path.split("/")[1] == "edit" ? true : false,
          href: "/edit",
          text: "Edit"
        }, {}, {})}
      ${validate_component(SideNavLink_1, "SideNavLink").$$render($$result, { text: "Exit", href: "" }, {}, {})}` : ``}`
      })}`
    })}`;
  } while (!$$settled);
  $$unsubscribe_session();
  $$unsubscribe_isSideNavOpen();
  $$unsubscribe_navigating();
  $$unsubscribe_page();
  return $$rendered;
});
var Theme = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { persist = false } = $$props;
  let { persistKey = "theme" } = $$props;
  let { theme = "white" } = $$props;
  const themes = ["white", "g10", "g90", "g100"];
  const isValidTheme = (value) => themes.includes(value);
  const isDark = (value) => isValidTheme(value) && (value === "g90" || value === "g100");
  const carbon_theme = writable(theme);
  const dark = writable(isDark(theme));
  const light = derived(dark, (_) => !_);
  carbon_theme.subscribe((value) => {
    theme = value;
  });
  setContext("Theme", {
    updateVar: (name, value) => {
    },
    carbon_theme,
    dark,
    light
  });
  if ($$props.persist === void 0 && $$bindings.persist && persist !== void 0)
    $$bindings.persist(persist);
  if ($$props.persistKey === void 0 && $$bindings.persistKey && persistKey !== void 0)
    $$bindings.persistKey(persistKey);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.themes === void 0 && $$bindings.themes && themes !== void 0)
    $$bindings.themes(themes);
  {
    dark.set(isDark(theme));
  }
  return `${slots.default ? slots.default({}) : ``}`;
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Theme, "Theme").$$render($$result, { persist: true, theme: "g10" }, {}, {
    default: () => `${validate_component(Header_1, "Header").$$render($$result, {}, {}, {})}
  ${validate_component(Content, "Content").$$render($$result, { style: "background: none; padding: 1rem" }, {}, {
      default: () => `${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
        default: () => `${slots.default ? slots.default({}) : ``}`
      })}`
    })}`
  })}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load$g({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status = "" } = $$props;
  let { error: error2 = "" } = $$props;
  const dev = false;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => `${validate_component(Column, "Column").$$render($$result, { lg: 16 }, {}, {
      default: () => `<h1>${escape(status)}</h1>
    <div>${escape(error2.message || "")}
      ${validate_component(Link, "Link").$$render($$result, { inline: true, href: "/" }, {}, { default: () => `Return home` })}</div>
    ${error2 && dev && error2.stack ? `<div><pre>${escape(error2.stack)}</pre></div>` : ``}`
    })}`
  })}`;
});
var __error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _error,
  load: load$g
});
var Filter16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Filter16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M18,28H14a2,2,0,0,1-2-2V18.41L4.59,11A2,2,0,0,1,4,9.59V6A2,2,0,0,1,6,4H26a2,2,0,0,1,2,2V9.59A2,2,0,0,1,27.41,11L20,18.41V26A2,2,0,0,1,18,28ZM6,6V9.59l8,8V26h4V17.59l8-8V6Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Filter16$1 = Filter16;
var Filter20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Filter20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M18,28H14a2,2,0,0,1-2-2V18.41L4.59,11A2,2,0,0,1,4,9.59V6A2,2,0,0,1,6,4H26a2,2,0,0,1,2,2V9.59A2,2,0,0,1,27.41,11L20,18.41V26A2,2,0,0,1,18,28ZM6,6V9.59l8,8V26h4V17.59l8-8V6Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Filter20$1 = Filter20;
var IconInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFluid;
  let errorId;
  let warnId;
  let $$restProps = compute_rest_props($$props, [
    "button",
    "size",
    "value",
    "type",
    "placeholder",
    "light",
    "disabled",
    "helperText",
    "id",
    "name",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "ref",
    "required",
    "inline",
    "createDisabled",
    "createHidden"
  ]);
  let { button = false } = $$props;
  let { size = void 0 } = $$props;
  let { value = "" } = $$props;
  let { type = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { helperText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { ref = null } = $$props;
  let { required = false } = $$props;
  let { inline = false } = $$props;
  let { createDisabled = false } = $$props;
  let { createHidden = false } = $$props;
  createEventDispatcher();
  const ctx = getContext("Form");
  if ($$props.button === void 0 && $$bindings.button && button !== void 0)
    $$bindings.button(button);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.createDisabled === void 0 && $$bindings.createDisabled && createDisabled !== void 0)
    $$bindings.createDisabled(createDisabled);
  if ($$props.createHidden === void 0 && $$bindings.createHidden && createHidden !== void 0)
    $$bindings.createHidden(createHidden);
  isFluid = !!ctx && ctx.isFluid;
  errorId = `error-${id}`;
  warnId = `warn-${id}`;
  return `<div${add_classes([
    "bx--form-item bx--text-input-wrapper " + (inline ? "bx--text-input-wrapper--inline" : "")
  ].join(" ").trim())}>${inline ? `<div class="${"bx--text-input__label-helper-wrapper"}">${labelText ? `<label${add_attribute("for", id, 0)} class="${[
    escape(inline && !!size && `bx--label--inline--${size}`),
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
  ].join(" ").trim()}">${escape(labelText)}</label>` : ``}
        ${!isFluid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}</div>` : ``}
    ${!inline && labelText ? `<label${add_attribute("for", id, 0)} class="${[
    escape(inline && !!size && `bx--label--inline--${size}`),
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
  ].join(" ").trim()}">${escape(labelText)}</label>` : ``}
    <div${add_classes([
    "bx--text-input__field-outer-wrapper " + (inline ? "bx--text-input__field-outer-wrapper--inline" : "")
  ].join(" ").trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_attribute("data-warn", warn || void 0, 0)}${add_classes([
    "bx--text-input__field-wrapper " + (!invalid && warn ? "bx--text-input__field-wrapper--warning" : "")
  ].join(" ").trim())}>${invalid ? `${validate_component(WarningFilled16$1, "WarningFilled16").$$render($$result, { class: "bx--text-input__invalid-icon" }, {}, {})}` : ``}
        ${!invalid && warn ? `${validate_component(WarningAltFilled16$1, "WarningAltFilled16").$$render($$result, {
    class: "bx--text-input__invalid-icon\r\n              bx--text-input__invalid-icon--warning"
  }, {}, {})}` : ``}
        <input${spread([
    {
      "data-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "data-warn": escape_attribute_value(warn || void 0)
    },
    {
      "aria-describedby": escape_attribute_value(invalid ? errorId : warn ? warnId : void 0)
    },
    { disabled: disabled || null },
    { id: escape_attribute_value(id) },
    { name: escape_attribute_value(name) },
    {
      placeholder: escape_attribute_value(placeholder)
    },
    { type: escape_attribute_value(type) },
    { value: escape_attribute_value(value) },
    { required: required || null },
    escape_object($$restProps),
    {
      class: escape_attribute_value(size && `bx--text-input--${size}`)
    }
  ], "bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : "") + " " + (warn ? "bx--text-input--warn" : ""))}${add_attribute("this", ref, 0)}>
        ${button ? `<button type="${"button"}" aria-label="${"createFilter"}" ${createDisabled ? "disabled" : ""}${add_classes([
    "bx--search-close " + (createHidden ? "bx--search-close--hidden" : "")
  ].join(" ").trim())}>${validate_component((size === "xl" ? Filter20$1 : Filter16$1) || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</button>` : ``}
        ${isFluid ? `<hr${add_classes(["bx--text-input__divider"].join(" ").trim())}>` : ``}
        ${isFluid && !inline && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
        ${isFluid && !inline && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}</div>
      ${!invalid && !warn && !isFluid && !inline && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}
      ${!isFluid && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
      ${!isFluid && !invalid && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
});
var Tag_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["button", "tags", "is_focused"]);
  let { button = false } = $$props;
  let { tags = [] } = $$props;
  let { is_focused = false } = $$props;
  createEventDispatcher();
  let value;
  let ref;
  if ($$props.button === void 0 && $$bindings.button && button !== void 0)
    $$bindings.button(button);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  if ($$props.is_focused === void 0 && $$bindings.is_focused && is_focused !== void 0)
    $$bindings.is_focused(is_focused);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (ref && is_focused)
        ref.focus();
    }
    $$rendered = `

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, { xlg: 4, lg: 4, md: 4, sm: 4 }, {}, {
        default: () => `${validate_component(IconInput, "IconInput").$$render($$result, Object.assign({
          placeholder: tags.length > 0 ? `${tags.length} ${tags.length > 1 ? "tags" : "tag"}` : "Add tag"
        }, $$restProps, { button }, { ref }, { value }), {
          ref: ($$value) => {
            ref = $$value;
            $$settled = false;
          },
          value: ($$value) => {
            value = $$value;
            $$settled = false;
          }
        }, {})}
        ${slots.default ? slots.default({}) : ``}`
      })}`
    })}

${``}`;
  } while (!$$settled);
  return $$rendered;
});
var css$a = {
  code: ".label.svelte-1ltp0mp{padding-left:0.5rem\r\n    }.user.svelte-1ltp0mp{display:flex;flex-direction:row}.pointer.svelte-1ltp0mp:hover{cursor:pointer}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context='module'>\\r\\n    export async function load({session}){\\r\\n        let user = session.user\\r\\n        if (!user){\\r\\n            return {\\r\\n                status: 302,\\r\\n                redirect: '/login'\\r\\n            }\\r\\n        }\\r\\n        return {\\r\\n            props: {\\r\\n                user\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n    import {\\r\\n        Row,\\r\\n        Column,\\r\\n        PaginationNav,\\r\\n    } from 'carbon-components-svelte'\\r\\n    import { api } from '$lib/api'\\r\\n    import {\\r\\n        userTags\\r\\n    } from '$lib/stores'\\r\\n    import Tag from '$lib/components/Tag.svelte'\\r\\n    import {goto} from '$app/navigation'\\r\\n\\r\\n    $: if (got) get(page)\\r\\n\\r\\n    let users = []\\r\\n    let page = 0\\r\\n    let total = 0\\r\\n    let pages = 0\\r\\n\\r\\n    let got\\r\\n\\r\\n    const get = async function(){\\r\\n        let tagString = JSON.stringify($userTags)\\r\\n        let url = \`users?tags=\${tagString}&page=\${page+1}\`\\r\\n        let res = await api.get(url)\\r\\n        console.log('r.i', res.items)\\r\\n        if(Array.isArray(res.items)){\\r\\n            users = res.items\\r\\n            total = res.total\\r\\n            pages = res.pages\\r\\n            got = true\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Apexlinks</title>\\r\\n</svelte:head>\\r\\n\\r\\n<Tag on:change={get} placeholder='Search' bind:tags={$userTags} />    \\r\\n\\r\\n{#each users as user}\\r\\n    <br />\\r\\n    <Row noGutter>\\r\\n        <Column lg={4} sm={4} md={4} xlg={4}>\\r\\n            <div on:click={goto(\`/\${user.username}\`)} class='pointer user'>\\r\\n                {#if user.image}\\r\\n                    <img style='vertical-align: top;' height='52px' width='52px' alt='profile pic' src={user.image}>\\r\\n                {:else}\\r\\n                    <img style='vertical-align: top;' height='52px' width='52px' alt='profile pic' src='/placeholder.png'>\\r\\n                {/if}\\r\\n                <div class='label'>\\r\\n                    <h4>{user.name}</h4>\\r\\n                    {#if user.username}\\r\\n                        <p class='bx--link--sm'>{user.username}</p>\\r\\n                    {/if}\\r\\n                </div>\\r\\n            </div>\\r\\n        </Column>\\r\\n    </Row>\\r\\n{/each}\\r\\n\\r\\n{#if got && total < 1}\\r\\n    <Row noGutter>\\r\\n        <Column>\\r\\n            <p>There doesn't seem to be any results</p>        \\r\\n        </Column>\\r\\n    </Row>\\r\\n{/if}\\r\\n\\r\\n{#if total>10}\\r\\n    <Row noGutter>\\r\\n        <Column>\\r\\n            <PaginationNav loop bind:page bind:total={pages}/>\\r\\n        </Column>\\r\\n    </Row>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n    .label {\\r\\n        padding-left: 0.5rem\\r\\n    }\\r\\n    .user {\\r\\n        display: flex;\\r\\n        flex-direction: row;\\r\\n    }\\r\\n    .pointer:hover {\\r\\n        cursor: pointer;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAiGI,MAAM,eAAC,CAAC,AACJ,YAAY,CAAE,MAAM;IACxB,CAAC,AACD,KAAK,eAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,AACvB,CAAC,AACD,uBAAQ,MAAM,AAAC,CAAC,AACZ,MAAM,CAAE,OAAO,AACnB,CAAC"}`
};
async function load$f({ session: session2 }) {
  let user = session2.user;
  if (!user) {
    return { status: 302, redirect: "/login" };
  }
  return { props: { user } };
}
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userTags, $$unsubscribe_userTags;
  $$unsubscribe_userTags = subscribe(userTags, (value) => $userTags = value);
  let users = [];
  $$result.css.add(css$a);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `${$$result.title = `<title>Apexlinks</title>`, ""}`, ""}

${validate_component(Tag_1, "Tag").$$render($$result, { placeholder: "Search", tags: $userTags }, {
      tags: ($$value) => {
        $userTags = $$value;
        $$settled = false;
      }
    }, {})}    

${each(users, (user) => `<br>
    ${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, { lg: 4, sm: 4, md: 4, xlg: 4 }, {}, {
        default: () => `<div class="${"pointer user svelte-1ltp0mp"}">${user.image ? `<img style="${"vertical-align: top;"}" height="${"52px"}" width="${"52px"}" alt="${"profile pic"}"${add_attribute("src", user.image, 0)}>` : `<img style="${"vertical-align: top;"}" height="${"52px"}" width="${"52px"}" alt="${"profile pic"}" src="${"/placeholder.png"}">`}
                <div class="${"label svelte-1ltp0mp"}"><h4>${escape(user.name)}</h4>
                    ${user.username ? `<p class="${"bx--link--sm"}">${escape(user.username)}</p>` : ``}
                </div></div>
        `
      })}
    `
    })}`)}

${``}

${``}`;
  } while (!$$settled);
  $$unsubscribe_userTags();
  return $$rendered;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  load: load$f
});
var Invalid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ref", "value", "password"]);
  let { ref = null } = $$props;
  let { value = "" } = $$props;
  let { password = "" } = $$props;
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.password === void 0 && $$bindings.password && password !== void 0)
    $$bindings.password(password);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${password ? `${validate_component(PasswordInput, "PasswordInput").$$render($$result, Object.assign({ invalid: true }, $$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}` : `${validate_component(TextInput, "TextInput").$$render($$result, Object.assign({ invalid: true }, $$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}`}`;
  } while (!$$settled);
  return $$rendered;
});
var Valid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ref", "value", "password"]);
  let { ref = null } = $$props;
  let { value = "" } = $$props;
  let { password = "" } = $$props;
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.password === void 0 && $$bindings.password && password !== void 0)
    $$bindings.password(password);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${password ? `${validate_component(PasswordInput, "PasswordInput").$$render($$result, Object.assign($$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}` : `${validate_component(TextInput, "TextInput").$$render($$result, Object.assign($$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}`}`;
  } while (!$$settled);
  return $$rendered;
});
var Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ref", "value", "invalid"]);
  let { ref = null } = $$props;
  let { value = "" } = $$props;
  let { invalid = false } = $$props;
  let current = Valid;
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (invalid) {
        current = Invalid;
      } else {
        current = Valid;
      }
    }
    $$rendered = `${validate_component(current || missing_component, "svelte:component").$$render($$result, Object.assign($$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}`;
  } while (!$$settled);
  return $$rendered;
});
var css$9 = {
  code: ".right.svelte-pb9zr2{float:right}",
  map: `{"version":3,"file":"reset_password.svelte","sources":["reset_password.svelte"],"sourcesContent":["<svelte:window on:keydown={keydown} />\\r\\n\\r\\n<script context='module'>\\r\\n    import { api } from '$lib/api'\\r\\n    export async function load(){\\r\\n        let res = await api.get('check_reset_password_token')\\r\\n        if(!res.r){\\r\\n            return {\\r\\n                status: 302,\\r\\n                redirect: 'login?n=invalid'\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n    import {\\r\\n        InlineLoading,\\r\\n        ButtonSet,\\r\\n        FluidForm,\\r\\n        Button,\\r\\n        Column,\\r\\n        Row\\r\\n    } from 'carbon-components-svelte'\\r\\n    import Input from '$lib/components/Input/Input.svelte'\\r\\n    import { goto } from '$app/navigation'\\r\\n    import { notify } from '$lib/stores'\\r\\n    import { post } from '$lib/utils/fetch/post'\\r\\n\\r\\n    let password\\r\\n    let password2\\r\\n    let passwordError\\r\\n    let passwordInvalid\\r\\n\\r\\n    let loading\\r\\n\\r\\n    const keydown=(e)=>{\\r\\n        if(e.ctrlKey){\\r\\n            switch(e.keyCode){\\r\\n                case 13:\\r\\n                    join()\\r\\n            }            \\r\\n        } else {\\r\\n            switch(e.keyCode){\\r\\n                case 13:\\r\\n                    login()\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n\\r\\n    let reset=async()=>{\\r\\n        loading = true\\r\\n        if(!password2){\\r\\n            passwordInvalid = true\\r\\n            passwordError = 'Empty'\\r\\n            loading = false\\r\\n            return\\r\\n        }\\r\\n        if(password2 !== password){\\r\\n            passwordInvalid = true\\r\\n            passwordError = 'Passwords do not match'\\r\\n            loading = false\\r\\n            return\\r\\n        }\\r\\n        let res = await api.put('reset_password', {password}).finally(\\r\\n            (r)=>{\\r\\n                loading=false\\r\\n                return r\\r\\n            }\\r\\n        )\\r\\n        if(res.r) {\\r\\n            $notify = 'resetSuccess'\\r\\n            await post('auth/login', {username, password})\\r\\n            goto('/')\\r\\n        } else {\\r\\n            $notify = 'invalidLink'\\r\\n            goto('/login')\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<Row noGutter>\\r\\n    <Column>\\r\\n        <FluidForm>\\r\\n            <Input\\r\\n                bind:invalid={passwordInvalid}\\r\\n                invalidText={passwordError}\\r\\n                bind:value=\\"{password2}\\"\\r\\n                labelText='Password'\\r\\n                password\\r\\n                focus\\r\\n            />\\r\\n            <Input\\r\\n                bind:value=\\"{password}\\"\\r\\n                labelText='Password'\\r\\n                password\\r\\n            />\\r\\n        </FluidForm>\\r\\n    </Column>\\r\\n</Row>\\r\\n\\r\\n<Row noGutter>\\r\\n    <Column>\\r\\n        <ButtonSet \\r\\n            stacked\\r\\n        >\\r\\n            <Button as let:props>\\r\\n                <div on:click={reset} {...props}>\\r\\n                    <p>Reset</p>\\r\\n                    {#if loading}\\r\\n                    <div class='right'>\\r\\n                        <InlineLoading />\\r\\n                    </div>\\r\\n                    {/if}\\r\\n                </div>\\r\\n            </Button>\\r\\n    </ButtonSet>\\r\\n    </Column>\\r\\n</Row>\\r\\n\\r\\n<style>\\r\\n    .right {\\r\\n        float: right;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAyHI,MAAM,cAAC,CAAC,AACJ,KAAK,CAAE,KAAK,AAChB,CAAC"}`
};
async function load$e() {
  let res = await api.get("check_reset_password_token");
  if (!res.r) {
    return { status: 302, redirect: "login?n=invalid" };
  }
}
var Reset_password = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_notify;
  $$unsubscribe_notify = subscribe(notify, (value) => value);
  let password;
  let password2;
  let passwordError;
  let passwordInvalid;
  $$result.css.add(css$9);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `





${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(FluidForm, "FluidForm").$$render($$result, {}, {}, {
          default: () => `${validate_component(Input, "Input").$$render($$result, {
            invalidText: passwordError,
            labelText: "Password",
            password: true,
            focus: true,
            invalid: passwordInvalid,
            value: password2
          }, {
            invalid: ($$value) => {
              passwordInvalid = $$value;
              $$settled = false;
            },
            value: ($$value) => {
              password2 = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(Input, "Input").$$render($$result, {
            labelText: "Password",
            password: true,
            value: password
          }, {
            value: ($$value) => {
              password = $$value;
              $$settled = false;
            }
          }, {})}`
        })}`
      })}`
    })}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(ButtonSet, "ButtonSet").$$render($$result, { stacked: true }, {}, {
          default: () => `${validate_component(Button, "Button").$$render($$result, { as: true }, {}, {
            default: ({ props }) => `<div${spread([escape_object(props)], "svelte-pb9zr2")}><p>Reset</p>
                    ${``}</div>`
          })}`
        })}`
      })}`
    })}`;
  } while (!$$settled);
  $$unsubscribe_notify();
  return $$rendered;
});
var reset_password = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Reset_password,
  load: load$e
});
var How_it_works = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => `${validate_component(Column, "Column").$$render($$result, { sm: 8, md: 8, lg: 8, xlg: 8 }, {}, {
      default: () => `<h1>How Apexlinks works</h1>

        <p>Apexlinks works by matching tags in your searches 
            with tags in user profiles and item&#39;s tags.
            Approximate matching is used, which means mispellings
            and partially matching tags are also matched, arranged
            in descending order from the closest match.
        </p>`
    })}`
  })}`;
});
var how_it_works = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": How_it_works
});
var ToastNotification_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(ToastNotification, "ToastNotification").$$render($$result, Object.assign({ lowContrast: true }, $$restProps), {}, {})}`;
});
var NavNotificationTemplate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(ToastNotification_1, "ToastNotification").$$render($$result, Object.assign({ caption: new Date().toLocaleString() }, $$restProps), {}, {})}`;
});
var ResetSuccess = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NavNotificationTemplate, "NavNotificationTemplate").$$render($$result, {
    kind: "success",
    title: "Password reset successful"
  }, {}, {})}`;
});
var Delete16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Delete16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M12 12H14V24H12zM18 12H20V24H18z"}"></path><path d="${"M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Delete16$1 = Delete16;
var Edit16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Edit16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M2 26H30V28H2zM25.4 9c.8-.8.8-2 0-2.8 0 0 0 0 0 0l-3.6-3.6c-.8-.8-2-.8-2.8 0 0 0 0 0 0 0l-15 15V24h6.4L25.4 9zM20.4 4L24 7.6l-3 3L17.4 7 20.4 4zM6 22v-3.6l10-10 3.6 3.6-10 10H6z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Edit16$1 = Edit16;
var Input_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { field = {} } = $$props;
  let ref;
  if ($$props.field === void 0 && $$bindings.field && field !== void 0)
    $$bindings.field(field);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${field.type === "text" ? `${validate_component(Input, "Input").$$render($$result, {
      labelText: field.label,
      invalidText: field.invalidText,
      ref,
      value: field.value,
      invalid: field.invalid
    }, {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        field.value = $$value;
        $$settled = false;
      },
      invalid: ($$value) => {
        field.invalid = $$value;
        $$settled = false;
      }
    }, {})}` : `${field.type === "number" ? `${validate_component(NumberInput, "NumberInput").$$render($$result, {
      placeholder: field.label,
      value: field.number
    }, {
      value: ($$value) => {
        field.number = $$value;
        $$settled = false;
      }
    }, {})}` : `${field.type === "range" ? `${validate_component(NumberInput, "NumberInput").$$render($$result, { label: "Minimum value", value: field.min }, {
      value: ($$value) => {
        field.min = $$value;
        $$settled = false;
      }
    }, {})}
    ${validate_component(NumberInput, "NumberInput").$$render($$result, { label: "Maximum value", value: field.max }, {
      value: ($$value) => {
        field.max = $$value;
        $$settled = false;
      }
    }, {})}` : `${validate_component(Input, "Input").$$render($$result, {
      labelText: field.label,
      invalidText: field.invalidText,
      ref,
      value: field.value,
      invalid: field.invalid
    }, {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        field.value = $$value;
        $$settled = false;
      },
      invalid: ($$value) => {
        field.invalid = $$value;
        $$settled = false;
      }
    }, {})}`}`}`}

${validate_component(Button, "Button").$$render($$result, {
      iconDescription: "Edit",
      hasIconOnly: true,
      kind: "ghost",
      size: "field",
      icon: Edit16$1
    }, {}, {})}`;
  } while (!$$settled);
  return $$rendered;
});
var Edit$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { field = {} } = $$props;
  const types2 = [
    { value: "text", text: "Text" },
    { value: "number", text: "Number" },
    { value: "range", text: "Range" }
  ];
  let ref;
  if ($$props.field === void 0 && $$bindings.field && field !== void 0)
    $$bindings.field(field);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Input, "Input").$$render($$result, {
      labelText: "Label",
      invalidText: field.invalidText,
      ref,
      value: field.label,
      invalid: field.invalid
    }, {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        field.label = $$value;
        $$settled = false;
      },
      invalid: ($$value) => {
        field.invalid = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Select, "Select").$$render($$result, {
      labelText: "Filter type",
      selected: field.type
    }, {
      selected: ($$value) => {
        field.type = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${each(types2, (type) => `${validate_component(SelectItem, "SelectItem").$$render($$result, { value: type.value, text: type.text }, {}, {})}`)}`
    })}

${!field.new ? `${validate_component(Button, "Button").$$render($$result, {
      iconDescription: "Cancel",
      hasIconOnly: true,
      kind: "ghost",
      size: "field",
      icon: Close16$1
    }, {}, {})}` : ``}

${validate_component(Button, "Button").$$render($$result, {
      iconDescription: "Accept",
      hasIconOnly: true,
      kind: "ghost",
      size: "field",
      icon: Checkmark16$1
    }, {}, {})}`;
  } while (!$$settled);
  return $$rendered;
});
var Pin16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Pin16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M28.59,13.31,30,11.9,20,2,18.69,3.42,19.87,4.6,8.38,14.32,6.66,12.61,5.25,14l5.66,5.68L2,28.58,3.41,30l8.91-8.91L18,26.75l1.39-1.42-1.71-1.71L27.4,12.13ZM16.26,22.2,9.8,15.74,21.29,6,26,10.71Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Pin16$1 = Pin16;
var Unpinned = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Button, "Button").$$render($$result, {
    iconDescription: "Pin field",
    hasIconOnly: true,
    kind: "ghost",
    size: "field",
    icon: Pin16$1
  }, {}, {})}`;
});
var PinFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "PinFilled16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M28.5858,13.3137,30,11.9,20,2,18.6858,3.415l1.1858,1.1857L8.38,14.3225,6.6641,12.6067,5.25,14l5.6572,5.6773L2,28.5831,3.41,30l8.9111-8.9087L18,26.7482l1.3929-1.414L17.6765,23.618l9.724-11.4895Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var PinFilled16$1 = PinFilled16;
var Pinned = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Button, "Button").$$render($$result, {
    iconDescription: "Unpin field",
    hasIconOnly: true,
    kind: "ghost",
    size: "field",
    icon: PinFilled16$1
  }, {}, {})}`;
});
var Pin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["pinned"]);
  let { pinned = false } = $$props;
  let current = Unpinned;
  if ($$props.pinned === void 0 && $$bindings.pinned && pinned !== void 0)
    $$bindings.pinned(pinned);
  {
    if (pinned) {
      current = Pinned;
    } else {
      current = Unpinned;
    }
  }
  return `${validate_component(current || missing_component, "svelte:component").$$render($$result, Object.assign($$restProps), {}, {})}`;
});
var Field = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pin = false } = $$props;
  let { field = {} } = $$props;
  createEventDispatcher();
  let current;
  if ($$props.pin === void 0 && $$bindings.pin && pin !== void 0)
    $$bindings.pin(pin);
  if ($$props.field === void 0 && $$bindings.field && field !== void 0)
    $$bindings.field(field);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (field.edit) {
        current = Edit$1;
      } else if (!field.edit) {
        current = Input_1;
      }
    }
    $$rendered = `



${validate_component(current || missing_component, "svelte:component").$$render($$result, { field }, {
      field: ($$value) => {
        field = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Button, "Button").$$render($$result, {
      iconDescription: "Delete",
      hasIconOnly: true,
      kind: "ghost",
      size: "field",
      icon: Delete16$1
    }, {}, {})}

${pin ? `${validate_component(Pin, "Pin").$$render($$result, { pinned: field.pinned }, {
      pinned: ($$value) => {
        field.pinned = $$value;
        $$settled = false;
      }
    }, {})}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
var Fields = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { prompt = "Add Custom Field" } = $$props;
  let { pin = false } = $$props;
  let { fields = [] } = $$props;
  if ($$props.prompt === void 0 && $$bindings.prompt && prompt !== void 0)
    $$bindings.prompt(prompt);
  if ($$props.pin === void 0 && $$bindings.pin && pin !== void 0)
    $$bindings.pin(pin);
  if ($$props.fields === void 0 && $$bindings.fields && fields !== void 0)
    $$bindings.fields(fields);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      console.log("fields: ", fields);
    }
    $$rendered = `${each(fields, (field) => `${validate_component(Field, "Field").$$render($$result, { pin, field }, {
      field: ($$value) => {
        field = $$value;
        $$settled = false;
      }
    }, {})}`)}

<div>${validate_component(Button, "Button").$$render($$result, {}, {}, { default: () => `${escape(prompt)}` })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
var Filters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open: open2 = false } = $$props;
  let { fields = [] } = $$props;
  createEventDispatcher();
  if ($$props.open === void 0 && $$bindings.open && open2 !== void 0)
    $$bindings.open(open2);
  if ($$props.fields === void 0 && $$bindings.fields && fields !== void 0)
    $$bindings.fields(fields);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Modal, "Modal").$$render($$result, {
      modalHeading: "Filters",
      primaryButtonText: "Search",
      secondaryButtonText: "Cancel",
      shouldSubmitOnEnter: false,
      hasScrollingContent: true,
      hasForm: true,
      open: open2
    }, {
      open: ($$value) => {
        open2 = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${validate_component(Fields, "Fields").$$render($$result, { prompt: "Add Filter", fields }, {
        fields: ($$value) => {
          fields = $$value;
          $$settled = false;
        }
      }, {})}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
var css$8 = {
  code: ".label.svelte-1uvew65{padding-left:0.5rem\r\n    }.item.svelte-1uvew65{display:flex;flex-direction:row}.pointer.svelte-1uvew65:hover{cursor:pointer}",
  map: `{"version":3,"file":"item_search.svelte","sources":["item_search.svelte"],"sourcesContent":["<script context='module'>\\r\\n    export async function load({page, session}){\\r\\n        return {\\r\\n            props: {\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n    import {\\r\\n        Row,\\r\\n        Column,\\r\\n        PaginationNav,\\r\\n    } from 'carbon-components-svelte'\\r\\n    import { api } from '$lib/api'\\r\\n    import {\\r\\n        itemFields,\\r\\n        itemTags,\\r\\n        notify,\\r\\n    } from '$lib/stores'\\r\\n    import Filter16 from 'carbon-icons-svelte/lib/Filter16'\\r\\n    import ResetSuccess from '$lib/components/Notifications/ResetSuccess.svelte'\\r\\n    import Tag from '$lib/components/Tag.svelte'\\r\\n    import {goto} from '$app/navigation'\\r\\n    import Filters from '$lib/components/Filters.svelte';\\r\\n\\r\\n    $: if (got) get(page)\\r\\n\\r\\n    let filtersOpen\\r\\n\\r\\n    let items = []\\r\\n    let page = 0\\r\\n    let total = 0\\r\\n    let pages = 0\\r\\n\\r\\n    let got\\r\\n\\r\\n    const go=async(item)=>{\\r\\n        item = await api.get(\`items/\${item.id}\`)\\r\\n        if(!item || item.error){\\r\\n            $notify = {\\r\\n                title: error\\r\\n            }\\r\\n            return\\r\\n        } else {\\r\\n            goto(\`/item/\${item.id}\`)\\r\\n        }\\r\\n    }\\r\\n\\r\\n    const get = async()=>{\\r\\n        let tagString = JSON.stringify($itemTags)\\r\\n        let fieldString = JSON.stringify($itemFields)\\r\\n        let url = \`items?fields=\${fieldString}&$tags=\${tagString}&page=\${page+1}\`\\r\\n        let res = await api.get(url)\\r\\n        if(Array.isArray(res.items)){\\r\\n            items = res.items\\r\\n            total = res.total\\r\\n            pages = res.pages\\r\\n            got = true\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Apexlinks</title>\\r\\n</svelte:head>\\r\\n\\r\\n<Filters\\r\\n    bind:fields={$itemFields}\\r\\n    bind:open={filtersOpen}\\r\\n    on:search={get}\\r\\n/>\\r\\n\\r\\n<Tag \\r\\n    on:iconClick={()=>{filtersOpen=!filtersOpen}} \\r\\n    bind:tags={$itemTags}\\r\\n    placeholder='Search'\\r\\n    icon={Filter16}\\r\\n    on:change={get}\\r\\n    button\\r\\n/>    \\r\\n\\r\\n{#each items as item}\\r\\n    <br />\\r\\n    <Row noGutter>\\r\\n        <Column lg={1} sm={1} md={1} xlg={1}>\\r\\n            <div on:click={go} class='pointer item'>\\r\\n                {#if item.image}\\r\\n                    <img style='vertical-align: top;' height='52px' width='52px' alt='profile pic' src={item.image}>\\r\\n                {:else}\\r\\n                    <img style='vertical-align: top;' height='52px' width='52px' alt='profile pic' src='/placeholder.png'>\\r\\n                {/if}\\r\\n                <div class='label'>\\r\\n                    <h4>{item.name}</h4>\\r\\n                    {#if item.user}\\r\\n                        <p class='bx--link--sm'>{item.user}</p>\\r\\n                    {/if}\\r\\n                    {#if item.itype}\\r\\n                        <p class='bx--link--sm'>{item.itype}</p>\\r\\n                    {/if}\\r\\n                </div>\\r\\n            </div>\\r\\n        </Column>\\r\\n    </Row>\\r\\n{/each}\\r\\n\\r\\n{#if got && total < 1}\\r\\n    <Row noGutter>\\r\\n        <Column>\\r\\n            <p>There doesn't seem to be any results</p>        \\r\\n        </Column>\\r\\n    </Row>\\r\\n{/if}\\r\\n\\r\\n{#if total>10}\\r\\n    <Row noGutter>\\r\\n        <Column>\\r\\n            <PaginationNav loop bind:page bind:total={pages}/>\\r\\n        </Column>\\r\\n    </Row>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n    .label {\\r\\n        padding-left: 0.5rem\\r\\n    }\\r\\n    .item {\\r\\n        display: flex;\\r\\n        flex-direction: row;\\r\\n    }\\r\\n    .pointer:hover {\\r\\n        cursor: pointer;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA4HI,MAAM,eAAC,CAAC,AACJ,YAAY,CAAE,MAAM;IACxB,CAAC,AACD,KAAK,eAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,AACvB,CAAC,AACD,uBAAQ,MAAM,AAAC,CAAC,AACZ,MAAM,CAAE,OAAO,AACnB,CAAC"}`
};
async function load$d({ page: page2, session: session2 }) {
  return { props: {} };
}
var Item_search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $itemFields, $$unsubscribe_itemFields;
  let $itemTags, $$unsubscribe_itemTags;
  let $$unsubscribe_notify;
  $$unsubscribe_itemFields = subscribe(itemFields, (value) => $itemFields = value);
  $$unsubscribe_itemTags = subscribe(itemTags, (value) => $itemTags = value);
  $$unsubscribe_notify = subscribe(notify, (value) => value);
  let filtersOpen;
  let items = [];
  $$result.css.add(css$8);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `${$$result.title = `<title>Apexlinks</title>`, ""}`, ""}

${validate_component(Filters, "Filters").$$render($$result, { fields: $itemFields, open: filtersOpen }, {
      fields: ($$value) => {
        $itemFields = $$value;
        $$settled = false;
      },
      open: ($$value) => {
        filtersOpen = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Tag_1, "Tag").$$render($$result, {
      placeholder: "Search",
      icon: Filter16$1,
      button: true,
      tags: $itemTags
    }, {
      tags: ($$value) => {
        $itemTags = $$value;
        $$settled = false;
      }
    }, {})}    

${each(items, (item) => `<br>
    ${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, { lg: 1, sm: 1, md: 1, xlg: 1 }, {}, {
        default: () => `<div class="${"pointer item svelte-1uvew65"}">${item.image ? `<img style="${"vertical-align: top;"}" height="${"52px"}" width="${"52px"}" alt="${"profile pic"}"${add_attribute("src", item.image, 0)}>` : `<img style="${"vertical-align: top;"}" height="${"52px"}" width="${"52px"}" alt="${"profile pic"}" src="${"/placeholder.png"}">`}
                <div class="${"label svelte-1uvew65"}"><h4>${escape(item.name)}</h4>
                    ${item.user ? `<p class="${"bx--link--sm"}">${escape(item.user)}</p>` : ``}
                    ${item.itype ? `<p class="${"bx--link--sm"}">${escape(item.itype)}</p>` : ``}
                </div></div>
        `
      })}
    `
    })}`)}

${``}

${``}`;
  } while (!$$settled);
  $$unsubscribe_itemFields();
  $$unsubscribe_itemTags();
  $$unsubscribe_notify();
  return $$rendered;
});
var item_search = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Item_search,
  load: load$d
});
async function load$c({ page: page2, session: session2 }) {
  let user = session2.user;
  let { id } = page2.params;
  let room2 = await api.get(`rooms/${id}`);
  if (!user) {
    return { status: 302, redirect: "/login" };
  }
  if (!(room2.user == user.username)) {
    return {
      error: "You're not authorized to edit this room",
      status: "401"
    };
  }
  return { props: { room: room2, user } };
}
var U5Bidu5D$6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_context;
  $$unsubscribe_context = subscribe(context, (value) => value);
  let { room: room2, user } = $$props;
  let nameInvalid;
  let name = room2.name;
  let tags = room2.tags;
  let delOpen;
  if ($$props.room === void 0 && $$bindings.room && room2 !== void 0)
    $$bindings.room(room2);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Modal, "Modal").$$render($$result, {
      modalHeading: "Delete room",
      primaryButtonText: "Delete",
      secondaryButtonText: "Cancel",
      open: delOpen
    }, {
      open: ($$value) => {
        delOpen = $$value;
        $$settled = false;
      }
    }, {
      default: () => `<p>Sure you want to delete this room?</p>`
    })}

${$$result.head += `${$$result.title = `<title>Edit Room</title>`, ""}`, ""}

${room2.open ? `${validate_component(Tag_1, "Tag").$$render($$result, { tags }, {
      tags: ($$value) => {
        tags = $$value;
        $$settled = false;
      }
    }, {})}` : ``}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(FluidForm, "FluidForm").$$render($$result, {}, {}, {
          default: () => `${validate_component(Input, "Input").$$render($$result, {
            labelText: "Name",
            invalidText: "Name taken",
            value: name,
            invalid: nameInvalid
          }, {
            value: ($$value) => {
              name = $$value;
              $$settled = false;
            },
            invalid: ($$value) => {
              nameInvalid = $$value;
              $$settled = false;
            }
          }, {})}`
        })}`
      })}`
    })}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(ButtonSet, "ButtonSet").$$render($$result, { stacked: true }, {}, {
        default: () => `${validate_component(Button, "Button").$$render($$result, {}, {}, { default: () => `Delete` })}
        ${validate_component(Button, "Button").$$render($$result, {}, {}, { default: () => `Edit` })}`
      })}`
    })}`;
  } while (!$$settled);
  $$unsubscribe_context();
  return $$rendered;
});
var _id_$6 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bidu5D$6,
  load: load$c
});
function initialCaps(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return {};
  }
}
var Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { image = "" } = $$props;
  let imageRef;
  let imgRef;
  let labelText;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (!image) {
        labelText = "Set Image";
      } else {
        labelText = "Change Image";
      }
    }
    $$rendered = `${``}

${image ? `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `<img style="${"width: 137px;"}" width="${"100%"}" heigth="${"100%"}" alt="${"display"}" src="${""}"${add_attribute("this", imgRef, 0)}>`
      })}`
    })}` : ``}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(ButtonSet, "ButtonSet").$$render($$result, { stacked: true }, {}, {
          default: () => `${validate_component(FileUploaderButton, "FileUploaderButton").$$render($$result, {
            disableLabelChanges: true,
            labelText,
            ref: imageRef
          }, {
            ref: ($$value) => {
              imageRef = $$value;
              $$settled = false;
            }
          }, {})}
            ${slots.default ? slots.default({}) : ``}`
        })}`
      })}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
async function load$b({ session: session2 }) {
  const user = session2.user;
  if (!user) {
    return { status: 302, redirect: "login" };
  }
}
var Add_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let nameInvalid;
  let link;
  let name;
  let itext;
  let itype;
  let redirect;
  let tags = [];
  let image;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    itype = initialCaps(itype);
    $$rendered = `





${$$result.head += `${$$result.title = `<title>Add Item</title>`, ""}`, ""}

${validate_component(Image, "Image").$$render($$result, { image }, {
      image: ($$value) => {
        image = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Tag_1, "Tag").$$render($$result, { tags }, {
      tags: ($$value) => {
        tags = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(FluidForm, "FluidForm").$$render($$result, {}, {}, {
          default: () => `${validate_component(Input, "Input").$$render($$result, {
            invalidText: "Name taken",
            labelText: "Name",
            invalid: nameInvalid,
            value: name
          }, {
            invalid: ($$value) => {
              nameInvalid = $$value;
              $$settled = false;
            },
            value: ($$value) => {
              name = $$value;
              $$settled = false;
            }
          }, {})}
            
            ${validate_component(Checkbox, "Checkbox").$$render($$result, {
            labelText: "Let the item's listing redirect to a link",
            checked: redirect
          }, {
            checked: ($$value) => {
              redirect = $$value;
              $$settled = false;
            }
          }, {})}
            ${redirect ? `${validate_component(TextInput, "TextInput").$$render($$result, { labelText: "Link", value: link }, {
            value: ($$value) => {
              link = $$value;
              $$settled = false;
            }
          }, {})}` : ``}
            ${!redirect ? `${validate_component(TextArea, "TextArea").$$render($$result, {
            placeholder: "Description(Markdown)",
            labelText: "Description(markdown)",
            value: itext
          }, {
            value: ($$value) => {
              itext = $$value;
              $$settled = false;
            }
          }, {})}` : ``}`
        })}`
      })}`
    })}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(ButtonSet, "ButtonSet").$$render($$result, { stacked: true }, {}, {
          default: () => `${validate_component(Button, "Button").$$render($$result, {}, {}, { default: () => `Add` })}`
        })}`
      })}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
var add_item = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Add_item,
  load: load$b
});
async function load$a({ session: session2 }) {
  let user = session2.user;
  if (!user) {
    return { status: 302, redirect: "/login" };
  }
  return { props: { user } };
}
var Add_room = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_context;
  let $username, $$unsubscribe_username;
  let $open, $$unsubscribe_open;
  $$unsubscribe_context = subscribe(context, (value) => value);
  $$unsubscribe_username = subscribe(username, (value) => $username = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  let nameInvalid;
  let userInvalid;
  let nameError;
  let userError;
  let name;
  let tags;
  const checkUser = async () => {
    if ($username == "")
      return;
    let res = await api.get(`users/${$username}`) || {};
    if (res.id) {
      userInvalid = false;
    } else {
      userInvalid = true;
      userError = "Not found";
    }
  };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (process.browser && $username) {
        setTimeout(checkUser, 123);
      }
    }
    $$rendered = `${$$result.head += `${$$result.title = `<title>Add Room</title>`, ""}`, ""}



${$open ? `${validate_component(Tag_1, "Tag").$$render($$result, { tags }, {
      tags: ($$value) => {
        tags = $$value;
        $$settled = false;
      }
    }, {})}` : ``}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(FluidForm, "FluidForm").$$render($$result, {}, {}, {
          default: () => `${validate_component(Input, "Input").$$render($$result, {
            invalidText: nameError,
            labelText: "Name",
            invalid: nameInvalid,
            value: name
          }, {
            invalid: ($$value) => {
              nameInvalid = $$value;
              $$settled = false;
            },
            value: ($$value) => {
              name = $$value;
              $$settled = false;
            }
          }, {})}
            ${!$open ? `${validate_component(Input, "Input").$$render($$result, {
            invalidText: userError,
            labelText: "User",
            invalid: userInvalid,
            value: $username
          }, {
            invalid: ($$value) => {
              userInvalid = $$value;
              $$settled = false;
            },
            value: ($$value) => {
              $username = $$value;
              $$settled = false;
            }
          }, {})}` : ``}`
        })}`
      })}`
    })}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(ButtonSet, "ButtonSet").$$render($$result, { stacked: true }, {}, {
          default: () => `${validate_component(Button, "Button").$$render($$result, { as: true }, {}, {
            default: ({ props }) => `<div${spread([escape_object(props)])}><p>Add</p>
                    ${``}</div>`
          })}`
        })}`
      })}`
    })}`;
  } while (!$$settled);
  $$unsubscribe_context();
  $$unsubscribe_username();
  $$unsubscribe_open();
  return $$rendered;
});
var add_room = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Add_room,
  load: load$a
});
var css$7 = {
  code: ".item.svelte-11iupaf{cursor:pointer}.item.svelte-11iupaf:hover{color:grey}.unseen.svelte-11iupaf{font-weight:600}",
  map: `{"version":3,"file":"my_rooms.svelte","sources":["my_rooms.svelte"],"sourcesContent":["<script context='module'>\\r\\n    import { api } from '$lib/api'\\r\\n    export async function load({session}){\\r\\n        let user = session.user\\r\\n        if(!user){\\r\\n            return {\\r\\n                status: 302,\\r\\n                redirect: '/login'\\r\\n            }\\r\\n        }\\r\\n        let rooms\\r\\n        let {items, total, page} = await api.get('xrooms') || {}\\r\\n        if (Array.isArray(items)) {\\r\\n            rooms = items\\r\\n        } else {\\r\\n            rooms = []\\r\\n        }\\r\\n        return {\\r\\n            props: {\\r\\n                rooms,\\r\\n                total,\\r\\n                page,\\r\\n                user\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n    export let rooms\\r\\n    export let total\\r\\n    export let page\\r\\n    import {\\r\\n        Row,\\r\\n        Column,\\r\\n    } from 'carbon-components-svelte'\\r\\n    import Tag from '$lib/components/Tag.svelte'\\r\\n    import { goto } from '$app/navigation'\\r\\n\\r\\n    let tags\\r\\n\\r\\n    $: if(typeof document != 'undefined' && total>100 && document.body.scrollTop==document.body.scrollHeight){\\r\\n        page++\\r\\n        get()\\r\\n    }\\r\\n\\r\\n    let go=(room)=>{\\r\\n        goto(\`/room/\${room.id}\`)\\r\\n    }\\r\\n\\r\\n    let get=async()=>{\\r\\n        let tagString = JSON.stringify(tags)\\r\\n        let res = await api.get(\`xrooms?tags=\${tagString}&page=\${page}\`)\\r\\n        rooms = res.items\\r\\n        total = res.total\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<Tag on:change={get} bind:tags />\\r\\n\\r\\n{#each rooms as room}\\r\\n    <br />\\r\\n    <Row noGutter>\\r\\n        <Column>\\r\\n            <p class:unseen={room.unseen} class='item' on:click={go(room)}>{room.name}</p>\\r\\n        </Column>\\r\\n    </Row>\\r\\n{/each}\\r\\n\\r\\n<style>\\r\\n    .item {\\r\\n        cursor: pointer; \\r\\n    }\\r\\n    .item:hover {\\r\\n        color: grey;\\r\\n    }\\r\\n    .unseen {\\r\\n        font-weight: 600;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAsEI,KAAK,eAAC,CAAC,AACH,MAAM,CAAE,OAAO,AACnB,CAAC,AACD,oBAAK,MAAM,AAAC,CAAC,AACT,KAAK,CAAE,IAAI,AACf,CAAC,AACD,OAAO,eAAC,CAAC,AACL,WAAW,CAAE,GAAG,AACpB,CAAC"}`
};
async function load$9({ session: session2 }) {
  let user = session2.user;
  if (!user) {
    return { status: 302, redirect: "/login" };
  }
  let rooms2;
  let { items, total, page: page2 } = await api.get("xrooms") || {};
  if (Array.isArray(items)) {
    rooms2 = items;
  } else {
    rooms2 = [];
  }
  return { props: { rooms: rooms2, total, page: page2, user } };
}
var My_rooms = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { rooms: rooms2 } = $$props;
  let { total } = $$props;
  let { page: page2 } = $$props;
  let tags;
  let get = async () => {
    let tagString = JSON.stringify(tags);
    let res = await api.get(`xrooms?tags=${tagString}&page=${page2}`);
    rooms2 = res.items;
    total = res.total;
  };
  if ($$props.rooms === void 0 && $$bindings.rooms && rooms2 !== void 0)
    $$bindings.rooms(rooms2);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  $$result.css.add(css$7);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (typeof document != "undefined" && total > 100 && document.body.scrollTop == document.body.scrollHeight) {
        page2++;
        get();
      }
    }
    $$rendered = `${validate_component(Tag_1, "Tag").$$render($$result, { tags }, {
      tags: ($$value) => {
        tags = $$value;
        $$settled = false;
      }
    }, {})}

${each(rooms2, (room2) => `<br>
    ${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `<p class="${["item svelte-11iupaf", room2.unseen ? "unseen" : ""].join(" ").trim()}">${escape(room2.name)}</p>
        `
      })}
    `
    })}`)}`;
  } while (!$$settled);
  return $$rendered;
});
var my_rooms = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": My_rooms,
  load: load$9
});
function __extends(d2, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d2[p] = b[p];
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
(function(_super) {
  __extends(ParseError, _super);
  function ParseError(message, pos, loc) {
    var _this = _super.call(this, message) || this;
    _this.pos = pos;
    _this.loc = loc;
    return _this;
  }
  return ParseError;
})(Error);
var langs = {
  bash: "bash",
  html: "markup",
  sv: "svelte",
  js: "javascript",
  css: "css",
  diff: "diff"
};
function link_renderer(href, title, text) {
  let target_attr = "";
  let title_attr = "";
  if (href.startsWith("http")) {
    target_attr = ' target="_blank"';
  }
  if (title !== null) {
    title_attr = ` title="${title}"`;
  }
  return `<a href="${href}"${target_attr}${title_attr} rel="noopener noreferrer">${text}</a>`;
}
function highlight(source, lang) {
  const plang = langs[lang] || "";
  const highlighted = source.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
  return `<pre class='language-${plang}'><code>${highlighted}</code></pre>`;
}
var renderer = new marked.Renderer();
renderer.link = link_renderer;
renderer.code = highlight;
renderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
  return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
};
renderer.list = (body, ordered, start) => {
  if (!ordered) {
    return `
            <ul style='list-style-type: square; list-style-position: inside;'>
                ${body}
            </ul>
        `;
  }
  if (ordered) {
    return `
            <ol style='list-style-type: decimal; list-style-position: inside;'>
                ${body}
            </ol>
        `;
  }
};
marked.setOptions({
  renderer
});
function parseMarkdown(markdown) {
  if (markdown) {
    return marked(markdown.replace(/^\t+/gm, (match) => match.split("	").join("  ")).replace(/^\n+/gm, (match) => match.split("\n").join("<br /> \n")), { renderer });
  } else {
    return {};
  }
}
async function preload({ params }) {
  let { id } = params;
  let event = await api.get(`events/${id}`);
  if (event == "404")
    this.error(404, "event not Found");
  if (event == "423")
    this.error(423, "event not visible");
  return { event };
}
var U5Bidu5D$5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  let { event } = $$props;
  let itext;
  if (event.itext) {
    itext = parseMarkdown(event.itext);
  }
  if ($$props.event === void 0 && $$bindings.event && event !== void 0)
    $$bindings.event(event);
  $$unsubscribe_session();
  return `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => `${validate_component(Column, "Column").$$render($$result, { lg: 2, sm: 2, md: 2, xlg: 2 }, {}, {
      default: () => `<div style="${"width: 111px; height: 111px;"}"><img width="${"100%"}" height="${"100%"}" alt="${"eventImage"}"${add_attribute("src", event.image, 0)}></div>`
    })}
    ${validate_component(Column, "Column").$$render($$result, { lg: 4, sm: 4, md: 4, xlg: 4 }, {}, {
      default: () => `${event.name ? `<h2>${escape(event.name)}</h2>` : ``}
        <p>${escape(event.itype)}</p>
        ${event.address ? `<p>${escape(event.address)}</p>` : ``}
        ${event.website ? `${validate_component(Link, "Link").$$render($$result, { href: event.website }, {}, {
        default: () => `${escape(event.website)}`
      })}` : ``}
        ${event.email ? `<p>${escape(event.email)}</p>` : ``}
        ${event.phone ? `<p>${escape(event.phone)}</p>` : ``}
        
        ${validate_component(Link, "Link").$$render($$result, { href: event.user }, {}, { default: () => `User` })}
        ${$session.user.username == event.user ? `${validate_component(Link, "Link").$$render($$result, { href: "edit/" + event.id }, {}, { default: () => `Edit` })}` : ``}`
    })}`
  })}

${itext ? `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => `${validate_component(Column, "Column").$$render($$result, { lg: 6, sm: 6, md: 6, xlg: 6 }, {}, {
      default: () => `<p><!-- HTML_TAG_START -->${itext}<!-- HTML_TAG_END --></p>`
    })}`
  })}` : ``}`;
});
var _id_$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bidu5D$5,
  preload
});
var css$6 = {
  code: ".label.svelte-1uvew65{padding-left:0.5rem\r\n    }.item.svelte-1uvew65{display:flex;flex-direction:row}.pointer.svelte-1uvew65:hover{cursor:pointer}",
  map: `{"version":3,"file":"[id].svelte","sources":["[id].svelte"],"sourcesContent":["<script context='module'>\\r\\n    export async function load({ page }){\\r\\n        let items = []\\r\\n        let total = 0\\r\\n        let pages = 0\\r\\n        let {id} = page.params\\r\\n        let user = await api.get(\`users/\${id}\`)\\r\\n        let res = await api.get(\`items?id=\${id}\`)\\r\\n        if (res.error){\\r\\n            return {\\r\\n                status: res.status,\\r\\n                error: res.error\\r\\n            }\\r\\n        }\\r\\n        if(Array.isArray(res.items)){\\r\\n            items = res.items\\r\\n            total = res.total\\r\\n            pages = res.pages\\r\\n        }\\r\\n        return {\\r\\n            props: {\\r\\n                items,\\r\\n                total,\\r\\n                pages,\\r\\n                user,\\r\\n                id\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n    export let items = []\\r\\n    export let total = 0\\r\\n    export let pages = 0\\r\\n    export let user\\r\\n    export let id\\r\\n\\r\\n    import {\\r\\n        PaginationNav,\\r\\n        Checkbox,\\r\\n        Column,\\r\\n        Row,\\r\\n    } from 'carbon-components-svelte'\\r\\n    import Tag from \\"$lib/components/Tag.svelte\\";\\r\\n    import { api } from '$lib/api'\\r\\n    import { goto } from '$app/navigation'\\r\\n\\r\\n    let page = 0\\r\\n\\r\\n    let hidden = true\\r\\n    let tags=[]\\r\\n    let got\\r\\n\\r\\n    $: get(hidden, page)\\r\\n\\r\\n    const get = async function(){\\r\\n        let tagString = JSON.stringify(tags)\\r\\n        let url = \`items?hidden=\${hidden}&id=\${id}&tags=\${tagString}&page=\${page+1}\`\\r\\n        let res = await api.get(url)\\r\\n        if(Array.isArray(res.items)){\\r\\n            items = res.items\\r\\n            total = res.total\\r\\n            pages = res.pages\\r\\n            got = true\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>{\`\${user.username.split(' ')[0]}'s items\`}</title>\\r\\n</svelte:head>\\r\\n\\r\\n<Tag on:change={get} placeholder='Search' bind:tags />\\r\\n\\r\\n<Row noGutter>\\r\\n    <Column>\\r\\n        <Checkbox bind:checked={hidden} labelText='Hidden' />\\r\\n    </Column>\\r\\n</Row>\\r\\n\\r\\n{#each items as item}\\r\\n    <br/>\\r\\n    <Row noGutter>\\r\\n        <Column lg={1} sm={1} md={1} xlg={1}>\\r\\n            <div on:click={goto(\`/item/\${item.id}\`)} class='pointer item'>\\r\\n                {#if item.image}\\r\\n                    <img style='vertical-align: top;' width='100%' alt='item display _image' src={item.image}>\\r\\n                {:else}\\r\\n                    <img style='vertical-align: top;' width='100%' alt='item display _image' src='/placeholder.png'>\\r\\n                {/if}\\r\\n                <div class='label'>\\r\\n                    <h4>{item.name}</h4>\\r\\n                    {#if item.fields}\\r\\n                        {#each item.fields as field}\\r\\n                            {#if item.pinned}\\r\\n                                <div>\\r\\n                                    <span class='bold'>{field.label}: </span>\\r\\n                                    <span>{field.value}</span>\\r\\n                                </div>\\r\\n                            {/if}\\r\\n                        {/each}\\r\\n                    {/if}\\r\\n                    <!-- {#if item.itype}\\r\\n                        <p class='bx--link--sm'>{item.itype}</p>\\r\\n                    {/if} -->\\r\\n                </div>\\r\\n            </div>\\r\\n        </Column>\\r\\n    </Row>\\r\\n{/each}\\r\\n\\r\\n{#if got && total < 1}\\r\\n    <Row noGutter>\\r\\n        <p>There doesn't seem to be any results</p>\\r\\n    </Row>\\r\\n{/if}\\r\\n\\r\\n{#if total>10}\\r\\n    <PaginationNav loop bind:page bind:total={pages}/>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n    .label {\\r\\n        padding-left: 0.5rem\\r\\n    }\\r\\n    .item {\\r\\n        display: flex;\\r\\n        flex-direction: row;\\r\\n    }\\r\\n    .pointer:hover {\\r\\n        cursor: pointer;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA2HI,MAAM,eAAC,CAAC,AACJ,YAAY,CAAE,MAAM;IACxB,CAAC,AACD,KAAK,eAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,AACvB,CAAC,AACD,uBAAQ,MAAM,AAAC,CAAC,AACZ,MAAM,CAAE,OAAO,AACnB,CAAC"}`
};
async function load$8({ page: page2 }) {
  let items = [];
  let total = 0;
  let pages = 0;
  let { id } = page2.params;
  let user = await api.get(`users/${id}`);
  let res = await api.get(`items?id=${id}`);
  if (res.error) {
    return { status: res.status, error: res.error };
  }
  if (Array.isArray(res.items)) {
    items = res.items;
    total = res.total;
    pages = res.pages;
  }
  return { props: { items, total, pages, user, id } };
}
var U5Bidu5D$4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [] } = $$props;
  let { total = 0 } = $$props;
  let { pages = 0 } = $$props;
  let { user } = $$props;
  let { id } = $$props;
  let page2 = 0;
  let hidden = true;
  let tags = [];
  let got;
  const get = async function() {
    let tagString = JSON.stringify(tags);
    let url = `items?hidden=${hidden}&id=${id}&tags=${tagString}&page=${page2 + 1}`;
    let res = await api.get(url);
    if (Array.isArray(res.items)) {
      items = res.items;
      total = res.total;
      pages = res.pages;
      got = true;
    }
  };
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
    $$bindings.pages(pages);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$6);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      get();
    }
    $$rendered = `${$$result.head += `${$$result.title = `<title>${escape(`${user.username.split(" ")[0]}'s items`)}</title>`, ""}`, ""}

${validate_component(Tag_1, "Tag").$$render($$result, { placeholder: "Search", tags }, {
      tags: ($$value) => {
        tags = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(Checkbox, "Checkbox").$$render($$result, { labelText: "Hidden", checked: hidden }, {
          checked: ($$value) => {
            hidden = $$value;
            $$settled = false;
          }
        }, {})}`
      })}`
    })}

${each(items, (item) => `<br>
    ${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, { lg: 1, sm: 1, md: 1, xlg: 1 }, {}, {
        default: () => `<div class="${"pointer item svelte-1uvew65"}">${item.image ? `<img style="${"vertical-align: top;"}" width="${"100%"}" alt="${"item display _image"}"${add_attribute("src", item.image, 0)}>` : `<img style="${"vertical-align: top;"}" width="${"100%"}" alt="${"item display _image"}" src="${"/placeholder.png"}">`}
                <div class="${"label svelte-1uvew65"}"><h4>${escape(item.name)}</h4>
                    ${item.fields ? `${each(item.fields, (field) => `${item.pinned ? `<div><span class="${"bold"}">${escape(field.label)}: </span>
                                    <span>${escape(field.value)}</span>
                                </div>` : ``}`)}` : ``}
                    
                </div></div>
        `
      })}
    `
    })}`)}

${got && total < 1 ? `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `<p>There doesn&#39;t seem to be any results</p>`
    })}` : ``}

${total > 10 ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, { loop: true, page: page2, total: pages }, {
      page: ($$value) => {
        page2 = $$value;
        $$settled = false;
      },
      total: ($$value) => {
        pages = $$value;
        $$settled = false;
      }
    }, {})}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
var _id_$4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bidu5D$4,
  load: load$8
});
var InvalidLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NavNotificationTemplate, "NavNotificationTemplate").$$render($$result, { title: "Invalid password reset link" }, {}, {})}`;
});
var css$5 = {
  code: ".fixed.svelte-im6ayo{position:fixed;z-index:1000000;top:0;left:0}",
  map: `{"version":3,"file":"NavNotification.svelte","sources":["NavNotification.svelte"],"sourcesContent":["<script>\\r\\n    import { notify } from '$lib/stores'\\r\\n    import InvalidLink from './InvalidLink.svelte'\\r\\n    import ResetSuccess from './ResetSuccess.svelte'\\r\\n\\r\\n    let n = $notify\\r\\n<\/script>\\r\\n\\r\\n<div class='fixed'>\\r\\n    {#if n == 'invalid'}\\r\\n        <InvalidLink />\\r\\n    {:else if n == 'resetSuccess'}\\r\\n        <ResetSuccess />\\r\\n    {/if}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    .fixed {\\r\\n        position: fixed;\\r\\n        z-index: 1000000; /* To make sure it's always on top */\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAiBI,MAAM,cAAC,CAAC,AACJ,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,OAAO,CAChB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,AACX,CAAC"}`
};
var NavNotification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $notify, $$unsubscribe_notify;
  $$unsubscribe_notify = subscribe(notify, (value) => $notify = value);
  let n = $notify;
  $$result.css.add(css$5);
  $$unsubscribe_notify();
  return `<div class="${"fixed svelte-im6ayo"}">${n == "invalid" ? `${validate_component(InvalidLink, "InvalidLink").$$render($$result, {}, {}, {})}` : `${n == "resetSuccess" ? `${validate_component(ResetSuccess, "ResetSuccess").$$render($$result, {}, {}, {})}` : ``}`}
</div>`;
});
var css$4 = {
  code: "@font-face{font-family:round;src:url('/junegull.ttf')}#head.svelte-1qu8hie{font-family:round}.right.svelte-1qu8hie{float:right}",
  map: `{"version":3,"file":"login.svelte","sources":["login.svelte"],"sourcesContent":["<svelte:window on:keydown={keydown} />\\r\\n\\r\\n<script context=\\"module\\">\\r\\n    import { api } from '$lib/api'\\r\\n    export async function load({ page, session }) {\\r\\n        let n = page.query.n\\r\\n        if (session.user) {\\r\\n            return {\\r\\n                status: 302,\\r\\n                redirect: '/',\\r\\n            }\\r\\n        }\\r\\n        return {\\r\\n            props: {\\r\\n                n\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n    \\r\\n<script>\\r\\n    export let n = ''\\r\\n\\r\\n    import {\\r\\n        Row,\\r\\n        Form,\\r\\n        Button,\\r\\n        Column,\\r\\n        ButtonSet,\\r\\n        InlineLoading,\\r\\n    } from 'carbon-components-svelte';\\r\\n    import Input from '$lib/components/Input/Input.svelte'\\r\\n    import { goto } from '$app/navigation';\\r\\n    import { session } from '$app/stores'\\r\\n    import { isSideNavOpen, notify } from '$lib/stores'\\r\\n    import { post } from '$lib/utils/fetch/post'\\r\\n    import { checkEmail } from '$lib/utils/checkEmail'\\r\\n    import NavNotification from '$lib/components/Notifications/NavNotification.svelte'\\r\\n\\r\\n    $: if(newUser) {\\r\\n        userText = 'Login instead'\\r\\n    } else {\\r\\n        userText = 'Join instead'\\r\\n    }\\r\\n\\r\\n    if(n && process.browser) {\\r\\n        $notify = n\\r\\n        goto('/login')\\r\\n    }\\r\\n\\r\\n    let newUser\\r\\n    let userText\\r\\n\\r\\n    let usernameInvalid = false\\r\\n    let username = null\\r\\n    let usernameError\\r\\n\\r\\n    let usernameRef\\r\\n    let passwordRef\\r\\n    let emailRef\\r\\n\\r\\n    let passwordInvalid = false\\r\\n    let password = null\\r\\n    let passwordError\\r\\n\\r\\n    let emailInvalid = false\\r\\n    let emailError = 'Invalid Email'\\r\\n    let email\\r\\n\\r\\n    let resetPasswordLoading\\r\\n    let resetPasswordRes\\r\\n    let loginLoading\\r\\n    let joinLoading\\r\\n\\r\\n    const keydown=(e)=>{\\r\\n        switch(e.keyCode){\\r\\n            case 13:\\r\\n                newUser ? join(): login()\\r\\n        }            \\r\\n    }\\r\\n\\r\\n    const validateEmail=()=>{\\r\\n        if(email) emailInvalid = false\\r\\n        if(emailRef) emailRef.focus()\\r\\n    }\\r\\n\\r\\n    const validateUsername=()=>{\\r\\n        if(username) usernameInvalid = false\\r\\n        if(usernameRef) usernameRef.focus()\\r\\n    }\\r\\n\\r\\n    const validatePassword=()=>{\\r\\n        if(password) passwordInvalid = false\\r\\n        if(passwordRef) passwordRef.focus()\\r\\n    }\\r\\n\\r\\n    const toggleNewUser=()=>{\\r\\n        newUser = !newUser\\r\\n    }\\r\\n\\r\\n    const resetPassword=async()=>{\\r\\n        if(!username){\\r\\n            usernameInvalid = true\\r\\n            return\\r\\n        }\\r\\n        resetPasswordLoading = true\\r\\n        const res = await api.put('forgot_password', {username}).finally(\\r\\n            (r)=>{\\r\\n                resetPasswordLoading = false\\r\\n                return r\\r\\n            }\\r\\n        )\\r\\n        usernameInvalid = res.usernameInvalid\\r\\n        usernameError = res.usernameError\\r\\n        if (res.r){\\r\\n            resetPasswordRes = res.r\\r\\n        }\\r\\n    }\\r\\n\\r\\n    const login = async function() {\\r\\n        loginLoading = true\\r\\n        if (!username){\\r\\n            usernameInvalid = true\\r\\n            usernameError = 'Empty'\\r\\n            loginLoading = false\\r\\n            return\\r\\n        }\\r\\n        if (!password){\\r\\n            passwordInvalid = true\\r\\n            passwordError = 'Empty'\\r\\n            loginLoading = false\\r\\n            return\\r\\n        }\\r\\n        usernameInvalid=false\\r\\n        passwordInvalid=false\\r\\n        let r = await post('auth/login', { username, password }).finally(\\r\\n            (res)=>{\\r\\n                loginLoading=false\\r\\n                return res\\r\\n            })\\r\\n        console.log('login response: ', r)\\r\\n        usernameError = r.usernameError\\r\\n        passwordError = r.passwordError\\r\\n        usernameInvalid = r.usernameInvalid\\r\\n        passwordInvalid = r.passwordInvalid\\r\\n        if (r.user) {\\r\\n            $session.user = r.user\\r\\n            goto('/')\\r\\n        }\\r\\n    }\\r\\n\\r\\n    let a = 'C:/code/mine/task/package.json'\\r\\n\\r\\n    const join  = async function() {\\r\\n        joinLoading = true\\r\\n        if (newUser && !email){\\r\\n            emailInvalid = true\\r\\n            emailError = 'Empty'\\r\\n            joinLoading = false\\r\\n            return\\r\\n        }\\r\\n        if (!checkEmail(email)){\\r\\n            emailInvalid = true\\r\\n            emailError = 'Unaccepted'\\r\\n            joinLoading = false\\r\\n            return \\r\\n        }\\r\\n        if (!username){\\r\\n            usernameInvalid = true\\r\\n            usernameError = 'Empty'\\r\\n            joinloading = false\\r\\n            return\\r\\n        }\\r\\n        if (checkEmail(username)){\\r\\n            usernameInvalid = true\\r\\n            usernameError = 'Unaccepted'\\r\\n            joinLoading = false\\r\\n            return\\r\\n        }\\r\\n        if (!password){\\r\\n            passwordInvalid = true\\r\\n            passwordError = 'Empty'\\r\\n            joinloading = false\\r\\n            return\\r\\n        }\\r\\n        usernameInvalid=false\\r\\n        passwordInvalid=false\\r\\n        emailInvalid=false\\r\\n        const r = await post('auth/join', { email, username, password }).finally(\\r\\n            (r)=>{\\r\\n                joinLoading = false\\r\\n                return r\\r\\n            }\\r\\n        )\\r\\n        usernameInvalid = r.usernameInvalid\\r\\n        usernameError = r.usernameError\\r\\n        passwordInvalid = r.passwordInvalid\\r\\n        passwordError = r.passwordError\\r\\n        if (r.token) {\\r\\n            goto('/')\\r\\n        } else {\\r\\n            console.log('wait what?')\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<NavNotification />\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Login</title>\\r\\n</svelte:head>\\r\\n\\r\\n<Row noGutter>\\r\\n    <Column sm={8} md={8} lg={8} xlg={8}>\\r\\n        <h1 id='head'>Apexlinks</h1>\\r\\n    </Column>\\r\\n    <Column sm={8} md={8} lg={8} xlg={8}>\\r\\n        <Form>\\r\\n            {#if newUser}\\r\\n                <Input\\r\\n                    bind:invalid={emailInvalid}\\r\\n                    invalidText={emailError}\\r\\n                    bind:ref={emailRef}\\r\\n                    bind:value={email}\\r\\n                    labelText='Email'\\r\\n                    focus\\r\\n                />\\r\\n            {/if}\\r\\n            <Input\\r\\n                bind:invalid={usernameInvalid}\\r\\n                invalidText={usernameError}\\r\\n                bind:value={username}\\r\\n                bind:ref={usernameRef}\\r\\n                labelText='Username'\\r\\n            />\\r\\n            <Input\\r\\n                bind:invalid={passwordInvalid}\\r\\n                invalidText={passwordError}\\r\\n                bind:value={password}\\r\\n                labelText='Password'\\r\\n                bind:ref={passwordRef}\\r\\n                password\\r\\n            />\\r\\n            <ButtonSet stacked>\\r\\n                {#if !newUser}\\r\\n                    <Button as let:props>\\r\\n                        <div on:click={login} {...props}>\\r\\n                            <p>Login</p>\\r\\n                            {#if loginLoading}\\r\\n                                <div class='right'>\\r\\n                                    <InlineLoading />\\r\\n                                </div>\\r\\n                            {/if}\\r\\n                        </div>\\r\\n                    </Button>\\r\\n                    <!-- <Button kind='ghost' as let:props>\\r\\n                        <div on:click={resetPassword} {...props}>\\r\\n                            <p>Reset Password</p>\\r\\n                            {#if resetPasswordLoading}\\r\\n                                <div class='right'>\\r\\n                                    <InlineLoading />\\r\\n                                </div>\\r\\n                            {/if}\\r\\n                        </div>                \\r\\n                    </Button> -->\\r\\n                {/if}\\r\\n                \\r\\n                {#if newUser}\\r\\n                    <Button as let:props>\\r\\n                        <div on:click={join} {...props}>\\r\\n                            <p>Join</p>\\r\\n                            {#if joinLoading}\\r\\n                                <div class='right'>\\r\\n                                    <InlineLoading />\\r\\n                                </div>\\r\\n                            {/if}\\r\\n                        </div>                \\r\\n                    </Button>\\r\\n                {/if}\\r\\n                <Button\\r\\n                    kind='ghost'\\r\\n                    size='small'\\r\\n                    on:click={toggleNewUser}\\r\\n                >\\r\\n                    {userText}\\r\\n                </Button>\\r\\n            </ButtonSet>\\r\\n        </Form>\\r\\n    </Column>\\r\\n    <Column>\\r\\n    <!-- {#if resetPasswordRes}\\r\\n        <br />\\r\\n        <p>{resetPasswordRes}</p>\\r\\n    {/if} -->\\r\\n    </Column>\\r\\n</Row>\\r\\n\\r\\n<style>\\r\\n    @font-face {\\r\\n        font-family: round;\\r\\n        src: url('/junegull.ttf');\\r\\n    }\\r\\n    #head {\\r\\n        font-family: round;\\r\\n    }\\r\\n    .right {\\r\\n        float: right;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA0SI,UAAU,AAAC,CAAC,AACR,WAAW,CAAE,KAAK,CAClB,GAAG,CAAE,IAAI,eAAe,CAAC,AAC7B,CAAC,AACD,KAAK,eAAC,CAAC,AACH,WAAW,CAAE,KAAK,AACtB,CAAC,AACD,MAAM,eAAC,CAAC,AACJ,KAAK,CAAE,KAAK,AAChB,CAAC"}`
};
async function load$7({ page: page2, session: session2 }) {
  let n = page2.query.n;
  if (session2.user) {
    return { status: 302, redirect: "/" };
  }
  return { props: { n } };
}
var Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_session;
  let $notify, $$unsubscribe_notify;
  $$unsubscribe_session = subscribe(session, (value) => value);
  $$unsubscribe_notify = subscribe(notify, (value) => $notify = value);
  let { n = "" } = $$props;
  if (n && process.browser) {
    set_store_value(notify, $notify = n, $notify);
    goto("/login");
  }
  let userText;
  let usernameInvalid = false;
  let username2 = null;
  let usernameError;
  let usernameRef;
  let passwordRef;
  let passwordInvalid = false;
  let password = null;
  let passwordError;
  if ($$props.n === void 0 && $$bindings.n && n !== void 0)
    $$bindings.n(n);
  $$result.css.add(css$4);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        userText = "Join instead";
      }
    }
    $$rendered = `


    


${validate_component(NavNotification, "NavNotification").$$render($$result, {}, {}, {})}

${$$result.head += `${$$result.title = `<title>Login</title>`, ""}`, ""}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, { sm: 8, md: 8, lg: 8, xlg: 8 }, {}, {
        default: () => `<h1 id="${"head"}" class="${"svelte-1qu8hie"}">Apexlinks</h1>`
      })}
    ${validate_component(Column, "Column").$$render($$result, { sm: 8, md: 8, lg: 8, xlg: 8 }, {}, {
        default: () => `${validate_component(Form, "Form").$$render($$result, {}, {}, {
          default: () => `${``}
            ${validate_component(Input, "Input").$$render($$result, {
            invalidText: usernameError,
            labelText: "Username",
            invalid: usernameInvalid,
            value: username2,
            ref: usernameRef
          }, {
            invalid: ($$value) => {
              usernameInvalid = $$value;
              $$settled = false;
            },
            value: ($$value) => {
              username2 = $$value;
              $$settled = false;
            },
            ref: ($$value) => {
              usernameRef = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(Input, "Input").$$render($$result, {
            invalidText: passwordError,
            labelText: "Password",
            password: true,
            invalid: passwordInvalid,
            value: password,
            ref: passwordRef
          }, {
            invalid: ($$value) => {
              passwordInvalid = $$value;
              $$settled = false;
            },
            value: ($$value) => {
              password = $$value;
              $$settled = false;
            },
            ref: ($$value) => {
              passwordRef = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(ButtonSet, "ButtonSet").$$render($$result, { stacked: true }, {}, {
            default: () => `${`${validate_component(Button, "Button").$$render($$result, { as: true }, {}, {
              default: ({ props }) => `<div${spread([escape_object(props)], "svelte-1qu8hie")}><p>Login</p>
                            ${``}</div>`
            })}
                    `}
                
                ${``}
                ${validate_component(Button, "Button").$$render($$result, { kind: "ghost", size: "small" }, {}, { default: () => `${escape(userText)}` })}`
          })}`
        })}`
      })}
    ${validate_component(Column, "Column").$$render($$result, {}, {}, {})}`
    })}`;
  } while (!$$settled);
  $$unsubscribe_session();
  $$unsubscribe_notify();
  return $$rendered;
});
var login = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Login,
  load: load$7
});
async function load$6({ page: page2, session: session2 }) {
  let user = session2.user;
  if (!user) {
    return { status: 302, redirect: "/login" };
  }
  let { id } = page2.params;
  let tagString = JSON.stringify([]);
  let url = `xrooms?id=${id}&tags=${tagString}&page=1`;
  let res = await api.get(url);
  if (res.error) {
    return { status: res.status, error: res.error };
  }
  if (Array.isArray(res.items))
    ;
  let total = res.total;
  let pages = res.pages;
  return { props: { room, total, pages, id } };
}
var U5Bidu5D$3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_myTags;
  $$unsubscribe_myTags = subscribe(myTags, (value) => value);
  let { rooms: rooms2 = [] } = $$props;
  let { total = 0 } = $$props;
  let { pages = 0 } = $$props;
  let { id } = $$props;
  let page2 = 0;
  let tag;
  let ref;
  if ($$props.rooms === void 0 && $$bindings.rooms && rooms2 !== void 0)
    $$bindings.rooms(rooms2);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
    $$bindings.pages(pages);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `

${$$result.head += `${$$result.title = `<title>My Rooms</title>`, ""}`, ""}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, { noGutter: true }, {}, {
        default: () => `${validate_component(Search, "Search").$$render($$result, { value: tag, ref }, {
          value: ($$value) => {
            tag = $$value;
            $$settled = false;
          },
          ref: ($$value) => {
            ref = $$value;
            $$settled = false;
          }
        }, {})}`
      })}`
    })}

${``}

${each(rooms2, (room2) => `<br>
    ${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `<div>${validate_component(Link, "Link").$$render($$result, { href: "" }, {}, { default: () => `${escape(room2.name)}` })}</div>
    `
    })}`)}

${``}

${total > 10 ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, { loop: true, page: page2, total: pages }, {
      page: ($$value) => {
        page2 = $$value;
        $$settled = false;
      },
      total: ($$value) => {
        pages = $$value;
        $$settled = false;
      }
    }, {})}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_myTags();
  return $$rendered;
});
var _id_$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bidu5D$3,
  load: load$6
});
var css$3 = {
  code: ".item.svelte-dveft3{cursor:pointer}.item.svelte-dveft3:hover{color:grey}.unseen.svelte-dveft3{font-weight:600}",
  map: `{"version":3,"file":"rooms.svelte","sources":["rooms.svelte"],"sourcesContent":["<script context='module'> \\r\\n    import { api } from '$lib/api'\\r\\n    export async function load({session}){\\r\\n        let user = session.user\\r\\n        if(!user){\\r\\n            return {\\r\\n                status: 302,\\r\\n                redirect: '/login',\\r\\n            }\\r\\n        }\\r\\n        return {\\r\\n            props: {\\r\\n                user\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n    import {\\r\\n        Row,\\r\\n        Column\\r\\n    } from 'carbon-components-svelte'\\r\\n    import Tag from '$lib/components/Tag.svelte'\\r\\n    import { goto } from '$app/navigation'\\r\\n    import {\\r\\n        roomTags\\r\\n    } from '$lib/stores'\\r\\n\\r\\n    let rooms = []\\r\\n    let page = 0\\r\\n    let total = 0\\r\\n    let got\\r\\n\\r\\n    let go=async(room)=>{\\r\\n        await api.put('join', {id: room.id})\\r\\n        goto(\`/room/\${room.id}\`)\\r\\n    }\\r\\n\\r\\n    let get = async function(){\\r\\n        let tagString = JSON.stringify($roomTags)\\r\\n        let url = \`rooms?tags=\${tagString}&page=\${page+1}\`\\r\\n        let res = await api.get(url)\\r\\n        if(Array.isArray(res.items)){\\r\\n            rooms = res.items\\r\\n        }\\r\\n        total = res.total\\r\\n        got = true\\r\\n\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Apexlinks</title>\\r\\n</svelte:head>\\r\\n\\r\\n<Tag on:change={get} bind:tags={$roomTags} />\\r\\n\\r\\n{#each rooms as room}\\r\\n    <br />\\r\\n    <Row noGutter>\\r\\n        <Column>\\r\\n            <p class:unseen={room.unseen} class='item' href='' on:click={go(room)}>{room.name}</p>\\r\\n        </Column>\\r\\n    </Row>\\r\\n{/each}\\r\\n\\r\\n{#if got && total < 1}\\r\\n    <Row noGutter>\\r\\n        <Column>\\r\\n            <p>There don't seem to be any results</p>        \\r\\n        </Column>\\r\\n    </Row>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n    .item {\\r\\n        cursor: pointer; \\r\\n    }\\r\\n    .item:hover {\\r\\n        color: grey;\\r\\n    }\\r\\n    .unseen {\\r\\n        font-weight: 600;\\r\\n    }    \\r\\n</style>"],"names":[],"mappings":"AA4EI,KAAK,cAAC,CAAC,AACH,MAAM,CAAE,OAAO,AACnB,CAAC,AACD,mBAAK,MAAM,AAAC,CAAC,AACT,KAAK,CAAE,IAAI,AACf,CAAC,AACD,OAAO,cAAC,CAAC,AACL,WAAW,CAAE,GAAG,AACpB,CAAC"}`
};
async function load$5({ session: session2 }) {
  let user = session2.user;
  if (!user) {
    return { status: 302, redirect: "/login" };
  }
  return { props: { user } };
}
var Rooms = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $roomTags, $$unsubscribe_roomTags;
  $$unsubscribe_roomTags = subscribe(roomTags, (value) => $roomTags = value);
  let rooms2 = [];
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `${$$result.title = `<title>Apexlinks</title>`, ""}`, ""}

${validate_component(Tag_1, "Tag").$$render($$result, { tags: $roomTags }, {
      tags: ($$value) => {
        $roomTags = $$value;
        $$settled = false;
      }
    }, {})}

${each(rooms2, (room2) => `<br>
    ${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `<p class="${["item svelte-dveft3", room2.unseen ? "unseen" : ""].join(" ").trim()}" href="${""}">${escape(room2.name)}</p>
        `
      })}
    `
    })}`)}

${``}`;
  } while (!$$settled);
  $$unsubscribe_roomTags();
  return $$rendered;
});
var rooms = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Rooms,
  load: load$5
});
var Beee = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
var beee = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Beee
});
async function load$4({ page: page2, session: session2 }) {
  let user = session2.user;
  if (!user) {
    return { status: 302, redirect: "/login" };
  }
  let { id } = page2.params;
  let item = await api.get(`items/${id}`);
  if (item.user !== user.username) {
    return {
      status: 302,
      redirect: `/items/{user.id}`
    };
  }
  return { props: { item, user } };
}
var U5Bidu5D$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  let { user } = $$props;
  let nameInvalid;
  let itext = item.itext;
  let hidden = item.hidden;
  let redirect = item.redirect;
  item.price;
  let link = item.link;
  let itype = item.itype;
  let image = item.image;
  let fields = item.fields || [];
  let name = item.name;
  let tags = item.tags;
  let linkRef;
  let linkInvalid;
  let linkError = 'Add a url scheme to the link, something like "http://, at the beginning';
  let delOpen;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    itype = initialCaps(itype);
    $$rendered = `

${validate_component(Modal, "Modal").$$render($$result, {
      modalHeading: "Delete item",
      primaryButtonText: "Delete",
      secondaryButtonText: "Cancel",
      open: delOpen
    }, {
      open: ($$value) => {
        delOpen = $$value;
        $$settled = false;
      }
    }, {
      default: () => `<p>Sure you want to delete this item?</p>`
    })}

${$$result.head += `${$$result.title = `<title>Edit Item</title>`, ""}`, ""}

${validate_component(Image, "Image").$$render($$result, { image }, {
      image: ($$value) => {
        image = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(Checkbox, "Checkbox").$$render($$result, { labelText: "Hidden", checked: hidden }, {
          checked: ($$value) => {
            hidden = $$value;
            $$settled = false;
          }
        }, {})}`
      })}`
    })}

${validate_component(Tag_1, "Tag").$$render($$result, { tags }, {
      tags: ($$value) => {
        tags = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(Fields, "Fields").$$render($$result, { pin: true, fields }, {
          fields: ($$value) => {
            fields = $$value;
            $$settled = false;
          }
        }, {})}`
      })}`
    })}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(FluidForm, "FluidForm").$$render($$result, {}, {}, {
          default: () => `${validate_component(Input, "Input").$$render($$result, {
            labelText: "Name",
            invalidText: "Name taken",
            value: name,
            invalid: nameInvalid
          }, {
            value: ($$value) => {
              name = $$value;
              $$settled = false;
            },
            invalid: ($$value) => {
              nameInvalid = $$value;
              $$settled = false;
            }
          }, {})}`
        })}
        ${validate_component(FluidForm, "FluidForm").$$render($$result, {}, {}, {
          default: () => `${validate_component(TextInput, "TextInput").$$render($$result, { labelText: "Item type", value: itype }, {
            value: ($$value) => {
              itype = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(Checkbox, "Checkbox").$$render($$result, {
            labelText: "Let the item's listing redirect to a link",
            checked: redirect
          }, {
            checked: ($$value) => {
              redirect = $$value;
              $$settled = false;
            }
          }, {})}
            ${redirect ? `${validate_component(Input, "Input").$$render($$result, {
            labelText: "Link",
            invalid: linkInvalid,
            invalidText: linkError,
            value: link,
            ref: linkRef
          }, {
            invalid: ($$value) => {
              linkInvalid = $$value;
              $$settled = false;
            },
            invalidText: ($$value) => {
              linkError = $$value;
              $$settled = false;
            },
            value: ($$value) => {
              link = $$value;
              $$settled = false;
            },
            ref: ($$value) => {
              linkRef = $$value;
              $$settled = false;
            }
          }, {})}` : `${validate_component(TextArea, "TextArea").$$render($$result, {
            placeholder: "Description(Markdown)",
            value: itext
          }, {
            value: ($$value) => {
              itext = $$value;
              $$settled = false;
            }
          }, {})}`}`
        })}`
      })}`
    })}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(ButtonSet, "ButtonSet").$$render($$result, { stacked: true }, {}, {
        default: () => `${validate_component(Button, "Button").$$render($$result, {}, {}, { default: () => `Delete Item` })}
        ${validate_component(Button, "Button").$$render($$result, {}, {}, { default: () => `Edit` })}`
      })}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
var _id_$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bidu5D$2,
  load: load$4
});
var Paystack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { config = {} } = $$props;
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  return `${$$result.head += `<script src="${"https://js.paystack.co/v1/inline.js"}" data-svelte="svelte-1eu2i5p"><\/script>`, ""}`;
});
var css$2 = {
  code: ".right.svelte-pb9zr2{float:right}",
  map: `{"version":3,"file":"edit.svelte","sources":["edit.svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n    import { api } from '$lib/api.js';\\r\\n    export async function load({ session }) {\\r\\n        let user = session.user\\r\\n        if(!user){\\r\\n            return {\\r\\n                status: 302,\\r\\n                redirect: '/login'\\r\\n            }\\r\\n        }\\r\\n        return {\\r\\n            props: {\\r\\n                user\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<svelte:window on:keydown={keydown} />\\r\\n\\r\\n<script>\\r\\n    console.log(typeof(({}).PAYSTACK_TEST))\\r\\n    export let user = {}\\r\\n    import { goto } from '$app/navigation';\\r\\n    import {\\r\\n        InlineLoading,\\r\\n        FluidForm,\\r\\n        TextInput,\\r\\n        Checkbox,\\r\\n        TextArea,\\r\\n        Button,\\r\\n        Column,\\r\\n        Row,\\r\\n    } from 'carbon-components-svelte'\\r\\n    import Fields from '$lib/components/Fields/Fields.svelte'\\r\\n    import Paystack from '$lib/components/Paystack.svelte'\\r\\n    import Input from '$lib/components/Input/Input.svelte'\\r\\n    import Image from '$lib/components/Image.svelte'\\r\\n    import Tag from '$lib/components/Tag.svelte'\\r\\n    import { \\r\\n        checkEmail,\\r\\n    } from '$lib/utils/checkEmail'\\r\\n    import {\\r\\n        abslink \\r\\n    } from '$lib/utils/abslink'\\r\\n\\r\\n    let config = {\\r\\n        key: ({}).PAYSTACK_TEST === 'true' ? ({}).PAYSTACK_TEST_KEY : ({}).PAYSTACK_LIVE_KEY,\\r\\n        email: user.email,\\r\\n        metadata: {\\r\\n            id: user.id\\r\\n        },\\r\\n        amount: 190233,\\r\\n        currency: \\"NGN\\",\\r\\n        embed: false,\\r\\n        value: \\"Pay\\"\\r\\n    }\\r\\n\\r\\n    let show_email = user.show_email\\r\\n    let username = user.username\\r\\n    let hidden = user.hidden\\r\\n    let address = user.address\\r\\n    let website = user.website\\r\\n    let image = user.image\\r\\n    let email = user.email\\r\\n    let phone = user.phone\\r\\n    let about = user.about\\r\\n    let data = user.data\\r\\n    let name = user.name\\r\\n    let fields = user.fields || []\\r\\n    console.log('after user.fields', fields)\\r\\n    let tags = user.tags || []\\r\\n\\r\\n    let usernameInvalid\\r\\n    let usernameError\\r\\n\\r\\n    let websiteError = 'Add a url scheme to the link, something like \\"http://, at the beginning'\\r\\n    let websiteInvalid\\r\\n\\r\\n    let emailInvalid\\r\\n    let emailError\\r\\n\\r\\n    let loading\\r\\n\\r\\n    const keydown=(e)=>{\\r\\n        switch(e.keyCode){\\r\\n            case 13:\\r\\n                if (e.ctrlKey){\\r\\n                    edit()\\r\\n                }\\r\\n        }\\r\\n    }\\r\\n\\r\\n    const edit=async()=>{\\r\\n        let req_fields = fields.map((f) => {\\r\\n            return {label: f.label, value: f.value}\\r\\n        })\\r\\n        loading = true\\r\\n        if(website && !abslink.test(website)){\\r\\n            console.log('website err')\\r\\n            websiteInvalid = true\\r\\n            editLoading = false\\r\\n            return\\r\\n        }\\r\\n        if (!email){\\r\\n            console.log('not email err')\\r\\n            emailInvalid = true\\r\\n            emailError = 'Empty'\\r\\n            loading = false\\r\\n            return\\r\\n        }\\r\\n        if (!checkEmail(email)){\\r\\n            console.log('check email err')\\r\\n            emailInvalid = true\\r\\n            emailError = 'Unaccepted'\\r\\n            loading = false\\r\\n            return \\r\\n        }\\r\\n        if (!username){\\r\\n            console.log('username err')\\r\\n            usernameInvalid = true\\r\\n            usernameError = 'Empty'\\r\\n            loading = false\\r\\n            return\\r\\n        }\\r\\n        if(username !== user.username){\\r\\n            if(await api.get(\`check_username/\${username}\`).then(r => !r.res)){\\r\\n                console.log('api check_username err')\\r\\n                usernameInvalid = true\\r\\n                usernameError = 'Username taken'\\r\\n                loading = false\\r\\n                return\\r\\n            }\\r\\n        }\\r\\n        if (checkEmail(username)){\\r\\n            console.log('check email username err')\\r\\n            usernameInvalid = true\\r\\n            usernameError = 'Unaccepted'\\r\\n            loading = false\\r\\n            return\\r\\n        }\\r\\n        let dt = {\\r\\n            show_email,\\r\\n            username,\\r\\n            hidden,\\r\\n            website,\\r\\n            address,\\r\\n            email,\\r\\n            phone,\\r\\n            about,\\r\\n            fields: req_fields,\\r\\n            image,\\r\\n            data,\\r\\n            tags,\\r\\n            name,\\r\\n        } \\r\\n        let res = await api.put('users', dt).finally(\\r\\n            (r)=>{\\r\\n                console.log('edit res: ', r)\\r\\n                loading = false\\r\\n                return r\\r\\n            }\\r\\n        )\\r\\n        if (res.id) {\\r\\n            goto(\`/\${res.username}\`)\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<Paystack {config} />\\r\\n\\r\\n<Image bind:image>\\r\\n    {#if user.paid}\\r\\n        <Button\\r\\n            on:click={()=>{config.open=true}}\\r\\n            size='small'\\r\\n        >\\r\\n            Renew subscription\\r\\n        </Button>\\r\\n        <Button\\r\\n            on:click={()=>{config.open=true; config.amount=3000; config.metadata.purpose='change_card'}}\\r\\n            size='small'\\r\\n        >\\r\\n            Change card\\r\\n        </Button>\\r\\n    {:else}\\r\\n        <Button\\r\\n            on:click={()=>{config.open=true}}\\r\\n            size='small'\\r\\n        >\\r\\n            Subscribe\\r\\n        </Button>\\r\\n    {/if}\\r\\n</Image>\\r\\n\\r\\n<Row noGutter>\\r\\n    <Column>\\r\\n        <Checkbox bind:checked={hidden} labelText='Hide profile from public'/>\\r\\n    </Column>\\r\\n</Row>\\r\\n\\r\\n<Tag bind:tags />\\r\\n\\r\\n<br />\\r\\n<Row noGutter>\\r\\n    <Column>\\r\\n        <Fields pin bind:fields />\\r\\n    </Column>\\r\\n</Row>\\r\\n<br />\\r\\n\\r\\n<Row noGutter>\\r\\n    <Column>\\r\\n        <FluidForm>\\r\\n            <Input\\r\\n                bind:invalidText={usernameError}\\r\\n                bind:invalid={usernameInvalid}\\r\\n                bind:value={username}\\r\\n                labelText=\\"Username\\"\\r\\n            />\\r\\n            <Checkbox labelText='Show email in profile' bind:checked={show_email} />\\r\\n            <TextInput labelText=\\"Email\\" bind:value={email} />\\r\\n            <TextInput labelText=\\"Name\\" bind:value={name} />\\r\\n            <TextInput labelText=\\"Phone\\" bind:value={phone} />\\r\\n            <TextInput labelText=\\"Address\\" bind:value={address} />\\r\\n            <Input \\r\\n                invalid={websiteInvalid}\\r\\n                invalidText={websiteError}\\r\\n                labelText='Link' \\r\\n                bind:value={website} \\r\\n            />\\r\\n            <TextArea rows={11} placeholder='About (Markdown)' bind:value={about} />\\r\\n        </FluidForm>\\r\\n    </Column>\\r\\n</Row>\\r\\n    \\r\\n<Row noGutter>\\r\\n    <Column>\\r\\n        <Button as let:props>\\r\\n            <div on:click={edit} {...props}>\\r\\n                <p>Edit</p>\\r\\n                {#if loading}\\r\\n                    <div class='right'>\\r\\n                        <InlineLoading />\\r\\n                    </div>\\r\\n                {/if}\\r\\n            </div>\\r\\n        </Button>\\r\\n    </Column>\\r\\n</Row>\\r\\n\\r\\n<style>\\r\\n    .right {\\r\\n        float: right;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA4PI,MAAM,cAAC,CAAC,AACJ,KAAK,CAAE,KAAK,AAChB,CAAC"}`
};
async function load$3({ session: session2 }) {
  let user = session2.user;
  if (!user) {
    return { status: 302, redirect: "/login" };
  }
  return { props: { user } };
}
var websiteError = 'Add a url scheme to the link, something like "http://, at the beginning';
var Edit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  console.log(typeof {}.PAYSTACK_TEST);
  let { user = {} } = $$props;
  let config = {
    key: {}.PAYSTACK_LIVE_KEY,
    email: user.email,
    metadata: { id: user.id },
    amount: 190233,
    currency: "NGN",
    embed: false,
    value: "Pay"
  };
  let show_email = user.show_email;
  let username2 = user.username;
  let hidden = user.hidden;
  let address = user.address;
  let website = user.website;
  let image = user.image;
  let email = user.email;
  let phone = user.phone;
  let about = user.about;
  user.data;
  let name = user.name;
  let fields = user.fields || [];
  console.log("after user.fields", fields);
  let tags = user.tags || [];
  let usernameInvalid;
  let usernameError;
  let websiteInvalid;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `



${validate_component(Paystack, "Paystack").$$render($$result, { config }, {}, {})}

${validate_component(Image, "Image").$$render($$result, { image }, {
      image: ($$value) => {
        image = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${user.paid ? `${validate_component(Button, "Button").$$render($$result, { size: "small" }, {}, {
        default: () => `Renew subscription
        `
      })}
        ${validate_component(Button, "Button").$$render($$result, { size: "small" }, {}, {
        default: () => `Change card
        `
      })}` : `${validate_component(Button, "Button").$$render($$result, { size: "small" }, {}, {
        default: () => `Subscribe
        `
      })}`}`
    })}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(Checkbox, "Checkbox").$$render($$result, {
          labelText: "Hide profile from public",
          checked: hidden
        }, {
          checked: ($$value) => {
            hidden = $$value;
            $$settled = false;
          }
        }, {})}`
      })}`
    })}

${validate_component(Tag_1, "Tag").$$render($$result, { tags }, {
      tags: ($$value) => {
        tags = $$value;
        $$settled = false;
      }
    }, {})}

<br>
${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(Fields, "Fields").$$render($$result, { pin: true, fields }, {
          fields: ($$value) => {
            fields = $$value;
            $$settled = false;
          }
        }, {})}`
      })}`
    })}
<br>

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(FluidForm, "FluidForm").$$render($$result, {}, {}, {
          default: () => `${validate_component(Input, "Input").$$render($$result, {
            labelText: "Username",
            invalidText: usernameError,
            invalid: usernameInvalid,
            value: username2
          }, {
            invalidText: ($$value) => {
              usernameError = $$value;
              $$settled = false;
            },
            invalid: ($$value) => {
              usernameInvalid = $$value;
              $$settled = false;
            },
            value: ($$value) => {
              username2 = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(Checkbox, "Checkbox").$$render($$result, {
            labelText: "Show email in profile",
            checked: show_email
          }, {
            checked: ($$value) => {
              show_email = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(TextInput, "TextInput").$$render($$result, { labelText: "Email", value: email }, {
            value: ($$value) => {
              email = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(TextInput, "TextInput").$$render($$result, { labelText: "Name", value: name }, {
            value: ($$value) => {
              name = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(TextInput, "TextInput").$$render($$result, { labelText: "Phone", value: phone }, {
            value: ($$value) => {
              phone = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(TextInput, "TextInput").$$render($$result, { labelText: "Address", value: address }, {
            value: ($$value) => {
              address = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(Input, "Input").$$render($$result, {
            invalid: websiteInvalid,
            invalidText: websiteError,
            labelText: "Link",
            value: website
          }, {
            value: ($$value) => {
              website = $$value;
              $$settled = false;
            }
          }, {})}
            ${validate_component(TextArea, "TextArea").$$render($$result, {
            rows: 11,
            placeholder: "About (Markdown)",
            value: about
          }, {
            value: ($$value) => {
              about = $$value;
              $$settled = false;
            }
          }, {})}`
        })}`
      })}`
    })}
    
${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(Button, "Button").$$render($$result, { as: true }, {}, {
          default: ({ props }) => `<div${spread([escape_object(props)], "svelte-pb9zr2")}><p>Edit</p>
                ${``}</div>`
        })}`
      })}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
var edit = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Edit,
  load: load$3
});
var css$1 = {
  code: ".bold.svelte-r4t1yu{font-weight:600}.blank-link.svelte-r4t1yu{text-decoration:none}.blank-link.svelte-r4t1yu:hover{cursor:pointer;color:rgb(50, 50, 211)}",
  map: `{"version":3,"file":"[id].svelte","sources":["[id].svelte"],"sourcesContent":["<script context='module'>\\r\\n    import { api } from '$lib/api'\\r\\n    export async function load({session, page}){\\r\\n        let user = session.user\\r\\n        let {id} = page.params\\r\\n        let item = await api.get(\`items/\${id}\`)\\r\\n        if(item.error){\\r\\n            return {\\r\\n                status: item.status,\\r\\n                error: item.error\\r\\n            }\\r\\n        }\\r\\n        return {\\r\\n            props: {\\r\\n                user,\\r\\n                item\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n    export let user\\r\\n    export let item\\r\\n    import {\\r\\n        Row,\\r\\n        Link,\\r\\n        Column,\\r\\n    } from 'carbon-components-svelte'\\r\\n    import {parseMarkdown} from '$lib/utils/parseMarkdown'\\r\\n\\r\\n    item.fields = item.fields || []\\r\\n    \\r\\n    let itext\\r\\n    if(item.itext){\\r\\n        itext = parseMarkdown(item.itext)\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<Row>\\r\\n    {#if item.image}\\r\\n        <Column lg={2} sm={2} md={2} xlg={2}>\\r\\n                <img width=100% alt='item display _image' src={item.image}>\\r\\n        </Column>\\r\\n    {/if}\\r\\n    <Column lg={4} sm={4} md={4} xlg={4}>\\r\\n        {#if item.name}\\r\\n            {#if item.redirect && item.link}\\r\\n                <p class='bold'><a class='blank-link' href={item.link || ''}>{item.name}</a></p>\\r\\n            {:else}\\r\\n                <p class='bold'>{item.name}</p>\\r\\n            {/if}\\r\\n        {/if}\\r\\n        <!-- {#if item.itype}\\r\\n            <p>{item.itype}</p>\\r\\n        {/if} -->\\r\\n        <Link href='/{item.user}'>User</Link>\\r\\n        {#if user && user.username == item.user}\\r\\n            <Link href='/edit/{item.id}'>Edit</Link>\\r\\n        {/if}\\r\\n    </Column>\\r\\n</Row>\\r\\n\\r\\n<br />\\r\\n\\r\\n{#each item.fields as field}\\r\\n    <div>\\r\\n        <div class='bold'>{field.label}</div>\\r\\n        {#if field.type === 'text'}\\r\\n            <div>{field.value}</div>\\r\\n        {:else if field.type === 'number'}\\r\\n            <div>{field.num}</div>\\r\\n        {:else if field.type === 'range'}\\r\\n            <div>{field.min} - {field.num}</div>\\r\\n        {/if}\\r\\n    </div>\\r\\n{/each}\\r\\n\\r\\n{#if !item.redirect && itext}\\r\\n    <Row>\\r\\n        <Column lg={6} sm={6} md={6} xlg={6}>\\r\\n            <div>{@html itext}</div>\\r\\n        </Column>\\r\\n    </Row>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n    .bold {\\r\\n        font-weight: 600;\\r\\n    }\\r\\n    .blank-link {\\r\\n        text-decoration: none;\\r\\n    }\\r\\n\\r\\n    .blank-link:hover {\\r\\n        cursor: pointer;\\r\\n        color: rgb(50, 50, 211);\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAuFI,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,GAAG,AACpB,CAAC,AACD,WAAW,cAAC,CAAC,AACT,eAAe,CAAE,IAAI,AACzB,CAAC,AAED,yBAAW,MAAM,AAAC,CAAC,AACf,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC"}`
};
async function load$2({ session: session2, page: page2 }) {
  let user = session2.user;
  let { id } = page2.params;
  let item = await api.get(`items/${id}`);
  if (item.error) {
    return { status: item.status, error: item.error };
  }
  return { props: { user, item } };
}
var U5Bidu5D$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  let { item } = $$props;
  item.fields = item.fields || [];
  let itext;
  if (item.itext) {
    itext = parseMarkdown(item.itext);
  }
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$1);
  return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => `${item.image ? `${validate_component(Column, "Column").$$render($$result, { lg: 2, sm: 2, md: 2, xlg: 2 }, {}, {
      default: () => `<img width="${"100%"}" alt="${"item display _image"}"${add_attribute("src", item.image, 0)}>`
    })}` : ``}
    ${validate_component(Column, "Column").$$render($$result, { lg: 4, sm: 4, md: 4, xlg: 4 }, {}, {
      default: () => `${item.name ? `${item.redirect && item.link ? `<p class="${"bold svelte-r4t1yu"}"><a class="${"blank-link svelte-r4t1yu"}"${add_attribute("href", item.link || "", 0)}>${escape(item.name)}</a></p>` : `<p class="${"bold svelte-r4t1yu"}">${escape(item.name)}</p>`}` : ``}
        
        ${validate_component(Link, "Link").$$render($$result, { href: "/" + item.user }, {}, { default: () => `User` })}
        ${user && user.username == item.user ? `${validate_component(Link, "Link").$$render($$result, { href: "/edit/" + item.id }, {}, { default: () => `Edit` })}` : ``}`
    })}`
  })}

<br>

${each(item.fields, (field) => `<div><div class="${"bold svelte-r4t1yu"}">${escape(field.label)}</div>
        ${field.type === "text" ? `<div>${escape(field.value)}</div>` : `${field.type === "number" ? `<div>${escape(field.num)}</div>` : `${field.type === "range" ? `<div>${escape(field.min)} - ${escape(field.num)}</div>` : ``}`}`}
    </div>`)}

${!item.redirect && itext ? `${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => `${validate_component(Column, "Column").$$render($$result, { lg: 6, sm: 6, md: 6, xlg: 6 }, {}, {
      default: () => `<div><!-- HTML_TAG_START -->${itext}<!-- HTML_TAG_END --></div>`
    })}`
  })}` : ``}`;
});
var _id_$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bidu5D$1,
  load: load$2
});
var css = {
  code: ".pointer.svelte-18f507d{cursor:pointer}.small.svelte-18f507d{color:grey;font-size:0.75rem}.message.svelte-18f507d{overflow-wrap:break-word}.head-space.svelte-18f507d{height:0.5rem}.head-link.svelte-18f507d{cursor:pointer}.head.svelte-18f507d{font-size:.875rem;line-height:1.125em;font-weight:600;letter-spacing:.16px}",
  map: `{"version":3,"file":"[id].svelte","sources":["[id].svelte"],"sourcesContent":["<script context='module'>\\r\\n    import { api } from '$lib/api'\\r\\n    export async function load({page, session}){\\r\\n        let user = session.user\\r\\n        const {id} = page.params\\r\\n        if(!user){\\r\\n            return {\\r\\n                status: 302,\\r\\n                redirect: 'login'\\r\\n            }\\r\\n        }\\r\\n        const room = await api.get(\`rooms/\${id}\`)\\r\\n        // if(!room.open && !room.users.includes(user.username)){\\r\\n        //     this.error('Unauthorized')\\r\\n        // }\\r\\n        let items, total\\r\\n        let res = await api.get(\`messages?id=\${id}\`)\\r\\n        items = res.items\\r\\n        page = res.page\\r\\n        total = res.total\\r\\n        if (!Array.isArray(items)) items = []\\r\\n        return {\\r\\n            props: {\\r\\n                room,\\r\\n                items,\\r\\n                page,\\r\\n                total,\\r\\n                user,\\r\\n                id\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n    export let room, items, page, total, user, id\\r\\n    import {goto} from '$app/navigation'\\r\\n    import { context } from '$lib/stores'\\r\\n    import {\\r\\n        Row,\\r\\n        Column,\\r\\n        TextArea,\\r\\n    } from 'carbon-components-svelte'\\r\\n    import io from 'socket.io-client'\\r\\n    import {onMount} from 'svelte'\\r\\n\\r\\n    $context = room.name\\r\\n    const socket = io()\\r\\n    let mounted\\r\\n    let value\\r\\n    let ref\\r\\n\\r\\n\\r\\n    $: if(mounted && total > 100 && window.scrollY==0){\\r\\n        get()\\r\\n    }\\r\\n\\r\\n    onMount(()=>{\\r\\n        window.scrollTo({left: 0, top: document.body.scrollHeight})\\r\\n        mounted = true\\r\\n        ref.focus()\\r\\n    })\\r\\n\\r\\n    socket.on('connect', ()=>{\\r\\n        socket.emit('join', id)\\r\\n    })\\r\\n\\r\\n    socket.on('msg', async(obj)=>{\\r\\n        await api.put(\`seen?id=\${id}\`, {})\\r\\n        items = [...items, obj]\\r\\n        updateScroll()\\r\\n    })\\r\\n\\r\\n    const keydown = (e) => {\\r\\n        switch(e.keyCode){\\r\\n            case 13:\\r\\n                send()\\r\\n        }\\r\\n    }\\r\\n\\r\\n    const get=async()=>{\\r\\n        res = await api.get(\`messages?id=\${id}&page=\${page+1}\`)\\r\\n        items = res.items\\r\\n        total = res.total\\r\\n        page++\\r\\n    }\\r\\n\\r\\n    const exit=async()=>{\\r\\n        socket.emit('leave', room.id)\\r\\n        await api.put('leave', {id:room.id})\\r\\n        goto('/')\\r\\n    }\\r\\n\\r\\n    const go=()=>{\\r\\n        if(room.user == user.username){\\r\\n            goto(\`/edit/\${room.id}\`)\\r\\n        }\\r\\n    }\\r\\n\\r\\n    const goUser=(user)=>{\\r\\n        goto(user)\\r\\n    }\\r\\n\\r\\n    const send=async()=>{\\r\\n        if(!value) return\\r\\n        value=value.trim()\\r\\n        let obj = {user: user.username, id, value}\\r\\n        items = [...items, obj]\\r\\n        socket.emit('msg', obj)\\r\\n        await api.post('messages', {id, value})\\r\\n        updateScroll()\\r\\n        value=''\\r\\n    }\\r\\n\\r\\n    const updateScroll=()=>{\\r\\n        setTimeout(()=>{\\r\\n            window.scrollTo({left: 0, top: document.body.scrollHeight})\\r\\n        }, 0)\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<svelte:window on:keydown={keydown} />\\r\\n\\r\\n<svelte:head>\\r\\n    <title>{room.name}</title>\\r\\n</svelte:head>\\r\\n\\r\\n<Row noGutter>\\r\\n    <Column>\\r\\n            <span>\\r\\n                <p on:click={go} class:head-link={room.user == user.username} class='head'>\\r\\n                    {room.name}\\r\\n                </p>\\r\\n                <p on:click={exit} class='pointer'>Leave</p>\\r\\n                <br/>\\r\\n            </span>\\r\\n        <div class='head-space'></div>\\r\\n    </Column>\\r\\n</Row>\\r\\n\\r\\n{#each items as item}\\r\\n    <Row noGutter>\\r\\n        <Column>\\r\\n            <p on:click={goUser(item.user)} class='small pointer'>{item.user}</p>\\r\\n            <p class='message'>{item.value}</p>            \\r\\n        </Column>\\r\\n    </Row>\\r\\n{/each}\\r\\n\\r\\n<Row noGutter>\\r\\n    <Column>\\r\\n        <TextArea rows={1} bind:ref bind:value />\\r\\n    </Column>\\r\\n</Row>\\r\\n\\r\\n<style>\\r\\n    .pointer {\\r\\n        cursor: pointer;\\r\\n    }\\r\\n    .small {\\r\\n        color: grey; \\r\\n        font-size: 0.75rem;\\r\\n    }\\r\\n    .message {\\r\\n        overflow-wrap: break-word;\\r\\n    }\\r\\n    .head-space {\\r\\n        height: 0.5rem;\\r\\n    }\\r\\n    .head-link {\\r\\n        cursor: pointer;\\r\\n    }\\r\\n    .head {\\r\\n        font-size: .875rem;\\r\\n        line-height: 1.125em;\\r\\n        font-weight: 600;\\r\\n        letter-spacing: .16px;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA4JI,QAAQ,eAAC,CAAC,AACN,MAAM,CAAE,OAAO,AACnB,CAAC,AACD,MAAM,eAAC,CAAC,AACJ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,OAAO,AACtB,CAAC,AACD,QAAQ,eAAC,CAAC,AACN,aAAa,CAAE,UAAU,AAC7B,CAAC,AACD,WAAW,eAAC,CAAC,AACT,MAAM,CAAE,MAAM,AAClB,CAAC,AACD,UAAU,eAAC,CAAC,AACR,MAAM,CAAE,OAAO,AACnB,CAAC,AACD,KAAK,eAAC,CAAC,AACH,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,OAAO,CACpB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,KAAK,AACzB,CAAC"}`
};
async function load$1({ page: page2, session: session2 }) {
  let user = session2.user;
  const { id } = page2.params;
  if (!user) {
    return { status: 302, redirect: "login" };
  }
  const room2 = await api.get(`rooms/${id}`);
  let items, total;
  let res = await api.get(`messages?id=${id}`);
  items = res.items;
  page2 = res.page;
  total = res.total;
  if (!Array.isArray(items))
    items = [];
  return {
    props: { room: room2, items, page: page2, total, user, id }
  };
}
var U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $context, $$unsubscribe_context;
  $$unsubscribe_context = subscribe(context, (value2) => $context = value2);
  let { room: room2, items, page: page2, total, user, id } = $$props;
  set_store_value(context, $context = room2.name, $context);
  const socket = io();
  let value;
  let ref;
  socket.on("connect", () => {
    socket.emit("join", id);
  });
  socket.on("msg", async (obj) => {
    await api.put(`seen?id=${id}`, {});
    items = [...items, obj];
    updateScroll();
  });
  const updateScroll = () => {
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight });
    }, 0);
  };
  if ($$props.room === void 0 && $$bindings.room && room2 !== void 0)
    $$bindings.room(room2);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `

${$$result.head += `${$$result.title = `<title>${escape(room2.name)}</title>`, ""}`, ""}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `<span><p class="${["head svelte-18f507d", room2.user == user.username ? "head-link" : ""].join(" ").trim()}">${escape(room2.name)}</p>
                <p class="${"pointer svelte-18f507d"}">Leave</p>
                <br></span>
        <div class="${"head-space svelte-18f507d"}"></div>`
      })}`
    })}

${each(items, (item) => `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `<p class="${"small pointer svelte-18f507d"}">${escape(item.user)}</p>
            <p class="${"message svelte-18f507d"}">${escape(item.value)}</p>            
        `
      })}
    `
    })}`)}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => `${validate_component(TextArea, "TextArea").$$render($$result, { rows: 1, ref, value }, {
          ref: ($$value) => {
            ref = $$value;
            $$settled = false;
          },
          value: ($$value) => {
            value = $$value;
            $$settled = false;
          }
        }, {})}`
      })}`
    })}`;
  } while (!$$settled);
  $$unsubscribe_context();
  return $$rendered;
});
var _id_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bidu5D,
  load: load$1
});
var User20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "User20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M16 4a5 5 0 11-5 5 5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0016 2zM26 30H24V25a5 5 0 00-5-5H13a5 5 0 00-5 5v5H6V25a7 7 0 017-7h6a7 7 0 017 7z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var User20$1 = User20;
var Phone20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Phone20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M26,29h-.17C6.18,27.87,3.39,11.29,3,6.23A3,3,0,0,1,5.76,3h5.51a2,2,0,0,1,1.86,1.26L14.65,8a2,2,0,0,1-.44,2.16l-2.13,2.15a9.37,9.37,0,0,0,7.58,7.6l2.17-2.15A2,2,0,0,1,24,17.35l3.77,1.51A2,2,0,0,1,29,20.72V26A3,3,0,0,1,26,29ZM6,5A1,1,0,0,0,5,6v.08C5.46,12,8.41,26,25.94,27A1,1,0,0,0,27,26.06V20.72l-3.77-1.51-2.87,2.85L19.88,22C11.18,20.91,10,12.21,10,12.12l-.06-.48,2.84-2.87L11.28,5Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Phone20$1 = Phone20;
var Earth20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Earth20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm5,3.1055a12.0136,12.0136,0,0,1,2.9158,1.8994L23.5034,8H21ZM13.3784,27.7026A11.9761,11.9761,0,0,1,8.1157,6.9761L9.4648,9h3.3423l-1.5,4H7.2793L5.8967,17.1475,8.4648,21h5l1.4319,2.1475ZM16,28c-.2034,0-.4016-.02-.6025-.03l1.3967-4.19a1.9876,1.9876,0,0,0-.2334-1.7412l-1.4319-2.1475A1.9962,1.9962,0,0,0,13.4648,19h-3.93L8.1033,16.8525,8.7207,15H11v2h2V14.1812l2.9363-7.83-1.8726-.7022L13.5571,7H10.5352L9.728,5.7891A11.7941,11.7941,0,0,1,19,4.395V8a2.0025,2.0025,0,0,0,2,2h2.5857A1.9865,1.9865,0,0,0,25,9.4141l.1406-.1407.2818-.68A11.9813,11.9813,0,0,1,27.3,12H22.5986a1.9927,1.9927,0,0,0-1.9719,1.665L20.03,17.1064a1.99,1.99,0,0,0,.991,2.086l2.1647,1.4638,1.4585,3.646A11.9577,11.9577,0,0,1,16,28Zm8.8145-8.6563L22.1,17.5088l-.1-.06L22.5986,14h5.2207a11.743,11.743,0,0,1-1.7441,8.4951Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Earth20$1 = Earth20;
var Email20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Email20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM25.8,8,16,14.78,6.2,8ZM4,24V8.91l11.43,7.91a1,1,0,0,0,1.14,0L28,8.91V24Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Email20$1 = Email20;
var Location20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "Location20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "20" },
    { height: "20" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M16,18a5,5,0,1,1,5-5A5.0057,5.0057,0,0,1,16,18Zm0-8a3,3,0,1,0,3,3A3.0033,3.0033,0,0,0,16,10Z"}"></path><path d="${"M16,30,7.5645,20.0513c-.0479-.0571-.3482-.4515-.3482-.4515A10.8888,10.8888,0,0,1,5,13a11,11,0,0,1,22,0,10.8844,10.8844,0,0,1-2.2148,6.5973l-.0015.0025s-.3.3944-.3447.4474ZM8.8125,18.395c.001.0007.2334.3082.2866.3744L16,26.9079l6.91-8.15c.0439-.0552.2783-.3649.2788-.3657A8.901,8.901,0,0,0,25,13,9,9,0,1,0,7,13a8.9054,8.9054,0,0,0,1.8125,5.395Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var Location20$1 = Location20;
async function load({ page: page2 }) {
  let { username: username2 } = page2.params;
  let user = await send$1({ method: "GET", path: `users/${username2}` });
  if (user.error) {
    return { status: user.status, error: user.error };
  }
  return { props: { user } };
}
var U5Busernameu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user = {} } = $$props;
  let about;
  if (user.about)
    about = parseMarkdown(user.about);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => `${user.image ? `${validate_component(Column, "Column").$$render($$result, { lg: 2, sm: 2, md: 2, xlg: 2 }, {}, {
      default: () => `<img style="${"width: 100%;"}" alt="${"user display _image"}"${add_attribute("src", user.image, 0)}>`
    })}` : ``}
    ${validate_component(Column, "Column").$$render($$result, { lg: 4, sm: 4, md: 4, xlg: 4 }, {}, {
      default: () => `${user.name ? `<p style="${"font-weight: 600;"}">${escape(user.name)}</p>` : ``}
        ${user.username ? `<div>${validate_component(User20$1, "User20").$$render($$result, {}, {}, {})}
                <span class="${"heading"}">${escape(user.username)}</span></div>` : ``}
        ${user.address ? `<div>${validate_component(Location20$1, "Location20").$$render($$result, {}, {}, {})}
                <span class="${"heading"}">${escape(user.address)}</span></div>` : ``}
        ${user.show_email && user.email ? `<div>${validate_component(Email20$1, "Email20").$$render($$result, {}, {}, {})}
                <span class="${"heading"}">${escape(user.email)}</span></div>` : ``}
        ${user.website ? `<div>${validate_component(Earth20$1, "Earth20").$$render($$result, {}, {}, {})}
                <a class="${"heading bx--link"}"${add_attribute("href", user.website, 0)}>${escape(user.website)}</a></div>` : ``}
        ${user.phone ? `<div>${validate_component(Phone20$1, "Phone20").$$render($$result, {}, {}, {})}
                <span class="${"heading"}">${escape(user.phone)}</span></div>` : ``}
        <br>
        
            
        `
    })}`
  })}

<br>

${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => `${validate_component(Column, "Column").$$render($$result, { lg: 6, sm: 6, md: 6, xlg: 6 }, {}, {
      default: () => `${about ? `<p><!-- HTML_TAG_START -->${about}<!-- HTML_TAG_END --></p>` : ``}`
    })}`
  })}`;
});
var _username_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Busernameu5D,
  load
});

// .svelte-kit/node/middlewares.js
import {
  createReadStream,
  existsSync,
  statSync
} from "fs";
import fs__default, { readdirSync, statSync as statSync2 } from "fs";
import { resolve as resolve2, join as join2, normalize as normalize2, dirname } from "path";
import {
  parse as parse2
} from "querystring";
import { fileURLToPath } from "url";
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data2 = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data2.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data2.length + chunk.length);
        new_data.set(data2, 0);
        new_data.set(chunk, data2.length);
        data2 = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data2);
    });
  });
}
function create_kit_middleware({ render: render2 }) {
  return async (req, res) => {
    let parsed;
    try {
      parsed = new URL(req.url || "", "http://localhost");
    } catch (e) {
      res.statusCode = 400;
      return res.end("Invalid URL");
    }
    let body;
    try {
      body = await getRawBody(req);
    } catch (err) {
      res.statusCode = err.status || 400;
      return res.end(err.reason || "Invalid request body");
    }
    const rendered = await render2({
      method: req.method,
      headers: req.headers,
      path: parsed.pathname,
      query: parsed.searchParams,
      rawBody: body
    });
    if (rendered) {
      res.writeHead(rendered.status, rendered.headers);
      if (rendered.body) {
        res.write(rendered.body);
      }
      res.end();
    } else {
      res.statusCode = 404;
      res.end("Not found");
    }
  };
}
function parse3(req) {
  let raw = req.url;
  if (raw == null)
    return;
  let prev = req._parsedUrl;
  if (prev && prev.raw === raw)
    return prev;
  let pathname = raw, search = "", query;
  if (raw.length > 1) {
    let idx = raw.indexOf("?", 1);
    if (idx !== -1) {
      search = raw.substring(idx);
      pathname = raw.substring(0, idx);
      if (search.length > 1) {
        query = parse2(search.substring(1));
      }
    }
  }
  return req._parsedUrl = { pathname, search, query, raw };
}
function list(dir, callback, pre = "") {
  dir = resolve2(".", dir);
  let arr = readdirSync(dir);
  let i = 0, abs, stats;
  for (; i < arr.length; i++) {
    abs = join2(dir, arr[i]);
    stats = statSync2(abs);
    stats.isDirectory() ? list(abs, callback, join2(pre, arr[i])) : callback(join2(pre, arr[i]), abs, stats);
  }
}
function Mime$1() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);
  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }
  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}
Mime$1.prototype.define = function(typeMap, force) {
  for (let type in typeMap) {
    let extensions = typeMap[type].map(function(t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();
    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];
      if (ext[0] === "*") {
        continue;
      }
      if (!force && ext in this._types) {
        throw new Error('Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".');
      }
      this._types[ext] = type;
    }
    if (force || !this._extensions[type]) {
      const ext = extensions[0];
      this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
    }
  }
};
Mime$1.prototype.getType = function(path) {
  path = String(path);
  let last = path.replace(/^.*[/\\]/, "").toLowerCase();
  let ext = last.replace(/^.*\./, "").toLowerCase();
  let hasPath = last.length < path.length;
  let hasDot = ext.length < last.length - 1;
  return (hasDot || !hasPath) && this._types[ext] || null;
};
Mime$1.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};
var Mime_1 = Mime$1;
var standard = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["ecma", "es"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/mrb-consumer+xml": ["*xdf"], "application/mrb-publish+xml": ["*xdf"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["*xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-error+xml": ["xer"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
var Mime = Mime_1;
var lite = new Mime(standard);
var noop2 = () => {
};
function isMatch(uri, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].test(uri))
      return true;
  }
}
function toAssume(uri, extns) {
  let i = 0, x, len = uri.length - 1;
  if (uri.charCodeAt(len) === 47) {
    uri = uri.substring(0, len);
  }
  let arr = [], tmp = `${uri}/index`;
  for (; i < extns.length; i++) {
    x = extns[i] ? `.${extns[i]}` : "";
    if (uri)
      arr.push(uri + x);
    arr.push(tmp + x);
  }
  return arr;
}
function viaCache(cache, uri, extns) {
  let i = 0, data2, arr = toAssume(uri, extns);
  for (; i < arr.length; i++) {
    if (data2 = cache[arr[i]])
      return data2;
  }
}
function viaLocal(dir, isEtag, uri, extns) {
  let i = 0, arr = toAssume(uri, extns);
  let abs, stats, name, headers;
  for (; i < arr.length; i++) {
    abs = normalize2(join2(dir, name = arr[i]));
    if (abs.startsWith(dir) && existsSync(abs)) {
      stats = statSync(abs);
      if (stats.isDirectory())
        continue;
      headers = toHeaders(name, stats, isEtag);
      headers["Cache-Control"] = isEtag ? "no-cache" : "no-store";
      return { abs, stats, headers };
    }
  }
}
function is404(req, res) {
  return res.statusCode = 404, res.end();
}
function send2(req, res, file, stats, headers) {
  let code = 200, tmp, opts = {};
  headers = __spreadValues({}, headers);
  for (let key in headers) {
    tmp = res.getHeader(key);
    if (tmp)
      headers[key] = tmp;
  }
  if (tmp = res.getHeader("content-type")) {
    headers["Content-Type"] = tmp;
  }
  if (req.headers.range) {
    code = 206;
    let [x, y] = req.headers.range.replace("bytes=", "").split("-");
    let end = opts.end = parseInt(y, 10) || stats.size - 1;
    let start = opts.start = parseInt(x, 10) || 0;
    if (start >= stats.size || end >= stats.size) {
      res.setHeader("Content-Range", `bytes */${stats.size}`);
      res.statusCode = 416;
      return res.end();
    }
    headers["Content-Range"] = `bytes ${start}-${end}/${stats.size}`;
    headers["Content-Length"] = end - start + 1;
    headers["Accept-Ranges"] = "bytes";
  }
  res.writeHead(code, headers);
  createReadStream(file, opts).pipe(res);
}
function isEncoding(name, type, headers) {
  headers["Content-Encoding"] = type;
  headers["Content-Type"] = lite.getType(name.replace(/\.([^.]*)$/, "")) || "";
}
function toHeaders(name, stats, isEtag) {
  let headers = {
    "Content-Length": stats.size,
    "Content-Type": lite.getType(name) || "",
    "Last-Modified": stats.mtime.toUTCString()
  };
  if (isEtag)
    headers["ETag"] = `W/"${stats.size}-${stats.mtime.getTime()}"`;
  if (/\.br$/.test(name))
    isEncoding(name, "br", headers);
  if (/\.gz$/.test(name))
    isEncoding(name, "gzip", headers);
  return headers;
}
function sirv(dir, opts = {}) {
  dir = resolve2(dir || ".");
  let isNotFound = opts.onNoMatch || is404;
  let setHeaders = opts.setHeaders || noop2;
  let extensions = opts.extensions || ["html", "htm"];
  let gzips = opts.gzip && extensions.map((x) => `${x}.gz`).concat("gz");
  let brots = opts.brotli && extensions.map((x) => `${x}.br`).concat("br");
  const FILES = {};
  let fallback = "/";
  let isEtag = !!opts.etag;
  let isSPA = !!opts.single;
  if (typeof opts.single === "string") {
    let idx = opts.single.lastIndexOf(".");
    fallback += !!~idx ? opts.single.substring(0, idx) : opts.single;
  }
  let ignores = [];
  if (opts.ignores !== false) {
    ignores.push(/[/]([A-Za-z\s\d~$._-]+\.\w+){1,}$/);
    if (opts.dotfiles)
      ignores.push(/\/\.\w/);
    else
      ignores.push(/\/\.well-known/);
    [].concat(opts.ignores || []).forEach((x) => {
      ignores.push(new RegExp(x, "i"));
    });
  }
  let cc = opts.maxAge != null && `public,max-age=${opts.maxAge}`;
  if (cc && opts.immutable)
    cc += ",immutable";
  else if (cc && opts.maxAge === 0)
    cc += ",must-revalidate";
  if (!opts.dev) {
    list(dir, (name, abs, stats) => {
      if (/\.well-known[\\+\/]/.test(name))
        ;
      else if (!opts.dotfiles && /(^\.|[\\+|\/+]\.)/.test(name))
        return;
      let headers = toHeaders(name, stats, isEtag);
      if (cc)
        headers["Cache-Control"] = cc;
      FILES["/" + name.normalize().replace(/\\+/g, "/")] = { abs, stats, headers };
    });
  }
  let lookup = opts.dev ? viaLocal.bind(0, dir, isEtag) : viaCache.bind(0, FILES);
  return function(req, res, next) {
    let extns = [""];
    let pathname = parse3(req).pathname;
    let val = req.headers["accept-encoding"] || "";
    if (gzips && val.includes("gzip"))
      extns.unshift(...gzips);
    if (brots && /(br|brotli)/i.test(val))
      extns.unshift(...brots);
    extns.push(...extensions);
    if (pathname.indexOf("%") !== -1) {
      try {
        pathname = decodeURIComponent(pathname);
      } catch (err) {
      }
    }
    let data2 = lookup(pathname, extns) || isSPA && !isMatch(pathname, ignores) && lookup(fallback, extns);
    if (!data2)
      return next ? next() : isNotFound(req, res);
    if (isEtag && req.headers["if-none-match"] === data2.headers["ETag"]) {
      res.writeHead(304);
      return res.end();
    }
    if (gzips || brots) {
      res.setHeader("Vary", "Accept-Encoding");
    }
    setHeaders(res, pathname, data2.stats);
    send2(req, res, data2.abs, data2.stats, data2.headers);
  };
}
var __dirname = dirname(fileURLToPath(import.meta.url));
var noop_handler = (_req, _res, next) => next();
var paths = {
  assets: join2(__dirname, "/assets"),
  prerendered: join2(__dirname, "/prerendered")
};
var prerenderedMiddleware = fs__default.existsSync(paths.prerendered) ? sirv(paths.prerendered, {
  etag: true,
  maxAge: 0,
  gzip: true,
  brotli: true
}) : noop_handler;
var assetsMiddleware = fs__default.existsSync(paths.assets) ? sirv(paths.assets, {
  setHeaders: (res, pathname) => {
    if (pathname.startsWith("/_app/")) {
      res.setHeader("cache-control", "public, max-age=31536000, immutable");
    }
  },
  gzip: true,
  brotli: true
}) : noop_handler;
var kitMiddleware = function() {
  init();
  return create_kit_middleware({ render });
}();
export {
  assetsMiddleware,
  kitMiddleware,
  prerenderedMiddleware
};
