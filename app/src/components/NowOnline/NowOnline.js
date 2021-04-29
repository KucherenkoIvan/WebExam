import React from 'react';
import { useSelector } from 'react-redux';

export default function NowOnline({ theme }) {
  var _uox = _uox || { };
  (function() {
    var s=document.createElement("script");
    s.src="https://static.usuarios-online.com/uo2.min.js";
    document.getElementsByTagName("head")[0].appendChild(s);
  })();

  return (
  <span id="uox_counter"></span>
);
}