export default function decorate(block) {
  // Update the block's class
  block.className = 'box bloc-enroll-banner';

  // Create div for the title and subtitle
  const textDiv = document.createElement('div');
  textDiv.className = 'bloc-enroll-banner-text';

  const title = block.querySelector('h2');
  title.className = 'bloc-enroll-banner-text-title';

  const subtitle = block.querySelector('p:not(.button-container)');
  subtitle.className = 'bloc-enroll-banner-text-subtitle';

  // Create div for the link
  const linkDiv = document.createElement('div');
  linkDiv.className = 'bloc-enroll-banner-link';

  const link = block.querySelector('a');
  link.className = 'round-button';
  link.setAttribute('data-ga', '1');
  link.setAttribute('target', '_blank');
  link.setAttribute('title', 'New window');

  // Remove the existing divs
  const unwantedDiv = block.querySelector('div > div');
  if (unwantedDiv) unwantedDiv.remove();

  // Append the title and subtitle to textDiv
  textDiv.appendChild(title);
  textDiv.appendChild(subtitle);

  // Append the link to linkDiv
  linkDiv.appendChild(link);

  // Append textDiv and linkDiv to the block
  block.appendChild(textDiv);
  block.appendChild(linkDiv);
}
