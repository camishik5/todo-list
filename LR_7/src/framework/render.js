const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template.trim(); // Убираем лишние пробелы

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!component || typeof component.getElement !== 'function') {
    throw new Error('Component is not valid, it must have a getElement method');
  }

  if (!container) {
    throw new Error("Container element doesn't exist");
  }

  container.insertAdjacentElement(place, component.getElement());
}

export { RenderPosition, createElement, render };
