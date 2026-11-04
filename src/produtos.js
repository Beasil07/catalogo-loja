// Produtos fictícios. Os preços ficam em centavos.
export const PRODUTOS = [
  { id: 1, nome: 'Colar Lua', categoria: 'Colares', preco: 4990, cor: '#c98f5a' },
  { id: 2, nome: 'Colar Pérola', categoria: 'Colares', preco: 6990, cor: '#8d7bb5' },
  { id: 3, nome: 'Colar Trançado', categoria: 'Colares', preco: 3990, cor: '#4f8f8b' },
  { id: 4, nome: 'Brinco Argola', categoria: 'Brincos', preco: 2990, cor: '#d07a6d' },
  { id: 5, nome: 'Brinco Gota', categoria: 'Brincos', preco: 3490, cor: '#5b84b1' },
  { id: 6, nome: 'Brinco Estrela', categoria: 'Brincos', preco: 2790, cor: '#b89b3e' },
  { id: 7, nome: 'Pulseira Elos', categoria: 'Pulseiras', preco: 3790, cor: '#6f9a57' },
  { id: 8, nome: 'Pulseira Couro', categoria: 'Pulseiras', preco: 4590, cor: '#9a6b4f' },
  { id: 9, nome: 'Pulseira Miçangas', categoria: 'Pulseiras', preco: 2490, cor: '#c0668f' },
  { id: 10, nome: 'Bolsa Tiracolo', categoria: 'Bolsas', preco: 12990, cor: '#7c6a58' },
  { id: 11, nome: 'Bolsa de Palha', categoria: 'Bolsas', preco: 9990, cor: '#b5934f' },
  { id: 12, nome: 'Carteira Mini', categoria: 'Bolsas', preco: 6490, cor: '#566f8f' },
];

export const CATEGORIAS = ['Todos', ...new Set(PRODUTOS.map(produto => produto.categoria))];
