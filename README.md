# Booksy 

Sistema de Gerenciamento de Biblioteca

## RFs ( Requisitos funcionais )

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [ ] Deve ser possível pesquisa por um livro(titulo ou nome do autor)
- [ ] Deve ser possível obter as informações do livro
- [ ] Deve ser possível obter as informações da biblioteca
- [x] Deve ser possível definir os dias para entregar o livro
- [x] Deve ser possível fazer um pedido do livro
- [x] Deve ser possível salva um livro
- [x] Deve ser possível avaliar o livro
- [x] Deve ser possível comentar em um livro
- [ ] Deve ser possível obter as informações do livro alugado
- [ ] Deve ser possível obter o histórico dos livros concluídos
- [ ] Deve ser possível obter a quantidade de livros concluídos
- [ ] Deve ser possível excluir o histórico de livros
- [ ] Deve ser possível visualizar sugestões de livros mais avaliados
- [ ] Deve ser possível visualizar sugestões de livros recém adicionados
- [ ] Deve ser possível atualizar as informações de um perfil de usuário
- [ ] Deve ser possível atualizar a foto de perfil do usuário
- [x] Deve ser possível cadastrar uma biblioteca
- [ ] Deve ser possível se autenticar pelo email de cadastro da biblioteca
- [x] Deve ser possível cadastrar um livro
- [ ] Deve ser possível visualizar livros cadastrados
- [ ] Deve ser possível editar um livro cadastrado
- [ ] Deve ser possível excluir um livro cadastrado 
- [ ] Deve ser possível obter as informações do livro cadastrado
- [ ] Deve ser possível notificar novos comentarios no livro
- [ ] Deve ser possível responde os comentarios do livro
- [ ] Deve ser possível visualizar os pedidos de livros
- [ ] Deve ser possivel visualizar o perfil do usuário
- [ ] Deve ser possivel negar o pedido de livro 
- [ ] Deve ser possivel aceitar o pedido de livro 
- [ ] Deve ser possível confirmar a entregar do livro ao usuário
- [ ] Deve ser possível confirmar a devolução do livro a biblioteca
- [ ] Deve ser possível visualizar os livros entregues
- [ ] Deve ser possível visualizar a quantidade de livros entregues
- [ ] Deve ser possível visualizar os livros não entregues
- [ ] Deve ser possível visualizar a quantidade de livros não entregues
- [ ] Deve ser possível confirmar a conclusão de um livro não entregue
- [ ] Deve ser possível atualizar as informações de um perfil da biblioteca
- [ ] Deve ser possível atualizar a foto de perfil da biblioteca


## RNs ( Regras de negócio )

- [ ] O usuário só pode definir no máximo 60 dias para entregar o livro
- [ ] O usuário não pode se cadastrar com o email duplicado
- [ ] Os 60 dias para entragar o livro só vão contar a partir da entregar do livro ao usuário
- [ ] Os pedidos enviados para a biblioteca vão sumir se não respondido em 24horas
- [ ] Apenas a biblioteca pode interagir com os pedidos

## RNFs ( Requisitos não-funcionais )

- [ ] Utilizar React + Tailwind no Front-end
- [x] Utilizar Node + TypeScript + Fastify no Back-end
- [ ] Utilizar Bcrypt para hash de senha dos usuários
- [ ] Utilizar o Zod para tipagem de dados
- [x] Utilizar Docker + PostgreSQL como Banco de dados
- [x] Utilizar PrismaORM para manipular o Banco de dados
- [ ] Utilizar autenticação JWT(JSON WEB TOKEN)
- [ ] Utilizar sistema de roles RBAC

