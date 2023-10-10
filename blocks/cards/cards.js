import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img
    .closest('picture')
    .replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    ));
  block.textContent = '';
  block.append(ul);

  // Creating the Features cards block
  if (block.classList.contains('features')) {
    // Add classes to block
    block.classList.add('box', 'row-blocs');

    // Update the main content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'row-blocs-content';
    block.appendChild(contentContainer);

    // Iterate over each card and update its structure and classes
    const cards = block.querySelectorAll('li');
    cards.forEach((card) => {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'row-blocs-usp-content';

      // Update image
      const imageDiv = card.querySelector('.cards-card-image');
      if (imageDiv) {
        const img = imageDiv.querySelector('img');
        if (img) {
          img.classList.add('picture', 'lazyloaded');
        }
        contentDiv.appendChild(imageDiv);
      }

      // Update body
      const bodyDiv = card.querySelector('.cards-card-body');
      if (bodyDiv) {
        const title = bodyDiv.querySelector('p:first-child');
        if (title) {
          title.classList.add('title');
        }

        const description = bodyDiv.querySelector('p:last-child');
        if (description) {
          description.classList.add('description');
        }

        contentDiv.appendChild(bodyDiv);
      }

      contentContainer.appendChild(contentDiv);
    });

    // Remove the original ul
    const ul1 = block.querySelector('ul');
    if (ul1) {
      ul1.remove();
    }
  }

  // Creating the Pictures cards block
  if (block.classList.contains('pictures')) {
    // Add classes to block
    block.classList.add('box', 'row-blocs');

    // Create the main content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'row-blocs-content';
    block.appendChild(contentContainer);

    // Iterate over each card and update its structure and classes
    const cards = block.querySelectorAll('li');
    cards.forEach((card) => {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'bloc-picture three';

      // Update image
      const imageDiv = card.querySelector('.cards-card-image');
      if (imageDiv) {
        const img = imageDiv.querySelector('img');
        if (img) {
          img.classList.add('bloc-picture-image', 'lazyloaded');
          img.setAttribute('data-src', img.src);
        }
        contentDiv.appendChild(img);
      }

      // Update body
      const bodyDiv = card.querySelector('.cards-card-body');
      if (bodyDiv) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'bloc-picture-description';

        const title = bodyDiv.querySelector('p:first-child');
        if (title) {
          const titleSpan = document.createElement('span');
          titleSpan.style.fontSize = '24px';
          titleSpan.innerHTML = `<strong style='font-weight:bold'><span style='color:#252339'>${title.textContent}</span></strong>`;
          descriptionDiv.appendChild(titleSpan);
        }
        const description = bodyDiv.querySelector('p:last-child');
        if (description) {
          const descriptionSpan = document.createElement('span');
          descriptionSpan.style.color = '#6F6E77';
          descriptionSpan.style.fontSize = '16px';
          descriptionSpan.textContent = description.textContent;
          descriptionDiv.appendChild(document.createElement('br'));
          descriptionDiv.appendChild(descriptionSpan);
        }
        contentDiv.appendChild(descriptionDiv);
      }
      contentContainer.appendChild(contentDiv);
    });

    // Remove the original ul
    const ul2 = block.querySelector('ul');
    if (ul2) {
      ul2.remove();
    }
  }

  if (block.classList.contains('push-area')) {
    // Add classes to block
    block.classList.add('box', 'push-area');

    // Create the main content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'push-area-content';
    block.appendChild(contentContainer);

    // Iterate over each card and update its structure and classes
    const cards = block.querySelectorAll('li');
    cards.forEach((card) => {
      const pushContainer = document.createElement('a');
      pushContainer.className = 'push-container';

      // Extract href from the button-container and set it to pushContainer
      const link = card.querySelector('.button-container a');
      if (link) {
        pushContainer.href = link.getAttribute('href');
      }

      // Update image
      const imageDiv = card.querySelector('.cards-card-image');
      if (imageDiv) {
        const img = imageDiv.querySelector('img');
        if (img) {
          img.classList.add('push-container-image', 'lazyloaded');
          img.setAttribute('data-src', img.src);
        }
        pushContainer.appendChild(img);
      }

      // Update body
      const bodyDiv = card.querySelector('.cards-card-body');
      if (bodyDiv) {
        const textDiv = document.createElement('div');
        textDiv.className = 'push-container-text';

        const title = bodyDiv.querySelector('h3');
        if (title) {
          title.className = 'title';
          textDiv.appendChild(title);
        }

        const paragraphs = bodyDiv.querySelectorAll('p:not(.button-container)');
        paragraphs.forEach((p) => {
          p.className = 'text';
          textDiv.appendChild(p);
        });

        pushContainer.appendChild(textDiv);
      }

      contentContainer.appendChild(pushContainer);
    });

    // Remove the original ul
    const ul3 = block.querySelector('ul');
    if (ul3) {
      ul3.remove();
    }
  }
}
