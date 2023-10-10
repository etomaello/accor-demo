export default function decorate(block) {
  // Update the block's class
  block.className = 'box bloc-enroll-banner';
  const textDiv = document.createElement('div');
  textDiv.className = 'bloc-enroll-banner-text';
  const title = block.querySelector('h2');
  title.className = 'bloc-enroll-banner-text-title';
  const subtitle = block.querySelector('p:not(.button-container)');
  subtitle.className = 'bloc-enroll-banner-text-subtitle';
  const linkDiv = document.createElement('div');
  linkDiv.className = 'bloc-enroll-banner-link';
  const link = block.querySelector('a');
  link.className = 'round-button';
  link.setAttribute('data-ga', '1');
  link.setAttribute('target', '_blank');
  link.setAttribute('title', 'New window');
  // reomve the remaining divs (unwanted)
  const unwantedDiv = block.querySelector('div > div.button-container')
    .parentNode.parentNode;
  if (unwantedDiv) unwantedDiv.remove();
  // Append elements to the block
  textDiv.appendChild(title);
  textDiv.appendChild(subtitle);
  linkDiv.appendChild(link);
  block.appendChild(textDiv);
  block.appendChild(linkDiv);
}
