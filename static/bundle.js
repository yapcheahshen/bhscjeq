(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
      result.android = t
    } else if (!result.windowsphone && !result.msedge && iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;

var _hyphenateStyleName = require('hyphenate-style-name');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];
},{"hyphenate-style-name":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;

var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];
},{}],4:[function(require,module,exports){
'use strict';

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function hyphenateStyleName(string) {
    return string in cache
    ? cache[string]
    : cache[string] = string
      .replace(uppercasePattern, '-$&')
      .toLowerCase()
      .replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createPrefixer;

var _getBrowserInformation = require('../utils/getBrowserInformation');

var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);

var _getPrefixedKeyframes = require('../utils/getPrefixedKeyframes');

var _getPrefixedKeyframes2 = _interopRequireDefault(_getPrefixedKeyframes);

var _capitalizeString = require('../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _addNewValuesOnly = require('../utils/addNewValuesOnly');

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _prefixValue = require('../utils/prefixValue');

var _prefixValue2 = _interopRequireDefault(_prefixValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (style) {
    return style;
  };

  return function () {
    /**
    * Instantiante a new prefixer
    * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
    * @param {string} keepUnprefixed - keeps unprefixed properties and values
    */
    function Prefixer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Prefixer);

      var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

      this._userAgent = options.userAgent || defaultUserAgent;
      this._keepUnprefixed = options.keepUnprefixed || false;

      if (this._userAgent) {
        this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
      }

      // Checks if the userAgent was resolved correctly
      if (this._browserInfo && this._browserInfo.cssPrefix) {
        this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
      } else {
        this._useFallback = true;
        return false;
      }

      var prefixData = this._browserInfo.browserName && prefixMap[this._browserInfo.browserName];
      if (prefixData) {
        this._requiresPrefix = {};

        for (var property in prefixData) {
          if (prefixData[property] >= this._browserInfo.browserVersion) {
            this._requiresPrefix[property] = true;
          }
        }

        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
      } else {
        this._useFallback = true;
      }

      this._metaData = {
        browserVersion: this._browserInfo.browserVersion,
        browserName: this._browserInfo.browserName,
        cssPrefix: this._browserInfo.cssPrefix,
        jsPrefix: this._browserInfo.jsPrefix,
        keepUnprefixed: this._keepUnprefixed,
        requiresPrefix: this._requiresPrefix
      };
    }

    _createClass(Prefixer, [{
      key: 'prefix',
      value: function prefix(style) {
        // use static prefixer as fallback if userAgent can not be resolved
        if (this._useFallback) {
          return fallback(style);
        }

        // only add prefixes if needed
        if (!this._hasPropsRequiringPrefix) {
          return style;
        }

        return this._prefixStyle(style);
      }
    }, {
      key: '_prefixStyle',
      value: function _prefixStyle(style) {
        for (var property in style) {
          var value = style[property];

          // handle nested objects
          if ((0, _isObject2.default)(value)) {
            style[property] = this.prefix(value);
            // handle array values
          } else if (Array.isArray(value)) {
            var combinedValue = [];

            for (var i = 0, len = value.length; i < len; ++i) {
              var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, this._metaData);
              (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
            }

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (combinedValue.length > 0) {
              style[property] = combinedValue;
            }
          } else {
            var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, this._metaData);

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (_processedValue) {
              style[property] = _processedValue;
            }

            // add prefixes to properties
            if (this._requiresPrefix.hasOwnProperty(property)) {
              style[this._browserInfo.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
              if (!this._keepUnprefixed) {
                delete style[property];
              }
            }
          }
        }

        return style;
      }

      /**
      * Returns a prefixed version of the style object using all vendor prefixes
      * @param {Object} styles - Style object that gets prefixed properties added
      * @returns {Object} - Style object with prefixed properties and values
      */

    }], [{
      key: 'prefixAll',
      value: function prefixAll(styles) {
        return fallback(styles);
      }
    }]);

    return Prefixer;
  }();
}
module.exports = exports['default'];
},{"../utils/addNewValuesOnly":31,"../utils/capitalizeString":32,"../utils/getBrowserInformation":33,"../utils/getPrefixedKeyframes":34,"../utils/isObject":36,"../utils/prefixValue":38}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  plugins: [],
  prefixMap: { "chrome": { "appearance": 59, "userSelect": 53, "textEmphasisPosition": 59, "textEmphasis": 59, "textEmphasisStyle": 59, "textEmphasisColor": 59, "boxDecorationBreak": 59, "clipPath": 54, "maskImage": 59, "maskMode": 59, "maskRepeat": 59, "maskPosition": 59, "maskClip": 59, "maskOrigin": 59, "maskSize": 59, "maskComposite": 59, "mask": 59, "maskBorderSource": 59, "maskBorderMode": 59, "maskBorderSlice": 59, "maskBorderWidth": 59, "maskBorderOutset": 59, "maskBorderRepeat": 59, "maskBorder": 59, "maskType": 59, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 10.1, "userSelect": 10.1, "backdropFilter": 10.1, "fontKerning": 9, "scrollSnapType": 10.1, "scrollSnapPointsX": 10.1, "scrollSnapPointsY": 10.1, "scrollSnapDestination": 10.1, "scrollSnapCoordinate": 10.1, "boxDecorationBreak": 10.1, "clipPath": 10.1, "maskImage": 10.1, "maskMode": 10.1, "maskRepeat": 10.1, "maskPosition": 10.1, "maskClip": 10.1, "maskOrigin": 10.1, "maskSize": 10.1, "maskComposite": 10.1, "mask": 10.1, "maskBorderSource": 10.1, "maskBorderMode": 10.1, "maskBorderSlice": 10.1, "maskBorderWidth": 10.1, "maskBorderOutset": 10.1, "maskBorderRepeat": 10.1, "maskBorder": 10.1, "maskType": 10.1, "textDecorationStyle": 10.1, "textDecorationSkip": 10.1, "textDecorationLine": 10.1, "textDecorationColor": 10.1, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10.1, "flowInto": 10.1, "flowFrom": 10.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 10.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 54, "userSelect": 54, "textAlignLast": 48, "tabSize": 54, "hyphens": 42, "breakAfter": 51, "breakBefore": 51, "breakInside": 51, "columnCount": 51, "columnFill": 51, "columnGap": 51, "columnRule": 51, "columnRuleColor": 51, "columnRuleStyle": 51, "columnRuleWidth": 51, "columns": 51, "columnSpan": 51, "columnWidth": 51 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 44, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 44, "textEmphasis": 44, "textEmphasisStyle": 44, "textEmphasisColor": 44, "boxDecorationBreak": 44, "clipPath": 41, "maskImage": 44, "maskMode": 44, "maskRepeat": 44, "maskPosition": 44, "maskClip": 44, "maskOrigin": 44, "maskSize": 44, "maskComposite": 44, "mask": 44, "maskBorderSource": 44, "maskBorderMode": 44, "maskBorderSlice": 44, "maskBorderWidth": 44, "maskBorderOutset": 44, "maskBorderRepeat": 44, "maskBorder": 44, "maskType": 44, "textDecorationStyle": 43, "textDecorationSkip": 43, "textDecorationLine": 43, "textDecorationColor": 43, "filter": 39, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36 }, "ie": { "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 15, "wrapFlow": 15, "wrapThrough": 15, "wrapMargin": 15, "scrollSnapType": 15, "scrollSnapPointsX": 15, "scrollSnapPointsY": 15, "scrollSnapDestination": 15, "scrollSnapCoordinate": 15, "hyphens": 15, "flowInto": 15, "flowFrom": 15, "breakBefore": 15, "breakAfter": 15, "breakInside": 15, "regionFragment": 15, "gridTemplateColumns": 15, "gridTemplateRows": 15, "gridTemplateAreas": 15, "gridTemplate": 15, "gridAutoColumns": 15, "gridAutoRows": 15, "gridAutoFlow": 15, "grid": 15, "gridRowStart": 15, "gridColumnStart": 15, "gridRowEnd": 15, "gridRow": 15, "gridColumn": 15, "gridColumnEnd": 15, "gridColumnGap": 15, "gridRowGap": 15, "gridArea": 15, "gridGap": 15 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 10, "userSelect": 10, "backdropFilter": 10, "fontKerning": 10, "scrollSnapType": 10, "scrollSnapPointsX": 10, "scrollSnapPointsY": 10, "scrollSnapDestination": 10, "scrollSnapCoordinate": 10, "boxDecorationBreak": 10, "clipPath": 10, "maskImage": 10, "maskMode": 10, "maskRepeat": 10, "maskPosition": 10, "maskClip": 10, "maskOrigin": 10, "maskSize": 10, "maskComposite": 10, "mask": 10, "maskBorderSource": 10, "maskBorderMode": 10, "maskBorderSlice": 10, "maskBorderWidth": 10, "maskBorderOutset": 10, "maskBorderRepeat": 10, "maskBorder": 10, "maskType": 10, "textSizeAdjust": 10, "textDecorationStyle": 10, "textDecorationSkip": 10, "textDecorationLine": 10, "textDecorationColor": 10, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10, "flowInto": 10, "flowFrom": 10, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 10, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 53, "userSelect": 53, "fontKerning": 4.4, "textEmphasisPosition": 53, "textEmphasis": 53, "textEmphasisStyle": 53, "textEmphasisColor": 53, "boxDecorationBreak": 53, "clipPath": 53, "maskImage": 53, "maskMode": 53, "maskRepeat": 53, "maskPosition": 53, "maskClip": 53, "maskOrigin": 53, "maskSize": 53, "maskComposite": 53, "mask": 53, "maskBorderSource": 53, "maskBorderMode": 53, "maskBorderSlice": 53, "maskBorderWidth": 53, "maskBorderOutset": 53, "maskBorderRepeat": 53, "maskBorder": 53, "maskType": 53, "filter": 4.4, "fontFeatureSettings": 4.4, "breakAfter": 53, "breakBefore": 53, "breakInside": 53, "columnCount": 53, "columnFill": 53, "columnGap": 53, "columnRule": 53, "columnRuleColor": 53, "columnRuleStyle": 53, "columnRuleWidth": 53, "columns": 53, "columnSpan": 53, "columnWidth": 53 }, "and_chr": { "appearance": 55, "textEmphasisPosition": 55, "textEmphasis": 55, "textEmphasisStyle": 55, "textEmphasisColor": 55, "boxDecorationBreak": 55, "maskImage": 55, "maskMode": 55, "maskRepeat": 55, "maskPosition": 55, "maskClip": 55, "maskOrigin": 55, "maskSize": 55, "maskComposite": 55, "mask": 55, "maskBorderSource": 55, "maskBorderMode": 55, "maskBorderSlice": 55, "maskBorderWidth": 55, "maskBorderOutset": 55, "maskBorderRepeat": 55, "maskBorder": 55, "maskType": 55, "textDecorationStyle": 55, "textDecorationSkip": 55, "textDecorationLine": 55, "textDecorationColor": 55 }, "and_uc": { "flex": 11, "flexBasis": 11, "flexDirection": 11, "flexGrow": 11, "flexFlow": 11, "flexShrink": 11, "flexWrap": 11, "alignContent": 11, "alignItems": 11, "alignSelf": 11, "justifyContent": 11, "order": 11, "transition": 11, "transitionDelay": 11, "transitionDuration": 11, "transitionProperty": 11, "transitionTimingFunction": 11, "transform": 11, "transformOrigin": 11, "transformOriginX": 11, "transformOriginY": 11, "backfaceVisibility": 11, "perspective": 11, "perspectiveOrigin": 11, "transformStyle": 11, "transformOriginZ": 11, "animation": 11, "animationDelay": 11, "animationDirection": 11, "animationFillMode": 11, "animationDuration": 11, "animationIterationCount": 11, "animationName": 11, "animationPlayState": 11, "animationTimingFunction": 11, "appearance": 11, "userSelect": 11, "fontKerning": 11, "textEmphasisPosition": 11, "textEmphasis": 11, "textEmphasisStyle": 11, "textEmphasisColor": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textSizeAdjust": 11, "filter": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "fontFeatureSettings": 11, "columnCount": 11, "columnFill": 11, "columnGap": 11, "columnRule": 11, "columnRuleColor": 11, "columnRuleStyle": 11, "columnRuleWidth": 11, "columns": 11, "columnSpan": 11, "columnWidth": 11 }, "op_mini": {} }
};
module.exports = exports["default"];
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createPrefixer = require('./createPrefixer');

var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

var _cursor = require('./plugins/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _crossFade = require('./plugins/crossFade');

var _crossFade2 = _interopRequireDefault(_crossFade);

var _filter = require('./plugins/filter');

var _filter2 = _interopRequireDefault(_filter);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _imageSet = require('./plugins/imageSet');

var _imageSet2 = _interopRequireDefault(_imageSet);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

var _static = require('../static');

var _static2 = _interopRequireDefault(_static);

var _dynamicData = require('./dynamicData');

var _dynamicData2 = _interopRequireDefault(_dynamicData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

var Prefixer = (0, _createPrefixer2.default)({
  prefixMap: _dynamicData2.default.prefixMap,
  plugins: plugins
}, _static2.default);
exports.default = Prefixer;
module.exports = exports['default'];
},{"../static":19,"./createPrefixer":5,"./dynamicData":6,"./plugins/crossFade":8,"./plugins/cursor":9,"./plugins/filter":10,"./plugins/flex":11,"./plugins/flexboxOld":12,"./plugins/gradient":13,"./plugins/imageSet":14,"./plugins/position":15,"./plugins/sizing":16,"./plugins/transition":17}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function crossFade(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('cross-fade(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || (browserName === 'ios_saf' || browserName === 'safari') && browserVersion < 10)) {
    return (0, _getPrefixedValue2.default)(value.replace(/cross-fade\(/g, cssPrefix + 'cross-fade('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grabValues = {
  grab: true,
  grabbing: true
};


var zoomValues = {
  'zoom-in': true,
  'zoom-out': true
};

function cursor(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // adds prefixes for firefox, chrome, safari, and opera regardless of
  // version until a reliable browser support info can be found
  // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
  if (property === 'cursor' && grabValues[value] && (browserName === 'firefox' || browserName === 'chrome' || browserName === 'safari' || browserName === 'opera')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }

  if (property === 'cursor' && zoomValues[value] && (browserName === 'firefox' && browserVersion < 24 || browserName === 'chrome' && browserVersion < 37 || browserName === 'safari' && browserVersion < 9 || browserName === 'opera' && browserVersion < 24)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('filter(') > -1 && (browserName === 'ios_saf' || browserName === 'safari' && browserVersion < 9.1)) {
    return (0, _getPrefixedValue2.default)(value.replace(/filter\(/g, cssPrefix + 'filter('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {
  flex: true,
  'inline-flex': true
};
function flex(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'display' && values[value] && (browserName === 'chrome' && browserVersion < 29 && browserVersion > 20 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 && browserVersion > 6 || browserName === 'opera' && (browserVersion === 15 || browserVersion === 16))) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};


var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];
var properties = Object.keys(alternativeProps).concat(otherProps);

function flexboxOld(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if ((properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'firefox' && browserVersion < 22 || browserName === 'chrome' && browserVersion < 21 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion <= 6.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    delete requiresPrefix[property];

    if (!keepUnprefixed && !Array.isArray(style[property])) {
      delete style[property];
    }
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical';
      } else {
        style.WebkitBoxOrient = 'horizontal';
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse';
      } else {
        style.WebkitBoxDirection = 'normal';
      }
    }
    if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
      return (0, _getPrefixedValue2.default)(cssPrefix + alternativeValues[value], value, keepUnprefixed);
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
function gradient(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && values.test(value) && (browserName === 'firefox' && browserVersion < 16 || browserName === 'chrome' && browserVersion < 26 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 7 || (browserName === 'opera' || browserName === 'op_mini') && browserVersion < 12.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imageSet(property, value, style, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('image-set(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || browserName === 'and_uc' || browserName === 'ios_saf' || browserName === 'safari')) {
    return (0, _getPrefixedValue2.default)(value.replace(/image-set\(/g, cssPrefix + 'image-set('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function position(property, value, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'position' && value === 'sticky' && (browserName === 'safari' || browserName === 'ios_saf')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};

var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

// TODO: chrome & opera support it
function sizing(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = transition;

var _hyphenateProperty = require('css-in-js-utils/lib/hyphenateProperty');

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};

var requiresPrefixDashCased = void 0;

function transition(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var _ret = function () {
      // memoize the prefix array for later use
      if (!requiresPrefixDashCased) {
        requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
          return (0, _hyphenateProperty2.default)(prop);
        });
      }

      // only split multi values, not cubic beziers
      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

      requiresPrefixDashCased.forEach(function (prop) {
        multipleValues.forEach(function (val, index) {
          if (val.indexOf(prop) > -1 && prop !== 'order') {
            multipleValues[index] = val.replace(prop, cssPrefix + prop) + (keepUnprefixed ? ',' + val : '');
          }
        });
      });

      return {
        v: multipleValues.join(',')
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/hyphenateProperty":2}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPrefixer;

var _prefixProperty = require('../utils/prefixProperty');

var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

var _prefixValue = require('../utils/prefixValue');

var _prefixValue2 = _interopRequireDefault(_prefixValue);

var _addNewValuesOnly = require('../utils/addNewValuesOnly');

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;

  function prefixAll(style) {
    for (var property in style) {
      var value = style[property];

      // handle nested objects
      if ((0, _isObject2.default)(value)) {
        style[property] = prefixAll(value);
        // handle array values
      } else if (Array.isArray(value)) {
        var combinedValue = [];

        for (var i = 0, len = value.length; i < len; ++i) {
          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue;
        }
      } else {
        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (_processedValue) {
          style[property] = _processedValue;
        }

        (0, _prefixProperty2.default)(prefixMap, property, style);
      }
    }

    return style;
  }

  return prefixAll;
}
module.exports = exports['default'];
},{"../utils/addNewValuesOnly":31,"../utils/isObject":36,"../utils/prefixProperty":37,"../utils/prefixValue":38}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createPrefixer = require('./createPrefixer');

var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

var _staticData = require('./staticData');

var _staticData2 = _interopRequireDefault(_staticData);

var _cursor = require('./plugins/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _crossFade = require('./plugins/crossFade');

var _crossFade2 = _interopRequireDefault(_crossFade);

var _filter = require('./plugins/filter');

var _filter2 = _interopRequireDefault(_filter);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _imageSet = require('./plugins/imageSet');

var _imageSet2 = _interopRequireDefault(_imageSet);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

exports.default = (0, _createPrefixer2.default)({
  prefixMap: _staticData2.default.prefixMap,
  plugins: plugins
});
module.exports = exports['default'];
},{"./createPrefixer":18,"./plugins/crossFade":20,"./plugins/cursor":21,"./plugins/filter":22,"./plugins/flex":23,"./plugins/flexboxOld":24,"./plugins/gradient":25,"./plugins/imageSet":26,"./plugins/position":27,"./plugins/sizing":28,"./plugins/transition":29,"./staticData":30}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#search=cross-fade
var prefixes = ['-webkit-', ''];
function crossFade(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;
var prefixes = ['-webkit-', '-moz-', ''];

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-filter-function
var prefixes = ['-webkit-', ''];
function filter(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/filter\(/g, prefix + 'filter(');
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: true,
  'inline-flex': true
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value];
  }
}
module.exports = exports['default'];
},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];
},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-image-set
var prefixes = ['-webkit-', ''];
function imageSet(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/image-set\(/g, prefix + 'image-set(');
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky'];
  }
}
module.exports = exports['default'];
},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateProperty = require('css-in-js-utils/lib/hyphenateProperty');

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

var _capitalizeString = require('../../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap);
    // if the property is already prefixed
    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
module.exports = exports['default'];
},{"../../utils/capitalizeString":32,"css-in-js-utils/lib/hyphenateProperty":2,"css-in-js-utils/lib/isPrefixedValue":3}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  plugins: [],
  prefixMap: { "appearance": ["Webkit", "Moz"], "userSelect": ["Webkit", "Moz", "ms"], "textEmphasisPosition": ["Webkit"], "textEmphasis": ["Webkit"], "textEmphasisStyle": ["Webkit"], "textEmphasisColor": ["Webkit"], "boxDecorationBreak": ["Webkit"], "clipPath": ["Webkit"], "maskImage": ["Webkit"], "maskMode": ["Webkit"], "maskRepeat": ["Webkit"], "maskPosition": ["Webkit"], "maskClip": ["Webkit"], "maskOrigin": ["Webkit"], "maskSize": ["Webkit"], "maskComposite": ["Webkit"], "mask": ["Webkit"], "maskBorderSource": ["Webkit"], "maskBorderMode": ["Webkit"], "maskBorderSlice": ["Webkit"], "maskBorderWidth": ["Webkit"], "maskBorderOutset": ["Webkit"], "maskBorderRepeat": ["Webkit"], "maskBorder": ["Webkit"], "maskType": ["Webkit"], "textDecorationStyle": ["Webkit"], "textDecorationSkip": ["Webkit"], "textDecorationLine": ["Webkit"], "textDecorationColor": ["Webkit"], "filter": ["Webkit"], "fontFeatureSettings": ["Webkit"], "breakAfter": ["Webkit", "Moz", "ms"], "breakBefore": ["Webkit", "Moz", "ms"], "breakInside": ["Webkit", "Moz", "ms"], "columnCount": ["Webkit", "Moz"], "columnFill": ["Webkit", "Moz"], "columnGap": ["Webkit", "Moz"], "columnRule": ["Webkit", "Moz"], "columnRuleColor": ["Webkit", "Moz"], "columnRuleStyle": ["Webkit", "Moz"], "columnRuleWidth": ["Webkit", "Moz"], "columns": ["Webkit", "Moz"], "columnSpan": ["Webkit", "Moz"], "columnWidth": ["Webkit", "Moz"], "flex": ["Webkit"], "flexBasis": ["Webkit"], "flexDirection": ["Webkit"], "flexGrow": ["Webkit"], "flexFlow": ["Webkit"], "flexShrink": ["Webkit"], "flexWrap": ["Webkit"], "alignContent": ["Webkit"], "alignItems": ["Webkit"], "alignSelf": ["Webkit"], "justifyContent": ["Webkit"], "order": ["Webkit"], "transform": ["Webkit"], "transformOrigin": ["Webkit"], "transformOriginX": ["Webkit"], "transformOriginY": ["Webkit"], "backfaceVisibility": ["Webkit"], "perspective": ["Webkit"], "perspectiveOrigin": ["Webkit"], "transformStyle": ["Webkit"], "transformOriginZ": ["Webkit"], "animation": ["Webkit"], "animationDelay": ["Webkit"], "animationDirection": ["Webkit"], "animationFillMode": ["Webkit"], "animationDuration": ["Webkit"], "animationIterationCount": ["Webkit"], "animationName": ["Webkit"], "animationPlayState": ["Webkit"], "animationTimingFunction": ["Webkit"], "backdropFilter": ["Webkit"], "fontKerning": ["Webkit"], "scrollSnapType": ["Webkit", "ms"], "scrollSnapPointsX": ["Webkit", "ms"], "scrollSnapPointsY": ["Webkit", "ms"], "scrollSnapDestination": ["Webkit", "ms"], "scrollSnapCoordinate": ["Webkit", "ms"], "shapeImageThreshold": ["Webkit"], "shapeImageMargin": ["Webkit"], "shapeImageOutside": ["Webkit"], "hyphens": ["Webkit", "Moz", "ms"], "flowInto": ["Webkit", "ms"], "flowFrom": ["Webkit", "ms"], "regionFragment": ["Webkit", "ms"], "textAlignLast": ["Moz"], "tabSize": ["Moz"], "wrapFlow": ["ms"], "wrapThrough": ["ms"], "wrapMargin": ["ms"], "gridTemplateColumns": ["ms"], "gridTemplateRows": ["ms"], "gridTemplateAreas": ["ms"], "gridTemplate": ["ms"], "gridAutoColumns": ["ms"], "gridAutoRows": ["ms"], "gridAutoFlow": ["ms"], "grid": ["ms"], "gridRowStart": ["ms"], "gridColumnStart": ["ms"], "gridRowEnd": ["ms"], "gridRow": ["ms"], "gridColumn": ["ms"], "gridColumnEnd": ["ms"], "gridColumnGap": ["ms"], "gridRowGap": ["ms"], "gridArea": ["ms"], "gridGap": ["ms"], "textSizeAdjust": ["Webkit", "ms"], "transitionDelay": ["Webkit"], "transitionDuration": ["Webkit"], "transitionProperty": ["Webkit"], "transitionTimingFunction": ["Webkit"] }
};
module.exports = exports["default"];
},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addNewValuesOnly;
function addIfNew(list, value) {
  if (list.indexOf(value) === -1) {
    list.push(value);
  }
}

function addNewValuesOnly(list, values) {
  if (Array.isArray(values)) {
    for (var i = 0, len = values.length; i < len; ++i) {
      addIfNew(list, values[i]);
    }
  } else {
    addIfNew(list, values);
  }
}
module.exports = exports["default"];
},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = exports["default"];
},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBrowserInformation;

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixByBrowser = {
  chrome: 'Webkit',
  safari: 'Webkit',
  ios: 'Webkit',
  android: 'Webkit',
  phantom: 'Webkit',
  opera: 'Webkit',
  webos: 'Webkit',
  blackberry: 'Webkit',
  bada: 'Webkit',
  tizen: 'Webkit',
  chromium: 'Webkit',
  vivaldi: 'Webkit',
  firefox: 'Moz',
  seamoney: 'Moz',
  sailfish: 'Moz',
  msie: 'ms',
  msedge: 'ms'
};


var browserByCanIuseAlias = {
  chrome: 'chrome',
  chromium: 'chrome',
  safari: 'safari',
  firfox: 'firefox',
  msedge: 'edge',
  opera: 'opera',
  vivaldi: 'opera',
  msie: 'ie'
};

function getBrowserName(browserInfo) {
  if (browserInfo.firefox) {
    return 'firefox';
  }

  if (browserInfo.mobile || browserInfo.tablet) {
    if (browserInfo.ios) {
      return 'ios_saf';
    } else if (browserInfo.android) {
      return 'android';
    } else if (browserInfo.opera) {
      return 'op_mini';
    }
  }

  for (var browser in browserByCanIuseAlias) {
    if (browserInfo.hasOwnProperty(browser)) {
      return browserByCanIuseAlias[browser];
    }
  }
}

/**
 * Uses bowser to get default browser browserInformation such as version and name
 * Evaluates bowser browserInfo and adds vendorPrefix browserInformation
 * @param {string} userAgent - userAgent that gets evaluated
 */
function getBrowserInformation(userAgent) {
  var browserInfo = _bowser2.default._detect(userAgent);

  for (var browser in prefixByBrowser) {
    if (browserInfo.hasOwnProperty(browser)) {
      var prefix = prefixByBrowser[browser];

      browserInfo.jsPrefix = prefix;
      browserInfo.cssPrefix = '-' + prefix.toLowerCase() + '-';
      break;
    }
  }

  browserInfo.browserName = getBrowserName(browserInfo);

  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
  if (browserInfo.version) {
    browserInfo.browserVersion = parseFloat(browserInfo.version);
  } else {
    browserInfo.browserVersion = parseInt(parseFloat(browserInfo.osversion), 10);
  }

  browserInfo.osVersion = parseFloat(browserInfo.osversion);

  // iOS forces all browsers to use Safari under the hood
  // as the Safari version seems to match the iOS version
  // we just explicitely use the osversion instead
  // https://github.com/rofrischmann/inline-style-prefixer/issues/72
  if (browserInfo.browserName === 'ios_saf' && browserInfo.browserVersion > browserInfo.osVersion) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (browserInfo.browserName === 'android' && browserInfo.chrome && browserInfo.browserVersion > 37) {
    browserInfo.browserName = 'and_chr';
  }

  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (browserInfo.browserName === 'android' && browserInfo.osVersion < 5) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // Samsung browser are basically build on Chrome > 44
  // https://github.com/rofrischmann/inline-style-prefixer/issues/102
  if (browserInfo.browserName === 'android' && browserInfo.samsungBrowser) {
    browserInfo.browserName = 'and_chr';
    browserInfo.browserVersion = 44;
  }

  return browserInfo;
}
module.exports = exports['default'];
},{"bowser":1}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedKeyframes;
function getPrefixedKeyframes(browserName, browserVersion, cssPrefix) {
  var prefixedKeyframes = 'keyframes';

  if (browserName === 'chrome' && browserVersion < 43 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 || browserName === 'opera' && browserVersion < 30 || browserName === 'android' && browserVersion <= 4.4 || browserName === 'and_uc') {
    return cssPrefix + prefixedKeyframes;
  }
  return prefixedKeyframes;
}
module.exports = exports['default'];
},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedValue;
function getPrefixedValue(prefixedValue, value, keepUnprefixed) {
  if (keepUnprefixed) {
    return [prefixedValue, value];
  }
  return prefixedValue;
}
module.exports = exports["default"];
},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
function isObject(value) {
  return value instanceof Object && !Array.isArray(value);
}
module.exports = exports["default"];
},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;

var _capitalizeString = require('./capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var requiredPrefixes = prefixProperties[property];
    for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
    }
  }
}
module.exports = exports['default'];
},{"./capitalizeString":32}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData);

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    if (processedValue) {
      return processedValue;
    }
  }
}
module.exports = exports["default"];
},{}],39:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mobx"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["mobx", "react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["mobxReact"] = factory(require("mobx"), require("react"), require("react-dom"));
	else
		root["mobxReact"] = factory(root["mobx"], root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PropTypes = exports.propTypes = exports.inject = exports.Provider = exports.useStaticRendering = exports.trackComponents = exports.componentByNodeRegistery = exports.renderReporter = exports.Observer = exports.observer = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _observer = __webpack_require__(1);

	Object.defineProperty(exports, 'observer', {
	  enumerable: true,
	  get: function get() {
	    return _observer.observer;
	  }
	});
	Object.defineProperty(exports, 'Observer', {
	  enumerable: true,
	  get: function get() {
	    return _observer.Observer;
	  }
	});
	Object.defineProperty(exports, 'renderReporter', {
	  enumerable: true,
	  get: function get() {
	    return _observer.renderReporter;
	  }
	});
	Object.defineProperty(exports, 'componentByNodeRegistery', {
	  enumerable: true,
	  get: function get() {
	    return _observer.componentByNodeRegistery;
	  }
	});
	Object.defineProperty(exports, 'trackComponents', {
	  enumerable: true,
	  get: function get() {
	    return _observer.trackComponents;
	  }
	});
	Object.defineProperty(exports, 'useStaticRendering', {
	  enumerable: true,
	  get: function get() {
	    return _observer.useStaticRendering;
	  }
	});

	var _Provider = __webpack_require__(8);

	Object.defineProperty(exports, 'Provider', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Provider).default;
	  }
	});

	var _inject = __webpack_require__(6);

	Object.defineProperty(exports, 'inject', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_inject).default;
	  }
	});

	var _mobx = __webpack_require__(2);

	var mobx = _interopRequireWildcard(_mobx);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactNative = __webpack_require__(9);

	var _propTypes = __webpack_require__(10);

	var propTypes = _interopRequireWildcard(_propTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TARGET_LIB_NAME = void 0;
	if (true) TARGET_LIB_NAME = 'mobx-react';
	if (false) TARGET_LIB_NAME = 'mobx-react/native';
	if (false) TARGET_LIB_NAME = 'mobx-react/custom';

	if (!mobx) throw new Error(TARGET_LIB_NAME + ' requires the MobX package');
	if (!_react2.default) throw new Error(TARGET_LIB_NAME + ' requires React to be available');

	if (("browser") === 'browser' && typeof _reactDom.unstable_batchedUpdates === "function") mobx.extras.setReactionScheduler(_reactDom.unstable_batchedUpdates);
	if (false) mobx.extras.setReactionScheduler(_reactNative.unstable_batchedUpdates);

	exports.propTypes = propTypes;
	exports.PropTypes = propTypes;
	exports.default = module.exports;

	/* DevTool support */

	if ((typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ? 'undefined' : _typeof(__MOBX_DEVTOOLS_GLOBAL_HOOK__)) === 'object') {
	  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact(module.exports, mobx);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Observer = exports.renderReporter = exports.componentByNodeRegistery = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.trackComponents = trackComponents;
	exports.useStaticRendering = useStaticRendering;
	exports.observer = observer;

	var _mobx = __webpack_require__(2);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _EventEmitter = __webpack_require__(5);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	var _inject = __webpack_require__(6);

	var _inject2 = _interopRequireDefault(_inject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * dev tool support
	 */
	var isDevtoolsEnabled = false;

	var isUsingStaticRendering = false;

	var warnedAboutObserverInjectDeprecation = false;

	// WeakMap<Node, Object>;
	var componentByNodeRegistery = exports.componentByNodeRegistery = typeof WeakMap !== "undefined" ? new WeakMap() : undefined;
	var renderReporter = exports.renderReporter = new _EventEmitter2.default();

	function findDOMNode(component) {
	  if (_reactDom2.default) return _reactDom2.default.findDOMNode(component);
	  return null;
	}

	function reportRendering(component) {
	  var node = findDOMNode(component);
	  if (node && componentByNodeRegistery) componentByNodeRegistery.set(node, component);

	  renderReporter.emit({
	    event: 'render',
	    renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
	    totalTime: Date.now() - component.__$mobRenderStart,
	    component: component,
	    node: node
	  });
	}

	function trackComponents() {
	  if (typeof WeakMap === "undefined") throw new Error("[mobx-react] tracking components is not supported in this browser.");
	  if (!isDevtoolsEnabled) isDevtoolsEnabled = true;
	}

	function useStaticRendering(useStaticRendering) {
	  isUsingStaticRendering = useStaticRendering;
	}

	/**
	 * Utilities
	 */

	function patch(target, funcName) {
	  var runMixinFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var base = target[funcName];
	  var mixinFunc = reactiveMixin[funcName];
	  if (!base) {
	    target[funcName] = mixinFunc;
	  } else {
	    target[funcName] = runMixinFirst === true ? function () {
	      mixinFunc.apply(this, arguments);
	      base.apply(this, arguments);
	    } : function () {
	      base.apply(this, arguments);
	      mixinFunc.apply(this, arguments);
	    };
	  }
	}

	function isObjectShallowModified(prev, next) {
	  if (null == prev || null == next || (typeof prev === 'undefined' ? 'undefined' : _typeof(prev)) !== "object" || (typeof next === 'undefined' ? 'undefined' : _typeof(next)) !== "object") {
	    return prev !== next;
	  }
	  var keys = Object.keys(prev);
	  if (keys.length !== Object.keys(next).length) {
	    return true;
	  }
	  var key = void 0;
	  for (var i = keys.length - 1; i >= 0, key = keys[i]; i--) {
	    if (next[key] !== prev[key]) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * ReactiveMixin
	 */
	var reactiveMixin = {
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    if (isUsingStaticRendering === true) return;
	    // Generate friendly name for debugging
	    var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || "<component>";
	    var rootNodeID = this._reactInternalInstance && this._reactInternalInstance._rootNodeID;

	    /**
	     * If props are shallowly modified, react will render anyway,
	     * so atom.reportChanged() should not result in yet another re-render
	     */
	    var skipRender = false;
	    /**
	     * forceUpdate will re-assign this.props. We don't want that to cause a loop,
	     * so detect these changes
	     */
	    var isForcingUpdate = false;

	    function makePropertyObservableReference(propName) {
	      var valueHolder = this[propName];
	      var atom = new _mobx.Atom("reactive " + propName);
	      Object.defineProperty(this, propName, {
	        configurable: true, enumerable: true,
	        get: function get() {
	          atom.reportObserved();
	          return valueHolder;
	        },
	        set: function set(v) {
	          if (!isForcingUpdate && isObjectShallowModified(valueHolder, v)) {
	            valueHolder = v;
	            skipRender = true;
	            atom.reportChanged();
	            skipRender = false;
	          } else {
	            valueHolder = v;
	          }
	        }
	      });
	    }

	    // make this.props an observable reference, see #124
	    makePropertyObservableReference.call(this, "props");
	    // make state an observable reference
	    makePropertyObservableReference.call(this, "state");

	    // wire up reactive render
	    var baseRender = this.render.bind(this);
	    var reaction = null;
	    var isRenderingPending = false;

	    var initialRender = function initialRender() {
	      reaction = new _mobx.Reaction(initialName + '#' + rootNodeID + '.render()', function () {
	        if (!isRenderingPending) {
	          // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
	          // This unidiomatic React usage but React will correctly warn about this so we continue as usual
	          // See #85 / Pull #44
	          isRenderingPending = true;
	          if (typeof _this.componentWillReact === "function") _this.componentWillReact(); // TODO: wrap in action?
	          if (_this.__$mobxIsUnmounted !== true) {
	            // If we are unmounted at this point, componentWillReact() had a side effect causing the component to unmounted
	            // TODO: remove this check? Then react will properly warn about the fact that this should not happen? See #73
	            // However, people also claim this migth happen during unit tests..
	            var hasError = true;
	            try {
	              isForcingUpdate = true;
	              if (!skipRender) _react2.default.Component.prototype.forceUpdate.call(_this);
	              hasError = false;
	            } finally {
	              isForcingUpdate = false;
	              if (hasError) reaction.dispose();
	            }
	          }
	        }
	      });
	      reactiveRender.$mobx = reaction;
	      _this.render = reactiveRender;
	      return reactiveRender();
	    };

	    var reactiveRender = function reactiveRender() {
	      isRenderingPending = false;
	      var rendering = undefined;
	      reaction.track(function () {
	        if (isDevtoolsEnabled) {
	          _this.__$mobRenderStart = Date.now();
	        }
	        rendering = _mobx.extras.allowStateChanges(false, baseRender);
	        if (isDevtoolsEnabled) {
	          _this.__$mobRenderEnd = Date.now();
	        }
	      });
	      return rendering;
	    };

	    this.render = initialRender;
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (isUsingStaticRendering === true) return;
	    this.render.$mobx && this.render.$mobx.dispose();
	    this.__$mobxIsUnmounted = true;
	    if (isDevtoolsEnabled) {
	      var node = findDOMNode(this);
	      if (node && componentByNodeRegistery) {
	        componentByNodeRegistery.delete(node);
	      }
	      renderReporter.emit({
	        event: 'destroy',
	        component: this,
	        node: node
	      });
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    if (isDevtoolsEnabled) {
	      reportRendering(this);
	    }
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (isDevtoolsEnabled) {
	      reportRendering(this);
	    }
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    if (isUsingStaticRendering) {
	      console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
	    }
	    // update on any state changes (as is the default)
	    if (this.state !== nextState) {
	      return true;
	    }
	    // update if props are shallowly not equal, inspired by PureRenderMixin
	    // we could return just 'false' here, and avoid the `skipRender` checks etc
	    // however, it is nicer if lifecycle events are triggered like usually,
	    // so we return true here if props are shallowly modified.
	    return isObjectShallowModified(this.props, nextProps);
	  }
	};

	/**
	 * Observer function / decorator
	 */
	function observer(arg1, arg2) {
	  if (typeof arg1 === "string") {
	    throw new Error("Store names should be provided as array");
	  }
	  if (Array.isArray(arg1)) {
	    // component needs stores
	    if (!warnedAboutObserverInjectDeprecation) {
	      warnedAboutObserverInjectDeprecation = true;
	      console.warn('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
	    }
	    if (!arg2) {
	      // invoked as decorator
	      return function (componentClass) {
	        return observer(arg1, componentClass);
	      };
	    } else {
	      return _inject2.default.apply(null, arg1)(observer(arg2));
	    }
	  }
	  var componentClass = arg1;

	  if (componentClass.isMobxInjector === true) {
	    console.warn('Mobx observer: You are trying to use \'observer\' on a component that already has \'inject\'. Please apply \'observer\' before applying \'inject\'');
	  }

	  // Stateless function component:
	  // If it is function but doesn't seem to be a react class constructor,
	  // wrap it to a react class automatically
	  if (typeof componentClass === "function" && (!componentClass.prototype || !componentClass.prototype.render) && !componentClass.isReactClass && !_react2.default.Component.isPrototypeOf(componentClass)) {

	    return observer(_react2.default.createClass({
	      displayName: componentClass.displayName || componentClass.name,
	      propTypes: componentClass.propTypes,
	      contextTypes: componentClass.contextTypes,
	      getDefaultProps: function getDefaultProps() {
	        return componentClass.defaultProps;
	      },
	      render: function render() {
	        return componentClass.call(this, this.props, this.context);
	      }
	    }));
	  }

	  if (!componentClass) {
	    throw new Error("Please pass a valid component to 'observer'");
	  }

	  var target = componentClass.prototype || componentClass;
	  mixinLifecycleEvents(target);
	  componentClass.isMobXReactObserver = true;
	  return componentClass;
	}

	function mixinLifecycleEvents(target) {
	  patch(target, "componentWillMount", true);
	  ["componentDidMount", "componentWillUnmount", "componentDidUpdate"].forEach(function (funcName) {
	    patch(target, funcName);
	  });
	  if (!target.shouldComponentUpdate) {
	    target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
	  }
	}

	// TODO: support injection somehow as well?
	var Observer = exports.Observer = observer(function (_ref) {
	  var children = _ref.children;
	  return children();
	});

	Observer.propTypes = {
	  children: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventEmitter = function () {
	  function EventEmitter() {
	    _classCallCheck(this, EventEmitter);

	    this.listeners = [];
	  }

	  _createClass(EventEmitter, [{
	    key: "on",
	    value: function on(cb) {
	      var _this = this;

	      this.listeners.push(cb);
	      return function () {
	        var index = _this.listeners.indexOf(cb);
	        if (index !== -1) _this.listeners.splice(index, 1);
	      };
	    }
	  }, {
	    key: "emit",
	    value: function emit(data) {
	      this.listeners.forEach(function (fn) {
	        return fn(data);
	      });
	    }
	  }]);

	  return EventEmitter;
	}();

	exports.default = EventEmitter;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = inject;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _hoistNonReactStatics = __webpack_require__(7);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _observer = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var injectorContextTypes = {
	  mobxStores: _react.PropTypes.object
	};
	Object.seal(injectorContextTypes);

	var proxiedInjectorProps = {
	  contextTypes: {
	    get: function get() {
	      return injectorContextTypes;
	    },
	    set: function set(_) {
	      console.warn("Mobx Injector: you are trying to attach `contextTypes` on an component decorated with `inject` (or `observer`) HOC. Please specify the contextTypes on the wrapped component instead. It is accessible through the `wrappedComponent`");
	    },
	    configurable: true,
	    enumerable: false
	  },
	  isMobxInjector: {
	    value: true,
	    writable: true,
	    configurable: true,
	    enumerable: true
	  }
	};

	/**
	 * Store Injection
	 */
	function createStoreInjector(grabStoresFn, component, injectNames) {
	  var displayName = "inject-" + (component.displayName || component.name || component.constructor && component.constructor.name || "Unknown");
	  if (injectNames) displayName += "-with-" + injectNames;

	  var Injector = _react2.default.createClass({
	    displayName: displayName,
	    storeRef: function storeRef(instance) {
	      this.wrappedInstance = instance;
	    },
	    render: function render() {
	      // Optimization: it might be more efficient to apply the mapper function *outside* the render method
	      // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
	      // See this test: 'using a custom injector is not too reactive' in inject.js
	      var newProps = {};
	      for (var key in this.props) {
	        if (this.props.hasOwnProperty(key)) {
	          newProps[key] = this.props[key];
	        }
	      }var additionalProps = grabStoresFn(this.context.mobxStores || {}, newProps, this.context) || {};
	      for (var _key in additionalProps) {
	        newProps[_key] = additionalProps[_key];
	      }
	      newProps.ref = this.storeRef;

	      return _react2.default.createElement(component, newProps);
	    }
	  });

	  // Static fields from component should be visible on the generated Injector
	  (0, _hoistNonReactStatics2.default)(Injector, component);

	  Injector.wrappedComponent = component;
	  Object.defineProperties(Injector, proxiedInjectorProps);

	  return Injector;
	}

	function grabStoresByName(storeNames) {
	  return function (baseStores, nextProps) {
	    storeNames.forEach(function (storeName) {
	      if (storeName in nextProps) // prefer props over stores
	        return;
	      if (!(storeName in baseStores)) throw new Error("MobX observer: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
	      nextProps[storeName] = baseStores[storeName];
	    });
	    return nextProps;
	  };
	}

	/**
	 * higher order component that injects stores to a child.
	 * takes either a varargs list of strings, which are stores read from the context,
	 * or a function that manually maps the available stores from the context to props:
	 * storesToProps(mobxStores, props, context) => newProps
	 */
	function inject() /* fn(stores, nextProps) or ...storeNames */{
	  var _arguments = arguments;

	  var grabStoresFn = void 0;
	  if (typeof arguments[0] === "function") {
	    grabStoresFn = arguments[0];
	    return function (componentClass) {
	      var injected = createStoreInjector(grabStoresFn, componentClass);
	      injected.isMobxInjector = false; // supress warning
	      // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
	      // see #111
	      injected = (0, _observer.observer)(injected);
	      injected.isMobxInjector = true; // restore warning
	      return injected;
	    };
	  } else {
	    var _ret = function () {
	      var storeNames = [];
	      for (var i = 0; i < _arguments.length; i++) {
	        storeNames[i] = _arguments[i];
	      }grabStoresFn = grabStoresByName(storeNames);
	      return {
	        v: function v(componentClass) {
	          return createStoreInjector(grabStoresFn, componentClass, storeNames.join("-"));
	        }
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var specialReactKeys = { children: true, key: true, ref: true };

	var Provider = (_temp = _class = function (_Component) {
	  _inherits(Provider, _Component);

	  function Provider() {
	    _classCallCheck(this, Provider);

	    return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
	  }

	  _createClass(Provider, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.Children.only(this.props.children);
	    }
	  }, {
	    key: "getChildContext",
	    value: function getChildContext() {
	      var stores = {};
	      // inherit stores
	      var baseStores = this.context.mobxStores;
	      if (baseStores) for (var key in baseStores) {
	        stores[key] = baseStores[key];
	      }
	      // add own stores
	      for (var _key in this.props) {
	        if (!specialReactKeys[_key] && _key !== "suppressChangedStoreWarning") stores[_key] = this.props[_key];
	      }return {
	        mobxStores: stores
	      };
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      // Maybe this warning is too aggressive?
	      if (Object.keys(nextProps).length !== Object.keys(this.props).length) console.warn("MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children");
	      if (!nextProps.suppressChangedStoreWarning) for (var key in nextProps) {
	        if (!specialReactKeys[key] && this.props[key] !== nextProps[key]) console.warn("MobX Provider: Provided store '" + key + "' has changed. Please avoid replacing stores as the change might not propagate to all children");
	      }
	    }
	  }]);

	  return Provider;
	}(_react.Component), _class.contextTypes = {
	  mobxStores: _react.PropTypes.object
	}, _class.childContextTypes = {
	  mobxStores: _react.PropTypes.object.isRequired
	}, _temp);
	exports.default = Provider;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = null


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.objectOrObservableObject = exports.arrayOrObservableArrayOf = exports.arrayOrObservableArray = exports.observableObject = exports.observableMap = exports.observableArrayOf = exports.observableArray = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _mobx = __webpack_require__(2);

	// Copied from React.PropTypes
	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    for (var _len = arguments.length, rest = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
	      rest[_key - 6] = arguments[_key];
	    }

	    return (0, _mobx.untracked)(function () {
	      componentName = componentName || '<<anonymous>>';
	      propFullName = propFullName || propName;
	      if (props[propName] == null) {
	        if (isRequired) {
	          var actual = props[propName] === null ? 'null' : 'undefined';
	          return new Error('The ' + location + ' `' + propFullName + '` is marked as required ' + 'in `' + componentName + '`, but its value is `' + actual + '`.');
	        }
	        return null;
	      } else {
	        return validate.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));
	      }
	    });
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);
	  return chainedCheckType;
	}

	// Copied from React.PropTypes
	function isSymbol(propType, propValue) {
	  // Native Symbol.
	  if (propType === 'symbol') {
	    return true;
	  }

	  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	  if (propValue['@@toStringTag'] === 'Symbol') {
	    return true;
	  }

	  // Fallback for non-spec compliant Symbols which are polyfilled.
	  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	    return true;
	  }

	  return false;
	}

	// Copied from React.PropTypes
	function getPropType(propValue) {
	  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  if (isSymbol(propType, propValue)) {
	    return 'symbol';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// Copied from React.PropTypes
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
	  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
	    return (0, _mobx.untracked)(function () {
	      if (allowNativeType) {
	        if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
	      }
	      var mobxChecker = void 0;
	      switch (mobxType) {
	        case 'Array':
	          mobxChecker = _mobx.isObservableArray;break;
	        case 'Object':
	          mobxChecker = _mobx.isObservableObject;break;
	        case 'Map':
	          mobxChecker = _mobx.isObservableMap;break;
	        default:
	          throw new Error('Unexpected mobxType: ' + mobxType);
	      }
	      var propValue = props[propName];
	      if (!mobxChecker(propValue)) {
	        var preciseType = getPreciseType(propValue);
	        var nativeTypeExpectationMessage = allowNativeType ? ' or javascript `' + mobxType.toLowerCase() + '`' : '';
	        return new Error('Invalid prop `' + propFullName + '` of type `' + preciseType + '` supplied to' + ' `' + componentName + '`, expected `mobx.Observable' + mobxType + '`' + nativeTypeExpectationMessage + '.');
	      }
	      return null;
	    });
	  });
	}

	function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
	  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
	    for (var _len2 = arguments.length, rest = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
	      rest[_key2 - 5] = arguments[_key2];
	    }

	    return (0, _mobx.untracked)(function () {
	      if (typeof typeChecker !== 'function') {
	        return new Error('Property `' + propFullName + '` of component `' + componentName + '` has ' + 'invalid PropType notation.');
	      }
	      var error = createObservableTypeCheckerCreator(allowNativeType, 'Array')(props, propName, componentName);
	      if (error instanceof Error) return error;
	      var propValue = props[propName];
	      for (var i = 0; i < propValue.length; i++) {
	        error = typeChecker.apply(undefined, [propValue, i, componentName, location, propFullName + '[' + i + ']'].concat(rest));
	        if (error instanceof Error) return error;
	      }
	      return null;
	    });
	  });
	}

	var observableArray = exports.observableArray = createObservableTypeCheckerCreator(false, 'Array');
	var observableArrayOf = exports.observableArrayOf = createObservableArrayOfTypeChecker.bind(null, false);
	var observableMap = exports.observableMap = createObservableTypeCheckerCreator(false, 'Map');
	var observableObject = exports.observableObject = createObservableTypeCheckerCreator(false, 'Object');
	var arrayOrObservableArray = exports.arrayOrObservableArray = createObservableTypeCheckerCreator(true, 'Array');
	var arrayOrObservableArrayOf = exports.arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(null, true);
	var objectOrObservableObject = exports.objectOrObservableObject = createObservableTypeCheckerCreator(true, 'Object');

/***/ }
/******/ ])
});
;
},{"mobx":40,"react":"react","react-dom":"react-dom"}],40:[function(require,module,exports){
(function (global){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
registerGlobals();
exports.extras = {
    allowStateChanges: allowStateChanges,
    deepEqual: deepEqual,
    getAtom: getAtom,
    getDebugName: getDebugName,
    getDependencyTree: getDependencyTree,
    getAdministration: getAdministration,
    getGlobalState: getGlobalState,
    getObserverTree: getObserverTree,
    isComputingDerivation: isComputingDerivation,
    isSpyEnabled: isSpyEnabled,
    onReactionError: onReactionError,
    resetGlobalState: resetGlobalState,
    shareGlobalState: shareGlobalState,
    spyReport: spyReport,
    spyReportEnd: spyReportEnd,
    spyReportStart: spyReportStart,
    setReactionScheduler: setReactionScheduler
};
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx(module.exports);
}
module.exports.default = module.exports;
var actionFieldDecorator = createClassPropertyDecorator(function (target, key, value, args, originalDescriptor) {
    var actionName = (args && args.length === 1) ? args[0] : (value.name || key || "<unnamed action>");
    var wrappedAction = action(actionName, value);
    addHiddenProp(target, key, wrappedAction);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, true);
var boundActionDecorator = createClassPropertyDecorator(function (target, key, value) {
    defineBoundAction(target, key, value);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, false);
var action = function action(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction(arg1.name || "<unnamed action>", arg1);
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction(arg1, arg2);
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator(arg1);
    return namedActionDecorator(arg2).apply(null, arguments);
};
exports.action = action;
action.bound = function boundAction(arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
        var action_1 = createAction("<not yet bound action>", arg1);
        action_1.autoBind = true;
        return action_1;
    }
    return boundActionDecorator.apply(null, arguments);
};
function namedActionDecorator(name) {
    return function (target, prop, descriptor) {
        if (descriptor && typeof descriptor.value === "function") {
            descriptor.value = createAction(name, descriptor.value);
            descriptor.enumerable = false;
            descriptor.configurable = true;
            return descriptor;
        }
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function runInAction(arg1, arg2, arg3) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    var scope = typeof arg1 === "function" ? arg2 : arg3;
    invariant(typeof fn === "function", getMessage("m002"));
    invariant(fn.length === 0, getMessage("m003"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    return executeAction(actionName, fn, scope, undefined);
}
exports.runInAction = runInAction;
function isAction(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
exports.isAction = isAction;
function defineBoundAction(target, propertyName, fn) {
    var res = function () {
        return executeAction(propertyName, fn, target, arguments);
    };
    res.isMobxAction = true;
    addHiddenProp(target, propertyName, res);
}
function autorun(arg1, arg2, arg3) {
    var name, view, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        view = arg2;
        scope = arg3;
    }
    else {
        name = arg1.name || ("Autorun@" + getNextId());
        view = arg1;
        scope = arg2;
    }
    invariant(typeof view === "function", getMessage("m004"));
    invariant(isAction(view) === false, getMessage("m005"));
    if (scope)
        view = view.bind(scope);
    var reaction = new Reaction(name, function () {
        this.track(reactionRunner);
    });
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
exports.autorun = autorun;
function when(arg1, arg2, arg3, arg4) {
    var name, predicate, effect, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        predicate = arg2;
        effect = arg3;
        scope = arg4;
    }
    else {
        name = ("When@" + getNextId());
        predicate = arg1;
        effect = arg2;
        scope = arg3;
    }
    var disposer = autorun(name, function (r) {
        if (predicate.call(scope)) {
            r.dispose();
            var prevUntracked = untrackedStart();
            effect.call(scope);
            untrackedEnd(prevUntracked);
        }
    });
    return disposer;
}
exports.when = when;
function autorunAsync(arg1, arg2, arg3, arg4) {
    var name, func, delay, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        func = arg2;
        delay = arg3;
        scope = arg4;
    }
    else {
        name = arg1.name || ("AutorunAsync@" + getNextId());
        func = arg1;
        delay = arg2;
        scope = arg3;
    }
    invariant(isAction(func) === false, getMessage("m006"));
    if (delay === void 0)
        delay = 1;
    if (scope)
        func = func.bind(scope);
    var isScheduled = false;
    var r = new Reaction(name, function () {
        if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                if (!r.isDisposed)
                    r.track(reactionRunner);
            }, delay);
        }
    });
    function reactionRunner() { func(r); }
    r.schedule();
    return r.getDisposer();
}
exports.autorunAsync = autorunAsync;
function reaction(expression, effect, arg3) {
    if (arguments.length > 3) {
        fail(getMessage("m007"));
    }
    if (isModifierDescriptor(expression)) {
        fail(getMessage("m008"));
    }
    var opts;
    if (typeof arg3 === "object") {
        opts = arg3;
    }
    else {
        opts = {};
    }
    opts.name = opts.name || expression.name || effect.name || ("Reaction@" + getNextId());
    opts.fireImmediately = arg3 === true || opts.fireImmediately === true;
    opts.delay = opts.delay || 0;
    opts.compareStructural = opts.compareStructural || opts.struct || false;
    effect = action(opts.name, opts.context ? effect.bind(opts.context) : effect);
    if (opts.context) {
        expression = expression.bind(opts.context);
    }
    var firstTime = true;
    var isScheduled = false;
    var nextValue;
    var r = new Reaction(opts.name, function () {
        if (opts.delay < 1) {
            reactionRunner();
        }
        else if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                reactionRunner();
            }, opts.delay);
        }
    });
    function reactionRunner() {
        if (r.isDisposed)
            return;
        var changed = false;
        r.track(function () {
            var v = expression(r);
            changed = valueDidChange(opts.compareStructural, nextValue, v);
            nextValue = v;
        });
        if (firstTime && opts.fireImmediately)
            effect(nextValue, r);
        if (!firstTime && changed === true)
            effect(nextValue, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
exports.reaction = reaction;
function createComputedDecorator(compareStructural) {
    return createClassPropertyDecorator(function (target, name, _, __, originalDescriptor) {
        invariant(typeof originalDescriptor !== "undefined", getMessage("m009"));
        invariant(typeof originalDescriptor.get === "function", getMessage("m010"));
        var adm = asObservableObject(target, "");
        defineComputedProperty(adm, name, originalDescriptor.get, originalDescriptor.set, compareStructural, false);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined)
            return undefined;
        return observable.get();
    }, function (name, value) {
        this.$mobx.values[name].set(value);
    }, false, false);
}
var computedDecorator = createComputedDecorator(false);
var computedStructDecorator = createComputedDecorator(true);
var computed = (function computed(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        return computedDecorator.apply(null, arguments);
    }
    invariant(typeof arg1 === "function", getMessage("m011"));
    invariant(arguments.length < 3, getMessage("m012"));
    var opts = typeof arg2 === "object" ? arg2 : {};
    opts.setter = typeof arg2 === "function" ? arg2 : opts.setter;
    return new ComputedValue(arg1, opts.context, opts.compareStructural || opts.struct || false, opts.name || arg1.name || "", opts.setter);
});
exports.computed = computed;
computed.struct = computedStructDecorator;
function createTransformer(transformer, onCleanup) {
    invariant(typeof transformer === "function" && transformer.length < 2, "createTransformer expects a function that accepts one argument");
    var objectCache = {};
    var resetId = globalState.resetId;
    var Transformer = (function (_super) {
        __extends(Transformer, _super);
        function Transformer(sourceIdentifier, sourceObject) {
            var _this = _super.call(this, function () { return transformer(sourceObject); }, undefined, false, "Transformer-" + transformer.name + "-" + sourceIdentifier, undefined) || this;
            _this.sourceIdentifier = sourceIdentifier;
            _this.sourceObject = sourceObject;
            return _this;
        }
        Transformer.prototype.onBecomeUnobserved = function () {
            var lastValue = this.value;
            _super.prototype.onBecomeUnobserved.call(this);
            delete objectCache[this.sourceIdentifier];
            if (onCleanup)
                onCleanup(lastValue, this.sourceObject);
        };
        return Transformer;
    }(ComputedValue));
    return function (object) {
        if (resetId !== globalState.resetId) {
            objectCache = {};
            resetId = globalState.resetId;
        }
        var identifier = getMemoizationId(object);
        var reactiveTransformer = objectCache[identifier];
        if (reactiveTransformer)
            return reactiveTransformer.get();
        reactiveTransformer = objectCache[identifier] = new Transformer(identifier, object);
        return reactiveTransformer.get();
    };
}
exports.createTransformer = createTransformer;
function getMemoizationId(object) {
    if (object === null || typeof object !== "object")
        throw new Error("[mobx] transform expected some kind of object, got: " + object);
    var tid = object.$transformId;
    if (tid === undefined) {
        tid = getNextId();
        addHiddenProp(object, "$transformId", tid);
    }
    return tid;
}
function expr(expr, scope) {
    if (!isComputingDerivation())
        console.warn(getMessage("m013"));
    return computed(expr, { context: scope }).get();
}
exports.expr = expr;
function extendObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, deepEnhancer, properties);
}
exports.extendObservable = extendObservable;
function extendShallowObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, referenceEnhancer, properties);
}
exports.extendShallowObservable = extendShallowObservable;
function extendObservableHelper(target, defaultEnhancer, properties) {
    invariant(arguments.length >= 2, getMessage("m014"));
    invariant(typeof target === "object", getMessage("m015"));
    invariant(!(isObservableMap(target)), getMessage("m016"));
    properties.forEach(function (propSet) {
        invariant(typeof propSet === "object", getMessage("m017"));
        invariant(!isObservable(propSet), getMessage("m018"));
    });
    var adm = asObservableObject(target);
    var definedProps = {};
    for (var i = properties.length - 1; i >= 0; i--) {
        var propSet = properties[i];
        for (var key in propSet)
            if (definedProps[key] !== true && hasOwnProperty(propSet, key)) {
                definedProps[key] = true;
                if (target === propSet && !isPropertyConfigurable(target, key))
                    continue;
                var descriptor = Object.getOwnPropertyDescriptor(propSet, key);
                defineObservablePropertyFromDescriptor(adm, key, descriptor, defaultEnhancer);
            }
    }
    return target;
}
function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers(node))
        result.observers = getObservers(node).map(nodeToObserverTree);
    return result;
}
function intercept(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
exports.intercept = intercept;
function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept(handler);
}
function isComputed(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false)
            return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}
exports.isComputed = isComputed;
function isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableArray(value) || isObservableMap(value))
            throw new Error(getMessage("m019"));
        else if (isObservableObject(value)) {
            var o = value.$mobx;
            return o.values && !!o.values[property];
        }
        return false;
    }
    return isObservableObject(value) || !!value.$mobx || isAtom(value) || isReaction(value) || isComputedValue(value);
}
exports.isObservable = isObservable;
var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
var deepStructDecorator = createDecoratorForEnhancer(deepStructEnhancer);
var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
function createObservable(v) {
    if (v === void 0) { v = undefined; }
    if (typeof arguments[1] === "string")
        return deepDecorator.apply(null, arguments);
    invariant(arguments.length <= 1, getMessage("m021"));
    invariant(!isModifierDescriptor(v), getMessage("m020"));
    if (isObservable(v))
        return v;
    var res = deepEnhancer(v, undefined, undefined);
    if (res !== v)
        return res;
    return observable.box(v);
}
var IObservableFactories = (function () {
    function IObservableFactories() {
    }
    IObservableFactories.prototype.box = function (value, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("box");
        return new ObservableValue(value, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowBox = function (value, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowBox");
        return new ObservableValue(value, referenceEnhancer, name);
    };
    IObservableFactories.prototype.array = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("array");
        return new ObservableArray(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowArray = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowArray");
        return new ObservableArray(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.map = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("map");
        return new ObservableMap(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowMap = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowMap");
        return new ObservableMap(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.object = function (props, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("object");
        var res = {};
        asObservableObject(res, name);
        extendObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.shallowObject = function (props, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowObject");
        var res = {};
        asObservableObject(res, name);
        extendShallowObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.ref = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(referenceEnhancer, arguments[0]);
        }
        else {
            return refDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.shallow = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(shallowEnhancer, arguments[0]);
        }
        else {
            return shallowDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.deep = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(deepEnhancer, arguments[0]);
        }
        else {
            return deepDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.struct = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(deepStructEnhancer, arguments[0]);
        }
        else {
            return deepStructDecorator.apply(null, arguments);
        }
    };
    return IObservableFactories;
}());
exports.IObservableFactories = IObservableFactories;
var observable = createObservable;
exports.observable = observable;
Object.keys(IObservableFactories.prototype).forEach(function (key) { return observable[key] = IObservableFactories.prototype[key]; });
observable.deep.struct = observable.struct;
observable.ref.struct = function () {
    if (arguments.length < 2) {
        return createModifierDescriptor(refStructEnhancer, arguments[0]);
    }
    else {
        return refStructDecorator.apply(null, arguments);
    }
};
function incorrectlyUsedAsDecorator(methodName) {
    fail("Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}
function createDecoratorForEnhancer(enhancer) {
    invariant(!!enhancer, ":(");
    return createClassPropertyDecorator(function (target, name, baseValue, _, baseDescriptor) {
        assertPropertyConfigurable(target, name);
        invariant(!baseDescriptor || !baseDescriptor.get, getMessage("m022"));
        var adm = asObservableObject(target, undefined);
        defineObservableProperty(adm, name, baseValue, enhancer);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined)
            return undefined;
        return observable.get();
    }, function (name, value) {
        setPropertyValue(this, name, value);
    }, true, false);
}
function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
exports.observe = observe;
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration(thing, property).observe(listener, fireImmediately);
}
function toJS(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) { detectCycles = true; }
    if (__alreadySeen === void 0) { __alreadySeen = []; }
    function cache(value) {
        if (detectCycles)
            __alreadySeen.push([source, value]);
        return value;
    }
    if (isObservable(source)) {
        if (detectCycles && __alreadySeen === null)
            __alreadySeen = [];
        if (detectCycles && source !== null && typeof source === "object") {
            for (var i = 0, l = __alreadySeen.length; i < l; i++)
                if (__alreadySeen[i][0] === source)
                    return __alreadySeen[i][1];
        }
        if (isObservableArray(source)) {
            var res = cache([]);
            var toAdd = source.map(function (value) { return toJS(value, detectCycles, __alreadySeen); });
            res.length = toAdd.length;
            for (var i = 0, l = toAdd.length; i < l; i++)
                res[i] = toAdd[i];
            return res;
        }
        if (isObservableObject(source)) {
            var res = cache({});
            for (var key in source)
                res[key] = toJS(source[key], detectCycles, __alreadySeen);
            return res;
        }
        if (isObservableMap(source)) {
            var res_1 = cache({});
            source.forEach(function (value, key) { return res_1[key] = toJS(value, detectCycles, __alreadySeen); });
            return res_1;
        }
        if (isObservableValue(source))
            return toJS(source.get(), detectCycles, __alreadySeen);
    }
    return source;
}
exports.toJS = toJS;
function transaction(action, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    deprecated(getMessage("m023"));
    return runInTransaction.apply(undefined, arguments);
}
exports.transaction = transaction;
function runInTransaction(action, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    return executeAction("", action);
}
function log(msg) {
    console.log(msg);
    return msg;
}
function whyRun(thing, prop) {
    switch (arguments.length) {
        case 0:
            thing = globalState.trackingDerivation;
            if (!thing)
                return log(getMessage("m024"));
            break;
        case 2:
            thing = getAtom(thing, prop);
            break;
    }
    thing = getAtom(thing);
    if (isComputedValue(thing))
        return log(thing.whyRun());
    else if (isReaction(thing))
        return log(thing.whyRun());
    return fail(getMessage("m025"));
}
exports.whyRun = whyRun;
function createAction(actionName, fn) {
    invariant(typeof fn === "function", getMessage("m026"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    var res = function () {
        return executeAction(actionName, fn, this, arguments);
    };
    res.originalFn = fn;
    res.isMobxAction = true;
    return res;
}
function executeAction(actionName, fn, scope, args) {
    var runInfo = startAction(actionName, fn, scope, args);
    try {
        return fn.apply(scope, args);
    }
    finally {
        endAction(runInfo);
    }
}
function startAction(actionName, fn, scope, args) {
    var notifySpy = isSpyEnabled() && !!actionName;
    var startTime = 0;
    if (notifySpy) {
        startTime = Date.now();
        var l = (args && args.length) || 0;
        var flattendArgs = new Array(l);
        if (l > 0)
            for (var i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart({
            type: "action",
            name: actionName,
            fn: fn,
            object: scope,
            arguments: flattendArgs
        });
    }
    var prevDerivation = untrackedStart();
    startBatch();
    var prevAllowStateChanges = allowStateChangesStart(true);
    return {
        prevDerivation: prevDerivation,
        prevAllowStateChanges: prevAllowStateChanges,
        notifySpy: notifySpy,
        startTime: startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd(runInfo.prevAllowStateChanges);
    endBatch();
    untrackedEnd(runInfo.prevDerivation);
    if (runInfo.notifySpy)
        spyReportEnd({ time: Date.now() - runInfo.startTime });
}
function useStrict(strict) {
    invariant(globalState.trackingDerivation === null, getMessage("m028"));
    globalState.strictMode = strict;
    globalState.allowStateChanges = !strict;
}
exports.useStrict = useStrict;
function isStrictModeEnabled() {
    return globalState.strictMode;
}
exports.isStrictModeEnabled = isStrictModeEnabled;
function allowStateChanges(allowStateChanges, func) {
    var prev = allowStateChangesStart(allowStateChanges);
    var res;
    try {
        res = func();
    }
    finally {
        allowStateChangesEnd(prev);
    }
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}
var BaseAtom = (function () {
    function BaseAtom(name) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        this.name = name;
        this.isPendingUnobservation = true;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.NOT_TRACKING;
    }
    BaseAtom.prototype.onBecomeUnobserved = function () {
    };
    BaseAtom.prototype.reportObserved = function () {
        reportObserved(this);
    };
    BaseAtom.prototype.reportChanged = function () {
        startBatch();
        propagateChanged(this);
        endBatch();
    };
    BaseAtom.prototype.toString = function () {
        return this.name;
    };
    return BaseAtom;
}());
exports.BaseAtom = BaseAtom;
var Atom = (function (_super) {
    __extends(Atom, _super);
    function Atom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop; }
        if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop; }
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.onBecomeObservedHandler = onBecomeObservedHandler;
        _this.onBecomeUnobservedHandler = onBecomeUnobservedHandler;
        _this.isPendingUnobservation = false;
        _this.isBeingTracked = false;
        return _this;
    }
    Atom.prototype.reportObserved = function () {
        startBatch();
        _super.prototype.reportObserved.call(this);
        if (!this.isBeingTracked) {
            this.isBeingTracked = true;
            this.onBecomeObservedHandler();
        }
        endBatch();
        return !!globalState.trackingDerivation;
    };
    Atom.prototype.onBecomeUnobserved = function () {
        this.isBeingTracked = false;
        this.onBecomeUnobservedHandler();
    };
    return Atom;
}(BaseAtom));
exports.Atom = Atom;
var isAtom = createInstanceofPredicate("Atom", BaseAtom);
var ComputedValue = (function () {
    function ComputedValue(derivation, scope, compareStructural, name, setter) {
        this.derivation = derivation;
        this.scope = scope;
        this.compareStructural = compareStructural;
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.observing = [];
        this.newObserving = null;
        this.isPendingUnobservation = false;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.value = undefined;
        this.isComputing = false;
        this.isRunningSetter = false;
        this.name = name || "ComputedValue@" + getNextId();
        if (setter)
            this.setter = createAction(name + "-setter", setter);
    }
    ComputedValue.prototype.onBecomeStale = function () {
        propagateMaybeChanged(this);
    };
    ComputedValue.prototype.onBecomeUnobserved = function () {
        invariant(this.dependenciesState !== IDerivationState.NOT_TRACKING, getMessage("m029"));
        clearObserving(this);
        this.value = undefined;
    };
    ComputedValue.prototype.get = function () {
        invariant(!this.isComputing, "Cycle detected in computation " + this.name, this.derivation);
        if (globalState.inBatch === 0) {
            startBatch();
            if (shouldCompute(this))
                this.value = this.computeValue(false);
            endBatch();
        }
        else {
            reportObserved(this);
            if (shouldCompute(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed(this);
        }
        var result = this.value;
        if (isCaughtException(result))
            throw result.cause;
        return result;
    };
    ComputedValue.prototype.peek = function () {
        var res = this.computeValue(false);
        if (isCaughtException(res))
            throw res.cause;
        return res;
    };
    ComputedValue.prototype.set = function (value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant(false, "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue.prototype.trackAndCompute = function () {
        if (isSpyEnabled()) {
            spyReport({
                object: this.scope,
                type: "compute",
                fn: this.derivation
            });
        }
        var oldValue = this.value;
        var newValue = this.value = this.computeValue(true);
        return isCaughtException(newValue) || valueDidChange(this.compareStructural, newValue, oldValue);
    };
    ComputedValue.prototype.computeValue = function (track) {
        this.isComputing = true;
        globalState.computationDepth++;
        var res;
        if (track) {
            res = trackDerivedFunction(this, this.derivation, this.scope);
        }
        else {
            try {
                res = this.derivation.call(this.scope);
            }
            catch (e) {
                res = new CaughtException(e);
            }
        }
        globalState.computationDepth--;
        this.isComputing = false;
        return res;
    };
    ;
    ComputedValue.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener({
                    type: "update",
                    object: _this,
                    newValue: newValue,
                    oldValue: prevValue
                });
                untrackedEnd(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    ;
    ComputedValue.prototype.whyRun = function () {
        var isTracking = Boolean(globalState.trackingDerivation);
        var observing = unique(this.isComputing ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        var observers = unique(getObservers(this).map(function (dep) { return dep.name; }));
        return ("\nWhyRun? computation '" + this.name + "':\n * Running because: " + (isTracking ? "[active] the value of this computation is needed by a reaction" : this.isComputing ? "[get] The value of this computed was requested outside a reaction" : "[idle] not running at the moment") + "\n" +
            (this.dependenciesState === IDerivationState.NOT_TRACKING ? getMessage("m032") :
                " * This computation will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this.isComputing && isTracking) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n\n  * If the outcome of this computation changes, the following observers will be re-run:\n    " + joinStrings(observers) + "\n"));
    };
    return ComputedValue;
}());
ComputedValue.prototype[primitiveSymbol()] = ComputedValue.prototype.valueOf;
var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState;
(function (IDerivationState) {
    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));
exports.IDerivationState = IDerivationState;
var CaughtException = (function () {
    function CaughtException(cause) {
        this.cause = cause;
    }
    return CaughtException;
}());
function isCaughtException(e) {
    return e instanceof CaughtException;
}
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
        case IDerivationState.UP_TO_DATE: return false;
        case IDerivationState.NOT_TRACKING:
        case IDerivationState.STALE: return true;
        case IDerivationState.POSSIBLY_STALE: {
            var prevUntracked = untrackedStart();
            var obs = derivation.observing, l = obs.length;
            for (var i = 0; i < l; i++) {
                var obj = obs[i];
                if (isComputedValue(obj)) {
                    try {
                        obj.get();
                    }
                    catch (e) {
                        untrackedEnd(prevUntracked);
                        return true;
                    }
                    if (derivation.dependenciesState === IDerivationState.STALE) {
                        untrackedEnd(prevUntracked);
                        return true;
                    }
                }
            }
            changeDependenciesStateTo0(derivation);
            untrackedEnd(prevUntracked);
            return false;
        }
    }
}
function isComputingDerivation() {
    return globalState.trackingDerivation !== null;
}
function checkIfStateModificationsAreAllowed(atom) {
    var hasObservers = atom.observers.length > 0;
    if (globalState.computationDepth > 0 && hasObservers)
        fail(getMessage("m031") + atom.name);
    if (!globalState.allowStateChanges && hasObservers)
        fail(getMessage(globalState.strictMode ? "m030a" : "m030b") + atom.name);
}
function trackDerivedFunction(derivation, f, context) {
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    var result;
    try {
        result = f.call(context);
    }
    catch (e) {
        result = new CaughtException(e);
    }
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
}
function bindDependencies(derivation) {
    var prevObserving = derivation.observing;
    var observing = derivation.observing = derivation.newObserving;
    derivation.newObserving = null;
    var i0 = 0, l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
    }
    observing.length = i0;
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver(dep, derivation);
        }
        dep.diffValue = 0;
    }
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver(dep, derivation);
        }
    }
}
function clearObserving(derivation) {
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        removeObserver(obs[i], derivation);
    derivation.dependenciesState = IDerivationState.NOT_TRACKING;
    obs.length = 0;
}
function untracked(action) {
    var prev = untrackedStart();
    var res = action();
    untrackedEnd(prev);
    return res;
}
exports.untracked = untracked;
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
}
var persistentKeys = ["mobxGuid", "resetId", "spyListeners", "strictMode", "runId"];
var MobXGlobals = (function () {
    function MobXGlobals() {
        this.version = 5;
        this.trackingDerivation = null;
        this.computationDepth = 0;
        this.runId = 0;
        this.mobxGuid = 0;
        this.inBatch = 0;
        this.pendingUnobservations = [];
        this.pendingReactions = [];
        this.isRunningReactions = false;
        this.allowStateChanges = true;
        this.strictMode = false;
        this.resetId = 0;
        this.spyListeners = [];
        this.globalReactionErrorHandlers = [];
    }
    return MobXGlobals;
}());
var globalState = new MobXGlobals();
function shareGlobalState() {
    var global = getGlobal();
    var ownState = globalState;
    if (global.__mobservableTrackingStack || global.__mobservableViewStack)
        throw new Error("[mobx] An incompatible version of mobservable is already loaded.");
    if (global.__mobxGlobal && global.__mobxGlobal.version !== ownState.version)
        throw new Error("[mobx] An incompatible version of mobx is already loaded.");
    if (global.__mobxGlobal)
        globalState = global.__mobxGlobal;
    else
        global.__mobxGlobal = ownState;
}
function getGlobalState() {
    return globalState;
}
function registerGlobals() {
}
function resetGlobalState() {
    globalState.resetId++;
    var defaultGlobals = new MobXGlobals();
    for (var key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState[key] = defaultGlobals[key];
    globalState.allowStateChanges = !globalState.strictMode;
}
function hasObservers(observable) {
    return observable.observers && observable.observers.length > 0;
}
function getObservers(observable) {
    return observable.observers;
}
function invariantObservers(observable) {
    var list = observable.observers;
    var map = observable.observersIndexes;
    var l = list.length;
    for (var i = 0; i < l; i++) {
        var id = list[i].__mapid;
        if (i) {
            invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list");
        }
        else {
            invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldnt be held in map.");
        }
    }
    invariant(list.length === 0 || Object.keys(map).length === list.length - 1, "INTERNAL ERROR there is no junk in map");
}
function addObserver(observable, node) {
    var l = observable.observers.length;
    if (l) {
        observable.observersIndexes[node.__mapid] = l;
    }
    observable.observers[l] = node;
    if (observable.lowestObserverState > node.dependenciesState)
        observable.lowestObserverState = node.dependenciesState;
}
function removeObserver(observable, node) {
    if (observable.observers.length === 1) {
        observable.observers.length = 0;
        queueForUnobservation(observable);
    }
    else {
        var list = observable.observers;
        var map_1 = observable.observersIndexes;
        var filler = list.pop();
        if (filler !== node) {
            var index = map_1[node.__mapid] || 0;
            if (index) {
                map_1[filler.__mapid] = index;
            }
            else {
                delete map_1[filler.__mapid];
            }
            list[index] = filler;
        }
        delete map_1[node.__mapid];
    }
}
function queueForUnobservation(observable) {
    if (!observable.isPendingUnobservation) {
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (--globalState.inBatch === 0) {
        runReactions();
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable_1 = list[i];
            observable_1.isPendingUnobservation = false;
            if (observable_1.observers.length === 0) {
                observable_1.onBecomeUnobserved();
            }
        }
        globalState.pendingUnobservations = [];
    }
}
function reportObserved(observable) {
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
        }
    }
    else if (observable.observers.length === 0) {
        queueForUnobservation(observable);
    }
}
function invariantLOS(observable, msg) {
    var min = getObservers(observable).reduce(function (a, b) { return Math.min(a, b.dependenciesState); }, 2);
    if (min >= observable.lowestObserverState)
        return;
    throw new Error("lowestObserverState is wrong for " + msg + " because " + min + " < " + observable.lowestObserverState);
}
function propagateChanged(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE)
            d.onBecomeStale();
        d.dependenciesState = IDerivationState.STALE;
    }
}
function propagateChangeConfirmed(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = IDerivationState.STALE;
        else if (d.dependenciesState === IDerivationState.UP_TO_DATE)
            observable.lowestObserverState = IDerivationState.UP_TO_DATE;
    }
}
function propagateMaybeChanged(observable) {
    if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE)
        return;
    observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
            d.onBecomeStale();
        }
    }
}
var Reaction = (function () {
    function Reaction(name, onInvalidate) {
        if (name === void 0) { name = "Reaction@" + getNextId(); }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.observing = [];
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
    }
    Reaction.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            runReactions();
        }
    };
    Reaction.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    Reaction.prototype.runReaction = function () {
        if (!this.isDisposed) {
            startBatch();
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                this.onInvalidate();
                if (this._isTrackPending && isSpyEnabled()) {
                    spyReport({
                        object: this,
                        type: "scheduled-reaction"
                    });
                }
            }
            endBatch();
        }
    };
    Reaction.prototype.track = function (fn) {
        startBatch();
        var notify = isSpyEnabled();
        var startTime;
        if (notify) {
            startTime = Date.now();
            spyReportStart({
                object: this,
                type: "reaction",
                fn: fn
            });
        }
        this._isRunning = true;
        var result = trackDerivedFunction(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            clearObserving(this);
        }
        if (isCaughtException(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify) {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    };
    Reaction.prototype.reportExceptionInDerivation = function (error) {
        var _this = this;
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this;
        var messageToUser = getMessage("m037");
        console.error(message || messageToUser, error);
        if (isSpyEnabled()) {
            spyReport({
                type: "error",
                message: message,
                error: error,
                object: this
            });
        }
        globalState.globalReactionErrorHandlers.forEach(function (f) { return f(error, _this); });
    };
    Reaction.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    };
    Reaction.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r.$mobx = this;
        r.onError = registerErrorHandler;
        return r;
    };
    Reaction.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction.prototype.whyRun = function () {
        var observing = unique(this._isRunning ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        return ("\nWhyRun? reaction '" + this.name + "':\n * Status: [" + (this.isDisposed ? "stopped" : this._isRunning ? "running" : this.isScheduled() ? "scheduled" : "idle") + "]\n * This reaction will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this._isRunning) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n");
    };
    return Reaction;
}());
exports.Reaction = Reaction;
function registerErrorHandler(handler) {
    invariant(this && this.$mobx && isReaction(this.$mobx), "Invalid `this`");
    invariant(!this.$mobx.errorHandler, "Only one onErrorHandler can be registered");
    this.$mobx.errorHandler = handler;
}
function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return function () {
        var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState.globalReactionErrorHandlers.splice(idx, 1);
    };
}
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function (f) { return f(); };
function runReactions() {
    if (globalState.inBatch > 0 || globalState.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations."
                + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
            allReactions.splice(0);
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState.isRunningReactions = false;
}
var isReaction = createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
}
function isSpyEnabled() {
    return !!globalState.spyListeners.length;
}
function spyReport(event) {
    if (!globalState.spyListeners.length)
        return;
    var listeners = globalState.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart(event) {
    var change = objectAssign({}, event, { spyReportStart: true });
    spyReport(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    if (change)
        spyReport(objectAssign({}, change, END_EVENT));
    else
        spyReport(END_EVENT);
}
function spy(listener) {
    globalState.spyListeners.push(listener);
    return once(function () {
        var idx = globalState.spyListeners.indexOf(listener);
        if (idx !== -1)
            globalState.spyListeners.splice(idx, 1);
    });
}
exports.spy = spy;
function hasInterceptors(interceptable) {
    return (interceptable.interceptors && interceptable.interceptors.length > 0);
}
function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
        var interceptors = interceptable.interceptors;
        if (interceptors)
            for (var i = 0, l = interceptors.length; i < l; i++) {
                change = interceptors[i](change);
                invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
                if (!change)
                    break;
            }
        return change;
    }
    finally {
        untrackedEnd(prevU);
    }
}
function hasListeners(listenable) {
    return listenable.changeListeners && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd(prevU);
}
function asReference(value) {
    deprecated("asReference is deprecated, use observable.ref instead");
    return observable.ref(value);
}
exports.asReference = asReference;
function asStructure(value) {
    deprecated("asStructure is deprecated. Use observable.struct, computed.struct or reaction options instead.");
    return observable.struct(value);
}
exports.asStructure = asStructure;
function asFlat(value) {
    deprecated("asFlat is deprecated, use observable.shallow instead");
    return observable.shallow(value);
}
exports.asFlat = asFlat;
function asMap(data) {
    deprecated("asMap is deprecated, use observable.map or observable.shallowMap instead");
    return observable.map(data || {});
}
exports.asMap = asMap;
function isModifierDescriptor(thing) {
    return typeof thing === "object" && thing !== null && thing.isMobxModifierDescriptor === true;
}
exports.isModifierDescriptor = isModifierDescriptor;
function createModifierDescriptor(enhancer, initialValue) {
    invariant(!isModifierDescriptor(initialValue), "Modifiers cannot be nested");
    return {
        isMobxModifierDescriptor: true,
        initialValue: initialValue,
        enhancer: enhancer
    };
}
function deepEnhancer(v, _, name) {
    if (isModifierDescriptor(v))
        fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    if (isObservable(v))
        return v;
    if (Array.isArray(v))
        return observable.array(v, name);
    if (isPlainObject(v))
        return observable.object(v, name);
    if (isES6Map(v))
        return observable.shallowMap(v, name);
    return v;
}
function shallowEnhancer(v, _, name) {
    if (isModifierDescriptor(v))
        fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    if (v === undefined || v === null)
        return v;
    if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v))
        return v;
    if (Array.isArray(v))
        return observable.shallowArray(v, name);
    if (isPlainObject(v))
        return observable.shallowObject(v, name);
    if (isES6Map(v))
        return observable.shallowMap(v, name);
    return fail("The shallow modifier / decorator can only used in combination with arrays, objects and maps");
}
function referenceEnhancer(newValue) {
    return newValue;
}
function deepStructEnhancer(v, oldValue, name) {
    if (deepEqual(v, oldValue))
        return oldValue;
    if (isObservable(v))
        return v;
    if (Array.isArray(v))
        return new ObservableArray(v, deepStructEnhancer, name);
    if (isES6Map(v))
        return new ObservableMap(v, deepStructEnhancer, name);
    if (isPlainObject(v)) {
        var res = {};
        asObservableObject(res, name);
        extendObservableHelper(res, deepStructEnhancer, [v]);
        return res;
    }
    return v;
}
function refStructEnhancer(v, oldValue, name) {
    if (deepEqual(v, oldValue))
        return oldValue;
    return v;
}
var safariPrototypeSetterInheritanceBug = (function () {
    var v = false;
    var p = {};
    Object.defineProperty(p, "0", { set: function () { v = true; } });
    Object.create(p)["0"] = 1;
    return v === false;
})();
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
var StubArray = (function () {
    function StubArray() {
    }
    return StubArray;
}());
StubArray.prototype = [];
var ObservableArrayAdministration = (function () {
    function ObservableArrayAdministration(name, enhancer, array, owned) {
        this.array = array;
        this.owned = owned;
        this.lastKnownLength = 0;
        this.interceptors = null;
        this.changeListeners = null;
        this.atom = new BaseAtom(name || ("ObservableArray@" + getNextId()));
        this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name + "[..]"); };
    }
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        if (fireImmediately) {
            listener({
                object: this.array,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0)
            throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength)
            this.spliceWithArray(currentLength, 0, new Array(newLength - currentLength));
        else
            this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
        this.lastKnownLength += delta;
        if (delta > 0 && oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE)
            reserveArrayBuffer(oldLength + delta + 1);
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this.atom);
        var length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = [];
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.array,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.map(function (v) { return _this.enhancer(v, undefined); });
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength(length, lengthDelta);
        var res = (_a = this.values).splice.apply(_a, [index, deleteCount].concat(newItems));
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return res;
        var _a;
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "update",
            index: index, newValue: newValue, oldValue: oldValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "splice",
            index: index, removed: removed, added: added,
            removedCount: removed.length,
            addedCount: added.length
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    return ObservableArrayAdministration;
}());
var ObservableArray = (function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray(initialValues, enhancer, name, owned) {
        if (name === void 0) { name = "ObservableArray@" + getNextId(); }
        if (owned === void 0) { owned = false; }
        var _this = _super.call(this) || this;
        var adm = new ObservableArrayAdministration(name, enhancer, _this, owned);
        addHiddenFinalProp(_this, "$mobx", adm);
        if (initialValues && initialValues.length) {
            adm.updateArrayLength(0, initialValues.length);
            adm.values = initialValues.map(function (v) { return enhancer(v, undefined, name + "[..]"); });
            adm.notifyArraySplice(0, adm.values.slice(), EMPTY_ARRAY);
        }
        else {
            adm.values = [];
        }
        if (safariPrototypeSetterInheritanceBug) {
            Object.defineProperty(adm.array, "0", ENTRY_0);
        }
        return _this;
    }
    ObservableArray.prototype.intercept = function (handler) {
        return this.$mobx.intercept(handler);
    };
    ObservableArray.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        return this.$mobx.observe(listener, fireImmediately);
    };
    ObservableArray.prototype.clear = function () {
        return this.splice(0);
    };
    ObservableArray.prototype.concat = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        this.$mobx.atom.reportObserved();
        return Array.prototype.concat.apply(this.peek(), arrays.map(function (a) { return isObservableArray(a) ? a.peek() : a; }));
    };
    ObservableArray.prototype.replace = function (newItems) {
        return this.$mobx.spliceWithArray(0, this.$mobx.values.length, newItems);
    };
    ObservableArray.prototype.toJS = function () {
        return this.slice();
    };
    ObservableArray.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableArray.prototype.peek = function () {
        return this.$mobx.values;
    };
    ObservableArray.prototype.find = function (predicate, thisArg, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        this.$mobx.atom.reportObserved();
        var items = this.$mobx.values, l = items.length;
        for (var i = fromIndex; i < l; i++)
            if (predicate.call(thisArg, items[i], i, this))
                return items[i];
        return undefined;
    };
    ObservableArray.prototype.splice = function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return this.$mobx.spliceWithArray(index);
            case 2:
                return this.$mobx.spliceWithArray(index, deleteCount);
        }
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.pop = function () {
        return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
    };
    ObservableArray.prototype.shift = function () {
        return this.splice(0, 1)[0];
    };
    ObservableArray.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.reverse = function () {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    };
    ObservableArray.prototype.sort = function (compareFn) {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    };
    ObservableArray.prototype.remove = function (value) {
        var idx = this.$mobx.values.indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    };
    ObservableArray.prototype.move = function (fromIndex, toIndex) {
        function checkIndex(index) {
            if (index < 0) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
            }
            var length = this.$mobx.values.length;
            if (index >= length) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
            }
        }
        checkIndex.call(this, fromIndex);
        checkIndex.call(this, toIndex);
        if (fromIndex === toIndex) {
            return;
        }
        var oldItems = this.$mobx.values;
        var newItems;
        if (fromIndex < toIndex) {
            newItems = oldItems.slice(0, fromIndex).concat(oldItems.slice(fromIndex + 1, toIndex + 1), [oldItems[fromIndex]], oldItems.slice(toIndex + 1));
        }
        else {
            newItems = oldItems.slice(0, toIndex).concat([oldItems[fromIndex]], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
        }
        this.replace(newItems);
    };
    ObservableArray.prototype.toString = function () {
        this.$mobx.atom.reportObserved();
        return Array.prototype.toString.apply(this.$mobx.values, arguments);
    };
    ObservableArray.prototype.toLocaleString = function () {
        this.$mobx.atom.reportObserved();
        return Array.prototype.toLocaleString.apply(this.$mobx.values, arguments);
    };
    return ObservableArray;
}(StubArray));
declareIterator(ObservableArray.prototype, function () {
    return arrayAsIterator(this.slice());
});
makeNonEnumerable(ObservableArray.prototype, [
    "constructor",
    "intercept",
    "observe",
    "clear",
    "concat",
    "replace",
    "toJS",
    "toJSON",
    "peek",
    "find",
    "splice",
    "push",
    "pop",
    "shift",
    "unshift",
    "reverse",
    "sort",
    "remove",
    "move",
    "toString",
    "toLocaleString"
]);
Object.defineProperty(ObservableArray.prototype, "length", {
    enumerable: false,
    configurable: true,
    get: function () {
        return this.$mobx.getArrayLength();
    },
    set: function (newLength) {
        this.$mobx.setArrayLength(newLength);
    }
});
[
    "every",
    "filter",
    "forEach",
    "indexOf",
    "join",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some"
].forEach(function (funcName) {
    var baseFunc = Array.prototype[funcName];
    invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
    addHiddenProp(ObservableArray.prototype, funcName, function () {
        this.$mobx.atom.reportObserved();
        return baseFunc.apply(this.$mobx.values, arguments);
    });
});
var ENTRY_0 = {
    configurable: true,
    enumerable: false,
    set: createArraySetter(0),
    get: createArrayGetter(0)
};
function createArrayBufferItem(index) {
    var set = createArraySetter(index);
    var get = createArrayGetter(index);
    Object.defineProperty(ObservableArray.prototype, "" + index, {
        enumerable: false,
        configurable: true,
        set: set, get: get
    });
}
function createArraySetter(index) {
    return function (newValue) {
        var adm = this.$mobx;
        var values = adm.values;
        if (index < values.length) {
            checkIfStateModificationsAreAllowed(adm.atom);
            var oldValue = values[index];
            if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                    type: "update",
                    object: adm.array,
                    index: index, newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            var changed = newValue !== oldValue;
            if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values.length) {
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else
            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
    };
}
function createArrayGetter(index) {
    return function () {
        var impl = this.$mobx;
        if (impl) {
            if (index < impl.values.length) {
                impl.atom.reportObserved();
                return impl.values[index];
            }
            console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + impl.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        }
        return undefined;
    };
}
function reserveArrayBuffer(max) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++)
        createArrayBufferItem(index);
    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
}
reserveArrayBuffer(1000);
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing.$mobx);
}
exports.isObservableArray = isObservableArray;
var ObservableMapMarker = {};
var ObservableMap = (function () {
    function ObservableMap(initialData, enhancer, name) {
        if (enhancer === void 0) { enhancer = deepEnhancer; }
        if (name === void 0) { name = "ObservableMap@" + getNextId(); }
        this.enhancer = enhancer;
        this.name = name;
        this.$mobx = ObservableMapMarker;
        this._data = {};
        this._hasMap = {};
        this._keys = new ObservableArray(undefined, referenceEnhancer, this.name + ".keys()", true);
        this.interceptors = null;
        this.changeListeners = null;
        this.merge(initialData);
    }
    ObservableMap.prototype._has = function (key) {
        return typeof this._data[key] !== "undefined";
    };
    ObservableMap.prototype.has = function (key) {
        if (!this.isValidKey(key))
            return false;
        key = "" + key;
        if (this._hasMap[key])
            return this._hasMap[key].get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap.prototype.set = function (key, value) {
        this.assertValidKey(key);
        key = "" + key;
        var hasKey = this._has(key);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        }
        else {
            this._addValue(key, value);
        }
        return this;
    };
    ObservableMap.prototype.delete = function (key) {
        var _this = this;
        this.assertValidKey(key);
        key = "" + key;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "delete",
                object: this,
                oldValue: this._data[key].value,
                name: key
            } : null;
            if (notifySpy)
                spyReportStart(change);
            runInTransaction(function () {
                _this._keys.remove(key);
                _this._updateHasMapEntry(key, false);
                var observable = _this._data[key];
                observable.setNewValue(undefined);
                _this._data[key] = undefined;
            });
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
        var entry = this._hasMap[key];
        if (entry) {
            entry.setNewValue(value);
        }
        else {
            entry = this._hasMap[key] = new ObservableValue(value, referenceEnhancer, this.name + "." + key + "?", false);
        }
        return entry;
    };
    ObservableMap.prototype._updateValue = function (name, newValue) {
        var observable = this._data[name];
        newValue = observable.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "update",
                object: this,
                oldValue: observable.value,
                name: name, newValue: newValue
            } : null;
            if (notifySpy)
                spyReportStart(change);
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableMap.prototype._addValue = function (name, newValue) {
        var _this = this;
        runInTransaction(function () {
            var observable = _this._data[name] = new ObservableValue(newValue, _this.enhancer, _this.name + "." + name, false);
            newValue = observable.value;
            _this._updateHasMapEntry(name, true);
            _this._keys.push(name);
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            type: "add",
            object: this,
            name: name, newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableMap.prototype.get = function (key) {
        key = "" + key;
        if (this.has(key))
            return this._data[key].get();
        return undefined;
    };
    ObservableMap.prototype.keys = function () {
        return arrayAsIterator(this._keys.slice());
    };
    ObservableMap.prototype.values = function () {
        return arrayAsIterator(this._keys.map(this.get, this));
    };
    ObservableMap.prototype.entries = function () {
        var _this = this;
        return arrayAsIterator(this._keys.map(function (key) { return [key, _this.get(key)]; }));
    };
    ObservableMap.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.keys().forEach(function (key) { return callback.call(thisArg, _this.get(key), key, _this); });
    };
    ObservableMap.prototype.merge = function (other) {
        var _this = this;
        if (isObservableMap(other)) {
            other = other.toJS();
        }
        runInTransaction(function () {
            if (isPlainObject(other))
                Object.keys(other).forEach(function (key) { return _this.set(key, other[key]); });
            else if (Array.isArray(other))
                other.forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    return _this.set(key, value);
                });
            else if (isES6Map(other))
                other.forEach(function (value, key) { return _this.set(key, value); });
            else if (other !== null && other !== undefined)
                fail("Cannot initialize map from " + other);
        });
        return this;
    };
    ObservableMap.prototype.clear = function () {
        var _this = this;
        runInTransaction(function () {
            untracked(function () {
                _this.keys().forEach(_this.delete, _this);
            });
        });
    };
    ObservableMap.prototype.replace = function (values) {
        var _this = this;
        runInTransaction(function () {
            _this.clear();
            _this.merge(values);
        });
        return this;
    };
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.toJS = function () {
        var _this = this;
        var res = {};
        this.keys().forEach(function (key) { return res[key] = _this.get(key); });
        return res;
    };
    ObservableMap.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableMap.prototype.isValidKey = function (key) {
        if (key === null || key === undefined)
            return false;
        if (typeof key === "string" || typeof key === "number" || typeof key === "boolean")
            return true;
        return false;
    };
    ObservableMap.prototype.assertValidKey = function (key) {
        if (!this.isValidKey(key))
            throw new Error("[mobx.map] Invalid key: '" + key + "', only strings, numbers and booleans are accepted as key in observable maps.");
    };
    ObservableMap.prototype.toString = function () {
        var _this = this;
        return this.name + "[{ " + this.keys().map(function (key) { return key + ": " + ("" + _this.get(key)); }).join(", ") + " }]";
    };
    ObservableMap.prototype.observe = function (listener, fireImmediately) {
        invariant(fireImmediately !== true, getMessage("m033"));
        return registerListener(this, listener);
    };
    ObservableMap.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableMap;
}());
exports.ObservableMap = ObservableMap;
declareIterator(ObservableMap.prototype, function () {
    return this.entries();
});
function map(initialValues) {
    deprecated("`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead");
    return observable.map(initialValues);
}
exports.map = map;
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);
exports.isObservableMap = isObservableMap;
var ObservableObjectAdministration = (function () {
    function ObservableObjectAdministration(target, name) {
        this.target = target;
        this.name = name;
        this.values = {};
        this.changeListeners = null;
        this.interceptors = null;
    }
    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
    };
    ObservableObjectAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableObjectAdministration;
}());
function asObservableObject(target, name) {
    if (isObservableObject(target))
        return target.$mobx;
    invariant(Object.isExtensible(target), getMessage("m035"));
    if (!isPlainObject(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
    if (!name)
        name = "ObservableObject@" + getNextId();
    var adm = new ObservableObjectAdministration(target, name);
    addHiddenFinalProp(target, "$mobx", adm);
    return adm;
}
function defineObservablePropertyFromDescriptor(adm, propName, descriptor, defaultEnhancer) {
    if (adm.values[propName]) {
        invariant("value" in descriptor, "The property " + propName + " in " + adm.name + " is already observable, cannot redefine it as computed property");
        adm.target[propName] = descriptor.value;
        return;
    }
    if ("value" in descriptor) {
        if (isModifierDescriptor(descriptor.value)) {
            var modifierDescriptor = descriptor.value;
            defineObservableProperty(adm, propName, modifierDescriptor.initialValue, modifierDescriptor.enhancer);
        }
        else if (isAction(descriptor.value) && descriptor.value.autoBind === true) {
            defineBoundAction(adm.target, propName, descriptor.value.originalFn);
        }
        else if (isComputedValue(descriptor.value)) {
            defineComputedPropertyFromComputedValue(adm, propName, descriptor.value);
        }
        else {
            defineObservableProperty(adm, propName, descriptor.value, defaultEnhancer);
        }
    }
    else {
        defineComputedProperty(adm, propName, descriptor.get, descriptor.set, false, true);
    }
}
function defineObservableProperty(adm, propName, newValue, enhancer) {
    assertPropertyConfigurable(adm.target, propName);
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            object: adm.target,
            name: propName,
            type: "add",
            newValue: newValue
        });
        if (!change)
            return;
        newValue = change.newValue;
    }
    var observable = adm.values[propName] = new ObservableValue(newValue, enhancer, adm.name + "." + propName, false);
    newValue = observable.value;
    Object.defineProperty(adm.target, propName, generateObservablePropConfig(propName));
    notifyPropertyAddition(adm, adm.target, propName, newValue);
}
function defineComputedProperty(adm, propName, getter, setter, compareStructural, asInstanceProperty) {
    if (asInstanceProperty)
        assertPropertyConfigurable(adm.target, propName);
    adm.values[propName] = new ComputedValue(getter, adm.target, compareStructural, adm.name + "." + propName, setter);
    if (asInstanceProperty) {
        Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
    }
}
function defineComputedPropertyFromComputedValue(adm, propName, computedValue) {
    var name = adm.name + "." + propName;
    computedValue.name = name;
    if (!computedValue.scope)
        computedValue.scope = adm.target;
    adm.values[propName] = computedValue;
    Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
}
var observablePropertyConfigs = {};
var computedPropertyConfigs = {};
function generateObservablePropConfig(propName) {
    return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
        configurable: true,
        enumerable: true,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            setPropertyValue(this, propName, v);
        }
    });
}
function generateComputedPropConfig(propName) {
    return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
        configurable: true,
        enumerable: false,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            return this.$mobx.values[propName].set(v);
        }
    });
}
function setPropertyValue(instance, name, newValue) {
    var adm = instance.$mobx;
    var observable = adm.values[name];
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            type: "update",
            object: instance,
            name: name, newValue: newValue
        });
        if (!change)
            return;
        newValue = change.newValue;
    }
    newValue = observable.prepareNewValue(newValue);
    if (newValue !== UNCHANGED) {
        var notify = hasListeners(adm);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy ? {
            type: "update",
            object: instance,
            oldValue: observable.value,
            name: name, newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        observable.setNewValue(newValue);
        if (notify)
            notifyListeners(adm, change);
        if (notifySpy)
            spyReportEnd();
    }
}
function notifyPropertyAddition(adm, object, name, newValue) {
    var notify = hasListeners(adm);
    var notifySpy = isSpyEnabled();
    var change = notify || notifySpy ? {
        type: "add",
        object: object, name: name, newValue: newValue
    } : null;
    if (notifySpy)
        spyReportStart(change);
    if (notify)
        notifyListeners(adm, change);
    if (notifySpy)
        spyReportEnd();
}
var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        runLazyInitializers(thing);
        return isObservableObjectAdministration(thing.$mobx);
    }
    return false;
}
exports.isObservableObject = isObservableObject;
var UNCHANGED = {};
var ObservableValue = (function (_super) {
    __extends(ObservableValue, _super);
    function ObservableValue(value, enhancer, name, notifySpy) {
        if (name === void 0) { name = "ObservableValue@" + getNextId(); }
        if (notifySpy === void 0) { notifySpy = true; }
        var _this = _super.call(this, name) || this;
        _this.enhancer = enhancer;
        _this.hasUnreportedChange = false;
        _this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled()) {
            spyReport({ type: "create", object: _this, newValue: _this.value });
        }
        return _this;
    }
    ObservableValue.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            if (notifySpy) {
                spyReportStart({
                    type: "update",
                    object: this,
                    newValue: newValue, oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableValue.prototype.prepareNewValue = function (newValue) {
        checkIfStateModificationsAreAllowed(this);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, { object: this, type: "update", newValue: newValue });
            if (!change)
                return UNCHANGED;
            newValue = change.newValue;
        }
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.value !== newValue
            ? newValue
            : UNCHANGED;
    };
    ObservableValue.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this)) {
            notifyListeners(this, {
                type: "update",
                object: this,
                newValue: newValue,
                oldValue: oldValue
            });
        }
    };
    ObservableValue.prototype.get = function () {
        this.reportObserved();
        return this.value;
    };
    ObservableValue.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableValue.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately)
            listener({
                object: this,
                type: "update",
                newValue: this.value,
                oldValue: undefined
            });
        return registerListener(this, listener);
    };
    ObservableValue.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    ObservableValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    return ObservableValue;
}(BaseAtom));
ObservableValue.prototype[primitiveSymbol()] = ObservableValue.prototype.valueOf;
var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);
exports.isBoxedObservable = isObservableValue;
function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            invariant(property === undefined, getMessage("m036"));
            return thing.$mobx.atom;
        }
        if (isObservableMap(thing)) {
            var anyThing = thing;
            if (property === undefined)
                return getAtom(anyThing._keys);
            var observable_2 = anyThing._data[property] || anyThing._hasMap[property];
            invariant(!!observable_2, "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
            return observable_2;
        }
        runLazyInitializers(thing);
        if (isObservableObject(thing)) {
            if (!property)
                return fail("please specify a property");
            var observable_3 = thing.$mobx.values[property];
            invariant(!!observable_3, "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
            return observable_3;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction(thing.$mobx)) {
            return thing.$mobx;
        }
    }
    return fail("Cannot obtain atom from " + thing);
}
function getAdministration(thing, property) {
    invariant(thing, "Expecting some object");
    if (property !== undefined)
        return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
        return thing;
    if (isObservableMap(thing))
        return thing;
    runLazyInitializers(thing);
    if (thing.$mobx)
        return thing.$mobx;
    invariant(false, "Cannot obtain administration from " + thing);
}
function getDebugName(thing, property) {
    var named;
    if (property !== undefined)
        named = getAtom(thing, property);
    else if (isObservableObject(thing) || isObservableMap(thing))
        named = getAdministration(thing);
    else
        named = getAtom(thing);
    return named.name;
}
function createClassPropertyDecorator(onInitialize, get, set, enumerable, allowCustomArguments) {
    function classPropertyDecorator(target, key, descriptor, customArgs, argLen) {
        if (argLen === void 0) { argLen = 0; }
        invariant(allowCustomArguments || quacksLikeADecorator(arguments), "This function is a decorator, but it wasn't invoked like a decorator");
        if (!descriptor) {
            var newDescriptor = {
                enumerable: enumerable,
                configurable: true,
                get: function () {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true)
                        typescriptInitializeProperty(this, key, undefined, onInitialize, customArgs, descriptor);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) {
                        typescriptInitializeProperty(this, key, v, onInitialize, customArgs, descriptor);
                    }
                    else {
                        set.call(this, key, v);
                    }
                }
            };
            if (arguments.length < 3 || arguments.length === 5 && argLen < 3) {
                Object.defineProperty(target, key, newDescriptor);
            }
            return newDescriptor;
        }
        else {
            if (!hasOwnProperty(target, "__mobxLazyInitializers")) {
                addHiddenProp(target, "__mobxLazyInitializers", (target.__mobxLazyInitializers && target.__mobxLazyInitializers.slice()) || []);
            }
            var value_1 = descriptor.value, initializer_1 = descriptor.initializer;
            target.__mobxLazyInitializers.push(function (instance) {
                onInitialize(instance, key, (initializer_1 ? initializer_1.call(instance) : value_1), customArgs, descriptor);
            });
            return {
                enumerable: enumerable, configurable: true,
                get: function () {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    set.call(this, key, v);
                }
            };
        }
    }
    if (allowCustomArguments) {
        return function () {
            if (quacksLikeADecorator(arguments))
                return classPropertyDecorator.apply(null, arguments);
            var outerArgs = arguments;
            var argLen = arguments.length;
            return function (target, key, descriptor) { return classPropertyDecorator(target, key, descriptor, outerArgs, argLen); };
        };
    }
    return classPropertyDecorator;
}
function typescriptInitializeProperty(instance, key, v, onInitialize, customArgs, baseDescriptor) {
    if (!hasOwnProperty(instance, "__mobxInitializedProps"))
        addHiddenProp(instance, "__mobxInitializedProps", {});
    instance.__mobxInitializedProps[key] = true;
    onInitialize(instance, key, v, customArgs, baseDescriptor);
}
function runLazyInitializers(instance) {
    if (instance.__mobxDidRunLazyInitializers === true)
        return;
    if (instance.__mobxLazyInitializers) {
        addHiddenProp(instance, "__mobxDidRunLazyInitializers", true);
        instance.__mobxDidRunLazyInitializers && instance.__mobxLazyInitializers.forEach(function (initializer) { return initializer(instance); });
    }
}
function quacksLikeADecorator(args) {
    return (args.length === 2 || args.length === 3) && typeof args[1] === "string";
}
function iteratorSymbol() {
    return (typeof Symbol === "function" && Symbol.iterator) || "@@iterator";
}
var IS_ITERATING_MARKER = "__$$iterating";
function arrayAsIterator(array) {
    invariant(array[IS_ITERATING_MARKER] !== true, "Illegal state: cannot recycle array as iterator");
    addHiddenFinalProp(array, IS_ITERATING_MARKER, true);
    var idx = -1;
    addHiddenFinalProp(array, "next", function next() {
        idx++;
        return {
            done: idx >= this.length,
            value: idx < this.length ? this[idx] : undefined
        };
    });
    return array;
}
function declareIterator(prototType, iteratorFactory) {
    addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
}
var messages = {
    "m001": "It is not allowed to assign new values to @action fields",
    "m002": "`runInAction` expects a function",
    "m003": "`runInAction` expects a function without arguments",
    "m004": "autorun expects a function",
    "m005": "Warning: attempted to pass an action to autorun. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m006": "Warning: attempted to pass an action to autorunAsync. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m007": "reaction only accepts 2 or 3 arguments. If migrating from MobX 2, please provide an options object",
    "m008": "wrapping reaction expression in `asReference` is no longer supported, use options object instead",
    "m009": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'. It looks like it was used on a property.",
    "m010": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'",
    "m011": "First argument to `computed` should be an expression. If using computed as decorator, don't pass it arguments",
    "m012": "computed takes one or two arguments if used as function",
    "m013": "[mobx.expr] 'expr' should only be used inside other reactive functions.",
    "m014": "extendObservable expected 2 or more arguments",
    "m015": "extendObservable expects an object as first argument",
    "m016": "extendObservable should not be used on maps, use map.merge instead",
    "m017": "all arguments of extendObservable should be objects",
    "m018": "extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540",
    "m019": "[mobx.isObservable] isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.",
    "m020": "modifiers can only be used for individual object properties",
    "m021": "observable expects zero or one arguments",
    "m022": "@observable can not be used on getters, use @computed instead",
    "m023": "Using `transaction` is deprecated, use `runInAction` or `(@)action` instead.",
    "m024": "whyRun() can only be used if a derivation is active, or by passing an computed value / reaction explicitly. If you invoked whyRun from inside a computation; the computation is currently suspended but re-evaluating because somebody requested its value.",
    "m025": "whyRun can only be used on reactions and computed values",
    "m026": "`action` can only be invoked on functions",
    "m028": "It is not allowed to set `useStrict` when a derivation is running",
    "m029": "INTERNAL ERROR only onBecomeUnobserved shouldn't be called twice in a row",
    "m030a": "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: ",
    "m030b": "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ",
    "m031": "Computed values are not allowed to not cause side effects by changing observables that are already being observed. Tried to modify: ",
    "m032": "* This computation is suspended (not in use by any reaction) and won't run automatically.\n	Didn't expect this computation to be suspended at this point?\n	  1. Make sure this computation is used by a reaction (reaction, autorun, observer).\n	  2. Check whether you are using this computation synchronously (in the same stack as they reaction that needs it).",
    "m033": "`observe` doesn't support the fire immediately property for observable maps.",
    "m034": "`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead",
    "m035": "Cannot make the designated object observable; it is not extensible",
    "m036": "It is not possible to get index atoms from arrays",
    "m037": "Hi there! I'm sorry you have just run into an exception.\nIf your debugger ends up here, know that some reaction (like the render() of an observer component, autorun or reaction)\nthrew an exception and that mobx caught it, to avoid that it brings the rest of your application down.\nThe original cause of the exception (the code that caused this reaction to run (again)), is still in the stack.\n\nHowever, more interesting is the actual stack trace of the error itself.\nHopefully the error is an instanceof Error, because in that case you can inspect the original stack of the error from where it was thrown.\nSee `error.stack` property, or press the very subtle \"(...)\" link you see near the console.error message that probably brought you here.\nThat stack is more interesting than the stack of this console.error itself.\n\nIf the exception you see is an exception you created yourself, make sure to use `throw new Error(\"Oops\")` instead of `throw \"Oops\"`,\nbecause the javascript environment will only preserve the original stack trace in the first form.\n\nYou can also make sure the debugger pauses the next time this very same exception is thrown by enabling \"Pause on caught exception\".\n(Note that it might pause on many other, unrelated exception as well).\n\nIf that all doesn't help you out, feel free to open an issue https://github.com/mobxjs/mobx/issues!\n",
    "m038": "Missing items in this list?\n    1. Check whether all used values are properly marked as observable (use isObservable to verify)\n    2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n"
};
function getMessage(id) {
    return messages[id];
}
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
function getGlobal() {
    return global;
}
function getNextId() {
    return ++globalState.mobxGuid;
}
function fail(message, thing) {
    invariant(false, message, thing);
    throw "X";
}
function invariant(check, message, thing) {
    if (!check)
        throw new Error("[mobx] Invariant failed: " + message + (thing ? " in '" + thing + "'" : ""));
}
var deprecatedMessages = [];
function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1)
        return false;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
    return true;
}
function once(func) {
    var invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop = function () { };
function unique(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function joinStrings(things, limit, separator) {
    if (limit === void 0) { limit = 100; }
    if (separator === void 0) { separator = " - "; }
    if (!things)
        return "";
    var sliced = things.slice(0, limit);
    return "" + sliced.join(separator) + (things.length > limit ? " (... and " + (things.length - limit) + "more)" : "");
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject(value) {
    if (value === null || typeof value !== "object")
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function objectAssign() {
    var res = arguments[0];
    for (var i = 1, l = arguments.length; i < l; i++) {
        var source = arguments[i];
        for (var key in source)
            if (hasOwnProperty(source, key)) {
                res[key] = source[key];
            }
    }
    return res;
}
function valueDidChange(compareStructural, oldValue, newValue) {
    if (typeof oldValue === 'number' && isNaN(oldValue)) {
        return typeof newValue !== 'number' || !isNaN(newValue);
    }
    return compareStructural
        ? !deepEqual(oldValue, newValue)
        : oldValue !== newValue;
}
var prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(object, propName) {
    return prototypeHasOwnProperty.call(object, propName);
}
function makeNonEnumerable(object, propNames) {
    for (var i = 0; i < propNames.length; i++) {
        addHiddenProp(object, propNames[i], object[propNames[i]]);
    }
}
function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable(object, prop) {
    invariant(isPropertyConfigurable(object, prop), "Cannot make property '" + prop + "' observable, it is not configurable and writable in the target object");
}
function getEnumerableKeys(obj) {
    var res = [];
    for (var key in obj)
        res.push(key);
    return res;
}
function deepEqual(a, b) {
    if (a === null && b === null)
        return true;
    if (a === undefined && b === undefined)
        return true;
    if (typeof a !== "object")
        return a === b;
    var aIsArray = isArrayLike(a);
    var aIsMap = isMapLike(a);
    if (aIsArray !== isArrayLike(b)) {
        return false;
    }
    else if (aIsMap !== isMapLike(b)) {
        return false;
    }
    else if (aIsArray) {
        if (a.length !== b.length)
            return false;
        for (var i = a.length - 1; i >= 0; i--)
            if (!deepEqual(a[i], b[i]))
                return false;
        return true;
    }
    else if (aIsMap) {
        if (a.size !== b.size)
            return false;
        var equals_1 = true;
        a.forEach(function (value, key) {
            equals_1 = equals_1 && deepEqual(b.get(key), value);
        });
        return equals_1;
    }
    else if (typeof a === "object" && typeof b === "object") {
        if (a === null || b === null)
            return false;
        if (isMapLike(a) && isMapLike(b)) {
            if (a.size !== b.size)
                return false;
            return deepEqual(observable.shallowMap(a).entries(), observable.shallowMap(b).entries());
        }
        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length)
            return false;
        for (var prop in a) {
            if (!(prop in b))
                return false;
            if (!deepEqual(a[prop], b[prop]))
                return false;
        }
        return true;
    }
    return false;
}
function createInstanceofPredicate(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
exports.isArrayLike = isArrayLike;
function isMapLike(x) {
    return isES6Map(x) || isObservableMap(x);
}
function isES6Map(thing) {
    if (getGlobal().Map !== undefined && thing instanceof getGlobal().Map)
        return true;
    return false;
}
function primitiveSymbol() {
    return (typeof Symbol === "function" && Symbol.toPrimitive) || "@@toPrimitive";
}
function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? ("" + value) : value;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],41:[function(require,module,exports){
var SplitPane = require('./lib/SplitPane');

module.exports = SplitPane;

},{"./lib/SplitPane":44}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

var Pane = function (_React$Component) {
    _inherits(Pane, _React$Component);

    function Pane(props) {
        _classCallCheck(this, Pane);

        var _this = _possibleConstructorReturn(this, (Pane.__proto__ || Object.getPrototypeOf(Pane)).call(this, props));

        _this.state = { size: _this.props.size };
        return _this;
    }

    _createClass(Pane, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                prefixer = _props.prefixer,
                split = _props.split,
                styleProps = _props.style;
            var size = this.state.size;

            var classes = ['Pane', split, className];

            var style = _extends({}, styleProps || {}, {
                flex: 1,
                position: 'relative',
                outline: 'none'
            });

            if (size !== undefined) {
                if (split === 'vertical') {
                    style.width = size;
                } else {
                    style.height = size;
                    style.display = 'flex';
                }
                style.flex = 'none';
            }

            return _react2.default.createElement('div', { className: classes.join(' '), style: prefixer.prefix(style) }, children);
        }
    }]);

    return Pane;
}(_react2.default.Component);

Pane.propTypes = {
    className: _react2.default.PropTypes.string.isRequired,
    children: _react2.default.PropTypes.node.isRequired,
    prefixer: _react2.default.PropTypes.instanceOf(_inlineStylePrefixer2.default).isRequired,
    size: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    split: _react2.default.PropTypes.oneOf(['vertical', 'horizontal']),
    style: _reactStyleProptype2.default
};

Pane.defaultProps = {
    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT })
};

exports.default = Pane;
module.exports = exports['default'];

},{"inline-style-prefixer":7,"react":"react","react-style-proptype":46}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

var Resizer = function (_React$Component) {
    _inherits(Resizer, _React$Component);

    function Resizer() {
        _classCallCheck(this, Resizer);

        return _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments));
    }

    _createClass(Resizer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                _onClick = _props.onClick,
                _onDoubleClick = _props.onDoubleClick,
                _onMouseDown = _props.onMouseDown,
                _onTouchEnd = _props.onTouchEnd,
                _onTouchStart = _props.onTouchStart,
                prefixer = _props.prefixer,
                resizerClassName = _props.resizerClassName,
                split = _props.split,
                style = _props.style;

            var classes = [resizerClassName, split, className];

            return _react2.default.createElement('span', {
                className: classes.join(' '),
                style: prefixer.prefix(style) || {},
                onMouseDown: function onMouseDown(event) {
                    return _onMouseDown(event);
                },
                onTouchStart: function onTouchStart(event) {
                    event.preventDefault();
                    _onTouchStart(event);
                },
                onTouchEnd: function onTouchEnd(event) {
                    event.preventDefault();
                    _onTouchEnd(event);
                }
                // eslint-disable-next-line no-static-element-interactions
                , onClick: function onClick(event) {
                    if (_onClick) {
                        event.preventDefault();
                        _onClick(event);
                    }
                },
                onDoubleClick: function onDoubleClick(event) {
                    if (_onDoubleClick) {
                        event.preventDefault();
                        _onDoubleClick(event);
                    }
                }
            });
        }
    }]);

    return Resizer;
}(_react2.default.Component);

Resizer.propTypes = {
    className: _react2.default.PropTypes.string.isRequired,
    onClick: _react2.default.PropTypes.func,
    onDoubleClick: _react2.default.PropTypes.func,
    onMouseDown: _react2.default.PropTypes.func.isRequired,
    onTouchStart: _react2.default.PropTypes.func.isRequired,
    onTouchEnd: _react2.default.PropTypes.func.isRequired,
    prefixer: _react2.default.PropTypes.instanceOf(_inlineStylePrefixer2.default).isRequired,
    split: _react2.default.PropTypes.oneOf(['vertical', 'horizontal']),
    style: _reactStyleProptype2.default,
    resizerClassName: _react2.default.PropTypes.string.isRequired
};

Resizer.defaultProps = {
    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
    resizerClassName: 'Resizer'
};

exports.default = Resizer;
module.exports = exports['default'];

},{"inline-style-prefixer":7,"react":"react","react-style-proptype":46}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

var _Pane = require('./Pane');

var _Pane2 = _interopRequireDefault(_Pane);

var _Resizer = require('./Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

function unFocus(document, window) {
    if (document.selection) {
        document.selection.empty();
    } else {
        try {
            window.getSelection().removeAllRanges();
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
}

var SplitPane = function (_React$Component) {
    _inherits(SplitPane, _React$Component);

    function SplitPane() {
        _classCallCheck(this, SplitPane);

        var _this = _possibleConstructorReturn(this, (SplitPane.__proto__ || Object.getPrototypeOf(SplitPane)).call(this));

        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onMouseMove = _this.onMouseMove.bind(_this);
        _this.onTouchMove = _this.onTouchMove.bind(_this);
        _this.onMouseUp = _this.onMouseUp.bind(_this);

        _this.state = {
            active: false,
            resized: false
        };
        return _this;
    }

    _createClass(SplitPane, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setSize(this.props, this.state);
            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('touchmove', this.onTouchMove);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setSize(props, this.state);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mouseup', this.onMouseUp);
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('touchmove', this.onTouchMove);
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            var eventWithTouches = _extends({}, event, { touches: [{ clientX: event.clientX, clientY: event.clientY }] });
            this.onTouchStart(eventWithTouches);
        }
    }, {
        key: 'onTouchStart',
        value: function onTouchStart(event) {
            var _props = this.props,
                allowResize = _props.allowResize,
                onDragStarted = _props.onDragStarted,
                split = _props.split;

            if (allowResize) {
                unFocus(document, window);
                var position = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
                if (typeof onDragStarted === 'function') {
                    onDragStarted();
                }
                this.setState({
                    active: true,
                    position: position
                });
            }
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            var eventWithTouches = _extends({}, event, { touches: [{ clientX: event.clientX, clientY: event.clientY }] });
            this.onTouchMove(eventWithTouches);
        }
    }, {
        key: 'onTouchMove',
        value: function onTouchMove(event) {
            var _props2 = this.props,
                allowResize = _props2.allowResize,
                maxSize = _props2.maxSize,
                minSize = _props2.minSize,
                onChange = _props2.onChange,
                split = _props2.split;
            var _state = this.state,
                active = _state.active,
                position = _state.position;

            if (allowResize && active) {
                unFocus(document, window);
                var isPrimaryFirst = this.props.primary === 'first';
                var ref = isPrimaryFirst ? this.pane1 : this.pane2;
                if (ref) {
                    var node = _reactDom2.default.findDOMNode(ref);

                    if (node.getBoundingClientRect) {
                        var width = node.getBoundingClientRect().width;
                        var height = node.getBoundingClientRect().height;
                        var current = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
                        var size = split === 'vertical' ? width : height;
                        var newPosition = isPrimaryFirst ? position - current : current - position;

                        var newMaxSize = maxSize;
                        if (maxSize !== undefined && maxSize <= 0) {
                            var splPane = this.splitPane;
                            if (split === 'vertical') {
                                newMaxSize = splPane.getBoundingClientRect().width + maxSize;
                            } else {
                                newMaxSize = splPane.getBoundingClientRect().height + maxSize;
                            }
                        }

                        var newSize = size - newPosition;

                        if (newSize < minSize) {
                            newSize = minSize;
                        } else if (maxSize !== undefined && newSize > newMaxSize) {
                            newSize = newMaxSize;
                        } else {
                            this.setState({
                                position: current,
                                resized: true
                            });
                        }

                        if (onChange) onChange(newSize);
                        this.setState({ draggedSize: newSize });
                        ref.setState({ size: newSize });
                    }
                }
            }
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            var _props3 = this.props,
                allowResize = _props3.allowResize,
                onDragFinished = _props3.onDragFinished;
            var _state2 = this.state,
                active = _state2.active,
                draggedSize = _state2.draggedSize;

            if (allowResize && active) {
                if (typeof onDragFinished === 'function') {
                    onDragFinished(draggedSize);
                }
                this.setState({ active: false });
            }
        }
    }, {
        key: 'setSize',
        value: function setSize(props, state) {
            var primary = this.props.primary;

            var ref = primary === 'first' ? this.pane1 : this.pane2;
            var newSize = void 0;
            if (ref) {
                newSize = props.size || state && state.draggedSize || props.defaultSize || props.minSize;
                ref.setState({
                    size: newSize
                });
                if (props.size !== state.draggedSize) {
                    this.setState({
                        draggedSize: newSize
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props4 = this.props,
                allowResize = _props4.allowResize,
                children = _props4.children,
                className = _props4.className,
                defaultSize = _props4.defaultSize,
                minSize = _props4.minSize,
                onResizerClick = _props4.onResizerClick,
                onResizerDoubleClick = _props4.onResizerDoubleClick,
                paneStyle = _props4.paneStyle,
                pane1StyleProps = _props4.pane1Style,
                pane2StyleProps = _props4.pane2Style,
                primary = _props4.primary,
                prefixer = _props4.prefixer,
                resizerClassName = _props4.resizerClassName,
                resizerStyle = _props4.resizerStyle,
                size = _props4.size,
                split = _props4.split,
                styleProps = _props4.style;

            var disabledClass = allowResize ? '' : 'disabled';

            var style = _extends({}, styleProps || {}, {
                display: 'flex',
                flex: 1,
                height: '100%',
                position: 'absolute',
                outline: 'none',
                overflow: 'hidden',
                MozUserSelect: 'text',
                WebkitUserSelect: 'text',
                msUserSelect: 'text',
                userSelect: 'text'
            });

            if (split === 'vertical') {
                _extends(style, {
                    flexDirection: 'row',
                    left: 0,
                    right: 0
                });
            } else {
                _extends(style, {
                    bottom: 0,
                    flexDirection: 'column',
                    minHeight: '100%',
                    top: 0,
                    width: '100%'
                });
            }

            var classes = ['SplitPane', className, split, disabledClass];
            var pane1Style = prefixer.prefix(_extends({}, paneStyle || {}, pane1StyleProps || {}));
            var pane2Style = prefixer.prefix(_extends({}, paneStyle || {}, pane2StyleProps || {}));

            return _react2.default.createElement('div', {
                className: classes.join(' '),
                ref: function ref(node) {
                    _this2.splitPane = node;
                },
                style: prefixer.prefix(style)
            }, _react2.default.createElement(_Pane2.default, {
                className: 'Pane1',
                key: 'pane1',
                ref: function ref(node) {
                    _this2.pane1 = node;
                },
                size: primary === 'first' ? size || defaultSize || minSize : undefined,
                split: split,
                style: pane1Style
            }, children[0]), _react2.default.createElement(_Resizer2.default, {
                className: disabledClass,
                onClick: onResizerClick,
                onDoubleClick: onResizerDoubleClick,
                onMouseDown: this.onMouseDown,
                onTouchStart: this.onTouchStart,
                onTouchEnd: this.onMouseUp,
                key: 'resizer',
                ref: function ref(node) {
                    _this2.resizer = node;
                },
                resizerClassName: resizerClassName,
                split: split,
                style: resizerStyle || {}
            }), _react2.default.createElement(_Pane2.default, {
                className: 'Pane2',
                key: 'pane2',
                ref: function ref(node) {
                    _this2.pane2 = node;
                },
                size: primary === 'second' ? size || defaultSize || minSize : undefined,
                split: split,
                style: pane2Style
            }, children[1]));
        }
    }]);

    return SplitPane;
}(_react2.default.Component);

SplitPane.propTypes = {
    allowResize: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node).isRequired,
    className: _react2.default.PropTypes.string,
    primary: _react2.default.PropTypes.oneOf(['first', 'second']),
    minSize: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    maxSize: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    // eslint-disable-next-line react/no-unused-prop-types
    defaultSize: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    size: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    split: _react2.default.PropTypes.oneOf(['vertical', 'horizontal']),
    onDragStarted: _react2.default.PropTypes.func,
    onDragFinished: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func,
    onResizerClick: _react2.default.PropTypes.func,
    onResizerDoubleClick: _react2.default.PropTypes.func,
    prefixer: _react2.default.PropTypes.instanceOf(_inlineStylePrefixer2.default).isRequired,
    style: _reactStyleProptype2.default,
    resizerStyle: _reactStyleProptype2.default,
    paneStyle: _reactStyleProptype2.default,
    pane1Style: _reactStyleProptype2.default,
    pane2Style: _reactStyleProptype2.default,
    resizerClassName: _react2.default.PropTypes.string
};

SplitPane.defaultProps = {
    allowResize: true,
    minSize: 50,
    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
    primary: 'first',
    split: 'vertical'
};

exports.default = SplitPane;
module.exports = exports['default'];

},{"./Pane":42,"./Resizer":43,"inline-style-prefixer":7,"react":"react","react-dom":"react-dom","react-style-proptype":46}],45:[function(require,module,exports){
// GENERATED DO NOT EDIT
module.exports = [
  "alignContent",
  "MozAlignContent",
  "WebkitAlignContent",
  "MSAlignContent",
  "OAlignContent",
  "alignItems",
  "MozAlignItems",
  "WebkitAlignItems",
  "MSAlignItems",
  "OAlignItems",
  "alignSelf",
  "MozAlignSelf",
  "WebkitAlignSelf",
  "MSAlignSelf",
  "OAlignSelf",
  "all",
  "MozAll",
  "WebkitAll",
  "MSAll",
  "OAll",
  "animation",
  "MozAnimation",
  "WebkitAnimation",
  "MSAnimation",
  "OAnimation",
  "animationDelay",
  "MozAnimationDelay",
  "WebkitAnimationDelay",
  "MSAnimationDelay",
  "OAnimationDelay",
  "animationDirection",
  "MozAnimationDirection",
  "WebkitAnimationDirection",
  "MSAnimationDirection",
  "OAnimationDirection",
  "animationDuration",
  "MozAnimationDuration",
  "WebkitAnimationDuration",
  "MSAnimationDuration",
  "OAnimationDuration",
  "animationFillMode",
  "MozAnimationFillMode",
  "WebkitAnimationFillMode",
  "MSAnimationFillMode",
  "OAnimationFillMode",
  "animationIterationCount",
  "MozAnimationIterationCount",
  "WebkitAnimationIterationCount",
  "MSAnimationIterationCount",
  "OAnimationIterationCount",
  "animationName",
  "MozAnimationName",
  "WebkitAnimationName",
  "MSAnimationName",
  "OAnimationName",
  "animationPlayState",
  "MozAnimationPlayState",
  "WebkitAnimationPlayState",
  "MSAnimationPlayState",
  "OAnimationPlayState",
  "animationTimingFunction",
  "MozAnimationTimingFunction",
  "WebkitAnimationTimingFunction",
  "MSAnimationTimingFunction",
  "OAnimationTimingFunction",
  "backfaceVisibility",
  "MozBackfaceVisibility",
  "WebkitBackfaceVisibility",
  "MSBackfaceVisibility",
  "OBackfaceVisibility",
  "background",
  "MozBackground",
  "WebkitBackground",
  "MSBackground",
  "OBackground",
  "backgroundAttachment",
  "MozBackgroundAttachment",
  "WebkitBackgroundAttachment",
  "MSBackgroundAttachment",
  "OBackgroundAttachment",
  "backgroundBlendMode",
  "MozBackgroundBlendMode",
  "WebkitBackgroundBlendMode",
  "MSBackgroundBlendMode",
  "OBackgroundBlendMode",
  "backgroundClip",
  "MozBackgroundClip",
  "WebkitBackgroundClip",
  "MSBackgroundClip",
  "OBackgroundClip",
  "backgroundColor",
  "MozBackgroundColor",
  "WebkitBackgroundColor",
  "MSBackgroundColor",
  "OBackgroundColor",
  "backgroundImage",
  "MozBackgroundImage",
  "WebkitBackgroundImage",
  "MSBackgroundImage",
  "OBackgroundImage",
  "backgroundOrigin",
  "MozBackgroundOrigin",
  "WebkitBackgroundOrigin",
  "MSBackgroundOrigin",
  "OBackgroundOrigin",
  "backgroundPosition",
  "MozBackgroundPosition",
  "WebkitBackgroundPosition",
  "MSBackgroundPosition",
  "OBackgroundPosition",
  "backgroundRepeat",
  "MozBackgroundRepeat",
  "WebkitBackgroundRepeat",
  "MSBackgroundRepeat",
  "OBackgroundRepeat",
  "backgroundSize",
  "MozBackgroundSize",
  "WebkitBackgroundSize",
  "MSBackgroundSize",
  "OBackgroundSize",
  "blockSize",
  "MozBlockSize",
  "WebkitBlockSize",
  "MSBlockSize",
  "OBlockSize",
  "border",
  "MozBorder",
  "WebkitBorder",
  "MSBorder",
  "OBorder",
  "borderBlockEnd",
  "MozBorderBlockEnd",
  "WebkitBorderBlockEnd",
  "MSBorderBlockEnd",
  "OBorderBlockEnd",
  "borderBlockEndColor",
  "MozBorderBlockEndColor",
  "WebkitBorderBlockEndColor",
  "MSBorderBlockEndColor",
  "OBorderBlockEndColor",
  "borderBlockEndStyle",
  "MozBorderBlockEndStyle",
  "WebkitBorderBlockEndStyle",
  "MSBorderBlockEndStyle",
  "OBorderBlockEndStyle",
  "borderBlockEndWidth",
  "MozBorderBlockEndWidth",
  "WebkitBorderBlockEndWidth",
  "MSBorderBlockEndWidth",
  "OBorderBlockEndWidth",
  "borderBlockStart",
  "MozBorderBlockStart",
  "WebkitBorderBlockStart",
  "MSBorderBlockStart",
  "OBorderBlockStart",
  "borderBlockStartColor",
  "MozBorderBlockStartColor",
  "WebkitBorderBlockStartColor",
  "MSBorderBlockStartColor",
  "OBorderBlockStartColor",
  "borderBlockStartStyle",
  "MozBorderBlockStartStyle",
  "WebkitBorderBlockStartStyle",
  "MSBorderBlockStartStyle",
  "OBorderBlockStartStyle",
  "borderBlockStartWidth",
  "MozBorderBlockStartWidth",
  "WebkitBorderBlockStartWidth",
  "MSBorderBlockStartWidth",
  "OBorderBlockStartWidth",
  "borderBottom",
  "MozBorderBottom",
  "WebkitBorderBottom",
  "MSBorderBottom",
  "OBorderBottom",
  "borderBottomColor",
  "MozBorderBottomColor",
  "WebkitBorderBottomColor",
  "MSBorderBottomColor",
  "OBorderBottomColor",
  "borderBottomLeftRadius",
  "MozBorderBottomLeftRadius",
  "WebkitBorderBottomLeftRadius",
  "MSBorderBottomLeftRadius",
  "OBorderBottomLeftRadius",
  "borderBottomRightRadius",
  "MozBorderBottomRightRadius",
  "WebkitBorderBottomRightRadius",
  "MSBorderBottomRightRadius",
  "OBorderBottomRightRadius",
  "borderBottomStyle",
  "MozBorderBottomStyle",
  "WebkitBorderBottomStyle",
  "MSBorderBottomStyle",
  "OBorderBottomStyle",
  "borderBottomWidth",
  "MozBorderBottomWidth",
  "WebkitBorderBottomWidth",
  "MSBorderBottomWidth",
  "OBorderBottomWidth",
  "borderCollapse",
  "MozBorderCollapse",
  "WebkitBorderCollapse",
  "MSBorderCollapse",
  "OBorderCollapse",
  "borderColor",
  "MozBorderColor",
  "WebkitBorderColor",
  "MSBorderColor",
  "OBorderColor",
  "borderImage",
  "MozBorderImage",
  "WebkitBorderImage",
  "MSBorderImage",
  "OBorderImage",
  "borderImageOutset",
  "MozBorderImageOutset",
  "WebkitBorderImageOutset",
  "MSBorderImageOutset",
  "OBorderImageOutset",
  "borderImageRepeat",
  "MozBorderImageRepeat",
  "WebkitBorderImageRepeat",
  "MSBorderImageRepeat",
  "OBorderImageRepeat",
  "borderImageSlice",
  "MozBorderImageSlice",
  "WebkitBorderImageSlice",
  "MSBorderImageSlice",
  "OBorderImageSlice",
  "borderImageSource",
  "MozBorderImageSource",
  "WebkitBorderImageSource",
  "MSBorderImageSource",
  "OBorderImageSource",
  "borderImageWidth",
  "MozBorderImageWidth",
  "WebkitBorderImageWidth",
  "MSBorderImageWidth",
  "OBorderImageWidth",
  "borderInlineEnd",
  "MozBorderInlineEnd",
  "WebkitBorderInlineEnd",
  "MSBorderInlineEnd",
  "OBorderInlineEnd",
  "borderInlineEndColor",
  "MozBorderInlineEndColor",
  "WebkitBorderInlineEndColor",
  "MSBorderInlineEndColor",
  "OBorderInlineEndColor",
  "borderInlineEndStyle",
  "MozBorderInlineEndStyle",
  "WebkitBorderInlineEndStyle",
  "MSBorderInlineEndStyle",
  "OBorderInlineEndStyle",
  "borderInlineEndWidth",
  "MozBorderInlineEndWidth",
  "WebkitBorderInlineEndWidth",
  "MSBorderInlineEndWidth",
  "OBorderInlineEndWidth",
  "borderInlineStart",
  "MozBorderInlineStart",
  "WebkitBorderInlineStart",
  "MSBorderInlineStart",
  "OBorderInlineStart",
  "borderInlineStartColor",
  "MozBorderInlineStartColor",
  "WebkitBorderInlineStartColor",
  "MSBorderInlineStartColor",
  "OBorderInlineStartColor",
  "borderInlineStartStyle",
  "MozBorderInlineStartStyle",
  "WebkitBorderInlineStartStyle",
  "MSBorderInlineStartStyle",
  "OBorderInlineStartStyle",
  "borderInlineStartWidth",
  "MozBorderInlineStartWidth",
  "WebkitBorderInlineStartWidth",
  "MSBorderInlineStartWidth",
  "OBorderInlineStartWidth",
  "borderLeft",
  "MozBorderLeft",
  "WebkitBorderLeft",
  "MSBorderLeft",
  "OBorderLeft",
  "borderLeftColor",
  "MozBorderLeftColor",
  "WebkitBorderLeftColor",
  "MSBorderLeftColor",
  "OBorderLeftColor",
  "borderLeftStyle",
  "MozBorderLeftStyle",
  "WebkitBorderLeftStyle",
  "MSBorderLeftStyle",
  "OBorderLeftStyle",
  "borderLeftWidth",
  "MozBorderLeftWidth",
  "WebkitBorderLeftWidth",
  "MSBorderLeftWidth",
  "OBorderLeftWidth",
  "borderRadius",
  "MozBorderRadius",
  "WebkitBorderRadius",
  "MSBorderRadius",
  "OBorderRadius",
  "borderRight",
  "MozBorderRight",
  "WebkitBorderRight",
  "MSBorderRight",
  "OBorderRight",
  "borderRightColor",
  "MozBorderRightColor",
  "WebkitBorderRightColor",
  "MSBorderRightColor",
  "OBorderRightColor",
  "borderRightStyle",
  "MozBorderRightStyle",
  "WebkitBorderRightStyle",
  "MSBorderRightStyle",
  "OBorderRightStyle",
  "borderRightWidth",
  "MozBorderRightWidth",
  "WebkitBorderRightWidth",
  "MSBorderRightWidth",
  "OBorderRightWidth",
  "borderSpacing",
  "MozBorderSpacing",
  "WebkitBorderSpacing",
  "MSBorderSpacing",
  "OBorderSpacing",
  "borderStyle",
  "MozBorderStyle",
  "WebkitBorderStyle",
  "MSBorderStyle",
  "OBorderStyle",
  "borderTop",
  "MozBorderTop",
  "WebkitBorderTop",
  "MSBorderTop",
  "OBorderTop",
  "borderTopColor",
  "MozBorderTopColor",
  "WebkitBorderTopColor",
  "MSBorderTopColor",
  "OBorderTopColor",
  "borderTopLeftRadius",
  "MozBorderTopLeftRadius",
  "WebkitBorderTopLeftRadius",
  "MSBorderTopLeftRadius",
  "OBorderTopLeftRadius",
  "borderTopRightRadius",
  "MozBorderTopRightRadius",
  "WebkitBorderTopRightRadius",
  "MSBorderTopRightRadius",
  "OBorderTopRightRadius",
  "borderTopStyle",
  "MozBorderTopStyle",
  "WebkitBorderTopStyle",
  "MSBorderTopStyle",
  "OBorderTopStyle",
  "borderTopWidth",
  "MozBorderTopWidth",
  "WebkitBorderTopWidth",
  "MSBorderTopWidth",
  "OBorderTopWidth",
  "borderWidth",
  "MozBorderWidth",
  "WebkitBorderWidth",
  "MSBorderWidth",
  "OBorderWidth",
  "bottom",
  "MozBottom",
  "WebkitBottom",
  "MSBottom",
  "OBottom",
  "boxDecorationBreak",
  "MozBoxDecorationBreak",
  "WebkitBoxDecorationBreak",
  "MSBoxDecorationBreak",
  "OBoxDecorationBreak",
  "boxShadow",
  "MozBoxShadow",
  "WebkitBoxShadow",
  "MSBoxShadow",
  "OBoxShadow",
  "boxSizing",
  "MozBoxSizing",
  "WebkitBoxSizing",
  "MSBoxSizing",
  "OBoxSizing",
  "breakAfter",
  "MozBreakAfter",
  "WebkitBreakAfter",
  "MSBreakAfter",
  "OBreakAfter",
  "breakBefore",
  "MozBreakBefore",
  "WebkitBreakBefore",
  "MSBreakBefore",
  "OBreakBefore",
  "breakInside",
  "MozBreakInside",
  "WebkitBreakInside",
  "MSBreakInside",
  "OBreakInside",
  "captionSide",
  "MozCaptionSide",
  "WebkitCaptionSide",
  "MSCaptionSide",
  "OCaptionSide",
  "caretColor",
  "MozCaretColor",
  "WebkitCaretColor",
  "MSCaretColor",
  "OCaretColor",
  "ch",
  "MozCh",
  "WebkitCh",
  "MSCh",
  "OCh",
  "clear",
  "MozClear",
  "WebkitClear",
  "MSClear",
  "OClear",
  "clip",
  "MozClip",
  "WebkitClip",
  "MSClip",
  "OClip",
  "clipPath",
  "MozClipPath",
  "WebkitClipPath",
  "MSClipPath",
  "OClipPath",
  "cm",
  "MozCm",
  "WebkitCm",
  "MSCm",
  "OCm",
  "color",
  "MozColor",
  "WebkitColor",
  "MSColor",
  "OColor",
  "columnCount",
  "MozColumnCount",
  "WebkitColumnCount",
  "MSColumnCount",
  "OColumnCount",
  "columnFill",
  "MozColumnFill",
  "WebkitColumnFill",
  "MSColumnFill",
  "OColumnFill",
  "columnGap",
  "MozColumnGap",
  "WebkitColumnGap",
  "MSColumnGap",
  "OColumnGap",
  "columnRule",
  "MozColumnRule",
  "WebkitColumnRule",
  "MSColumnRule",
  "OColumnRule",
  "columnRuleColor",
  "MozColumnRuleColor",
  "WebkitColumnRuleColor",
  "MSColumnRuleColor",
  "OColumnRuleColor",
  "columnRuleStyle",
  "MozColumnRuleStyle",
  "WebkitColumnRuleStyle",
  "MSColumnRuleStyle",
  "OColumnRuleStyle",
  "columnRuleWidth",
  "MozColumnRuleWidth",
  "WebkitColumnRuleWidth",
  "MSColumnRuleWidth",
  "OColumnRuleWidth",
  "columnSpan",
  "MozColumnSpan",
  "WebkitColumnSpan",
  "MSColumnSpan",
  "OColumnSpan",
  "columnWidth",
  "MozColumnWidth",
  "WebkitColumnWidth",
  "MSColumnWidth",
  "OColumnWidth",
  "columns",
  "MozColumns",
  "WebkitColumns",
  "MSColumns",
  "OColumns",
  "content",
  "MozContent",
  "WebkitContent",
  "MSContent",
  "OContent",
  "counterIncrement",
  "MozCounterIncrement",
  "WebkitCounterIncrement",
  "MSCounterIncrement",
  "OCounterIncrement",
  "counterReset",
  "MozCounterReset",
  "WebkitCounterReset",
  "MSCounterReset",
  "OCounterReset",
  "cursor",
  "MozCursor",
  "WebkitCursor",
  "MSCursor",
  "OCursor",
  "deg",
  "MozDeg",
  "WebkitDeg",
  "MSDeg",
  "ODeg",
  "direction",
  "MozDirection",
  "WebkitDirection",
  "MSDirection",
  "ODirection",
  "display",
  "MozDisplay",
  "WebkitDisplay",
  "MSDisplay",
  "ODisplay",
  "dpcm",
  "MozDpcm",
  "WebkitDpcm",
  "MSDpcm",
  "ODpcm",
  "dpi",
  "MozDpi",
  "WebkitDpi",
  "MSDpi",
  "ODpi",
  "dppx",
  "MozDppx",
  "WebkitDppx",
  "MSDppx",
  "ODppx",
  "em",
  "MozEm",
  "WebkitEm",
  "MSEm",
  "OEm",
  "emptyCells",
  "MozEmptyCells",
  "WebkitEmptyCells",
  "MSEmptyCells",
  "OEmptyCells",
  "ex",
  "MozEx",
  "WebkitEx",
  "MSEx",
  "OEx",
  "filter",
  "MozFilter",
  "WebkitFilter",
  "MSFilter",
  "OFilter",
  "flexBasis",
  "MozFlexBasis",
  "WebkitFlexBasis",
  "MSFlexBasis",
  "OFlexBasis",
  "flexDirection",
  "MozFlexDirection",
  "WebkitFlexDirection",
  "MSFlexDirection",
  "OFlexDirection",
  "flexFlow",
  "MozFlexFlow",
  "WebkitFlexFlow",
  "MSFlexFlow",
  "OFlexFlow",
  "flexGrow",
  "MozFlexGrow",
  "WebkitFlexGrow",
  "MSFlexGrow",
  "OFlexGrow",
  "flexShrink",
  "MozFlexShrink",
  "WebkitFlexShrink",
  "MSFlexShrink",
  "OFlexShrink",
  "flexWrap",
  "MozFlexWrap",
  "WebkitFlexWrap",
  "MSFlexWrap",
  "OFlexWrap",
  "float",
  "MozFloat",
  "WebkitFloat",
  "MSFloat",
  "OFloat",
  "font",
  "MozFont",
  "WebkitFont",
  "MSFont",
  "OFont",
  "fontFamily",
  "MozFontFamily",
  "WebkitFontFamily",
  "MSFontFamily",
  "OFontFamily",
  "fontFeatureSettings",
  "MozFontFeatureSettings",
  "WebkitFontFeatureSettings",
  "MSFontFeatureSettings",
  "OFontFeatureSettings",
  "fontKerning",
  "MozFontKerning",
  "WebkitFontKerning",
  "MSFontKerning",
  "OFontKerning",
  "fontLanguageOverride",
  "MozFontLanguageOverride",
  "WebkitFontLanguageOverride",
  "MSFontLanguageOverride",
  "OFontLanguageOverride",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "fontSizeAdjust",
  "MozFontSizeAdjust",
  "WebkitFontSizeAdjust",
  "MSFontSizeAdjust",
  "OFontSizeAdjust",
  "fontStretch",
  "MozFontStretch",
  "WebkitFontStretch",
  "MSFontStretch",
  "OFontStretch",
  "fontStyle",
  "MozFontStyle",
  "WebkitFontStyle",
  "MSFontStyle",
  "OFontStyle",
  "fontSynthesis",
  "MozFontSynthesis",
  "WebkitFontSynthesis",
  "MSFontSynthesis",
  "OFontSynthesis",
  "fontVariant",
  "MozFontVariant",
  "WebkitFontVariant",
  "MSFontVariant",
  "OFontVariant",
  "fontVariantAlternates",
  "MozFontVariantAlternates",
  "WebkitFontVariantAlternates",
  "MSFontVariantAlternates",
  "OFontVariantAlternates",
  "fontVariantCaps",
  "MozFontVariantCaps",
  "WebkitFontVariantCaps",
  "MSFontVariantCaps",
  "OFontVariantCaps",
  "fontVariantEastAsian",
  "MozFontVariantEastAsian",
  "WebkitFontVariantEastAsian",
  "MSFontVariantEastAsian",
  "OFontVariantEastAsian",
  "fontVariantLigatures",
  "MozFontVariantLigatures",
  "WebkitFontVariantLigatures",
  "MSFontVariantLigatures",
  "OFontVariantLigatures",
  "fontVariantNumeric",
  "MozFontVariantNumeric",
  "WebkitFontVariantNumeric",
  "MSFontVariantNumeric",
  "OFontVariantNumeric",
  "fontVariantPosition",
  "MozFontVariantPosition",
  "WebkitFontVariantPosition",
  "MSFontVariantPosition",
  "OFontVariantPosition",
  "fontWeight",
  "MozFontWeight",
  "WebkitFontWeight",
  "MSFontWeight",
  "OFontWeight",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "grad",
  "MozGrad",
  "WebkitGrad",
  "MSGrad",
  "OGrad",
  "grid",
  "MozGrid",
  "WebkitGrid",
  "MSGrid",
  "OGrid",
  "gridArea",
  "MozGridArea",
  "WebkitGridArea",
  "MSGridArea",
  "OGridArea",
  "gridAutoColumns",
  "MozGridAutoColumns",
  "WebkitGridAutoColumns",
  "MSGridAutoColumns",
  "OGridAutoColumns",
  "gridAutoFlow",
  "MozGridAutoFlow",
  "WebkitGridAutoFlow",
  "MSGridAutoFlow",
  "OGridAutoFlow",
  "gridAutoRows",
  "MozGridAutoRows",
  "WebkitGridAutoRows",
  "MSGridAutoRows",
  "OGridAutoRows",
  "gridColumn",
  "MozGridColumn",
  "WebkitGridColumn",
  "MSGridColumn",
  "OGridColumn",
  "gridColumnEnd",
  "MozGridColumnEnd",
  "WebkitGridColumnEnd",
  "MSGridColumnEnd",
  "OGridColumnEnd",
  "gridColumnGap",
  "MozGridColumnGap",
  "WebkitGridColumnGap",
  "MSGridColumnGap",
  "OGridColumnGap",
  "gridColumnStart",
  "MozGridColumnStart",
  "WebkitGridColumnStart",
  "MSGridColumnStart",
  "OGridColumnStart",
  "gridGap",
  "MozGridGap",
  "WebkitGridGap",
  "MSGridGap",
  "OGridGap",
  "gridRow",
  "MozGridRow",
  "WebkitGridRow",
  "MSGridRow",
  "OGridRow",
  "gridRowEnd",
  "MozGridRowEnd",
  "WebkitGridRowEnd",
  "MSGridRowEnd",
  "OGridRowEnd",
  "gridRowGap",
  "MozGridRowGap",
  "WebkitGridRowGap",
  "MSGridRowGap",
  "OGridRowGap",
  "gridRowStart",
  "MozGridRowStart",
  "WebkitGridRowStart",
  "MSGridRowStart",
  "OGridRowStart",
  "gridTemplate",
  "MozGridTemplate",
  "WebkitGridTemplate",
  "MSGridTemplate",
  "OGridTemplate",
  "gridTemplateAreas",
  "MozGridTemplateAreas",
  "WebkitGridTemplateAreas",
  "MSGridTemplateAreas",
  "OGridTemplateAreas",
  "gridTemplateColumns",
  "MozGridTemplateColumns",
  "WebkitGridTemplateColumns",
  "MSGridTemplateColumns",
  "OGridTemplateColumns",
  "gridTemplateRows",
  "MozGridTemplateRows",
  "WebkitGridTemplateRows",
  "MSGridTemplateRows",
  "OGridTemplateRows",
  "height",
  "MozHeight",
  "WebkitHeight",
  "MSHeight",
  "OHeight",
  "hyphens",
  "MozHyphens",
  "WebkitHyphens",
  "MSHyphens",
  "OHyphens",
  "hz",
  "MozHz",
  "WebkitHz",
  "MSHz",
  "OHz",
  "imageOrientation",
  "MozImageOrientation",
  "WebkitImageOrientation",
  "MSImageOrientation",
  "OImageOrientation",
  "imageRendering",
  "MozImageRendering",
  "WebkitImageRendering",
  "MSImageRendering",
  "OImageRendering",
  "imageResolution",
  "MozImageResolution",
  "WebkitImageResolution",
  "MSImageResolution",
  "OImageResolution",
  "imeMode",
  "MozImeMode",
  "WebkitImeMode",
  "MSImeMode",
  "OImeMode",
  "in",
  "MozIn",
  "WebkitIn",
  "MSIn",
  "OIn",
  "inherit",
  "MozInherit",
  "WebkitInherit",
  "MSInherit",
  "OInherit",
  "initial",
  "MozInitial",
  "WebkitInitial",
  "MSInitial",
  "OInitial",
  "inlineSize",
  "MozInlineSize",
  "WebkitInlineSize",
  "MSInlineSize",
  "OInlineSize",
  "isolation",
  "MozIsolation",
  "WebkitIsolation",
  "MSIsolation",
  "OIsolation",
  "justifyContent",
  "MozJustifyContent",
  "WebkitJustifyContent",
  "MSJustifyContent",
  "OJustifyContent",
  "khz",
  "MozKhz",
  "WebkitKhz",
  "MSKhz",
  "OKhz",
  "left",
  "MozLeft",
  "WebkitLeft",
  "MSLeft",
  "OLeft",
  "letterSpacing",
  "MozLetterSpacing",
  "WebkitLetterSpacing",
  "MSLetterSpacing",
  "OLetterSpacing",
  "lineBreak",
  "MozLineBreak",
  "WebkitLineBreak",
  "MSLineBreak",
  "OLineBreak",
  "lineHeight",
  "MozLineHeight",
  "WebkitLineHeight",
  "MSLineHeight",
  "OLineHeight",
  "listStyle",
  "MozListStyle",
  "WebkitListStyle",
  "MSListStyle",
  "OListStyle",
  "listStyleImage",
  "MozListStyleImage",
  "WebkitListStyleImage",
  "MSListStyleImage",
  "OListStyleImage",
  "listStylePosition",
  "MozListStylePosition",
  "WebkitListStylePosition",
  "MSListStylePosition",
  "OListStylePosition",
  "listStyleType",
  "MozListStyleType",
  "WebkitListStyleType",
  "MSListStyleType",
  "OListStyleType",
  "margin",
  "MozMargin",
  "WebkitMargin",
  "MSMargin",
  "OMargin",
  "marginBlockEnd",
  "MozMarginBlockEnd",
  "WebkitMarginBlockEnd",
  "MSMarginBlockEnd",
  "OMarginBlockEnd",
  "marginBlockStart",
  "MozMarginBlockStart",
  "WebkitMarginBlockStart",
  "MSMarginBlockStart",
  "OMarginBlockStart",
  "marginBottom",
  "MozMarginBottom",
  "WebkitMarginBottom",
  "MSMarginBottom",
  "OMarginBottom",
  "marginInlineEnd",
  "MozMarginInlineEnd",
  "WebkitMarginInlineEnd",
  "MSMarginInlineEnd",
  "OMarginInlineEnd",
  "marginInlineStart",
  "MozMarginInlineStart",
  "WebkitMarginInlineStart",
  "MSMarginInlineStart",
  "OMarginInlineStart",
  "marginLeft",
  "MozMarginLeft",
  "WebkitMarginLeft",
  "MSMarginLeft",
  "OMarginLeft",
  "marginRight",
  "MozMarginRight",
  "WebkitMarginRight",
  "MSMarginRight",
  "OMarginRight",
  "marginTop",
  "MozMarginTop",
  "WebkitMarginTop",
  "MSMarginTop",
  "OMarginTop",
  "mask",
  "MozMask",
  "WebkitMask",
  "MSMask",
  "OMask",
  "maskClip",
  "MozMaskClip",
  "WebkitMaskClip",
  "MSMaskClip",
  "OMaskClip",
  "maskComposite",
  "MozMaskComposite",
  "WebkitMaskComposite",
  "MSMaskComposite",
  "OMaskComposite",
  "maskImage",
  "MozMaskImage",
  "WebkitMaskImage",
  "MSMaskImage",
  "OMaskImage",
  "maskMode",
  "MozMaskMode",
  "WebkitMaskMode",
  "MSMaskMode",
  "OMaskMode",
  "maskOrigin",
  "MozMaskOrigin",
  "WebkitMaskOrigin",
  "MSMaskOrigin",
  "OMaskOrigin",
  "maskPosition",
  "MozMaskPosition",
  "WebkitMaskPosition",
  "MSMaskPosition",
  "OMaskPosition",
  "maskRepeat",
  "MozMaskRepeat",
  "WebkitMaskRepeat",
  "MSMaskRepeat",
  "OMaskRepeat",
  "maskSize",
  "MozMaskSize",
  "WebkitMaskSize",
  "MSMaskSize",
  "OMaskSize",
  "maskType",
  "MozMaskType",
  "WebkitMaskType",
  "MSMaskType",
  "OMaskType",
  "maxHeight",
  "MozMaxHeight",
  "WebkitMaxHeight",
  "MSMaxHeight",
  "OMaxHeight",
  "maxWidth",
  "MozMaxWidth",
  "WebkitMaxWidth",
  "MSMaxWidth",
  "OMaxWidth",
  "minBlockSize",
  "MozMinBlockSize",
  "WebkitMinBlockSize",
  "MSMinBlockSize",
  "OMinBlockSize",
  "minHeight",
  "MozMinHeight",
  "WebkitMinHeight",
  "MSMinHeight",
  "OMinHeight",
  "minInlineSize",
  "MozMinInlineSize",
  "WebkitMinInlineSize",
  "MSMinInlineSize",
  "OMinInlineSize",
  "minWidth",
  "MozMinWidth",
  "WebkitMinWidth",
  "MSMinWidth",
  "OMinWidth",
  "mixBlendMode",
  "MozMixBlendMode",
  "WebkitMixBlendMode",
  "MSMixBlendMode",
  "OMixBlendMode",
  "mm",
  "MozMm",
  "WebkitMm",
  "MSMm",
  "OMm",
  "ms",
  "MozMs",
  "WebkitMs",
  "MSMs",
  "OMs",
  "objectFit",
  "MozObjectFit",
  "WebkitObjectFit",
  "MSObjectFit",
  "OObjectFit",
  "objectPosition",
  "MozObjectPosition",
  "WebkitObjectPosition",
  "MSObjectPosition",
  "OObjectPosition",
  "offsetBlockEnd",
  "MozOffsetBlockEnd",
  "WebkitOffsetBlockEnd",
  "MSOffsetBlockEnd",
  "OOffsetBlockEnd",
  "offsetBlockStart",
  "MozOffsetBlockStart",
  "WebkitOffsetBlockStart",
  "MSOffsetBlockStart",
  "OOffsetBlockStart",
  "offsetInlineEnd",
  "MozOffsetInlineEnd",
  "WebkitOffsetInlineEnd",
  "MSOffsetInlineEnd",
  "OOffsetInlineEnd",
  "offsetInlineStart",
  "MozOffsetInlineStart",
  "WebkitOffsetInlineStart",
  "MSOffsetInlineStart",
  "OOffsetInlineStart",
  "opacity",
  "MozOpacity",
  "WebkitOpacity",
  "MSOpacity",
  "OOpacity",
  "order",
  "MozOrder",
  "WebkitOrder",
  "MSOrder",
  "OOrder",
  "orphans",
  "MozOrphans",
  "WebkitOrphans",
  "MSOrphans",
  "OOrphans",
  "outline",
  "MozOutline",
  "WebkitOutline",
  "MSOutline",
  "OOutline",
  "outlineColor",
  "MozOutlineColor",
  "WebkitOutlineColor",
  "MSOutlineColor",
  "OOutlineColor",
  "outlineOffset",
  "MozOutlineOffset",
  "WebkitOutlineOffset",
  "MSOutlineOffset",
  "OOutlineOffset",
  "outlineStyle",
  "MozOutlineStyle",
  "WebkitOutlineStyle",
  "MSOutlineStyle",
  "OOutlineStyle",
  "outlineWidth",
  "MozOutlineWidth",
  "WebkitOutlineWidth",
  "MSOutlineWidth",
  "OOutlineWidth",
  "overflow",
  "MozOverflow",
  "WebkitOverflow",
  "MSOverflow",
  "OOverflow",
  "overflowWrap",
  "MozOverflowWrap",
  "WebkitOverflowWrap",
  "MSOverflowWrap",
  "OOverflowWrap",
  "overflowX",
  "MozOverflowX",
  "WebkitOverflowX",
  "MSOverflowX",
  "OOverflowX",
  "overflowY",
  "MozOverflowY",
  "WebkitOverflowY",
  "MSOverflowY",
  "OOverflowY",
  "padding",
  "MozPadding",
  "WebkitPadding",
  "MSPadding",
  "OPadding",
  "paddingBlockEnd",
  "MozPaddingBlockEnd",
  "WebkitPaddingBlockEnd",
  "MSPaddingBlockEnd",
  "OPaddingBlockEnd",
  "paddingBlockStart",
  "MozPaddingBlockStart",
  "WebkitPaddingBlockStart",
  "MSPaddingBlockStart",
  "OPaddingBlockStart",
  "paddingBottom",
  "MozPaddingBottom",
  "WebkitPaddingBottom",
  "MSPaddingBottom",
  "OPaddingBottom",
  "paddingInlineEnd",
  "MozPaddingInlineEnd",
  "WebkitPaddingInlineEnd",
  "MSPaddingInlineEnd",
  "OPaddingInlineEnd",
  "paddingInlineStart",
  "MozPaddingInlineStart",
  "WebkitPaddingInlineStart",
  "MSPaddingInlineStart",
  "OPaddingInlineStart",
  "paddingLeft",
  "MozPaddingLeft",
  "WebkitPaddingLeft",
  "MSPaddingLeft",
  "OPaddingLeft",
  "paddingRight",
  "MozPaddingRight",
  "WebkitPaddingRight",
  "MSPaddingRight",
  "OPaddingRight",
  "paddingTop",
  "MozPaddingTop",
  "WebkitPaddingTop",
  "MSPaddingTop",
  "OPaddingTop",
  "pageBreakAfter",
  "MozPageBreakAfter",
  "WebkitPageBreakAfter",
  "MSPageBreakAfter",
  "OPageBreakAfter",
  "pageBreakBefore",
  "MozPageBreakBefore",
  "WebkitPageBreakBefore",
  "MSPageBreakBefore",
  "OPageBreakBefore",
  "pageBreakInside",
  "MozPageBreakInside",
  "WebkitPageBreakInside",
  "MSPageBreakInside",
  "OPageBreakInside",
  "pc",
  "MozPc",
  "WebkitPc",
  "MSPc",
  "OPc",
  "perspective",
  "MozPerspective",
  "WebkitPerspective",
  "MSPerspective",
  "OPerspective",
  "perspectiveOrigin",
  "MozPerspectiveOrigin",
  "WebkitPerspectiveOrigin",
  "MSPerspectiveOrigin",
  "OPerspectiveOrigin",
  "pointerEvents",
  "MozPointerEvents",
  "WebkitPointerEvents",
  "MSPointerEvents",
  "OPointerEvents",
  "position",
  "MozPosition",
  "WebkitPosition",
  "MSPosition",
  "OPosition",
  "pt",
  "MozPt",
  "WebkitPt",
  "MSPt",
  "OPt",
  "px",
  "MozPx",
  "WebkitPx",
  "MSPx",
  "OPx",
  "q",
  "MozQ",
  "WebkitQ",
  "MSQ",
  "OQ",
  "quotes",
  "MozQuotes",
  "WebkitQuotes",
  "MSQuotes",
  "OQuotes",
  "rad",
  "MozRad",
  "WebkitRad",
  "MSRad",
  "ORad",
  "rem",
  "MozRem",
  "WebkitRem",
  "MSRem",
  "ORem",
  "resize",
  "MozResize",
  "WebkitResize",
  "MSResize",
  "OResize",
  "revert",
  "MozRevert",
  "WebkitRevert",
  "MSRevert",
  "ORevert",
  "right",
  "MozRight",
  "WebkitRight",
  "MSRight",
  "ORight",
  "rubyAlign",
  "MozRubyAlign",
  "WebkitRubyAlign",
  "MSRubyAlign",
  "ORubyAlign",
  "rubyMerge",
  "MozRubyMerge",
  "WebkitRubyMerge",
  "MSRubyMerge",
  "ORubyMerge",
  "rubyPosition",
  "MozRubyPosition",
  "WebkitRubyPosition",
  "MSRubyPosition",
  "ORubyPosition",
  "s",
  "MozS",
  "WebkitS",
  "MSS",
  "OS",
  "scrollBehavior",
  "MozScrollBehavior",
  "WebkitScrollBehavior",
  "MSScrollBehavior",
  "OScrollBehavior",
  "scrollSnapCoordinate",
  "MozScrollSnapCoordinate",
  "WebkitScrollSnapCoordinate",
  "MSScrollSnapCoordinate",
  "OScrollSnapCoordinate",
  "scrollSnapDestination",
  "MozScrollSnapDestination",
  "WebkitScrollSnapDestination",
  "MSScrollSnapDestination",
  "OScrollSnapDestination",
  "scrollSnapType",
  "MozScrollSnapType",
  "WebkitScrollSnapType",
  "MSScrollSnapType",
  "OScrollSnapType",
  "shapeImageThreshold",
  "MozShapeImageThreshold",
  "WebkitShapeImageThreshold",
  "MSShapeImageThreshold",
  "OShapeImageThreshold",
  "shapeMargin",
  "MozShapeMargin",
  "WebkitShapeMargin",
  "MSShapeMargin",
  "OShapeMargin",
  "shapeOutside",
  "MozShapeOutside",
  "WebkitShapeOutside",
  "MSShapeOutside",
  "OShapeOutside",
  "tabSize",
  "MozTabSize",
  "WebkitTabSize",
  "MSTabSize",
  "OTabSize",
  "tableLayout",
  "MozTableLayout",
  "WebkitTableLayout",
  "MSTableLayout",
  "OTableLayout",
  "textAlign",
  "MozTextAlign",
  "WebkitTextAlign",
  "MSTextAlign",
  "OTextAlign",
  "textAlignLast",
  "MozTextAlignLast",
  "WebkitTextAlignLast",
  "MSTextAlignLast",
  "OTextAlignLast",
  "textCombineUpright",
  "MozTextCombineUpright",
  "WebkitTextCombineUpright",
  "MSTextCombineUpright",
  "OTextCombineUpright",
  "textDecoration",
  "MozTextDecoration",
  "WebkitTextDecoration",
  "MSTextDecoration",
  "OTextDecoration",
  "textDecorationColor",
  "MozTextDecorationColor",
  "WebkitTextDecorationColor",
  "MSTextDecorationColor",
  "OTextDecorationColor",
  "textDecorationLine",
  "MozTextDecorationLine",
  "WebkitTextDecorationLine",
  "MSTextDecorationLine",
  "OTextDecorationLine",
  "textDecorationStyle",
  "MozTextDecorationStyle",
  "WebkitTextDecorationStyle",
  "MSTextDecorationStyle",
  "OTextDecorationStyle",
  "textEmphasis",
  "MozTextEmphasis",
  "WebkitTextEmphasis",
  "MSTextEmphasis",
  "OTextEmphasis",
  "textEmphasisColor",
  "MozTextEmphasisColor",
  "WebkitTextEmphasisColor",
  "MSTextEmphasisColor",
  "OTextEmphasisColor",
  "textEmphasisPosition",
  "MozTextEmphasisPosition",
  "WebkitTextEmphasisPosition",
  "MSTextEmphasisPosition",
  "OTextEmphasisPosition",
  "textEmphasisStyle",
  "MozTextEmphasisStyle",
  "WebkitTextEmphasisStyle",
  "MSTextEmphasisStyle",
  "OTextEmphasisStyle",
  "textIndent",
  "MozTextIndent",
  "WebkitTextIndent",
  "MSTextIndent",
  "OTextIndent",
  "textOrientation",
  "MozTextOrientation",
  "WebkitTextOrientation",
  "MSTextOrientation",
  "OTextOrientation",
  "textOverflow",
  "MozTextOverflow",
  "WebkitTextOverflow",
  "MSTextOverflow",
  "OTextOverflow",
  "textRendering",
  "MozTextRendering",
  "WebkitTextRendering",
  "MSTextRendering",
  "OTextRendering",
  "textShadow",
  "MozTextShadow",
  "WebkitTextShadow",
  "MSTextShadow",
  "OTextShadow",
  "textTransform",
  "MozTextTransform",
  "WebkitTextTransform",
  "MSTextTransform",
  "OTextTransform",
  "textUnderlinePosition",
  "MozTextUnderlinePosition",
  "WebkitTextUnderlinePosition",
  "MSTextUnderlinePosition",
  "OTextUnderlinePosition",
  "top",
  "MozTop",
  "WebkitTop",
  "MSTop",
  "OTop",
  "touchAction",
  "MozTouchAction",
  "WebkitTouchAction",
  "MSTouchAction",
  "OTouchAction",
  "transform",
  "MozTransform",
  "WebkitTransform",
  "msTransform",
  "OTransform",
  "transformBox",
  "MozTransformBox",
  "WebkitTransformBox",
  "MSTransformBox",
  "OTransformBox",
  "transformOrigin",
  "MozTransformOrigin",
  "WebkitTransformOrigin",
  "MSTransformOrigin",
  "OTransformOrigin",
  "transformStyle",
  "MozTransformStyle",
  "WebkitTransformStyle",
  "MSTransformStyle",
  "OTransformStyle",
  "transition",
  "MozTransition",
  "WebkitTransition",
  "MSTransition",
  "OTransition",
  "transitionDelay",
  "MozTransitionDelay",
  "WebkitTransitionDelay",
  "MSTransitionDelay",
  "OTransitionDelay",
  "transitionDuration",
  "MozTransitionDuration",
  "WebkitTransitionDuration",
  "MSTransitionDuration",
  "OTransitionDuration",
  "transitionProperty",
  "MozTransitionProperty",
  "WebkitTransitionProperty",
  "MSTransitionProperty",
  "OTransitionProperty",
  "transitionTimingFunction",
  "MozTransitionTimingFunction",
  "WebkitTransitionTimingFunction",
  "MSTransitionTimingFunction",
  "OTransitionTimingFunction",
  "turn",
  "MozTurn",
  "WebkitTurn",
  "MSTurn",
  "OTurn",
  "unicodeBidi",
  "MozUnicodeBidi",
  "WebkitUnicodeBidi",
  "MSUnicodeBidi",
  "OUnicodeBidi",
  "unset",
  "MozUnset",
  "WebkitUnset",
  "MSUnset",
  "OUnset",
  "verticalAlign",
  "MozVerticalAlign",
  "WebkitVerticalAlign",
  "MSVerticalAlign",
  "OVerticalAlign",
  "vh",
  "MozVh",
  "WebkitVh",
  "MSVh",
  "OVh",
  "visibility",
  "MozVisibility",
  "WebkitVisibility",
  "MSVisibility",
  "OVisibility",
  "vmax",
  "MozVmax",
  "WebkitVmax",
  "MSVmax",
  "OVmax",
  "vmin",
  "MozVmin",
  "WebkitVmin",
  "MSVmin",
  "OVmin",
  "vw",
  "MozVw",
  "WebkitVw",
  "MSVw",
  "OVw",
  "whiteSpace",
  "MozWhiteSpace",
  "WebkitWhiteSpace",
  "MSWhiteSpace",
  "OWhiteSpace",
  "widows",
  "MozWidows",
  "WebkitWidows",
  "MSWidows",
  "OWidows",
  "width",
  "MozWidth",
  "WebkitWidth",
  "MSWidth",
  "OWidth",
  "willChange",
  "MozWillChange",
  "WebkitWillChange",
  "MSWillChange",
  "OWillChange",
  "wordBreak",
  "MozWordBreak",
  "WebkitWordBreak",
  "MSWordBreak",
  "OWordBreak",
  "wordSpacing",
  "MozWordSpacing",
  "WebkitWordSpacing",
  "MSWordSpacing",
  "OWordSpacing",
  "wordWrap",
  "MozWordWrap",
  "WebkitWordWrap",
  "MSWordWrap",
  "OWordWrap",
  "writingMode",
  "MozWritingMode",
  "WebkitWritingMode",
  "MSWritingMode",
  "OWritingMode",
  "zIndex",
  "MozZIndex",
  "WebkitZIndex",
  "MSZIndex",
  "OZIndex",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "flex",
  "MozFlex",
  "WebkitFlex",
  "MSFlex",
  "OFlex",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "overflowScrolling",
  "MozOverflowScrolling",
  "WebkitOverflowScrolling",
  "MSOverflowScrolling",
  "OOverflowScrolling"
]

},{}],46:[function(require,module,exports){
var properties = require('./css-properties.js');
var React = require('react');

module.exports = function(props, propName, componentName) {
  var styles = props[propName];
  if (!styles) {
    return;
  }

  var failures = [];
  Object.keys(styles).forEach(function(styleKey){
    if (properties.indexOf(styleKey) === -1) {
      failures.push(styleKey);
    }
  });
  if (failures.length) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + '. Has invalid keys ' + failures.join(', '));
  }
};

module.exports.isRequired = function(props, propName, componentName) {
  if (!props[propName]) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + ' is required');
  }
  return module.exports(props, propName, componentName);
};

module.exports.supportingArrays = React.PropTypes.oneOfType([
  React.PropTypes.arrayOf(module.exports),
  module.exports
]);


},{"./css-properties.js":45,"react":"react"}],47:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {renderHits}=require("../unit/highlight");
const {groupTitle}=require("../unit/humantext");

class ExcerptLine extends React.Component {
	highlightText(text,hits){
    return renderHits(text,hits, (o,t)=> E("span",o,t) )
	}
	openAddress(){
		this.props.openAddress(this.props.address,this.props.n);
	}
	render() {
		var pb=this.props.address||"";
		pb=pb.substr(pb.indexOf("p")+1).replace(".","-");
		return E("div",{className:"excerpt"},
			this.props.header?E("div",{className:"groupheader",
				title:this.props.shorttitle},
				groupTitle(this.props.header,this.props.cor)
				,"("
				,E("span",{className:"hitcount"},this.props.grouphit)
				,")"
			)
			:null
			,E("table",{className:"table"},
				E("tbody",{},
				E("tr",{className:"group"},
					E("td",{},E("span",{className:"seq"},this.props.seq+1)),
					E("td",{},E("a",{onClick:this.openAddress.bind(this)},
						E("span",{className:(this.props.n==this.props.now?"pb_now":"excerptpb")},pb))),
					E("td",{className:"excerptline"}, this.highlightText(this.props.text,this.props.hits))
				)
				)
			)
		)
	}
}
ExcerptLine.propTypes={
	seq:PT.number.isRequired,
	header:PT.string,
	text:PT.string.isRequired,
	address:PT.string.isRequired,
	grouphit:PT.number
}
module.exports=ExcerptLine;
},{"../unit/highlight":122,"../unit/humantext":123,"react":"react"}],48:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization")
const styles={
	container:{whiteSpace: "break-word", display:"inline-block"}
}
class fieldSelector  extends React.Component {
	setItem(item){
		const fieldname=Object.keys(this.props.fields)[item];
		this.props.setField(fieldname, !this.props.hidefields[fieldname]);
	}
	renderItem(item,key){
		return E("label",{key,style:styles.container},E("input",{
			type:"checkbox",id:"cb"+key,
			defaultChecked:!this.props.hidefields[item],
			onChange:this.setItem.bind(this,key)}),

			E("span",{htmlFor:"cb"+key,title:item},
				_(item.replace(/<.*/,""))));//remove text after @
	}
	render(){
		const existfields=Object.keys(this.props.fields).filter(function(field){
			return !!this.props.fields[field];
		}.bind(this));
		return E("div",{},existfields.map(this.renderItem.bind(this)));
	}
}
module.exports=fieldSelector;
},{"ksana-localization":139,"react":"react"}],49:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	hit:{},
	label:{cursor:"pointer"},
	container:{whiteSpace: "break-word"}
}
const humanhit=function(hit){
	if (!hit)return "";
	if (hit<1000) {
		if (hit<10) return Math.floor(hit)+"";
		return Math.floor(hit)+"";
	} else if (hit<1000000) {
		const k=hit/1000;
		if (k<10) return k.toFixed(2)+"k";
		else if (k<100) return k.toFixed(1)+"k";
		return Math.floor(k)+"k"
	}
	return "1M+";
}

class filterItem extends React.Component{
	setExclude(e){
		this.props.setExclude(this.props.idx,!this.props.exclude);
	}
	labelClick(e){
		this.props.goGroup(this.props.idx);
	}
	hitClick(e){
		this.props.goHit&& this.props.goHit(this.props.idx);
	}
	render(){
		return E(this.props.parentElement||"div",{style:styles.container}
		  	,"　"
				,E("input",{type:"checkbox",checked:!this.props.exclude,onChange:this.setExclude.bind(this)})
				,E("span",{style:styles.label,title:this.props.hint,onClick:this.labelClick.bind(this)},this.props.label)
				,this.props.hit?E("span",{className:this.props.exclude?"disablefilterhit":"filterhit",
					onClick:this.hitClick.bind(this)}, humanhit(this.props.hit)):null
		)
	}
};

filterItem.propTypes={
		label:PT.string.isRequired,
		hit:PT.number.isRequired,
		//exclude:PT.bool.isRequired,
		setExclude:PT.func.isRequired,
		goGroup:PT.func.isRequired,
		goHit:PT.func,
		idx:PT.number.isRequired
	}


module.exports=filterItem;
},{"react":"react"}],50:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;

class Footer extends React.Component{
	render(){
		return E("div",{className:"footer"}
			,E("div",{className:"separator"},"　")
			,E("div",{style:styles.container}
			,E("table",{style:styles.table},E("tbody",{},E("tr",{}
				,E("td",{}
					,E("img",{style:styles.logoimg,src:"logo.png"}))
				,E("td",{}
					,E("div",{},"Accelon 2017.4.26")
					,E("div",{},"Freely Redistributable")
					,E("div",{},"本軟體為結緣品")
				)
			))))
		)
	}
}
const styles={
	table:{margin:"0 auto"},
	logo:{flex:1},
	logoimg:{width:80,height:80,padding:10},
	text:{flex:2}
}
module.exports=Footer;
},{"react":"react"}],51:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization");
const address=require("../model/address");
const mode=require("../model/mode");
class GoPage extends React.Component {
	constructor(props){
		super(props)
		this.state={page:""}
	}
	gopage(){
		const book=this.props.cor.bookOf(address.store.main);
		const pg=(parseInt(this.state.page,10)-1)||0;
		const r=this.props.cor.parseRange(book+"p"+this.state.page);
		const kpos=r?r.start:this.props.cor.makeKPos([book,pg,0,0]);

		const article=this.props.cor.articleOf(kpos);
		if (!article)return;
		const addr=this.props.cor.stringify(kpos);
		address.setMain(addr);
		mode.readText();
	}
	setRef(ref){
		this.input=ref;
	}
	onChange(e){
		this.setState({page:e.target.value});
	}
	onKeyPress(e){
		if (e.key==="Enter") this.gopage();
	}
	render(){
		return E("span",{className:"gotopage"},
			E("button",{onClick:this.gopage.bind(this)},_("Page Number"))
			,E("input",{ref:this.setRef.bind(this),value:this.state.page,size:5,
				onChange:this.onChange.bind(this),onKeyPress:this.onKeyPress.bind(this)})
		)
	}
};
GoPage.propTypes={
	cor:PT.object.isRequired,
	range:PT.array.isRequired,
}
module.exports=GoPage;
},{"../model/address":107,"../model/mode":112,"ksana-localization":139,"react":"react"}],52:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const {linkpopupmatrix}=require("../unit/popupmatrix");
var LinkPopup=React.createClass({
	getInitialState:function(){
		return {close:true,mainAddress:null,mainCorpus:null};
	},
	propTypes:{
		x:PT.number.isRequired,
		title:PT.string,
		cors:PT.object.isRequired, //open corpus
		tagname:PT.string,
		openLink:PT.func.isRequired
	},
	close:function(){
		this.setState({close:true});
		this.props.actions.highlightAddress(0);
	},
	componentWillReceiveProps:function(nextProps){
		if (nextProps.close)	 {
			this.setState({close:true});
		} else {
			if (nextProps.timestamp!==this.props.timestamp) {
				const mainAddress=nextProps.mainAddress;
				const mainCorpus=nextProps.mainCorpus;
				this.setState({close:false,mainAddress,mainCorpus});
			}			
		}
	},
	componentDidUpdate:function(){
		var cm=this.refs.cm;
		if (!cm)return;
		cm=cm.getCodeMirror();
	}
	,linkmouseover:function(e){
		const links=this.props.links;
		const link=links[e.target.dataset.id];
		if (!link)return;
		this.props.actions.highlightAddress(link.from);
	}
	,linkclick:function(e){
		const links=this.props.links;
		const link=links[e.target.dataset.id];
		if (!link)return;

		this.props.actions.openLink(link.corpus+"@"+link.to);
	}
	,sortLinks:function(){
		const links=this.props.links;
		const arr=[];
		for (var i in links){
			arr.push([links[i],i]);
		}
		arr.sort(function(a,b){
			const cor=this.props.cors[a[0].corpus];
			const a1=cor.parseRange(a[0].to).start;
			const b1=cor.parseRange(b[0].to).start;
			return a1>b1?(b1<a1?1:0):-1;
		}.bind(this));
		return arr;
	}
	,renderLinks:function(){
		var out=[];
		const links=this.sortLinks(this.props.links);
		const maincor=this.props.cors[this.state.mainCorpus];
		const mainr=maincor.parseRange(this.state.mainAddress);
		for (var key in links){
			const link=links[key][0];
			const id=links[key][1];
			const cor=this.props.cors[link.corpus];
			const shortname=cor.getGroupName(link.to);
			const r=cor.parseRange(link.to);
			const to=typeof link.to=="number"?cor.stringify(r.range):link.to;
			const m=to.match(/(p\d+)/);
			const page=m?m[1]:to;
			const originate= mainr.start>r.start&&mainr.start<r.end;
			out.push(E("div",{key,className:originate?"backlink_originate":"backlink"
				,"data-id":id
				,onMouseOver:this.linkmouseover
				,onClick:this.linkclick},shortname+" "+page));
		}
		return out;
	},
	render:function(){
		if (this.props.x<0 ||this.state.close || !this.props.links.length){
			return E("div",{});
		}
		var style=JSON.parse(JSON.stringify(styles.viewcontrols));
		style.left=this.props.x;
		style.top=this.props.y;
		style.height=linkpopupmatrix.height;
		style.width=linkpopupmatrix.width;

		if (style.left+style.width>window.innerWidth) {
			style.left=window.innerWidth-style.width;
		}
		if (style.top+style.height>window.innerHeight) {
			style.top=window.innerHeight-style.height;
		}

		if (style.left+style.width>this.props.w) {
				style.left-=style.left+style.width-this.props.w+20;
		} 
		if (style.top+style.height>this.props.h) {
				style.top-=style.top+style.height-this.props.h+20;
		} 
		return	E("div",{style:styles.container},
				E("div",{style,className:"linkpopup"},
					E("span",{style:styles.title,className:"linkpopuptitle",onClick:this.close}
						,"✕ "+this.props.title),
					E("div",{style:styles.links}
						,this.renderLinks())
				)
		)
	}
})

var styles={

	links:{height:"100%",overflow:"auto"},
	container:{position:"relative",zIndex:101},
	viewcontrols:{position:"absolute"}, //for scrollbar
	title:{position:"absolute",top:"-1.5em",zIndex:200},
}
module.exports=LinkPopup;
},{"../unit/popupmatrix":127,"ksana-codemirror":"ksana-codemirror","react":"react"}],53:[function(require,module,exports){
const React =require('react');
const E=React.createElement;

const LocalFileItem=require("./localfileitem");
class LocalFileOther extends React.Component {
	render(){
		return E("span",{className:"localfile"},
			E(LocalFileItem,this.props)
		)
	}
}
module.exports=LocalFileOther;
},{"./localfileitem":54,"react":"react"}],54:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const {_}=require("ksana-localization");
class LocalFileItem extends React.Component {
	render(){
		return E("label",{},
			E("span",{className:"openlocalbutton"},
				this.props.title||_("Open local cor")),
			E("input",{type:"file",style:{display:"none"},
				accept:".cor",multiple:true,onChange:this.props.openfile})
		)
	}
}

module.exports=LocalFileItem;
},{"ksana-localization":139,"react":"react"}],55:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const {_}=require("ksana-localization");
class LocalSystem extends React.Component {
	render(){
		const title=_("download latest zip and cor files, and open index.html")
		var downloadable=window&&
		window.location.protocol=="http:"
		&&window.location.host.indexOf("127.0.0.1")==-1;
		if (!downloadable) return E("span");
		return E("span",{className:"localfile"},
			E("a",{href:"https://github.com/accelon/accelon2017/",target:"_new",title},_("local system"))
		)
	}
}
module.exports=LocalSystem;
},{"ksana-localization":139,"react":"react"}],56:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const {notepopupmatrix}=require("../unit/popupmatrix");
const LinesMarkers={
	mppsnote:require("../unit/mpps").markNoteLines,
	yinshunnote:require("../unit/yinshun").markNoteLines,
	footnote:require("../unit/mpps").markNoteLines
}
const citation=require("../unit/citation");
var NotePopup=React.createClass({
	getInitialState:function(){
		return {close:true};
	},
	propTypes:{
		//rule:PT.object.isRequired,
		x:PT.number.isRequired,
		y:PT.number.isRequired,
		text:PT.string.isRequired,
		kpos:PT.number,
		title:PT.string,
		tagname:PT.string,
		openLink:PT.func.isRequired,
		cor:PT.object
	},
	close:function(){
		this.setState({close:true});
	},
	componentWillReceiveProps:function(nextProps){
		if (nextProps.timestamp!==this.props.timestamp) {
			this.setState({close:false});
		}
	},
	onCopy:function(cm,evt){
		var v=evt.target.value;

		v="("+this.props.title+")「"+
		  v.replace(/\{k/g,"").replace(/k\}/g,"")
		.replace(/\{b/g,"").replace(/b\}/g,"")
		.replace(/@t(\d+)p([\d\-abcd]+)/g,function(m,m1,m2){
			return "（大正"+m1+"，"+m2+"）";
		})
		.replace(/@y([A-Z][0-9]+)#([0-9]+)/g,function(m,m1,m2){
			return "（印順導師，《大智度論筆記》〔"+m1+"〕p."+m2+"）";
		})+"」";
		if (this.props.kpos) {
			v+=citation(this.props.cor,this.props.kpos);
		}
		evt.target.value=v;
		evt.target.select();		
	},
	componentDidUpdate:function(){
		var cm=this.refs.cm;
		if (!cm)return;
		cm=cm.getCodeMirror();
		const markLines=LinesMarkers[this.props.tagname];
		markLines&&markLines(cm,0,cm.lineCount()-1,this.props.openLink,this.props.cor);
	},
	render:function(){
		if (!this.props.text||this.props.x<0 ||this.state.close){
			return E("div",{});
		}
		var style=JSON.parse(JSON.stringify(styles.viewcontrols));
		style.left=this.props.x;
		style.top=this.props.y;
		style.height=notepopupmatrix.height;
		style.width=notepopupmatrix.width;

		if (style.left+style.width>window.innerWidth) {
			style.left=window.innerWidth-style.width;
		}
		if (style.top+style.height>window.innerHeight) {
			style.top=window.innerHeight-style.height;
		}

		if (style.left+style.width>this.props.w) {
				style.left-=style.left+style.width-this.props.w+20;
		} 
		if (style.top+style.height>this.props.h) {
				style.top-=style.top+style.height-this.props.h+20;
		} 
		return	E("div",{style:styles.container},
				E("div",{style,className:"notepopup"},
					E("span",{style:styles.title,className:"notepopuptitle",onClick:this.close}
						,"✕ "+this.props.title),
					E(CodeMirror,{ref:"cm",readOnly:true,value:this.props.text,
						onCopy:this.onCopy
				})
				)
		)
	}
})

var styles={
	container:{position:"relative",zIndex:101},
	viewcontrols:{position:"absolute"}, //for scrollbar
	title:{position:"absolute",top:"-1.5em",zIndex:200},
}
module.exports=NotePopup;
},{"../unit/citation":119,"../unit/mpps":126,"../unit/popupmatrix":127,"../unit/yinshun":130,"ksana-codemirror":"ksana-codemirror","react":"react"}],57:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
class QSelector extends React.Component{
	onMouseEnter(idx){
		if (this.props.maxChar&&idx>=this.props.maxChar)  idx=this.props.maxChar-1;
		this.setState({selectTo:idx});
	}
	onMouseLeave(){
		this.setState({selectTo:-1});
	}
	onMouseDown(idx){
		const tokens=this.toToken(this.props.q);
		if (this.props.maxChar&&idx>=this.props.maxChar)  idx=this.props.maxChar-1;
		tokens.length=idx+1;
		this.props.onSelect&&this.props.onSelect(tokens.join(""));
	}
	constructor(props){
		super(props);
		this.state={selectTo:-1};
	}
	renderToken(t,key){
		const className=(key<=this.state.selectTo?"selected":"selection");
		return E("span",{key,className,
			onMouseDown:this.onMouseDown.bind(this,key),
			onMouseEnter:this.onMouseEnter.bind(this,key),
			onMouseLeave:this.onMouseLeave.bind(this,key)},
			t);
	}
	toToken(q){ //stupid, should reuse tokenizer
		var out=[],i=0;
		while (i<q.length){
			var c=q.charCodeAt(i);
			if (c>=0xd800&&c<=0xdbff) {
				out.push(q[i]+q[i+1]);
				i++;
			} else if (c>=0x3400&&c<=0x9FFF) {
				out.push(q[i]);
			} else {
				var s="";
				while (i<q.length&&(c<0x3400||c>0x9fff)) {
					s+=q[i++];
					c=q.charCodeAt(i);
				}
				out.push(s);
			}
			i++;
		}
		return out;
	}
	render(){
		const q=this.props.q||"";
		return E("span",{className:"dictbox"},this.toToken(q).map(this.renderToken.bind(this)));
	}
}

module.exports=QSelector;
},{"react":"react"}],58:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const BreadCrumbTOC=require("ksana2015-breadcrumbtoc").Component;

class TOCNav extends React.Component {
	constructor (props) {
		super(props);
		this.state={toc:[]};
	}
	loadTOC(kpos){
		if (!this.props.cor)return;

		this.props.cor.getTOC(kpos,function(tocs){
			var toc= tocs[0] || [];
			toc=toc.slice();
			if (toc.length && toc[0].d!==0) {
				toc.unshift({d:0,t:" "});
			}
			this.setState({toc});
		}.bind(this));
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.caretpos!==this.props.caretpos) {
			this.loadTOC(nextProps.caretpos);
		}
	}
	componentDidMount() {
		this.loadTOC(this.props.caretpos);
	}
	onSelect(idx,address){
		this.props.onSelectItem&&this.props.onSelectItem(address);
	}
	render(){
		return E(BreadCrumbTOC,{toc:this.state.toc,pos:this.props.caretpos
						,buttonStyle:styles.buttonStyle
						,buttonClass:"head"
						,buttonClassOffset:1
						,onSelect:this.onSelect.bind(this)
						,activeButtonStyle:styles.activeButtonStyle
						,untrimDepth:2//last two level is visible
					})
	}
};

TOCNav.propTypes={
	cor:PT.object.isRequired,
	caretpos:PT.number.isRequired,
	onSelectItem:PT.func
}

const styles={
	activeButtonStyle:{opacity:0.9},
	buttonStyle:{opacity:0.6}
}
module.exports=TOCNav;

},{"ksana2015-breadcrumbtoc":146,"react":"react"}],59:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const styles={
	container:{cursor:"pointer"},
	menu:{width:200,height:130,background:"silver",border:"solid 1px gray",borderRadius:"5px",padding:"5px"},
	inputfile:{opacity:0,zIndex:-1},
	uploadbutton:{cursor:"pointer",border:"1px solid black",borderRadius:"3px"},
	closebutton:{cursor:"pointer"},
	error:{background:"red",color:"yellow"}
}
const {_}=require("ksana-localization");
const {loadJSON}=require("../unit/localfile");
const address=require("../model/address");
class AuxMainmenu extends React.Component {
	openMenu(){
		this.setState({opened:true,lasterror:""});
	}
	constructor(props){
		super(props)
		this.state={opened:false,address:this.props.address};
	}
	closemenu(){
		this.setState({opened:false});	
	}
	opennew(){
		this.closemenu();
		address.openNewWindow(this.props.address,this.props.corpus);
	}
	changeAddress(e){
		this.setState({address:e.target.value});
	}
	goAddress(e){
		if (e.key=="Enter") {
			address.setAux(this.props.corpus+"@"+this.state.address);
		}
	}
	render(){
		if (this.state.opened) {
			return E("div",{style:styles.menu},
				E("span",{onClick:this.closemenu.bind(this),style:styles.closebutton},"✕"),
				"　",
				E("input",{value:this.state.address,
					onChange:this.changeAddress.bind(this),
					onKeyPress:this.goAddress.bind(this)}),
				E("br"),
				E("span",{},this.props.cor.getTitle(this.props.address)),
				E("button",{onClick:this.opennew.bind(this)},_("Open New Window"))
			)
		}

		return E("div",{style:styles.container,onClick:this.openMenu.bind(this)},
			E("span",{className:"hamburger"},"☰"))
	}
}

module.exports=AuxMainmenu;
},{"../model/address":107,"../unit/localfile":124,"ksana-localization":139,"react":"react"}],60:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const filterItem=require("../components/filteritem");
const mode=require("../model/mode");
const address=require("../model/address");
const {observer}=require("mobx-react");

const filter=require("../model/filter")
const {_}=require("ksana-localization");
const styles={
	container:{overflowY:"auto"},
	btn:{marginLeft:"10px"},
	cat:{cursor:"pointer"},
	selectedcat:{cursor:"pointer",background:"lightblue"}
}

class BookCategorySelector extends React.Component {
	constructor(props){
		super(props);
		const res=this.buildCategory();
		const groupNames=this.props.cor.groupNames();
		this.state=Object.assign({},{selCategory:-1},res);
	}
	getCategorySelected(){
		const rawgroupNames=this.props.cor.groupNames();
		const selOfCat=[];
		for (var i=0;i<rawgroupNames.length;i++) {
			const r=rawgroupNames[i].split(";");
			const r2=r[1].split("@");
			const prefix=parseInt(r2[0]);
			if (!filter.store.active[i]) {
				if (!selOfCat[prefix]) selOfCat[prefix]=0;
				selOfCat[prefix]++;
			}				
		}
		return selOfCat;
	}
	buildCategory(props){
		props=props||this.props;
		const rawgroupNames=this.props.cor.groupNames();
		var allOfCat=[],groupNames=[],id=[];
		for (var i=0;i<rawgroupNames.length;i++) {
			const r=rawgroupNames[i].split(";");
			id.push(r[0]);
			const r2=r[1].split("@");
			const prefix=parseInt(r2[0]);
			if (!allOfCat[prefix]) allOfCat[prefix]=[];
			allOfCat[prefix].push(groupNames.length);
			groupNames.push(r2[1]);		
		}
		return {allOfCat,groupNames,id,
			categoryNames:this.props.cor.meta.groupPrefix};
	}

	setExclude(group,value){
		filter.setExclude(group,value);
	}
	goGroup(group){
		const r=this.props.cor.groupKRange(group);
		const a=this.props.cor.stringify(r[0]);
		address.setMain(a);
		mode.tocView();
	}
	firstOccurOfGroup(group){
		return 0;
		var first=0;
		for(let i=0;i<group;i++) {
			if (!filter.store.active[i]){
				//first+=filter.store.active.hits[i];
			}
		}
		return first;
	}
	selectCat(key){
		const selCategory=parseInt(key);
		if (this.state.selCategory==selCategory) {
				this.setState({selCategory:-1});	
		} else {
				this.setState({selCategory});	
		}
	}
	checkCat(key){
		const all=this.state.allOfCat[key];
		const sel=this.selOfCat[key]||0;

		filter.setExclude(all,!!sel);		
	}
	renderCategory(item,key){
		const all=this.state.allOfCat[key];
		const sel=this.selOfCat[key]||0;
		const selected=this.state.selCategory==key;
		if (!all) return null;


		const checked=!!sel;
		return E("div",{key},"　",
				E("input",{type:"checkbox",checked,onChange:this.checkCat.bind(this,key)}),
			" ", E("span",{style:styles[(selected?"selectedcat":"cat")],
				onClick:this.selectCat.bind(this,key)},item), 
			" ",sel+"/"+all.length,
			selected?E("div",{},E("blockquote",{},all.map(this.renderGroup.bind(this)))):null
			);
	}
	renderGroup(group,key){
		var hit=0;
		if (this.props.showHit) {
		//	hit=filter.store.active.hits[group] || 0;			
		}
		
		const exclude=filter.store.active[group] || false;
		var br=false;
		var g=this.state.groupNames[group];
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		const label=g.replace(/.*;/,"");
		const hint=this.state.id[group] ;//g.replace(/;.*/,"");
		return E(filterItem,{parentElement:"span",label,hit,exclude,key:group,br,idx:group,hint,idx:group,
			setExclude:this.setExclude.bind(this),goGroup:this.goGroup.bind(this)});
	}
	selectall(){
		filter.includeAll();
	}
	deselectall(){
		filter.excludeAll();
	}
	render(){
		this.selOfCat=this.getCategorySelected();
		return E("div",{style:styles.container},
			E("button",{style:styles.btn,onClick:this.selectall.bind(this)},_("Select All")),
			E("button",{style:styles.btn,onClick:this.deselectall.bind(this)},_("Deselect All")),
			this.state.categoryNames.map(this.renderCategory.bind(this)));	
	}
};

module.exports=observer(BookCategorySelector);
},{"../components/filteritem":49,"../model/address":107,"../model/filter":110,"../model/mode":112,"ksana-localization":139,"mobx-react":39,"react":"react"}],61:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const SortByBook=require("./sortbybook");
const ModeSelector=require("./modeselector");
const {_}=require("ksana-localization");
const {showExcerpt}=require("../model/excerpt");
const searchresult=require("../model/searchresult");
const {observer}=require("mobx-react");
class BookResult extends React.Component {
	constructor(props){
		super(props);
		this.state={sort:true};
	}
	setSort(e){
		this.setState({sort:!this.state.sort});
	}
	render(){
		const mcount=searchresult.store.filtered?searchresult.store.filtered.length:0;

		return E("div",{},
			E("span",{},_("Matches"),":",E("span",{className:"totalhitcount"},mcount))
			," "

			,E(SortByBook,{cor:this.props.cor,
				showExcerpt,
				searchresult:searchresult.store,sort:this.state.sort})
			//,E("label",{},E("input",{type:"checkbox",onChange:this.setSort.bind(this)
			//	,checked:this.state.sort}),
			//	_("Sort by hit"))

		)
	}
};

module.exports=observer(BookResult);
},{"../model/excerpt":109,"../model/searchresult":113,"./modeselector":72,"./sortbybook":80,"ksana-localization":139,"mobx-react":39,"react":"react"}],62:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const filterItem=require("../components/filteritem");
const {readText}=require("../model/mode");
const address=require("../model/address");
const filter=require("../model/filter");
const {_}=require("ksana-localization");
const {observer}=require("mobx-react");

const styles={
	container:{overflowY:"auto"},
	btn:{marginLeft:"10px"},
	columncontainer:{display:"flex"},
	column:{flex:1}
}
const BookCategorySelector=require("./bookcategoryselector");


class BookSelector extends React.Component {
	setExclude(group,value){
		filter.setExclude(group,value);
	}
	goGroup(group){
		const r=this.props.cor.groupKRange(group);
		const a=this.props.cor.stringify(r[0]);
		address.setMain(a);
		readText();
	}
	firstOccurOfGroup(group){
		var first=0;
		for(let i=0;i<group;i++) {
			if (!filter.store.active[i]){
				first+=filter.store.active.hits[i];				
			}
		}
		return first;
	}
	rendergroups(groups){
		const columns=this.props.cor.meta.displayOptions.groupColumn;
		if (!columns) {
			return groups.map(this.rendergroup.bind(this));
		} else {
			var out=[],items=[],now=0;
			for (var i=0;i<groups.length;i++) {
				if (now<columns.length && i==columns[now]) {
					out.push(E("div",{key:i,style:styles.column},items));
					items=[];
					now++;
				}
				items.push(this.rendergroup(groups[i],i));
			}
			out.push(E("div",{key:i,style:styles.column},items));
			return E("div",{style:styles.columncontainer},out);
		}
	}	
	rendergroup(g,key){
		var hit=0;
		if (this.props.showHit) {
			hit=filter.store.active.hits[key] || 0;
		}
		const exclude=filter.store.active[key] || false;
		var br=false;
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		const hint=g.replace(/.*;/,"");
		const label=hint;//g.replace(/;.*/,"");
		return E(filterItem,{label,hit,exclude,key,br,idx:key,hint,idx:key,
			setExclude:this.setExclude.bind(this),goGroup:this.goGroup.bind(this)});
	}
	selectall(){
		filter.includeAll();
	}
	deselectall(){
		filter.excludeAll();
	}
	render(){
		if (this.props.cor.meta.groupPrefix) {
			return E(BookCategorySelector,this.props);
		}
		const groupNames=this.props.cor.groupNames();
		return E("div",{style:styles.container},
			E("button",{style:styles.btn,onClick:this.selectall.bind(this)},_("Select All")),
			E("button",{style:styles.btn,onClick:this.deselectall.bind(this)},_("Deselect All")),
			this.rendergroups(groupNames));	
	}
};
BookSelector.propTypes={
	cor:PT.object.isRequired
}
module.exports=observer(BookSelector);
},{"../components/filteritem":49,"../model/address":107,"../model/filter":110,"../model/mode":112,"./bookcategoryselector":60,"ksana-localization":139,"mobx-react":39,"react":"react"}],63:[function(require,module,exports){
/*
	TODO , load external Cor
*/
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const mode=require("../model/mode");
const corpora=require("../model/corpora");
const searchresult=require("../model/searchresult");
const LocalFile=require("../components/localfile");
const LocalSystem=require("../components/localsystem");
const LocalFileItem=require("../components/localfileitem");
const styles={
	opencorbutton:{color:"blue"}
}
const {_}=require("ksana-localization");
class DBSelector extends React.Component {
	constructor(props){
		super(props);
		this.state={noimage:{}};
	}
	selectdb(db){
		searchresult.clear();
		corpora.setActive(db);
		mode.selectBook();
	}
	onInputKeypress(e){

	}
	onImgError(db){
		var noimage=this.state.noimage;
		noimage[db]=true;
		this.setState({noimage});
	}
	openfile(e){
		const id=e.target.files[0];
		for (var i=0;i<e.target.files.length;i++) {
			if (!e.target.files[i])continue;
			const corpus=e.target.files[i];
			corpora.close(corpus.name.replace(".cor",""));
			corpora.open(corpus);
		}
	}
	renderRegister(cor){
		if (!cor) return;
		var corurl=cor.registered?'https://github.com/accelon/'+cor.id:'';
		var builddate=_("build date")+cor.meta.date;
		var corurllabel=_("about");
		var corurlclass="registered";
		if (!cor.registered) {
			corurl='https://github.com/accelon/register';
			corurllabel=_("unknowncor");
			corurlclass="unregistered";
		}
	
		return E("span",{},
			cor.local?E("span",{className:"localcor",title:builddate},_("local cor")):null,
			corurl?E("a",{href:corurl,target:"_new",
				title:builddate,className:corurlclass},
				corurllabel):null
		);
	}
	renderDB(item,key){
		const active=item==corpora.store.active;
		const cor=corpora.store.cor(item);

		var title=item;
		var onClick=this.selectdb.bind(this,item);
		var className=active?"activedbname":"dbname";

		if (cor) {
			title=cor.meta.title;
		} else {
			if (mode.store.fileprotocol) {
				onClick=null;
				className="dbnotopen";
			} else {
				setTimeout(function(){
					corpora.open(item);	
				},0);				
			}
		}
		var builddate=cor?_("build date")+cor.meta.date:"";
		return E("div",{key,className:"dbselector"},
			E("span",{className,onClick},title),
			this.renderRegister(cor),
			E("span",{},(active?"✓":""))
		);
	}
	render(){
		const items=Object.keys(corpora.store.corpora);
		return E("div",{},
			E("br"),
			E(LocalFile,{openfile:this.openfile.bind(this)}),
			E(LocalSystem),
			items.map(this.renderDB.bind(this))

			);
	}
}

module.exports=DBSelector;
},{"../components/localfile":53,"../components/localfileitem":54,"../components/localsystem":55,"../model/corpora":108,"../model/mode":112,"../model/searchresult":113,"ksana-localization":139,"react":"react"}],64:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const QSelector=require("../components/qselector");
const stockurls=[
	{name:"Google",url:"https://www.google.com.tw/search?q=$$"}
]
const selection=require("../model/selection");
const {observer}=require("mobx-react");

class DictView extends React.Component{
	constructor(props){
		super(props);

		const urls=stockurls.slice();
		const o=window.accelon2017&&window.accelon2017.dictionaries;
		if (o) {
			for (var i=0;i<o.length;i++) {
				urls.push(o[i]);
			}
		}

		this.state={site:0,urls}
	}
	componentWillMount(){
	}
	onSelect(t){
		var url=this.state.urls[this.state.site].url;
		window.open( url.replace("$$",t));
	}
	setExternalSite(idx){
		this.setState({site:idx});
	}
	renderExternalSite(item,key){
		return E("label",{key},
			E("input",{type:"radio",name:"external",
				checked:this.state.site==key,
				onChange:this.setExternalSite.bind(this,key)
			}) ,item.name," ");
	}
	render(){
		const s=selection.store;
		var q=s.selectionText?s.selectionText:s.caretText;
		const maxChar=this.state.urls[this.state.site].max;
		if (q.length>20) q=q.substr(0,20);
		return E("div",{},
			E(QSelector,{q,maxChar,onSelect:this.onSelect.bind(this)}),
			E("br"),
			this.state.urls.map(this.renderExternalSite.bind(this))
		)
	}
}
module.exports=observer(DictView);
},{"../components/qselector":57,"../model/selection":114,"mobx-react":39,"react":"react"}],65:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;

const maxbutton=10;
class ExcerptPager extends React.Component {
	calbatch(){
		if(!this.props.count) return null;

		var batchcount=Math.floor(this.props.count/this.props.hitperbatch);
		if (batchcount*this.props.hitperbatch<this.props.count) batchcount++;
		var remain=maxbutton;
		var start=this.props.batch||0 ,end=this.props.batch||0;
		while ( remain ) {
			if (start) {remain--;start--}
			if (remain&&end<batchcount) {remain--;end++}
			if (end>=batchcount)break;
		}
		return {start,end};
	}
	onClick(e) {
		const i=parseInt(e.target.dataset.idx);
		if (isNaN(i))return;
		this.props.gobatch(i);
	}
	renderPager(){
		const B=this.calbatch();
		if (!B)return;
		var out=[],className=null;
		for (let i=B.start;i<B.end;i++) {
			className=this.props.batch==i?"selectedpager":"pager";
			out.push( E("span",{className,key:i,"data-idx":i,onClick:this.onClick.bind(this)}, (i+1) ));
		}
		return out;
	}
	render(){
		return E("span",{className:"excerptpager"},
			this.renderPager()
		);
	}
}
ExcerptPager.propTypes={
		count:PT.number.isRequired,
		hitperbatch:PT.number.isRequired,
		batch:PT.number.isRequired,
		gobatch:PT.func.isRequired
}

module.exports=ExcerptPager;
},{"react":"react"}],66:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
class ExcerptSetting extends React.Component {
	setExtra(e){
		this.props.setExtra(parseInt(e.target.value,10));
	}
	render(){
		const extraline=this.props.extra;
		return E("span",{}," ",E("span",{},_("Extra Line")),
			E("label",{},E("input",{onClick:this.setExtra.bind(this),
				defaultChecked:extraline==1,name:"extra",type:"radio",value:1}),_("1")),
			E("label",{},E("input",{onClick:this.setExtra.bind(this),
				defaultChecked:extraline==0,name:"extra",type:"radio",value:0}),_("3")),
			E("label",{},E("input",{onClick:this.setExtra.bind(this),
				defaultChecked:extraline==5,name:"extra",type:"radio",value:5}),_("5"))
		)
	}
}

module.exports=ExcerptSetting;
},{"ksana-localization":139,"react":"react"}],67:[function(require,module,exports){
const React =require('react');
const ReactDOM =require('react-dom');
const {observer}=require("mobx-react");
const PT=React.PropTypes;
const E=React.createElement;
const ExcerptLine=require("../components/excerptline");
const ExcerptPager=require("./excerptpager");
const ExcerptSetting=require("./excerptsetting");
const mode=require("../model/mode");
const searchresult=require("../model/searchresult");
const BookResult=require("./bookresult");
const excerpt=require("../model/excerpt");
const address=require("../model/address");
const {highlightExcerpt}=require("../unit/highlight");
const {_}=require("ksana-localization");
const styles={
	container:{},
	table:{width:"100%"}
}
var prevtitle="";
class ExcerptView extends React.Component {
	getSeqOfBook(grouphits,now){
		if (!grouphits)return 0;
		var remain=now,acc=0, g=0;
		while (remain>=grouphits[g] && g<grouphits.length) {
			remain-=grouphits[g];
			g++;
		}
		return remain ;
	}

	openAddress(addr,now){
		address.setMain(addr);
		excerpt.setNow(now);
		mode.readText();
	}
	renderItem(item,key){
		const start=excerpt.store.batch*excerpt.store.hitperbatch;
		const n=start+key;
		const first=(excerpt.store.now%excerpt.store.hitperbatch)==0;
		const {grouphit,address,title,shorttitle}=this.excerptTitle(n);
		
		const header=(title!==prevtitle)? title:"";
		prevtitle=title;
		const now=excerpt.store.now;
		const seq=this.getSeqOfBook(searchresult.store.grouphits,n);
		const scrollto=now==n;
		var obj={};
		if (scrollto && !first) obj.ref="scrollto"; //no need to scroll if first item is highlighted
		const ex=excerpt.store.excerpts[key];
		if (!ex)return null;
		const hits=highlightExcerpt(this.props.cor,ex,searchresult.store.phrasepostings);
		return E(ExcerptLine,Object.assign(obj,item,
			{openAddress:this.openAddress.bind(this),key,now,n,seq,header,shorttitle,
				cor:this.props.cor,
				address:address||"",grouphit,scrollto,hits}));
	}
	excerptTitle(n){
		const sr=searchresult.store;
		if (!sr.filtered)return {};
		const tpos=sr.filtered[n];
		if (!tpos) return{};
		const address=this.props.cor.fromTPos(tpos).kpos[0];
		if (address) {
			var addressH=this.props.cor.stringify(address);
			addressH=addressH.substr(0,addressH.length-2);
			const group=this.props.cor.groupOf(address);
			const grouphit=sr.grouphits[group];

			const title=this.props.cor.getGroupName(address);
			const shorttitle=this.props.cor.getGroupName(address,true);
			return {grouphit,title,shorttitle,address:addressH};
		} else {
			return {grouphit:0,title:"",address:""};
		}
	}
	gobatch(batch) {
		const hitperbatch=excerpt.store.hitperbatch;
		excerpt.showExcerpt(batch*hitperbatch);
	}	
	setExtra(extra){
		excerpt.setExtraLine(extra);
	}
	render(){
		prevtitle="";
		const sr=searchresult.store;
		const excerpts=excerpt.store.excerpts;
		if (sr.searching) return E("div",{},"searching");
		if (!excerpts) return E("div",{},_("no result"));

		

		const count=(sr.filtered||{}).length||0;
		const hitperbatch=excerpt.store.hitperbatch;
		const batch=excerpt.store.batch;

		setTimeout(function(){ //componentDidUpdate only triggered once, don't know why
			const w=ReactDOM.findDOMNode(this.refs.scrollto);
			w&&w.scrollIntoView();
		}.bind(this),100)
		return E("div",{style:styles.container},
				E(BookResult,{cor:this.props.cor}),
				E(ExcerptPager,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)}),
				E(ExcerptSetting,{setExtra:this.setExtra.bind(this),
					extra:excerpt.store.extra}),
				excerpts.map(this.renderItem.bind(this)),
				E(ExcerptPager,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)})
		)
	}
}

module.exports=observer(ExcerptView);
},{"../components/excerptline":47,"../model/address":107,"../model/excerpt":109,"../model/mode":112,"../model/searchresult":113,"../unit/highlight":122,"./bookresult":61,"./excerptpager":65,"./excerptsetting":66,"ksana-localization":139,"mobx-react":39,"react":"react","react-dom":"react-dom"}],68:[function(require,module,exports){
const React =require('react');
const ReactDOM =require('react-dom');
const {observer}=require("mobx-react");
const PT=React.PropTypes;
const E=React.createElement;
const searchresult=require("../model/searchresult");
const excerpt=require("../model/excerpt");
const address=require("../model/address");
const mode=require("../model/mode");
const {groupTitle}=require("../unit/humantext");
const {renderHits,highlightExcerpt}=require("../unit/highlight");

class FuzzyResult extends React.Component {
	openAddress(addr,now){
		address.setMain(addr);
		excerpt.setNow(now);
		mode.readText();
	}	
	renderExcerpt(excerpt,key){
		if (!excerpt)return null;
		if (!excerpt.linebreaks)return null;
		if (!excerpt.linebreaks[0])return null;
		const hits=highlightExcerpt(this.props.cor,excerpt,searchresult.store.phrasepostings);
		const addr=excerpt.linebreaks[0];
		const page=this.props.cor.stringify(addr).match(/p\d+[abc]?/)[0];
		const title=groupTitle(this.props.cor.getGroupName(addr),this.props.cor)+page;
		const score=Math.round(searchresult.store.scores[key]*100);
		return E("div",{className:"excerpt",key},
			E("div",{className:" groupheader"},
				E("span",{className:"fuzzytitle",
					onClick:this.openAddress.bind(this,addr,key)},title), 
				" ",
				E("span",{className:"score"},score+"%")
			),
			renderHits(excerpt.text,hits, (o,t)=> E("span",o,t) )
		);
	}
	render(){
		const excerpts=excerpt.store.excerpts;
		if (!excerpts||!excerpts.length) {
			return E("div",{},"No found");
		}
		return E("div",{},excerpts.map(this.renderExcerpt.bind(this))
		)
	}
}


module.exports=observer(FuzzyResult);
},{"../model/address":107,"../model/excerpt":109,"../model/mode":112,"../model/searchresult":113,"../unit/highlight":122,"../unit/humantext":123,"mobx-react":39,"react":"react","react-dom":"react-dom"}],69:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {observer}=require("mobx-react");
const {_}=require("ksana-localization");
const address=require("../model/address");
const styles={
	a:{cursor:"pointer"}
}
class GroupNav extends React.Component{
	next(){
		const article=this.props.cor.articleOf(this.props.address);
		const next=this.props.cor.getArticle(article.at+1);
		address.setMain(next.startH);
	} 
	prev(){
		const article=this.props.cor.articleOf(this.props.address);
		const prev=this.props.cor.getArticle(article.at-1);
		address.setMain(prev.startH);
	}
	render(){
		const groupname=this.props.cor.getGroupName(this.props.address);
		const article=this.props.cor.articleOf(this.props.address);

		return E("span",{}
			,article.at?
				E("a",{className:"homebar fasciclelink",onClick:this.prev.bind(this)},_("Prev Fascicle")):null
			," "
			,E("span",{className:"homebar activegroup"},groupname)
			," "
			,(article.at+1<this.props.cor.articleCount())?
				E("a",{className:"homebar fasciclelink",onClick:this.next.bind(this)},_("Next Fascicle")):null
			);
	}
}
module.exports=observer(GroupNav);
},{"../model/address":107,"ksana-localization":139,"mobx-react":39,"react":"react"}],70:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const SearchBox=require("./searchbox");
const SearchOptions=require("./searchoptions");
const ModeSelector=require("./modeselector");
const {DBSELECTOR,selectDB,store}=require("../model/mode");
const mode=require("../model/mode");
const m=store.mode;
const {_}=require("ksana-localization");

class HomeBar extends React.Component {
	render(){
		const title=this.props.cor&&this.props.cor.meta.title;
		const date=this.props.cor&&_("build date")+this.props.cor.meta.date;
		const opencormessage=_("click and select one or more *.cor file in your local drive");

		return E("div",{className:"homebar homebarbox"}
			,"　"
			,E("span",{onClick:mode!==DBSELECTOR?selectDB:null,
				className:"activedb",title:date},title)
			,"　"
			,this.props.cor?E(SearchBox,this.props):null
			,"　"
			,this.props.cor?E(ModeSelector,this.props):null
			,!this.props.cor?opencormessage:null
			//,E(SearchOptions,this.props)
		)
	}
};
module.exports=HomeBar;
},{"../model/mode":112,"./modeselector":72,"./searchbox":78,"./searchoptions":79,"ksana-localization":139,"react":"react"}],71:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;

const HomeBar=require("./homebar");
const DBSelector=require("./dbselector");
const BookSelector=require("./bookselector");
const BookResult=require("./bookresult");
const FuzzyResult=require("./fuzzyresult");
const mode=require("../model/mode");
const searchresult=require("../model/searchresult");
const {DBSELECTOR,BOOKSELECTOR,TOCVIEW,BOOKRESULT,READTEXT,EXCERPTVIEW}=mode;
const ExcerptView=require("./excerptview");
const TOCView=require("./tocview");

const ReadText=require("./readtext");
const Footer=require("../components/footer");

const {observer}=require("mobx-react");

const corpora=require("../model/corpora");

const {execURL,syncURL}=require("../model/url");

const styles={
body:{overflowY:"auto",height:"96%",overflowX:"hidden"}
}

class MainScreen extends React.Component{
	componentWillMount(){
		corpora.init(this.props.corpora);
	}
	componentDidMount(){
		execURL(true);
	}
	getBody(m){
		const q=searchresult.store.q;
		const fuzzy=searchresult.store.fuzzy;
		m=parseInt(m);
		switch (m) {
			case DBSELECTOR: return DBSelector;
			case BOOKSELECTOR: return BookSelector;
			case READTEXT: return ReadText;
			case TOCVIEW: return TOCView;
			case BOOKRESULT: return q?BookResult:BookSelector;
			case EXCERPTVIEW: return fuzzy?FuzzyResult:ExcerptView;
		}
		return BookSelector;
	}
	getBodyRef(ref) {
		this.bodyref=ref;
	}
	componentDidUpdate(){
		if (this.bodyref) this.bodyref.scrollTop=0;
	}
	showFooter(){
		const m=parseInt(mode.store.mode);
		return (m!==READTEXT)?E(Footer):null;
	}
	render(){
		const cor=corpora.store.cor();
		//if (!cor) return E("div",{},"loading "+corpora.store.active);

		const props=Object.assign({},this.props,{cor});

		const bodyElement=this.getBody(mode.store.mode);

		return E("div",{}
			,E(HomeBar,props)
			,E("div",{style:styles.body,ref:this.getBodyRef.bind(this)}
				,E(bodyElement,props)
				,this.showFooter()
			)

		)
	}
};

module.exports=observer(MainScreen);
},{"../components/footer":50,"../model/corpora":108,"../model/mode":112,"../model/searchresult":113,"../model/url":115,"./bookresult":61,"./bookselector":62,"./dbselector":63,"./excerptview":67,"./fuzzyresult":68,"./homebar":70,"./readtext":76,"./tocview":81,"mobx-react":39,"react":"react"}],72:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
const mode=require("../model/mode");
const address=require("../model/address");
const excerpt=require("../model/excerpt");
const {DBSELECTOR,BOOKSELECTOR,TOCVIEW,READTEXT,EXCERPTVIEW}=mode;

const searchresult=require("../model/searchresult");
const GroupNav=require("./groupnav");
const GoPage=require("../components/gopage");
const {observer}=require("mobx-react");
class ModelSelector extends React.Component{
	gotopage(){
		const group=this.props.cor.groupOf(address.store.main);
		const range=this.props.cor.groupKRange(group);
		
		return E(GoPage,{cor:this.props.cor, range, readText:mode.readText});
	}
	showExcerpt(){
		excerpt.showExcerpt();
		mode.excerptView();
	}
	render(){
		const m=mode.store.mode;
//		const showBookResult=searchresult.store.filtered && searchresult.store.filtered.length 
//				&& searchresult.store.q;
		const hasExcerpt=searchresult.store.filtered&&searchresult.store.filtered.length;

		return E("span",{},
			E("a",{className:(m==BOOKSELECTOR?"activemodelink":"modelink"),onClick:mode.selectBook},_("Home Page")),
			" ",
			m==READTEXT?E("a",{className:(m==TOCVIEW?"activemodelink":"modelink"),onClick:mode.tocView},_("TOC View")):null,
			" ",
//			showBookResult?E("a",{className:(m==BOOKRESULT?"activemodelink":"modelink"),onClick:mode.groupByBook},_("Group By Book")):null,
//			" ",
			hasExcerpt?E("a",{className:(m==EXCERPTVIEW?"activemodelink":"modelink"),onClick:this.showExcerpt},_("Excerpt")):null,
			" ",
			m==READTEXT?E(GroupNav,{setAddress:address.setMain,address:address.store.main,cor:this.props.cor}):null,
			" ",
			(m==READTEXT||m==TOCVIEW)?this.gotopage():null
		)
	}
}

module.exports=observer(ModelSelector);
},{"../components/gopage":51,"../model/address":107,"../model/excerpt":109,"../model/mode":112,"../model/searchresult":113,"./groupnav":69,"ksana-localization":139,"mobx-react":39,"react":"react"}],73:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const ReferenceView=require("./referenceview");
const DictView=require("./dictview");
const styles={
	container:{display:"flex",flexDirection:"column",height:"100%"},
	dictionary:{flex:2,overflowY:"auto"},
	reference:{height:"90%"},
}
class ReadAux extends React.Component {
	render(){
		return E("div",{style:styles.container},
			E("div",{style:styles.dictionary},E(DictView,this.props)),
			E("div",{style:styles.reference},E(ReferenceView,this.props))
		)
	}

}

module.exports=ReadAux;
},{"./dictview":64,"./referenceview":77,"react":"react"}],74:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {observer}=require("mobx-react");

const {CorpusView}=window.KsanaCorpusView||require("ksana-corpus-view");
const decorators=require("../decorators");
const quoteCopy=require("../unit/quotecopy");
//const {getExternalField}=require("../unit/fields");
const TOCNav=require("../components/tocnav");
const ReadMainmenu=require("./readmainmenu");
const {fetchArticle,loadArticleMarkup}=require("../unit/article");
const mode=require("../model/mode");
const {openLink}=require("../model/address");
const corpora=require("../model/corpora");
const selection=require("../model/selection");
const searchresult=require("../model/searchresult");
const markups=require("../model/markups");
const address=require("../model/address");
const styles={
	abscontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:100},
	menu:{position:"absolute",left:0,top:0}
}

class ReadMain extends React.Component {
	constructor(props) {
		super(props);
		const kpos=this.getCaretKPos();
	this.state= {article:{at:-1},kpos};
	}
	fetch(props){
		const mrks=markups.store.markups[this.props.cor.id];
		if (this.state.address==address.store.main) {
			return;
		}

		props=props||this.props;

		const article=this.props.cor.articleOf(address.store.main);
		if (article &&article.at==this.state.article.at) return;

		fetchArticle(this.props.cor,address.store.main,mrks,(states)=>{
			//console.log(states.fields)
			states.layoutTags=this.props.cor.getParagraphBreaks(states.fields);
			if (!this._unmounted) {
				this.setState(states);
				this.setState({mrks:mrks});
			}
		})  	
	}
	componentWillUpdate(){
		const age=markups.store.age[this.props.cor.id];
		if (age&&age!==this.state.age){ //age changed
			const mrks=markups.store.markups[this.props.cor.id];
			const fields=loadArticleMarkup(this.state.fields,mrks,this.state.article.at);
			setTimeout(()=>{
				this.setState({fields,age});
			},10)
		}
		
		if (!this._unmounted) this.fetch(this.props);
	}
	componentWillMount(){
		this.fetch(this.props);
	}
	componentWillUnmount(){
		this._unmounted=true;
	}
	updateArticleByAddress(a){
		const addressH=this.props.cor.stringify(a);
		address.setMain(addressH);
	}
	getCaretKPos(){
		const r=this.props.cor.parseRange(address.store.main);
		return r.start||0;
	}
	onCursorActivity(cm,kpos) {
		const addressH=this.props.cor.stringify(kpos);
		if (kpos>1) {
			address.setMain(addressH,true);
		}
	}
	render(){
		if ( this.state.article==-1) {
			return E("div",{},"loading");
		}
		const caretpos=this.getCaretKPos();
		const navprops={caretpos,cor:this.props.cor,
			onSelectItem:this.updateArticleByAddress.bind(this)};
		const age=markups.store.age[this.props.cor.id];

		const menuprops=Object.assign({},this.props,{
			layout:mode.store.layout,
			fields:this.state.fields,hidefields:this.props.hidefields,
			setField:this.props.setField});

		const cors=corpora.openedCors();
		var layout=null;
		if(mode.store.layout && this.state.fields &&this.state.fields.p) {
			layout=this.state.layoutTags;
		};

		return E("div",{},
			E("div",{style:styles.abscontainer},
				E("div",{style:styles.nav},E(TOCNav,navprops))
			 ,E("div",{style:styles.menu},E(ReadMainmenu,menuprops))
			)
			,E(CorpusView,{address:address.store.main,
			
			cor:this.props.cor,
				corpora:cors,
			article:this.state.article,
			rawlines:this.state.rawlines||[],
			layout,
			decorators,
			onCursorActivity:this.onCursorActivity.bind(this),
			copyText:quoteCopy,
			fields:this.props.displayField(this.state.fields),
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink,
			showNotePopup:this.props.showNotePopup,
			//showLinkPopup:this.props.showLinkPopup,
			showPageStart:true,
			autoFollowSingleLink:true,//auto follow single link 
			setSelection:selection.setSelection.bind(this),
			searchresult:searchresult.store,
			//theme:"ambiance"
			})
		);
	}
}

module.exports=observer(ReadMain);
},{"../components/tocnav":58,"../decorators":88,"../model/address":107,"../model/corpora":108,"../model/markups":111,"../model/mode":112,"../model/searchresult":113,"../model/selection":114,"../unit/article":117,"../unit/quotecopy":128,"./readmainmenu":75,"ksana-corpus-view":136,"mobx-react":39,"react":"react"}],75:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const FieldSelector=require("../components/fieldselector");
const {loadExternalMarkup}=require("../model/markups");
const styles={
	container:{cursor:"pointer"},
	inputfile:{opacity:0,zIndex:-1},	
	closebutton:{cursor:"pointer"},
	error:{background:"red",color:"yellow"}
}
const {_}=require("ksana-localization");
const {loadJSON}=require("../unit/localfile");
const mode=require("../model/mode");
class ReadMainmenu extends React.Component {
	openMenu(){
		this.setState({opened:true,lasterror:""});
	}
	constructor(props){
		super(props)
		this.state={opened:false};
	}
	closemenu(){
		this.setState({opened:false});	
	}
	loadmarkup(e){
		this.setState({lasterror:"loading"});
		loadJSON(e.target.files[0],json=>{
			const meta=json.shift();
			
			if (meta.corpus!==this.props.cor.id) {
				this.setState({lasterror:"markup is not for this corpus"});
			} else {
				this.setState({lasterror:"",first:meta.first});
				loadExternalMarkup(meta,json,this.props.cor);
			}
		});
	}
	gotofirst(){
		this.setState({first:null,opened:false});
		this.props.setA(this.state.first);
	}
	renderFirstMarkup(){
		if (this.state.first) {
			return E("button",{onClick:this.gotofirst.bind(this)},_("View First Markup"));
		}
	}
	togglelayout(){
		mode.setLayout(this.props.layout?0:1,true);
	}

	render(){
		const layout=this.props.layout;
		const hasP=this.props.fields&&this.props.fields.p &&
		this.props.fields.p.pos&&this.props.fields.p.pos.length;
		if (this.state.opened) {
			return E("div",{className:"readmainmenu"},
				E("span",{onClick:this.closemenu.bind(this),style:styles.closebutton},"✕"),
				"　",
				hasP?E("button",{onClick:this.togglelayout.bind(this)},layout?_("Layout Off"):_("Layout On")):null,
				E("br"),
				E(FieldSelector,{fields:this.props.fields,hidefields:this.props.hidefields,setField:this.props.setField}),
				E("br"),"　",
				E("label",{htmlFor:"upload",className:"uploadmarkupbutton"},_("Load Markup")),
				E("input",{type:"file",style:styles.inputfile,accept:".json",
					id:"upload",onChange:this.loadmarkup.bind(this)}),
				this.renderFirstMarkup(),
				E("span",{style:styles.error},this.state.lasterror)
			)
		}

		return E("div",{style:styles.container,onClick:this.openMenu.bind(this)},
			E("span",{className:"hamburger"},"☰"))
	}
}

module.exports=ReadMainmenu;
},{"../components/fieldselector":48,"../model/markups":111,"../model/mode":112,"../unit/localfile":124,"ksana-localization":139,"react":"react"}],76:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const ReadMain=require("./readmain");
const ReadAux=require("./readaux");
const NotePopup=require("../components/notepopup");
const LinkPopup=require("../components/linkpopup");
const mpps=require("../unit/mpps");
const {openLink}=require("../model/address");
const corpora=require("../model/corpora");
const address=require("../model/address");
const SplitPane=require("react-split-pane");
const styles={container:{},left:{},right:{}};
const mainsizekey="accelon2017.defaultSize";
class ReadText extends React.Component {
	constructor(props){
		super(props);
		const minSize=Math.floor(window.innerWidth * 0.35);
		const w=parseInt(localStorage.getItem(mainsizekey)||"0",10);
		const defaultSize=w||minSize*2;
		this.state={popupX:0,popupY:0,text:"",title:"",hidefields:{},
		lpopupX:0,lpopupY:0,ltitle:"",links:[],lclose:true,minSize,defaultSize};
	}
	showNotePopup(opts){
		this.setState({popupX:opts.x,popupY:opts.y,text:opts.text,notekpos:opts.kpos,
			title:opts.title,tagname:opts.tagname,popuptimestamp:new Date()});
	}
	showLinkPopup(opts){
		if (!opts) {
			this.setState({lclose:true});
		} else {
			this.setState({lclose:false,lpopupX:opts.x,lpopupY:opts.y,links:opts.links,
			lactions:opts.actions,ltitle:opts.title,lpopuptimestamp:new Date()});			
		}
	}	
	setField(field,on){
		var hidefields=this.state.hidefields;
		hidefields[field]=on;
		this.setState({hidefields});
	}	
	displayField(F){
		var fields={};
		for (var i in F) {
			if (!this.state.hidefields[i]) {
				fields[i]=F[i];
			} else {
				delete fields[i];
			}
		}
		return fields;
	}
	onSplitterDown(){

	}
	onSplitterMove(e){
		if (e.buttons==1) {
			const x=e.clientX;
			e.target.style.left=x;
		}
	}
	onSplitterUp(e){

	}
	onChangeMainSize(size){
		clearTimeout(this.timer);
			this.timer=setTimeout(function(){
	 			localStorage.setItem(mainsizekey, size);	
		},1000);
	}
	render(){
		const props=Object.assign({},this.props,{
			showNotePopup:this.showNotePopup.bind(this),
			showLinkPopup:this.showLinkPopup.bind(this),
			displayField:this.displayField.bind(this),
			hidefields:this.state.hidefields,
			setField:this.setField.bind(this)});
		
		const cors=corpora.openedCors();
		const mainAddress=address.store.main;
		const mainCorpus=corpora.store.active;
		return E("div",{},
			E(NotePopup,{x:this.state.popupX,y:this.state.popupY,openLink,
				text:this.state.text,title:this.state.title,tagname:this.state.tagname,
				kpos:this.state.notekpos,
				timestamp:this.state.popuptimestamp,cor:cors[mainCorpus]}),
			E(LinkPopup,{x:this.state.lpopupX,y:this.state.lpopupY,openLink,
				title:this.state.ltitle,links:this.state.links,cors,mainAddress,mainCorpus,
				close:this.state.lclose,
				timestamp:this.state.lpopuptimestamp,actions:this.state.lactions}),

			E(SplitPane,{split:"vertical",minSize:this.state.minSize,
				defaultSize:this.state.defaultSize,
				style:{paddingBottom:"2em"}, //need this because splitPanel set height to 100%
				onChange:this.onChangeMainSize.bind(this)
			},
				E("div",{},E(ReadMain,props))
				,E("div",{},E(ReadAux,props))
			)
		);
	}
}
module.exports=ReadText;
},{"../components/linkpopup":52,"../components/notepopup":56,"../model/address":107,"../model/corpora":108,"../unit/mpps":126,"./readaux":73,"./readmain":74,"react":"react","react-split-pane":41}],77:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("../unit/article");
const quoteCopy=require("../unit/quotecopy");
const {notarget2address}=require("../unit/taisho");
const {getAnchorAddress}=require("../unit/anchor");
const decorators=require("../decorators");
const AuxMainmenu=require("./auxmainmenu");
const mode=require("../model/mode");
const address=require("../model/address");
const selection=require("../model/selection");
const markups=require("../model/markups");
const corpora=require("../model/corpora");
const {observer}=require("mobx-react");
const {autorun}=require("mobx");
const {linkpopupmatrix}=require("../unit/popupmatrix");
const LocalFile=require("../components/localfile");
const {_}=require("ksana-localization");

const styles={
	abscontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:100},
	menu:{position:"absolute",left:1,top:1}
}

class ReferenceView extends React.Component {
	constructor (props) {
		super(props);
		this.state={article:null,message:"",cor:null};
	}
	/*
	shouldComponentUpdate(nextProps,nextState){
		const r= nextProps.params.r&&
		 (nextProps.params.r!==params.store.r || (this.state.article&&(this.state.article.at!=nextState.article.at)));
		 return !!r;
	}
	*/
	fetchAddress(cor,addr,mrks){
		if (addr&&!this._unmounted) {
			this.setState({message:"loading "+addr});
		}

		if ( parseInt(addr,10).toString(10)==addr) {
			addr=cor.stringify(addr);
		}
		fetchArticle(cor,addr,mrks,function(states){
			console.log(states)
			const r=address.store.aux;
			if (!this._unmounted) {
				this.setState(Object.assign({},states,{addr,cor,message:null,r}));
			}
		}.bind(this));
	}
	componentWillUnmount(){
		this._unmounted=true;
	}
	componentDidMount(){
		autorun(()=>{
			const a=address.store.aux;
			//make sure loadtext when user open a local file
			const c=Object.keys(corpora.store.corpora).length;
			clearTimeout(this.timer);
			this.timer=setTimeout(function(){
				if (!this._unmounted) this.loadtext(this.props);	
			}.bind(this),200+c);
		});		
	}
	loadtext(props){
		props=props||this.props;
 		if (!address.store.aux)return ;
		const r=address.store.aux.split("@");
		const corpus=r[0].toLowerCase(); //Taisho ==> taisho		
		const cor=corpora.store.cor(corpus);
		if (!cor) {
			if (!mode.store.fileprotocol) {
				corpora.open(corpus);
			}
			return;
		}

		var addr=r[1];
		if (parseInt(addr,10).toString(10)==addr) {
			addr=cor.stringify(addr);
		}
		const range=cor.parseRange(addr);
		const mrks=markups.store.markups[corpus];
		if (!range.start) {
			if (r[0]=="Taisho") { //not page number, sutra id with optional i
				notarget2address(cor,addr,newaddress=>{
					if (this.state.address!=newaddress) {
						this.fetchAddress(cor,newaddress,mrks);
					}
				});
				return;
			}

			const a=getAnchorAddress(cor,addr);
			if (a) this.fetchAddress(cor,a,mrks);
		} else {
			this.fetchAddress(cor,addr,mrks);
		}
	}
	updateArticleByAddress(addr){
		const addressH=this.state.cor.stringify(addr);
		address.setMain(addressH);
	}	
	updateMainText(fulladdress){
		const r=fulladdress.split("@");
		const cor=corpora.store.cor(r[0]);
		var a=r[1];
		if (parseInt(a,10).toString()==a) {
			a=parseInt(a,10);
		}
		if (cor) {
			const range=cor.parseRange(a);
			if (!range.start) a=cor.stringify(getAnchorAddress(cor,a));
		}
		corpora.setActive(r[0]);
		address.setMain(a);
	}
	followLinks(cm,links,actions){
		if (links.length<2) {
			this.props.showLinkPopup(null);//hide the popup
			return false;//use default
		}
		const coords=cm.cursorCoords(cm.getCursor());

		var y=coords.top-linkpopupmatrix.height-80;
		if (y<50) y=coords.top+30;
		var x=coords.left-30;
		
		this.props.showLinkPopup({x,y,links,title:_("backlink"),actions});
		return true;
	}
	openfile(e){
		const id=e.target.files[0];
		for (var i=0;i<e.target.files.length;i++) {
			if (!e.target.files[i])continue;
			const corpus=e.target.files[i];
			corpora.open(corpus);
		}
	}
	render(){
		const r=address.store.aux.split("@");
		if (this.state.message||!this.state.article) {
			if (mode.store.fileprotocol&&r[0]) {
				return E("div",{},
					E("span",{},_("Require Cor:")),
					E("span",{style:{fontWeight:700,size:"125%"}}
						,r[0]),
					E(LocalFile,{openfile:this.openfile.bind(this)})
				)
			}
			return E("div",{},this.state.message);
		}
		
		const menuprops=Object.assign({},this.props,{
			cor:this.state.cor,
			corpus:r[0],
			address:this.state.address});
		const cors=corpora.openedCors();
		return E("div",{},
			E("div",{style:styles.abscontainer},
			 E("div",{style:styles.menu},E(AuxMainmenu,menuprops))
			)

			, E(CorpusView,{address:this.state.address,
			fulladdress:address.store.aux,
			decorators,
			id:"aux",
			cor:this.state.cor,
			corpora:cors,
			article:this.state.article,
			rawlines:this.state.rawlines,
			fields:this.props.displayField(this.state.fields),
			followLinks:this.followLinks.bind(this),
			showNotePopup:this.props.showNotePopup, //called by decorators/popupnote 
			copyText:quoteCopy,
			showPageStart:true,
			setSelection:selection.setSelection.bind(this),
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink:this.updateMainText.bind(this),
			aux:true//open Link will update main text
			})
		);
	}
}
module.exports=observer(ReferenceView);
},{"../components/localfile":53,"../decorators":88,"../model/address":107,"../model/corpora":108,"../model/markups":111,"../model/mode":112,"../model/selection":114,"../unit/anchor":116,"../unit/article":117,"../unit/popupmatrix":127,"../unit/quotecopy":128,"../unit/taisho":129,"./auxmainmenu":59,"ksana-corpus-view":136,"ksana-localization":139,"mobx":40,"mobx-react":39,"react":"react"}],78:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization");
const mode=require("../model/mode");
const excerpt=require("../model/excerpt");
const searchresult=require("../model/searchresult");
const address=require("../model/address");


class SearchBox extends React.Component {
	constructor(props){
		super(props)
		this.state={q:searchresult.store.q||""}
	}
	componentWillReceiveProps(nextProps,nextState){
		this.setState({q:searchresult.store.q});
	}
	tryAddress(q){
		var address=false;
		const r=this.props.cor.parseRange(q);
		if (r.start) {
			address=q;
		}
		
		return address;
	}
	search(){
		const a=this.tryAddress(this.state.q);
		if (a) {
			searchresult.setQ("");
			mode.readText();
			address.setMain(a);
		} else {
			searchresult.setQ(this.state.q,function(){
				excerpt.showExcerpt();
				mode.excerptView();
			});
			this.input.focus();
		}
	}
	setRef(ref){
		this.input=ref;
	}
	onChange(e){
		this.setState({q:e.target.value});
	}
	onKeyPress(e){
		if (e.key==="Enter") this.search();
	}
	render(){
		return E("span",{className:"searchbox"},
			E("input",{className:"input",placeholder:_("Puncuation to enable Fuzzy Search"),ref:this.setRef.bind(this),value:this.state.q,
				onChange:this.onChange.bind(this),onKeyPress:this.onKeyPress.bind(this)})
			,E("button",{className:"button",onClick:this.search.bind(this)},_("Search"))
		)
	}
};
module.exports=SearchBox;
},{"../model/address":107,"../model/excerpt":109,"../model/mode":112,"../model/searchresult":113,"ksana-localization":139,"react":"react"}],79:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
class SearchOptions extends React.Component {
	render(){
		return E("span",{},
			"檢索字距"
			,E("input",{size:1})
		)
	}
};
module.exports=SearchOptions;
},{"react":"react"}],80:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	container:{overflowY:"auto"}
}
const {observer}=require("mobx-react");
const {groupTitle}=require("../unit/humantext");
const excerpt=require("../model/excerpt");
const searchresult=require("../model/searchresult");
const {_}=require("ksana-localization");
class SortByBook extends React.Component {
	gotogroup(n){
		const grouphits=searchresult.store.grouphits;
		var g=0,start=0;
		while (n>0 && g<grouphits.length) {
			start+=grouphits[g++];
			n--;
		}
		excerpt.showExcerpt(start);
	}
	sortResult(sort){
		const groupNames=this.props.cor.groupNames();
		if (!sort) {
			return groupNames.map((i,idx)=>idx);
		}
		if (!searchresult.store.q||!searchresult.store.grouphits)return [];

		var out=[]; //group id,hit

		
		for (var i=0;i<groupNames.length;i++) {
			const hit=searchresult.store.grouphits[i] || 0;
			out.push([i,hit]);
		}
		out.sort((a,b)=>b[1]-a[1]);
		return out.map(a=>a[0]);
	}
	rendergroup(g,key){
		if (!searchresult.store.q||!searchresult.store.grouphits)return;
		const hit=searchresult.store.grouphits[g] || 0;
		const gname=this.props.cor.groupNames()[g];
		const title=gname.replace(/;.*/g,"");
		const hint=gname.replace(/.*;/,"");
		const label=groupTitle(hint,this.props.cor);
		if (!hit) return null;

		return E("li",{key,className:"bookresult"},
				E("a",{},
					E("span",{className:"hit"},hit),
					E("span",{className:"bookname",onClick:this.gotogroup.bind(this,g),title},label)
				)				
		);
	}
	render(){
		const groups=this.sortResult(this.props.sort);
		const groupWithHits=searchresult.store.grouphits.filter(item=>!!item).length;
		return E("div",{className:"mui-dropdown"},
  				E("button",{ className:"mui-btn",
  				 "data-mui-toggle":"dropdown"},
    				_("total book")+" "+groupWithHits,
    			E("span",{className:"mui-caret"})
 				),
 				E("ul",{className:"mui-dropdown__menu"},
					groups.map(this.rendergroup.bind(this)))
			);	
		}
};

module.exports=observer(SortByBook);
},{"../model/excerpt":109,"../model/searchresult":113,"../unit/humantext":123,"ksana-localization":139,"mobx-react":39,"react":"react"}],81:[function(require,module,exports){
const React =require('react');
const ReactDOM =require('react-dom');
const PT=React.PropTypes;
const E=React.createElement;
const mode=require("../model/mode");
const address=require("../model/address");

class TOCView extends React.Component {
	constructor(props){
		super(props);
		const MAX_LEVEL=32;
		var indents=[],s="";
		for (var i=0;i<MAX_LEVEL;i++) {
			indents.push(s);
			s+="　";
		}
		this.state={toc:null,indents,kpos:0};
	}
	buildToc(rawtoc){
		var toc=[];
		for (var i=0;i<rawtoc.length;i++) {
			const item=rawtoc[i];
			const parts=item.split("\t");
			const depth=parseInt(parts[0]);
			const label=parts[1];
			const kpos=parseInt(parts[2],36);
			toc.push([kpos,depth,label])
		}
		return toc;
	}
	componentDidMount(){		
		const group=this.props.cor.groupOf(address.store.main);
		const kpos=this.props.cor.parseRange(address.store.main).start;
		
		this.props.cor.getGroupTOC(group,function(rawtoc){
			const toc=this.buildToc(rawtoc);
			this.setState({toc,kpos});
		}.bind(this));
	}
	gotocitem(e) {
		const kpos=parseInt(e.target.dataset.kpos);
		const addr=this.props.cor.stringify(kpos);
		address.setMain(addr);
		mode.readText();
	}
	componentDidUpdate(){ 
		setTimeout(function(){ //scroll to closest toc node
			const ref=this.refs.toclabel_selected;
			if (ref && this.refs.body){
				ref.scrollIntoView(false);
				//const container=this.refs.body.parentElement;
				//container.scrollTop+=window.innerHeight/2;
			} 
		}.bind(this),100); //need to wait react to update DOM
	}
	renderItem(item,key,toc){
		const kpos=item[0], indent=this.state.indents[item[1]], label=item[2];
		const pg=this.props.cor.pageOf(kpos)+1;
		var extra="";

		if (this.state.kpos>=kpos && key<toc.length-1 && this.state.kpos<toc[key+1][0]) {
			extra=" toclabel_selected"
		}
		return E("div",{key},indent,
			E("span",{"data-kpos":kpos,className:"toclabel"+extra,ref:extra.trim(),
				title:"Page "+pg,onClick:this.gotocitem.bind(this)},label));
	}
	render(){
		if (!this.state.toc) return E("div",{},"loading toc");
		if (!this.state.toc.length) return E("div",{},"Empty TOC");

		const group=this.props.cor.groupOf(address.store.main);
		const range=this.props.cor.groupKRange(group);
		
		
		return E("div",{ref:"body"},
			this.state.toc.map(this.renderItem.bind(this))
		);
	}
}

module.exports=TOCView;
},{"../model/address":107,"../model/mode":112,"react":"react","react-dom":"react-dom"}],82:[function(require,module,exports){
const createLink=function({cm,cor,field,start,end,id,target,active,actions}){
	return cm.markText(start,end,{className:"k"});
}
module.exports=createLink;
},{}],83:[function(require,module,exports){
const createCDATA=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const widget=document.createElement("div");
	widget.innerHTML=target;
	return cm.setBookmark(end,{widget,handleMouseEvents:true});
}
module.exports=createCDATA;

},{}],84:[function(require,module,exports){
const createCollation=function({cm,cor,start,end,id,tabid,target,actions,krange,field,fields}){
	if (krange.start==krange.end) { //insert
		const widget=document.createElement("span");
		widget.className="collation_insert";
		widget.innerHTML=target;
		return cm.setBookmark(start,{widget});
	} else { //replace or delete
		if (target) { //replace
			const widget=document.createElement("span");
			widget.className="collation_insert";
			widget.innerHTML=target;
			const d=cm.markText(start,end,{className:"collation_delete"});
			const newtext=cm.setBookmark(start,{widget});
			return [d,newtext];
		} else {
			return cm.markText(start,end,{className:"collation_delete"});
		}
	}
}	

module.exports=createCollation;
},{}],85:[function(require,module,exports){
const onDefMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
	if (!target.action) {
		console.error("action updateArticleByAddress is not defined");
	}
	target.action&&target.action(address,target.tabid);
}
const createDef=function({cm,cor,corpus,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	dom.className="def";
	const label=fields.noteid.value[id].replace(/.+\./,"").replace(/^0+/,"");
	dom.innerHTML=label;
	if (label=="1") dom.className+=" defgroup";
	dom.dataset.target=target;
	dom.onmousedown=onDefMouseDown;
	dom.action=actions.updateArticleByAddress;
	dom.cor=cor;
	dom.tabid=tabid;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}

module.exports=createDef;
},{}],86:[function(require,module,exports){
const createHead=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	return cm.markText(start,end,{className:"head head"+target});
}

module.exports=createHead;
},{}],87:[function(require,module,exports){
const createImage=function({cm,cor,start,end,field,id,tabid,target,actions,fields}){
	const container=JSON.stringify(start)==JSON.stringify(end)?"span":"div";

	const widget=document.createElement(container);
	const img=document.createElement("img");
	img.src='data:img/'+field+';base64,'+target;
	img.title=cm.doc.getRange(start,end);
	widget.appendChild(img);

	if (start==end) {
		return cm.setBookmark(end,{widget});	
	} else {
		return cm.markText(start,end,{replacedWith:widget});
	}	
}
module.exports=createImage;

},{}],88:[function(require,module,exports){
const ptr=require("./ptr");
const def=require("./def");
const note=require("./note");
const link=require("./link");
const bilink=require("./bilink");
const k=require("./bilink");
const kepan=require("./kepan");
const figure=require("./table");
const table=require("./table");
const translation=require("./translation");
const head=require("./head");
const rubynote=require("./rubynote");
const mppsnote=require("./popupnote");
const yinshunnote=require("./popupnote");
const footnote=require("./popupnote");
const cdata=require("./cdata");
const jpeg=require("./image");
const png=require("./image");
const inlinesvg=require("./inlinesvg");
const svg=require("./table");
const punc=require("./punc");
const pu=require("./punc");
/* might be simplified to maketext with className same as type */
const inlinenote=require("./inlinenote");
const jin=require("./jin");
const p=require("./p");
const span=require("./span");
const rend=require("./rend"); //same as span for TEI rend
const origin=require("./origin");
const collation=require("./collation");
module.exports={ptr,def,note,link,k,bilink,figure,table,kepan,translation,cdata,
	inlinesvg,
	mppsnote,yinshunnote,inlinenote,jin,p,span,head,rend,footnote,origin,rubynote,png,jpeg,svg
,punc,pu,collation}
},{"./bilink":82,"./cdata":83,"./collation":84,"./def":85,"./head":86,"./image":87,"./inlinenote":89,"./inlinesvg":90,"./jin":91,"./kepan":92,"./link":93,"./note":94,"./origin":95,"./p":96,"./popupnote":97,"./ptr":98,"./punc":99,"./rend":100,"./rubynote":101,"./span":102,"./table":103,"./translation":104}],89:[function(require,module,exports){
const createInlineNote=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	return cm.markText(start,end,{className:"inlinenote"});
}

module.exports=createInlineNote;
},{}],90:[function(require,module,exports){
const createInlineSVG=function({cm,cor,start,end,field,id,tabid,target,actions,fields}){
	const widget=document.createElement("img");
	widget.src="data:image/svg+xml;utf8,"+encodeURI(target);
	widget.style="height:1.4em";
	if (start==end) {
		return cm.setBookmark(end,{widget});	
	} else {
		return cm.markText(start,end,{replacedWith:widget});
	}	
}
module.exports=createInlineSVG;

},{}],91:[function(require,module,exports){
const createJin=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		return cm.markText(start,end,{className:"jin"});
}

module.exports=createJin;
},{}],92:[function(require,module,exports){
var linktimer;
const onKepanMouseOver=function(e){
	const action=e.target.action;
	const go=e.target.dataset.go;
	popuptimer=setTimeout(function(){
		action(go);
	},400);
}
const onKepanMouseLeave=function(e){
	clearTimeout(popuptimer);
}

const createKepanItem=function(cor,depth,label,target,actions,tabid){
	const kepanwidget=document.createElement("div");
	var clsname="kepanlevel kepanlevel"+depth;

	if (tabid!="aux") {
		kepanwidget.dataset.go=cor.id+"@"+target;
		kepanwidget.action=actions.openLink;
		kepanwidget.onmouseover=onKepanMouseOver;
		kepanwidget.onmouseleave=onKepanMouseLeave;
		clsname+=" kepanresponsive"
	}
	kepanwidget.className=clsname;
	kepanwidget.innerHTML=label;

	return kepanwidget;
}
const createKepans=function(cor,parent,strings,actions,tabid){
	if (typeof strings=="string") strings=[strings];
	for (var i=0;i<strings.length;i++) {
		var indent="";
		var m=strings[i].match(/^(\d)\t(.+?)\t([\d\.pa-z\-]+)/);
		if (m) {
			const depth=parseInt(m[1],10);
			parent.appendChild(createKepanItem(cor,depth,m[2],m[3],actions,tabid));
		}
	}
}
const createKepan=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		const widget=document.createElement("div");
		widget.className="kepan";
		createKepans(cor,widget,target,actions,tabid);

		return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createKepan;
},{}],93:[function(require,module,exports){
const onLinkMouseDown=function(e){
	const target=e.target;
	const fulladdress=e.target.target;
	e.stopPropagation();
	if (!target.action) {
		console.error("action openLink is not defined");
	}
	target.action&&target.action(fulladdress,target.cor);	
}
/* TODO , show link only when in cursor ,
to save some dom node*/
const createLink=function({cm,cor,start,end,id,target,active,actions}){
	if (start.ch==end.ch && start.line==end.line) {
		if (target instanceof Array) {
			target=target[0];
		}
		const dom=document.createElement("span");
		dom.className="notelink";
		dom.onmousedown=onLinkMouseDown;
		dom.action=actions.openLink;
		dom.cor=cor;
		dom.innerHTML=target;
		dom.target=target;
		return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
	} else {
		const dom=document.createElement("span");
		dom.className="link";
		dom.onmousedown=onLinkMouseDown;
		dom.action=actions.openLink;
		dom.cor=cor;
		dom.innerHTML=cm.getRange(start,end);
		dom.target=target;
		
		return cm.markText(start,end,{replacedWith:dom,handleMouseEvents:true});
		//.onmousedown=onLinkMouseDown;
	}
}
module.exports=createLink;
},{}],94:[function(require,module,exports){
const onNoteMouseDown=function(e){

}
var entertimer,leavetimer;
const onNoteEnter=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);
	const target=e.target;
	entertimer=setTimeout(function(){
		target.innerHTML=target.dataset.target;	
	},400);
}

const onNoteLeave=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);

	const target=e.target;
	leavetimer=setTimeout(function(){
		e.target.innerHTML=e.target.dataset.id;
	},50);
}

const note=function({cm,cor,start,end,id,target}){
	const dom=document.createElement("span");
	dom.className="note";
	dom.innerHTML=id;
	dom.dataset.id=id;
	dom.dataset.target=target;
	dom.onmousedown=onNoteMouseDown;
	dom.onmouseenter=onNoteEnter;
	dom.onmouseleave=onNoteLeave;
	dom.cor=cor;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}

module.exports=note;
},{}],95:[function(require,module,exports){
const onOriginMouseDown=function(e){
	e.target.action(e.target.dataset.target)
	e.stopPropagation()
}
const createOrigin=function({cm,cor,corpus,start,end,id,tabid,target,actions,fields}){
	const widget=document.createElement("span");
	widget.innerHTML=target.replace(/.+@/,"");
	widget.className="origin";
	widget.dataset.target=target;
	widget.onmousedown=onOriginMouseDown;
	widget.action=actions.openLink;
	widget.cor=cor;
	return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createOrigin;
},{}],96:[function(require,module,exports){
const createP=function({cm,cor,corpus,field,start,end,id,tabid,target,actions,fields}){
	if (start.ch==0) { //taisho has p within line
		const dom=document.createElement("span");
		dom.className="p";
		return cm.setBookmark(start,{widget:dom});		
	}
//	return cm.markText(start,end,{className:"p",clearWhenEmpty:false});
}
module.exports=createP;
},{}],97:[function(require,module,exports){
var popuptimer;
const mode=require("../model/mode");
const onLinkMouseOver=function(e){
	const text=e.target.dataset.text;
	const title=e.target.innerHTML;
	const x=e.pageX,y=e.pageY;
	const action=e.target.action;
	const tagname=e.target.dataset.tagname;
	const kpos=parseInt(e.target.dataset.kpos,10)||0;
	popuptimer=setTimeout(function(){
		action({title,text,x,y,tagname,kpos});
	},500);
}
const onLinkMouseLeave=function(e){
	clearTimeout(popuptimer);
}
const createPopupNote=function({cm,cor,corpus,field,kpos,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	const layout=mode.store.layout;
	dom.className=field+ (layout?"":(" "+field+"_ori"));
	dom.onmouseover=onLinkMouseOver;
	dom.onmouseleave=onLinkMouseLeave;
	dom.action=actions.showNotePopup;
	dom.cor=cor;
	dom.dataset.tagname=field;
	dom.dataset.kpos=kpos;
	if (target instanceof Array) {
		target=target.sort(); // for mpps footnote 1.221, 1.222
		var idarr=[],textarr=[];
		for (var i=0;i<target.length;i++) {
			const parts=target[i].split("\t");
			if (parts.length>1) {
				const noteid=parts.shift().match(/^[\d\.]+/), 
				notetext=parts.join("\n").trim();
				idarr.push(noteid?noteid[0]:id);
				textarr.push(noteid+"\n"+notetext);
			} else {
				const noteid=target[i].match(/^[\d\.]+/);
				idarr.push(noteid?noteid[0]:id);
				textarr.push(target[i]);
			}
		}
		dom.innerHTML=idarr.join(";");
		dom.dataset.text=textarr.join("\n\n");
	} else {
		const parts=target.split("\t");
		if (parts.length>1) {
			const noteid=parts.shift().match(/^[\d\.]+/),
			notetext=parts.join("\t").trim();

			dom.innerHTML=noteid?noteid[0]:id;
			dom.dataset.text=notetext;
		} else {
			const nid=target.match(/^[\d\.]+/);
			dom.innerHTML=nid?nid[0]:id;
			dom.dataset.text=target;
		}
	}

	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createPopupNote;

},{"../model/mode":112}],98:[function(require,module,exports){
const mode=require("../model/mode");

const onPtrMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
	if (!target.action) {
		console.error("action updateArticleByAddress not defined");
	}
	target.action&&target.action(address,target.tabid);
	e.target.innerHTML=e.target.dataset.id;
}

var entertimer,leavetimer;
const onPtrEnter=function(e){
	const target=e.target;
	clearTimeout(entertimer);
	clearTimeout(leavetimer);
	entertimer=setTimeout(function(){
		const layout=mode.store.layout;
		//+1 to include tailing puncuation
		target.className="ptr"+ (layout?"":(" ptr_ori"));
		const text=target.cor.getText(parseInt(target.dataset.target,10)+1,function(data){
			target.innerHTML=data.join("");
		});
		if ( text instanceof Array) {
			text=text.join("");
		}
		target.innerHTML=text;//if text is ready, call back will be ignored
	},50);
}
const onPtrLeave=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);

	const target=e.target;
	const layout=mode.store.layout;
	target.className="ptr"+ (layout?"":(" ptr_ori"));
	leavetimer=setTimeout(function(){
		e.target.innerHTML=e.target.dataset.id;
	},50);
}
const createPtr=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	const layout=mode.store.layout;
	dom.className="ptr"+ (layout?"":(" ptr_ori"));
	dom.innerHTML=fields.noteid.value[id].replace(/.+\./,"").replace(/^0+/,"");
	dom.dataset.id=dom.innerHTML;
	dom.dataset.target=target;
	dom.onmousedown=onPtrMouseDown;
	dom.cor=cor;
	dom.tabid=tabid;
	dom.action=actions.updateArticleByAddress;
	dom.onmouseenter=onPtrEnter; //problematic for position:absolute
	dom.onmouseleave=onPtrLeave;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createPtr;
},{"../model/mode":112}],99:[function(require,module,exports){
var indexOfSorted = function (array, obj, near) {
  var low = 0, high = array.length, mid;
  while (low < high) {
    mid = (low + high) >> 1;
    if (array[mid] === obj) return mid;
    array[mid] < obj ? low = mid + 1 : high = mid;
  }
  if (near) return low;
  else if (array[low] === obj) return low;else return -1;
};

const createPunc=function({cm,cor,start,end,id,tabid,target,actions,krange,field,fields}){
	var className=field;
	if (field=="punc" && fields.pu) {
		const kpos=indexOfSorted(fields.pu.pos,krange.start);
		if (fields.pu.pos[kpos]==krange.start) {
			className="punc_overlap";
		}
	}
	const widget=document.createElement("span");
	widget.className=className;
	widget.innerHTML=target;
	return cm.setBookmark(start,{widget});
}	

module.exports=createPunc;
},{}],100:[function(require,module,exports){
// tag specified in  -corpus.json  will be render with css class
const createRend=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	if (target instanceof Array) { //array of className
		className=target.join(" ");
		return cm.markText(start,end,{className});
	}
	var className=target;
	const at=target.indexOf("|"); //has attributes
	if (at>0) {
		className=target.substr(0,at);
	} else {
		if (target.indexOf(":")>0) {
			return cm.markText(start,end,{css:target});
		}
	}
	return cm.markText(start,end,{className});
}

module.exports=createRend;
},{}],101:[function(require,module,exports){
const mode=require("../model/mode");
const createRubyNote=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	const widget=document.createElement("span");
	const layout=mode.store.layout;
	const field="rubynote";
	widget.className=field+ (layout?"":(" "+field+"_ori"));
	widget.innerHTML=target;
	widget.cor=cor;
	return cm.setBookmark(start,{widget});
}

module.exports=createRubyNote;
},{"../model/mode":112}],102:[function(require,module,exports){
const createSpan=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	if (target.indexOf(":")>0) {
		return cm.markText(start,end,{css:target});
	} else {
		var className=target;
		if (target instanceof Array) {
			className=target[0];
		}
		return cm.markText(start,end,{className});
	}
}

module.exports=createSpan;
},{}],103:[function(require,module,exports){
const adjustsize=function(e){
	const ins=e.target.value=="＋";
	replacedWith=e.target.parentElement;
	var ratio=replacedWith.ratio;
	ratio=ins?ratio*1.1:ratio/1.1;
	if (ratio>5)ratio=5;
	if (ratio<0.3)ratio=0.3;

	replacedWith.ratio=ratio;

	replacedWith.style.width=Math.floor(replacedWith.w*ratio)+"%";
	replacedWith.style.height=Math.floor(replacedWith.h*ratio)+"%";
	e.stopPropagation();
}
const newwindow=function(e){
	e.target.innerHTML;
	e.stopPropagation();
}
//give each style a unique name
const resolveStyleConflict=function(svgcontent,id){
	return svgcontent.replace(/st(\d+)/g,function(m,m1){
		return "st"+id+"-"+m1;
	})
}
const createTable=function({cm,cor,start,end,id,tabid,target,actions,field,fields}){
	// ..\unit\mpps contains the code to replace of svg in footnote 
	const replacedWith=document.createElement("div");
	//var svgcontent=target.replace(/ height=".*?"/,'height="100%"');
	//svgcontent=svgcontent.replace(/ width=".*?"/,'width="100%"').replace(/\r?\n/g,"");
	const filename=target.match(/y[\.a-z\d\-]+\.svg/) || "yinshun.svg";

	var svgcontent=target.replace(/<!--.+?-->\r?\n?/g,"")
	.replace(/<!DOCTYPE.+?>\r?\n/,"").replace(/<\?xml.+>\r?\n/,"");
	replacedWith.className="inlinesvg";

	const opennew=document.createElement("a");
	opennew.style="z-index:200"
	
	opennew.setAttribute("href","data:image/svg+xml;utf8,"+encodeURI(svgcontent));

	opennew.innerHTML="\u21E9"
	opennew.setAttribute("download",filename);
	opennew.onmousedown=newwindow;

	
	replacedWith.appendChild(opennew);


	const svg=document.createElement("div");
	svg.innerHTML=resolveStyleConflict(svgcontent,field[0]+id);
	replacedWith.appendChild(svg);

	var startch=start.ch;
	const textline=cm.getLine(start.line);
	const endline=cm.getLine(end.line);
	const endch=endline.length; //cover entire line

	const textbefore=textline.substr(0,start.ch);

	c=cor.kcount(textbefore);
	if (!c)startch=0;
	
	if (start.line==end.line && start.ch==endch){
		return cm.setBookmark(start,{widget:replacedWith
			,handleMouseEvents:true});
	} else {
		return cm.markText({line:start.line,ch:startch},{line:end.line,ch:endch},
			{replacedWith,handleMouseEvents:true});

	}
}
module.exports=createTable;
},{}],104:[function(require,module,exports){
const createTranslation=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		const widget=document.createElement("div");
		widget.className="translation";
		widget.innerHTML=target;
		return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createTranslation;
},{}],105:[function(require,module,exports){
const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const MainScreen=require('./containers/mainscreen');
const {useStrict}=require("mobx");
const mode=require("./model/mode");
require("./localestring");
useStrict(true);

const Main=function(appopts){
	//if (window && window.location.protocol=="file:") {
		mode.selectDB();
	//}
	
	var opts=appopts;
	if (appopts.corpora instanceof Array) {
		var corpora={};
		for (var i=0;i<appopts.corpora.length;i++){
			corpora[appopts.corpora[i]]=undefined;
		}
		opts=Object.assign({},appopts,{corpora});
	}

	ReactDOM.render(E(MainScreen,opts), document.getElementById('root'))	
}
module.exports=Main;
},{"./containers/mainscreen":71,"./localestring":106,"./model/mode":112,"mobx":40,"react":"react","react-dom":"react-dom"}],106:[function(require,module,exports){
const localization=require("ksana-localization");
const stringtable={
"zh.tw":[
	["inlinenote","內文夾注"],
	["span","其他樣式"],
	["rend","其他樣式"],
	["punc","外部標點"],
	["collation","校勘"],
	["pu","標點"],
	["p","段落"],
	["table","表"],
	["figure","圖"],
	["link","連結"],
	["bilink","出處"],
	["k","互文"],
	["noteid","出處"],
	["jin","經文"],
	["ptr","注釋號"],
	["def","注釋"],
	["head","標題"],
	["mppsnote","夾注"],
	["footnote","腳注"],
	["origin","出處"],
	["a","錨"],
	["yinshunnote","注解"],
	["kepan","科判"],
	["Search","搜尋"],
	["toc","目錄"],
	["dictionary","詞典"],
	["config","設定"],
	["source","出處"],
	["Select All","全選"],
	["Deselect All","全不選"],
	["Select DB","選資料庫"],
	["Home Page","主頁面"],
	["Group By Book","檢索所得"],
	["Excerpt","摘要"],
	["Read Text","閱讀內文"],
	["Matches","總筆數"],
	["Sort by hit","按筆數排序"],
	["Prev Hit","上一個"],
	["Next Hit","下一個"],
	["Page Number","頁碼"],
	["TOC View","目錄"],
	["Extra Line","摘要行"],
	["Prev Fascicle","上卷"],
	["Next Fascicle","下卷"],
	["Load Markup","載入外部標記"],
	["View First Markup","跳到第一個標記"],
	["Layout On","原書換行"],
	["Layout Off","段落重排"],
	["total book","分佈於"],
	["Open New Window","以新視窗開啟"],
	["Puncuation to enable Fuzzy Search","條件含有標點符號啟用模糊搜尋（實驗性）"],
	["Open local cor","開啟本機資料庫"],
	["click and select one or more *.cor file in your local drive",
	"↓↓請開啟本機資料庫"],
	["Require Cor:","需要資料庫："],
	["local cor","本機"],
	["local system","單機版"],
	["download","下載"],
	["about","關於"],
	["build date","建置於"],
	["no result","無搜尋結果"],
	["unknowncor","來路不明"],
	["download latest zip and cor files, and open index.html",
	"下載最新的zip及所需之資料庫，再打開index.html"],
	["backlink","逆向連結"]
	],
}
for (var locale in stringtable) {
	localization.setLocale(locale);
	for (var j=0;j<stringtable[locale].length;j++) {
		const id=stringtable[locale][j][0],str=stringtable[locale][j][1];
		localization.setString(id,str);
	}
}
localization.setLocale("zh.tw");
},{"ksana-localization":139}],107:[function(require,module,exports){
const {observable,action,autorun}=require("mobx");
const mode=require("./mode");
const corpora=require("./corpora");
const store=observable({
	main:'',
	n:0,
	aux:''
});

const setMain=action((address)=>{
	store.main=address;
});
const setAux=action((address)=>{
	store.aux=address;
});
const openLink=action((fulladdress,cor)=>{
	if (fulladdress.indexOf("http:")==0||
		fulladdress.indexOf("https:")==0) {
		window.open(fulladdress);
		return;
	}
	const r=fulladdress.split("@");

	if (r.length==1) {
		store.aux=cor.id+"@"+r;
		return;
	}

	const corpus=r[0].toLowerCase();

	if (!corpora.store.corpora[corpus]) {
		if (mode.store.fileprotocol) {
			store.aux=fulladdress;	
		} else {
			corpora.open(corpus,false,function(){
				setTimeout(action(function(){//wait connect
					store.aux=fulladdress;	
				}),500);
			});
		}
	} else {
		store.aux=fulladdress;	
	}	
});
const openNewWindow=action((addr,corpus)=>{
	var url=window.location.origin+window.location.pathname+"#c="+corpus+"&m="+mode.READTEXT+"&a="+addr;
	const win=window.open(url,'_blank');
	win.focus();	
});
autorun(()=>{
	//console.log('main address change',store.main,store.aux);
});
module.exports={store,setMain,setAux,openLink,openNewWindow};
},{"./corpora":108,"./mode":112,"mobx":40}],108:[function(require,module,exports){
const {extendObservable,action}=require("mobx");
const expandVariant=require("ksana-unihan-variant").expandVariant;

var openCorpus,closeCorpus;
if (typeof KsanaCorpus!=="undefined") {	
	openCorpus=KsanaCorpus&&KsanaCorpus.openCorpus;
	closeCorpus=KsanaCorpus&&KsanaCorpus.closeCorpus;
} else {
	const KSANACORPUS="ksana-corpus";
	openCorpus=require(KSANACORPUS).openCorpus;
	closeCorpus=require(KSANACORPUS).closeCorpus;
}

const {connectCorpus}=require("../unit/connect");

const Store=function() {
	extendObservable(this,{
		corpora:{},
		active:'',
	})
	this.cor=function (corpus) {
		if (this.corpora[corpus||this.active]) {
			return openCorpus(corpus||this.active);
		}
	}

};

const store=new Store;
const openedCors=function(){
	const out={};
	for (var i in store.corpora){
		if (store.corpora[i]) {
			out[i]=openCorpus(i);
		}
	}
	return out;
}
const close=action((id)=>closeCorpus(id));
const open=(corpus,setActive,cb)=>{
	//console.log("open",corpus)
	const opts={expandVariant};
	openCorpus(corpus,opts,action((err,cor)=>{
		if (err) {
			console.log(err);
		} else {
			if (setActive) store.active=corpus;
			store.corpora[cor.id]=true;
			store.corpora=Object.assign({},store.corpora);
			connectCorpus(cor);
			cb&&cb();
		}
	}))
};

const setActive=action(corpus=>{
	store.active=corpus;
});
const init=action((_corpora)=>{
	store.corpora=_corpora;
	//store.active=Object.keys(_corpora)[0]
});
module.exports={open,close,setActive,store,init,openedCors}
},{"../unit/connect":120,"ksana-unihan-variant":140,"mobx":40}],109:[function(require,module,exports){
const {observable,action}=require("mobx");
const store=observable({
	excerpts:[]
	,extra:0
	,query:{count:0}
  	,batch:0
  	,now:0
	,hitperbatch:20
});
var fetchExcerpts;

if (typeof KsanaCorpus!=="undefined") {
	fetchExcerpts=KsanaCorpus&&KsanaCorpusSearch.excerpt.fetchExcerpts;
} else {
	const KSANACORPUSSEARCH="ksana-corpus-search";
	fetchExcerpts=require(KSANACORPUSSEARCH).excerpt.fetchExcerpts;
}


const searchresult=require("./searchresult");
const corpora=require("./corpora");
const setExtraLine=action((l)=>{
	store.extra=l;
	showExcerpt();
});
const setNow=action(now=>{
	now=parseInt(now,10)||0;
	store.now=now;
});
const showExcerpt=action((now)=>{
	if (typeof now=="undefined") {
		now=store.now;
	}
	//store.now=now;
	//store.extra=extra;
	now=parseInt(now,10)||0;
	var line=store.extra==0?3:store.extra;

	const cor=corpora.store.cor();
	const hits=searchresult.store.filtered;
	var tpos=[];
	store.batch=Math.floor(now/store.hitperbatch);

	for (let i=0;i<store.hitperbatch;i++) {
		const at=store.hitperbatch*store.batch+i;		
		if (at<hits.length && hits[at]) tpos.push(hits[at]);
		else break;
	}
	fetchExcerpts(cor,{tpos,line,
		phrasepostings:searchresult.store.phrasepostings},
		action(function(excerpts){
			store.excerpts=excerpts;
			store.now=now;
	}));	
});
module.exports={store,showExcerpt,setExtraLine,setNow};
},{"./corpora":108,"./searchresult":113,"mobx":40}],110:[function(require,module,exports){
const {extendObservable,action,autorun}=require("mobx");
const corpora=require("./corpora");
const Store=function() {
	extendObservable(this,{
		filters:{},
		get active () {
			return this.filters[corpora.store.active] ||{};
		},
		get asArray(){
			const active=this.filters[corpora.store.active];
			const out=[];
			for (var i in active) {
				out[i]=active[i];
			}
			return out;
		}
	})
};
const store= new Store;
const setExcludes=action(excludes=>{
	const ex={};
	if (excludes instanceof Array) {
		for (var i=0;i<excludes.length;i++) {
			ex[i]=excludes[i];
		}
	} else {
		ex=excludes;
	}
	const corpus=corpora.store.active;
	store.filters[corpus]=ex;
	store.filters=Object.assign({},store.filters);	
})
const setExclude=action((group,value)=>{
	const corpus=corpora.store.active;
	if (!store.filters[corpus]){
		store.filters[corpus]={}
	}
	const excludes=Object.assign({},store.filters[corpus]);
	if (group instanceof Array) {
		for (var i=0;i<group.length;i++) {
			excludes[group[i]]=value;
		}
	} else {
		excludes[group]=value;			
	}
	while(excludes.length && !excludes[excludes.length-1]) excludes.pop();

	store.filters[corpus]=excludes;
	store.filters=Object.assign({},store.filters);
})

const includeAll=action(()=>{
	const corpus=corpora.store.active;
	store.filters=Object.assign({},store.filters,{[corpus]:{}});
});
const excludeAll=action(()=>{
	const corpus=corpora.store.active;
	const cor=corpora.store.cor(corpus);
	if (!cor)return;
	const groups=cor.groupNames().map(()=>1);

	while(groups.length && !groups[groups.length-1]) groups.pop();
	const excludes={};
	for (var i in groups) excludes[i]=groups[i];
	store.filters=Object.assign({},store.filters,{[corpus]:excludes});
});
autorun(()=>{
	//console.log("filters",store.filters,store.active)
})
module.exports={store, includeAll, excludeAll,setExclude,setExcludes};
},{"./corpora":108,"mobx":40}],111:[function(require,module,exports){
const {extendObservable,action,autorun}=require("mobx");
const Store=function() {
	this.markups={};
	extendObservable(this,{
		age:{}
	})
};

const store= new Store;
const setMarkup=action(function(corpus,name,markups){
	if (!store.markups[corpus]){
		store.markups[corpus]={}
	}
	store.markups[corpus][name]=markups;
	store.markups=Object.assign({},store.markups);
	store.age[corpus]=new Date();
	store.age=Object.assign({},store.age);
});


const {loadMarkup}=require("../unit/markup");
const loadExternalMarkup=function(meta,json,cor){
	const markups=loadMarkup(cor,json);
	if (markups) setMarkup(cor.id,meta.type,markups);
}
module.exports={store,setMarkup,loadExternalMarkup};
},{"../unit/markup":125,"mobx":40}],112:[function(require,module,exports){
const {observable,action,autorun}=require("mobx");

const {packBits,unpackBits}=require("../unit/bitstr");
const BOOKSELECTOR=0, READTEXT=1,TOCVIEW=2,DBSELECTOR=3,EXCERPTVIEW=11;
	//BOOKRESULT=10,
	
const isFileProtocol=function(){
	return (typeof window!=="undefined" && window.location.protocol=="file:");
}
const store=observable({
	mode:BOOKSELECTOR, //mode
	fileprotocol:isFileProtocol(),
	layout:0,//layout
	extraline:3
})

const setMode=action(m=> {
	store.mode=parseInt(m,10)||BOOKSELECTOR;
});

const setLayout=action(l=>{
	store.layout=l;
});

const selectBook=action(()=>{
	store.mode=BOOKSELECTOR;
});

const selectDB=action(()=>{
	store.mode=DBSELECTOR;
});
const readText=action(()=>{
	store.mode=READTEXT;
});
/*const groupByBook=action(()=>{
	store.mode=BOOKRESULT;
});*/

const tocView=action(()=>{
	store.mode=TOCVIEW;
});

const excerptView=action(()=>{
	store.mode=EXCERPTVIEW;
})
module.exports={store,setMode,setLayout,
	readText,selectDB,selectBook,tocView,excerptView,
	BOOKSELECTOR, READTEXT,TOCVIEW,DBSELECTOR,EXCERPTVIEW
	//BOOKRESULT,
};
},{"../unit/bitstr":118,"mobx":40}],113:[function(require,module,exports){
const {extendObservable,action}=require("mobx");
const filter=require("./filter");
const corpora=require("./corpora");
var search=null,filterMatch=null,groupStat=null;

var search,groupState,filterMatch;
if (typeof KsanaCorpusSearch!=="undefined") {
	search=KsanaCorpusSearch.search;
	groupStat=KsanaCorpusSearch.groupStat;
	filterMatch=KsanaCorpusSearch.filterMatch;
} else {
	const KSANACORPUSSEARCH="ksana-corpus-search";
	search=require(KSANACORPUSSEARCH).search;
	groupStat=require(KSANACORPUSSEARCH).groupStat;
	filterMatch=require(KSANACORPUSSEARCH).filterMatch;
}

const Store=function() {
	this.phrasepostings=[];
	this.scores=[];
	extendObservable(this,{
		matches:[],
		timer:null,
		q:"",
		fuzzy:false,
		get filtered(){
			const cor=corpora.store.cor();
			const corpus=corpora.store.active;
			const excludes=filter.store.asArray||[];
			return filtered=filterMatch(cor,this.matches,excludes)||[];
		},
		get grouphits(){
			const cor=corpora.store.cor();
			const grouphits=groupStat(this.filtered,cor.groupTPoss());
			grouphits.shift();
			return grouphits;
		}
	});
}
const store=new Store();
var searching=false;
const setResult=action(function(opts){
	store.phrasepostings=opts.phrasepostings;
	store.matches=opts.matches;
	store.scores=opts.scores;
	store.timer=opts.timer;
	store.q=opts.q;
	store.fuzzy=opts.fuzzy;
	setTimeout(action(function(){
		//reset n
		const excerpt=require("./excerpt");
		if (!excerpt.store.now) excerpt.store.now=0;
	}),1)

});
const clear=action(function(){
	store.phrasepostings=[];
	store.matches=[];
})
var waitsearch=0;
function setQ(q,cb){
	if (q==store.q && store.matches.length) {
		setTimeout(function(){
			cb&&cb();
		},10);  	
		return;
	}
	action(function(){
		if (!q) {
			clear();
			q="";
		}
		store.q=q; //update q immediately
	})();

  var searchtimer=setInterval(()=>{
  	const cor=corpora.store.cor();
  	const corpus=corpora.store.active;
  	if (!cor) return;
    if (searching) {
	  waitsearch++;
	  if (waitsearch>50) clearInterval(searchtimer);
      return;
    }
  	waitsearch=0;
    searching=true;
    clearInterval(searchtimer);
    search(cor,q,function(result){
    	const {matches,phrasepostings,timer,fuzzy,scores}=result;
	        setResult({phrasepostings,matches,q,timer,fuzzy,scores});
	    searching=false;
    	setTimeout(function(){
	     	cb&&cb();
	    },1);
    });
  },100);
}

module.exports={store,setQ,clear};
},{"./corpora":108,"./excerpt":109,"./filter":110,"mobx":40}],114:[function(require,module,exports){
const {observable,action,autorun}=require("mobx");
const store=observable({
	caretText:"",
	selectionText:""
});
const setSelection=action((s)=>{
	for (var i in s){
		store[i]=s[i];
	}
});

module.exports={store,setSelection};
},{"mobx":40}],115:[function(require,module,exports){
const {action,autorun}=require("mobx");
const {parseRoute,setHashTag}=require("../unit/hashtag");
const {packBits,unpackBits}=require("../unit/bitstr");
const corpora=require("./corpora");
const address=require("./address");
const mode=require("./mode");
const searchresult=require("./searchresult");
const excerpt=require("./excerpt");
const filter=require("./filter");
const getDefaultCorpus=function(corpora){
	return Object.keys(corpora)[0];
}
var updating=false;
var synced=false;
const execURL=action((force)=> {
	if (updating && !force)return;
	console.log("execURL")

	var hash=window.location.hash;
	if (hash.match(/%[0-9A-Fa-f]/)) {
		hash=decodeURIComponent(hash);
	}
	const defaultCorpus=getDefaultCorpus(corpora.store.corpora);
	const urlparams=parseRoute(hash);
	const corpus=urlparams.c||defaultCorpus;
	const a=urlparams.a;
	const q=urlparams.q;
	const m=urlparams.m;
	const l=urlparams.l||0;
	const excludes=unpackBits(urlparams.x);
	filter.setExcludes(excludes);
	const n=parseInt(urlparams.n,10)||0;
	if (a) {
		address.setMain(a);
	} 

	const updateSearchResult=action(function(nn){
		mode.setMode(m);
		mode.setLayout(l);
		if (q) {
			setTimeout(function(){
				excerpt.showExcerpt(nn);
				mode.excerptView();	
			},1000);			
		}
	});
		
	if (!corpora.store.cor() && mode.store.fileprotocol) {
		mode.selectDB();
		return;
	}
	if (corpus!==corpora.store.active || !corpora.store.cor()) {
		corpora.open(corpus,true,function(){

			if (!synced) syncURL(); //run once
			
			if (q) {
				searchresult.setQ(q,function(){
					updateSearchResult(0);
				});
			} else {
				updateSearchResult(0);
			}
		});	
	} else {
		if (searchresult.store.q!==q){
			searchresult.setQ(q,function(){
				updateSearchResult(0);
			});			
		} else {
			updateSearchResult(n);
		}
	}
});
const updateUrl=function(urlparams){
	updating=true;
	console.log("update url",urlparams)
	setHashTag(urlparams);
	setTimeout(function(){
		updating=false;	
	},300);
}
var urlupdater=null;
const syncURL=function(){
	const execurl=function(){
		if (!updating) execURL();
	}
	window.removeEventListener('hashchange',execurl);
	window.addEventListener('hashchange', execurl);
	synced=true;
	autorun(()=>{
		const x=packBits(filter.store.asArray);
		const urlparams={
			q:searchresult.store.q,
			a:address.store.main,
			r:address.store.aux,
			l:mode.store.layout,
			m:mode.store.mode,
			c:corpora.store.active,
			e:excerpt.store.extra,
			n:excerpt.store.now,
			x
		};

		clearTimeout(urlupdater);
		urlupdater=setTimeout(updateUrl.bind(this,urlparams),500);
	});
}
module.exports={execURL};
},{"../unit/bitstr":118,"../unit/hashtag":121,"./address":107,"./corpora":108,"./excerpt":109,"./filter":110,"./mode":112,"./searchresult":113,"mobx":40}],116:[function(require,module,exports){
const getAnchorAddress=function(cor,anchor){
	 const anchors=cor.getGField("anchor");
   anchor=anchor.replace(/~.+/,"");
   if (!anchors || !anchors.value)return null;
   const at=anchors.value.indexOf(anchor);
   if (at>-1) return anchors.pos[at];
}
module.exports={getAnchorAddress:getAnchorAddress}
},{}],117:[function(require,module,exports){
const {getAnchorAddress}=require("../unit/anchor");

const fetchArticle=function(cor,address,markups,cb){
  const range=cor.parseRange(address);

  if (!range.start) {
    address=getAnchorAddress(cor,address);
  } else {
    address=cor.stringify(range.start);
  }
  const article=cor.articleOf(address);
  if (article){
    cor.getArticleTextTag(article.at ,  (res)=>{
      const fields=loadArticleMarkup(res.fields,markups,article.at);
      cb&&cb({address,article,rawlines:res.text,fields,kpos:article.start});
    }); 
  }
}
const loadArticleMarkup=function(oldfields,markups,article){
  var fields=oldfields||{};
  if (markups && Object.keys(markups).length) {
    for (var type in markups) {
      if (markups[type][article]) {
        fields=Object.assign({},fields,{[type]:markups[type][article]});
      }
    }
  }
  return fields;
}

module.exports={fetchArticle,loadArticleMarkup};
},{"../unit/anchor":116}],118:[function(require,module,exports){
const packBits=function(_bits){
	if (!_bits)return "";
	var bits=JSON.parse(JSON.stringify(_bits));
	var byte=Math.floor(bits.length / 8);
	if (bits.length % 8) byte++;
	
	var cells=[];
	for (let i=0;i<byte;i++) cells[i]=0;

	var c=0,ncell=0;
	while (bits.length) {
		const ex=bits.shift()?1:0;
		cells[ncell] +=  Math.pow(2, 7-c) * ex;
		c++;
		if (c%8==0) {
			ncell++;
			c=0;
		}		
	}
	var str="";
	for (let i=0;i<byte;i++) {
		var hex="0"+cells[i].toString(16);
		str+=hex.substr(hex.length-2);
	}

	return encodeStr(str);
}
const unpackBits=function(str,bool){
	if (!str) return [];
	str=decodeStr(str);
	var byte=Math.floor(str.length / 2);
	if (str.length % 2) byte++;
	var arr=[];
	for (let i=0;i<byte;i++) {
		const cell= str.substr(i*2,2) ;
		const v="0000000"+parseInt(cell,16).toString(2);
		var bits=v.substr(v.length-8);
		
		arr=arr.concat(bits.split("").map(i=>parseInt(i)));
	}
	while (arr.length>0 && arr[arr.length-1]==0) arr.pop();
	if (bool) {
		arr=arr.map((i)=>!!i);
	}
	return arr;
}

const encodeStr=function(str){
	if (str.length<16) return str;
	const s=str.replace(/([0-9])/g,function(m,m1){
			return String.fromCharCode(parseInt(m1)+0x67);
	});
	var out="z",i=0,prev="",count=0;
	while (i<s.length) {
		if (prev==s.charAt(i)) {
			count++;
		} else {
			if (count) out+=count.toString(10)+prev;
			count=1;
		}
		prev=s.charAt(i);
		i++;
	}
	out+=count.toString(10)+prev;
	if (out.length>str.length) return str;
	return out;
}
const decodeStr=function(str){
	if (str.charAt(0)!='z')return str;
	str=str.substr(1);
	var out="";
	str.replace(/(\d+)([a-p])/g,function(m,count,ch){
		count=parseInt(count,10);
		for (var i=0;i<count;i++) {
			out+=ch;
		}
	});
	const s=out.replace(/([g-p])/g,function(m,m1){
		return (m1.charCodeAt(0)-0x67).toString(10);
	});
	return s;
}

const test=function(){
	const t1=[1, 1,0,0,0,0,0,1,0,0,  0,0,0,0,0,0,1,1, 0,0,0,0,0,0,1,0,  0,0,0,0,0,0,0,1,1 ];
	//pack from left to right, every 8 bits into a byte
	//and convert byte to string
	//tailing 0 will be ignored
	const str=packBits(t1);
	const t2=unpackBits(str);
	if (JSON.stringify(t1)!==JSON.stringify(t2)) console.error('pack bits error');
}
const testencode=function(){
	const input="1111111111111100000000ff00000002faaaaaaaaaaaaaaaaaaaaaa000";
	const s=encodeStr(input);
	console.log(s);
	console.log('passed?',decodeStr(s)==input);
}

//test();
//testencode();
module.exports={packBits,unpackBits};
},{}],119:[function(require,module,exports){
const getSelrange=function(cor,krange){
	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var selrange="p."+sp;

	if (ep!==sp) selrange="p"+selrange+'-'+ep;	
	return selrange;
}
const citation=function(cor,krange){
	if (!cor)return "";

	if (cor.meta.id=="mpps") {
		const r=cor.parseRange(krange);
		const getPin=function(rend,kpos){
			if (!rend)return;
			var pin=null;
			if (r.start==r.end) {
				kpos=cor.makeRange(r.start,r.end);
			}
			for (var i=0;i<rend.value.length;i++) {
				if (rend.value[i].substr(0,4)=="pin|") {
					pin=JSON.parse(rend.value[i].substr(4));
				}
				if (kpos<rend.pos[i]) break;
			}
			return pin;
		}
		
		const article=cor.articleOf(r.start).at;
		var rend=cor.getArticleField(article,"rend")[0];

		const pin=getPin(rend,r.range);

		var pinname="〈"+pin.n+pin.t+"〉";

		var gn=cor.getGroupName(krange);
		
		const toc=cor.getTOC(r.start);
		if (!pin.n) {//use article name as 
			gn='〈'+gn+'〉';
			pinname="";
		}

		gn=gn.replace(/(卷\d+).*/,function(m,m1){return m1});

		return "（《大智度論講義》"+gn+pinname+"，"+getSelrange(cor,krange)+"）"
	} else {
		var gn=cor.getGroupName(krange);
		return "《"+gn+"》"+getSelrange(cor,krange);
	};
}
module.exports=citation;
},{}],120:[function(require,module,exports){
/* when a corpus is opened, connect it with already opened */
const {setMarkup}=require("../model/markups");
const BILINKSEP="<";
const regex=/<.+/;
const connect=function(cor1,cor2,output){
	if (cor1===cor2)return;
	if (!cor2.meta.linkTo) return; 
	
	for (var field in cor2.meta.linkTo) {
		if (!cor2.linkingTo(field,cor1)) continue;
		output.push([cor2.id,field,cor2.get(['gfields',field])]);
	}
	return output;
}
const groupByArticle=function(pos,value,cor){
	//group by article
	const markups={};
	for (var i=0;i<pos.length;i++) {
		const kpos=cor.parseRange(pos[i]).start;
		const a=cor.articleOf(kpos).at;
		if (!markups[a]) markups[a]={pos:[],value:[]};
		markups[a].pos.push(pos[i]);
		markups[a].value.push(value[i]);
	}
	return markups;
}
const buildReverseLinks=function(links){

	const corpora=require("../model/corpora");
	var out=[];
	const cors=corpora.openedCors();
	for (var i=0;i<links.length;i++) {
		const corpus=links[i][1].replace(/.*</,"");
		if (!cors[corpus]) continue;
		const sourcecorpus=links[i][0];
		const type=links[i][1].replace(/<.*/,"");
		const fieldname=type+BILINKSEP+sourcecorpus;
		const pv=[];
		const payload=links[i][2];
		
		for (var k=0;k<payload.pos.length;k++) {
			pv.push([payload.value[k],payload.pos[k]]);	
		}
		pv.sort((a,b)=>a[0]-b[0]);//sort by value, will became pos

		const pos=pv.map(a=>a[0]);
		const value=pv.map(a=>a[1]);
		
		const markups=groupByArticle(pos,value,cors[corpus]);
		out.push( [corpus, fieldname, markups]);
	}
	return out;
}

const connectCorpus=function(cor){
	const corpora=require("../model/corpora");
	var output=[];
	for (var db in corpora.store.corpora) {
		if (!corpora.store.corpora[db])continue;
		const tcor=corpora.store.cor(db);
		if (!tcor) continue;

		connect(cor,tcor,output);
		connect(tcor,cor,output);
	}
	const outputlinks=buildReverseLinks(output);
	for (var i=0;i<outputlinks.length;i++) {
		const corpus=outputlinks[i][0], name=outputlinks[i][1], mrks=outputlinks[i][2];
		setMarkup(corpus,name,mrks);
	}	
}

module.exports={connectCorpus};
},{"../model/corpora":108,"../model/markups":111}],121:[function(require,module,exports){
/* call actions from url */

const parseRoute=function(route){
	var regex = /[?#&]([^=#]+)=([^&#]*)/g, params = {}, match ;
	while(match = regex.exec(route)) {
	  params[match[1]] = match[2];
	}
	return params;
}

const setHashTag=function(newparams,replace){
	var hash=window.location.hash;
	if (hash.match(/%[0-9A-Fa-f]/)) {
		hash=decodeURIComponent(hash);
	}
	var params=parseRoute(hash);
	var key;
	for (key in newparams) {
		params[key]=newparams[key];
	}
	var p=[];
	for (key in params) {
		if (params[key]) p.push(key+"="+params[key]);
	}
	if (replace) {
			history.replaceState(undefined,undefined,"#"+p.join("&"));
	} else {
			window.location.hash=p.join("&");
	}
}

module.exports={setHashTag,parseRoute};
},{}],122:[function(require,module,exports){
var renderHits=function(text,hits,func){
	if (!text) return [];
  var i, ex=0,out=[],now;
  hits=hits||[];
  for (i=0;i<hits.length;i+=1) {
    now=hits[i][0];
    if (now>ex) {
      const t=text.substring(ex,now);
      out.push(func({key:i},t));
    }
    const stext=text.substr(now,hits[i][1]);

    out.push(func({key:"h"+i, className:"hl"+hits[i][2]||""},stext));
    ex = now+hits[i][1];
  }
  out.push(func({key:i+1},text.substr(ex)));
  return out;
};
const  buildlinelengths=function(rawtext){
  var linelengths=[];
  var acc=0;
  for (let i=0;i<rawtext.length;i++) {
    linelengths.push(acc);
    acc+=rawtext[i].length;
  }
  linelengths.push(acc);
  return linelengths;
}
const highlightExcerpt=function(cor,excerpt,phrasepostings){
  if (!phrasepostings) return [];
  const linebreaks=excerpt.linebreaks;
  const getrawline=function(line){
    return (line<excerpt.rawtext.length)?excerpt.rawtext[line]:"" ;
  };
  const linelengths=buildlinelengths(excerpt.text.split("\n"));
  var hl=[];

  for(let j=0;j<excerpt.phrasehits.length;j++) {
    const hits=excerpt.phrasehits[j].hits;
    const hitsend=excerpt.phrasehits[j].hitsend;
    if (!phrasepostings[j])continue;
    const phraselengths=phrasepostings[j].lengths;
    const linecharr=hits.map((hit,idx)=>{
      const range=cor.makeRange(hit,hitsend[idx]);
      var {start,end}=cor.toLogicalRange(excerpt.linebreaks,range,getrawline);
      const absstart=linelengths[start.line]+start.ch +start.line //for linefeed ;
      const absend=linelengths[end.line]+end.ch + end.line ;

      hl.push([absstart,absend-absstart,j]);
    });
  }

  return hl;
} 

module.exports={renderHits,highlightExcerpt}
},{}],123:[function(require,module,exports){
const	groupTitle=function(label,cor){
		const r=label.split("@");
		if (r.length==1 || !cor) return label;
		const categoryNames=cor.meta.groupPrefix||[];
		return categoryNames[parseInt(r[0],0)]+"《"+r[1]+"》";
}

module.exports={groupTitle}
},{}],124:[function(require,module,exports){
const loadJSON=function(file,cb) {
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				//console.log('e readAsText = ', e);
				//console.log('e readAsText target = ', e.target);
				try {
					const json = JSON.parse(e.target.result);
					//alert('json global var has been set to parsed json of this file here it is unevaled = \n');
					cb&&cb(json);
				} catch (ex) {
					alert('ex when trying to parse json = ' + ex);
				}
			}
		})(file);
		reader.readAsText(file);
}
module.exports={loadJSON};
},{}],125:[function(require,module,exports){
const loadMarkup=function(cor,json){
//	console.time("loadmarkup"); 18K markups take 100ms
	var out=[];
	for (var i=0;i<json.length;i++) {
		var address=json[i].match(/.*?\t/)[0];
		const kpos=parseInt(address,10);
		if (kpos.toString(10)==address) { //number format
			address=kpos;
		}
		const r=cor.parseRange(address);
		
		const article=cor.articleOf(r.start).at;
		if (!out[article]) out[article]={pos:[],value:[]};	
		out[article].pos.push(r.start==r.end?r.start:r.range);
		out[article].value.push(json[i].substr(address.length));
	}
	return out;
}
module.exports={loadMarkup}
},{}],126:[function(require,module,exports){
var patterns={
 bold:/\{b[\s\S]+?b\}/g,
 kai:/\{k[\s\S]+?k\}/g,
 taisho:/@t(\d+p\d+[a-c\-0-9]*)/g,
 taisho_full:/@t(\d+p\d+[a-c][0-9]+)/g,
 yinshun_note:/@y([A-Z][0-9]+)#([0-9]+)/g,
 taisho_app:/@a(\d+p.+)/g,
 svg:/\{svg\|(.+?),([\s\S]+?)\|svg\}/g
}
const markLine=function(doc,i,visitlink){
	if (i>doc.lineCount())return;
	var line=doc.getLine(i);

	line.replace(patterns.taisho,function(m,taisho,idx){
		const link=document.createElement("span");
		var target=taisho;
		if (!m.match(patterns.taisho_full)){
			target+="a01";//page without line number
		}
		link.innerHTML="大正"+taisho;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target=target;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{replacedWith:link});
	})

	line.replace(patterns.taisho_app,function(m,taisho,idx){
		const link=document.createElement("span");
		var target=taisho;
		link.innerHTML=taisho;
		link.className="taisho_app";
		link.dataset.target=target;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length+1},{replacedWith:link});
	})

	line.replace(patterns.yinshun_note,function(m,filename,pg,idx){
		const link=document.createElement("span");
		link.innerHTML="《印順導師大智度論筆記》"+filename;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target="http://ya.ksana.tw/mpps_yinshun_note_img/"+filename.charAt(0)+"/"+filename+".jpg";
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{replacedWith:link});
	})
}
const newwindow=function(e){
	e.target.innerHTML;
	e.stopPropagation();
}
const showsvg=function(e){
	const marks=e.target.doc.getAllMarks();

	for(var i=0;i<marks.length;i++) {
		const rep=marks[i].replacedWith;
		if (!rep)continue;
		svg=rep.children[0];
		if (svg!==e.target && rep.className=='footnotesvg') {
			svg.innerHTML=svg.filename+" ";
			svg.onclick=showsvg;
			svg.className='svgbutton';
			svg.doc=e.target.doc;
		}
	}

	e.target.innerHTML=e.target.svgcontent;
	e.target.className='';
	e.target.onclick=null;
}
const resolveStyleConflict=function(svgcontent,id){
	//stylesheet of svg conflict
	return svgcontent.replace(/st(\d+)/g,function(m,m1){
		return "st"+id+"-"+m1;
	})
}

const replacesvg=function(doc,from,to,svgcontent,count){
	var replacedWith=document.createElement("div");
	var filename=svgcontent.match(/[\.A-Za-z\d\-]+\.svg/) || "mpps.svg";
	if (filename instanceof Array)filename=filename[0];

	var opennew=document.createElement("a");
	opennew.style="z-index:200";
	
	opennew.setAttribute("href","data:image/svg+xml;utf8,"+encodeURI(svgcontent));

	opennew.innerHTML="\u21E9";
	opennew.setAttribute("download",filename);
	opennew.onmousedown=newwindow;

	var svg=document.createElement("span");
	svg.innerHTML=resolveStyleConflict(svgcontent,count);
	svg.filename=filename;
	replacedWith.appendChild(svg);		

	replacedWith.className='footnotesvg';
	replacedWith.appendChild(opennew);

	const start=doc.posFromIndex(from);
	const end=doc.posFromIndex(to);
	doc.markText(start,end,{replacedWith});
}
var markNoteLines=function(doc,from,to,openLink,cor){
	const visitlink=function(e){
		const url=e.target.dataset.target;
		if (url.substr(0,7)==="http://") {
			window.open(url);
		} else {
			openLink("taisho@"+url);
		}
	}

	var M=doc.findMarks({line:from,ch:0},{line:to,ch:65536});
	M.forEach(function(m){m.clear()});

	for (var i=from;i<to+1;i++) {
		markLine(doc, i, visitlink);
	}

	const footnotetext=doc.getValue();

	footnotetext.replace(patterns.bold,function(m,idx,self){
		const start=doc.posFromIndex(idx);
		const end=doc.posFromIndex(idx+m.length);
		var marker=doc.markText({line:start.line,ch:start.ch+2},{line:end.line,ch:end.ch-2},
			{className:"b"});

		//hide control code
		doc.markText({line:start.line,ch:start.ch},{line:start.line,ch:start.ch+2},{className:"hide"});
		doc.markText({line:end.line,ch:end.ch-2},{line:end.line,ch:end.ch},{className:"hide"});
	});

	footnotetext.replace(patterns.kai,function(m,idx,self){
		const start=doc.posFromIndex(idx);
		const end=doc.posFromIndex(idx+m.length);
		var marker=doc.markText({line:start.line,ch:start.ch+2},{line:end.line,ch:end.ch-2},
			{className:"kai"});

		//hide control code
		doc.markText({line:start.line,ch:start.ch},{line:start.line,ch:start.ch+2},{className:"hide"});
		doc.markText({line:end.line,ch:end.ch-2},{line:end.line,ch:end.ch},{className:"hide"});
	});

	var count=0;
	footnotetext.replace(patterns.svg,function(mm,fn,text,idx){
		const m=fn.match(/M(\d+)\.(\d+)/);
		if (!m)return;
		fn=fn+".svg";
		const juan=parseInt(m[1],10),seq=m[2];
		cor.getArticleField(juan,"footnotesvg",function(field){
			const svgs=field[0].value;
			for(var i=0;i<svgs.length;i++) {
				if (svgs[i].indexOf(fn)>-1) {
					replacesvg(doc,idx,idx+mm.length,svgs[i],count);
					break;
				}
			}
		});
		count++;		
	}.bind(this),10);
}
module.exports={markNoteLines};
},{}],127:[function(require,module,exports){
const notepopupmatrix={width:800,height:175};
const linkpopupmatrix={width:200,height:100};
module.exports={notepopupmatrix,linkpopupmatrix}
},{}],128:[function(require,module,exports){
const calFascicle=function(cor,krange){
	const group=cor.groupOf(krange);
	const grange=cor.groupKRange(group)
	const r=cor.parseRange(grange[0]);
	const a=cor.articleOf(krange).at;
	const b=cor.articleOf(r.start).at;
	return (a-b+1);
}


const citation=require("./citation");
const quoteCopy_mpps=function({cor,value,krange,fields}){

	value=value.replace(/\{k/g,"").replace(/k\}/g,"")
	.replace(/\{b/g,"").replace(/b\}/g,"").replace(/@t/g,"大正")
	.replace(/@y([A-Z][0-9]+)#([0-9]+)/g,function(m,m1){
		return "《印順導師大智度論筆記》"+m1;
	});

	return "「"+value+"」"+citation(cor,krange);
}

const quoteCopy_taisho=function({cor,value,krange}){
	const group=cor.getGroupName(krange).replace(/.*@/,"");
	const address=cor.stringify(krange);
	const vol=address.replace(/p.*/,"");
	var shortaddress=address.replace(/.*p/,"").replace(/\d\d-/,"-");

	if (shortaddress.replace(/.*-/,"").length>=4) {
		shortaddress=shortaddress.substr(0,shortaddress.length-2);		
	} else { //same line
		shortaddress=shortaddress.replace(/-.*/,"");
	}
	var fascicle=calFascicle(cor,krange);
	return "《"+group+"》卷"+fascicle+"：「"+value.replace(/\r?\n/g,"")+"」（大正"+vol+"，"+shortaddress+"）";
}
const taixu_vol=function(compilation,page){ //編, 頁
	const volmaps={
		1:{1:1,531:2},
		2:{1:3},
		3:{1:3},
		4:{1:4,475:5},
		5:{1:6,581:7},
		6:{1:7,301:8,899:9},
		7:{1:10,515:11,911:12,1267:13,1725:14,2409:15},
		8:{1:16},
		9:{1:17},
		10:{1:18},
		11:{1:18,167:19},
		12:{1:20},
		13:{1:20,243:21,751:22,1333:23},
		14:{1:23,247:24},
		15:{1:24},
		16:{1:25},
		17:{1:26,555:27},
		18:{1:27,229:28},
		19:{1:29,443:30,1005:31},
		20:{1:32}
	}
	//太虛大師全書 共二十編 ，精裝32冊，「編」重置頁碼
	//故必須用「編」及「頁碼」計算冊
	//根據厚觀法師 2017.4.21 21:40 寄來太虛大師全書「二十編與精裝三十二冊對照表」

	const ranges=volmaps[compilation];
	if (!ranges)return "";
	var vol="";
	for (var end in ranges) {
		if ( page>=parseInt(end,10)) {
			vol=ranges[end];
		}
	}

	return vol?"精 第"+vol+"冊，":"";
}
const quoteCopy_taixu=function({cor,value,krange,pagerange}){
	const r=cor.parseRange(krange);
	const page=cor.pageOf(r.start)+1;
	const address=cor.stringify(krange);
	const compilation=address.replace(/p.*/,"");
	const vol=taixu_vol(compilation,page);

	const gn=cor.getGroupName(krange);
	return "《"+gn+"》：「"+value+"」（《太虛大師全書》"+"，"+vol+pagerange+"）";
}
const quoteCopy_yinshun=function({cor,value,krange,fields,pagerange}){

	var gn=cor.getGroupName(krange);
	const regexs=[/（.*?）/,/第[一二三四五]冊/];
	var sub="";
	regexs.forEach(function(regex){
		if (gn.match(regex)){
			sub=gn.match(regex)[0];
			gn=gn.replace(regex,"");
		}
	})
	return "「"+value+"」（《"+gn+"》"+sub+"，"+pagerange+"）";
}
const quoteCopy=function({cor,value,krange,fields}){
	if (value.length<10 && value!=="-") {
		return value;
	}
	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var pagerange="p."+sp;
	if (ep!==sp) pagerange="p"+pagerange+'-'+ep;
	if (cor.id=="taisho") return quoteCopy_taisho({cor,value,krange,fields});
	if (cor.id=="mpps") return quoteCopy_mpps({cor,value,krange,fields});
	if (cor.id=="taixu") return quoteCopy_taixu({cor,value,krange,fields,pagerange});
	if (cor.id=="yinshun") return quoteCopy_yinshun({cor,value,krange,fields,pagerange});

	//taixu positing is incorrect, disable quote copy
	//if (cor.id=="taixu") return value;
	
	return "「"+value+"」（《"+cor.getGroupName(krange)+"》"+"，"+pagerange+"）";
}
module.exports=quoteCopy;
},{"./citation":119}],129:[function(require,module,exports){
/*轉 大正  阿含部 子經號 為  冊頁碼 */
const notarget2address=function(cor,no_target,cb){
	var n=parseInt(no_target,10);
	if (n.toString(10)==no_target && n>=cor.parseRange("1p1a0100").start) {
		return no_target;//return as it is , not a sid
	}
	

	if (no_target.indexOf(".")>-1) { //has sub sid
		const m=no_target.match(/(\d+)\.(.*)/);
		if (!m) return no_target;
		var sid=m[1],target=m[2];
		while (sid.length<4) sid="0"+sid;
		cor.getField("subsid@"+sid,function(fielddata){
			if (typeof fielddata.value[0]=="number") { //n26,99,100 sub sid is number, n125 is string(two level)
				target=parseInt(target);
			}
			const at=fielddata.value.indexOf(target);
			if (at>-1) {
				cb(fielddata.pos[at]);
			}
		})
		
	} else { // an sid, search group name
		const groupnames=cor.groupNames();
		const sid=no_target.replace(/^0+/,"");
		for (var i=0;i<groupnames.length;i++) {
			if (groupnames[i].replace(/;.*/,"").replace(/^0+/,"")==sid) {
				const g=cor.groupKRange(i);
				var address= cor.stringify(g[0]);
				console.log("address",address)
				cb&&cb(address);
				return address;
			}
		}
	}
}
module.exports={notarget2address}
},{}],130:[function(require,module,exports){
const patterns={
 taisho:/CBETA, ?T(\d+), .*? p. ?(\d+), ([\dabc\-]+)/g,
}
const markLine=function(doc,i,visitlink){
	if (i>doc.lineCount())return;
	var line=doc.getLine(i);
	line.replace(patterns.taisho,function(m,v,pg,cline,idx){
		const link=document.createElement("span");
		var target=v+'p'+pg+cline;
		link.innerHTML="CBETA "+target;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target=target;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{replacedWith:link});
	})
}

var markNoteLines=function(doc,from,to,openLink){
	const visitlink=function(e){
		const url=e.target.dataset.target;
		if (url.substr(0,7)==="http://") {
			window.open(url);
		} else {
			openLink("taisho@"+url);
		}
	}

	var M=doc.findMarks({line:from,ch:0},{line:to,ch:65536});
	M.forEach(function(m){m.clear()});
	for (var i=from;i<to+1;i++) {
		markLine(doc, i, visitlink);
	}
}
module.exports={markNoteLines};
},{}],131:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;

const CMView=React.createClass({
	propTypes:{
		text:PT.string.isRequired
	}
	,componentDidMount:function(){
		this.loadText(this.props.text);
	}
	,shouldComponentUpdate:function(nextProps){
		return nextProps.text!==this.props.text;
	}
	,componentWillReceiveProps:function(nextProps){
		if (nextProps.text!==this.text) this.loadText(nextProps.text);
	}
	,loadText:function(newtext){
		this.text=newtext;
		this.cm.setValue(newtext);
	}
	,jumpToRange:function(from,to,cb){
		const cm=this.cm;
		cm.scrollIntoView({line:0,ch:0});
		cm.setCursor(from,{scroll:true});
		setTimeout(function(){
			if (from.line<cm.lineCount()){
				cm.scrollIntoView(from,200);
			}
			cb&&cb();
		},500);//wait for decorator
	}
	,scrollToText:function(t){
		var text=this.cm.getValue();
		var at=text.indexOf(t);
		if (at>-1) {
			var pos=this.cm.doc.posFromIndex(at);
			//scroll to last line , so that the paragraph will be at top
			cm.scrollIntoView({line:cm.doc.lineCount()-1,ch:0})
			if (pos.line) pos.line--;
			cm.scrollIntoView(pos);
		}
	}
	,getAllMarks:function(){
		return this.cm.getAllMarks();
	}
	,markText:function(){
		return this.cm.doc.markText.apply(cm.doc,arguments);
	}
	,getLine:function(i){
		return this.cm.getLine(i);
	}
	,onCopy:function(cm,evt){
		this.props.onCopy&&this.props.onCopy(cm,evt);
	}
	,onCut:function(cm,evt){
		this.props.onCut&&this.props.onCut(cm,evt);
	}
	,getCodeMirror:function(){
		return this.cm;
	}
	,setCM:function(cm){
		if (cm) this.cm=cm.getCodeMirror();
	}
	,render:function(){
		return E("div",{},
	  	E(CodeMirror,{ref:this.setCM,value:"",theme:this.props.theme,readOnly:true,
  	  onCursorActivity:this.props.onCursorActivity
  	  ,onCopy:this.onCopy
  	  ,onCut:this.onCut
  	  ,onFocus:this.props.onFocus
  	  ,onBlur:this.props.onBlur
  	  ,extraKeys:this.props.extraKeys
  	  ,onViewportChange:this.props.onViewportChange})
  	 )
	}
})
module.exports=CMView;
},{"ksana-codemirror":"ksana-codemirror","react":"react"}],132:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CMView=require("./cmview");
const is_iOS = navigator.userAgent.match(/(iphone|ipod|ipad)/i) != null;

var search,getArticleHits,stringifyRange;
if (typeof KsanaCorpus!=="undefined") {
	search=KsanaCorpus.openCorpus;
	getArticleHits=KsanaCorpusSearch.getArticleHits;
	stringifyRange=KsanaCorpus.stringifyRange;
} else {
	const KSANACORPUSSEARCH="ksana-corpus-search";
	const KSANACORPUS="ksana-corpus";
	openCorpus=require(KSANACORPUS).openCorpus;
	getArticleHits=require(KSANACORPUSSEARCH).getArticleHits;
	stringifyRange=require(KSANACORPUS).stringifyRange;
}

const decorate=require("./decorate").decorate;
const decorateUserField=require("./decorate").decorateUserField;
const decoratePageStarts=require("./decorate").decoratePageStarts;
const USER_FIELD_PREFIX=require("./decorate").USER_FIELD_PREFIX;
const decorateHits=require("./decorate").decorateHits;
const selectionActivity=require("./selectionactivity");
const followLinkButton=require("./followlinkbutton");
const hitButton=require("./hitbutton");
const hasUserLinkAt=require("./link").hasUserLinkAt;
const hasLinkAt=require("./link").hasLinkAt;

const CorpusView=React.createClass({
	propTypes:{
		corpus:PT.string,
		cor:PT.object,
		corpora:PT.object,//open corpus 
		address:PT.oneOfType([PT.string.isRequired,PT.number.isRequired]),
		rawlines:PT.array.isRequired,
		article:PT.object.isRequired,
		theme:PT.string,
		layout:PT.array,
		active:PT.bool, //in active tab
		onCursorActivity:PT.func,
		onViewport:PT.func,
		onCopyText:PT.func, //custom copy handler
		setSelection:PT.func, //used by selectionactivity
		updateArticleByAddress:PT.func,
		extraKeys:PT.object,
		fields:PT.object,
		userfield:PT.object,
		showPageStart:PT.bool
	}
	,getInitialState:function(){
		const updateTime=new Date();
		return {text:"",linebreaks:[],pagebreaks:[],updateTime};
	}
	,setupDecoratorActions:function(){
		//prepare actions for decorators
		this.actions={};
		for (var i in this.props) {
			if (typeof this.props[i]==="function") {
				this.actions[i]=this.props[i];
			}
		}
		this.actions.highlightAddress=this.highlightAddress;
	}
	,highlightAddress:function(address){
		const r=this.cor.parseRange(address);
		const k=this.toLogicalRange(r.range);;
		this.highlight(k.start,k.end);
	}
	,clearLinkButtons:function(){
		if (this.userlinkbuttons) {
			this.userlinkbuttons.clear&&this.userlinkbuttons.clear();
			this.userlinkbuttons=null;
		}
		if (this.multilinkbuttons) {
			this.multilinkbuttons.clear&&this.multilinkbuttons.clear();
			this.multilinkbuttons=null;
		}
	}
	,clearHitButtons:function(){
		if (this.hitbuttons) {
			this.hitbuttons.clear();
			this.hitbuttons=null;
		}
	}
	,clearHighlight:function(){
		if(this.highlighmarker) {
			this.highlighmarker.clear();		
			this.highlighmarker=null;
		}
	}
	,highlight:function(start,end){
		this.clearHighlight();
		this.highlighmarker=this.cm.markText(start,end,{className:"highlight",clearOnEnter:true});
	}
	,componentDidMount:function(){
		if (!this.props.corpus && !this.props.cor) {
			if(this.props.text) this.setState({text:this.props.text.join("\n")});
			return;
		}
		this.loadtext();
	}
	,loadtext:function(props){
		props=props||this.props;

		this.cor=props.cor?props.cor:openCorpus(props.corpus);
		this.markinview={};//fast check if mark already render, assuming no duplicate mark in same range
		this.markdone={};
		props.removeAllUserLinks&&props.removeAllUserLinks(props.corpus);
		this.setupDecoratorActions();
		decorateUserField.call(this,{},props.userfield);//this will unpaint all fields

		this.layout(props.article,props.rawlines,props.address,props.layout);
	}
	,textReady:function(){
		getArticleHits({cor:this.cor,lines:this.state.lines,linebreaks:this.state.linebreaks,
			article:this.props.article,
			pagebreaks:this.state.pagebreaks,searchresult:this.props.searchresult},function(hits){
				decorateHits.call(this,hits);

				this.articleHits=hits;
				this.onViewportChange(this.cm);

				if (this.props.showPageStart) {
					setTimeout(function(){
						decoratePageStarts.call(this);
					}.bind(this),10);
				}
				setTimeout(function(){
					this.scrollToAddress(this.props.address);
				}.bind(this),200);
		}.bind(this));
	}
	,componentWillUnmount:function(){
		this._unmounted=true;
		if (!this.cm)return;
		this.cm.getAllMarks().forEach(function(m){m.clear()}); //might not need this
		this.cm.setValue("");
	}
	,shouldComponentUpdate:function(nextProps,nextState){
		const scu=(  nextProps.corpus!==this.props.corpus||nextProps.cor!==this.props.cor
			||nextProps.address!==this.props.address
			||nextProps.layout!==this.props.layout
			||nextProps.fields!==this.props.fields
			||nextState.text!==this.state.text);
		return scu;
	}
	,inViewPort:function(line){
		const vp=this.cm.getViewport();
		const from=vp.from,to=vp.to;
		return (line>=from && line<=vp.to);
	}
	,removeDeleteFields:function(fields){
		const newmarkinview={};
		for (var id in this.markinview){
			const type=id.match(/(.*?)_/)[1];
			if (!fields[type] && type[0]!==USER_FIELD_PREFIX) { //user field
				const miv=this.markinview[id];
				if (!miv) continue;
				if (miv instanceof Array) {
					miv.forEach(function(m){m.clear()});
				} else {
					miv.clear();
				}
			} else {
				newmarkinview[id]=this.markinview[id];
			}
		};
		this.markinview=newmarkinview;
	}
	,componentWillReceiveProps:function(nextProps){//cor changed
		if (nextProps.article.at!==this.props.article.at||
			nextProps.layout!==this.props.layout||nextProps.corpus!==this.props.corpus||nextProps.cor!==this.props.cor) {
			this.loadtext(nextProps);
			return;
		}

		if (nextProps.fields!==this.props.fields) {
			this.removeDeleteFields(nextProps.fields);
			this.onViewportChange();			
		}

		if (nextProps.userfield && nextProps.userfield !== this.props.userfield) { //user field should have id			
//			if (Object.keys(nextProps.userfield).length)debugger
			decorateUserField.call(this,nextProps.userfield,this.props.userfield);
			//decorateUserField might clearWorking Link , call viewportchange to repaint
			this.onViewportChange();
			this.clearLinkButtons();
			this.clearHitButtons();
		}

		//if (this.cm && nextProps.active)this.cm.focus();

		if (this.props.address!==nextProps.address ) { //need by updateArticleByAddress
			const r=this.cor.toLogicalRange(this.state.linebreaks,nextProps.address,this.getRawLine);
			if (!r || r.start.line<0)return;

			if (!this.inViewPort(r.start.line)) {
				this.scrollToAddress(nextProps.address);
			} else {
				if (this.noSelection(this.cm)) {
					this.cm.setCursor(r.start);
				}
			}
		}
	}	
	,clearSelection:function(){
		const cursor=this.cm.getCursor();
		this.cm.doc.setSelection(cursor,cursor);
	}
	,toLogicalRange:function(range){
		return this.cor.toLogicalRange(this.state.linebreaks,range,this.getRawLine);
	}
	,toLogicalPos:function(kpos,tailing){
		return this.cor.toLogicalPos(this.state.linebreaks,kpos,this.getRawLine,tailing);
	}
	,fromLogicalPos:function(linech){
		if (!this.cor)return;
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const text=this.cm.doc.getLine(linech.line);
		const lb=this.state.linebreaks[linech.line];
		if (typeof text==="undefined") return this.props.article.end;
		return this.cor.fromLogicalPos(text,linech,lb,firstline,this.getRawLine);
	}
	,getRawLine:function(line){
		return this.props.rawlines[line];
	}
	,scrollToAddress:function(address){
		const r=this.cor.toLogicalRange(this.state.linebreaks,address,this.getRawLine);
		if (!r || r.start.line<0)return;
		if (this.viewer) {
			if (r.start==r.end) {
				const rr=this.cor.toLogicalPos(this.state.linebreaks,address,this.getRawLine,true);
				this.viewer.jumpToRange(rr,rr,this.highlightAddress.bind(this,address));
			} else {
				this.viewer.jumpToRange(r.start,r.end,this.highlightAddress.bind(this,address));
			}
		}
	}
	,layout:function(article,rawlines,address,playout){
		if (!rawlines) {
			return;
		}
		const cor=this.cor;
		if (!address){ //scroll to the selection after layout
			address=this.kRangeFromCursor(this.cm);
		}
		const o=cor.layoutText(rawlines,article.start,playout)
		const text=o.lines.join("\n");
		const updateTime=new Date();
		this.setState({updateTime,linebreaks:o.linebreaks,pagebreaks:o.pagebreaks,text:text,lines:o.lines}, this.textReady );
	}
	,kRangeFromSel:function(cm,from,to){
		if (!this.cor)return;
		if (!from||!to)return 0;
		const f=this.cor.fromLogicalPos.bind(this.cor);
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const s=f(cm.doc.getLine(from.line),from,this.state.linebreaks[from.line],firstline,this.getRawLine,true);
		const e=f(cm.doc.getLine(to.line),to,this.state.linebreaks[to.line],firstline,this.getRawLine,true);
		return this.cor.makeRange(s,e);
	}
	,kRangeFromCursor:function(cm){
		if (!cm)return;
		const sels=cm.listSelections();
		if (!sels.length) return null;

		var from=sels[0].anchor,to=sels[0].head,temp;
		if (from.line>to.line||(from.line==to.line && from.ch>to.ch)) {
			temp=from;from=to;to=temp;
		}
		return this.kRangeFromSel(cm,from,to);
	}
	,onCut:function(cm,evt){
		const krange=this.kRangeFromCursor(cm);
		evt.target.value=this.cor.stringify(krange);
		evt.target.select();//reselect the hidden textarea
	}
	,onCopy:function(cm,evt){
		/*1p178a0103-15 copy and paste incorrect*/
		/* TODO,  address error crossing a page, has line 30 */
		const krange=this.kRangeFromCursor(cm);
		if (this.props.copyText) { //for excerpt copy
			evt.target.value=this.props.copyText(
				{cm:cm,value:evt.target.value,krange:krange,cor:this.cor,fields:this.props.fields});
			evt.target.select();
		}
	}
	,noSelection:function(cm){
		const sels=cm.listSelections();	
		if (sels.length!==1)false;
		const s=sels[0].anchor,e=sels[0].head;
		return s.line==e.line&&s.ch==e.ch;
	}
	,showDictHandle:function(cm){
		this.dicthandle&&this.dicthandle.clear();
		if (!cm.hasFocus())return;
		var widget=document.createElement("span");
		widget.className="dicthandle";
		widget.innerHTML="佛光";
		this.dicthandle=cm.setBookmark(cm.getCursor(),{widget:widget,handleMouseEvents:true});
	}
	,onBlur:function(cm){
		this.dicthandle&&this.dicthandle.clear();
	}
	,autoFollow(linkbuttons){
		const widget=linkbuttons&&linkbuttons.replacedWith;
		if (widget){
			var target=widget;
			if (target.children.length==1) target=target.children[0];
			const mouseover=widget.onmouseoever||widget.children[0].onmouseover;
			const mousedown=widget.onmouseodown||widget.children[0].onmousedown;
			if (!mouseover&&!mousedown) return;

			setTimeout(function(){
				mouseover&&mouseover({target});
				mousedown&&mousedown({target});				
				linkbuttons.clear();
			},5);
		}
	}
	,onCursorActivity:function(cm){
		if (!this.cor) return;
		clearTimeout(this.cursortimer);
		if (is_iOS) document.activeElement.blur();
		this.cursortimer=setTimeout(function(){
			if (this._unmounted)return;
			const cursor=cm.getCursor();
			const kpos=this.fromLogicalPos(cursor);
			selectionActivity.call(this,cm);

			this.clearLinkButtons();
			this.clearHitButtons();
			this.clearHighlight();
			if (this.noSelection(cm)) {				
				const userlinks=hasUserLinkAt(kpos,this.props.userfield);
				this.userlinkbuttons=followLinkButton(cm,userlinks,this.actions,this.props.corpora);

				const multilinks=hasLinkAt(this.cor,kpos,this.props.fields,this.props.corpora,stringifyRange);

				this.multilinkbuttons=(this.props.followLinks||followLinkButton)(cm,multilinks,this.actions,this.props.corpora);
				//custom buttons return false (too few links), use default 
				if (!this.multilinkbuttons) {
					this.multilinkbuttons=followLinkButton(cm,multilinks,this.actions,this.props.corpora);
				}
				const updateSince=new Date() - this.state.updateTime;
				//prevent update from aux to trigger change to aux
				if(this.props.autoFollowSingleLink && updateSince>1500){
					this.autoFollow(this.multilinkbuttons);
				}
				this.hitbuttons=hitButton(cm,kpos,this.articleHits,this.actions);
			}
			//this.showDictHandle(cm);	
			if (is_iOS) document.activeElement.blur();
			this.props.onCursorActivity&&this.props.onCursorActivity(cm,kpos);
			if (is_iOS) document.activeElement.blur();
		}.bind(this),300);
	}
	,onViewportChange:function(cm,from,to){
		cm=cm||this.cm;
		if (!cm)return;
		clearTimeout(this.viewporttimer);
		this.viewporttimer=setTimeout(function(){
			const vp=cm.getViewport();
			const from=this.fromLogicalPos({line:vp.from,ch:0});
			var to=this.fromLogicalPos({line:vp.to,ch:0});
			if (to<from) to=this.props.article.end;
			decorate.call(this,from,to);
			this.onViewport&&this.onViewport(cm,vp.from,vp.to,from,to); //extra params start and end kpos
			this.addresschanged=true;
		}.bind(this),50);
	}
	,setCM:function(cmviewer){
		if (cmviewer) {
			this.viewer=cmviewer;
			this.cm=cmviewer.getCodeMirror();
		}
	}
	,render:function(){
		if (!this.state.text) return E("div",{},"loading...");
		const props=Object.assign({},this.props,
			{ref:this.setCM,
			text:this.state.text,
			onCursorActivity:this.onCursorActivity,
			onCut:this.onCut,
			onCopy:this.onCopy,
			onBlur:this.onBlur,
			extraKeys:this.props.extraKeys,
			onViewportChange:this.onViewportChange,
			articlename:this.props.article.articlename,
			theme:this.props.theme
			}
		);
		return E(CMView,props);
	}
})
module.exports=CorpusView;
},{"./cmview":131,"./decorate":133,"./followlinkbutton":134,"./hitbutton":135,"./link":137,"./selectionactivity":138,"react":"react"}],133:[function(require,module,exports){
const clearWorkingLink=require("./link").clearWorkingLink;
const makeMarkerId=require("./link").makeMarkerId;
const USER_FIELD_PREFIX="#";

//for field with same starting position,
//the short one comes later, so that it will not be overwrite by longer span
const reOrderField=function(cor,pos,value){
	var arr=[];
	for (var i=0;i<pos.length;i++) {
		arr.push([pos[i],value?value[i]:null]);
	}
	arr.sort(function(a,b){
		const r1=cor.parseRange(a[0]); //parse range is slow , don't why?
		const r2=cor.parseRange(b[0]);
		if (r1.start!==r2.start) return r1.start-r2.start;//start has higher priority

		return r2.end-r1.end;
	});
	var out={pos:[],value:[]};
	for (var i=0;i<arr.length;i++) {
		out.pos.push(arr[i][0]);
		out.value.push(arr[i][1]);
	}
	return out;
}
const decorateField=function(fname,_pos,_value,decorator,fromkpos,tokpos,fields){
	var i=0;
	//const rr=reOrderField(this.cor,_pos,_value);
	const rr={value:_value,pos:_pos};
	const pos=rr.pos,value=rr.value;
	if (!pos)return;
	var decorated=0;
	while (i<pos.length) {
		const id=i;
		const range=this.cor.parseRange(pos[i]);
		
		if (typeof fromkpos!=="undefined"&& typeof tokpos !=="undefined"){
			if (!((range.start>fromkpos && range.start<tokpos)
			|| (range.end>fromkpos && range.end<tokpos) )){
				i++;
				continue;
			}
		}

		if (this.markinview[makeMarkerId(fname,range)]) {
			i++
			continue;
		}

		const p=pos[i],v=value?value[i]:"";
		var target=v, multitarget=false;
		i++;

		while (i<pos.length && this.cor.parseRange(pos[i]).start==range.start) {
			if (!multitarget) target=[target];
			target.push(value?value[i]:i);
			multitarget=true;
			i++;
		}
		var r;
		if (this.cor.isRange(p)){
			//by default enclose the concrete words closely
			r=this.toLogicalRange(p);
		} else {
			//tailing = false to paint just after concrete char
			//skipleading to true, so that number of footnotes will stay at begining of line
			var r2=this.toLogicalPos(p,false);
			r={start:r2,end:r2};
		}

		const markerid=makeMarkerId(fname,range);
		const done=this.markdone[markerid];
		decorated++;

		this.markinview[markerid]=decorator({cm:this.cm,cor:this.cor,start:r.start,end:r.end,
			corpus:this.props.corpus,
			field:fname,
			fields:fields,
			kpos:range.start,krange:range,tabid:this.props.id,id:id,target:target,
			multitarget:multitarget,actions:this.actions,done:done});

	}
	//console.log("decorated",decorated,fname)
}

const sortFields=function(fields){
	const out=[];
	for (var id in fields) {
		const field=fields[id];
		const r=this.cor.parseRange(field.from);
		out.push([r.range, field]);
	}
	out.sort(function(a,b){return a[0]-b[0]});
	const pos=out.map(function(i){return i[0]});
	const value=out.map(function(i){return i[1]});

	return {pos:pos,value:value};
}
const groupByDecorator=function(pos,value){
	const out={};
	for (var i=0;i<value.length;i++) {
		const v=value[i];
		if (!out[v.decorator]) out[v.decorator]={pos:[],value:[]};
		out[v.decorator].pos.push(pos[i]);
		out[v.decorator].value.push(v);
	}
	return out;
}

const removeDeletedUserField=function(fields, oldfields){
	for (var id in oldfields) {
		const old=oldfields[id];
		const markerid=USER_FIELD_PREFIX+makeMarkerId(old.decorator,old.range);
		if (!fields[id]) {
			const m=this.markinview[markerid];
			if (m){
				m.clear();
				delete this.markinview[markerid];
				clearWorkingLink.call(this,id,false);
			}
		}
	}
}
const getDecorator=function(fieldname) {
	var decoratorname=fieldname;
	const at=fieldname.indexOf("<");
	if (at>0) decoratorname=decoratorname.substr(0,at);

	return this.props.decorators[decoratorname];
}
const decorateUserField=function(_fields, oldfields){

	removeDeletedUserField.call(this,_fields,oldfields);
	const ff=sortFields.call(this,_fields);
	for (var _f in _fields) { //remove all worling link marker, force redraw
		clearWorkingLink.call(this,_f,true);
	}

	const fields=groupByDecorator(ff.pos,ff.value);
	for (var name in fields) {
		decoratorname=name;
		const at=name.indexOf("@");
		if (at>0) decoratorname=decoratorname.substr(0,at);
		const decorator=getDecorator.call(this,name);;
		decorator&&decorateField.call(this,USER_FIELD_PREFIX+name,fields[name].pos,fields[name].value,decorator);
	}
}

const decorate=function(fromkpos,tokpos,oldfields){
	for (var fname in this.props.fields) {
		if (!this.props.fields[fname]) continue;
		const pos=this.props.fields[fname].pos, value=this.props.fields[fname].value;		
		const decorator=getDecorator.call(this,fname);
		decorator&&decorateField.call(this,fname,pos,value,decorator,fromkpos,tokpos,this.props.fields);
	}
}
const decorateHits=function(phrasehits){
	if (!phrasehits)return;
	if (!this._hits) this._hits=[];
	else {
		this._hits.forEach(function(h){h.clear()});
		this._hits=[];			
	}

	for (var i=0;i<phrasehits.length;i++) {
		const hits=phrasehits[i].hits;
		const hitsend=phrasehits[i].hitsend;

		for (var j=0;j<hits.length;j++) {
			const r=this.toLogicalRange(  this.cor.makeRange(hits[j],hitsend[j]));

			const marker=this.cm.markText(r.start,r.end,{className:'hl'+i});
			this._hits.push(marker);
		}
	}
}
const decoratePageStarts=function(){
	if (!this._pageStarts) this._pageStarts=[];
	else {
		this._pageStarts.forEach(function(pagestart){pagestart.clear()});
		this._pageStarts=[];			
	}
	const regexpb=/p(\d+[a-z]?)/;
	for (var i=0;i<this.state.pagebreaks.length;i++) {
		const pb=this.state.pagebreaks[i];
		const linech=this.toLogicalRange(pb);
		const ele=document.createElement("div");
		const label=document.createElement("span");
		label.className="pblabel"

		label.innerHTML=this.cor.stringify(pb).match(regexpb)[1];
		ele.appendChild(label);
		ele.className="pb";
		this._pageStarts.push(this.cm.doc.addLineWidget(linech.start.line, ele,{above:true}));
	}
}
module.exports={decorate:decorate,decorateField:decorateField,decorateUserField:decorateUserField
,decoratePageStarts:decoratePageStarts,decorateHits:decorateHits,USER_FIELD_PREFIX:USER_FIELD_PREFIX};
},{"./link":137}],134:[function(require,module,exports){
/*TODO show multiple link 
highlight range when hover

yinshun@57p1262.1301 has two sources

*/
const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
var stringifyRange=null;
if (typeof KsanaCorpus!=="undefined") {
	stringifyRange=KsanaCorpus.stringifyRange;
} else {
	const KSANACORPUS="ksana-corpus"
	stringifyRange=require(KSANACORPUS).stringifyRange;
}

const getLinkLabel=function(link,corpora){
	var linklabel=link.to;
	if (!corpora) {
		return linklabel;
	}

	const cor=corpora[link.corpus]; //not open yet
	if (!cor) {
		if (typeof linklabel=="number") {
			const l=linklabel=stringifyRange(linklabel,link.corpus);
			if (l) return l;
		}
		return (typeof link.to=="string")?link.to:link.corpus;
	}
	const shortname=typeof (link.to!=="number")?cor.getGroupName(link.to):"";
	if (typeof linklabel=="number") {
		linklabel=link.corpus+"@"+cor.stringify(linklabel);
	}
	linklabel=linklabel.replace(/\..*/,"");//remove after page,make it shorter;
	if (shortname) linklabel=shortname+"p"+linklabel.replace(/.+p/,"");
	return linklabel;
}
const followLink=function(cm,links,actions,corpora){
	if (!links)return;
	if (!Object.keys(links).length) return;

	const onMouseDown=function(e){
		e.stopPropagation&&e.stopPropagation();
		actions.openLink(e.target.target);
	}

	const onMouseOver=function(e){
		const link=links[e.target.id];
		if (link && link.from) actions.highlightAddress(link.from);
	}

	var widget=document.createElement("span");
	widget.className="followbuttongroup";
	
	for (var id in links) {
		var child=document.createElement("span");
		child.onmousedown=onMouseDown;
		child.onmouseover=onMouseOver;	
		child.className="followbutton"

		const linklabel=getLinkLabel(links[id],corpora);
		child.target=links[id].corpus+"@"+links[id].to;
		child.innerHTML=linklabel;
		child.id=id;
		widget.appendChild(child);
	}
	
	const insertat={line:cm.getCursor().line,ch:cm.getCursor().ch}
	return cm.setBookmark(insertat,{widget:widget,handleMouseEvents:true});
}

module.exports=followLink;
},{"react":"react","react-dom":"react-dom"}],135:[function(require,module,exports){
const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const hasHitAt=require("./link").hasHitAt;
const _=require("ksana-localization")._;

const HitButtons=React.createClass({
	prev:function(){
		const phrasehits=this.props.articlehits[this.props.phrase].hits;
		const n=this.props.nhit-1;
		if (n>=0) {
			this.props.updateArticleByAddress(phrasehits[n]);
		}
	},
	canNext:function(){
		const phrasehits=this.props.articlehits[this.props.phrase].hits;
		const n=this.props.nhit+1;
		return (n<phrasehits.length) 	;
	},
	next:function(){
		const phrasehits=this.props.articlehits[this.props.phrase].hits;
		const n=this.props.nhit+1;
		if (this.canNext()){
			this.props.updateArticleByAddress(phrasehits[n]);
		}
	},
	render:function(){
		return E("div",{},
			this.props.nhit?E("span",{className:"hitbutton",onClick:this.prev},_("Prev Hit")):null,
			" ",
			this.canNext()?E("span",{className:"hitbutton",onClick:this.next},_("Next Hit")):null
		)
	}
})

const hitButton=function(cm,kpos,articlehits,actions){
	const phrasehit=hasHitAt(kpos,articlehits);
	if (!phrasehit) return null;
	var widget=document.createElement("span");
	widget.className="hitbuttongroup";
	ReactDOM.render(E(HitButtons,{articlehits:articlehits,nhit:phrasehit.nhit,
		updateArticleByAddress:actions.updateArticleByAddress,  phrase:phrasehit.phrase}),widget);

	const insertat={line:cm.getCursor().line,ch:cm.getCursor().ch}
	return cm.setBookmark(insertat,{widget:widget,handleMouseEvents:false});	
}

module.exports=hitButton;

},{"./link":137,"ksana-localization":139,"react":"react","react-dom":"react-dom"}],136:[function(require,module,exports){
const CorpusView=require("./corpusview");
module.exports={CorpusView:CorpusView};
},{"./corpusview":132}],137:[function(require,module,exports){
var bsearch=null,trimArticleField=null

if (typeof KsanaCorpus!=="undefined") {
	trimArticleField=KsanaCorpus.trimArticleField;
	bsearch=KsanaCorpus.bsearch;
} else {
	const KSANACORPUS="ksana-corpus";
	trimArticleField=require(KSANACORPUS).trimArticleField;
	bsearch=require(KSANACORPUS).bsearch;
}


const BILINKREGEX=/.*</;

const	getWorkingLinks=function(workinglinks,prefix,article){
	const fields=trimArticleField(workinglinks,article);
	const value=fields.value.map( function(v){return  prefix+"@"+v});
	return {pos:fields.pos,value:value};
}
const makeWLinkId=function(kpos,address){
	return kpos.toString(36) +"_"+address.replace(/.+@/,"");
}
const parseWLinkId=function(wlinkid){
	return parseInt(wlinkid.replace(/_.+/,""),36);
}
const makeMarkerId=function(prefix,rangeobj){
	if (typeof rangeobj=="number") {
		return prefix+"_"+rangeobj;
	}
	if (rangeobj.start==rangeobj.end) {
		return prefix+"_"+rangeobj.start;
	} else {
		return prefix+"_"+rangeobj.range;
	}
}
const hasLinkAt=function(cor,kpos,fields,corpora,stringifyRange) {
	var out=[];
	for (var name in fields) {
		const field=fields[name];
		if (!field || !field.pos || !field.pos[0])continue;
		if (name=="jpeg"||name=="png") return;

		if (!cor.isRange(field.pos[0])) continue;

		var targetcorpus=name.replace(BILINKREGEX,"");
		if (targetcorpus==name) targetcorpus=cor.id;

		//cannot have valid target in field.value
		if (name=="rend" || name=="head")continue;
		for (var i=0;i<field.pos.length;i++) {
			const r=cor.parseRange(field.pos[i]);
			if (kpos>=r.start && kpos<=r.end) {
				var to=field.value[i];
				if (to&&to[0]=="<") continue;
				if (to&&to.length>100) continue;
				if (typeof to=="number") {
					const str_to=stringifyRange(to,targetcorpus);
					if (str_to) to=str_to;
				}
				out.push({id:i,corpus:targetcorpus,from:field.pos[i],to:to});
			}
		}
	}
	return out;
}
const hasUserLinkAt=function(kpos,userfields){
	const out={};
	for (var id in userfields) {
		const field=userfields[id];
		if (kpos>=field.start && kpos<=field.end) out[id]=field;
	}
	return out;
}

const clearWorkingLink=function(f,done){
	if (!this.markinview ||!this.markdone)return;
	const p=parseWLinkId(f);
	const markerid=makeMarkerId("wlink",p);
	const m=this.markinview[markerid];
	if (m) {
		m.clear();
		if (done){
			this.markdone[markerid]=done;	
		} else if (this.markdone[markerid]) {
			delete this.markdone[markerid];
		}
		delete this.markinview[markerid];
	}	
}

const hasHitAt=function(kpos,articlehits){
	if (!articlehits)return null;
	for (var i=0;i<articlehits.length;i++) {
		const phrase=articlehits[i];
		const hits=articlehits[i].hits;
		const at=bsearch(hits,kpos+1 ,true)-1;
		if (hits[at]-1<kpos && hits[at]+(phrase.lengths[at]||phrase.lengths)>=kpos) {
			return {phrase:i,nhit:at};
		}
	}
	return null;
}

module.exports={getWorkingLinks:getWorkingLinks,makeWLinkId:makeWLinkId,parseWLinkId:parseWLinkId,
	hasLinkAt:hasLinkAt,hasUserLinkAt:hasUserLinkAt,makeMarkerId:makeMarkerId,clearWorkingLink:clearWorkingLink,
hasHitAt:hasHitAt};
},{}],138:[function(require,module,exports){
const getCaretText=function(cm,sel){ //get caretText for checking dictionary
	var line=sel.head.line,ch=sel.head.ch;
	//get caret from left of selection
	if (sel.head.line>sel.anchor.line ||
		 (sel.head.line==sel.anchor.line && sel.anchor.ch<sel.head.ch)) {
		line=sel.anchor.line,ch=sel.anchor.ch;
	}
	//if (ch>1) ch-=1; //include two char before
	//should check punc backward
	var caretText=cm.doc.getRange({line:line,ch:ch},{line:line+1,ch:256});
	caretText=caretText.replace(/\r?\n/g,"");
	const m=caretText.match(/^[.？,。，！；「」『』—－：、（）〈〉｛｝【】《》]*(.*?)[.？,。，！；「」『』—－：、（）｛｝【】〈〉《》]/);
	if (m){
		caretText=m[1];
	}
	return caretText;
}
const selectionActivity=function(cm){

	const sels=cm.listSelections();	
	if (sels.length>0){
		const sel=sels[0];
		var ranges=[];
		for (var i=0;i<sels.length;i++) {
			ranges.push(this.kRangeFromSel(cm,sel.head,sel.anchor));
		}

		const selectionText=cm.doc.getSelection();
		const cursor=cm.getCursor();
		const cursorrange=this.kRangeFromCursor(cm);
		const r=this.cor.parseRange(cursorrange);
		this.props.setSelection&&this.props.setSelection({
				corpus:this.props.corpus,id:this.props.id,
				caretText:getCaretText(cm,sel),selectionText:selectionText,
				ranges:ranges, caretpos:r.start, caretposH:this.cor.stringify(r.start),
				index:cm.indexFromPos(cursor),
				cursor:cursor
			});
	}
}
module.exports=selectionActivity;
},{}],139:[function(require,module,exports){
var activelocale="en";
var stringtable={ "en":{} };

const _=function(id){
	return stringtable[activelocale][id]||id;
}
const setLocale=function(locale){
	activelocale=locale;
	if (!stringtable[locale]) stringtable[locale]={};
}
const setString=function(id,str){
	stringtable[activelocale][id]=str;
}
module.exports={_:_,__:_,setLocale:setLocale,setString:setString};
},{}],140:[function(require,module,exports){
const unihanvariants=require("./unihanvariants"); //run gen to get the file
const expandVariant=function(ch){
	const s=unihanvariants[ch];
	if (!s)return ch;//no variants
	//most characters without variants will not create array
	var out=[ch];
	if (s) {
		if (typeof s=="string") {
			out.push(s);
		} else {
			out=out.concat(s);
		}
	}
	for (var i=0;i<out.length;i++) {
		const s2=unihanvariants[out[i]];
		if (s2) {
			if (typeof s2=="string") {
				if (out.indexOf(s2)==-1) out.push(s2);
			} else {
				for (var j=0;j<s2.length;j++) {
					if (out.indexOf(s2[j])==-1) out.push(s2[j]);
				}
			}
		}		
	}
	return out;
}
const test=function(){
	const c1=expandVariant("戶");
	const c2=expandVariant("户");
	const c3=expandVariant("戸");
	const c4=expandVariant("的");
	console.log(c1,c2,c3,c4);
}
//test();
module.exports={expandVariant:expandVariant}
},{"./unihanvariants":141}],141:[function(require,module,exports){
module.exports={
 "㐀": "丘",
 "㐅": "五",
 "㐫": "凶",
 "㐮": "襄",
 "㐯": "庸",
 "㐱": "鬒",
 "㐴": "攀",
 "㐵": "儒",
 "㐽": "偑",
 "㑁": "𠭴",
 "㑄": "侮",
 "㑇": "㑳",
 "㑈": "倲",
 "㑌": "尩",
 "㑔": "㑯",
 "㑝": "𢙱",
 "㑩": "儸",
 "㑯": "㑔",
 "㑳": "㑇",
 "㒇": "儛",
 "㒋": "廝",
 "㒓": "𠉂",
 "㒚": "穩",
 "㒞": "儶",
 "㒰": "全",
 "㒲": "財",
 "㒷": "興",
 "㓁": "网",
 "㓥": "劏",
 "㓨": "刾",
 "㓮": "彫",
 "㓷": "劓",
 "㓸": "斲",
 "㔉": "劚",
 "㔍": "䥷",
 "㔱": "斞",
 "㔾": "卩",
 "㕑": "𢊍",
 "㕚": "爪",
 "㕞": "刷",
 "㖈": "䎛",
 "㖊": "噚",
 "㖞": "喎",
 "㗖": "啖",
 "㗲": "𠵾",
 "㗳": "嗒",
 "㘅": "銜",
 "㘎": "㘚",
 "㘚": "㘎",
 "㘽": "㦳",
 "㙮": "塔",
 "㙳": "轗",
 "㚝": "奞",
 "㚣": "姣",
 "㚯": "㜄",
 "㛀": "媰",
 "㛛": "娠",
 "㛟": "𡞵",
 "㛠": "𡢃",
 "㛣": "㜏",
 "㛤": "孋",
 "㛿": "𡠹",
 "㜄": "㚯",
 "㜏": "㛣",
 "㜢": "𡞱",
 "㜷": "𡝠",
 "㝃": "娩",
 "㝛": "宿",
 "㝵": "礙",
 "㞐": "居",
 "㞞": "𪨊",
 "㟆": "㠏",
 "㟗": "邠",
 "㟜": "𡾱",
 "㠊": "嶇",
 "㠏": "㟆",
 "㠯": "以",
 "㠶": "帆",
 "㡘": "𢅏",
 "㡿": "斥",
 "㢝": "𢋈",
 "㣶": "邅",
 "㣺": "心",
 "㣼": "忍",
 "㤒": "笨",
 "㤘": "㥮",
 "㤵": "慈",
 "㥃": "悶",
 "㥮": "㤘",
 "㥵": "慁",
 "㦎": "𢛯",
 "㦧": "憯",
 "㦳": "㘽",
 "㧃": "收",
 "㧏": "掆",
 "㧐": "㩳",
 "㧑": "撝",
 "㧖": "扼",
 "㧜": "擸",
 "㧟": "擓",
 "㧰": "擽",
 "㨉": "抿",
 "㨗": "捷",
 "㨨": "㩅",
 "㨫": "㩜",
 "㨼": "撂",
 "㩁": "搉",
 "㩅": "㨨",
 "㩜": [
  "攬",
  "㨫"
 ],
 "㩳": "㧐",
 "㩹": "𢶣",
 "㪅": "更",
 "㪯": "舉",
 "㫃": "偃",
 "㫎": "幑",
 "㫚": [
  "昒",
  "曶"
 ],
 "㬅": "曼",
 "㬱": "朁",
 "㬹": "踭",
 "㭎": "棡",
 "㭏": "椲",
 "㭣": "𣙎",
 "㭤": "樢",
 "㭨": "椰",
 "㭴": "樫",
 "㮣": "槩",
 "㯃": "漆",
 "㯭": "樐",
 "㯶": "棕",
 "㯽": "檳",
 "㰍": "櫳",
 "㱩": "殰",
 "㱮": "殨",
 "㱿": "殼",
 "㲒": "勽",
 "㲓": "毧",
 "㲿": "瀇",
 "㳄": "涎",
 "㳔": "濧",
 "㳕": "灡",
 "㳠": "澾",
 "㳡": "濄",
 "㳢": "𣾷",
 "㳽": "瀰",
 "㴑": "溯",
 "㴔": "潝",
 "㵒": "沸",
 "㶉": "鸂",
 "㶶": "燶",
 "㶽": "煱",
 "㷉": "熨",
 "㷠": "燐",
 "㷻": "煳",
 "㷿": "𤈷",
 "㺍": "獱",
 "㺏": "𤠋",
 "㻅": "璯",
 "㻏": "𤫩",
 "㻘": "𤪺",
 "㽣": "域",
 "㽽": "痼",
 "㾙": "脪",
 "㿟": "皦",
 "㿧": "𤽯",
 "㿷": "糙",
 "䀋": "鹽",
 "䀠": "瞿",
 "䀢": "瞬",
 "䀥": "䁻",
 "䀹": [
  "睫",
  "𥅴"
 ],
 "䁖": "瞜",
 "䁪": "𥇢",
 "䁻": "䀥",
 "䂀": "𥋟",
 "䂫": "夯",
 "䂵": "碽",
 "䃉": "珉",
 "䃘": "硜",
 "䄃": "殃",
 "䄍": "蜡",
 "䄯": "𢆞",
 "䄺": "稊",
 "䅉": "稏",
 "䅪": "𥢢",
 "䆋": [
  "秋",
  "龝"
 ],
 "䆔": "竉",
 "䆫": "窓",
 "䇲": "筴",
 "䈇": "罩",
 "䉙": "𥬀",
 "䉤": "籔",
 "䉬": "𫂈",
 "䉲": "𥮜",
 "䉵": "饌",
 "䊜": "糰",
 "䊭": "𥺅",
 "䊷": "䌶",
 "䋙": "䌺",
 "䋚": "䌻",
 "䋲": "繩",
 "䋻": "䌾",
 "䋿": "𦈓",
 "䌈": "𦈖",
 "䌋": "𦈘",
 "䌖": "𦈜",
 "䌝": "𦈟",
 "䌟": "𦈞",
 "䌥": [
  "縯",
  "𦈠"
 ],
 "䌫": "纜",
 "䌰": "𦈙",
 "䌶": "䊷",
 "䌷": "紬",
 "䌸": "縳",
 "䌹": "絅",
 "䌺": "䋙",
 "䌻": "䋚",
 "䌼": "綐",
 "䌽": "綵",
 "䌾": "䋻",
 "䍀": "繿",
 "䍁": "繸",
 "䎛": "㖈",
 "䏕": "飪",
 "䐰": "饈",
 "䒒": "苕",
 "䓕": "薳",
 "䔛": "檾",
 "䕌": "稚",
 "䕳": "𦰴",
 "䖈": "虐",
 "䖍": "虔",
 "䖏": "処",
 "䖟": "蝱",
 "䖣": "蚤",
 "䖵": "蜫",
 "䗖": "螮",
 "䗿": "𧉞",
 "䘑": "脉",
 "䘚": "卒",
 "䘛": "𧝞",
 "䘞": "𧜗",
 "䘺": "綻",
 "䙊": "𧜵",
 "䙌": "䙡",
 "䙓": "襬",
 "䙝": "褻",
 "䙡": "䙌",
 "䚎": "𥅾",
 "䛡": "話",
 "䛻": "誘",
 "䛼": "譭",
 "䜀": "䜧",
 "䜊": "嘈",
 "䜣": "訢",
 "䜤": "鿁",
 "䜥": "𧩙",
 "䜧": "䜀",
 "䜩": "讌",
 "䜶": "豇",
 "䝋": "豵",
 "䝙": "貙",
 "䝜": "狻",
 "䝤": "獠",
 "䝻": "𧹕",
 "䝼": "䞍",
 "䞈": "𧹑",
 "䞌": "𧵳",
 "䞍": "䝼",
 "䞎": "𧶧",
 "䞐": "賰",
 "䞓": "赬",
 "䟢": "躎",
 "䠱": "躅",
 "䢀": "𨊰",
 "䢁": "𨊸",
 "䢂": "𨋢",
 "䢙": "敗",
 "䢨": "𨑹",
 "䣩": "醇",
 "䤍": "𨢥",
 "䥀": "捵",
 "䥇": "䦂",
 "䥑": "鿏",
 "䥨": "鑢",
 "䥩": "𨱖",
 "䥱": "䥾",
 "䥷": "㔍",
 "䥺": "釾",
 "䥽": "鏺",
 "䥾": "䥱",
 "䥿": "𨯅",
 "䦀": "𨦫",
 "䦁": "𨧜",
 "䦂": "䥇",
 "䦃": "鐯",
 "䦅": "鐥",
 "䦓": "覘",
 "䦘": "𨸄",
 "䦛": "䦶",
 "䦟": "䦷",
 "䦳": "𨷿",
 "䦶": "䦛",
 "䦷": "䦟",
 "䧢": "𨸟",
 "䨘": "霰",
 "䩞": "韂",
 "䪊": "龓",
 "䪏": "𩏼",
 "䪗": "𩐀",
 "䪘": "𩏿",
 "䪿": "囟",
 "䫴": "𩖗",
 "䬒": "颼",
 "䬘": "𩙮",
 "䬝": "𩙯",
 "䬞": "𩙧",
 "䬡": "翥",
 "䭀": "𩠇",
 "䭃": "𩠈",
 "䭪": "𩞯",
 "䭾": "馱",
 "䭿": "𩧭",
 "䮝": "𩧰",
 "䮞": "𩨁",
 "䮠": "𩧿",
 "䮫": "𩨇",
 "䮳": "𩨏",
 "䮾": "𩧪",
 "䯀": "䯅",
 "䯃": "𩣑",
 "䯄": "騧",
 "䯅": "䯀",
 "䯌": "尻",
 "䯻": "髻",
 "䰗": "鬮",
 "䰾": "鲃",
 "䱇": "鱓",
 "䱙": "𩾈",
 "䱬": "𩾊",
 "䱰": "𩾋",
 "䱷": [
  "漁",
  "䲣"
 ],
 "䱽": [
  "鯧",
  "䲝"
 ],
 "䲁": "鳚",
 "䲖": "𩾂",
 "䲝": "䱽",
 "䲞": "𩶘",
 "䲟": "鮣",
 "䲠": "鰆",
 "䲡": "鰌",
 "䲢": "鰧",
 "䲣": "䱷",
 "䲤": "鿐",
 "䲰": "𪉂",
 "䴉": "鹮",
 "䴓": "鳾",
 "䴔": "鵁",
 "䴕": "鴷",
 "䴖": "鶄",
 "䴗": "鶪",
 "䴘": "鷈",
 "䴙": "鷿",
 "䴬": "𪎈",
 "䴴": "𪎋",
 "䴹": "餜",
 "䵑": "䵒",
 "䵒": "䵑",
 "䶏": "涕",
 "䶮": "龑",
 "一": "弌",
 "七": "柒",
 "丄": "上",
 "丅": "下",
 "万": [
  "卍",
  "萬"
 ],
 "三": "叁",
 "上": "丄",
 "下": "丅",
 "丌": "其",
 "不": "不",
 "与": "與",
 "丐": "匃",
 "丑": "醜",
 "专": "專",
 "世": "丗",
 "丗": "世",
 "丘": [
  "㐀",
  "丠"
 ],
 "业": "業",
 "丛": "叢",
 "东": "東",
 "丝": "絲",
 "丟": "丢",
 "両": "兩",
 "丢": "丟",
 "丣": "酉",
 "两": [
  "両",
  "兩"
 ],
 "严": "嚴",
 "並": [
  "幷",
  "并"
 ],
 "丧": "喪",
 "个": "個",
 "丬": "爿",
 "丰": "豐",
 "丱": "卝",
 "串": "串",
 "临": "臨",
 "丹": "丹",
 "为": "為",
 "丽": "麗",
 "举": "舉",
 "乃": [
  "迺",
  "廼"
 ],
 "久": "乆",
 "乆": "久",
 "乇": "虐",
 "么": "幺",
 "义": "義",
 "乌": "烏",
 "乐": "樂",
 "乔": "喬",
 "乕": "虎",
 "乗": "乘",
 "乘": "乗",
 "乚": "隱",
 "九": "玖",
 "习": "習",
 "乡": "鄉",
 "书": "書",
 "乩": "稽",
 "买": "買",
 "乱": "亂",
 "乾": "干",
 "亀": "龜",
 "亁": "乾",
 "亂": "乱",
 "了": "了",
 "予": [
  "余",
  "豫"
 ],
 "争": "爭",
 "亊": "事",
 "事": "亊",
 "二": [
  "弍",
  "贰"
 ],
 "于": [
  "扵",
  "於"
 ],
 "亏": [
  "於",
  "虧"
 ],
 "云": "雲",
 "亓": "其",
 "五": [
  "㐅",
  "伍"
 ],
 "亗": [
  "岁",
  "歲"
 ],
 "亘": "亙",
 "亚": "亞",
 "亜": "亞",
 "亝": "齊",
 "亞": [
  "亚",
  "亜"
 ],
 "亡": [
  "兦",
  "亾"
 ],
 "产": "產",
 "亩": "畝",
 "京": "亰",
 "亮": "亮",
 "亯": "享",
 "亰": "京",
 "亱": "夜",
 "亲": [
  "榛",
  "親"
 ],
 "亵": "褻",
 "亷": "廉",
 "亸": "嚲",
 "人": "亻",
 "亻": "人",
 "亼": "集",
 "亾": "亡",
 "亿": "億",
 "什": "什",
 "仁": "忈",
 "仂": "働",
 "仃": "停",
 "仅": "僅",
 "仆": "僕",
 "仇": [
  "讎",
  "讐"
 ],
 "从": "從",
 "仏": "佛",
 "仑": "侖",
 "仓": "倉",
 "他": "她",
 "仙": "僊",
 "仝": "同",
 "仞": "仭",
 "仟": "千",
 "令": "令",
 "以": "㠯",
 "仪": "儀",
 "们": "們",
 "仭": "仞",
 "仮": "假",
 "价": "價",
 "任": "仼",
 "仼": "任",
 "份": "彬",
 "仾": "低",
 "仿": "倣",
 "伀": "彸",
 "伃": "妤",
 "伍": "五",
 "众": "眾",
 "优": "優",
 "伙": "夥",
 "会": "會",
 "伛": "傴",
 "伜": "倅",
 "伝": "傳",
 "伞": "傘",
 "伟": "偉",
 "传": "傳",
 "伡": "俥",
 "伣": "俔",
 "伤": "傷",
 "伥": "倀",
 "伦": "倫",
 "伧": "傖",
 "伩": "信",
 "伪": "偽",
 "伫": "佇",
 "伭": "玄",
 "伱": "你",
 "伲": "你",
 "伷": "冑",
 "佇": [
  "竚",
  "伫"
 ],
 "佈": "布",
 "佋": "紹",
 "低": "仾",
 "佑": "祐",
 "体": "體",
 "佔": "占",
 "佗": "它",
 "余": [
  "予",
  "余"
 ],
 "佛": "仏",
 "佞": "侫",
 "你": [
  "伱",
  "妳"
 ],
 "佣": "傭",
 "佥": "僉",
 "佰": "百",
 "併": [
  "𠊧",
  "并",
  "倂"
 ],
 "侁": "駪",
 "侂": "託",
 "侄": "姪",
 "侅": "賅",
 "來": [
  "来",
  "來"
 ],
 "侉": "誇",
 "侎": "敉",
 "侖": [
  "崙",
  "仑"
 ],
 "侚": "殉",
 "侠": "俠",
 "価": "價",
 "侣": "侶",
 "侥": "僥",
 "侦": "偵",
 "侧": "側",
 "侨": "僑",
 "侩": "儈",
 "侪": "儕",
 "侫": "佞",
 "侬": "儂",
 "侭": "儘",
 "侮": "㑄",
 "侶": "侣",
 "便": "便",
 "俁": "俣",
 "係": "系",
 "俈": "嚳",
 "俊": "儁",
 "俎": "爼",
 "俓": "徑",
 "俔": "伣",
 "俞": "兪",
 "俟": "竢",
 "俠": "侠",
 "信": "伩",
 "俣": "俁",
 "俥": "伡",
 "俦": "儔",
 "俨": "儼",
 "俩": "倆",
 "俪": "儷",
 "俫": "倈",
 "俭": "儉",
 "俯": "頫",
 "俱": "倶",
 "俲": "效",
 "俻": "備",
 "倀": "伥",
 "倂": "併",
 "倅": "伜",
 "倆": "俩",
 "倈": [
  "徠",
  "俫"
 ],
 "倉": "仓",
 "個": "个",
 "倏": "倐",
 "倐": "倏",
 "們": "们",
 "倖": "幸",
 "倘": "儻",
 "借": "藉",
 "倣": "仿",
 "値": "值",
 "倫": [
  "伦",
  "倫"
 ],
 "倲": "㑈",
 "倶": "俱",
 "倹": "儉",
 "债": "債",
 "值": "値",
 "倾": "傾",
 "偁": "穪",
 "偃": "㫃",
 "假": "仮",
 "偉": "伟",
 "偊": "踽",
 "偐": "贋",
 "偑": "㐽",
 "偒": "蕩",
 "停": "仃",
 "健": "徤",
 "偪": "逼",
 "偬": "傯",
 "側": "侧",
 "偵": "侦",
 "偷": "偸",
 "偸": "偷",
 "偹": "備",
 "偺": "昝",
 "偻": "僂",
 "偽": [
  "伪",
  "僞"
 ],
 "偾": "僨",
 "偿": "償",
 "傁": "叟",
 "傌": "罵",
 "傏": "搪",
 "傑": "杰",
 "傖": "伧",
 "傘": [
  "繖",
  "伞"
 ],
 "備": [
  "俻",
  "备"
 ],
 "傜": "徭",
 "傢": "家",
 "傤": "儎",
 "傥": "儻",
 "傧": "儐",
 "储": "儲",
 "傩": "儺",
 "傭": "佣",
 "傯": "偬",
 "傳": "传",
 "傴": "伛",
 "債": "债",
 "傷": "伤",
 "傻": "儍",
 "傽": "慞",
 "傾": "倾",
 "僂": "偻",
 "僅": "仅",
 "僉": "佥",
 "僊": "仙",
 "働": "仂",
 "像": "象",
 "僑": "侨",
 "僕": "仆",
 "僚": "僚",
 "僞": [
  "伪",
  "偽"
 ],
 "僣": "僭",
 "僥": [
  "侥",
  "徺"
 ],
 "僨": "偾",
 "僭": "僣",
 "僱": "雇",
 "價": "价",
 "儀": "仪",
 "儁": "俊",
 "儂": "侬",
 "億": "亿",
 "儆": "警",
 "儈": "侩",
 "儉": "俭",
 "儌": "僥",
 "儍": "傻",
 "儎": "傤",
 "儐": "傧",
 "儒": "㐵",
 "儓": "檯",
 "儔": "俦",
 "儕": "侪",
 "儘": "尽",
 "儛": "㒇",
 "償": "偿",
 "儣": "𠆲",
 "優": "优",
 "儭": "襯",
 "儲": "储",
 "儶": "㒞",
 "儷": "俪",
 "儸": "㑩",
 "儺": "傩",
 "儻": [
  "倘",
  "傥"
 ],
 "儼": "俨",
 "儿": "兒",
 "兀": "兀",
 "兇": "凶",
 "光": "灮",
 "克": "剋",
 "兌": "兑",
 "兎": "兔",
 "児": "兒",
 "兑": "兌",
 "兒": "儿",
 "兔": "兎",
 "兖": "兗",
 "兗": "兖",
 "党": "黨",
 "兦": "亡",
 "內": "内",
 "全": "㒰",
 "兩": [
  "両",
  "两"
 ],
 "兪": "俞",
 "八": "捌",
 "六": "六",
 "兮": "𠔃",
 "兰": "蘭",
 "关": "關",
 "兴": "興",
 "其": "丌",
 "兹": [
  "玆",
  "茲"
 ],
 "养": "養",
 "兽": "獸",
 "兿": "藝",
 "冁": "囅",
 "冂": "坰",
 "冄": "冉",
 "内": "內",
 "円": "圓",
 "冈": "岡",
 "冉": "冄",
 "冊": "册",
 "冋": "冂",
 "册": "冊",
 "冐": "冒",
 "冑": [
  "伷",
  "胄"
 ],
 "冒": "冒",
 "冗": "宂",
 "写": "寫",
 "军": "軍",
 "农": "農",
 "冝": "宜",
 "冢": "塚",
 "冤": "寃",
 "冦": "寇",
 "冨": "富",
 "冩": "寫",
 "冪": [
  "羃",
  "幂"
 ],
 "冫": "氷",
 "冬": "鼕",
 "冯": "馮",
 "冰": [
  "冫",
  "氷"
 ],
 "冱": "沍",
 "冲": "沖",
 "决": "決",
 "况": "況",
 "冷": "冷",
 "冻": "凍",
 "冽": "洌",
 "净": [
  "凈",
  "淨"
 ],
 "凂": "浼",
 "凃": "塗",
 "凄": "淒",
 "凅": "涸",
 "准": "準",
 "凈": [
  "淨",
  "净"
 ],
 "凉": "涼",
 "凋": "雕",
 "凌": "凌",
 "凍": "冻",
 "减": "減",
 "凑": "湊",
 "凖": "準",
 "凙": "𪞝",
 "凛": [
  "懔",
  "凜"
 ],
 "凜": "凛",
 "几": "幾",
 "凡": "凢",
 "凢": "凡",
 "凣": "凡",
 "凤": "鳳",
 "処": [
  "䖏",
  "處"
 ],
 "凨": "風",
 "凫": "鳧",
 "凭": "憑",
 "凯": "凱",
 "凱": "凯",
 "凳": "櫈",
 "凴": "憑",
 "凶": [
  "㐫",
  "兇"
 ],
 "凷": "塊",
 "凹": "𠕄",
 "出": "岀",
 "击": "擊",
 "凼": "幽",
 "函": "凾",
 "凾": "函",
 "凿": "鑿",
 "刀": "刂",
 "刂": "刀",
 "刃": "刄",
 "刄": "刃",
 "刅": "創",
 "切": "切",
 "刈": "苅",
 "刊": "刋",
 "刋": "刊",
 "刍": "芻",
 "划": "劃",
 "刓": "园",
 "刔": "抉",
 "列": "列",
 "刘": "劉",
 "则": "則",
 "刚": "剛",
 "创": "創",
 "删": "刪",
 "別": "别",
 "刦": [
  "刧",
  "劫"
 ],
 "刧": "刦",
 "刨": "鉋",
 "利": [
  "𥝢",
  "利"
 ],
 "刪": "删",
 "别": "別",
 "刬": "剗",
 "刭": "剄",
 "刮": "颳",
 "刱": [
  "創",
  "剏"
 ],
 "刴": "剁",
 "制": "製",
 "刷": "㕞",
 "刹": "剎",
 "刺": "刾",
 "刼": "劫",
 "刽": "劊",
 "刾": [
  "㓨",
  "刺"
 ],
 "刿": "劌",
 "剀": "剴",
 "剁": "刴",
 "剂": "劑",
 "剃": "鬀",
 "剄": "刭",
 "則": "则",
 "剋": [
  "尅",
  "克"
 ],
 "剎": "刹",
 "剏": "刱",
 "剐": "剮",
 "剑": "劍",
 "剗": [
  "剷",
  "刬"
 ],
 "剙": "創",
 "剛": "刚",
 "剝": "剥",
 "剣": "劍",
 "剤": "劑",
 "剥": "剝",
 "剦": "閹",
 "剧": "劇",
 "剩": [
  "賸",
  "剰"
 ],
 "剪": "翦",
 "剮": "剐",
 "剰": "剩",
 "剱": "劍",
 "剳": [
  "劄",
  "箚"
 ],
 "剴": "剀",
 "創": [
  "刅",
  "创",
  "剙"
 ],
 "剷": [
  "剗",
  "鏟"
 ],
 "剾": "𠛅",
 "剿": [
  "𠞰",
  "勦"
 ],
 "劃": "划",
 "劄": "剳",
 "劆": "鐮",
 "劇": "剧",
 "劈": "擗",
 "劉": "刘",
 "劊": "刽",
 "劌": "刿",
 "劍": [
  "劒",
  "剑"
 ],
 "劎": "劔",
 "劏": "㓥",
 "劑": [
  "剂",
  "剤"
 ],
 "劒": "劍",
 "劓": "㓷",
 "劔": [
  "劎",
  "劍"
 ],
 "劚": "㔉",
 "力": "力",
 "劝": "勸",
 "办": "辦",
 "务": "務",
 "劢": [
  "勱",
  "勵"
 ],
 "劣": "劣",
 "动": "動",
 "劫": "刦",
 "励": "勵",
 "劲": "勁",
 "劳": "勞",
 "労": "勞",
 "劵": "券",
 "効": "效",
 "势": "勢",
 "勁": "劲",
 "勃": "艴",
 "勄": "敏",
 "勅": "勑",
 "勋": "勛",
 "勑": "倈",
 "勒": "勒",
 "動": "动",
 "勖": "勗",
 "勗": "勖",
 "務": "务",
 "勚": "勩",
 "勛": [
  "勳",
  "勋",
  "勲"
 ],
 "勝": "胜",
 "勞": [
  "劳",
  "勞"
 ],
 "勢": "势",
 "勤": "懃",
 "勦": "剿",
 "勧": "勸",
 "勩": "勚",
 "勰": "協",
 "勱": "劢",
 "勲": "勛",
 "勳": "勛",
 "勵": [
  "励",
  "劢"
 ],
 "勸": [
  "劝",
  "勧"
 ],
 "勹": "包",
 "勻": "匀",
 "勽": "㲒",
 "勾": "句",
 "匀": "勻",
 "匃": "丐",
 "匄": "匃",
 "包": "勹",
 "匆": "悤",
 "匈": "胸",
 "匊": "掬",
 "匋": "陶",
 "匏": "瓟",
 "北": "北",
 "匘": "腦",
 "匙": "鍉",
 "匝": "帀",
 "匦": "匭",
 "匧": "篋",
 "匭": "匦",
 "匮": "匱",
 "匯": [
  "滙",
  "汇"
 ],
 "匱": [
  "樻",
  "匮"
 ],
 "匳": "奩",
 "匵": "櫝",
 "匹": "疋",
 "区": "區",
 "医": "醫",
 "匿": "匿",
 "區": "区",
 "十": "拾",
 "千": "仟",
 "卄": "廿",
 "卆": "卒",
 "升": "昇",
 "卉": "芔",
 "卋": "世",
 "卌": "𠦌",
 "卍": [
  "万",
  "卐"
 ],
 "华": "華",
 "协": "協",
 "卐": "卍",
 "卒": [
  "䘚",
  "卆"
 ],
 "協": [
  "勰",
  "协",
  "恊"
 ],
 "单": "單",
 "卖": "賣",
 "単": "單",
 "博": "愽",
 "占": "佔",
 "卢": "盧",
 "卤": "鹵",
 "卧": "臥",
 "卩": [
  "㔾",
  "部"
 ],
 "卫": "衛",
 "卬": "卭",
 "卭": "卬",
 "卮": "巵",
 "卯": "戼",
 "即": "卽",
 "却": "卻",
 "卵": "卵",
 "卷": "捲",
 "卸": "缷",
 "卹": "恤",
 "卻": "却",
 "卽": "即",
 "厂": "廠",
 "厄": [
  "戹",
  "阨"
 ],
 "厅": "廳",
 "历": [
  "厲",
  "曆",
  "歷"
 ],
 "厉": "厲",
 "压": "壓",
 "厌": "厭",
 "厍": "厙",
 "厎": "砥",
 "厐": [
  "龎",
  "龐"
 ],
 "厓": "崖",
 "厕": "廁",
 "厖": [
  "庬",
  "龐"
 ],
 "厘": "釐",
 "厙": "厍",
 "厛": "廳",
 "厠": "廁",
 "厢": "廂",
 "厣": "厴",
 "厤": "曆",
 "厦": "廈",
 "厨": "廚",
 "厩": [
  "廐",
  "廄"
 ],
 "厪": "廑",
 "厭": "厌",
 "厮": [
  "㒋",
  "廝"
 ],
 "厰": "廠",
 "厲": [
  "历",
  "厉"
 ],
 "厳": "嚴",
 "厴": "厣",
 "厵": "源",
 "厶": [
  "某",
  "私"
 ],
 "厷": "肱",
 "厹": "叴",
 "县": "縣",
 "叁": [
  "三",
  "叄",
  "參"
 ],
 "参": "參",
 "參": [
  "叅",
  "参",
  "參"
 ],
 "叄": [
  "叁",
  "參"
 ],
 "叅": "參",
 "叆": "靉",
 "叇": "靆",
 "双": "雙",
 "収": "收",
 "发": "發",
 "叔": "尗",
 "变": "變",
 "叙": [
  "敍",
  "敘"
 ],
 "叜": [
  "傁",
  "叟"
 ],
 "叝": "告",
 "叟": [
  "傁",
  "叜"
 ],
 "叠": [
  "曡",
  "疊"
 ],
 "叡": "睿",
 "叢": [
  "樷",
  "丛"
 ],
 "句": "句",
 "叨": "饕",
 "只": [
  "子",
  "隻",
  "止"
 ],
 "叫": "呌",
 "台": [
  "臺",
  "台"
 ],
 "叴": "厹",
 "叵": "尀",
 "叶": "葉",
 "号": "號",
 "叹": "嘆",
 "叽": "嘰",
 "吁": "籲",
 "吃": "喫",
 "合": "閤",
 "吊": "弔",
 "同": [
  "仝",
  "同"
 ],
 "后": "后",
 "吏": "吏",
 "向": [
  "曏",
  "嚮"
 ],
 "吒": "咤",
 "吓": "嚇",
 "吕": "呂",
 "吗": "嗎",
 "吚": "咿",
 "吝": [
  "恡",
  "吝"
 ],
 "吞": "呑",
 "吟": "唫",
 "吣": "唚",
 "吨": [
  "啍",
  "噸"
 ],
 "听": "聽",
 "启": [
  "啟",
  "啓"
 ],
 "吲": "哂",
 "吳": [
  "呉",
  "吴"
 ],
 "吴": "吳",
 "吶": [
  "訥",
  "呐"
 ],
 "吸": "噏",
 "吹": "龡",
 "吻": "呡",
 "吿": "告",
 "呂": [
  "吕",
  "呂"
 ],
 "呆": [
  "獃",
  "騃"
 ],
 "呉": "吳",
 "告": "吿",
 "呌": "叫",
 "呐": "吶",
 "呑": "吞",
 "呒": "嘸",
 "呓": "囈",
 "呕": "嘔",
 "呖": "嚦",
 "呗": "唄",
 "员": "員",
 "呙": "咼",
 "呛": "嗆",
 "呜": "嗚",
 "呠": "歕",
 "呡": "吻",
 "周": "週",
 "呪": [
  "詋",
  "咒"
 ],
 "呱": "哌",
 "呵": "訶",
 "呼": "謼",
 "咀": [
  "觜",
  "嘴"
 ],
 "咂": "𠯗",
 "咊": "和",
 "和": [
  "咊",
  "龢"
 ],
 "咏": "詠",
 "咒": "呪",
 "咙": "嚨",
 "咛": "嚀",
 "咝": "噝",
 "咤": "吒",
 "咨": [
  "嗞",
  "谘"
 ],
 "咩": "哶",
 "咬": "齩",
 "咯": "詻",
 "咱": "偺",
 "咲": "笑",
 "咳": "欬",
 "咷": "啕",
 "咸": "鹹",
 "咼": "呙",
 "咽": [
  "嚥",
  "咽"
 ],
 "咿": "吚",
 "哂": "吲",
 "哄": "閧",
 "哌": "呱",
 "响": "響",
 "哑": "啞",
 "哒": "噠",
 "哓": "嘵",
 "哔": "嗶",
 "哕": "噦",
 "哗": "嘩",
 "哙": "噲",
 "哜": "嚌",
 "哝": "噥",
 "哟": "喲",
 "員": "员",
 "哦": "誐",
 "哯": "𠯟",
 "哲": "喆",
 "哴": "喨",
 "哶": "咩",
 "唁": "喭",
 "唄": "呗",
 "唇": "脣",
 "唉": [
  "欸",
  "誒"
 ],
 "唊": "硤",
 "唖": "啞",
 "唚": "吣",
 "唛": "嘜",
 "唝": "嗊",
 "唠": "嘮",
 "唡": "啢",
 "唢": "嗩",
 "唤": "喚",
 "唧": "喞",
 "唫": "吟",
 "唬": "諕",
 "唷": "唹",
 "唾": "涶",
 "啃": "齦",
 "啍": "吨",
 "啎": "忤",
 "問": "问",
 "啓": "啟",
 "啔": "啓",
 "啕": "咷",
 "啖": [
  "㗖",
  "啗"
 ],
 "啗": [
  "㗖",
  "啖"
 ],
 "啜": "欼",
 "啞": [
  "瘂",
  "哑",
  "唖"
 ],
 "啟": [
  "啓",
  "启"
 ],
 "啢": "唡",
 "啣": "㘅",
 "啧": "嘖",
 "啬": "嗇",
 "啭": "囀",
 "啮": "嚙",
 "啯": "嘓",
 "啰": "囉",
 "啴": "嘽",
 "啸": "嘯",
 "啼": "嗁",
 "喂": "餧",
 "喃": [
  "諵",
  "嫐"
 ],
 "善": "譱",
 "喆": "哲",
 "喇": "喇",
 "喎": "㖞",
 "喐": "郁",
 "喒": "昝",
 "喚": "唤",
 "喜": "憙",
 "喞": "唧",
 "喧": [
  "諠",
  "吅"
 ],
 "喨": "哴",
 "喩": "喻",
 "喪": "丧",
 "喫": "吃",
 "喬": "乔",
 "喭": "唁",
 "單": [
  "单",
  "単"
 ],
 "喰": "餐",
 "喲": "哟",
 "営": "營",
 "喷": "噴",
 "喻": "喩",
 "喽": "嘍",
 "喾": "嚳",
 "喿": "噪",
 "嗀": "嗀",
 "嗁": "啼",
 "嗅": "齅",
 "嗆": "呛",
 "嗇": "啬",
 "嗉": "膆",
 "嗊": "唝",
 "嗎": "吗",
 "嗒": "㗳",
 "嗚": "呜",
 "嗞": "咨",
 "嗥": "嚎",
 "嗩": "唢",
 "嗫": "囁",
 "嗬": "呵",
 "嗳": "噯",
 "嗶": "哔",
 "嗹": "𪡏",
 "嗽": "瘶",
 "嘆": [
  "歎",
  "叹"
 ],
 "嘈": "䜊",
 "嘍": [
  "謱",
  "喽"
 ],
 "嘎": "尜",
 "嘑": "呼",
 "嘓": "啯",
 "嘔": "呕",
 "嘖": "啧",
 "嘗": [
  "甞",
  "尝"
 ],
 "嘘": "噓",
 "嘜": "唛",
 "嘤": "嚶",
 "嘨": "嘯",
 "嘩": [
  "譁",
  "哗"
 ],
 "嘮": "唠",
 "嘯": [
  "歗",
  "啸",
  "嘨"
 ],
 "嘰": "叽",
 "嘱": "囑",
 "嘴": "咀",
 "嘵": "哓",
 "嘷": "嗥",
 "嘸": "呒",
 "嘽": "啴",
 "嘿": "默",
 "噁": "恶",
 "噂": "譐",
 "噅": [
  "𠯠",
  "噕"
 ],
 "噉": "㗖",
 "噏": "吸",
 "噐": "器",
 "噑": "嚎",
 "噓": "嘘",
 "噕": "噅",
 "噚": "㖊",
 "噜": "嚕",
 "噝": "咝",
 "噠": "哒",
 "噥": "哝",
 "噦": [
  "𧬨",
  "哕"
 ],
 "器": "噐",
 "噪": [
  "喿",
  "譟"
 ],
 "噯": "嗳",
 "噲": "哙",
 "噴": [
  "呠",
  "喷"
 ],
 "噸": "吨",
 "噹": "当",
 "嚀": "咛",
 "嚇": "吓",
 "嚌": "哜",
 "嚎": "嗥",
 "嚏": "嚔",
 "嚔": "嚏",
 "嚕": "噜",
 "嚙": [
  "啮",
  "齧"
 ],
 "嚠": "瀏",
 "嚢": "囊",
 "嚣": "囂",
 "嚥": [
  "咽",
  "咽"
 ],
 "嚦": "呖",
 "嚨": "咙",
 "嚬": "顰",
 "嚲": "亸",
 "嚳": [
  "俈",
  "喾"
 ],
 "嚴": [
  "严",
  "厳"
 ],
 "嚵": "饞",
 "嚶": "嘤",
 "嚹": "𡅈",
 "嚻": "囂",
 "囀": "啭",
 "囁": [
  "讘",
  "嗫"
 ],
 "囂": "嚣",
 "囅": "冁",
 "囈": "呓",
 "囉": "啰",
 "囊": "嚢",
 "囌": "蘇",
 "囑": "嘱",
 "囓": [
  "齧",
  "嚙"
 ],
 "囘": [
  "囬",
  "回"
 ],
 "四": "肆",
 "回": [
  "囘",
  "囬"
 ],
 "囟": "䪿",
 "团": "團",
 "団": "團",
 "囤": "𥫱",
 "囪": "囱",
 "囬": "囘",
 "园": [
  "刓",
  "園"
 ],
 "囮": "𡈙",
 "囯": "國",
 "困": "睏",
 "囱": "囪",
 "囲": "圍",
 "図": "圖",
 "围": "圍",
 "囵": "圇",
 "囹": "囹",
 "国": "國",
 "图": "圖",
 "圀": "國",
 "圅": "函",
 "圆": "圓",
 "圇": "囵",
 "圈": "圏",
 "國": [
  "囯",
  "国",
  "圀"
 ],
 "圍": [
  "围",
  "囲"
 ],
 "圎": "圓",
 "圏": "圈",
 "園": "园",
 "圓": [
  "圆",
  "圎"
 ],
 "圕": "圖",
 "圖": [
  "圕",
  "图",
  "図"
 ],
 "團": [
  "团",
  "団"
 ],
 "圝": "圞",
 "圞": [
  "圝",
  "𪢮"
 ],
 "圢": "町",
 "圣": "聖",
 "圧": "壓",
 "圬": "杇",
 "圭": "珪",
 "圹": "壙",
 "场": "場",
 "圻": "垠",
 "址": "阯",
 "坂": "阪",
 "坆": "墳",
 "坋": "坌",
 "坌": "坋",
 "坎": "埳",
 "坏": [
  "坯",
  "壞"
 ],
 "坐": "座",
 "坑": "阬",
 "块": "塊",
 "坚": "堅",
 "坛": "壇",
 "坜": "壢",
 "坝": "壩",
 "坞": "塢",
 "坟": "墳",
 "坠": "墜",
 "坤": "堃",
 "坫": "店",
 "坭": "泥",
 "坯": [
  "坏",
  "壞"
 ],
 "坰": "冂",
 "坵": "丘",
 "垂": "埀",
 "垄": "壟",
 "垅": "壠",
 "垆": "壚",
 "垒": "壘",
 "垓": "陔",
 "垔": "陻",
 "垛": "垜",
 "垜": "垛",
 "垠": "圻",
 "垦": "墾",
 "垩": [
  "堊",
  "聖"
 ],
 "垫": "墊",
 "垭": "埡",
 "垱": "壋",
 "垲": "塏",
 "垴": "堖",
 "垵": "埯",
 "垻": "壩",
 "埀": "垂",
 "埇": "甬",
 "埒": "埓",
 "埘": "塒",
 "埙": "塤",
 "埚": "堝",
 "埜": "野",
 "域": "㽣",
 "埡": "垭",
 "埯": "垵",
 "埰": "采",
 "埳": "坎",
 "埶": "蓺",
 "執": "执",
 "埼": "崎",
 "埽": "掃",
 "堃": "坤",
 "堅": "坚",
 "堇": "菫",
 "堈": "缸",
 "堊": [
  "垩",
  "聖"
 ],
 "堑": "塹",
 "堕": "墮",
 "堖": "垴",
 "堘": "塍",
 "堙": "垔",
 "堝": "埚",
 "堤": "隄",
 "堦": "階",
 "堭": "隍",
 "堯": "尧",
 "報": "报",
 "場": [
  "塲",
  "场"
 ],
 "堺": "界",
 "堿": "鹼",
 "塆": "壪",
 "塈": "墍",
 "塊": [
  "块",
  "凷"
 ],
 "塋": "茔",
 "塍": "堘",
 "塏": "垲",
 "塐": "塑",
 "塑": "塐",
 "塒": "埘",
 "塔": [
  "㙮",
  "墖"
 ],
 "塗": [
  "涂",
  "凃"
 ],
 "塚": "塚",
 "塜": "塳",
 "塞": "塞",
 "塟": "葬",
 "塡": [
  "窴",
  "填"
 ],
 "塢": [
  "隝",
  "坞"
 ],
 "塤": [
  "壎",
  "埙"
 ],
 "塩": "鹽",
 "填": "塡",
 "塲": "場",
 "塳": "塜",
 "塵": "尘",
 "塹": [
  "壍",
  "堑"
 ],
 "墈": "磡",
 "墊": "垫",
 "墍": "塈",
 "墖": "塔",
 "増": "增",
 "墙": "牆",
 "墜": "坠",
 "墝": "磽",
 "墤": "隤",
 "墫": "樽",
 "墮": "堕",
 "墰": "罈",
 "墳": [
  "坆",
  "坟"
 ],
 "墻": [
  "廧",
  "牆"
 ],
 "墾": "垦",
 "壇": "坛",
 "壈": "𡒄",
 "壊": "壞",
 "壋": "垱",
 "壌": "壤",
 "壍": "塹",
 "壎": "塤",
 "壐": "璽",
 "壓": [
  "压",
  "圧"
 ],
 "壘": [
  "垒",
  "塁"
 ],
 "壙": "圹",
 "壚": "垆",
 "壜": "墰",
 "壞": [
  "坏",
  "壊"
 ],
 "壟": [
  "垄",
  "壟"
 ],
 "壠": "垅",
 "壢": "坜",
 "壤": "壌",
 "壩": [
  "垻",
  "坝"
 ],
 "壪": "塆",
 "壮": "壯",
 "壯": "壮",
 "声": "聲",
 "売": "賣",
 "壳": [
  "㱿",
  "殼"
 ],
 "壶": "壺",
 "壷": "壺",
 "壸": "壼",
 "壹": [
  "一",
  "搋"
 ],
 "壺": [
  "壶",
  "壷"
 ],
 "壻": "婿",
 "壼": "壸",
 "壽": "寿",
 "夀": "壽",
 "处": "處",
 "夅": "降",
 "备": "備",
 "変": "變",
 "夊": "攵",
 "复": "復",
 "夐": "敻",
 "夘": "卯",
 "多": "夛",
 "夛": "多",
 "夜": "亱",
 "够": [
  "彀",
  "夠"
 ],
 "夠": "够",
 "夢": "梦",
 "夣": "夢",
 "夥": "伙",
 "天": "靝",
 "夭": "殀",
 "夯": "䂫",
 "头": "頭",
 "夸": "誇",
 "夹": "夾",
 "夺": "奪",
 "夾": "夹",
 "奁": "奩",
 "奂": "奐",
 "奇": "竒",
 "奈": "柰",
 "奋": "奮",
 "奌": "點",
 "奎": "㚝",
 "奐": "奂",
 "契": "契",
 "奔": "犇",
 "奕": "弈",
 "奖": [
  "獎",
  "奬"
 ],
 "奘": "弉",
 "奞": "㚝",
 "奥": "奧",
 "奧": "奥",
 "奨": "奬",
 "奩": [
  "匳",
  "奁"
 ],
 "奪": "夺",
 "奮": "奋",
 "女": "女",
 "奶": [
  "妳",
  "嬭"
 ],
 "奸": "姦",
 "她": "他",
 "奼": "姹",
 "妆": "妝",
 "妇": "婦",
 "妈": "媽",
 "妊": "姙",
 "妍": "姸",
 "妒": "妬",
 "妙": "玅",
 "妝": [
  "粧",
  "妆"
 ],
 "妤": "伃",
 "妩": "嫵",
 "妪": "嫗",
 "妫": "媯",
 "妬": "妒",
 "妳": [
  "奶",
  "你"
 ],
 "姆": "姥",
 "姉": "姊",
 "姊": "姉",
 "姍": "姗",
 "姗": "姍",
 "姙": "妊",
 "姜": "薑",
 "姢": "娟",
 "姣": "㚣",
 "姥": "姆",
 "姦": "奸",
 "姪": "侄",
 "姫": "姬",
 "姬": "姫",
 "姸": "妍",
 "姹": "奼",
 "姻": "婣",
 "娄": "婁",
 "娅": "婭",
 "娆": "嬈",
 "娇": "嬌",
 "娈": "孌",
 "娘": "孃",
 "娚": "喃",
 "娛": "娱",
 "娟": "姢",
 "娠": "㛛",
 "娩": "㝃",
 "娬": "嫵",
 "娯": "娛",
 "娱": "娛",
 "娲": "媧",
 "娴": "嫻",
 "娿": "婀",
 "婀": "娿",
 "婁": "娄",
 "婣": "姻",
 "婦": [
  "媍",
  "妇"
 ],
 "婬": "淫",
 "婭": "娅",
 "婳": "嫿",
 "婴": "嬰",
 "婵": "嬋",
 "婶": "嬸",
 "婾": "媮",
 "婿": [
  "壻",
  "聟"
 ],
 "媆": "嫩",
 "媍": "婦",
 "媧": "娲",
 "媪": "媼",
 "媭": "嬃",
 "媯": [
  "妫",
  "嬀"
 ],
 "媰": "㛀",
 "媼": "媪",
 "媽": "妈",
 "媿": "愧",
 "嫉": "𡜱",
 "嫋": "嬝",
 "嫐": "喃",
 "嫒": "嬡",
 "嫔": "嬪",
 "嫕": "嫛",
 "嫗": "妪",
 "嫛": "嫕",
 "嫩": "媆",
 "嫫": "嬷",
 "嫱": "嬙",
 "嫵": [
  "娬",
  "妩"
 ],
 "嫺": "嫻",
 "嫻": [
  "嫺",
  "娴"
 ],
 "嫿": "婳",
 "嬀": "媯",
 "嬃": "媭",
 "嬈": "娆",
 "嬋": "婵",
 "嬌": [
  "撟",
  "娇"
 ],
 "嬙": "嫱",
 "嬝": "裊",
 "嬡": "嫒",
 "嬢": "娘",
 "嬤": "嬷",
 "嬪": "嫔",
 "嬭": "奶",
 "嬰": [
  "孾",
  "婴"
 ],
 "嬷": [
  "嫫",
  "嬤"
 ],
 "嬸": "婶",
 "嬾": "懶",
 "孀": "霜",
 "孃": "娘",
 "孋": "㛤",
 "孌": "娈",
 "子": "只",
 "孙": "孫",
 "孚": "孵",
 "学": "學",
 "孪": "孿",
 "孫": "孙",
 "孭": "𧴯",
 "孳": "孶",
 "孵": "孚",
 "孶": "孳",
 "學": [
  "斈",
  "学"
 ],
 "孼": "孽",
 "孽": "孼",
 "孾": "嬰",
 "孿": "孪",
 "宁": "寧",
 "宂": "冗",
 "它": [
  "佗",
  "牠"
 ],
 "宅": "宅",
 "完": "烟",
 "宍": "肉",
 "宐": "宜",
 "宜": [
  "宐",
  "冝"
 ],
 "宝": [
  "寳",
  "寶"
 ],
 "实": "實",
 "実": "實",
 "宠": "寵",
 "审": "審",
 "宪": "憲",
 "宫": "宮",
 "宮": "宫",
 "宴": "讌",
 "家": "傢",
 "宻": "密",
 "宼": "寇",
 "宽": "寬",
 "宾": "賓",
 "宿": "㝛",
 "寃": "冤",
 "密": "宻",
 "寇": "宼",
 "富": "冨",
 "寍": "寧",
 "寓": "庽",
 "寔": "實",
 "寕": [
  "寜",
  "寧"
 ],
 "寗": "甯",
 "寘": "置",
 "寚": "宝",
 "寛": "寬",
 "寜": [
  "寕",
  "寧"
 ],
 "寝": "寢",
 "察": "詧",
 "寠": "窶",
 "寡": "關",
 "寢": "寝",
 "實": [
  "寔",
  "实",
  "実"
 ],
 "寧": [
  "寍",
  "宁"
 ],
 "寨": "砦",
 "審": "审",
 "寫": [
  "冩",
  "写"
 ],
 "寬": [
  "宽",
  "寛"
 ],
 "寮": "寮",
 "寳": [
  "宝",
  "寶"
 ],
 "寵": [
  "𠖥",
  "宠"
 ],
 "寶": "宝",
 "对": "對",
 "寻": "尋",
 "导": "導",
 "寿": "壽",
 "尀": "叵",
 "専": "專",
 "尃": "旉",
 "尅": "剋",
 "将": [
  "𤕭",
  "將"
 ],
 "將": [
  "𤕭",
  "将"
 ],
 "專": [
  "耑",
  "专"
 ],
 "尋": "寻",
 "對": "对",
 "導": "导",
 "尒": [
  "尔",
  "爾"
 ],
 "尓": "爾",
 "尔": [
  "尒",
  "爾"
 ],
 "尗": "叔",
 "尘": "塵",
 "尙": "尚",
 "尚": "尙",
 "尜": "嘎",
 "尝": "嘗",
 "尠": "鮮",
 "尢": "尣",
 "尣": "尢",
 "尥": "尦",
 "尦": "尥",
 "尧": "堯",
 "尨": [
  "狵",
  "龍"
 ],
 "尩": "㑌",
 "尪": "尫",
 "尫": "尪",
 "尭": "堯",
 "尰": "腫",
 "尲": "尷",
 "尴": "尷",
 "尷": [
  "尲",
  "尴"
 ],
 "尸": "屍",
 "尻": "䯌",
 "尽": [
  "盡",
  "儘"
 ],
 "尿": "尿",
 "层": "層",
 "屃": "屓",
 "居": "㞐",
 "屆": "届",
 "屉": "屜",
 "届": "屆",
 "屍": "尸",
 "屏": "摒",
 "屓": "屃",
 "屛": "摒",
 "屜": [
  "𡲕",
  "屉"
 ],
 "属": [
  "𡱆",
  "屬"
 ],
 "屡": "屢",
 "屢": [
  "屡",
  "屢"
 ],
 "屣": "蹝",
 "層": "层",
 "履": "履",
 "屦": "屨",
 "屨": "屦",
 "屩": [
  "𪨗",
  "蹺"
 ],
 "屬": "属",
 "屭": "屓",
 "屿": "嶼",
 "岁": [
  "亗",
  "歲"
 ],
 "岂": "豈",
 "岐": "歧",
 "岖": "嶇",
 "岗": [
  "崗",
  "岡"
 ],
 "岘": "峴",
 "岙": "嶴",
 "岚": "嵐",
 "岛": "島",
 "岡": [
  "崗",
  "冈"
 ],
 "岨": "砠",
 "岩": "巖",
 "岫": "峀",
 "岭": [
  "嶺",
  "岺"
 ],
 "岳": "嶽",
 "岺": "岭",
 "岽": [
  "崬",
  "崠"
 ],
 "岿": "巋",
 "峀": "岫",
 "峄": "嶧",
 "峒": "洞",
 "峡": "峽",
 "峣": "嶢",
 "峤": "嶠",
 "峥": "崢",
 "峦": "巒",
 "峨": "峩",
 "峩": "峨",
 "峭": "陗",
 "峯": "峰",
 "峰": "峯",
 "峴": "岘",
 "島": [
  "岛",
  "嶋"
 ],
 "峺": "硬",
 "峽": "峡",
 "崂": "嶗",
 "崃": "崍",
 "崄": "嶮",
 "崈": "崇",
 "崋": "華",
 "崍": "崃",
 "崎": "埼",
 "崐": "崑",
 "崑": "崐",
 "崒": "崪",
 "崔": "磪",
 "崕": "崖",
 "崖": "厓",
 "崗": [
  "岡",
  "岗"
 ],
 "崘": "崙",
 "崙": [
  "侖",
  "崙"
 ],
 "崟": "嶔",
 "崠": "岽",
 "崢": "峥",
 "崧": "嵩",
 "崪": "崒",
 "崬": "岽",
 "崭": "嶄",
 "嵆": "嵇",
 "嵐": [
  "岚",
  "嵐"
 ],
 "嵗": "歲",
 "嵘": "嶸",
 "嵚": "嶔",
 "嵜": "崎",
 "嵝": "嶁",
 "嵠": "谿",
 "嵩": "崧",
 "嵯": "嵳",
 "嵳": "嵯",
 "嵼": "𡶴",
 "嶁": "嵝",
 "嶃": "磛",
 "嶄": [
  "巉",
  "崭"
 ],
 "嶇": [
  "㠊",
  "岖"
 ],
 "嶋": "島",
 "嶌": "島",
 "嶎": "蔚",
 "嶔": [
  "嵚",
  "崟"
 ],
 "嶗": "崂",
 "嶝": "磴",
 "嶠": "峤",
 "嶢": "峣",
 "嶧": "峄",
 "嶮": "崄",
 "嶴": "岙",
 "嶸": "嵘",
 "嶺": [
  "岭",
  "嶺"
 ],
 "嶼": "屿",
 "嶽": "岳",
 "巅": "巔",
 "巉": "嶄",
 "巋": "岿",
 "巌": "巖",
 "巍": "魏",
 "巒": "峦",
 "巔": [
  "巅",
  "巓"
 ],
 "巖": [
  "岩",
  "巌"
 ],
 "巛": "川",
 "川": "巛",
 "巡": "廵",
 "巢": "巣",
 "巣": "巢",
 "巤": "鬣",
 "巨": "鉅",
 "巩": "鞏",
 "巯": "巰",
 "巰": "巯",
 "巴": "笆",
 "巵": "卮",
 "巺": "巽",
 "巻": "捲",
 "巽": "巺",
 "帀": "匝",
 "币": "幣",
 "布": "佈",
 "帅": "帥",
 "帆": "㠶",
 "师": "師",
 "帋": "紙",
 "希": "稀",
 "帏": "幃",
 "帐": "帳",
 "帒": "袋",
 "帘": "簾",
 "帙": "袠",
 "帚": [
  "箒",
  "菷"
 ],
 "帜": "幟",
 "帡": "帲",
 "帥": "帅",
 "带": "帶",
 "帧": "幀",
 "師": "师",
 "帬": "裙",
 "席": "蓆",
 "帮": "幫",
 "帯": "帶",
 "帰": "歸",
 "帱": "幬",
 "帲": "帡",
 "帳": [
  "賬",
  "帐"
 ],
 "帶": [
  "带",
  "帯"
 ],
 "帻": "幘",
 "帼": "幗",
 "幀": "帧",
 "幂": [
  "鼏",
  "冪"
 ],
 "幃": "帏",
 "幇": [
  "帮",
  "幫"
 ],
 "幕": "幙",
 "幗": "帼",
 "幘": "帻",
 "幙": "幕",
 "幚": "幫",
 "幞": "襮",
 "幟": [
  "旘",
  "帜"
 ],
 "幡": "旛",
 "幢": "橦",
 "幣": "币",
 "幤": "幣",
 "幫": "帮",
 "幬": "帱",
 "幱": "襴",
 "干": "乾",
 "年": "秊",
 "幵": "开",
 "并": "並",
 "幷": "並",
 "幸": "倖",
 "幹": "干",
 "幺": "么",
 "幽": "凼",
 "幾": "几",
 "广": "廣",
 "庁": "廳",
 "広": "廣",
 "庄": "莊",
 "庅": [
  "麽",
  "麼"
 ],
 "庆": "慶",
 "床": "牀",
 "庐": "廬",
 "庑": "廡",
 "库": "庫",
 "应": "應",
 "店": "坫",
 "庙": "廟",
 "庞": "龐",
 "废": "廢",
 "度": "廓",
 "座": "坐",
 "庫": "库",
 "庬": "厖",
 "庵": "菴",
 "庶": "庻",
 "庸": "㐯",
 "庻": "庶",
 "庼": "廎",
 "庽": "寓",
 "庾": "斞",
 "庿": "廟",
 "廀": "廋",
 "廁": [
  "厠",
  "厕"
 ],
 "廂": "厢",
 "廃": "廢",
 "廄": [
  "厩",
  "廐"
 ],
 "廈": "厦",
 "廉": "廉",
 "廊": "廊",
 "廋": "廀",
 "廌": "豸",
 "廏": "廄",
 "廐": [
  "厩",
  "廄"
 ],
 "廑": "厪",
 "廓": "廓",
 "廕": "蔭",
 "廚": "厨",
 "廝": [
  "㒋",
  "厮"
 ],
 "廟": "庙",
 "廠": [
  "厰",
  "厂"
 ],
 "廡": "庑",
 "廢": [
  "废",
  "廃"
 ],
 "廣": "广",
 "廧": "墻",
 "廩": [
  "廪",
  "稟"
 ],
 "廪": [
  "廩",
  "稟"
 ],
 "廬": [
  "庐",
  "廬"
 ],
 "廰": "廳",
 "廱": "雝",
 "廳": [
  "厅",
  "廰"
 ],
 "廵": "巡",
 "廸": "迪",
 "廹": "迫",
 "廻": "回",
 "廼": "乃",
 "廽": "回",
 "廾": "廿",
 "廿": [
  "卄",
  "廾"
 ],
 "开": [
  "幵",
  "開"
 ],
 "弁": "辨",
 "异": "異",
 "弃": "棄",
 "弄": "弄",
 "弈": "奕",
 "弉": "奘",
 "弊": "𡚁",
 "弋": "𢍺",
 "弌": [
  "一",
  "搋"
 ],
 "弍": "二",
 "弑": "弒",
 "弒": "弑",
 "弔": "吊",
 "张": "張",
 "弢": "韜",
 "弥": "彌",
 "弦": "絃",
 "弪": "弳",
 "弯": "彎",
 "弳": "弪",
 "張": "张",
 "強": "强",
 "弹": "彈",
 "强": "強",
 "弾": "彈",
 "彀": "够",
 "彂": "發",
 "彈": "弹",
 "彊": [
  "強",
  "强"
 ],
 "彌": "弥",
 "彎": "弯",
 "彐": "彑",
 "彑": "彐",
 "归": "歸",
 "当": [
  "噹",
  "當"
 ],
 "录": "錄",
 "彗": "篲",
 "彙": [
  "汇",
  "彚"
 ],
 "彚": "彙",
 "彛": "彝",
 "彜": "彝",
 "彝": [
  "彞",
  "彛"
 ],
 "彞": "彝",
 "彟": "彠",
 "彠": "彟",
 "彥": "彦",
 "彦": "彥",
 "彨": "彲",
 "彫": "㓮",
 "彬": [
  "斌",
  "份"
 ],
 "彲": "彨",
 "彷": [
  "髣",
  "仿"
 ],
 "彸": "伀",
 "彻": "徹",
 "彿": "髴",
 "往": "徃",
 "征": "征",
 "徃": "往",
 "径": "徑",
 "律": "律",
 "後": "后",
 "徑": [
  "俓",
  "径"
 ],
 "徒": "𨑒",
 "従": "從",
 "徕": "徠",
 "從": [
  "从",
  "従"
 ],
 "徠": [
  "倈",
  "徕",
  "來"
 ],
 "御": [
  "馭",
  "禦"
 ],
 "徤": "健",
 "徧": "遍",
 "徨": "遑",
 "復": [
  "复",
  "覆"
 ],
 "徬": "彷",
 "徭": "傜",
 "徳": "德",
 "徴": "徵",
 "徵": [
  "征",
  "徵"
 ],
 "德": [
  "悳",
  "惪"
 ],
 "徹": [
  "澈",
  "彻"
 ],
 "徺": "僥",
 "心": "㣺",
 "忄": "心",
 "忆": "憶",
 "忈": "仁",
 "忍": "㣼",
 "忏": "懺",
 "志": [
  "志",
  "誌"
 ],
 "応": "應",
 "忞": "暋",
 "忤": "啎",
 "忧": "憂",
 "忭": "昪",
 "忰": "悴",
 "念": "念",
 "忻": "欣",
 "忼": "慷",
 "忾": "愾",
 "怀": "懷",
 "态": "態",
 "怂": "慫",
 "怃": "憮",
 "怄": "慪",
 "怅": "悵",
 "怆": "愴",
 "怌": "懷",
 "怒": "怒",
 "怜": "憐",
 "怪": "恠",
 "怱": "匆",
 "怳": "恍",
 "总": "總",
 "怼": "懟",
 "怿": "懌",
 "恂": "悛",
 "恆": "恒",
 "恊": [
  "勰",
  "協"
 ],
 "恋": "戀",
 "恍": "怳",
 "恐": "𢙢",
 "恒": "恆",
 "恠": "怪",
 "恡": "吝",
 "恤": [
  "卹",
  "賉"
 ],
 "恥": "耻",
 "恩": "摁",
 "恳": "懇",
 "恵": "惠",
 "恶": "惡",
 "恸": "慟",
 "恹": "懨",
 "恺": "愷",
 "恻": "惻",
 "恼": "惱",
 "恽": "惲",
 "恿": "慂",
 "悁": "懁",
 "悅": "悦",
 "悊": "哲",
 "悋": "吝",
 "悐": "惕",
 "悚": "𢥠",
 "悛": "恂",
 "悞": [
  "誤",
  "悮"
 ],
 "悠": "滺",
 "悤": "匆",
 "悦": "悅",
 "悪": "惡",
 "悫": [
  "愨",
  "慤"
 ],
 "悬": "懸",
 "悭": "慳",
 "悮": "悞",
 "悯": "憫",
 "悳": "德",
 "悴": "忰",
 "悵": "怅",
 "悶": [
  "㥃",
  "闷"
 ],
 "悽": "淒",
 "惇": "敦",
 "惊": "驚",
 "惕": "悐",
 "惛": "惽",
 "惝": "𢠵",
 "惠": "恵",
 "惡": [
  "恶",
  "惡"
 ],
 "惧": "懼",
 "惨": "慘",
 "惩": "懲",
 "惪": "德",
 "惫": "憊",
 "惬": "愜",
 "惭": "慚",
 "惮": "憚",
 "惯": "慣",
 "惱": "恼",
 "惲": "恽",
 "惷": "蠢",
 "惺": "𢜫",
 "惻": "恻",
 "惽": "惛",
 "愈": [
  "愉",
  "癒"
 ],
 "愉": "愈",
 "愍": "憫",
 "愛": "爱",
 "愜": "惬",
 "愠": "慍",
 "愤": "憤",
 "愦": "憒",
 "愧": "媿",
 "愨": [
  "悫",
  "慤"
 ],
 "愬": "訴",
 "愴": "怆",
 "愷": "恺",
 "愻": "遜",
 "愼": "眘",
 "愽": "博",
 "愾": "忾",
 "愿": [
  "願",
  "愿"
 ],
 "慁": "㥵",
 "慂": "恿",
 "慄": [
  "栗",
  "慄"
 ],
 "慈": "㤵",
 "態": "态",
 "慍": "愠",
 "慎": "愼",
 "慑": "懾",
 "慘": "惨",
 "慙": "慚",
 "慚": [
  "慙",
  "惭"
 ],
 "慞": "傽",
 "慟": "恸",
 "慣": "惯",
 "慤": "愨",
 "慪": "怄",
 "慫": "怂",
 "慭": "憖",
 "慮": "虑",
 "慳": "悭",
 "慶": "庆",
 "慷": "忼",
 "慼": "慽",
 "慽": "慼",
 "慾": "欲",
 "憂": "忧",
 "憅": "慟",
 "憇": "憩",
 "憊": "惫",
 "憋": "𢠳",
 "憐": [
  "怜",
  "憐"
 ],
 "憑": [
  "凴",
  "凭"
 ],
 "憒": "愦",
 "憔": "顦",
 "憖": "慭",
 "憙": "喜",
 "憚": "惮",
 "憝": "譈",
 "憤": "愤",
 "憩": "憇",
 "憫": [
  "愍",
  "悯"
 ],
 "憮": "怃",
 "憯": "㦧",
 "憰": "譎",
 "憲": "宪",
 "憶": "忆",
 "懀": "𢙓",
 "懁": "悁",
 "懃": "勤",
 "懇": "恳",
 "應": [
  "应",
  "応"
 ],
 "懌": "怿",
 "懍": "懔",
 "懐": "懷",
 "懑": "懣",
 "懒": "懶",
 "懔": [
  "凛",
  "懍"
 ],
 "懜": "懵",
 "懞": "蒙",
 "懟": [
  "憝",
  "怼"
 ],
 "懣": [
  "㥃",
  "懑"
 ],
 "懥": "懫",
 "懨": "恹",
 "懫": "懥",
 "懲": "惩",
 "懴": "懺",
 "懵": "懜",
 "懶": "懒",
 "懷": "怀",
 "懸": "悬",
 "懺": [
  "忏",
  "懴"
 ],
 "懼": "惧",
 "懽": "歡",
 "懾": "慑",
 "戀": [
  "恋",
  "戀"
 ],
 "戆": "戇",
 "戇": "戆",
 "戉": "鉞",
 "戋": "戔",
 "戏": "戲",
 "戔": "戋",
 "戗": "戧",
 "战": "戰",
 "戛": "戞",
 "戝": "賊",
 "戞": "戛",
 "戦": "戰",
 "戧": [
  "創",
  "戗"
 ],
 "戩": "戬",
 "戬": "戩",
 "戮": "戮",
 "戯": [
  "戲",
  "戱"
 ],
 "戰": [
  "战",
  "戦"
 ],
 "戱": [
  "戲",
  "戯"
 ],
 "戲": [
  "戯",
  "戏"
 ],
 "戶": [
  "户",
  "戸"
 ],
 "户": "戶",
 "戸": "戶",
 "戹": "厄",
 "戻": "戾",
 "戼": "卯",
 "戾": "戻",
 "扁": "碥",
 "扅": "扊",
 "扇": "煽",
 "扊": "扅",
 "手": "扌",
 "扌": "手",
 "扎": "紮",
 "扐": "朸",
 "扑": "撲",
 "払": "拂",
 "托": "拓",
 "扛": "摃",
 "扞": [
  "捍",
  "擀"
 ],
 "扠": "搋",
 "执": "執",
 "扩": "擴",
 "扪": "捫",
 "扫": "掃",
 "扬": "揚",
 "扯": "撦",
 "扰": "擾",
 "扱": "插",
 "扳": "攀",
 "扵": "于",
 "扺": "抵",
 "扼": "㧖",
 "抃": "拚",
 "抉": "刔",
 "抌": "舀",
 "抍": "拯",
 "抚": "撫",
 "抛": "拋",
 "抜": "拔",
 "抝": "拗",
 "択": "擇",
 "抟": "摶",
 "抠": "摳",
 "抡": "掄",
 "抢": "搶",
 "护": "護",
 "报": "報",
 "抬": "擡",
 "抱": "抔",
 "抵": "扺",
 "抻": "伸",
 "抽": "𢭆",
 "抿": "㨉",
 "拂": "払",
 "担": "擔",
 "拇": "𧿹",
 "拉": "拉",
 "拊": "撫",
 "拋": "抛",
 "拏": [
  "拿",
  "拏"
 ],
 "拓": [
  "托",
  "拓"
 ],
 "拔": "抜",
 "拕": "拖",
 "拖": "拕",
 "拗": "抝",
 "拚": "抃",
 "拜": "拝",
 "拝": "拜",
 "拟": "擬",
 "拡": "擴",
 "拢": "攏",
 "拣": "揀",
 "拥": "擁",
 "拦": "攔",
 "拧": "擰",
 "拨": "撥",
 "择": "擇",
 "拭": "𢂑",
 "拯": "抍",
 "拴": "揎",
 "拼": "摒",
 "拿": [
  "拏",
  "拏"
 ],
 "挂": "掛",
 "挅": "挆",
 "挆": "挅",
 "挐": "拏",
 "挙": "舉",
 "挚": "摯",
 "挛": "攣",
 "挜": "掗",
 "挝": "撾",
 "挞": "撻",
 "挟": "挾",
 "挠": "撓",
 "挡": "擋",
 "挢": "撟",
 "挣": "掙",
 "挤": "擠",
 "挥": "揮",
 "挦": "撏",
 "挩": "捝",
 "挫": "繲",
 "挭": "骾",
 "挱": "挲",
 "挲": "挱",
 "挷": "搒",
 "挼": "捼",
 "挽": "輓",
 "挾": "挟",
 "捆": "綑",
 "捌": "八",
 "捍": "扞",
 "捏": "揑",
 "捓": "揶",
 "捜": "搜",
 "捝": "挩",
 "捞": "撈",
 "损": "損",
 "捡": "撿",
 "换": "換",
 "捣": "搗",
 "捦": "擒",
 "捨": "舍",
 "捫": "扪",
 "捬": "撫",
 "据": "據",
 "捲": "卷",
 "捴": "總",
 "捵": "䥀",
 "捶": [
  "箠",
  "搥"
 ],
 "捷": "㨗",
 "捻": "捻",
 "捼": "挼",
 "掂": "敁",
 "掃": [
  "埽",
  "扫"
 ],
 "掄": "抡",
 "掆": "㧏",
 "掏": "搯",
 "掐": "𠜼",
 "掗": "挜",
 "掘": "撅",
 "掙": "挣",
 "掛": "挂",
 "掠": "掠",
 "採": "采",
 "掩": "揜",
 "掬": "匊",
 "掲": "揭",
 "掳": "擄",
 "掴": "摑",
 "掷": "擲",
 "掸": "撣",
 "掺": "摻",
 "掻": "搔",
 "掼": "摜",
 "掽": "碰",
 "揀": "拣",
 "揅": "研",
 "揎": "拴",
 "揑": "捏",
 "插": "扱",
 "揚": "扬",
 "換": "换",
 "揜": "掩",
 "揝": "撍",
 "揦": "攋",
 "揪": "揫",
 "揫": "揪",
 "揭": "掲",
 "揮": "挥",
 "揯": "搄",
 "揶": "捓",
 "揷": "插",
 "揸": "楂",
 "揺": "搖",
 "揽": "攬",
 "揾": "搵",
 "揿": "撳",
 "搀": "攙",
 "搁": "擱",
 "搂": "摟",
 "搃": "總",
 "搅": "攪",
 "搆": "構",
 "搇": "撳",
 "搉": "㩁",
 "損": "损",
 "搒": "挷",
 "搔": "掻",
 "搖": [
  "摇",
  "揺"
 ],
 "搗": [
  "擣",
  "捣"
 ],
 "搜": [
  "𢯱",
  "捜"
 ],
 "搞": "攪",
 "搤": "㧖",
 "搥": "捶",
 "搧": "煽",
 "搨": "搭",
 "搪": "傏",
 "搫": "搬",
 "搬": "搫",
 "搭": [
  "撘",
  "搨"
 ],
 "搯": "掏",
 "搵": "揾",
 "搶": "抢",
 "携": "攜",
 "摁": "恩",
 "摂": "攝",
 "摃": "扛",
 "摄": "攝",
 "摅": "攄",
 "摆": "擺",
 "摇": "搖",
 "摈": "擯",
 "摊": "攤",
 "摋": "𢫬",
 "摑": "掴",
 "摒": [
  "拼",
  "屏"
 ],
 "摜": "掼",
 "摟": "搂",
 "摠": "搃",
 "摡": "溉",
 "摣": "揸",
 "摭": "拓",
 "摮": "𢳆",
 "摯": "挚",
 "摳": "抠",
 "摶": "抟",
 "摻": "掺",
 "撂": "㨼",
 "撃": "擊",
 "撄": "攖",
 "撅": "掘",
 "撆": "撇",
 "撇": "撆",
 "撈": "捞",
 "撍": "揝",
 "撏": "挦",
 "撐": "撑",
 "撑": "撐",
 "撓": "挠",
 "撘": "搭",
 "撚": "撚",
 "撝": "㧑",
 "撟": [
  "嬌",
  "挢"
 ],
 "撣": "掸",
 "撥": "拨",
 "撦": "扯",
 "撫": [
  "捬",
  "抚",
  "拊"
 ],
 "撲": [
  "扑",
  "攴"
 ],
 "撳": [
  "搇",
  "揿"
 ],
 "撵": "攆",
 "撷": "擷",
 "撸": "擼",
 "撹": "攪",
 "撺": "攛",
 "撻": "挞",
 "撾": "挝",
 "撿": "捡",
 "擀": "扞",
 "擁": "拥",
 "擃": "攮",
 "擄": [
  "虜",
  "掳",
  "擄"
 ],
 "擇": [
  "择",
  "択"
 ],
 "擊": [
  "击",
  "撃"
 ],
 "擋": [
  "攩",
  "挡"
 ],
 "擒": "捦",
 "擓": "㧟",
 "擔": "担",
 "擗": "劈",
 "據": [
  "据",
  "拠"
 ],
 "擞": "擻",
 "擠": "挤",
 "擡": "抬",
 "擣": [
  "搗",
  "𢭏"
 ],
 "擥": "㩜",
 "擧": "舉",
 "擬": [
  "拟",
  "儗"
 ],
 "擯": "摈",
 "擰": "拧",
 "擱": "搁",
 "擲": [
  "擿",
  "掷"
 ],
 "擴": "扩",
 "擷": "撷",
 "擸": "㧜",
 "擺": "摆",
 "擻": "擞",
 "擼": "撸",
 "擽": "㧰",
 "擾": "扰",
 "擿": "擲",
 "攀": "㐴",
 "攄": "摅",
 "攅": "攢",
 "攆": "撵",
 "攋": "揦",
 "攏": "拢",
 "攒": "攢",
 "攔": "拦",
 "攖": "撄",
 "攙": "搀",
 "攛": "撺",
 "攜": "携",
 "攝": [
  "摄",
  "摂"
 ],
 "攢": [
  "攅",
  "攒"
 ],
 "攣": "挛",
 "攤": "摊",
 "攩": "擋",
 "攪": [
  "搞",
  "搅"
 ],
 "攬": [
  "㩜",
  "揽"
 ],
 "攮": "擃",
 "攴": [
  "攵",
  "撲"
 ],
 "攵": [
  "攴",
  "夊"
 ],
 "收": [
  "㧃",
  "収"
 ],
 "攷": "考",
 "敁": "掂",
 "敃": "暋",
 "效": "効",
 "敉": "侎",
 "敌": "敵",
 "敍": "叙",
 "敎": "教",
 "敏": "勄",
 "敓": "敚",
 "敕": "勅",
 "敗": [
  "䢙",
  "败"
 ],
 "敘": [
  "叙",
  "敍"
 ],
 "教": "敎",
 "敚": "敓",
 "敛": "斂",
 "敠": "敪",
 "敦": "惇",
 "敩": [
  "斆",
  "斅"
 ],
 "敪": "敠",
 "数": "數",
 "敵": "敌",
 "敷": "尃",
 "數": "数",
 "敺": "驅",
 "敻": "夐",
 "敽": "敿",
 "敿": "敽",
 "斁": "𤢕",
 "斂": "敛",
 "斃": "毙",
 "斅": [
  "斆",
  "𢽾"
 ],
 "斆": [
  "斅",
  "敩"
 ],
 "斈": "學",
 "斉": "齊",
 "斋": "齋",
 "斌": "彬",
 "斍": "覺",
 "斎": "齋",
 "斓": "斕",
 "斕": "斓",
 "斗": "鬥",
 "斚": "斝",
 "斝": "斚",
 "斞": "㔱",
 "斤": "觔",
 "斥": "㡿",
 "斩": "斬",
 "斬": "斩",
 "断": "斷",
 "斲": "㓸",
 "斵": "斲",
 "斷": "断",
 "於": "于",
 "斾": "旆",
 "旂": "旗",
 "旅": "旅",
 "旆": "斾",
 "旈": "旒",
 "旉": "尃",
 "旒": "旈",
 "旗": "旂",
 "旘": "幟",
 "旛": "幡",
 "无": "無",
 "既": "旣",
 "旣": "既",
 "旦": "蛋",
 "旧": "舊",
 "旪": "協",
 "旭": "旯",
 "旮": "旭",
 "旯": "旭",
 "时": "時",
 "旷": "曠",
 "旸": "暘",
 "旹": "时",
 "昂": "昻",
 "昇": "升",
 "明": "朙",
 "昏": "昬",
 "昒": "㫚",
 "易": "易",
 "昙": "曇",
 "昚": "愼",
 "昜": "陽",
 "昝": "偺",
 "映": "暎",
 "春": "萅",
 "昪": "忭",
 "昬": "昏",
 "是": "昰",
 "昰": "是",
 "昵": "暱",
 "昶": "暢",
 "昷": "𥁕",
 "昻": "昂",
 "昼": "晝",
 "昽": "曨",
 "显": "顯",
 "昿": "曠",
 "晁": "朝",
 "時": "时",
 "晃": "晄",
 "晄": "晃",
 "晅": "烜",
 "晉": "晋",
 "晋": "晉",
 "晒": "曬",
 "晓": "曉",
 "晔": "曄",
 "晕": "暈",
 "晖": "暉",
 "晚": "晩",
 "晝": "昼",
 "晡": "𣇀",
 "晢": "晰",
 "晩": "晚",
 "晰": [
  "晳",
  "晢"
 ],
 "晳": "晰",
 "晴": "晴",
 "暁": "曉",
 "暂": "暫",
 "暈": "晕",
 "暉": "晖",
 "暋": [
  "敃",
  "忞"
 ],
 "暎": "映",
 "暖": "煖",
 "暗": "晻",
 "暘": "旸",
 "暠": "皜",
 "暢": "畅",
 "暦": "曆",
 "暧": "曖",
 "暨": "曁",
 "暫": "暂",
 "暱": "昵",
 "暴": [
  "虣",
  "暴"
 ],
 "暸": "瞭",
 "曄": [
  "晔",
  "曅"
 ],
 "曅": "曄",
 "曆": [
  "厤",
  "历"
 ],
 "曇": "昙",
 "曉": [
  "晓",
  "暁"
 ],
 "曏": "向",
 "曖": [
  "瞹",
  "暧"
 ],
 "曜": "燿",
 "曠": [
  "旷",
  "昿"
 ],
 "曡": [
  "叠",
  "疉"
 ],
 "曥": "𣆐",
 "曨": "昽",
 "曬": "晒",
 "曳": "曵",
 "更": [
  "㪅",
  "更"
 ],
 "曵": "曳",
 "曶": "㫚",
 "書": "书",
 "曹": "曺",
 "曼": "㬅",
 "曽": "曾",
 "曾": "曽",
 "朁": "㬱",
 "朂": "勗",
 "會": "会",
 "朌": "頒",
 "朐": [
  "鸜",
  "胊"
 ],
 "朖": "朗",
 "朗": "朗",
 "朙": "明",
 "望": "朢",
 "朝": "晁",
 "朞": [
  "稘",
  "期"
 ],
 "期": "朞",
 "朢": "望",
 "朥": "𦛨",
 "朦": "蒙",
 "朧": "胧",
 "朩": "等",
 "本": "夲",
 "札": "箚",
 "术": "術",
 "朳": "杷",
 "朴": "樸",
 "朵": "朶",
 "朶": "朵",
 "朸": "扐",
 "机": "機",
 "朿": "莿",
 "杀": "殺",
 "杂": "雜",
 "权": "權",
 "杆": "桿",
 "杇": "圬",
 "李": "李",
 "村": "邨",
 "杝": "柂",
 "杠": "槓",
 "条": "條",
 "来": "來",
 "杧": "芒",
 "杨": "楊",
 "杩": "榪",
 "杯": "盃",
 "杰": "傑",
 "東": "东",
 "杴": "锨",
 "杷": "朳",
 "杸": "殳",
 "松": [
  "鬆",
  "枩"
 ],
 "板": [
  "版",
  "闆"
 ],
 "枀": "松",
 "极": [
  "极",
  "極"
 ],
 "构": "構",
 "枏": "楠",
 "林": "林",
 "果": "菓",
 "枞": "樅",
 "枢": "樞",
 "枣": "棗",
 "枥": "櫪",
 "枧": "梘",
 "枨": "棖",
 "枩": "松",
 "枪": "槍",
 "枫": "楓",
 "枬": "楠",
 "枭": "梟",
 "枱": "儓",
 "枴": "拐",
 "架": "榢",
 "枾": [
  "柹",
  "柿"
 ],
 "柁": "舵",
 "柂": "杝",
 "柄": "棅",
 "柆": "拉",
 "柏": "栢",
 "某": "厶",
 "柒": [
  "七",
  "漆"
 ],
 "柚": "櫾",
 "柜": "櫃",
 "柠": "檸",
 "查": "査",
 "柩": "柾",
 "柰": "奈",
 "柳": "檉",
 "柴": "茈",
 "柵": "栅",
 "柹": "枾",
 "査": "查",
 "柽": "檉",
 "柾": "柩",
 "柿": "枾",
 "栀": "梔",
 "栄": "榮",
 "栅": "柵",
 "标": [
  "檁",
  "標"
 ],
 "栈": "棧",
 "栉": "櫛",
 "栊": "櫳",
 "栋": "棟",
 "栌": "櫨",
 "栎": "櫟",
 "栏": "欄",
 "树": "樹",
 "栒": "簨",
 "栖": "棲",
 "栗": [
  "慄",
  "慄"
 ],
 "栛": "荔",
 "栝": "檜",
 "栢": "柏",
 "栰": "筏",
 "样": "樣",
 "核": "覈",
 "栾": "欒",
 "桁": "航",
 "桌": "棹",
 "桑": "桒",
 "桒": "桑",
 "桜": "櫻",
 "桟": "棧",
 "桠": "椏",
 "桡": "橈",
 "桢": "楨",
 "档": "檔",
 "桤": "榿",
 "桥": "橋",
 "桦": "樺",
 "桧": "檜",
 "桨": "槳",
 "桩": "樁",
 "桪": "樳",
 "桮": "杯",
 "桼": "㯃",
 "桿": "杆",
 "梁": [
  "樑",
  "梁"
 ],
 "梅": "楳",
 "梔": "栀",
 "梘": "枧",
 "條": "条",
 "梟": [
  "鴞",
  "枭"
 ],
 "梦": "夢",
 "梨": [
  "棃",
  "梨"
 ],
 "梲": [
  "棳",
  "棁"
 ],
 "梹": "檳",
 "梼": "檮",
 "梾": "棶",
 "梿": "槤",
 "检": "檢",
 "棁": "梲",
 "棂": "欞",
 "棃": "梨",
 "棄": "弃",
 "棅": "柄",
 "棊": [
  "碁",
  "棋"
 ],
 "棋": "棊",
 "棐": "榧",
 "棑": "篺",
 "棕": "㯶",
 "棖": "枨",
 "棗": "枣",
 "棟": "栋",
 "棡": "㭎",
 "棥": "樊",
 "棧": [
  "栈",
  "桟"
 ],
 "棰": "槌",
 "棱": "稜",
 "棲": "栖",
 "棳": "梲",
 "棶": "梾",
 "棹": "桌",
 "椀": "盌",
 "椁": "槨",
 "椎": "槌",
 "椏": "桠",
 "椒": "茭",
 "椘": "楚",
 "検": "檢",
 "椝": "槼",
 "椟": "櫝",
 "椠": "槧",
 "椢": "槶",
 "椤": "欏",
 "椫": "樿",
 "椭": "橢",
 "椰": "㭨",
 "椲": "㭏",
 "椶": "棕",
 "椹": "葚",
 "楂": [
  "揸",
  "查"
 ],
 "楊": "杨",
 "楓": "枫",
 "楕": "橢",
 "楙": "茂",
 "楚": "椘",
 "楜": "胡",
 "楞": "棱",
 "楠": "枏",
 "楡": "榆",
 "楥": "楦",
 "楦": "楥",
 "楨": "桢",
 "楫": "艥",
 "業": "业",
 "楳": "梅",
 "極": "极",
 "楼": "樓",
 "楽": "樂",
 "概": [
  "槩",
  "槪"
 ],
 "榄": "欖",
 "榅": "榲",
 "榆": "楡",
 "榇": "櫬",
 "榈": "櫚",
 "榉": "櫸",
 "榎": "檟",
 "榘": "矩",
 "榛": "亲",
 "榢": "架",
 "榦": "乾",
 "榧": "棐",
 "榨": "醡",
 "榪": "杩",
 "榮": "荣",
 "榲": "榅",
 "榴": "橊",
 "榿": "桤",
 "槀": "稿",
 "槅": "核",
 "槇": "槙",
 "槊": "鎙",
 "構": "构",
 "槌": "棰",
 "槍": "枪",
 "槎": "楂",
 "槓": "杠",
 "槖": "橐",
 "様": "樣",
 "槙": "槇",
 "槚": "檟",
 "槛": "檻",
 "槜": "檇",
 "槟": "檳",
 "槠": "櫧",
 "槤": "梿",
 "槧": "椠",
 "槨": "椁",
 "槩": "㮣",
 "槪": "㮣",
 "槳": "桨",
 "槶": "椢",
 "槹": "𣓌",
 "槻": "規",
 "槼": "椝",
 "樁": "桩",
 "樂": [
  "乐",
  "樂"
 ],
 "樅": "枞",
 "樊": "棥",
 "樐": [
  "㯭",
  "櫓"
 ],
 "樑": "梁",
 "樓": [
  "楼",
  "樓"
 ],
 "標": "标",
 "樚": "轆",
 "樞": "枢",
 "樢": "㭤",
 "樣": [
  "样",
  "様"
 ],
 "権": "權",
 "横": "橫",
 "樫": "㭴",
 "樯": "檣",
 "樱": "櫻",
 "樳": "桪",
 "樷": "叢",
 "樸": "朴",
 "樹": "树",
 "樺": "桦",
 "樻": "匱",
 "樽": [
  "墫",
  "罇"
 ],
 "樿": "椫",
 "橆": "無",
 "橇": [
  "鞽",
  "鞒"
 ],
 "橈": "桡",
 "橊": "榴",
 "橋": "桥",
 "橐": "槖",
 "橓": "蕣",
 "橛": "橜",
 "橜": "橛",
 "機": "机",
 "橢": [
  "椭",
  "楕"
 ],
 "橥": "櫫",
 "橦": "幢",
 "橫": "横",
 "橱": "櫥",
 "橹": "櫓",
 "橼": "櫞",
 "檁": [
  "标",
  "檩"
 ],
 "檇": "槜",
 "檉": [
  "柳",
  "柽"
 ],
 "檐": "簷",
 "檔": [
  "欓",
  "档"
 ],
 "檘": "蘗",
 "檛": "簻",
 "檜": [
  "桧",
  "栝"
 ],
 "檝": "楫",
 "檟": [
  "榎",
  "槚"
 ],
 "檠": "𢐧",
 "檢": [
  "检",
  "検"
 ],
 "檣": [
  "艢",
  "樯"
 ],
 "檩": "檁",
 "檭": "𣘴",
 "檮": "梼",
 "檯": [
  "儓",
  "台"
 ],
 "檳": [
  "㯽",
  "槟",
  "梹"
 ],
 "檴": "穫",
 "檸": "柠",
 "檻": "槛",
 "檼": "櫽",
 "檾": "䔛",
 "櫂": "棹",
 "櫃": [
  "匱",
  "柜"
 ],
 "櫈": "凳",
 "櫉": "櫥",
 "櫌": "耰",
 "櫓": [
  "㯭",
  "橹",
  "櫓"
 ],
 "櫚": "榈",
 "櫛": "栉",
 "櫝": [
  "匵",
  "椟"
 ],
 "櫞": "橼",
 "櫟": "栎",
 "櫥": [
  "橱",
  "櫉"
 ],
 "櫧": "槠",
 "櫨": "栌",
 "櫪": "枥",
 "櫫": "橥",
 "櫬": "榇",
 "櫱": "蘖",
 "櫳": [
  "㰍",
  "栊"
 ],
 "櫸": "榉",
 "櫺": "欞",
 "櫻": "樱",
 "櫽": "檼",
 "櫾": "柚",
 "欄": [
  "栏",
  "欄"
 ],
 "權": [
  "权",
  "権"
 ],
 "欍": "𣐤",
 "欏": "椤",
 "欒": [
  "栾",
  "灤"
 ],
 "欓": [
  "檔",
  "𣗋"
 ],
 "欖": "榄",
 "欝": "鬱",
 "欞": [
  "櫺",
  "棂"
 ],
 "欠": "缺",
 "欢": [
  "懽",
  "歡"
 ],
 "欣": "忻",
 "欤": "歟",
 "欧": "歐",
 "欬": "咳",
 "欲": "慾",
 "欵": "款",
 "欶": "𠲿",
 "欸": "唉",
 "欹": "猗",
 "欼": "啜",
 "欽": "钦",
 "款": "欵",
 "歉": "欠",
 "歌": "謌",
 "歎": "嘆",
 "歐": "欧",
 "歓": "歡",
 "歕": "呠",
 "歗": "嘯",
 "歛": "斂",
 "歟": "欤",
 "歠": "啜",
 "歡": [
  "懽",
  "欢",
  "驩"
 ],
 "止": "只",
 "歧": "岐",
 "歩": "步",
 "歯": "齒",
 "歱": "踵",
 "歲": [
  "亗",
  "岁"
 ],
 "歳": "歲",
 "歴": [
  "曆",
  "歷"
 ],
 "歷": [
  "曆",
  "历"
 ],
 "歸": [
  "归",
  "帰"
 ],
 "歹": "歺",
 "歺": "歹",
 "歼": "殲",
 "歿": "殁",
 "殀": "夭",
 "殁": "歿",
 "殃": "䄃",
 "殇": "殤",
 "殉": "侚",
 "残": "殘",
 "殒": [
  "殞",
  "隕"
 ],
 "殓": "殮",
 "殘": "残",
 "殚": "殫",
 "殞": [
  "殒",
  "隕"
 ],
 "殡": "殯",
 "殤": "殇",
 "殨": "㱮",
 "殫": "殚",
 "殮": "殓",
 "殯": "殡",
 "殰": [
  "𦢌",
  "㱩"
 ],
 "殱": "殲",
 "殲": "歼",
 "殳": "杸",
 "殴": "毆",
 "殺": [
  "杀",
  "殺"
 ],
 "殻": [
  "壳",
  "殼"
 ],
 "殼": [
  "㱿",
  "壳"
 ],
 "殽": "淆",
 "毀": "毁",
 "毁": "毀",
 "毂": "轂",
 "毆": "殴",
 "毎": "每",
 "每": "毎",
 "毓": "育",
 "毕": "畢",
 "毗": "毘",
 "毘": "毗",
 "毙": "斃",
 "毡": "氈",
 "毧": "㲓",
 "毬": "球",
 "毵": "毿",
 "毿": "毵",
 "氂": [
  "牦",
  "犛"
 ],
 "氅": "鷩",
 "氇": "氌",
 "氈": "毡",
 "氊": "氈",
 "氌": "氇",
 "氓": "甿",
 "气": "氣",
 "気": "氣",
 "氜": "陽",
 "氢": "氫",
 "氣": [
  "炁",
  "气",
  "気"
 ],
 "氤": "絪",
 "氩": "氬",
 "氫": "氢",
 "氬": "氩",
 "氯": "綠",
 "氲": "氳",
 "氳": "氲",
 "水": "氵",
 "氵": "水",
 "氷": [
  "冫",
  "冰"
 ],
 "氼": "溺",
 "氽": "尿",
 "氾": "泛",
 "汇": [
  "匯",
  "彙"
 ],
 "汉": "漢",
 "汎": "泛",
 "汙": [
  "污",
  "汚"
 ],
 "汚": "汙",
 "污": "汙",
 "汤": "湯",
 "汹": "洶",
 "決": "决",
 "沅": "源",
 "沈": [
  "沉",
  "瀋"
 ],
 "沉": [
  "沈",
  "瀋"
 ],
 "沍": "冱",
 "沒": "没",
 "沖": [
  "冲",
  "盅"
 ],
 "沟": "溝",
 "没": "沒",
 "沢": "澤",
 "沣": "灃",
 "沤": "漚",
 "沥": "瀝",
 "沦": "淪",
 "沧": "滄",
 "沨": "渢",
 "沩": "溈",
 "沪": [
  "冱",
  "滬"
 ],
 "沱": "沲",
 "沲": "沱",
 "沵": "濔",
 "沸": "㵒",
 "況": "况",
 "泄": "洩",
 "泉": "洤",
 "泊": "泺",
 "泖": "茅",
 "泙": "洴",
 "泛": "汎",
 "泝": [
  "遡",
  "溯"
 ],
 "泞": "濘",
 "泥": [
  "坭",
  "泥"
 ],
 "注": "註",
 "泪": "淚",
 "泶": "澩",
 "泷": "瀧",
 "泸": "瀘",
 "泺": "濼",
 "泻": "瀉",
 "泼": "潑",
 "泽": "澤",
 "泾": "涇",
 "洁": "潔",
 "洌": "冽",
 "洒": "灑",
 "洚": "洪",
 "洛": "洛",
 "洞": "峒",
 "洟": "涕",
 "洤": "泉",
 "洩": "泄",
 "洪": "洚",
 "洴": "泙",
 "洶": "汹",
 "洼": "窪",
 "洿": "汙",
 "流": "流",
 "浃": "浹",
 "浄": "淨",
 "浅": "淺",
 "浆": "漿",
 "浇": "澆",
 "浈": "湞",
 "浉": "溮",
 "浊": "濁",
 "测": "測",
 "浍": "澮",
 "济": "濟",
 "浏": "瀏",
 "浐": "滻",
 "浑": "渾",
 "浒": "滸",
 "浓": "濃",
 "浔": "潯",
 "浕": "濜",
 "浚": "濬",
 "浜": "濱",
 "浣": "澣",
 "浩": "澔",
 "浪": "浪",
 "浹": "浃",
 "浼": "凂",
 "涂": "塗",
 "涅": "湼",
 "涇": "泾",
 "涉": "渉",
 "涌": "湧",
 "涎": "㳄",
 "涕": [
  "䶏",
  "洟"
 ],
 "涖": "莅",
 "涙": "淚",
 "涚": "涗",
 "涛": "濤",
 "涜": "瀆",
 "涝": "澇",
 "涞": "淶",
 "涟": "漣",
 "涠": "潿",
 "涡": "渦",
 "涢": "溳",
 "涣": "渙",
 "涤": "滌",
 "润": "潤",
 "涧": "澗",
 "涨": "漲",
 "涩": "澀",
 "涶": "唾",
 "涸": "凅",
 "涼": [
  "凉",
  "凉"
 ],
 "淀": "澱",
 "淆": "殽",
 "淋": "淋",
 "淒": "凄",
 "淚": [
  "泪",
  "淚"
 ],
 "淜": "漰",
 "淡": "澹",
 "淥": "渌",
 "淨": "凈",
 "淪": "沦",
 "淫": "婬",
 "淳": "湻",
 "淵": "渊",
 "淶": "涞",
 "淸": "清",
 "淹": "渰",
 "淺": "浅",
 "清": "淸",
 "渇": "渴",
 "済": "濟",
 "渉": "涉",
 "渊": "淵",
 "渋": "澀",
 "渌": "淥",
 "渍": "漬",
 "渎": "瀆",
 "渐": "漸",
 "渑": "澠",
 "渓": "溪",
 "渔": "漁",
 "渕": "淵",
 "渗": "滲",
 "渙": "涣",
 "渚": "陼",
 "減": "减",
 "渢": "沨",
 "渦": "涡",
 "渨": "隈",
 "温": "溫",
 "渫": "泄",
 "測": "测",
 "渰": "淹",
 "渴": "渇",
 "游": "逰",
 "渹": "𢕐",
 "渾": "浑",
 "湊": "凑",
 "湏": "須",
 "湞": "浈",
 "湟": "況",
 "湧": "涌",
 "湯": "汤",
 "湻": "淳",
 "湼": "涅",
 "湾": "灣",
 "湿": [
  "濕",
  "溼"
 ],
 "満": "滿",
 "溁": "濚",
 "溃": "潰",
 "溅": "濺",
 "溆": "漵",
 "溇": "漊",
 "溈": [
  "沩",
  "潙"
 ],
 "溉": [
  "摡",
  "漑"
 ],
 "溌": "潑",
 "源": "厵",
 "準": [
  "准",
  "凖"
 ],
 "溜": "溜",
 "溝": "沟",
 "溪": "渓",
 "溫": "温",
 "溮": "浉",
 "溯": [
  "遡",
  "泝"
 ],
 "溳": "涢",
 "溺": [
  "氼",
  "尿"
 ],
 "溻": "褟",
 "溼": "濕",
 "溽": "縟",
 "滄": "沧",
 "滅": [
  "烕",
  "灭"
 ],
 "滌": "涤",
 "滎": "荥",
 "滑": "磆",
 "滗": "潷",
 "滙": "匯",
 "滚": "滾",
 "滞": "滯",
 "滟": [
  "灧",
  "灔"
 ],
 "滠": "灄",
 "满": "滿",
 "滢": "瀅",
 "滤": "濾",
 "滥": "濫",
 "滦": "灤",
 "滨": "濱",
 "滩": "灘",
 "滪": "澦",
 "滬": "沪",
 "滯": "滞",
 "滲": "渗",
 "滸": "浒",
 "滺": "悠",
 "滻": "浐",
 "滾": "滚",
 "滿": "满",
 "漁": [
  "䱷",
  "渔"
 ],
 "漆": [
  "㯃",
  "柒"
 ],
 "漇": "𢳜",
 "漊": "溇",
 "漎": "潨",
 "漏": "漏",
 "漑": "溉",
 "漓": "灕",
 "漚": "沤",
 "漢": "汉",
 "漣": "涟",
 "漤": "灠",
 "漫": "澷",
 "漬": "渍",
 "漰": "淜",
 "漱": "潄",
 "漲": "涨",
 "漵": "溆",
 "漸": "渐",
 "漾": "瀁",
 "漿": [
  "𤕯",
  "浆"
 ],
 "潀": "潨",
 "潁": "颍",
 "潅": "灌",
 "潆": "瀠",
 "潇": "瀟",
 "潋": "瀲",
 "潍": "濰",
 "潑": [
  "泼",
  "溌"
 ],
 "潔": "洁",
 "潙": "溈",
 "潛": "潜",
 "潜": "潛",
 "潝": "㴔",
 "潣": "浼",
 "潤": "润",
 "潨": [
  "漎",
  "潀"
 ],
 "潬": "灘",
 "潯": "浔",
 "潰": "溃",
 "潴": "瀦",
 "潷": "滗",
 "潸": "𣽽",
 "潿": "涠",
 "澀": [
  "澁",
  "涩"
 ],
 "澁": "澀",
 "澄": "澂",
 "澅": "𣶩",
 "澆": "浇",
 "澇": "涝",
 "澈": "徹",
 "澑": "溜",
 "澔": "浩",
 "澗": [
  "磵",
  "涧"
 ],
 "澙": "潟",
 "澛": "瀂",
 "澜": "瀾",
 "澠": "渑",
 "澣": "浣",
 "澤": [
  "泽",
  "沢"
 ],
 "澦": "滪",
 "澩": "泶",
 "澮": "浍",
 "澱": "淀",
 "澳": "襖",
 "澷": "漫",
 "澹": "淡",
 "澾": "㳠",
 "濁": "浊",
 "濃": "浓",
 "濄": "㳡",
 "濆": "𣸣",
 "濇": "澀",
 "濑": "瀨",
 "濒": "瀕",
 "濔": "沵",
 "濕": [
  "溼",
  "湿"
 ],
 "濘": "泞",
 "濚": "溁",
 "濛": "霥",
 "濜": "浕",
 "濟": "济",
 "濤": "涛",
 "濧": "㳔",
 "濫": "滥",
 "濬": "浚",
 "濰": "潍",
 "濱": [
  "濵",
  "滨"
 ],
 "濳": "潛",
 "濵": "濱",
 "濶": "闊",
 "濺": "溅",
 "濼": [
  "泺",
  "泊"
 ],
 "濾": [
  "滤",
  "濾"
 ],
 "濿": "砅",
 "瀁": "漾",
 "瀂": "澛",
 "瀃": "𣽷",
 "瀅": "滢",
 "瀆": "渎",
 "瀇": "㲿",
 "瀉": "泻",
 "瀋": "沈",
 "瀏": "浏",
 "瀒": "澀",
 "瀕": [
  "濱",
  "濒"
 ],
 "瀘": "泸",
 "瀝": "沥",
 "瀟": "潇",
 "瀠": "潆",
 "瀦": "潴",
 "瀧": "泷",
 "瀨": [
  "濑",
  "瀬"
 ],
 "瀬": "瀨",
 "瀰": [
  "㳽",
  "彌"
 ],
 "瀲": "潋",
 "瀾": "澜",
 "灃": "沣",
 "灄": "滠",
 "灌": "潅",
 "灎": "灔",
 "灏": "灝",
 "灑": "洒",
 "灔": "灩",
 "灕": "漓",
 "灘": [
  "潬",
  "滩"
 ],
 "灙": "𣺼",
 "灝": "灏",
 "灠": "漤",
 "灡": "㳕",
 "灣": "湾",
 "灤": "滦",
 "灧": [
  "滟",
  "灔"
 ],
 "火": "灬",
 "灬": "火",
 "灭": "滅",
 "灮": "光",
 "灯": "燈",
 "灰": "灰",
 "灴": "烘",
 "灵": "靈",
 "灶": "竈",
 "災": [
  "灾",
  "烖"
 ],
 "灾": "災",
 "灿": "燦",
 "炀": "煬",
 "炁": "氣",
 "炅": "耿",
 "炉": "爐",
 "炔": "耿",
 "炙": "炙",
 "炜": "煒",
 "炝": "熗",
 "炤": "照",
 "炮": "砲",
 "炯": "烱",
 "炰": "炮",
 "炸": "煠",
 "点": "點",
 "為": [
  "爲",
  "为"
 ],
 "炼": "煉",
 "炽": "熾",
 "烁": "爍",
 "烂": "爛",
 "烃": "烴",
 "烉": "煥",
 "烊": "煬",
 "烏": "乌",
 "烕": "滅",
 "烖": "災",
 "烘": "灴",
 "烙": "烙",
 "烛": "燭",
 "烜": "晅",
 "烝": "蒸",
 "烟": [
  "完",
  "煙"
 ],
 "烦": "煩",
 "烧": "燒",
 "烨": "燁",
 "烩": "燴",
 "烫": "燙",
 "烬": "燼",
 "热": "熱",
 "烱": "炯",
 "烴": "烃",
 "焔": "焰",
 "焕": "煥",
 "焖": "燜",
 "焘": "燾",
 "無": "无",
 "焦": "焳",
 "焭": "煢",
 "焰": [
  "燄",
  "焔"
 ],
 "焼": "燒",
 "煅": "鍛",
 "煆": "鍜",
 "煇": "輝",
 "煉": [
  "炼",
  "煉"
 ],
 "煑": "煮",
 "煒": "炜",
 "煕": "熙",
 "煖": "暖",
 "煙": [
  "完",
  "烟"
 ],
 "煠": "炸",
 "煢": "茕",
 "煥": [
  "焕",
  "烉"
 ],
 "照": "炤",
 "煩": "烦",
 "煬": [
  "烊",
  "炀"
 ],
 "煮": "煑",
 "煱": "㶽",
 "煳": "㷻",
 "煴": "熅",
 "煽": "搧",
 "熅": "煴",
 "熇": "燺",
 "熈": "熙",
 "熉": "𤈶",
 "熌": "𤇄",
 "熏": "燻",
 "熒": "荧",
 "熓": "𤆡",
 "熔": "鎔",
 "熗": "炝",
 "熙": [
  "熈",
  "煕"
 ],
 "熡": "𤋏",
 "熨": "㷉",
 "熱": [
  "𤍠",
  "热"
 ],
 "熲": "颎",
 "熹": "熺",
 "熺": "熹",
 "熾": "炽",
 "燁": "烨",
 "燄": "焰",
 "燈": "灯",
 "燎": "燎",
 "燐": [
  "㷠",
  "燐"
 ],
 "燒": [
  "簫",
  "烧"
 ],
 "燕": "鷰",
 "燗": "爛",
 "燙": "烫",
 "燜": "焖",
 "營": "营",
 "燣": "燷",
 "燦": "灿",
 "燭": "烛",
 "燴": "烩",
 "燶": "㶶",
 "燷": "燣",
 "燺": "熇",
 "燻": "熏",
 "燼": "烬",
 "燾": "焘",
 "燿": "曜",
 "爄": "𤇃",
 "爋": "𤑕",
 "爍": "烁",
 "爐": [
  "炉",
  "爐"
 ],
 "爛": "烂",
 "爪": "㕚",
 "爫": "㕚",
 "爭": "争",
 "爱": "愛",
 "爲": "為",
 "爷": "爺",
 "爺": "爷",
 "爼": "俎",
 "爾": [
  "尒",
  "尔"
 ],
 "爿": "𤕪",
 "牀": "床",
 "牄": "蹌",
 "牆": [
  "墻",
  "墙"
 ],
 "版": "板",
 "牋": "箋",
 "牍": "牘",
 "牕": "窻",
 "牘": "牍",
 "牛": "牜",
 "牜": "牛",
 "牟": "麰",
 "牠": [
  "他",
  "它"
 ],
 "牢": "牢",
 "牦": [
  "氂",
  "犛"
 ],
 "牴": "觝",
 "牵": "牽",
 "牺": "犧",
 "牽": "牵",
 "犁": "犂",
 "犂": "犁",
 "犇": "奔",
 "犊": "犢",
 "犖": "荦",
 "犛": "髦",
 "犠": "犧",
 "犢": "犊",
 "犧": "牺",
 "犬": "犭",
 "犭": "犬",
 "犲": "豺",
 "犴": "豻",
 "状": "狀",
 "犷": "獷",
 "犸": "獁",
 "犹": "猶",
 "狀": "状",
 "狈": "狽",
 "狝": "獮",
 "狞": "獰",
 "狢": "貉",
 "狥": "侚",
 "独": "獨",
 "狭": "狹",
 "狮": "獅",
 "狯": "獪",
 "狰": "猙",
 "狱": "獄",
 "狲": "猻",
 "狵": "尨",
 "狷": "獧",
 "狸": "貍",
 "狹": [
  "陜",
  "狭"
 ],
 "狻": "䝜",
 "狼": "狼",
 "狽": "狈",
 "猃": "獫",
 "猇": "唬",
 "猋": "飇",
 "猎": "獵",
 "猕": "獼",
 "猗": "欹",
 "猙": "狰",
 "猟": "獵",
 "猡": "玀",
 "猨": "蝯",
 "猪": [
  "豬",
  "猪"
 ],
 "猫": "貓",
 "猬": "蝟",
 "献": "獻",
 "猶": "犹",
 "猻": "狲",
 "猾": "獪",
 "猿": "猨",
 "獁": "犸",
 "獃": "呆",
 "獄": "狱",
 "獅": "狮",
 "獎": [
  "奖",
  "奬"
 ],
 "獐": "麞",
 "獠": "䝤",
 "獣": "獸",
 "獧": "狷",
 "獨": "独",
 "獪": [
  "狯",
  "猾"
 ],
 "獫": [
  "玁",
  "猃"
 ],
 "獭": "獺",
 "獮": "狝",
 "獰": "狞",
 "獱": "㺍",
 "獲": "获",
 "獵": [
  "𤢪",
  "猎",
  "獵"
 ],
 "獷": "犷",
 "獸": "兽",
 "獺": "獭",
 "獻": "献",
 "獼": "猕",
 "獾": "貛",
 "玀": "猡",
 "玁": [
  "獫",
  "𤞤"
 ],
 "玄": "伭",
 "玅": "妙",
 "玆": [
  "兹",
  "茲"
 ],
 "率": "率",
 "玑": "璣",
 "玖": "九",
 "玙": "璵",
 "玚": "瑒",
 "玛": "瑪",
 "玟": [
  "玫",
  "珉"
 ],
 "玫": "玟",
 "玮": "瑋",
 "环": "環",
 "现": "現",
 "玱": "瑲",
 "玲": "玲",
 "玳": "瑇",
 "玺": "璽",
 "珉": [
  "䃉",
  "玟"
 ],
 "珍": "珎",
 "珎": "珍",
 "珐": "琺",
 "珑": "瓏",
 "珞": "珞",
 "珪": "圭",
 "珰": "璫",
 "珲": "琿",
 "珶": "瑅",
 "珷": "碔",
 "現": "现",
 "琄": "鞙",
 "琅": "瑯",
 "理": "理",
 "琉": [
  "瑠",
  "琉"
 ],
 "琎": "璡",
 "琏": "璉",
 "琐": "瑣",
 "琱": "雕",
 "琺": "珐",
 "琼": "瓊",
 "琿": "珲",
 "瑅": "珶",
 "瑇": "玳",
 "瑋": "玮",
 "瑒": "玚",
 "瑙": "碯",
 "瑠": "琉",
 "瑣": "琐",
 "瑤": "瑶",
 "瑩": [
  "莹",
  "瑩"
 ],
 "瑪": "玛",
 "瑯": "琅",
 "瑲": "玱",
 "瑶": "瑤",
 "瑷": "璦",
 "瑸": "璸",
 "瑽": "𪻐",
 "璁": "𤧚",
 "璃": "瓈",
 "璇": "璿",
 "璉": "琏",
 "璎": "瓔",
 "璘": "璘",
 "璡": "琎",
 "璢": "琉",
 "璣": "玑",
 "璦": "瑷",
 "璫": "珰",
 "璯": "㻅",
 "環": "环",
 "璵": "玙",
 "璸": "瑸",
 "璽": [
  "壐",
  "玺"
 ],
 "璿": "璇",
 "瓈": "璃",
 "瓊": "琼",
 "瓏": "珑",
 "瓒": "瓚",
 "瓔": "璎",
 "瓕": "𤦀",
 "瓚": "瓒",
 "瓟": "匏",
 "瓮": "罋",
 "瓯": "甌",
 "瓶": "缾",
 "瓷": [
  "磁",
  "甆"
 ],
 "甁": "瓶",
 "甆": "瓷",
 "甌": "瓯",
 "甎": "磚",
 "甕": "瓮",
 "甖": "罌",
 "甚": "什",
 "甜": "甛",
 "甞": "嘗",
 "產": "产",
 "産": "產",
 "甤": "蕤",
 "甦": "穌",
 "甪": "角",
 "甬": "埇",
 "甯": "寗",
 "电": "電",
 "町": "圢",
 "画": "畫",
 "甽": "畎",
 "甾": "菑",
 "甿": "氓",
 "畄": "留",
 "畅": "暢",
 "畆": "畝",
 "畊": "耕",
 "界": "畍",
 "畍": "界",
 "畎": "甽",
 "畒": "畝",
 "留": "畄",
 "畝": [
  "畆",
  "亩",
  "畮"
 ],
 "畢": "毕",
 "略": "畧",
 "畧": "略",
 "番": "蹯",
 "畫": "画",
 "畬": "畭",
 "畭": "畬",
 "畮": "畝",
 "異": [
  "异",
  "異"
 ],
 "畱": "畄",
 "畲": "畬",
 "畳": "疊",
 "畴": "疇",
 "畵": "畫",
 "當": "当",
 "畺": "疆",
 "畽": "疃",
 "疃": "畽",
 "疆": "畺",
 "疇": "畴",
 "疉": "曡",
 "疊": [
  "叠",
  "曡"
 ],
 "疋": "匹",
 "疍": "蛋",
 "疎": "疏",
 "疏": "疎",
 "疖": "癤",
 "疗": "療",
 "疟": "瘧",
 "疠": "癘",
 "疡": "瘍",
 "疣": "肬",
 "疬": "癧",
 "疭": "瘲",
 "疮": "瘡",
 "疯": "瘋",
 "疱": "皰",
 "疴": "痾",
 "疸": "癉",
 "疹": "胗",
 "症": "癥",
 "痈": "癰",
 "痉": "痙",
 "痐": "蚘",
 "痒": "癢",
 "痖": "瘂",
 "痙": "痉",
 "痢": "痢",
 "痨": "癆",
 "痩": "瘦",
 "痪": "瘓",
 "痫": "癇",
 "痮": "脹",
 "痲": "痳",
 "痳": "痲",
 "痴": "癡",
 "痹": "痺",
 "痺": "痹",
 "痼": "㽽",
 "痾": "疴",
 "瘂": [
  "啞",
  "痖"
 ],
 "瘅": "癉",
 "瘆": "瘮",
 "瘉": "癒",
 "瘋": "疯",
 "瘍": "疡",
 "瘓": "痪",
 "瘗": "瘞",
 "瘘": "瘺",
 "瘞": "瘗",
 "瘡": "疮",
 "瘦": "痩",
 "瘧": "疟",
 "瘨": "癲",
 "瘪": "癟",
 "瘫": "癱",
 "瘮": "瘆",
 "瘲": "疭",
 "瘶": "嗽",
 "瘺": [
  "瘻",
  "瘘"
 ],
 "瘻": "瘺",
 "瘾": "癮",
 "瘿": "癭",
 "療": "疗",
 "癆": "痨",
 "癇": "痫",
 "癉": [
  "疸",
  "瘅"
 ],
 "癒": [
  "瘉",
  "愈"
 ],
 "癘": "疠",
 "癛": "癝",
 "癞": "癩",
 "癟": "瘪",
 "癡": "痴",
 "癢": "痒",
 "癣": "癬",
 "癤": "疖",
 "癥": "症",
 "癧": "疬",
 "癨": "霍",
 "癩": [
  "癞",
  "癩"
 ],
 "癫": "癲",
 "癬": "癣",
 "癭": "瘿",
 "癮": "瘾",
 "癯": "臞",
 "癰": "痈",
 "癱": "瘫",
 "癲": [
  "瘨",
  "癫"
 ],
 "発": "發",
 "登": "豋",
 "發": [
  "发",
  "発"
 ],
 "百": "佰",
 "皁": "皂",
 "皂": "皁",
 "皃": "貎",
 "皈": "歸",
 "皋": [
  "臯",
  "皐"
 ],
 "皎": "㿟",
 "皐": "皋",
 "皑": "皚",
 "皓": "顥",
 "皚": "皑",
 "皜": "暠",
 "皝": "皓",
 "皞": "皡",
 "皟": "𤾀",
 "皡": "皞",
 "皥": "皞",
 "皦": "㿟",
 "皰": "疱",
 "皱": "皺",
 "皲": "皸",
 "皷": [
  "鼔",
  "鼓"
 ],
 "皸": "皲",
 "皺": [
  "縐",
  "皱"
 ],
 "皼": "鼓",
 "盃": "杯",
 "盅": "沖",
 "盇": "盍",
 "益": "益",
 "盌": "椀",
 "盍": "盇",
 "盏": "盞",
 "盐": "鹽",
 "监": "監",
 "盖": "蓋",
 "盗": "盜",
 "盘": "盤",
 "盙": "簠",
 "盜": "盗",
 "盞": "盏",
 "盡": "尽",
 "監": "监",
 "盤": "盘",
 "盧": "卢",
 "盩": "盭",
 "盪": [
  "蕩",
  "荡"
 ],
 "盭": "盩",
 "省": "省",
 "眇": "緲",
 "眈": "躭",
 "眍": "瞘",
 "眎": "視",
 "眘": "愼",
 "眙": "瞪",
 "眞": "真",
 "真": "眞",
 "眥": "眦",
 "眦": "眥",
 "眬": "矓",
 "眾": [
  "衆",
  "众"
 ],
 "着": "著",
 "睁": "睜",
 "睍": "𪾢",
 "睏": "困",
 "睐": "睞",
 "睑": "瞼",
 "睜": "睁",
 "睞": "睐",
 "睫": "䀹",
 "睹": "覩",
 "睾": "皋",
 "睿": "叡",
 "瞅": "矁",
 "瞆": "瞶",
 "瞍": "𥈟",
 "瞒": "瞞",
 "瞘": "眍",
 "瞜": "䁖",
 "瞞": "瞒",
 "瞠": "瞪",
 "瞤": "𥆧",
 "瞥": "苤",
 "瞩": "矚",
 "瞪": [
  "瞠",
  "眙"
 ],
 "瞬": "䀢",
 "瞭": "了",
 "瞯": "瞷",
 "瞰": "矙",
 "瞶": "瞆",
 "瞷": "瞯",
 "瞹": "曖",
 "瞼": "睑",
 "瞿": "䀠",
 "矁": "瞅",
 "矇": "蒙",
 "矈": "矏",
 "矋": "矖",
 "矏": "矈",
 "矓": "眬",
 "矖": "矋",
 "矙": "瞰",
 "矚": "瞩",
 "矢": "笶",
 "矧": "訠",
 "矩": "榘",
 "矫": "矯",
 "矮": "躷",
 "矯": "矫",
 "石": "𥐘",
 "矶": "磯",
 "矾": "礬",
 "矿": "礦",
 "砀": "碭",
 "码": "碼",
 "砅": "濿",
 "砇": "珉",
 "砌": "纖",
 "砒": "磇",
 "研": [
  "揅",
  "硎"
 ],
 "砕": "碎",
 "砖": "磚",
 "砗": "硨",
 "砚": "硯",
 "砜": "碸",
 "砠": "岨",
 "砣": "𥓿",
 "砥": "厎",
 "砦": "寨",
 "砧": "碪",
 "砲": "炮",
 "砺": "礪",
 "砻": "礱",
 "砾": "礫",
 "砿": "礦",
 "础": "礎",
 "硁": "硜",
 "硎": "研",
 "硕": "碩",
 "硖": "硤",
 "硗": "磽",
 "硙": "磑",
 "硚": "礄",
 "硜": [
  "䃘",
  "硁"
 ],
 "硤": [
  "唊",
  "硖"
 ],
 "硨": "砗",
 "硫": "硫",
 "硬": "峺",
 "硭": "𥐞",
 "确": "確",
 "硯": "砚",
 "硵": "磠",
 "硷": [
  "礆",
  "鹼"
 ],
 "碁": "棊",
 "碌": "碌",
 "碍": [
  "㝵",
  "礙"
 ],
 "碎": "砕",
 "碔": "珷",
 "碕": "崎",
 "碗": "椀",
 "碙": "𥐻",
 "碛": "磧",
 "碜": "磣",
 "碥": "扁",
 "碩": "硕",
 "碪": "砧",
 "碭": "砀",
 "碯": "瑙",
 "碰": "掽",
 "碱": "鹼",
 "碸": "砜",
 "確": "确",
 "碼": "码",
 "碽": "䂵",
 "磁": "瓷",
 "磆": "滑",
 "磇": "砒",
 "磊": [
  "磥",
  "磊"
 ],
 "磌": "𧰊",
 "磑": "硙",
 "磒": "隕",
 "磚": [
  "甎",
  "砖"
 ],
 "磛": "嶃",
 "磠": "硵",
 "磡": "墈",
 "磣": "碜",
 "磥": "磊",
 "磧": "碛",
 "磪": "崔",
 "磯": "矶",
 "磴": "嶝",
 "磵": "澗",
 "磻": "磻",
 "磽": [
  "墝",
  "硗"
 ],
 "礄": "硚",
 "礆": [
  "硷",
  "險"
 ],
 "礎": "础",
 "礒": "𥐟",
 "礙": [
  "㝵",
  "碍"
 ],
 "礟": "礮",
 "礡": "礴",
 "礦": [
  "鑛",
  "矿"
 ],
 "礪": [
  "砺",
  "礪"
 ],
 "礫": "砾",
 "礬": "矾",
 "礮": "炮",
 "礱": [
  "𤮨",
  "砻"
 ],
 "礴": "礡",
 "礶": "罐",
 "示": "礻",
 "礻": "示",
 "礼": [
  "礼",
  "禮"
 ],
 "礿": "禴",
 "祃": "禡",
 "祎": "禕",
 "祐": "佑",
 "祕": "秘",
 "祗": "只",
 "祘": "算",
 "神": "神",
 "祢": "禰",
 "祥": "祥",
 "祯": "禎",
 "祷": "禱",
 "祸": "禍",
 "祿": [
  "禄",
  "祿"
 ],
 "禀": "稟",
 "禂": "禱",
 "禄": "祿",
 "禅": "禪",
 "禍": "祸",
 "禎": "祯",
 "福": "福",
 "禕": "祎",
 "禡": "祃",
 "禥": "祺",
 "禦": "御",
 "禪": "禅",
 "禮": [
  "礼",
  "禮"
 ],
 "禰": "祢",
 "禱": [
  "禂",
  "祷"
 ],
 "禴": "礿",
 "离": "離",
 "禿": "秃",
 "私": "厶",
 "秃": "禿",
 "秄": "耔",
 "秆": "稈",
 "秇": "埶",
 "秈": "籼",
 "秊": "秊",
 "秋": "䆋",
 "秌": "秋",
 "种": "種",
 "秏": "耗",
 "秐": "耘",
 "秔": "粳",
 "秕": "粃",
 "秘": "祕",
 "积": "積",
 "称": "稱",
 "秸": "稭",
 "移": "迻",
 "秽": "穢",
 "秾": "穠",
 "稀": "希",
 "稅": "税",
 "稆": "穭",
 "稈": "秆",
 "稉": "秔",
 "稊": "䄺",
 "税": "稅",
 "稏": "䅉",
 "稘": "朞",
 "稚": [
  "䕌",
  "穉"
 ],
 "稜": [
  "棱",
  "稜"
 ],
 "稟": [
  "禀",
  "廪"
 ],
 "稣": "穌",
 "稬": "糯",
 "稭": "秸",
 "種": "种",
 "稱": [
  "偁",
  "称"
 ],
 "稲": "稻",
 "稳": "穩",
 "稺": "稚",
 "稻": "稲",
 "稽": "乩",
 "稾": "稿",
 "稿": [
  "槀",
  "稾"
 ],
 "穀": [
  "糓",
  "谷"
 ],
 "穂": "穗",
 "穅": "糠",
 "穉": "稚",
 "穌": [
  "甦",
  "稣"
 ],
 "積": "积",
 "穎": [
  "頴",
  "颖"
 ],
 "穐": "秋",
 "穑": "穡",
 "穗": "穂",
 "穞": "穭",
 "穠": "秾",
 "穡": "穑",
 "穢": "秽",
 "穣": "穰",
 "穤": "糯",
 "穩": [
  "㒚",
  "稳"
 ],
 "穪": "偁",
 "穫": [
  "檴",
  "获"
 ],
 "穭": [
  "稆",
  "穞"
 ],
 "穰": "穣",
 "穷": "窮",
 "穽": "阱",
 "窃": "竊",
 "窌": "窖",
 "窍": "竅",
 "窎": "窵",
 "窑": "窯",
 "窓": "䆫",
 "窖": "窌",
 "窗": [
  "䆫",
  "窓"
 ],
 "窜": "竄",
 "窝": "窩",
 "窥": "窺",
 "窦": "竇",
 "窩": "窝",
 "窪": "洼",
 "窭": "窶",
 "窮": [
  "竆",
  "穷"
 ],
 "窯": [
  "窰",
  "窑"
 ],
 "窰": "窯",
 "窴": "塡",
 "窵": "窎",
 "窶": [
  "寠",
  "窭"
 ],
 "窺": "窥",
 "窻": "牕",
 "竃": "灶",
 "竄": "窜",
 "竅": "窍",
 "竆": "窮",
 "竇": "窦",
 "竈": "灶",
 "竉": "䆔",
 "竊": "窃",
 "立": "立",
 "竒": "奇",
 "竖": "豎",
 "竚": "佇",
 "竜": "龍",
 "竝": "並",
 "竞": "競",
 "竢": "俟",
 "竪": "豎",
 "競": [
  "誩",
  "竞",
  "竸"
 ],
 "竸": "競",
 "竻": "簕",
 "竾": "篪",
 "竿": "𣔼",
 "笃": "篤",
 "笆": "巴",
 "笋": "筍",
 "笑": "咲",
 "笓": "篦",
 "笔": "筆",
 "笕": "筧",
 "笛": "篴",
 "笠": "笠",
 "笨": "㤒",
 "笺": "箋",
 "笻": "筇",
 "笼": "籠",
 "笾": "籩",
 "筆": "笔",
 "筇": "笻",
 "等": "朩",
 "筋": "觔",
 "筍": "笋",
 "筏": "栰",
 "筐": "筺",
 "筑": "築",
 "答": "荅",
 "策": "筞",
 "筚": "篳",
 "筛": "篩",
 "筜": "簹",
 "筝": "箏",
 "筞": "策",
 "筦": "管",
 "筧": "笕",
 "筭": "算",
 "筯": "箸",
 "筱": "篠",
 "筴": "䇲",
 "筹": "籌",
 "筼": "篔",
 "签": [
  "簽",
  "籤"
 ],
 "筿": "篠",
 "简": "簡",
 "箇": [
  "个",
  "個"
 ],
 "箋": [
  "牋",
  "笺"
 ],
 "箍": "箛",
 "箎": "篪",
 "箏": "筝",
 "箒": "帚",
 "箓": "籙",
 "箖": "籃",
 "算": [
  "筭",
  "祘"
 ],
 "箚": "剳",
 "箛": "箍",
 "箝": "钳",
 "箠": "捶",
 "管": "筦",
 "箦": "簀",
 "箧": "篋",
 "箨": "籜",
 "箩": "籮",
 "箪": "簞",
 "箫": "簫",
 "箬": "篛",
 "箳": "簈",
 "箴": "針",
 "箸": "筯",
 "箾": "簫",
 "節": [
  "节",
  "罇"
 ],
 "範": "范",
 "築": "筑",
 "篋": [
  "匧",
  "箧"
 ],
 "篑": "簣",
 "篓": "簍",
 "篔": "筼",
 "篘": "𥬠",
 "篛": "箬",
 "篠": [
  "筱",
  "筿"
 ],
 "篡": "簒",
 "篢": "槓",
 "篤": "笃",
 "篦": "笓",
 "篩": [
  "簛",
  "筛"
 ],
 "篪": [
  "箎",
  "竾"
 ],
 "篭": "籠",
 "篮": "籃",
 "篯": "籛",
 "篱": "籬",
 "篲": "彗",
 "篳": "筚",
 "篴": "笛",
 "篺": "棑",
 "簀": "箦",
 "簁": "篩",
 "簈": "箳",
 "簌": "雝",
 "簍": "篓",
 "簑": "蓑",
 "簒": "篡",
 "簔": "簑",
 "簕": "竻",
 "簖": "籪",
 "簘": "簫",
 "簛": "篩",
 "簞": "箪",
 "簠": "盙",
 "簡": [
  "耕",
  "简"
 ],
 "簣": [
  "蕢",
  "篑"
 ],
 "簨": "栒",
 "簫": [
  "燒",
  "箫"
 ],
 "簷": "檐",
 "簹": "筜",
 "簻": "檛",
 "簽": "签",
 "簾": [
  "𢅖",
  "帘",
  "簾"
 ],
 "籁": "籟",
 "籃": [
  "箖",
  "篮"
 ],
 "籄": "簣",
 "籋": "𥬞",
 "籌": "筹",
 "籐": [
  "藤",
  "籘"
 ],
 "籑": "䉵",
 "籔": [
  "䉤",
  "藪"
 ],
 "籖": "籤",
 "籘": "籐",
 "籙": "箓",
 "籛": "篯",
 "籜": "箨",
 "籟": "籁",
 "籠": [
  "笼",
  "籠"
 ],
 "籤": "籖",
 "籥": "龠",
 "籩": "笾",
 "籪": "簖",
 "籬": "篱",
 "籮": "箩",
 "籲": "龥",
 "籴": "糴",
 "类": "類",
 "籼": "秈",
 "粃": "秕",
 "粋": "粹",
 "粒": "粒",
 "粗": [
  "麤",
  "麄"
 ],
 "粘": "黏",
 "粛": "肅",
 "粜": "糶",
 "粝": "糲",
 "粤": "粵",
 "粥": "鬻",
 "粦": "㷠",
 "粧": "妝",
 "粪": "糞",
 "粫": "糯",
 "粮": "糧",
 "粳": "秔",
 "粵": "粤",
 "粹": "粋",
 "粽": [
  "糉",
  "糭"
 ],
 "精": "精",
 "糁": "糝",
 "糇": "餱",
 "糉": "粽",
 "糊": "胡",
 "糓": "穀",
 "糕": "餻",
 "糖": [
  "餹",
  "糖"
 ],
 "糙": "㿷",
 "糝": "糁",
 "糞": "粪",
 "糟": "醩",
 "糠": "穅",
 "糡": "糨",
 "糤": [
  "饊",
  "馓"
 ],
 "糧": "粮",
 "糨": "糡",
 "糭": "糉",
 "糯": [
  "稬",
  "粫"
 ],
 "糰": "䊜",
 "糲": "粝",
 "糴": "籴",
 "糶": [
  "條",
  "粜"
 ],
 "糸": [
  "糹",
  "絲"
 ],
 "糹": [
  "糸",
  "纟"
 ],
 "糺": "糾",
 "系": [
  "係",
  "繫"
 ],
 "糾": [
  "糺",
  "纠"
 ],
 "紀": "纪",
 "紂": "纣",
 "約": "约",
 "紅": "红",
 "紆": "纡",
 "紇": "纥",
 "紈": "纨",
 "紉": "纫",
 "紋": "纹",
 "納": "纳",
 "紐": [
  "纽",
  "紐"
 ],
 "紓": "纾",
 "純": "纯",
 "紕": "纰",
 "紖": "纼",
 "紗": "纱",
 "紘": "纮",
 "紙": [
  "帋",
  "纸"
 ],
 "級": [
  "𨸚",
  "级"
 ],
 "紛": "纷",
 "紜": "纭",
 "紝": "纴",
 "紟": "衿",
 "紡": "纺",
 "索": "索",
 "紥": "紮",
 "紧": "緊",
 "紬": [
  "綢",
  "䌷"
 ],
 "紮": "扎",
 "累": "纍",
 "細": "细",
 "紱": "绂",
 "紲": [
  "緤",
  "绁"
 ],
 "紳": "绅",
 "紵": "纻",
 "紹": [
  "佋",
  "绍"
 ],
 "紺": "绀",
 "紼": "绋",
 "紿": "绐",
 "絀": "绌",
 "終": "终",
 "絃": "弦",
 "組": "组",
 "絅": [
  "褧",
  "䌹"
 ],
 "絆": "绊",
 "絋": "纊",
 "経": "經",
 "絎": "绗",
 "絏": "紲",
 "結": "结",
 "絕": "绝",
 "絖": "纊",
 "絚": "緪",
 "絛": [
  "縚",
  "绦"
 ],
 "絝": [
  "袴",
  "绔",
  "褲"
 ],
 "絞": "绞",
 "絡": "络",
 "絢": "绚",
 "絥": "鞴",
 "給": "给",
 "絨": "绒",
 "絪": "氤",
 "絰": "绖",
 "統": [
  "綂",
  "统"
 ],
 "絲": [
  "丝",
  "纟"
 ],
 "絳": "绛",
 "絵": "繪",
 "絶": "絕",
 "絷": "縶",
 "絹": "绢",
 "絺": "𫄨",
 "綀": "𦈌",
 "綁": "绑",
 "綂": "統",
 "綃": "绡",
 "綆": "绠",
 "綇": "𦈋",
 "綈": "绨",
 "綉": "繡",
 "綌": "绤",
 "綏": "绥",
 "綐": "䌼",
 "綑": "捆",
 "經": [
  "𦀇",
  "经",
  "経"
 ],
 "継": "繼",
 "続": "續",
 "綜": "综",
 "綞": "缍",
 "綠": [
  "氯",
  "绿",
  "綠"
 ],
 "綢": [
  "紬",
  "绸"
 ],
 "綣": "绻",
 "綫": "線",
 "綬": "绶",
 "維": "维",
 "綯": "绹",
 "綰": "绾",
 "綱": "纲",
 "網": "网",
 "綳": "繃",
 "綴": "缀",
 "綵": "䌽",
 "綸": "纶",
 "綹": "绺",
 "綺": "绮",
 "綻": [
  "䘺",
  "绽"
 ],
 "綽": "绰",
 "綾": "绫",
 "綿": [
  "緜",
  "绵"
 ],
 "緄": "绲",
 "緇": "缁",
 "緊": [
  "𦂳",
  "紧"
 ],
 "緋": "绯",
 "緍": "𦈏",
 "総": "總",
 "緑": "綠",
 "緒": [
  "绪",
  "緖"
 ],
 "緓": "绬",
 "緖": "緒",
 "緗": "缃",
 "緘": "缄",
 "緙": "缂",
 "線": [
  "綫",
  "线"
 ],
 "緜": "綿",
 "緝": "缉",
 "緞": "缎",
 "締": "缔",
 "緡": "缗",
 "緣": [
  "縁",
  "缘"
 ],
 "緤": "紲",
 "緥": "褓",
 "緦": "缌",
 "編": "编",
 "緩": "缓",
 "緪": "絚",
 "緬": "缅",
 "緯": "纬",
 "緰": "𦈕",
 "緱": "缑",
 "緲": [
  "眇",
  "缈"
 ],
 "練": "练",
 "緶": "缏",
 "緷": "𦈉",
 "緸": "𦈑",
 "緹": "缇",
 "緻": "致",
 "緼": "縕",
 "縁": "緣",
 "縂": "總",
 "縄": "繩",
 "縆": "絚",
 "縈": "萦",
 "縉": "缙",
 "縊": "缢",
 "縋": "缒",
 "縎": "𦈔",
 "縐": [
  "皺",
  "绉"
 ],
 "縑": "缣",
 "縕": "缊",
 "縗": "缞",
 "縚": "絛",
 "縛": "缚",
 "縝": "缜",
 "縞": "缟",
 "縟": [
  "溽",
  "缛"
 ],
 "縣": "县",
 "縦": "縱",
 "縫": "缝",
 "縬": "𦈚",
 "縭": [
  "褵",
  "缡"
 ],
 "縮": "缩",
 "縯": "䌥",
 "縱": "纵",
 "縲": "缧",
 "縳": "䌸",
 "縴": "纤",
 "縵": "缦",
 "縶": "絷",
 "縷": "缕",
 "縹": "缥",
 "縺": "𦈐",
 "總": [
  "搃",
  "总",
  "総"
 ],
 "績": "绩",
 "繁": "緐",
 "繃": [
  "綳",
  "绷"
 ],
 "繅": [
  "繰",
  "缫"
 ],
 "繆": "缪",
 "繈": "繦",
 "繊": "纖",
 "繋": "繫",
 "繍": "繡",
 "繏": "𦈝",
 "繒": "缯",
 "繓": "𦈛",
 "織": "织",
 "繕": "缮",
 "繖": "傘",
 "繙": "翻",
 "繚": "缭",
 "繞": [
  "遶",
  "绕"
 ],
 "繟": "𦈎",
 "繡": [
  "綉",
  "绣",
  "繍"
 ],
 "繢": [
  "缋",
  "繪"
 ],
 "繦": "繈",
 "繩": [
  "䋲",
  "绳",
  "縄"
 ],
 "繪": [
  "绘",
  "缋"
 ],
 "繫": [
  "系",
  "繋"
 ],
 "繭": "茧",
 "繮": "韁",
 "繯": "缳",
 "繰": [
  "繅",
  "缲"
 ],
 "繲": "挫",
 "繳": "缴",
 "繸": "䍁",
 "繹": "绎",
 "繻": "𦈡",
 "繼": "继",
 "繽": "缤",
 "繾": "缱",
 "繿": [
  "䍀",
  "襤"
 ],
 "纁": "𫄸",
 "纇": "颣",
 "纈": "缬",
 "纉": "纘",
 "纊": [
  "絖",
  "纩",
  "絋"
 ],
 "續": "续",
 "纍": "累",
 "纎": "纖",
 "纏": "缠",
 "纒": "纏",
 "纓": "缨",
 "纖": [
  "砌",
  "纤"
 ],
 "纘": [
  "缵",
  "纉"
 ],
 "纜": [
  "䌫",
  "缆"
 ],
 "纟": "糹",
 "纠": "糾",
 "纡": "紆",
 "红": "紅",
 "纣": "紂",
 "纤": [
  "纖",
  "縴"
 ],
 "纥": "紇",
 "约": "約",
 "级": "級",
 "纨": "紈",
 "纩": "纊",
 "纪": "紀",
 "纫": "紉",
 "纬": "緯",
 "纭": "紜",
 "纮": "紘",
 "纯": "純",
 "纰": "紕",
 "纱": "紗",
 "纲": "綱",
 "纳": "納",
 "纴": "紝",
 "纵": "縱",
 "纶": "綸",
 "纷": "紛",
 "纸": "紙",
 "纹": "紋",
 "纺": "紡",
 "纻": "紵",
 "纼": "紖",
 "纽": "紐",
 "纾": "紓",
 "线": "線",
 "绀": "紺",
 "绁": "紲",
 "绂": "紱",
 "练": "練",
 "组": "組",
 "绅": "紳",
 "细": "細",
 "织": "織",
 "终": "終",
 "绉": "縐",
 "绊": "絆",
 "绋": "紼",
 "绌": "絀",
 "绍": "紹",
 "绎": "繹",
 "经": "經",
 "绐": "紿",
 "绑": "綁",
 "绒": "絨",
 "结": "結",
 "绔": [
  "絝",
  "褲"
 ],
 "绕": "繞",
 "绖": "絰",
 "绗": "絎",
 "绘": "繪",
 "给": "給",
 "绚": "絢",
 "绛": "絳",
 "络": "絡",
 "绝": "絕",
 "绞": "絞",
 "统": "統",
 "绠": "綆",
 "绡": "綃",
 "绢": "絹",
 "绣": "繡",
 "绤": "綌",
 "绥": "綏",
 "绦": "絛",
 "继": "繼",
 "绨": "綈",
 "绩": "績",
 "绪": "緒",
 "绫": "綾",
 "绬": "緓",
 "续": "續",
 "绮": "綺",
 "绯": "緋",
 "绰": "綽",
 "绱": [
  "鞝",
  "緔"
 ],
 "绲": "緄",
 "绳": "繩",
 "维": "維",
 "绵": "綿",
 "绶": "綬",
 "绷": "繃",
 "绸": "綢",
 "绹": "綯",
 "绺": "綹",
 "绻": "綣",
 "综": "綜",
 "绽": "綻",
 "绾": "綰",
 "绿": "綠",
 "缀": "綴",
 "缁": "緇",
 "缂": "緙",
 "缃": "緗",
 "缄": "緘",
 "缅": "緬",
 "缆": "纜",
 "缇": "緹",
 "缈": "緲",
 "缉": "緝",
 "缊": "縕",
 "缋": [
  "繢",
  "繪"
 ],
 "缌": "緦",
 "缍": "綞",
 "缎": "緞",
 "缏": "緶",
 "缐": "線",
 "缑": "緱",
 "缒": "縋",
 "缓": "緩",
 "缔": "締",
 "缕": "縷",
 "编": "編",
 "缗": "緡",
 "缘": "緣",
 "缙": "縉",
 "缚": "縛",
 "缛": "縟",
 "缜": "縝",
 "缝": "縫",
 "缞": "縗",
 "缟": "縞",
 "缠": "纏",
 "缡": "縭",
 "缢": "縊",
 "缣": "縑",
 "缤": "繽",
 "缥": "縹",
 "缦": "縵",
 "缧": "縲",
 "缨": "纓",
 "缩": "縮",
 "缪": "繆",
 "缫": "繅",
 "缬": "纈",
 "缭": "繚",
 "缮": "繕",
 "缯": "繒",
 "缰": [
  "韁",
  "繮"
 ],
 "缱": "繾",
 "缲": "繰",
 "缳": "繯",
 "缴": "繳",
 "缵": "纘",
 "缶": [
  "缻",
  "罐"
 ],
 "缷": "卸",
 "缸": "堈",
 "缺": "欠",
 "缻": "缶",
 "缽": [
  "鉢",
  "钵"
 ],
 "缾": "瓶",
 "罁": "堈",
 "罂": "罌",
 "罃": "甖",
 "罅": "𨻲",
 "罇": [
  "墫",
  "樽"
 ],
 "罈": [
  "墰",
  "坛"
 ],
 "罋": "瓮",
 "罌": [
  "甖",
  "罂"
 ],
 "罐": [
  "礶",
  "缶"
 ],
 "网": [
  "㓁",
  "網"
 ],
 "罔": "网",
 "罗": [
  "羅",
  "囉"
 ],
 "罘": "罦",
 "罚": "罰",
 "罢": "罷",
 "罥": "羂",
 "罩": "䈇",
 "罪": "辠",
 "置": "寘",
 "罰": [
  "罚",
  "罸"
 ],
 "罴": "羆",
 "罵": [
  "傌",
  "骂"
 ],
 "罶": "羀",
 "罷": "罢",
 "罹": "罹",
 "羀": "罶",
 "羁": "羈",
 "羂": "罥",
 "羃": "冪",
 "羅": [
  "罗",
  "羅"
 ],
 "羆": "罴",
 "羇": "羈",
 "羈": [
  "覊",
  "羁"
 ],
 "羋": "芈",
 "羌": "羗",
 "美": "羙",
 "羓": "豝",
 "羖": "𦍩",
 "羗": "羌",
 "羙": "美",
 "羚": "羚",
 "羝": "牴",
 "羟": "羥",
 "羡": "羨",
 "羣": "群",
 "群": "羣",
 "羥": "羟",
 "羨": "羡",
 "義": "义",
 "羮": "羹",
 "羴": "羶",
 "羶": "羴",
 "羹": "羮",
 "羽": "羽",
 "翄": "翅",
 "翅": "翄",
 "翆": "翠",
 "習": "习",
 "翘": "翹",
 "翙": "翽",
 "翚": "翬",
 "翠": "翆",
 "翥": "䬡",
 "翦": "剪",
 "翬": "翚",
 "翱": "翺",
 "翶": "翱",
 "翹": "翘",
 "翺": "翱",
 "翻": "繙",
 "翽": "翙",
 "耀": "曜",
 "老": "耂",
 "耂": "老",
 "考": "攷",
 "耇": "耈",
 "耈": "耇",
 "耉": "耈",
 "耏": "耐",
 "耐": "耏",
 "耑": "專",
 "耔": "秄",
 "耕": "畊",
 "耗": "秏",
 "耘": "秐",
 "耙": "鈀",
 "耡": "鋤",
 "耢": "耮",
 "耤": "藉",
 "耧": "耬",
 "耨": "鎒",
 "耬": "耧",
 "耮": "耢",
 "耰": "櫌",
 "耸": "聳",
 "耻": "恥",
 "耼": "聃",
 "耽": "躭",
 "耿": "炅",
 "聂": "聶",
 "聃": "耼",
 "聆": "聆",
 "聋": "聾",
 "职": "職",
 "聍": "聹",
 "联": "聯",
 "聖": [
  "圣",
  "堊"
 ],
 "聝": "馘",
 "聞": "闻",
 "聟": "婿",
 "聡": "聰",
 "聦": "聰",
 "聨": "聯",
 "聩": "聵",
 "聪": "聰",
 "聫": "聯",
 "聮": "聯",
 "聯": [
  "联",
  "聨"
 ],
 "聰": [
  "聦",
  "聪",
  "聡"
 ],
 "聲": "声",
 "聳": "耸",
 "聴": "聽",
 "聵": "聩",
 "聶": "聂",
 "職": [
  "軄",
  "职"
 ],
 "聹": "聍",
 "聻": "魙",
 "聼": "聽",
 "聽": "听",
 "聾": [
  "聋",
  "聾"
 ],
 "聿": "肀",
 "肀": "聿",
 "肃": "肅",
 "肅": [
  "肃",
  "粛"
 ],
 "肆": "四",
 "肇": "肈",
 "肈": "肇",
 "肉": "宍",
 "肋": "肋",
 "肐": "胳",
 "肕": "韌",
 "肠": "腸",
 "股": [
  "𦙶",
  "脵"
 ],
 "肢": "胑",
 "肤": "膚",
 "肧": "胚",
 "肨": "胮",
 "肬": "疣",
 "肮": "骯",
 "肯": "肻",
 "肱": "厷",
 "育": "毓",
 "肳": "吻",
 "肴": "餚",
 "肻": "肯",
 "肾": "腎",
 "肿": "腫",
 "胀": "脹",
 "胁": "脅",
 "胄": [
  "伷",
  "冑"
 ],
 "胆": "膽",
 "胊": "朐",
 "胑": "肢",
 "胓": "𦚓",
 "胔": "骴",
 "胗": "疹",
 "胚": "肧",
 "胜": "勝",
 "胝": "郅",
 "胞": "脬",
 "胡": [
  "衚",
  "楜"
 ],
 "胧": "朧",
 "胨": "腖",
 "胪": "臚",
 "胫": "脛",
 "胭": "臙",
 "胮": "肨",
 "胯": "骻",
 "胳": "肐",
 "胶": "膠",
 "胷": [
  "匈",
  "胸"
 ],
 "胸": [
  "匈",
  "胷"
 ],
 "胼": "腁",
 "脃": "脆",
 "脅": [
  "脇",
  "胁"
 ],
 "脆": "脃",
 "脇": "脅",
 "脈": [
  "衇",
  "脉"
 ],
 "脉": [
  "䘑",
  "脈"
 ],
 "脍": "膾",
 "脏": [
  "臟",
  "髒"
 ],
 "脐": "臍",
 "脑": "腦",
 "脓": "膿",
 "脔": "臠",
 "脚": "腳",
 "脛": "胫",
 "脣": "唇",
 "脥": "𣍰",
 "脧": "朘",
 "脪": "㾙",
 "脫": "脱",
 "脬": "胞",
 "脱": "脫",
 "脲": "尿",
 "脳": "腦",
 "脵": "股",
 "脶": "腡",
 "脸": "臉",
 "脹": [
  "痮",
  "胀"
 ],
 "腁": "胼",
 "腊": [
  "臈",
  "臘"
 ],
 "腎": "肾",
 "腕": "𦙵",
 "腖": "胨",
 "腘": "膕",
 "腟": "膣",
 "腡": "脶",
 "腢": "髃",
 "腦": [
  "匘",
  "脑"
 ],
 "腪": "𣍯",
 "腫": [
  "尰",
  "肿"
 ],
 "腭": "齶",
 "腮": "顋",
 "腳": "脚",
 "腸": [
  "肠",
  "膓"
 ],
 "腻": "膩",
 "腼": "靦",
 "腽": "膃",
 "腾": "騰",
 "腿": "骽",
 "膃": "腽",
 "膆": "嗉",
 "膋": "膫",
 "膑": "臏",
 "膕": "腘",
 "膘": "臕",
 "膚": "肤",
 "膠": "胶",
 "膢": "𦝼",
 "膣": "腟",
 "膩": "腻",
 "膫": "膋",
 "膳": "饍",
 "膸": "髓",
 "膽": "胆",
 "膾": [
  "鱠",
  "脍"
 ],
 "膿": "脓",
 "臇": "𤎱",
 "臈": [
  "腊",
  "臘"
 ],
 "臉": "脸",
 "臊": "𦞣",
 "臍": "脐",
 "臏": [
  "髕",
  "膑"
 ],
 "臓": "臟",
 "臕": "膘",
 "臗": "𣎑",
 "臘": "腊",
 "臙": "胭",
 "臚": "胪",
 "臜": "臢",
 "臞": "癯",
 "臟": "脏",
 "臠": "脔",
 "臢": "臜",
 "臥": "卧",
 "臨": [
  "临",
  "臨"
 ],
 "臯": "皋",
 "致": "緻",
 "臺": "台",
 "舀": "抌",
 "舃": "舄",
 "舄": "舃",
 "舆": "輿",
 "與": "与",
 "興": [
  "㒷",
  "兴"
 ],
 "舉": [
  "㪯",
  "举",
  "擧"
 ],
 "舊": "旧",
 "舍": [
  "捨",
  "舎"
 ],
 "舎": "舍",
 "舐": "舓",
 "舓": "舐",
 "舔": "餂",
 "舖": "鋪",
 "舗": "鋪",
 "舘": "館",
 "舡": "船",
 "舣": "艤",
 "舦": "艜",
 "舩": "船",
 "舮": "櫓",
 "舰": "艦",
 "舱": "艙",
 "舵": "柁",
 "舶": "艊",
 "船": [
  "舡",
  "舩"
 ],
 "舻": [
  "艫",
  "櫓"
 ],
 "艊": "舶",
 "艙": "舱",
 "艜": "舦",
 "艢": "檣",
 "艣": "櫓",
 "艤": "舣",
 "艥": "楫",
 "艦": "舰",
 "艪": [
  "樐",
  "櫓"
 ],
 "艫": [
  "舻",
  "櫓"
 ],
 "良": "良",
 "艰": "艱",
 "艱": "艰",
 "艳": [
  "艷",
  "豔"
 ],
 "艴": "勃",
 "艶": "豓",
 "艷": [
  "艳",
  "豔"
 ],
 "艸": "草",
 "艹": "艸",
 "艺": "藝",
 "艽": "韭",
 "节": "節",
 "芈": "羋",
 "芊": "茜",
 "芒": "杧",
 "芔": "卉",
 "芗": "薌",
 "芘": "蔽",
 "芜": "蕪",
 "芟": "𠚹",
 "芦": "蘆",
 "芭": "巴",
 "花": "蘤",
 "芸": [
  "蕓",
  "藝"
 ],
 "芻": [
  "蒭",
  "刍"
 ],
 "苁": "蓯",
 "苅": "刈",
 "苇": "葦",
 "苈": "藶",
 "苋": "莧",
 "苌": "萇",
 "苍": "蒼",
 "苎": [
  "苧",
  "蒙"
 ],
 "苏": "蘇",
 "苑": "菀",
 "苕": "䒒",
 "苟": "茍",
 "苡": "苢",
 "苢": "苡",
 "苤": "瞥",
 "若": "若",
 "苧": [
  "苎",
  "薴"
 ],
 "苹": "蘋",
 "苺": "莓",
 "苽": "菇",
 "苿": "菋",
 "范": "範",
 "茅": "泖",
 "茆": "茅",
 "茈": "柴",
 "茍": "苟",
 "茎": "莖",
 "茏": "蘢",
 "茑": "蔦",
 "茔": "塋",
 "茕": "煢",
 "茘": "荔",
 "茠": "薅",
 "茧": "繭",
 "茭": "椒",
 "茲": [
  "兹",
  "玆"
 ],
 "茶": "茶",
 "荅": "答",
 "荆": "荊",
 "荇": "莕",
 "草": "艸",
 "荊": "荆",
 "荍": "蕎",
 "荐": "薦",
 "荔": "栛",
 "荘": "莊",
 "荙": "薘",
 "荚": "莢",
 "荛": "蕘",
 "荜": "蓽",
 "荝": "萴",
 "荞": "蕎",
 "荟": "薈",
 "荠": "薺",
 "荡": "盪",
 "荣": "榮",
 "荤": "葷",
 "荥": "滎",
 "荦": "犖",
 "荧": "熒",
 "荨": "蕁",
 "荩": "藎",
 "荪": "蓀",
 "荫": "蔭",
 "荬": "蕒",
 "荭": "葒",
 "荮": "葤",
 "药": "藥",
 "荳": "豆",
 "荽": "萎",
 "莀": "農",
 "莅": [
  "涖",
  "蒞"
 ],
 "莆": "蒲",
 "莊": [
  "庄",
  "荘"
 ],
 "莓": "苺",
 "莕": "荇",
 "莖": "茎",
 "莜": "蓧",
 "莢": "荚",
 "莧": "苋",
 "莱": "萊",
 "莲": "蓮",
 "莳": "蒔",
 "莴": "萵",
 "莵": "菟",
 "莶": "薟",
 "获": [
  "獲",
  "穫"
 ],
 "莸": "蕕",
 "莹": "瑩",
 "莺": "鶯",
 "莼": [
  "蓴",
  "蒓"
 ],
 "莿": "朿",
 "菀": "苑",
 "菇": [
  "菰",
  "苽"
 ],
 "菋": "苿",
 "菌": "蕈",
 "菑": "災",
 "菓": "果",
 "菔": "蔔",
 "菝": "蔽",
 "菟": "莵",
 "菢": "勽",
 "菫": "堇",
 "華": [
  "华",
  "崋"
 ],
 "菰": [
  "菇",
  "苽"
 ],
 "菱": "菱",
 "菴": "庵",
 "菷": "帚",
 "菸": "烟",
 "菻": "麻",
 "萅": "春",
 "萆": [
  "蓖",
  "蔽"
 ],
 "萇": "苌",
 "萊": "莱",
 "萌": "萠",
 "萎": "荽",
 "萚": "蘀",
 "萝": "蘿",
 "萠": "萌",
 "萤": "螢",
 "营": "營",
 "萦": "縈",
 "萧": "蕭",
 "萨": "薩",
 "萬": "万",
 "萱": "萲",
 "萲": "萱",
 "萴": "荝",
 "萵": "莴",
 "萼": "蕚",
 "落": "落",
 "葁": "薑",
 "葉": [
  "叶",
  "葉"
 ],
 "葒": "荭",
 "著": "着",
 "葚": "椹",
 "葢": [
  "盖",
  "蓋"
 ],
 "葤": "荮",
 "葦": "苇",
 "葫": "胡",
 "葬": "塟",
 "葯": "藥",
 "葱": "蔥",
 "葷": "荤",
 "蒇": "蕆",
 "蒉": "蕢",
 "蒋": "蔣",
 "蒌": "蔞",
 "蒍": "蔿",
 "蒓": "蓴",
 "蒔": "莳",
 "蒙": "懞",
 "蒞": [
  "涖",
  "莅"
 ],
 "蒭": "芻",
 "蒲": "莆",
 "蒸": "烝",
 "蒼": "苍",
 "蓀": "荪",
 "蓆": "席",
 "蓋": "盖",
 "蓖": [
  "萆",
  "芘"
 ],
 "蓝": "藍",
 "蓟": "薊",
 "蓠": "蘺",
 "蓡": "參",
 "蓣": "蕷",
 "蓥": "鎣",
 "蓦": "驀",
 "蓧": "莜",
 "蓮": "莲",
 "蓯": "苁",
 "蓴": [
  "蒓",
  "莼"
 ],
 "蓺": "埶",
 "蓼": "蓼",
 "蓽": "荜",
 "蔂": "虆",
 "蔔": "菔",
 "蔚": "嶎",
 "蔞": "蒌",
 "蔣": "蒋",
 "蔥": "葱",
 "蔦": "茑",
 "蔭": [
  "廕",
  "荫"
 ],
 "蔴": "麻",
 "蔵": "藏",
 "蔷": "薔",
 "蔹": "蘞",
 "蔺": "藺",
 "蔼": "藹",
 "蔽": "芘",
 "蔿": "蒍",
 "蕁": "荨",
 "蕆": "蒇",
 "蕈": "菌",
 "蕊": [
  "蕋",
  "蘂"
 ],
 "蕋": "蕊",
 "蕎": [
  "荍",
  "荞"
 ],
 "蕒": "荬",
 "蕓": "芸",
 "蕕": "莸",
 "蕘": "荛",
 "蕚": "萼",
 "蕢": [
  "簣",
  "蒉"
 ],
 "蕣": "橓",
 "蕤": "甤",
 "蕩": [
  "偒",
  "荡"
 ],
 "蕪": "芜",
 "蕭": "萧",
 "蕰": "薀",
 "蕲": "蘄",
 "蕴": "蘊",
 "蕷": "蓣",
 "薀": "蕰",
 "薅": "茠",
 "薈": "荟",
 "薊": "蓟",
 "薌": "芗",
 "薑": [
  "葁",
  "姜"
 ],
 "薔": "蔷",
 "薘": "荙",
 "薟": [
  "蘞",
  "莶"
 ],
 "薦": "荐",
 "薩": "萨",
 "薫": "薰",
 "薬": "藥",
 "薮": "藪",
 "薯": "藷",
 "薰": "薫",
 "薳": "䓕",
 "薴": "苧",
 "薺": [
  "荠",
  "萕"
 ],
 "藇": "𨣦",
 "藉": [
  "耤",
  "借"
 ],
 "藍": "蓝",
 "藎": "荩",
 "藏": "蔵",
 "藓": "蘚",
 "藝": [
  "埶",
  "艺",
  "兿"
 ],
 "藟": "蘽",
 "藤": "籐",
 "藥": [
  "葯",
  "药",
  "薬"
 ],
 "藦": "蘑",
 "藪": [
  "薮",
  "籔"
 ],
 "藴": "蘊",
 "藶": "苈",
 "藷": "薯",
 "藹": "蔼",
 "藺": "蔺",
 "蘀": "萚",
 "蘂": "蕊",
 "蘄": "蕲",
 "蘆": [
  "芦",
  "蘆"
 ],
 "蘇": "苏",
 "蘊": "蕴",
 "蘋": "苹",
 "蘏": "蘔",
 "蘑": "藦",
 "蘓": "蘇",
 "蘔": "蘏",
 "蘖": [
  "櫱",
  "蘗"
 ],
 "蘗": "檘",
 "蘚": "藓",
 "蘞": [
  "薟",
  "蔹"
 ],
 "蘢": "茏",
 "蘤": "花",
 "蘭": "兰",
 "蘯": "盪",
 "蘺": "蓠",
 "蘽": "藟",
 "蘿": [
  "萝",
  "蘿"
 ],
 "虆": "蔂",
 "虎": "乕",
 "虏": "虜",
 "虐": [
  "䖈",
  "乇"
 ],
 "虑": "慮",
 "虓": "唬",
 "虔": "䖍",
 "處": [
  "䖏",
  "处",
  "処"
 ],
 "虖": "呼",
 "虚": "虛",
 "虛": "虚",
 "虜": [
  "擄",
  "虏",
  "虜"
 ],
 "虞": "𩦢",
 "號": "号",
 "虣": "暴",
 "虧": "亏",
 "虫": "蟲",
 "虬": [
  "蚪",
  "虯"
 ],
 "虮": "蟣",
 "虯": "虬",
 "虱": "蝨",
 "虺": "蝰",
 "虽": "雖",
 "虾": "蝦",
 "虿": "蠆",
 "蚀": "蝕",
 "蚁": "蟻",
 "蚂": "螞",
 "蚃": "蠁",
 "蚊": [
  "蟁",
  "螡"
 ],
 "蚋": "蜹",
 "蚓": "螾",
 "蚕": "蠶",
 "蚘": "痐",
 "蚝": "螆",
 "蚤": "䖣",
 "蚦": "蚺",
 "蚪": "虬",
 "蚬": "蜆",
 "蚺": "蚦",
 "蛄": "蛌",
 "蛆": "𧐅",
 "蛊": "蠱",
 "蛋": [
  "蜑",
  "旦"
 ],
 "蛌": "蛄",
 "蛍": "螢",
 "蛎": "蠣",
 "蛏": "蟶",
 "蛓": "螆",
 "蛔": [
  "蚘",
  "蜖"
 ],
 "蛕": "蚘",
 "蛗": "𧌓",
 "蛙": "鼃",
 "蛛": "鼄",
 "蛮": "蠻",
 "蛰": "蟄",
 "蛱": "蛺",
 "蛲": "蟯",
 "蛳": "螄",
 "蛴": "蠐",
 "蛺": "蛱",
 "蛻": "蜕",
 "蜂": "蠭",
 "蜆": "蚬",
 "蜇": "𧋍",
 "蜋": "螂",
 "蜍": "蠩",
 "蜑": "蛋",
 "蜕": "蛻",
 "蜖": "蛔",
 "蜗": "蝸",
 "蜘": "鼅",
 "蜝": "蜞",
 "蜞": "蜝",
 "蜡": [
  "䄍",
  "蜡"
 ],
 "蜨": "蝶",
 "蜫": "䖵",
 "蜶": "蟀",
 "蜹": "蚋",
 "蜺": "霓",
 "蝃": "螮",
 "蝇": "蠅",
 "蝈": "蟈",
 "蝉": "蟬",
 "蝋": "蠟",
 "蝎": "蠍",
 "蝕": "蚀",
 "蝟": "猬",
 "蝥": "蟊",
 "蝦": [
  "鰕",
  "虾"
 ],
 "蝨": "虱",
 "蝯": "猨",
 "蝱": "䖟",
 "蝴": "胡",
 "蝶": "蜨",
 "蝸": "蜗",
 "蝼": "螻",
 "蝾": "蠑",
 "蝿": "蠅",
 "螀": "螿",
 "螂": "蜋",
 "螄": "蛳",
 "螆": "蚝",
 "融": "螎",
 "螎": "融",
 "螗": "螳",
 "螘": "蟻",
 "螙": "蠧",
 "螞": "蚂",
 "螢": [
  "萤",
  "蛍"
 ],
 "螨": "蟎",
 "螮": [
  "蝃",
  "䗖"
 ],
 "螳": "螗",
 "螵": "蜱",
 "螺": [
  "蠃",
  "螺"
 ],
 "螻": "蝼",
 "螾": "蚓",
 "螿": "螀",
 "蟀": "蜶",
 "蟁": "蚊",
 "蟄": "蛰",
 "蟇": "蟆",
 "蟈": "蝈",
 "蟊": "蝥",
 "蟎": "螨",
 "蟏": "蠨",
 "蟒": "蠎",
 "蟚": "蟛",
 "蟛": "蟚",
 "蟣": "虮",
 "蟬": "蝉",
 "蟮": "蟺",
 "蟯": "蛲",
 "蟲": "虫",
 "蟶": "蛏",
 "蟹": "蠏",
 "蟺": "蟮",
 "蟻": [
  "螘",
  "蚁"
 ],
 "蠁": "蚃",
 "蠃": "螺",
 "蠅": "蝇",
 "蠆": "虿",
 "蠍": "蝎",
 "蠎": "蟒",
 "蠏": "蟹",
 "蠐": "蛴",
 "蠑": "蝾",
 "蠔": "𧐢",
 "蠟": "蜡",
 "蠢": "惷",
 "蠣": "蛎",
 "蠧": [
  "螙",
  "蠹"
 ],
 "蠨": "蟏",
 "蠩": "蜍",
 "蠭": "蜂",
 "蠱": "蛊",
 "蠶": "蚕",
 "蠹": "蠧",
 "蠻": "蛮",
 "衂": "衄",
 "衄": "衂",
 "衅": "釁",
 "衆": "眾",
 "衇": "脈",
 "行": "行",
 "術": "术",
 "衔": "銜",
 "衕": "同",
 "街": "亍",
 "衚": "胡",
 "衛": [
  "衞",
  "卫"
 ],
 "衝": [
  "𧘂",
  "冲"
 ],
 "衞": "衛",
 "衣": "衤",
 "衤": "衣",
 "补": "補",
 "表": "錶",
 "衬": "襯",
 "衮": "袞",
 "衽": "袵",
 "衿": "紟",
 "袄": "襖",
 "袅": [
  "裊",
  "嬝"
 ],
 "袆": "褘",
 "袋": "帒",
 "袒": "襢",
 "袖": "褎",
 "袜": "襪",
 "袞": "衮",
 "袠": "帙",
 "袭": "襲",
 "袯": "襏",
 "袴": [
  "絝",
  "褲"
 ],
 "袵": "衽",
 "袷": "裌",
 "裂": "裂",
 "装": "裝",
 "裆": "襠",
 "裈": "褌",
 "裉": "褃",
 "裊": [
  "袅",
  "嬝"
 ],
 "裌": "袷",
 "裏": [
  "裡",
  "里"
 ],
 "裙": "帬",
 "補": "补",
 "裝": "装",
 "裠": "裙",
 "裡": [
  "裏",
  "里"
 ],
 "裢": "褳",
 "裣": "襝",
 "裤": "褲",
 "裥": "襉",
 "裴": "裵",
 "裵": "裴",
 "裸": [
  "躶",
  "裸"
 ],
 "製": "制",
 "褃": "裉",
 "複": [
  "复",
  "復"
 ],
 "褌": "裈",
 "褎": "褏",
 "褏": "褎",
 "褒": "襃",
 "褓": [
  "緥",
  "褴"
 ],
 "褘": "袆",
 "褛": "褸",
 "褟": "溻",
 "褢": "褱",
 "褧": "絅",
 "褱": "褢",
 "褲": [
  "絝",
  "裤",
  "綯"
 ],
 "褳": "裢",
 "褴": [
  "襤",
  "褓"
 ],
 "褵": "縭",
 "褸": "褛",
 "褺": "䙝",
 "褻": [
  "䙝",
  "亵"
 ],
 "襀": "𫌀",
 "襁": "繈",
 "襃": "褒",
 "襄": "㐮",
 "襉": "裥",
 "襍": "雜",
 "襏": "袯",
 "襕": "襴",
 "襖": [
  "澳",
  "袄"
 ],
 "襜": "襝",
 "襝": [
  "襜",
  "裣"
 ],
 "襟": "衿",
 "襠": "裆",
 "襢": "袒",
 "襤": [
  "褴",
  "襤"
 ],
 "襪": [
  "袜",
  "韈"
 ],
 "襬": "䙓",
 "襮": "幞",
 "襯": [
  "儭",
  "衬"
 ],
 "襲": "袭",
 "襴": [
  "襕",
  "幱"
 ],
 "襾": "西",
 "西": "覀",
 "覀": "西",
 "覆": [
  "复",
  "復"
 ],
 "覇": "霸",
 "覈": "核",
 "覉": "羈",
 "覊": "羈",
 "見": "见",
 "覌": "觀",
 "覎": "觃",
 "規": [
  "规",
  "槻"
 ],
 "覐": "覺",
 "覓": [
  "覔",
  "觅"
 ],
 "覔": "覓",
 "視": [
  "眎",
  "视"
 ],
 "覘": [
  "䦓",
  "觇"
 ],
 "覙": "覼",
 "覚": "覺",
 "覡": "觋",
 "覥": [
  "靦",
  "觍"
 ],
 "覦": "觎",
 "覩": "睹",
 "親": "亲",
 "覬": "觊",
 "覯": "觏",
 "覰": "覷",
 "覲": "觐",
 "観": "觀",
 "覵": "覸",
 "覷": [
  "覰",
  "觑"
 ],
 "覸": "覵",
 "覺": [
  "覐",
  "觉",
  "覚"
 ],
 "覼": "𫌨",
 "覽": [
  "览",
  "覧"
 ],
 "覿": "觌",
 "觀": [
  "覌",
  "观"
 ],
 "见": "見",
 "观": "觀",
 "觃": "覎",
 "规": "規",
 "觅": "覓",
 "视": "視",
 "觇": "覘",
 "览": "覽",
 "觉": "覺",
 "觊": "覬",
 "觋": "覡",
 "觌": "覿",
 "觍": "覥",
 "觎": "覦",
 "觏": "覯",
 "觐": "覲",
 "觑": "覷",
 "角": "甪",
 "觔": "斤",
 "觕": "粗",
 "觜": "咀",
 "觝": "牴",
 "觞": "觴",
 "解": "觧",
 "觥": "觵",
 "触": "觸",
 "觧": "解",
 "觯": "觶",
 "觴": "觞",
 "觵": "觥",
 "觶": "觯",
 "觸": "触",
 "言": "訁",
 "訁": "讠",
 "訂": "订",
 "訃": "讣",
 "訇": "渹",
 "計": "计",
 "訊": "讯",
 "訌": "讧",
 "討": "讨",
 "訐": "讦",
 "訑": "𫍙",
 "訒": "讱",
 "訓": "训",
 "訕": "讪",
 "訖": "讫",
 "託": [
  "侂",
  "讬"
 ],
 "記": "记",
 "訚": "誾",
 "訛": [
  "譌",
  "讹"
 ],
 "訝": "讶",
 "訟": "讼",
 "訠": "矧",
 "訢": "䜣",
 "訣": "诀",
 "訥": [
  "吶",
  "讷"
 ],
 "訦": "諶",
 "訩": [
  "詾",
  "讻"
 ],
 "訪": "访",
 "設": "设",
 "許": "许",
 "訳": "譯",
 "訴": [
  "愬",
  "诉"
 ],
 "訶": [
  "诃",
  "呵"
 ],
 "診": "诊",
 "註": "注",
 "証": "證",
 "訽": "詬",
 "詀": "𧮪",
 "詁": "诂",
 "詆": "诋",
 "詋": "呪",
 "詎": "讵",
 "詐": "诈",
 "詑": "𫍟",
 "詒": "诒",
 "詔": "诏",
 "評": "评",
 "詖": "诐",
 "詗": "诇",
 "詘": "诎",
 "詛": "诅",
 "詞": "词",
 "詟": "讋",
 "詠": "咏",
 "詡": "诩",
 "詢": "询",
 "詣": "诣",
 "詤": "謊",
 "試": "试",
 "詧": "察",
 "詩": "诗",
 "詫": "诧",
 "詬": [
  "訽",
  "诟"
 ],
 "詭": "诡",
 "詮": "诠",
 "詰": "诘",
 "話": [
  "䛡",
  "话"
 ],
 "該": "该",
 "詳": "详",
 "詵": [
  "侁",
  "诜"
 ],
 "詶": "酬",
 "詻": "咯",
 "詼": "诙",
 "詾": "訩",
 "詿": "诖",
 "誄": "诔",
 "誅": "诛",
 "誆": "诓",
 "誇": "夸",
 "誉": "譽",
 "誊": "謄",
 "誌": "志",
 "認": "认",
 "誐": "哦",
 "誑": "诳",
 "誒": [
  "诶",
  "唉"
 ],
 "誕": [
  "𧩙",
  "诞"
 ],
 "誘": [
  "䛻",
  "诱"
 ],
 "誚": [
  "譙",
  "诮"
 ],
 "語": "语",
 "誠": "诚",
 "誡": "诫",
 "誣": "诬",
 "誤": [
  "悞",
  "误"
 ],
 "誥": "诰",
 "誦": "诵",
 "誨": "诲",
 "誩": "競",
 "說": [
  "说",
  "説"
 ],
 "説": "說",
 "読": "讀",
 "誰": "谁",
 "課": "课",
 "誶": "谇",
 "誹": "诽",
 "誼": "谊",
 "誾": "訚",
 "調": "调",
 "諁": "啜",
 "諂": "谄",
 "諄": "谆",
 "談": [
  "譚",
  "谈"
 ],
 "諉": [
  "餵",
  "诿"
 ],
 "諊": "鞫",
 "請": "请",
 "諌": "諫",
 "諍": "诤",
 "諏": "诹",
 "諑": "诼",
 "諒": "谅",
 "諕": "唬",
 "論": [
  "论",
  "論"
 ],
 "諗": "谂",
 "諛": "谀",
 "諜": "谍",
 "諝": "谞",
 "諞": "谝",
 "諠": "喧",
 "諡": "謚",
 "諢": "诨",
 "諤": [
  "讍",
  "谔"
 ],
 "諦": "谛",
 "諧": [
  "龤",
  "谐"
 ],
 "諩": "譜",
 "諫": "谏",
 "諭": "谕",
 "諮": [
  "咨",
  "谘"
 ],
 "諰": "𫍰",
 "諱": "讳",
 "諳": "谙",
 "諵": "喃",
 "諶": [
  "訦",
  "谌"
 ],
 "諷": "讽",
 "諸": "诸",
 "諺": "谚",
 "諼": "谖",
 "諾": "诺",
 "謀": "谋",
 "謁": "谒",
 "謂": "谓",
 "謄": "誊",
 "謅": "诌",
 "謊": [
  "詤",
  "谎"
 ],
 "謌": "歌",
 "謎": "谜",
 "謏": "𫍲",
 "謐": "谧",
 "謔": "谑",
 "謖": "谡",
 "謗": "谤",
 "謙": "谦",
 "謚": [
  "諡",
  "谥"
 ],
 "講": "讲",
 "謝": "谢",
 "謠": "谣",
 "謡": "謠",
 "謨": "谟",
 "謫": [
  "讁",
  "谪"
 ],
 "謬": "谬",
 "謱": "嘍",
 "謳": "讴",
 "謹": "谨",
 "謼": "呼",
 "謾": "谩",
 "譁": [
  "嘩",
  "哗"
 ],
 "譈": "憝",
 "證": [
  "証",
  "证"
 ],
 "譊": "𫍢",
 "譌": "訛",
 "譎": [
  "憰",
  "谲"
 ],
 "譏": "讥",
 "譐": "噂",
 "譖": "谮",
 "識": "识",
 "譙": [
  "誚",
  "谯"
 ],
 "譚": [
  "談",
  "谭"
 ],
 "譜": "谱",
 "譟": "噪",
 "警": "儆",
 "譫": "谵",
 "譭": "䛼",
 "譯": [
  "译",
  "訳"
 ],
 "議": "议",
 "譱": "善",
 "譲": "讓",
 "譴": "谴",
 "護": "护",
 "譸": "诪",
 "譽": "誉",
 "譾": [
  "谫",
  "謭"
 ],
 "讀": [
  "读",
  "讀"
 ],
 "讁": "謫",
 "讃": "讚",
 "讅": "谉",
 "讆": "讏",
 "變": "变",
 "讋": "詟",
 "讌": [
  "宴",
  "䜩",
  "燕"
 ],
 "讍": "諤",
 "讎": [
  "仇",
  "雠"
 ],
 "讐": "仇",
 "讒": "谗",
 "讓": "让",
 "讕": "谰",
 "讖": "谶",
 "讘": "囁",
 "讙": "歡",
 "讚": "讃",
 "讜": "谠",
 "讞": "谳",
 "讠": [
  "訁",
  "言"
 ],
 "计": "計",
 "订": "訂",
 "讣": "訃",
 "认": "認",
 "讥": "譏",
 "讦": "訐",
 "讧": "訌",
 "讨": "討",
 "让": "讓",
 "讪": "訕",
 "讫": "訖",
 "讬": "託",
 "训": "訓",
 "议": "議",
 "讯": "訊",
 "记": "記",
 "讱": "訒",
 "讲": "講",
 "讳": "諱",
 "讴": "謳",
 "讵": "詎",
 "讶": "訝",
 "讷": "訥",
 "许": "許",
 "讹": "訛",
 "论": "論",
 "讻": "訩",
 "讼": "訟",
 "讽": "諷",
 "设": "設",
 "访": "訪",
 "诀": "訣",
 "证": "證",
 "诂": "詁",
 "诃": [
  "訶",
  "呵"
 ],
 "评": "評",
 "诅": "詛",
 "识": "識",
 "诇": "詗",
 "诈": "詐",
 "诉": "訴",
 "诊": "診",
 "诋": "詆",
 "诌": "謅",
 "词": "詞",
 "诎": "詘",
 "诏": "詔",
 "诐": "詖",
 "译": "譯",
 "诒": "詒",
 "诓": "誆",
 "诔": "誄",
 "试": "試",
 "诖": "詿",
 "诗": "詩",
 "诘": "詰",
 "诙": "詼",
 "诚": "誠",
 "诛": "誅",
 "诜": "詵",
 "话": "話",
 "诞": "誕",
 "诟": "詬",
 "诠": "詮",
 "诡": "詭",
 "询": "詢",
 "诣": "詣",
 "诤": "諍",
 "该": "該",
 "详": "詳",
 "诧": "詫",
 "诨": "諢",
 "诩": "詡",
 "诪": "譸",
 "诫": "誡",
 "诬": "誣",
 "语": "語",
 "诮": "誚",
 "误": "誤",
 "诰": "誥",
 "诱": "誘",
 "诲": "誨",
 "诳": "誑",
 "说": "說",
 "诵": "誦",
 "诶": [
  "誒",
  "唉"
 ],
 "请": "請",
 "诸": [
  "諸",
  "諸"
 ],
 "诹": "諏",
 "诺": "諾",
 "读": "讀",
 "诼": "諑",
 "诽": "誹",
 "课": "課",
 "诿": "諉",
 "谀": "諛",
 "谁": "誰",
 "谂": "諗",
 "调": "調",
 "谄": "諂",
 "谅": "諒",
 "谆": "諄",
 "谇": "誶",
 "谈": "談",
 "谉": "讅",
 "谊": "誼",
 "谋": "謀",
 "谌": "諶",
 "谍": "諜",
 "谎": "謊",
 "谏": "諫",
 "谐": "諧",
 "谑": "謔",
 "谒": "謁",
 "谓": "謂",
 "谔": "諤",
 "谕": "諭",
 "谖": "諼",
 "谗": "讒",
 "谘": [
  "諮",
  "咨"
 ],
 "谙": "諳",
 "谚": "諺",
 "谛": "諦",
 "谜": "謎",
 "谝": "諞",
 "谞": "諝",
 "谟": "謨",
 "谠": "讜",
 "谡": "謖",
 "谢": "謝",
 "谣": "謠",
 "谤": "謗",
 "谥": "謚",
 "谦": "謙",
 "谧": "謐",
 "谨": "謹",
 "谩": "謾",
 "谪": "謫",
 "谫": [
  "譾",
  "謭"
 ],
 "谬": "謬",
 "谭": "譚",
 "谮": "譖",
 "谯": "譙",
 "谰": "讕",
 "谱": "譜",
 "谲": "譎",
 "谳": "讞",
 "谴": "譴",
 "谵": "譫",
 "谶": "讖",
 "谷": "穀",
 "谿": "嵠",
 "豆": "荳",
 "豇": "䜶",
 "豈": "岂",
 "豊": "豐",
 "豋": "登",
 "豎": [
  "竪",
  "竖"
 ],
 "豐": [
  "丰",
  "豊"
 ],
 "豓": "艶",
 "豔": "艶",
 "豘": "豚",
 "豚": "豘",
 "豜": "豣",
 "豝": "羓",
 "豣": "豜",
 "豫": [
  "預",
  "予"
 ],
 "豬": "猪",
 "豮": "豶",
 "豳": "㟗",
 "豴": "蹢",
 "豵": "䝋",
 "豶": "豮",
 "豸": "廌",
 "豺": "犲",
 "豻": "犴",
 "貉": "狢",
 "貊": "貘",
 "貌": "皃",
 "貍": "狸",
 "貎": "皃",
 "貓": "猫",
 "貘": "貊",
 "貙": "䝙",
 "貛": "獾",
 "貝": "贝",
 "貞": "贞",
 "貟": "贠",
 "負": "负",
 "財": [
  "㒲",
  "财"
 ],
 "貢": "贡",
 "貧": "贫",
 "貨": "货",
 "販": [
  "𧶶",
  "贩"
 ],
 "貪": "贪",
 "貫": "贯",
 "責": "责",
 "貭": "質",
 "貮": "二",
 "貯": "贮",
 "貰": "贳",
 "貲": "赀",
 "貳": [
  "二",
  "贰"
 ],
 "貴": "贵",
 "貶": "贬",
 "買": "买",
 "貸": "贷",
 "貺": "贶",
 "費": "费",
 "貼": "贴",
 "貽": "贻",
 "貿": "贸",
 "賀": "贺",
 "賁": "贲",
 "賂": "赂",
 "賃": "赁",
 "賄": "贿",
 "賅": [
  "侅",
  "赅"
 ],
 "資": "资",
 "賈": "贾",
 "賉": "恤",
 "賊": [
  "贼",
  "戝"
 ],
 "賍": "贓",
 "賑": "赈",
 "賒": "赊",
 "賓": [
  "賔",
  "宾"
 ],
 "賔": "賓",
 "賕": "赇",
 "賙": "赒",
 "賚": "赉",
 "賛": "贊",
 "賜": "赐",
 "賞": "赏",
 "賟": "𧹖",
 "賠": "赔",
 "賡": "赓",
 "賢": [
  "贒",
  "贤"
 ],
 "賣": [
  "卖",
  "売"
 ],
 "賤": "贱",
 "賦": "赋",
 "賧": "赕",
 "質": [
  "貭",
  "质"
 ],
 "賫": "齎",
 "賬": [
  "帳",
  "账"
 ],
 "賭": "赌",
 "賮": "贐",
 "賰": "䞐",
 "賴": [
  "頼",
  "赖"
 ],
 "賵": "赗",
 "賸": "剩",
 "賺": [
  "贃",
  "赚"
 ],
 "賻": "赙",
 "購": "购",
 "賽": "赛",
 "賾": "赜",
 "贃": [
  "賺",
  "𧹗"
 ],
 "贄": "贽",
 "贅": "赘",
 "贇": "赟",
 "贈": "赠",
 "贊": [
  "賛",
  "赞"
 ],
 "贋": "偐",
 "贍": "赡",
 "贏": "赢",
 "贐": [
  "賮",
  "赆"
 ],
 "贒": "賢",
 "贓": [
  "賍",
  "赃"
 ],
 "贔": "赑",
 "贖": "赎",
 "贗": [
  "偐",
  "赝",
  "贋"
 ],
 "贛": "赣",
 "贜": [
  "賍",
  "贓"
 ],
 "贝": "貝",
 "贞": "貞",
 "负": "負",
 "贠": "貟",
 "贡": "貢",
 "财": "財",
 "责": "責",
 "贤": "賢",
 "败": "敗",
 "账": [
  "賬",
  "帳"
 ],
 "货": "貨",
 "质": "質",
 "贩": "販",
 "贪": "貪",
 "贫": "貧",
 "贬": "貶",
 "购": "購",
 "贮": "貯",
 "贯": "貫",
 "贰": [
  "貳",
  "二"
 ],
 "贱": "賤",
 "贲": "賁",
 "贳": "貰",
 "贴": "貼",
 "贵": "貴",
 "贶": "貺",
 "贷": "貸",
 "贸": "貿",
 "费": "費",
 "贺": "賀",
 "贻": "貽",
 "贼": "賊",
 "贽": "贄",
 "贾": "賈",
 "贿": "賄",
 "赀": "貲",
 "赁": "賃",
 "赂": "賂",
 "赃": "贓",
 "资": "資",
 "赅": "賅",
 "赆": "贐",
 "赇": "賕",
 "赈": "賑",
 "赉": "賚",
 "赊": "賒",
 "赋": "賦",
 "赌": "賭",
 "赍": "齎",
 "赎": "贖",
 "赏": "賞",
 "赐": "賜",
 "赑": "贔",
 "赒": "賙",
 "赓": "賡",
 "赔": "賠",
 "赕": "賧",
 "赖": "賴",
 "赗": "賵",
 "赘": "贅",
 "赙": "賻",
 "赚": "賺",
 "赛": "賽",
 "赜": "賾",
 "赝": [
  "贗",
  "贋"
 ],
 "赞": "贊",
 "赟": "贇",
 "赠": "贈",
 "赡": "贍",
 "赢": "贏",
 "赣": "贛",
 "赤": "𤆍",
 "赪": "赬",
 "赬": [
  "䞓",
  "赪"
 ],
 "走": "赱",
 "赱": "走",
 "赵": "趙",
 "赶": "趕",
 "趁": "趂",
 "趂": "趁",
 "趄": "跙",
 "趋": "趨",
 "趒": "跳",
 "趕": "赶",
 "趙": "赵",
 "趨": "趋",
 "趮": "躁",
 "趯": "躍",
 "趱": "趲",
 "趲": "趱",
 "趸": "躉",
 "跃": "躍",
 "跄": "蹌",
 "跖": "蹠",
 "跙": "趄",
 "跞": "躒",
 "跡": [
  "蹟",
  "迹"
 ],
 "跥": "跺",
 "路": "路",
 "跳": "趒",
 "跴": "踹",
 "践": "踐",
 "跶": "躂",
 "跷": "蹺",
 "跸": "蹕",
 "跹": "躚",
 "跺": "跥",
 "跻": "躋",
 "踁": "硜",
 "踊": "踴",
 "踌": "躊",
 "踏": "蹋",
 "踐": "践",
 "踨": "蹤",
 "踪": "蹤",
 "踬": "躓",
 "踭": "㬹",
 "踯": "躑",
 "踰": "逾",
 "踴": "踊",
 "踵": "歱",
 "踹": "跴",
 "踽": "偊",
 "蹄": "蹏",
 "蹋": "踏",
 "蹌": [
  "牄",
  "跄"
 ],
 "蹏": "蹄",
 "蹑": "躡",
 "蹒": "蹣",
 "蹕": "跸",
 "蹝": "屣",
 "蹟": "跡",
 "蹠": "跖",
 "蹢": "豴",
 "蹣": "蹒",
 "蹤": [
  "踪",
  "踨"
 ],
 "蹧": "遭",
 "蹮": "躚",
 "蹰": "躕",
 "蹴": "蹵",
 "蹵": "蹴",
 "蹹": "蹋",
 "蹺": [
  "蹻",
  "跷"
 ],
 "蹻": [
  "蹺",
  "𫏋"
 ],
 "蹿": "躥",
 "躁": "趮",
 "躂": "跶",
 "躅": "䠱",
 "躉": "趸",
 "躊": "踌",
 "躋": [
  "隮",
  "跻"
 ],
 "躍": [
  "趯",
  "跃"
 ],
 "躎": "䟢",
 "躏": "躪",
 "躑": "踯",
 "躒": "跞",
 "躓": "踬",
 "躕": "蹰",
 "躗": "躛",
 "躚": [
  "蹮",
  "跹"
 ],
 "躛": "躗",
 "躜": "躦",
 "躝": "𨅬",
 "躡": "蹑",
 "躥": "蹿",
 "躦": "躜",
 "躧": "屣",
 "躪": "躏",
 "躬": "躳",
 "躭": [
  "眈",
  "耽"
 ],
 "躯": "軀",
 "躰": "體",
 "躱": "躲",
 "躲": "躱",
 "躳": "躬",
 "躶": "裸",
 "躷": "矮",
 "軀": "躯",
 "軄": "職",
 "軆": [
  "体",
  "體"
 ],
 "軉": "𨉗",
 "車": "车",
 "軋": "轧",
 "軌": "轨",
 "軍": "军",
 "軏": "𫐄",
 "軑": "轪",
 "軒": "轩",
 "軔": "轫",
 "軗": "𨐅",
 "軛": "轭",
 "軟": [
  "輭",
  "软"
 ],
 "転": "轉",
 "軣": "轟",
 "軤": "轷",
 "軨": "𫐉",
 "軫": "轸",
 "軰": "輩",
 "軲": "轱",
 "軸": "轴",
 "軹": "轵",
 "軺": [
  "𨍳",
  "轺"
 ],
 "軻": "轲",
 "軼": "轶",
 "軽": "輕",
 "軾": "轼",
 "軿": "輧",
 "較": "较",
 "輄": "𨐈",
 "輅": "辂",
 "輇": "辁",
 "輈": "辀",
 "載": "载",
 "輊": "轾",
 "輌": "輛",
 "輒": [
  "輙",
  "辄"
 ],
 "輓": "挽",
 "輔": "辅",
 "輕": "轻",
 "輗": "𫐐",
 "輙": "輒",
 "輛": [
  "辆",
  "輌"
 ],
 "輜": "辎",
 "輝": [
  "煇",
  "辉"
 ],
 "輞": "辋",
 "輟": "辍",
 "輥": "辊",
 "輦": [
  "辇",
  "輦"
 ],
 "輧": "軿",
 "輩": [
  "軰",
  "辈"
 ],
 "輪": [
  "轮",
  "輪"
 ],
 "輬": "辌",
 "輭": "軟",
 "輮": "𫐓",
 "輯": "辑",
 "輳": "辏",
 "輵": "轕",
 "輸": "输",
 "輻": [
  "辐",
  "輻"
 ],
 "輼": "轀",
 "輾": "辗",
 "輿": [
  "轝",
  "舆"
 ],
 "轀": "辒",
 "轂": "毂",
 "轄": [
  "鎋",
  "辖"
 ],
 "轅": "辕",
 "轆": [
  "樚",
  "辘"
 ],
 "轉": [
  "转",
  "転"
 ],
 "轍": "辙",
 "轎": "轿",
 "轔": "辚",
 "轕": "輵",
 "轗": "㙳",
 "轝": "輿",
 "轟": "轰",
 "轡": "辔",
 "轢": [
  "轹",
  "轢"
 ],
 "轣": "𫐆",
 "轤": "轳",
 "车": "車",
 "轧": "軋",
 "轨": "軌",
 "轩": "軒",
 "轪": "軑",
 "轫": "軔",
 "转": "轉",
 "轭": "軛",
 "轮": "輪",
 "软": "軟",
 "轰": "轟",
 "轱": "軲",
 "轲": "軻",
 "轳": "轤",
 "轴": "軸",
 "轵": "軹",
 "轶": "軼",
 "轷": "軤",
 "轸": "軫",
 "轹": "轢",
 "轺": "軺",
 "轻": "輕",
 "轼": "軾",
 "载": "載",
 "轾": "輊",
 "轿": "轎",
 "辀": "輈",
 "辁": "輇",
 "辂": "輅",
 "较": "較",
 "辄": "輒",
 "辅": "輔",
 "辆": "輛",
 "辇": "輦",
 "辈": "輩",
 "辉": "輝",
 "辊": "輥",
 "辋": "輞",
 "辌": "輬",
 "辍": "輟",
 "辎": "輜",
 "辏": "輳",
 "辐": "輻",
 "辑": "輯",
 "辒": "轀",
 "输": "輸",
 "辔": "轡",
 "辕": "轅",
 "辖": "轄",
 "辗": "輾",
 "辘": "轆",
 "辙": "轍",
 "辚": "轔",
 "辞": [
  "辤",
  "辭"
 ],
 "辟": "避",
 "辠": "罪",
 "辢": "辣",
 "辣": "辢",
 "辤": "辞",
 "辦": "办",
 "辧": "辨",
 "辨": [
  "辯",
  "弁"
 ],
 "辩": "辯",
 "辫": "辮",
 "辭": "辞",
 "辮": "辫",
 "辯": [
  "辨",
  "辩"
 ],
 "辰": "辰",
 "農": [
  "莀",
  "农"
 ],
 "辵": "辶",
 "辶": "辵",
 "边": "邊",
 "辺": "邊",
 "辽": "遼",
 "达": "達",
 "迁": "遷",
 "迂": "遇",
 "过": "過",
 "迈": "邁",
 "迊": "匝",
 "运": "運",
 "迕": "忤",
 "还": "還",
 "这": "這",
 "进": "進",
 "远": "遠",
 "违": "違",
 "连": "連",
 "迟": "遲",
 "迥": "逈",
 "迨": "逮",
 "迩": "邇",
 "迪": "廸",
 "迫": "廹",
 "迬": "往",
 "迭": "疊",
 "迯": "逃",
 "迳": [
  "逕",
  "徑"
 ],
 "迴": [
  "廻",
  "回"
 ],
 "迹": "跡",
 "迺": "乃",
 "迻": "移",
 "适": "適",
 "逃": "迯",
 "选": "選",
 "逊": "遜",
 "递": "遞",
 "逓": "遞",
 "逕": [
  "迳",
  "徑"
 ],
 "逖": "逷",
 "這": "这",
 "連": [
  "连",
  "連"
 ],
 "逥": "回",
 "逦": "邐",
 "逩": "奔",
 "逮": "迨",
 "逰": "游",
 "週": "周",
 "進": "进",
 "逷": "逖",
 "逸": "逸",
 "逹": "達",
 "逺": "遠",
 "逻": "邏",
 "逼": "偪",
 "逾": "踰",
 "遅": "遲",
 "遊": "游",
 "運": "运",
 "遍": "徧",
 "過": "过",
 "遑": "徨",
 "達": "达",
 "違": "违",
 "遗": "遺",
 "遙": "遥",
 "遜": [
  "愻",
  "逊"
 ],
 "遞": [
  "逓",
  "递"
 ],
 "遟": "遲",
 "遠": [
  "远",
  "逺"
 ],
 "遡": [
  "泝",
  "溯"
 ],
 "遥": "遙",
 "適": "适",
 "遭": "蹧",
 "遲": [
  "迟",
  "遅"
 ],
 "遶": "繞",
 "遷": "迁",
 "選": "选",
 "遺": "遗",
 "遼": [
  "辽",
  "遼"
 ],
 "避": "辟",
 "邁": "迈",
 "還": "还",
 "邅": "㣶",
 "邇": "迩",
 "邉": "邊",
 "邊": "边",
 "邏": [
  "逻",
  "邏"
 ],
 "邐": "逦",
 "邑": "阝",
 "邓": "鄧",
 "邕": "雍",
 "邝": "鄺",
 "邠": "㟗",
 "邢": "郉",
 "邨": "村",
 "邬": "鄔",
 "邮": "郵",
 "邹": "鄒",
 "邺": "鄴",
 "邻": "鄰",
 "郁": [
  "喐",
  "鬱"
 ],
 "郄": [
  "郤",
  "隙"
 ],
 "郅": "胝",
 "郉": "邢",
 "郎": "郞",
 "郏": "郟",
 "郐": "鄶",
 "郑": "鄭",
 "郓": "鄆",
 "郞": "郎",
 "郟": "郏",
 "郤": "郄",
 "郦": "酈",
 "郧": "鄖",
 "部": "卩",
 "郰": "鄹",
 "郵": "邮",
 "郷": "鄉",
 "郸": "鄲",
 "都": "都",
 "鄆": "郓",
 "鄉": [
  "郷",
  "乡"
 ],
 "鄒": "邹",
 "鄔": [
  "塢",
  "邬"
 ],
 "鄕": "鄉",
 "鄖": "郧",
 "鄧": "邓",
 "鄭": "郑",
 "鄰": [
  "隣",
  "邻"
 ],
 "鄲": "郸",
 "鄴": "邺",
 "鄶": "郐",
 "鄷": "酆",
 "鄹": "郰",
 "鄺": "邝",
 "酂": "酇",
 "酆": "鄷",
 "酇": "酂",
 "酈": "郦",
 "酉": "丣",
 "酔": "醉",
 "酖": "鴆",
 "酝": "醞",
 "酢": "醋",
 "酦": "醱",
 "酧": "酬",
 "酪": "酪",
 "酬": "酧",
 "酱": "醬",
 "酽": "釅",
 "酾": "釃",
 "酿": "釀",
 "醇": "䣩",
 "醉": "酔",
 "醊": "餟",
 "醋": "酢",
 "醖": "醞",
 "醗": "醱",
 "醜": "丑",
 "醞": "酝",
 "醡": "榨",
 "醤": "醬",
 "醩": "糟",
 "醫": "医",
 "醬": "酱",
 "醱": "酦",
 "醴": "醴",
 "醻": [
  "酧",
  "酬"
 ],
 "醼": "燕",
 "釀": [
  "酿",
  "醸"
 ],
 "釁": "衅",
 "釃": "酾",
 "釅": "酽",
 "釆": "采",
 "采": [
  "埰",
  "釆"
 ],
 "釈": "釋",
 "释": "釋",
 "釋": "释",
 "里": [
  "裡",
  "裏"
 ],
 "野": "埜",
 "量": "量",
 "釐": "厘",
 "金": [
  "釒",
  "钅"
 ],
 "釒": [
  "金",
  "钅"
 ],
 "釓": "钆",
 "釔": "钇",
 "釕": "钌",
 "釖": "劍",
 "釗": "钊",
 "釘": "钉",
 "釙": "钋",
 "釜": "釡",
 "針": [
  "箴",
  "针"
 ],
 "釡": "釜",
 "釣": "钓",
 "釤": "钐",
 "釧": "钏",
 "釩": "钒",
 "釬": "銲",
 "釳": "𨰿",
 "釵": "钗",
 "釷": "钍",
 "釹": "钕",
 "釺": "钎",
 "釼": "劍",
 "釾": "䥺",
 "鈀": [
  "耙",
  "钯"
 ],
 "鈁": "钫",
 "鈃": "钘",
 "鈄": "钭",
 "鈆": "鉛",
 "鈇": "𫓧",
 "鈈": "钚",
 "鈉": "钠",
 "鈋": "𨱂",
 "鈍": "钝",
 "鈎": "鉤",
 "鈐": "钤",
 "鈑": "钣",
 "鈒": "钑",
 "鈔": "钞",
 "鈕": "钮",
 "鈞": [
  "銁",
  "钧"
 ],
 "鈠": "𨱁",
 "鈡": "鍾",
 "鈣": "钙",
 "鈥": "钬",
 "鈦": "钛",
 "鈧": "钪",
 "鈬": "鐸",
 "鈮": "铌",
 "鈯": "𨱄",
 "鈰": "铈",
 "鈲": "𨱃",
 "鈳": "钶",
 "鈴": [
  "铃",
  "鈴"
 ],
 "鈷": "钴",
 "鈸": "钹",
 "鈹": "铍",
 "鈺": "钰",
 "鈽": "钸",
 "鈾": "铀",
 "鈿": "钿",
 "鉀": "钾",
 "鉁": "𨱅",
 "鉄": "鐵",
 "鉅": [
  "钜",
  "巨"
 ],
 "鉆": "鉗",
 "鉈": [
  "砣",
  "铊"
 ],
 "鉉": "铉",
 "鉋": [
  "刨",
  "铇"
 ],
 "鉍": "铋",
 "鉏": "鋤",
 "鉑": "铂",
 "鉕": "钷",
 "鉗": [
  "鉆",
  "钳",
  "箝"
 ],
 "鉚": "铆",
 "鉛": [
  "鈆",
  "铅"
 ],
 "鉞": [
  "戉",
  "钺"
 ],
 "鉢": "缽",
 "鉤": [
  "鈎",
  "钩"
 ],
 "鉦": "钲",
 "鉬": "钼",
 "鉭": "钽",
 "鉱": "礦",
 "鉴": "鑒",
 "鉶": "铏",
 "鉸": "铰",
 "鉺": "铒",
 "鉻": "铬",
 "鉿": "铪",
 "銀": "银",
 "銁": "鈞",
 "銃": "铳",
 "銅": "铜",
 "銍": "铚",
 "銑": "铣",
 "銓": "铨",
 "銕": [
  "鉄",
  "鐵"
 ],
 "銖": "铢",
 "銘": "铭",
 "銚": "铫",
 "銛": "铦",
 "銜": [
  "㘅",
  "衔"
 ],
 "銠": "铑",
 "銣": "铷",
 "銥": "铱",
 "銦": "铟",
 "銨": "铵",
 "銩": "铥",
 "銪": "铕",
 "銫": "铯",
 "銬": "铐",
 "銭": "錢",
 "銮": "鑾",
 "銱": "铞",
 "銲": "釬",
 "銳": [
  "锐",
  "鋭"
 ],
 "銶": "𨱇",
 "銷": "销",
 "銹": "鏽",
 "銻": "锑",
 "銼": "锉",
 "鋁": "铝",
 "鋃": "锒",
 "鋄": "錽",
 "鋅": "锌",
 "鋇": "钡",
 "鋉": "𨱈",
 "鋌": "铤",
 "鋏": "铗",
 "鋑": "鐫",
 "鋒": "锋",
 "鋙": "铻",
 "鋝": "锊",
 "鋟": "锓",
 "鋣": "铘",
 "鋤": [
  "鉏",
  "锄"
 ],
 "鋥": "锃",
 "鋦": "锔",
 "鋨": "锇",
 "鋩": "铓",
 "鋪": [
  "舖",
  "铺"
 ],
 "鋭": "銳",
 "鋮": "铖",
 "鋯": "锆",
 "鋰": "锂",
 "鋱": "铽",
 "鋳": "鑄",
 "鋶": "锍",
 "鋸": "锯",
 "鋼": "钢",
 "錁": "锞",
 "錂": "𨱋",
 "錄": [
  "录",
  "録"
 ],
 "錆": "锖",
 "錇": "锫",
 "錈": "锩",
 "錏": "铔",
 "錐": "锥",
 "錒": "锕",
 "錕": "锟",
 "錘": [
  "鎚",
  "锤"
 ],
 "錙": "锱",
 "錚": "铮",
 "錛": "锛",
 "錟": "锬",
 "錠": "锭",
 "錡": "锜",
 "錢": "钱",
 "錦": "锦",
 "錨": "锚",
 "錩": "锠",
 "錫": "锡",
 "錬": "煉",
 "錮": "锢",
 "錯": "错",
 "録": "錄",
 "錳": "锰",
 "錶": "表",
 "錸": "铼",
 "錽": "鋄",
 "錾": "鏨",
 "鍀": "锝",
 "鍃": "锪",
 "鍄": "𨱉",
 "鍆": "钔",
 "鍇": "锴",
 "鍈": "锳",
 "鍉": "匙",
 "鍊": "鍊",
 "鍋": "锅",
 "鍍": "镀",
 "鍔": "锷",
 "鍘": "铡",
 "鍚": "钖",
 "鍛": [
  "煅",
  "锻"
 ],
 "鍜": "煆",
 "鍠": "锽",
 "鍤": "锸",
 "鍥": "锲",
 "鍩": "锘",
 "鍫": "鍬",
 "鍬": [
  "鍫",
  "锹"
 ],
 "鍮": "𨱎",
 "鍰": [
  "鐶",
  "锾"
 ],
 "鍵": "键",
 "鍶": "锶",
 "鍺": "锗",
 "鍼": "箴",
 "鍾": "钟",
 "鎂": "镁",
 "鎄": "锿",
 "鎇": "镅",
 "鎊": "镑",
 "鎋": "轄",
 "鎌": "鐮",
 "鎏": "鏐",
 "鎒": "耨",
 "鎔": [
  "熔",
  "镕"
 ],
 "鎖": [
  "鏁",
  "锁"
 ],
 "鎘": "镉",
 "鎙": "槊",
 "鎚": "錘",
 "鎛": "镈",
 "鎝": "𨱏",
 "鎡": "镃",
 "鎢": "钨",
 "鎣": "蓥",
 "鎦": "镏",
 "鎧": "铠",
 "鎩": "铩",
 "鎪": "锼",
 "鎬": "镐",
 "鎭": "鎮",
 "鎮": "镇",
 "鎯": "𨱍",
 "鎰": "镒",
 "鎲": "镋",
 "鎳": "镍",
 "鎵": "镓",
 "鎶": "鿔",
 "鎷": "𨰾",
 "鎻": "鎖",
 "鎿": "镎",
 "鏁": "鎖",
 "鏃": "镞",
 "鏆": "𨱌",
 "鏇": "镟",
 "鏈": "链",
 "鏉": "𨱒",
 "鏌": "镆",
 "鏍": "镙",
 "鏐": [
  "鎏",
  "镠"
 ],
 "鏑": "镝",
 "鏗": "铿",
 "鏘": "锵",
 "鏜": "镗",
 "鏝": "镘",
 "鏞": "镛",
 "鏟": [
  "铲",
  "剗"
 ],
 "鏡": "镜",
 "鏢": [
  "鑣",
  "镖"
 ],
 "鏤": "镂",
 "鏥": "銹",
 "鏦": "𫓩",
 "鏨": "錾",
 "鏰": [
  "斆",
  "镚"
 ],
 "鏵": "铧",
 "鏷": "镤",
 "鏹": "镪",
 "鏺": "䥽",
 "鏽": [
  "銹",
  "锈"
 ],
 "鏾": "𠜎",
 "鐀": "匱",
 "鐃": "铙",
 "鐄": "𨱑",
 "鐋": "铴",
 "鐍": "𫔎",
 "鐎": "𨱓",
 "鐏": "𨱔",
 "鐐": "镣",
 "鐒": "铹",
 "鐓": "镦",
 "鐔": "镡",
 "鐘": [
  "钟",
  "鍾"
 ],
 "鐙": "镫",
 "鐠": "镨",
 "鐡": "鐵",
 "鐥": "䦅",
 "鐦": "锎",
 "鐧": "锏",
 "鐨": "镄",
 "鐫": [
  "鋑",
  "镌"
 ],
 "鐮": [
  "鎌",
  "镰"
 ],
 "鐯": "䦃",
 "鐲": "镯",
 "鐳": "镭",
 "鐵": [
  "鉄",
  "铁"
 ],
 "鐶": [
  "鍰",
  "镮"
 ],
 "鐸": [
  "铎",
  "鈬"
 ],
 "鐺": "铛",
 "鐿": "镱",
 "鑄": "铸",
 "鑊": "镬",
 "鑌": "镔",
 "鑑": "鑒",
 "鑒": [
  "鑑",
  "鉴"
 ],
 "鑔": "镲",
 "鑕": "锧",
 "鑚": "鑽",
 "鑛": "礦",
 "鑞": "镴",
 "鑠": "铄",
 "鑢": "䥨",
 "鑣": [
  "鏢",
  "镳"
 ],
 "鑥": "镥",
 "鑭": "镧",
 "鑰": "钥",
 "鑱": "镵",
 "鑲": "镶",
 "鑴": "鋑",
 "鑵": "罐",
 "鑷": "镊",
 "鑹": "镩",
 "鑼": "锣",
 "鑽": [
  "鉆",
  "钻"
 ],
 "鑾": "銮",
 "鑿": "凿",
 "钁": "镢",
 "钂": "镋",
 "钅": [
  "釒",
  "金"
 ],
 "钆": "釓",
 "钇": "釔",
 "针": "針",
 "钉": "釘",
 "钊": "釗",
 "钋": "釙",
 "钌": "釕",
 "钍": "釷",
 "钎": "釺",
 "钏": "釧",
 "钐": "釤",
 "钑": "鈒",
 "钒": "釩",
 "钓": "釣",
 "钔": "鍆",
 "钕": "釹",
 "钖": [
  "鍚",
  "锡"
 ],
 "钗": "釵",
 "钘": "鈃",
 "钙": "鈣",
 "钚": "鈈",
 "钛": "鈦",
 "钜": [
  "鉅",
  "巨"
 ],
 "钝": "鈍",
 "钞": "鈔",
 "钟": "鍾",
 "钠": "鈉",
 "钡": "鋇",
 "钢": "鋼",
 "钣": "鈑",
 "钤": "鈐",
 "钥": "鑰",
 "钦": "欽",
 "钧": "鈞",
 "钨": "鎢",
 "钩": "鉤",
 "钪": "鈧",
 "钫": "鈁",
 "钬": "鈥",
 "钭": "鈄",
 "钮": "鈕",
 "钯": "鈀",
 "钰": "鈺",
 "钱": "錢",
 "钲": "鉦",
 "钳": [
  "鉗",
  "箝"
 ],
 "钴": "鈷",
 "钵": "缽",
 "钶": "鈳",
 "钷": "鉕",
 "钸": "鈽",
 "钹": "鈸",
 "钺": "鉞",
 "钻": "鑽",
 "钼": "鉬",
 "钽": "鉭",
 "钾": "鉀",
 "钿": "鈿",
 "铀": "鈾",
 "铁": "鐵",
 "铂": "鉑",
 "铃": "鈴",
 "铄": "鑠",
 "铅": "鉛",
 "铆": "鉚",
 "铇": "鉋",
 "铈": "鈰",
 "铉": "鉉",
 "铊": "鉈",
 "铋": "鉍",
 "铌": "鈮",
 "铍": "鈹",
 "铎": "鐸",
 "铏": "鉶",
 "铐": "銬",
 "铑": "銠",
 "铒": "鉺",
 "铓": "鋩",
 "铔": "錏",
 "铕": "銪",
 "铖": "鋮",
 "铗": "鋏",
 "铘": "鋣",
 "铙": "鐃",
 "铚": "銍",
 "铛": "鐺",
 "铜": "銅",
 "铝": "鋁",
 "铞": "銱",
 "铟": "銦",
 "铠": "鎧",
 "铡": "鍘",
 "铢": "銖",
 "铣": "銑",
 "铤": "鋌",
 "铥": "銩",
 "铦": "銛",
 "铧": "鏵",
 "铨": "銓",
 "铩": "鎩",
 "铪": "鉿",
 "铫": "銚",
 "铬": "鉻",
 "铭": "銘",
 "铮": "錚",
 "铯": "銫",
 "铰": "鉸",
 "铱": "銥",
 "铲": "鏟",
 "铳": "銃",
 "铴": "鐋",
 "铵": "銨",
 "银": "銀",
 "铷": "銣",
 "铸": "鑄",
 "铹": "鐒",
 "铺": "鋪",
 "铻": "鋙",
 "铼": "錸",
 "铽": "鋱",
 "链": "鏈",
 "铿": "鏗",
 "销": "銷",
 "锁": "鎖",
 "锂": "鋰",
 "锃": "鋥",
 "锄": "鋤",
 "锅": "鍋",
 "锆": "鋯",
 "锇": "鋨",
 "锈": "鏽",
 "锉": "銼",
 "锊": "鋝",
 "锋": "鋒",
 "锌": "鋅",
 "锍": "鋶",
 "锎": "鐦",
 "锏": "鐧",
 "锐": "銳",
 "锑": "銻",
 "锒": "鋃",
 "锓": "鋟",
 "锔": "鋦",
 "锕": "錒",
 "锖": "錆",
 "锗": "鍺",
 "锘": "鍩",
 "错": "錯",
 "锚": "錨",
 "锛": "錛",
 "锜": "錡",
 "锝": "鍀",
 "锞": "錁",
 "锟": "錕",
 "锠": "錩",
 "锡": "錫",
 "锢": "錮",
 "锣": "鑼",
 "锤": "錘",
 "锥": "錐",
 "锦": "錦",
 "锧": "鑕",
 "锨": "杴",
 "锩": "錈",
 "锪": "鍃",
 "锫": "錇",
 "锬": "錟",
 "锭": "錠",
 "键": "鍵",
 "锯": "鋸",
 "锰": "錳",
 "锱": "錙",
 "锲": "鍥",
 "锳": "鍈",
 "锴": "鍇",
 "锵": "鏘",
 "锶": "鍶",
 "锷": "鍔",
 "锸": "鍤",
 "锹": "鍬",
 "锺": "鍾",
 "锻": "鍛",
 "锼": "鎪",
 "锽": "鍠",
 "锾": "鍰",
 "锿": "鎄",
 "镀": "鍍",
 "镁": "鎂",
 "镂": "鏤",
 "镃": "鎡",
 "镄": "鐨",
 "镅": "鎇",
 "镆": "鏌",
 "镇": "鎮",
 "镈": "鎛",
 "镉": "鎘",
 "镊": "鑷",
 "镋": [
  "鎲",
  "钂"
 ],
 "镌": "鐫",
 "镍": "鎳",
 "镎": "鎿",
 "镏": "鎦",
 "镐": "鎬",
 "镑": "鎊",
 "镒": "鎰",
 "镓": "鎵",
 "镔": "鑌",
 "镕": "鎔",
 "镖": "鏢",
 "镗": "鏜",
 "镘": "鏝",
 "镙": "鏍",
 "镚": [
  "鏰",
  "錋"
 ],
 "镛": "鏞",
 "镜": "鏡",
 "镝": "鏑",
 "镞": "鏃",
 "镟": "鏇",
 "镠": "鏐",
 "镡": "鐔",
 "镢": "钁",
 "镣": "鐐",
 "镤": "鏷",
 "镥": "鑥",
 "镦": "鐓",
 "镧": "鑭",
 "镨": "鐠",
 "镩": "鑹",
 "镪": "鏹",
 "镫": "鐙",
 "镬": "鑊",
 "镭": "鐳",
 "镮": "鐶",
 "镯": "鐲",
 "镰": "鐮",
 "镱": "鐿",
 "镲": "鑔",
 "镳": "鑣",
 "镴": "鑞",
 "镵": "鑱",
 "镶": "鑲",
 "長": "长",
 "长": "長",
 "門": "门",
 "閂": "闩",
 "閃": "闪",
 "閆": [
  "閻",
  "闫"
 ],
 "閇": "閉",
 "閈": "闬",
 "閉": [
  "闭",
  "閇"
 ],
 "開": "开",
 "閌": "闶",
 "閍": "𨸂",
 "閎": "闳",
 "閏": "闰",
 "閐": "𨸃",
 "閑": "闲",
 "間": "间",
 "閔": "闵",
 "閘": "闸",
 "閙": "鬧",
 "閡": "阂",
 "関": [
  "闗",
  "關"
 ],
 "閣": "阁",
 "閤": "合",
 "閥": "阀",
 "閧": [
  "鬨",
  "哄"
 ],
 "閨": "闺",
 "閩": "闽",
 "閫": "阃",
 "閬": "阆",
 "閭": [
  "闾",
  "閭"
 ],
 "閱": [
  "阅",
  "閲"
 ],
 "閲": "閱",
 "閶": "阊",
 "閹": [
  "剦",
  "阉"
 ],
 "閻": [
  "閆",
  "阎"
 ],
 "閼": "阏",
 "閽": "阍",
 "閾": "阈",
 "閿": "阌",
 "闃": "阒",
 "闆": "板",
 "闇": "暗",
 "闈": "闱",
 "闊": [
  "濶",
  "阔"
 ],
 "闋": "阕",
 "闌": "阑",
 "闍": "阇",
 "闐": "阗",
 "闒": "阘",
 "闓": "闿",
 "闔": [
  "阖",
  "閤"
 ],
 "闕": "阙",
 "闖": "闯",
 "闗": [
  "関",
  "關"
 ],
 "闘": "鬥",
 "關": [
  "寡",
  "关"
 ],
 "闞": "阚",
 "闠": "阓",
 "闡": "阐",
 "闤": "阛",
 "闥": "闼",
 "门": "門",
 "闩": "閂",
 "闪": "閃",
 "闫": [
  "閆",
  "閻"
 ],
 "闬": "閈",
 "闭": "閉",
 "问": "問",
 "闯": "闖",
 "闰": "閏",
 "闱": "闈",
 "闲": "閑",
 "闳": "閎",
 "间": "間",
 "闵": "閔",
 "闶": "閌",
 "闷": "悶",
 "闸": "閘",
 "闹": "鬧",
 "闺": "閨",
 "闻": "聞",
 "闼": "闥",
 "闽": "閩",
 "闾": "閭",
 "闿": "闓",
 "阀": "閥",
 "阁": "閣",
 "阂": "閡",
 "阃": "閫",
 "阄": "鬮",
 "阅": "閱",
 "阆": "閬",
 "阇": "闍",
 "阈": "閾",
 "阉": "閹",
 "阊": "閶",
 "阋": "鬩",
 "阌": "閿",
 "阍": "閽",
 "阎": "閻",
 "阏": "閼",
 "阐": "闡",
 "阑": "闌",
 "阒": "闃",
 "阓": "闠",
 "阔": "闊",
 "阕": "闋",
 "阖": [
  "闔",
  "閤"
 ],
 "阗": "闐",
 "阘": "闒",
 "阙": "闕",
 "阚": "闞",
 "阛": "闤",
 "阜": "阝",
 "阝": [
  "阜",
  "邑"
 ],
 "队": "隊",
 "阡": "仟",
 "阧": "陡",
 "阨": [
  "阸",
  "厄"
 ],
 "阪": "坂",
 "阬": "坑",
 "阮": "阮",
 "阯": "址",
 "阱": "穽",
 "阳": [
  "氜",
  "陽"
 ],
 "阴": "陰",
 "阵": "陣",
 "阶": "階",
 "阸": "阨",
 "陀": "陁",
 "陁": "陀",
 "际": "際",
 "陆": "陸",
 "陇": "隴",
 "陈": "陳",
 "陉": "陘",
 "陋": "陋",
 "降": [
  "夅",
  "降"
 ],
 "陏": "隋",
 "陔": "垓",
 "陕": "陝",
 "陗": "峭",
 "陘": "陉",
 "陜": [
  "狹",
  "陝"
 ],
 "陝": [
  "陕",
  "陜"
 ],
 "陞": "升",
 "陡": "阧",
 "陣": [
  "𨸬",
  "阵"
 ],
 "陥": "陷",
 "陧": "隉",
 "陨": "隕",
 "险": "險",
 "陰": "阴",
 "陳": "陈",
 "陵": "陵",
 "陶": "匋",
 "陷": "陥",
 "陸": "陆",
 "険": "險",
 "陻": "垔",
 "陼": "渚",
 "陽": [
  "氜",
  "阳",
  "昜"
 ],
 "隂": "陰",
 "隄": "堤",
 "隆": "隆",
 "隈": "渨",
 "隉": "陧",
 "隊": "队",
 "隋": "陏",
 "隍": "堭",
 "階": [
  "堦",
  "阶"
 ],
 "随": "隨",
 "隐": [
  "隠",
  "隱"
 ],
 "隕": [
  "磒",
  "陨",
  "殒"
 ],
 "隖": "塢",
 "際": "际",
 "隝": "塢",
 "隠": [
  "隐",
  "隱"
 ],
 "隣": "鄰",
 "隤": "墤",
 "隧": "𡑞",
 "隨": "随",
 "隩": "𡒃",
 "險": "险",
 "隮": "躋",
 "隱": [
  "乚",
  "隐"
 ],
 "隲": "騭",
 "隴": "陇",
 "隶": "隸",
 "隷": "隸",
 "隸": [
  "隷",
  "隶"
 ],
 "隻": "只",
 "隼": "鶽",
 "隽": "雋",
 "难": "難",
 "雁": [
  "鴈",
  "鳫"
 ],
 "集": "亼",
 "雇": "僱",
 "雋": "隽",
 "雍": "邕",
 "雏": "雛",
 "雑": "雜",
 "雕": "㓮",
 "雖": "虽",
 "雙": "双",
 "雛": [
  "鶵",
  "雏"
 ],
 "雜": [
  "襍",
  "杂",
  "雑"
 ],
 "雝": "簌",
 "雞": [
  "鷄",
  "鸡"
 ],
 "雠": [
  "讎",
  "仇"
 ],
 "離": [
  "离",
  "離"
 ],
 "難": "难",
 "雱": "霶",
 "雲": "云",
 "雳": "靂",
 "零": "零",
 "雷": "雷",
 "電": "电",
 "雾": "霧",
 "霁": "霽",
 "霊": "靈",
 "霍": "癨",
 "霜": "孀",
 "霡": "霢",
 "霢": "霡",
 "霥": "濛",
 "霧": "雾",
 "霭": "靄",
 "霰": "䨘",
 "露": "露",
 "霶": "雱",
 "霸": "覇",
 "霽": "霁",
 "靀": "濛",
 "靂": "雳",
 "靄": "霭",
 "靆": "叇",
 "靈": [
  "灵",
  "靈"
 ],
 "靉": "叆",
 "靑": "青",
 "青": "靑",
 "靓": "靚",
 "靔": "靝",
 "靖": "靖",
 "静": "靜",
 "靚": [
  "靓",
  "靜"
 ],
 "靜": "静",
 "靝": [
  "天",
  "靔"
 ],
 "面": "麵",
 "靥": "靨",
 "靦": [
  "覥",
  "腼"
 ],
 "靧": "頮",
 "靨": "靥",
 "靭": "韌",
 "靱": "韌",
 "靴": "鞾",
 "鞀": "鼗",
 "鞉": "鞀",
 "鞋": "鞵",
 "鞌": "鞍",
 "鞍": "鞌",
 "鞏": "巩",
 "鞑": "韃",
 "鞒": [
  "鞽",
  "橇"
 ],
 "鞘": "韒",
 "鞙": "琄",
 "鞝": "绱",
 "鞟": "鞹",
 "鞦": "鞧",
 "鞧": "鞦",
 "鞫": "諊",
 "鞯": "韉",
 "鞲": "韝",
 "鞴": "絥",
 "鞵": "鞋",
 "鞹": "鞟",
 "鞽": [
  "橇",
  "鞒"
 ],
 "鞾": "靴",
 "韁": [
  "繮",
  "缰"
 ],
 "韂": "䩞",
 "韃": "鞑",
 "韈": "襪",
 "韉": "鞯",
 "韋": "韦",
 "韌": [
  "肕",
  "韧"
 ],
 "韍": "韨",
 "韒": "鞘",
 "韓": "韩",
 "韙": "韪",
 "韜": [
  "弢",
  "韬"
 ],
 "韝": "鞲",
 "韞": "韫",
 "韤": "襪",
 "韦": "韋",
 "韧": "韌",
 "韨": "韍",
 "韩": "韓",
 "韪": "韙",
 "韫": "韞",
 "韬": "韜",
 "韭": [
  "韮",
  "艽"
 ],
 "韮": "韭",
 "韲": "齏",
 "韵": "韻",
 "韻": "韵",
 "響": "响",
 "頁": "页",
 "頂": [
  "𩠑",
  "顶"
 ],
 "頃": "顷",
 "項": "项",
 "順": "顺",
 "頇": "顸",
 "須": [
  "湏",
  "须"
 ],
 "頊": "顼",
 "頋": "顧",
 "頌": "颂",
 "頎": "颀",
 "頏": "颃",
 "預": [
  "豫",
  "预"
 ],
 "頑": "顽",
 "頒": [
  "颁",
  "朌"
 ],
 "頓": "顿",
 "頗": "颇",
 "領": [
  "领",
  "領"
 ],
 "頚": "頸",
 "頜": "颌",
 "頟": "額",
 "頡": "颉",
 "頣": "頤",
 "頤": [
  "頣",
  "颐",
  "頉"
 ],
 "頦": "颏",
 "頫": "俯",
 "頬": "頰",
 "頭": "头",
 "頮": [
  "靧",
  "颒"
 ],
 "頰": "颊",
 "頲": "颋",
 "頴": [
  "穎",
  "颕"
 ],
 "頷": "颔",
 "頸": "颈",
 "頹": [
  "颓",
  "頽"
 ],
 "頻": "频",
 "頼": "賴",
 "頽": "頹",
 "顃": "𩖖",
 "顆": "颗",
 "顋": "腮",
 "題": "题",
 "額": [
  "頟",
  "额"
 ],
 "顎": "颚",
 "顏": "颜",
 "顒": "颙",
 "顓": "颛",
 "顔": "顏",
 "顕": "顯",
 "顖": "囟",
 "願": "愿",
 "顙": "颡",
 "顚": "顛",
 "顛": "颠",
 "類": [
  "𩔗",
  "类",
  "類"
 ],
 "顢": "颟",
 "顥": [
  "皓",
  "颢"
 ],
 "顦": "憔",
 "顧": [
  "頋",
  "顾"
 ],
 "顫": "颤",
 "顬": "颥",
 "顯": [
  "顕",
  "显"
 ],
 "顰": [
  "嚬",
  "颦"
 ],
 "顱": [
  "髗",
  "颅"
 ],
 "顳": "颞",
 "顴": "颧",
 "页": "頁",
 "顶": "頂",
 "顷": "頃",
 "顸": "頇",
 "项": "項",
 "顺": "順",
 "须": "須",
 "顼": "頊",
 "顽": "頑",
 "顾": "顧",
 "顿": "頓",
 "颀": "頎",
 "颁": "頒",
 "颂": "頌",
 "颃": "頏",
 "预": "預",
 "颅": "顱",
 "领": "領",
 "颇": "頗",
 "颈": "頸",
 "颉": "頡",
 "颊": "頰",
 "颋": "頲",
 "颌": "頜",
 "颍": "潁",
 "颎": "熲",
 "颏": "頦",
 "颐": "頤",
 "频": "頻",
 "颒": "頮",
 "颓": "頹",
 "颔": "頷",
 "颕": "頴",
 "颖": "穎",
 "颗": "顆",
 "题": "題",
 "颙": "顒",
 "颚": "顎",
 "颛": "顓",
 "颜": "顏",
 "额": "額",
 "颞": "顳",
 "颟": "顢",
 "颠": "顛",
 "颡": "顙",
 "颢": "顥",
 "颣": "纇",
 "颤": "顫",
 "颥": "顬",
 "颦": "顰",
 "颧": "顴",
 "風": "风",
 "颭": "飐",
 "颮": [
  "猋",
  "飑"
 ],
 "颯": "飒",
 "颰": "𩙥",
 "颱": "台",
 "颳": "刮",
 "颶": "飓",
 "颷": "𩙪",
 "颸": "飔",
 "颺": "飏",
 "颻": "飖",
 "颼": [
  "䬒",
  "飕"
 ],
 "颾": "𩙫",
 "飀": "飗",
 "飄": [
  "飘",
  "飃"
 ],
 "飆": "飙",
 "飇": "猋",
 "飈": "飚",
 "风": "風",
 "飏": "颺",
 "飐": "颭",
 "飑": "颮",
 "飒": "颯",
 "飓": "颶",
 "飔": "颸",
 "飕": "颼",
 "飖": "颻",
 "飗": "飀",
 "飘": "飄",
 "飙": "飆",
 "飚": "飈",
 "飛": "飞",
 "飜": "翻",
 "飞": "飛",
 "食": [
  "飠",
  "饣"
 ],
 "飠": [
  "食",
  "饣"
 ],
 "飡": "餐",
 "飢": [
  "饑",
  "饥"
 ],
 "飣": "饤",
 "飤": "飼",
 "飥": "饦",
 "飦": "饘",
 "飨": "饗",
 "飩": "饨",
 "飪": [
  "䏕",
  "饪",
  "餁"
 ],
 "飫": [
  "饇",
  "饫"
 ],
 "飭": "饬",
 "飮": "飲",
 "飯": "饭",
 "飰": "飯",
 "飲": [
  "饮",
  "飮"
 ],
 "飴": "饴",
 "飼": [
  "飤",
  "饲",
  "飼"
 ],
 "飽": "饱",
 "飾": [
  "餙",
  "饰"
 ],
 "飿": "饳",
 "餁": "飪",
 "餂": "舔",
 "餃": "饺",
 "餄": "饸",
 "餅": [
  "餠",
  "饼"
 ],
 "餉": [
  "饟",
  "饷"
 ],
 "養": "养",
 "餌": "饵",
 "餍": "饜",
 "餎": "饹",
 "餏": "饻",
 "餐": "飡",
 "餑": "饽",
 "餒": [
  "餧",
  "馁"
 ],
 "餓": "饿",
 "餔": "𫗦",
 "餕": "馂",
 "餖": "饾",
 "餗": "𫗧",
 "餘": "余",
 "餙": "飾",
 "餚": "肴",
 "餛": [
  "餫",
  "馄"
 ],
 "餜": [
  "䴹",
  "馃"
 ],
 "餝": "飾",
 "餞": "饯",
 "餟": "醊",
 "餠": "餅",
 "餡": "馅",
 "餦": "𫗠",
 "餧": "喂",
 "館": [
  "舘",
  "馆",
  "館"
 ],
 "餫": "餛",
 "餭": "𫗮",
 "餱": "糇",
 "餳": "饧",
 "餵": "諉",
 "餶": "馉",
 "餷": "馇",
 "餸": "𩠌",
 "餹": "糖",
 "餺": "馎",
 "餻": "糕",
 "餼": "饩",
 "餽": "饋",
 "餾": "馏",
 "餿": "馊",
 "饁": "馌",
 "饃": "馍",
 "饅": "馒",
 "饇": "飫",
 "饈": [
  "𦟤",
  "馐"
 ],
 "饉": "馑",
 "饊": [
  "糤",
  "馓"
 ],
 "饋": [
  "匱",
  "馈",
  "餽"
 ],
 "饌": [
  "䉵",
  "馔"
 ],
 "饍": "膳",
 "饑": "飢",
 "饒": "饶",
 "饕": "叨",
 "饗": "飨",
 "饘": [
  "飦",
  "𫗴"
 ],
 "饜": "餍",
 "饞": [
  "嚵",
  "馋"
 ],
 "饟": "餉",
 "饢": "馕",
 "饣": "飠",
 "饤": "飣",
 "饥": "飢",
 "饦": "飥",
 "饧": "餳",
 "饨": "飩",
 "饩": "餼",
 "饪": "飪",
 "饫": "飫",
 "饬": "飭",
 "饭": "飯",
 "饮": [
  "飲",
  "飮"
 ],
 "饯": "餞",
 "饰": "飾",
 "饱": "飽",
 "饲": "飼",
 "饳": "飿",
 "饴": "飴",
 "饵": "餌",
 "饶": "饒",
 "饷": "餉",
 "饸": "餄",
 "饹": "餎",
 "饺": "餃",
 "饻": "餏",
 "饼": "餅",
 "饽": "餑",
 "饾": "餖",
 "饿": "餓",
 "馀": "餘",
 "馁": "餒",
 "馂": "餕",
 "馃": "餜",
 "馄": "餛",
 "馅": "餡",
 "馆": "館",
 "馇": "餷",
 "馈": [
  "饋",
  "餽"
 ],
 "馉": "餶",
 "馊": "餿",
 "馋": "饞",
 "馌": "饁",
 "馍": "饃",
 "馎": "餺",
 "馏": "餾",
 "馐": "饈",
 "馑": "饉",
 "馒": "饅",
 "馓": [
  "饊",
  "糤"
 ],
 "馔": "饌",
 "馕": "饢",
 "馘": "聝",
 "馚": "馩",
 "馩": "馚",
 "馬": "马",
 "馭": [
  "御",
  "驭"
 ],
 "馮": "冯",
 "馱": [
  "䭾",
  "驮",
  "駄"
 ],
 "馳": "驰",
 "馴": "驯",
 "馹": "驲",
 "馿": "驢",
 "駁": [
  "駮",
  "驳"
 ],
 "駃": "𫘝",
 "駄": "馱",
 "駅": "驛",
 "駆": "驅",
 "駈": "驅",
 "駎": "𩧨",
 "駐": "驻",
 "駑": "驽",
 "駒": "驹",
 "駔": "驵",
 "駕": "驾",
 "駘": "骀",
 "駙": "驸",
 "駚": "𩧫",
 "駛": [
  "𩢲",
  "驶"
 ],
 "駝": "驼",
 "駞": "駝",
 "駟": "驷",
 "駡": "罵",
 "駢": [
  "騈",
  "骈"
 ],
 "駦": "騰",
 "駧": "𩧲",
 "駩": "𩧴",
 "駪": "侁",
 "駭": "骇",
 "駮": "駁",
 "駰": "骃",
 "駱": [
  "骆",
  "駱"
 ],
 "駶": "𩧺",
 "駸": "骎",
 "駻": "𫘣",
 "駿": "骏",
 "騁": "骋",
 "騂": "骍",
 "騃": [
  "𫘤",
  "呆"
 ],
 "騅": "骓",
 "騈": "駢",
 "騌": [
  "騣",
  "骔",
  "鬃"
 ],
 "騍": "骒",
 "騎": "骑",
 "騏": "骐",
 "騐": "驗",
 "騒": "騷",
 "験": "驗",
 "騔": "𩨀",
 "騖": "骛",
 "騗": "騙",
 "騘": "驄",
 "騙": [
  "騗",
  "骗"
 ],
 "騚": "𩨊",
 "騝": "𩨃",
 "騟": "𩨈",
 "騠": "𫘨",
 "騣": [
  "騌",
  "鬃"
 ],
 "騤": "骙",
 "騧": "䯄",
 "騨": "驒",
 "騪": "𩨄",
 "騫": "骞",
 "騭": [
  "隲",
  "骘"
 ],
 "騮": "骝",
 "騰": [
  "駦",
  "腾"
 ],
 "騶": "驺",
 "騷": "骚",
 "騸": "骟",
 "騺": "驇",
 "騾": [
  "驘",
  "骡"
 ],
 "驀": "蓦",
 "驁": "骜",
 "驂": "骖",
 "驃": "骠",
 "驄": [
  "騘",
  "骢"
 ],
 "驅": [
  "敺",
  "驱"
 ],
 "驇": "騺",
 "驊": [
  "𦽊",
  "骅"
 ],
 "驋": "𩧯",
 "驌": "骕",
 "驍": "骁",
 "驏": "骣",
 "驒": "騨",
 "驕": "骄",
 "驗": [
  "騐",
  "验"
 ],
 "驘": "騾",
 "驚": "惊",
 "驛": "驿",
 "驟": "骤",
 "驢": [
  "馿",
  "驴"
 ],
 "驤": "骧",
 "驥": "骥",
 "驦": "骦",
 "驩": "歡",
 "驪": "骊",
 "驫": "骉",
 "马": "馬",
 "驭": "馭",
 "驮": "馱",
 "驯": "馴",
 "驰": "馳",
 "驱": "驅",
 "驲": "馹",
 "驳": "駁",
 "驴": "驢",
 "驵": "駔",
 "驶": "駛",
 "驷": "駟",
 "驸": "駙",
 "驹": "駒",
 "驺": "騶",
 "驻": "駐",
 "驼": "駝",
 "驽": "駑",
 "驾": "駕",
 "驿": "驛",
 "骀": "駘",
 "骁": "驍",
 "骂": "罵",
 "骃": "駰",
 "骄": "驕",
 "骅": "驊",
 "骆": "駱",
 "骇": "駭",
 "骈": "駢",
 "骉": "驫",
 "骊": "驪",
 "骋": "騁",
 "验": "驗",
 "骍": "騂",
 "骎": "駸",
 "骏": "駿",
 "骐": "騏",
 "骑": "騎",
 "骒": "騍",
 "骓": "騅",
 "骔": [
  "騌",
  "鬃"
 ],
 "骕": "驌",
 "骖": "驂",
 "骗": "騙",
 "骘": "騭",
 "骙": "騤",
 "骚": "騷",
 "骛": "騖",
 "骜": "驁",
 "骝": "騮",
 "骞": "騫",
 "骟": "騸",
 "骠": "驃",
 "骡": "騾",
 "骢": "驄",
 "骣": "驏",
 "骤": "驟",
 "骥": "驥",
 "骦": "驦",
 "骧": "驤",
 "骫": "骪",
 "骯": "肮",
 "骴": "胔",
 "骵": "體",
 "骻": "胯",
 "骽": "腿",
 "骾": "挭",
 "髃": "腢",
 "髄": "髓",
 "髅": "髏",
 "髋": "髖",
 "髌": [
  "髕",
  "臏"
 ],
 "髏": "髅",
 "髒": "脏",
 "髓": "膸",
 "體": "体",
 "髕": [
  "臏",
  "髌"
 ],
 "髖": "髋",
 "髗": [
  "顱",
  "臚"
 ],
 "高": "髙",
 "髙": "高",
 "髣": [
  "彷",
  "仿"
 ],
 "髦": "犛",
 "髪": "髮",
 "髮": "发",
 "髯": "髥",
 "髴": "彿",
 "髻": "䯻",
 "髼": "鬅",
 "鬀": "剃",
 "鬂": "鬢",
 "鬃": "骔",
 "鬅": "髼",
 "鬆": "松",
 "鬍": "胡",
 "鬒": "㐱",
 "鬓": [
  "𩯭",
  "鬢"
 ],
 "鬚": "须",
 "鬢": [
  "鬂",
  "鬓"
 ],
 "鬣": "巤",
 "鬥": [
  "鬭",
  "斗",
  "鬬"
 ],
 "鬦": "鬥",
 "鬧": [
  "閙",
  "闹"
 ],
 "鬨": [
  "閧",
  "哄"
 ],
 "鬩": "阋",
 "鬪": "鬥",
 "鬬": "鬥",
 "鬭": "鬥",
 "鬮": [
  "䰗",
  "阄"
 ],
 "鬰": "鬱",
 "鬱": [
  "欝",
  "郁",
  "鬰"
 ],
 "鬶": "鬹",
 "鬹": "鬶",
 "鬻": "粥",
 "魇": "魘",
 "魉": "魎",
 "魎": "魉",
 "魏": "巍",
 "魘": "魇",
 "魙": "聻",
 "魚": "鱼",
 "魛": "鱽",
 "魟": [
  "鰩",
  "𫚉"
 ],
 "魢": "鱾",
 "魥": "𩽹",
 "魦": "鯊",
 "魨": "鲀",
 "魯": [
  "鲁",
  "魯"
 ],
 "魴": "鲂",
 "魷": [
  "鰌",
  "鱿"
 ],
 "魺": "鲄",
 "鮁": "鲅",
 "鮃": "鲆",
 "鮄": "𫚒",
 "鮊": "鲌",
 "鮋": "鲉",
 "鮍": "鲏",
 "鮐": "鲐",
 "鮑": "鲍",
 "鮒": "鲋",
 "鮓": "鲊",
 "鮚": "鲒",
 "鮜": "鲘",
 "鮝": "鯗",
 "鮞": "鲕",
 "鮟": "𩽾",
 "鮣": "䲟",
 "鮦": "鲖",
 "鮧": "鯷",
 "鮪": "鲔",
 "鮫": "鲛",
 "鮭": "鲑",
 "鮮": [
  "鱻",
  "鲜",
  "尟"
 ],
 "鮰": "𫚔",
 "鮳": "鲓",
 "鮶": "鲪",
 "鮸": "𩾃",
 "鮺": "鲝",
 "鯀": "鲧",
 "鯁": [
  "挭",
  "鲠"
 ],
 "鯄": "𩾁",
 "鯆": "𫚙",
 "鯇": "鲩",
 "鯉": "鲤",
 "鯊": [
  "魦",
  "鲨"
 ],
 "鯋": "鯊",
 "鯒": "鲬",
 "鯔": "鲻",
 "鯕": "鲯",
 "鯖": "鲭",
 "鯗": [
  "鮝",
  "鲞"
 ],
 "鯛": "鲷",
 "鯝": "鲴",
 "鯡": "鲱",
 "鯢": "鲵",
 "鯤": "鲲",
 "鯧": [
  "䱽",
  "鲳"
 ],
 "鯨": "鲸",
 "鯪": "鲮",
 "鯫": "鲰",
 "鯱": "𩾇",
 "鯴": "鲺",
 "鯶": "𩽼",
 "鯷": [
  "鮧",
  "鳀"
 ],
 "鯽": "鲫",
 "鯿": "鳊",
 "鰁": "鳈",
 "鰂": "鲗",
 "鰃": "鳂",
 "鰆": "䲠",
 "鰈": "鲽",
 "鰉": [
  "鱑",
  "鳇"
 ],
 "鰌": [
  "魷",
  "䲡",
  "鰍"
 ],
 "鰍": [
  "鰌",
  "鳅"
 ],
 "鰏": "鲾",
 "鰐": "鱷",
 "鰒": "鳆",
 "鰓": "鳃",
 "鰕": "蝦",
 "鰛": "鳁",
 "鰜": "鳒",
 "鰟": "鳑",
 "鰠": "鳋",
 "鰣": "鲥",
 "鰤": "𫚕",
 "鰥": "鳏",
 "鰧": "䲢",
 "鰨": "鳎",
 "鰩": [
  "魟",
  "鳐"
 ],
 "鰭": "鳍",
 "鰮": "鳁",
 "鰱": "鲢",
 "鰲": [
  "鼇",
  "鳌"
 ],
 "鰳": "鳓",
 "鰵": "鳘",
 "鰷": "鲦",
 "鰹": "鲣",
 "鰺": "鲹",
 "鰻": "鳗",
 "鰼": "鳛",
 "鰾": "鳔",
 "鱂": "鳉",
 "鱅": "鳙",
 "鱇": "𩾌",
 "鱈": "鳕",
 "鱉": [
  "鼈",
  "鳖",
  "龞"
 ],
 "鱑": "鰉",
 "鱒": "鳟",
 "鱓": [
  "䱇",
  "鱔"
 ],
 "鱔": [
  "鱓",
  "鳝"
 ],
 "鱖": "鳜",
 "鱗": [
  "鳞",
  "鱗"
 ],
 "鱘": "鲟",
 "鱝": "鲼",
 "鱟": "鲎",
 "鱠": [
  "膾",
  "鲙"
 ],
 "鱣": "鳣",
 "鱤": "鳡",
 "鱧": "鳢",
 "鱨": "鲿",
 "鱭": "鲚",
 "鱮": "𫚈",
 "鱯": "鳠",
 "鱷": [
  "鰐",
  "鳄"
 ],
 "鱸": "鲈",
 "鱺": "鲡",
 "鱻": "鮮",
 "鱼": "魚",
 "鱽": "魛",
 "鱾": "魢",
 "鱿": "魷",
 "鲀": "魨",
 "鲁": "魯",
 "鲂": "魴",
 "鲃": "䰾",
 "鲄": "魺",
 "鲅": "鮁",
 "鲆": "鮃",
 "鲈": "鱸",
 "鲉": "鮋",
 "鲊": "鮓",
 "鲋": "鮒",
 "鲌": "鮊",
 "鲍": "鮑",
 "鲎": "鱟",
 "鲏": "鮍",
 "鲐": "鮐",
 "鲑": "鮭",
 "鲒": "鮚",
 "鲓": "鮳",
 "鲔": "鮪",
 "鲕": "鮞",
 "鲖": "鮦",
 "鲗": "鰂",
 "鲘": "鮜",
 "鲙": "鱠",
 "鲚": "鱭",
 "鲛": "鮫",
 "鲜": "鮮",
 "鲝": "鮺",
 "鲞": "鯗",
 "鲟": "鱘",
 "鲠": "鯁",
 "鲡": "鱺",
 "鲢": "鰱",
 "鲣": "鰹",
 "鲤": "鯉",
 "鲥": "鰣",
 "鲦": "鰷",
 "鲧": "鯀",
 "鲨": "鯊",
 "鲩": "鯇",
 "鲪": "鮶",
 "鲫": "鯽",
 "鲬": "鯒",
 "鲭": "鯖",
 "鲮": "鯪",
 "鲯": "鯕",
 "鲰": "鯫",
 "鲱": "鯡",
 "鲲": "鯤",
 "鲳": "鯧",
 "鲴": "鯝",
 "鲵": "鯢",
 "鲷": "鯛",
 "鲸": "鯨",
 "鲹": "鰺",
 "鲺": "鯴",
 "鲻": "鯔",
 "鲼": "鱝",
 "鲽": "鰈",
 "鲾": "鰏",
 "鲿": "鱨",
 "鳀": "鯷",
 "鳁": [
  "鰮",
  "鰛"
 ],
 "鳂": "鰃",
 "鳃": "鰓",
 "鳄": "鱷",
 "鳅": "鰍",
 "鳆": "鰒",
 "鳇": "鰉",
 "鳈": "鰁",
 "鳉": "鱂",
 "鳊": "鯿",
 "鳋": "鰠",
 "鳌": "鰲",
 "鳍": "鰭",
 "鳎": "鰨",
 "鳏": "鰥",
 "鳐": "鰩",
 "鳑": "鰟",
 "鳒": "鰜",
 "鳓": "鰳",
 "鳔": "鰾",
 "鳕": "鱈",
 "鳖": "鱉",
 "鳗": "鰻",
 "鳘": "鰵",
 "鳙": "鱅",
 "鳚": "䲁",
 "鳛": "鰼",
 "鳜": "鱖",
 "鳝": "鱔",
 "鳞": "鱗",
 "鳟": "鱒",
 "鳠": "鱯",
 "鳡": "鱤",
 "鳢": "鱧",
 "鳣": "鱣",
 "鳥": "鸟",
 "鳧": "凫",
 "鳩": "鸠",
 "鳫": "雁",
 "鳮": "雞",
 "鳯": "鳳",
 "鳲": "鸤",
 "鳳": [
  "凤",
  "鳯"
 ],
 "鳴": "鸣",
 "鳶": "鸢",
 "鳷": "𫛛",
 "鳼": "𪉃",
 "鳾": "䴓",
 "鴃": [
  "鵙",
  "𫛞"
 ],
 "鴆": [
  "酖",
  "鸩"
 ],
 "鴇": "鸨",
 "鴈": "雁",
 "鴉": [
  "鸦",
  "鵶"
 ],
 "鴎": "鷗",
 "鴒": "鸰",
 "鴕": "鸵",
 "鴗": "𫁡",
 "鴛": "鸳",
 "鴜": "𪉈",
 "鴝": [
  "朐",
  "鸲"
 ],
 "鴞": [
  "梟",
  "鸮"
 ],
 "鴟": "鸱",
 "鴣": "鸪",
 "鴦": "鸯",
 "鴨": "鸭",
 "鴬": "鶯",
 "鴯": "鸸",
 "鴰": "鸹",
 "鴲": "𪉆",
 "鴳": "鷃",
 "鴴": "鸻",
 "鴷": "䴕",
 "鴺": "鵜",
 "鴻": "鸿",
 "鴿": "鸽",
 "鵁": "䴔",
 "鵂": "鸺",
 "鵃": "鸼",
 "鵉": "鸞",
 "鵐": "鹀",
 "鵑": "鹃",
 "鵒": "鹆",
 "鵓": "鹁",
 "鵙": "鴃",
 "鵚": "𪉍",
 "鵜": [
  "鴺",
  "鹈"
 ],
 "鵝": [
  "鵞",
  "鹅"
 ],
 "鵞": "鵝",
 "鵠": "鹄",
 "鵡": "鹉",
 "鵪": "鹌",
 "鵬": "鹏",
 "鵮": "鹐",
 "鵯": "鹎",
 "鵲": "鹊",
 "鵷": "鹓",
 "鵻": "隼",
 "鵾": "鹍",
 "鶂": "鶃",
 "鶃": "鶂",
 "鶄": "䴖",
 "鶇": "鸫",
 "鶉": "鹑",
 "鶊": "鹒",
 "鶏": "雞",
 "鶒": "𫛶",
 "鶓": "鹋",
 "鶖": "鹙",
 "鶗": "𫛸",
 "鶘": "鹕",
 "鶚": "鹗",
 "鶡": "鹖",
 "鶥": "鹛",
 "鶩": "鹜",
 "鶪": "䴗",
 "鶬": "鸧",
 "鶯": [
  "鸎",
  "莺"
 ],
 "鶲": "鹟",
 "鶴": "鹤",
 "鶵": "雛",
 "鶹": "鹠",
 "鶺": "鹡",
 "鶻": "鹘",
 "鶼": "鹣",
 "鶽": "隼",
 "鶿": "鹚",
 "鷁": "鹢",
 "鷂": "鹞",
 "鷃": "鴳",
 "鷄": "雞",
 "鷈": "䴘",
 "鷊": "鹝",
 "鷏": "鷆",
 "鷓": "鹧",
 "鷔": "𪉑",
 "鷖": "鹥",
 "鷗": "鸥",
 "鷙": "鸷",
 "鷚": "鹨",
 "鷥": "鸶",
 "鷦": "鹪",
 "鷨": "𪉊",
 "鷩": "氅",
 "鷫": "鹔",
 "鷯": "鹩",
 "鷰": "燕",
 "鷲": "鹫",
 "鷳": "鹇",
 "鷸": "鹬",
 "鷹": "鹰",
 "鷺": [
  "鹭",
  "鷺"
 ],
 "鷽": "鸴",
 "鷿": "䴙",
 "鸂": "㶉",
 "鸇": "鹯",
 "鸋": "𫛢",
 "鸌": "鹱",
 "鸎": "鶯",
 "鸏": "鹲",
 "鸕": "鸬",
 "鸘": "鹴",
 "鸚": "鹦",
 "鸛": "鹳",
 "鸜": "朐",
 "鸝": "鹂",
 "鸞": "鸾",
 "鸟": "鳥",
 "鸠": "鳩",
 "鸡": "雞",
 "鸢": "鳶",
 "鸣": "鳴",
 "鸤": "鳲",
 "鸥": "鷗",
 "鸦": "鴉",
 "鸧": "鶬",
 "鸨": "鴇",
 "鸩": "鴆",
 "鸪": "鴣",
 "鸫": "鶇",
 "鸬": "鸕",
 "鸭": "鴨",
 "鸮": "鴞",
 "鸯": "鴦",
 "鸰": "鴒",
 "鸱": "鴟",
 "鸲": "鴝",
 "鸳": "鴛",
 "鸴": "鷽",
 "鸵": "鴕",
 "鸶": "鷥",
 "鸷": "鷙",
 "鸸": "鴯",
 "鸹": "鴰",
 "鸺": "鵂",
 "鸻": "鴴",
 "鸼": "鵃",
 "鸽": "鴿",
 "鸾": "鸞",
 "鸿": "鴻",
 "鹀": "鵐",
 "鹁": "鵓",
 "鹂": "鸝",
 "鹃": "鵑",
 "鹄": "鵠",
 "鹅": "鵝",
 "鹆": "鵒",
 "鹇": "鷳",
 "鹈": "鵜",
 "鹉": "鵡",
 "鹊": "鵲",
 "鹋": "鶓",
 "鹌": "鵪",
 "鹍": "鵾",
 "鹎": "鵯",
 "鹏": "鵬",
 "鹐": "鵮",
 "鹑": "鶉",
 "鹒": "鶊",
 "鹓": "鵷",
 "鹔": "鷫",
 "鹕": "鶘",
 "鹖": "鶡",
 "鹗": "鶚",
 "鹘": "鶻",
 "鹙": "鶖",
 "鹚": "鶿",
 "鹛": "鶥",
 "鹜": "鶩",
 "鹝": "鷊",
 "鹞": "鷂",
 "鹟": "鶲",
 "鹠": "鶹",
 "鹡": "鶺",
 "鹢": "鷁",
 "鹣": "鶼",
 "鹤": "鶴",
 "鹥": "鷖",
 "鹦": "鸚",
 "鹧": "鷓",
 "鹨": "鷚",
 "鹩": "鷯",
 "鹪": "鷦",
 "鹫": "鷲",
 "鹬": "鷸",
 "鹭": "鷺",
 "鹮": "䴉",
 "鹯": "鸇",
 "鹰": "鷹",
 "鹱": "鸌",
 "鹲": "鸏",
 "鹳": "鸛",
 "鹴": "鸘",
 "鹵": "卤",
 "鹸": "鹼",
 "鹹": "咸",
 "鹺": "鹾",
 "鹻": "堿",
 "鹼": [
  "堿",
  "硷"
 ],
 "鹽": [
  "䀋",
  "盐"
 ],
 "鹾": "鹺",
 "鹿": "鹿",
 "麁": "粗",
 "麄": "粗",
 "麇": "麕",
 "麐": "麟",
 "麓": "梺",
 "麕": "麇",
 "麗": "丽",
 "麞": "獐",
 "麟": [
  "麐",
  "麟"
 ],
 "麤": "粗",
 "麥": "麦",
 "麦": "麥",
 "麨": "𪎊",
 "麩": "麸",
 "麪": "麵",
 "麫": "麵",
 "麯": "麴",
 "麰": "牟",
 "麲": "𪎉",
 "麴": [
  "麯",
  "麹"
 ],
 "麵": [
  "麪",
  "面",
  "麺"
 ],
 "麸": "麩",
 "麺": "麵",
 "麻": [
  "蔴",
  "菻"
 ],
 "麼": [
  "庅",
  "么",
  "麽"
 ],
 "麽": [
  "庅",
  "么",
  "麼"
 ],
 "黃": "黄",
 "黄": "黃",
 "黉": "黌",
 "黌": "黉",
 "黎": "黎",
 "黏": "粘",
 "黑": "黒",
 "黒": "黑",
 "默": [
  "嘿",
  "黙"
 ],
 "黙": "默",
 "點": [
  "点",
  "奌"
 ],
 "黡": "黶",
 "黨": "党",
 "黩": "黷",
 "黪": "黲",
 "黲": "黪",
 "黶": "黡",
 "黷": "黩",
 "黽": "黾",
 "黾": "黽",
 "黿": "鼋",
 "鼂": "鼌",
 "鼃": "蛙",
 "鼄": "蛛",
 "鼅": "蜘",
 "鼇": "鰲",
 "鼈": "鱉",
 "鼉": "鼍",
 "鼋": "黿",
 "鼌": "鼂",
 "鼍": "鼉",
 "鼎": "𪔂",
 "鼏": "冪",
 "鼓": [
  "皷",
  "皼"
 ],
 "鼔": "皷",
 "鼕": "冬",
 "鼗": "鞀",
 "鼠": "鼡",
 "鼡": "鼠",
 "鼴": "鼹",
 "鼹": "鼴",
 "齁": "𪖙",
 "齅": "嗅",
 "齊": [
  "亝",
  "齐"
 ],
 "齋": [
  "斋",
  "斎"
 ],
 "齎": [
  "賫",
  "赍"
 ],
 "齏": [
  "齑",
  "韲"
 ],
 "齐": "齊",
 "齑": "齏",
 "齒": [
  "齿",
  "歯"
 ],
 "齔": "龀",
 "齕": "龁",
 "齗": "龂",
 "齙": "龅",
 "齜": "龇",
 "齟": "龃",
 "齠": "龆",
 "齡": [
  "龄",
  "齢"
 ],
 "齢": "齡",
 "齦": [
  "啃",
  "龈"
 ],
 "齧": [
  "囓",
  "嚙"
 ],
 "齩": "咬",
 "齪": "龊",
 "齬": "龉",
 "齲": "龋",
 "齶": "腭",
 "齷": "龌",
 "齿": "齒",
 "龀": "齔",
 "龁": "齕",
 "龂": "齗",
 "龃": "齟",
 "龄": "齡",
 "龅": "齙",
 "龆": "齠",
 "龇": "齜",
 "龈": "齦",
 "龉": "齬",
 "龊": "齪",
 "龋": "齲",
 "龌": "齷",
 "龍": [
  "龒",
  "龙"
 ],
 "龎": [
  "龐",
  "厐"
 ],
 "龐": [
  "龎",
  "庞",
  "厐"
 ],
 "龑": "䶮",
 "龒": "龍",
 "龓": "䪊",
 "龔": "龚",
 "龕": "龛",
 "龙": "龍",
 "龚": "龔",
 "龛": "龕",
 "龜": "龟",
 "龝": [
  "秋",
  "䆋"
 ],
 "龟": "龜",
 "龠": "籥",
 "龡": "吹",
 "龢": [
  "咊",
  "和"
 ],
 "龤": "諧",
 "龥": "籲",
 "龭": "𩨎",
 "龯": "𨱆",
 "鿁": "䜤",
 "鿌": "涼",
 "鿏": "䥑",
 "鿐": "䲤",
 "鿒": "鿓",
 "鿓": "鿒",
 "鿔": "鎶",
 "豈": "豈",
 "更": "更",
 "車": "車",
 "賈": "賈",
 "滑": "滑",
 "串": "串",
 "句": "句",
 "龜": "龜",
 "龜": "龜",
 "契": "契",
 "金": "金",
 "喇": "喇",
 "奈": "奈",
 "懶": "懶",
 "癩": "癩",
 "羅": "羅",
 "蘿": "蘿",
 "螺": "螺",
 "裸": "裸",
 "邏": "邏",
 "樂": "樂",
 "洛": "洛",
 "烙": "烙",
 "珞": "珞",
 "落": "落",
 "酪": "酪",
 "駱": "駱",
 "亂": "亂",
 "卵": "卵",
 "欄": "欄",
 "爛": "爛",
 "蘭": "蘭",
 "鸞": "鸞",
 "嵐": "嵐",
 "濫": "濫",
 "藍": "藍",
 "襤": "襤",
 "拉": "拉",
 "臘": "臘",
 "蠟": "蠟",
 "廊": "廊",
 "朗": "朗",
 "浪": "浪",
 "狼": "狼",
 "郎": "郎",
 "來": "來",
 "冷": "冷",
 "勞": "勞",
 "擄": "擄",
 "櫓": "櫓",
 "爐": "爐",
 "盧": "盧",
 "老": "老",
 "蘆": "蘆",
 "虜": "虜",
 "路": "路",
 "露": "露",
 "魯": "魯",
 "鷺": "鷺",
 "碌": "碌",
 "祿": "祿",
 "綠": "綠",
 "菉": "菉",
 "錄": "錄",
 "鹿": "鹿",
 "論": "論",
 "壟": "壟",
 "弄": "弄",
 "籠": "籠",
 "聾": "聾",
 "牢": "牢",
 "磊": "磊",
 "賂": "賂",
 "雷": "雷",
 "壘": "壘",
 "屢": "屢",
 "樓": "樓",
 "淚": "淚",
 "漏": "漏",
 "累": "累",
 "縷": "縷",
 "陋": "陋",
 "勒": "勒",
 "肋": "肋",
 "凜": "凜",
 "凌": "凌",
 "稜": "稜",
 "綾": "綾",
 "菱": "菱",
 "陵": "陵",
 "讀": "讀",
 "拏": "拏",
 "樂": "樂",
 "諾": "諾",
 "丹": "丹",
 "寧": "寧",
 "怒": "怒",
 "率": "率",
 "異": "異",
 "北": "北",
 "磻": "磻",
 "便": "便",
 "復": "復",
 "不": "不",
 "泌": "泌",
 "數": "數",
 "索": "索",
 "參": "參",
 "塞": "塞",
 "省": "省",
 "葉": "葉",
 "說": "說",
 "殺": "殺",
 "辰": "辰",
 "沈": "瀋",
 "拾": "十",
 "若": "若",
 "掠": "掠",
 "略": "略",
 "亮": "亮",
 "兩": "兩",
 "凉": "涼",
 "梁": "梁",
 "糧": "糧",
 "良": "良",
 "諒": "諒",
 "量": "量",
 "勵": "勵",
 "呂": "呂",
 "女": "女",
 "廬": "廬",
 "旅": "旅",
 "濾": "濾",
 "礪": "礪",
 "閭": "閭",
 "驪": "驪",
 "麗": "麗",
 "黎": "黎",
 "力": "力",
 "曆": "曆",
 "歷": "歷",
 "轢": "轢",
 "年": "年",
 "憐": "憐",
 "戀": "戀",
 "撚": "撚",
 "漣": "漣",
 "煉": "煉",
 "璉": "璉",
 "秊": "秊",
 "練": "練",
 "聯": "聯",
 "輦": "輦",
 "蓮": "蓮",
 "連": "連",
 "鍊": "鍊",
 "列": "列",
 "劣": "劣",
 "咽": "咽",
 "烈": "烈",
 "裂": "裂",
 "說": "說",
 "廉": "廉",
 "念": "念",
 "捻": "捻",
 "殮": "殮",
 "簾": "簾",
 "獵": "獵",
 "令": "令",
 "囹": "囹",
 "寧": "寧",
 "嶺": "嶺",
 "怜": "怜",
 "玲": "玲",
 "瑩": "瑩",
 "羚": "羚",
 "聆": "聆",
 "鈴": "鈴",
 "零": "零",
 "靈": "靈",
 "領": "領",
 "例": "例",
 "禮": "禮",
 "醴": "醴",
 "隸": "隸",
 "惡": "惡",
 "了": "了",
 "僚": "僚",
 "寮": "寮",
 "尿": "尿",
 "料": "料",
 "樂": "樂",
 "燎": "燎",
 "療": "療",
 "蓼": "蓼",
 "遼": "遼",
 "龍": "龍",
 "暈": "暈",
 "阮": "阮",
 "劉": "劉",
 "杻": "杻",
 "柳": "柳",
 "流": "流",
 "溜": "溜",
 "琉": "琉",
 "留": "留",
 "硫": "硫",
 "紐": "紐",
 "類": "類",
 "六": "六",
 "戮": "戮",
 "陸": "陸",
 "倫": "倫",
 "崙": "崙",
 "淪": "淪",
 "輪": "輪",
 "律": "律",
 "慄": "慄",
 "栗": "栗",
 "率": "率",
 "隆": "隆",
 "利": "利",
 "吏": "吏",
 "履": "履",
 "易": "易",
 "李": "李",
 "梨": "梨",
 "泥": "泥",
 "理": "理",
 "痢": "痢",
 "罹": "罹",
 "裏": "裏",
 "裡": "裏",
 "里": "里",
 "離": "離",
 "匿": "匿",
 "溺": "溺",
 "吝": "吝",
 "燐": "燐",
 "璘": "璘",
 "藺": "藺",
 "隣": "鄰",
 "鱗": "鱗",
 "麟": "麟",
 "林": "林",
 "淋": "淋",
 "臨": "臨",
 "立": "立",
 "笠": "笠",
 "粒": "粒",
 "狀": "狀",
 "炙": "炙",
 "識": "識",
 "什": "什",
 "茶": "茶",
 "刺": "刺",
 "切": "切",
 "度": "度",
 "拓": "拓",
 "糖": "糖",
 "宅": "宅",
 "洞": "洞",
 "暴": "暴",
 "輻": "輻",
 "行": "行",
 "降": "降",
 "見": "見",
 "廓": "廓",
 "兀": "兀",
 "嗀": "嗀",
 "塚": "塚",
 "晴": "晴",
 "凞": "凞",
 "猪": "猪",
 "益": "益",
 "礼": "礼",
 "神": "神",
 "祥": "祥",
 "福": "福",
 "靖": "靖",
 "精": "精",
 "羽": "羽",
 "蘒": "蘒",
 "諸": "諸",
 "﨣": "𧺯",
 "逸": "逸",
 "都": "都",
 "飯": "飯",
 "飼": "飼",
 "館": "館",
 "鶴": "鶴",
 "𠂝": "眾",
 "𠂤": "𣳨",
 "𠆌": "庸",
 "𠆲": "儣",
 "𠆿": "𠌥",
 "𠉂": "㒓",
 "𠉗": "𠏢",
 "𠊧": "併",
 "𠌥": "𠆿",
 "𠏢": "𠉗",
 "𠔃": "兮",
 "𠕄": "凹",
 "𠖥": "寵",
 "𠗦": "憑",
 "𠚳": "𠠎",
 "𠚹": "芟",
 "𠛅": "剾",
 "𠛆": "𠞆",
 "𠜎": "鏾",
 "𠜼": "掐",
 "𠞆": "𠛆",
 "𠞰": "剿",
 "𠠎": "𠚳",
 "𠦌": "卌",
 "𠭴": "㑁",
 "𠯗": "咂",
 "𠯟": "哯",
 "𠯠": "噅",
 "𠱓": "𠼮",
 "𠱘": "𠸺",
 "𠲥": "𡅏",
 "𠲿": "欶",
 "𠴢": "𡄔",
 "𠵸": "𡄣",
 "𠵾": "㗲",
 "𠸺": "𠱘",
 "𠼮": "𠱓",
 "𡄔": "𠴢",
 "𡄣": "𠵸",
 "𡅈": "嚹",
 "𡅏": "𠲥",
 "𡈙": "囮",
 "𡋀": "𡓾",
 "𡋗": "𡑭",
 "𡑞": "隧",
 "𡑭": "𡋗",
 "𡒃": "隩",
 "𡒄": "壈",
 "𡓾": "𡋀",
 "𡚁": "弊",
 "𡜱": "嫉",
 "𡝠": "㜷",
 "𡞱": "㜢",
 "𡞵": "㛟",
 "𡞾": "嫩",
 "𡠹": "㛿",
 "𡢃": "㛠",
 "𡨴": "寧",
 "𡭜": "𡮉",
 "𡭬": "𡮣",
 "𡮉": "𡭜",
 "𡮣": "𡭬",
 "𡱆": "属",
 "𡲕": "屜",
 "𡶴": "嵼",
 "𡻕": "亗",
 "𡾱": "㟜",
 "𢂑": "拭",
 "𢅏": "㡘",
 "𢅖": "簾",
 "𢆞": "䄯",
 "𢊍": "㕑",
 "𢋈": "㢝",
 "𢍺": "弋",
 "𢐧": "檠",
 "𢕐": "渹",
 "𢘝": "𢣚",
 "𢘞": "𢣭",
 "𢙓": "懀",
 "𢙢": "恐",
 "𢙱": "㑝",
 "𢛯": "㦎",
 "𢜫": "惺",
 "𢠳": "憋",
 "𢠵": "惝",
 "𢣚": "𢘝",
 "𢣭": "𢘞",
 "𢥠": "悚",
 "𢫊": "𢷮",
 "𢫞": "𢶫",
 "𢫬": "摋",
 "𢬦": "𢹿",
 "𢭆": "抽",
 "𢭏": "擣",
 "𢯱": "搜",
 "𢰾": "摠",
 "𢲷": "搜",
 "𢳆": "摮",
 "𢳜": "漇",
 "𢶑": "𢸣",
 "𢶣": "㩹",
 "𢶫": "𢫞",
 "𢷮": "𢫊",
 "𢸣": "𢶑",
 "𢹿": "𢬦",
 "𢽾": "斅",
 "𣁀": "𧥙",
 "𣁚": "𣁟",
 "𣁟": "𣁚",
 "𣄈": "㫎",
 "𣆐": "曥",
 "𣇀": "晡",
 "𣉞": "暠",
 "𣍨": "𦢈",
 "𣍯": "腪",
 "𣍰": "脥",
 "𣎑": "臗",
 "𣐤": "欍",
 "𣑶": "𣠲",
 "𣓌": "槹",
 "𣔼": "竿",
 "𣗋": "欓",
 "𣘓": "𣞻",
 "𣘴": "檭",
 "𣘷": "𣝕",
 "𣙎": "㭣",
 "𣝕": "𣘷",
 "𣞻": "𣘓",
 "𣠲": "𣑶",
 "𣭤": "𣯴",
 "𣯴": "𣭤",
 "𣳨": "𠂤",
 "𣶩": "澅",
 "𣶫": "𣿉",
 "𣸣": "濆",
 "𣺼": "灙",
 "𣺽": "𤁣",
 "𣽷": "瀃",
 "𣽽": "潸",
 "𣾷": "㳢",
 "𣿉": "𣶫",
 "𤁣": "𣺽",
 "𤆍": "赤",
 "𤆡": "熓",
 "𤇃": "爄",
 "𤇄": "熌",
 "𤈶": "熉",
 "𤈷": "㷿",
 "𤊀": "𤒎",
 "𤋏": "熡",
 "𤍠": "熱",
 "𤎱": "臇",
 "𤑕": [
  "熏",
  "爋"
 ],
 "𤒎": "𤊀",
 "𤕪": "爿",
 "𤕭": "将",
 "𤕯": "漿",
 "𤞤": "玁",
 "𤠋": "㺏",
 "𤢕": "斁",
 "𤢪": "獵",
 "𤦀": "瓕",
 "𤧚": "璁",
 "𤪺": "㻘",
 "𤫩": "㻏",
 "𤮨": "礱",
 "𤳄": "𤳸",
 "𤳸": "𤳄",
 "𤶧": "𤸫",
 "𤸫": "𤶧",
 "𤽯": "㿧",
 "𤾀": "皟",
 "𥁕": "昷",
 "𥂁": "鹽",
 "𥅘": "𥌃",
 "𥅴": "䀹",
 "𥅾": "䚎",
 "𥆧": "瞤",
 "𥇢": "䁪",
 "𥈟": "瞍",
 "𥋟": "䂀",
 "𥌃": "𥅘",
 "𥐘": "石",
 "𥐞": "硭",
 "𥐟": "礒",
 "𥐯": "𥖅",
 "𥐰": "𥕥",
 "𥐻": "碙",
 "𥓿": "砣",
 "𥔀": "渹",
 "𥕥": "𥐰",
 "𥖅": "𥐯",
 "𥜌": "澳",
 "𥝢": "利",
 "𥢢": "䅪",
 "𥥅": "竉",
 "𥧂": "𥨐",
 "𥨐": "𥧂",
 "𥫱": "囤",
 "𥬀": "䉙",
 "𥬞": "籋",
 "𥬠": "篘",
 "𥭉": "𥵊",
 "𥮋": "𥸠",
 "𥮜": "䉲",
 "𥱔": "𥵃",
 "𥵃": "𥱔",
 "𥵊": "𥭉",
 "𥵚": "竻",
 "𥸠": "𥮋",
 "𥹥": "𥼽",
 "𥺅": "䊭",
 "𥺇": "𥽖",
 "𥻟": "糯",
 "𥼽": "𥹥",
 "𥽖": "𥺇",
 "𥿊": "𦈈",
 "𦀇": "經",
 "𦂅": "𦈒",
 "𦂳": "緊",
 "𦃄": "𦈗",
 "𦈈": "𥿊",
 "𦈉": "緷",
 "𦈋": "綇",
 "𦈌": "綀",
 "𦈎": "繟",
 "𦈏": "緍",
 "𦈐": "縺",
 "𦈑": "緸",
 "𦈒": "𦂅",
 "𦈓": "䋿",
 "𦈔": "縎",
 "𦈕": "緰",
 "𦈖": "䌈",
 "𦈗": "𦃄",
 "𦈘": "䌋",
 "𦈙": "䌰",
 "𦈚": "縬",
 "𦈛": "繓",
 "𦈜": "䌖",
 "𦈝": "繏",
 "𦈞": "䌟",
 "𦈟": "䌝",
 "𦈠": "䌥",
 "𦈡": "繻",
 "𦍩": "羖",
 "𦕒": "䦓",
 "𦙵": "腕",
 "𦙶": "股",
 "𦙼": "骴",
 "𦚓": "胓",
 "𦛨": "朥",
 "𦝼": "膢",
 "𦞣": "臊",
 "𦟗": "𦣎",
 "𦟤": "饈",
 "𦢈": "𣍨",
 "𦢌": "殰",
 "𦣎": "𦟗",
 "𦤎": "臯",
 "𦨩": "𦪽",
 "𦪽": "𦨩",
 "𦰴": "䕳",
 "𦱄": "菇",
 "𦲷": "蒞",
 "𦷝": "芻",
 "𦽊": "驊",
 "𧉞": "䗿",
 "𧋍": "蜇",
 "𧌓": "蛗",
 "𧐅": "蛆",
 "𧐢": "蠔",
 "𧒭": "𧔥",
 "𧔥": "𧒭",
 "𧘂": "衝",
 "𧙀": "𧞪",
 "𧜗": "䘞",
 "𧜵": "䙊",
 "𧝞": "䘛",
 "𧞪": "𧙀",
 "𧠵": "𬢍",
 "𧥙": "𣁀",
 "𧩙": [
  "誕",
  "䜥"
 ],
 "𧬨": "噦",
 "𧮪": "詀",
 "𧰊": "磌",
 "𧳕": "𧳟",
 "𧳟": "𧳕",
 "𧴯": "孭",
 "𧵳": "䞌",
 "𧶔": "𧹓",
 "𧶧": "䞎",
 "𧶶": "販",
 "𧸖": "贃",
 "𧹑": "䞈",
 "𧹓": "𧶔",
 "𧹕": "䝻",
 "𧹖": "賟",
 "𧹗": "贃",
 "𧺯": "﨣",
 "𧿈": "𨇁",
 "𧿹": "拇",
 "𨀱": "𨄣",
 "𨁴": "𨅍",
 "𨂺": "𨈊",
 "𨃞": "𨃟",
 "𨃟": "𨃞",
 "𨄄": "𨈌",
 "𨄣": "𨀱",
 "𨅍": "𨁴",
 "𨅫": "𨇞",
 "𨅬": "躝",
 "𨇁": "𧿈",
 "𨇞": "𨅫",
 "𨈊": "𨂺",
 "𨈌": "𨄄",
 "𨈚": "𨉉",
 "𨉉": "𨈚",
 "𨉗": "軉",
 "𨊰": "䢀",
 "𨊸": "䢁",
 "𨊻": "𨐆",
 "𨋢": "䢂",
 "𨍳": "軺",
 "𨎮": "𨐉",
 "𨏠": "𨐇",
 "𨏥": "𨐊",
 "𨐅": "軗",
 "𨐆": "𨊻",
 "𨐇": "𨏠",
 "𨐈": "輄",
 "𨐉": "𨎮",
 "𨐊": "𨏥",
 "𨑒": "徒",
 "𨑹": "䢨",
 "𨢥": "䤍",
 "𨣦": "藇",
 "𨤰": "𨤻",
 "𨤻": "𨤰",
 "𨥛": "𨱀",
 "𨦫": "䦀",
 "𨧜": "䦁",
 "𨧱": "𨱊",
 "𨫒": "𨱐",
 "𨬕": "𨬟",
 "𨬟": "𨬕",
 "𨮂": "𨱕",
 "𨯅": "䥿",
 "𨰾": "鎷",
 "𨰿": "釳",
 "𨱀": "𨥛",
 "𨱁": "鈠",
 "𨱂": "鈋",
 "𨱃": "鈲",
 "𨱄": "鈯",
 "𨱅": "鉁",
 "𨱆": "龯",
 "𨱇": "銶",
 "𨱈": "鋉",
 "𨱉": "鍄",
 "𨱊": "𨧱",
 "𨱋": "錂",
 "𨱌": "鏆",
 "𨱍": "鎯",
 "𨱎": "鍮",
 "𨱏": "鎝",
 "𨱐": "𨫒",
 "𨱑": "鐄",
 "𨱒": "鏉",
 "𨱓": "鐎",
 "𨱔": "鐏",
 "𨱕": "𨮂",
 "𨱖": "䥩",
 "𨳑": "𨸁",
 "𨳕": "𨸀",
 "𨴗": "𨸅",
 "𨵩": "𨸆",
 "𨵸": "𨸇",
 "𨶀": "𨸉",
 "𨶏": "𨸊",
 "𨶮": "𨸌",
 "𨶲": "𨸋",
 "𨶹": "関",
 "𨷲": "𨸎",
 "𨷿": "䦳",
 "𨸀": "𨳕",
 "𨸁": "𨳑",
 "𨸂": "閍",
 "𨸃": "閐",
 "𨸄": "䦘",
 "𨸅": "𨴗",
 "𨸆": "𨵩",
 "𨸇": "𨵸",
 "𨸉": "𨶀",
 "𨸊": "𨶏",
 "𨸋": "𨶲",
 "𨸌": "𨶮",
 "𨸎": "𨷲",
 "𨸘": "𨽏",
 "𨸚": "級",
 "𨸟": "䧢",
 "𨸬": "陣",
 "𨻲": "罅",
 "𨽏": "𨸘",
 "𩋘": "鞋",
 "𩎢": "𩏾",
 "𩏪": "𩏽",
 "𩏼": "䪏",
 "𩏽": "𩏪",
 "𩏾": "𩎢",
 "𩏿": "䪘",
 "𩐀": "䪗",
 "𩓣": "𩖕",
 "𩔗": "類",
 "𩖕": "𩓣",
 "𩖖": "顃",
 "𩖗": "䫴",
 "𩗀": "𩙦",
 "𩘀": "𩙩",
 "𩘝": "𩙭",
 "𩘹": "𩙨",
 "𩘺": "𩙬",
 "𩙈": "𩙰",
 "𩙥": "颰",
 "𩙦": "𩗀",
 "𩙧": "䬞",
 "𩙨": "𩘹",
 "𩙩": "𩘀",
 "𩙪": "颷",
 "𩙫": "颾",
 "𩙬": "𩘺",
 "𩙭": "𩘝",
 "𩙮": "䬘",
 "𩙯": "䬝",
 "𩙰": "𩙈",
 "𩚛": "𩟿",
 "𩚥": "𩠀",
 "𩚵": "𩠁",
 "𩛆": "𩠂",
 "𩛩": "𩠃",
 "𩜇": "𩠉",
 "𩜦": "𩠆",
 "𩜵": "𩠊",
 "𩝔": "𩠋",
 "𩞄": "𩠎",
 "𩞦": "𩠏",
 "𩞯": "䭪",
 "𩟐": "𩠅",
 "𩟿": "𩚛",
 "𩠀": "𩚥",
 "𩠁": "𩚵",
 "𩠂": "𩛆",
 "𩠃": "𩛩",
 "𩠅": "𩟐",
 "𩠆": "𩜦",
 "𩠇": "䭀",
 "𩠈": "䭃",
 "𩠉": "𩜇",
 "𩠊": "𩜵",
 "𩠋": "𩝔",
 "𩠌": "餸",
 "𩠎": "𩞄",
 "𩠏": "𩞦",
 "𩠑": "頂",
 "𩠠": "𩠴",
 "𩠴": "𩠠",
 "𩡺": "𩧦",
 "𩢡": "𩧬",
 "𩢲": "駛",
 "𩢴": "𩧵",
 "𩢸": "𩧳",
 "𩢾": "𩧮",
 "𩣏": "𩧶",
 "𩣑": "䯃",
 "𩣺": "𩧼",
 "𩤊": "𩧩",
 "𩤙": "𩨆",
 "𩤲": "𩨉",
 "𩤸": "𩨅",
 "𩥄": "𩨋",
 "𩥇": "𩨍",
 "𩥉": "𩧱",
 "𩥑": "𩨌",
 "𩦢": "虞",
 "𩧆": "𩨐",
 "𩧦": "𩡺",
 "𩧨": "駎",
 "𩧩": "𩤊",
 "𩧪": "䮾",
 "𩧫": "駚",
 "𩧬": "𩢡",
 "𩧭": "䭿",
 "𩧮": "𩢾",
 "𩧯": "驋",
 "𩧰": "䮝",
 "𩧱": "𩥉",
 "𩧲": "駧",
 "𩧳": "𩢸",
 "𩧴": "駩",
 "𩧵": "𩢴",
 "𩧶": "𩣏",
 "𩧺": "駶",
 "𩧼": "𩣺",
 "𩧿": "䮠",
 "𩨀": "騔",
 "𩨁": "䮞",
 "𩨃": "騝",
 "𩨄": "騪",
 "𩨅": "𩤸",
 "𩨆": "𩤙",
 "𩨇": "䮫",
 "𩨈": "騟",
 "𩨉": "𩤲",
 "𩨊": "騚",
 "𩨋": "𩥄",
 "𩨌": "𩥑",
 "𩨍": "𩥇",
 "𩨎": "龭",
 "𩨏": "䮳",
 "𩨐": "𩧆",
 "𩨘": "肐",
 "𩬣": "𩭙",
 "𩬤": "𩰀",
 "𩭙": "𩬣",
 "𩯒": "𩯳",
 "𩯭": "鬓",
 "𩯳": "𩯒",
 "𩰀": "𩬤",
 "𩲒": "𩳤",
 "𩳤": "𩲒",
 "𩵩": "𩽺",
 "𩵹": "𩽻",
 "𩶘": "䲞",
 "𩶰": "𩽿",
 "𩶱": "𩽽",
 "𩷰": "𩾄",
 "𩸃": "𩾅",
 "𩸦": "𩾆",
 "𩽹": "魥",
 "𩽺": "𩵩",
 "𩽻": "𩵹",
 "𩽼": "鯶",
 "𩽽": "𩶱",
 "𩽾": "鮟",
 "𩽿": "𩶰",
 "𩾁": "鯄",
 "𩾂": "䲖",
 "𩾃": "鮸",
 "𩾄": "𩷰",
 "𩾅": "𩸃",
 "𩾆": "𩸦",
 "𩾇": "鯱",
 "𩾈": "䱙",
 "𩾊": "䱬",
 "𩾋": "䱰",
 "𩾌": "鱇",
 "𩿪": "𪉄",
 "𪀦": "𪉅",
 "𪀾": "𪉋",
 "𪁈": "𪉉",
 "𪁖": "𪉌",
 "𪂆": "𪉎",
 "𪃍": "𪉐",
 "𪃏": "𪉏",
 "𪄆": "𪉔",
 "𪄕": "𪉒",
 "𪇳": "𪉕",
 "𪉂": "䲰",
 "𪉃": "鳼",
 "𪉄": "𩿪",
 "𪉅": "𪀦",
 "𪉆": "鴲",
 "𪉈": "鴜",
 "𪉉": "𪁈",
 "𪉊": "鷨",
 "𪉋": "𪀾",
 "𪉌": "𪁖",
 "𪉍": "鵚",
 "𪉎": "𪂆",
 "𪉏": "𪃏",
 "𪉐": "𪃍",
 "𪉑": "鷔",
 "𪉒": "𪄕",
 "𪉔": "𪄆",
 "𪉕": "𪇳",
 "𪋿": "𪎍",
 "𪎈": "䴬",
 "𪎉": "麲",
 "𪎊": "麨",
 "𪎋": "䴴",
 "𪎍": "𪋿",
 "𪔂": "鼎",
 "𪔭": "𪔵",
 "𪔵": "𪔭",
 "𪖙": "齁",
 "𪘀": "𪚏",
 "𪘯": "𪚐",
 "𪚏": "𪘀",
 "𪚐": "𪘯",
 "𪞝": "凙",
 "𪡏": "嗹",
 "𪢮": "圞",
 "𪨊": "㞞",
 "𪨗": "屩",
 "𪪝": "邕",
 "𪻐": "瑽",
 "𪾢": "睍",
 "𫁡": "鴗",
 "𫂈": "䉬",
 "𫄨": "絺",
 "𫄸": "纁",
 "𫌀": "襀",
 "𫌨": "覼",
 "𫍙": "訑",
 "𫍟": "詑",
 "𫍢": "譊",
 "𫍰": "諰",
 "𫍲": "謏",
 "𫏋": "蹻",
 "𫐄": "軏",
 "𫐆": "轣",
 "𫐉": "軨",
 "𫐐": "輗",
 "𫐓": "輮",
 "𫓧": "鈇",
 "𫓩": "鏦",
 "𫔎": "鐍",
 "𫖸": "願",
 "𫗠": "餦",
 "𫗦": "餔",
 "𫗧": "餗",
 "𫗮": "餭",
 "𫗴": "饘",
 "𫘝": "駃",
 "𫘣": "駻",
 "𫘤": "騃",
 "𫘨": "騠",
 "𫚈": "鱮",
 "𫚉": "魟",
 "𫚒": "鮄",
 "𫚔": "鮰",
 "𫚕": "鰤",
 "𫚙": "鯆",
 "𫛛": "鳷",
 "𫛞": "鴃",
 "𫛢": "鸋",
 "𫛶": "鶒",
 "𫛸": "鶗",
 "𬢍": "𧠵",
 "冗": "冗",
 "灰": "灰",
 "冒": "冒"
}
},{}],142:[function(require,module,exports){
var React,Dropdown,View;
var pc=function(){
	React=require("react");
	const bootstrap_enabled = (typeof $ == 'function');
	if (bootstrap_enabled) {
		Dropdown=require("./dropdown_bs");
	} else {
		Dropdown=require("./dropdown_mui");
	}
	View="span"; 
}

try {
	React=require("react-native");
	Dropdown=require("./dropdown");//dropdown.android.js or dropdown.ios.js
	View=React.View;
	if (!View) pc();
} catch(e) {
	pc();
}


var E=React.createElement;
var PT=React.PropTypes;
var buildToc = function(toc) {
	if (!toc || !toc.length || toc.built) return;
	var depths=[];
 	var prev=0,j=0;
 	for (var i=0;i<toc.length;i++) if (toc[i].n) delete toc[i].n;
	for (var i=0;i<toc.length;i++) {

	    var depth=toc[i].d;
	    if (prev>depth) { //link to prev sibling
	      if (depths[depth]) toc[depths[depth]].n = i;
	      for (j=depth;j<prev;j++) depths[j]=0;
	    }
    	depths[depth]=i;
    	prev=depth;
	}
	toc.built=true;
	return toc;
}
var getChildren = function(toc,n) {
 
	if (!toc[n]||!toc[n+1] ||toc[n+1].d!==toc[n].d+1) return [];
	var out=[],next=n+1;

	while (next) {
		out.push(next);
		if (!toc[next+1])break;
		if (toc[next].d==toc[next+1].d) {
			next++;
		} else if (toc[next].n){
			next=toc[next].n;			
		} else {
			next=0;
		}
	}
	return out;
}
var BreadcrumbTOC=React.createClass({
	propTypes:{
		toc:PT.array.isRequired
		,hits:PT.array
		,onSelect:PT.func
		,pos:PT.number  //previously vpos
		,keyword:PT.string
		,treenodeHits:PT.func
		,buttonClass:PT.string
		,separator:PT.node
		,append:PT.node
		,prepend:PT.node
		,conv:PT.func
	}
	,componentWillReceiveProps:function(nextProps,nextState) {
		if (nextProps.toc && !nextProps.toc.built) {
			buildToc(nextProps.toc);
		}
		if (nextProps.hits!==this.props.hits) {
			this.clearHits();
		}
	}
	,componentWillMount:function(){
		buildToc(this.props.toc);
	}
	,getInitialState:function(){
		return {};
	}
	,clearHits:function() {
		for (var i=0;i<this.props.toc;i++) {
			if (this.props.toc[i].hit) delete this.props.toc[i].hit;
		}
	}
	,onSelect:function(idx,children,level) {
		this.props.onSelect && this.props.onSelect(idx, children[idx].p);//don't know why???
	}
	,closestItem:function(tocitems,pos) {
		for (i=1;i<tocitems.length;i++) {
			if (this.props.toc[tocitems[i]].p>pos) return i-1;
		}

		return tocitems.length-1;
	}
	,closeOther:function(cb){
		this.forceUpdate(cb);
	}
	,renderCrumbs:function() {		
		var cur=0,toc=this.props.toc,out=[],level=0,dropdowns=[];
		var children=getChildren(toc,cur),nextchildren;
		do {
			var selected = this.closestItem(children,this.props.pos) ;
			cur=children[selected];
		
			var items=children.map(function(child){
				var hit=toc[child].hit;
				if (this.props.hits && isNaN(hit) && this.props.treenodeHits) {
					hit=this.props.treenodeHits( toc,this.props.hits,child);
				}
				var t=toc[child].t;
				if(this.props.conv) t=this.props.conv(t)||t;
				return {t:t,idx:child,hit:hit,p:toc[child].p};

			}.bind(this));

			nextchildren=getChildren(toc,cur);
			if (items.length && (dropdowns.length==0||this.props.pos>=items[0].p)) {
				dropdowns.push({level:level,items:items,selected:selected,nextchildren:nextchildren});
			} else break;

			//if (out.length>5) break;
			level++;
			if (!nextchildren.length) break;
			children=nextchildren;
		} while (true);

		out=dropdowns.map(function(d,idx){
			var buttonClass=null;
			if (this.props.buttonClass) {
				buttonClass=this.props.buttonClass+" "+this.props.buttonClass+(idx+(this.props.buttonClassOffset||0));
			}

			return	E(View,{key:idx,style:{marginTop:4,marginBottom:4}},
					E(Dropdown,{n:idx,total:dropdowns.length,onSelect:this.onSelect,level:d.level,
					separator:this.props.separator,
					buttonClass:buttonClass,
					buttonStyle:this.props.buttonStyle,
					activeButtonStyle:this.props.activeButtonStyle,
					closeOther:this.closeOther,
					depth:idx,
					maxDepth:dropdowns.length,
					untrimDepth:this.props.untrimDepth||1, 
					selected:d.selected,items:d.items,keyword:this.props.keyword})
				)
		}.bind(this));
		this.props.append&& out.push(this.props.append);
		this.props.prepend&& out.unshift(this.props.prepend);
		return out;
	}
	,render:function(){
		if (View==="span") {
			return E(View,null,this.renderCrumbs());
		} else {

			return E(View,{style:{flex:1,flexDirection:'row',flexWrap:'wrap'}},this.renderCrumbs());
		}
	}
});
module.exports=BreadcrumbTOC;
},{"./dropdown":143,"./dropdown_bs":144,"./dropdown_mui":145,"react":"react","react-native":undefined}],143:[function(require,module,exports){
/* empty stub for browserify*/
},{}],144:[function(require,module,exports){
var React=require("react");
var E=React.createElement;
var PT=React.PropTypes;

var BreadCrumbDropdown=React.createClass({
	propTypes:{
		items:PT.array.isRequired
		,selected:PT.number
		,onSelect:PT.func
		,level:PT.number.isRequired //which level
		,keyword:PT.string
	}
	,getDefaultProp:function(){
		return {items:[]}
	}
	,onSelect:function(e) {
		domnode=e.target.parentElement;
		var idx=-1;
		while (domnode) {
			if (domnode.classList.contains("open")) domnode.classList.remove("open");
			if (domnode.dataset && domnode.dataset.idx) idx=parseInt(domnode.dataset.idx);
			domnode=domnode.parentElement;
		}
		this.props.onSelect&&this.props.onSelect(idx,this.props.items,this.props.level);
	}
	,renderKeyword:function(t) {
		if (this.props.keyword) {
			var o=[],lastidx=0;
			t.replace(new RegExp(this.props.keyword,"g"),function(m,idx){
				o.push(t.substr(lastidx,idx));
				o.push(E("span",{key:idx,style:{color:"red"}},m));
				lastidx=idx+m.length;
			});
			o.push(t.substr(lastidx));
			t=o;
		}
		return t;
	}
	,renderItem:function(item,idx) {
		var hit=null;
		var style={cursor:"pointer"};
		if (this.props.selected==idx) style.background="highlight"
		item.hit&&(hit=E("span",{style:{color:"red"},className:"pull-right"},item.hit));
		var t=this.renderKeyword(item.t);
		return E("li",{key:idx,"data-idx":idx},E("a",{style:style,onClick:this.onSelect},t,hit));
	}

	,open:function(e){
		e.target.parentElement.classList.add("open");
	}
	,render:function(){
		var item=this.props.items[this.props.selected];
		if (!item)return E("span");
		var title=this.renderKeyword(item.t);

		item.hit&&(title=[E("span",{key:1},item.t),E("span",{key:2,className:"hl0 pull-right"},item.hit||"")]);
		return E("span",{className:"dropdown"},
				E("button",{key:"drop","data-toggle":"dropdown",className:this.props.buttonClass||"btn btn-default",
					onClick:this.open}, this.renderKeyword(this.props.items[this.props.selected].t) ),
				this.props.separator,
				E("ul",{className:"dropdown-menu open",id:"for_shutting_warning_up",title:title},
			this.props.items.map(this.renderItem)));
	}
});
module.exports=BreadCrumbDropdown;
},{"react":"react"}],145:[function(require,module,exports){
var React=require("react");
var ReactDOM=require("react-dom");
var E=React.createElement;
var PT=React.PropTypes;

var BreadCrumbDropdownMUI=React.createClass({
	propTypes:{
		items:PT.array.isRequired
		,selected:PT.number
		,onSelect:PT.func
		,level:PT.number.isRequired //which level
		,keyword:PT.string
	}
	,getInitialState:function(){
		return {opened:false};
	}
	,componentWillReceiveProps:function(){
		this.setState({opened:false});
	}
	,getDefaultProp:function(){
		return {items:[]}
	}
	,close:function(){
		this.setState({opened:false});
	}
	,closeOther:function(cb){
		this.props.closeOther(cb);
	}
	,onSelect:function(e) {
		this.setState({opened:false});
		const domnode=e.target.parentElement;
		if (domnode.dataset && domnode.dataset.idx) idx=parseInt(domnode.dataset.idx);
		this.props.onSelect&&this.props.onSelect(idx,this.props.items,this.props.level);
	}
	,renderKeyword:function(t) {
		if (this.props.keyword) {
			var o=[],lastidx=0;
			t.replace(new RegExp(this.props.keyword,"g"),function(m,idx){
				o.push(t.substr(lastidx,idx));
				o.push(E("span",{key:idx,style:{color:"red"}},m));
				lastidx=idx+m.length;
			});
			o.push(t.substr(lastidx));
			t=o;
		}
		return t;
	}
	,renderItem:function(item,idx) {
		var hit=null;
		var style={cursor:"pointer"};
		if (this.props.selected==idx) style.background="highlight"
		item.hit&&(hit=E("span",{style:{color:"red"},className:"pull-right"},item.hit));
		var t=this.renderKeyword(item.t);
		return E("li",{key:idx,"data-idx":idx},
			E("a",{style:style,onClick:this.onSelect},t,hit));
	}
	,open:function(e){
		this.closeOther(function(){
			this.setState({opened:true});	
		}.bind(this));
		
	}
	,render:function(){
		var item=this.props.items[this.props.selected];
		if (!item)return E("span");
		var title=this.renderKeyword(item.t);

//		item.hit&&(title=[E("span",{key:1},item.t),E("span",{key:2,className:"hl0 pull-right"},item.hit||"")]);
		var dropdownbuttonclass=this.props.buttonClass;

		this.props.buttonClass
		const menuEl=(this.state.opened)?
			E("ul",{className:"mui-dropdown__menu mui--is-open"
				,onMouseLeave:this.close
				,id:"for_shutting_warning_up",title:title},
			this.props.items.map(this.renderItem)):E("div");

		//trim 
		var label=this.props.items[this.props.selected].t;

		if (this.props.depth+(this.props.untrimDepth||1)
			<this.props.maxDepth && (label.length>5 ||label.match(/(.*)[ 　、：]/))) {
			const m=label.match(/(.*)[ 　、：]/); //remove after punc
			if (m) {
				label=m[1].substring(0,5);	
			} else {
				label=label.substring(0,5);
			}
		}
		if (label.length>10) label=label.substr(0,10)+'...';
		return E("span",{className:"mui-dropdown"},
				E("button",{key:"drop","data-toggle":"dropdown",
					className:dropdownbuttonclass,
					style:this.state.opened?this.props.activeButtonStyle:this.props.buttonStyle,
					onMouseEnter:this.open}, this.renderKeyword(label) ),
				this.props.separator,menuEl);
				
	}
});
module.exports=BreadCrumbDropdownMUI;
},{"react":"react","react-dom":"react-dom"}],146:[function(require,module,exports){
module.exports={Component:require("./breadcrumbtoc")};
},{"./breadcrumbtoc":142}],147:[function(require,module,exports){
"use strict";

var main = require("accelon2017");
setTimeout(function () {
	var corpora = window.accelon2017 && window.accelon2017.corpora;
	if (!corpora) {
		var rootele = document.getElementById("root");
		rootele.innerHTML = "<h1>&nbsp;:( System failure</h1><br>&nbsp;Missing window.corpora.";
		rootele.style = "margin:0px;background-color:blue;color:white;height:100%";
	} else {
		main({ corpora: corpora });
	}
});

},{"accelon2017":105}]},{},[147]);
