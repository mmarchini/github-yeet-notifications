'use strict'

function rainbowNotifications() {
  const items = document.querySelectorAll('li[data-notification-id].notifications-list-item')

  for (const item of items) {
    const because = item.querySelector("div > div:last-child > span.Label").textContent;

    const unread = item.classList.contains('notification-unread');

    if (because === 'subscribed') continue;
    else if (because === 'team mention') {
      item.style.backgroundColor = unread ? '#dbfffd' : '#e4fbfa';
    }
    else if (because === 'mention') {
      item.style.backgroundColor = unread ? '#eeceff' : '#f5e4ff';
    }
    else if (because === 'commented') {
      item.style.backgroundColor = unread ? '#fff7ce' : '#fffbe6';
    }
    else if (because === 'author') {
      item.style.backgroundColor = unread ? '#bfffc1' : '#e1ffe2';
    }
  }
}

document.addEventListener('pjax:end', rainbowNotifications);
rainbowNotifications();

function stickyActions() {
  const elements = document.querySelectorAll("div.js-check-all-container > div.Box > div.Box-header, div.js-check-all-container > div > div.Box");

  if (elements.length !== 1) {
    console.error('found multiple .Box elements');
    return
  }

  const element = elements[0];
  const offset = element.offsetTop;
  const currentPosition = element.style.position;
  const currentTop = element.style.position;
  const currentZIndex = element.style.zIndex;
  const currentWidth = element.offsetWidth;
  const parent = element.parentElement;

  let sticky = false;
  const placeholder = document.createElement("div");
  placeholder.style.display = 'block';

  window.addEventListener("scroll", function() {
    if (offset < window.pageYOffset) {
      element.style.position = 'fixed';
      element.style.top = 0;
      element.style.zIndex = 10000;
      element.style.width = `${currentWidth}px`;

      placeholder.style.height = `${element.offsetHeight}px`;
      sticky = true;
      parent.insertBefore(placeholder, element);
    } else {
      element.style.position = currentPosition;
      element.style.top = currentTop;
      element.style.zIndex = currentZIndex;
      element.style.width = undefined;
      if (sticky)
        parent.removeChild(placeholder);
      sticky = false;
    }
  }, false);
}

document.addEventListener('pjax:end', stickyActions);
stickyActions();
