/**
 * Main JS file for Tremor behaviours
 */

/*globals jQuery, document */
(function ($) {
  'use strict';

  $(document).ready(function(){

    $('.post-content').fitVids();

  });

  var charts = document.getElementsByClassName('language-mermaid');
  var detachCodeBlock = function(element) {
    var parent = element.parentNode;
    parent.removeChild(element);
    return parent;
  }

  while(charts.length > 0) {
    var code = charts[0].childNodes[0];
    //console.log(code);

    var anchor = detachCodeBlock(charts[0]);

    anchor.setAttribute('style', 'align: center; background-color: transparent; ');
    var chart = document.createElement('div');
    chart.setAttribute('class', 'mermaid');
    chart.setAttribute('style', 'text-align: center;');
    chart.appendChild(code);
    anchor.appendChild(chart);
  }
}(jQuery));
