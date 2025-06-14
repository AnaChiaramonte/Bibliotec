import Footer from "../components/footer/Footer"

const Home = () => {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="bg-pattern">
       
        <section className="vh-100 position-relative d-flex align-items-center">
          <div className="container-fluid">
            <div className="row h-100 align-items-center">
              <div className="col-lg-6">
                <div
                  className="position-absolute top-50 start-50 translate-middle text-center"
                  style={{ left: "35%", zIndex: 2, color: "var(--accent)" }}
                >
                  <h1 className="display-4 fw-bold text-accent-custom mb-4 fade-in">
                    Tenha uma leitura leve e<br />
                    tranquila com
                    <br />
                    <span className="text-primary-custom">Bibliotech</span>
                  </h1>
                  <p className="lead text-muted-custom mb-4">Seu universo literário organizado em um só lugar!</p>
                </div>
              </div>

              <div className="d-flex flex-row" style={{ height: "100vh" }}>
  
  <div
    className="d-flex flex-column justify-content-center align-items-center"
    style={{
      backgroundColor: "#a18478", 
      width: "50%",
      color: "#fff",
      padding: "2rem",
    }}
  >
    <img
      src="/public/Black White Minimalist Book Club Logo (1).png" 
      alt="Decorativo"
      className="grafico-container"
    />
   
      
   
  </div>


  <div style={{ width: "50%", position: "relative", height:"" }}>
    <img
      src="/public/imagem projeto.jpg"
      alt="Biblioteca"
      className="img-fluid"
      style={{
        objectFit: "cover",
        height: "100%",
        width: "100%",
        borderRadius: "0 0 0 5px",
      }}
    />
  </div>
</div>

            </div>
          </div>

       
        </section>

        
        <section className="py-5 bg-secondary-custom">
          <div className="container text-center">
            <h1 className="display-2 fw-bold text-dark-custom mb-3">Bibliotech</h1>
            <p className="lead text-dark-custom fst-italic">Seu universo literário organizado em um só lugar!</p>
          </div>
        </section>

        <section className="py-5 bg-marrom-escuro">
          <div className="container">
            
            <div className="row align-items-center mb-5">
              <div className="col-md-2 text-center mb-3 mb-md-0">
                <i className="bi bi-book-fill text-accent-custom" style={{ fontSize: "5rem" }}></i>
              </div>
              <div className="col-md-10">
                <h3 className="fw-semibold text-dark-custom mb-3">Cadastro e Organização de Livros</h3>
                <p className="text-muted-custom lh-base">
                  Gerencie sua biblioteca de forma simples e eficiente! Nosso sistema permite cadastrar livros com
                  informações detalhadas, como título, autor, categoria, ano de publicação e número de páginas.
                </p>
              </div>
            </div>

            <div className="row align-items-center mb-5">
              <div className="col-md-10 order-md-1">
                <h3 className="fw-semibold text-dark-custom mb-3 text-md-end">Controle de Progresso de Leitura</h3>
                <p className="text-muted-custom lh-base text-md-end">
                  Acompanhe seu progresso de leitura de forma prática e intuitiva! Com nosso sistema, você pode
                  registrar o andamento de cada livro, incluindo a página atual e o tempo estimado para conclusão.
                </p>
              </div>
              <div className="col-md-2 text-center order-md-2 mb-3 mb-md-0">
                <i className="bi bi-graph-up text-accent-custom" style={{ fontSize: "5rem" }}></i>
              </div>
            </div>

        
            <div className="row align-items-center mb-5">
              <div className="col-md-2 text-center mb-3 mb-md-0">
                <i className="bi bi-star-fill text-accent-custom" style={{ fontSize: "5rem" }}></i>
              </div>
              <div className="col-md-10">
                <h3 className="fw-semibold text-dark-custom mb-3">Sistema de Avaliações</h3>
                <p className="text-muted-custom lh-base">
                  Avalie seus livros favoritos e compartilhe suas opiniões! Com nosso sistema de estrelas, você pode
                  classificar cada livro lido e manter um histórico das suas preferências literárias.
                </p>
              </div>
            </div>
          </div>
        </section>

       
        

        <Footer />
      </div>
    </>
  )
}

export default Home
