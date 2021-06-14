# Exercício de Sockets  
  
1. Semelhante ao exercício anterior com Sockets TCP, agora você utilizará sockets UDP para criar uma aplicação console que funcionará como chat ponto a ponto, onde um cliente se conecta a um Servidor e troca mensagens.  
Tanto no cliente como no servidor será possível digitar mensagens do chat a partir do console.  

2. Considere um servidor que fornece um serviço de calculadora remota "avançada" que disponibiliza as operações artiméticas de adição, subtração, multiplicação e divisão.  
Os aplicativos clientes que utilizam o serviço devem se conectar e enviar dois inteiros como parâmetro, junto com o parâmetro indicando qual operação deve ser efetuada.  
O servidor devolve como resposta à aplicação cliente o resultado da operação. O cliente pode ser uma aplicação console que recebe os parâmetros e a operação através do terminal.  
a. Implemente o cliente e servidor em TCP  
b. Implemente o cliente e servidor em UDP  

Pontos interessantes sobre TCPxUDP na implementação de jogos:  
https://www.youtube.com/watch?v=OuSf5g3Kv68  


## Quais as principais diferenças entre TCP e UDP?  
A conexão não é mantida no UDP, sendo bem mais livre que TCP  
O servidor não sabe que o usuário se desconectou, e o cliente não sabe se o servidor ainda está online  
  
## Quais as principais diferenças entre a implementação TCP e UDP (tanto do chat como da calculadora)?  
Não saber nem ou se importar que o usuário se desconectou, podendo manter as informações dele "ativas"  

## Quais as principais dificuldades nas implementações UDP?  
Ter que lidar diretamente com as informações da conexão ao invés de um socket  
Em especial, ter o mesmo IP quando testando no mesmo computador  

## Quando faz sentido usar TCP ou UDP?  
Em casos que é necessário um processo de "handshake", e quando é relevante saber que o cliente se desconectou, TCP é mais prático.  
UDP é bem mais simples e não se importa se o outro lado se desconectou.  
