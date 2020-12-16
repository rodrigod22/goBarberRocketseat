# Recuperação de senha
  **RF** -> requisitos funcionais

    - O usuario deve poder recuperar sua senha informando o email
    - O usuario deve receber um email con instrucoes de recuperacao de senha
    - O usuario deve poder resetar sua senha

  **RNF** => requisitos não funcionais

    - utilizar MailTrap para testar envios de email em ambiente de dev
    - utilizar Amazon SES para envios em produção
    - o envio de emails deve acontecer em segundo plano (background job)

  **RN** => regras de negocio

    - o link enviado por email para resetar senha deve experar em 2 horas;
    - o usuario onfirmar a nova senha a resetar a a senha

# Atualização do Perfil

  **RF** -> requisitos funcionais

    - O usuario deve poder atualizar seu nome, email e senha

  **RN** => regras de negocio

    - o usuario nao pode alterar seu email para um email ja utilizado
    - para atualizar a senha o usuario deve informa a senha antiga
    - para atualizar a senha o usuario precisa confirmar a nova senha

# Painel do prestador

 **RF** -> requisitos funcionais

    - O usuario deve poder listar seus agendamentos de um dia especifico
    - O prestador deve receber uma notificação sempre que houver um novo agendamento
    - prestador deve poder visualizar as notificaçoes nao lidas

  **RNF** => requisitos não funcionais

    - agendamentos do prestador do dia devem ser armazenados em cache
    - as notificações do prestador devem ser armazenadas no MongoDB;
    - as notificaçoes do prestador devem ser enviadas em tempo real utilizando socket.io

  **RN** => regras de negocio
    - A notificação deve ter um status de lida ou não lida para que o prestador posso controlar

# Agendamento de Serviços

 **RF** -> requisitos funcionais

    - O usuario deve poder listar todos os prestadores de servico
    - O usuario deve poder listar os dias de um mes com pelo menos 1 horario disponivel de um prestador
    - O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador
    o usuario deve poder realizar um novo agendamento com um prestador

  **RN** => regras de negocio

    - cada agendamento deve durar 1h exatamento
    - os agendamentos devem estar disponiveis entre 8h as 18h (primeiro 8h ultimo 17h)
    - o usuario nao pode agendar um horario ja ocupado
    - o usuario nao pode agendar um horario que ja passou
    - o usuario nao pode agendar serviços consigo mesmo


