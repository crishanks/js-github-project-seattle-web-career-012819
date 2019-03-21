const BASE_REPOS_URL = "https://api.github.com/users/"
const BASE_SEARCH_URL = "https://api.github.com/search/users?q=";
const form = document.getElementById('github-form');
const userListUl = document.getElementById('user-list');
const reposListUl = document.getElementById('repos-list');

function addSubmitListener() {
  form.addEventListener('submit', (ev)=> {
    ev.preventDefault();
    reposListUl.innerHTML = '';
    requestUsers();
  });
}
addSubmitListener();

function requestUsers() {
  let input = document.getElementById('search').value;
  fetch(BASE_SEARCH_URL + input)
  .then(response => {
    return response.json();
  })
  .then(json=> {
    renderSearchResults(json);
  })
}

function renderSearchResults(data) {
  data.items.forEach((user) => {
    createUser(user);
  });
}

function createUser(user) {
  const li = document.createElement('li');
  const h2 = document.createElement('h2');
  h2.textContent = user.login;
  h2.setAttribute('href', user.html_url);
  const avatar = document.createElement('img');
  avatar.src = user.avatar_url;
  avatar.addEventListener('click', () => {
    userListUl.innerHTML = '';
    requestRepos(user);
  });

  userListUl.appendChild(li);
  li.appendChild(h2);
  li.appendChild(avatar);
  
}

function requestRepos(user) {
  fetch(BASE_REPOS_URL + user.login + "/repos")
  .then(results => {
    return results.json();
  })
  .then(json => {
    renderRepos(json);
  });
}

function renderRepos(data) {
  reposListUl.innerHTML = '';
  const name = document.createElement('h2');
  name.textContent = "User: " + data[0].owner.login;
  reposListUl.appendChild(name);
  data.forEach(repo => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = "Repo: " + repo.name;

    reposListUl.appendChild(li);
    li.appendChild(p);
  });

}