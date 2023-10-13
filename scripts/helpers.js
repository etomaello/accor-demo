import createTag from './tag.js';

/**
 * * @param {HTMLElement} element
 * * @param {string} targetTag, like 'ul' or 'div'
 * * @param {string} className
 * result: return the new element with inner content of the element, desired tag and css class
 */
export function changeTag(element, targetTag, className) {
  const newElClass = className || '';
  const innerContent = element.innerHTML;
  const newTagElement = createTag(targetTag, { class: newElClass }, innerContent);

  return newTagElement;
}

/**
 * * @param {string} url the href of a link element
 * result: return `_self` or `_blank` if the link has the same host
 */
export function returnLinkTarget(url) {
  const currentHost = window.location.host;
  const urlObject = new URL(url);
  const isSameHost = urlObject.host === currentHost;

  // take in pathname that should be opened in new tab, in redirects excel
  const redirectExternalPaths = ['/history', '/chat'];
  const redirectToExternalPath = redirectExternalPaths.includes(urlObject.pathname);

  if (!isSameHost || redirectToExternalPath) {
    return '_blank';
  }
  return '_self';
}

// as the blocks are loaded in aysnchronously, we don't have a specific timing
// that the all blocks are loaded -> cannot use a single observer to
// observe all blocks, so use functions here in blocks instead
// eslint-disable-next-line max-len
const requireRevealWrapper = ['slide-reveal-up', 'slide-reveal-up-slow'];

export function addRevealWrapperToAnimationTarget(element) {
  const revealWrapper = createTag('div', { class: 'slide-reveal-wrapper' });
  const parent = element.parentNode;
  // Insert the wrapper before the element
  parent.insertBefore(revealWrapper, element);
  revealWrapper.appendChild(element);
}

// eslint-disable-next-line max-len
export function addAnimatedClassToElement(targetSelector, animatedClass, delayTime, targetSelectorWrapper) {
  const target = targetSelectorWrapper.querySelector(targetSelector);
  if (target) {
    target.classList.add(animatedClass);
    if (delayTime) target.style.transitionDelay = `${delayTime}s`;
    if (requireRevealWrapper.indexOf(animatedClass) !== -1) {
      addRevealWrapperToAnimationTarget(target);
    }
  }
}

export function addInviewObserverToTriggerElement(triggerElement) {
  const observerOptions = {
    threshold: 0.25, // show when is 25% in view
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  observer.observe(triggerElement);
}

// eslint-disable-next-line max-len
export function addInViewAnimationToSingleElement(targetElement, animatedClass, triggerElement, delayTime) {
  // if it's HTML element
  if (targetElement.nodeType === 1) {
    targetElement.classList.add(animatedClass);
    if (requireRevealWrapper.indexOf(animatedClass) !== -1) {
      addRevealWrapperToAnimationTarget(targetElement);
    }
  }
  // if it's string only, which should be a selector
  if (targetElement.nodeType === 3) {
    addAnimatedClassToElement(targetElement, animatedClass, triggerElement, delayTime);
  }
  const trigger = triggerElement || targetElement;
  addInviewObserverToTriggerElement(trigger);
}

export default {
  returnLinkTarget,
  addInViewAnimationToSingleElement,
};
