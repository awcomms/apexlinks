import { n as noop, o as safe_not_equal, j as subscribe, r as run_all, p as is_function } from "./index-706e192e.js";
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
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
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
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
Object.freeze({
  sm: 320,
  md: 672,
  lg: 1056,
  xlg: 1312,
  max: 1584
});
const modalsOpen = writable(0);
modalsOpen.subscribe((openCount) => {
  if (typeof document !== "undefined")
    document.body.classList.toggle("bx--body--with-modal-open", openCount > 0);
});
var HeaderAction_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".action-text.svelte-187bdaq.svelte-187bdaq{display:inline-flex;align-items:center;width:auto;padding:0 1rem 2px 1rem;font-size:0.875rem;line-height:1.28572;letter-spacing:0.16px;color:#f4f4f4}.action-text.svelte-187bdaq>span.svelte-187bdaq{margin-left:0.75rem}")();
var HeaderActionLink_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".bx--header__action.svelte-smaelc{display:flex;align-items:center;justify-content:center;padding-bottom:2px}")();
var HeaderPanelDivider_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "li.svelte-1tbdbmc{margin:2rem 1rem 0;color:#525252}span.svelte-1tbdbmc{font-size:0.75rem;line-height:1.3;letter-spacing:0.02rem;color:#c6c6c6}")();
var HeaderSearch_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => 'label.svelte-qozwl4.svelte-qozwl4{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;white-space:nowrap;border:0;visibility:inherit;clip:rect(0, 0, 0, 0)}[role="search"].svelte-qozwl4.svelte-qozwl4{position:relative;display:flex;max-width:28rem;width:100%;margin-left:0.5rem;height:3rem;background-color:#393939;color:#fff;transition:max-width 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\n      background 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}[role="search"].svelte-qozwl4.svelte-qozwl4:not(.active){max-width:3rem;background-color:#161616}[role="search"].active.svelte-qozwl4.svelte-qozwl4{outline:2px solid #fff;outline-offset:-2px}[role="combobox"].svelte-qozwl4.svelte-qozwl4{display:flex;flex-grow:1;border-bottom:1px solid #393939}input.svelte-qozwl4.svelte-qozwl4{width:100%;height:3rem;padding:0;font-size:1rem;font-weight:400;line-height:1.375rem;letter-spacing:0;color:#fff;caret-color:#fff;background-color:initial;border:none;outline:none;transition:opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}input.svelte-qozwl4.svelte-qozwl4:not(.active){opacity:0;pointer-events:none}button.svelte-qozwl4.svelte-qozwl4{width:3rem;height:100%;padding:0;flex-shrink:0;opacity:1;transition:background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\n      opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}.disabled.svelte-qozwl4.svelte-qozwl4{border:none;pointer-events:none}[aria-label="Clear search"].svelte-qozwl4.svelte-qozwl4:hover{background-color:#4c4c4c}.hidden.svelte-qozwl4.svelte-qozwl4{opacity:0;display:none}ul.svelte-qozwl4.svelte-qozwl4{position:absolute;z-index:10000;padding:1rem 0;left:0;right:0;top:3rem;background-color:#161616;border:1px solid #393939;border-top:none;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.5)}[role="menuitem"].svelte-qozwl4.svelte-qozwl4{padding:6px 1rem;cursor:pointer;font-size:0.875rem;font-weight:600;line-height:1.29;letter-spacing:0.16px;transition:all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);display:block;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#c6c6c6}.selected.svelte-qozwl4.svelte-qozwl4,[role="menuitem"].svelte-qozwl4.svelte-qozwl4:hover{background-color:#353535;color:#f4f4f4}[role="menuitem"].svelte-qozwl4 span.svelte-qozwl4{font-size:0.75rem;font-weight:400;line-height:1.34;letter-spacing:0.32px;text-transform:lowercase;color:#c6c6c6}')();
export { derived as d, writable as w };
