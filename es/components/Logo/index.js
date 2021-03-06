function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './index.scss';

var Logo = function (_React$Component) {
  _inherits(Logo, _React$Component);

  function Logo() {
    _classCallCheck(this, Logo);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Logo.prototype.render = function render() {
    var _props = this.props,
        _props$imgUrl = _props.imgUrl,
        imgUrl = _props$imgUrl === undefined ? '' : _props$imgUrl,
        _props$text = _props.text,
        text = _props$text === undefined ? '' : _props$text,
        alt = _props.alt,
        _props$height = _props.height,
        height = _props$height === undefined ? '20' : _props$height,
        url = _props.url,
        style = _props.style;


    return React.createElement(
      'div',
      { className: 'logo', style: style },
      React.createElement(
        'a',
        { href: url, className: 'logo-box' },
        React.createElement('img', { src: imgUrl, alt: alt, height: height }),
        React.createElement(
          'span',
          { className: 'logo-title' },
          text
        )
      )
    );
  };

  return Logo;
}(React.Component);

export default Logo;