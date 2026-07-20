const filters = [...document.querySelectorAll('[data-filter]')];
const mediumButtons = [...document.querySelectorAll('[data-medium]')];
const cards = [...document.querySelectorAll('.print-card')];
const bagCount = document.querySelector('[data-bag-count]');
const clearBag = document.querySelector('[data-clear-bag]');
const resultCount = document.querySelector('[data-result-count]');
const mediumLabel = document.querySelector('[data-medium-label]');
const selected = new Set();

const mediumNames = {
  paper: 'fine-art paper',
  cotton: 'textured cotton',
  canvas: 'stretched canvas'
};

filters.forEach((button) => button.addEventListener('click', () => {
  filters.forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  cards.forEach((card) => {
    const show = button.dataset.filter === 'all' || card.dataset.world === button.dataset.filter;
    card.hidden = !show;
    if (show) visible += 1;
  });
  resultCount.textContent = visible;
}));

mediumButtons.forEach((button) => button.addEventListener('click', () => {
  mediumButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  cards.forEach((card) => { card.dataset.preview = button.dataset.medium; });
  mediumLabel.textContent = mediumNames[button.dataset.medium];
}));

document.querySelectorAll('.collect').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.print-card');
  const name = card.dataset.name;
  if (selected.has(name)) {
    selected.delete(name);
    button.classList.remove('added');
    button.innerHTML = 'Add to print set <span>+</span>';
  } else {
    selected.add(name);
    button.classList.add('added');
    button.innerHTML = 'In print set <span>✓</span>';
  }
  bagCount.textContent = selected.size;
  clearBag.disabled = selected.size === 0;
}));

clearBag.addEventListener('click', () => {
  selected.clear();
  bagCount.textContent = '0';
  clearBag.disabled = true;
  document.querySelectorAll('.collect').forEach((button) => {
    button.classList.remove('added');
    button.innerHTML = 'Add to print set <span>+</span>';
  });
});

clearBag.disabled = true;
