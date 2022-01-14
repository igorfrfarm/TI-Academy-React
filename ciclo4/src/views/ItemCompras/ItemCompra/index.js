import axios from "axios";
import { api } from "../../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ItemCompra = (props) => {

    const [data, setData] = useState({});
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const [CompraId] = useState(props.match.params.CompraId);
    const [ProdutoId] = useState(props.match.params.ProdutoId);

    const getItem = async () => {
        await axios.get(api + "/itemcompra/" + CompraId + "/" + ProdutoId)
            .then((response) => {
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getItem();
    }, [CompraId, ProdutoId]);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Informações do item</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/itenscompras"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Itens
                        </Link>
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
                            <th>Compra ID</th>
                            <th className="text-center">Produto ID</th>
                            <th className="text-center">Quantidade</th>
                            <th className="text-center">Valor</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{data.CompraId}</th>
                            <td className="text-center">{data.ProdutoId}</td>
                            <td className="text-center">{data.quantidade}</td>
                            <td className="text-center">{data.valor}</td>
                            <td className="text-center">
                                <Link
                                    to={"/compras/" + data.CompraId}
                                    className="btn btn-outline-primary btn-sm mx-1"
                                >
                                    Compra
                                </Link>
                                <Link
                                    to={"/produtos/" + data.ProdutoId}
                                    className="btn btn-outline-primary btn-sm mx-1"
                                >
                                    Produto
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};