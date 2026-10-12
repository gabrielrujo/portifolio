// Todo o conteúdo do portfólio vive aqui.
// Itens marcados com "SUBSTITUIR" são provisórios: troque pelos seus dados reais.
// Este arquivo também alimenta o <title>, a descrição e as tags Open Graph
// do index.html (veja vite.config.js), então reinicie o `npm run dev` após editar `site`.

export const site = {
  // SUBSTITUIR: domínio final. Usado nas tags Open Graph (WhatsApp exige URL absoluta na imagem).
  url: "https://seu-dominio.com.br",
  title: "Gabriel Teixeira · Sites para pequenos negócios e profissionais",
  description:
    "Sites bonitos e rápidos para pequenos negócios e profissionais, e automações em Python. Fale comigo pelo WhatsApp.",
  ogImage: "/og-image.png",
  locale: "pt_BR",
}

export const profile = {
  name: "Gabriel Teixeira",
  firstName: "Gabriel",
  initials: "GT",
  role: "Desenvolvedor web freelancer",
  headline: "Sites bonitos e rápidos para pequenos negócios e profissionais",
  // SUBSTITUIR: sua bio curta, em primeira pessoa.
  bio: "Eu crio sites sob medida para escritórios, clínicas, restaurantes e lojas que precisam aparecer bem no Google e receber contato pelo WhatsApp. Também escrevo automações em Python para tirar tarefas repetitivas da sua rotina.",
  // Foto do perfil do GitHub (460×460). Para trocar, substitua public/photo.jpg.
  photo: "/photo.jpg",
  photoAlt: "Foto de Gabriel Teixeira",
  // SUBSTITUIR: cidade/estado.
  location: "Brasil · atendimento remoto",
  email: "ujo.gabri.pro@gmail.com",
  // SUBSTITUIR: número com DDI e DDD, só dígitos (ex.: 5511912345678).
  whatsapp: "5500000000000",
  whatsappMessage: "Olá, Gabriel! Vi seu portfólio e quero conversar sobre um site.",
  github: "https://github.com/gabrielrujo",
  // SUBSTITUIR: seus perfis.
  linkedin: "https://www.linkedin.com/in/SEU-USUARIO",
  instagram: "https://www.instagram.com/SEU-USUARIO",
}

export function whatsappUrl(message = profile.whatsappMessage) {
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`
}

export const nav = {
  links: [
    { label: "Projetos", href: "#projetos" },
    { label: "Serviços", href: "#servicos" },
    { label: "Automações", href: "#automacoes" },
    { label: "Planos", href: "#planos" },
    { label: "Como trabalho", href: "#processo" },
    { label: "Contato", href: "#contato" },
  ],
  cta: "Falar no WhatsApp",
  menuLabel: "Abrir menu",
  menuTitle: "Navegação",
  theme: {
    label: "Alterar tema",
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
  },
}

export const hero = {
  badge: "Disponível para novos projetos",
  // Cada item é uma linha do título; a última aparece na cor de destaque.
  headline: ["Sites que vendem.", "Feitos sob medida.", "Para o seu negócio."],
  subheadline:
    "Eu crio sites rápidos e bem acabados para pequenos negócios e profissionais, com contato direto pelo WhatsApp. E escrevo automações em Python para tirar o trabalho repetitivo da sua rotina.",
  primaryCta: "Ver projetos",
  secondaryCta: "Falar no WhatsApp",
  microcopy: ["Prévia antes de fechar", "50% na entrada", "Suporte após a entrega"],
  socialLabel: "Redes e contato",
  stackLabel: "Tecnologias que eu uso",
  stack: ["React", "Vite", "Tailwind CSS", "Three.js", "Motion", "Python", "Vercel", "Figma"],
  laptopLabel: "Notebook em 3D mostrando capturas de tela dos meus projetos",
}

// Textos dos controles das janelas estilo macOS.
export const windowLabels = {
  close: "Fechar janela",
  minimize: "Minimizar janela",
  restore: "Restaurar janela",
  maximize: "Abrir em tela cheia",
  exitFullscreen: "Sair da tela cheia",
  reopen: "Reabrir",
}

export const projects = {
  eyebrow: "Projetos",
  title: "Trabalhos recentes",
  intro: "Um site para cliente real e projetos de demonstração. Use as setas, arraste ou clique nos lados para navegar.",
  labels: { real: "Cliente real", demo: "Projeto de demonstração" },
  problemLabel: "O problema",
  solutionLabel: "O que eu fiz",
  linkLabel: "Ver site",
  carousel: {
    label: "Projetos em destaque",
    previous: "Projeto anterior",
    next: "Próximo projeto",
    goTo: "Mostrar projeto",
    position: (i, n, title) => `Projeto ${i} de ${n}: ${title}`,
  },
  filter: {
    label: "Filtrar projetos",
    all: "Todos",
    real: "Clientes",
    demo: "Demonstrações",
    gridTitle: "Todos os projetos",
    empty: "Nenhum projeto nesta categoria ainda.",
  },
  // Confira as `tags` de cada projeto: devem ser as tecnologias que você realmente usou.
  // As capturas em public/projects/ são geradas por `npm run screenshots`
  // a partir das URLs abaixo (<id>-desktop.jpg e <id>-mobile.jpg).
  items: [
    {
      id: "lr-advocacia",
      kind: "real",
      title: "LR Advocacia",
      window: "lr.adv.br",
      description: "Site institucional para um escritório de direito ambiental.",
      problem:
        "O escritório dependia de indicações e não tinha um lugar para mostrar as áreas de atuação. Quem procurava no Google não encontrava um contato direto.",
      solution:
        "Um site institucional sóbrio, com áreas de atuação, apresentação do escritório e contato pelo WhatsApp sempre à mão. Leve para abrir rápido no celular.",
      tags: ["React", "Tailwind CSS", "SEO", "Responsivo"],
      url: "https://lr.adv.br",
    },
    {
      id: "ciclo",
      kind: "demo",
      title: "Ciclo",
      window: "ciclo-refrigerante.vercel.app",
      description: "Marca de refrigerante sustentável com uma lata em 3D interativa.",
      problem:
        "Uma marca nova de refrigerante sustentável precisava chamar atenção no lançamento e explicar a proposta em poucos segundos.",
      solution:
        "Landing page com uma lata em 3D interativa no centro da página, apresentando sabores, ingredientes e a proposta sustentável da marca.",
      tags: ["React", "Three.js", "Motion", "3D"],
      url: "https://ciclo-refrigerante.vercel.app/",
    },
    {
      id: "ateli",
      kind: "demo",
      title: "Ateli",
      window: "ateli-five.vercel.app",
      // SUBSTITUIR: descrição curta do projeto (uma linha), problema e solução.
      description: "Site para um estúdio de arquitetura e interiores (texto provisório).",
      problem: "Texto provisório: qual problema este projeto resolve.",
      solution: "Texto provisório: o que foi construído.",
      tags: ["React", "Tailwind CSS"],
      url: "https://ateli-five.vercel.app/",
    },
  ].map((p) => ({ ...p, images: { desktop: `/projects/${p.id}-desktop.jpg`, mobile: `/projects/${p.id}-mobile.jpg` } })),
}

export const services = {
  eyebrow: "Serviços",
  title: "O que eu faço por você.",
  items: [
    {
      id: "institucional",
      icon: "briefcase",
      title: "Sites para empresas e profissionais",
      text: "Para escritórios, clínicas, consultórios e prestadores de serviço que precisam ser encontrados e passar confiança.",
    },
    {
      id: "restaurantes",
      icon: "store",
      title: "Sites para restaurantes e lojas",
      text: "Cardápio ou catálogo fácil de atualizar, com pedido enviado direto para o seu WhatsApp, sem taxa de aplicativo.",
    },
    {
      id: "landing",
      icon: "layout",
      title: "Landing pages",
      text: "Uma página focada em um objetivo: divulgar um lançamento, um curso, um evento ou captar contatos de uma campanha.",
    },
    {
      id: "python",
      icon: "terminal",
      title: "Automações em Python",
      text: "Scripts que fazem por você o trabalho repetitivo: planilhas, relatórios, envio de e-mails e coleta de dados.",
    },
  ],
  more: "Ver exemplos de automação",
}

// Vitrine de automações em Python. Os dados das prévias (planilhas, produtos, valores)
// são exemplos ilustrativos, não resultados de clientes.
export const automations = {
  eyebrow: "Automações",
  title: "Automações em Python",
  lead: "Deixe o computador fazer o trabalho repetitivo.",
  tabsLabel: "Exemplos de automação",
  replay: "Rodar de novo",
  logLabel: "Saída do script",
  waiting: "Executando o script…",
  previewLabel: "Resultado",
  before: "Antes",
  after: "Depois",
  cta: {
    text: "Tem uma tarefa repetitiva? Me conta que eu automatizo.",
    button: "Falar no WhatsApp",
    message: "Olá, Gabriel! Tenho uma tarefa repetitiva que quero automatizar. É assim: ",
  },
  items: [
    {
      id: "relatorio",
      icon: "chart",
      label: "Relatório de vendas",
      summary:
        "Lê a planilha de vendas e gera um relatório com os totais do mês, os produtos mais vendidos e um gráfico.",
      file: "relatorio_vendas.py",
      command: "python relatorio_vendas.py outubro",
      log: [
        "Lendo vendas_outubro.xlsx... 1.248 linhas",
        "Somando os totais do mês...",
        "Separando os produtos mais vendidos...",
        "Gerando gráfico...",
        "Relatório salvo em relatorio_outubro.xlsx ✓",
      ],
      before: "Copiar e colar dados entre planilhas por horas, toda semana.",
      after: "Um clique e o relatório está pronto, sempre no mesmo formato.",
      preview: {
        title: "Vendas por semana · outubro",
        bars: [
          { label: "Sem 1", value: 58 },
          { label: "Sem 2", value: 74 },
          { label: "Sem 3", value: 66 },
          { label: "Sem 4", value: 92 },
        ],
        topTitle: "Mais vendidos",
        top: ["Café especial 250 g", "Pão de queijo (kg)", "Bolo de cenoura"],
      },
      code: `import pandas as pd
import matplotlib.pyplot as plt

vendas = pd.read_excel("vendas_outubro.xlsx")
print(f"Lendo vendas_outubro.xlsx... {len(vendas)} linhas")

# Totais por semana e produtos mais vendidos
por_semana = vendas.groupby("semana")["valor"].sum()
top = vendas.groupby("produto")["quantidade"].sum().nlargest(5)

por_semana.plot(kind="bar", title="Vendas por semana")
plt.savefig("grafico_outubro.png")

with pd.ExcelWriter("relatorio_outubro.xlsx") as arquivo:
    por_semana.to_excel(arquivo, sheet_name="Semanas")
    top.to_excel(arquivo, sheet_name="Mais vendidos")
print("Relatório salvo em relatorio_outubro.xlsx")`,
    },
    {
      id: "orcamento",
      icon: "file",
      label: "Orçamentos em PDF",
      summary:
        "Você preenche o cliente e os itens numa planilha, e o script gera o orçamento em PDF com a marca da empresa.",
      file: "gerar_orcamento.py",
      command: "python gerar_orcamento.py",
      log: [
        "Lendo orcamentos.xlsx... cliente: Padaria Bom Dia",
        "Calculando 4 itens e o total...",
        "Aplicando logo e cores da empresa...",
        "Orçamento salvo em orcamento_0042.pdf ✓",
      ],
      before: "Montar cada orçamento à mão num editor de texto, conferindo as contas.",
      after: "Preenche a planilha, roda o script e o PDF sai pronto para enviar.",
      preview: {
        company: "Sua Empresa",
        number: "Orçamento nº 0042",
        client: "Padaria Bom Dia",
        date: "15/10",
        items: [
          { name: "Site institucional", value: "R$ 650,00" },
          { name: "Cardápio on-line", value: "R$ 200,00" },
          { name: "Fotos dos produtos", value: "R$ 150,00" },
          { name: "Domínio (1 ano)", value: "R$ 40,00" },
        ],
        total: "R$ 1.040,00",
        totalLabel: "Total",
        clientLabel: "Cliente",
      },
      code: `import pandas as pd
from fpdf import FPDF

dados = pd.read_excel("orcamentos.xlsx")
cliente = dados["cliente"].iloc[0]
print(f"Lendo orcamentos.xlsx... cliente: {cliente}")

pdf = FPDF()
pdf.add_page()
pdf.image("logo.png", x=10, y=10, w=30)
pdf.set_font("Helvetica", size=12)
pdf.cell(0, 30, f"Orçamento para {cliente}", ln=True)

for _, item in dados.iterrows():
    pdf.cell(140, 8, item["item"])
    pdf.cell(0, 8, f"R$ {item['valor']:.2f}", ln=True)

pdf.cell(0, 12, f"Total: R$ {dados['valor'].sum():.2f}")
pdf.output("orcamento_0042.pdf")
print("Orçamento salvo em orcamento_0042.pdf")`,
    },
    {
      id: "estoque",
      icon: "box",
      label: "Estoque com alerta",
      summary: "Confere o estoque todo dia e avisa quando um produto está acabando, antes de faltar.",
      file: "alerta_estoque.py",
      command: "python alerta_estoque.py",
      log: [
        "Lendo estoque.xlsx... 86 produtos",
        "Comparando com o estoque mínimo...",
        "2 produtos abaixo do mínimo",
        "Alerta enviado por e-mail ✓",
      ],
      before: "Descobrir que um produto acabou só quando o cliente pede.",
      after: "O aviso chega no seu e-mail com o que precisa ser reposto.",
      preview: {
        headers: ["Produto", "Estoque", "Mínimo", "Situação"],
        rows: [
          { name: "Farinha de trigo 5 kg", stock: 42, min: 15 },
          { name: "Fermento biológico", stock: 6, min: 10 },
          { name: "Açúcar refinado 1 kg", stock: 28, min: 12 },
          { name: "Embalagem kraft P", stock: 9, min: 50 },
        ],
        ok: "OK",
        low: "Estoque baixo",
      },
      code: `import pandas as pd
import smtplib
from email.message import EmailMessage

estoque = pd.read_excel("estoque.xlsx")
print(f"Lendo estoque.xlsx... {len(estoque)} produtos")

baixo = estoque[estoque["quantidade"] < estoque["minimo"]]
print(f"{len(baixo)} produtos abaixo do mínimo")

if len(baixo) > 0:
    aviso = EmailMessage()
    aviso["Subject"] = "Estoque baixo"
    aviso.set_content(baixo.to_string(index=False))
    with smtplib.SMTP_SSL("smtp.seuprovedor.com.br") as smtp:
        smtp.login("usuario", "senha")
        smtp.send_message(aviso, to_addrs=["compras@suaempresa.com.br"])
    print("Alerta enviado por e-mail")`,
    },
  ],
}

export const plans = {
  eyebrow: "Planos",
  title: "Preço fechado, combinado antes de começar.",
  intro: "Domínio e hospedagem ficam no seu nome. Você é dono do site.",
  popular: "Mais escolhido",
  payment: "50% de entrada, 50% na entrega",
  cta: "Pedir orçamento",
  automation: {
    title: "Automações",
    price: "a partir de R$ 300",
    text: "Scripts em Python para planilhas, relatórios, orçamentos e alertas. O valor final depende da tarefa e é combinado antes de começar.",
    link: "Ver exemplos",
    cta: "Pedir orçamento",
  },
  items: [
    {
      id: "basico",
      name: "Básico",
      price: "R$ 350",
      description: "Uma página bem feita para começar a aparecer.",
      // SUBSTITUIR: ajuste o escopo ao que você realmente oferece.
      features: [
        "Site de página única",
        "Até 5 seções",
        "Botão de WhatsApp",
        "Adaptado para celular",
        "Publicação do site",
      ],
    },
    {
      id: "completo",
      name: "Completo",
      price: "R$ 650",
      popular: true,
      description: "O site completo para o seu negócio.",
      features: [
        "Até 5 páginas",
        "Tudo do Básico",
        "Formulário de contato",
        "Mapa e redes sociais",
        "SEO básico e Google Meu Negócio",
        "2 rodadas de ajustes",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 1.200",
      description: "Mais recursos e acompanhamento depois da entrega.",
      features: [
        "Até 10 páginas",
        "Tudo do Completo",
        "Cardápio, catálogo ou blog",
        "Animações sob medida",
        "3 meses de manutenção inclusos",
      ],
    },
  ],
}

export const process = {
  eyebrow: "Como trabalho",
  title: "Quatro etapas, com você acompanhando cada uma.",
  steps: [
    {
      title: "Conversa sobre o negócio",
      text: "Entendo o que você faz, quem são seus clientes e o que o site precisa resolver. Saímos com escopo e preço fechados.",
    },
    {
      title: "Prévia do site",
      text: "Monto uma primeira versão navegável, com seus textos e fotos, para você ver no celular e no computador.",
    },
    {
      title: "Ajustes",
      text: "Você aponta o que mudar e eu ajusto. Textos, cores, ordem das seções: tudo antes de ir para o ar.",
    },
    {
      title: "Publicação e suporte",
      text: "Coloco o site no ar no seu domínio, configuro o Google e fico à disposição para dúvidas depois da entrega.",
    },
  ],
}

export const testimonial = {
  eyebrow: "Depoimento",
  // SUBSTITUIR: texto real do cliente. Enquanto `placeholder` for true,
  // a página mostra um aviso de "texto provisório".
  placeholder: true,
  placeholderLabel: "Texto provisório",
  quote:
    "O Gabriel entendeu rápido o que o escritório precisava. O site ficou sóbrio, carrega rápido e hoje boa parte dos contatos novos chega pelo botão de WhatsApp.",
  name: "Nome do cliente",
  role: "LR Advocacia",
  initials: "LR",
}

// Faixas de chamada que aparecem depois de Projetos e depois de Planos.
export const ctaBands = {
  afterProjects: {
    title: "Quer um site assim para o seu negócio?",
    text: "Me conte o que você faz e eu digo como o site pode ajudar.",
  },
  afterPlans: {
    title: "Não sabe qual plano escolher?",
    text: "Me chame no WhatsApp e a gente decide junto, sem compromisso.",
  },
  button: "Falar no WhatsApp",
}

export const contact = {
  eyebrow: "Contato",
  title: "Vamos conversar sobre o seu site?",
  text: "Me chame no WhatsApp ou mande um e-mail contando um pouco do seu negócio. Respondo pessoalmente.",
  whatsappCta: "Falar no WhatsApp",
  emailLabel: "E-mail",
  copy: "Copiar e-mail",
  copied: "E-mail copiado",
  copyError: "Não deu para copiar. Selecione o e-mail e copie manualmente.",
  dockLabel: "Links de contato",
}

export const footer = {
  note: "Feito por mim, com React, Tailwind CSS, Motion e Three.js.",
  backToTop: "Voltar ao topo",
}

export const floatingWhatsapp = {
  label: "Falar no WhatsApp",
}
