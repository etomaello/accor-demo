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

  const myColumnsSection = document.querySelector('.section.columns-container');

  myColumnsSection.appendChild(hr);
}
