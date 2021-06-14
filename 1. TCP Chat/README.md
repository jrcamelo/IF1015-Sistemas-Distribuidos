# Exercício de Sockets  
  
1. Semelhante ao exemplo do vídeo anterior, crie uma aplicação console que funcionará como chat ponto a ponto, onde um cliente utiliza socket1 para se conectar a um Servidor.  
Tanto no cliente como no servidor será possível digitar mensagens do chat a partir do console.   

2. Baseado no exemplo anterior, crie uma nova versão para o chat, desta vez com suporte a conexão simultânea de vários clientes. Agora o servidor não necessita mais receber texto do console. Ele será apenas o mediador das mensagens entre os vários clientes conectados.  

Alguns requisitos:  
a. O servidor deve pedir ao usuário cliente para digitar um nome de modo que as mensagens de cada usuário possam ser identificadas.  
b. As mensagens enviadas por um cliente são replicadas para todos os outros clientes.  
  
Exemplo hipotético de conversação:  
##### Alex: Muito bom esse servidor.  
##### Ze: vsf muito complicado programar com sockets  
##### Maria: Pra mim foi facinho. Vcs são enrolados.  
##### Alex: kkkkk  
##### Ze: LOL  

## Quais as principais dificuldades?  
Identificar os diferentes usuários, especialmente considerando que todos vieram do mesmo IP e porta.  

## Quais as principais diferenças entre a implementação da questão 1 e da questão 2?  
A gerência de múltiplos usuários e sua consequente identificação, assim como o broadcast das mensagens de um usuário para os outros.

## Como gerenciar as conexões entre clientes na questão 2?  
Utilizei de um dicionário com o nome dos usuários e sua conexão, embora pudesse usar uma lista também.  

## Como identificar as mensagens e os remetentes para seguir a formatação do exemplo?  
Fiz com que o servidor esperasse que a primeira mensagem sempre fosse o nome do usuário que está conectando, evitando também duplicatas.  
