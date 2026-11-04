import { useEffect, useMemo, useState } from 'react';
import {
  alterarQuantidade, calcularTotal, criarLinkWhatsApp, filtrarProdutos, itensDoCarrinho, limparCarrinhoSalvo, moeda,
} from './carrinho.js';
import { CATEGORIAS, PRODUTOS } from './produtos.js';

const CHAVE = 'catalogo-loja-carrinho';

function carregarCarrinho() {
  try {
    return limparCarrinhoSalvo(JSON.parse(localStorage.getItem(CHAVE)), PRODUTOS);
  } catch {
    return {};
  }
}

function ImagemProduto({ produto }) {
  const formas = {
    Colares: <><path d="M30 18c2 34 16 50 30 50s28-16 30-50" /><circle cx="60" cy="76" r="8" className="cheio" /></>,
    Brincos: <><circle cx="40" cy="58" r="17" /><circle cx="80" cy="58" r="17" /><path d="M40 28v13M80 28v13" /></>,
    Pulseiras: <><ellipse cx="60" cy="52" rx="36" ry="23" /><ellipse cx="60" cy="52" rx="25" ry="13" /></>,
    Bolsas: <><rect x="28" y="42" width="64" height="44" rx="7" className="cheio" /><path d="M42 42c0-30 36-30 36 0" /></>,
  };
  return (
    <svg viewBox="0 0 120 100" role="img" aria-label={produto.nome} style={{ background: produto.cor }}>
      {formas[produto.categoria]}
    </svg>
  );
}

function Carrinho({ itens, aoAlterar, aoLimpar }) {
  if (!itens.length) {
    return <aside aria-label="Carrinho"><h2>Carrinho</h2><p className="suave">Seu carrinho está vazio.</p></aside>;
  }
  return (
    <aside aria-label="Carrinho">
      <h2>Carrinho</h2>
      <ul>
        {itens.map(item => (
          <li key={item.id}>
            <div><strong>{item.nome}</strong><span className="suave">{moeda(item.preco * item.quantidade)}</span></div>
            <div className="quantidade">
              <button type="button" aria-label={`Diminuir ${item.nome}`} onClick={() => aoAlterar(item.id, -1)}>-</button>
              <span>{item.quantidade}</span>
              <button type="button" aria-label={`Aumentar ${item.nome}`} onClick={() => aoAlterar(item.id, 1)}>+</button>
              <button type="button" className="remover" onClick={() => aoAlterar(item.id, -item.quantidade)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="total"><span>Total</span><strong>{moeda(calcularTotal(itens))}</strong></p>
      <a className="botao" href={criarLinkWhatsApp(itens)} target="_blank" rel="noreferrer">Enviar pedido pelo WhatsApp</a>
      <button type="button" className="limpar" onClick={aoLimpar}>Esvaziar carrinho</button>
    </aside>
  );
}

export default function App() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [carrinho, setCarrinho] = useState(carregarCarrinho);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(carrinho));
    } catch {
      // Sem armazenamento disponível, o carrinho continua funcionando até a página ser fechada.
    }
  }, [carrinho]);

  const produtos = useMemo(() => filtrarProdutos(PRODUTOS, busca, categoria), [busca, categoria]);
  const itens = useMemo(() => itensDoCarrinho(carrinho, PRODUTOS), [carrinho]);
  const alterar = (id, diferenca) => setCarrinho(atual => alterarQuantidade(atual, id, diferenca));

  return (
    <main>
      <header>
        <h1>Catálogo da Loja</h1>
        <p className="suave">Loja fictícia criada para demonstrar um catálogo com carrinho.</p>
      </header>

      <div className="filtros">
        <label>Buscar produto
          <input type="search" value={busca} onChange={evento => setBusca(evento.target.value)} placeholder="Ex.: colar" />
        </label>
        <div className="categorias" role="group" aria-label="Filtrar por categoria">
          {CATEGORIAS.map(nome => (
            <button type="button" key={nome} aria-pressed={categoria === nome} onClick={() => setCategoria(nome)}>{nome}</button>
          ))}
        </div>
      </div>

      <div className="conteudo">
        <section aria-label="Produtos" className="produtos">
          {produtos.map(produto => (
            <article key={produto.id}>
              <ImagemProduto produto={produto} />
              <h2>{produto.nome}</h2>
              <p className="suave">{produto.categoria}</p>
              <p className="preco">{moeda(produto.preco)}</p>
              <button type="button" onClick={() => alterar(produto.id, 1)}>Adicionar</button>
            </article>
          ))}
          {!produtos.length && <p className="suave">Nenhum produto encontrado.</p>}
        </section>
        <Carrinho itens={itens} aoAlterar={alterar} aoLimpar={() => setCarrinho({})} />
      </div>
    </main>
  );
}
