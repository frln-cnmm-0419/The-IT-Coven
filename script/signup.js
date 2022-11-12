$(document).ready( e => {
  const redir = document.getElementById('toLi');

  $(redir).click(x => {
    location.href = './login.html';
  });
});