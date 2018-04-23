// Generated by IcedCoffeeScript 108.0.11
var MaskCanvas, cidr2range, cidrs, cidrs_change, cidrs_sel, clear_btn, cursor_ip, cvs, d2xy, draw, draw_btn, get_file, hex2color, ip2dec, ip2hex, mask_cvs, rot, xy2d,
  __slice = [].slice,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.iced = {
  Deferrals: (function() {
    function _Class(_arg) {
      this.continuation = _arg;
      this.count = 1;
      this.ret = null;
    }

    _Class.prototype._fulfill = function() {
      if (!--this.count) {
        return this.continuation(this.ret);
      }
    };

    _Class.prototype.defer = function(defer_params) {
      ++this.count;
      return (function(_this) {
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      })(this);
    };

    return _Class;

  })(),
  findDeferral: function() {
    return null;
  },
  trampoline: function(_fn) {
    return _fn();
  }
};
window.__iced_k = window.__iced_k_noop = function() {};

rot = function(n, p, r) {
  var _ref;
  if (r.y === 0) {
    if (r.x === 1) {
      p.x = n - 1 - p.x;
      p.y = n - 1 - p.y;
    }
    _ref = [p.y, p.x], p.x = _ref[0], p.y = _ref[1];
  }
  return p;
};

xy2d = function(n, p) {
  var d, r, s;
  d = 0;
  r = {};
  s = n >> 1;
  while (s > 0) {
    r.x = (p.x & s) > 0;
    r.y = (p.y & s) > 0;
    d += s * s * ((3 * r.x) ^ r.y);
    p = rot(s, p, r);
    s = s >> 1;
  }
  return d;
};

d2xy = function(n, d) {
  var p, r, s, t;
  t = d;
  p = {
    x: 0,
    y: 0
  };
  r = {};
  s = 1;
  while (s < n) {
    r.x = 1 & (t >> 1);
    r.y = 1 & (t ^ r.x);
    p = rot(s, p, r);
    p.x += s * r.x;
    p.y += s * r.y;
    t = t >> 2;
    s = s << 1;
  }
  return p;
};

cidr2range = function(cidr) {
  var end, ip, mask, start, _ref;
  _ref = cidr.split("/"), ip = _ref[0], mask = _ref[1];
  console.log(cidr, ip, mask);
  mask = parseInt(mask, 10) >>> 0;
  mask = (-1) << (32 - mask) >>> 0;
  ip = ip.split(".").map(function(a) {
    return parseInt(a, 10);
  });
  ip = ip[0] << 24 | ip[1] << 16 | ip[2] << 8 | ip[3] >>> 0;
  start = ip & mask >>> 0;
  end = start | ~mask >>> 0;
  return {
    start: start,
    end: end
  };
};

ip2hex = function(ip) {
  return ("00000000" + (ip.toString(16))).slice(-8);
};

ip2dec = function(ip) {
  var i;
  ip = ip2hex(ip);
  return ip = ((function() {
    var _i, _results;
    _results = [];
    for (i = _i = 0; _i <= 3; i = ++_i) {
      _results.push("" + (parseInt(ip.slice(i * 2, +(i * 2 + 1) + 1 || 9e9), 16)));
    }
    return _results;
  })()).join(".");
};

get_file = function(file, cb) {
  var req;
  req = new XMLHttpRequest();
  req.open('GET', file);
  req.onloadend = function() {
    console.log(req);
    return cb(req.responseText);
  };
  return req.send();
};

MaskCanvas = (function() {
  function MaskCanvas(cvs, size) {
    this.cvs = cvs;
    this.size = size != null ? size : 0;
    this.mousemove = __bind(this.mousemove, this);
    this.clear = __bind(this.clear, this);
    this.plot_cidr = __bind(this.plot_cidr, this);
    this.ctx = this.cvs.getContext("2d");
    this.h = this.w = this.cvs.height = this.cvs.width = 1 << (8 + this.size);
    this.b = cvs.getBoundingClientRect();
    this.cvs.addEventListener("mousemove", this.mousemove);
  }

  MaskCanvas.prototype.plot_cidr = function(cidr, color) {
    var d, id, l, p, range, _i, _ref, _ref1;
    id = this.ctx.getImageData(0, 0, this.w, this.h);
    d = id.data;
    range = cidr2range(cidr);
    console.log(ip2hex(range.start), ip2hex(range.end));
    range.start = range.start >> 2 * (8 - this.size) >>> 0;
    range.end = range.end >> 2 * (8 - this.size) >>> 0;
    console.log(range.start, range.end);
    for (l = _i = _ref = range.start, _ref1 = range.end; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; l = _ref <= _ref1 ? ++_i : --_i) {
      p = d2xy(this.h, l);
      d[(p.x + p.y * this.w) * 4 + 0] += color.r * (color.a / 255.0) - d[(p.x + p.y * this.w) * 4 + 0] * (255.0 - color.a) / 255.0;
      d[(p.x + p.y * this.w) * 4 + 1] += color.g * (color.a / 255.0) - d[(p.x + p.y * this.w) * 4 + 1] * (255.0 - color.a) / 255.0;
      d[(p.x + p.y * this.w) * 4 + 2] += color.b * (color.a / 255.0) - d[(p.x + p.y * this.w) * 4 + 2] * (255.0 - color.a) / 255.0;
      d[(p.x + p.y * this.w) * 4 + 3] = 255;
    }
    return this.ctx.putImageData(id, 0, 0);
  };

  MaskCanvas.prototype.clear = function() {
    return this.ctx.clearRect(0, 0, this.w, this.h);
  };

  MaskCanvas.prototype.mousemove = function(e) {
    var ip, x, y;
    x = e.clientX - this.b.left;
    y = e.clientY - this.b.top;
    ip = xy2d(this.h, {
      x: x,
      y: y
    });
    ip = ip << (8 - this.size) * 2 >>> 0;
    return cursor_ip.innerHTML = "" + (ip2hex(ip)) + "\n" + (ip2dec(ip));
  };

  return MaskCanvas;

})();

hex2color = function(hex) {
  var c;
  c = parseInt(hex, 16);
  return {
    r: (c >> 24) & 0xFF,
    g: (c >> 16) & 0xFF,
    b: (c >> 8) & 0xFF,
    a: c & 0xFF
  };
};

draw = function() {
  var cidr, color, _i, _len, _ref, _ref1, _results;
  _ref = cidrs.innerHTML.split(/\n/);
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    cidr = _ref[_i];
    _ref1 = cidr.split(/\s*#/), cidr = _ref1[0], color = _ref1[1];
    if (color == null) {
      color = "7F7F7F7F";
    }
    color = hex2color(color);
    console.log(color);
    _results.push(mask_cvs.plot_cidr(cidr, color));
  }
  return _results;
};

cidrs_sel = document.getElementById("cidrs_sel");

cidrs = document.getElementById("cidrs");

cvs = document.getElementById("cvs");

cursor_ip = document.getElementById("ip");

mask_cvs = new MaskCanvas(cvs, 1);

cidrs_change = function() {
  var text, value, ___iced_passed_deferral, __iced_deferrals, __iced_k;
  __iced_k = __iced_k_noop;
  ___iced_passed_deferral = iced.findDeferral(arguments);
  value = cidrs_sel.options[cidrs_sel.selectedIndex].value;
  (function(_this) {
    return (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: "/home/peko/lab/Ailove-Hilbert/ipmask/app.coffee"
      });
      get_file(value, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return text = arguments[0];
          };
        })(),
        lineno: 132
      }));
      __iced_deferrals._fulfill();
    });
  })(this)((function(_this) {
    return function() {
      return cidrs.innerHTML = text;
    };
  })(this));
};

cidrs_sel.addEventListener("change", cidrs_change);

cidrs_change();

draw_btn = document.getElementById("draw");

draw_btn.addEventListener("click", draw);

clear_btn = document.getElementById("clear");

clear_btn.addEventListener("click", function() {
  return mask_cvs.clear();
});

cidrs.addEventListener("keydown", function(e) {
  if (e.code === "Enter" && e.ctrlKey) {
    return draw();
  }
});

console.log("start");