# Exercício de Sockets  
  
Considerando a questão 2 (calculadora) do exercício anterior, reimplemente o projeto levando em conta a construção de um protocolo simples para fazer a chamada de uma operação da calculadora, enviando os respectivos operandos e operador como parâmetros.  
Considere os componentes/módulos da arquitetura da imagem abaixo. A abstração usada para implementar a modularidade (funções, classes, etc) fica a cargo de vocês, mas que fique claro e bem separado o papel de cada componente (Client, Invoker, Marshaller, Unmarshaller, Invocation Handler).  

Detalhes importantes:  
- O Marshalling/Unmarshalling deve ser binário (não deverá usar JSON)  
- Use módulos nativos do Node.js (não é necessário instalar nada através do npm)  
O exercício deverá ser implementado tanto para UDP como para TCP.  

  
## Quais as principais dificuldades de implementação?  
Lidar com o baixo nível do Marshalling foi bem mais complicado que o esperado  
  
## Como poderia ser feito o tratamento de erros?  
Fiz com que o servidor retornasse um HTTP Status Code junto da mensagem, mas poderia ser por texto também  
  
## Haveria alguma razão para se implementar um mecanismo de numeração/identificação de mensagens neste protocolo?  
Não vejo razão, a calculadora é bem simples e stateless  
  