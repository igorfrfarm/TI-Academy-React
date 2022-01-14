import { Container } from 'reactstrap';

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Home</h1>
                    </div>
                    <div className="d-flex flex-column">                        
                        <a
                            href="/clientes"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Clientes
                        </a>
                        <a
                            href="/pedidos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Pedidos

                        </a>
                        <a
                            href="/servicos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Serviços
                        </a>
                        <a
                            href="/itenspedidos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Itens dos Pedidos
                        </a>                  
                        <a
                            href="/compras"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Compras
                        </a>
                        <a
                            href="/produtos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Produtos
                        </a>
                        <a
                            href="/itenscompras"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Itens das Compras
                        </a>                        
                    </div>
                </div>
            </Container>
        </div>
    );
};