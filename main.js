document.addEventListener('DOMContentLoaded', () => {
  const avatar = document.querySelector('.profile-avatar')
  const nameProfile = document.querySelector('.profile-name')
  const titleUsername = document.querySelector('.profile-username')
  const userInput = document.getElementById('user')
  const btn = document.getElementById('btn')
  const reposite = document.querySelector('.reposite')
  const seguindo = document.querySelector('.seguindo')
  const seguidores = document.querySelector('.seguidores')
  const linkProfile = document.querySelector('.profile-link')

  function buscarPerfil(usuario) {
    const URL = `https://api.github.com/users/${usuario}`

    fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar usuário: ' + response.status)
        }
        return response.json()
      })
      .then(data => {
        avatar.src = data.avatar_url
        nameProfile.innerText = data.name || 'Sem nome público'
        titleUsername.innerText = `@${data.login}`
        userInput.value = data.login
        reposite.innerText = data.public_repos
        seguindo.innerText = data.following
        seguidores.innerText = data.followers
        linkProfile.href = data.html_url
        linkProfile.innerText = 'Ver no GitHub'
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error)
        alert('Usuário não encontrado.')
      })
  }

  btn.addEventListener('click', event => {
    event.preventDefault()
    const usuario = userInput.value.trim()
    if (usuario) {
      buscarPerfil(usuario)
    } else {
      alert('Digite um nome de usuário válido. Exemplo: Monique-Duarte')
    }
  })

})