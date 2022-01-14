import axios from "axios";
import { api } from "../../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ItemPedido = (props) => {

    const [data, setData] = useState({});
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const [PedidoId] = useState(props.match.params.PedidoId);
    const [ServicoId] = useState(props.match.params.ServicoId);

    const getItem = async () => {
        await axios.get(api + "/itempedido/" + PedidoId + "/" + ServicoId)
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
    }, [PedidoId, ServicoId]);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Informações do item</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/itenspedidos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Itens
                        </Link>
                        <Link
                            to="/pedidos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Pedidos
                        </Link>
                        <Link
                            to="/servicos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Serviços
                        </Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido ID</th>
                            <th className="text-center">Servico ID</th>
                            <th className="text-center">Quantidade</th>
                            <th className="text-center">Valor</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{data.PedidoId}</th>
                            <td className="text-center">{data.ServicoId}</td>
                            <td className="text-center">{data.quantidade}</td>
                            <td className="text-center">{data.valor}</td>
                            <td className="text-center">
                                <Link
                                    to={"/pedidos/" + data.PedidoId}
                                    className="btn btn-outline-primary btn-sm mx-1"
                                >
                                    Pedido
                                </Link>
                                <Link
                                    to={"/servicos/" + data.ServicoId}
                                    className="btn btn-outline-primary btn-sm mx-1"
                                >
                                    Serviço
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};