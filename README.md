# Booksy 

Sistema de Gerenciamento de Biblioteca

## RFs ( Requisitos funcionais )

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível pesquisa por um livro(titulo ou autor)
- [x] Deve ser possível obter as informações do livro
- [x] Deve ser possível obter as informações da biblioteca
- [x] Deve ser possível definir os dias para entregar o livro
- [x] Deve ser possível fazer um pedido do livro
- [x] Deve ser possível favoritar um livro
- [x] Deve ser possível desfavoritar um livro
- [x] Deve ser possível visualizar livros favoritados
- [x] Deve ser possível avaliar o livro
- [x] Deve ser possível obter as avaliações do livro 
- [x] Deve ser possível comentar em um livro
- [x] Deve ser possível obter os comentarios no livro 
- [x] Deve ser possível obter as informações do livro alugado
- [x] Deve ser possível obter o histórico dos livros concluídos
- [x] Deve ser possível obter a quantidade de livros concluídos
- [x] Deve ser possível excluir o histórico de livros
- [x] Deve ser possível visualizar sugestões de livros mais avaliados
- [x] Deve ser possível visualizar sugestões de livros recém adicionados
- [x] Deve ser possível atualizar as informações de um perfil de usuário
- [x] Deve ser possível atualizar a foto de perfil do usuário
- [x] Deve ser possível cadastrar uma biblioteca
- [x] Deve ser possível se autenticar pelo email de cadastro da biblioteca
- [x] Deve ser possível cadastrar um livro
- [x] Deve ser possível visualizar livros cadastrados
- [x] Deve ser possível editar um livro cadastrado
- [x] Deve ser possível excluir um livro cadastrado 
- [x] Deve ser possível obter as informações do livro cadastrado
- [x] Deve ser possível responde os comentarios do livro
- [x] Deve ser possível visualizar os pedidos de livros
- [x] Deve ser possivel visualizar o perfil do usuário
- [x] Deve ser possivel negar o pedido de livro 
- [x] Deve ser possivel aceitar o pedido de livro 
- [x] Deve ser possível confirmar a entregar do livro ao usuário
- [x] Deve ser possível confirmar a devolução do livro a biblioteca
- [x] Deve ser possível visualizar os livros entregues
- [x] Deve ser possível visualizar a quantidade de livros entregues
- [x] Deve ser possível visualizar os livros não entregues
- [x] Deve ser possível visualizar a quantidade de livros não entregues
- [x] Deve ser possível confirmar a conclusão de um livro não entregue
- [x] Deve ser possível atualizar as informações de um perfil da biblioteca
- [x] Deve ser possível atualizar a foto de perfil da biblioteca


## RNs ( Regras de negócio )

- [ ] O usuário só pode definir no máximo 60 dias para entregar o livro
- [x] O usuário não pode se cadastrar com o email duplicado
- [ ] Os 60 dias para entragar o livro só vão contar a partir da entregar do livro ao usuário
- [ ] Os pedidos enviados para a biblioteca vão sumir se não respondido em 24horas
- [x] Apenas a biblioteca pode interagir com os pedidos

## RNFs ( Requisitos não-funcionais )

- [ ] Utilizar React + Tailwind no Front-end
- [x] Utilizar Node + TypeScript + Fastify no Back-end
- [x] Utilizar Bcrypt para hash de senha dos usuários
- [x] Utilizar o Zod para tipagem de dados
- [x] Utilizar Docker + PostgreSQL como Banco de dados
- [x] Utilizar PrismaORM para manipular o Banco de dados
- [ ] Utilizar autenticação JWT(JSON WEB TOKEN)
- [x] Utilizar sistema de roles RBAC

