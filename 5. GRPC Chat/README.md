Para todos os exercícios defina o formato das mensagens e as operações de cada procedimento (i.e. serviço) com o auxílio de Protocol Buffers.  

1. Semelhante ao exercício de aulas anteriores, crie uma aplicação console que funcionará como chat ponto a ponto, onde um programa cliente utiliza gRPCpara se conectar a outro cliente.  

2. Baseado no exemplo anterior, crie uma nova versão para o chat, desta vez com suporte a conexão simultânea de vários clientes. Agora há um servidor que deve mediar a conexão dos vários clientes que se conectarem.  

Alguns requisitos:  
a. O servidor deve pedir ao usuário cliente para digitar um nome de modo que as mensagens de cada usuário possam ser identificadas.  
b. Ao se conectar ao servidor, o cliente recebe uma mensagem indicando quantos outros clientes estão conectados naquele momento.  
c. As mensagens enviadas por um cliente são replicadas para todos os outros clientes.  
d. Quando um cliente se desconectar, os outros clientes conectados deverão receber uma notificação.  

## De forma geral, quais as principais diferenças entre as implementações da calculadora e dos chats?
A necessidade de manter um usuário e sua identidade, assim como a natureza bem mais assíncrona de uma conversa, fazem do chat um desafio bem maior que a calculadora.