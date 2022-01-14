import axios from "axios";
import { api } from "../../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Compra = (props) => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const [id] = useState(props.match.params.id);

    const getCompra = async () => {
        await axios.get(api + "/compras/" + id)
            .then((response) => {
                setData(response.data.comp.compra_produtos);                            
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getCompra();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Informações da Compra</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/compras"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Compras
                        </Link>
                        <Link
                            to="/produtos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Produtos
                        </Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Produto ID</th>
                            <th className="text-center">Nome</th>
                            <th className="text-center">Descrição</th>                            
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td className="text-center">{item.nome}</td>
                                <td className="text-center">{item.descricao}</td>
                                <td className="text-center">
                                    <Link
                                        to={"/produtos/" + item.ItemCompra.ProdutoId}
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};