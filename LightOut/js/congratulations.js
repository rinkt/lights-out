'use strict';

{
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const congratulations = document.getElementById('congratulations');
  const mask = document.getElementById('mask');

  // open.addEventListener('click', () => {
  //   congratulations.classList.remove('hidden');
  //   mask.classList.remove('hidden');
  // });

  close.addEventListener('click', () => {
    congratulations.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener('click', () => {
    close.click();
  });
}