import { api } from './api.js';

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await api.login({ email, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = 'dashboard.html';
  } catch (err) {
    alert(err.response?.data?.message || 'Erro ao logar');
  }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    await api.register({ username, email, password });
    alert('Registro concluído! Faça login.');
    window.location.href = 'index.html';
  } catch (err) {
    alert(err.response?.data?.message || 'Erro ao registrar');
  }
});
