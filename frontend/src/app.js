document.getElementById('healthBtn')?.addEventListener('click', async () => {
  const out = document.getElementById('healthOut');
  try {
    const res = await fetch('/health');
    const data = await res.json();
    out.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    out.textContent = 'Falha ao acessar /health. Verifique se o backend está rodando na 3000.';
  }
});
