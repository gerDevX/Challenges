var container = document.getElementById('render');
var dataToRender = '';
var elementCard =
  '<div class="element-card">' +
  '<div class="card-contain"> ' +
  '<label id="name">(name)</label>' +
  '<label id="descript">(descript)</label>' +
  '<img src="(image)" title="(name)" alt="Team Card" />' +
  '</div>' +
  '</div>';

var data = [
  {
    fullName: 'Bill Mahoney',
    jobDescription: 'Product Owner',
    photo: 'assets/photo1.png',
  },
  {
    fullName: 'Saba Cabrera',
    jobDescription: 'Art Director',
    photo: 'assets/photo2.png',
  },
  {
    fullName: 'Shae Le',
    jobDescription: 'Tech Lead',
    photo: 'assets/photo3.png',
  },
  {
    fullName: 'Skylah Lu',
    jobDescription: 'Ux Designer',
    photo: 'assets/photo4.png',
  },
  {
    fullName: 'Griff Richards',
    jobDescription: 'Developer',
    photo: 'assets/photo5.png',
  },
  {
    fullName: 'Stan John',
    jobDescription: 'Developer',
    photo: 'assets/photo6.png',
  },
];

window.addEventListener('DOMContentLoaded', () => {
  var elements = [];
  Array.from(data).forEach((d) => {
    var item = elementCard.replaceAll('(name)', d.fullName);
    item = item.replaceAll('(descript)', d.jobDescription);
    item = item.replaceAll('(image)', d.photo);
    elements.push(item);
  });

  dataToRender = '';
  dataToRender += renderElements(elements);
  dataToRender += renderMobileElements(elements);
  container.innerHTML = dataToRender;
});

function renderElements(listElem) {
  var index = 1;
  var renderHtml = '<div class="row content">(render_data)</div>';
  var content = '';
  var renderData = '';
  Array.from(listElem).forEach((elem) => {
    content += elem;
    if (index == 3) {
      index = 0;
      renderData += renderHtml.replaceAll('(render_data)', content);
      content = '';
    }
    index++;
  });

  return renderData;
}

function renderMobileElements(listElem) {
  var index = 1;
  var renderHtml = '<div class="row mobile">(render_data)</div>';
  var contentMobile = '';
  var renderData = '';
  Array.from(listElem).forEach((elem) => {
    contentMobile += elem;
    if (index == 2) {
      index = 0;
      renderData += renderHtml.replaceAll('(render_data)', contentMobile);
      contentMobile = '';
    }
    index++;
  });

  return renderData;
}
