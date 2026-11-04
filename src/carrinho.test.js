import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  alterarQuantidade, calcularTotal, criarLinkWhatsApp, filtrarProdutos, itensDoCarrinho, limparCarrinhoSalvo,
} from './carrinho.js';
import { PRODUTOS } from './produtos.js';

test('catálogo tem pelo menos 12 produtos com ids únicos', () => {
  assert.ok(PRODUTOS.length >= 12);
  assert.equal(new Set(PRODUTOS.map(produto => produto.id)).size, PRODUTOS.length);
});

test('adiciona, aumenta, diminui e remove item', () => {
  let carrinho = alterarQuantidade({}, 1, 1);
  carrinho = alterarQuantidade(carrinho, 1, 1);
  assert.deepEqual(carrinho, { 1: 2 });
  carrinho = alterarQuantidade(carrinho, 1, -1);
  assert.deepEqual(carrinho, { 1: 1 });
  assert.deepEqual(alterarQuantidade(carrinho, 1, -1), {});
});

test('calcula o total com as quantidades', () => {
  const itens = itensDoCarrinho({ 1: 2, 4: 1 }, PRODUTOS);
  assert.equal(calcularTotal(itens), 4990 * 2 + 2990);
});

test('filtra por categoria e por nome sem diferenciar maiúsculas', () => {
  assert.equal(filtrarProdutos(PRODUTOS, '', 'Brincos').length, 3);
  assert.deepEqual(filtrarProdutos(PRODUTOS, 'COURO', 'Todos').map(produto => produto.id), [8]);
  assert.equal(filtrarProdutos(PRODUTOS, 'couro', 'Bolsas').length, 0);
});

test('gera o link do WhatsApp com o pedido codificado', () => {
  const link = new URL(criarLinkWhatsApp(itensDoCarrinho({ 2: 2 }, PRODUTOS)));
  const mensagem = link.searchParams.get('text');
  assert.equal(link.hostname, 'wa.me');
  assert.match(mensagem, /2x Colar Pérola/);
  assert.match(mensagem, /Total: R\$\s139,80/);
});

test('ignora dados salvos inválidos', () => {
  assert.deepEqual(limparCarrinhoSalvo({ 1: 2, 999: 1, 2: -1, 3: 'x' }, PRODUTOS), { 1: 2 });
  assert.deepEqual(limparCarrinhoSalvo(null, PRODUTOS), {});
});
