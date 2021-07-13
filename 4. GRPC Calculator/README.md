# Exercício de gRPC - Parte 1  

Para todos os exercícios defina o formato das mensagens e as operações de cada procedimento (i.e. serviço) com o auxílio de Protocol Buffers.  

1. Considere um servidor que fornece um serviço de calculadora remota "avançada" que disponibiliza as operações artiméticas de adição, subtração, multiplicação e divisão.  
Os aplicativos clientes que utilizam o serviço devem se conectar e enviar dois inteiros como parâmetro, junto com o parâmetro indicando qual operação deve ser efetuada.  
O servidor devolve como resposta à aplicação cliente o resultado da operação.  
O cliente pode ser uma aplicação console que recebe os parâmetros e a operação através do terminal.  

## Qual a vantagem de usar uma abordagem como gRPC ao invés de sockets?  
gRPC já possui o protocolo pronto para o cliente e servidor, sendo bem mais simples de trabalhar em cima.  
  
## Ainda comparando-se com a abordagem utilizando sockets, qual o papel do Protocol Buffer nos exercícios acima? Há algum aumento de complexidade?  
O protocol buffer dá o formato para a comunicação, informando tanto o cliente quanto o servidor o que eles podem fazer e esperar.  