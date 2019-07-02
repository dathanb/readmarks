// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var UNIQUE_PREFIX = "per-domain-bookmarks"

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function saveBookmarkFor(domain, url) {
  localStorage[getBookmarkKey(domain)] = url
}

function displayInfoFor(url) {
  var data = getBookmarkFor(getDomain(url));
  console.log(data)
  $("#bookmark").text(data)
}

function getCurrentTab(callback){
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    callback(tabs[0])
  });
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    displayInfoFor(url)
  });

  $("#load-bookmark").click(function() {
    getCurrentTab(function(tab) {
      chrome.tabs.update(tab.id, { url: getBookmarkFor(getDomain(tab.url))})
    });
  })

  $("#save-bookmark").click(function() {
    getCurrentTab(function(tab){
      saveBookmarkFor(getDomain(tab.url), tab.url)
      displayInfoFor(tab.url)
    })
  })
});

