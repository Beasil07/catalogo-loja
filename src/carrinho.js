// Regras do carrinho, sem dependência da tela. O carrinho é um objeto { idDoProduto: quantidade }.

export const NUMERO_WHATSAPP = '5500000000000'; // número fictício: troque pelo número da loja

export const moeda = centavos =>
  (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function alterarQuantidade(carrinho, id, diferenca) {
  const quantidade = (carrinho[id] ?? 0) + diferenca;
  const { [id]: _removido, ...resto } = carrinho;
  return quantidade > 0 ? { ...resto, [id]: quantidade } : resto;
}

export function itensDoCarrinho(carrinho, produtos) {
  return produtos
    .filter(produto => carrinho[produto.id])
    .map(produto => ({ ...produto, quantidade: carrinho[produto.id] }));
}

export const calcularTotal = itens =>
  itens.reduce((total, item) => total + item.preco * item.quantidade, 0);

export function filtrarProdutos(produtos, busca, categoria) {
  const texto = busca.trim().toLocaleLowerCase('pt-BR');
  return produtos.filter(produto =>
    (categoria === 'Todos' || produto.categoria === categoria) &&
    produto.nome.toLocaleLowerCase('pt-BR').includes(texto));
}

export function criarLinkWhatsApp(itens) {
  const linhas = itens.map(item =>
    `${item.quantidade}x ${item.nome}: ${moeda(item.preco * item.quantidade)}`);
  const mensagem = ['Olá! Quero fazer este pedido:', ...linhas, `Total: ${moeda(calcularTotal(itens))}`].join('\n');
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

// Mantém somente produtos que existem e quantidades válidas, caso o dado salvo esteja corrompido.
export function limparCarrinhoSalvo(dados, produtos) {
  if (typeof dados !== 'object' || dados === null) return {};
  return Object.fromEntries(Object.entries(dados).filter(([id, quantidade]) =>
    produtos.some(produto => String(produto.id) === id) && Number.isInteger(quantidade) && quantidade > 0));
}
