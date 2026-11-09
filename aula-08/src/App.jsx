import { useEffect, useMemo, useState } from 'react'
import CategoryFilter from './components/CategoryFilter.jsx'
import ConceptDetail from './components/ConceptDetail.jsx'
import ConceptGrid from './components/ConceptGrid.jsx'
import InteractionDemo from './components/InteractionDemo.jsx'
import SearchBar from './components/SearchBar.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import StudyProgress from './components/StudyProgress.jsx'
import { categories, concepts } from './data/concepts.js'

const STORAGE_KEY = 'react-em-pratica-estudados'

function readLearnedIds() {
  try {
    const savedIds = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(savedIds)
      ? savedIds.filter((id) => concepts.some((concept) => concept.id === id))
      : []
  } catch {
    return []
  }
}

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [learnedIds, setLearnedIds] = useState(readLearnedIds)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(learnedIds))
    } catch {
      // O estudo continua disponível mesmo quando o navegador bloqueia o armazenamento local.
    }
  }, [learnedIds])

  const counts = useMemo(() => ({
    all: concepts.length,
    ...Object.fromEntries(categories
      .filter((item) => item.id !== 'all')
      .map((item) => [item.id, concepts.filter((concept) => concept.category === item.id).length])),
  }), [])

  const filteredConcepts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')

    return concepts.filter((concept) => {
      const matchesCategory = category === 'all' || concept.category === category
      const searchableText = `${concept.title} ${concept.summary} ${concept.categoryLabel} ${concept.explanation}`
        .toLocaleLowerCase('pt-BR')
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
    })
  }, [category, query])

  const selectedConcept = concepts.find((concept) => concept.id === selectedId) ?? null

  function toggleLearned(id) {
    setLearnedIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id])
  }

  function clearFilters() {
    setQuery('')
    setCategory('all')
  }

  return (
    <div id="inicio" className="app-shell">
      <div className="page-container">
        <SiteHeader />

        <main>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <span className="hero-kicker"><span /> TRILHA DE APRENDIZADO · REACT</span>
              <h1 id="hero-title">Interfaces que<br /><em>fazem sentido.</em></h1>
              <p>
                Explore os fundamentos do React, conecte cada conceito e descubra como pequenas
                peças formam experiências completas.
              </p>
              <a className="hero-link" href="#trilha">Explorar os temas <span aria-hidden="true">↓</span></a>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit orbit-large" />
              <div className="art-orbit orbit-small" />
              <div className="art-spark spark-one">✳</div>
              <div className="art-spark spark-two">✳</div>
              <div className="art-card art-card-back"><span>props</span><i>dados em fluxo</i></div>
              <div className="art-card art-card-main"><span className="art-code-mark">&lt;/&gt;</span><strong>componentes</strong><i>peças que se conectam</i></div>
              <div className="art-note"><span>01</span><strong>uma ideia<br />por vez</strong></div>
              <div className="art-dot dot-a" />
              <div className="art-dot dot-b" />
            </div>

            <div className="hero-index"><span>01 — 08</span><span>APRENDER · PRATICAR · CONECTAR</span></div>
          </section>

          <section id="trilha" className="learning-section" aria-labelledby="learning-title">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Seu mapa de aprendizado</span>
                <h2 id="learning-title">Uma boa base muda tudo<span>.</span></h2>
              </div>
              <p>Encontre um tema, explore o exemplo e marque o que já estudou.</p>
            </div>

            <StudyProgress learnedCount={learnedIds.length} total={concepts.length} />

            <div className="catalog-toolbar">
              <CategoryFilter
                categories={categories}
                selected={category}
                onSelect={setCategory}
                counts={counts}
              />
              <SearchBar value={query} onChange={setQuery} resultCount={filteredConcepts.length} />
            </div>

            <ConceptGrid
              concepts={filteredConcepts}
              learnedIds={learnedIds}
              onOpen={setSelectedId}
              onToggleLearned={toggleLearned}
              onClearFilters={clearFilters}
            />

            <ConceptDetail concept={selectedConcept} onClose={() => setSelectedId(null)} />
          </section>

          <section id="laboratorio" className="lab-section" aria-labelledby="lab-heading">
            <div className="lab-heading">
              <span className="eyebrow">Experimente na prática</span>
              <p id="lab-heading">Uma interação pequena, uma interface que responde.</p>
            </div>
            <InteractionDemo />
          </section>

          <section className="closing-note" aria-label="Mensagem final">
            <span className="closing-mark" aria-hidden="true">✳</span>
            <p>Entender é o primeiro passo.<br /><strong>Construir é como a ideia fica.</strong></p>
            <span className="closing-label">REACT EM PRÁTICA · 2026</span>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
