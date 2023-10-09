export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // multi-columns block
  if (block.classList.contains('multi')) {
    const myColumns = block.querySelectorAll('.columns > div');
    myColumns.forEach((column) => {
      column.classList.add('column');
      // Get second div child with text
      const textDiv = column.children[1];
      textDiv.classList.add('text-div');
    });

    const textDivs = block.querySelectorAll('.text-div');
    textDivs.forEach((textDiv) => {
      // Get the title of text div
      const title = textDiv.children[0];
      title.classList.add('text-div-title');

      // Get the sub title of text div
      const subTitle = textDiv.children[1];
      subTitle.classList.add('sub-title');

      // Get the text div list of text div
      const textDivList = textDiv.children[2];
      textDivList.classList.add('text-div-list');

      // get the text div button of text div
      const textDivButton = textDiv.children[3];
      textDivButton.classList.add('text-div-button');
    });

    const hr = document.createElement('hr');

    hr.className = 'columns-hr';

    const myColumnsSection = document.querySelector('.section.columns-container');

    myColumnsSection.appendChild(hr);
  }

  if (block.classList.contains('left-pic')) {
    // Add classes to block
    block.children[0].classList.add('one-bloc-left-pics');

    // Update image container
    const imgContainer = block.querySelector('.columns-img-col');
    if (imgContainer) {
        imgContainer.classList.add('one-bloc-left-pics-picture');

        // Update image
        const img = imgContainer.querySelector('img');
        if (img) {
            img.classList.add('one-bloc-left-pics-picture-img');
        }
    }

    // Update text container
    const textContainer = block.children[0].querySelector('div > div:last-child');
    if (textContainer) {
        textContainer.classList.add('one-bloc-left-pics-description');

        // Update title
        const title = textContainer.querySelector('h2');
        if (title) {
            title.classList.add('one-bloc-left-pics-description-title');
        }

        // Update list
        const list = textContainer.querySelector('ul');
        if (list) {
            list.classList.add('one-bloc-left-pics-description-text');
        }

        // Create and insert additional text div
        //const firstParagraph = textContainer.querySelector('p:first-child');
        //const secondParagraph = textContainer.querySelector('p:nth-child(2)');
        const paragraphs = textContainer.querySelectorAll('p');
        const firstParagraph = paragraphs[0];
        const secondParagraph = paragraphs[1];
        if (firstParagraph && secondParagraph) {
            const additionalTextDiv = document.createElement('div');
            additionalTextDiv.style.textAlign = 'center';
            additionalTextDiv.innerHTML = `${firstParagraph.textContent}<br><span style="font-size:10px">${secondParagraph.textContent}</span>`;
            textContainer.insertBefore(additionalTextDiv, firstParagraph);
            
            // Remove old paragraphs
            firstParagraph.remove();
            secondParagraph.remove();
        }

        // Update link and append SVG
        const link = textContainer.querySelector('a');
        if (link) {
            link.setAttribute('target', '_top');
            link.className = '';
            // Append SVG to the link
            const svgElement = document.createElement('span');
            svgElement.innerHTML = '<svg width="14" height="10" style="margin-right:5px" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.14648 0.146447C8.34174 -0.0488155 8.65832 -0.0488155 8.85358 0.146447L13.3536 4.64645C13.5488 4.84171 13.5488 5.15829 13.3536 5.35355L8.85358 9.85355C8.65832 10.0488 8.34174 10.0488 8.14648 9.85355C7.95122 9.65829 7.95122 9.34171 8.14648 9.14645L11.7929 5.5H1.00003C0.723888 5.5 0.500031 5.27614 0.500031 5C0.500031 4.72386 0.723888 4.5 1.00003 4.5H11.7929L8.14648 0.853553C7.95122 0.658291 7.95122 0.341709 8.14648 0.146447Z" fill="#1264A3"></path></svg>';
            link.appendChild(svgElement);

            //Remove the parent <p> tag
            const parentP = link.parentElement;
            if(parentP && parentP.tagName == 'P') {
              textContainer.insertBefore(link, parentP);
              parentP.remove();
              //trying here to add some space since the padding and margin don't work - Accor do the same
              const emptyP = document.createElement('p');
              textContainer.insertBefore(emptyP, link);
            }
        }
    }
}

}