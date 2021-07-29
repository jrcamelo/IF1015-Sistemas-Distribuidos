# Exercício: Chat com Web Sockets + EventSource  

## 1  
Semelhante aos exercícios com as tecnologias vistas anteriormente, escreva um chat em que clientes, através de um browser, usam WebSockets para se conectar a um servidor que media as mensagens entre os diferentes clientes.  

### Alguns requisitos:  

a. O servidor deve pedir ao usuário cliente para digitar um nome de modo que as mensagens de cada usuário possam ser identificadas.  
b. As mensagens enviadas por um cliente são replicadas para todos os outros clientes.  

### Exemplo hipotético de conversação:  
Alex: Muito bom esse servidor.  
Ze: vsf muito complicado programar com websockets  
Maria: Pra mim foi facinho. Vcs são enrolados.  
Alex: kkkkk  
Ze: LOL  

## 2  
Crie um recurso HTTP (i.e. uma URL) que representará uma visão “read-only” do chat. A implementação deverá utilizar Server-sent events para disponibilizar as mensagens da conversa do chat à medida que vão sendo enviadas pelos clientes que estão conectados ao chat, funcionando como um feed.  

## Questões para discussão:  
Quais as principais diferenças entre esta implementação e a implementação com sockets TCP?  
Quais as principais dificuldades com a implementação usando EventSource?  