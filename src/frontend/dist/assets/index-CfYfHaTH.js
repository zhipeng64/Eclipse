(function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) u(f);
  new MutationObserver((f) => {
    for (const d of f)
      if (d.type === "childList")
        for (const m of d.addedNodes)
          m.tagName === "LINK" && m.rel === "modulepreload" && u(m);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(f) {
    const d = {};
    return (
      f.integrity && (d.integrity = f.integrity),
      f.referrerPolicy && (d.referrerPolicy = f.referrerPolicy),
      f.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : f.crossOrigin === "anonymous"
          ? (d.credentials = "omit")
          : (d.credentials = "same-origin"),
      d
    );
  }
  function u(f) {
    if (f.ep) return;
    f.ep = !0;
    const d = c(f);
    fetch(f.href, d);
  }
})();
function hc(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default")
    ? s.default
    : s;
}
var Xr = { exports: {} },
  La = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vd;
function ty() {
  if (vd) return La;
  vd = 1;
  var s = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.fragment");
  function c(u, f, d) {
    var m = null;
    if (
      (d !== void 0 && (m = "" + d),
      f.key !== void 0 && (m = "" + f.key),
      "key" in f)
    ) {
      d = {};
      for (var x in f) x !== "key" && (d[x] = f[x]);
    } else d = f;
    return (
      (f = d.ref),
      { $$typeof: s, type: u, key: m, ref: f !== void 0 ? f : null, props: d }
    );
  }
  return ((La.Fragment = i), (La.jsx = c), (La.jsxs = c), La);
}
var bd;
function ny() {
  return (bd || ((bd = 1), (Xr.exports = ty())), Xr.exports);
}
var v = ny(),
  Qr = { exports: {} },
  le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sd;
function ly() {
  if (Sd) return le;
  Sd = 1;
  var s = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.portal"),
    c = Symbol.for("react.fragment"),
    u = Symbol.for("react.strict_mode"),
    f = Symbol.for("react.profiler"),
    d = Symbol.for("react.consumer"),
    m = Symbol.for("react.context"),
    x = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    y = Symbol.for("react.memo"),
    E = Symbol.for("react.lazy"),
    M = Symbol.iterator;
  function j(b) {
    return b === null || typeof b != "object"
      ? null
      : ((b = (M && b[M]) || b["@@iterator"]),
        typeof b == "function" ? b : null);
  }
  var q = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    H = Object.assign,
    X = {};
  function L(b, U, Q) {
    ((this.props = b),
      (this.context = U),
      (this.refs = X),
      (this.updater = Q || q));
  }
  ((L.prototype.isReactComponent = {}),
    (L.prototype.setState = function (b, U) {
      if (typeof b != "object" && typeof b != "function" && b != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, b, U, "setState");
    }),
    (L.prototype.forceUpdate = function (b) {
      this.updater.enqueueForceUpdate(this, b, "forceUpdate");
    }));
  function G() {}
  G.prototype = L.prototype;
  function Y(b, U, Q) {
    ((this.props = b),
      (this.context = U),
      (this.refs = X),
      (this.updater = Q || q));
  }
  var $ = (Y.prototype = new G());
  (($.constructor = Y), H($, L.prototype), ($.isPureReactComponent = !0));
  var oe = Array.isArray,
    F = { H: null, A: null, T: null, S: null, V: null },
    Oe = Object.prototype.hasOwnProperty;
  function be(b, U, Q, V, W, fe) {
    return (
      (Q = fe.ref),
      { $$typeof: s, type: b, key: U, ref: Q !== void 0 ? Q : null, props: fe }
    );
  }
  function xe(b, U) {
    return be(b.type, U, void 0, void 0, void 0, b.props);
  }
  function te(b) {
    return typeof b == "object" && b !== null && b.$$typeof === s;
  }
  function Fe(b) {
    var U = { "=": "=0", ":": "=2" };
    return (
      "$" +
      b.replace(/[=:]/g, function (Q) {
        return U[Q];
      })
    );
  }
  var Pe = /\/+/g;
  function qe(b, U) {
    return typeof b == "object" && b !== null && b.key != null
      ? Fe("" + b.key)
      : U.toString(36);
  }
  function Yt() {}
  function Vt(b) {
    switch (b.status) {
      case "fulfilled":
        return b.value;
      case "rejected":
        throw b.reason;
      default:
        switch (
          (typeof b.status == "string"
            ? b.then(Yt, Yt)
            : ((b.status = "pending"),
              b.then(
                function (U) {
                  b.status === "pending" &&
                    ((b.status = "fulfilled"), (b.value = U));
                },
                function (U) {
                  b.status === "pending" &&
                    ((b.status = "rejected"), (b.reason = U));
                }
              )),
          b.status)
        ) {
          case "fulfilled":
            return b.value;
          case "rejected":
            throw b.reason;
        }
    }
    throw b;
  }
  function He(b, U, Q, V, W) {
    var fe = typeof b;
    (fe === "undefined" || fe === "boolean") && (b = null);
    var ne = !1;
    if (b === null) ne = !0;
    else
      switch (fe) {
        case "bigint":
        case "string":
        case "number":
          ne = !0;
          break;
        case "object":
          switch (b.$$typeof) {
            case s:
            case i:
              ne = !0;
              break;
            case E:
              return ((ne = b._init), He(ne(b._payload), U, Q, V, W));
          }
      }
    if (ne)
      return (
        (W = W(b)),
        (ne = V === "" ? "." + qe(b, 0) : V),
        oe(W)
          ? ((Q = ""),
            ne != null && (Q = ne.replace(Pe, "$&/") + "/"),
            He(W, U, Q, "", function (un) {
              return un;
            }))
          : W != null &&
            (te(W) &&
              (W = xe(
                W,
                Q +
                  (W.key == null || (b && b.key === W.key)
                    ? ""
                    : ("" + W.key).replace(Pe, "$&/") + "/") +
                  ne
              )),
            U.push(W)),
        1
      );
    ne = 0;
    var at = V === "" ? "." : V + ":";
    if (oe(b))
      for (var _e = 0; _e < b.length; _e++)
        ((V = b[_e]), (fe = at + qe(V, _e)), (ne += He(V, U, Q, fe, W)));
    else if (((_e = j(b)), typeof _e == "function"))
      for (b = _e.call(b), _e = 0; !(V = b.next()).done; )
        ((V = V.value), (fe = at + qe(V, _e++)), (ne += He(V, U, Q, fe, W)));
    else if (fe === "object") {
      if (typeof b.then == "function") return He(Vt(b), U, Q, V, W);
      throw (
        (U = String(b)),
        Error(
          "Objects are not valid as a React child (found: " +
            (U === "[object Object]"
              ? "object with keys {" + Object.keys(b).join(", ") + "}"
              : U) +
            "). If you meant to render a collection of children, use an array instead."
        )
      );
    }
    return ne;
  }
  function A(b, U, Q) {
    if (b == null) return b;
    var V = [],
      W = 0;
    return (
      He(b, V, "", "", function (fe) {
        return U.call(Q, fe, W++);
      }),
      V
    );
  }
  function B(b) {
    if (b._status === -1) {
      var U = b._result;
      ((U = U()),
        U.then(
          function (Q) {
            (b._status === 0 || b._status === -1) &&
              ((b._status = 1), (b._result = Q));
          },
          function (Q) {
            (b._status === 0 || b._status === -1) &&
              ((b._status = 2), (b._result = Q));
          }
        ),
        b._status === -1 && ((b._status = 0), (b._result = U)));
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var Z =
    typeof reportError == "function"
      ? reportError
      : function (b) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var U = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof b == "object" &&
                b !== null &&
                typeof b.message == "string"
                  ? String(b.message)
                  : String(b),
              error: b,
            });
            if (!window.dispatchEvent(U)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", b);
            return;
          }
          console.error(b);
        };
  function K() {}
  return (
    (le.Children = {
      map: A,
      forEach: function (b, U, Q) {
        A(
          b,
          function () {
            U.apply(this, arguments);
          },
          Q
        );
      },
      count: function (b) {
        var U = 0;
        return (
          A(b, function () {
            U++;
          }),
          U
        );
      },
      toArray: function (b) {
        return (
          A(b, function (U) {
            return U;
          }) || []
        );
      },
      only: function (b) {
        if (!te(b))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return b;
      },
    }),
    (le.Component = L),
    (le.Fragment = c),
    (le.Profiler = f),
    (le.PureComponent = Y),
    (le.StrictMode = u),
    (le.Suspense = p),
    (le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F),
    (le.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (b) {
        return F.H.useMemoCache(b);
      },
    }),
    (le.cache = function (b) {
      return function () {
        return b.apply(null, arguments);
      };
    }),
    (le.cloneElement = function (b, U, Q) {
      if (b == null)
        throw Error(
          "The argument must be a React element, but you passed " + b + "."
        );
      var V = H({}, b.props),
        W = b.key,
        fe = void 0;
      if (U != null)
        for (ne in (U.ref !== void 0 && (fe = void 0),
        U.key !== void 0 && (W = "" + U.key),
        U))
          !Oe.call(U, ne) ||
            ne === "key" ||
            ne === "__self" ||
            ne === "__source" ||
            (ne === "ref" && U.ref === void 0) ||
            (V[ne] = U[ne]);
      var ne = arguments.length - 2;
      if (ne === 1) V.children = Q;
      else if (1 < ne) {
        for (var at = Array(ne), _e = 0; _e < ne; _e++)
          at[_e] = arguments[_e + 2];
        V.children = at;
      }
      return be(b.type, W, void 0, void 0, fe, V);
    }),
    (le.createContext = function (b) {
      return (
        (b = {
          $$typeof: m,
          _currentValue: b,
          _currentValue2: b,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (b.Provider = b),
        (b.Consumer = { $$typeof: d, _context: b }),
        b
      );
    }),
    (le.createElement = function (b, U, Q) {
      var V,
        W = {},
        fe = null;
      if (U != null)
        for (V in (U.key !== void 0 && (fe = "" + U.key), U))
          Oe.call(U, V) &&
            V !== "key" &&
            V !== "__self" &&
            V !== "__source" &&
            (W[V] = U[V]);
      var ne = arguments.length - 2;
      if (ne === 1) W.children = Q;
      else if (1 < ne) {
        for (var at = Array(ne), _e = 0; _e < ne; _e++)
          at[_e] = arguments[_e + 2];
        W.children = at;
      }
      if (b && b.defaultProps)
        for (V in ((ne = b.defaultProps), ne))
          W[V] === void 0 && (W[V] = ne[V]);
      return be(b, fe, void 0, void 0, null, W);
    }),
    (le.createRef = function () {
      return { current: null };
    }),
    (le.forwardRef = function (b) {
      return { $$typeof: x, render: b };
    }),
    (le.isValidElement = te),
    (le.lazy = function (b) {
      return { $$typeof: E, _payload: { _status: -1, _result: b }, _init: B };
    }),
    (le.memo = function (b, U) {
      return { $$typeof: y, type: b, compare: U === void 0 ? null : U };
    }),
    (le.startTransition = function (b) {
      var U = F.T,
        Q = {};
      F.T = Q;
      try {
        var V = b(),
          W = F.S;
        (W !== null && W(Q, V),
          typeof V == "object" &&
            V !== null &&
            typeof V.then == "function" &&
            V.then(K, Z));
      } catch (fe) {
        Z(fe);
      } finally {
        F.T = U;
      }
    }),
    (le.unstable_useCacheRefresh = function () {
      return F.H.useCacheRefresh();
    }),
    (le.use = function (b) {
      return F.H.use(b);
    }),
    (le.useActionState = function (b, U, Q) {
      return F.H.useActionState(b, U, Q);
    }),
    (le.useCallback = function (b, U) {
      return F.H.useCallback(b, U);
    }),
    (le.useContext = function (b) {
      return F.H.useContext(b);
    }),
    (le.useDebugValue = function () {}),
    (le.useDeferredValue = function (b, U) {
      return F.H.useDeferredValue(b, U);
    }),
    (le.useEffect = function (b, U, Q) {
      var V = F.H;
      if (typeof Q == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React."
        );
      return V.useEffect(b, U);
    }),
    (le.useId = function () {
      return F.H.useId();
    }),
    (le.useImperativeHandle = function (b, U, Q) {
      return F.H.useImperativeHandle(b, U, Q);
    }),
    (le.useInsertionEffect = function (b, U) {
      return F.H.useInsertionEffect(b, U);
    }),
    (le.useLayoutEffect = function (b, U) {
      return F.H.useLayoutEffect(b, U);
    }),
    (le.useMemo = function (b, U) {
      return F.H.useMemo(b, U);
    }),
    (le.useOptimistic = function (b, U) {
      return F.H.useOptimistic(b, U);
    }),
    (le.useReducer = function (b, U, Q) {
      return F.H.useReducer(b, U, Q);
    }),
    (le.useRef = function (b) {
      return F.H.useRef(b);
    }),
    (le.useState = function (b) {
      return F.H.useState(b);
    }),
    (le.useSyncExternalStore = function (b, U, Q) {
      return F.H.useSyncExternalStore(b, U, Q);
    }),
    (le.useTransition = function () {
      return F.H.useTransition();
    }),
    (le.version = "19.1.1"),
    le
  );
}
var xd;
function dc() {
  return (xd || ((xd = 1), (Qr.exports = ly())), Qr.exports);
}
var w = dc();
const Wn = hc(w);
var Zr = { exports: {} },
  Ya = {},
  kr = { exports: {} },
  Kr = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ed;
function ay() {
  return (
    Ed ||
      ((Ed = 1),
      (function (s) {
        function i(A, B) {
          var Z = A.length;
          A.push(B);
          e: for (; 0 < Z; ) {
            var K = (Z - 1) >>> 1,
              b = A[K];
            if (0 < f(b, B)) ((A[K] = B), (A[Z] = b), (Z = K));
            else break e;
          }
        }
        function c(A) {
          return A.length === 0 ? null : A[0];
        }
        function u(A) {
          if (A.length === 0) return null;
          var B = A[0],
            Z = A.pop();
          if (Z !== B) {
            A[0] = Z;
            e: for (var K = 0, b = A.length, U = b >>> 1; K < U; ) {
              var Q = 2 * (K + 1) - 1,
                V = A[Q],
                W = Q + 1,
                fe = A[W];
              if (0 > f(V, Z))
                W < b && 0 > f(fe, V)
                  ? ((A[K] = fe), (A[W] = Z), (K = W))
                  : ((A[K] = V), (A[Q] = Z), (K = Q));
              else if (W < b && 0 > f(fe, Z))
                ((A[K] = fe), (A[W] = Z), (K = W));
              else break e;
            }
          }
          return B;
        }
        function f(A, B) {
          var Z = A.sortIndex - B.sortIndex;
          return Z !== 0 ? Z : A.id - B.id;
        }
        if (
          ((s.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var d = performance;
          s.unstable_now = function () {
            return d.now();
          };
        } else {
          var m = Date,
            x = m.now();
          s.unstable_now = function () {
            return m.now() - x;
          };
        }
        var p = [],
          y = [],
          E = 1,
          M = null,
          j = 3,
          q = !1,
          H = !1,
          X = !1,
          L = !1,
          G = typeof setTimeout == "function" ? setTimeout : null,
          Y = typeof clearTimeout == "function" ? clearTimeout : null,
          $ = typeof setImmediate < "u" ? setImmediate : null;
        function oe(A) {
          for (var B = c(y); B !== null; ) {
            if (B.callback === null) u(y);
            else if (B.startTime <= A)
              (u(y), (B.sortIndex = B.expirationTime), i(p, B));
            else break;
            B = c(y);
          }
        }
        function F(A) {
          if (((X = !1), oe(A), !H))
            if (c(p) !== null) ((H = !0), Oe || ((Oe = !0), qe()));
            else {
              var B = c(y);
              B !== null && He(F, B.startTime - A);
            }
        }
        var Oe = !1,
          be = -1,
          xe = 5,
          te = -1;
        function Fe() {
          return L ? !0 : !(s.unstable_now() - te < xe);
        }
        function Pe() {
          if (((L = !1), Oe)) {
            var A = s.unstable_now();
            te = A;
            var B = !0;
            try {
              e: {
                ((H = !1), X && ((X = !1), Y(be), (be = -1)), (q = !0));
                var Z = j;
                try {
                  t: {
                    for (
                      oe(A), M = c(p);
                      M !== null && !(M.expirationTime > A && Fe());

                    ) {
                      var K = M.callback;
                      if (typeof K == "function") {
                        ((M.callback = null), (j = M.priorityLevel));
                        var b = K(M.expirationTime <= A);
                        if (((A = s.unstable_now()), typeof b == "function")) {
                          ((M.callback = b), oe(A), (B = !0));
                          break t;
                        }
                        (M === c(p) && u(p), oe(A));
                      } else u(p);
                      M = c(p);
                    }
                    if (M !== null) B = !0;
                    else {
                      var U = c(y);
                      (U !== null && He(F, U.startTime - A), (B = !1));
                    }
                  }
                  break e;
                } finally {
                  ((M = null), (j = Z), (q = !1));
                }
                B = void 0;
              }
            } finally {
              B ? qe() : (Oe = !1);
            }
          }
        }
        var qe;
        if (typeof $ == "function")
          qe = function () {
            $(Pe);
          };
        else if (typeof MessageChannel < "u") {
          var Yt = new MessageChannel(),
            Vt = Yt.port2;
          ((Yt.port1.onmessage = Pe),
            (qe = function () {
              Vt.postMessage(null);
            }));
        } else
          qe = function () {
            G(Pe, 0);
          };
        function He(A, B) {
          be = G(function () {
            A(s.unstable_now());
          }, B);
        }
        ((s.unstable_IdlePriority = 5),
          (s.unstable_ImmediatePriority = 1),
          (s.unstable_LowPriority = 4),
          (s.unstable_NormalPriority = 3),
          (s.unstable_Profiling = null),
          (s.unstable_UserBlockingPriority = 2),
          (s.unstable_cancelCallback = function (A) {
            A.callback = null;
          }),
          (s.unstable_forceFrameRate = function (A) {
            0 > A || 125 < A
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (xe = 0 < A ? Math.floor(1e3 / A) : 5);
          }),
          (s.unstable_getCurrentPriorityLevel = function () {
            return j;
          }),
          (s.unstable_next = function (A) {
            switch (j) {
              case 1:
              case 2:
              case 3:
                var B = 3;
                break;
              default:
                B = j;
            }
            var Z = j;
            j = B;
            try {
              return A();
            } finally {
              j = Z;
            }
          }),
          (s.unstable_requestPaint = function () {
            L = !0;
          }),
          (s.unstable_runWithPriority = function (A, B) {
            switch (A) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                A = 3;
            }
            var Z = j;
            j = A;
            try {
              return B();
            } finally {
              j = Z;
            }
          }),
          (s.unstable_scheduleCallback = function (A, B, Z) {
            var K = s.unstable_now();
            switch (
              (typeof Z == "object" && Z !== null
                ? ((Z = Z.delay),
                  (Z = typeof Z == "number" && 0 < Z ? K + Z : K))
                : (Z = K),
              A)
            ) {
              case 1:
                var b = -1;
                break;
              case 2:
                b = 250;
                break;
              case 5:
                b = 1073741823;
                break;
              case 4:
                b = 1e4;
                break;
              default:
                b = 5e3;
            }
            return (
              (b = Z + b),
              (A = {
                id: E++,
                callback: B,
                priorityLevel: A,
                startTime: Z,
                expirationTime: b,
                sortIndex: -1,
              }),
              Z > K
                ? ((A.sortIndex = Z),
                  i(y, A),
                  c(p) === null &&
                    A === c(y) &&
                    (X ? (Y(be), (be = -1)) : (X = !0), He(F, Z - K)))
                : ((A.sortIndex = b),
                  i(p, A),
                  H || q || ((H = !0), Oe || ((Oe = !0), qe()))),
              A
            );
          }),
          (s.unstable_shouldYield = Fe),
          (s.unstable_wrapCallback = function (A) {
            var B = j;
            return function () {
              var Z = j;
              j = B;
              try {
                return A.apply(this, arguments);
              } finally {
                j = Z;
              }
            };
          }));
      })(Kr)),
    Kr
  );
}
var _d;
function iy() {
  return (_d || ((_d = 1), (kr.exports = ay())), kr.exports);
}
var Jr = { exports: {} },
  Je = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Td;
function uy() {
  if (Td) return Je;
  Td = 1;
  var s = dc();
  function i(p) {
    var y = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var E = 2; E < arguments.length; E++)
        y += "&args[]=" + encodeURIComponent(arguments[E]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      y +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c() {}
  var u = {
      d: {
        f: c,
        r: function () {
          throw Error(i(522));
        },
        D: c,
        C: c,
        L: c,
        m: c,
        X: c,
        S: c,
        M: c,
      },
      p: 0,
      findDOMNode: null,
    },
    f = Symbol.for("react.portal");
  function d(p, y, E) {
    var M =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: M == null ? null : "" + M,
      children: p,
      containerInfo: y,
      implementation: E,
    };
  }
  var m = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function x(p, y) {
    if (p === "font") return "";
    if (typeof y == "string") return y === "use-credentials" ? y : "";
  }
  return (
    (Je.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u),
    (Je.createPortal = function (p, y) {
      var E =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11))
        throw Error(i(299));
      return d(p, y, null, E);
    }),
    (Je.flushSync = function (p) {
      var y = m.T,
        E = u.p;
      try {
        if (((m.T = null), (u.p = 2), p)) return p();
      } finally {
        ((m.T = y), (u.p = E), u.d.f());
      }
    }),
    (Je.preconnect = function (p, y) {
      typeof p == "string" &&
        (y
          ? ((y = y.crossOrigin),
            (y =
              typeof y == "string"
                ? y === "use-credentials"
                  ? y
                  : ""
                : void 0))
          : (y = null),
        u.d.C(p, y));
    }),
    (Je.prefetchDNS = function (p) {
      typeof p == "string" && u.d.D(p);
    }),
    (Je.preinit = function (p, y) {
      if (typeof p == "string" && y && typeof y.as == "string") {
        var E = y.as,
          M = x(E, y.crossOrigin),
          j = typeof y.integrity == "string" ? y.integrity : void 0,
          q = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        E === "style"
          ? u.d.S(p, typeof y.precedence == "string" ? y.precedence : void 0, {
              crossOrigin: M,
              integrity: j,
              fetchPriority: q,
            })
          : E === "script" &&
            u.d.X(p, {
              crossOrigin: M,
              integrity: j,
              fetchPriority: q,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            });
      }
    }),
    (Je.preinitModule = function (p, y) {
      if (typeof p == "string")
        if (typeof y == "object" && y !== null) {
          if (y.as == null || y.as === "script") {
            var E = x(y.as, y.crossOrigin);
            u.d.M(p, {
              crossOrigin: E,
              integrity: typeof y.integrity == "string" ? y.integrity : void 0,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            });
          }
        } else y == null && u.d.M(p);
    }),
    (Je.preload = function (p, y) {
      if (
        typeof p == "string" &&
        typeof y == "object" &&
        y !== null &&
        typeof y.as == "string"
      ) {
        var E = y.as,
          M = x(E, y.crossOrigin);
        u.d.L(p, E, {
          crossOrigin: M,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          type: typeof y.type == "string" ? y.type : void 0,
          fetchPriority:
            typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
          referrerPolicy:
            typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
          imageSrcSet:
            typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
          imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
          media: typeof y.media == "string" ? y.media : void 0,
        });
      }
    }),
    (Je.preloadModule = function (p, y) {
      if (typeof p == "string")
        if (y) {
          var E = x(y.as, y.crossOrigin);
          u.d.m(p, {
            as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
            crossOrigin: E,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          });
        } else u.d.m(p);
    }),
    (Je.requestFormReset = function (p) {
      u.d.r(p);
    }),
    (Je.unstable_batchedUpdates = function (p, y) {
      return p(y);
    }),
    (Je.useFormState = function (p, y, E) {
      return m.H.useFormState(p, y, E);
    }),
    (Je.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (Je.version = "19.1.1"),
    Je
  );
}
var Ad;
function sy() {
  if (Ad) return Jr.exports;
  Ad = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (i) {
        console.error(i);
      }
  }
  return (s(), (Jr.exports = uy()), Jr.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rd;
function ry() {
  if (Rd) return Ya;
  Rd = 1;
  var s = iy(),
    i = dc(),
    c = sy();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function f(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function x(e) {
    if (d(e) !== e) throw Error(u(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var r = a.alternate;
      if (r === null) {
        if (((l = a.return), l !== null)) {
          n = l;
          continue;
        }
        break;
      }
      if (a.child === r.child) {
        for (r = a.child; r; ) {
          if (r === n) return (x(a), e);
          if (r === l) return (x(a), t);
          r = r.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== l.return) ((n = a), (l = r));
      else {
        for (var o = !1, h = a.child; h; ) {
          if (h === n) {
            ((o = !0), (n = a), (l = r));
            break;
          }
          if (h === l) {
            ((o = !0), (l = a), (n = r));
            break;
          }
          h = h.sibling;
        }
        if (!o) {
          for (h = r.child; h; ) {
            if (h === n) {
              ((o = !0), (n = r), (l = a));
              break;
            }
            if (h === l) {
              ((o = !0), (l = r), (n = a));
              break;
            }
            h = h.sibling;
          }
          if (!o) throw Error(u(189));
        }
      }
      if (n.alternate !== l) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
    return n.stateNode.current === n ? e : t;
  }
  function y(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = y(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var E = Object.assign,
    M = Symbol.for("react.element"),
    j = Symbol.for("react.transitional.element"),
    q = Symbol.for("react.portal"),
    H = Symbol.for("react.fragment"),
    X = Symbol.for("react.strict_mode"),
    L = Symbol.for("react.profiler"),
    G = Symbol.for("react.provider"),
    Y = Symbol.for("react.consumer"),
    $ = Symbol.for("react.context"),
    oe = Symbol.for("react.forward_ref"),
    F = Symbol.for("react.suspense"),
    Oe = Symbol.for("react.suspense_list"),
    be = Symbol.for("react.memo"),
    xe = Symbol.for("react.lazy"),
    te = Symbol.for("react.activity"),
    Fe = Symbol.for("react.memo_cache_sentinel"),
    Pe = Symbol.iterator;
  function qe(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Pe && e[Pe]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var Yt = Symbol.for("react.client.reference");
  function Vt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Yt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case H:
        return "Fragment";
      case L:
        return "Profiler";
      case X:
        return "StrictMode";
      case F:
        return "Suspense";
      case Oe:
        return "SuspenseList";
      case te:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case q:
          return "Portal";
        case $:
          return (e.displayName || "Context") + ".Provider";
        case Y:
          return (e._context.displayName || "Context") + ".Consumer";
        case oe:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case be:
          return (
            (t = e.displayName || null),
            t !== null ? t : Vt(e.type) || "Memo"
          );
        case xe:
          ((t = e._payload), (e = e._init));
          try {
            return Vt(e(t));
          } catch {}
      }
    return null;
  }
  var He = Array.isArray,
    A = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Z = { pending: !1, data: null, method: null, action: null },
    K = [],
    b = -1;
  function U(e) {
    return { current: e };
  }
  function Q(e) {
    0 > b || ((e.current = K[b]), (K[b] = null), b--);
  }
  function V(e, t) {
    (b++, (K[b] = e.current), (e.current = t));
  }
  var W = U(null),
    fe = U(null),
    ne = U(null),
    at = U(null);
  function _e(e, t) {
    switch ((V(ne, t), V(fe, e), V(W, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? kh(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = kh(t)), (e = Kh(t, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (Q(W), V(W, e));
  }
  function un() {
    (Q(W), Q(fe), Q(ne));
  }
  function Nu(e) {
    e.memoizedState !== null && V(at, e);
    var t = W.current,
      n = Kh(t, e.type);
    t !== n && (V(fe, e), V(W, n));
  }
  function Ja(e) {
    (fe.current === e && (Q(W), Q(fe)),
      at.current === e && (Q(at), (ja._currentValue = Z)));
  }
  var Ou = Object.prototype.hasOwnProperty,
    Cu = s.unstable_scheduleCallback,
    Mu = s.unstable_cancelCallback,
    zm = s.unstable_shouldYield,
    jm = s.unstable_requestPaint,
    Ot = s.unstable_now,
    Um = s.unstable_getCurrentPriorityLevel,
    Tc = s.unstable_ImmediatePriority,
    Ac = s.unstable_UserBlockingPriority,
    $a = s.unstable_NormalPriority,
    Bm = s.unstable_LowPriority,
    Rc = s.unstable_IdlePriority,
    qm = s.log,
    Hm = s.unstable_setDisableYieldValue,
    Gl = null,
    it = null;
  function sn(e) {
    if (
      (typeof qm == "function" && Hm(e),
      it && typeof it.setStrictMode == "function")
    )
      try {
        it.setStrictMode(Gl, e);
      } catch {}
  }
  var ut = Math.clz32 ? Math.clz32 : Vm,
    Lm = Math.log,
    Ym = Math.LN2;
  function Vm(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Lm(e) / Ym) | 0)) | 0);
  }
  var Fa = 256,
    Wa = 4194304;
  function zn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Pa(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var a = 0,
      r = e.suspendedLanes,
      o = e.pingedLanes;
    e = e.warmLanes;
    var h = l & 134217727;
    return (
      h !== 0
        ? ((l = h & ~r),
          l !== 0
            ? (a = zn(l))
            : ((o &= h),
              o !== 0
                ? (a = zn(o))
                : n || ((n = h & ~e), n !== 0 && (a = zn(n)))))
        : ((h = l & ~r),
          h !== 0
            ? (a = zn(h))
            : o !== 0
              ? (a = zn(o))
              : n || ((n = l & ~e), n !== 0 && (a = zn(n)))),
      a === 0
        ? 0
        : t !== 0 &&
            t !== a &&
            (t & r) === 0 &&
            ((r = a & -a),
            (n = t & -t),
            r >= n || (r === 32 && (n & 4194048) !== 0))
          ? t
          : a
    );
  }
  function Xl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Gm(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc() {
    var e = Fa;
    return ((Fa <<= 1), (Fa & 4194048) === 0 && (Fa = 256), e);
  }
  function Nc() {
    var e = Wa;
    return ((Wa <<= 1), (Wa & 62914560) === 0 && (Wa = 4194304), e);
  }
  function Du(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Ql(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Xm(e, t, n, l, a, r) {
    var o = e.pendingLanes;
    ((e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0));
    var h = e.entanglements,
      g = e.expirationTimes,
      R = e.hiddenUpdates;
    for (n = o & ~n; 0 < n; ) {
      var C = 31 - ut(n),
        z = 1 << C;
      ((h[C] = 0), (g[C] = -1));
      var N = R[C];
      if (N !== null)
        for (R[C] = null, C = 0; C < N.length; C++) {
          var O = N[C];
          O !== null && (O.lane &= -536870913);
        }
      n &= ~z;
    }
    (l !== 0 && Oc(e, l, 0),
      r !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(o & ~t)));
  }
  function Oc(e, t, n) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var l = 31 - ut(t);
    ((e.entangledLanes |= t),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (n & 4194090)));
  }
  function Cc(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var l = 31 - ut(n),
        a = 1 << l;
      ((a & t) | (e[l] & t) && (e[l] |= t), (n &= ~a));
    }
  }
  function zu(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function ju(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Mc() {
    var e = B.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : hd(e.type));
  }
  function Qm(e, t) {
    var n = B.p;
    try {
      return ((B.p = e), t());
    } finally {
      B.p = n;
    }
  }
  var rn = Math.random().toString(36).slice(2),
    ke = "__reactFiber$" + rn,
    Ie = "__reactProps$" + rn,
    In = "__reactContainer$" + rn,
    Uu = "__reactEvents$" + rn,
    Zm = "__reactListeners$" + rn,
    km = "__reactHandles$" + rn,
    Dc = "__reactResources$" + rn,
    Zl = "__reactMarker$" + rn;
  function Bu(e) {
    (delete e[ke], delete e[Ie], delete e[Uu], delete e[Zm], delete e[km]);
  }
  function el(e) {
    var t = e[ke];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[In] || n[ke])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = Wh(e); e !== null; ) {
            if ((n = e[ke])) return n;
            e = Wh(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function tl(e) {
    if ((e = e[ke] || e[In])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function kl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function nl(e) {
    var t = e[Dc];
    return (
      t ||
        (t = e[Dc] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Le(e) {
    e[Zl] = !0;
  }
  var zc = new Set(),
    jc = {};
  function jn(e, t) {
    (ll(e, t), ll(e + "Capture", t));
  }
  function ll(e, t) {
    for (jc[e] = t, e = 0; e < t.length; e++) zc.add(t[e]);
  }
  var Km = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Uc = {},
    Bc = {};
  function Jm(e) {
    return Ou.call(Bc, e)
      ? !0
      : Ou.call(Uc, e)
        ? !1
        : Km.test(e)
          ? (Bc[e] = !0)
          : ((Uc[e] = !0), !1);
  }
  function Ia(e, t, n) {
    if (Jm(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function ei(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function Gt(e, t, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + l);
    }
  }
  var qu, qc;
  function al(e) {
    if (qu === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ((qu = (t && t[1]) || ""),
          (qc =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      qu +
      e +
      qc
    );
  }
  var Hu = !1;
  function Lu(e, t) {
    if (!e || Hu) return "";
    Hu = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var z = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(z.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(z, []);
                } catch (O) {
                  var N = O;
                }
                Reflect.construct(e, [], z);
              } else {
                try {
                  z.call();
                } catch (O) {
                  N = O;
                }
                e.call(z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (O) {
                N = O;
              }
              (z = e()) &&
                typeof z.catch == "function" &&
                z.catch(function () {});
            }
          } catch (O) {
            if (O && N && typeof O.stack == "string") return [O.stack, N.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      a &&
        a.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var r = l.DetermineComponentFrameRoot(),
        o = r[0],
        h = r[1];
      if (o && h) {
        var g = o.split(`
`),
          R = h.split(`
`);
        for (
          a = l = 0;
          l < g.length && !g[l].includes("DetermineComponentFrameRoot");

        )
          l++;
        for (; a < R.length && !R[a].includes("DetermineComponentFrameRoot"); )
          a++;
        if (l === g.length || a === R.length)
          for (
            l = g.length - 1, a = R.length - 1;
            1 <= l && 0 <= a && g[l] !== R[a];

          )
            a--;
        for (; 1 <= l && 0 <= a; l--, a--)
          if (g[l] !== R[a]) {
            if (l !== 1 || a !== 1)
              do
                if ((l--, a--, 0 > a || g[l] !== R[a])) {
                  var C =
                    `
` + g[l].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      C.includes("<anonymous>") &&
                      (C = C.replace("<anonymous>", e.displayName)),
                    C
                  );
                }
              while (1 <= l && 0 <= a);
            break;
          }
      }
    } finally {
      ((Hu = !1), (Error.prepareStackTrace = n));
    }
    return (n = e ? e.displayName || e.name : "") ? al(n) : "";
  }
  function $m(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return al(e.type);
      case 16:
        return al("Lazy");
      case 13:
        return al("Suspense");
      case 19:
        return al("SuspenseList");
      case 0:
      case 15:
        return Lu(e.type, !1);
      case 11:
        return Lu(e.type.render, !1);
      case 1:
        return Lu(e.type, !0);
      case 31:
        return al("Activity");
      default:
        return "";
    }
  }
  function Hc(e) {
    try {
      var t = "";
      do ((t += $m(e)), (e = e.return));
      while (e);
      return t;
    } catch (n) {
      return (
        `
Error generating stack: ` +
        n.message +
        `
` +
        n.stack
      );
    }
  }
  function pt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Lc(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Fm(e) {
    var t = Lc(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      l = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var a = n.get,
        r = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return a.call(this);
          },
          set: function (o) {
            ((l = "" + o), r.call(this, o));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (o) {
            l = "" + o;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function ti(e) {
    e._valueTracker || (e._valueTracker = Fm(e));
  }
  function Yc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      l = "";
    return (
      e && (l = Lc(e) ? (e.checked ? "true" : "false") : e.value),
      (e = l),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function ni(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Wm = /[\n"\\]/g;
  function yt(e) {
    return e.replace(Wm, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Yu(e, t, n, l, a, r, o, h) {
    ((e.name = ""),
      o != null &&
      typeof o != "function" &&
      typeof o != "symbol" &&
      typeof o != "boolean"
        ? (e.type = o)
        : e.removeAttribute("type"),
      t != null
        ? o === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + pt(t))
          : e.value !== "" + pt(t) && (e.value = "" + pt(t))
        : (o !== "submit" && o !== "reset") || e.removeAttribute("value"),
      t != null
        ? Vu(e, o, pt(t))
        : n != null
          ? Vu(e, o, pt(n))
          : l != null && e.removeAttribute("value"),
      a == null && r != null && (e.defaultChecked = !!r),
      a != null &&
        (e.checked = a && typeof a != "function" && typeof a != "symbol"),
      h != null &&
      typeof h != "function" &&
      typeof h != "symbol" &&
      typeof h != "boolean"
        ? (e.name = "" + pt(h))
        : e.removeAttribute("name"));
  }
  function Vc(e, t, n, l, a, r, o, h) {
    if (
      (r != null &&
        typeof r != "function" &&
        typeof r != "symbol" &&
        typeof r != "boolean" &&
        (e.type = r),
      t != null || n != null)
    ) {
      if (!((r !== "submit" && r !== "reset") || t != null)) return;
      ((n = n != null ? "" + pt(n) : ""),
        (t = t != null ? "" + pt(t) : n),
        h || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((l = l ?? a),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (e.checked = h ? e.checked : !!l),
      (e.defaultChecked = !!l),
      o != null &&
        typeof o != "function" &&
        typeof o != "symbol" &&
        typeof o != "boolean" &&
        (e.name = o));
  }
  function Vu(e, t, n) {
    (t === "number" && ni(e.ownerDocument) === e) ||
      e.defaultValue === "" + n ||
      (e.defaultValue = "" + n);
  }
  function il(e, t, n, l) {
    if (((e = e.options), t)) {
      t = {};
      for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++)
        ((a = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== a && (e[n].selected = a),
          a && l && (e[n].defaultSelected = !0));
    } else {
      for (n = "" + pt(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          ((e[a].selected = !0), l && (e[a].defaultSelected = !0));
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Gc(e, t, n) {
    if (
      t != null &&
      ((t = "" + pt(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + pt(n) : "";
  }
  function Xc(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(u(92));
        if (He(l)) {
          if (1 < l.length) throw Error(u(93));
          l = l[0];
        }
        n = l;
      }
      (n == null && (n = ""), (t = n));
    }
    ((n = pt(t)),
      (e.defaultValue = n),
      (l = e.textContent),
      l === n && l !== "" && l !== null && (e.value = l));
  }
  function ul(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Pm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Qc(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? l
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : l
        ? e.setProperty(t, n)
        : typeof n != "number" || n === 0 || Pm.has(t)
          ? t === "float"
            ? (e.cssFloat = n)
            : (e[t] = ("" + n).trim())
          : (e[t] = n + "px");
  }
  function Zc(e, t, n) {
    if (t != null && typeof t != "object") throw Error(u(62));
    if (((e = e.style), n != null)) {
      for (var l in n)
        !n.hasOwnProperty(l) ||
          (t != null && t.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? e.setProperty(l, "")
            : l === "float"
              ? (e.cssFloat = "")
              : (e[l] = ""));
      for (var a in t)
        ((l = t[a]), t.hasOwnProperty(a) && n[a] !== l && Qc(e, a, l));
    } else for (var r in t) t.hasOwnProperty(r) && Qc(e, r, t[r]);
  }
  function Gu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Im = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    ep =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function li(e) {
    return ep.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var Xu = null;
  function Qu(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var sl = null,
    rl = null;
  function kc(e) {
    var t = tl(e);
    if (t && (e = t.stateNode)) {
      var n = e[Ie] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Yu(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ),
            (t = n.name),
            n.type === "radio" && t != null)
          ) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + yt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var a = l[Ie] || null;
                if (!a) throw Error(u(90));
                Yu(
                  l,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              ((l = n[t]), l.form === e.form && Yc(l));
          }
          break e;
        case "textarea":
          Gc(e, n.value, n.defaultValue);
          break e;
        case "select":
          ((t = n.value), t != null && il(e, !!n.multiple, t, !1));
      }
    }
  }
  var Zu = !1;
  function Kc(e, t, n) {
    if (Zu) return e(t, n);
    Zu = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (
        ((Zu = !1),
        (sl !== null || rl !== null) &&
          (Gi(), sl && ((t = sl), (e = rl), (rl = sl = null), kc(t), e)))
      )
        for (t = 0; t < e.length; t++) kc(e[t]);
    }
  }
  function Kl(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[Ie] || null;
    if (l === null) return null;
    n = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((l = !l.disabled) ||
          ((e = e.type),
          (l = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !l));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(u(231, t, typeof n));
    return n;
  }
  var Xt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    ku = !1;
  if (Xt)
    try {
      var Jl = {};
      (Object.defineProperty(Jl, "passive", {
        get: function () {
          ku = !0;
        },
      }),
        window.addEventListener("test", Jl, Jl),
        window.removeEventListener("test", Jl, Jl));
    } catch {
      ku = !1;
    }
  var cn = null,
    Ku = null,
    ai = null;
  function Jc() {
    if (ai) return ai;
    var e,
      t = Ku,
      n = t.length,
      l,
      a = "value" in cn ? cn.value : cn.textContent,
      r = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++);
    var o = n - e;
    for (l = 1; l <= o && t[n - l] === a[r - l]; l++);
    return (ai = a.slice(e, 1 < l ? 1 - l : void 0));
  }
  function ii(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ui() {
    return !0;
  }
  function $c() {
    return !1;
  }
  function et(e) {
    function t(n, l, a, r, o) {
      ((this._reactName = n),
        (this._targetInst = a),
        (this.type = l),
        (this.nativeEvent = r),
        (this.target = o),
        (this.currentTarget = null));
      for (var h in e)
        e.hasOwnProperty(h) && ((n = e[h]), (this[h] = n ? n(r) : r[h]));
      return (
        (this.isDefaultPrevented = (
          r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1
        )
          ? ui
          : $c),
        (this.isPropagationStopped = $c),
        this
      );
    }
    return (
      E(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = ui));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = ui));
        },
        persist: function () {},
        isPersistent: ui,
      }),
      t
    );
  }
  var Un = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    si = et(Un),
    $l = E({}, Un, { view: 0, detail: 0 }),
    tp = et($l),
    Ju,
    $u,
    Fl,
    ri = E({}, $l, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Wu,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Fl &&
              (Fl && e.type === "mousemove"
                ? ((Ju = e.screenX - Fl.screenX), ($u = e.screenY - Fl.screenY))
                : ($u = Ju = 0),
              (Fl = e)),
            Ju);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : $u;
      },
    }),
    Fc = et(ri),
    np = E({}, ri, { dataTransfer: 0 }),
    lp = et(np),
    ap = E({}, $l, { relatedTarget: 0 }),
    Fu = et(ap),
    ip = E({}, Un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    up = et(ip),
    sp = E({}, Un, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    rp = et(sp),
    cp = E({}, Un, { data: 0 }),
    Wc = et(cp),
    op = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    fp = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    hp = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function dp(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = hp[e])
        ? !!t[e]
        : !1;
  }
  function Wu() {
    return dp;
  }
  var mp = E({}, $l, {
      key: function (e) {
        if (e.key) {
          var t = op[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = ii(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? fp[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Wu,
      charCode: function (e) {
        return e.type === "keypress" ? ii(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? ii(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    pp = et(mp),
    yp = E({}, ri, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Pc = et(yp),
    gp = E({}, $l, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Wu,
    }),
    vp = et(gp),
    bp = E({}, Un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Sp = et(bp),
    xp = E({}, ri, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Ep = et(xp),
    _p = E({}, Un, { newState: 0, oldState: 0 }),
    Tp = et(_p),
    Ap = [9, 13, 27, 32],
    Pu = Xt && "CompositionEvent" in window,
    Wl = null;
  Xt && "documentMode" in document && (Wl = document.documentMode);
  var Rp = Xt && "TextEvent" in window && !Wl,
    Ic = Xt && (!Pu || (Wl && 8 < Wl && 11 >= Wl)),
    eo = " ",
    to = !1;
  function no(e, t) {
    switch (e) {
      case "keyup":
        return Ap.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function lo(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var cl = !1;
  function wp(e, t) {
    switch (e) {
      case "compositionend":
        return lo(t);
      case "keypress":
        return t.which !== 32 ? null : ((to = !0), eo);
      case "textInput":
        return ((e = t.data), e === eo && to ? null : e);
      default:
        return null;
    }
  }
  function Np(e, t) {
    if (cl)
      return e === "compositionend" || (!Pu && no(e, t))
        ? ((e = Jc()), (ai = Ku = cn = null), (cl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Ic && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Op = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function ao(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Op[e.type] : t === "textarea";
  }
  function io(e, t, n, l) {
    (sl ? (rl ? rl.push(l) : (rl = [l])) : (sl = l),
      (t = Ji(t, "onChange")),
      0 < t.length &&
        ((n = new si("onChange", "change", null, n, l)),
        e.push({ event: n, listeners: t })));
  }
  var Pl = null,
    Il = null;
  function Cp(e) {
    Vh(e, 0);
  }
  function ci(e) {
    var t = kl(e);
    if (Yc(t)) return e;
  }
  function uo(e, t) {
    if (e === "change") return t;
  }
  var so = !1;
  if (Xt) {
    var Iu;
    if (Xt) {
      var es = "oninput" in document;
      if (!es) {
        var ro = document.createElement("div");
        (ro.setAttribute("oninput", "return;"),
          (es = typeof ro.oninput == "function"));
      }
      Iu = es;
    } else Iu = !1;
    so = Iu && (!document.documentMode || 9 < document.documentMode);
  }
  function co() {
    Pl && (Pl.detachEvent("onpropertychange", oo), (Il = Pl = null));
  }
  function oo(e) {
    if (e.propertyName === "value" && ci(Il)) {
      var t = [];
      (io(t, Il, e, Qu(e)), Kc(Cp, t));
    }
  }
  function Mp(e, t, n) {
    e === "focusin"
      ? (co(), (Pl = t), (Il = n), Pl.attachEvent("onpropertychange", oo))
      : e === "focusout" && co();
  }
  function Dp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ci(Il);
  }
  function zp(e, t) {
    if (e === "click") return ci(t);
  }
  function jp(e, t) {
    if (e === "input" || e === "change") return ci(t);
  }
  function Up(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var st = typeof Object.is == "function" ? Object.is : Up;
  function ea(e, t) {
    if (st(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var a = n[l];
      if (!Ou.call(t, a) || !st(e[a], t[a])) return !1;
    }
    return !0;
  }
  function fo(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function ho(e, t) {
    var n = fo(e);
    e = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (((l = e + n.textContent.length), e <= t && l >= t))
          return { node: n, offset: t - e };
        e = l;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = fo(n);
    }
  }
  function mo(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? mo(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function po(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = ni(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = ni(e.document);
    }
    return t;
  }
  function ts(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var Bp = Xt && "documentMode" in document && 11 >= document.documentMode,
    ol = null,
    ns = null,
    ta = null,
    ls = !1;
  function yo(e, t, n) {
    var l =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    ls ||
      ol == null ||
      ol !== ni(l) ||
      ((l = ol),
      "selectionStart" in l && ts(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (ta && ea(ta, l)) ||
        ((ta = l),
        (l = Ji(ns, "onSelect")),
        0 < l.length &&
          ((t = new si("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: l }),
          (t.target = ol))));
  }
  function Bn(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var fl = {
      animationend: Bn("Animation", "AnimationEnd"),
      animationiteration: Bn("Animation", "AnimationIteration"),
      animationstart: Bn("Animation", "AnimationStart"),
      transitionrun: Bn("Transition", "TransitionRun"),
      transitionstart: Bn("Transition", "TransitionStart"),
      transitioncancel: Bn("Transition", "TransitionCancel"),
      transitionend: Bn("Transition", "TransitionEnd"),
    },
    as = {},
    go = {};
  Xt &&
    ((go = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete fl.animationend.animation,
      delete fl.animationiteration.animation,
      delete fl.animationstart.animation),
    "TransitionEvent" in window || delete fl.transitionend.transition);
  function qn(e) {
    if (as[e]) return as[e];
    if (!fl[e]) return e;
    var t = fl[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in go) return (as[e] = t[n]);
    return e;
  }
  var vo = qn("animationend"),
    bo = qn("animationiteration"),
    So = qn("animationstart"),
    qp = qn("transitionrun"),
    Hp = qn("transitionstart"),
    Lp = qn("transitioncancel"),
    xo = qn("transitionend"),
    Eo = new Map(),
    is =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  is.push("scrollEnd");
  function At(e, t) {
    (Eo.set(e, t), jn(t, [e]));
  }
  var _o = new WeakMap();
  function gt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = _o.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: Hc(t) }), _o.set(e, t), t);
    }
    return { value: e, source: t, stack: Hc(t) };
  }
  var vt = [],
    hl = 0,
    us = 0;
  function oi() {
    for (var e = hl, t = (us = hl = 0); t < e; ) {
      var n = vt[t];
      vt[t++] = null;
      var l = vt[t];
      vt[t++] = null;
      var a = vt[t];
      vt[t++] = null;
      var r = vt[t];
      if (((vt[t++] = null), l !== null && a !== null)) {
        var o = l.pending;
        (o === null ? (a.next = a) : ((a.next = o.next), (o.next = a)),
          (l.pending = a));
      }
      r !== 0 && To(n, a, r);
    }
  }
  function fi(e, t, n, l) {
    ((vt[hl++] = e),
      (vt[hl++] = t),
      (vt[hl++] = n),
      (vt[hl++] = l),
      (us |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l));
  }
  function ss(e, t, n, l) {
    return (fi(e, t, n, l), hi(e));
  }
  function dl(e, t) {
    return (fi(e, null, null, t), hi(e));
  }
  function To(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var a = !1, r = e.return; r !== null; )
      ((r.childLanes |= n),
        (l = r.alternate),
        l !== null && (l.childLanes |= n),
        r.tag === 22 &&
          ((e = r.stateNode), e === null || e._visibility & 1 || (a = !0)),
        (e = r),
        (r = r.return));
    return e.tag === 3
      ? ((r = e.stateNode),
        a &&
          t !== null &&
          ((a = 31 - ut(n)),
          (e = r.hiddenUpdates),
          (l = e[a]),
          l === null ? (e[a] = [t]) : l.push(t),
          (t.lane = n | 536870912)),
        r)
      : null;
  }
  function hi(e) {
    if (50 < Ra) throw ((Ra = 0), (dr = null), Error(u(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var ml = {};
  function Yp(e, t, n, l) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function rt(e, t, n, l) {
    return new Yp(e, t, n, l);
  }
  function rs(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Qt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = rt(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 65011712),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      (n.refCleanup = e.refCleanup),
      n
    );
  }
  function Ao(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return (
      n === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = n.childLanes),
          (e.lanes = n.lanes),
          (e.child = n.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = n.memoizedProps),
          (e.memoizedState = n.memoizedState),
          (e.updateQueue = n.updateQueue),
          (e.type = n.type),
          (t = n.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function di(e, t, n, l, a, r) {
    var o = 0;
    if (((l = e), typeof e == "function")) rs(e) && (o = 1);
    else if (typeof e == "string")
      o = G0(e, n, W.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case te:
          return (
            (e = rt(31, n, t, a)),
            (e.elementType = te),
            (e.lanes = r),
            e
          );
        case H:
          return Hn(n.children, a, r, t);
        case X:
          ((o = 8), (a |= 24));
          break;
        case L:
          return (
            (e = rt(12, n, t, a | 2)),
            (e.elementType = L),
            (e.lanes = r),
            e
          );
        case F:
          return ((e = rt(13, n, t, a)), (e.elementType = F), (e.lanes = r), e);
        case Oe:
          return (
            (e = rt(19, n, t, a)),
            (e.elementType = Oe),
            (e.lanes = r),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case G:
              case $:
                o = 10;
                break e;
              case Y:
                o = 9;
                break e;
              case oe:
                o = 11;
                break e;
              case be:
                o = 14;
                break e;
              case xe:
                ((o = 16), (l = null));
                break e;
            }
          ((o = 29),
            (n = Error(u(130, e === null ? "null" : typeof e, ""))),
            (l = null));
      }
    return (
      (t = rt(o, n, t, a)),
      (t.elementType = e),
      (t.type = l),
      (t.lanes = r),
      t
    );
  }
  function Hn(e, t, n, l) {
    return ((e = rt(7, e, l, t)), (e.lanes = n), e);
  }
  function cs(e, t, n) {
    return ((e = rt(6, e, null, t)), (e.lanes = n), e);
  }
  function os(e, t, n) {
    return (
      (t = rt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var pl = [],
    yl = 0,
    mi = null,
    pi = 0,
    bt = [],
    St = 0,
    Ln = null,
    Zt = 1,
    kt = "";
  function Yn(e, t) {
    ((pl[yl++] = pi), (pl[yl++] = mi), (mi = e), (pi = t));
  }
  function Ro(e, t, n) {
    ((bt[St++] = Zt), (bt[St++] = kt), (bt[St++] = Ln), (Ln = e));
    var l = Zt;
    e = kt;
    var a = 32 - ut(l) - 1;
    ((l &= ~(1 << a)), (n += 1));
    var r = 32 - ut(t) + a;
    if (30 < r) {
      var o = a - (a % 5);
      ((r = (l & ((1 << o) - 1)).toString(32)),
        (l >>= o),
        (a -= o),
        (Zt = (1 << (32 - ut(t) + a)) | (n << a) | l),
        (kt = r + e));
    } else ((Zt = (1 << r) | (n << a) | l), (kt = e));
  }
  function fs(e) {
    e.return !== null && (Yn(e, 1), Ro(e, 1, 0));
  }
  function hs(e) {
    for (; e === mi; )
      ((mi = pl[--yl]), (pl[yl] = null), (pi = pl[--yl]), (pl[yl] = null));
    for (; e === Ln; )
      ((Ln = bt[--St]),
        (bt[St] = null),
        (kt = bt[--St]),
        (bt[St] = null),
        (Zt = bt[--St]),
        (bt[St] = null));
  }
  var We = null,
    we = null,
    de = !1,
    Vn = null,
    Ct = !1,
    ds = Error(u(519));
  function Gn(e) {
    var t = Error(u(418, ""));
    throw (aa(gt(t, e)), ds);
  }
  function wo(e) {
    var t = e.stateNode,
      n = e.type,
      l = e.memoizedProps;
    switch (((t[ke] = e), (t[Ie] = l), n)) {
      case "dialog":
        (se("cancel", t), se("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        se("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Na.length; n++) se(Na[n], t);
        break;
      case "source":
        se("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (se("error", t), se("load", t));
        break;
      case "details":
        se("toggle", t);
        break;
      case "input":
        (se("invalid", t),
          Vc(
            t,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0
          ),
          ti(t));
        break;
      case "select":
        se("invalid", t);
        break;
      case "textarea":
        (se("invalid", t), Xc(t, l.value, l.defaultValue, l.children), ti(t));
    }
    ((n = l.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      l.suppressHydrationWarning === !0 ||
      Zh(t.textContent, n)
        ? (l.popover != null && (se("beforetoggle", t), se("toggle", t)),
          l.onScroll != null && se("scroll", t),
          l.onScrollEnd != null && se("scrollend", t),
          l.onClick != null && (t.onclick = $i),
          (t = !0))
        : (t = !1),
      t || Gn(e));
  }
  function No(e) {
    for (We = e.return; We; )
      switch (We.tag) {
        case 5:
        case 13:
          Ct = !1;
          return;
        case 27:
        case 3:
          Ct = !0;
          return;
        default:
          We = We.return;
      }
  }
  function na(e) {
    if (e !== We) return !1;
    if (!de) return (No(e), (de = !0), !1);
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || Or(e.type, e.memoizedProps))),
        (n = !n)),
      n && we && Gn(e),
      No(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((n = e.data), n === "/$")) {
              if (t === 0) {
                we = wt(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          e = e.nextSibling;
        }
        we = null;
      }
    } else
      t === 27
        ? ((t = we), An(e.type) ? ((e = zr), (zr = null), (we = e)) : (we = t))
        : (we = We ? wt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function la() {
    ((we = We = null), (de = !1));
  }
  function Oo() {
    var e = Vn;
    return (
      e !== null &&
        (lt === null ? (lt = e) : lt.push.apply(lt, e), (Vn = null)),
      e
    );
  }
  function aa(e) {
    Vn === null ? (Vn = [e]) : Vn.push(e);
  }
  var ms = U(null),
    Xn = null,
    Kt = null;
  function on(e, t, n) {
    (V(ms, t._currentValue), (t._currentValue = n));
  }
  function Jt(e) {
    ((e._currentValue = ms.current), Q(ms));
  }
  function ps(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), l !== null && (l.childLanes |= t))
          : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function ys(e, t, n, l) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = a.dependencies;
      if (r !== null) {
        var o = a.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var h = r;
          r = a;
          for (var g = 0; g < t.length; g++)
            if (h.context === t[g]) {
              ((r.lanes |= n),
                (h = r.alternate),
                h !== null && (h.lanes |= n),
                ps(r.return, n, e),
                l || (o = null));
              break e;
            }
          r = h.next;
        }
      } else if (a.tag === 18) {
        if (((o = a.return), o === null)) throw Error(u(341));
        ((o.lanes |= n),
          (r = o.alternate),
          r !== null && (r.lanes |= n),
          ps(o, n, e),
          (o = null));
      } else o = a.child;
      if (o !== null) o.return = a;
      else
        for (o = a; o !== null; ) {
          if (o === e) {
            o = null;
            break;
          }
          if (((a = o.sibling), a !== null)) {
            ((a.return = o.return), (o = a));
            break;
          }
          o = o.return;
        }
      a = o;
    }
  }
  function ia(e, t, n, l) {
    e = null;
    for (var a = t, r = !1; a !== null; ) {
      if (!r) {
        if ((a.flags & 524288) !== 0) r = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var o = a.alternate;
        if (o === null) throw Error(u(387));
        if (((o = o.memoizedProps), o !== null)) {
          var h = a.type;
          st(a.pendingProps.value, o.value) ||
            (e !== null ? e.push(h) : (e = [h]));
        }
      } else if (a === at.current) {
        if (((o = a.alternate), o === null)) throw Error(u(387));
        o.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
          (e !== null ? e.push(ja) : (e = [ja]));
      }
      a = a.return;
    }
    (e !== null && ys(t, e, n, l), (t.flags |= 262144));
  }
  function yi(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!st(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Qn(e) {
    ((Xn = e),
      (Kt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function Ke(e) {
    return Co(Xn, e);
  }
  function gi(e, t) {
    return (Xn === null && Qn(e), Co(e, t));
  }
  function Co(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), Kt === null)) {
      if (e === null) throw Error(u(308));
      ((Kt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else Kt = Kt.next = t;
    return n;
  }
  var Vp =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (n, l) {
                  e.push(l);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (n) {
                  return n();
                }));
            };
          },
    Gp = s.unstable_scheduleCallback,
    Xp = s.unstable_NormalPriority,
    Ue = {
      $$typeof: $,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function gs() {
    return { controller: new Vp(), data: new Map(), refCount: 0 };
  }
  function ua(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Gp(Xp, function () {
          e.controller.abort();
        }));
  }
  var sa = null,
    vs = 0,
    gl = 0,
    vl = null;
  function Qp(e, t) {
    if (sa === null) {
      var n = (sa = []);
      ((vs = 0),
        (gl = Sr()),
        (vl = {
          status: "pending",
          value: void 0,
          then: function (l) {
            n.push(l);
          },
        }));
    }
    return (vs++, t.then(Mo, Mo), t);
  }
  function Mo() {
    if (--vs === 0 && sa !== null) {
      vl !== null && (vl.status = "fulfilled");
      var e = sa;
      ((sa = null), (gl = 0), (vl = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Zp(e, t) {
    var n = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (a) {
          n.push(a);
        },
      };
    return (
      e.then(
        function () {
          ((l.status = "fulfilled"), (l.value = t));
          for (var a = 0; a < n.length; a++) (0, n[a])(t);
        },
        function (a) {
          for (l.status = "rejected", l.reason = a, a = 0; a < n.length; a++)
            (0, n[a])(void 0);
        }
      ),
      l
    );
  }
  var Do = A.S;
  A.S = function (e, t) {
    (typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      Qp(e, t),
      Do !== null && Do(e, t));
  };
  var Zn = U(null);
  function bs() {
    var e = Zn.current;
    return e !== null ? e : Ee.pooledCache;
  }
  function vi(e, t) {
    t === null ? V(Zn, Zn.current) : V(Zn, t.pool);
  }
  function zo() {
    var e = bs();
    return e === null ? null : { parent: Ue._currentValue, pool: e };
  }
  var ra = Error(u(460)),
    jo = Error(u(474)),
    bi = Error(u(542)),
    Ss = { then: function () {} };
  function Uo(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Si() {}
  function Bo(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(Si, Si), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), Ho(e), e);
      default:
        if (typeof t.status == "string") t.then(Si, Si);
        else {
          if (((e = Ee), e !== null && 100 < e.shellSuspendCounter))
            throw Error(u(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (l) {
                if (t.status === "pending") {
                  var a = t;
                  ((a.status = "fulfilled"), (a.value = l));
                }
              },
              function (l) {
                if (t.status === "pending") {
                  var a = t;
                  ((a.status = "rejected"), (a.reason = l));
                }
              }
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), Ho(e), e);
        }
        throw ((ca = t), ra);
    }
  }
  var ca = null;
  function qo() {
    if (ca === null) throw Error(u(459));
    var e = ca;
    return ((ca = null), e);
  }
  function Ho(e) {
    if (e === ra || e === bi) throw Error(u(483));
  }
  var fn = !1;
  function xs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Es(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function hn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function dn(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (me & 2) !== 0)) {
      var a = l.pending;
      return (
        a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
        (l.pending = t),
        (t = hi(e)),
        To(e, null, n),
        t
      );
    }
    return (fi(e, l, t, n), hi(e));
  }
  function oa(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
    ) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (n |= l), (t.lanes = n), Cc(e, n));
    }
  }
  function _s(e, t) {
    var n = e.updateQueue,
      l = e.alternate;
    if (l !== null && ((l = l.updateQueue), n === l)) {
      var a = null,
        r = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var o = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          (r === null ? (a = r = o) : (r = r.next = o), (n = n.next));
        } while (n !== null);
        r === null ? (a = r = t) : (r = r.next = t);
      } else a = r = t;
      ((n = {
        baseState: l.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: r,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  var Ts = !1;
  function fa() {
    if (Ts) {
      var e = vl;
      if (e !== null) throw e;
    }
  }
  function ha(e, t, n, l) {
    Ts = !1;
    var a = e.updateQueue;
    fn = !1;
    var r = a.firstBaseUpdate,
      o = a.lastBaseUpdate,
      h = a.shared.pending;
    if (h !== null) {
      a.shared.pending = null;
      var g = h,
        R = g.next;
      ((g.next = null), o === null ? (r = R) : (o.next = R), (o = g));
      var C = e.alternate;
      C !== null &&
        ((C = C.updateQueue),
        (h = C.lastBaseUpdate),
        h !== o &&
          (h === null ? (C.firstBaseUpdate = R) : (h.next = R),
          (C.lastBaseUpdate = g)));
    }
    if (r !== null) {
      var z = a.baseState;
      ((o = 0), (C = R = g = null), (h = r));
      do {
        var N = h.lane & -536870913,
          O = N !== h.lane;
        if (O ? (ce & N) === N : (l & N) === N) {
          (N !== 0 && N === gl && (Ts = !0),
            C !== null &&
              (C = C.next =
                {
                  lane: 0,
                  tag: h.tag,
                  payload: h.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var ee = e,
              P = h;
            N = t;
            var ve = n;
            switch (P.tag) {
              case 1:
                if (((ee = P.payload), typeof ee == "function")) {
                  z = ee.call(ve, z, N);
                  break e;
                }
                z = ee;
                break e;
              case 3:
                ee.flags = (ee.flags & -65537) | 128;
              case 0:
                if (
                  ((ee = P.payload),
                  (N = typeof ee == "function" ? ee.call(ve, z, N) : ee),
                  N == null)
                )
                  break e;
                z = E({}, z, N);
                break e;
              case 2:
                fn = !0;
            }
          }
          ((N = h.callback),
            N !== null &&
              ((e.flags |= 64),
              O && (e.flags |= 8192),
              (O = a.callbacks),
              O === null ? (a.callbacks = [N]) : O.push(N)));
        } else
          ((O = {
            lane: N,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null,
          }),
            C === null ? ((R = C = O), (g = z)) : (C = C.next = O),
            (o |= N));
        if (((h = h.next), h === null)) {
          if (((h = a.shared.pending), h === null)) break;
          ((O = h),
            (h = O.next),
            (O.next = null),
            (a.lastBaseUpdate = O),
            (a.shared.pending = null));
        }
      } while (!0);
      (C === null && (g = z),
        (a.baseState = g),
        (a.firstBaseUpdate = R),
        (a.lastBaseUpdate = C),
        r === null && (a.shared.lanes = 0),
        (xn |= o),
        (e.lanes = o),
        (e.memoizedState = z));
    }
  }
  function Lo(e, t) {
    if (typeof e != "function") throw Error(u(191, e));
    e.call(t);
  }
  function Yo(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) Lo(n[e], t);
  }
  var bl = U(null),
    xi = U(0);
  function Vo(e, t) {
    ((e = tn), V(xi, e), V(bl, t), (tn = e | t.baseLanes));
  }
  function As() {
    (V(xi, tn), V(bl, bl.current));
  }
  function Rs() {
    ((tn = xi.current), Q(bl), Q(xi));
  }
  var mn = 0,
    ae = null,
    ye = null,
    De = null,
    Ei = !1,
    Sl = !1,
    kn = !1,
    _i = 0,
    da = 0,
    xl = null,
    kp = 0;
  function Ce() {
    throw Error(u(321));
  }
  function ws(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!st(e[n], t[n])) return !1;
    return !0;
  }
  function Ns(e, t, n, l, a, r) {
    return (
      (mn = r),
      (ae = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (A.H = e === null || e.memoizedState === null ? Af : Rf),
      (kn = !1),
      (r = n(l, a)),
      (kn = !1),
      Sl && (r = Xo(t, n, l, a)),
      Go(e),
      r
    );
  }
  function Go(e) {
    A.H = Oi;
    var t = ye !== null && ye.next !== null;
    if (((mn = 0), (De = ye = ae = null), (Ei = !1), (da = 0), (xl = null), t))
      throw Error(u(300));
    e === null ||
      Ye ||
      ((e = e.dependencies), e !== null && yi(e) && (Ye = !0));
  }
  function Xo(e, t, n, l) {
    ae = e;
    var a = 0;
    do {
      if ((Sl && (xl = null), (da = 0), (Sl = !1), 25 <= a))
        throw Error(u(301));
      if (((a += 1), (De = ye = null), e.updateQueue != null)) {
        var r = e.updateQueue;
        ((r.lastEffect = null),
          (r.events = null),
          (r.stores = null),
          r.memoCache != null && (r.memoCache.index = 0));
      }
      ((A.H = Ip), (r = t(n, l)));
    } while (Sl);
    return r;
  }
  function Kp() {
    var e = A.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? ma(t) : t),
      (e = e.useState()[0]),
      (ye !== null ? ye.memoizedState : null) !== e && (ae.flags |= 1024),
      t
    );
  }
  function Os() {
    var e = _i !== 0;
    return ((_i = 0), e);
  }
  function Cs(e, t, n) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
  }
  function Ms(e) {
    if (Ei) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Ei = !1;
    }
    ((mn = 0), (De = ye = ae = null), (Sl = !1), (da = _i = 0), (xl = null));
  }
  function tt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (De === null ? (ae.memoizedState = De = e) : (De = De.next = e), De);
  }
  function ze() {
    if (ye === null) {
      var e = ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ye.next;
    var t = De === null ? ae.memoizedState : De.next;
    if (t !== null) ((De = t), (ye = e));
    else {
      if (e === null)
        throw ae.alternate === null ? Error(u(467)) : Error(u(310));
      ((ye = e),
        (e = {
          memoizedState: ye.memoizedState,
          baseState: ye.baseState,
          baseQueue: ye.baseQueue,
          queue: ye.queue,
          next: null,
        }),
        De === null ? (ae.memoizedState = De = e) : (De = De.next = e));
    }
    return De;
  }
  function Ds() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ma(e) {
    var t = da;
    return (
      (da += 1),
      xl === null && (xl = []),
      (e = Bo(xl, e, t)),
      (t = ae),
      (De === null ? t.memoizedState : De.next) === null &&
        ((t = t.alternate),
        (A.H = t === null || t.memoizedState === null ? Af : Rf)),
      e
    );
  }
  function Ti(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ma(e);
      if (e.$$typeof === $) return Ke(e);
    }
    throw Error(u(438, String(e)));
  }
  function zs(e) {
    var t = null,
      n = ae.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var l = ae.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (t = {
              data: l.data.map(function (a) {
                return a.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = Ds()), (ae.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++) n[l] = Fe;
    return (t.index++, n);
  }
  function $t(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ai(e) {
    var t = ze();
    return js(t, ye, e);
  }
  function js(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(u(311));
    l.lastRenderedReducer = n;
    var a = e.baseQueue,
      r = l.pending;
    if (r !== null) {
      if (a !== null) {
        var o = a.next;
        ((a.next = r.next), (r.next = o));
      }
      ((t.baseQueue = a = r), (l.pending = null));
    }
    if (((r = e.baseState), a === null)) e.memoizedState = r;
    else {
      t = a.next;
      var h = (o = null),
        g = null,
        R = t,
        C = !1;
      do {
        var z = R.lane & -536870913;
        if (z !== R.lane ? (ce & z) === z : (mn & z) === z) {
          var N = R.revertLane;
          if (N === 0)
            (g !== null &&
              (g = g.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: R.action,
                  hasEagerState: R.hasEagerState,
                  eagerState: R.eagerState,
                  next: null,
                }),
              z === gl && (C = !0));
          else if ((mn & N) === N) {
            ((R = R.next), N === gl && (C = !0));
            continue;
          } else
            ((z = {
              lane: 0,
              revertLane: R.revertLane,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null,
            }),
              g === null ? ((h = g = z), (o = r)) : (g = g.next = z),
              (ae.lanes |= N),
              (xn |= N));
          ((z = R.action),
            kn && n(r, z),
            (r = R.hasEagerState ? R.eagerState : n(r, z)));
        } else
          ((N = {
            lane: z,
            revertLane: R.revertLane,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null,
          }),
            g === null ? ((h = g = N), (o = r)) : (g = g.next = N),
            (ae.lanes |= z),
            (xn |= z));
        R = R.next;
      } while (R !== null && R !== t);
      if (
        (g === null ? (o = r) : (g.next = h),
        !st(r, e.memoizedState) && ((Ye = !0), C && ((n = vl), n !== null)))
      )
        throw n;
      ((e.memoizedState = r),
        (e.baseState = o),
        (e.baseQueue = g),
        (l.lastRenderedState = r));
    }
    return (a === null && (l.lanes = 0), [e.memoizedState, l.dispatch]);
  }
  function Us(e) {
    var t = ze(),
      n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch,
      a = n.pending,
      r = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var o = (a = a.next);
      do ((r = e(r, o.action)), (o = o.next));
      while (o !== a);
      (st(r, t.memoizedState) || (Ye = !0),
        (t.memoizedState = r),
        t.baseQueue === null && (t.baseState = r),
        (n.lastRenderedState = r));
    }
    return [r, l];
  }
  function Qo(e, t, n) {
    var l = ae,
      a = ze(),
      r = de;
    if (r) {
      if (n === void 0) throw Error(u(407));
      n = n();
    } else n = t();
    var o = !st((ye || a).memoizedState, n);
    (o && ((a.memoizedState = n), (Ye = !0)), (a = a.queue));
    var h = Ko.bind(null, l, a, e);
    if (
      (pa(2048, 8, h, [e]),
      a.getSnapshot !== t || o || (De !== null && De.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        El(9, Ri(), ko.bind(null, l, a, n, t), null),
        Ee === null)
      )
        throw Error(u(349));
      r || (mn & 124) !== 0 || Zo(l, t, n);
    }
    return n;
  }
  function Zo(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = ae.updateQueue),
      t === null
        ? ((t = Ds()), (ae.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function ko(e, t, n, l) {
    ((t.value = n), (t.getSnapshot = l), Jo(t) && $o(e));
  }
  function Ko(e, t, n) {
    return n(function () {
      Jo(t) && $o(e);
    });
  }
  function Jo(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !st(e, n);
    } catch {
      return !0;
    }
  }
  function $o(e) {
    var t = dl(e, 2);
    t !== null && dt(t, e, 2);
  }
  function Bs(e) {
    var t = tt();
    if (typeof e == "function") {
      var n = e;
      if (((e = n()), kn)) {
        sn(!0);
        try {
          n();
        } finally {
          sn(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $t,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Fo(e, t, n, l) {
    return ((e.baseState = n), js(e, ye, typeof l == "function" ? l : $t));
  }
  function Jp(e, t, n, l, a) {
    if (Ni(e)) throw Error(u(485));
    if (((e = t.action), e !== null)) {
      var r = {
        payload: a,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (o) {
          r.listeners.push(o);
        },
      };
      (A.T !== null ? n(!0) : (r.isTransition = !1),
        l(r),
        (n = t.pending),
        n === null
          ? ((r.next = t.pending = r), Wo(t, r))
          : ((r.next = n.next), (t.pending = n.next = r)));
    }
  }
  function Wo(e, t) {
    var n = t.action,
      l = t.payload,
      a = e.state;
    if (t.isTransition) {
      var r = A.T,
        o = {};
      A.T = o;
      try {
        var h = n(a, l),
          g = A.S;
        (g !== null && g(o, h), Po(e, t, h));
      } catch (R) {
        qs(e, t, R);
      } finally {
        A.T = r;
      }
    } else
      try {
        ((r = n(a, l)), Po(e, t, r));
      } catch (R) {
        qs(e, t, R);
      }
  }
  function Po(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (l) {
            Io(e, t, l);
          },
          function (l) {
            return qs(e, t, l);
          }
        )
      : Io(e, t, n);
  }
  function Io(e, t, n) {
    ((t.status = "fulfilled"),
      (t.value = n),
      ef(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), Wo(e, n))));
  }
  function qs(e, t, n) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do ((t.status = "rejected"), (t.reason = n), ef(t), (t = t.next));
      while (t !== l);
    }
    e.action = null;
  }
  function ef(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function tf(e, t) {
    return t;
  }
  function nf(e, t) {
    if (de) {
      var n = Ee.formState;
      if (n !== null) {
        e: {
          var l = ae;
          if (de) {
            if (we) {
              t: {
                for (var a = we, r = Ct; a.nodeType !== 8; ) {
                  if (!r) {
                    a = null;
                    break t;
                  }
                  if (((a = wt(a.nextSibling)), a === null)) {
                    a = null;
                    break t;
                  }
                }
                ((r = a.data), (a = r === "F!" || r === "F" ? a : null));
              }
              if (a) {
                ((we = wt(a.nextSibling)), (l = a.data === "F!"));
                break e;
              }
            }
            Gn(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return (
      (n = tt()),
      (n.memoizedState = n.baseState = t),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: tf,
        lastRenderedState: t,
      }),
      (n.queue = l),
      (n = Ef.bind(null, ae, l)),
      (l.dispatch = n),
      (l = Bs(!1)),
      (r = Gs.bind(null, ae, !1, l.queue)),
      (l = tt()),
      (a = { state: t, dispatch: null, action: e, pending: null }),
      (l.queue = a),
      (n = Jp.bind(null, ae, a, r, n)),
      (a.dispatch = n),
      (l.memoizedState = e),
      [t, n, !1]
    );
  }
  function lf(e) {
    var t = ze();
    return af(t, ye, e);
  }
  function af(e, t, n) {
    if (
      ((t = js(e, t, tf)[0]),
      (e = Ai($t)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var l = ma(t);
      } catch (o) {
        throw o === ra ? bi : o;
      }
    else l = t;
    t = ze();
    var a = t.queue,
      r = a.dispatch;
    return (
      n !== t.memoizedState &&
        ((ae.flags |= 2048), El(9, Ri(), $p.bind(null, a, n), null)),
      [l, r, e]
    );
  }
  function $p(e, t) {
    e.action = t;
  }
  function uf(e) {
    var t = ze(),
      n = ye;
    if (n !== null) return af(t, n, e);
    (ze(), (t = t.memoizedState), (n = ze()));
    var l = n.queue.dispatch;
    return ((n.memoizedState = e), [t, l, !1]);
  }
  function El(e, t, n, l) {
    return (
      (e = { tag: e, create: n, deps: l, inst: t, next: null }),
      (t = ae.updateQueue),
      t === null && ((t = Ds()), (ae.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((l = n.next), (n.next = e), (e.next = l), (t.lastEffect = e)),
      e
    );
  }
  function Ri() {
    return { destroy: void 0, resource: void 0 };
  }
  function sf() {
    return ze().memoizedState;
  }
  function wi(e, t, n, l) {
    var a = tt();
    ((l = l === void 0 ? null : l),
      (ae.flags |= e),
      (a.memoizedState = El(1 | t, Ri(), n, l)));
  }
  function pa(e, t, n, l) {
    var a = ze();
    l = l === void 0 ? null : l;
    var r = a.memoizedState.inst;
    ye !== null && l !== null && ws(l, ye.memoizedState.deps)
      ? (a.memoizedState = El(t, r, n, l))
      : ((ae.flags |= e), (a.memoizedState = El(1 | t, r, n, l)));
  }
  function rf(e, t) {
    wi(8390656, 8, e, t);
  }
  function cf(e, t) {
    pa(2048, 8, e, t);
  }
  function of(e, t) {
    return pa(4, 2, e, t);
  }
  function ff(e, t) {
    return pa(4, 4, e, t);
  }
  function hf(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function df(e, t, n) {
    ((n = n != null ? n.concat([e]) : null), pa(4, 4, hf.bind(null, t, e), n));
  }
  function Hs() {}
  function mf(e, t) {
    var n = ze();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && ws(t, l[1]) ? l[0] : ((n.memoizedState = [e, t]), e);
  }
  function pf(e, t) {
    var n = ze();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && ws(t, l[1])) return l[0];
    if (((l = e()), kn)) {
      sn(!0);
      try {
        e();
      } finally {
        sn(!1);
      }
    }
    return ((n.memoizedState = [l, t]), l);
  }
  function Ls(e, t, n) {
    return n === void 0 || (mn & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = vh()), (ae.lanes |= e), (xn |= e), n);
  }
  function yf(e, t, n, l) {
    return st(n, t)
      ? n
      : bl.current !== null
        ? ((e = Ls(e, n, l)), st(e, t) || (Ye = !0), e)
        : (mn & 42) === 0
          ? ((Ye = !0), (e.memoizedState = n))
          : ((e = vh()), (ae.lanes |= e), (xn |= e), t);
  }
  function gf(e, t, n, l, a) {
    var r = B.p;
    B.p = r !== 0 && 8 > r ? r : 8;
    var o = A.T,
      h = {};
    ((A.T = h), Gs(e, !1, t, n));
    try {
      var g = a(),
        R = A.S;
      if (
        (R !== null && R(h, g),
        g !== null && typeof g == "object" && typeof g.then == "function")
      ) {
        var C = Zp(g, l);
        ya(e, t, C, ht(e));
      } else ya(e, t, l, ht(e));
    } catch (z) {
      ya(e, t, { then: function () {}, status: "rejected", reason: z }, ht());
    } finally {
      ((B.p = r), (A.T = o));
    }
  }
  function Fp() {}
  function Ys(e, t, n, l) {
    if (e.tag !== 5) throw Error(u(476));
    var a = vf(e).queue;
    gf(
      e,
      a,
      t,
      Z,
      n === null
        ? Fp
        : function () {
            return (bf(e), n(l));
          }
    );
  }
  function vf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $t,
        lastRenderedState: Z,
      },
      next: null,
    };
    var n = {};
    return (
      (t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: $t,
          lastRenderedState: n,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function bf(e) {
    var t = vf(e).next.queue;
    ya(e, t, {}, ht());
  }
  function Vs() {
    return Ke(ja);
  }
  function Sf() {
    return ze().memoizedState;
  }
  function xf() {
    return ze().memoizedState;
  }
  function Wp(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = ht();
          e = hn(n);
          var l = dn(t, e, n);
          (l !== null && (dt(l, t, n), oa(l, t, n)),
            (t = { cache: gs() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Pp(e, t, n) {
    var l = ht();
    ((n = {
      lane: l,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ni(e)
        ? _f(t, n)
        : ((n = ss(e, t, n, l)), n !== null && (dt(n, e, l), Tf(n, t, l))));
  }
  function Ef(e, t, n) {
    var l = ht();
    ya(e, t, n, l);
  }
  function ya(e, t, n, l) {
    var a = {
      lane: l,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ni(e)) _f(t, a);
    else {
      var r = e.alternate;
      if (
        e.lanes === 0 &&
        (r === null || r.lanes === 0) &&
        ((r = t.lastRenderedReducer), r !== null)
      )
        try {
          var o = t.lastRenderedState,
            h = r(o, n);
          if (((a.hasEagerState = !0), (a.eagerState = h), st(h, o)))
            return (fi(e, t, a, 0), Ee === null && oi(), !1);
        } catch {
        } finally {
        }
      if (((n = ss(e, t, a, l)), n !== null))
        return (dt(n, e, l), Tf(n, t, l), !0);
    }
    return !1;
  }
  function Gs(e, t, n, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: Sr(),
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ni(e))
    ) {
      if (t) throw Error(u(479));
    } else ((t = ss(e, n, l, 2)), t !== null && dt(t, e, 2));
  }
  function Ni(e) {
    var t = e.alternate;
    return e === ae || (t !== null && t === ae);
  }
  function _f(e, t) {
    Sl = Ei = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function Tf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      ((l &= e.pendingLanes), (n |= l), (t.lanes = n), Cc(e, n));
    }
  }
  var Oi = {
      readContext: Ke,
      use: Ti,
      useCallback: Ce,
      useContext: Ce,
      useEffect: Ce,
      useImperativeHandle: Ce,
      useLayoutEffect: Ce,
      useInsertionEffect: Ce,
      useMemo: Ce,
      useReducer: Ce,
      useRef: Ce,
      useState: Ce,
      useDebugValue: Ce,
      useDeferredValue: Ce,
      useTransition: Ce,
      useSyncExternalStore: Ce,
      useId: Ce,
      useHostTransitionStatus: Ce,
      useFormState: Ce,
      useActionState: Ce,
      useOptimistic: Ce,
      useMemoCache: Ce,
      useCacheRefresh: Ce,
    },
    Af = {
      readContext: Ke,
      use: Ti,
      useCallback: function (e, t) {
        return ((tt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Ke,
      useEffect: rf,
      useImperativeHandle: function (e, t, n) {
        ((n = n != null ? n.concat([e]) : null),
          wi(4194308, 4, hf.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return wi(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        wi(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = tt();
        t = t === void 0 ? null : t;
        var l = e();
        if (kn) {
          sn(!0);
          try {
            e();
          } finally {
            sn(!1);
          }
        }
        return ((n.memoizedState = [l, t]), l);
      },
      useReducer: function (e, t, n) {
        var l = tt();
        if (n !== void 0) {
          var a = n(t);
          if (kn) {
            sn(!0);
            try {
              n(t);
            } finally {
              sn(!1);
            }
          }
        } else a = t;
        return (
          (l.memoizedState = l.baseState = a),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: a,
          }),
          (l.queue = e),
          (e = e.dispatch = Pp.bind(null, ae, e)),
          [l.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = tt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Bs(e);
        var t = e.queue,
          n = Ef.bind(null, ae, t);
        return ((t.dispatch = n), [e.memoizedState, n]);
      },
      useDebugValue: Hs,
      useDeferredValue: function (e, t) {
        var n = tt();
        return Ls(n, e, t);
      },
      useTransition: function () {
        var e = Bs(!1);
        return (
          (e = gf.bind(null, ae, e.queue, !0, !1)),
          (tt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, n) {
        var l = ae,
          a = tt();
        if (de) {
          if (n === void 0) throw Error(u(407));
          n = n();
        } else {
          if (((n = t()), Ee === null)) throw Error(u(349));
          (ce & 124) !== 0 || Zo(l, t, n);
        }
        a.memoizedState = n;
        var r = { value: n, getSnapshot: t };
        return (
          (a.queue = r),
          rf(Ko.bind(null, l, r, e), [e]),
          (l.flags |= 2048),
          El(9, Ri(), ko.bind(null, l, r, n, t), null),
          n
        );
      },
      useId: function () {
        var e = tt(),
          t = Ee.identifierPrefix;
        if (de) {
          var n = kt,
            l = Zt;
          ((n = (l & ~(1 << (32 - ut(l) - 1))).toString(32) + n),
            (t = "«" + t + "R" + n),
            (n = _i++),
            0 < n && (t += "H" + n.toString(32)),
            (t += "»"));
        } else ((n = kp++), (t = "«" + t + "r" + n.toString(32) + "»"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Vs,
      useFormState: nf,
      useActionState: nf,
      useOptimistic: function (e) {
        var t = tt();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = n),
          (t = Gs.bind(null, ae, !0, n)),
          (n.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: zs,
      useCacheRefresh: function () {
        return (tt().memoizedState = Wp.bind(null, ae));
      },
    },
    Rf = {
      readContext: Ke,
      use: Ti,
      useCallback: mf,
      useContext: Ke,
      useEffect: cf,
      useImperativeHandle: df,
      useInsertionEffect: of,
      useLayoutEffect: ff,
      useMemo: pf,
      useReducer: Ai,
      useRef: sf,
      useState: function () {
        return Ai($t);
      },
      useDebugValue: Hs,
      useDeferredValue: function (e, t) {
        var n = ze();
        return yf(n, ye.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Ai($t)[0],
          t = ze().memoizedState;
        return [typeof e == "boolean" ? e : ma(e), t];
      },
      useSyncExternalStore: Qo,
      useId: Sf,
      useHostTransitionStatus: Vs,
      useFormState: lf,
      useActionState: lf,
      useOptimistic: function (e, t) {
        var n = ze();
        return Fo(n, ye, e, t);
      },
      useMemoCache: zs,
      useCacheRefresh: xf,
    },
    Ip = {
      readContext: Ke,
      use: Ti,
      useCallback: mf,
      useContext: Ke,
      useEffect: cf,
      useImperativeHandle: df,
      useInsertionEffect: of,
      useLayoutEffect: ff,
      useMemo: pf,
      useReducer: Us,
      useRef: sf,
      useState: function () {
        return Us($t);
      },
      useDebugValue: Hs,
      useDeferredValue: function (e, t) {
        var n = ze();
        return ye === null ? Ls(n, e, t) : yf(n, ye.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Us($t)[0],
          t = ze().memoizedState;
        return [typeof e == "boolean" ? e : ma(e), t];
      },
      useSyncExternalStore: Qo,
      useId: Sf,
      useHostTransitionStatus: Vs,
      useFormState: uf,
      useActionState: uf,
      useOptimistic: function (e, t) {
        var n = ze();
        return ye !== null
          ? Fo(n, ye, e, t)
          : ((n.baseState = e), [e, n.queue.dispatch]);
      },
      useMemoCache: zs,
      useCacheRefresh: xf,
    },
    _l = null,
    ga = 0;
  function Ci(e) {
    var t = ga;
    return ((ga += 1), _l === null && (_l = []), Bo(_l, e, t));
  }
  function va(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Mi(e, t) {
    throw t.$$typeof === M
      ? Error(u(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          u(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function wf(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Nf(e) {
    function t(_, S) {
      if (e) {
        var T = _.deletions;
        T === null ? ((_.deletions = [S]), (_.flags |= 16)) : T.push(S);
      }
    }
    function n(_, S) {
      if (!e) return null;
      for (; S !== null; ) (t(_, S), (S = S.sibling));
      return null;
    }
    function l(_) {
      for (var S = new Map(); _ !== null; )
        (_.key !== null ? S.set(_.key, _) : S.set(_.index, _), (_ = _.sibling));
      return S;
    }
    function a(_, S) {
      return ((_ = Qt(_, S)), (_.index = 0), (_.sibling = null), _);
    }
    function r(_, S, T) {
      return (
        (_.index = T),
        e
          ? ((T = _.alternate),
            T !== null
              ? ((T = T.index), T < S ? ((_.flags |= 67108866), S) : T)
              : ((_.flags |= 67108866), S))
          : ((_.flags |= 1048576), S)
      );
    }
    function o(_) {
      return (e && _.alternate === null && (_.flags |= 67108866), _);
    }
    function h(_, S, T, D) {
      return S === null || S.tag !== 6
        ? ((S = cs(T, _.mode, D)), (S.return = _), S)
        : ((S = a(S, T)), (S.return = _), S);
    }
    function g(_, S, T, D) {
      var k = T.type;
      return k === H
        ? C(_, S, T.props.children, D, T.key)
        : S !== null &&
            (S.elementType === k ||
              (typeof k == "object" &&
                k !== null &&
                k.$$typeof === xe &&
                wf(k) === S.type))
          ? ((S = a(S, T.props)), va(S, T), (S.return = _), S)
          : ((S = di(T.type, T.key, T.props, null, _.mode, D)),
            va(S, T),
            (S.return = _),
            S);
    }
    function R(_, S, T, D) {
      return S === null ||
        S.tag !== 4 ||
        S.stateNode.containerInfo !== T.containerInfo ||
        S.stateNode.implementation !== T.implementation
        ? ((S = os(T, _.mode, D)), (S.return = _), S)
        : ((S = a(S, T.children || [])), (S.return = _), S);
    }
    function C(_, S, T, D, k) {
      return S === null || S.tag !== 7
        ? ((S = Hn(T, _.mode, D, k)), (S.return = _), S)
        : ((S = a(S, T)), (S.return = _), S);
    }
    function z(_, S, T) {
      if (
        (typeof S == "string" && S !== "") ||
        typeof S == "number" ||
        typeof S == "bigint"
      )
        return ((S = cs("" + S, _.mode, T)), (S.return = _), S);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case j:
            return (
              (T = di(S.type, S.key, S.props, null, _.mode, T)),
              va(T, S),
              (T.return = _),
              T
            );
          case q:
            return ((S = os(S, _.mode, T)), (S.return = _), S);
          case xe:
            var D = S._init;
            return ((S = D(S._payload)), z(_, S, T));
        }
        if (He(S) || qe(S))
          return ((S = Hn(S, _.mode, T, null)), (S.return = _), S);
        if (typeof S.then == "function") return z(_, Ci(S), T);
        if (S.$$typeof === $) return z(_, gi(_, S), T);
        Mi(_, S);
      }
      return null;
    }
    function N(_, S, T, D) {
      var k = S !== null ? S.key : null;
      if (
        (typeof T == "string" && T !== "") ||
        typeof T == "number" ||
        typeof T == "bigint"
      )
        return k !== null ? null : h(_, S, "" + T, D);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case j:
            return T.key === k ? g(_, S, T, D) : null;
          case q:
            return T.key === k ? R(_, S, T, D) : null;
          case xe:
            return ((k = T._init), (T = k(T._payload)), N(_, S, T, D));
        }
        if (He(T) || qe(T)) return k !== null ? null : C(_, S, T, D, null);
        if (typeof T.then == "function") return N(_, S, Ci(T), D);
        if (T.$$typeof === $) return N(_, S, gi(_, T), D);
        Mi(_, T);
      }
      return null;
    }
    function O(_, S, T, D, k) {
      if (
        (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
      )
        return ((_ = _.get(T) || null), h(S, _, "" + D, k));
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case j:
            return (
              (_ = _.get(D.key === null ? T : D.key) || null),
              g(S, _, D, k)
            );
          case q:
            return (
              (_ = _.get(D.key === null ? T : D.key) || null),
              R(S, _, D, k)
            );
          case xe:
            var ie = D._init;
            return ((D = ie(D._payload)), O(_, S, T, D, k));
        }
        if (He(D) || qe(D))
          return ((_ = _.get(T) || null), C(S, _, D, k, null));
        if (typeof D.then == "function") return O(_, S, T, Ci(D), k);
        if (D.$$typeof === $) return O(_, S, T, gi(S, D), k);
        Mi(S, D);
      }
      return null;
    }
    function ee(_, S, T, D) {
      for (
        var k = null, ie = null, J = S, I = (S = 0), Ge = null;
        J !== null && I < T.length;
        I++
      ) {
        J.index > I ? ((Ge = J), (J = null)) : (Ge = J.sibling);
        var he = N(_, J, T[I], D);
        if (he === null) {
          J === null && (J = Ge);
          break;
        }
        (e && J && he.alternate === null && t(_, J),
          (S = r(he, S, I)),
          ie === null ? (k = he) : (ie.sibling = he),
          (ie = he),
          (J = Ge));
      }
      if (I === T.length) return (n(_, J), de && Yn(_, I), k);
      if (J === null) {
        for (; I < T.length; I++)
          ((J = z(_, T[I], D)),
            J !== null &&
              ((S = r(J, S, I)),
              ie === null ? (k = J) : (ie.sibling = J),
              (ie = J)));
        return (de && Yn(_, I), k);
      }
      for (J = l(J); I < T.length; I++)
        ((Ge = O(J, _, I, T[I], D)),
          Ge !== null &&
            (e &&
              Ge.alternate !== null &&
              J.delete(Ge.key === null ? I : Ge.key),
            (S = r(Ge, S, I)),
            ie === null ? (k = Ge) : (ie.sibling = Ge),
            (ie = Ge)));
      return (
        e &&
          J.forEach(function (Cn) {
            return t(_, Cn);
          }),
        de && Yn(_, I),
        k
      );
    }
    function P(_, S, T, D) {
      if (T == null) throw Error(u(151));
      for (
        var k = null, ie = null, J = S, I = (S = 0), Ge = null, he = T.next();
        J !== null && !he.done;
        I++, he = T.next()
      ) {
        J.index > I ? ((Ge = J), (J = null)) : (Ge = J.sibling);
        var Cn = N(_, J, he.value, D);
        if (Cn === null) {
          J === null && (J = Ge);
          break;
        }
        (e && J && Cn.alternate === null && t(_, J),
          (S = r(Cn, S, I)),
          ie === null ? (k = Cn) : (ie.sibling = Cn),
          (ie = Cn),
          (J = Ge));
      }
      if (he.done) return (n(_, J), de && Yn(_, I), k);
      if (J === null) {
        for (; !he.done; I++, he = T.next())
          ((he = z(_, he.value, D)),
            he !== null &&
              ((S = r(he, S, I)),
              ie === null ? (k = he) : (ie.sibling = he),
              (ie = he)));
        return (de && Yn(_, I), k);
      }
      for (J = l(J); !he.done; I++, he = T.next())
        ((he = O(J, _, I, he.value, D)),
          he !== null &&
            (e &&
              he.alternate !== null &&
              J.delete(he.key === null ? I : he.key),
            (S = r(he, S, I)),
            ie === null ? (k = he) : (ie.sibling = he),
            (ie = he)));
      return (
        e &&
          J.forEach(function (ey) {
            return t(_, ey);
          }),
        de && Yn(_, I),
        k
      );
    }
    function ve(_, S, T, D) {
      if (
        (typeof T == "object" &&
          T !== null &&
          T.type === H &&
          T.key === null &&
          (T = T.props.children),
        typeof T == "object" && T !== null)
      ) {
        switch (T.$$typeof) {
          case j:
            e: {
              for (var k = T.key; S !== null; ) {
                if (S.key === k) {
                  if (((k = T.type), k === H)) {
                    if (S.tag === 7) {
                      (n(_, S.sibling),
                        (D = a(S, T.props.children)),
                        (D.return = _),
                        (_ = D));
                      break e;
                    }
                  } else if (
                    S.elementType === k ||
                    (typeof k == "object" &&
                      k !== null &&
                      k.$$typeof === xe &&
                      wf(k) === S.type)
                  ) {
                    (n(_, S.sibling),
                      (D = a(S, T.props)),
                      va(D, T),
                      (D.return = _),
                      (_ = D));
                    break e;
                  }
                  n(_, S);
                  break;
                } else t(_, S);
                S = S.sibling;
              }
              T.type === H
                ? ((D = Hn(T.props.children, _.mode, D, T.key)),
                  (D.return = _),
                  (_ = D))
                : ((D = di(T.type, T.key, T.props, null, _.mode, D)),
                  va(D, T),
                  (D.return = _),
                  (_ = D));
            }
            return o(_);
          case q:
            e: {
              for (k = T.key; S !== null; ) {
                if (S.key === k)
                  if (
                    S.tag === 4 &&
                    S.stateNode.containerInfo === T.containerInfo &&
                    S.stateNode.implementation === T.implementation
                  ) {
                    (n(_, S.sibling),
                      (D = a(S, T.children || [])),
                      (D.return = _),
                      (_ = D));
                    break e;
                  } else {
                    n(_, S);
                    break;
                  }
                else t(_, S);
                S = S.sibling;
              }
              ((D = os(T, _.mode, D)), (D.return = _), (_ = D));
            }
            return o(_);
          case xe:
            return ((k = T._init), (T = k(T._payload)), ve(_, S, T, D));
        }
        if (He(T)) return ee(_, S, T, D);
        if (qe(T)) {
          if (((k = qe(T)), typeof k != "function")) throw Error(u(150));
          return ((T = k.call(T)), P(_, S, T, D));
        }
        if (typeof T.then == "function") return ve(_, S, Ci(T), D);
        if (T.$$typeof === $) return ve(_, S, gi(_, T), D);
        Mi(_, T);
      }
      return (typeof T == "string" && T !== "") ||
        typeof T == "number" ||
        typeof T == "bigint"
        ? ((T = "" + T),
          S !== null && S.tag === 6
            ? (n(_, S.sibling), (D = a(S, T)), (D.return = _), (_ = D))
            : (n(_, S), (D = cs(T, _.mode, D)), (D.return = _), (_ = D)),
          o(_))
        : n(_, S);
    }
    return function (_, S, T, D) {
      try {
        ga = 0;
        var k = ve(_, S, T, D);
        return ((_l = null), k);
      } catch (J) {
        if (J === ra || J === bi) throw J;
        var ie = rt(29, J, null, _.mode);
        return ((ie.lanes = D), (ie.return = _), ie);
      } finally {
      }
    };
  }
  var Tl = Nf(!0),
    Of = Nf(!1),
    xt = U(null),
    Mt = null;
  function pn(e) {
    var t = e.alternate;
    (V(Be, Be.current & 1),
      V(xt, e),
      Mt === null &&
        (t === null || bl.current !== null || t.memoizedState !== null) &&
        (Mt = e));
  }
  function Cf(e) {
    if (e.tag === 22) {
      if ((V(Be, Be.current), V(xt, e), Mt === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Mt = e);
      }
    } else yn();
  }
  function yn() {
    (V(Be, Be.current), V(xt, xt.current));
  }
  function Ft(e) {
    (Q(xt), Mt === e && (Mt = null), Q(Be));
  }
  var Be = U(0);
  function Di(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || Dr(n))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  function Xs(e, t, n, l) {
    ((t = e.memoizedState),
      (n = n(l, t)),
      (n = n == null ? t : E({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Qs = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var l = ht(),
        a = hn(l);
      ((a.payload = t),
        n != null && (a.callback = n),
        (t = dn(e, a, l)),
        t !== null && (dt(t, e, l), oa(t, e, l)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var l = ht(),
        a = hn(l);
      ((a.tag = 1),
        (a.payload = t),
        n != null && (a.callback = n),
        (t = dn(e, a, l)),
        t !== null && (dt(t, e, l), oa(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = ht(),
        l = hn(n);
      ((l.tag = 2),
        t != null && (l.callback = t),
        (t = dn(e, l, n)),
        t !== null && (dt(t, e, n), oa(t, e, n)));
    },
  };
  function Mf(e, t, n, l, a, r, o) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(l, r, o)
        : t.prototype && t.prototype.isPureReactComponent
          ? !ea(n, l) || !ea(a, r)
          : !0
    );
  }
  function Df(e, t, n, l) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, l),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, l),
      t.state !== e && Qs.enqueueReplaceState(t, t.state, null));
  }
  function Kn(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t) l !== "ref" && (n[l] = t[l]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = E({}, n));
      for (var a in e) n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  var zi =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function zf(e) {
    zi(e);
  }
  function jf(e) {
    console.error(e);
  }
  function Uf(e) {
    zi(e);
  }
  function ji(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Bf(e, t, n) {
    try {
      var l = e.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Zs(e, t, n) {
    return (
      (n = hn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        ji(e, t);
      }),
      n
    );
  }
  function qf(e) {
    return ((e = hn(e)), (e.tag = 3), e);
  }
  function Hf(e, t, n, l) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var r = l.value;
      ((e.payload = function () {
        return a(r);
      }),
        (e.callback = function () {
          Bf(t, n, l);
        }));
    }
    var o = n.stateNode;
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (e.callback = function () {
        (Bf(t, n, l),
          typeof a != "function" &&
            (En === null ? (En = new Set([this])) : En.add(this)));
        var h = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: h !== null ? h : "",
        });
      });
  }
  function e0(e, t, n, l, a) {
    if (
      ((n.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && ia(t, n, a, !0),
        (n = xt.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 13:
            return (
              Mt === null ? pr() : n.alternate === null && Ne === 0 && (Ne = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = a),
              l === Ss
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([l])) : t.add(l),
                  gr(e, l, a)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              l === Ss
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue),
                      n === null ? (t.retryQueue = new Set([l])) : n.add(l)),
                  gr(e, l, a)),
              !1
            );
        }
        throw Error(u(435, n.tag));
      }
      return (gr(e, l, a), pr(), !1);
    }
    if (de)
      return (
        (t = xt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = a),
            l !== ds && ((e = Error(u(422), { cause: l })), aa(gt(e, n))))
          : (l !== ds && ((t = Error(u(423), { cause: l })), aa(gt(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (a &= -a),
            (e.lanes |= a),
            (l = gt(l, n)),
            (a = Zs(e.stateNode, l, a)),
            _s(e, a),
            Ne !== 4 && (Ne = 2)),
        !1
      );
    var r = Error(u(520), { cause: l });
    if (
      ((r = gt(r, n)),
      Aa === null ? (Aa = [r]) : Aa.push(r),
      Ne !== 4 && (Ne = 2),
      t === null)
    )
      return !0;
    ((l = gt(l, n)), (n = t));
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = a & -a),
            (n.lanes |= e),
            (e = Zs(n.stateNode, l, e)),
            _s(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (r = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (r !== null &&
                  typeof r.componentDidCatch == "function" &&
                  (En === null || !En.has(r)))))
          )
            return (
              (n.flags |= 65536),
              (a &= -a),
              (n.lanes |= a),
              (a = qf(a)),
              Hf(a, e, n, l),
              _s(n, a),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Lf = Error(u(461)),
    Ye = !1;
  function Xe(e, t, n, l) {
    t.child = e === null ? Of(t, null, n, l) : Tl(t, e.child, n, l);
  }
  function Yf(e, t, n, l, a) {
    n = n.render;
    var r = t.ref;
    if ("ref" in l) {
      var o = {};
      for (var h in l) h !== "ref" && (o[h] = l[h]);
    } else o = l;
    return (
      Qn(t),
      (l = Ns(e, t, n, o, r, a)),
      (h = Os()),
      e !== null && !Ye
        ? (Cs(e, t, a), Wt(e, t, a))
        : (de && h && fs(t), (t.flags |= 1), Xe(e, t, l, a), t.child)
    );
  }
  function Vf(e, t, n, l, a) {
    if (e === null) {
      var r = n.type;
      return typeof r == "function" &&
        !rs(r) &&
        r.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = r), Gf(e, t, r, l, a))
        : ((e = di(n.type, null, l, t, t.mode, a)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((r = e.child), !Is(e, a))) {
      var o = r.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : ea), n(o, l) && e.ref === t.ref)
      )
        return Wt(e, t, a);
    }
    return (
      (t.flags |= 1),
      (e = Qt(r, l)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Gf(e, t, n, l, a) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (ea(r, l) && e.ref === t.ref)
        if (((Ye = !1), (t.pendingProps = l = r), Is(e, a)))
          (e.flags & 131072) !== 0 && (Ye = !0);
        else return ((t.lanes = e.lanes), Wt(e, t, a));
    }
    return ks(e, t, n, l, a);
  }
  function Xf(e, t, n) {
    var l = t.pendingProps,
      a = l.children,
      r = e !== null ? e.memoizedState : null;
    if (l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((l = r !== null ? r.baseLanes | n : n), e !== null)) {
          for (a = t.child = e.child, r = 0; a !== null; )
            ((r = r | a.lanes | a.childLanes), (a = a.sibling));
          t.childLanes = r & ~l;
        } else ((t.childLanes = 0), (t.child = null));
        return Qf(e, t, l, n);
      }
      if ((n & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && vi(t, r !== null ? r.cachePool : null),
          r !== null ? Vo(t, r) : As(),
          Cf(t));
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          Qf(e, t, r !== null ? r.baseLanes | n : n, n)
        );
    } else
      r !== null
        ? (vi(t, r.cachePool), Vo(t, r), yn(), (t.memoizedState = null))
        : (e !== null && vi(t, null), As(), yn());
    return (Xe(e, t, a, n), t.child);
  }
  function Qf(e, t, n, l) {
    var a = bs();
    return (
      (a = a === null ? null : { parent: Ue._currentValue, pool: a }),
      (t.memoizedState = { baseLanes: n, cachePool: a }),
      e !== null && vi(t, null),
      As(),
      Cf(t),
      e !== null && ia(e, t, l, !0),
      null
    );
  }
  function Ui(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(u(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function ks(e, t, n, l, a) {
    return (
      Qn(t),
      (n = Ns(e, t, n, l, void 0, a)),
      (l = Os()),
      e !== null && !Ye
        ? (Cs(e, t, a), Wt(e, t, a))
        : (de && l && fs(t), (t.flags |= 1), Xe(e, t, n, a), t.child)
    );
  }
  function Zf(e, t, n, l, a, r) {
    return (
      Qn(t),
      (t.updateQueue = null),
      (n = Xo(t, l, n, a)),
      Go(e),
      (l = Os()),
      e !== null && !Ye
        ? (Cs(e, t, r), Wt(e, t, r))
        : (de && l && fs(t), (t.flags |= 1), Xe(e, t, n, r), t.child)
    );
  }
  function kf(e, t, n, l, a) {
    if ((Qn(t), t.stateNode === null)) {
      var r = ml,
        o = n.contextType;
      (typeof o == "object" && o !== null && (r = Ke(o)),
        (r = new n(l, r)),
        (t.memoizedState =
          r.state !== null && r.state !== void 0 ? r.state : null),
        (r.updater = Qs),
        (t.stateNode = r),
        (r._reactInternals = t),
        (r = t.stateNode),
        (r.props = l),
        (r.state = t.memoizedState),
        (r.refs = {}),
        xs(t),
        (o = n.contextType),
        (r.context = typeof o == "object" && o !== null ? Ke(o) : ml),
        (r.state = t.memoizedState),
        (o = n.getDerivedStateFromProps),
        typeof o == "function" && (Xs(t, n, o, l), (r.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function" ||
          (typeof r.UNSAFE_componentWillMount != "function" &&
            typeof r.componentWillMount != "function") ||
          ((o = r.state),
          typeof r.componentWillMount == "function" && r.componentWillMount(),
          typeof r.UNSAFE_componentWillMount == "function" &&
            r.UNSAFE_componentWillMount(),
          o !== r.state && Qs.enqueueReplaceState(r, r.state, null),
          ha(t, l, r, a),
          fa(),
          (r.state = t.memoizedState)),
        typeof r.componentDidMount == "function" && (t.flags |= 4194308),
        (l = !0));
    } else if (e === null) {
      r = t.stateNode;
      var h = t.memoizedProps,
        g = Kn(n, h);
      r.props = g;
      var R = r.context,
        C = n.contextType;
      ((o = ml), typeof C == "object" && C !== null && (o = Ke(C)));
      var z = n.getDerivedStateFromProps;
      ((C =
        typeof z == "function" ||
        typeof r.getSnapshotBeforeUpdate == "function"),
        (h = t.pendingProps !== h),
        C ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((h || R !== o) && Df(t, r, l, o)),
        (fn = !1));
      var N = t.memoizedState;
      ((r.state = N),
        ha(t, l, r, a),
        fa(),
        (R = t.memoizedState),
        h || N !== R || fn
          ? (typeof z == "function" && (Xs(t, n, z, l), (R = t.memoizedState)),
            (g = fn || Mf(t, n, g, l, N, R, o))
              ? (C ||
                  (typeof r.UNSAFE_componentWillMount != "function" &&
                    typeof r.componentWillMount != "function") ||
                  (typeof r.componentWillMount == "function" &&
                    r.componentWillMount(),
                  typeof r.UNSAFE_componentWillMount == "function" &&
                    r.UNSAFE_componentWillMount()),
                typeof r.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof r.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = l),
                (t.memoizedState = R)),
            (r.props = l),
            (r.state = R),
            (r.context = o),
            (l = g))
          : (typeof r.componentDidMount == "function" && (t.flags |= 4194308),
            (l = !1)));
    } else {
      ((r = t.stateNode),
        Es(e, t),
        (o = t.memoizedProps),
        (C = Kn(n, o)),
        (r.props = C),
        (z = t.pendingProps),
        (N = r.context),
        (R = n.contextType),
        (g = ml),
        typeof R == "object" && R !== null && (g = Ke(R)),
        (h = n.getDerivedStateFromProps),
        (R =
          typeof h == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function") ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((o !== z || N !== g) && Df(t, r, l, g)),
        (fn = !1),
        (N = t.memoizedState),
        (r.state = N),
        ha(t, l, r, a),
        fa());
      var O = t.memoizedState;
      o !== z ||
      N !== O ||
      fn ||
      (e !== null && e.dependencies !== null && yi(e.dependencies))
        ? (typeof h == "function" && (Xs(t, n, h, l), (O = t.memoizedState)),
          (C =
            fn ||
            Mf(t, n, C, l, N, O, g) ||
            (e !== null && e.dependencies !== null && yi(e.dependencies)))
            ? (R ||
                (typeof r.UNSAFE_componentWillUpdate != "function" &&
                  typeof r.componentWillUpdate != "function") ||
                (typeof r.componentWillUpdate == "function" &&
                  r.componentWillUpdate(l, O, g),
                typeof r.UNSAFE_componentWillUpdate == "function" &&
                  r.UNSAFE_componentWillUpdate(l, O, g)),
              typeof r.componentDidUpdate == "function" && (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof r.componentDidUpdate != "function" ||
                (o === e.memoizedProps && N === e.memoizedState) ||
                (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate != "function" ||
                (o === e.memoizedProps && N === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = l),
              (t.memoizedState = O)),
          (r.props = l),
          (r.state = O),
          (r.context = g),
          (l = C))
        : (typeof r.componentDidUpdate != "function" ||
            (o === e.memoizedProps && N === e.memoizedState) ||
            (t.flags |= 4),
          typeof r.getSnapshotBeforeUpdate != "function" ||
            (o === e.memoizedProps && N === e.memoizedState) ||
            (t.flags |= 1024),
          (l = !1));
    }
    return (
      (r = l),
      Ui(e, t),
      (l = (t.flags & 128) !== 0),
      r || l
        ? ((r = t.stateNode),
          (n =
            l && typeof n.getDerivedStateFromError != "function"
              ? null
              : r.render()),
          (t.flags |= 1),
          e !== null && l
            ? ((t.child = Tl(t, e.child, null, a)),
              (t.child = Tl(t, null, n, a)))
            : Xe(e, t, n, a),
          (t.memoizedState = r.state),
          (e = t.child))
        : (e = Wt(e, t, a)),
      e
    );
  }
  function Kf(e, t, n, l) {
    return (la(), (t.flags |= 256), Xe(e, t, n, l), t.child);
  }
  var Ks = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Js(e) {
    return { baseLanes: e, cachePool: zo() };
  }
  function $s(e, t, n) {
    return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= Et), e);
  }
  function Jf(e, t, n) {
    var l = t.pendingProps,
      a = !1,
      r = (t.flags & 128) !== 0,
      o;
    if (
      ((o = r) ||
        (o =
          e !== null && e.memoizedState === null ? !1 : (Be.current & 2) !== 0),
      o && ((a = !0), (t.flags &= -129)),
      (o = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (de) {
        if ((a ? pn(t) : yn(), de)) {
          var h = we,
            g;
          if ((g = h)) {
            e: {
              for (g = h, h = Ct; g.nodeType !== 8; ) {
                if (!h) {
                  h = null;
                  break e;
                }
                if (((g = wt(g.nextSibling)), g === null)) {
                  h = null;
                  break e;
                }
              }
              h = g;
            }
            h !== null
              ? ((t.memoizedState = {
                  dehydrated: h,
                  treeContext: Ln !== null ? { id: Zt, overflow: kt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (g = rt(18, null, null, 0)),
                (g.stateNode = h),
                (g.return = t),
                (t.child = g),
                (We = t),
                (we = null),
                (g = !0))
              : (g = !1);
          }
          g || Gn(t);
        }
        if (
          ((h = t.memoizedState),
          h !== null && ((h = h.dehydrated), h !== null))
        )
          return (Dr(h) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        Ft(t);
      }
      return (
        (h = l.children),
        (l = l.fallback),
        a
          ? (yn(),
            (a = t.mode),
            (h = Bi({ mode: "hidden", children: h }, a)),
            (l = Hn(l, a, n, null)),
            (h.return = t),
            (l.return = t),
            (h.sibling = l),
            (t.child = h),
            (a = t.child),
            (a.memoizedState = Js(n)),
            (a.childLanes = $s(e, o, n)),
            (t.memoizedState = Ks),
            l)
          : (pn(t), Fs(t, h))
      );
    }
    if (
      ((g = e.memoizedState), g !== null && ((h = g.dehydrated), h !== null))
    ) {
      if (r)
        t.flags & 256
          ? (pn(t), (t.flags &= -257), (t = Ws(e, t, n)))
          : t.memoizedState !== null
            ? (yn(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (yn(),
              (a = l.fallback),
              (h = t.mode),
              (l = Bi({ mode: "visible", children: l.children }, h)),
              (a = Hn(a, h, n, null)),
              (a.flags |= 2),
              (l.return = t),
              (a.return = t),
              (l.sibling = a),
              (t.child = l),
              Tl(t, e.child, null, n),
              (l = t.child),
              (l.memoizedState = Js(n)),
              (l.childLanes = $s(e, o, n)),
              (t.memoizedState = Ks),
              (t = a));
      else if ((pn(t), Dr(h))) {
        if (((o = h.nextSibling && h.nextSibling.dataset), o)) var R = o.dgst;
        ((o = R),
          (l = Error(u(419))),
          (l.stack = ""),
          (l.digest = o),
          aa({ value: l, source: null, stack: null }),
          (t = Ws(e, t, n)));
      } else if (
        (Ye || ia(e, t, n, !1), (o = (n & e.childLanes) !== 0), Ye || o)
      ) {
        if (
          ((o = Ee),
          o !== null &&
            ((l = n & -n),
            (l = (l & 42) !== 0 ? 1 : zu(l)),
            (l = (l & (o.suspendedLanes | n)) !== 0 ? 0 : l),
            l !== 0 && l !== g.retryLane))
        )
          throw ((g.retryLane = l), dl(e, l), dt(o, e, l), Lf);
        (h.data === "$?" || pr(), (t = Ws(e, t, n)));
      } else
        h.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = g.treeContext),
            (we = wt(h.nextSibling)),
            (We = t),
            (de = !0),
            (Vn = null),
            (Ct = !1),
            e !== null &&
              ((bt[St++] = Zt),
              (bt[St++] = kt),
              (bt[St++] = Ln),
              (Zt = e.id),
              (kt = e.overflow),
              (Ln = t)),
            (t = Fs(t, l.children)),
            (t.flags |= 4096));
      return t;
    }
    return a
      ? (yn(),
        (a = l.fallback),
        (h = t.mode),
        (g = e.child),
        (R = g.sibling),
        (l = Qt(g, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = g.subtreeFlags & 65011712),
        R !== null ? (a = Qt(R, a)) : ((a = Hn(a, h, n, null)), (a.flags |= 2)),
        (a.return = t),
        (l.return = t),
        (l.sibling = a),
        (t.child = l),
        (l = a),
        (a = t.child),
        (h = e.child.memoizedState),
        h === null
          ? (h = Js(n))
          : ((g = h.cachePool),
            g !== null
              ? ((R = Ue._currentValue),
                (g = g.parent !== R ? { parent: R, pool: R } : g))
              : (g = zo()),
            (h = { baseLanes: h.baseLanes | n, cachePool: g })),
        (a.memoizedState = h),
        (a.childLanes = $s(e, o, n)),
        (t.memoizedState = Ks),
        l)
      : (pn(t),
        (n = e.child),
        (e = n.sibling),
        (n = Qt(n, { mode: "visible", children: l.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((o = t.deletions),
          o === null ? ((t.deletions = [e]), (t.flags |= 16)) : o.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function Fs(e, t) {
    return (
      (t = Bi({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Bi(e, t) {
    return (
      (e = rt(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Ws(e, t, n) {
    return (
      Tl(t, e.child, null, n),
      (e = Fs(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function $f(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    (l !== null && (l.lanes |= t), ps(e.return, t, n));
  }
  function Ps(e, t, n, l, a) {
    var r = e.memoizedState;
    r === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: n,
          tailMode: a,
        })
      : ((r.isBackwards = t),
        (r.rendering = null),
        (r.renderingStartTime = 0),
        (r.last = l),
        (r.tail = n),
        (r.tailMode = a));
  }
  function Ff(e, t, n) {
    var l = t.pendingProps,
      a = l.revealOrder,
      r = l.tail;
    if ((Xe(e, t, l.children, n), (l = Be.current), (l & 2) !== 0))
      ((l = (l & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && $f(e, n, t);
          else if (e.tag === 19) $f(e, n, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      l &= 1;
    }
    switch ((V(Be, l), a)) {
      case "forwards":
        for (n = t.child, a = null; n !== null; )
          ((e = n.alternate),
            e !== null && Di(e) === null && (a = n),
            (n = n.sibling));
        ((n = a),
          n === null
            ? ((a = t.child), (t.child = null))
            : ((a = n.sibling), (n.sibling = null)),
          Ps(t, !1, a, n, r));
        break;
      case "backwards":
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (((e = a.alternate), e !== null && Di(e) === null)) {
            t.child = a;
            break;
          }
          ((e = a.sibling), (a.sibling = n), (n = a), (a = e));
        }
        Ps(t, !0, n, null, r);
        break;
      case "together":
        Ps(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Wt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (xn |= t.lanes),
      (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((ia(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(u(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Qt(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        ((e = e.sibling),
          (n = n.sibling = Qt(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function Is(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && yi(e)));
  }
  function t0(e, t, n) {
    switch (t.tag) {
      case 3:
        (_e(t, t.stateNode.containerInfo),
          on(t, Ue, e.memoizedState.cache),
          la());
        break;
      case 27:
      case 5:
        Nu(t);
        break;
      case 4:
        _e(t, t.stateNode.containerInfo);
        break;
      case 10:
        on(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (pn(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? Jf(e, t, n)
              : (pn(t), (e = Wt(e, t, n)), e !== null ? e.sibling : null);
        pn(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (
          ((l = (n & t.childLanes) !== 0),
          l || (ia(e, t, n, !1), (l = (n & t.childLanes) !== 0)),
          a)
        ) {
          if (l) return Ff(e, t, n);
          t.flags |= 128;
        }
        if (
          ((a = t.memoizedState),
          a !== null &&
            ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
          V(Be, Be.current),
          l)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Xf(e, t, n));
      case 24:
        on(t, Ue, e.memoizedState.cache);
    }
    return Wt(e, t, n);
  }
  function Wf(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Ye = !0;
      else {
        if (!Is(e, n) && (t.flags & 128) === 0) return ((Ye = !1), t0(e, t, n));
        Ye = (e.flags & 131072) !== 0;
      }
    else ((Ye = !1), de && (t.flags & 1048576) !== 0 && Ro(t, pi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var l = t.elementType,
            a = l._init;
          if (((l = a(l._payload)), (t.type = l), typeof l == "function"))
            rs(l)
              ? ((e = Kn(l, e)), (t.tag = 1), (t = kf(null, t, l, e, n)))
              : ((t.tag = 0), (t = ks(null, t, l, e, n)));
          else {
            if (l != null) {
              if (((a = l.$$typeof), a === oe)) {
                ((t.tag = 11), (t = Yf(null, t, l, e, n)));
                break e;
              } else if (a === be) {
                ((t.tag = 14), (t = Vf(null, t, l, e, n)));
                break e;
              }
            }
            throw ((t = Vt(l) || l), Error(u(306, t, "")));
          }
        }
        return t;
      case 0:
        return ks(e, t, t.type, t.pendingProps, n);
      case 1:
        return ((l = t.type), (a = Kn(l, t.pendingProps)), kf(e, t, l, a, n));
      case 3:
        e: {
          if ((_e(t, t.stateNode.containerInfo), e === null))
            throw Error(u(387));
          l = t.pendingProps;
          var r = t.memoizedState;
          ((a = r.element), Es(e, t), ha(t, l, null, n));
          var o = t.memoizedState;
          if (
            ((l = o.cache),
            on(t, Ue, l),
            l !== r.cache && ys(t, [Ue], n, !0),
            fa(),
            (l = o.element),
            r.isDehydrated)
          )
            if (
              ((r = { element: l, isDehydrated: !1, cache: o.cache }),
              (t.updateQueue.baseState = r),
              (t.memoizedState = r),
              t.flags & 256)
            ) {
              t = Kf(e, t, l, n);
              break e;
            } else if (l !== a) {
              ((a = gt(Error(u(424)), t)), aa(a), (t = Kf(e, t, l, n)));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                we = wt(e.firstChild),
                  We = t,
                  de = !0,
                  Vn = null,
                  Ct = !0,
                  n = Of(t, null, l, n),
                  t.child = n;
                n;

              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            }
          else {
            if ((la(), l === a)) {
              t = Wt(e, t, n);
              break e;
            }
            Xe(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Ui(e, t),
          e === null
            ? (n = td(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : de ||
                ((n = t.type),
                (e = t.pendingProps),
                (l = Fi(ne.current).createElement(n)),
                (l[ke] = t),
                (l[Ie] = e),
                Ze(l, n, e),
                Le(l),
                (t.stateNode = l))
            : (t.memoizedState = td(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Nu(t),
          e === null &&
            de &&
            ((l = t.stateNode = Ph(t.type, t.pendingProps, ne.current)),
            (We = t),
            (Ct = !0),
            (a = we),
            An(t.type) ? ((zr = a), (we = wt(l.firstChild))) : (we = a)),
          Xe(e, t, t.pendingProps.children, n),
          Ui(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            de &&
            ((a = l = we) &&
              ((l = O0(l, t.type, t.pendingProps, Ct)),
              l !== null
                ? ((t.stateNode = l),
                  (We = t),
                  (we = wt(l.firstChild)),
                  (Ct = !1),
                  (a = !0))
                : (a = !1)),
            a || Gn(t)),
          Nu(t),
          (a = t.type),
          (r = t.pendingProps),
          (o = e !== null ? e.memoizedProps : null),
          (l = r.children),
          Or(a, r) ? (l = null) : o !== null && Or(a, o) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((a = Ns(e, t, Kp, null, null, n)), (ja._currentValue = a)),
          Ui(e, t),
          Xe(e, t, l, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            de &&
            ((e = n = we) &&
              ((n = C0(n, t.pendingProps, Ct)),
              n !== null
                ? ((t.stateNode = n), (We = t), (we = null), (e = !0))
                : (e = !1)),
            e || Gn(t)),
          null
        );
      case 13:
        return Jf(e, t, n);
      case 4:
        return (
          _e(t, t.stateNode.containerInfo),
          (l = t.pendingProps),
          e === null ? (t.child = Tl(t, null, l, n)) : Xe(e, t, l, n),
          t.child
        );
      case 11:
        return Yf(e, t, t.type, t.pendingProps, n);
      case 7:
        return (Xe(e, t, t.pendingProps, n), t.child);
      case 8:
        return (Xe(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (Xe(e, t, t.pendingProps.children, n), t.child);
      case 10:
        return (
          (l = t.pendingProps),
          on(t, t.type, l.value),
          Xe(e, t, l.children, n),
          t.child
        );
      case 9:
        return (
          (a = t.type._context),
          (l = t.pendingProps.children),
          Qn(t),
          (a = Ke(a)),
          (l = l(a)),
          (t.flags |= 1),
          Xe(e, t, l, n),
          t.child
        );
      case 14:
        return Vf(e, t, t.type, t.pendingProps, n);
      case 15:
        return Gf(e, t, t.type, t.pendingProps, n);
      case 19:
        return Ff(e, t, n);
      case 31:
        return (
          (l = t.pendingProps),
          (n = t.mode),
          (l = { mode: l.mode, children: l.children }),
          e === null
            ? ((n = Bi(l, n)),
              (n.ref = t.ref),
              (t.child = n),
              (n.return = t),
              (t = n))
            : ((n = Qt(e.child, l)),
              (n.ref = t.ref),
              (t.child = n),
              (n.return = t),
              (t = n)),
          t
        );
      case 22:
        return Xf(e, t, n);
      case 24:
        return (
          Qn(t),
          (l = Ke(Ue)),
          e === null
            ? ((a = bs()),
              a === null &&
                ((a = Ee),
                (r = gs()),
                (a.pooledCache = r),
                r.refCount++,
                r !== null && (a.pooledCacheLanes |= n),
                (a = r)),
              (t.memoizedState = { parent: l, cache: a }),
              xs(t),
              on(t, Ue, a))
            : ((e.lanes & n) !== 0 && (Es(e, t), ha(t, null, null, n), fa()),
              (a = e.memoizedState),
              (r = t.memoizedState),
              a.parent !== l
                ? ((a = { parent: l, cache: l }),
                  (t.memoizedState = a),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = a),
                  on(t, Ue, l))
                : ((l = r.cache),
                  on(t, Ue, l),
                  l !== a.cache && ys(t, [Ue], n, !0))),
          Xe(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function Pt(e) {
    e.flags |= 4;
  }
  function Pf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !ud(t))) {
      if (
        ((t = xt.current),
        t !== null &&
          ((ce & 4194048) === ce
            ? Mt !== null
            : ((ce & 62914560) !== ce && (ce & 536870912) === 0) || t !== Mt))
      )
        throw ((ca = Ss), jo);
      e.flags |= 8192;
    }
  }
  function qi(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Nc() : 536870912), (e.lanes |= t), (Nl |= t)));
  }
  function ba(e, t) {
    if (!de)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var l = null; n !== null; )
            (n.alternate !== null && (l = n), (n = n.sibling));
          l === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function Ae(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      l = 0;
    if (t)
      for (var a = e.child; a !== null; )
        ((n |= a.lanes | a.childLanes),
          (l |= a.subtreeFlags & 65011712),
          (l |= a.flags & 65011712),
          (a.return = e),
          (a = a.sibling));
    else
      for (a = e.child; a !== null; )
        ((n |= a.lanes | a.childLanes),
          (l |= a.subtreeFlags),
          (l |= a.flags),
          (a.return = e),
          (a = a.sibling));
    return ((e.subtreeFlags |= l), (e.childLanes = n), t);
  }
  function n0(e, t, n) {
    var l = t.pendingProps;
    switch ((hs(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ae(t), null);
      case 1:
        return (Ae(t), null);
      case 3:
        return (
          (n = t.stateNode),
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Jt(Ue),
          un(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (na(t)
              ? Pt(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Oo())),
          Ae(t),
          null
        );
      case 26:
        return (
          (n = t.memoizedState),
          e === null
            ? (Pt(t),
              n !== null ? (Ae(t), Pf(t, n)) : (Ae(t), (t.flags &= -16777217)))
            : n
              ? n !== e.memoizedState
                ? (Pt(t), Ae(t), Pf(t, n))
                : (Ae(t), (t.flags &= -16777217))
              : (e.memoizedProps !== l && Pt(t), Ae(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        (Ja(t), (n = ne.current));
        var a = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== l && Pt(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(u(166));
            return (Ae(t), null);
          }
          ((e = W.current),
            na(t) ? wo(t) : ((e = Ph(a, l, n)), (t.stateNode = e), Pt(t)));
        }
        return (Ae(t), null);
      case 5:
        if ((Ja(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && Pt(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(u(166));
            return (Ae(t), null);
          }
          if (((e = W.current), na(t))) wo(t);
          else {
            switch (((a = Fi(ne.current)), e)) {
              case 1:
                e = a.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                e = a.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    e = a.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    e = a.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    ((e = a.createElement("div")),
                      (e.innerHTML = "<script><\/script>"),
                      (e = e.removeChild(e.firstChild)));
                    break;
                  case "select":
                    ((e =
                      typeof l.is == "string"
                        ? a.createElement("select", { is: l.is })
                        : a.createElement("select")),
                      l.multiple
                        ? (e.multiple = !0)
                        : l.size && (e.size = l.size));
                    break;
                  default:
                    e =
                      typeof l.is == "string"
                        ? a.createElement(n, { is: l.is })
                        : a.createElement(n);
                }
            }
            ((e[ke] = t), (e[Ie] = l));
            e: for (a = t.child; a !== null; ) {
              if (a.tag === 5 || a.tag === 6) e.appendChild(a.stateNode);
              else if (a.tag !== 4 && a.tag !== 27 && a.child !== null) {
                ((a.child.return = a), (a = a.child));
                continue;
              }
              if (a === t) break e;
              for (; a.sibling === null; ) {
                if (a.return === null || a.return === t) break e;
                a = a.return;
              }
              ((a.sibling.return = a.return), (a = a.sibling));
            }
            t.stateNode = e;
            e: switch ((Ze(e, n, l), n)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!l.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Pt(t);
          }
        }
        return (Ae(t), (t.flags &= -16777217), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== l && Pt(t);
        else {
          if (typeof l != "string" && t.stateNode === null) throw Error(u(166));
          if (((e = ne.current), na(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (l = null),
              (a = We),
              a !== null)
            )
              switch (a.tag) {
                case 27:
                case 5:
                  l = a.memoizedProps;
              }
            ((e[ke] = t),
              (e = !!(
                e.nodeValue === n ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                Zh(e.nodeValue, n)
              )),
              e || Gn(t));
          } else
            ((e = Fi(e).createTextNode(l)), (e[ke] = t), (t.stateNode = e));
        }
        return (Ae(t), null);
      case 13:
        if (
          ((l = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((a = na(t)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!a) throw Error(u(318));
              if (
                ((a = t.memoizedState),
                (a = a !== null ? a.dehydrated : null),
                !a)
              )
                throw Error(u(317));
              a[ke] = t;
            } else
              (la(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Ae(t), (a = !1));
          } else
            ((a = Oo()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = a),
              (a = !0));
          if (!a) return t.flags & 256 ? (Ft(t), t) : (Ft(t), null);
        }
        if ((Ft(t), (t.flags & 128) !== 0)) return ((t.lanes = n), t);
        if (
          ((n = l !== null), (e = e !== null && e.memoizedState !== null), n)
        ) {
          ((l = t.child),
            (a = null),
            l.alternate !== null &&
              l.alternate.memoizedState !== null &&
              l.alternate.memoizedState.cachePool !== null &&
              (a = l.alternate.memoizedState.cachePool.pool));
          var r = null;
          (l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (r = l.memoizedState.cachePool.pool),
            r !== a && (l.flags |= 2048));
        }
        return (
          n !== e && n && (t.child.flags |= 8192),
          qi(t, t.updateQueue),
          Ae(t),
          null
        );
      case 4:
        return (un(), e === null && Tr(t.stateNode.containerInfo), Ae(t), null);
      case 10:
        return (Jt(t.type), Ae(t), null);
      case 19:
        if ((Q(Be), (a = t.memoizedState), a === null)) return (Ae(t), null);
        if (((l = (t.flags & 128) !== 0), (r = a.rendering), r === null))
          if (l) ba(a, !1);
          else {
            if (Ne !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((r = Di(e)), r !== null)) {
                  for (
                    t.flags |= 128,
                      ba(a, !1),
                      e = r.updateQueue,
                      t.updateQueue = e,
                      qi(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;

                  )
                    (Ao(n, e), (n = n.sibling));
                  return (V(Be, (Be.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            a.tail !== null &&
              Ot() > Yi &&
              ((t.flags |= 128), (l = !0), ba(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!l)
            if (((e = Di(r)), e !== null)) {
              if (
                ((t.flags |= 128),
                (l = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                qi(t, e),
                ba(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !r.alternate &&
                  !de)
              )
                return (Ae(t), null);
            } else
              2 * Ot() - a.renderingStartTime > Yi &&
                n !== 536870912 &&
                ((t.flags |= 128), (l = !0), ba(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((r.sibling = t.child), (t.child = r))
            : ((e = a.last),
              e !== null ? (e.sibling = r) : (t.child = r),
              (a.last = r));
        }
        return a.tail !== null
          ? ((t = a.tail),
            (a.rendering = t),
            (a.tail = t.sibling),
            (a.renderingStartTime = Ot()),
            (t.sibling = null),
            (e = Be.current),
            V(Be, l ? (e & 1) | 2 : e & 1),
            t)
          : (Ae(t), null);
      case 22:
      case 23:
        return (
          Ft(t),
          Rs(),
          (l = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== l && (t.flags |= 8192)
            : l && (t.flags |= 8192),
          l
            ? (n & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Ae(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ae(t),
          (n = t.updateQueue),
          n !== null && qi(t, n.retryQueue),
          (n = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          (l = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          l !== n && (t.flags |= 2048),
          e !== null && Q(Zn),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Jt(Ue),
          Ae(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function l0(e, t) {
    switch ((hs(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Jt(Ue),
          un(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (Ja(t), null);
      case 13:
        if (
          (Ft(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(u(340));
          la();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (Q(Be), null);
      case 4:
        return (un(), null);
      case 10:
        return (Jt(t.type), null);
      case 22:
      case 23:
        return (
          Ft(t),
          Rs(),
          e !== null && Q(Zn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Jt(Ue), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function If(e, t) {
    switch ((hs(t), t.tag)) {
      case 3:
        (Jt(Ue), un());
        break;
      case 26:
      case 27:
      case 5:
        Ja(t);
        break;
      case 4:
        un();
        break;
      case 13:
        Ft(t);
        break;
      case 19:
        Q(Be);
        break;
      case 10:
        Jt(t.type);
        break;
      case 22:
      case 23:
        (Ft(t), Rs(), e !== null && Q(Zn));
        break;
      case 24:
        Jt(Ue);
    }
  }
  function Sa(e, t) {
    try {
      var n = t.updateQueue,
        l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var a = l.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var r = n.create,
              o = n.inst;
            ((l = r()), (o.destroy = l));
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (h) {
      Se(t, t.return, h);
    }
  }
  function gn(e, t, n) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var r = a.next;
        l = r;
        do {
          if ((l.tag & e) === e) {
            var o = l.inst,
              h = o.destroy;
            if (h !== void 0) {
              ((o.destroy = void 0), (a = t));
              var g = n,
                R = h;
              try {
                R();
              } catch (C) {
                Se(a, g, C);
              }
            }
          }
          l = l.next;
        } while (l !== r);
      }
    } catch (C) {
      Se(t, t.return, C);
    }
  }
  function eh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Yo(t, n);
      } catch (l) {
        Se(e, e.return, l);
      }
    }
  }
  function th(e, t, n) {
    ((n.props = Kn(e.type, e.memoizedProps)), (n.state = e.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (l) {
      Se(e, t, l);
    }
  }
  function xa(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? (e.refCleanup = n(l)) : (n.current = l);
      }
    } catch (a) {
      Se(e, t, a);
    }
  }
  function Dt(e, t) {
    var n = e.ref,
      l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (a) {
          Se(e, t, a);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (a) {
          Se(e, t, a);
        }
      else n.current = null;
  }
  function nh(e) {
    var t = e.type,
      n = e.memoizedProps,
      l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break e;
        case "img":
          n.src ? (l.src = n.src) : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (a) {
      Se(e, e.return, a);
    }
  }
  function er(e, t, n) {
    try {
      var l = e.stateNode;
      (T0(l, e.type, n, t), (l[Ie] = t));
    } catch (a) {
      Se(e, e.return, a);
    }
  }
  function lh(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && An(e.type)) ||
      e.tag === 4
    );
  }
  function tr(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || lh(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && An(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function nr(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      ((e = e.stateNode),
        t
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n
            ).insertBefore(e, t)
          : ((t =
              n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                  ? n.ownerDocument.body
                  : n),
            t.appendChild(e),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = $i)));
    else if (
      l !== 4 &&
      (l === 27 && An(e.type) && ((n = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (nr(e, t, n), e = e.sibling; e !== null; )
        (nr(e, t, n), (e = e.sibling));
  }
  function Hi(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (
      l !== 4 &&
      (l === 27 && An(e.type) && (n = e.stateNode), (e = e.child), e !== null)
    )
      for (Hi(e, t, n), e = e.sibling; e !== null; )
        (Hi(e, t, n), (e = e.sibling));
  }
  function ah(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var l = e.type, a = t.attributes; a.length; )
        t.removeAttributeNode(a[0]);
      (Ze(t, l, n), (t[ke] = e), (t[Ie] = n));
    } catch (r) {
      Se(e, e.return, r);
    }
  }
  var It = !1,
    Me = !1,
    lr = !1,
    ih = typeof WeakSet == "function" ? WeakSet : Set,
    Ve = null;
  function a0(e, t) {
    if (((e = e.containerInfo), (wr = nu), (e = po(e)), ts(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var a = l.anchorOffset,
              r = l.focusNode;
            l = l.focusOffset;
            try {
              (n.nodeType, r.nodeType);
            } catch {
              n = null;
              break e;
            }
            var o = 0,
              h = -1,
              g = -1,
              R = 0,
              C = 0,
              z = e,
              N = null;
            t: for (;;) {
              for (
                var O;
                z !== n || (a !== 0 && z.nodeType !== 3) || (h = o + a),
                  z !== r || (l !== 0 && z.nodeType !== 3) || (g = o + l),
                  z.nodeType === 3 && (o += z.nodeValue.length),
                  (O = z.firstChild) !== null;

              )
                ((N = z), (z = O));
              for (;;) {
                if (z === e) break t;
                if (
                  (N === n && ++R === a && (h = o),
                  N === r && ++C === l && (g = o),
                  (O = z.nextSibling) !== null)
                )
                  break;
                ((z = N), (N = z.parentNode));
              }
              z = O;
            }
            n = h === -1 || g === -1 ? null : { start: h, end: g };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Nr = { focusedElem: e, selectionRange: n }, nu = !1, Ve = t;
      Ve !== null;

    )
      if (
        ((t = Ve), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        ((e.return = t), (Ve = e));
      else
        for (; Ve !== null; ) {
          switch (((t = Ve), (r = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && r !== null) {
                ((e = void 0),
                  (n = t),
                  (a = r.memoizedProps),
                  (r = r.memoizedState),
                  (l = n.stateNode));
                try {
                  var ee = Kn(n.type, a, n.elementType === n.type);
                  ((e = l.getSnapshotBeforeUpdate(ee, r)),
                    (l.__reactInternalSnapshotBeforeUpdate = e));
                } catch (P) {
                  Se(n, n.return, P);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  Mr(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Mr(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (Ve = e));
            break;
          }
          Ve = t.return;
        }
  }
  function uh(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (vn(e, n), l & 4 && Sa(5, n));
        break;
      case 1:
        if ((vn(e, n), l & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (o) {
              Se(n, n.return, o);
            }
          else {
            var a = Kn(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (o) {
              Se(n, n.return, o);
            }
          }
        (l & 64 && eh(n), l & 512 && xa(n, n.return));
        break;
      case 3:
        if ((vn(e, n), l & 64 && ((e = n.updateQueue), e !== null))) {
          if (((t = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Yo(e, t);
          } catch (o) {
            Se(n, n.return, o);
          }
        }
        break;
      case 27:
        t === null && l & 4 && ah(n);
      case 26:
      case 5:
        (vn(e, n), t === null && l & 4 && nh(n), l & 512 && xa(n, n.return));
        break;
      case 12:
        vn(e, n);
        break;
      case 13:
        (vn(e, n),
          l & 4 && ch(e, n),
          l & 64 &&
            ((e = n.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((n = d0.bind(null, n)), M0(e, n)))));
        break;
      case 22:
        if (((l = n.memoizedState !== null || It), !l)) {
          ((t = (t !== null && t.memoizedState !== null) || Me), (a = It));
          var r = Me;
          ((It = l),
            (Me = t) && !r ? bn(e, n, (n.subtreeFlags & 8772) !== 0) : vn(e, n),
            (It = a),
            (Me = r));
        }
        break;
      case 30:
        break;
      default:
        vn(e, n);
    }
  }
  function sh(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), sh(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Bu(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Te = null,
    nt = !1;
  function en(e, t, n) {
    for (n = n.child; n !== null; ) (rh(e, t, n), (n = n.sibling));
  }
  function rh(e, t, n) {
    if (it && typeof it.onCommitFiberUnmount == "function")
      try {
        it.onCommitFiberUnmount(Gl, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (Me || Dt(n, t),
          en(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        Me || Dt(n, t);
        var l = Te,
          a = nt;
        (An(n.type) && ((Te = n.stateNode), (nt = !1)),
          en(e, t, n),
          Ca(n.stateNode),
          (Te = l),
          (nt = a));
        break;
      case 5:
        Me || Dt(n, t);
      case 6:
        if (
          ((l = Te),
          (a = nt),
          (Te = null),
          en(e, t, n),
          (Te = l),
          (nt = a),
          Te !== null)
        )
          if (nt)
            try {
              (Te.nodeType === 9
                ? Te.body
                : Te.nodeName === "HTML"
                  ? Te.ownerDocument.body
                  : Te
              ).removeChild(n.stateNode);
            } catch (r) {
              Se(n, t, r);
            }
          else
            try {
              Te.removeChild(n.stateNode);
            } catch (r) {
              Se(n, t, r);
            }
        break;
      case 18:
        Te !== null &&
          (nt
            ? ((e = Te),
              Fh(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                n.stateNode
              ),
              Ha(e))
            : Fh(Te, n.stateNode));
        break;
      case 4:
        ((l = Te),
          (a = nt),
          (Te = n.stateNode.containerInfo),
          (nt = !0),
          en(e, t, n),
          (Te = l),
          (nt = a));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Me || gn(2, n, t), Me || gn(4, n, t), en(e, t, n));
        break;
      case 1:
        (Me ||
          (Dt(n, t),
          (l = n.stateNode),
          typeof l.componentWillUnmount == "function" && th(n, t, l)),
          en(e, t, n));
        break;
      case 21:
        en(e, t, n);
        break;
      case 22:
        ((Me = (l = Me) || n.memoizedState !== null), en(e, t, n), (Me = l));
        break;
      default:
        en(e, t, n);
    }
  }
  function ch(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Ha(e);
      } catch (n) {
        Se(t, t.return, n);
      }
  }
  function i0(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new ih()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new ih()),
          t
        );
      default:
        throw Error(u(435, e.tag));
    }
  }
  function ar(e, t) {
    var n = i0(e);
    t.forEach(function (l) {
      var a = m0.bind(null, e, l);
      n.has(l) || (n.add(l), l.then(a, a));
    });
  }
  function ct(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l],
          r = e,
          o = t,
          h = o;
        e: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (An(h.type)) {
                ((Te = h.stateNode), (nt = !1));
                break e;
              }
              break;
            case 5:
              ((Te = h.stateNode), (nt = !1));
              break e;
            case 3:
            case 4:
              ((Te = h.stateNode.containerInfo), (nt = !0));
              break e;
          }
          h = h.return;
        }
        if (Te === null) throw Error(u(160));
        (rh(r, o, a),
          (Te = null),
          (nt = !1),
          (r = a.alternate),
          r !== null && (r.return = null),
          (a.return = null));
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) (oh(t, e), (t = t.sibling));
  }
  var Rt = null;
  function oh(e, t) {
    var n = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ct(t, e),
          ot(e),
          l & 4 && (gn(3, e, e.return), Sa(3, e), gn(5, e, e.return)));
        break;
      case 1:
        (ct(t, e),
          ot(e),
          l & 512 && (Me || n === null || Dt(n, n.return)),
          l & 64 &&
            It &&
            ((e = e.updateQueue),
            e !== null &&
              ((l = e.callbacks),
              l !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? l : n.concat(l))))));
        break;
      case 26:
        var a = Rt;
        if (
          (ct(t, e),
          ot(e),
          l & 512 && (Me || n === null || Dt(n, n.return)),
          l & 4)
        ) {
          var r = n !== null ? n.memoizedState : null;
          if (((l = e.memoizedState), n === null))
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  ((l = e.type),
                    (n = e.memoizedProps),
                    (a = a.ownerDocument || a));
                  t: switch (l) {
                    case "title":
                      ((r = a.getElementsByTagName("title")[0]),
                        (!r ||
                          r[Zl] ||
                          r[ke] ||
                          r.namespaceURI === "http://www.w3.org/2000/svg" ||
                          r.hasAttribute("itemprop")) &&
                          ((r = a.createElement(l)),
                          a.head.insertBefore(
                            r,
                            a.querySelector("head > title")
                          )),
                        Ze(r, l, n),
                        (r[ke] = e),
                        Le(r),
                        (l = r));
                      break e;
                    case "link":
                      var o = ad("link", "href", a).get(l + (n.href || ""));
                      if (o) {
                        for (var h = 0; h < o.length; h++)
                          if (
                            ((r = o[h]),
                            r.getAttribute("href") ===
                              (n.href == null || n.href === ""
                                ? null
                                : n.href) &&
                              r.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              r.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              r.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            o.splice(h, 1);
                            break t;
                          }
                      }
                      ((r = a.createElement(l)),
                        Ze(r, l, n),
                        a.head.appendChild(r));
                      break;
                    case "meta":
                      if (
                        (o = ad("meta", "content", a).get(
                          l + (n.content || "")
                        ))
                      ) {
                        for (h = 0; h < o.length; h++)
                          if (
                            ((r = o[h]),
                            r.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              r.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              r.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              r.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              r.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            o.splice(h, 1);
                            break t;
                          }
                      }
                      ((r = a.createElement(l)),
                        Ze(r, l, n),
                        a.head.appendChild(r));
                      break;
                    default:
                      throw Error(u(468, l));
                  }
                  ((r[ke] = e), Le(r), (l = r));
                }
                e.stateNode = l;
              } else id(a, e.type, e.stateNode);
            else e.stateNode = ld(a, l, e.memoizedProps);
          else
            r !== l
              ? (r === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : r.count--,
                l === null
                  ? id(a, e.type, e.stateNode)
                  : ld(a, l, e.memoizedProps))
              : l === null &&
                e.stateNode !== null &&
                er(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (ct(t, e),
          ot(e),
          l & 512 && (Me || n === null || Dt(n, n.return)),
          n !== null && l & 4 && er(e, e.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if (
          (ct(t, e),
          ot(e),
          l & 512 && (Me || n === null || Dt(n, n.return)),
          e.flags & 32)
        ) {
          a = e.stateNode;
          try {
            ul(a, "");
          } catch (O) {
            Se(e, e.return, O);
          }
        }
        (l & 4 &&
          e.stateNode != null &&
          ((a = e.memoizedProps), er(e, a, n !== null ? n.memoizedProps : a)),
          l & 1024 && (lr = !0));
        break;
      case 6:
        if ((ct(t, e), ot(e), l & 4)) {
          if (e.stateNode === null) throw Error(u(162));
          ((l = e.memoizedProps), (n = e.stateNode));
          try {
            n.nodeValue = l;
          } catch (O) {
            Se(e, e.return, O);
          }
        }
        break;
      case 3:
        if (
          ((Ii = null),
          (a = Rt),
          (Rt = Wi(t.containerInfo)),
          ct(t, e),
          (Rt = a),
          ot(e),
          l & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Ha(t.containerInfo);
          } catch (O) {
            Se(e, e.return, O);
          }
        lr && ((lr = !1), fh(e));
        break;
      case 4:
        ((l = Rt),
          (Rt = Wi(e.stateNode.containerInfo)),
          ct(t, e),
          ot(e),
          (Rt = l));
        break;
      case 12:
        (ct(t, e), ot(e));
        break;
      case 13:
        (ct(t, e),
          ot(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (or = Ot()),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), ar(e, l))));
        break;
      case 22:
        a = e.memoizedState !== null;
        var g = n !== null && n.memoizedState !== null,
          R = It,
          C = Me;
        if (
          ((It = R || a),
          (Me = C || g),
          ct(t, e),
          (Me = C),
          (It = R),
          ot(e),
          l & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = a ? t._visibility & -2 : t._visibility | 1,
              a && (n === null || g || It || Me || Jn(e)),
              n = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                g = n = t;
                try {
                  if (((r = g.stateNode), a))
                    ((o = r.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"));
                  else {
                    h = g.stateNode;
                    var z = g.memoizedProps.style,
                      N =
                        z != null && z.hasOwnProperty("display")
                          ? z.display
                          : null;
                    h.style.display =
                      N == null || typeof N == "boolean" ? "" : ("" + N).trim();
                  }
                } catch (O) {
                  Se(g, g.return, O);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                g = t;
                try {
                  g.stateNode.nodeValue = a ? "" : g.memoizedProps;
                } catch (O) {
                  Se(g, g.return, O);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (n === t && (n = null), (t = t.return));
            }
            (n === t && (n = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        l & 4 &&
          ((l = e.updateQueue),
          l !== null &&
            ((n = l.retryQueue),
            n !== null && ((l.retryQueue = null), ar(e, n))));
        break;
      case 19:
        (ct(t, e),
          ot(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), ar(e, l))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (ct(t, e), ot(e));
    }
  }
  function ot(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (lh(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(u(160));
        switch (n.tag) {
          case 27:
            var a = n.stateNode,
              r = tr(e);
            Hi(e, r, a);
            break;
          case 5:
            var o = n.stateNode;
            n.flags & 32 && (ul(o, ""), (n.flags &= -33));
            var h = tr(e);
            Hi(e, h, o);
            break;
          case 3:
          case 4:
            var g = n.stateNode.containerInfo,
              R = tr(e);
            nr(e, R, g);
            break;
          default:
            throw Error(u(161));
        }
      } catch (C) {
        Se(e, e.return, C);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function fh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (fh(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function vn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (uh(e, t.alternate, t), (t = t.sibling));
  }
  function Jn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (gn(4, t, t.return), Jn(t));
          break;
        case 1:
          Dt(t, t.return);
          var n = t.stateNode;
          (typeof n.componentWillUnmount == "function" && th(t, t.return, n),
            Jn(t));
          break;
        case 27:
          Ca(t.stateNode);
        case 26:
        case 5:
          (Dt(t, t.return), Jn(t));
          break;
        case 22:
          t.memoizedState === null && Jn(t);
          break;
        case 30:
          Jn(t);
          break;
        default:
          Jn(t);
      }
      e = e.sibling;
    }
  }
  function bn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate,
        a = e,
        r = t,
        o = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          (bn(a, r, n), Sa(4, r));
          break;
        case 1:
          if (
            (bn(a, r, n),
            (l = r),
            (a = l.stateNode),
            typeof a.componentDidMount == "function")
          )
            try {
              a.componentDidMount();
            } catch (R) {
              Se(l, l.return, R);
            }
          if (((l = r), (a = l.updateQueue), a !== null)) {
            var h = l.stateNode;
            try {
              var g = a.shared.hiddenCallbacks;
              if (g !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < g.length; a++)
                  Lo(g[a], h);
            } catch (R) {
              Se(l, l.return, R);
            }
          }
          (n && o & 64 && eh(r), xa(r, r.return));
          break;
        case 27:
          ah(r);
        case 26:
        case 5:
          (bn(a, r, n), n && l === null && o & 4 && nh(r), xa(r, r.return));
          break;
        case 12:
          bn(a, r, n);
          break;
        case 13:
          (bn(a, r, n), n && o & 4 && ch(a, r));
          break;
        case 22:
          (r.memoizedState === null && bn(a, r, n), xa(r, r.return));
          break;
        case 30:
          break;
        default:
          bn(a, r, n);
      }
      t = t.sibling;
    }
  }
  function ir(e, t) {
    var n = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && ua(n)));
  }
  function ur(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && ua(e)));
  }
  function zt(e, t, n, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (hh(e, t, n, l), (t = t.sibling));
  }
  function hh(e, t, n, l) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (zt(e, t, n, l), a & 2048 && Sa(9, t));
        break;
      case 1:
        zt(e, t, n, l);
        break;
      case 3:
        (zt(e, t, n, l),
          a & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && ua(e))));
        break;
      case 12:
        if (a & 2048) {
          (zt(e, t, n, l), (e = t.stateNode));
          try {
            var r = t.memoizedProps,
              o = r.id,
              h = r.onPostCommit;
            typeof h == "function" &&
              h(
                o,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (g) {
            Se(t, t.return, g);
          }
        } else zt(e, t, n, l);
        break;
      case 13:
        zt(e, t, n, l);
        break;
      case 23:
        break;
      case 22:
        ((r = t.stateNode),
          (o = t.alternate),
          t.memoizedState !== null
            ? r._visibility & 2
              ? zt(e, t, n, l)
              : Ea(e, t)
            : r._visibility & 2
              ? zt(e, t, n, l)
              : ((r._visibility |= 2),
                Al(e, t, n, l, (t.subtreeFlags & 10256) !== 0)),
          a & 2048 && ir(o, t));
        break;
      case 24:
        (zt(e, t, n, l), a & 2048 && ur(t.alternate, t));
        break;
      default:
        zt(e, t, n, l);
    }
  }
  function Al(e, t, n, l, a) {
    for (a = a && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var r = e,
        o = t,
        h = n,
        g = l,
        R = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          (Al(r, o, h, g, a), Sa(8, o));
          break;
        case 23:
          break;
        case 22:
          var C = o.stateNode;
          (o.memoizedState !== null
            ? C._visibility & 2
              ? Al(r, o, h, g, a)
              : Ea(r, o)
            : ((C._visibility |= 2), Al(r, o, h, g, a)),
            a && R & 2048 && ir(o.alternate, o));
          break;
        case 24:
          (Al(r, o, h, g, a), a && R & 2048 && ur(o.alternate, o));
          break;
        default:
          Al(r, o, h, g, a);
      }
      t = t.sibling;
    }
  }
  function Ea(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e,
          l = t,
          a = l.flags;
        switch (l.tag) {
          case 22:
            (Ea(n, l), a & 2048 && ir(l.alternate, l));
            break;
          case 24:
            (Ea(n, l), a & 2048 && ur(l.alternate, l));
            break;
          default:
            Ea(n, l);
        }
        t = t.sibling;
      }
  }
  var _a = 8192;
  function Rl(e) {
    if (e.subtreeFlags & _a)
      for (e = e.child; e !== null; ) (dh(e), (e = e.sibling));
  }
  function dh(e) {
    switch (e.tag) {
      case 26:
        (Rl(e),
          e.flags & _a &&
            e.memoizedState !== null &&
            Q0(Rt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Rl(e);
        break;
      case 3:
      case 4:
        var t = Rt;
        ((Rt = Wi(e.stateNode.containerInfo)), Rl(e), (Rt = t));
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = _a), (_a = 16777216), Rl(e), (_a = t))
            : Rl(e));
        break;
      default:
        Rl(e);
    }
  }
  function mh(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Ta(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          ((Ve = l), yh(l, e));
        }
      mh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (ph(e), (e = e.sibling));
  }
  function ph(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ta(e), e.flags & 2048 && gn(9, e, e.return));
        break;
      case 3:
        Ta(e);
        break;
      case 12:
        Ta(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Li(e))
          : Ta(e);
        break;
      default:
        Ta(e);
    }
  }
  function Li(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          ((Ve = l), yh(l, e));
        }
      mh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (gn(8, t, t.return), Li(t));
          break;
        case 22:
          ((n = t.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), Li(t)));
          break;
        default:
          Li(t);
      }
      e = e.sibling;
    }
  }
  function yh(e, t) {
    for (; Ve !== null; ) {
      var n = Ve;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          gn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          ua(n.memoizedState.cache);
      }
      if (((l = n.child), l !== null)) ((l.return = n), (Ve = l));
      else
        e: for (n = e; Ve !== null; ) {
          l = Ve;
          var a = l.sibling,
            r = l.return;
          if ((sh(l), l === n)) {
            Ve = null;
            break e;
          }
          if (a !== null) {
            ((a.return = r), (Ve = a));
            break e;
          }
          Ve = r;
        }
    }
  }
  var u0 = {
      getCacheForType: function (e) {
        var t = Ke(Ue),
          n = t.data.get(e);
        return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
      },
    },
    s0 = typeof WeakMap == "function" ? WeakMap : Map,
    me = 0,
    Ee = null,
    ue = null,
    ce = 0,
    pe = 0,
    ft = null,
    Sn = !1,
    wl = !1,
    sr = !1,
    tn = 0,
    Ne = 0,
    xn = 0,
    $n = 0,
    rr = 0,
    Et = 0,
    Nl = 0,
    Aa = null,
    lt = null,
    cr = !1,
    or = 0,
    Yi = 1 / 0,
    Vi = null,
    En = null,
    Qe = 0,
    _n = null,
    Ol = null,
    Cl = 0,
    fr = 0,
    hr = null,
    gh = null,
    Ra = 0,
    dr = null;
  function ht() {
    if ((me & 2) !== 0 && ce !== 0) return ce & -ce;
    if (A.T !== null) {
      var e = gl;
      return e !== 0 ? e : Sr();
    }
    return Mc();
  }
  function vh() {
    Et === 0 && (Et = (ce & 536870912) === 0 || de ? wc() : 536870912);
    var e = xt.current;
    return (e !== null && (e.flags |= 32), Et);
  }
  function dt(e, t, n) {
    (((e === Ee && (pe === 2 || pe === 9)) || e.cancelPendingCommit !== null) &&
      (Ml(e, 0), Tn(e, ce, Et, !1)),
      Ql(e, n),
      ((me & 2) === 0 || e !== Ee) &&
        (e === Ee &&
          ((me & 2) === 0 && ($n |= n), Ne === 4 && Tn(e, ce, Et, !1)),
        jt(e)));
  }
  function bh(e, t, n) {
    if ((me & 6) !== 0) throw Error(u(327));
    var l = (!n && (t & 124) === 0 && (t & e.expiredLanes) === 0) || Xl(e, t),
      a = l ? o0(e, t) : yr(e, t, !0),
      r = l;
    do {
      if (a === 0) {
        wl && !l && Tn(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), r && !r0(n))) {
          ((a = yr(e, t, !1)), (r = !1));
          continue;
        }
        if (a === 2) {
          if (((r = t), e.errorRecoveryDisabledLanes & r)) var o = 0;
          else
            ((o = e.pendingLanes & -536870913),
              (o = o !== 0 ? o : o & 536870912 ? 536870912 : 0));
          if (o !== 0) {
            t = o;
            e: {
              var h = e;
              a = Aa;
              var g = h.current.memoizedState.isDehydrated;
              if ((g && (Ml(h, o).flags |= 256), (o = yr(h, o, !1)), o !== 2)) {
                if (sr && !g) {
                  ((h.errorRecoveryDisabledLanes |= r), ($n |= r), (a = 4));
                  break e;
                }
                ((r = lt),
                  (lt = a),
                  r !== null &&
                    (lt === null ? (lt = r) : lt.push.apply(lt, r)));
              }
              a = o;
            }
            if (((r = !1), a !== 2)) continue;
          }
        }
        if (a === 1) {
          (Ml(e, 0), Tn(e, t, 0, !0));
          break;
        }
        e: {
          switch (((l = e), (r = a), r)) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Tn(l, t, Et, !Sn);
              break e;
            case 2:
              lt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && ((a = or + 300 - Ot()), 10 < a)) {
            if ((Tn(l, t, Et, !Sn), Pa(l, 0, !0) !== 0)) break e;
            l.timeoutHandle = Jh(
              Sh.bind(null, l, n, lt, Vi, cr, t, Et, $n, Nl, Sn, r, 2, -0, 0),
              a
            );
            break e;
          }
          Sh(l, n, lt, Vi, cr, t, Et, $n, Nl, Sn, r, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    jt(e);
  }
  function Sh(e, t, n, l, a, r, o, h, g, R, C, z, N, O) {
    if (
      ((e.timeoutHandle = -1),
      (z = t.subtreeFlags),
      (z & 8192 || (z & 16785408) === 16785408) &&
        ((za = { stylesheets: null, count: 0, unsuspend: X0 }),
        dh(t),
        (z = Z0()),
        z !== null))
    ) {
      ((e.cancelPendingCommit = z(
        wh.bind(null, e, t, r, n, l, a, o, h, g, C, 1, N, O)
      )),
        Tn(e, r, o, !R));
      return;
    }
    wh(e, t, r, n, l, a, o, h, g);
  }
  function r0(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var l = 0; l < n.length; l++) {
          var a = n[l],
            r = a.getSnapshot;
          a = a.value;
          try {
            if (!st(r(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Tn(e, t, n, l) {
    ((t &= ~rr),
      (t &= ~$n),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      l && (e.warmLanes |= t),
      (l = e.expirationTimes));
    for (var a = t; 0 < a; ) {
      var r = 31 - ut(a),
        o = 1 << r;
      ((l[r] = -1), (a &= ~o));
    }
    n !== 0 && Oc(e, n, t);
  }
  function Gi() {
    return (me & 6) === 0 ? (wa(0), !1) : !0;
  }
  function mr() {
    if (ue !== null) {
      if (pe === 0) var e = ue.return;
      else ((e = ue), (Kt = Xn = null), Ms(e), (_l = null), (ga = 0), (e = ue));
      for (; e !== null; ) (If(e.alternate, e), (e = e.return));
      ue = null;
    }
  }
  function Ml(e, t) {
    var n = e.timeoutHandle;
    (n !== -1 && ((e.timeoutHandle = -1), R0(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      mr(),
      (Ee = e),
      (ue = n = Qt(e.current, null)),
      (ce = t),
      (pe = 0),
      (ft = null),
      (Sn = !1),
      (wl = Xl(e, t)),
      (sr = !1),
      (Nl = Et = rr = $n = xn = Ne = 0),
      (lt = Aa = null),
      (cr = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var a = 31 - ut(l),
          r = 1 << a;
        ((t |= e[a]), (l &= ~r));
      }
    return ((tn = t), oi(), n);
  }
  function xh(e, t) {
    ((ae = null),
      (A.H = Oi),
      t === ra || t === bi
        ? ((t = qo()), (pe = 3))
        : t === jo
          ? ((t = qo()), (pe = 4))
          : (pe =
              t === Lf
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (ft = t),
      ue === null && ((Ne = 1), ji(e, gt(t, e.current))));
  }
  function Eh() {
    var e = A.H;
    return ((A.H = Oi), e === null ? Oi : e);
  }
  function _h() {
    var e = A.A;
    return ((A.A = u0), e);
  }
  function pr() {
    ((Ne = 4),
      Sn || ((ce & 4194048) !== ce && xt.current !== null) || (wl = !0),
      ((xn & 134217727) === 0 && ($n & 134217727) === 0) ||
        Ee === null ||
        Tn(Ee, ce, Et, !1));
  }
  function yr(e, t, n) {
    var l = me;
    me |= 2;
    var a = Eh(),
      r = _h();
    ((Ee !== e || ce !== t) && ((Vi = null), Ml(e, t)), (t = !1));
    var o = Ne;
    e: do
      try {
        if (pe !== 0 && ue !== null) {
          var h = ue,
            g = ft;
          switch (pe) {
            case 8:
              (mr(), (o = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              xt.current === null && (t = !0);
              var R = pe;
              if (((pe = 0), (ft = null), Dl(e, h, g, R), n && wl)) {
                o = 0;
                break e;
              }
              break;
            default:
              ((R = pe), (pe = 0), (ft = null), Dl(e, h, g, R));
          }
        }
        (c0(), (o = Ne));
        break;
      } catch (C) {
        xh(e, C);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Kt = Xn = null),
      (me = l),
      (A.H = a),
      (A.A = r),
      ue === null && ((Ee = null), (ce = 0), oi()),
      o
    );
  }
  function c0() {
    for (; ue !== null; ) Th(ue);
  }
  function o0(e, t) {
    var n = me;
    me |= 2;
    var l = Eh(),
      a = _h();
    Ee !== e || ce !== t
      ? ((Vi = null), (Yi = Ot() + 500), Ml(e, t))
      : (wl = Xl(e, t));
    e: do
      try {
        if (pe !== 0 && ue !== null) {
          t = ue;
          var r = ft;
          t: switch (pe) {
            case 1:
              ((pe = 0), (ft = null), Dl(e, t, r, 1));
              break;
            case 2:
            case 9:
              if (Uo(r)) {
                ((pe = 0), (ft = null), Ah(t));
                break;
              }
              ((t = function () {
                ((pe !== 2 && pe !== 9) || Ee !== e || (pe = 7), jt(e));
              }),
                r.then(t, t));
              break e;
            case 3:
              pe = 7;
              break e;
            case 4:
              pe = 5;
              break e;
            case 7:
              Uo(r)
                ? ((pe = 0), (ft = null), Ah(t))
                : ((pe = 0), (ft = null), Dl(e, t, r, 7));
              break;
            case 5:
              var o = null;
              switch (ue.tag) {
                case 26:
                  o = ue.memoizedState;
                case 5:
                case 27:
                  var h = ue;
                  if (!o || ud(o)) {
                    ((pe = 0), (ft = null));
                    var g = h.sibling;
                    if (g !== null) ue = g;
                    else {
                      var R = h.return;
                      R !== null ? ((ue = R), Xi(R)) : (ue = null);
                    }
                    break t;
                  }
              }
              ((pe = 0), (ft = null), Dl(e, t, r, 5));
              break;
            case 6:
              ((pe = 0), (ft = null), Dl(e, t, r, 6));
              break;
            case 8:
              (mr(), (Ne = 6));
              break e;
            default:
              throw Error(u(462));
          }
        }
        f0();
        break;
      } catch (C) {
        xh(e, C);
      }
    while (!0);
    return (
      (Kt = Xn = null),
      (A.H = l),
      (A.A = a),
      (me = n),
      ue !== null ? 0 : ((Ee = null), (ce = 0), oi(), Ne)
    );
  }
  function f0() {
    for (; ue !== null && !zm(); ) Th(ue);
  }
  function Th(e) {
    var t = Wf(e.alternate, e, tn);
    ((e.memoizedProps = e.pendingProps), t === null ? Xi(e) : (ue = t));
  }
  function Ah(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Zf(n, t, t.pendingProps, t.type, void 0, ce);
        break;
      case 11:
        t = Zf(n, t, t.pendingProps, t.type.render, t.ref, ce);
        break;
      case 5:
        Ms(t);
      default:
        (If(n, t), (t = ue = Ao(t, tn)), (t = Wf(n, t, tn)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Xi(e) : (ue = t));
  }
  function Dl(e, t, n, l) {
    ((Kt = Xn = null), Ms(t), (_l = null), (ga = 0));
    var a = t.return;
    try {
      if (e0(e, a, t, n, ce)) {
        ((Ne = 1), ji(e, gt(n, e.current)), (ue = null));
        return;
      }
    } catch (r) {
      if (a !== null) throw ((ue = a), r);
      ((Ne = 1), ji(e, gt(n, e.current)), (ue = null));
      return;
    }
    t.flags & 32768
      ? (de || l === 1
          ? (e = !0)
          : wl || (ce & 536870912) !== 0
            ? (e = !1)
            : ((Sn = e = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = xt.current),
                l !== null && l.tag === 13 && (l.flags |= 16384))),
        Rh(t, e))
      : Xi(t);
  }
  function Xi(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Rh(t, Sn);
        return;
      }
      e = t.return;
      var n = n0(t.alternate, t, tn);
      if (n !== null) {
        ue = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ue = t;
        return;
      }
      ue = t = e;
    } while (t !== null);
    Ne === 0 && (Ne = 5);
  }
  function Rh(e, t) {
    do {
      var n = l0(e.alternate, e);
      if (n !== null) {
        ((n.flags &= 32767), (ue = n));
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ue = e;
        return;
      }
      ue = e = n;
    } while (e !== null);
    ((Ne = 6), (ue = null));
  }
  function wh(e, t, n, l, a, r, o, h, g) {
    e.cancelPendingCommit = null;
    do Qi();
    while (Qe !== 0);
    if ((me & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (
        ((r = t.lanes | t.childLanes),
        (r |= us),
        Xm(e, n, r, o, h, g),
        e === Ee && ((ue = Ee = null), (ce = 0)),
        (Ol = t),
        (_n = e),
        (Cl = n),
        (fr = r),
        (hr = a),
        (gh = l),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            p0($a, function () {
              return (Dh(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = A.T), (A.T = null), (a = B.p), (B.p = 2), (o = me), (me |= 4));
        try {
          a0(e, t, n);
        } finally {
          ((me = o), (B.p = a), (A.T = l));
        }
      }
      ((Qe = 1), Nh(), Oh(), Ch());
    }
  }
  function Nh() {
    if (Qe === 1) {
      Qe = 0;
      var e = _n,
        t = Ol,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        ((n = A.T), (A.T = null));
        var l = B.p;
        B.p = 2;
        var a = me;
        me |= 4;
        try {
          oh(t, e);
          var r = Nr,
            o = po(e.containerInfo),
            h = r.focusedElem,
            g = r.selectionRange;
          if (
            o !== h &&
            h &&
            h.ownerDocument &&
            mo(h.ownerDocument.documentElement, h)
          ) {
            if (g !== null && ts(h)) {
              var R = g.start,
                C = g.end;
              if ((C === void 0 && (C = R), "selectionStart" in h))
                ((h.selectionStart = R),
                  (h.selectionEnd = Math.min(C, h.value.length)));
              else {
                var z = h.ownerDocument || document,
                  N = (z && z.defaultView) || window;
                if (N.getSelection) {
                  var O = N.getSelection(),
                    ee = h.textContent.length,
                    P = Math.min(g.start, ee),
                    ve = g.end === void 0 ? P : Math.min(g.end, ee);
                  !O.extend && P > ve && ((o = ve), (ve = P), (P = o));
                  var _ = ho(h, P),
                    S = ho(h, ve);
                  if (
                    _ &&
                    S &&
                    (O.rangeCount !== 1 ||
                      O.anchorNode !== _.node ||
                      O.anchorOffset !== _.offset ||
                      O.focusNode !== S.node ||
                      O.focusOffset !== S.offset)
                  ) {
                    var T = z.createRange();
                    (T.setStart(_.node, _.offset),
                      O.removeAllRanges(),
                      P > ve
                        ? (O.addRange(T), O.extend(S.node, S.offset))
                        : (T.setEnd(S.node, S.offset), O.addRange(T)));
                  }
                }
              }
            }
            for (z = [], O = h; (O = O.parentNode); )
              O.nodeType === 1 &&
                z.push({ element: O, left: O.scrollLeft, top: O.scrollTop });
            for (
              typeof h.focus == "function" && h.focus(), h = 0;
              h < z.length;
              h++
            ) {
              var D = z[h];
              ((D.element.scrollLeft = D.left), (D.element.scrollTop = D.top));
            }
          }
          ((nu = !!wr), (Nr = wr = null));
        } finally {
          ((me = a), (B.p = l), (A.T = n));
        }
      }
      ((e.current = t), (Qe = 2));
    }
  }
  function Oh() {
    if (Qe === 2) {
      Qe = 0;
      var e = _n,
        t = Ol,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        ((n = A.T), (A.T = null));
        var l = B.p;
        B.p = 2;
        var a = me;
        me |= 4;
        try {
          uh(e, t.alternate, t);
        } finally {
          ((me = a), (B.p = l), (A.T = n));
        }
      }
      Qe = 3;
    }
  }
  function Ch() {
    if (Qe === 4 || Qe === 3) {
      ((Qe = 0), jm());
      var e = _n,
        t = Ol,
        n = Cl,
        l = gh;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Qe = 5)
        : ((Qe = 0), (Ol = _n = null), Mh(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (
        (a === 0 && (En = null),
        ju(n),
        (t = t.stateNode),
        it && typeof it.onCommitFiberRoot == "function")
      )
        try {
          it.onCommitFiberRoot(Gl, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        ((t = A.T), (a = B.p), (B.p = 2), (A.T = null));
        try {
          for (var r = e.onRecoverableError, o = 0; o < l.length; o++) {
            var h = l[o];
            r(h.value, { componentStack: h.stack });
          }
        } finally {
          ((A.T = t), (B.p = a));
        }
      }
      ((Cl & 3) !== 0 && Qi(),
        jt(e),
        (a = e.pendingLanes),
        (n & 4194090) !== 0 && (a & 42) !== 0
          ? e === dr
            ? Ra++
            : ((Ra = 0), (dr = e))
          : (Ra = 0),
        wa(0));
    }
  }
  function Mh(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), ua(t)));
  }
  function Qi(e) {
    return (Nh(), Oh(), Ch(), Dh());
  }
  function Dh() {
    if (Qe !== 5) return !1;
    var e = _n,
      t = fr;
    fr = 0;
    var n = ju(Cl),
      l = A.T,
      a = B.p;
    try {
      ((B.p = 32 > n ? 32 : n), (A.T = null), (n = hr), (hr = null));
      var r = _n,
        o = Cl;
      if (((Qe = 0), (Ol = _n = null), (Cl = 0), (me & 6) !== 0))
        throw Error(u(331));
      var h = me;
      if (
        ((me |= 4),
        ph(r.current),
        hh(r, r.current, o, n),
        (me = h),
        wa(0, !1),
        it && typeof it.onPostCommitFiberRoot == "function")
      )
        try {
          it.onPostCommitFiberRoot(Gl, r);
        } catch {}
      return !0;
    } finally {
      ((B.p = a), (A.T = l), Mh(e, t));
    }
  }
  function zh(e, t, n) {
    ((t = gt(n, t)),
      (t = Zs(e.stateNode, t, 2)),
      (e = dn(e, t, 2)),
      e !== null && (Ql(e, 2), jt(e)));
  }
  function Se(e, t, n) {
    if (e.tag === 3) zh(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          zh(t, e, n);
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (En === null || !En.has(l)))
          ) {
            ((e = gt(n, e)),
              (n = qf(2)),
              (l = dn(t, n, 2)),
              l !== null && (Hf(n, l, t, e), Ql(l, 2), jt(l)));
            break;
          }
        }
        t = t.return;
      }
  }
  function gr(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new s0();
      var a = new Set();
      l.set(t, a);
    } else ((a = l.get(t)), a === void 0 && ((a = new Set()), l.set(t, a)));
    a.has(n) ||
      ((sr = !0), a.add(n), (e = h0.bind(null, e, t, n)), t.then(e, e));
  }
  function h0(e, t, n) {
    var l = e.pingCache;
    (l !== null && l.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      Ee === e &&
        (ce & n) === n &&
        (Ne === 4 || (Ne === 3 && (ce & 62914560) === ce && 300 > Ot() - or)
          ? (me & 2) === 0 && Ml(e, 0)
          : (rr |= n),
        Nl === ce && (Nl = 0)),
      jt(e));
  }
  function jh(e, t) {
    (t === 0 && (t = Nc()), (e = dl(e, t)), e !== null && (Ql(e, t), jt(e)));
  }
  function d0(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), jh(e, n));
  }
  function m0(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var l = e.stateNode,
          a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    (l !== null && l.delete(t), jh(e, n));
  }
  function p0(e, t) {
    return Cu(e, t);
  }
  var Zi = null,
    zl = null,
    vr = !1,
    ki = !1,
    br = !1,
    Fn = 0;
  function jt(e) {
    (e !== zl &&
      e.next === null &&
      (zl === null ? (Zi = zl = e) : (zl = zl.next = e)),
      (ki = !0),
      vr || ((vr = !0), g0()));
  }
  function wa(e, t) {
    if (!br && ki) {
      br = !0;
      do
        for (var n = !1, l = Zi; l !== null; ) {
          if (e !== 0) {
            var a = l.pendingLanes;
            if (a === 0) var r = 0;
            else {
              var o = l.suspendedLanes,
                h = l.pingedLanes;
              ((r = (1 << (31 - ut(42 | e) + 1)) - 1),
                (r &= a & ~(o & ~h)),
                (r = r & 201326741 ? (r & 201326741) | 1 : r ? r | 2 : 0));
            }
            r !== 0 && ((n = !0), Hh(l, r));
          } else
            ((r = ce),
              (r = Pa(
                l,
                l === Ee ? r : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (r & 3) === 0 || Xl(l, r) || ((n = !0), Hh(l, r)));
          l = l.next;
        }
      while (n);
      br = !1;
    }
  }
  function y0() {
    Uh();
  }
  function Uh() {
    ki = vr = !1;
    var e = 0;
    Fn !== 0 && (A0() && (e = Fn), (Fn = 0));
    for (var t = Ot(), n = null, l = Zi; l !== null; ) {
      var a = l.next,
        r = Bh(l, t);
      (r === 0
        ? ((l.next = null),
          n === null ? (Zi = a) : (n.next = a),
          a === null && (zl = n))
        : ((n = l), (e !== 0 || (r & 3) !== 0) && (ki = !0)),
        (l = a));
    }
    wa(e);
  }
  function Bh(e, t) {
    for (
      var n = e.suspendedLanes,
        l = e.pingedLanes,
        a = e.expirationTimes,
        r = e.pendingLanes & -62914561;
      0 < r;

    ) {
      var o = 31 - ut(r),
        h = 1 << o,
        g = a[o];
      (g === -1
        ? ((h & n) === 0 || (h & l) !== 0) && (a[o] = Gm(h, t))
        : g <= t && (e.expiredLanes |= h),
        (r &= ~h));
    }
    if (
      ((t = Ee),
      (n = ce),
      (n = Pa(
        e,
        e === t ? n : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (l = e.callbackNode),
      n === 0 ||
        (e === t && (pe === 2 || pe === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && Mu(l),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((n & 3) === 0 || Xl(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((l !== null && Mu(l), ju(n))) {
        case 2:
        case 8:
          n = Ac;
          break;
        case 32:
          n = $a;
          break;
        case 268435456:
          n = Rc;
          break;
        default:
          n = $a;
      }
      return (
        (l = qh.bind(null, e)),
        (n = Cu(n, l)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      l !== null && l !== null && Mu(l),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function qh(e, t) {
    if (Qe !== 0 && Qe !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var n = e.callbackNode;
    if (Qi() && e.callbackNode !== n) return null;
    var l = ce;
    return (
      (l = Pa(
        e,
        e === Ee ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      l === 0
        ? null
        : (bh(e, l, t),
          Bh(e, Ot()),
          e.callbackNode != null && e.callbackNode === n
            ? qh.bind(null, e)
            : null)
    );
  }
  function Hh(e, t) {
    if (Qi()) return null;
    bh(e, t, !0);
  }
  function g0() {
    w0(function () {
      (me & 6) !== 0 ? Cu(Tc, y0) : Uh();
    });
  }
  function Sr() {
    return (Fn === 0 && (Fn = wc()), Fn);
  }
  function Lh(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : li("" + e);
  }
  function Yh(e, t) {
    var n = t.ownerDocument.createElement("input");
    return (
      (n.name = t.name),
      (n.value = t.value),
      e.id && n.setAttribute("form", e.id),
      t.parentNode.insertBefore(n, t),
      (e = new FormData(e)),
      n.parentNode.removeChild(n),
      e
    );
  }
  function v0(e, t, n, l, a) {
    if (t === "submit" && n && n.stateNode === a) {
      var r = Lh((a[Ie] || null).action),
        o = l.submitter;
      o &&
        ((t = (t = o[Ie] || null)
          ? Lh(t.formAction)
          : o.getAttribute("formAction")),
        t !== null && ((r = t), (o = null)));
      var h = new si("action", "action", null, l, a);
      e.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Fn !== 0) {
                  var g = o ? Yh(a, o) : new FormData(a);
                  Ys(
                    n,
                    { pending: !0, data: g, method: a.method, action: r },
                    null,
                    g
                  );
                }
              } else
                typeof r == "function" &&
                  (h.preventDefault(),
                  (g = o ? Yh(a, o) : new FormData(a)),
                  Ys(
                    n,
                    { pending: !0, data: g, method: a.method, action: r },
                    r,
                    g
                  ));
            },
            currentTarget: a,
          },
        ],
      });
    }
  }
  for (var xr = 0; xr < is.length; xr++) {
    var Er = is[xr],
      b0 = Er.toLowerCase(),
      S0 = Er[0].toUpperCase() + Er.slice(1);
    At(b0, "on" + S0);
  }
  (At(vo, "onAnimationEnd"),
    At(bo, "onAnimationIteration"),
    At(So, "onAnimationStart"),
    At("dblclick", "onDoubleClick"),
    At("focusin", "onFocus"),
    At("focusout", "onBlur"),
    At(qp, "onTransitionRun"),
    At(Hp, "onTransitionStart"),
    At(Lp, "onTransitionCancel"),
    At(xo, "onTransitionEnd"),
    ll("onMouseEnter", ["mouseout", "mouseover"]),
    ll("onMouseLeave", ["mouseout", "mouseover"]),
    ll("onPointerEnter", ["pointerout", "pointerover"]),
    ll("onPointerLeave", ["pointerout", "pointerover"]),
    jn(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    jn(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    jn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    jn(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    jn(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    jn(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    ));
  var Na =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    x0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Na)
    );
  function Vh(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n],
        a = l.event;
      l = l.listeners;
      e: {
        var r = void 0;
        if (t)
          for (var o = l.length - 1; 0 <= o; o--) {
            var h = l[o],
              g = h.instance,
              R = h.currentTarget;
            if (((h = h.listener), g !== r && a.isPropagationStopped()))
              break e;
            ((r = h), (a.currentTarget = R));
            try {
              r(a);
            } catch (C) {
              zi(C);
            }
            ((a.currentTarget = null), (r = g));
          }
        else
          for (o = 0; o < l.length; o++) {
            if (
              ((h = l[o]),
              (g = h.instance),
              (R = h.currentTarget),
              (h = h.listener),
              g !== r && a.isPropagationStopped())
            )
              break e;
            ((r = h), (a.currentTarget = R));
            try {
              r(a);
            } catch (C) {
              zi(C);
            }
            ((a.currentTarget = null), (r = g));
          }
      }
    }
  }
  function se(e, t) {
    var n = t[Uu];
    n === void 0 && (n = t[Uu] = new Set());
    var l = e + "__bubble";
    n.has(l) || (Gh(t, e, 2, !1), n.add(l));
  }
  function _r(e, t, n) {
    var l = 0;
    (t && (l |= 4), Gh(n, e, l, t));
  }
  var Ki = "_reactListening" + Math.random().toString(36).slice(2);
  function Tr(e) {
    if (!e[Ki]) {
      ((e[Ki] = !0),
        zc.forEach(function (n) {
          n !== "selectionchange" && (x0.has(n) || _r(n, !1, e), _r(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ki] || ((t[Ki] = !0), _r("selectionchange", !1, t));
    }
  }
  function Gh(e, t, n, l) {
    switch (hd(t)) {
      case 2:
        var a = J0;
        break;
      case 8:
        a = $0;
        break;
      default:
        a = Hr;
    }
    ((n = a.bind(null, t, n, e)),
      (a = void 0),
      !ku ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (a = !0),
      l
        ? a !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: a })
          : e.addEventListener(t, n, !0)
        : a !== void 0
          ? e.addEventListener(t, n, { passive: a })
          : e.addEventListener(t, n, !1));
  }
  function Ar(e, t, n, l, a) {
    var r = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var o = l.tag;
        if (o === 3 || o === 4) {
          var h = l.stateNode.containerInfo;
          if (h === a) break;
          if (o === 4)
            for (o = l.return; o !== null; ) {
              var g = o.tag;
              if ((g === 3 || g === 4) && o.stateNode.containerInfo === a)
                return;
              o = o.return;
            }
          for (; h !== null; ) {
            if (((o = el(h)), o === null)) return;
            if (((g = o.tag), g === 5 || g === 6 || g === 26 || g === 27)) {
              l = r = o;
              continue e;
            }
            h = h.parentNode;
          }
        }
        l = l.return;
      }
    Kc(function () {
      var R = r,
        C = Qu(n),
        z = [];
      e: {
        var N = Eo.get(e);
        if (N !== void 0) {
          var O = si,
            ee = e;
          switch (e) {
            case "keypress":
              if (ii(n) === 0) break e;
            case "keydown":
            case "keyup":
              O = pp;
              break;
            case "focusin":
              ((ee = "focus"), (O = Fu));
              break;
            case "focusout":
              ((ee = "blur"), (O = Fu));
              break;
            case "beforeblur":
            case "afterblur":
              O = Fu;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              O = Fc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = lp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = vp;
              break;
            case vo:
            case bo:
            case So:
              O = up;
              break;
            case xo:
              O = Sp;
              break;
            case "scroll":
            case "scrollend":
              O = tp;
              break;
            case "wheel":
              O = Ep;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = rp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = Pc;
              break;
            case "toggle":
            case "beforetoggle":
              O = Tp;
          }
          var P = (t & 4) !== 0,
            ve = !P && (e === "scroll" || e === "scrollend"),
            _ = P ? (N !== null ? N + "Capture" : null) : N;
          P = [];
          for (var S = R, T; S !== null; ) {
            var D = S;
            if (
              ((T = D.stateNode),
              (D = D.tag),
              (D !== 5 && D !== 26 && D !== 27) ||
                T === null ||
                _ === null ||
                ((D = Kl(S, _)), D != null && P.push(Oa(S, D, T))),
              ve)
            )
              break;
            S = S.return;
          }
          0 < P.length &&
            ((N = new O(N, ee, null, n, C)),
            z.push({ event: N, listeners: P }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((N = e === "mouseover" || e === "pointerover"),
            (O = e === "mouseout" || e === "pointerout"),
            N &&
              n !== Xu &&
              (ee = n.relatedTarget || n.fromElement) &&
              (el(ee) || ee[In]))
          )
            break e;
          if (
            (O || N) &&
            ((N =
              C.window === C
                ? C
                : (N = C.ownerDocument)
                  ? N.defaultView || N.parentWindow
                  : window),
            O
              ? ((ee = n.relatedTarget || n.toElement),
                (O = R),
                (ee = ee ? el(ee) : null),
                ee !== null &&
                  ((ve = d(ee)),
                  (P = ee.tag),
                  ee !== ve || (P !== 5 && P !== 27 && P !== 6)) &&
                  (ee = null))
              : ((O = null), (ee = R)),
            O !== ee)
          ) {
            if (
              ((P = Fc),
              (D = "onMouseLeave"),
              (_ = "onMouseEnter"),
              (S = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((P = Pc),
                (D = "onPointerLeave"),
                (_ = "onPointerEnter"),
                (S = "pointer")),
              (ve = O == null ? N : kl(O)),
              (T = ee == null ? N : kl(ee)),
              (N = new P(D, S + "leave", O, n, C)),
              (N.target = ve),
              (N.relatedTarget = T),
              (D = null),
              el(C) === R &&
                ((P = new P(_, S + "enter", ee, n, C)),
                (P.target = T),
                (P.relatedTarget = ve),
                (D = P)),
              (ve = D),
              O && ee)
            )
              t: {
                for (P = O, _ = ee, S = 0, T = P; T; T = jl(T)) S++;
                for (T = 0, D = _; D; D = jl(D)) T++;
                for (; 0 < S - T; ) ((P = jl(P)), S--);
                for (; 0 < T - S; ) ((_ = jl(_)), T--);
                for (; S--; ) {
                  if (P === _ || (_ !== null && P === _.alternate)) break t;
                  ((P = jl(P)), (_ = jl(_)));
                }
                P = null;
              }
            else P = null;
            (O !== null && Xh(z, N, O, P, !1),
              ee !== null && ve !== null && Xh(z, ve, ee, P, !0));
          }
        }
        e: {
          if (
            ((N = R ? kl(R) : window),
            (O = N.nodeName && N.nodeName.toLowerCase()),
            O === "select" || (O === "input" && N.type === "file"))
          )
            var k = uo;
          else if (ao(N))
            if (so) k = jp;
            else {
              k = Dp;
              var ie = Mp;
            }
          else
            ((O = N.nodeName),
              !O ||
              O.toLowerCase() !== "input" ||
              (N.type !== "checkbox" && N.type !== "radio")
                ? R && Gu(R.elementType) && (k = uo)
                : (k = zp));
          if (k && (k = k(e, R))) {
            io(z, k, n, C);
            break e;
          }
          (ie && ie(e, N, R),
            e === "focusout" &&
              R &&
              N.type === "number" &&
              R.memoizedProps.value != null &&
              Vu(N, "number", N.value));
        }
        switch (((ie = R ? kl(R) : window), e)) {
          case "focusin":
            (ao(ie) || ie.contentEditable === "true") &&
              ((ol = ie), (ns = R), (ta = null));
            break;
          case "focusout":
            ta = ns = ol = null;
            break;
          case "mousedown":
            ls = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((ls = !1), yo(z, n, C));
            break;
          case "selectionchange":
            if (Bp) break;
          case "keydown":
          case "keyup":
            yo(z, n, C);
        }
        var J;
        if (Pu)
          e: {
            switch (e) {
              case "compositionstart":
                var I = "onCompositionStart";
                break e;
              case "compositionend":
                I = "onCompositionEnd";
                break e;
              case "compositionupdate":
                I = "onCompositionUpdate";
                break e;
            }
            I = void 0;
          }
        else
          cl
            ? no(e, n) && (I = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (I = "onCompositionStart");
        (I &&
          (Ic &&
            n.locale !== "ko" &&
            (cl || I !== "onCompositionStart"
              ? I === "onCompositionEnd" && cl && (J = Jc())
              : ((cn = C),
                (Ku = "value" in cn ? cn.value : cn.textContent),
                (cl = !0))),
          (ie = Ji(R, I)),
          0 < ie.length &&
            ((I = new Wc(I, e, null, n, C)),
            z.push({ event: I, listeners: ie }),
            J ? (I.data = J) : ((J = lo(n)), J !== null && (I.data = J)))),
          (J = Rp ? wp(e, n) : Np(e, n)) &&
            ((I = Ji(R, "onBeforeInput")),
            0 < I.length &&
              ((ie = new Wc("onBeforeInput", "beforeinput", null, n, C)),
              z.push({ event: ie, listeners: I }),
              (ie.data = J))),
          v0(z, e, R, n, C));
      }
      Vh(z, t);
    });
  }
  function Oa(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Ji(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var a = e,
        r = a.stateNode;
      if (
        ((a = a.tag),
        (a !== 5 && a !== 26 && a !== 27) ||
          r === null ||
          ((a = Kl(e, n)),
          a != null && l.unshift(Oa(e, a, r)),
          (a = Kl(e, t)),
          a != null && l.push(Oa(e, a, r))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function jl(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Xh(e, t, n, l, a) {
    for (var r = t._reactName, o = []; n !== null && n !== l; ) {
      var h = n,
        g = h.alternate,
        R = h.stateNode;
      if (((h = h.tag), g !== null && g === l)) break;
      ((h !== 5 && h !== 26 && h !== 27) ||
        R === null ||
        ((g = R),
        a
          ? ((R = Kl(n, r)), R != null && o.unshift(Oa(n, R, g)))
          : a || ((R = Kl(n, r)), R != null && o.push(Oa(n, R, g)))),
        (n = n.return));
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
  }
  var E0 = /\r\n?/g,
    _0 = /\u0000|\uFFFD/g;
  function Qh(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        E0,
        `
`
      )
      .replace(_0, "");
  }
  function Zh(e, t) {
    return ((t = Qh(t)), Qh(e) === t);
  }
  function $i() {}
  function ge(e, t, n, l, a, r) {
    switch (n) {
      case "children":
        typeof l == "string"
          ? t === "body" || (t === "textarea" && l === "") || ul(e, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            t !== "body" &&
            ul(e, "" + l);
        break;
      case "className":
        ei(e, "class", l);
        break;
      case "tabIndex":
        ei(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ei(e, n, l);
        break;
      case "style":
        Zc(e, l, r);
        break;
      case "data":
        if (t !== "object") {
          ei(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          e.removeAttribute(n);
          break;
        }
        ((l = li("" + l)), e.setAttribute(n, l));
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" &&
            (n === "formAction"
              ? (t !== "input" && ge(e, t, "name", a.name, a, null),
                ge(e, t, "formEncType", a.formEncType, a, null),
                ge(e, t, "formMethod", a.formMethod, a, null),
                ge(e, t, "formTarget", a.formTarget, a, null))
              : (ge(e, t, "encType", a.encType, a, null),
                ge(e, t, "method", a.method, a, null),
                ge(e, t, "target", a.target, a, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        ((l = li("" + l)), e.setAttribute(n, l));
        break;
      case "onClick":
        l != null && (e.onclick = $i);
        break;
      case "onScroll":
        l != null && se("scroll", e);
        break;
      case "onScrollEnd":
        l != null && se("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(u(61));
          if (((n = l.__html), n != null)) {
            if (a.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((n = li("" + l)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(n, "" + l)
          : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(n, "")
          : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0
          ? e.setAttribute(n, "")
          : l !== !1 &&
              l != null &&
              typeof l != "function" &&
              typeof l != "symbol"
            ? e.setAttribute(n, l)
            : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? e.setAttribute(n, l)
          : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? e.removeAttribute(n)
          : e.setAttribute(n, l);
        break;
      case "popover":
        (se("beforetoggle", e), se("toggle", e), Ia(e, "popover", l));
        break;
      case "xlinkActuate":
        Gt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        Gt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        Gt(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        Gt(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        Gt(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        Gt(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        Gt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        Gt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        Gt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        Ia(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = Im.get(n) || n), Ia(e, n, l));
    }
  }
  function Rr(e, t, n, l, a, r) {
    switch (n) {
      case "style":
        Zc(e, l, r);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(u(61));
          if (((n = l.__html), n != null)) {
            if (a.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? ul(e, l)
          : (typeof l == "number" || typeof l == "bigint") && ul(e, "" + l);
        break;
      case "onScroll":
        l != null && se("scroll", e);
        break;
      case "onScrollEnd":
        l != null && se("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = $i);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!jc.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((a = n.endsWith("Capture")),
              (t = n.slice(2, a ? n.length - 7 : void 0)),
              (r = e[Ie] || null),
              (r = r != null ? r[n] : null),
              typeof r == "function" && e.removeEventListener(t, r, a),
              typeof l == "function")
            ) {
              (typeof r != "function" &&
                r !== null &&
                (n in e
                  ? (e[n] = null)
                  : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, l, a));
              break e;
            }
            n in e
              ? (e[n] = l)
              : l === !0
                ? e.setAttribute(n, "")
                : Ia(e, n, l);
          }
    }
  }
  function Ze(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (se("error", e), se("load", e));
        var l = !1,
          a = !1,
          r;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var o = n[r];
            if (o != null)
              switch (r) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  ge(e, t, r, o, n, null);
              }
          }
        (a && ge(e, t, "srcSet", n.srcSet, n, null),
          l && ge(e, t, "src", n.src, n, null));
        return;
      case "input":
        se("invalid", e);
        var h = (r = o = a = null),
          g = null,
          R = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var C = n[l];
            if (C != null)
              switch (l) {
                case "name":
                  a = C;
                  break;
                case "type":
                  o = C;
                  break;
                case "checked":
                  g = C;
                  break;
                case "defaultChecked":
                  R = C;
                  break;
                case "value":
                  r = C;
                  break;
                case "defaultValue":
                  h = C;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (C != null) throw Error(u(137, t));
                  break;
                default:
                  ge(e, t, l, C, n, null);
              }
          }
        (Vc(e, r, h, g, R, o, a, !1), ti(e));
        return;
      case "select":
        (se("invalid", e), (l = o = r = null));
        for (a in n)
          if (n.hasOwnProperty(a) && ((h = n[a]), h != null))
            switch (a) {
              case "value":
                r = h;
                break;
              case "defaultValue":
                o = h;
                break;
              case "multiple":
                l = h;
              default:
                ge(e, t, a, h, n, null);
            }
        ((t = r),
          (n = o),
          (e.multiple = !!l),
          t != null ? il(e, !!l, t, !1) : n != null && il(e, !!l, n, !0));
        return;
      case "textarea":
        (se("invalid", e), (r = a = l = null));
        for (o in n)
          if (n.hasOwnProperty(o) && ((h = n[o]), h != null))
            switch (o) {
              case "value":
                l = h;
                break;
              case "defaultValue":
                a = h;
                break;
              case "children":
                r = h;
                break;
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(u(91));
                break;
              default:
                ge(e, t, o, h, n, null);
            }
        (Xc(e, l, a, r), ti(e));
        return;
      case "option":
        for (g in n)
          if (n.hasOwnProperty(g) && ((l = n[g]), l != null))
            switch (g) {
              case "selected":
                e.selected =
                  l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                ge(e, t, g, l, n, null);
            }
        return;
      case "dialog":
        (se("beforetoggle", e),
          se("toggle", e),
          se("cancel", e),
          se("close", e));
        break;
      case "iframe":
      case "object":
        se("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Na.length; l++) se(Na[l], e);
        break;
      case "image":
        (se("error", e), se("load", e));
        break;
      case "details":
        se("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (se("error", e), se("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (R in n)
          if (n.hasOwnProperty(R) && ((l = n[R]), l != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                ge(e, t, R, l, n, null);
            }
        return;
      default:
        if (Gu(t)) {
          for (C in n)
            n.hasOwnProperty(C) &&
              ((l = n[C]), l !== void 0 && Rr(e, t, C, l, n, void 0));
          return;
        }
    }
    for (h in n)
      n.hasOwnProperty(h) && ((l = n[h]), l != null && ge(e, t, h, l, n, null));
  }
  function T0(e, t, n, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null,
          r = null,
          o = null,
          h = null,
          g = null,
          R = null,
          C = null;
        for (O in n) {
          var z = n[O];
          if (n.hasOwnProperty(O) && z != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = z;
              default:
                l.hasOwnProperty(O) || ge(e, t, O, null, l, z);
            }
        }
        for (var N in l) {
          var O = l[N];
          if (((z = n[N]), l.hasOwnProperty(N) && (O != null || z != null)))
            switch (N) {
              case "type":
                r = O;
                break;
              case "name":
                a = O;
                break;
              case "checked":
                R = O;
                break;
              case "defaultChecked":
                C = O;
                break;
              case "value":
                o = O;
                break;
              case "defaultValue":
                h = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null) throw Error(u(137, t));
                break;
              default:
                O !== z && ge(e, t, N, O, l, z);
            }
        }
        Yu(e, o, h, g, R, C, r, a);
        return;
      case "select":
        O = o = h = N = null;
        for (r in n)
          if (((g = n[r]), n.hasOwnProperty(r) && g != null))
            switch (r) {
              case "value":
                break;
              case "multiple":
                O = g;
              default:
                l.hasOwnProperty(r) || ge(e, t, r, null, l, g);
            }
        for (a in l)
          if (
            ((r = l[a]),
            (g = n[a]),
            l.hasOwnProperty(a) && (r != null || g != null))
          )
            switch (a) {
              case "value":
                N = r;
                break;
              case "defaultValue":
                h = r;
                break;
              case "multiple":
                o = r;
              default:
                r !== g && ge(e, t, a, r, l, g);
            }
        ((t = h),
          (n = o),
          (l = O),
          N != null
            ? il(e, !!n, N, !1)
            : !!l != !!n &&
              (t != null ? il(e, !!n, t, !0) : il(e, !!n, n ? [] : "", !1)));
        return;
      case "textarea":
        O = N = null;
        for (h in n)
          if (
            ((a = n[h]),
            n.hasOwnProperty(h) && a != null && !l.hasOwnProperty(h))
          )
            switch (h) {
              case "value":
                break;
              case "children":
                break;
              default:
                ge(e, t, h, null, l, a);
            }
        for (o in l)
          if (
            ((a = l[o]),
            (r = n[o]),
            l.hasOwnProperty(o) && (a != null || r != null))
          )
            switch (o) {
              case "value":
                N = a;
                break;
              case "defaultValue":
                O = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(u(91));
                break;
              default:
                a !== r && ge(e, t, o, a, l, r);
            }
        Gc(e, N, O);
        return;
      case "option":
        for (var ee in n)
          if (
            ((N = n[ee]),
            n.hasOwnProperty(ee) && N != null && !l.hasOwnProperty(ee))
          )
            switch (ee) {
              case "selected":
                e.selected = !1;
                break;
              default:
                ge(e, t, ee, null, l, N);
            }
        for (g in l)
          if (
            ((N = l[g]),
            (O = n[g]),
            l.hasOwnProperty(g) && N !== O && (N != null || O != null))
          )
            switch (g) {
              case "selected":
                e.selected =
                  N && typeof N != "function" && typeof N != "symbol";
                break;
              default:
                ge(e, t, g, N, l, O);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var P in n)
          ((N = n[P]),
            n.hasOwnProperty(P) &&
              N != null &&
              !l.hasOwnProperty(P) &&
              ge(e, t, P, null, l, N));
        for (R in l)
          if (
            ((N = l[R]),
            (O = n[R]),
            l.hasOwnProperty(R) && N !== O && (N != null || O != null))
          )
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null) throw Error(u(137, t));
                break;
              default:
                ge(e, t, R, N, l, O);
            }
        return;
      default:
        if (Gu(t)) {
          for (var ve in n)
            ((N = n[ve]),
              n.hasOwnProperty(ve) &&
                N !== void 0 &&
                !l.hasOwnProperty(ve) &&
                Rr(e, t, ve, void 0, l, N));
          for (C in l)
            ((N = l[C]),
              (O = n[C]),
              !l.hasOwnProperty(C) ||
                N === O ||
                (N === void 0 && O === void 0) ||
                Rr(e, t, C, N, l, O));
          return;
        }
    }
    for (var _ in n)
      ((N = n[_]),
        n.hasOwnProperty(_) &&
          N != null &&
          !l.hasOwnProperty(_) &&
          ge(e, t, _, null, l, N));
    for (z in l)
      ((N = l[z]),
        (O = n[z]),
        !l.hasOwnProperty(z) ||
          N === O ||
          (N == null && O == null) ||
          ge(e, t, z, N, l, O));
  }
  var wr = null,
    Nr = null;
  function Fi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function kh(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Kh(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Or(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Cr = null;
  function A0() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === Cr
        ? !1
        : ((Cr = e), !0)
      : ((Cr = null), !1);
  }
  var Jh = typeof setTimeout == "function" ? setTimeout : void 0,
    R0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    $h = typeof Promise == "function" ? Promise : void 0,
    w0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof $h < "u"
          ? function (e) {
              return $h.resolve(null).then(e).catch(N0);
            }
          : Jh;
  function N0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function An(e) {
    return e === "head";
  }
  function Fh(e, t) {
    var n = t,
      l = 0,
      a = 0;
    do {
      var r = n.nextSibling;
      if ((e.removeChild(n), r && r.nodeType === 8))
        if (((n = r.data), n === "/$")) {
          if (0 < l && 8 > l) {
            n = l;
            var o = e.ownerDocument;
            if ((n & 1 && Ca(o.documentElement), n & 2 && Ca(o.body), n & 4))
              for (n = o.head, Ca(n), o = n.firstChild; o; ) {
                var h = o.nextSibling,
                  g = o.nodeName;
                (o[Zl] ||
                  g === "SCRIPT" ||
                  g === "STYLE" ||
                  (g === "LINK" && o.rel.toLowerCase() === "stylesheet") ||
                  n.removeChild(o),
                  (o = h));
              }
          }
          if (a === 0) {
            (e.removeChild(r), Ha(t));
            return;
          }
          a--;
        } else
          n === "$" || n === "$?" || n === "$!"
            ? a++
            : (l = n.charCodeAt(0) - 48);
      else l = 0;
      n = r;
    } while (n);
    Ha(t);
  }
  function Mr(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Mr(n), Bu(n));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function O0(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (l) {
        if (!e[Zl])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((r = e.getAttribute("rel")),
                r === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                r !== a.rel ||
                e.getAttribute("href") !==
                  (a.href == null || a.href === "" ? null : a.href) ||
                e.getAttribute("crossorigin") !==
                  (a.crossOrigin == null ? null : a.crossOrigin) ||
                e.getAttribute("title") !== (a.title == null ? null : a.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((r = e.getAttribute("src")),
                (r !== (a.src == null ? null : a.src) ||
                  e.getAttribute("type") !== (a.type == null ? null : a.type) ||
                  e.getAttribute("crossorigin") !==
                    (a.crossOrigin == null ? null : a.crossOrigin)) &&
                  r &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var r = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && e.getAttribute("name") === r) return e;
      } else return e;
      if (((e = wt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function C0(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = wt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Dr(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function M0(e, t) {
    var n = e.ownerDocument;
    if (e.data !== "$?" || n.readyState === "complete") t();
    else {
      var l = function () {
        (t(), n.removeEventListener("DOMContentLoaded", l));
      };
      (n.addEventListener("DOMContentLoaded", l), (e._reactRetry = l));
    }
  }
  function wt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var zr = null;
  function Wh(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Ph(e, t, n) {
    switch (((t = Fi(n)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(u(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(u(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function Ca(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Bu(e);
  }
  var _t = new Map(),
    Ih = new Set();
  function Wi(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var nn = B.d;
  B.d = { f: D0, r: z0, D: j0, C: U0, L: B0, m: q0, X: L0, S: H0, M: Y0 };
  function D0() {
    var e = nn.f(),
      t = Gi();
    return e || t;
  }
  function z0(e) {
    var t = tl(e);
    t !== null && t.tag === 5 && t.type === "form" ? bf(t) : nn.r(e);
  }
  var Ul = typeof document > "u" ? null : document;
  function ed(e, t, n) {
    var l = Ul;
    if (l && typeof t == "string" && t) {
      var a = yt(t);
      ((a = 'link[rel="' + e + '"][href="' + a + '"]'),
        typeof n == "string" && (a += '[crossorigin="' + n + '"]'),
        Ih.has(a) ||
          (Ih.add(a),
          (e = { rel: e, crossOrigin: n, href: t }),
          l.querySelector(a) === null &&
            ((t = l.createElement("link")),
            Ze(t, "link", e),
            Le(t),
            l.head.appendChild(t))));
    }
  }
  function j0(e) {
    (nn.D(e), ed("dns-prefetch", e, null));
  }
  function U0(e, t) {
    (nn.C(e, t), ed("preconnect", e, t));
  }
  function B0(e, t, n) {
    nn.L(e, t, n);
    var l = Ul;
    if (l && e && t) {
      var a = 'link[rel="preload"][as="' + yt(t) + '"]';
      t === "image" && n && n.imageSrcSet
        ? ((a += '[imagesrcset="' + yt(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (a += '[imagesizes="' + yt(n.imageSizes) + '"]'))
        : (a += '[href="' + yt(e) + '"]');
      var r = a;
      switch (t) {
        case "style":
          r = Bl(e);
          break;
        case "script":
          r = ql(e);
      }
      _t.has(r) ||
        ((e = E(
          {
            rel: "preload",
            href: t === "image" && n && n.imageSrcSet ? void 0 : e,
            as: t,
          },
          n
        )),
        _t.set(r, e),
        l.querySelector(a) !== null ||
          (t === "style" && l.querySelector(Ma(r))) ||
          (t === "script" && l.querySelector(Da(r))) ||
          ((t = l.createElement("link")),
          Ze(t, "link", e),
          Le(t),
          l.head.appendChild(t)));
    }
  }
  function q0(e, t) {
    nn.m(e, t);
    var n = Ul;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script",
        a =
          'link[rel="modulepreload"][as="' + yt(l) + '"][href="' + yt(e) + '"]',
        r = a;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = ql(e);
      }
      if (
        !_t.has(r) &&
        ((e = E({ rel: "modulepreload", href: e }, t)),
        _t.set(r, e),
        n.querySelector(a) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Da(r))) return;
        }
        ((l = n.createElement("link")),
          Ze(l, "link", e),
          Le(l),
          n.head.appendChild(l));
      }
    }
  }
  function H0(e, t, n) {
    nn.S(e, t, n);
    var l = Ul;
    if (l && e) {
      var a = nl(l).hoistableStyles,
        r = Bl(e);
      t = t || "default";
      var o = a.get(r);
      if (!o) {
        var h = { loading: 0, preload: null };
        if ((o = l.querySelector(Ma(r)))) h.loading = 5;
        else {
          ((e = E({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = _t.get(r)) && jr(e, n));
          var g = (o = l.createElement("link"));
          (Le(g),
            Ze(g, "link", e),
            (g._p = new Promise(function (R, C) {
              ((g.onload = R), (g.onerror = C));
            })),
            g.addEventListener("load", function () {
              h.loading |= 1;
            }),
            g.addEventListener("error", function () {
              h.loading |= 2;
            }),
            (h.loading |= 4),
            Pi(o, t, l));
        }
        ((o = { type: "stylesheet", instance: o, count: 1, state: h }),
          a.set(r, o));
      }
    }
  }
  function L0(e, t) {
    nn.X(e, t);
    var n = Ul;
    if (n && e) {
      var l = nl(n).hoistableScripts,
        a = ql(e),
        r = l.get(a);
      r ||
        ((r = n.querySelector(Da(a))),
        r ||
          ((e = E({ src: e, async: !0 }, t)),
          (t = _t.get(a)) && Ur(e, t),
          (r = n.createElement("script")),
          Le(r),
          Ze(r, "link", e),
          n.head.appendChild(r)),
        (r = { type: "script", instance: r, count: 1, state: null }),
        l.set(a, r));
    }
  }
  function Y0(e, t) {
    nn.M(e, t);
    var n = Ul;
    if (n && e) {
      var l = nl(n).hoistableScripts,
        a = ql(e),
        r = l.get(a);
      r ||
        ((r = n.querySelector(Da(a))),
        r ||
          ((e = E({ src: e, async: !0, type: "module" }, t)),
          (t = _t.get(a)) && Ur(e, t),
          (r = n.createElement("script")),
          Le(r),
          Ze(r, "link", e),
          n.head.appendChild(r)),
        (r = { type: "script", instance: r, count: 1, state: null }),
        l.set(a, r));
    }
  }
  function td(e, t, n, l) {
    var a = (a = ne.current) ? Wi(a) : null;
    if (!a) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((t = Bl(n.href)),
            (n = nl(a).hoistableStyles),
            (l = n.get(t)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              n.set(t, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          e = Bl(n.href);
          var r = nl(a).hoistableStyles,
            o = r.get(e);
          if (
            (o ||
              ((a = a.ownerDocument || a),
              (o = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              r.set(e, o),
              (r = a.querySelector(Ma(e))) &&
                !r._p &&
                ((o.instance = r), (o.state.loading = 5)),
              _t.has(e) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                _t.set(e, n),
                r || V0(a, e, n, o.state))),
            t && l === null)
          )
            throw Error(u(528, ""));
          return o;
        }
        if (t && l !== null) throw Error(u(529, ""));
        return null;
      case "script":
        return (
          (t = n.async),
          (n = n.src),
          typeof n == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = ql(n)),
              (n = nl(a).hoistableScripts),
              (l = n.get(t)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(t, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(u(444, e));
    }
  }
  function Bl(e) {
    return 'href="' + yt(e) + '"';
  }
  function Ma(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function nd(e) {
    return E({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function V0(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (l.loading = 1)
      : ((t = e.createElement("link")),
        (l.preload = t),
        t.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        Ze(t, "link", n),
        Le(t),
        e.head.appendChild(t));
  }
  function ql(e) {
    return '[src="' + yt(e) + '"]';
  }
  function Da(e) {
    return "script[async]" + e;
  }
  function ld(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var l = e.querySelector('style[data-href~="' + yt(n.href) + '"]');
          if (l) return ((t.instance = l), Le(l), l);
          var a = E({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (e.ownerDocument || e).createElement("style")),
            Le(l),
            Ze(l, "style", a),
            Pi(l, n.precedence, e),
            (t.instance = l)
          );
        case "stylesheet":
          a = Bl(n.href);
          var r = e.querySelector(Ma(a));
          if (r) return ((t.state.loading |= 4), (t.instance = r), Le(r), r);
          ((l = nd(n)),
            (a = _t.get(a)) && jr(l, a),
            (r = (e.ownerDocument || e).createElement("link")),
            Le(r));
          var o = r;
          return (
            (o._p = new Promise(function (h, g) {
              ((o.onload = h), (o.onerror = g));
            })),
            Ze(r, "link", l),
            (t.state.loading |= 4),
            Pi(r, n.precedence, e),
            (t.instance = r)
          );
        case "script":
          return (
            (r = ql(n.src)),
            (a = e.querySelector(Da(r)))
              ? ((t.instance = a), Le(a), a)
              : ((l = n),
                (a = _t.get(r)) && ((l = E({}, n)), Ur(l, a)),
                (e = e.ownerDocument || e),
                (a = e.createElement("script")),
                Le(a),
                Ze(a, "link", l),
                e.head.appendChild(a),
                (t.instance = a))
          );
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((l = t.instance), (t.state.loading |= 4), Pi(l, n.precedence, e));
    return t.instance;
  }
  function Pi(e, t, n) {
    for (
      var l = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        a = l.length ? l[l.length - 1] : null,
        r = a,
        o = 0;
      o < l.length;
      o++
    ) {
      var h = l[o];
      if (h.dataset.precedence === t) r = h;
      else if (r !== a) break;
    }
    r
      ? r.parentNode.insertBefore(e, r.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function jr(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Ur(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Ii = null;
  function ad(e, t, n) {
    if (Ii === null) {
      var l = new Map(),
        a = (Ii = new Map());
      a.set(n, l);
    } else ((a = Ii), (l = a.get(n)), l || ((l = new Map()), a.set(n, l)));
    if (l.has(e)) return l;
    for (
      l.set(e, null), n = n.getElementsByTagName(e), a = 0;
      a < n.length;
      a++
    ) {
      var r = n[a];
      if (
        !(
          r[Zl] ||
          r[ke] ||
          (e === "link" && r.getAttribute("rel") === "stylesheet")
        ) &&
        r.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var o = r.getAttribute(t) || "";
        o = e + o;
        var h = l.get(o);
        h ? h.push(r) : l.set(o, [r]);
      }
    }
    return l;
  }
  function id(e, t, n) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      ));
  }
  function G0(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled),
              typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function ud(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var za = null;
  function X0() {}
  function Q0(e, t, n) {
    if (za === null) throw Error(u(475));
    var l = za;
    if (
      t.type === "stylesheet" &&
      (typeof n.media != "string" || matchMedia(n.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var a = Bl(n.href),
          r = e.querySelector(Ma(a));
        if (r) {
          ((e = r._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (l.count++, (l = eu.bind(l)), e.then(l, l)),
            (t.state.loading |= 4),
            (t.instance = r),
            Le(r));
          return;
        }
        ((r = e.ownerDocument || e),
          (n = nd(n)),
          (a = _t.get(a)) && jr(n, a),
          (r = r.createElement("link")),
          Le(r));
        var o = r;
        ((o._p = new Promise(function (h, g) {
          ((o.onload = h), (o.onerror = g));
        })),
          Ze(r, "link", n),
          (t.instance = r));
      }
      (l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (l.count++,
          (t = eu.bind(l)),
          e.addEventListener("load", t),
          e.addEventListener("error", t)));
    }
  }
  function Z0() {
    if (za === null) throw Error(u(475));
    var e = za;
    return (
      e.stylesheets && e.count === 0 && Br(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Br(e, e.stylesheets), e.unsuspend)) {
                var l = e.unsuspend;
                ((e.unsuspend = null), l());
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                ((e.unsuspend = null), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function eu() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Br(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var tu = null;
  function Br(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (tu = new Map()),
        t.forEach(k0, e),
        (tu = null),
        eu.call(e)));
  }
  function k0(e, t) {
    if (!(t.state.loading & 4)) {
      var n = tu.get(e);
      if (n) var l = n.get(null);
      else {
        ((n = new Map()), tu.set(e, n));
        for (
          var a = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            r = 0;
          r < a.length;
          r++
        ) {
          var o = a[r];
          (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") &&
            (n.set(o.dataset.precedence, o), (l = o));
        }
        l && n.set(null, l);
      }
      ((a = t.instance),
        (o = a.getAttribute("data-precedence")),
        (r = n.get(o) || l),
        r === l && n.set(null, a),
        n.set(o, a),
        this.count++,
        (l = eu.bind(this)),
        a.addEventListener("load", l),
        a.addEventListener("error", l),
        r
          ? r.parentNode.insertBefore(a, r.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(a, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var ja = {
    $$typeof: $,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0,
  };
  function K0(e, t, n, l, a, r, o, h) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Du(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Du(0)),
      (this.hiddenUpdates = Du(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = a),
      (this.onCaughtError = r),
      (this.onRecoverableError = o),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = h),
      (this.incompleteTransitions = new Map()));
  }
  function sd(e, t, n, l, a, r, o, h, g, R, C, z) {
    return (
      (e = new K0(e, t, n, o, h, g, R, z)),
      (t = 1),
      r === !0 && (t |= 24),
      (r = rt(3, null, null, t)),
      (e.current = r),
      (r.stateNode = e),
      (t = gs()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (r.memoizedState = { element: l, isDehydrated: n, cache: t }),
      xs(r),
      e
    );
  }
  function rd(e) {
    return e ? ((e = ml), e) : ml;
  }
  function cd(e, t, n, l, a, r) {
    ((a = rd(a)),
      l.context === null ? (l.context = a) : (l.pendingContext = a),
      (l = hn(t)),
      (l.payload = { element: n }),
      (r = r === void 0 ? null : r),
      r !== null && (l.callback = r),
      (n = dn(e, l, t)),
      n !== null && (dt(n, e, t), oa(n, e, t)));
  }
  function od(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function qr(e, t) {
    (od(e, t), (e = e.alternate) && od(e, t));
  }
  function fd(e) {
    if (e.tag === 13) {
      var t = dl(e, 67108864);
      (t !== null && dt(t, e, 67108864), qr(e, 67108864));
    }
  }
  var nu = !0;
  function J0(e, t, n, l) {
    var a = A.T;
    A.T = null;
    var r = B.p;
    try {
      ((B.p = 2), Hr(e, t, n, l));
    } finally {
      ((B.p = r), (A.T = a));
    }
  }
  function $0(e, t, n, l) {
    var a = A.T;
    A.T = null;
    var r = B.p;
    try {
      ((B.p = 8), Hr(e, t, n, l));
    } finally {
      ((B.p = r), (A.T = a));
    }
  }
  function Hr(e, t, n, l) {
    if (nu) {
      var a = Lr(l);
      if (a === null) (Ar(e, t, l, lu, n), dd(e, l));
      else if (W0(a, e, t, n, l)) l.stopPropagation();
      else if ((dd(e, l), t & 4 && -1 < F0.indexOf(e))) {
        for (; a !== null; ) {
          var r = tl(a);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (((r = r.stateNode), r.current.memoizedState.isDehydrated)) {
                  var o = zn(r.pendingLanes);
                  if (o !== 0) {
                    var h = r;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; o; ) {
                      var g = 1 << (31 - ut(o));
                      ((h.entanglements[1] |= g), (o &= ~g));
                    }
                    (jt(r), (me & 6) === 0 && ((Yi = Ot() + 500), wa(0)));
                  }
                }
                break;
              case 13:
                ((h = dl(r, 2)), h !== null && dt(h, r, 2), Gi(), qr(r, 2));
            }
          if (((r = Lr(l)), r === null && Ar(e, t, l, lu, n), r === a)) break;
          a = r;
        }
        a !== null && l.stopPropagation();
      } else Ar(e, t, l, null, n);
    }
  }
  function Lr(e) {
    return ((e = Qu(e)), Yr(e));
  }
  var lu = null;
  function Yr(e) {
    if (((lu = null), (e = el(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = m(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((lu = e), null);
  }
  function hd(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Um()) {
          case Tc:
            return 2;
          case Ac:
            return 8;
          case $a:
          case Bm:
            return 32;
          case Rc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Vr = !1,
    Rn = null,
    wn = null,
    Nn = null,
    Ua = new Map(),
    Ba = new Map(),
    On = [],
    F0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function dd(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Rn = null;
        break;
      case "dragenter":
      case "dragleave":
        wn = null;
        break;
      case "mouseover":
      case "mouseout":
        Nn = null;
        break;
      case "pointerover":
      case "pointerout":
        Ua.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ba.delete(t.pointerId);
    }
  }
  function qa(e, t, n, l, a, r) {
    return e === null || e.nativeEvent !== r
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: l,
          nativeEvent: r,
          targetContainers: [a],
        }),
        t !== null && ((t = tl(t)), t !== null && fd(t)),
        e)
      : ((e.eventSystemFlags |= l),
        (t = e.targetContainers),
        a !== null && t.indexOf(a) === -1 && t.push(a),
        e);
  }
  function W0(e, t, n, l, a) {
    switch (t) {
      case "focusin":
        return ((Rn = qa(Rn, e, t, n, l, a)), !0);
      case "dragenter":
        return ((wn = qa(wn, e, t, n, l, a)), !0);
      case "mouseover":
        return ((Nn = qa(Nn, e, t, n, l, a)), !0);
      case "pointerover":
        var r = a.pointerId;
        return (Ua.set(r, qa(Ua.get(r) || null, e, t, n, l, a)), !0);
      case "gotpointercapture":
        return (
          (r = a.pointerId),
          Ba.set(r, qa(Ba.get(r) || null, e, t, n, l, a)),
          !0
        );
    }
    return !1;
  }
  function md(e) {
    var t = el(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = m(n)), t !== null)) {
            ((e.blockedOn = t),
              Qm(e.priority, function () {
                if (n.tag === 13) {
                  var l = ht();
                  l = zu(l);
                  var a = dl(n, l);
                  (a !== null && dt(a, n, l), qr(n, l));
                }
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function au(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Lr(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(n.type, n);
        ((Xu = l), n.target.dispatchEvent(l), (Xu = null));
      } else return ((t = tl(n)), t !== null && fd(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function pd(e, t, n) {
    au(e) && n.delete(t);
  }
  function P0() {
    ((Vr = !1),
      Rn !== null && au(Rn) && (Rn = null),
      wn !== null && au(wn) && (wn = null),
      Nn !== null && au(Nn) && (Nn = null),
      Ua.forEach(pd),
      Ba.forEach(pd));
  }
  function iu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Vr ||
        ((Vr = !0),
        s.unstable_scheduleCallback(s.unstable_NormalPriority, P0)));
  }
  var uu = null;
  function yd(e) {
    uu !== e &&
      ((uu = e),
      s.unstable_scheduleCallback(s.unstable_NormalPriority, function () {
        uu === e && (uu = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            l = e[t + 1],
            a = e[t + 2];
          if (typeof l != "function") {
            if (Yr(l || n) === null) continue;
            break;
          }
          var r = tl(n);
          r !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Ys(r, { pending: !0, data: a, method: n.method, action: l }, l, a));
        }
      }));
  }
  function Ha(e) {
    function t(g) {
      return iu(g, e);
    }
    (Rn !== null && iu(Rn, e),
      wn !== null && iu(wn, e),
      Nn !== null && iu(Nn, e),
      Ua.forEach(t),
      Ba.forEach(t));
    for (var n = 0; n < On.length; n++) {
      var l = On[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < On.length && ((n = On[0]), n.blockedOn === null); )
      (md(n), n.blockedOn === null && On.shift());
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (l = 0; l < n.length; l += 3) {
        var a = n[l],
          r = n[l + 1],
          o = a[Ie] || null;
        if (typeof r == "function") o || yd(n);
        else if (o) {
          var h = null;
          if (r && r.hasAttribute("formAction")) {
            if (((a = r), (o = r[Ie] || null))) h = o.formAction;
            else if (Yr(a) !== null) continue;
          } else h = o.action;
          (typeof h == "function" ? (n[l + 1] = h) : (n.splice(l, 3), (l -= 3)),
            yd(n));
        }
      }
  }
  function Gr(e) {
    this._internalRoot = e;
  }
  ((su.prototype.render = Gr.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      var n = t.current,
        l = ht();
      cd(n, l, e, t, null, null);
    }),
    (su.prototype.unmount = Gr.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (cd(e.current, 2, null, e, null, null), Gi(), (t[In] = null));
        }
      }));
  function su(e) {
    this._internalRoot = e;
  }
  su.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Mc();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < On.length && t !== 0 && t < On[n].priority; n++);
      (On.splice(n, 0, e), n === 0 && md(e));
    }
  };
  var gd = i.version;
  if (gd !== "19.1.1") throw Error(u(527, gd, "19.1.1"));
  B.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(u(188))
        : ((e = Object.keys(e).join(",")), Error(u(268, e)));
    return (
      (e = p(t)),
      (e = e !== null ? y(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var I0 = {
    bundleType: 0,
    version: "19.1.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.1.1",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ru = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ru.isDisabled && ru.supportsFiber)
      try {
        ((Gl = ru.inject(I0)), (it = ru));
      } catch {}
  }
  return (
    (Ya.createRoot = function (e, t) {
      if (!f(e)) throw Error(u(299));
      var n = !1,
        l = "",
        a = zf,
        r = jf,
        o = Uf,
        h = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (a = t.onUncaughtError),
          t.onCaughtError !== void 0 && (r = t.onCaughtError),
          t.onRecoverableError !== void 0 && (o = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (h = t.unstable_transitionCallbacks)),
        (t = sd(e, 1, !1, null, null, n, l, a, r, o, h, null)),
        (e[In] = t.current),
        Tr(e),
        new Gr(t)
      );
    }),
    (Ya.hydrateRoot = function (e, t, n) {
      if (!f(e)) throw Error(u(299));
      var l = !1,
        a = "",
        r = zf,
        o = jf,
        h = Uf,
        g = null,
        R = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (r = n.onUncaughtError),
          n.onCaughtError !== void 0 && (o = n.onCaughtError),
          n.onRecoverableError !== void 0 && (h = n.onRecoverableError),
          n.unstable_transitionCallbacks !== void 0 &&
            (g = n.unstable_transitionCallbacks),
          n.formState !== void 0 && (R = n.formState)),
        (t = sd(e, 1, !0, t, n ?? null, l, a, r, o, h, g, R)),
        (t.context = rd(null)),
        (n = t.current),
        (l = ht()),
        (l = zu(l)),
        (a = hn(l)),
        (a.callback = null),
        dn(n, a, l),
        (n = l),
        (t.current.lanes = n),
        Ql(t, n),
        jt(t),
        (e[In] = t.current),
        Tr(e),
        new su(t)
      );
    }),
    (Ya.version = "19.1.1"),
    Ya
  );
}
var wd;
function cy() {
  if (wd) return Zr.exports;
  wd = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (i) {
        console.error(i);
      }
  }
  return (s(), (Zr.exports = ry()), Zr.exports);
}
var oy = cy();
const fy = hc(oy);
/**
 * react-router v7.8.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Nd = "popstate";
function hy(s = {}) {
  function i(u, f) {
    let { pathname: d, search: m, hash: x } = u.location;
    return ac(
      "",
      { pathname: d, search: m, hash: x },
      (f.state && f.state.usr) || null,
      (f.state && f.state.key) || "default"
    );
  }
  function c(u, f) {
    return typeof f == "string" ? f : Qa(f);
  }
  return my(i, c, null, s);
}
function Re(s, i) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(i);
}
function Bt(s, i) {
  if (!s) {
    typeof console < "u" && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function dy() {
  return Math.random().toString(36).substring(2, 10);
}
function Od(s, i) {
  return { usr: s.state, key: s.key, idx: i };
}
function ac(s, i, c = null, u) {
  return {
    pathname: typeof s == "string" ? s : s.pathname,
    search: "",
    hash: "",
    ...(typeof i == "string" ? Hl(i) : i),
    state: c,
    key: (i && i.key) || u || dy(),
  };
}
function Qa({ pathname: s = "/", search: i = "", hash: c = "" }) {
  return (
    i && i !== "?" && (s += i.charAt(0) === "?" ? i : "?" + i),
    c && c !== "#" && (s += c.charAt(0) === "#" ? c : "#" + c),
    s
  );
}
function Hl(s) {
  let i = {};
  if (s) {
    let c = s.indexOf("#");
    c >= 0 && ((i.hash = s.substring(c)), (s = s.substring(0, c)));
    let u = s.indexOf("?");
    (u >= 0 && ((i.search = s.substring(u)), (s = s.substring(0, u))),
      s && (i.pathname = s));
  }
  return i;
}
function my(s, i, c, u = {}) {
  let { window: f = document.defaultView, v5Compat: d = !1 } = u,
    m = f.history,
    x = "POP",
    p = null,
    y = E();
  y == null && ((y = 0), m.replaceState({ ...m.state, idx: y }, ""));
  function E() {
    return (m.state || { idx: null }).idx;
  }
  function M() {
    x = "POP";
    let L = E(),
      G = L == null ? null : L - y;
    ((y = L), p && p({ action: x, location: X.location, delta: G }));
  }
  function j(L, G) {
    x = "PUSH";
    let Y = ac(X.location, L, G);
    y = E() + 1;
    let $ = Od(Y, y),
      oe = X.createHref(Y);
    try {
      m.pushState($, "", oe);
    } catch (F) {
      if (F instanceof DOMException && F.name === "DataCloneError") throw F;
      f.location.assign(oe);
    }
    d && p && p({ action: x, location: X.location, delta: 1 });
  }
  function q(L, G) {
    x = "REPLACE";
    let Y = ac(X.location, L, G);
    y = E();
    let $ = Od(Y, y),
      oe = X.createHref(Y);
    (m.replaceState($, "", oe),
      d && p && p({ action: x, location: X.location, delta: 0 }));
  }
  function H(L) {
    return py(L);
  }
  let X = {
    get action() {
      return x;
    },
    get location() {
      return s(f, m);
    },
    listen(L) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        f.addEventListener(Nd, M),
        (p = L),
        () => {
          (f.removeEventListener(Nd, M), (p = null));
        }
      );
    },
    createHref(L) {
      return i(f, L);
    },
    createURL: H,
    encodeLocation(L) {
      let G = H(L);
      return { pathname: G.pathname, search: G.search, hash: G.hash };
    },
    push: j,
    replace: q,
    go(L) {
      return m.go(L);
    },
  };
  return X;
}
function py(s, i = !1) {
  let c = "http://localhost";
  (typeof window < "u" &&
    (c =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Re(c, "No window.location.(origin|href) available to create URL"));
  let u = typeof s == "string" ? s : Qa(s);
  return (
    (u = u.replace(/ $/, "%20")),
    !i && u.startsWith("//") && (u = c + u),
    new URL(u, c)
  );
}
function Kd(s, i, c = "/") {
  return yy(s, i, c, !1);
}
function yy(s, i, c, u) {
  let f = typeof i == "string" ? Hl(i) : i,
    d = an(f.pathname || "/", c);
  if (d == null) return null;
  let m = Jd(s);
  gy(m);
  let x = null;
  for (let p = 0; x == null && p < m.length; ++p) {
    let y = Ny(d);
    x = Ry(m[p], y, u);
  }
  return x;
}
function Jd(s, i = [], c = [], u = "", f = !1) {
  let d = (m, x, p = f, y) => {
    let E = {
      relativePath: y === void 0 ? m.path || "" : y,
      caseSensitive: m.caseSensitive === !0,
      childrenIndex: x,
      route: m,
    };
    if (E.relativePath.startsWith("/")) {
      if (!E.relativePath.startsWith(u) && p) return;
      (Re(
        E.relativePath.startsWith(u),
        `Absolute route path "${E.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (E.relativePath = E.relativePath.slice(u.length)));
    }
    let M = ln([u, E.relativePath]),
      j = c.concat(E);
    (m.children &&
      m.children.length > 0 &&
      (Re(
        m.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${M}".`
      ),
      Jd(m.children, i, j, M, p)),
      !(m.path == null && !m.index) &&
        i.push({ path: M, score: Ty(M, m.index), routesMeta: j }));
  };
  return (
    s.forEach((m, x) => {
      if (m.path === "" || !m.path?.includes("?")) d(m, x);
      else for (let p of $d(m.path)) d(m, x, !0, p);
    }),
    i
  );
}
function $d(s) {
  let i = s.split("/");
  if (i.length === 0) return [];
  let [c, ...u] = i,
    f = c.endsWith("?"),
    d = c.replace(/\?$/, "");
  if (u.length === 0) return f ? [d, ""] : [d];
  let m = $d(u.join("/")),
    x = [];
  return (
    x.push(...m.map((p) => (p === "" ? d : [d, p].join("/")))),
    f && x.push(...m),
    x.map((p) => (s.startsWith("/") && p === "" ? "/" : p))
  );
}
function gy(s) {
  s.sort((i, c) =>
    i.score !== c.score
      ? c.score - i.score
      : Ay(
          i.routesMeta.map((u) => u.childrenIndex),
          c.routesMeta.map((u) => u.childrenIndex)
        )
  );
}
var vy = /^:[\w-]+$/,
  by = 3,
  Sy = 2,
  xy = 1,
  Ey = 10,
  _y = -2,
  Cd = (s) => s === "*";
function Ty(s, i) {
  let c = s.split("/"),
    u = c.length;
  return (
    c.some(Cd) && (u += _y),
    i && (u += Sy),
    c
      .filter((f) => !Cd(f))
      .reduce((f, d) => f + (vy.test(d) ? by : d === "" ? xy : Ey), u)
  );
}
function Ay(s, i) {
  return s.length === i.length && s.slice(0, -1).every((u, f) => u === i[f])
    ? s[s.length - 1] - i[i.length - 1]
    : 0;
}
function Ry(s, i, c = !1) {
  let { routesMeta: u } = s,
    f = {},
    d = "/",
    m = [];
  for (let x = 0; x < u.length; ++x) {
    let p = u[x],
      y = x === u.length - 1,
      E = d === "/" ? i : i.slice(d.length) || "/",
      M = bu(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: y },
        E
      ),
      j = p.route;
    if (
      (!M &&
        y &&
        c &&
        !u[u.length - 1].route.index &&
        (M = bu(
          { path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
          E
        )),
      !M)
    )
      return null;
    (Object.assign(f, M.params),
      m.push({
        params: f,
        pathname: ln([d, M.pathname]),
        pathnameBase: Dy(ln([d, M.pathnameBase])),
        route: j,
      }),
      M.pathnameBase !== "/" && (d = ln([d, M.pathnameBase])));
  }
  return m;
}
function bu(s, i) {
  typeof s == "string" && (s = { path: s, caseSensitive: !1, end: !0 });
  let [c, u] = wy(s.path, s.caseSensitive, s.end),
    f = i.match(c);
  if (!f) return null;
  let d = f[0],
    m = d.replace(/(.)\/+$/, "$1"),
    x = f.slice(1);
  return {
    params: u.reduce((y, { paramName: E, isOptional: M }, j) => {
      if (E === "*") {
        let H = x[j] || "";
        m = d.slice(0, d.length - H.length).replace(/(.)\/+$/, "$1");
      }
      const q = x[j];
      return (
        M && !q ? (y[E] = void 0) : (y[E] = (q || "").replace(/%2F/g, "/")),
        y
      );
    }, {}),
    pathname: d,
    pathnameBase: m,
    pattern: s,
  };
}
function wy(s, i = !1, c = !0) {
  Bt(
    s === "*" || !s.endsWith("*") || s.endsWith("/*"),
    `Route path "${s}" will be treated as if it were "${s.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(/\*$/, "/*")}".`
  );
  let u = [],
    f =
      "^" +
      s
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (m, x, p) => (
            u.push({ paramName: x, isOptional: p != null }),
            p ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    s.endsWith("*")
      ? (u.push({ paramName: "*" }),
        (f += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : c
        ? (f += "\\/*$")
        : s !== "" && s !== "/" && (f += "(?:(?=\\/|$))"),
    [new RegExp(f, i ? void 0 : "i"), u]
  );
}
function Ny(s) {
  try {
    return s
      .split("/")
      .map((i) => decodeURIComponent(i).replace(/\//g, "%2F"))
      .join("/");
  } catch (i) {
    return (
      Bt(
        !1,
        `The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      s
    );
  }
}
function an(s, i) {
  if (i === "/") return s;
  if (!s.toLowerCase().startsWith(i.toLowerCase())) return null;
  let c = i.endsWith("/") ? i.length - 1 : i.length,
    u = s.charAt(c);
  return u && u !== "/" ? null : s.slice(c) || "/";
}
function Oy(s, i = "/") {
  let {
    pathname: c,
    search: u = "",
    hash: f = "",
  } = typeof s == "string" ? Hl(s) : s;
  return {
    pathname: c ? (c.startsWith("/") ? c : Cy(c, i)) : i,
    search: zy(u),
    hash: jy(f),
  };
}
function Cy(s, i) {
  let c = i.replace(/\/+$/, "").split("/");
  return (
    s.split("/").forEach((f) => {
      f === ".." ? c.length > 1 && c.pop() : f !== "." && c.push(f);
    }),
    c.length > 1 ? c.join("/") : "/"
  );
}
function $r(s, i, c, u) {
  return `Cannot include a '${s}' character in a manually specified \`to.${i}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${c}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function My(s) {
  return s.filter(
    (i, c) => c === 0 || (i.route.path && i.route.path.length > 0)
  );
}
function Fd(s) {
  let i = My(s);
  return i.map((c, u) => (u === i.length - 1 ? c.pathname : c.pathnameBase));
}
function Wd(s, i, c, u = !1) {
  let f;
  typeof s == "string"
    ? (f = Hl(s))
    : ((f = { ...s }),
      Re(
        !f.pathname || !f.pathname.includes("?"),
        $r("?", "pathname", "search", f)
      ),
      Re(
        !f.pathname || !f.pathname.includes("#"),
        $r("#", "pathname", "hash", f)
      ),
      Re(!f.search || !f.search.includes("#"), $r("#", "search", "hash", f)));
  let d = s === "" || f.pathname === "",
    m = d ? "/" : f.pathname,
    x;
  if (m == null) x = c;
  else {
    let M = i.length - 1;
    if (!u && m.startsWith("..")) {
      let j = m.split("/");
      for (; j[0] === ".."; ) (j.shift(), (M -= 1));
      f.pathname = j.join("/");
    }
    x = M >= 0 ? i[M] : "/";
  }
  let p = Oy(f, x),
    y = m && m !== "/" && m.endsWith("/"),
    E = (d || m === ".") && c.endsWith("/");
  return (!p.pathname.endsWith("/") && (y || E) && (p.pathname += "/"), p);
}
var ln = (s) => s.join("/").replace(/\/\/+/g, "/"),
  Dy = (s) => s.replace(/\/+$/, "").replace(/^\/*/, "/"),
  zy = (s) => (!s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s),
  jy = (s) => (!s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s);
function Uy(s) {
  return (
    s != null &&
    typeof s.status == "number" &&
    typeof s.statusText == "string" &&
    typeof s.internal == "boolean" &&
    "data" in s
  );
}
var Pd = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Pd);
var By = ["GET", ...Pd];
new Set(By);
var Ll = w.createContext(null);
Ll.displayName = "DataRouter";
var _u = w.createContext(null);
_u.displayName = "DataRouterState";
w.createContext(!1);
var Id = w.createContext({ isTransitioning: !1 });
Id.displayName = "ViewTransition";
var qy = w.createContext(new Map());
qy.displayName = "Fetchers";
var Hy = w.createContext(null);
Hy.displayName = "Await";
var Ht = w.createContext(null);
Ht.displayName = "Navigation";
var Za = w.createContext(null);
Za.displayName = "Location";
var Lt = w.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Lt.displayName = "Route";
var mc = w.createContext(null);
mc.displayName = "RouteError";
function Ly(s, { relative: i } = {}) {
  Re(
    ka(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: c, navigator: u } = w.useContext(Ht),
    { hash: f, pathname: d, search: m } = Ka(s, { relative: i }),
    x = d;
  return (
    c !== "/" && (x = d === "/" ? c : ln([c, d])),
    u.createHref({ pathname: x, search: m, hash: f })
  );
}
function ka() {
  return w.useContext(Za) != null;
}
function Pn() {
  return (
    Re(
      ka(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    w.useContext(Za).location
  );
}
var em =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function tm(s) {
  w.useContext(Ht).static || w.useLayoutEffect(s);
}
function Tu() {
  let { isDataRoute: s } = w.useContext(Lt);
  return s ? e1() : Yy();
}
function Yy() {
  Re(
    ka(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let s = w.useContext(Ll),
    { basename: i, navigator: c } = w.useContext(Ht),
    { matches: u } = w.useContext(Lt),
    { pathname: f } = Pn(),
    d = JSON.stringify(Fd(u)),
    m = w.useRef(!1);
  return (
    tm(() => {
      m.current = !0;
    }),
    w.useCallback(
      (p, y = {}) => {
        if ((Bt(m.current, em), !m.current)) return;
        if (typeof p == "number") {
          c.go(p);
          return;
        }
        let E = Wd(p, JSON.parse(d), f, y.relative === "path");
        (s == null &&
          i !== "/" &&
          (E.pathname = E.pathname === "/" ? i : ln([i, E.pathname])),
          (y.replace ? c.replace : c.push)(E, y.state, y));
      },
      [i, c, d, f, s]
    )
  );
}
var Vy = w.createContext(null);
function Gy(s) {
  let i = w.useContext(Lt).outlet;
  return i && w.createElement(Vy.Provider, { value: s }, i);
}
function Ka(s, { relative: i } = {}) {
  let { matches: c } = w.useContext(Lt),
    { pathname: u } = Pn(),
    f = JSON.stringify(Fd(c));
  return w.useMemo(() => Wd(s, JSON.parse(f), u, i === "path"), [s, f, u, i]);
}
function Xy(s, i) {
  return nm(s, i);
}
function nm(s, i, c, u, f) {
  Re(
    ka(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: d } = w.useContext(Ht),
    { matches: m } = w.useContext(Lt),
    x = m[m.length - 1],
    p = x ? x.params : {},
    y = x ? x.pathname : "/",
    E = x ? x.pathnameBase : "/",
    M = x && x.route;
  {
    let Y = (M && M.path) || "";
    lm(
      y,
      !M || Y.endsWith("*") || Y.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${y}" (under <Route path="${Y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${Y}"> to <Route path="${Y === "/" ? "*" : `${Y}/*`}">.`
    );
  }
  let j = Pn(),
    q;
  if (i) {
    let Y = typeof i == "string" ? Hl(i) : i;
    (Re(
      E === "/" || Y.pathname?.startsWith(E),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${E}" but pathname "${Y.pathname}" was given in the \`location\` prop.`
    ),
      (q = Y));
  } else q = j;
  let H = q.pathname || "/",
    X = H;
  if (E !== "/") {
    let Y = E.replace(/^\//, "").split("/");
    X = "/" + H.replace(/^\//, "").split("/").slice(Y.length).join("/");
  }
  let L = Kd(s, { pathname: X });
  (Bt(
    M || L != null,
    `No routes matched location "${q.pathname}${q.search}${q.hash}" `
  ),
    Bt(
      L == null ||
        L[L.length - 1].route.element !== void 0 ||
        L[L.length - 1].route.Component !== void 0 ||
        L[L.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${q.pathname}${q.search}${q.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let G = Jy(
    L &&
      L.map((Y) =>
        Object.assign({}, Y, {
          params: Object.assign({}, p, Y.params),
          pathname: ln([
            E,
            d.encodeLocation
              ? d.encodeLocation(Y.pathname).pathname
              : Y.pathname,
          ]),
          pathnameBase:
            Y.pathnameBase === "/"
              ? E
              : ln([
                  E,
                  d.encodeLocation
                    ? d.encodeLocation(Y.pathnameBase).pathname
                    : Y.pathnameBase,
                ]),
        })
      ),
    m,
    c,
    u,
    f
  );
  return i && G
    ? w.createElement(
        Za.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...q,
            },
            navigationType: "POP",
          },
        },
        G
      )
    : G;
}
function Qy() {
  let s = Iy(),
    i = Uy(s)
      ? `${s.status} ${s.statusText}`
      : s instanceof Error
        ? s.message
        : JSON.stringify(s),
    c = s instanceof Error ? s.stack : null,
    u = "rgba(200,200,200, 0.5)",
    f = { padding: "0.5rem", backgroundColor: u },
    d = { padding: "2px 4px", backgroundColor: u },
    m = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", s),
    (m = w.createElement(
      w.Fragment,
      null,
      w.createElement("p", null, "💿 Hey developer 👋"),
      w.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        w.createElement("code", { style: d }, "ErrorBoundary"),
        " or",
        " ",
        w.createElement("code", { style: d }, "errorElement"),
        " prop on your route."
      )
    )),
    w.createElement(
      w.Fragment,
      null,
      w.createElement("h2", null, "Unexpected Application Error!"),
      w.createElement("h3", { style: { fontStyle: "italic" } }, i),
      c ? w.createElement("pre", { style: f }, c) : null,
      m
    )
  );
}
var Zy = w.createElement(Qy, null),
  ky = class extends w.Component {
    constructor(s) {
      (super(s),
        (this.state = {
          location: s.location,
          revalidation: s.revalidation,
          error: s.error,
        }));
    }
    static getDerivedStateFromError(s) {
      return { error: s };
    }
    static getDerivedStateFromProps(s, i) {
      return i.location !== s.location ||
        (i.revalidation !== "idle" && s.revalidation === "idle")
        ? { error: s.error, location: s.location, revalidation: s.revalidation }
        : {
            error: s.error !== void 0 ? s.error : i.error,
            location: i.location,
            revalidation: s.revalidation || i.revalidation,
          };
    }
    componentDidCatch(s, i) {
      this.props.unstable_onError
        ? this.props.unstable_onError(s, i)
        : console.error(
            "React Router caught the following error during render",
            s
          );
    }
    render() {
      return this.state.error !== void 0
        ? w.createElement(
            Lt.Provider,
            { value: this.props.routeContext },
            w.createElement(mc.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function Ky({ routeContext: s, match: i, children: c }) {
  let u = w.useContext(Ll);
  return (
    u &&
      u.static &&
      u.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (u.staticContext._deepestRenderedBoundaryId = i.route.id),
    w.createElement(Lt.Provider, { value: s }, c)
  );
}
function Jy(s, i = [], c = null, u = null, f = null) {
  if (s == null) {
    if (!c) return null;
    if (c.errors) s = c.matches;
    else if (i.length === 0 && !c.initialized && c.matches.length > 0)
      s = c.matches;
    else return null;
  }
  let d = s,
    m = c?.errors;
  if (m != null) {
    let y = d.findIndex((E) => E.route.id && m?.[E.route.id] !== void 0);
    (Re(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(m).join(",")}`
    ),
      (d = d.slice(0, Math.min(d.length, y + 1))));
  }
  let x = !1,
    p = -1;
  if (c)
    for (let y = 0; y < d.length; y++) {
      let E = d[y];
      if (
        ((E.route.HydrateFallback || E.route.hydrateFallbackElement) && (p = y),
        E.route.id)
      ) {
        let { loaderData: M, errors: j } = c,
          q =
            E.route.loader &&
            !M.hasOwnProperty(E.route.id) &&
            (!j || j[E.route.id] === void 0);
        if (E.route.lazy || q) {
          ((x = !0), p >= 0 ? (d = d.slice(0, p + 1)) : (d = [d[0]]));
          break;
        }
      }
    }
  return d.reduceRight((y, E, M) => {
    let j,
      q = !1,
      H = null,
      X = null;
    c &&
      ((j = m && E.route.id ? m[E.route.id] : void 0),
      (H = E.route.errorElement || Zy),
      x &&
        (p < 0 && M === 0
          ? (lm(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (q = !0),
            (X = null))
          : p === M &&
            ((q = !0), (X = E.route.hydrateFallbackElement || null))));
    let L = i.concat(d.slice(0, M + 1)),
      G = () => {
        let Y;
        return (
          j
            ? (Y = H)
            : q
              ? (Y = X)
              : E.route.Component
                ? (Y = w.createElement(E.route.Component, null))
                : E.route.element
                  ? (Y = E.route.element)
                  : (Y = y),
          w.createElement(Ky, {
            match: E,
            routeContext: { outlet: y, matches: L, isDataRoute: c != null },
            children: Y,
          })
        );
      };
    return c && (E.route.ErrorBoundary || E.route.errorElement || M === 0)
      ? w.createElement(ky, {
          location: c.location,
          revalidation: c.revalidation,
          component: H,
          error: j,
          children: G(),
          routeContext: { outlet: null, matches: L, isDataRoute: !0 },
          unstable_onError: u,
        })
      : G();
  }, null);
}
function pc(s) {
  return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function $y(s) {
  let i = w.useContext(Ll);
  return (Re(i, pc(s)), i);
}
function Fy(s) {
  let i = w.useContext(_u);
  return (Re(i, pc(s)), i);
}
function Wy(s) {
  let i = w.useContext(Lt);
  return (Re(i, pc(s)), i);
}
function yc(s) {
  let i = Wy(s),
    c = i.matches[i.matches.length - 1];
  return (
    Re(
      c.route.id,
      `${s} can only be used on routes that contain a unique "id"`
    ),
    c.route.id
  );
}
function Py() {
  return yc("useRouteId");
}
function Iy() {
  let s = w.useContext(mc),
    i = Fy("useRouteError"),
    c = yc("useRouteError");
  return s !== void 0 ? s : i.errors?.[c];
}
function e1() {
  let { router: s } = $y("useNavigate"),
    i = yc("useNavigate"),
    c = w.useRef(!1);
  return (
    tm(() => {
      c.current = !0;
    }),
    w.useCallback(
      async (f, d = {}) => {
        (Bt(c.current, em),
          c.current &&
            (typeof f == "number"
              ? s.navigate(f)
              : await s.navigate(f, { fromRouteId: i, ...d })));
      },
      [s, i]
    )
  );
}
var Md = {};
function lm(s, i, c) {
  !i && !Md[s] && ((Md[s] = !0), Bt(!1, c));
}
w.memo(t1);
function t1({ routes: s, future: i, state: c, unstable_onError: u }) {
  return nm(s, void 0, c, u, i);
}
function n1(s) {
  return Gy(s.context);
}
function Mn(s) {
  Re(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function l1({
  basename: s = "/",
  children: i = null,
  location: c,
  navigationType: u = "POP",
  navigator: f,
  static: d = !1,
}) {
  Re(
    !ka(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = s.replace(/^\/*/, "/"),
    x = w.useMemo(
      () => ({ basename: m, navigator: f, static: d, future: {} }),
      [m, f, d]
    );
  typeof c == "string" && (c = Hl(c));
  let {
      pathname: p = "/",
      search: y = "",
      hash: E = "",
      state: M = null,
      key: j = "default",
    } = c,
    q = w.useMemo(() => {
      let H = an(p, m);
      return H == null
        ? null
        : {
            location: { pathname: H, search: y, hash: E, state: M, key: j },
            navigationType: u,
          };
    }, [m, p, y, E, M, j, u]);
  return (
    Bt(
      q != null,
      `<Router basename="${m}"> is not able to match the URL "${p}${y}${E}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    q == null
      ? null
      : w.createElement(
          Ht.Provider,
          { value: x },
          w.createElement(Za.Provider, { children: i, value: q })
        )
  );
}
function a1({ children: s, location: i }) {
  return Xy(ic(s), i);
}
function ic(s, i = []) {
  let c = [];
  return (
    w.Children.forEach(s, (u, f) => {
      if (!w.isValidElement(u)) return;
      let d = [...i, f];
      if (u.type === w.Fragment) {
        c.push.apply(c, ic(u.props.children, d));
        return;
      }
      (Re(
        u.type === Mn,
        `[${typeof u.type == "string" ? u.type : u.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Re(
          !u.props.index || !u.props.children,
          "An index route cannot have child routes."
        ));
      let m = {
        id: u.props.id || d.join("-"),
        caseSensitive: u.props.caseSensitive,
        element: u.props.element,
        Component: u.props.Component,
        index: u.props.index,
        path: u.props.path,
        loader: u.props.loader,
        action: u.props.action,
        hydrateFallbackElement: u.props.hydrateFallbackElement,
        HydrateFallback: u.props.HydrateFallback,
        errorElement: u.props.errorElement,
        ErrorBoundary: u.props.ErrorBoundary,
        hasErrorBoundary:
          u.props.hasErrorBoundary === !0 ||
          u.props.ErrorBoundary != null ||
          u.props.errorElement != null,
        shouldRevalidate: u.props.shouldRevalidate,
        handle: u.props.handle,
        lazy: u.props.lazy,
      };
      (u.props.children && (m.children = ic(u.props.children, d)), c.push(m));
    }),
    c
  );
}
var du = "get",
  mu = "application/x-www-form-urlencoded";
function Au(s) {
  return s != null && typeof s.tagName == "string";
}
function i1(s) {
  return Au(s) && s.tagName.toLowerCase() === "button";
}
function u1(s) {
  return Au(s) && s.tagName.toLowerCase() === "form";
}
function s1(s) {
  return Au(s) && s.tagName.toLowerCase() === "input";
}
function r1(s) {
  return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey);
}
function c1(s, i) {
  return s.button === 0 && (!i || i === "_self") && !r1(s);
}
var cu = null;
function o1() {
  if (cu === null)
    try {
      (new FormData(document.createElement("form"), 0), (cu = !1));
    } catch {
      cu = !0;
    }
  return cu;
}
var f1 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Fr(s) {
  return s != null && !f1.has(s)
    ? (Bt(
        !1,
        `"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${mu}"`
      ),
      null)
    : s;
}
function h1(s, i) {
  let c, u, f, d, m;
  if (u1(s)) {
    let x = s.getAttribute("action");
    ((u = x ? an(x, i) : null),
      (c = s.getAttribute("method") || du),
      (f = Fr(s.getAttribute("enctype")) || mu),
      (d = new FormData(s)));
  } else if (i1(s) || (s1(s) && (s.type === "submit" || s.type === "image"))) {
    let x = s.form;
    if (x == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = s.getAttribute("formaction") || x.getAttribute("action");
    if (
      ((u = p ? an(p, i) : null),
      (c = s.getAttribute("formmethod") || x.getAttribute("method") || du),
      (f =
        Fr(s.getAttribute("formenctype")) ||
        Fr(x.getAttribute("enctype")) ||
        mu),
      (d = new FormData(x, s)),
      !o1())
    ) {
      let { name: y, type: E, value: M } = s;
      if (E === "image") {
        let j = y ? `${y}.` : "";
        (d.append(`${j}x`, "0"), d.append(`${j}y`, "0"));
      } else y && d.append(y, M);
    }
  } else {
    if (Au(s))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((c = du), (u = null), (f = mu), (m = s));
  }
  return (
    d && f === "text/plain" && ((m = d), (d = void 0)),
    { action: u, method: c.toLowerCase(), encType: f, formData: d, body: m }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function gc(s, i) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(i);
}
function d1(s, i, c) {
  let u =
    typeof s == "string"
      ? new URL(
          s,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : s;
  return (
    u.pathname === "/"
      ? (u.pathname = `_root.${c}`)
      : i && an(u.pathname, i) === "/"
        ? (u.pathname = `${i.replace(/\/$/, "")}/_root.${c}`)
        : (u.pathname = `${u.pathname.replace(/\/$/, "")}.${c}`),
    u
  );
}
async function m1(s, i) {
  if (s.id in i) return i[s.id];
  try {
    let c = await import(s.module);
    return ((i[s.id] = c), c);
  } catch (c) {
    return (
      console.error(
        `Error loading route module \`${s.module}\`, reloading page...`
      ),
      console.error(c),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function p1(s) {
  return s == null
    ? !1
    : s.href == null
      ? s.rel === "preload" &&
        typeof s.imageSrcSet == "string" &&
        typeof s.imageSizes == "string"
      : typeof s.rel == "string" && typeof s.href == "string";
}
async function y1(s, i, c) {
  let u = await Promise.all(
    s.map(async (f) => {
      let d = i.routes[f.route.id];
      if (d) {
        let m = await m1(d, c);
        return m.links ? m.links() : [];
      }
      return [];
    })
  );
  return S1(
    u
      .flat(1)
      .filter(p1)
      .filter((f) => f.rel === "stylesheet" || f.rel === "preload")
      .map((f) =>
        f.rel === "stylesheet"
          ? { ...f, rel: "prefetch", as: "style" }
          : { ...f, rel: "prefetch" }
      )
  );
}
function Dd(s, i, c, u, f, d) {
  let m = (p, y) => (c[y] ? p.route.id !== c[y].route.id : !0),
    x = (p, y) =>
      c[y].pathname !== p.pathname ||
      (c[y].route.path?.endsWith("*") && c[y].params["*"] !== p.params["*"]);
  return d === "assets"
    ? i.filter((p, y) => m(p, y) || x(p, y))
    : d === "data"
      ? i.filter((p, y) => {
          let E = u.routes[p.route.id];
          if (!E || !E.hasLoader) return !1;
          if (m(p, y) || x(p, y)) return !0;
          if (p.route.shouldRevalidate) {
            let M = p.route.shouldRevalidate({
              currentUrl: new URL(
                f.pathname + f.search + f.hash,
                window.origin
              ),
              currentParams: c[0]?.params || {},
              nextUrl: new URL(s, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof M == "boolean") return M;
          }
          return !0;
        })
      : [];
}
function g1(s, i, { includeHydrateFallback: c } = {}) {
  return v1(
    s
      .map((u) => {
        let f = i.routes[u.route.id];
        if (!f) return [];
        let d = [f.module];
        return (
          f.clientActionModule && (d = d.concat(f.clientActionModule)),
          f.clientLoaderModule && (d = d.concat(f.clientLoaderModule)),
          c &&
            f.hydrateFallbackModule &&
            (d = d.concat(f.hydrateFallbackModule)),
          f.imports && (d = d.concat(f.imports)),
          d
        );
      })
      .flat(1)
  );
}
function v1(s) {
  return [...new Set(s)];
}
function b1(s) {
  let i = {},
    c = Object.keys(s).sort();
  for (let u of c) i[u] = s[u];
  return i;
}
function S1(s, i) {
  let c = new Set();
  return (
    new Set(i),
    s.reduce((u, f) => {
      let d = JSON.stringify(b1(f));
      return (c.has(d) || (c.add(d), u.push({ key: d, link: f })), u);
    }, [])
  );
}
function am() {
  let s = w.useContext(Ll);
  return (
    gc(
      s,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    s
  );
}
function x1() {
  let s = w.useContext(_u);
  return (
    gc(
      s,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    s
  );
}
var vc = w.createContext(void 0);
vc.displayName = "FrameworkContext";
function im() {
  let s = w.useContext(vc);
  return (
    gc(s, "You must render this element inside a <HydratedRouter> element"),
    s
  );
}
function E1(s, i) {
  let c = w.useContext(vc),
    [u, f] = w.useState(!1),
    [d, m] = w.useState(!1),
    {
      onFocus: x,
      onBlur: p,
      onMouseEnter: y,
      onMouseLeave: E,
      onTouchStart: M,
    } = i,
    j = w.useRef(null);
  (w.useEffect(() => {
    if ((s === "render" && m(!0), s === "viewport")) {
      let X = (G) => {
          G.forEach((Y) => {
            m(Y.isIntersecting);
          });
        },
        L = new IntersectionObserver(X, { threshold: 0.5 });
      return (
        j.current && L.observe(j.current),
        () => {
          L.disconnect();
        }
      );
    }
  }, [s]),
    w.useEffect(() => {
      if (u) {
        let X = setTimeout(() => {
          m(!0);
        }, 100);
        return () => {
          clearTimeout(X);
        };
      }
    }, [u]));
  let q = () => {
      f(!0);
    },
    H = () => {
      (f(!1), m(!1));
    };
  return c
    ? s !== "intent"
      ? [d, j, {}]
      : [
          d,
          j,
          {
            onFocus: Va(x, q),
            onBlur: Va(p, H),
            onMouseEnter: Va(y, q),
            onMouseLeave: Va(E, H),
            onTouchStart: Va(M, q),
          },
        ]
    : [!1, j, {}];
}
function Va(s, i) {
  return (c) => {
    (s && s(c), c.defaultPrevented || i(c));
  };
}
function _1({ page: s, ...i }) {
  let { router: c } = am(),
    u = w.useMemo(() => Kd(c.routes, s, c.basename), [c.routes, s, c.basename]);
  return u ? w.createElement(A1, { page: s, matches: u, ...i }) : null;
}
function T1(s) {
  let { manifest: i, routeModules: c } = im(),
    [u, f] = w.useState([]);
  return (
    w.useEffect(() => {
      let d = !1;
      return (
        y1(s, i, c).then((m) => {
          d || f(m);
        }),
        () => {
          d = !0;
        }
      );
    }, [s, i, c]),
    u
  );
}
function A1({ page: s, matches: i, ...c }) {
  let u = Pn(),
    { manifest: f, routeModules: d } = im(),
    { basename: m } = am(),
    { loaderData: x, matches: p } = x1(),
    y = w.useMemo(() => Dd(s, i, p, f, u, "data"), [s, i, p, f, u]),
    E = w.useMemo(() => Dd(s, i, p, f, u, "assets"), [s, i, p, f, u]),
    M = w.useMemo(() => {
      if (s === u.pathname + u.search + u.hash) return [];
      let H = new Set(),
        X = !1;
      if (
        (i.forEach((G) => {
          let Y = f.routes[G.route.id];
          !Y ||
            !Y.hasLoader ||
            ((!y.some(($) => $.route.id === G.route.id) &&
              G.route.id in x &&
              d[G.route.id]?.shouldRevalidate) ||
            Y.hasClientLoader
              ? (X = !0)
              : H.add(G.route.id));
        }),
        H.size === 0)
      )
        return [];
      let L = d1(s, m, "data");
      return (
        X &&
          H.size > 0 &&
          L.searchParams.set(
            "_routes",
            i
              .filter((G) => H.has(G.route.id))
              .map((G) => G.route.id)
              .join(",")
          ),
        [L.pathname + L.search]
      );
    }, [m, x, u, f, y, i, s, d]),
    j = w.useMemo(() => g1(E, f), [E, f]),
    q = T1(E);
  return w.createElement(
    w.Fragment,
    null,
    M.map((H) =>
      w.createElement("link", {
        key: H,
        rel: "prefetch",
        as: "fetch",
        href: H,
        ...c,
      })
    ),
    j.map((H) =>
      w.createElement("link", { key: H, rel: "modulepreload", href: H, ...c })
    ),
    q.map(({ key: H, link: X }) =>
      w.createElement("link", { key: H, nonce: c.nonce, ...X })
    )
  );
}
function R1(...s) {
  return (i) => {
    s.forEach((c) => {
      typeof c == "function" ? c(i) : c != null && (c.current = i);
    });
  };
}
var um =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  um && (window.__reactRouterVersion = "7.8.2");
} catch {}
function w1({ basename: s, children: i, window: c }) {
  let u = w.useRef();
  u.current == null && (u.current = hy({ window: c, v5Compat: !0 }));
  let f = u.current,
    [d, m] = w.useState({ action: f.action, location: f.location }),
    x = w.useCallback(
      (p) => {
        w.startTransition(() => m(p));
      },
      [m]
    );
  return (
    w.useLayoutEffect(() => f.listen(x), [f, x]),
    w.createElement(l1, {
      basename: s,
      children: i,
      location: d.location,
      navigationType: d.action,
      navigator: f,
    })
  );
}
var sm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  rm = w.forwardRef(function (
    {
      onClick: i,
      discover: c = "render",
      prefetch: u = "none",
      relative: f,
      reloadDocument: d,
      replace: m,
      state: x,
      target: p,
      to: y,
      preventScrollReset: E,
      viewTransition: M,
      ...j
    },
    q
  ) {
    let { basename: H } = w.useContext(Ht),
      X = typeof y == "string" && sm.test(y),
      L,
      G = !1;
    if (typeof y == "string" && X && ((L = y), um))
      try {
        let te = new URL(window.location.href),
          Fe = y.startsWith("//") ? new URL(te.protocol + y) : new URL(y),
          Pe = an(Fe.pathname, H);
        Fe.origin === te.origin && Pe != null
          ? (y = Pe + Fe.search + Fe.hash)
          : (G = !0);
      } catch {
        Bt(
          !1,
          `<Link to="${y}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let Y = Ly(y, { relative: f }),
      [$, oe, F] = E1(u, j),
      Oe = M1(y, {
        replace: m,
        state: x,
        target: p,
        preventScrollReset: E,
        relative: f,
        viewTransition: M,
      });
    function be(te) {
      (i && i(te), te.defaultPrevented || Oe(te));
    }
    let xe = w.createElement("a", {
      ...j,
      ...F,
      href: L || Y,
      onClick: G || d ? i : be,
      ref: R1(q, oe),
      target: p,
      "data-discover": !X && c === "render" ? "true" : void 0,
    });
    return $ && !X
      ? w.createElement(w.Fragment, null, xe, w.createElement(_1, { page: Y }))
      : xe;
  });
rm.displayName = "Link";
var N1 = w.forwardRef(function (
  {
    "aria-current": i = "page",
    caseSensitive: c = !1,
    className: u = "",
    end: f = !1,
    style: d,
    to: m,
    viewTransition: x,
    children: p,
    ...y
  },
  E
) {
  let M = Ka(m, { relative: y.relative }),
    j = Pn(),
    q = w.useContext(_u),
    { navigator: H, basename: X } = w.useContext(Ht),
    L = q != null && B1(M) && x === !0,
    G = H.encodeLocation ? H.encodeLocation(M).pathname : M.pathname,
    Y = j.pathname,
    $ =
      q && q.navigation && q.navigation.location
        ? q.navigation.location.pathname
        : null;
  (c ||
    ((Y = Y.toLowerCase()),
    ($ = $ ? $.toLowerCase() : null),
    (G = G.toLowerCase())),
    $ && X && ($ = an($, X) || $));
  const oe = G !== "/" && G.endsWith("/") ? G.length - 1 : G.length;
  let F = Y === G || (!f && Y.startsWith(G) && Y.charAt(oe) === "/"),
    Oe =
      $ != null &&
      ($ === G || (!f && $.startsWith(G) && $.charAt(G.length) === "/")),
    be = { isActive: F, isPending: Oe, isTransitioning: L },
    xe = F ? i : void 0,
    te;
  typeof u == "function"
    ? (te = u(be))
    : (te = [
        u,
        F ? "active" : null,
        Oe ? "pending" : null,
        L ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let Fe = typeof d == "function" ? d(be) : d;
  return w.createElement(
    rm,
    {
      ...y,
      "aria-current": xe,
      className: te,
      ref: E,
      style: Fe,
      to: m,
      viewTransition: x,
    },
    typeof p == "function" ? p(be) : p
  );
});
N1.displayName = "NavLink";
var O1 = w.forwardRef(
  (
    {
      discover: s = "render",
      fetcherKey: i,
      navigate: c,
      reloadDocument: u,
      replace: f,
      state: d,
      method: m = du,
      action: x,
      onSubmit: p,
      relative: y,
      preventScrollReset: E,
      viewTransition: M,
      ...j
    },
    q
  ) => {
    let H = j1(),
      X = U1(x, { relative: y }),
      L = m.toLowerCase() === "get" ? "get" : "post",
      G = typeof x == "string" && sm.test(x),
      Y = ($) => {
        if ((p && p($), $.defaultPrevented)) return;
        $.preventDefault();
        let oe = $.nativeEvent.submitter,
          F = oe?.getAttribute("formmethod") || m;
        H(oe || $.currentTarget, {
          fetcherKey: i,
          method: F,
          navigate: c,
          replace: f,
          state: d,
          relative: y,
          preventScrollReset: E,
          viewTransition: M,
        });
      };
    return w.createElement("form", {
      ref: q,
      method: L,
      action: X,
      onSubmit: u ? p : Y,
      ...j,
      "data-discover": !G && s === "render" ? "true" : void 0,
    });
  }
);
O1.displayName = "Form";
function C1(s) {
  return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function cm(s) {
  let i = w.useContext(Ll);
  return (Re(i, C1(s)), i);
}
function M1(
  s,
  {
    target: i,
    replace: c,
    state: u,
    preventScrollReset: f,
    relative: d,
    viewTransition: m,
  } = {}
) {
  let x = Tu(),
    p = Pn(),
    y = Ka(s, { relative: d });
  return w.useCallback(
    (E) => {
      if (c1(E, i)) {
        E.preventDefault();
        let M = c !== void 0 ? c : Qa(p) === Qa(y);
        x(s, {
          replace: M,
          state: u,
          preventScrollReset: f,
          relative: d,
          viewTransition: m,
        });
      }
    },
    [p, x, y, c, u, i, s, f, d, m]
  );
}
var D1 = 0,
  z1 = () => `__${String(++D1)}__`;
function j1() {
  let { router: s } = cm("useSubmit"),
    { basename: i } = w.useContext(Ht),
    c = Py();
  return w.useCallback(
    async (u, f = {}) => {
      let { action: d, method: m, encType: x, formData: p, body: y } = h1(u, i);
      if (f.navigate === !1) {
        let E = f.fetcherKey || z1();
        await s.fetch(E, c, f.action || d, {
          preventScrollReset: f.preventScrollReset,
          formData: p,
          body: y,
          formMethod: f.method || m,
          formEncType: f.encType || x,
          flushSync: f.flushSync,
        });
      } else
        await s.navigate(f.action || d, {
          preventScrollReset: f.preventScrollReset,
          formData: p,
          body: y,
          formMethod: f.method || m,
          formEncType: f.encType || x,
          replace: f.replace,
          state: f.state,
          fromRouteId: c,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition,
        });
    },
    [s, i, c]
  );
}
function U1(s, { relative: i } = {}) {
  let { basename: c } = w.useContext(Ht),
    u = w.useContext(Lt);
  Re(u, "useFormAction must be used inside a RouteContext");
  let [f] = u.matches.slice(-1),
    d = { ...Ka(s || ".", { relative: i }) },
    m = Pn();
  if (s == null) {
    d.search = m.search;
    let x = new URLSearchParams(d.search),
      p = x.getAll("index");
    if (p.some((E) => E === "")) {
      (x.delete("index"),
        p.filter((M) => M).forEach((M) => x.append("index", M)));
      let E = x.toString();
      d.search = E ? `?${E}` : "";
    }
  }
  return (
    (!s || s === ".") &&
      f.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    c !== "/" && (d.pathname = d.pathname === "/" ? c : ln([c, d.pathname])),
    Qa(d)
  );
}
function B1(s, { relative: i } = {}) {
  let c = w.useContext(Id);
  Re(
    c != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: u } = cm("useViewTransitionState"),
    f = Ka(s, { relative: i });
  if (!c.isTransitioning) return !1;
  let d = an(c.currentLocation.pathname, u) || c.currentLocation.pathname,
    m = an(c.nextLocation.pathname, u) || c.nextLocation.pathname;
  return bu(f.pathname, m) != null || bu(f.pathname, d) != null;
}
function q1() {
  return v.jsx("nav", {
    className: "mb-12 border-[#F5F5F5] text-[#F5F5F5] p-3",
    children: v.jsx("div", {
      className: "flex justify-between items-center",
      children: v.jsx("div", {
        className: "text-base font-bold sm:text-xl sm:ml-1.5",
        children: "Eclipse",
      }),
    }),
  });
}
function H1() {
  return v.jsx("div", {
    className: "mt-12 p-2 flex justify-center text-[#F5F5F5]",
    children: "©KNT 2025",
  });
}
var Wr, zd;
function om() {
  return (
    zd ||
      ((zd = 1),
      (Wr = {
        error: {
          length: "Length should be a valid positive number",
          password: "Password should be a valid string",
          invalidPlugin: "Plugin should be a valid function",
        },
        regex: {
          digits: "(\\d.*)",
          letters: "([a-zA-Z].*)",
          symbols:
            "([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\{\\}\\]\\\\|;:\\'\",<.>\\/\\?€£¥₹§±].*)",
          spaces: "([\\s].*)",
        },
      })),
    Wr
  );
}
var Pr, jd;
function L1() {
  if (jd) return Pr;
  jd = 1;
  var s = om().regex;
  function i(c, u) {
    if (u && u > 1) {
      const f = parseInt(u, 10);
      return (
        new RegExp(c + "{" + f + ",}").test(this.password) === this.positive
      );
    }
    return new RegExp(c).test(this.password) === this.positive;
  }
  return (
    (Pr = {
      not: function (u) {
        return ((this.positive = !1), u ? i.call(this, u) : !0);
      },
      has: function (u) {
        return ((this.positive = !0), u ? i.call(this, u) : !0);
      },
      is: function () {
        return ((this.positive = !0), !0);
      },
      min: function (u) {
        return this.password.length >= u;
      },
      max: function (u) {
        return this.password.length <= u;
      },
      digits: function (u) {
        return i.call(this, s.digits, u);
      },
      letters: function (u) {
        return i.call(this, s.letters, u);
      },
      uppercase: function (u) {
        if (u && u > 1) {
          let f = 0,
            d = 0;
          for (; d < u && f < this.password.length; ) {
            const m = this.password.charAt(f);
            (m !== m.toLowerCase() && d++, f++);
          }
          return (d === u) === this.positive;
        }
        return (
          (this.password !== this.password.toLowerCase()) === this.positive
        );
      },
      lowercase: function (u) {
        if (u && u > 1) {
          let f = 0,
            d = 0;
          for (; d < u && f < this.password.length; ) {
            const m = this.password.charAt(f);
            (m !== m.toUpperCase() && d++, f++);
          }
          return (d === u) === this.positive;
        }
        return (
          (this.password !== this.password.toUpperCase()) === this.positive
        );
      },
      symbols: function (u) {
        return i.call(this, s.symbols, u);
      },
      spaces: function (u) {
        return i.call(this, s.spaces, u);
      },
      oneOf: function (u) {
        return u.indexOf(this.password) >= 0 === this.positive;
      },
      usingPlugin: function (u) {
        try {
          return !!u.call({}, this.password) === this.positive;
        } catch {
          return !1;
        }
      },
    }),
    Pr
  );
}
var Ir, Ud;
function Y1() {
  if (Ud) return Ir;
  ((Ud = 1),
    (Ir = function (u, f, d) {
      const m = d ? i : s;
      return m[u] && m[u](f);
    }));
  const s = {
      min: (u) =>
        `The string should have a minimum length of ${u} character${c(u)}`,
      max: (u) =>
        `The string should have a maximum length of ${u} character${c(u)}`,
      letters: (u = 1) =>
        `The string should have a minimum of ${u} letter${c(u)}`,
      digits: (u = 1) =>
        `The string should have a minimum of ${u} digit${c(u)}`,
      uppercase: (u = 1) =>
        `The string should have a minimum of ${u} uppercase letter${c(u)}`,
      lowercase: (u = 1) =>
        `The string should have a minimum of ${u} lowercase letter${c(u)}`,
      symbols: (u = 1) =>
        `The string should have a minimum of ${u} symbol${c(u)}`,
      spaces: (u = 1) =>
        `The string should have a minimum of ${u} space${c(u)}`,
      oneOf: (u) =>
        `The string should be ${u.length > 1 ? `one of ${u.slice(0, -1).join(", ")} and ` : ""}${u[u.length - 1]}`,
      has: (u) => `The string should have pattern '${u}'`,
      not: (u) => `The string should not have pattern '${u}'`,
      usingPlugin: (u) => `The string should not violate ${u.name || "plugin"}`,
    },
    i = {
      min: (u) =>
        `The string should have a maximum length of ${u} character${c(u)}`,
      max: (u) =>
        `The string should have a minimum length of ${u} character${c(u)}`,
      letters: (u = 0) =>
        `The string should ${u === 0 ? "not have" : `have a maximum of ${u}`} letter${c(u)}`,
      digits: (u = 0) =>
        `The string should ${u === 0 ? "not have" : `have a maximum of ${u}`} digit${c(u)}`,
      uppercase: (u = 0) =>
        `The string should ${u === 0 ? "not have" : `have a maximum of ${u}`} uppercase letter${c(u)}`,
      lowercase: (u = 0) =>
        `The string should ${u === 0 ? "not have" : `have a maximum of ${u}`} lowercase letter${c(u)}`,
      symbols: (u = 0) =>
        `The string should ${u === 0 ? "not have" : `have a maximum of ${u}`} symbol${c(u)}`,
      spaces: (u = 0) =>
        `The string should ${u === 0 ? "not have" : `have a maximum of ${u}`} space${c(u)}`,
      oneOf: (u) =>
        `The string should not be ${u.length > 1 ? `one of ${u.slice(0, -1).join(", ")} and ` : ""}${u[u.length - 1]}`,
      has: (u) => `The string should not have pattern '${u}'`,
      not: (u) => `The string should have pattern '${u}'`,
      usingPlugin: (u) => `The string should violate ${u.name || "plugin"}`,
    };
  function c(u) {
    return u === 1 ? "" : "s";
  }
  return Ir;
}
var ec, Bd;
function V1() {
  if (Bd) return ec;
  Bd = 1;
  var s = L1(),
    i = om().error,
    c = Y1();
  function u(x) {
    const p = Number(x);
    if (isNaN(p) || !Number.isInteger(p) || p < 1) throw new Error(i.length);
  }
  function f(x) {
    return s[x.method].apply(this, x.arguments);
  }
  function d(x, p, y) {
    return (
      this.properties.push({ method: x, arguments: p, description: y }),
      this
    );
  }
  class m {
    constructor() {
      this.properties = [];
    }
    validate(p, y) {
      return (
        (this.list = !!(y && y.list)),
        (this.details = !!(y && y.details)),
        (this.password = String(p)),
        (this.positive = !0),
        this.list || this.details
          ? this.properties.reduce((E, M) => {
              if (!f.call(this, M)) {
                var j = M.method;
                if (this.details) {
                  ((j = { validation: M.method }),
                    M.arguments &&
                      M.arguments[0] &&
                      (j.arguments = M.arguments[0]),
                    !this.positive && M.method !== "not" && (j.inverted = !0));
                  var q = M.arguments && M.arguments[1],
                    H = q || c(M.method, j.arguments, j.inverted);
                  j.message = H;
                }
                return E.concat(j);
              }
              return E;
            }, [])
          : this.properties.every(f.bind(this))
      );
    }
    letters(p, y) {
      return (p && u(p), d.call(this, "letters", arguments));
    }
    digits(p, y) {
      return (p && u(p), d.call(this, "digits", arguments));
    }
    symbols(p, y) {
      return (p && u(p), d.call(this, "symbols", arguments));
    }
    min(p, y) {
      return (u(p), d.call(this, "min", arguments));
    }
    max(p, y) {
      return (u(p), d.call(this, "max", arguments));
    }
    lowercase(p, y) {
      return (p && u(p), d.call(this, "lowercase", arguments));
    }
    uppercase(p, y) {
      return (p && u(p), d.call(this, "uppercase", arguments));
    }
    spaces(p, y) {
      return (p && u(p), d.call(this, "spaces", arguments));
    }
    has(p, y) {
      return d.call(this, "has", arguments);
    }
    not(p, y) {
      return d.call(this, "not", arguments);
    }
    is() {
      return d.call(this, "is", arguments);
    }
    oneOf(p, y) {
      return d.call(this, "oneOf", arguments);
    }
    usingPlugin(p, y) {
      if (typeof p != "function") throw new Error(i.invalidPlugin);
      return d.call(this, "usingPlugin", arguments);
    }
  }
  return ((ec = m), ec);
}
var G1 = V1();
const X1 = hc(G1),
  fm = new X1();
fm.is()
  .min(12, "minLength")
  .is()
  .max(64)
  .has()
  .uppercase(1, "uppercase")
  .has()
  .lowercase(1, "lowercase")
  .has()
  .digits(1, "digit")
  .has()
  .symbols(1, "symbol")
  .has()
  .not()
  .spaces();
const Q1 = (s) => fm.validate(s, { details: !0 });
var hm = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  qd = Wn.createContext && Wn.createContext(hm),
  Z1 = ["attr", "size", "title"];
function k1(s, i) {
  if (s == null) return {};
  var c = K1(s, i),
    u,
    f;
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(s);
    for (f = 0; f < d.length; f++)
      ((u = d[f]),
        !(i.indexOf(u) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(s, u) &&
          (c[u] = s[u]));
  }
  return c;
}
function K1(s, i) {
  if (s == null) return {};
  var c = {};
  for (var u in s)
    if (Object.prototype.hasOwnProperty.call(s, u)) {
      if (i.indexOf(u) >= 0) continue;
      c[u] = s[u];
    }
  return c;
}
function Su() {
  return (
    (Su = Object.assign
      ? Object.assign.bind()
      : function (s) {
          for (var i = 1; i < arguments.length; i++) {
            var c = arguments[i];
            for (var u in c)
              Object.prototype.hasOwnProperty.call(c, u) && (s[u] = c[u]);
          }
          return s;
        }),
    Su.apply(this, arguments)
  );
}
function Hd(s, i) {
  var c = Object.keys(s);
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(s);
    (i &&
      (u = u.filter(function (f) {
        return Object.getOwnPropertyDescriptor(s, f).enumerable;
      })),
      c.push.apply(c, u));
  }
  return c;
}
function xu(s) {
  for (var i = 1; i < arguments.length; i++) {
    var c = arguments[i] != null ? arguments[i] : {};
    i % 2
      ? Hd(Object(c), !0).forEach(function (u) {
          J1(s, u, c[u]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(c))
        : Hd(Object(c)).forEach(function (u) {
            Object.defineProperty(s, u, Object.getOwnPropertyDescriptor(c, u));
          });
  }
  return s;
}
function J1(s, i, c) {
  return (
    (i = $1(i)),
    i in s
      ? Object.defineProperty(s, i, {
          value: c,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (s[i] = c),
    s
  );
}
function $1(s) {
  var i = F1(s, "string");
  return typeof i == "symbol" ? i : i + "";
}
function F1(s, i) {
  if (typeof s != "object" || !s) return s;
  var c = s[Symbol.toPrimitive];
  if (c !== void 0) {
    var u = c.call(s, i);
    if (typeof u != "object") return u;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (i === "string" ? String : Number)(s);
}
function dm(s) {
  return (
    s &&
    s.map((i, c) =>
      Wn.createElement(i.tag, xu({ key: c }, i.attr), dm(i.child))
    )
  );
}
function mt(s) {
  return (i) =>
    Wn.createElement(W1, Su({ attr: xu({}, s.attr) }, i), dm(s.child));
}
function W1(s) {
  var i = (c) => {
    var { attr: u, size: f, title: d } = s,
      m = k1(s, Z1),
      x = f || c.size || "1em",
      p;
    return (
      c.className && (p = c.className),
      s.className && (p = (p ? p + " " : "") + s.className),
      Wn.createElement(
        "svg",
        Su(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          c.attr,
          u,
          m,
          {
            className: p,
            style: xu(xu({ color: s.color || c.color }, c.style), s.style),
            height: x,
            width: x,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        d && Wn.createElement("title", null, d),
        s.children
      )
    );
  };
  return qd !== void 0
    ? Wn.createElement(qd.Consumer, null, (c) => i(c))
    : i(hm);
}
function P1(s) {
  return mt({
    attr: { viewBox: "0 0 576 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z",
        },
        child: [],
      },
    ],
  })(s);
}
function I1(s) {
  return mt({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z",
        },
        child: [],
      },
    ],
  })(s);
}
function eg(s) {
  return mt({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z",
        },
        child: [],
      },
    ],
  })(s);
}
function mm(s) {
  return mt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z",
        },
        child: [],
      },
    ],
  })(s);
}
function tg(s) {
  return mt({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z",
        },
        child: [],
      },
    ],
  })(s);
}
const $e = {
  VITE_BACKEND_URL: "/api",
  VITE_EVENT_STATUS_INITIALIZE: "initialize",
  VITE_EVENT_STATUS_PUSH: "push",
  VITE_EVENT_STATUS_DELETE: "delete",
};
function ng({ handleRegistrationSuccess: s, modalRef: i }) {
  const [c, u] = w.useState({
      hasMinLength: !1,
      hasUpper: !1,
      hasLower: !1,
      hasSymbol: !1,
    }),
    [f, d] = w.useState(!1),
    [m, x] = w.useState({
      passwordPolicyViolated: "",
      passwordMismatch: "",
      invalidEmail: "",
      customError: "",
    }),
    p = (j) => {
      const q = Q1(j),
        H = { hasMinLength: !0, hasUpper: !0, hasLower: !0, hasSymbol: !0 };
      if ((console.log(q), q && q.length))
        for (const X of q)
          switch (X.message) {
            case "uppercase":
              H.hasUpper = !1;
              break;
            case "lowercase":
              H.hasLower = !1;
              break;
            case "symbol":
              H.hasSymbol = !1;
              break;
            case "minLength":
              H.hasMinLength = !1;
              break;
          }
      u(H);
    },
    y = (j) => {
      (j.stopPropagation(), j.preventDefault());
      const { name: q, value: H } = j.target;
      q == "password" && p(H);
    },
    E = () => {
      d(!f);
    },
    M = async (j) => {
      (j.stopPropagation(), j.preventDefault());
      const q = new FormData(j.target),
        {
          username: H,
          password: X,
          confirmPassword: L,
          email: G,
        } = Object.fromEntries(q),
        Y = `${$e.VITE_BACKEND_URL}/registration`,
        $ = { username: H, email: G, password: X, confirmPassword: L };
      try {
        const oe = await fetch(Y, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify($),
            headers: { "Content-Type": "application/json" },
          }),
          F = await oe.json();
        if ((console.log("printing data..."), console.log(F), oe.ok)) s();
        else if (F.errors) {
          const be = [
            "invalidEmail",
            "passwordPolicyViolated",
            "passwordMismatch",
            "customError",
          ].reduce((xe, te) => ((xe[te] = ""), xe), {});
          for (const { field: xe, msg: te } of F.errors)
            switch (xe) {
              case "email":
                be.invalidEmail = te;
                break;
              case "password":
                be.passwordPolicyViolated = te;
                break;
              case "confirmPassword":
                be.passwordMismatch = te;
                break;
              case "customError":
                be.customError = te;
                break;
              default:
                throw new Error("An unknown error has occurred }");
            }
          x(be);
        }
      } catch (oe) {
        (console.log(oe),
          console.log("Error encountered on registering account."));
      }
    };
  return v.jsx(v.Fragment, {
    children: v.jsx("div", {
      className: "flex modal-overlay",
      children: v.jsx("div", {
        id: "modal",
        className:
          "flex m-auto p-5 w-full max-w-md shadow-card rounded-card dlayer-1",
        ref: i,
        children: v.jsxs("form", {
          id: "registration",
          className: "text-gray-200 w-full flex flex-col space-y-6",
          onSubmit: M,
          children: [
            v.jsx("h1", {
              className: "font-bold text-2xl mb-6 text-center",
              children: "Register account",
            }),
            v.jsxs("div", {
              children: [
                v.jsxs("div", {
                  children: [
                    v.jsx("p", {
                      children: "Password must contain a minimum of:",
                    }),
                    v.jsxs("ul", {
                      className: "text-gray-300 text-sm",
                      children: [
                        v.jsxs("li", {
                          children: [
                            c.hasMinLength ? "✅" : "❌",
                            " 12 characters",
                          ],
                        }),
                        v.jsxs("li", {
                          children: [
                            c.hasUpper ? "✅" : "❌",
                            " 1 uppercase letter",
                          ],
                        }),
                        v.jsxs("li", {
                          children: [
                            c.hasLower ? "✅" : "❌",
                            " 1 lowercase letter",
                          ],
                        }),
                        v.jsxs("li", {
                          children: [c.hasSymbol ? "✅" : "❌", " 1 symbol"],
                        }),
                      ],
                    }),
                  ],
                }),
                m.customError &&
                  v.jsx("div", {
                    className: "text-[#D32F2F]",
                    children: v.jsx("p", { children: m.customError }),
                  }),
              ],
            }),
            v.jsxs("div", {
              className: "flex flex-col space-y-4",
              children: [
                v.jsxs("div", {
                  children: [
                    v.jsx("label", {
                      htmlFor: "username",
                      className: "block",
                      children: "Username",
                    }),
                    v.jsx("input", {
                      id: "username",
                      type: "text",
                      placeholder: "username",
                      name: "username",
                      className:
                        "neon-input p-1.5 rounded-lg w-full placeholder-gray-400",
                    }),
                  ],
                }),
                v.jsxs("div", {
                  children: [
                    v.jsxs("div", {
                      children: [
                        v.jsx("label", {
                          htmlFor: "email",
                          className: "block",
                          children: "Email",
                        }),
                        v.jsx("input", {
                          id: "email",
                          type: "email",
                          placeholder: "email",
                          name: "email",
                          className:
                            "neon-input p-1.5 rounded-lg w-full placeholder-gray-400",
                        }),
                      ],
                    }),
                    m.invalidEmail &&
                      v.jsx("div", {
                        className: "text-[#D32F2F]",
                        children: v.jsx("p", { children: m.invalidEmail }),
                      }),
                  ],
                }),
                v.jsxs("div", {
                  children: [
                    v.jsxs("div", {
                      className: "relative",
                      children: [
                        v.jsx("label", {
                          htmlFor: "password",
                          className: "block",
                          children: "Password",
                        }),
                        v.jsx("input", {
                          id: "password",
                          type: f ? "text" : "password",
                          placeholder: "password",
                          name: "password",
                          className:
                            "neon-input p-1.5 rounded-lg w-full placeholder-gray-400",
                          onChange: y,
                        }),
                        v.jsx("div", {
                          className:
                            "absolute flex flex-col space-y-1 bottom-2.5 right-3 cursor-pointer",
                          children: v.jsxs("div", {
                            className: "group relative",
                            children: [
                              v.jsx("div", {
                                className: `invisible absolute bottom-[180%] -right-[3.45rem] mb-2 w-32 bg-gray-800\r
                   text-[#F5F5F5] text-sm text-center py-1 px-2 rounded select-none cursor-default\r
                    before:content-[''] before:absolute before:top-full before:right-13 \r
                    before:w-0 before:h-0\r
                    before:border-x-[0.8em] before:border-x-transparent\r
                    before:border-t-[1.7em]  before:border-gray-800\r
                    group-hover:visible \r
                  `,
                                children: "Show password",
                              }),
                              v.jsx("i", {
                                children: v.jsx(P1, { onClick: E }),
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    m.passwordPolicyViolated &&
                      v.jsx("div", {
                        className: "text-[#D32F2F]",
                        children: v.jsx("p", {
                          children: m.passwordPolicyViolated,
                        }),
                      }),
                  ],
                }),
                v.jsxs("div", {
                  children: [
                    v.jsxs("div", {
                      children: [
                        v.jsx("label", {
                          htmlFor: "confirm-password",
                          className: "block",
                          children: "Confirm Password",
                        }),
                        v.jsx("input", {
                          id: "confirm-password",
                          type: "password",
                          placeholder: "confirm password",
                          name: "confirmPassword",
                          className:
                            "neon-input p-1.5 rounded-lg w-full placeholder-gray-400",
                        }),
                      ],
                    }),
                    m.passwordMismatch &&
                      v.jsx("div", {
                        className: "text-[#D32F2F]",
                        children: v.jsx("p", { children: m.passwordMismatch }),
                      }),
                  ],
                }),
                v.jsx("div", {
                  children: v.jsx("input", {
                    type: "submit",
                    name: "submit",
                    className:
                      "neon-button-purple neon-button-purple-animated rounded-lg py-2 px-4 mt-4",
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    }),
  });
}
function lg({ modalRef: s, forgotPasswordCallback: i }) {
  const c = Tu(),
    u = async (f) => {
      (f.stopPropagation(), f.preventDefault());
      const { username: d, password: m } = Object.fromEntries(
          new FormData(f.target).entries()
        ),
        x = `${$e.VITE_BACKEND_URL}/users/login`,
        p = { username: d, password: m };
      try {
        if (
          (
            await fetch(x, {
              method: "POST",
              credentials: "include",
              body: JSON.stringify(p),
              headers: { "Content-Type": "application/json" },
            })
          ).ok
        )
          c("/main-lobby");
        else throw new Error("Login for user failed");
      } catch (y) {
        console.log(y);
      }
    };
  return v.jsx(v.Fragment, {
    children: v.jsx("div", {
      className: "flex modal-overlay",
      children: v.jsx("div", {
        className:
          "m-auto w-full max-w-xs pt-3 px-1 text-[#F5F5F5] shadow-card rounded-card dlayer-1",
        ref: s,
        children: v.jsxs("form", {
          className: "flex flex-col pb-5 space-y-4",
          onSubmit: u,
          children: [
            v.jsx("h1", {
              className: "text-center text-2xl mb-6",
              children: "Login",
            }),
            v.jsxs("div", {
              className: "flex justify-center items-center gap-x-3",
              children: [
                v.jsx(tg, {}),
                v.jsx("input", {
                  className: "w-[65%] p-1 rounded-lg neon-input",
                  name: "username",
                  placeholder: "username",
                  type: "text",
                  autoComplete: "on",
                }),
              ],
            }),
            v.jsxs("div", {
              className: "flex flex-col gap-y-2",
              children: [
                v.jsxs("div", {
                  className: "flex justify-center items-center gap-x-3",
                  children: [
                    v.jsx(I1, {}),
                    v.jsx("input", {
                      className:
                        "w-[65%] border-solid p-1 rounded-lg neon-input",
                      placeholder: "password",
                      name: "password",
                      type: "password",
                      autoComplete: "current-password",
                    }),
                  ],
                }),
                v.jsx("a", {
                  className: "text-xs ml-17 text-[#90cdf4] w-fit",
                  href: "#",
                  children: "Forgot Password?",
                }),
              ],
            }),
            v.jsxs("div", {
              className: "flex flex-col",
              children: [
                v.jsx("div", {
                  className: "flex justify-center",
                  children: v.jsx("input", {
                    className:
                      "w-[90%] font-semibold p-1.5 rounded-lg neon-button-purple neon-button-purple-animated",
                    type: "submit",
                    value: "Login",
                  }),
                }),
                v.jsx("div", {
                  className: "flex justify-center",
                  children: v.jsxs("p", {
                    className: "text-xs p-1.5 w-[90%]",
                    children: [
                      "Don't have an account?",
                      " ",
                      v.jsx("button", {
                        className: "text-[#90cdf4] w-fit cursor-pointer",
                        onClick: (f) => {
                          (f.stopPropagation(), i());
                        },
                        children: "Register here",
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    }),
  });
}
const pm = w.createContext(null);
function Eu(s, i, c) {
  w.useEffect(() => {
    const u = (f) => {
      const d = f.target,
        m = s.current;
      m && d !== m && !m.contains(d) && c?.(f);
    };
    return (
      i && s.current && document.addEventListener("click", u),
      () => {
        document.removeEventListener("click", u);
      }
    );
  }, [i, c]);
}
function ym() {
  const [s, i] = w.useState(!0),
    [c, u] = w.useState(!1),
    f = Tu(),
    d = w.useContext(pm);
  return (
    w.useEffect(() => {
      (async () => {
        const x = await d();
        (console.log("auth status: ", x), u(x), i(!1), x || f("/"));
      })();
    }, [d, f]),
    { isLoading: s, isAuthenticated: c }
  );
}
const ou = (s, i, c = (u, f) => u === f) => {
    const u = i.filter((f) => !s.some((d) => c(d, f)));
    return [...s, ...u];
  },
  Ld = (s, i, c = (u, f) => u === f) =>
    s.filter((u) => !i.some((f) => c(u, f)));
function ag() {
  const s = Tu(),
    [i, c] = w.useState(!1),
    [u, f] = w.useState(!1),
    d = w.useRef(null),
    m = w.useRef(null);
  (Eu(d, i, () => c(!1)), Eu(m, u, () => f(!1)));
  const x = () => {
    s("/main-lobby");
  };
  return v.jsxs("div", {
    id: "landing-page",
    className: "min-h-dvh flex flex-col w-auto layer-0",
    children: [
      v.jsx(q1, {}),
      v.jsxs("div", {
        id: "body",
        className: "text-gray-200 flex-1 flex items-start",
        children: [
          v.jsx("div", {
            id: "main-display",
            className: "ml-45 mr-20 max-w-2xl",
            children: v.jsxs("div", {
              className:
                "flex flex-col space-y-5 w-full break-words p-20 shadow-card rounded-card hover-shadow dlayer-1",
              children: [
                v.jsx("h1", {
                  className: "heading text-6xl mb-6 ",
                  children: "Join the Community",
                }),
                v.jsxs("div", {
                  className: "text-[#d1d5dc] text-2xl font-medium space-y-2",
                  children: [
                    v.jsx("p", {
                      children:
                        "Welcome to Eclipse, a place to meet others and make longlasting relationships.",
                    }),
                    v.jsx("p", {
                      children:
                        "Get access to emotes, real-time video chats, and an unforgettable memory.",
                    }),
                  ],
                }),
                v.jsxs("div", {
                  className: "text-lg font-bold sm:space-x-7 sm:text-base mt-4",
                  children: [
                    v.jsx("button", {
                      href: "#",
                      onClick: (p) => {
                        (p.stopPropagation(), f(!0));
                      },
                      className:
                        "neon-button-purple neon-button-purple-animated rounded-lg py-3 px-6",
                      children: "Log In",
                    }),
                    v.jsx("button", {
                      href: "#",
                      onClick: (p) => {
                        (p.stopPropagation(), c(!0));
                      },
                      className:
                        "neon-button-purple neon-button-purple-animated rounded-lg py-3 px-6",
                      children: "Sign Up",
                    }),
                  ],
                }),
              ],
            }),
          }),
          v.jsxs("div", {
            id: "feature-section",
            className: "flex flex-col px-15 pb-15 self-center max-w-2xl ",
            children: [
              v.jsx("h1", {
                className:
                  "font-bold text-5xl mb-6 text-shadow-[0_0_12px_rgba(144,205,244,0.6)]",
                children: "Features",
              }),
              v.jsxs("ul", {
                className:
                  "text-gray-300 font-medium space-y-3 text-xl list-disc list-inside marker:text-[#90cdf4]",
                children: [
                  v.jsx("li", { children: "Supports up to 1GB file uploads" }),
                  v.jsx("li", { children: "Real-time video chats" }),
                  v.jsx("li", { children: "AI Chat Assistant" }),
                ],
              }),
            ],
          }),
        ],
      }),
      i && v.jsx(ng, { handleRegistrationSuccess: x, modalRef: d }),
      u &&
        v.jsx(lg, {
          modalRef: m,
          forgotPasswordCallback: () => {
            (c(!i), f(!u));
          },
        }),
      v.jsx(H1, {}),
    ],
  });
}
function ig(s) {
  return mt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          fill: "none",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32",
          d: "M192 448h128m64-240v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32m128 160v80",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "M256 320a78.83 78.83 0 0 1-56.55-24.1A80.89 80.89 0 0 1 176 239V128a79.69 79.69 0 0 1 80-80c44.86 0 80 35.14 80 80v111c0 44.66-35.89 81-80 81z",
        },
        child: [],
      },
    ],
  })(s);
}
function ug(s) {
  return mt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: { d: "M106 304v-54h54v-36h-54v-54H70v54H16v36h54v54h36z" },
        child: [],
      },
      { tag: "circle", attr: { cx: "288", cy: "144", r: "112" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M288 288c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128z",
        },
        child: [],
      },
    ],
  })(s);
}
function sg(s) {
  return mt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 176a80 80 0 1 0 80 80 80.24 80.24 0 0 0-80-80zm172.72 80a165.53 165.53 0 0 1-1.64 22.34l48.69 38.12a11.59 11.59 0 0 1 2.63 14.78l-46.06 79.52a11.64 11.64 0 0 1-14.14 4.93l-57.25-23a176.56 176.56 0 0 1-38.82 22.67l-8.56 60.78a11.93 11.93 0 0 1-11.51 9.86h-92.12a12 12 0 0 1-11.51-9.53l-8.56-60.78A169.3 169.3 0 0 1 151.05 393L93.8 416a11.64 11.64 0 0 1-14.14-4.92L33.6 331.57a11.59 11.59 0 0 1 2.63-14.78l48.69-38.12A174.58 174.58 0 0 1 83.28 256a165.53 165.53 0 0 1 1.64-22.34l-48.69-38.12a11.59 11.59 0 0 1-2.63-14.78l46.06-79.52a11.64 11.64 0 0 1 14.14-4.93l57.25 23a176.56 176.56 0 0 1 38.82-22.67l8.56-60.78A11.93 11.93 0 0 1 209.94 26h92.12a12 12 0 0 1 11.51 9.53l8.56 60.78A169.3 169.3 0 0 1 361 119l57.2-23a11.64 11.64 0 0 1 14.14 4.92l46.06 79.52a11.59 11.59 0 0 1-2.63 14.78l-48.69 38.12a174.58 174.58 0 0 1 1.64 22.66z",
        },
        child: [],
      },
    ],
  })(s);
}
function rg(s) {
  return mt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      { tag: "circle", attr: { cx: "256", cy: "256", r: "48" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "m470.39 300-.47-.38-31.56-24.75a16.11 16.11 0 0 1-6.1-13.33v-11.56a16 16 0 0 1 6.11-13.22L469.92 212l.47-.38a26.68 26.68 0 0 0 5.9-34.06l-42.71-73.9a1.59 1.59 0 0 1-.13-.22A26.86 26.86 0 0 0 401 92.14l-.35.13-37.1 14.93a15.94 15.94 0 0 1-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 0 1-8.19-11.82l-5.59-39.59-.12-.72A27.22 27.22 0 0 0 298.76 26h-85.52a26.92 26.92 0 0 0-26.45 22.39l-.09.56-5.57 39.67a16 16 0 0 1-8.13 11.82 175.21 175.21 0 0 0-10 5.82 15.92 15.92 0 0 1-14.43 1.27l-37.13-15-.35-.14a26.87 26.87 0 0 0-32.48 11.34l-.13.22-42.77 73.95a26.71 26.71 0 0 0 5.9 34.1l.47.38 31.56 24.75a16.11 16.11 0 0 1 6.1 13.33v11.56a16 16 0 0 1-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 0 0-5.9 34.06l42.71 73.9a1.59 1.59 0 0 1 .13.22 26.86 26.86 0 0 0 32.45 11.3l.35-.13 37.07-14.93a15.94 15.94 0 0 1 14.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 0 1 8.19 11.82l5.56 39.59.12.72A27.22 27.22 0 0 0 213.24 486h85.52a26.92 26.92 0 0 0 26.45-22.39l.09-.56 5.57-39.67a16 16 0 0 1 8.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0 1 14.43-1.27l37.13 14.95.35.14a26.85 26.85 0 0 0 32.48-11.34 2.53 2.53 0 0 1 .13-.22l42.71-73.89a26.7 26.7 0 0 0-5.89-34.11zm-134.48-40.24a80 80 0 1 1-83.66-83.67 80.21 80.21 0 0 1 83.66 83.67z",
        },
        child: [],
      },
    ],
  })(s);
}
function cg(s) {
  return mt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M464 384.39a32 32 0 0 1-13-2.77 15.77 15.77 0 0 1-2.71-1.54l-82.71-58.22A32 32 0 0 1 352 295.7v-79.4a32 32 0 0 1 13.58-26.16l82.71-58.22a15.77 15.77 0 0 1 2.71-1.54 32 32 0 0 1 45 29.24v192.76a32 32 0 0 1-32 32zM268 400H84a68.07 68.07 0 0 1-68-68V180a68.07 68.07 0 0 1 68-68h184.48A67.6 67.6 0 0 1 336 179.52V332a68.07 68.07 0 0 1-68 68z",
        },
        child: [],
      },
    ],
  })(s);
}
function og(s) {
  return mt({
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zM12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4zm3.5-7c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
        },
        child: [],
      },
    ],
  })(s);
}
const Yl = w.createContext(null);
function gm() {
  const {
      socket: s,
      selectedChat: i,
      conversationHistory: c,
      setConversationHistory: u,
    } = w.useContext(Yl),
    [f, d] = w.useState({ inputRowCount: 1, focus: !1 });
  return (
    w.useEffect(() => {
      i && s && (u([]), s.emit("conversation", i.chatroomId));
    }, [i, s]),
    console.log("Conversation History in ChatPanel:", c),
    i === null
      ? v.jsx("div", {
          id: "chat-panel",
          className:
            "justify-center items-center text-gray-400 dlayer-3 w-auto h-full max-h-full flex flex-col rounded-lg opac-shadow",
          children: "Select a friend to chat with on the left panel",
        })
      : v.jsxs("div", {
          id: "chat-panel",
          className:
            "text-white dlayer-3 w-auto h-full max-h-full flex flex-col rounded-lg opac-shadow",
          children: [
            v.jsxs("div", {
              id: "recipient",
              className:
                "flex items-center justify-between px-5 py-2 opac-shadow",
              children: [
                v.jsxs("div", {
                  className: "flex items-center",
                  children: [
                    v.jsx("img", {
                      src: `data:image/jpg;base64,${i?.avatar}`,
                      alt: "Avatar",
                      className: "w-11 h-11 rounded-full mr-2",
                    }),
                    v.jsx("p", {
                      className: "text-md",
                      children: i ? i.username : "Unknown",
                    }),
                  ],
                }),
                v.jsxs("div", {
                  className: "flex space-x-7 text-gray-200 pr-2",
                  children: [
                    v.jsx("i", {
                      className: "standard-icon-container p-1",
                      children: v.jsx(cg, { className: "standard-icon" }),
                    }),
                    v.jsx("i", {
                      className: "standard-icon-container p-1",
                      children: v.jsx(ig, { className: "standard-icon" }),
                    }),
                    v.jsx("i", {
                      className: "standard-icon-container p-1",
                      children: v.jsx(sg, { className: "standard-icon" }),
                    }),
                  ],
                }),
              ],
            }),
            v.jsx("div", {
              id: "chat-messages",
              className:
                "text-gray-200 flex flex-col space-y-6 my-3 flex-1 overflow-auto",
              children:
                c &&
                c.map((m) =>
                  v.jsx(
                    "div",
                    {
                      className: "chat-message ml-6 rounded-md",
                      children: v.jsxs("div", {
                        className: "flex items-start space-x-3",
                        children: [
                          v.jsx("img", {
                            src: `data:image/jpg;base64,${m.avatar}`,
                            alt: "Avatar",
                            className: "w-11 h-11 rounded-full",
                          }),
                          v.jsxs("div", {
                            children: [
                              v.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  v.jsx("p", {
                                    className: "text-md",
                                    children: m.sentBy || "Unknown",
                                  }),
                                  v.jsx("span", {
                                    className:
                                      "text-gray-400/70 text-xs font-semibold",
                                    children:
                                      new Date(m.timestamp).toLocaleString() ||
                                      "Unknown",
                                  }),
                                ],
                              }),
                              v.jsx("p", {
                                className:
                                  "text-gray-300 max-w-3xl break-words",
                                children: m.message || "",
                              }),
                            ],
                          }),
                        ],
                      }),
                    },
                    m.messageId
                  )
                ),
            }),
            v.jsxs("div", {
              id: "chat-input-box",
              className: "flex items-center px-2 layer-1 rounded-lg",
              children: [
                v.jsxs("div", {
                  className: "flex items-center space-x-3 mr-3",
                  children: [
                    v.jsx("i", {
                      children: v.jsx(eg, {
                        className: "text-2xl cursor-pointer",
                      }),
                    }),
                    v.jsx("i", {
                      children: v.jsx(og, {
                        className: "text-2xl cursor-pointer",
                      }),
                    }),
                  ],
                }),
                v.jsx("textarea", {
                  id: "chat-input",
                  placeholder: "Type a message...",
                  className:
                    "w-full p-2 m-2 rounded-lg text-white min-h-1 layer-2 resize-none hideScrollBar outline-none",
                  rows: f.focus ? f.inputRowCount : 1,
                  onFocus: (m) => {
                    (m.stopPropagation(), d((x) => ({ ...x, focus: !0 })));
                  },
                  onBlur: (m) => {
                    (m.stopPropagation(), d((x) => ({ ...x, focus: !1 })));
                  },
                  onKeyDown: (m) => {
                    if (
                      (m.stopPropagation(), m.key === "Enter" && m.shiftKey)
                    ) {
                      if (f.inputRowCount >= 6) return;
                      d((x) => ({ ...x, inputRowCount: x.inputRowCount + 1 }));
                    } else if (m.key === "Enter" && !m.shiftKey)
                      (m.preventDefault(),
                        s &&
                          (s.emit(
                            "send-message",
                            i?.chatroomId,
                            m.target.value
                          ),
                          (m.target.value = ""),
                          d((x) => ({ ...x, inputRowCount: 1 }))));
                    else if (m.key === "Backspace") {
                      const p = m.target.value.slice(0, m.target.selectionStart)
                          .lastIndexOf(`
`),
                        y = m.target.value.split(`
`).length;
                      m.target.selectionStart === p + 1 &&
                        y <= 6 &&
                        d((E) => ({
                          ...E,
                          inputRowCount: Math.max(E.inputRowCount - 1, 1),
                        }));
                    }
                  },
                }),
              ],
            }),
          ],
        })
  );
}
function fg(s) {
  return mt({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "g",
        attr: { id: "Mail" },
        child: [
          {
            tag: "path",
            attr: {
              d: "M19.435,4.065H4.565a2.5,2.5,0,0,0-2.5,2.5v10.87a2.5,2.5,0,0,0,2.5,2.5h14.87a2.5,2.5,0,0,0,2.5-2.5V6.565A2.5,2.5,0,0,0,19.435,4.065Zm-14.87,1h14.87a1.489,1.489,0,0,1,1.49,1.39c-2.47,1.32-4.95,2.63-7.43,3.95a6.172,6.172,0,0,1-1.06.53,2.083,2.083,0,0,1-1.67-.39c-1.42-.75-2.84-1.51-4.25-2.26-1.14-.6-2.3-1.21-3.44-1.82A1.491,1.491,0,0,1,4.565,5.065Zm16.37,12.37a1.5,1.5,0,0,1-1.5,1.5H4.565a1.5,1.5,0,0,1-1.5-1.5V7.6c2.36,1.24,4.71,2.5,7.07,3.75a5.622,5.622,0,0,0,1.35.6,2.872,2.872,0,0,0,2-.41c1.45-.76,2.89-1.53,4.34-2.29,1.04-.56,2.07-1.1,3.11-1.65Z",
            },
            child: [],
          },
        ],
      },
    ],
  })(s);
}
function hg({ friendModalRef: s }) {
  const [i, c] = w.useState({ searchError: "" }),
    [u, f] = w.useState({}),
    [d, m] = w.useState({ friendRequestError: "" }),
    [x, p] = w.useState([]),
    y = async (M) => {
      (M.stopPropagation(), M.preventDefault());
      const { username: j } = Object.fromEntries(new FormData(M.target));
      c({ searchError: "" });
      try {
        const q = `${$e.VITE_BACKEND_URL}/users/lookup`,
          H = new URLSearchParams({ targetUsername: j }),
          X = `${q}?${H.toString()}`,
          L = await fetch(X, { method: "GET", credentials: "include" }),
          G = await L.json();
        if (L.ok) {
          const Y = G.searchResults;
          (console.log("search results"), console.log(G), console.log(Y), p(Y));
        } else {
          const Y = G.errors || [],
            $ = { searchError: "" };
          for (const { field: oe, msg: F } of Y)
            oe === "searchError"
              ? ($.searchError = F)
              : ($.searchError =
                  "An unknown error has occurred during user lookup");
          c($);
        }
      } catch {
        c({ searchError: "Network error. Please try again." });
      }
    },
    E = async (M) => {
      m({ friendRequestError: "" });
      try {
        const q = `${$e.VITE_BACKEND_URL}/users/friend-requests`,
          X = await fetch(q, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ username: M }),
            headers: { "Content-Type": "application/json" },
          }),
          L = await X.json();
        if (X.ok) {
          const { username: G } = L;
          var j = "Friend request sent!";
          f({ ...u, [G]: j });
        } else {
          const G = L.errors || [],
            Y = { friendRequestError: "" };
          for (const { field: $, msg: oe } of G)
            $ === "customError"
              ? (Y.friendRequestError = oe)
              : (Y.friendRequestError =
                  "An unknown error has occurred when sending friend request to user");
          m(Y);
        }
      } catch {
        m({ friendRequestError: "Network error. Please try again." });
      }
    };
  return v.jsx(v.Fragment, {
    children: v.jsx("div", {
      className: "flex justify-center modal-overlay",
      children: v.jsxs("div", {
        id: "search-friend-modal",
        className:
          "flex flex-col self-center p-5 w-full max-w-xl h-full min-h-100 md:min-h-120 max-h-[80vh] overflow-auto shadow-card rounded-card dlayer-4",
        ref: s,
        children: [
          v.jsx("h1", {
            className: "text-center pb-5",
            children: "Search for users",
          }),
          v.jsxs("form", {
            className: "flex pb-5",
            onSubmit: y,
            children: [
              v.jsxs("div", {
                className: "flex space-x-3 grow-1 pr-4",
                children: [
                  v.jsx("i", {
                    className:
                      "flex justify-center items-center standard-icon-container p-1",
                    children: v.jsx(mm, { className: "standard-icon" }),
                  }),
                  v.jsxs("div", {
                    className: "w-full",
                    children: [
                      v.jsx("label", { htmlFor: "search-person-username" }),
                      v.jsx("input", {
                        id: "search-person-username",
                        type: "text",
                        name: "username",
                        className:
                          "neon-input p-1.5 rounded-lg w-full placeholder-gray-400",
                      }),
                    ],
                  }),
                ],
              }),
              v.jsx("button", {
                type: "submit",
                className:
                  "grow-1 neon-button-purple neon-button-purple-animated rounded-lg",
                children: "Search",
              }),
            ],
          }),
          i.searchError && v.jsx("p", { children: i.searchError }),
          v.jsx("div", {
            id: "search-person-results-container",
            className: `flex flex-col dlayer-1 grow rounded-lg ${x.length === 0 ? "items-center justify-center" : ""}`,
            children:
              x.length === 0
                ? v.jsx("p", {
                    children: "No users found with current username",
                  })
                : x.map((M) => {
                    const {
                      username: j,
                      avatarImage: q,
                      friendshipData: H,
                    } = M;
                    let X;
                    if (!H) X = "Send friend request";
                    else {
                      const { status: L, role: G } = H;
                      switch (L) {
                        case "pending":
                          G === "requestor"
                            ? (X = "Pending")
                            : G === "recipient" &&
                              (X = "Accept friend request");
                          break;
                        case "accepted":
                          X = "Friend";
                          break;
                        default:
                          X = "Unknown";
                      }
                    }
                    return v.jsxs(
                      "div",
                      {
                        className: "flex justify-between opac-shadow p-3",
                        children: [
                          v.jsxs("div", {
                            className: "flex items-center",
                            children: [
                              v.jsx("img", {
                                src: "../assets/sunrise2.jpg",
                                alt: "Avatar",
                                className: "w-11 h-11 rounded-full mr-2",
                              }),
                              v.jsx("p", { className: "text-md", children: j }),
                            ],
                          }),
                          v.jsx("button", {
                            className:
                              "neon-button-purple neon-button-animated rounded-full p-3",
                            onClick:
                              X === "Send friend request" ? () => E(j) : null,
                            disabled: X === "pending",
                            children: u[j] || X,
                          }),
                        ],
                      },
                      j
                    );
                  }),
          }),
        ],
      }),
    }),
  });
}
function dg({ inboxModalRef: s }) {
  console.log("Inbox opened");
  const { pendingFriendRequests: i } = w.useContext(Yl);
  (console.log(i), console.log(i.length));
  const c = async (u) => {
    const f = `${$e.VITE_BACKEND_URL}/users/friend-requests/acceptance`,
      d = { username: u };
    try {
      if (
        (
          await fetch(f, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(d),
            headers: { "Content-Type": "application/json" },
          })
        ).ok
      )
        console.log("Friend request accepted");
      else throw new Error("Accepting friend request failed");
    } catch (m) {
      console.log(m);
    }
  };
  return v.jsx("div", {
    className: "flex flex-col modal-overlay justify-center",
    children: v.jsxs("div", {
      id: "inbox-modal",
      className:
        "flex flex-col grow self-center p-5 w-full max-w-xl max-h-[80vh] shadow-card rounded-card dlayer-4",
      ref: s,
      children: [
        v.jsx("h1", {
          className: "text-center pb-5",
          children: "Incoming Friend Requests",
        }),
        v.jsx("div", {
          id: "pending-friend-requests-container",
          className: "grow dlayer-1 rounded-lg overflow-auto",
          children:
            i.length > 0 &&
            i.map((u) =>
              v.jsxs(
                "div",
                {
                  className: "flex justify-between p-3 opac-shadow",
                  children: [
                    v.jsxs("div", {
                      className: "flex items-center",
                      children: [
                        v.jsx("img", {
                          src:
                            u?.requestor?.profile?.avatarImage ||
                            "../assets/sunrise2.jpg",
                          alt: "Avatar",
                          className: "w-11 h-11 rounded-full mr-3.5",
                        }),
                        v.jsx("div", {
                          className: "flex flex-col",
                          children: v.jsx("p", {
                            className: "text-md",
                            children: u?.username || "Unknown User",
                          }),
                        }),
                      ],
                    }),
                    v.jsx("div", {
                      className: "flex gap-3",
                      children: v.jsx("button", {
                        className:
                          "min-w-20 neon-button-purple neon-button-animated rounded-full p-3",
                        onClick: () => c(u?.username),
                        children: "Accept",
                      }),
                    }),
                  ],
                },
                u?.username
              )
            ),
        }),
      ],
    }),
  });
}
const Yd = "/assets/sunrise2-D4R1OSEQ.jpg";
function vm({ pendingFriendRequests: s, friends: i }) {
  const [c, u] = w.useState(!1),
    [f, d] = w.useState(!1),
    m = w.useRef(null),
    x = w.useRef(null),
    { selectedChat: p, setSelectedChat: y } = w.useContext(Yl);
  return (
    Eu(m, c, () => u(!1)),
    Eu(x, f, () => {
      d(!1);
    }),
    v.jsxs("div", {
      id: "chat-option",
      className:
        "text-white dlayer-4 w-auto h-full max-h-full flex flex-col rounded-lg opac-shadow",
      children: [
        c && v.jsx(hg, { friendModalRef: m }),
        f && v.jsx(dg, { inboxModalRef: x }),
        v.jsx("div", {
          id: "top-navigation",
          className: "opac-shadow",
          children: v.jsxs("div", {
            className: "flex items-center justify-between p-3 mb-0.5",
            children: [
              v.jsx("h1", { className: "text-3xl", children: "Chat" }),
              v.jsxs("div", {
                className: "flex space-x-7 text-gray-200 pr-2r",
                children: [
                  v.jsx("i", {
                    className: "standard-icon-container p-1",
                    children: v.jsx(mm, { className: "standard-icon" }),
                  }),
                  v.jsx("i", {
                    className: "standard-icon-container p-1",
                    onClick: (E) => {
                      (E.stopPropagation(), u(!0));
                    },
                    children: v.jsx(ug, { className: "standard-icon" }),
                  }),
                  v.jsxs("i", {
                    className: "relative standard-icon-container p-1",
                    onClick: (E) => {
                      (E.stopPropagation(), d(!0));
                    },
                    children: [
                      s.length > 0 &&
                        v.jsx("span", {
                          className:
                            "absolute top-0 right-0 bg-[#9059f6] text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center",
                          children: s.length,
                        }),
                      v.jsx(fg, { className: "standard-icon" }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        v.jsx("div", {
          id: "status-bar",
          className: `flex items-center gap-5 ${i.length > 0 ? "" : "min-h-[10%]"} px-4 py-2 opac-shado w overflow-auto`,
          children:
            i.length > 0
              ? i.map((E) =>
                  v.jsxs(
                    "div",
                    {
                      className:
                        "flex flex-col items-center justify-center space-y-1 cursor-pointer",
                      children: [
                        v.jsx("img", {
                          src: Yd,
                          alt: "Avatar",
                          className: "w-11 h-11 rounded-full",
                        }),
                        v.jsx("p", {
                          className: "text-sm",
                          children: E.username,
                        }),
                      ],
                    },
                    E.username
                  )
                )
              : v.jsx("div", {
                  className:
                    "flex grow items-center justify-center text-gray-400",
                  children: "No friends yet",
                }),
        }),
        v.jsx("div", {
          id: "recent-chats",
          className: "flex flex-col items-start space-y-0 grow overflow-auto",
          children:
            i.length > 0
              ? i.map((E) =>
                  v.jsxs(
                    "div",
                    {
                      className: `flex w-full py-2 px-4 opac-shadow cursor-pointer ${p?.username === E.username ? "bg-gray-700" : "hover:bg-gray-800 "}`,
                      onClick: () => y(E),
                      children: [
                        v.jsx("img", {
                          src: Yd,
                          alt: "Avatar",
                          className: "w-11 h-11 rounded-full mr-3.5",
                        }),
                        v.jsxs("div", {
                          className: "flex flex-col",
                          children: [
                            v.jsx("p", {
                              className: "text-sm",
                              children: E.username,
                            }),
                            v.jsx("p", {
                              className: "text-xs text-gray-400",
                              children: "No recent messages",
                            }),
                          ],
                        }),
                      ],
                    },
                    E.username
                  )
                )
              : v.jsx("div", {
                  className:
                    "flex grow self-stretch items-center justify-center text-gray-400",
                  children: "No recent chats",
                }),
        }),
      ],
    })
  );
}
function mg() {
  return v.jsx("div", {
    id: "block",
    className:
      "w-full text-white bg-black min-h-dvh flex flex-col border-solid border-4 border-blue-100",
  });
}
function pg(s) {
  return mt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M391.553 64H57.607C53.131 64 48 67.745 48 72.159v214.217c0 4.413 5.131 8.624 9.607 8.624H115v88.894L205.128 295h186.425c4.477 0 7.447-4.211 7.447-8.624V72.159c0-4.414-2.971-8.159-7.447-8.159z",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "M456.396 127H424v166.57c0 15.987-6.915 26.43-25.152 26.43H218.096l-38.905 39h129.688L399 448v-89h57.396c4.478 0 7.604-4.262 7.604-8.682V136.103c0-4.414-3.126-9.103-7.604-9.103z",
        },
        child: [],
      },
    ],
  })(s);
}
function bm({ optionSelected: s, setOptionSelected: i }) {
  const [c, u] = w.useState(!1),
    { newFriendRequest: f } = w.useContext(Yl);
  return (
    w.useEffect(() => {
      if (!f) return;
      (() => {
        (u(!0),
          setTimeout(() => {
            u(!1);
          }, 1e4));
      })();
    }, [f]),
    v.jsxs("nav", {
      id: "top-nav",
      className:
        "flex flex-row px-3 py-5 justify-center items-center space-x-15 text-white",
      children: [
        v.jsxs("div", {
          id: "chat-option",
          className: `relative flex flex-col items-center cursor-pointer p-2 rounded-lg ${s.chatOption ? "layer-2" : ""}
  `,
          onClick: () => i({ chatOption: !0, settingsOption: !1 }),
          children: [
            v.jsx("i", {
              className: "navigation-icon",
              children: v.jsx(pg, { className: "text-[1.4rem] " }),
            }),
            v.jsx("h2", { className: "text-lg", children: "Chat" }),
            c && v.jsx("p", { children: "You have a new friend request!" }),
          ],
        }),
        v.jsxs("div", {
          id: "settings-option",
          className: `flex flex-col items-center cursor-pointer p-2 rounded-lg ${s.settingsOption ? "bg-gray-700" : ""}`,
          onClick: () => i({ chatOption: !1, settingsOption: !0 }),
          children: [
            v.jsx("i", {
              className: "navigation-icon",
              children: v.jsx(rg, { className: "text-[1.4rem]" }),
            }),
            v.jsx("h2", { className: "text-lg", children: "Settings" }),
          ],
        }),
      ],
    })
  );
}
function yg() {
  const { isLoading: s, isAuthenticated: i } = ym(),
    { pendingFriendRequests: c, friends: u } = w.useContext(Yl),
    [f, d] = w.useState({ chatOption: !0, settingsOption: !1 });
  if (s) return null;
  if (i)
    return v.jsxs("div", {
      id: "main-panel",
      className: "flex flex-col w-full pb-3 h-dvh layer-0",
      children: [
        v.jsx("div", {
          children: v.jsx(bm, { optionSelected: f, setOptionSelected: d }),
        }),
        v.jsxs("div", {
          className:
            "flex flex-col md:flex-row flex-1 min-h-0 px-2 pb-1 self-stretch gap-2",
          children: [
            v.jsx("div", {
              className:
                "md:flex-[0.40] rounded-lg min-w-[220px] max-w-full h-full max-h-full",
              children: v.jsx(vm, { pendingFriendRequests: c, friends: u }),
            }),
            v.jsx("div", {
              className:
                "md:flex-[0.60] rounded-lg min-w-[260px] max-w-full h-full max-h-full",
              children: v.jsx(gm, {}),
            }),
          ],
        }),
      ],
    });
}
function gg() {
  return v.jsxs("div", {
    id: "settings-page",
    className:
      "flex flex-col primary-background h-dvh w-full px-30 border-solid",
    children: [
      v.jsx(bm, {}),
      v.jsx("div", {
        id: "title",
        className: "opac-divider",
        children: v.jsx("h1", { className: "text-3xl", children: "Settings" }),
      }),
      v.jsxs("div", {
        id: "settings-container",
        className: "flex grow space-x-5 w-full py-5",
        children: [
          v.jsx("div", {
            id: "settings-panel",
            className:
              "flex flex-col bg-gray-700 w-full max-w-3xs py-2 text-xl self-start",
            children: v.jsx("button", {
              className: "cursor-pointer",
              children: "Profile",
            }),
          }),
          v.jsx("div", {
            id: "edit-panel",
            className: "flex flex-col bg-gray-600 w-full",
            children: v.jsxs("div", {
              className:
                "flex flex-col grow space-y-3 w-full items-center justify-center",
              children: [
                v.jsxs("div", {
                  className: "relative group",
                  children: [
                    v.jsx("img", {
                      src: "../assets/sunrise2.jpg",
                      alt: "Avatar",
                      className: "w-75 h-75 rounded-full mr-2 curso-pointer",
                    }),
                    v.jsx("div", {
                      className: `flex absolute inset-0 w-75 h-75 bg-gray-400/50 rounded-full text-center text-white z-10\r
               items-center justify-center cursor-pointer transition-opacity duration-200 ease-in-out \r
               opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100`,
                      children: "Upload another image",
                    }),
                  ],
                }),
                v.jsxs("div", {
                  className: "flex text-3xl space-x-35 pt-5",
                  children: [
                    v.jsx("p", { children: "Username: John Zena" }),
                    v.jsx("p", { children: "Email: JohnZena23@gmail.com" }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
async function vg() {
  const s = `${$e.VITE_BACKEND_URL}/authentication`,
    i = { method: "GET", credentials: "include" };
  try {
    if (!(await fetch(s, i)).ok) throw new Error("Invalid status code");
    return !0;
  } catch (c) {
    return (console.log(c), !1);
  }
}
function bg({ children: s }) {
  return v.jsx(pm.Provider, { value: vg, children: s });
}
const qt = Object.create(null);
qt.open = "0";
qt.close = "1";
qt.ping = "2";
qt.pong = "3";
qt.message = "4";
qt.upgrade = "5";
qt.noop = "6";
const pu = Object.create(null);
Object.keys(qt).forEach((s) => {
  pu[qt[s]] = s;
});
const uc = { type: "error", data: "parser error" },
  Sm =
    typeof Blob == "function" ||
    (typeof Blob < "u" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  xm = typeof ArrayBuffer == "function",
  Em = (s) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(s)
      : s && s.buffer instanceof ArrayBuffer,
  bc = ({ type: s, data: i }, c, u) =>
    Sm && i instanceof Blob
      ? c
        ? u(i)
        : Vd(i, u)
      : xm && (i instanceof ArrayBuffer || Em(i))
        ? c
          ? u(i)
          : Vd(new Blob([i]), u)
        : u(qt[s] + (i || "")),
  Vd = (s, i) => {
    const c = new FileReader();
    return (
      (c.onload = function () {
        const u = c.result.split(",")[1];
        i("b" + (u || ""));
      }),
      c.readAsDataURL(s)
    );
  };
function Gd(s) {
  return s instanceof Uint8Array
    ? s
    : s instanceof ArrayBuffer
      ? new Uint8Array(s)
      : new Uint8Array(s.buffer, s.byteOffset, s.byteLength);
}
let tc;
function Sg(s, i) {
  if (Sm && s.data instanceof Blob)
    return s.data.arrayBuffer().then(Gd).then(i);
  if (xm && (s.data instanceof ArrayBuffer || Em(s.data))) return i(Gd(s.data));
  bc(s, !1, (c) => {
    (tc || (tc = new TextEncoder()), i(tc.encode(c)));
  });
}
const Xd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Xa = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let s = 0; s < Xd.length; s++) Xa[Xd.charCodeAt(s)] = s;
const xg = (s) => {
    let i = s.length * 0.75,
      c = s.length,
      u,
      f = 0,
      d,
      m,
      x,
      p;
    s[s.length - 1] === "=" && (i--, s[s.length - 2] === "=" && i--);
    const y = new ArrayBuffer(i),
      E = new Uint8Array(y);
    for (u = 0; u < c; u += 4)
      ((d = Xa[s.charCodeAt(u)]),
        (m = Xa[s.charCodeAt(u + 1)]),
        (x = Xa[s.charCodeAt(u + 2)]),
        (p = Xa[s.charCodeAt(u + 3)]),
        (E[f++] = (d << 2) | (m >> 4)),
        (E[f++] = ((m & 15) << 4) | (x >> 2)),
        (E[f++] = ((x & 3) << 6) | (p & 63)));
    return y;
  },
  Eg = typeof ArrayBuffer == "function",
  Sc = (s, i) => {
    if (typeof s != "string") return { type: "message", data: _m(s, i) };
    const c = s.charAt(0);
    return c === "b"
      ? { type: "message", data: _g(s.substring(1), i) }
      : pu[c]
        ? s.length > 1
          ? { type: pu[c], data: s.substring(1) }
          : { type: pu[c] }
        : uc;
  },
  _g = (s, i) => {
    if (Eg) {
      const c = xg(s);
      return _m(c, i);
    } else return { base64: !0, data: s };
  },
  _m = (s, i) => {
    switch (i) {
      case "blob":
        return s instanceof Blob ? s : new Blob([s]);
      case "arraybuffer":
      default:
        return s instanceof ArrayBuffer ? s : s.buffer;
    }
  },
  Tm = "",
  Tg = (s, i) => {
    const c = s.length,
      u = new Array(c);
    let f = 0;
    s.forEach((d, m) => {
      bc(d, !1, (x) => {
        ((u[m] = x), ++f === c && i(u.join(Tm)));
      });
    });
  },
  Ag = (s, i) => {
    const c = s.split(Tm),
      u = [];
    for (let f = 0; f < c.length; f++) {
      const d = Sc(c[f], i);
      if ((u.push(d), d.type === "error")) break;
    }
    return u;
  };
function Rg() {
  return new TransformStream({
    transform(s, i) {
      Sg(s, (c) => {
        const u = c.length;
        let f;
        if (u < 126)
          ((f = new Uint8Array(1)), new DataView(f.buffer).setUint8(0, u));
        else if (u < 65536) {
          f = new Uint8Array(3);
          const d = new DataView(f.buffer);
          (d.setUint8(0, 126), d.setUint16(1, u));
        } else {
          f = new Uint8Array(9);
          const d = new DataView(f.buffer);
          (d.setUint8(0, 127), d.setBigUint64(1, BigInt(u)));
        }
        (s.data && typeof s.data != "string" && (f[0] |= 128),
          i.enqueue(f),
          i.enqueue(c));
      });
    },
  });
}
let nc;
function fu(s) {
  return s.reduce((i, c) => i + c.length, 0);
}
function hu(s, i) {
  if (s[0].length === i) return s.shift();
  const c = new Uint8Array(i);
  let u = 0;
  for (let f = 0; f < i; f++)
    ((c[f] = s[0][u++]), u === s[0].length && (s.shift(), (u = 0)));
  return (s.length && u < s[0].length && (s[0] = s[0].slice(u)), c);
}
function wg(s, i) {
  nc || (nc = new TextDecoder());
  const c = [];
  let u = 0,
    f = -1,
    d = !1;
  return new TransformStream({
    transform(m, x) {
      for (c.push(m); ; ) {
        if (u === 0) {
          if (fu(c) < 1) break;
          const p = hu(c, 1);
          ((d = (p[0] & 128) === 128),
            (f = p[0] & 127),
            f < 126 ? (u = 3) : f === 126 ? (u = 1) : (u = 2));
        } else if (u === 1) {
          if (fu(c) < 2) break;
          const p = hu(c, 2);
          ((f = new DataView(p.buffer, p.byteOffset, p.length).getUint16(0)),
            (u = 3));
        } else if (u === 2) {
          if (fu(c) < 8) break;
          const p = hu(c, 8),
            y = new DataView(p.buffer, p.byteOffset, p.length),
            E = y.getUint32(0);
          if (E > Math.pow(2, 21) - 1) {
            x.enqueue(uc);
            break;
          }
          ((f = E * Math.pow(2, 32) + y.getUint32(4)), (u = 3));
        } else {
          if (fu(c) < f) break;
          const p = hu(c, f);
          (x.enqueue(Sc(d ? p : nc.decode(p), i)), (u = 0));
        }
        if (f === 0 || f > s) {
          x.enqueue(uc);
          break;
        }
      }
    },
  });
}
const Am = 4;
function je(s) {
  if (s) return Ng(s);
}
function Ng(s) {
  for (var i in je.prototype) s[i] = je.prototype[i];
  return s;
}
je.prototype.on = je.prototype.addEventListener = function (s, i) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks["$" + s] = this._callbacks["$" + s] || []).push(i),
    this
  );
};
je.prototype.once = function (s, i) {
  function c() {
    (this.off(s, c), i.apply(this, arguments));
  }
  return ((c.fn = i), this.on(s, c), this);
};
je.prototype.off =
  je.prototype.removeListener =
  je.prototype.removeAllListeners =
  je.prototype.removeEventListener =
    function (s, i) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return ((this._callbacks = {}), this);
      var c = this._callbacks["$" + s];
      if (!c) return this;
      if (arguments.length == 1) return (delete this._callbacks["$" + s], this);
      for (var u, f = 0; f < c.length; f++)
        if (((u = c[f]), u === i || u.fn === i)) {
          c.splice(f, 1);
          break;
        }
      return (c.length === 0 && delete this._callbacks["$" + s], this);
    };
je.prototype.emit = function (s) {
  this._callbacks = this._callbacks || {};
  for (
    var i = new Array(arguments.length - 1),
      c = this._callbacks["$" + s],
      u = 1;
    u < arguments.length;
    u++
  )
    i[u - 1] = arguments[u];
  if (c) {
    c = c.slice(0);
    for (var u = 0, f = c.length; u < f; ++u) c[u].apply(this, i);
  }
  return this;
};
je.prototype.emitReserved = je.prototype.emit;
je.prototype.listeners = function (s) {
  return (
    (this._callbacks = this._callbacks || {}),
    this._callbacks["$" + s] || []
  );
};
je.prototype.hasListeners = function (s) {
  return !!this.listeners(s).length;
};
const Ru =
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? (i) => Promise.resolve().then(i)
      : (i, c) => c(i, 0),
  Tt =
    typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : Function("return this")(),
  Og = "arraybuffer";
function Rm(s, ...i) {
  return i.reduce((c, u) => (s.hasOwnProperty(u) && (c[u] = s[u]), c), {});
}
const Cg = Tt.setTimeout,
  Mg = Tt.clearTimeout;
function wu(s, i) {
  i.useNativeTimers
    ? ((s.setTimeoutFn = Cg.bind(Tt)), (s.clearTimeoutFn = Mg.bind(Tt)))
    : ((s.setTimeoutFn = Tt.setTimeout.bind(Tt)),
      (s.clearTimeoutFn = Tt.clearTimeout.bind(Tt)));
}
const Dg = 1.33;
function zg(s) {
  return typeof s == "string"
    ? jg(s)
    : Math.ceil((s.byteLength || s.size) * Dg);
}
function jg(s) {
  let i = 0,
    c = 0;
  for (let u = 0, f = s.length; u < f; u++)
    ((i = s.charCodeAt(u)),
      i < 128
        ? (c += 1)
        : i < 2048
          ? (c += 2)
          : i < 55296 || i >= 57344
            ? (c += 3)
            : (u++, (c += 4)));
  return c;
}
function wm() {
  return (
    Date.now().toString(36).substring(3) +
    Math.random().toString(36).substring(2, 5)
  );
}
function Ug(s) {
  let i = "";
  for (let c in s)
    s.hasOwnProperty(c) &&
      (i.length && (i += "&"),
      (i += encodeURIComponent(c) + "=" + encodeURIComponent(s[c])));
  return i;
}
function Bg(s) {
  let i = {},
    c = s.split("&");
  for (let u = 0, f = c.length; u < f; u++) {
    let d = c[u].split("=");
    i[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
  }
  return i;
}
class qg extends Error {
  constructor(i, c, u) {
    (super(i),
      (this.description = c),
      (this.context = u),
      (this.type = "TransportError"));
  }
}
class xc extends je {
  constructor(i) {
    (super(),
      (this.writable = !1),
      wu(this, i),
      (this.opts = i),
      (this.query = i.query),
      (this.socket = i.socket),
      (this.supportsBinary = !i.forceBase64));
  }
  onError(i, c, u) {
    return (super.emitReserved("error", new qg(i, c, u)), this);
  }
  open() {
    return ((this.readyState = "opening"), this.doOpen(), this);
  }
  close() {
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(i) {
    this.readyState === "open" && this.write(i);
  }
  onOpen() {
    ((this.readyState = "open"),
      (this.writable = !0),
      super.emitReserved("open"));
  }
  onData(i) {
    const c = Sc(i, this.socket.binaryType);
    this.onPacket(c);
  }
  onPacket(i) {
    super.emitReserved("packet", i);
  }
  onClose(i) {
    ((this.readyState = "closed"), super.emitReserved("close", i));
  }
  pause(i) {}
  createUri(i, c = {}) {
    return (
      i +
      "://" +
      this._hostname() +
      this._port() +
      this.opts.path +
      this._query(c)
    );
  }
  _hostname() {
    const i = this.opts.hostname;
    return i.indexOf(":") === -1 ? i : "[" + i + "]";
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && +(this.opts.port !== 443)) ||
        (!this.opts.secure && Number(this.opts.port) !== 80))
      ? ":" + this.opts.port
      : "";
  }
  _query(i) {
    const c = Ug(i);
    return c.length ? "?" + c : "";
  }
}
class Hg extends xc {
  constructor() {
    (super(...arguments), (this._polling = !1));
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this._poll();
  }
  pause(i) {
    this.readyState = "pausing";
    const c = () => {
      ((this.readyState = "paused"), i());
    };
    if (this._polling || !this.writable) {
      let u = 0;
      (this._polling &&
        (u++,
        this.once("pollComplete", function () {
          --u || c();
        })),
        this.writable ||
          (u++,
          this.once("drain", function () {
            --u || c();
          })));
    } else c();
  }
  _poll() {
    ((this._polling = !0), this.doPoll(), this.emitReserved("poll"));
  }
  onData(i) {
    const c = (u) => {
      if (
        (this.readyState === "opening" && u.type === "open" && this.onOpen(),
        u.type === "close")
      )
        return (
          this.onClose({ description: "transport closed by the server" }),
          !1
        );
      this.onPacket(u);
    };
    (Ag(i, this.socket.binaryType).forEach(c),
      this.readyState !== "closed" &&
        ((this._polling = !1),
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this._poll()));
  }
  doClose() {
    const i = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? i() : this.once("open", i);
  }
  write(i) {
    ((this.writable = !1),
      Tg(i, (c) => {
        this.doWrite(c, () => {
          ((this.writable = !0), this.emitReserved("drain"));
        });
      }));
  }
  uri() {
    const i = this.opts.secure ? "https" : "http",
      c = this.query || {};
    return (
      this.opts.timestampRequests !== !1 &&
        (c[this.opts.timestampParam] = wm()),
      !this.supportsBinary && !c.sid && (c.b64 = 1),
      this.createUri(i, c)
    );
  }
}
let Nm = !1;
try {
  Nm = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {}
const Lg = Nm;
function Yg() {}
class Vg extends Hg {
  constructor(i) {
    if ((super(i), typeof location < "u")) {
      const c = location.protocol === "https:";
      let u = location.port;
      (u || (u = c ? "443" : "80"),
        (this.xd =
          (typeof location < "u" && i.hostname !== location.hostname) ||
          u !== i.port));
    }
  }
  doWrite(i, c) {
    const u = this.request({ method: "POST", data: i });
    (u.on("success", c),
      u.on("error", (f, d) => {
        this.onError("xhr post error", f, d);
      }));
  }
  doPoll() {
    const i = this.request();
    (i.on("data", this.onData.bind(this)),
      i.on("error", (c, u) => {
        this.onError("xhr poll error", c, u);
      }),
      (this.pollXhr = i));
  }
}
class Ut extends je {
  constructor(i, c, u) {
    (super(),
      (this.createRequest = i),
      wu(this, u),
      (this._opts = u),
      (this._method = u.method || "GET"),
      (this._uri = c),
      (this._data = u.data !== void 0 ? u.data : null),
      this._create());
  }
  _create() {
    var i;
    const c = Rm(
      this._opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref"
    );
    c.xdomain = !!this._opts.xd;
    const u = (this._xhr = this.createRequest(c));
    try {
      u.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          u.setDisableHeaderCheck && u.setDisableHeaderCheck(!0);
          for (let f in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(f) &&
              u.setRequestHeader(f, this._opts.extraHeaders[f]);
        }
      } catch {}
      if (this._method === "POST")
        try {
          u.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {}
      try {
        u.setRequestHeader("Accept", "*/*");
      } catch {}
      ((i = this._opts.cookieJar) === null || i === void 0 || i.addCookies(u),
        "withCredentials" in u &&
          (u.withCredentials = this._opts.withCredentials),
        this._opts.requestTimeout && (u.timeout = this._opts.requestTimeout),
        (u.onreadystatechange = () => {
          var f;
          (u.readyState === 3 &&
            ((f = this._opts.cookieJar) === null ||
              f === void 0 ||
              f.parseCookies(u.getResponseHeader("set-cookie"))),
            u.readyState === 4 &&
              (u.status === 200 || u.status === 1223
                ? this._onLoad()
                : this.setTimeoutFn(() => {
                    this._onError(typeof u.status == "number" ? u.status : 0);
                  }, 0)));
        }),
        u.send(this._data));
    } catch (f) {
      this.setTimeoutFn(() => {
        this._onError(f);
      }, 0);
      return;
    }
    typeof document < "u" &&
      ((this._index = Ut.requestsCount++), (Ut.requests[this._index] = this));
  }
  _onError(i) {
    (this.emitReserved("error", i, this._xhr), this._cleanup(!0));
  }
  _cleanup(i) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (((this._xhr.onreadystatechange = Yg), i))
        try {
          this._xhr.abort();
        } catch {}
      (typeof document < "u" && delete Ut.requests[this._index],
        (this._xhr = null));
    }
  }
  _onLoad() {
    const i = this._xhr.responseText;
    i !== null &&
      (this.emitReserved("data", i),
      this.emitReserved("success"),
      this._cleanup());
  }
  abort() {
    this._cleanup();
  }
}
Ut.requestsCount = 0;
Ut.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function") attachEvent("onunload", Qd);
  else if (typeof addEventListener == "function") {
    const s = "onpagehide" in Tt ? "pagehide" : "unload";
    addEventListener(s, Qd, !1);
  }
}
function Qd() {
  for (let s in Ut.requests)
    Ut.requests.hasOwnProperty(s) && Ut.requests[s].abort();
}
const Gg = (function () {
  const s = Om({ xdomain: !1 });
  return s && s.responseType !== null;
})();
class Xg extends Vg {
  constructor(i) {
    super(i);
    const c = i && i.forceBase64;
    this.supportsBinary = Gg && !c;
  }
  request(i = {}) {
    return (
      Object.assign(i, { xd: this.xd }, this.opts),
      new Ut(Om, this.uri(), i)
    );
  }
}
function Om(s) {
  const i = s.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!i || Lg)) return new XMLHttpRequest();
  } catch {}
  if (!i)
    try {
      return new Tt[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {}
}
const Cm =
  typeof navigator < "u" &&
  typeof navigator.product == "string" &&
  navigator.product.toLowerCase() === "reactnative";
class Qg extends xc {
  get name() {
    return "websocket";
  }
  doOpen() {
    const i = this.uri(),
      c = this.opts.protocols,
      u = Cm
        ? {}
        : Rm(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity"
          );
    this.opts.extraHeaders && (u.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(i, c, u);
    } catch (f) {
      return this.emitReserved("error", f);
    }
    ((this.ws.binaryType = this.socket.binaryType), this.addEventListeners());
  }
  addEventListeners() {
    ((this.ws.onopen = () => {
      (this.opts.autoUnref && this.ws._socket.unref(), this.onOpen());
    }),
      (this.ws.onclose = (i) =>
        this.onClose({
          description: "websocket connection closed",
          context: i,
        })),
      (this.ws.onmessage = (i) => this.onData(i.data)),
      (this.ws.onerror = (i) => this.onError("websocket error", i)));
  }
  write(i) {
    this.writable = !1;
    for (let c = 0; c < i.length; c++) {
      const u = i[c],
        f = c === i.length - 1;
      bc(u, this.supportsBinary, (d) => {
        try {
          this.doWrite(u, d);
        } catch {}
        f &&
          Ru(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" &&
      ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
  }
  uri() {
    const i = this.opts.secure ? "wss" : "ws",
      c = this.query || {};
    return (
      this.opts.timestampRequests && (c[this.opts.timestampParam] = wm()),
      this.supportsBinary || (c.b64 = 1),
      this.createUri(i, c)
    );
  }
}
const lc = Tt.WebSocket || Tt.MozWebSocket;
class Zg extends Qg {
  createSocket(i, c, u) {
    return Cm ? new lc(i, c, u) : c ? new lc(i, c) : new lc(i);
  }
  doWrite(i, c) {
    this.ws.send(c);
  }
}
class kg extends xc {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(
        this.createUri("https"),
        this.opts.transportOptions[this.name]
      );
    } catch (i) {
      return this.emitReserved("error", i);
    }
    (this._transport.closed
      .then(() => {
        this.onClose();
      })
      .catch((i) => {
        this.onError("webtransport error", i);
      }),
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then((i) => {
          const c = wg(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
            u = i.readable.pipeThrough(c).getReader(),
            f = Rg();
          (f.readable.pipeTo(i.writable),
            (this._writer = f.writable.getWriter()));
          const d = () => {
            u.read()
              .then(({ done: x, value: p }) => {
                x || (this.onPacket(p), d());
              })
              .catch((x) => {});
          };
          d();
          const m = { type: "open" };
          (this.query.sid && (m.data = `{"sid":"${this.query.sid}"}`),
            this._writer.write(m).then(() => this.onOpen()));
        });
      }));
  }
  write(i) {
    this.writable = !1;
    for (let c = 0; c < i.length; c++) {
      const u = i[c],
        f = c === i.length - 1;
      this._writer.write(u).then(() => {
        f &&
          Ru(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var i;
    (i = this._transport) === null || i === void 0 || i.close();
  }
}
const Kg = { websocket: Zg, webtransport: kg, polling: Xg },
  Jg =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  $g = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ];
function sc(s) {
  if (s.length > 8e3) throw "URI too long";
  const i = s,
    c = s.indexOf("["),
    u = s.indexOf("]");
  c != -1 &&
    u != -1 &&
    (s =
      s.substring(0, c) +
      s.substring(c, u).replace(/:/g, ";") +
      s.substring(u, s.length));
  let f = Jg.exec(s || ""),
    d = {},
    m = 14;
  for (; m--; ) d[$g[m]] = f[m] || "";
  return (
    c != -1 &&
      u != -1 &&
      ((d.source = i),
      (d.host = d.host.substring(1, d.host.length - 1).replace(/;/g, ":")),
      (d.authority = d.authority
        .replace("[", "")
        .replace("]", "")
        .replace(/;/g, ":")),
      (d.ipv6uri = !0)),
    (d.pathNames = Fg(d, d.path)),
    (d.queryKey = Wg(d, d.query)),
    d
  );
}
function Fg(s, i) {
  const c = /\/{2,9}/g,
    u = i.replace(c, "/").split("/");
  return (
    (i.slice(0, 1) == "/" || i.length === 0) && u.splice(0, 1),
    i.slice(-1) == "/" && u.splice(u.length - 1, 1),
    u
  );
}
function Wg(s, i) {
  const c = {};
  return (
    i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (u, f, d) {
      f && (c[f] = d);
    }),
    c
  );
}
const rc =
    typeof addEventListener == "function" &&
    typeof removeEventListener == "function",
  yu = [];
rc &&
  addEventListener(
    "offline",
    () => {
      yu.forEach((s) => s());
    },
    !1
  );
class Dn extends je {
  constructor(i, c) {
    if (
      (super(),
      (this.binaryType = Og),
      (this.writeBuffer = []),
      (this._prevBufferLen = 0),
      (this._pingInterval = -1),
      (this._pingTimeout = -1),
      (this._maxPayload = -1),
      (this._pingTimeoutTime = 1 / 0),
      i && typeof i == "object" && ((c = i), (i = null)),
      i)
    ) {
      const u = sc(i);
      ((c.hostname = u.host),
        (c.secure = u.protocol === "https" || u.protocol === "wss"),
        (c.port = u.port),
        u.query && (c.query = u.query));
    } else c.host && (c.hostname = sc(c.host).host);
    (wu(this, c),
      (this.secure =
        c.secure != null
          ? c.secure
          : typeof location < "u" && location.protocol === "https:"),
      c.hostname && !c.port && (c.port = this.secure ? "443" : "80"),
      (this.hostname =
        c.hostname ||
        (typeof location < "u" ? location.hostname : "localhost")),
      (this.port =
        c.port ||
        (typeof location < "u" && location.port
          ? location.port
          : this.secure
            ? "443"
            : "80")),
      (this.transports = []),
      (this._transportsByName = {}),
      c.transports.forEach((u) => {
        const f = u.prototype.name;
        (this.transports.push(f), (this._transportsByName[f] = u));
      }),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        c
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, "") +
        (this.opts.addTrailingSlash ? "/" : "")),
      typeof this.opts.query == "string" &&
        (this.opts.query = Bg(this.opts.query)),
      rc &&
        (this.opts.closeOnBeforeunload &&
          ((this._beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener(
            "beforeunload",
            this._beforeunloadEventListener,
            !1
          )),
        this.hostname !== "localhost" &&
          ((this._offlineEventListener = () => {
            this._onClose("transport close", {
              description: "network connection lost",
            });
          }),
          yu.push(this._offlineEventListener))),
      this.opts.withCredentials && (this._cookieJar = void 0),
      this._open());
  }
  createTransport(i) {
    const c = Object.assign({}, this.opts.query);
    ((c.EIO = Am), (c.transport = i), this.id && (c.sid = this.id));
    const u = Object.assign(
      {},
      this.opts,
      {
        query: c,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port,
      },
      this.opts.transportOptions[i]
    );
    return new this._transportsByName[i](u);
  }
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const i =
      this.opts.rememberUpgrade &&
      Dn.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
        ? "websocket"
        : this.transports[0];
    this.readyState = "opening";
    const c = this.createTransport(i);
    (c.open(), this.setTransport(c));
  }
  setTransport(i) {
    (this.transport && this.transport.removeAllListeners(),
      (this.transport = i),
      i
        .on("drain", this._onDrain.bind(this))
        .on("packet", this._onPacket.bind(this))
        .on("error", this._onError.bind(this))
        .on("close", (c) => this._onClose("transport close", c)));
  }
  onOpen() {
    ((this.readyState = "open"),
      (Dn.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush());
  }
  _onPacket(i) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch (
        (this.emitReserved("packet", i), this.emitReserved("heartbeat"), i.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(i.data));
          break;
        case "ping":
          (this._sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong"),
            this._resetPingTimeout());
          break;
        case "error":
          const c = new Error("server error");
          ((c.code = i.data), this._onError(c));
          break;
        case "message":
          (this.emitReserved("data", i.data),
            this.emitReserved("message", i.data));
          break;
      }
  }
  onHandshake(i) {
    (this.emitReserved("handshake", i),
      (this.id = i.sid),
      (this.transport.query.sid = i.sid),
      (this._pingInterval = i.pingInterval),
      (this._pingTimeout = i.pingTimeout),
      (this._maxPayload = i.maxPayload),
      this.onOpen(),
      this.readyState !== "closed" && this._resetPingTimeout());
  }
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const i = this._pingInterval + this._pingTimeout;
    ((this._pingTimeoutTime = Date.now() + i),
      (this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose("ping timeout");
      }, i)),
      this.opts.autoUnref && this._pingTimeoutTimer.unref());
  }
  _onDrain() {
    (this.writeBuffer.splice(0, this._prevBufferLen),
      (this._prevBufferLen = 0),
      this.writeBuffer.length === 0
        ? this.emitReserved("drain")
        : this.flush());
  }
  flush() {
    if (
      this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const i = this._getWritablePackets();
      (this.transport.send(i),
        (this._prevBufferLen = i.length),
        this.emitReserved("flush"));
    }
  }
  _getWritablePackets() {
    if (
      !(
        this._maxPayload &&
        this.transport.name === "polling" &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer;
    let c = 1;
    for (let u = 0; u < this.writeBuffer.length; u++) {
      const f = this.writeBuffer[u].data;
      if ((f && (c += zg(f)), u > 0 && c > this._maxPayload))
        return this.writeBuffer.slice(0, u);
      c += 2;
    }
    return this.writeBuffer;
  }
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return !0;
    const i = Date.now() > this._pingTimeoutTime;
    return (
      i &&
        ((this._pingTimeoutTime = 0),
        Ru(() => {
          this._onClose("ping timeout");
        }, this.setTimeoutFn)),
      i
    );
  }
  write(i, c, u) {
    return (this._sendPacket("message", i, c, u), this);
  }
  send(i, c, u) {
    return (this._sendPacket("message", i, c, u), this);
  }
  _sendPacket(i, c, u, f) {
    if (
      (typeof c == "function" && ((f = c), (c = void 0)),
      typeof u == "function" && ((f = u), (u = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return;
    ((u = u || {}), (u.compress = u.compress !== !1));
    const d = { type: i, data: c, options: u };
    (this.emitReserved("packetCreate", d),
      this.writeBuffer.push(d),
      f && this.once("flush", f),
      this.flush());
  }
  close() {
    const i = () => {
        (this._onClose("forced close"), this.transport.close());
      },
      c = () => {
        (this.off("upgrade", c), this.off("upgradeError", c), i());
      },
      u = () => {
        (this.once("upgrade", c), this.once("upgradeError", c));
      };
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? u() : i();
            })
          : this.upgrading
            ? u()
            : i()),
      this
    );
  }
  _onError(i) {
    if (
      ((Dn.priorWebsocketSuccess = !1),
      this.opts.tryAllTransports &&
        this.transports.length > 1 &&
        this.readyState === "opening")
    )
      return (this.transports.shift(), this._open());
    (this.emitReserved("error", i), this._onClose("transport error", i));
  }
  _onClose(i, c) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    ) {
      if (
        (this.clearTimeoutFn(this._pingTimeoutTimer),
        this.transport.removeAllListeners("close"),
        this.transport.close(),
        this.transport.removeAllListeners(),
        rc &&
          (this._beforeunloadEventListener &&
            removeEventListener(
              "beforeunload",
              this._beforeunloadEventListener,
              !1
            ),
          this._offlineEventListener))
      ) {
        const u = yu.indexOf(this._offlineEventListener);
        u !== -1 && yu.splice(u, 1);
      }
      ((this.readyState = "closed"),
        (this.id = null),
        this.emitReserved("close", i, c),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0));
    }
  }
}
Dn.protocol = Am;
class Pg extends Dn {
  constructor() {
    (super(...arguments), (this._upgrades = []));
  }
  onOpen() {
    if ((super.onOpen(), this.readyState === "open" && this.opts.upgrade))
      for (let i = 0; i < this._upgrades.length; i++)
        this._probe(this._upgrades[i]);
  }
  _probe(i) {
    let c = this.createTransport(i),
      u = !1;
    Dn.priorWebsocketSuccess = !1;
    const f = () => {
      u ||
        (c.send([{ type: "ping", data: "probe" }]),
        c.once("packet", (M) => {
          if (!u)
            if (M.type === "pong" && M.data === "probe") {
              if (
                ((this.upgrading = !0), this.emitReserved("upgrading", c), !c)
              )
                return;
              ((Dn.priorWebsocketSuccess = c.name === "websocket"),
                this.transport.pause(() => {
                  u ||
                    (this.readyState !== "closed" &&
                      (E(),
                      this.setTransport(c),
                      c.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", c),
                      (c = null),
                      (this.upgrading = !1),
                      this.flush()));
                }));
            } else {
              const j = new Error("probe error");
              ((j.transport = c.name), this.emitReserved("upgradeError", j));
            }
        }));
    };
    function d() {
      u || ((u = !0), E(), c.close(), (c = null));
    }
    const m = (M) => {
      const j = new Error("probe error: " + M);
      ((j.transport = c.name), d(), this.emitReserved("upgradeError", j));
    };
    function x() {
      m("transport closed");
    }
    function p() {
      m("socket closed");
    }
    function y(M) {
      c && M.name !== c.name && d();
    }
    const E = () => {
      (c.removeListener("open", f),
        c.removeListener("error", m),
        c.removeListener("close", x),
        this.off("close", p),
        this.off("upgrading", y));
    };
    (c.once("open", f),
      c.once("error", m),
      c.once("close", x),
      this.once("close", p),
      this.once("upgrading", y),
      this._upgrades.indexOf("webtransport") !== -1 && i !== "webtransport"
        ? this.setTimeoutFn(() => {
            u || c.open();
          }, 200)
        : c.open());
  }
  onHandshake(i) {
    ((this._upgrades = this._filterUpgrades(i.upgrades)), super.onHandshake(i));
  }
  _filterUpgrades(i) {
    const c = [];
    for (let u = 0; u < i.length; u++)
      ~this.transports.indexOf(i[u]) && c.push(i[u]);
    return c;
  }
}
let Ig = class extends Pg {
  constructor(i, c = {}) {
    const u = typeof i == "object" ? i : c;
    ((!u.transports || (u.transports && typeof u.transports[0] == "string")) &&
      (u.transports = (u.transports || ["polling", "websocket", "webtransport"])
        .map((f) => Kg[f])
        .filter((f) => !!f)),
      super(i, u));
  }
};
function ev(s, i = "", c) {
  let u = s;
  ((c = c || (typeof location < "u" && location)),
    s == null && (s = c.protocol + "//" + c.host),
    typeof s == "string" &&
      (s.charAt(0) === "/" &&
        (s.charAt(1) === "/" ? (s = c.protocol + s) : (s = c.host + s)),
      /^(https?|wss?):\/\//.test(s) ||
        (typeof c < "u" ? (s = c.protocol + "//" + s) : (s = "https://" + s)),
      (u = sc(s))),
    u.port ||
      (/^(http|ws)$/.test(u.protocol)
        ? (u.port = "80")
        : /^(http|ws)s$/.test(u.protocol) && (u.port = "443")),
    (u.path = u.path || "/"));
  const d = u.host.indexOf(":") !== -1 ? "[" + u.host + "]" : u.host;
  return (
    (u.id = u.protocol + "://" + d + ":" + u.port + i),
    (u.href =
      u.protocol + "://" + d + (c && c.port === u.port ? "" : ":" + u.port)),
    u
  );
}
const tv = typeof ArrayBuffer == "function",
  nv = (s) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(s)
      : s.buffer instanceof ArrayBuffer,
  Mm = Object.prototype.toString,
  lv =
    typeof Blob == "function" ||
    (typeof Blob < "u" && Mm.call(Blob) === "[object BlobConstructor]"),
  av =
    typeof File == "function" ||
    (typeof File < "u" && Mm.call(File) === "[object FileConstructor]");
function Ec(s) {
  return (
    (tv && (s instanceof ArrayBuffer || nv(s))) ||
    (lv && s instanceof Blob) ||
    (av && s instanceof File)
  );
}
function gu(s, i) {
  if (!s || typeof s != "object") return !1;
  if (Array.isArray(s)) {
    for (let c = 0, u = s.length; c < u; c++) if (gu(s[c])) return !0;
    return !1;
  }
  if (Ec(s)) return !0;
  if (s.toJSON && typeof s.toJSON == "function" && arguments.length === 1)
    return gu(s.toJSON(), !0);
  for (const c in s)
    if (Object.prototype.hasOwnProperty.call(s, c) && gu(s[c])) return !0;
  return !1;
}
function iv(s) {
  const i = [],
    c = s.data,
    u = s;
  return (
    (u.data = cc(c, i)),
    (u.attachments = i.length),
    { packet: u, buffers: i }
  );
}
function cc(s, i) {
  if (!s) return s;
  if (Ec(s)) {
    const c = { _placeholder: !0, num: i.length };
    return (i.push(s), c);
  } else if (Array.isArray(s)) {
    const c = new Array(s.length);
    for (let u = 0; u < s.length; u++) c[u] = cc(s[u], i);
    return c;
  } else if (typeof s == "object" && !(s instanceof Date)) {
    const c = {};
    for (const u in s)
      Object.prototype.hasOwnProperty.call(s, u) && (c[u] = cc(s[u], i));
    return c;
  }
  return s;
}
function uv(s, i) {
  return ((s.data = oc(s.data, i)), delete s.attachments, s);
}
function oc(s, i) {
  if (!s) return s;
  if (s && s._placeholder === !0) {
    if (typeof s.num == "number" && s.num >= 0 && s.num < i.length)
      return i[s.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(s))
    for (let c = 0; c < s.length; c++) s[c] = oc(s[c], i);
  else if (typeof s == "object")
    for (const c in s)
      Object.prototype.hasOwnProperty.call(s, c) && (s[c] = oc(s[c], i));
  return s;
}
const sv = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener",
  ],
  rv = 5;
var re;
(function (s) {
  ((s[(s.CONNECT = 0)] = "CONNECT"),
    (s[(s.DISCONNECT = 1)] = "DISCONNECT"),
    (s[(s.EVENT = 2)] = "EVENT"),
    (s[(s.ACK = 3)] = "ACK"),
    (s[(s.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (s[(s.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (s[(s.BINARY_ACK = 6)] = "BINARY_ACK"));
})(re || (re = {}));
class cv {
  constructor(i) {
    this.replacer = i;
  }
  encode(i) {
    return (i.type === re.EVENT || i.type === re.ACK) && gu(i)
      ? this.encodeAsBinary({
          type: i.type === re.EVENT ? re.BINARY_EVENT : re.BINARY_ACK,
          nsp: i.nsp,
          data: i.data,
          id: i.id,
        })
      : [this.encodeAsString(i)];
  }
  encodeAsString(i) {
    let c = "" + i.type;
    return (
      (i.type === re.BINARY_EVENT || i.type === re.BINARY_ACK) &&
        (c += i.attachments + "-"),
      i.nsp && i.nsp !== "/" && (c += i.nsp + ","),
      i.id != null && (c += i.id),
      i.data != null && (c += JSON.stringify(i.data, this.replacer)),
      c
    );
  }
  encodeAsBinary(i) {
    const c = iv(i),
      u = this.encodeAsString(c.packet),
      f = c.buffers;
    return (f.unshift(u), f);
  }
}
function Zd(s) {
  return Object.prototype.toString.call(s) === "[object Object]";
}
class _c extends je {
  constructor(i) {
    (super(), (this.reviver = i));
  }
  add(i) {
    let c;
    if (typeof i == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      c = this.decodeString(i);
      const u = c.type === re.BINARY_EVENT;
      u || c.type === re.BINARY_ACK
        ? ((c.type = u ? re.EVENT : re.ACK),
          (this.reconstructor = new ov(c)),
          c.attachments === 0 && super.emitReserved("decoded", c))
        : super.emitReserved("decoded", c);
    } else if (Ec(i) || i.base64)
      if (this.reconstructor)
        ((c = this.reconstructor.takeBinaryData(i)),
          c && ((this.reconstructor = null), super.emitReserved("decoded", c)));
      else throw new Error("got binary data when not reconstructing a packet");
    else throw new Error("Unknown type: " + i);
  }
  decodeString(i) {
    let c = 0;
    const u = { type: Number(i.charAt(0)) };
    if (re[u.type] === void 0) throw new Error("unknown packet type " + u.type);
    if (u.type === re.BINARY_EVENT || u.type === re.BINARY_ACK) {
      const d = c + 1;
      for (; i.charAt(++c) !== "-" && c != i.length; );
      const m = i.substring(d, c);
      if (m != Number(m) || i.charAt(c) !== "-")
        throw new Error("Illegal attachments");
      u.attachments = Number(m);
    }
    if (i.charAt(c + 1) === "/") {
      const d = c + 1;
      for (; ++c && !(i.charAt(c) === "," || c === i.length); );
      u.nsp = i.substring(d, c);
    } else u.nsp = "/";
    const f = i.charAt(c + 1);
    if (f !== "" && Number(f) == f) {
      const d = c + 1;
      for (; ++c; ) {
        const m = i.charAt(c);
        if (m == null || Number(m) != m) {
          --c;
          break;
        }
        if (c === i.length) break;
      }
      u.id = Number(i.substring(d, c + 1));
    }
    if (i.charAt(++c)) {
      const d = this.tryParse(i.substr(c));
      if (_c.isPayloadValid(u.type, d)) u.data = d;
      else throw new Error("invalid payload");
    }
    return u;
  }
  tryParse(i) {
    try {
      return JSON.parse(i, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(i, c) {
    switch (i) {
      case re.CONNECT:
        return Zd(c);
      case re.DISCONNECT:
        return c === void 0;
      case re.CONNECT_ERROR:
        return typeof c == "string" || Zd(c);
      case re.EVENT:
      case re.BINARY_EVENT:
        return (
          Array.isArray(c) &&
          (typeof c[0] == "number" ||
            (typeof c[0] == "string" && sv.indexOf(c[0]) === -1))
        );
      case re.ACK:
      case re.BINARY_ACK:
        return Array.isArray(c);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(),
      (this.reconstructor = null));
  }
}
class ov {
  constructor(i) {
    ((this.packet = i), (this.buffers = []), (this.reconPack = i));
  }
  takeBinaryData(i) {
    if (
      (this.buffers.push(i), this.buffers.length === this.reconPack.attachments)
    ) {
      const c = uv(this.reconPack, this.buffers);
      return (this.finishedReconstruction(), c);
    }
    return null;
  }
  finishedReconstruction() {
    ((this.reconPack = null), (this.buffers = []));
  }
}
const fv = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: _c,
      Encoder: cv,
      get PacketType() {
        return re;
      },
      protocol: rv,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function Nt(s, i, c) {
  return (
    s.on(i, c),
    function () {
      s.off(i, c);
    }
  );
}
const hv = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class Dm extends je {
  constructor(i, c, u) {
    (super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = i),
      (this.nsp = c),
      u && u.auth && (this.auth = u.auth),
      (this._opts = Object.assign({}, u)),
      this.io._autoConnect && this.open());
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const i = this.io;
    this.subs = [
      Nt(i, "open", this.onopen.bind(this)),
      Nt(i, "packet", this.onpacket.bind(this)),
      Nt(i, "error", this.onerror.bind(this)),
      Nt(i, "close", this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...i) {
    return (i.unshift("message"), this.emit.apply(this, i), this);
  }
  emit(i, ...c) {
    var u, f, d;
    if (hv.hasOwnProperty(i))
      throw new Error('"' + i.toString() + '" is a reserved event name');
    if (
      (c.unshift(i),
      this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
    )
      return (this._addToQueue(c), this);
    const m = { type: re.EVENT, data: c };
    if (
      ((m.options = {}),
      (m.options.compress = this.flags.compress !== !1),
      typeof c[c.length - 1] == "function")
    ) {
      const E = this.ids++,
        M = c.pop();
      (this._registerAckCallback(E, M), (m.id = E));
    }
    const x =
        (f =
          (u = this.io.engine) === null || u === void 0
            ? void 0
            : u.transport) === null || f === void 0
          ? void 0
          : f.writable,
      p =
        this.connected &&
        !(
          !((d = this.io.engine) === null || d === void 0) &&
          d._hasPingExpired()
        );
    return (
      (this.flags.volatile && !x) ||
        (p
          ? (this.notifyOutgoingListeners(m), this.packet(m))
          : this.sendBuffer.push(m)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(i, c) {
    var u;
    const f =
      (u = this.flags.timeout) !== null && u !== void 0
        ? u
        : this._opts.ackTimeout;
    if (f === void 0) {
      this.acks[i] = c;
      return;
    }
    const d = this.io.setTimeoutFn(() => {
        delete this.acks[i];
        for (let x = 0; x < this.sendBuffer.length; x++)
          this.sendBuffer[x].id === i && this.sendBuffer.splice(x, 1);
        c.call(this, new Error("operation has timed out"));
      }, f),
      m = (...x) => {
        (this.io.clearTimeoutFn(d), c.apply(this, x));
      };
    ((m.withError = !0), (this.acks[i] = m));
  }
  emitWithAck(i, ...c) {
    return new Promise((u, f) => {
      const d = (m, x) => (m ? f(m) : u(x));
      ((d.withError = !0), c.push(d), this.emit(i, ...c));
    });
  }
  _addToQueue(i) {
    let c;
    typeof i[i.length - 1] == "function" && (c = i.pop());
    const u = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: i,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    (i.push((f, ...d) =>
      u !== this._queue[0]
        ? void 0
        : (f !== null
            ? u.tryCount > this._opts.retries &&
              (this._queue.shift(), c && c(f))
            : (this._queue.shift(), c && c(null, ...d)),
          (u.pending = !1),
          this._drainQueue())
    ),
      this._queue.push(u),
      this._drainQueue());
  }
  _drainQueue(i = !1) {
    if (!this.connected || this._queue.length === 0) return;
    const c = this._queue[0];
    (c.pending && !i) ||
      ((c.pending = !0),
      c.tryCount++,
      (this.flags = c.flags),
      this.emit.apply(this, c.args));
  }
  packet(i) {
    ((i.nsp = this.nsp), this.io._packet(i));
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth((i) => {
          this._sendConnectPacket(i);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(i) {
    this.packet({
      type: re.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, i)
        : i,
    });
  }
  onerror(i) {
    this.connected || this.emitReserved("connect_error", i);
  }
  onclose(i, c) {
    ((this.connected = !1),
      delete this.id,
      this.emitReserved("disconnect", i, c),
      this._clearAcks());
  }
  _clearAcks() {
    Object.keys(this.acks).forEach((i) => {
      if (!this.sendBuffer.some((u) => String(u.id) === i)) {
        const u = this.acks[i];
        (delete this.acks[i],
          u.withError &&
            u.call(this, new Error("socket has been disconnected")));
      }
    });
  }
  onpacket(i) {
    if (i.nsp === this.nsp)
      switch (i.type) {
        case re.CONNECT:
          i.data && i.data.sid
            ? this.onconnect(i.data.sid, i.data.pid)
            : this.emitReserved(
                "connect_error",
                new Error(
                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                )
              );
          break;
        case re.EVENT:
        case re.BINARY_EVENT:
          this.onevent(i);
          break;
        case re.ACK:
        case re.BINARY_ACK:
          this.onack(i);
          break;
        case re.DISCONNECT:
          this.ondisconnect();
          break;
        case re.CONNECT_ERROR:
          this.destroy();
          const u = new Error(i.data.message);
          ((u.data = i.data.data), this.emitReserved("connect_error", u));
          break;
      }
  }
  onevent(i) {
    const c = i.data || [];
    (i.id != null && c.push(this.ack(i.id)),
      this.connected
        ? this.emitEvent(c)
        : this.receiveBuffer.push(Object.freeze(c)));
  }
  emitEvent(i) {
    if (this._anyListeners && this._anyListeners.length) {
      const c = this._anyListeners.slice();
      for (const u of c) u.apply(this, i);
    }
    (super.emit.apply(this, i),
      this._pid &&
        i.length &&
        typeof i[i.length - 1] == "string" &&
        (this._lastOffset = i[i.length - 1]));
  }
  ack(i) {
    const c = this;
    let u = !1;
    return function (...f) {
      u || ((u = !0), c.packet({ type: re.ACK, id: i, data: f }));
    };
  }
  onack(i) {
    const c = this.acks[i.id];
    typeof c == "function" &&
      (delete this.acks[i.id],
      c.withError && i.data.unshift(null),
      c.apply(this, i.data));
  }
  onconnect(i, c) {
    ((this.id = i),
      (this.recovered = c && this._pid === c),
      (this._pid = c),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved("connect"),
      this._drainQueue(!0));
  }
  emitBuffered() {
    (this.receiveBuffer.forEach((i) => this.emitEvent(i)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((i) => {
        (this.notifyOutgoingListeners(i), this.packet(i));
      }),
      (this.sendBuffer = []));
  }
  ondisconnect() {
    (this.destroy(), this.onclose("io server disconnect"));
  }
  destroy() {
    (this.subs && (this.subs.forEach((i) => i()), (this.subs = void 0)),
      this.io._destroy(this));
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: re.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(i) {
    return ((this.flags.compress = i), this);
  }
  get volatile() {
    return ((this.flags.volatile = !0), this);
  }
  timeout(i) {
    return ((this.flags.timeout = i), this);
  }
  onAny(i) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(i),
      this
    );
  }
  prependAny(i) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(i),
      this
    );
  }
  offAny(i) {
    if (!this._anyListeners) return this;
    if (i) {
      const c = this._anyListeners;
      for (let u = 0; u < c.length; u++)
        if (i === c[u]) return (c.splice(u, 1), this);
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(i) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(i),
      this
    );
  }
  prependAnyOutgoing(i) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(i),
      this
    );
  }
  offAnyOutgoing(i) {
    if (!this._anyOutgoingListeners) return this;
    if (i) {
      const c = this._anyOutgoingListeners;
      for (let u = 0; u < c.length; u++)
        if (i === c[u]) return (c.splice(u, 1), this);
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(i) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const c = this._anyOutgoingListeners.slice();
      for (const u of c) u.apply(this, i.data);
    }
  }
}
function Vl(s) {
  ((s = s || {}),
    (this.ms = s.min || 100),
    (this.max = s.max || 1e4),
    (this.factor = s.factor || 2),
    (this.jitter = s.jitter > 0 && s.jitter <= 1 ? s.jitter : 0),
    (this.attempts = 0));
}
Vl.prototype.duration = function () {
  var s = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var i = Math.random(),
      c = Math.floor(i * this.jitter * s);
    s = (Math.floor(i * 10) & 1) == 0 ? s - c : s + c;
  }
  return Math.min(s, this.max) | 0;
};
Vl.prototype.reset = function () {
  this.attempts = 0;
};
Vl.prototype.setMin = function (s) {
  this.ms = s;
};
Vl.prototype.setMax = function (s) {
  this.max = s;
};
Vl.prototype.setJitter = function (s) {
  this.jitter = s;
};
class fc extends je {
  constructor(i, c) {
    var u;
    (super(),
      (this.nsps = {}),
      (this.subs = []),
      i && typeof i == "object" && ((c = i), (i = void 0)),
      (c = c || {}),
      (c.path = c.path || "/socket.io"),
      (this.opts = c),
      wu(this, c),
      this.reconnection(c.reconnection !== !1),
      this.reconnectionAttempts(c.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(c.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(c.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (u = c.randomizationFactor) !== null && u !== void 0 ? u : 0.5
      ),
      (this.backoff = new Vl({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(c.timeout == null ? 2e4 : c.timeout),
      (this._readyState = "closed"),
      (this.uri = i));
    const f = c.parser || fv;
    ((this.encoder = new f.Encoder()),
      (this.decoder = new f.Decoder()),
      (this._autoConnect = c.autoConnect !== !1),
      this._autoConnect && this.open());
  }
  reconnection(i) {
    return arguments.length
      ? ((this._reconnection = !!i), i || (this.skipReconnect = !0), this)
      : this._reconnection;
  }
  reconnectionAttempts(i) {
    return i === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = i), this);
  }
  reconnectionDelay(i) {
    var c;
    return i === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = i),
        (c = this.backoff) === null || c === void 0 || c.setMin(i),
        this);
  }
  randomizationFactor(i) {
    var c;
    return i === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = i),
        (c = this.backoff) === null || c === void 0 || c.setJitter(i),
        this);
  }
  reconnectionDelayMax(i) {
    var c;
    return i === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = i),
        (c = this.backoff) === null || c === void 0 || c.setMax(i),
        this);
  }
  timeout(i) {
    return arguments.length ? ((this._timeout = i), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect();
  }
  open(i) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new Ig(this.uri, this.opts);
    const c = this.engine,
      u = this;
    ((this._readyState = "opening"), (this.skipReconnect = !1));
    const f = Nt(c, "open", function () {
        (u.onopen(), i && i());
      }),
      d = (x) => {
        (this.cleanup(),
          (this._readyState = "closed"),
          this.emitReserved("error", x),
          i ? i(x) : this.maybeReconnectOnOpen());
      },
      m = Nt(c, "error", d);
    if (this._timeout !== !1) {
      const x = this._timeout,
        p = this.setTimeoutFn(() => {
          (f(), d(new Error("timeout")), c.close());
        }, x);
      (this.opts.autoUnref && p.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(p);
        }));
    }
    return (this.subs.push(f), this.subs.push(m), this);
  }
  connect(i) {
    return this.open(i);
  }
  onopen() {
    (this.cleanup(), (this._readyState = "open"), this.emitReserved("open"));
    const i = this.engine;
    this.subs.push(
      Nt(i, "ping", this.onping.bind(this)),
      Nt(i, "data", this.ondata.bind(this)),
      Nt(i, "error", this.onerror.bind(this)),
      Nt(i, "close", this.onclose.bind(this)),
      Nt(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(i) {
    try {
      this.decoder.add(i);
    } catch (c) {
      this.onclose("parse error", c);
    }
  }
  ondecoded(i) {
    Ru(() => {
      this.emitReserved("packet", i);
    }, this.setTimeoutFn);
  }
  onerror(i) {
    this.emitReserved("error", i);
  }
  socket(i, c) {
    let u = this.nsps[i];
    return (
      u
        ? this._autoConnect && !u.active && u.connect()
        : ((u = new Dm(this, i, c)), (this.nsps[i] = u)),
      u
    );
  }
  _destroy(i) {
    const c = Object.keys(this.nsps);
    for (const u of c) if (this.nsps[u].active) return;
    this._close();
  }
  _packet(i) {
    const c = this.encoder.encode(i);
    for (let u = 0; u < c.length; u++) this.engine.write(c[u], i.options);
  }
  cleanup() {
    (this.subs.forEach((i) => i()),
      (this.subs.length = 0),
      this.decoder.destroy());
  }
  _close() {
    ((this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"));
  }
  disconnect() {
    return this._close();
  }
  onclose(i, c) {
    var u;
    (this.cleanup(),
      (u = this.engine) === null || u === void 0 || u.close(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", i, c),
      this._reconnection && !this.skipReconnect && this.reconnect());
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const i = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      (this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1));
    else {
      const c = this.backoff.duration();
      this._reconnecting = !0;
      const u = this.setTimeoutFn(() => {
        i.skipReconnect ||
          (this.emitReserved("reconnect_attempt", i.backoff.attempts),
          !i.skipReconnect &&
            i.open((f) => {
              f
                ? ((i._reconnecting = !1),
                  i.reconnect(),
                  this.emitReserved("reconnect_error", f))
                : i.onreconnect();
            }));
      }, c);
      (this.opts.autoUnref && u.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(u);
        }));
    }
  }
  onreconnect() {
    const i = this.backoff.attempts;
    ((this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", i));
  }
}
const Ga = {};
function vu(s, i) {
  (typeof s == "object" && ((i = s), (s = void 0)), (i = i || {}));
  const c = ev(s, i.path || "/socket.io"),
    u = c.source,
    f = c.id,
    d = c.path,
    m = Ga[f] && d in Ga[f].nsps,
    x = i.forceNew || i["force new connection"] || i.multiplex === !1 || m;
  let p;
  return (
    x ? (p = new fc(u, i)) : (Ga[f] || (Ga[f] = new fc(u, i)), (p = Ga[f])),
    c.query && !i.query && (i.query = c.queryKey),
    p.socket(c.path, i)
  );
}
Object.assign(vu, { Manager: fc, Socket: Dm, io: vu, connect: vu });
const kd = (s, i, c) => {
  if (!s || !i || !c) {
    (console.warn("Invalid parameters to joinRoom"),
      console.log({ socket: s, endpoint: i, roomId: c }));
    return;
  }
  (s.emit(i, c), console.log(`Socket ${s.id} joined room ${c}`));
};
function dv({ children: s }) {
  const [i, c] = w.useState(null),
    u = w.useRef(!0),
    f = w.useRef([]),
    { isLoading: d, isAuthenticated: m } = ym(),
    [x, p] = w.useState(!1),
    [y, E] = w.useState([]),
    [M, j] = w.useState([]),
    [q, H] = w.useState([]),
    [X, L] = w.useState(new Map()),
    [G, Y] = w.useState(null),
    $ = w.useRef(G),
    [oe, F] = w.useState(0),
    Oe = w.useCallback(() => F((xe) => xe + 1), []),
    be = {
      socket: i,
      newFriendRequest: x,
      pendingFriendRequests: y,
      friends: M,
      selectedChat: G,
      setSelectedChat: Y,
      conversationHistory: q,
      setConversationHistory: H,
      recentMessages: X,
      triggerUpdate: Oe,
    };
  return (
    w.useEffect(() => {
      $.current = G;
    }, [G]),
    w.useEffect(() => {
      if (!m || i?.connected) return;
      const te = vu("/", {
          path: "/socket.io/",
          withCredentials: !0,
          transports: ["websocket", "polling"],
        }),
        Fe = (A) => {
          (console.log("Received new friend request:", A),
            A && (u.current ? f.current.push(A) : p(!0)));
        },
        Pe = (A, B) => {
          if (
            (console.log("Received pending friend requests:", A, B),
            console.log("Current pending requests before update:", y),
            (u.current = !0),
            !!A)
          ) {
            var Z = (K, b) => K.username === b.username;
            switch (B) {
              case $e.VITE_EVENT_STATUS_INITIALIZE:
                E((K) => {
                  const b = ou(K, [...A, ...f.current], Z);
                  return (
                    console.log("Updated pending requests (INITIALIZE):", b),
                    b
                  );
                });
                break;
              case $e.VITE_EVENT_STATUS_PUSH:
                E((K) => ou(K, [...A], Z));
                break;
              case $e.VITE_EVENT_STATUS_DELETE:
                E((K) => Ld(K, [...A], Z));
                break;
            }
            u.current = !1;
          }
        },
        qe = (A) => {
          console.log("Join chatroom response:", A);
        },
        Yt = (A, B) => {
          if (
            (console.log("Received friends list:", A, B),
            console.log("Current friends before update:", M),
            !!A)
          ) {
            Array.isArray(A) ||
              console.error(
                "Expected 'list' to be an array, but got:",
                typeof A,
                A
              );
            var Z = (K, b) => K.username === b.username;
            switch (B) {
              case $e.VITE_EVENT_STATUS_INITIALIZE:
                (j((K) => {
                  const b = ou(K, [...A], Z);
                  return (
                    console.log("Updated friends list (INITIALIZE):", b),
                    b
                  );
                }),
                  A.map((K) => kd(te, "join-chatroom", K.chatroomId)));
                break;
              case $e.VITE_EVENT_STATUS_PUSH:
                (j((K) => ou(K, [...A], Z)),
                  A.map((K) => kd(te, "join-chatroom", K.chatroomId)));
                break;
              case $e.VITE_EVENT_STATUS_DELETE:
                j((K) => Ld(K, [...A], Z));
                break;
            }
          }
        },
        Vt = (A, B) => {
          if (!A) return;
          const Z = A.filter(
            (K) => $.current && K.chatroomId === $.current.chatroomId
          );
          if (Z.length !== 0)
            switch (
              (console.log("NEW MESSAGE: ", A, B),
              console.log("Selected Chat Ref:", $.current),
              console.log("Message in Chatroom:", Z),
              B)
            ) {
              case $e.VITE_EVENT_STATUS_INITIALIZE:
                H(Z);
                break;
              case $e.VITE_EVENT_STATUS_PUSH:
                H((K) => [...K, ...Z]);
                break;
            }
        },
        He = (A, B) => {
          if (
            (console.log("Handling recent message:", A, B),
            console.log("Current recentMessages Map:", X),
            !!A)
          )
            switch (B) {
              case $e.VITE_EVENT_STATUS_INITIALIZE:
                L((Z) => {
                  const K = new Map(Z);
                  return (K.set(A.chatroomId, A), K);
                });
                break;
              case $e.VITE_EVENT_STATUS_PUSH:
                L((Z) => {
                  const K = new Map(Z);
                  return (K.set(A.chatroomId, A), K);
                });
                break;
            }
        };
      return (
        te.on("new-friend-request", Fe),
        te.on("pending-friend-requests", Pe),
        te.on("friends-list", Yt),
        te.on("join-chatroom", qe),
        te.on("conversation", Vt),
        te.on("recent-message", He),
        te.on("connect_error", (A) => {
          (console.error("Socket.IO connect_error:", A.message),
            console.error("Error description:", A.description),
            console.error("Error context:", A.context));
        }),
        te.on("disconnect", (A, B) => {
          (console.warn("Socket disconnected:", A),
            B &&
              console.warn(
                "Disconnect details:",
                B.message,
                B.description,
                B.context
              ));
        }),
        c(te),
        te.emit("pending-friend-requests"),
        te.emit("friends-list"),
        () => {
          (te && (te.removeAllListeners(), te.close()),
            c(null),
            (u.current = !0),
            (f.current = []));
        }
      );
    }, [m]),
    d ? null : v.jsx(Yl.Provider, { value: be, children: s })
  );
}
const mv = () =>
  v.jsx(bg, { children: v.jsx(dv, { children: v.jsx(n1, {}) }) });
function pv() {
  return v.jsxs(a1, {
    children: [
      v.jsx(Mn, { path: "/", element: v.jsx(ag, {}) }),
      v.jsx(Mn, { path: "/dev", element: v.jsx(gm, {}) }),
      v.jsx(Mn, { path: "/chat", element: v.jsx(vm, {}) }),
      v.jsx(Mn, { path: "/home", element: v.jsx(mg, {}) }),
      v.jsxs(Mn, {
        element: v.jsx(mv, {}),
        children: [
          v.jsx(Mn, { path: "/main-lobby", element: v.jsx(yg, {}) }),
          v.jsx(Mn, { path: "/settings", element: v.jsx(gg, {}) }),
        ],
      }),
    ],
  });
}
const yv = document.getElementById("root"),
  gv = fy.createRoot(yv);
gv.render(
  v.jsx(w.StrictMode, { children: v.jsx(w1, { children: v.jsx(pv, {}) }) })
);
